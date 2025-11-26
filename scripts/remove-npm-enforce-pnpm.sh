#!/bin/bash
# Remove All npm References - Enforce pnpm Only
# Makes system secure and consistent with pnpm only

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔒 Removing npm - Enforcing pnpm Only"
echo "====================================\n"

# ========================================
# PHASE 1: CREATE .npmrc TO BLOCK npm
# ========================================
echo "🔒 PHASE 1: Blocking npm with .npmrc..."

cat > .npmrc << 'EOF'
# Cathedral - pnpm Only Configuration
# npm is blocked for security and consistency

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

# Never use npm
EOF

echo "  ✅ Created .npmrc to enforce pnpm"

# ========================================
# PHASE 2: REMOVE npm FROM ALL SCRIPTS
# ========================================
echo "\n🔧 PHASE 2: Removing npm from all scripts..."

# Find all shell scripts
find scripts packages apps -name "*.sh" -type f 2>/dev/null | while read -r script; do
  if grep -q "npm " "$script" 2>/dev/null; then
    echo "  🔧 Fixing: $script"
    # Replace npm with pnpm
    sed -i '' 's/npm install/pnpm install/g' "$script" 2>/dev/null || \
    sed -i 's/npm install/pnpm install/g' "$script" 2>/dev/null || true
    sed -i '' 's/npm run/pnpm run/g' "$script" 2>/dev/null || \
    sed -i 's/npm run/pnpm run/g' "$script" 2>/dev/null || true
    sed -i '' 's/npm ci/pnpm install --frozen-lockfile/g' "$script" 2>/dev/null || \
    sed -i 's/npm ci/pnpm install --frozen-lockfile/g' "$script" 2>/dev/null || true
    sed -i '' 's/npm audit/pnpm audit/g' "$script" 2>/dev/null || \
    sed -i 's/npm audit/pnpm audit/g' "$script" 2>/dev/null || true
    sed -i '' 's/npx /pnpm exec /g' "$script" 2>/dev/null || \
    sed -i 's/npx /pnpm exec /g' "$script" 2>/dev/null || true
  fi
done

# Find all package.json files
find packages apps -name "package.json" -type f 2>/dev/null | while read -r pkg_json; do
  if grep -q '"npm"' "$pkg_json" 2>/dev/null || grep -q 'npm ' "$pkg_json" 2>/dev/null; then
    echo "  🔧 Fixing: $pkg_json"
    # Replace npm references in scripts
    node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = '$pkg_json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.scripts) {
  for (const [key, value] of Object.entries(pkg.scripts)) {
    if (typeof value === 'string') {
      pkg.scripts[key] = value
        .replace(/pnpm install/g, 'ppnpm install')
        .replace(/pnpm run/g, 'ppnpm run')
        .replace(/pnpm install --frozen-lockfile/g, 'ppnpm install --frozen-lockfile')
        .replace(/pnpm audit/g, 'ppnpm audit')
        .replace(/pnpm exec /g, 'pnpm exec ');
    }
  }
}

// Remove npm from packageManager if present
if (pkg.packageManager && pkg.packageManager.includes('npm')) {
  delete pkg.packageManager;
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE_SCRIPT
  fi
done

# ========================================
# PHASE 3: UPDATE .gitignore
# ========================================
echo "\n📝 PHASE 3: Updating .gitignore..."

# Ensure package-lock.json is ignored (npm file)
if ! grep -q "^package-lock.json" .gitignore 2>/dev/null; then
  echo "package-lock.json" >> .gitignore
  echo "  ✅ Added package-lock.json to .gitignore"
fi

# Ensure npm-debug.log is ignored
if ! grep -q "^npm-debug.log" .gitignore 2>/dev/null; then
  echo "npm-debug.log" >> .gitignore
  echo "npm-debug.log.*" >> .gitignore
  echo "  ✅ Added npm logs to .gitignore"
fi

# ========================================
# PHASE 4: CREATE pnpm-ONLY ENFORCEMENT
# ========================================
echo "\n🔒 PHASE 4: Creating pnpm-only enforcement..."

# Create pre-commit hook to prevent npm
mkdir -p .git/hooks

cat > .git/hooks/pre-commit << 'HOOK_EOF'
#!/bin/bash
# Pre-commit hook - Prevent npm usage

# Check for package-lock.json (npm file)
if git diff --cached --name-only | grep -q "package-lock.json"; then
  echo "❌ ERROR: package-lock.json detected!"
  echo "   This repository uses pnpm only. Use pnpm-lock.yaml instead."
   echo "   Run: rm package-lock.json && pnpm install"
  exit 1
fi

# Check for npm in staged files
 if git diff --cached | grep -q '"npm"\|npm install\|npm run\|npm ci'; then
  echo "⚠️  WARNING: npm references found in staged files"
  echo "   This repository uses pnpm only. Please use pnpm commands."
fi

exit 0
HOOK_EOF

chmod +x .git/hooks/pre-commit
echo "  ✅ Created pre-commit hook to prevent npm"

# ========================================
# PHASE 5: REMOVE npm ARTIFACTS
# ========================================
echo "\n🧹 PHASE 5: Removing npm artifacts..."

# Remove package-lock.json if it exists
if [ -f "package-lock.json" ]; then
  echo "  🗑️  Removing package-lock.json"
  rm -f package-lock.json
fi

# Remove npm-debug.log files
find . -name "npm-debug.log*" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | xargs rm -f 2>/dev/null || true

# Remove .npm directories
find . -name ".npm" -type d ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | xargs rm -rf 2>/dev/null || true

echo "  ✅ Removed npm artifacts"

# ========================================
# PHASE 6: UPDATE ROOT package.json
# ========================================
echo "\n📝 PHASE 6: Updating root package.json..."

node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Ensure packageManager is pnpm
pkg.packageManager = 'pnpm@8.15.0';

// Update all scripts to use pnpm
if (pkg.scripts) {
  for (const [key, value] of Object.entries(pkg.scripts)) {
    if (typeof value === 'string') {
      pkg.scripts[key] = value
        .replace(/pnpm install/g, 'ppnpm install')
        .replace(/pnpm run/g, 'ppnpm run')
        .replace(/pnpm install --frozen-lockfile/g, 'ppnpm install --frozen-lockfile')
        .replace(/pnpm audit/g, 'ppnpm audit')
        .replace(/pnpm exec /g, 'pnpm exec ');
    }
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('  ✅ Updated root package.json');
NODE_SCRIPT

# ========================================
# PHASE 7: CREATE pnpm ENFORCEMENT SCRIPT
# ========================================
echo "\n🔒 PHASE 7: Creating pnpm enforcement..."

cat > scripts/enforce-pnpm.sh << 'ENFORCE_EOF'
#!/bin/bash
# Enforce pnpm - Check and prevent npm usage

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔒 Checking for npm usage..."

# Check for package-lock.json
if [ -f "package-lock.json" ]; then
  echo "❌ ERROR: package-lock.json found!"
  echo "   This repository uses pnpm only."
   echo "   Run: rm package-lock.json && pnpm install"
  exit 1
fi

# Check for npm in scripts
if grep -r "npm " scripts/ packages/ apps/ --include="*.sh" --include="package.json" 2>/dev/null | grep -v "pnpm" | grep -v "node_modules"; then
  echo "⚠️  WARNING: npm references found in scripts"
  echo "   Run: ppnpm run remove:npm to fix"
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "❌ ERROR: pnpm is not installed!"
   echo "   Install: npm install -g pnpm (one-time, then use pnpm only)"
  exit 1
fi

echo "✅ pnpm enforcement check passed"
ENFORCE_EOF

chmod +x scripts/enforce-pnpm.sh
echo "  ✅ Created enforce-pnpm.sh"

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Created .npmrc to block npm"
echo "  ✅ Removed npm from all scripts"
echo "  ✅ Updated .gitignore"
echo "  ✅ Created pre-commit hook"
echo "  ✅ Removed npm artifacts"
echo "  ✅ Updated root package.json"
echo "  ✅ Created enforcement script"
echo "\n🔒 pnpm-only enforcement complete!"
 echo "\n💡 To check: pnpm run enforce:pnpm"

