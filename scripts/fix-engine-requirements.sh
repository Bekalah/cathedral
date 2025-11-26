#!/bin/bash
# Fix engine requirements across all packages

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
cd "$MONOREPO_ROOT"

echo "🔧 FIXING ENGINE REQUIREMENTS"
echo "============================="
echo ""

find apps packages -name "package.json" -type f 2>/dev/null | while read file; do
  if grep -q '"engines"' "$file" || grep -q '"packageManager"' "$file"; then
    echo "  Fixing: $file"
    node << EOF
const fs = require('fs');
const file = '$file';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
let changed = false;

if (pkg.engines) {
  if (pkg.engines.pnpm && pkg.engines.pnpm !== '>=8.15.0') {
    pkg.engines.pnpm = '>=8.15.0';
    changed = true;
  }
  if (pkg.engines.node && pkg.engines.node !== '>=20.18.0') {
    pkg.engines.node = '>=20.18.0';
    changed = true;
  }
}

if (pkg.packageManager && !pkg.packageManager.includes('8.15.0')) {
  pkg.packageManager = 'pnpm@8.15.0';
  changed = true;
}

if (changed) {
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
  console.log('    ✅ Fixed');
} else {
  console.log('    ✓ Already correct');
}
EOF
  fi
done

echo ""
echo "✅ ENGINE REQUIREMENTS FIXED"
echo "============================="

