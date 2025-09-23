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
