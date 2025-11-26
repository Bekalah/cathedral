#!/bin/bash
# Merge from Other Repositories
# Safely merges improvements from other cathedral repositories

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔄 Merging from Other Repositories"
echo "===================================\n"

# Source repositories
CATHEDRAL_REAL="/Users/rebeccalemke/cathedral-real"
CATHEDRAL_V1="/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master"

# Function to safely merge file
safe_merge_file() {
  local source="$1"
  local dest="$2"
  local description="$3"
  
  if [ ! -f "$source" ]; then
    return 1
  fi
  
  if [ ! -f "$dest" ]; then
    echo "  📥 New: $description"
    mkdir -p "$(dirname "$dest")"
    cp "$source" "$dest"
    return 0
  fi
  
  # Compare sizes
  local source_size=$(stat -f%z "$source" 2>/dev/null || stat -c%s "$source" 2>/dev/null || echo "0")
  local dest_size=$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null || echo "0")
  
  if [ "$source_size" -gt "$dest_size" ]; then
    echo "  📥 Updated: $description (${source_size} > ${dest_size} bytes)"
    cp "$source" "$dest"
    return 0
  fi
  
  return 0
}

# Merge configurations
echo "1. Merging configurations..."
safe_merge_file "$CATHEDRAL_REAL/turbo.json" "$ROOT_DIR/turbo.json.backup" "turbo.json backup"
safe_merge_file "$CATHEDRAL_REAL/.nvmrc" "$ROOT_DIR/.nvmrc" ".nvmrc"
safe_merge_file "$CATHEDRAL_REAL/.gitignore" "$ROOT_DIR/.gitignore.backup" ".gitignore backup"

# Merge package improvements
echo "\n2. Merging package improvements..."
for pkg_dir in packages/*/; do
  pkg_name=$(basename "$pkg_dir")
  
  # Merge package.json if source is better
  if [ -f "$CATHEDRAL_REAL/packages/$pkg_name/package.json" ]; then
    safe_merge_file \
      "$CATHEDRAL_REAL/packages/$pkg_name/package.json" \
      "$pkg_dir/package.json.backup" \
      "$pkg_name/package.json backup"
  fi
  
  # Merge README if exists
  if [ -f "$CATHEDRAL_REAL/packages/$pkg_name/README.md" ]; then
    safe_merge_file \
      "$CATHEDRAL_REAL/packages/$pkg_name/README.md" \
      "$pkg_dir/README.md" \
      "$pkg_name/README.md"
  fi
done

# Merge scripts
echo "\n3. Merging scripts..."
if [ -d "$CATHEDRAL_REAL/scripts" ]; then
  for script in "$CATHEDRAL_REAL/scripts"/*.sh; do
    if [ -f "$script" ]; then
      script_name=$(basename "$script")
      safe_merge_file \
        "$script" \
        "$ROOT_DIR/scripts/$script_name.backup" \
        "script: $script_name"
    fi
  done
fi

echo "\n✅ Merge from other repositories complete!"
echo "📝 Review .backup files before applying changes"

