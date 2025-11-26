#!/bin/bash
# Standardize All Tool Versions
# Ensures all tools use the same versions everywhere

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔧 Standardizing All Tool Versions"
echo "==================================\n"

# ========================================
# STANDARD VERSIONS
# ========================================
NODE_VERSION="20.18.0"
PNPM_VERSION="8.15.0"
TURBO_VERSION="2.0.0"
TYPESCRIPT_VERSION="5.6.0"
RUST_VERSION="stable"

echo "📋 Standard Versions:"
echo "  Node.js: $NODE_VERSION"
echo "  pnpm: $PNPM_VERSION"
echo "  Turbo: $TURBO_VERSION"
echo "  TypeScript: $TYPESCRIPT_VERSION"
echo "  Rust: $RUST_VERSION"
echo ""

# ========================================
# PHASE 1: UPDATE ROOT package.json
# ========================================
echo "📝 PHASE 1: Updating Root package.json..."

node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Set packageManager
pkg.packageManager = 'pnpm@${PNPM_VERSION}';

// Set engines
pkg.engines = {
  node: '>=${NODE_VERSION}',
  pnpm: '>=${PNPM_VERSION}'
};

// Update devDependencies
pkg.devDependencies = pkg.devDependencies || {};
pkg.devDependencies.turbo = '${TURBO_VERSION}';
pkg.devDependencies.typescript = '${TYPESCRIPT_VERSION}';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Updated root package.json');
NODE_SCRIPT

# ========================================
# PHASE 2: UPDATE .nvmrc
# ========================================
echo "\n📝 PHASE 2: Updating .nvmrc..."

echo "$NODE_VERSION" > .nvmrc
echo "  ✅ Updated .nvmrc"

# ========================================
# PHASE 3: UPDATE ALL package.json FILES
# ========================================
echo "\n📝 PHASE 3: Standardizing All package.json Files..."

find packages apps -name "package.json" -type f 2>/dev/null | while read -r pkg_json; do
  rel_path=$(echo "$pkg_json" | sed "s|$ROOT_DIR/||")
  
  node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = '$pkg_json';
let pkg;

try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch (e) {
  process.exit(0);
}

let updated = false;

// Set packageManager
if (!pkg.packageManager || !pkg.packageManager.includes('pnpm')) {
  pkg.packageManager = 'pnpm@${PNPM_VERSION}';
  updated = true;
}

// Set engines
if (!pkg.engines) {
  pkg.engines = {};
  updated = true;
}
if (!pkg.engines.node || !pkg.engines.node.includes('20')) {
  pkg.engines.node = '>=${NODE_VERSION}';
  updated = true;
}
if (!pkg.engines.pnpm || !pkg.engines.pnpm.includes('8')) {
  pkg.engines.pnpm = '>=${PNPM_VERSION}';
  updated = true;
}

// Update TypeScript version
if (pkg.devDependencies && pkg.devDependencies.typescript) {
  if (!pkg.devDependencies.typescript.includes('5.')) {
    pkg.devDependencies.typescript = '${TYPESCRIPT_VERSION}';
    updated = true;
  }
}

// Remove npm if present
if (pkg.dependencies && pkg.dependencies.npm) {
  delete pkg.dependencies.npm;
  updated = true;
}
if (pkg.devDependencies && pkg.devDependencies.npm) {
  delete pkg.devDependencies.npm;
  updated = true;
}

if (updated) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('  ✅ Updated: $rel_path');
}
NODE_SCRIPT
done

# ========================================
# PHASE 4: UPDATE TURBO.JSON
# ========================================
echo "\n📝 PHASE 4: Updating turbo.json..."

node << NODE_SCRIPT
const fs = require('fs');
const turboPath = 'turbo.json';
const turbo = JSON.parse(fs.readFileSync(turboPath, 'utf8'));

turbo.packageManager = 'pnpm';
turbo.pnpmOnly = true;

// Add PNPM_VERSION to globalEnv
if (!turbo.globalEnv) turbo.globalEnv = [];
if (!turbo.globalEnv.includes('PNPM_VERSION')) {
  turbo.globalEnv.push('PNPM_VERSION');
}

fs.writeFileSync(turboPath, JSON.stringify(turbo, null, 2) + '\n');
console.log('  ✅ Updated turbo.json');
NODE_SCRIPT

# ========================================
# PHASE 5: UPDATE RUST TOOLS
# ========================================
echo "\n🦀 PHASE 5: Reviewing Rust Tools..."

if [ -f "rust-engines/Cargo.toml" ]; then
  echo "  ✅ Rust workspace found"
  # Rust versions are managed by Cargo.toml
fi

# ========================================
# PHASE 6: UPDATE CUSTOM TOOLS
# ========================================
echo "\n🛠️  PHASE 6: Standardizing Custom Tools..."

# Update custom tool versions
CUSTOM_TOOLS=(
  "cathedral-cli"
  "cathedral-tools"
  "cathedral-plugin-system"
)

for tool in "${CUSTOM_TOOLS[@]}"; do
  if [ -f "packages/$tool/package.json" ]; then
    node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'packages/$tool/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Ensure version is set
if (!pkg.version) {
  pkg.version = '1.0.0';
}

// Set packageManager
pkg.packageManager = 'pnpm@${PNPM_VERSION}';

// Set engines
pkg.engines = {
  node: '>=${NODE_VERSION}',
  pnpm: '>=${PNPM_VERSION}'
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE_SCRIPT
    echo "  ✅ Updated: $tool"
  fi
done

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Root package.json standardized"
echo "  ✅ .nvmrc updated"
echo "  ✅ All package.json files standardized"
echo "  ✅ turbo.json updated"
echo "  ✅ Rust tools reviewed"
echo "  ✅ Custom tools standardized"
echo "\n✅ Tool version standardization complete!"

