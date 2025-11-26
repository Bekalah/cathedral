#!/bin/bash
# Remove Spam and Fix Everything
# Actually removes spam, fixes echo scripts, consolidates duplicates

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🧹 Removing Spam and Fixing Everything"
echo "=====================================\n"

# ========================================
# PHASE 1: FIX ECHO SCRIPTS
# ========================================
echo "🔧 PHASE 1: Fixing Echo Scripts..."

fix_echo_script() {
  local pkg_dir="$1"
  local pkg_name=$(basename "$pkg_dir")
  
  if [ ! -f "$pkg_dir/package.json" ]; then
    return
  fi
  
  if grep -q '"build": "echo' "$pkg_dir/package.json" 2>/dev/null; then
    echo "  🔧 Fixing: $pkg_name"
    
    # Create proper TypeScript build if src exists
    if [ -d "$pkg_dir/src" ] && [ "$(find "$pkg_dir/src" -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')" -gt 0 ]; then
      # Update package.json with real build script
      node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = '$pkg_dir/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Replace echo scripts with real TypeScript build
if (pkg.scripts) {
  if (pkg.scripts.build && pkg.scripts.build.includes('echo')) {
    pkg.scripts.build = 'tsc';
  }
  if (pkg.scripts.dev && pkg.scripts.dev.includes('echo')) {
    pkg.scripts.dev = 'tsc --watch';
  }
}

// Ensure main and types point to dist
if (!pkg.main) pkg.main = 'dist/index.js';
if (!pkg.types) pkg.types = 'dist/index.d.ts';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE_SCRIPT
      
      # Ensure tsconfig.json exists
      if [ ! -f "$pkg_dir/tsconfig.json" ]; then
        cat > "$pkg_dir/tsconfig.json" << EOF
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF
      fi
      
      echo "    ✅ Fixed build script for $pkg_name"
    else
      echo "    ⚠️  $pkg_name has echo script but no source files - marking for removal"
    fi
  fi
}

# Fix all packages with echo scripts
for pkg_dir in packages/*/; do
  fix_echo_script "$pkg_dir"
done

# ========================================
# PHASE 2: REMOVE EMPTY/INCOMPLETE PACKAGES
# ========================================
echo "\n🗑️  PHASE 2: Removing Empty/Incomplete Packages..."

# List of empty packages to remove (Python-only or no real implementation)
EMPTY_PACKAGES=(
  "daimon-gear"
  "game-world"
  "living-libraries"
  "magnum-opus"
  "museum-sources"
  "professional-suite"
  "spells"
  "synth-labs"
  "synth-spells"
  "tarot-art"
  "tarot-reader"
)

for pkg in "${EMPTY_PACKAGES[@]}"; do
  pkg_dir="packages/$pkg"
  if [ -d "$pkg_dir" ]; then
    # Check if it's really empty (only Python files or package.json)
    file_count=$(find "$pkg_dir" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | wc -l | tr -d ' ')
    src_files=$(find "$pkg_dir/src" -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$file_count" -lt 3 ] || [ "$src_files" -eq 0 ]; then
      echo "  🗑️  Removing: $pkg ($file_count files, $src_files src files)"
      rm -rf "$pkg_dir"
      echo "    ✅ Removed $pkg"
    fi
  fi
done

# ========================================
# PHASE 3: CONSOLIDATE DUPLICATES
# ========================================
echo "\n🔄 PHASE 3: Consolidating Duplicates..."

# Consolidate codex-144 into codex-144-99
if [ -d "packages/codex-144" ] && [ -d "packages/codex-144-99" ]; then
  echo "  🔄 Consolidating codex-144 into codex-144-99..."
  
  # Copy any unique data files
  if [ -d "packages/codex-144" ]; then
    find packages/codex-144 -name "*.json" -type f | while read -r file; do
      filename=$(basename "$file")
      if [ ! -f "packages/codex-144-99/data/$filename" ]; then
        mkdir -p packages/codex-144-99/data
        cp "$file" "packages/codex-144-99/data/"
        echo "    📥 Copied: $filename"
      fi
    done
  fi
  
  rm -rf packages/codex-144
  echo "    ✅ Consolidated codex-144 into codex-144-99"
fi

# Consolidate circuitum99-arcanae-cyoa into circuitum99
if [ -d "packages/circuitum99-arcanae-cyoa" ] && [ -d "packages/circuitum99" ]; then
  echo "  🔄 Consolidating circuitum99-arcanae-cyoa into circuitum99..."
  
  # Copy any unique source files
  if [ -d "packages/circuitum99-arcanae-cyoa/src" ]; then
    find packages/circuitum99-arcanae-cyoa/src -type f | while read -r file; do
      rel_path=${file#packages/circuitum99-arcanae-cyoa/src/}
      if [ ! -f "packages/circuitum99/src/$rel_path" ]; then
        mkdir -p "packages/circuitum99/src/$(dirname "$rel_path")"
        cp "$file" "packages/circuitum99/src/$rel_path"
        echo "    📥 Copied: $rel_path"
      fi
    done
  fi
  
  rm -rf packages/circuitum99-arcanae-cyoa
  echo "    ✅ Consolidated circuitum99-arcanae-cyoa into circuitum99"
fi

# ========================================
# PHASE 4: FIX REMAINING ISSUES
# ========================================
echo "\n🔧 PHASE 4: Fixing Remaining Issues..."

# Fix data package (has echo script but has real data)
if [ -f "packages/data/package.json" ] && grep -q '"build": "echo' "packages/data/package.json" 2>/dev/null; then
  echo "  🔧 Fixing data package..."
  node << NODE_SCRIPT
const fs = require('fs');
const pkgPath = 'packages/data/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.scripts) {
  pkg.scripts.build = 'echo "Data package - no build needed"';
  pkg.scripts.dev = 'echo "Data package - no dev needed"';
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
NODE_SCRIPT
  echo "    ✅ Fixed data package"
fi

# Ensure worker app has src directory
if [ -d "apps/worker" ] && [ ! -d "apps/worker/src" ]; then
  echo "  📁 Creating src for worker app..."
  mkdir -p apps/worker/src
  if [ ! -f "apps/worker/src/index.ts" ]; then
    cat > apps/worker/src/index.ts << 'EOF'
/**
 * Cathedral Worker
 * Cloudflare Worker API
 */

export default {
  async fetch(request: Request): Promise<Response> {
    return new Response('Cathedral Worker API', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
EOF
    echo "    ✅ Created worker/src/index.ts"
  fi
fi

# ========================================
# PHASE 5: CLEAN UP ARTIFACTS
# ========================================
echo "\n🧹 PHASE 5: Cleaning Up Artifacts..."

# Remove .tmp files
find . -name "*.tmp" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | xargs rm -f 2>/dev/null || true

# Remove .DS_Store files
find . -name ".DS_Store" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" 2>/dev/null | xargs rm -f 2>/dev/null || true

# Remove empty directories
find packages apps -type d -empty -delete 2>/dev/null || true

echo "    ✅ Cleaned up artifacts"

# ========================================
# SUMMARY
# ========================================
echo "\n📊 Summary:"
echo "  ✅ Fixed echo scripts"
echo "  ✅ Removed empty packages"
echo "  ✅ Consolidated duplicates"
echo "  ✅ Fixed remaining issues"
echo "  ✅ Cleaned up artifacts"
echo "\n✅ Spam removal and fixes complete!"

