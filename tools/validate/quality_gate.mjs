d#!/usr/bin/env node
/**
 * Quality Gate (Lite)
 * - Verifies codex-144-expanded.json contains exactly 144 nodes
 * - Ensures MAGNUM_OPUS_VERSION exists and is semver-like
 * - Confirms provenance scaffolding exists
 *
 * Exits with non-zero on failure.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let ok = true;

function fail(msg) {
  console.error(`❌ ${msg}`);
  ok = false;
}
function pass(msg) {
  console.log(`✅ ${msg}`);
}

// 1) Codex integrity
try {
  const codexPath = path.resolve(root, 'codex-144-expanded.json');
  const raw = fs.readFileSync(codexPath, 'utf-8');
  const data = JSON.parse(raw);
  const nodes = Array.isArray(data) ? data : Array.isArray(data.nodes) ? data.nodes : [];
  if (nodes.length === 144) {
    pass('codex-144-expanded.json has exactly 144 nodes');
  } else {
    fail(`codex-144-expanded.json node count expected 144, got ${nodes.length}`);
  }
} catch (e) {
  fail(`Unable to read/parse codex-144-expanded.json: ${e}`);
}

// 2) MAGNUM_OPUS_VERSION present and semver-ish
try {
  const ver = fs.readFileSync(path.resolve(root, 'MAGNUM_OPUS_VERSION'), 'utf-8').trim();
  if (/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(ver)) {
    pass(`MAGNUM_OPUS_VERSION present (${ver})`);
  } else {
    fail(`MAGNUM_OPUS_VERSION not semver-like: '${ver}'`);
  }
} catch (e) {
  fail(`MAGNUM_OPUS_VERSION missing: ${e}`);
}

// 3) Provenance scaffolding
const provFiles = [
  'external/PROVENANCE.md',
  'external/import_map.json',
  'tools/external/ingest_external_sources.py',
];
for (const rel of provFiles) {
  const p = path.resolve(root, rel);
  if (fs.existsSync(p)) {
    pass(`Provenance artifact found: ${rel}`);
  } else {
    fail(`Missing provenance artifact: ${rel}`);
  }
}

if (!ok) process.exit(1);
console.log('✨ Quality Gate (Lite) passed');
