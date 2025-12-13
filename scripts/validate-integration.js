const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.cathedral && packageJson.cathedral.integration) {
  console.log('✅ Integration metadata present.');
  process.exit(0);
} else {
  console.log('ℹ️  No specific integration metadata found (optional).');
  process.exit(0);
}
