#!/usr/bin/env node
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
