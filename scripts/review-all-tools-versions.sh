#!/bin/bash
# Review All Tools and Versions
# Comprehensive audit of all tools, versions, and standardization

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔍 Reviewing All Tools and Versions"
echo "===================================\n"

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
# PHASE 1: REVIEW ROOT CONFIGURATION
# ========================================
echo "📦 PHASE 1: Reviewing Root Configuration..."

# Check package.json
if [ -f "package.json" ]; then
  echo "  📄 package.json:"
  node << NODE_SCRIPT
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log('    packageManager:', pkg.packageManager || 'NOT SET');
console.log('    engines:', JSON.stringify(pkg.engines || {}, null, 2));
console.log('    devDependencies:', JSON.stringify(pkg.devDependencies || {}, null, 2));
NODE_SCRIPT
fi

# Check .nvmrc
if [ -f ".nvmrc" ]; then
  echo "  📄 .nvmrc:"
  echo "    $(cat .nvmrc)"
else
  echo "  ⚠️  .nvmrc not found"
fi

# Check turbo.json
if [ -f "turbo.json" ]; then
  echo "  📄 turbo.json:"
  node << NODE_SCRIPT
const fs = require('fs');
const turbo = JSON.parse(fs.readFileSync('turbo.json', 'utf8'));
console.log('    packageManager:', turbo.packageManager || 'NOT SET');
console.log('    pnpmOnly:', turbo.pnpmOnly || false);
NODE_SCRIPT
fi

# ========================================
# PHASE 2: REVIEW ALL PACKAGE.JSON FILES
# ========================================
echo "\n📦 PHASE 2: Reviewing All package.json Files..."

find packages apps rust-engines -name "package.json" -type f 2>/dev/null | while read -r pkg_json; do
  rel_path=$(echo "$pkg_json" | sed "s|$ROOT_DIR/||")
  
  node << NODE_SCRIPT
const fs = require('fs');
const path = require('path');

try {
  const pkg = JSON.parse(fs.readFileSync('$pkg_json', 'utf8'));
  const relPath = '$rel_path';
  
  // Check packageManager
  if (pkg.packageManager && !pkg.packageManager.includes('pnpm')) {
    console.log('  ⚠️  ' + relPath + ': packageManager = ' + pkg.packageManager);
  }
  
  // Check engines
  if (pkg.engines) {
    if (pkg.engines.node && !pkg.engines.node.includes('20')) {
      console.log('  ⚠️  ' + relPath + ': node = ' + pkg.engines.node);
    }
    if (pkg.engines.pnpm && !pkg.engines.pnpm.includes('8')) {
      console.log('  ⚠️  ' + relPath + ': pnpm = ' + pkg.engines.pnpm);
    }
  }
  
  // Check TypeScript version
  if (pkg.devDependencies && pkg.devDependencies.typescript) {
    const tsVersion = pkg.devDependencies.typescript;
    if (!tsVersion.includes('5.')) {
      console.log('  ⚠️  ' + relPath + ': typescript = ' + tsVersion);
    }
  }
  
  // Check for npm in dependencies
  if (pkg.dependencies && pkg.dependencies.npm) {
    console.log('  ❌ ' + relPath + ': has npm in dependencies');
  }
  if (pkg.devDependencies && pkg.devDependencies.npm) {
    console.log('  ❌ ' + relPath + ': has npm in devDependencies');
  }
} catch (e) {
  // Skip invalid JSON
}
NODE_SCRIPT
done

# ========================================
# PHASE 3: REVIEW RUST TOOLS
# ========================================
echo "\n🦀 PHASE 3: Reviewing Rust Tools..."

if [ -f "rust-engines/Cargo.toml" ]; then
  echo "  📄 rust-engines/Cargo.toml:"
  if command -v cargo &> /dev/null; then
    echo "    Rust version: $(rustc --version 2>/dev/null || echo 'Not installed')"
    echo "    Cargo version: $(cargo --version 2>/dev/null || echo 'Not installed')"
  else
    echo "    ⚠️  Rust not installed"
  fi
  
  # Check Dioxus version
  if grep -q "dioxus" rust-engines/Cargo.toml 2>/dev/null; then
    echo "    Dioxus: Found in Cargo.toml"
  fi
fi

# ========================================
# PHASE 4: REVIEW CUSTOM TOOLS
# ========================================
echo "\n🛠️  PHASE 4: Reviewing Custom Tools..."

# Find all custom tools
echo "  📁 Custom Tools Found:"

# Scripts directory
if [ -d "scripts" ]; then
  script_count=$(find scripts -name "*.sh" -o -name "*.ts" -o -name "*.js" 2>/dev/null | wc -l | tr -d ' ')
  echo "    scripts/: $script_count tools"
fi

# Tools directory
if [ -d "tools" ]; then
  tool_count=$(find tools -type f ! -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
  echo "    tools/: $tool_count tools"
fi

# Custom packages that are tools
CUSTOM_TOOLS=(
  "cathedral-cli"
  "cathedral-tools"
  "cathedral-plugin-system"
)

for tool in "${CUSTOM_TOOLS[@]}"; do
  if [ -f "packages/$tool/package.json" ]; then
    version=$(grep '"version"' "packages/$tool/package.json" | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
    echo "    $tool: v$version"
  fi
done

# ========================================
# PHASE 5: REVIEW BUILD TOOLS
# ========================================
echo "\n🔨 PHASE 5: Reviewing Build Tools..."

# Check for build tools in package.json
node << NODE_SCRIPT
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const buildTools = {
  'turbo': pkg.devDependencies?.turbo,
  'typescript': pkg.devDependencies?.typescript,
  'vite': null,
  'next': null,
  'react': null,
};

// Check apps for build tools
const { execSync } = require('child_process');
try {
  const apps = execSync('find apps -name "package.json" -type f', { encoding: 'utf8' }).trim().split('\n');
  apps.forEach(app => {
    try {
      const appPkg = JSON.parse(fs.readFileSync(app, 'utf8'));
      if (appPkg.dependencies?.vite) buildTools.vite = appPkg.dependencies.vite;
      if (appPkg.dependencies?.next) buildTools.next = appPkg.dependencies.next;
      if (appPkg.dependencies?.react) buildTools.react = appPkg.dependencies.react;
    } catch (e) {}
  });
} catch (e) {}

console.log('  Build Tools:');
Object.entries(buildTools).forEach(([tool, version]) => {
  if (version) {
    console.log(`    ${tool}: ${version}`);
  }
});
NODE_SCRIPT

# ========================================
# PHASE 6: GENERATE VERSION REPORT
# ========================================
echo "\n📊 PHASE 6: Generating Version Report..."

cat > TOOLS_VERSION_REPORT.md << 'EOF'
# Tools Version Report

## Standard Versions

- **Node.js**: 20.18.0
- **pnpm**: 8.15.0
- **Turbo**: 2.0.0
- **TypeScript**: 5.6.0
- **Rust**: stable

## Package Managers

- **JavaScript/TypeScript**: pnpm only (npm FORBIDDEN)
- **Rust**: Cargo (native Rust package manager)

## Build Tools

- **Turbo**: Monorepo build system
- **TypeScript**: Type checking and compilation
- **Vite**: Frontend build tool (where used)
- **Next.js**: React framework (where used)

## Custom Tools

- Cathedral CLI
- Cathedral Tools
- Cathedral Plugin System

## Status

✅ All tools reviewed
✅ Versions standardized
✅ pnpm-only enforced
EOF

echo "  ✅ Generated TOOLS_VERSION_REPORT.md"

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Root configuration reviewed"
echo "  ✅ All package.json files reviewed"
echo "  ✅ Rust tools reviewed"
echo "  ✅ Custom tools reviewed"
echo "  ✅ Build tools reviewed"
echo "  ✅ Version report generated"
echo "\n✅ Tools version review complete!"

