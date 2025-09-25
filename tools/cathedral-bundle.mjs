#!/usr/bin/env node
/**
 * Cathedral bundle orchestrator.
 *
 * Builds the Codex 144:99 bundle from scattered sources, enforces
 * canonical identifiers, and optionally runs a hot-reload server with
 * SSE notifications.
 *
 * The code favors small, well-commented pure functions to stay within
 * the Cosmic-Helix policy and ND-safe practices.
 */

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash, randomUUID } from 'crypto';
import http from 'http';
import sanitizeHtml from 'sanitize-html';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// Configuration flags from environment.
const envFlags = {
  strict: process.env.STRICT === '0' ? false : true,
  adminToken: process.env.ADMIN_TOKEN || null,
  editionOverride: process.env.EDITION || process.env.CATHEDRAL_EDITION || null,
  noBridge: process.env.NO_BRIDGE === '1',
  sourcesOnly: process.env.SOURCES_ONLY === '1'
};

// Canon identifier regex patterns.
const ID_PATTERNS = {
  node: /^C144N-(\d{3})$/, // capture digits for numerology
  arcana: /^LA-(\d{2})-[A-Z0-9-]+$/,
  shem: /^SHEM-(\d{2})$/,
  spine: /^SPINE-(\d{2})$/,
  realm: /^R-[a-z0-9-]+$/,
  hall: /^H-[a-z0-9-]+$/,
  art: /^ART-[a-z0-9-]+$/
};

// Canon node kinds and statuses.
const NODE_KINDS = new Set(['builder', 'archetype', 'room', 'study', 'entity']);
const NODE_STATUSES = new Set(['canon', 'draft', 'reserved', 'archival', 'missing']);

// ND-safe safety defaults.
const SAFETY_DEFAULT = { strobe: false, autoplay: false, motion: 'calm' };

// Default palette (used when no source palette exists).
const DEFAULT_PALETTE = {
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#b1c7ff', '#89f7fe', '#a0ffa1', '#ffd27f', '#f5a3ff', '#d0d0e6']
};

// Canon themes required by the UI contract.
const DEFAULT_THEMES = {
  circuitum: { bg: '#0a0a0a', ink: '#d4af37' },
  codex: { bg: '#f1e5cf', ink: '#222' },
  cathedral: { bg: '#06050b', ink: '#e8ebff' }
};

// Tarot major arcana map for normalization.
const TAROT_MAJORS = buildTarotMajorMap();

// Deprecated tokens mapped to archival stubs.
const DEPRECATED_TOKENS = new Map([
  ['LUXCRUX', { ref: 'archive/luxcrux.json' }],
  ['GNOSA', { ref: 'archive/gnosa.json' }],
  ['AKA DUA', { ref: 'archive/aka-dua.json' }]
]);

// Debounce window in milliseconds for rebuild triggers.
const DEBOUNCE_MS = 500;

// Express rate limit for admin endpoints.
const ADMIN_LIMIT_PER_MIN = 30;

// Body size limit for admin posts.
const ADMIN_BODY_MAX_BYTES = 256 * 1024;

// SSE keep-alive interval (ms).
const SSE_KEEPALIVE_MS = 15000;

// Command-line args: support --serve, --port, --watch, --no-strict.
const cliArgs = parseArgs(process.argv.slice(2));

// Shared mutable state for the running process.
const appState = {
  codex: null,
  etag: null,
  counts: { nodes: 0, spine: 0, halls: 0, archival: 0, dedup: 0, sandbox: 0 },
  palette: DEFAULT_PALETTE,
  tarot: {},
  lineages: {},
  lastWriteTs: 0,
  watchInputs: [],
  watchPatterns: [],
  watchDirs: [],
  watchHandles: new Map(),
  watchActive: false,
  sseClients: new Set(),
  adminHits: [],
  timer: null
};

// Entry point.
main().catch(error => {
  const code = error.code && Number.isInteger(error.code) ? error.code : 1;
  console.error(error.message || String(error));
  process.exit(code);
});

// -------------------- Core Workflow --------------------

async function main() {
  // Build once before optionally starting watchers/server.
  const buildResult = await buildCodex({ reason: 'initial' });
  printSummary(buildResult);

  if (envFlags.sourcesOnly) {
    return; // Validation-only mode exits after summary.
  }

  if (!cliArgs.serve && !cliArgs.watch) {
    return;
  }

  await ensureWatchers();

  if (cliArgs.serve) {
    await startServer();
  } else {
    // Watch without server.
    console.log('Watching for changes (no server)...');
  }
}

// -------------------- Argument Parsing --------------------

function parseArgs(argv) {
  const args = { serve: false, watch: false, port: 8080, strict: envFlags.strict };
  for (const entry of argv) {
    if (entry === '--serve') args.serve = true;
    else if (entry === '--watch') args.watch = true;
    else if (entry === '--no-strict') args.strict = false;
    else if (entry.startsWith('--port=')) args.port = Number(entry.split('=')[1]);
  }
  envFlags.strict = args.strict;
  if (args.serve) args.watch = true; // Serving implies watching.
  return args;
}

// -------------------- Build Pipeline --------------------

async function buildCodex({ reason, inputs = [] }) {
  const now = new Date();
  const sourceConfig = await collectSourceInputs();
  appState.watchInputs = sourceConfig.files;
  appState.watchPatterns = sourceConfig.watchPatterns;
  appState.watchDirs = sourceConfig.watchDirs;
  if (appState.watchActive) {
    updateWatchers(appState.watchDirs);
  }

  const raw = await loadSources(sourceConfig.files);
  await writeBibliographyRefs(raw.bibliography);

  if (envFlags.sourcesOnly) {
    return {
      nodes: 0,
      spine: 0,
      halls: 0,
      archival: 0,
      dedup: 0,
      sandbox: 0,
      etag: 'n/a',
      reason,
      inputs
    };
  }

  const patches = await loadPatches();
  const mergedNodes = applyPatches(raw.nodes, patches);
  const sandboxInfo = assignSandboxIds(mergedNodes);
  const dedupInfo = dedupeInfluenceFields(mergedNodes);
  const nodes = normalizeNodes(mergedNodes, raw.bibliography);
  const spine = normalizeSpine(raw.spine, nodes);
  const halls = normalizeHalls(raw.halls);
  const flow = normalizeFlow(raw.flow);
  const palette = await resolvePalette(raw.palette);
  const tarot = normalizeTarot(raw.tarot);
  const lineages = normalizeLineages(raw.lineages);

  validateCrossReferences({ nodes, spine, halls, tarot });
  ensureArtPresence(nodes);

  const meta = buildMeta(now);
  const codex = {
    meta,
    palette,
    nodes,
    spine,
    halls,
    flow,
    themes: DEFAULT_THEMES,
    tarot,
    lineages
  };

  const jsonPayload = `${JSON.stringify(codex, null, 2)}\n`;
  const etag = sha256(jsonPayload);

  await writeOutputs({ codex, palette, nodes, spine, halls, etag, inputs: sourceConfig.files });

  appState.codex = codex;
  appState.etag = etag;
  appState.counts = {
    nodes: nodes.length,
    spine: spine.length,
    halls: halls.length,
    archival: nodes.filter(node => node.status === 'archival').length,
    dedup: dedupInfo.merged,
    sandbox: sandboxInfo.assigned
  };
  appState.palette = palette;
  appState.tarot = tarot;
  appState.lineages = lineages;

  await writeChangeLog({ etag, inputs: inputs.length ? inputs : sourceConfig.files });
  await maybeAppendBridgeEvent();

  const counts = appState.counts;
  const summary = { ...counts, etag, reason, inputs };
  broadcastUpdate(etag);
  return summary;
}

// -------------------- Source Collection --------------------

async function collectSourceInputs() {
  const files = new Set();
  const watchPatterns = new Set();
  const watchDirs = new Set();

  const defaultRoots = [
    'core_node_map.json',
    'liber_arcanae.json',
    'Codex 144:99 Bibliography Scroll.md',
    'octagram_halls.md',
    'ui_flow.md'
  ];

  for (const relative of defaultRoots) {
    const full = path.resolve(repoRoot, relative);
    if (await fileExists(full)) {
      files.add(full);
      watchPatterns.add(full);
      watchDirs.add(path.dirname(full));
    }
  }

  const spineDir = path.resolve(repoRoot, 'circuitum99', 'spine');
  if (await dirExists(spineDir)) {
    watchPatterns.add(path.join(spineDir, '**', 'atlas.json'));
    watchDirs.add(spineDir);
    const atlasGlobs = await walkAtlasFiles(spineDir);
    atlasGlobs.forEach(file => files.add(file));
    atlasGlobs.forEach(file => watchDirs.add(path.dirname(file)));
  }

  const cosmoNodes = path.resolve(repoRoot, 'cosmogenesis-learning-engine', 'data', 'nodes');
  if (await dirExists(cosmoNodes)) {
    watchPatterns.add(path.join(cosmoNodes, '**', '*.json'));
    watchDirs.add(cosmoNodes);
    const cosmoFiles = await walkJsonFiles(cosmoNodes);
    cosmoFiles.forEach(file => files.add(file));
    cosmoFiles.forEach(file => watchDirs.add(path.dirname(file)));
  }

  const overridePath = process.env.CATHEDRAL_SOURCES_JSON;
  if (overridePath) {
    const overrideFull = path.resolve(overridePath);
    if (!await fileExists(overrideFull)) {
      const err = new Error(`Override config not found: ${overrideFull}`);
      err.code = 66;
      throw err;
    }
    const payload = JSON.parse(await fsp.readFile(overrideFull, 'utf8'));
    const overrideList = Array.isArray(payload) ? payload : Array.isArray(payload.sources) ? payload.sources : [];
    if (overrideList.length) {
      files.clear();
      overrideList.forEach(item => {
        const resolved = path.resolve(item);
        files.add(resolved);
        watchPatterns.add(resolved);
        watchDirs.add(path.dirname(resolved));
      });
    }
  }

  const patchesDir = path.resolve(repoRoot, 'cathedral', 'patches');
  watchPatterns.add(path.join(patchesDir, '**', '*.json'));
  watchDirs.add(patchesDir);

  const codexDist = path.resolve(repoRoot, 'cathedral', 'dist', 'codex.json');
  watchPatterns.add(codexDist);
  watchDirs.add(path.dirname(codexDist));

  return {
    files: Array.from(files),
    watchPatterns: Array.from(watchPatterns),
    watchDirs: Array.from(watchDirs)
  };
}

async function walkAtlasFiles(rootDir) {
  const entries = await fsp.readdir(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkAtlasFiles(full));
    } else if (entry.isFile() && entry.name === 'atlas.json') {
      files.push(full);
    }
  }
  return files;
}

async function walkJsonFiles(rootDir) {
  const entries = await fsp.readdir(rootDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkJsonFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(full);
    }
  }
  return files;
}

async function fileExists(target) {
  try {
    await fsp.access(target, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function dirExists(target) {
  try {
    const stat = await fsp.stat(target);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

// -------------------- Source Loading --------------------

async function loadSources(files) {
  const nodes = [];
  const spine = [];
  const halls = [];
  const flow = [];
  let palette = null;
  const tarot = [];
  const lineages = [];
  const bibliography = [];

  for (const file of files) {
    const base = path.basename(file);
    const ext = path.extname(file).toLowerCase();
    const dir = path.dirname(file);

    if (base === 'core_node_map.json') {
      nodes.push(...await parseNodeFile(file));
    } else if (base === 'liber_arcanae.json') {
      const data = await readJsonFile(file);
      if (data.palette) palette = data.palette;
      if (Array.isArray(data.arcana)) tarot.push(...data.arcana);
      if (Array.isArray(data.tarot)) tarot.push(...data.tarot);
      if (data.lineages) lineages.push(data.lineages);
    } else if (base === 'octagram_halls.md') {
      halls.push(...await parseMarkdownBlocks(file));
    } else if (base === 'ui_flow.md') {
      flow.push(...await parseMarkdownBlocks(file));
    } else if (base === 'Codex 144:99 Bibliography Scroll.md') {
      bibliography.push(...await parseMarkdownBlocks(file));
    } else if (file.includes(`${path.sep}SPINE-`) && base === 'atlas.json') {
      const atlas = await readJsonFile(file);
      if (atlas) spine.push({ ...atlas, __doc: path.relative(repoRoot, file) });
    } else if (file.includes(`cosmogenesis-learning-engine${path.sep}data${path.sep}nodes`) && ext === '.json') {
      nodes.push(...await parseNodeFile(file));
    } else if (ext === '.json') {
      nodes.push(...await parseNodeFile(file));
    }
  }

  return {
    nodes,
    spine,
    halls,
    flow,
    palette,
    tarot,
    lineages,
    bibliography
  };
}

async function parseNodeFile(file) {
  const data = await readJsonFile(file);
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map(entry => ({ ...entry, __source: relPath(file) }));
  }
  if (Array.isArray(data.nodes)) {
    return data.nodes.map(entry => ({ ...entry, __source: relPath(file) }));
  }
  return [{ ...data, __source: relPath(file) }];
}

async function parseMarkdownBlocks(file) {
  const text = await fsp.readFile(file, 'utf8');
  const blocks = extractJsonBlocks(text);
  return blocks.map(block => ({ ...block, __source: relPath(file) }));
}

async function readJsonFile(file) {
  try {
    const text = await fsp.readFile(file, 'utf8');
    return JSON.parse(text);
  } catch (error) {
    const err = new Error(`Failed to parse JSON from ${relPath(file)}: ${error.message}`);
    err.code = 65;
    throw err;
  }
}

function extractJsonBlocks(markdown) {
  const blocks = [];
  const regex = /```json\s*([\s\S]*?)```/gi;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      if (envFlags.strict) {
        const err = new Error(`Invalid JSON block in markdown: ${error.message}`);
        err.code = 64;
        throw err;
      }
    }
  }
  return blocks;
}

function relPath(file) {
  return path.relative(repoRoot, file);
}

// -------------------- Patches --------------------

async function loadPatches() {
  const patchesDir = path.resolve(repoRoot, 'cathedral', 'patches');
  if (!await dirExists(patchesDir)) return [];
  const files = await walkJsonFiles(patchesDir);
  const patches = [];
  for (const file of files) {
    try {
      const data = await readJsonFile(file);
      if (data && data.id) {
        patches.push({ ...data, __patch: relPath(file) });
      }
    } catch (error) {
      const err = new Error(`Failed to load patch ${relPath(file)}: ${error.message}`);
      err.code = 65;
      throw err;
    }
  }
  return patches;
}

function applyPatches(nodes, patches) {
  if (!patches.length) return nodes;
  const byId = new Map();
  for (const node of nodes) {
    const clone = structuredClone(node);
    byId.set(clone.id || `__draft__${Math.random()}`, clone);
  }
  for (const patch of patches) {
    if (!patch.id) continue;
    const target = Array.from(byId.values()).find(item => item.id === patch.id);
    if (target) {
      const merged = deepMerge(target, patch);
      merged.__source = `${target.__source || 'patch'} + ${patch.__patch}`;
      byId.set(patch.id, merged);
    } else {
      byId.set(patch.id, { ...patch, __source: patch.__patch });
    }
  }
  return Array.from(byId.values());
}

function deepMerge(base, patch) {
  if (Array.isArray(base) && Array.isArray(patch)) {
    const seen = new Set();
    const result = [];
    for (const item of base.concat(patch)) {
      const key = JSON.stringify(item);
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(item);
    }
    return result;
  }
  if (isPlainObject(base) && isPlainObject(patch)) {
    const merged = { ...base };
    for (const key of Object.keys(patch)) {
      const value = patch[key];
      if (value === undefined) continue;
      if (base[key] !== undefined) {
        merged[key] = deepMerge(base[key], value);
      } else {
        merged[key] = value;
      }
    }
    return merged;
  }
  return patch;
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

// -------------------- Sandbox IDs --------------------

function assignSandboxIds(nodes) {
  let assigned = 0;
  for (const node of nodes) {
    if (node.id) continue;
    if (!node.name) {
      const err = new Error(`Node missing id and name from ${node.__source || 'unknown source'}`);
      err.code = 64;
      throw err;
    }
    const sandboxId = sandboxIdFromName(node.name);
    const beforeHash = null;
    const afterHash = sha256(JSON.stringify({ id: sandboxId, name: node.name }));
    appendLedger({ op: 'sandbox-assign', id: sandboxId, before: beforeHash, after: afterHash });
    node.id = sandboxId;
    node.status = node.status || 'draft';
    assigned += 1;
  }
  return { assigned };
}

function sandboxIdFromName(name) {
  const digest = createHash('sha256').update(name.toLowerCase()).digest('hex');
  const value = parseInt(digest.slice(0, 4), 16) % 100;
  return `C144N-${900 + value}`;
}

// -------------------- Deduplication --------------------

function dedupeInfluenceFields(nodes) {
  let merged = 0;
  for (const node of nodes) {
    ['fusionists', 'influences'].forEach(field => {
      if (!Array.isArray(node[field])) return;
      const result = [];
      const map = new Map();
      for (const entry of node[field]) {
        if (!entry || !entry.name) {
          result.push(entry);
          continue;
        }
        const key = `${entry.name.toLowerCase()}::${entry.birth_year || ''}`;
        if (!map.has(key)) {
          map.set(key, structuredClone(entry));
          continue;
        }
        const mergedEntry = mergeInfluence(map.get(key), entry);
        map.set(key, mergedEntry);
        merged += 1;
      }
      node[field] = Array.from(map.values());
    });
  }
  return { merged };
}

function mergeInfluence(primary, incoming) {
  const merged = { ...primary };
  const arrayFields = ['roles', 'sources', 'tags'];
  for (const field of arrayFields) {
    const values = new Map();
    const left = Array.isArray(primary[field]) ? primary[field] : [];
    const right = Array.isArray(incoming[field]) ? incoming[field] : [];
    left.concat(right).forEach(item => {
      const key = typeof item === 'string' ? item.toLowerCase() : item && item.id ? item.id : JSON.stringify(item);
      if (!values.has(key)) values.set(key, item);
    });
    if (values.size) merged[field] = Array.from(values.values());
  }
  const loreLeft = typeof primary.lore_md === 'string' ? primary.lore_md : '';
  const loreRight = typeof incoming.lore_md === 'string' ? incoming.lore_md : '';
  merged.lore_md = loreRight.length > loreLeft.length ? loreRight : loreLeft;
  if (incoming.birth_year && !merged.birth_year) merged.birth_year = incoming.birth_year;
  return merged;
}

// -------------------- Normalization --------------------

function normalizeNodes(nodes, bibliography) {
  const byId = new Map();
  const bibliographyMap = mapBibliography(bibliography);
  for (const node of nodes) {
    if (!node.id) {
      const err = new Error(`Node missing id after sandbox assignment: ${JSON.stringify(node)}`);
      err.code = 64;
      throw err;
    }
    if (!ID_PATTERNS.node.test(node.id)) {
      const err = new Error(`Invalid node id '${node.id}' from ${node.__source || 'unknown source'}`);
      err.code = 64;
      throw err;
    }
    if (byId.has(node.id)) {
      const err = new Error(`Duplicate node id detected: ${node.id}`);
      err.code = 64;
      throw err;
    }
    const normalized = normalizeNodeRecord(node, bibliographyMap.get(node.id) || []);
    byId.set(node.id, normalized);
  }
  const sorted = Array.from(byId.values()).sort(compareByIdName);
  return sorted;
}

function normalizeNodeRecord(node, bibliographySources) {
  const clone = structuredClone(node);
  clone.name = clone.name || 'Untitled';
  clone.kind = clone.kind || 'entity';
  if (!NODE_KINDS.has(clone.kind)) {
    const err = new Error(`Node ${clone.id} has invalid kind '${clone.kind}'`);
    err.code = 64;
    throw err;
  }
  clone.status = clone.status || 'draft';
  enforceNodeStatus(clone);
  clone.tarot_overlays = normalizeTarotArray(clone.tarot_overlays || []);
  clone.shem = normalizeArrayIds(clone.shem || [], ID_PATTERNS.shem, 'shem', clone.id);
  clone.lineages = uniqueStrings(clone.lineages || []);
  clone.roles = uniqueStrings(clone.roles || []);
  clone.sources = normalizeSources((clone.sources || []).concat(bibliographySources));
  clone.layers = normalizeLayers(clone.layers);
  clone.art = normalizeArt(clone.art || []);
  if (clone.numerology == null) {
    const match = ID_PATTERNS.node.exec(clone.id);
    clone.numerology = match ? Number(match[1]) : null;
  }
  handleDeprecatedTokens(clone);
  delete clone.__source;
  delete clone.__patch;
  return clone;
}

function enforceNodeStatus(node) {
  if (!NODE_STATUSES.has(node.status)) {
    const err = new Error(`Node ${node.id} has invalid status '${node.status}'`);
    err.code = 64;
    throw err;
  }
}

function normalizeTarotArray(values) {
  const list = Array.isArray(values) ? values : [values];
  const result = [];
  for (const value of list) {
    if (!value) continue;
    const normalized = normalizeTarotLabel(value);
    if (!normalized) {
      const err = new Error(`Tarot label '${value}' could not be normalized`);
      err.code = 64;
      throw err;
    }
    if (!result.includes(normalized)) result.push(normalized);
  }
  return result.sort();
}

function normalizeArrayIds(values, pattern, label, nodeId) {
  const list = Array.isArray(values) ? values : [values];
  const unique = [];
  for (const value of list) {
    if (!value) continue;
    if (!pattern.test(value)) {
      const err = new Error(`Node ${nodeId} has invalid ${label} id '${value}'`);
      err.code = 64;
      throw err;
    }
    if (!unique.includes(value)) unique.push(value);
  }
  return unique.sort();
}

function uniqueStrings(values) {
  const set = new Set();
  for (const value of values) {
    if (typeof value === 'string') set.add(value);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function normalizeSources(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry || !entry.id) continue;
    if (!map.has(entry.id)) {
      map.set(entry.id, { ...entry });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id));
}

function normalizeLayers(layers) {
  const result = isPlainObject(layers) ? structuredClone(layers) : {};
  result.safety = { ...SAFETY_DEFAULT };
  if (layers && layers.safety) {
    const { strobe, autoplay, motion } = layers.safety;
    if (strobe === true || autoplay === true) {
      const err = new Error('ND-safety violation: strobe or autoplay set to true');
      err.code = 64;
      throw err;
    }
    result.safety = {
      strobe: Boolean(strobe),
      autoplay: Boolean(autoplay),
      motion: typeof motion === 'string' ? motion : 'calm'
    };
  }
  return result;
}

function normalizeArt(entries) {
  const list = Array.isArray(entries) ? entries : [entries];
  const seen = new Map();
  for (const entry of list) {
    if (!entry) continue;
    if (typeof entry === 'string') {
      if (ID_PATTERNS.art.test(entry)) {
        seen.set(entry, { id: entry, status: 'canon' });
      }
    } else if (entry.id && ID_PATTERNS.art.test(entry.id)) {
      seen.set(entry.id, { id: entry.id, status: entry.status || 'canon', ref: entry.ref });
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.id.localeCompare(b.id));
}

function handleDeprecatedTokens(node) {
  const token = node.name ? node.name.toUpperCase() : null;
  if (!token) return;
  if (DEPRECATED_TOKENS.has(token)) {
    node.status = 'archival';
    node.sources = [{ id: `${node.id}-archival`, status: 'archival', ref: DEPRECATED_TOKENS.get(token).ref }];
  }
}

function mapBibliography(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry || !entry.node) continue;
    const key = entry.node;
    const source = buildBibliographySource(entry);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(source);
  }
  return map;
}

function buildBibliographySource(entry) {
  const id = entry.id || slugify(entry.title || 'source');
  return {
    id,
    work: entry.title || entry.work || 'Reference',
    ref: entry.ref || entry.file || 'sources/refs/unknown.json',
    status: entry.status || 'canon'
  };
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'ref';
}

function compareByIdName(a, b) {
  if (a.id === b.id) return (a.name || '').localeCompare(b.name || '');
  return a.id.localeCompare(b.id);
}

function normalizeSpine(entries, nodes) {
  const nodeIds = new Set(nodes.map(node => node.id));
  const normalized = [];
  for (const entry of entries) {
    if (!entry.id || !ID_PATTERNS.spine.test(entry.id)) {
      const err = new Error(`Invalid spine id '${entry.id || 'unknown'}'`);
      err.code = 64;
      throw err;
    }
    if (!entry.node || !nodeIds.has(entry.node)) {
      const err = new Error(`Spine ${entry.id} references missing node '${entry.node}'`);
      err.code = 64;
      throw err;
    }
    const tarot = normalizeTarotLabel(entry.tarot || entry.tarot_overlay || entry.tarot_code || null);
    if (!tarot) {
      const err = new Error(`Spine ${entry.id} missing tarot mapping`);
      err.code = 64;
      throw err;
    }
    const angels = normalizeArrayIds(entry.angels || entry.shem || [], ID_PATTERNS.shem, 'shem', entry.id);
    const realm = entry.realm || entry.realm_id;
    if (realm && !ID_PATTERNS.realm.test(realm)) {
      const err = new Error(`Spine ${entry.id} has invalid realm '${realm}'`);
      err.code = 64;
      throw err;
    }
    normalized.push({
      id: entry.id,
      title: entry.title || entry.name || entry.id,
      node: entry.node,
      tarot,
      angels,
      realm: realm || null,
      doc: entry.__doc || entry.doc || null,
      status: entry.status || 'draft'
    });
  }
  return normalized.sort(compareByIdName);
}

function normalizeHalls(entries) {
  const normalized = [];
  for (const entry of entries) {
    if (!entry.id || !ID_PATTERNS.hall.test(entry.id)) {
      const err = new Error(`Invalid hall id '${entry.id || 'unknown'}'`);
      err.code = 64;
      throw err;
    }
    const overlays = normalizeTarotArray(entry.tarot_overlays || entry.tarot || entry.cards || []);
    normalized.push({
      id: entry.id,
      title: entry.title || entry.name || entry.id,
      trial: entry.trial || null,
      tasks: entry.tasks || null,
      gift: entry.gift || null,
      tarot_overlays: overlays
    });
  }
  return normalized.sort(compareByIdName);
}

function normalizeFlow(entries) {
  if (!Array.isArray(entries)) return [];
  return entries.map(step => {
    const clone = { ...step };
    delete clone.__source;
    return clone;
  }).sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    return 0;
  });
}

async function resolvePalette(sourcePalette) {
  if (sourcePalette) return sourcePalette;
  const existing = await loadPreviousPalette();
  return existing || DEFAULT_PALETTE;
}

async function loadPreviousPalette() {
  const palettePath = path.resolve(repoRoot, 'cathedral', 'dist', 'palette.json');
  if (!await fileExists(palettePath)) return null;
  try {
    return JSON.parse(await fsp.readFile(palettePath, 'utf8'));
  } catch {
    return null;
  }
}

function normalizeTarot(entries) {
  const map = new Map();
  if (Array.isArray(entries)) {
    for (const entry of entries) {
      if (entry && entry.id && ID_PATTERNS.arcana.test(entry.id)) {
        map.set(entry.id, { ...entry });
      }
    }
  }
  ensureMajorPlaceholders(map);
  const sorted = {};
  Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0])).forEach(([key, value]) => {
    sorted[key] = value;
  });
  return sorted;
}

function ensureMajorPlaceholders(map) {
  for (const major of TAROT_MAJORS.majors) {
    const id = major.id;
    if (map.has(id)) continue;
    map.set(id, { id, title: major.title, status: 'missing' });
  }
}

function normalizeLineages(entries) {
  if (Array.isArray(entries)) {
    const merged = entries.reduce((acc, record) => ({ ...acc, ...record }), {});
    return merged;
  }
  if (entries && typeof entries === 'object') return entries;
  return {};
}

// -------------------- Validation --------------------

function validateCrossReferences({ nodes, spine, halls, tarot }) {
  const nodeIds = new Set(nodes.map(node => node.id));
  for (const spineEntry of spine) {
    if (!nodeIds.has(spineEntry.node)) {
      const err = new Error(`Spine ${spineEntry.id} references missing node ${spineEntry.node}`);
      err.code = 64;
      throw err;
    }
    if (!tarot[spineEntry.tarot]) {
      const err = new Error(`Spine ${spineEntry.id} references missing tarot ${spineEntry.tarot}`);
      err.code = 64;
      throw err;
    }
  }
  for (const hall of halls) {
    for (const overlay of hall.tarot_overlays) {
      if (!tarot[overlay]) {
        const err = new Error(`Hall ${hall.id} references missing tarot ${overlay}`);
        err.code = 64;
        throw err;
      }
    }
  }
}

function ensureArtPresence(nodes) {
  const artDir = path.resolve(repoRoot, 'assets', 'art');
  nodes.forEach(node => {
    node.art = node.art.map(entry => {
      if (!entry || !entry.id) return entry;
      const exists = fs.existsSync(path.join(artDir, `${entry.id}.png`)) || fs.existsSync(path.join(artDir, `${entry.id}.jpg`)) || fs.existsSync(path.join(artDir, `${entry.id}.svg`));
      if (!exists) {
        entry.status = 'missing';
        entry.ref = 'assets/art/placeholder.png';
        const message = `Art asset missing for ${entry.id}`;
        if (envFlags.strict) {
          const err = new Error(message);
          err.code = 64;
          throw err;
        } else {
          console.warn(`Warning: ${message}`);
        }
      }
      return entry;
    });
  });
}

// -------------------- Meta and Output --------------------

function buildMeta(now) {
  const edition = envFlags.editionOverride || `${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
  return {
    name: 'Codex 144:99 — Cathedral Bundle',
    edition,
    generated_at: now.toISOString(),
    nd_safe: { ...SAFETY_DEFAULT }
  };
}

async function writeOutputs({ codex, palette, nodes, spine, halls, etag, inputs }) {
  const codexDir = path.resolve(repoRoot, 'cathedral', 'dist');
  await fsp.mkdir(codexDir, { recursive: true });
  const codexPath = path.join(codexDir, 'codex.json');
  const payload = `${JSON.stringify(codex, null, 2)}\n`;
  await fsp.writeFile(codexPath, payload);
  appState.lastWriteTs = Date.now();

  const palettePath = path.join(codexDir, 'palette.json');
  await fsp.writeFile(palettePath, `${JSON.stringify(palette, null, 2)}\n`);

  await writeRegistry(nodes, codex.tarot, codex.spine);
  await writeArchiveNodes(nodes);
}

async function writeArchiveNodes(nodes) {
  const archival = nodes.filter(node => node.status === 'archival');
  if (!archival.length) return;
  const archiveDir = path.resolve(repoRoot, 'cathedral', 'archive');
  await fsp.mkdir(archiveDir, { recursive: true });
  for (const node of archival) {
    const file = path.join(archiveDir, `${node.id}.json`);
    await fsp.writeFile(file, `${JSON.stringify(node, null, 2)}\n`);
  }
}

async function writeRegistry(nodes, tarot, spine) {
  const registryDir = path.resolve(repoRoot, 'tesseract-bridge', 'registry');
  await fsp.mkdir(registryDir, { recursive: true });
  const ids = {
    nodes: nodes.map(node => node.id).sort(),
    arcana: Object.keys(tarot).sort(),
    shem: Array.from(new Set(
      nodes.flatMap(node => Array.isArray(node.shem) ? node.shem : [])
    )).sort()
  };
  await fsp.writeFile(path.join(registryDir, 'ids.json'), `${JSON.stringify(ids, null, 2)}\n`);
}

async function maybeAppendBridgeEvent() {
  if (envFlags.noBridge) return;
  const eventsDir = path.resolve(repoRoot, 'tesseract-bridge', 'events');
  await fsp.mkdir(eventsDir, { recursive: true });
  const queuePath = path.join(eventsDir, 'queue.ndjson');
  const event = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    type: 'SYNC_NODE',
    source: 'cosmogenesis-learning-engine',
    targets: ['magical-mystery-house', 'circuitum99', 'liber-arcanae', 'liber-arcanae-game', 'codex-14499'],
    payload_ref: 'cosmogenesis-learning-engine/dist/codex.json',
    status: 'pending'
  };
  await appendNdjson(queuePath, event);
}

async function writeChangeLog({ etag, inputs }) {
  const logDir = path.resolve(repoRoot, 'cathedral', 'logs');
  await fsp.mkdir(logDir, { recursive: true });
  const logPath = path.join(logDir, 'changes.ndjson');
  const normalizedInputs = inputs.map(item => path.isAbsolute(item) ? relPath(item) : item);
  const entry = { ts: new Date().toISOString(), op: 'rebuild', etag, inputs: normalizedInputs };
  await appendNdjson(logPath, entry);
}

async function appendNdjson(file, payload) {
  const line = `${JSON.stringify(payload)}\n`;
  await fsp.mkdir(path.dirname(file), { recursive: true });
  await fsp.appendFile(file, line);
}

function appendLedger({ op, id, before, after }) {
  const logDir = path.resolve(repoRoot, 'cathedral', 'logs');
  const ledgerPath = path.join(logDir, 'ledger.ndjson');
  const entry = { ts: new Date().toISOString(), op, id, before_hash: before, after_hash: after };
  appendNdjson(ledgerPath, entry).catch(() => {});
}

function sha256(input) {
  return createHash('sha256').update(input).digest('hex');
}

function printSummary(summary) {
  const line = `codex: nodes=${summary.nodes} spine=${summary.spine} halls=${summary.halls} archival=${summary.archival} dedup=${summary.dedup} sandbox=${summary.sandbox} etag=${summary.etag}`;
  console.log(line);
}

async function writeBibliographyRefs(entries) {
  const refsDir = path.resolve(repoRoot, 'cathedral', 'sources', 'refs');
  await fsp.mkdir(refsDir, { recursive: true });
  for (const entry of entries) {
    if (!entry || !entry.file || !entry.id) continue;
    const payload = {
      id: entry.id,
      type: entry.type || 'manuscript',
      title: entry.title || entry.work || 'Untitled',
      author: Array.isArray(entry.author) ? entry.author : [],
      issued: entry.issued || null,
      publisher: entry.publisher || null,
      language: entry.language || null,
      file: entry.file,
      notes: entry.notes || null
    };
    await fsp.writeFile(path.join(refsDir, `${slugify(entry.id)}.json`), `${JSON.stringify(payload, null, 2)}\n`);
  }
}

// -------------------- Tarot Normalization --------------------

function buildTarotMajorMap() {
  const majors = [];
  const variants = new Map();
  const data = [
    ['00', 'FOOL', ['THE FOOL', 'FOOL', '0 FOOL', 'ZERO FOOL']],
    ['01', 'MAGICIAN', ['THE MAGICIAN', 'MAGICIAN', 'I MAGICIAN', '1 MAGICIAN']],
    ['02', 'PRIESTESS', ['HIGH PRIESTESS', 'THE HIGH PRIESTESS', 'PRIESTESS', 'II PRIESTESS', '2 PRIESTESS']],
    ['03', 'EMPRESS', ['THE EMPRESS', 'EMPRESS', 'III EMPRESS', '3 EMPRESS']],
    ['04', 'EMPEROR', ['THE EMPEROR', 'EMPEROR', 'IV EMPEROR', '4 EMPEROR']],
    ['05', 'HIEROPHANT', ['THE HIEROPHANT', 'HIEROPHANT', 'V HIEROPHANT', '5 HIEROPHANT']],
    ['06', 'LOVERS', ['THE LOVERS', 'LOVERS', 'VI LOVERS', '6 LOVERS']],
    ['07', 'CHARIOT', ['THE CHARIOT', 'CHARIOT', 'VII CHARIOT', '7 CHARIOT']],
    ['08', 'JUSTICE', ['JUSTICE', 'VIII JUSTICE', '8 JUSTICE']],
    ['09', 'HERMIT', ['THE HERMIT', 'HERMIT', 'IX HERMIT', '9 HERMIT']],
    ['10', 'WHEEL', ['WHEEL OF FORTUNE', 'THE WHEEL OF FORTUNE', 'WHEEL', 'X WHEEL', '10 WHEEL']],
    ['11', 'STRENGTH', ['STRENGTH', 'XI STRENGTH', '11 STRENGTH']],
    ['12', 'HANGED-MAN', ['HANGED MAN', 'THE HANGED MAN', 'HANGED-MAN', 'XII HANGED MAN', '12 HANGED MAN']],
    ['13', 'DEATH', ['DEATH', 'XIII DEATH', '13 DEATH']],
    ['14', 'TEMPERANCE', ['TEMPERANCE', 'XIV TEMPERANCE', '14 TEMPERANCE']],
    ['15', 'DEVIL', ['THE DEVIL', 'DEVIL', 'XV DEVIL', '15 DEVIL']],
    ['16', 'TOWER', ['THE TOWER', 'TOWER', 'XVI THE TOWER', '16 TOWER']],
    ['17', 'STAR', ['THE STAR', 'STAR', 'XVII STAR', '17 STAR']],
    ['18', 'MOON', ['THE MOON', 'MOON', 'XVIII MOON', '18 MOON']],
    ['19', 'SUN', ['THE SUN', 'SUN', 'XIX SUN', '19 SUN']],
    ['20', 'JUDGEMENT', ['JUDGEMENT', 'XX JUDGEMENT', '20 JUDGEMENT', 'AEON']],
    ['21', 'WORLD', ['THE WORLD', 'WORLD', 'XXI WORLD', '21 WORLD']]
  ];
  for (const [num, key, names] of data) {
    const id = `LA-${num}-${key}`;
    majors.push({ id, title: names[0] });
    const canonical = canonicalizeTarot(names[0]);
    variants.set(canonical, id);
    variants.set(canonicalizeTarot(key), id);
    variants.set(id, id);
    const roman = romanNumeral(num);
    variants.set(canonicalizeTarot(`${roman} ${key}`), id);
    variants.set(canonicalizeTarot(`${parseInt(num, 10)} ${key}`), id);
    for (const name of names) {
      variants.set(canonicalizeTarot(name), id);
    }
  }
  return { majors, variants };
}

function normalizeTarotLabel(label) {
  if (!label) return null;
  const normalized = canonicalizeTarot(label);
  return TAROT_MAJORS.variants.get(normalized) || (ID_PATTERNS.arcana.test(label) ? label : null);
}

function canonicalizeTarot(label) {
  return label.toUpperCase().replace(/[^A-Z0-9]+/g, ' ').trim();
}

function romanNumeral(num) {
  const value = Number(num);
  const numerals = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];
  let result = '';
  let remaining = value;
  for (const [roman, val] of numerals) {
    while (remaining >= val) {
      result += roman;
      remaining -= val;
    }
  }
  return result;
}

// -------------------- Watchers and Server --------------------

async function ensureWatchers() {
  if (appState.watchActive) return;
  appState.watchActive = true;
  if (!appState.watchHandles) appState.watchHandles = new Map();
  updateWatchers(appState.watchDirs || []);
}

function updateWatchers(directories) {
  if (!appState.watchActive) return;
  if (!appState.watchHandles) appState.watchHandles = new Map();
  const target = new Set((directories || []).map(dir => path.resolve(dir)));
  for (const dir of target) {
    if (appState.watchHandles.has(dir)) continue;
    try {
      const watcher = fs.watch(dir, { persistent: true }, (eventType, filename) => {
        if (!filename) return;
        const fullPath = path.join(dir, filename.toString());
        handleWatchEvent(fullPath);
      });
      watcher.on('error', () => {});
      appState.watchHandles.set(dir, watcher);
    } catch (error) {
      // Directory might not exist yet; ignore.
    }
  }
  for (const [dir, watcher] of appState.watchHandles.entries()) {
    if (!target.has(dir)) {
      watcher.close();
      appState.watchHandles.delete(dir);
    }
  }
}

function handleWatchEvent(file) {
  const now = Date.now();
  const codexPath = path.resolve(repoRoot, 'cathedral', 'dist', 'codex.json');
  if (path.resolve(file) === codexPath && now - appState.lastWriteTs < 1000) {
    return;
  }
  queueRebuild(file);
}

function queueRebuild(file) {
  const input = file ? relPath(file) : 'unknown';
  if (!appState.pendingInputs) appState.pendingInputs = new Set();
  appState.pendingInputs.add(input);
  if (appState.timer) clearTimeout(appState.timer);
  appState.timer = setTimeout(async () => {
    const inputs = Array.from(appState.pendingInputs || []);
    appState.pendingInputs = new Set();
    try {
      const result = await buildCodex({ reason: 'watch', inputs });
      printSummary(result);
    } catch (error) {
      console.error(error.message || error);
    }
  }, DEBOUNCE_MS);
}

async function startServer() {
  const port = Number.isFinite(cliArgs.port) ? cliArgs.port : 8080;
  const server = http.createServer(async (req, res) => {
    try {
      await handleRequest(req, res);
    } catch (error) {
      console.error('Server error', error);
      if (!res.headersSent) {
        sendJson(res, 500, { error: 'internal error' });
      } else {
        res.end();
      }
    }
  });
  await new Promise(resolve => server.listen(port, () => resolve()));
  console.log(`Cathedral server listening on http://localhost:${port}`);
}

async function handleRequest(req, res) {
  const method = (req.method || 'GET').toUpperCase();
  const urlObj = new URL(req.url || '/', 'http://localhost');
  const pathname = urlObj.pathname || '/';
  res.setHeader('X-Cathedral-Strict', envFlags.strict ? '1' : '0');

  if (method === 'GET' && pathname === '/v1/codex') {
    if (!appState.codex) {
      sendJson(res, 503, { error: 'codex unavailable' });
      return;
    }
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('ETag', appState.etag);
    sendJson(res, 200, appState.codex);
    return;
  }

  if (method === 'HEAD' && pathname === '/v1/codex') {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('ETag', appState.etag || '');
    res.statusCode = appState.codex ? 200 : 503;
    res.end();
    return;
  }

  if (method === 'GET' && pathname.startsWith('/v1/nodes/')) {
    const id = decodeURIComponent(pathname.slice('/v1/nodes/'.length));
    const node = appState.codex?.nodes.find(item => item.id === id);
    if (!node) {
      sendJson(res, 404, { error: 'not found' });
      return;
    }
    res.setHeader('Cache-Control', 'no-store');
    sendJson(res, 200, node);
    return;
  }

  if (method === 'GET' && pathname.startsWith('/v1/spine/')) {
    const id = decodeURIComponent(pathname.slice('/v1/spine/'.length));
    const spine = appState.codex?.spine.find(item => item.id === id);
    if (!spine) {
      sendJson(res, 404, { error: 'not found' });
      return;
    }
    res.setHeader('Cache-Control', 'no-store');
    sendJson(res, 200, spine);
    return;
  }

  if (method === 'GET' && pathname.startsWith('/v1/tarot/')) {
    const id = decodeURIComponent(pathname.slice('/v1/tarot/'.length));
    const tarot = appState.codex?.tarot[id];
    if (!tarot) {
      sendJson(res, 404, { error: 'not found' });
      return;
    }
    res.setHeader('Cache-Control', 'no-store');
    sendJson(res, 200, tarot);
    return;
  }

  if (method === 'GET' && pathname === '/events') {
    handleSse(req, res);
    return;
  }

  if (method === 'POST' && pathname === '/admin/refresh') {
    if (!authorizeAdmin(req, res)) return;
    try {
      const result = await buildCodex({ reason: 'admin-refresh', inputs: ['admin/refresh'] });
      printSummary(result);
      sendJson(res, 200, { ok: true, etag: appState.etag, counts: appState.counts });
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return;
  }

  if (method === 'POST' && pathname === '/admin/upsert-node') {
    if (!authorizeAdmin(req, res)) return;
    try {
      const body = sanitizeNodePayload(await readJsonBody(req));
      if (!body.id || !ID_PATTERNS.node.test(body.id)) {
        sendJson(res, 400, { error: 'invalid id' });
        return;
      }
      const before = appState.codex?.nodes.find(node => node.id === body.id) || null;
      const patchDir = path.resolve(repoRoot, 'cathedral', 'patches');
      await fsp.mkdir(patchDir, { recursive: true });
      const patchPath = path.join(patchDir, `${body.id}.json`);
      await fsp.writeFile(patchPath, `${JSON.stringify(body, null, 2)}\n`);
      const beforeHash = before ? sha256(JSON.stringify(before)) : null;
      const afterHash = sha256(JSON.stringify(body));
      appendLedger({ op: 'admin-upsert', id: body.id, before: beforeHash, after: afterHash });
      const result = await buildCodex({ reason: 'admin-upsert', inputs: ['admin/upsert-node'] });
      printSummary(result);
      sendJson(res, 200, { ok: true, etag: appState.etag, counts: appState.counts });
    } catch (error) {
      if (error.message === 'payload too large' || error.message === 'invalid json') {
        sendJson(res, 400, { error: error.message });
      } else {
        sendJson(res, 500, { error: error.message });
      }
    }
    return;
  }

  if (method === 'POST' && pathname === '/admin/archive') {
    if (!authorizeAdmin(req, res)) return;
    try {
      const body = await readJsonBody(req);
      const id = body?.id;
      if (!id || !ID_PATTERNS.node.test(id)) {
        sendJson(res, 400, { error: 'invalid id' });
        return;
      }
      const node = appState.codex?.nodes.find(item => item.id === id);
      if (!node) {
        sendJson(res, 404, { error: 'not found' });
        return;
      }
      const patchDir = path.resolve(repoRoot, 'cathedral', 'patches');
      await fsp.mkdir(patchDir, { recursive: true });
      const patchPath = path.join(patchDir, `${id}.json`);
      const patch = { id, status: 'archival' };
      await fsp.writeFile(patchPath, `${JSON.stringify(patch, null, 2)}\n`);
      appendLedger({ op: 'admin-archive', id, before: sha256(JSON.stringify(node)), after: sha256(JSON.stringify(patch)) });
      const result = await buildCodex({ reason: 'admin-archive', inputs: ['admin/archive'] });
      printSummary(result);
      sendJson(res, 200, { ok: true, etag: appState.etag, counts: appState.counts });
    } catch (error) {
      if (error.message === 'payload too large' || error.message === 'invalid json') {
        sendJson(res, 400, { error: error.message });
      } else {
        sendJson(res, 500, { error: error.message });
      }
    }
    return;
  }

  if (method === 'GET' || method === 'HEAD') {
    await serveStatic(req, res, pathname, method === 'HEAD');
    return;
  }

  sendJson(res, 404, { error: 'not found' });
}

function handleSse(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive'
  });
  const client = { res, timer: null };
  appState.sseClients.add(client);
  res.write(`data: ${JSON.stringify({ type: 'codex:ready', ts: new Date().toISOString(), etag: appState.etag })}\n\n`);
  client.timer = setInterval(() => {
    try {
      res.write(': keep-alive\n\n');
    } catch (error) {
      clearInterval(client.timer);
      appState.sseClients.delete(client);
    }
  }, SSE_KEEPALIVE_MS);
  req.on('close', () => {
    if (client.timer) clearInterval(client.timer);
    appState.sseClients.delete(client);
  });
}

function authorizeAdmin(req, res) {
  if (!envFlags.adminToken) {
    sendJson(res, 403, { error: 'admin disabled' });
    return false;
  }
  const header = req.headers['authorization'] || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  if (token !== envFlags.adminToken) {
    sendJson(res, 403, { error: 'forbidden' });
    return false;
  }
  const now = Date.now();
  appState.adminHits = appState.adminHits.filter(ts => now - ts < 60000);
  if (appState.adminHits.length >= ADMIN_LIMIT_PER_MIN) {
    sendJson(res, 429, { error: 'rate limited' });
    return false;
  }
  appState.adminHits.push(now);
  return true;
}

function sendJson(res, status, payload) {
  if (!res.headersSent) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
  }
  res.end(JSON.stringify(payload));
}

async function serveStatic(req, res, pathname, headOnly) {
  try {
    const decoded = decodeURIComponent(pathname || '/');
    let relative = decoded.replace(/^\/+/, '');
    if (!relative) relative = 'index.html';
    const normalized = path.normalize(relative);
    let filePath = path.resolve(repoRoot, normalized);
    if (!filePath.startsWith(repoRoot)) {
      sendJson(res, 404, { error: 'not found' });
      return;
    }
    let stats = await fsp.stat(filePath).catch(() => null);
    if (!stats || stats.isDirectory()) {
      filePath = path.resolve(repoRoot, 'index.html');
      stats = await fsp.stat(filePath).catch(() => null);
      if (!stats) {
        sendJson(res, 404, { error: 'not found' });
        return;
      }
    }
    const contentType = getContentType(filePath);
    res.setHeader('Content-Type', contentType);
    const relativePath = path.relative(repoRoot, filePath);
    if (relativePath.startsWith(`cathedral${path.sep}dist${path.sep}`)) {
      res.setHeader('Cache-Control', 'no-store');
    } else if (/\.[0-9a-f]{8}\./i.test(path.basename(filePath))) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    if (headOnly) {
      res.statusCode = 200;
      res.end();
      return;
    }
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) res.statusCode = 500;
      res.end();
    });
    stream.pipe(res);
  } catch (error) {
    sendJson(res, 500, { error: 'internal error' });
  }
}

async function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let total = 0;
    let data = '';
    req.on('data', chunk => {
      total += chunk.length;
      if (total > ADMIN_BODY_MAX_BYTES) {
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.mjs': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.txt': return 'text/plain; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

function sanitizeNodePayload(body) {
  const clone = structuredClone(body);
  if (typeof clone.lore_md === 'string') {
    clone.lore_md = stripHtml(clone.lore_md);
  }
  if (clone.layers && clone.layers.safety) {
    const { strobe, autoplay } = clone.layers.safety;
    if (strobe === true || autoplay === true) {
      const err = new Error('ND-safety violation in admin payload');
      err.code = 64;
      throw err;
    }
  }
  return clone;
}

function stripHtml(text) {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
}

function broadcastUpdate(etag) {
  const payload = `data: ${JSON.stringify({ type: 'codex:update', ts: new Date().toISOString(), etag })}\n\n`;
  for (const client of appState.sseClients) {
    try {
      client.res.write(payload);
    } catch (error) {
      if (client.timer) clearInterval(client.timer);
      appState.sseClients.delete(client);
    }
  }
}

// -------------------- Utility Helpers --------------------

function structuredClone(value) {
  return JSON.parse(JSON.stringify(value));
}

