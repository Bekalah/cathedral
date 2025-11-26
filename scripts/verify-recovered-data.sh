#!/bin/bash
# Verify All Recovered Data
# Checks integrity and completeness of all recovered data files

set -e

echo "🔍 Verifying Recovered Data"
echo "===========================\n"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Critical files to verify
declare -A CRITICAL_FILES=(
  ["data/codex-144-expanded.json"]="Codex 144:99 expanded data"
  ["data/complete-arcana-profiles.json"]="Complete Arcana profiles"
  ["data/complete-rebecca-arcanae-influences.json"]="Rebecca Arcanae influences"
  ["data/mcp-permanent-dataset.json"]="MCP permanent dataset"
  ["packages/codex-144-99/data/codex-144-expanded.json"]="Codex package data"
  ["packages/codex-144-99/data/codex14499-lattice.json"]="Codex lattice data"
  ["packages/liber-arcanae/data/complete-arcana-profiles.json"]="Liber Arcanae data"
)

# Verify function
verify_file() {
  local file="$1"
  local description="$2"
  local full_path="$ROOT_DIR/$file"
  
  if [ ! -f "$full_path" ]; then
    echo "  ❌ Missing: $description ($file)"
    return 1
  fi
  
  # Check file size
  local size=$(stat -f%z "$full_path" 2>/dev/null || stat -c%s "$full_path" 2>/dev/null || echo "0")
  
  if [ "$size" -eq 0 ]; then
    echo "  ⚠️  Empty: $description ($file)"
    return 1
  fi
  
  # Validate JSON
  if command -v python3 &> /dev/null; then
    if ! python3 -m json.tool "$full_path" > /dev/null 2>&1; then
      echo "  ❌ Invalid JSON: $description ($file)"
      return 1
    fi
  elif command -v node &> /dev/null; then
    if ! node -e "JSON.parse(require('fs').readFileSync('$full_path'))" 2>/dev/null; then
      echo "  ❌ Invalid JSON: $description ($file)"
      return 1
    fi
  fi
  
  local size_kb=$((size / 1024))
  echo "  ✅ Valid: $description ($file) - ${size_kb}KB"
  return 0
}

# Verify all critical files
echo "📋 Verifying Critical Files:"
all_good=true
for file in "${!CRITICAL_FILES[@]}"; do
  if ! verify_file "$file" "${CRITICAL_FILES[$file]}"; then
    all_good=false
  fi
done

# Count all JSON files
echo "\n📊 Data File Statistics:"
total_json=$(find "$ROOT_DIR/data" "$ROOT_DIR/packages" -name "*.json" -type f 2>/dev/null | wc -l | tr -d ' ')
echo "  Total JSON files: $total_json"

# Summary
echo "\n📋 Summary:"
if [ "$all_good" = true ]; then
  echo "  ✅ All critical data files verified!"
else
  echo "  ⚠️  Some data files need attention"
fi

echo "\n✅ Verification complete!"

