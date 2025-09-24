#!/usr/bin/env node
/*
  Cathedral integrity gate: fail fast if placeholder or obviously fake data
  slips into the repository. This keeps the canon deterministic and museum-grade.
*/

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.turbo'
]);

const IGNORED_FILES = new Set([
  path.join('scripts', 'no-placeholders.mjs')
]);

const BLOCK_PATTERNS = [
  /\bTODO\b/i,
  /\bFIXME\b/i,
  /lorem ipsum/i,
  /"reflectance"\s*:\s*\[\s*0(\.0+)?\s*(,\s*0(\.0+)?)*\s*\]/i,
  /"vertices"\s*:\s*\[\s*\]/i,
  /"faces"\s*:\s*\[\s*\]/i,
  /"id"\s*:\s*"C144N-000"/i,
  /"sealed"\s*:\s*null/i
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }
      files.push(...(await walk(resolved)));
    } else if (entry.isFile()) {
      files.push(resolved);
    }
  }
  return files;
}

async function main() {
  const root = process.cwd();
  const files = await walk(root);
  const failures = [];

  for (const filePath of files) {
    try {
      const relativePath = path.relative(root, filePath);
      if (IGNORED_FILES.has(relativePath)) {
        continue;
      }
      const contents = await readFile(filePath, 'utf8');
      for (const pattern of BLOCK_PATTERNS) {
        pattern.lastIndex = 0;
        if (pattern.test(contents)) {
          failures.push({ filePath, pattern: pattern.source });
          break;
        }
      }
    } catch (error) {
      // Skip binary files or permission errors silently.
      const info = await stat(filePath).catch(() => null);
      if (!info || info.size > 0) {
        continue;
      }
    }
  }

  if (failures.length > 0) {
    console.error('✗ Integrity gate blocked placeholder content:');
    for (const failure of failures) {
      console.error(` - ${failure.filePath} (matched /${failure.pattern}/)`);
    }
    process.exit(1);
  }

  console.log('✓ Integrity gate passed (no placeholders detected).');
}

main().catch((error) => {
  console.error('Integrity gate failed to run:', error);
  process.exit(1);
});
