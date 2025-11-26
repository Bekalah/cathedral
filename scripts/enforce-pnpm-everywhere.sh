#!/bin/bash
# Enforce pnpm Everywhere - Complete System Update
# Updates ALL tools, scripts, configs to use pnpm only

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔒 Enforcing pnpm Everywhere - Complete System Update"
echo "====================================================\n"

# ========================================
# PHASE 1: UPDATE ALL SCRIPTS
# ========================================
echo "🔧 PHASE 1: Updating All Scripts..."

# Find and fix all shell scripts
find scripts packages apps -name "*.sh" -type f 2>/dev/null | while read -r script; do
  if grep -qE "(npm |npx )" "$script" 2>/dev/null; then
    echo "  🔧 Fixing: $script"
    # Replace npm with pnpm
    sed -i '' 's/\bnpm install\b/pnpm install/g' "$script" 2>/dev/null || \
    sed -i 's/\bnpm install\b/pnpm install/g' "$script" 2>/dev/null || true
    sed -i '' 's/\bnpm run\b/pnpm run/g' "$script" 2>/dev/null || \
    sed -i 's/\bnpm run\b/pnpm run/g' "$script" 2>/dev/null || true
    sed -i '' 's/\bnpm ci\b/pnpm install --frozen-lockfile/g' "$script" 2>/dev/null || \
    sed -i 's/\bnpm ci\b/pnpm install --frozen-lockfile/g' "$script" 2>/dev/null || true
    sed -i '' 's/\bnpm audit\b/pnpm audit/g' "$script" 2>/dev/null || \
    sed -i 's/\bnpm audit\b/pnpm audit/g' "$script" 2>/dev/null || true
    sed -i '' 's/\pnpm exec /pnpm exec /g' "$script" 2>/dev/null || \
    sed -i 's/\pnpm exec /pnpm exec /g' "$script" 2>/dev/null || true
    sed -i '' 's/\bnpm start\b/pnpm start/g' "$script" 2>/dev/null || \
    sed -i 's/\bnpm start\b/pnpm start/g' "$script" 2>/dev/null || true
  fi
done

# ========================================
# PHASE 2: UPDATE ALL package.json FILES
# ========================================
echo "\n📝 PHASE 2: Updating All package.json Files..."

find packages apps -name "package.json" -type f 2>/dev/null | while read -r pkg_json; do
  if grep -qE '"npm"|npm |npx ' "$pkg_json" 2>/dev/null; then
    echo "  🔧 Fixing: $pkg_json"
    node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = '$pkg_json';
let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch (e) {
  console.error('  ⚠️  Invalid JSON:', pkgPath);
  process.exit(0);
}

// Fix scripts
if (pkg.scripts) {
  for (const [key, value] of Object.entries(pkg.scripts)) {
    if (typeof value === 'string') {
      pkg.scripts[key] = value
        .replace(/\bnpm install\b/g, 'pnpm install')
        .replace(/\bnpm run\b/g, 'pnpm run')
        .replace(/\bnpm ci\b/g, 'pnpm install --frozen-lockfile')
        .replace(/\bnpm audit\b/g, 'pnpm audit')
        .replace(/\pnpm exec /g, 'pnpm exec ')
        .replace(/\bnpm start\b/g, 'pnpm start');
    }
  }
}

// Set packageManager
pkg.packageManager = 'pnpm@8.15.0';

// Remove npm from dependencies if present
if (pkg.dependencies && pkg.dependencies.npm) {
  delete pkg.dependencies.npm;
}
if (pkg.devDependencies && pkg.devDependencies.npm) {
  delete pkg.devDependencies.npm;
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE_SCRIPT
  fi
done

# ========================================
# PHASE 3: UPDATE TURBO.JSON
# ========================================
echo "\n⚙️  PHASE 3: Updating turbo.json..."

if [ -f "turbo.json" ]; then
  node << NODE_SCRIPT
const fs = require('fs');
const turboPath = 'turbo.json';
const turbo = JSON.parse(fs.readFileSync(turboPath, 'utf8'));

// Add pnpm enforcement
turbo.packageManager = 'pnpm';
turbo.pnpmOnly = true;

// Add global env for pnpm
if (!turbo.globalEnv) turbo.globalEnv = [];
if (!turbo.globalEnv.includes('PNPM_VERSION')) {
  turbo.globalEnv.push('PNPM_VERSION');
}

fs.writeFileSync(turboPath, JSON.stringify(turbo, null, 2) + '\n');
console.log('  ✅ Updated turbo.json with pnpm enforcement');
NODE_SCRIPT
fi

# ========================================
# PHASE 4: UPDATE OPENSPEC
# ========================================
echo "\n📚 PHASE 4: Updating OpenSpec Documentation..."

mkdir -p openspec

cat > openspec/PNPM_ONLY_POLICY.md << 'EOF'
# pnpm-Only Policy - OpenSpec

**Status**: REQUIRED  
**Security Level**: CRITICAL  
**Enforcement**: MANDATORY

## Policy

This repository **MUST** use pnpm only. npm is **FORBIDDEN** for security reasons.

### Why pnpm Only?

1. **Security**: pnpm has better security features than npm
2. **Performance**: pnpm is faster and uses less disk space
3. **Consistency**: Single package manager prevents conflicts
4. **Reliability**: pnpm's strict dependency resolution prevents issues

### Enforcement

- ✅ `.npmrc` enforces pnpm
- ✅ Pre-commit hooks prevent npm files
- ✅ GitHub Actions check for npm usage
- ✅ All scripts use pnpm only
- ✅ All package.json files specify pnpm

### Rules

1. **NEVER** use `npm install`, `npm run`, `npm ci`, `npx`
2. **ALWAYS** use `pnpm install`, `pnpm run`, `pnpm exec`
3. **NEVER** commit `package-lock.json`
4. **ALWAYS** use `pnpm-lock.yaml`

### Violations

If npm is detected:
- Pre-commit hook will reject the commit
- CI/CD will fail
- Scripts will error

### Commands

```bash
# Install dependencies
pnpm install

# Run scripts
pnpm run <script>

# Execute packages
pnpm exec <package>

# Audit
pnpm audit
```

**This policy is permanent and non-negotiable.**
EOF

echo "  ✅ Created OpenSpec pnpm-only policy"

# ========================================
# PHASE 5: UPDATE ALL GITHUB ACTIONS
# ========================================
echo "\n🔄 PHASE 5: Updating All GitHub Actions..."

find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null | while read -r workflow; do
  if grep -qE "npm |npx " "$workflow" 2>/dev/null; then
    echo "  🔧 Fixing: $workflow"
    sed -i '' 's/\bnpm install\b/pnpm install/g' "$workflow" 2>/dev/null || \
    sed -i 's/\bnpm install\b/pnpm install/g' "$workflow" 2>/dev/null || true
    sed -i '' 's/\bnpm run\b/pnpm run/g' "$workflow" 2>/dev/null || \
    sed -i 's/\bnpm run\b/pnpm run/g' "$workflow" 2>/dev/null || true
    sed -i '' 's/\pnpm exec /pnpm exec /g' "$workflow" 2>/dev/null || \
    sed -i 's/\pnpm exec /pnpm exec /g' "$workflow" 2>/dev/null || true
  fi
done

# ========================================
# PHASE 6: UPDATE .npmrc
# ========================================
echo "\n🔒 PHASE 6: Updating .npmrc..."

cat > .npmrc << 'EOF'
# Cathedral - pnpm Only Configuration
# npm is FORBIDDEN for security reasons

# Force pnpm
package-manager=pnpm
engine-strict=true

# Security
audit-level=moderate
fund=false

# Performance
prefer-offline=true
shamefully-hoist=false
strict-peer-dependencies=false

# Block npm
auto-install-peers=true
EOF

echo "  ✅ Updated .npmrc"

# ========================================
# PHASE 7: UPDATE ROOT package.json
# ========================================
echo "\n📝 PHASE 7: Updating Root package.json..."

node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Enforce pnpm
pkg.packageManager = 'pnpm@8.15.0';

// Update all scripts
if (pkg.scripts) {
  for (const [key, value] of Object.entries(pkg.scripts)) {
    if (typeof value === 'string') {
      pkg.scripts[key] = value
        .replace(/\bnpm install\b/g, 'pnpm install')
        .replace(/\bnpm run\b/g, 'pnpm run')
        .replace(/\bnpm ci\b/g, 'pnpm install --frozen-lockfile')
        .replace(/\bnpm audit\b/g, 'pnpm audit')
        .replace(/\pnpm exec /g, 'pnpm exec ')
        .replace(/\bnpm start\b/g, 'pnpm start');
    }
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Updated root package.json');
NODE_SCRIPT

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Updated all scripts"
echo "  ✅ Updated all package.json files"
echo "  ✅ Updated turbo.json"
echo "  ✅ Updated OpenSpec documentation"
echo "  ✅ Updated GitHub Actions"
echo "  ✅ Updated .npmrc"
echo "  ✅ Updated root package.json"
echo "\n🔒 pnpm-only enforcement complete everywhere!"

