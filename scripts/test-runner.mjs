#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🧪 Running Cathedral Tests');

const testCommands = [
  'pnpm test',
  'python -m pytest',
  'node --test'
];

let passed = 0;
let failed = 0;

for (const cmd of testCommands) {
  try {
    console.log(`Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit', timeout: 60000 });
    passed++;
  } catch (error) {
    console.log(`❌ ${cmd} failed`);
    failed++;
  }
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
