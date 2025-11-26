#!/bin/bash
# Analyze Real vs Spam
# Identifies real apps/tools vs spam/artifacts

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔍 Analyzing Real Apps and Tools vs Spam"
echo "========================================\n"

# ========================================
# REAL APPS AND TOOLS
# ========================================
echo "✅ REAL APPS AND TOOLS:"
echo ""

# Apps
echo "📱 APPS:"
for app_dir in apps/*/; do
  if [ -f "$app_dir/package.json" ]; then
    app_name=$(basename "$app_dir")
    description=$(grep -A1 '"name"' "$app_dir/package.json" | grep '"description"' | sed 's/.*"description": "\(.*\)".*/\1/' || echo "No description")
    has_src=$(test -d "$app_dir/src" && echo "✅" || echo "❌")
    has_build=$(grep -q '"build"' "$app_dir/package.json" && echo "✅" || echo "❌")
    
    echo "  $has_src $has_build $app_name"
    echo "      $description"
  fi
done

echo ""
echo "🛠️  PACKAGES/TOOLS:"
echo ""

# Core Game Packages
echo "  🎮 CORE GAME PACKAGES:"
core_packages=(
  "codex-144-99"
  "liber-arcanae"
  "circuitum99"
  "stone-grimoire"
  "cosmogenesis-learning-engine"
  "tesseract-bridge"
  "magical-mystery-house"
)

for pkg in "${core_packages[@]}"; do
  if [ -f "packages/$pkg/package.json" ]; then
    description=$(grep -A1 '"name"' "packages/$pkg/package.json" | grep '"description"' | sed 's/.*"description": "\(.*\)".*/\1/' || echo "No description")
    has_src=$(test -d "packages/$pkg/src" && echo "✅" || echo "❌")
    echo "    $has_src $pkg - $description"
  fi
done

# Design and Art Packages
echo ""
echo "  🎨 DESIGN & ART PACKAGES:"
design_packages=(
  "master-art-principles"
  "japanese-design-system"
  "luxury-metallics-shaders"
  "3d-environments"
  "cathedral-design-library"
  "art-generation-node"
)

for pkg in "${design_packages[@]}"; do
  if [ -f "packages/$pkg/package.json" ]; then
    description=$(grep -A1 '"name"' "packages/$pkg/package.json" | grep '"description"' | sed 's/.*"description": "\(.*\)".*/\1/' || echo "No description")
    has_src=$(test -d "packages/$pkg/src" && echo "✅" || echo "❌")
    echo "    $has_src $pkg - $description"
  fi
done

# Game Mechanics Packages
echo ""
echo "  🎯 GAME MECHANICS PACKAGES:"
game_packages=(
  "fable-rpg-mechanics"
  "cyoa-book-game"
  "game-engine"
  "cathedral-fusion-kink-engine"
)

for pkg in "${game_packages[@]}"; do
  if [ -f "packages/$pkg/package.json" ]; then
    description=$(grep -A1 '"name"' "packages/$pkg/package.json" | grep '"description"' | sed 's/.*"description": "\(.*\)".*/\1/' || echo "No description")
    has_src=$(test -d "packages/$pkg/src" && echo "✅" || echo "❌")
    echo "    $has_src $pkg - $description"
  fi
done

# ========================================
# SPAM DETECTION
# ========================================
echo ""
echo "❌ SPAM AND ARTIFACTS DETECTED:"
echo ""

# Check for empty packages
echo "  📦 Empty/Incomplete Packages:"
for pkg_dir in packages/*/; do
  pkg_name=$(basename "$pkg_dir")
  
  # Skip known good packages
  if [[ " ${core_packages[@]} ${design_packages[@]} ${game_packages[@]} " =~ " ${pkg_name} " ]]; then
    continue
  fi
  
  # Check if package is empty or just has package.json
  file_count=$(find "$pkg_dir" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" | wc -l | tr -d ' ')
  src_files=$(find "$pkg_dir/src" -type f 2>/dev/null | wc -l | tr -d ' ')
  
  if [ "$file_count" -lt 3 ] || [ "$src_files" -eq 0 ]; then
    echo "    ⚠️  $pkg_name - Only $file_count files, $src_files src files"
  fi
done

# Check for packages with only echo scripts
echo ""
echo "  🔧 Packages with Echo Scripts (Spam):"
for pkg_dir in packages/*/; do
  if [ -f "$pkg_dir/package.json" ]; then
    if grep -q '"build": "echo' "$pkg_dir/package.json" 2>/dev/null; then
      pkg_name=$(basename "$pkg_dir")
      echo "    ❌ $pkg_name - Has echo script (not real implementation)"
    fi
  fi
done

# Check for duplicate packages
echo ""
echo "  🔄 Potential Duplicates:"
duplicates=(
  "codex-144-99|codex-14499|codex-144"
  "liber-arcanae|liber-arcanae-app|liber-arcanae-tools"
  "circuitum99|circuitum99-arcanae-cyoa"
)

for dup_group in "${duplicates[@]}"; do
  IFS='|' read -ra names <<< "$dup_group"
  found=()
  for name in "${names[@]}"; do
    if [ -f "packages/$name/package.json" ] || [ -d "apps/$name" ]; then
      found+=("$name")
    fi
  done
  if [ ${#found[@]} -gt 1 ]; then
    echo "    ⚠️  ${found[*]} - May be duplicates"
  fi
done

# Check for test/example packages that shouldn't be in production
echo ""
echo "  🧪 Test/Example Packages (Should be removed or moved):"
for pkg_dir in packages/*/; do
  pkg_name=$(basename "$pkg_dir")
  if [[ "$pkg_name" =~ (test|example|demo|sample|temp|tmp) ]]; then
    echo "    ⚠️  $pkg_name - Appears to be test/example/temp"
  fi
done

# Check for packages with no real code
echo ""
echo "  📝 Packages with No Real Implementation:"
for pkg_dir in packages/*/; do
  pkg_name=$(basename "$pkg_dir")
  
  # Skip known good packages
  if [[ " ${core_packages[@]} ${design_packages[@]} ${game_packages[@]} " =~ " ${pkg_name} " ]]; then
    continue
  fi
  
  if [ -f "$pkg_dir/package.json" ]; then
    # Check if it has real source files
    ts_files=$(find "$pkg_dir/src" -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l | tr -d ' ')
    js_files=$(find "$pkg_dir/src" -name "*.js" -o -name "*.jsx" 2>/dev/null | wc -l | tr -d ' ')
    
    if [ "$ts_files" -eq 0 ] && [ "$js_files" -eq 0 ]; then
      echo "    ⚠️  $pkg_name - No source files found"
    fi
  fi
done

# ========================================
# SUMMARY
# ========================================
echo ""
echo "📊 SUMMARY:"
total_apps=$(find apps -name "package.json" -type f 2>/dev/null | wc -l | tr -d ' ')
total_packages=$(find packages -name "package.json" -type f 2>/dev/null | wc -l | tr -d ' ')
echo "  Total Apps: $total_apps"
echo "  Total Packages: $total_packages"
echo "  Core Game Packages: ${#core_packages[@]}"
echo "  Design Packages: ${#design_packages[@]}"
echo "  Game Mechanics Packages: ${#game_packages[@]}"
echo ""
echo "✅ Analysis complete!"

