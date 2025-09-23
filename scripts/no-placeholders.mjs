#!/usr/bin/env node
/*
  Integrity gate: fail if placeholder text slips into the repository.
  This keeps the Cathedral canon deterministic and museum-grade.
*/

import { readdir, readFile } from 'fs/promises';
import path from 'path';

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.turbo'
]);

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\bFIXME\b/i,
  /PLACEHOLDER(?![a-z])/,
  /lorem ipsum/i
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile()) {
      if (entry.name === 'no-placeholders.mjs' && path.basename(dir) === 'scripts') {
        continue;
      }
      files.push(fullPath);
    }
  }
  return files;
}

async function run() {
  const root = process.cwd();
  const files = await walk(root);
  const failures = [];

  for (const filePath of files) {
    const buffer = await readFile(filePath, 'utf8');
    for (const pattern of PLACEHOLDER_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(buffer)) {
        failures.push({ filePath, pattern: pattern.source });
        break;
      }
    }
  }

  if (failures.length > 0) {
    console.error('Placeholder text detected:');
    for (const failure of failures) {
      console.error(` - ${failure.filePath} (pattern /${failure.pattern}/)`);
    }
    process.exit(1);
  }

  console.log('Integrity check passed: no placeholders detected.');
}

run().catch((error) => {
  console.error('Integrity check failed to run:', error);
  process.exit(1);
});
// Cathedral Integrity Gate — blocks fake/placeholder content.
// Run manually before committing: `node scripts/no-placeholders.mjs`
import fs from 'fs'; import path from 'path';
const ROOT = process.cwd();

const BLOCK_PATTERNS = [
  /\bplaceholder\b/i, /\bexample\b/i, /\bsample\b/i, /\blorem\b/i,
  /\bfoo\b|\bbar\b|\bbaz\b/i,
  /"reflectance"\s*:\s*\[\s*0(\.0+)?\s*(,\s*0(\.0+)?)*\s*\]/i, // obviously fake spectra
  /"vertices"\s*:\s*\[\s*\]/i, /"faces"\s*:\s*\[\s*\]/i,       // empty mesh
  /"id"\s*:\s*"C144N-000"/i,                                    // non-canon id
  /"sealed"\s*:\s*null/i
];

const ALLOWED_TOP = new Set([
  'apps','packages','scripts','docs','_forensics',
  'REPO-HYGIENE.md','BUILD.md','BOT-HANDOFF.md',
  'LICENSE','LICENSE-ART-DATA','pnpm-workspace.yaml','package.json'
]);

function walk(dir, out=[]) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      if (dir === ROOT && !ALLOWED_TOP.has(name)) {
        out.push({p, err:`unknown top-level folder: ${name}`});
      }
      walk(p, out);
    } else {
      if (/\.(png|jpg|jpeg|gif|mp4|mov|webm|woff2?)$/i.test(name)) continue;
      const txt = fs.readFileSync(p, 'utf8');
      for (const rx of BLOCK_PATTERNS) {
        if (rx.test(txt)) out.push({p, err:`blocked pattern ${rx} in ${p}`});
      }
    }
  }
  return out;
}

const problems = walk(ROOT, []);
if (problems.length) {
  console.error('✗ Integrity gate failed:\n' + problems.map(e=>` - ${e.err}`).join('\n'));
  process.exit(1);
}
console.log('✓ Integrity gate passed (no placeholders detected).');
