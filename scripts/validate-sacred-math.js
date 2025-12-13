const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.cathedral && packageJson.cathedral.sacred_mathematics) {
  console.log('✅ Sacred Mathematics metadata present.');
  process.exit(0);
} else {
  console.log('⚠️  Missing Sacred Mathematics metadata in package.json');
  // Non-blocking for now, just a warning
  process.exit(0);
}
