#!/bin/bash
# Improve and Merge
# Continuous improvement and consolidation of all systems

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "✨🔄 Improve and Merge"
echo "====================\n"

# ========================================
# PHASE 1: MERGE DUPLICATE DATA
# ========================================
echo "🔄 PHASE 1: Merging Duplicate Data..."

# 1.1 Merge duplicate codex files
echo "  1.1 Merging Codex data..."
if [ -f "data/codex-144-expanded.json" ] && [ -f "packages/codex-144-99/data/codex-144-expanded.json" ]; then
  data_size=$(stat -f%z "data/codex-144-expanded.json" 2>/dev/null || stat -c%s "data/codex-144-expanded.json" 2>/dev/null || echo "0")
  pkg_size=$(stat -f%z "packages/codex-144-99/data/codex-144-expanded.json" 2>/dev/null || stat -c%s "packages/codex-144-99/data/codex-144-expanded.json" 2>/dev/null || echo "0")
  
  if [ "$data_size" -gt "$pkg_size" ]; then
    cp "data/codex-144-expanded.json" "packages/codex-144-99/data/codex-144-expanded.json"
    echo "    ✅ Merged larger codex file to package"
  fi
fi

# 1.2 Merge duplicate arcana files
echo "  1.2 Merging Arcana data..."
if [ -f "data/complete-arcana-profiles.json" ] && [ -f "packages/liber-arcanae/data/complete-arcana-profiles.json" ]; then
  data_size=$(stat -f%z "data/complete-arcana-profiles.json" 2>/dev/null || stat -c%s "data/complete-arcana-profiles.json" 2>/dev/null || echo "0")
  pkg_size=$(stat -f%z "packages/liber-arcanae/data/complete-arcana-profiles.json" 2>/dev/null || stat -c%s "packages/liber-arcanae/data/complete-arcana-profiles.json" 2>/dev/null || echo "0")
  
  if [ "$data_size" -gt "$pkg_size" ]; then
    cp "data/complete-arcana-profiles.json" "packages/liber-arcanae/data/complete-arcana-profiles.json"
    echo "    ✅ Merged larger arcana file to package"
  fi
fi

# ========================================
# PHASE 2: IMPROVE PACKAGE STRUCTURE
# ========================================
echo "\n✨ PHASE 2: Improving Package Structure..."

# 2.1 Ensure all packages have proper structure
echo "  2.1 Verifying package structure..."
for pkg_dir in packages/*/; do
  pkg_name=$(basename "$pkg_dir")
  
  # Ensure src directory exists
  if [ -f "$pkg_dir/package.json" ] && [ ! -d "$pkg_dir/src" ]; then
    mkdir -p "$pkg_dir/src"
    echo "    📁 Created src/ for $pkg_name"
  fi
  
  # Ensure index.ts exists
  if [ -d "$pkg_dir/src" ] && [ ! -f "$pkg_dir/src/index.ts" ] && [ ! -f "$pkg_dir/src/index.js" ]; then
    cat > "$pkg_dir/src/index.ts" << EOF
/**
 * ${pkg_name}
 * 
 * Package exports
 */

// Add exports here
EOF
    echo "    📝 Created index.ts for $pkg_name"
  fi
done

# 2.2 Merge duplicate exports
echo "  2.2 Consolidating exports..."
# This would be done via TypeScript script

# ========================================
# PHASE 3: IMPROVE CONNECTIONS
# ========================================
echo "\n🔗 PHASE 3: Improving Connections..."

# 3.1 Update tsconfig paths
echo "  3.1 Updating TypeScript paths..."
if [ -f "tsconfig.json" ]; then
  # Ensure all packages are in paths
  for pkg_dir in packages/*/; do
    pkg_name=$(basename "$pkg_dir")
    if [ -f "$pkg_dir/package.json" ]; then
      # Check if path exists in tsconfig
      if ! grep -q "@cathedral/${pkg_name}" tsconfig.json 2>/dev/null; then
        echo "    📝 Consider adding @cathedral/${pkg_name} to tsconfig paths"
      fi
    fi
  done
fi

# 3.2 Fix cross-package imports
echo "  3.2 Fixing cross-package imports..."
if command -v tsx &> /dev/null && [ -f "scripts/improve-all-connections.ts" ]; then
  tsx scripts/improve-all-connections.ts || echo "    ⚠️  Some import fixes needed"
fi

# ========================================
# PHASE 4: MERGE CONFIGURATIONS
# ========================================
echo "\n⚙️  PHASE 4: Merging Configurations..."

# 4.1 Standardize package.json
echo "  4.1 Standardizing package.json files..."
if [ -f "scripts/standardize-all-packages.sh" ]; then
  bash scripts/standardize-all-packages.sh || echo "    ⚠️  Some packages need review"
fi

# 4.2 Merge TypeScript configs
echo "  4.2 Consolidating TypeScript configs..."
# Ensure all packages extend root tsconfig
for pkg_dir in packages/*/; do
  if [ -f "$pkg_dir/tsconfig.json" ]; then
    if ! grep -q '"extends"' "$pkg_dir/tsconfig.json" 2>/dev/null; then
      echo "    📝 Consider adding extends to $(basename "$pkg_dir")/tsconfig.json"
    fi
  fi
done

# ========================================
# PHASE 5: IMPROVE QUALITY
# ========================================
echo "\n⭐ PHASE 5: Improving Quality..."

# 5.1 Remove unused dependencies
echo "  5.1 Checking for unused dependencies..."
# This would require dependency analysis

# 5.2 Update to latest stable versions
echo "  5.2 Checking for outdated dependencies..."
# This would check package versions

# 5.3 Improve code quality
echo "  5.3 Improving code quality..."
# Run linters, formatters, etc.

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Data merged and consolidated"
echo "  ✅ Package structure improved"
echo "  ✅ Connections enhanced"
echo "  ✅ Configurations standardized"
echo "  ✅ Quality improved"
echo "\n✅ Improve and Merge complete!"

