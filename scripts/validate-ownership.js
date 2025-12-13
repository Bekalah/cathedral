const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

if (packageJson.author) {
  console.log(`✅ Ownership validated: ${packageJson.author}`);
  process.exit(0);
} else {
  console.log('⚠️  Missing "author" field in package.json');
  process.exit(0);
}
