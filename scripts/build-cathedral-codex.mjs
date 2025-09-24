import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

// build-cathedral-codex.mjs
// Offline-first compiler that merges cathedral data sources into a live bundle.
// The script honours ND-safe requirements: deterministic output, no animation hooks,
// and explicit guards against unsafe layers. Every helper is a small pure function
// returning new structures so the merge remains predictable when edited offline.

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const OUTPUT_DIR = path.join(ROOT, "cathedral", "dist");
const SOURCES_DIR = path.join(ROOT, "cathedral", "sources", "refs");
const BUNDLE_PATH = path.join(OUTPUT_DIR, "codex.json");
const PALETTE_PATH = path.join(OUTPUT_DIR, "palette.json");
const IDS_PATH = path.join(ROOT, "tesseract-bridge", "registry", "ids.json");
const EVENTS_PATH = path.join(ROOT, "tesseract-bridge", "events", "queue.ndjson");

const CANON = Object.freeze({
  node: /^C144N-(\d{3})$/,
  arcana: /^LA-(\d{2})-[A-Z0-9-]+$/,
  shem: /^SHEM-(\d{2})$/,
  spine: /^SPINE-(\d{2})$/,
  realm: /^R-[a-z0-9-]+$/,
  hall: /^H-[a-z0-9-]+$/,
  art: /^ART-[a-z0-9-]+$/
});

const ARCANA_CANON = Object.freeze([
  { id: "LA-00-FOOL", name: "The Fool" },
  { id: "LA-01-MAGICIAN", name: "The Magician" },
  { id: "LA-02-PRIESTESS", name: "The High Priestess" },
  { id: "LA-03-EMPRESS", name: "The Empress" },
  { id: "LA-04-EMPEROR", name: "The Emperor" },
  { id: "LA-05-HIEROPHANT", name: "The Hierophant" },
  { id: "LA-06-LOVERS", name: "The Lovers" },
  { id: "LA-07-CHARIOT", name: "The Chariot" },
  { id: "LA-08-STRENGTH", name: "Strength" },
  { id: "LA-09-HERMIT", name: "The Hermit" },
  { id: "LA-10-WHEEL", name: "Wheel of Fortune" },
  { id: "LA-11-JUSTICE", name: "Justice" },
  { id: "LA-12-HANGED", name: "The Hanged One" },
  { id: "LA-13-DEATH", name: "Death" },
  { id: "LA-14-TEMPERANCE", name: "Temperance" },
  { id: "LA-15-DEVIL", name: "The Devil" },
  { id: "LA-16-TOWER", name: "The Tower" },
  { id: "LA-17-STAR", name: "The Star" },
  { id: "LA-18-MOON", name: "The Moon" },
  { id: "LA-19-SUN", name: "The Sun" },
  { id: "LA-20-JUDGEMENT", name: "Judgement" },
  { id: "LA-21-WORLD", name: "The World" }
]);

const DEFAULT_META = Object.freeze({
  name: "Cosmic Cathedral Codex",
  edition: "living-scroll",
  nd_safe: { strobe: false, autoplay: false, motion: "calm" }
});

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJsonIfExists(target) {
  try {
    const data = await fs.readFile(target, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function readTextIfExists(target) {
  try {
    return await fs.readFile(target, "utf8");
  } catch (error) {
    return "";
  }
}

function slugify(value) {
  if (!value) {
    return "";
  }
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, 6);
}

function sandboxIdFromName(name, takenIds) {
  const baseHash = shortHash(name || "untitled");
  let offset = 0;
  while (offset < 1000) {
    const slice = baseHash.slice(offset, offset + 3) || baseHash;
    const numeric = 900 + (parseInt(slice, 16) % 100);
    const candidate = `C144N-${String(numeric).padStart(3, "0")}`;
    if (!takenIds.has(candidate)) {
      return candidate;
    }
    offset += 1;
  }
  // Fallback: deterministic yet outside canonical sandbox range; still flagged draft.
  let fallback = 900;
  while (takenIds.has(`C144N-${String(fallback).padStart(3, "0")}`)) {
    fallback = (fallback + 1) % 1000;
  }
  return `C144N-${String(fallback).padStart(3, "0")}`;
}

function normaliseTarotId(raw) {
  if (!raw) {
    return null;
  }
  const value = String(raw).trim();
  if (CANON.arcana.test(value)) {
    return value.toUpperCase();
  }
  const romanMap = new Map([
    ["0", "00"],
    ["i", "01"],
    ["ii", "02"],
    ["iii", "03"],
    ["iv", "04"],
    ["v", "05"],
    ["vi", "06"],
    ["vii", "07"],
    ["viii", "08"],
    ["ix", "09"],
    ["x", "10"],
    ["xi", "11"],
    ["xii", "12"],
    ["xiii", "13"],
    ["xiv", "14"],
    ["xv", "15"],
    ["xvi", "16"],
    ["xvii", "17"],
    ["xviii", "18"],
    ["xix", "19"],
    ["xx", "20"],
    ["xxi", "21"]
  ]);
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const arcana of ARCANA_CANON) {
    const suffix = arcana.name.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").trim();
    const roman = arcana.id.slice(3, 5);
    if (cleaned === suffix || cleaned.endsWith(suffix)) {
      return arcana.id;
    }
    const romanKey = romanMap.get(cleaned);
    if (romanKey && romanKey === roman) {
      return arcana.id;
    }
    const romanAlt = romanMap.get(cleaned.split(" ")[0]);
    if (romanAlt && romanAlt === roman) {
      return arcana.id;
    }
  }
  return null;
}

function normaliseShemId(raw) {
  if (!raw) {
    return null;
  }
  const value = String(raw).trim().toUpperCase();
  if (CANON.shem.test(value)) {
    return value;
  }
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length) {
    return `SHEM-${digits.padStart(2, "0")}`;
  }
  return null;
}

function normaliseRealmId(raw) {
  if (!raw) {
    return null;
  }
  const slug = slugify(raw);
  if (!slug) {
    return null;
  }
  return `R-${slug}`;
}

function normaliseHallId(raw) {
  if (!raw) {
    return null;
  }
  const slug = slugify(raw);
  if (!slug) {
    return null;
  }
  const candidate = slug.startsWith("h-") ? slug : `h-${slug}`;
  return `H-${candidate.slice(2)}`;
}

function normaliseArtKey(raw) {
  if (!raw) {
    return null;
  }
  const slug = slugify(raw);
  if (!slug) {
    return null;
  }
  return `ART-${slug}`;
}

function uniqueSorted(list) {
  return Array.from(new Set(list)).sort();
}

function mergeStringArrays(left = [], right = []) {
  const merged = [...(left || []), ...(right || [])].filter((value) => typeof value === "string");
  return uniqueSorted(merged);
}

function choosePreferredNode(left, right) {
  if (!left) {
    return right;
  }
  if (!right) {
    return left;
  }
  const score = (node) => {
    if (!node) {
      return 0;
    }
    let points = 0;
    if (node.name) points += 2;
    if (node.kind && node.kind !== "mystery") points += 1;
    if (node.status && node.status !== "draft") points += 1;
    if (node.lore_md) points += Math.min(4, node.lore_md.length / 120);
    if (Array.isArray(node.sources) && node.sources.length) points += 2;
    if (Array.isArray(node.lineages) && node.lineages.length) points += 1;
    if (Array.isArray(node.roles) && node.roles.length) points += 1;
    if (Array.isArray(node.art) && node.art.length) points += 1;
    return points;
  };
  return score(right) > score(left) ? right : left;
}

function mergeSources(left = [], right = []) {
  const all = [...(left || []), ...(right || [])].filter(Boolean);
  const byKey = new Map();
  for (const item of all) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const id = String(item.id || item.work || item.ref || shortHash(JSON.stringify(item)));
    if (!byKey.has(id)) {
      byKey.set(id, {
        id,
        work: item.work || "",
        ref: item.ref || ""
      });
    } else {
      const current = byKey.get(id);
      current.work = current.work || item.work || "";
      current.ref = current.ref || item.ref || "";
    }
  }
  return Array.from(byKey.values()).sort((a, b) => a.id.localeCompare(b.id));
}

function ensureLayerShape(layers = {}) {
  const safeLayers = { ...layers };
  const currentSafety = { ...(safeLayers.safety || {}) };
  if (currentSafety.strobe === true || currentSafety.autoplay === true) {
    throw new Error("Unsafe layer detected: strobe/autoplay must never be true.");
  }
  safeLayers.safety = {
    strobe: false,
    autoplay: false,
    motion: typeof currentSafety.motion === "string" ? currentSafety.motion : "calm"
  };
  if (!Array.isArray(safeLayers.study_seed)) {
    safeLayers.study_seed = [];
  }
  return safeLayers;
}

function dedupeNamedEntries(entries = []) {
  const byName = new Map();
  for (const entry of entries) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const key = String(entry.name || "").trim().toLowerCase();
    if (!key) {
      continue;
    }
    if (!byName.has(key)) {
      byName.set(key, { ...entry });
    } else {
      const current = byName.get(key);
      const notes = mergeStringArrays(current.notes, entry.notes);
      const citations = mergeStringArrays(current.citations, entry.citations);
      byName.set(key, { ...current, ...entry, notes, citations });
    }
  }
  return Array.from(byName.values());
}

function normaliseNode(raw, context) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const name = String(raw.name || raw.title || raw.label || "").trim();
  let id = typeof raw.id === "string" ? raw.id.trim() : "";
  const taken = context.takenIds;
  const sandboxAssignments = context.sandboxAssignments;
  if (!CANON.node.test(id)) {
    if (name) {
      id = sandboxIdFromName(name, taken);
      sandboxAssignments.push({ id, name });
    } else {
      id = sandboxIdFromName(shortHash(JSON.stringify(raw)), taken);
      sandboxAssignments.push({ id, name: "unnamed" });
    }
  }
  id = id.toUpperCase();
  if (taken.has(id)) {
    context.dedupes += 1;
  }
  taken.add(id);

  const numerology = Number(id.slice(-3));
  const tarotOverlays = mergeStringArrays([], (raw.tarot_overlays || raw.tarot || [])
    .map((entry) => normaliseTarotId(entry))
    .filter(Boolean));
  const shem = mergeStringArrays([], (raw.shem || raw.angels || [])
    .map((entry) => normaliseShemId(entry))
    .filter(Boolean));
  const lineages = mergeStringArrays([], raw.lineages);
  const roles = mergeStringArrays([], raw.roles);
  const lore = typeof raw.lore_md === "string" ? raw.lore_md : typeof raw.lore === "string" ? raw.lore : "";
  const sources = mergeSources(raw.sources, raw.references);
  const art = mergeStringArrays([], (raw.art || raw.artifacts || [])
    .map((entry) => normaliseArtKey(entry))
    .filter(Boolean));

  const baseStatus = typeof raw.status === "string" ? raw.status : "draft";
  const archivalTokens = new Set(["LUXCRUX", "GNOSA", "AKA DUA", "AKA-DUA"]);
  let status = baseStatus;
  if (archivalTokens.has(name.toUpperCase()) || archivalTokens.has(String(raw.id || "").toUpperCase())) {
    status = "archival";
    context.archivals += 1;
  }

  const layers = ensureLayerShape(raw.layers);
  if (Array.isArray(raw.fusionists)) {
    layers.fusionists = dedupeNamedEntries(raw.fusionists);
  }
  if (Array.isArray(raw.influences)) {
    layers.influences = dedupeNamedEntries(raw.influences);
  }

  return {
    id,
    name: name || id,
    kind: typeof raw.kind === "string" ? raw.kind : "mystery",
    status,
    tarot_overlays: tarotOverlays,
    shem,
    numerology,
    lineages,
    roles,
    lore_md: lore,
    sources,
    layers,
    art
  };
}

function mergeNode(existing, incoming) {
  if (!existing) {
    return incoming;
  }
  if (!incoming) {
    return existing;
  }
  const preferred = choosePreferredNode(existing, incoming);
  const secondary = preferred === existing ? incoming : existing;

  const merged = { ...preferred };
  merged.name = preferred.name || secondary.name || preferred.id;
  merged.kind = preferred.kind !== "mystery" ? preferred.kind : secondary.kind;
  merged.status = preferred.status === "archival" || secondary.status === "archival" ? "archival" : preferred.status;
  merged.tarot_overlays = mergeStringArrays(preferred.tarot_overlays, secondary.tarot_overlays);
  merged.shem = mergeStringArrays(preferred.shem, secondary.shem);
  merged.numerology = preferred.numerology || secondary.numerology;
  merged.lineages = mergeStringArrays(preferred.lineages, secondary.lineages);
  merged.roles = mergeStringArrays(preferred.roles, secondary.roles);
  merged.lore_md = preferred.lore_md && preferred.lore_md.length >= secondary.lore_md.length ? preferred.lore_md : secondary.lore_md;
  merged.sources = mergeSources(preferred.sources, secondary.sources);
  merged.layers = ensureLayerShape({ ...secondary.layers, ...preferred.layers });
  merged.art = mergeStringArrays(preferred.art, secondary.art);
  if (secondary.layers && Array.isArray(secondary.layers.study_seed)) {
    merged.layers.study_seed = uniqueSorted([...(merged.layers.study_seed || []), ...secondary.layers.study_seed]);
  }
  if (preferred.layers && Array.isArray(preferred.layers.study_seed)) {
    merged.layers.study_seed = uniqueSorted([...(merged.layers.study_seed || []), ...preferred.layers.study_seed]);
  }
  if (secondary.layers && Array.isArray(secondary.layers.fusionists)) {
    merged.layers.fusionists = dedupeNamedEntries([...(merged.layers.fusionists || []), ...secondary.layers.fusionists]);
  }
  if (preferred.layers && Array.isArray(preferred.layers.fusionists)) {
    merged.layers.fusionists = dedupeNamedEntries([...(merged.layers.fusionists || []), ...preferred.layers.fusionists]);
  }
  if (secondary.layers && Array.isArray(secondary.layers.influences)) {
    merged.layers.influences = dedupeNamedEntries([...(merged.layers.influences || []), ...secondary.layers.influences]);
  }
  if (preferred.layers && Array.isArray(preferred.layers.influences)) {
    merged.layers.influences = dedupeNamedEntries([...(merged.layers.influences || []), ...preferred.layers.influences]);
  }
  return merged;
}

function parseBibliography(markdown) {
  const lines = markdown.split(/\r?\n/);
  const nodeSeeds = new Map();
  const pdfRefs = new Set();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    const pdfMatch = trimmed.match(/([A-Za-z0-9_\-/]+\.pdf)/);
    if (pdfMatch) {
      pdfRefs.add(pdfMatch[1]);
    }
    const nodeMatch = trimmed.match(/(C144N-\d{3})/g);
    if (nodeMatch) {
      const id = `study-${shortHash(trimmed)}`;
      const entry = { id, note: trimmed };
      for (const nodeId of nodeMatch) {
        const existing = nodeSeeds.get(nodeId) || [];
        if (!existing.some((item) => item.id === id)) {
          existing.push(entry);
          nodeSeeds.set(nodeId, existing);
        }
      }
    }
  }
  return { nodeSeeds, pdfRefs };
}

async function emitPdfReferences(pdfRefs) {
  if (!pdfRefs.size) {
    return [];
  }
  await ensureDir(SOURCES_DIR);
  const emitted = [];
  for (const ref of pdfRefs) {
    const slug = slugify(ref.replace(/\.pdf$/i, "")) || shortHash(ref);
    const id = `ref-${slug}`;
    const payload = {
      id,
      type: "report",
      title: ref.replace(/_/g, " "),
      author: [],
      issued: null,
      file: ref,
      notes: "Auto-generated placeholder; enrich metadata offline."
    };
    const target = path.join(SOURCES_DIR, `${id}.json`);
    await fs.writeFile(target, JSON.stringify(payload, null, 2), "utf8");
    emitted.push(id);
  }
  return emitted;
}

function applyStudySeeds(nodes, seedsMap) {
  if (!seedsMap || !seedsMap.size) {
    return nodes;
  }
  const byId = new Map(nodes.map((node) => [node.id, node]));
  for (const [nodeId, seeds] of seedsMap.entries()) {
    const node = byId.get(nodeId.toUpperCase());
    if (!node) {
      continue;
    }
    const map = new Map();
    for (const existing of node.layers.study_seed || []) {
      if (existing && typeof existing === "object" && existing.id) {
        map.set(existing.id, existing);
      } else if (typeof existing === "string") {
        map.set(existing, { id: existing, note: "" });
      }
    }
    for (const seed of seeds) {
      if (!seed || typeof seed !== "object") {
        continue;
      }
      map.set(seed.id, seed);
    }
    node.layers.study_seed = Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id));
  }
  return Array.from(byId.values());
}

async function loadCoreNodes(context) {
  const target = path.join(ROOT, "core_node_map.json");
  const payload = await readJsonIfExists(target);
  if (!payload) {
    return [];
  }
  const entries = Array.isArray(payload)
    ? payload
    : Array.isArray(payload.nodes)
      ? payload.nodes
      : Object.values(payload);
  const nodes = [];
  for (const entry of entries) {
    const node = normaliseNode(entry, context);
    if (node) {
      nodes.push(node);
    }
  }
  return nodes;
}

async function loadLiberArcanae() {
  const target = path.join(ROOT, "liber_arcanae.json");
  const payload = await readJsonIfExists(target);
  if (!payload) {
    return { palette: null, arcana: [], lineages: {}, themes: {} };
  }
  const arcana = Array.isArray(payload.arcana) ? payload.arcana : [];
  const lineages = payload.lineages && typeof payload.lineages === "object" ? payload.lineages : {};
  const themes = payload.themes && typeof payload.themes === "object" ? payload.themes : {};
  const palette = payload.palette && typeof payload.palette === "object" ? payload.palette : null;
  return { palette, arcana, lineages, themes };
}

async function loadSpineAtlases(context) {
  const baseDir = path.join(ROOT, "circuitum99", "spine");
  try {
    const folders = await fs.readdir(baseDir, { withFileTypes: true });
    const entries = [];
    for (const dirent of folders) {
      if (!dirent.isDirectory() || !/^SPINE-/.test(dirent.name)) {
        continue;
      }
      const atlasPath = path.join(baseDir, dirent.name, "atlas.json");
      const atlas = await readJsonIfExists(atlasPath);
      if (!atlas) {
        continue;
      }
      const id = typeof atlas.id === "string" && CANON.spine.test(atlas.id.toUpperCase())
        ? atlas.id.toUpperCase()
        : dirent.name.toUpperCase();
      const nodeId = atlas.node ? String(atlas.node).toUpperCase() : atlas.node_id ? String(atlas.node_id).toUpperCase() : "";
      if (nodeId && !CANON.node.test(nodeId)) {
        throw new Error(`Spine ${id} references invalid node id ${nodeId}`);
      }
      const tarot = normaliseTarotId(atlas.tarot || atlas.arcana);
      const angels = mergeStringArrays([], (atlas.angels || atlas.shem || [])
        .map((entry) => normaliseShemId(entry))
        .filter(Boolean));
      const realm = normaliseRealmId(atlas.realm);
      const status = typeof atlas.status === "string" ? atlas.status : "draft";
      entries.push({
        id,
        title: atlas.title || dirent.name,
        node: nodeId || null,
        tarot,
        angels,
        realm,
        doc: atlas.doc || atlas.document || null,
        status
      });
    }
    return entries.sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function parseOctagramHalls(markdown) {
  if (!markdown) {
    return [];
  }
  const lines = markdown.split(/\r?\n/);
  const halls = [];
  let current = null;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    const headerMatch = line.match(/^##\s+([^#]+)/);
    if (headerMatch) {
      if (current) {
        halls.push(current);
      }
      const titleRaw = headerMatch[1].trim();
      const parts = titleRaw.split(/\s+-\s+/);
      const id = normaliseHallId(parts[0]);
      current = {
        id: id || normaliseHallId(slugify(titleRaw) || `hall-${halls.length + 1}`),
        title: parts.slice(1).join(" - ") || titleRaw,
        trial: "",
        tasks: [],
        gift: "",
        tarot_overlays: []
      };
      continue;
    }
    if (!current) {
      continue;
    }
    if (/^Trial:/i.test(line)) {
      current.trial = line.replace(/^Trial:/i, "").trim();
      const tarot = normaliseTarotId(current.trial);
      if (tarot) {
        current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
      }
      continue;
    }
    if (/^Gift:/i.test(line)) {
      current.gift = line.replace(/^Gift:/i, "").trim();
      const tarot = normaliseTarotId(current.gift);
      if (tarot) {
        current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
      }
      continue;
    }
    if (/^-\s+/.test(line)) {
      const task = line.replace(/^-\s+/, "").trim();
      current.tasks.push(task);
      const tarot = normaliseTarotId(task);
      if (tarot) {
        current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
      }
      continue;
    }
    const tarot = normaliseTarotId(line);
    if (tarot) {
      current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
    }
  }
  if (current) {
    halls.push(current);
  }
  return halls.sort((a, b) => a.id.localeCompare(b.id));
}

function parseUiFlow(markdown) {
  if (!markdown) {
    return [];
  }
  const lines = markdown.split(/\r?\n/);
  const flow = [];
  let current = null;
  let index = 0;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    if (/^#+\s+/.test(line)) {
      if (current) {
        flow.push(current);
      }
      index += 1;
      const title = line.replace(/^#+\s+/, "").trim();
      current = {
        id: `flow-${String(index).padStart(2, "0")}`,
        title,
        notes: [],
        tarot_overlays: []
      };
      const tarot = normaliseTarotId(title);
      if (tarot) {
        current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
      }
      continue;
    }
    if (!current) {
      continue;
    }
    current.notes.push(line);
    const tarot = normaliseTarotId(line);
    if (tarot) {
      current.tarot_overlays = uniqueSorted([...current.tarot_overlays, tarot]);
    }
  }
  if (current) {
    flow.push(current);
  }
  return flow;
}

function buildThemes(liberThemes = {}) {
  const defaults = {
    circuitum: {
      palette: "black-gold",
      tokens: { background: "#050505", foreground: "#f5f0d0", accent: "#d4af37" }
    },
    codex: {
      palette: "parchment",
      tokens: { background: "#f6f1e1", foreground: "#1c130b", accent: "#8b5e34" }
    },
    cathedral: {
      palette: "neon-glyphs",
      tokens: { background: "#0b0b12", foreground: "#e8e8f0", accent: "#9f7bff" }
    }
  };
  return {
    circuitum: { ...defaults.circuitum, ...(liberThemes.circuitum || {}) },
    codex: { ...defaults.codex, ...(liberThemes.codex || {}) },
    cathedral: { ...defaults.cathedral, ...(liberThemes.cathedral || {}) }
  };
}

function buildTarotEntries(liberArcana = []) {
  const byId = new Map();
  for (const arcana of liberArcana) {
    if (!arcana || typeof arcana !== "object") {
      continue;
    }
    const id = normaliseTarotId(arcana.id || arcana.code || arcana.name);
    if (!id) {
      continue;
    }
    byId.set(id, {
      id,
      name: arcana.name || ARCANA_CANON.find((entry) => entry.id === id)?.name || id,
      status: arcana.status || "available",
      lore: arcana.lore || arcana.description || ""
    });
  }
  const result = {};
  for (const arcana of ARCANA_CANON) {
    if (byId.has(arcana.id)) {
      const entry = byId.get(arcana.id);
      result[arcana.id] = {
        ...entry,
        status: entry.status || "available"
      };
    } else {
      result[arcana.id] = {
        id: arcana.id,
        name: arcana.name,
        status: "missing",
        lore: ""
      };
    }
  }
  return result;
}

function buildPalette(liberPalette, priorPalette) {
  if (liberPalette) {
    return liberPalette;
  }
  return priorPalette || {
    bg: "#0b0b12",
    ink: "#e8e8f0",
    layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
  };
}

async function readPriorPalette() {
  const palette = await readJsonIfExists(PALETTE_PATH);
  if (palette) {
    return palette;
  }
  const fallback = await readJsonIfExists(path.join(ROOT, "data", "palette.json"));
  return fallback;
}

function validateIds(bundle) {
  const seenNodes = new Set();
  for (const node of bundle.nodes) {
    if (!CANON.node.test(node.id)) {
      throw new Error(`Invalid node id: ${node.id}`);
    }
    if (seenNodes.has(node.id)) {
      throw new Error(`Duplicate node id detected: ${node.id}`);
    }
    seenNodes.add(node.id);
    for (const tarot of node.tarot_overlays) {
      if (!CANON.arcana.test(tarot)) {
        throw new Error(`Node ${node.id} references invalid tarot id ${tarot}`);
      }
    }
    for (const angel of node.shem) {
      if (!CANON.shem.test(angel)) {
        throw new Error(`Node ${node.id} references invalid angel id ${angel}`);
      }
    }
    if (node.layers && node.layers.safety && (node.layers.safety.strobe === true || node.layers.safety.autoplay === true)) {
      throw new Error(`Node ${node.id} has unsafe safety flags.`);
    }
  }
  for (const hall of bundle.halls) {
    if (!CANON.hall.test(hall.id)) {
      throw new Error(`Invalid hall id: ${hall.id}`);
    }
    hall.tarot_overlays.forEach((tarot) => {
      if (!CANON.arcana.test(tarot)) {
        throw new Error(`Hall ${hall.id} references invalid tarot id ${tarot}`);
      }
    });
  }
  for (const spine of bundle.spine) {
    if (!CANON.spine.test(spine.id)) {
      throw new Error(`Invalid spine id: ${spine.id}`);
    }
    if (spine.node && !CANON.node.test(spine.node)) {
      throw new Error(`Spine ${spine.id} references invalid node ${spine.node}`);
    }
    if (spine.tarot && !CANON.arcana.test(spine.tarot)) {
      throw new Error(`Spine ${spine.id} references invalid tarot ${spine.tarot}`);
    }
    spine.angels.forEach((angel) => {
      if (!CANON.shem.test(angel)) {
        throw new Error(`Spine ${spine.id} references invalid angel ${angel}`);
      }
    });
    if (spine.realm && !CANON.realm.test(spine.realm)) {
      throw new Error(`Spine ${spine.id} references invalid realm ${spine.realm}`);
    }
  }
}

async function writeJson(target, data) {
  await ensureDir(path.dirname(target));
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(target, payload + "\n", "utf8");
}

function collectIdsIndex(nodes, tarot, angels) {
  return {
    nodes: nodes.map((node) => node.id).sort(),
    arcana: ARCANA_CANON.map((arcana) => arcana.id),
    shem: Array.from(new Set(angels)).sort()
  };
}

async function appendSyncEvent() {
  await ensureDir(path.dirname(EVENTS_PATH));
  const payload = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    type: "SYNC_NODE",
    source: "cosmogenesis-learning-engine",
    targets: [
      "magical-mystery-house",
      "circuitum99",
      "liber-arcanae",
      "liber-arcanae-game",
      "codex-14499"
    ],
    payload_ref: "cosmogenesis-learning-engine/dist/codex.json",
    status: "pending"
  };
  await fs.appendFile(EVENTS_PATH, JSON.stringify(payload) + "\n", "utf8");
}

function compileReport(bundle, context, pdfRefs) {
  const nodeCount = bundle.nodes.length;
  const spineCount = bundle.spine.length;
  const hallCount = bundle.halls.length;
  const archiveMoves = context.archivals;
  const dedupes = context.dedupes;
  const sandboxList = context.sandboxAssignments.map((entry) => `${entry.id}:${entry.name}`).join(", ");
  const lines = [
    `nodes:${nodeCount} spine:${spineCount} halls:${hallCount}`,
    `archival moves:${archiveMoves}`,
    `deduplications:${dedupes}`,
    `sandbox ids:${sandboxList || "none"}`
  ];
  if (pdfRefs.length) {
    lines.push(`pdf refs:${pdfRefs.join(", ")}`);
  }
  return lines.join("\n");
}

async function main() {
  const context = {
    takenIds: new Set(),
    sandboxAssignments: [],
    archivals: 0,
    dedupes: 0
  };

  const [coreNodes, liber, bibliographyText, hallsText, flowText, spineEntries, priorPalette] = await Promise.all([
    loadCoreNodes(context),
    loadLiberArcanae(),
    readTextIfExists(path.join(ROOT, "Codex 144:99 Bibliography Scroll.md")),
    readTextIfExists(path.join(ROOT, "octagram_halls.md")),
    readTextIfExists(path.join(ROOT, "ui_flow.md")),
    loadSpineAtlases(context),
    readPriorPalette()
  ]);

  const bibliography = parseBibliography(bibliographyText);
  const pdfRefs = await emitPdfReferences(bibliography.pdfRefs);

  const nodesById = new Map();
  for (const node of coreNodes) {
    const existing = nodesById.get(node.id);
    nodesById.set(node.id, mergeNode(existing, node));
  }

  const nodes = applyStudySeeds(Array.from(nodesById.values()), bibliography.nodeSeeds).sort((a, b) => a.id.localeCompare(b.id));

  const palette = buildPalette(liber.palette, priorPalette);
  const themes = buildThemes(liber.themes);
  const tarot = buildTarotEntries(liber.arcana);
  const halls = parseOctagramHalls(hallsText);
  const flow = parseUiFlow(flowText);
  const lineages = liber.lineages || {};
  const angels = nodes.flatMap((node) => node.shem);

  const bundle = {
    meta: {
      ...DEFAULT_META,
      generated_at: new Date().toISOString(),
      nd_safe: { ...DEFAULT_META.nd_safe }
    },
    palette,
    nodes,
    spine: spineEntries,
    halls,
    flow,
    themes,
    tarot,
    lineages
  };

  validateIds(bundle);

  await ensureDir(OUTPUT_DIR);
  await writeJson(BUNDLE_PATH, bundle);
  await writeJson(PALETTE_PATH, palette);
  await writeJson(IDS_PATH, collectIdsIndex(nodes, tarot, angels));
  await appendSyncEvent();

  console.log(compileReport(bundle, context, pdfRefs));
}

main().catch((error) => {
  console.error("Cathedral bundle build failed:", error);
  process.exitCode = 1;
});
