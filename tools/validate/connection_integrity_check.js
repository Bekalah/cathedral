// Cathedral Magnum Opus Connection Integrity Check
// Run with: node tools/validate/connection_integrity_check.js

const fs = require('fs');
const path = require('path');

const requiredPackages = [
  'liber-arcanae',
  'art-generation-node',
  'sacred-geometry-core',
  'codex-144-99',
  'shared'
];

const requiredJson = [
  'CATHEDRAL_INTEGRATION_MAP.json',
  'codex-144-expanded.json',
  'codex-arcanae-mirror.json',
  'palette.json',
  'pigments-database.json'
];

function checkPackage(pkg) {
  const pkgPath = path.join(__dirname, '../../packages', pkg, 'package.json');
  return fs.existsSync(pkgPath);
}

function checkJson(jsonFile) {
  const jsonPath = path.join(__dirname, '../../', jsonFile);
  if (!fs.existsSync(jsonPath)) return false;
  const data = fs.readFileSync(jsonPath, 'utf8');
  try {
    const parsed = JSON.parse(data);
    return parsed && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}

let allOk = true;
console.log('Checking package connections:');
for (const pkg of requiredPackages) {
  const ok = checkPackage(pkg);
  console.log(`- ${pkg}: ${ok ? 'OK' : 'MISSING'}`);
  if (!ok) allOk = false;
}

console.log('\nChecking JSON data files:');
for (const jsonFile of requiredJson) {
  const ok = checkJson(jsonFile);
  console.log(`- ${jsonFile}: ${ok ? 'OK' : 'MISSING/EMPTY'}`);
  if (!ok) allOk = false;
}

console.log(`\nConnection integrity: ${allOk ? 'ALL CONNECTED' : 'ISSUES FOUND'}`);
process.exit(allOk ? 0 : 1);
