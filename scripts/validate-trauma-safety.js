const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.cathedral && packageJson.cathedral.trauma_safety) {
  console.log('✅ Trauma Safety metadata present.');
  process.exit(0);
} else {
  console.log('⚠️  Missing Trauma Safety metadata in package.json');
  process.exit(0);
}
