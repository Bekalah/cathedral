#!/bin/bash
# Comprehensive Data Recovery
# Recovers ALL real data from ALL cathedral repositories safely

set -e

echo "🔍 Comprehensive Data Recovery"
echo "=============================\n"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Source directories
CATHEDRAL_REAL="/Users/rebeccalemke/cathedral-real"
CATHEDRAL_V1="/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master"
RESTORE_TEMP="/Users/rebeccalemke/restore_temp"

# Destination
DEST_DATA="$ROOT_DIR/data"
DEST_CODEX="$ROOT_DIR/packages/codex-144-99/data"
DEST_LIBER="$ROOT_DIR/packages/liber-arcanae/data"
DEST_CIRCUITUM="$ROOT_DIR/packages/circuitum99/data"
DEST_STONE="$ROOT_DIR/packages/stone-grimoire/data"

# Create destination directories
mkdir -p "$DEST_DATA" "$DEST_CODEX" "$DEST_LIBER" "$DEST_CIRCUITUM" "$DEST_STONE"

# Function to safely copy file
safe_copy() {
  local source="$1"
  local dest="$2"
  local name="$3"
  
  if [ ! -f "$source" ]; then
    echo "  ⚠️  Not found: $name"
    return 1
  fi
  
  if [ -f "$dest" ]; then
    # Compare file sizes and dates
    local source_size=$(stat -f%z "$source" 2>/dev/null || stat -c%s "$source" 2>/dev/null || echo "0")
    local dest_size=$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null || echo "0")
    
    if [ "$source_size" -gt "$dest_size" ]; then
      echo "  📥 Updating: $name (source is larger: ${source_size} > ${dest_size} bytes)"
      cp "$source" "$dest"
      return 0
    else
      echo "  ✓ Preserved: $name (destination is current)"
      return 0
    fi
  else
    echo "  📥 Recovering: $name"
    cp "$source" "$dest"
    return 0
  fi
}

# Recover from cathedral-real/data
echo "📁 Recovering from cathedral-real/data..."
if [ -d "$CATHEDRAL_REAL/data" ]; then
  for file in "$CATHEDRAL_REAL/data"/*.json; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      
      # Copy to main data directory
      safe_copy "$file" "$DEST_DATA/$filename" "$filename"
      
      # Copy to specific package directories if relevant
      case "$filename" in
        codex-144-expanded.json|codex-144*.json)
          safe_copy "$file" "$DEST_CODEX/$filename" "codex-144-99/data/$filename"
          ;;
        complete-arcana-profiles.json|*arcana*.json)
          safe_copy "$file" "$DEST_LIBER/$filename" "liber-arcanae/data/$filename"
          ;;
        *circuitum*.json|*circuit*.json)
          safe_copy "$file" "$DEST_CIRCUITUM/$filename" "circuitum99/data/$filename"
          ;;
        *stone*.json|*grimoire*.json)
          safe_copy "$file" "$DEST_STONE/$filename" "stone-grimoire/data/$filename"
          ;;
      esac
    fi
  done
else
  echo "  ⚠️  cathedral-real/data not found"
fi

# Recover from cathedral-real package data directories
echo "\n📁 Recovering from cathedral-real packages..."
if [ -d "$CATHEDRAL_REAL/packages/codex-144-99/data" ]; then
  for file in "$CATHEDRAL_REAL/packages/codex-144-99/data"/*.json; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      safe_copy "$file" "$DEST_CODEX/$filename" "codex-144-99/data/$filename"
    fi
  done
fi

if [ -d "$CATHEDRAL_REAL/packages/liber-arcanae/data" ]; then
  for file in "$CATHEDRAL_REAL/packages/liber-arcanae/data"/*.json; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      safe_copy "$file" "$DEST_LIBER/$filename" "liber-arcanae/data/$filename"
    fi
  done
fi

# Recover from restore_temp if it exists
echo "\n📁 Recovering from restore_temp..."
if [ -d "$RESTORE_TEMP" ]; then
  find "$RESTORE_TEMP" -name "*.json" -type f | while read -r file; do
    filename=$(basename "$file")
    relpath=$(echo "$file" | sed "s|$RESTORE_TEMP/||")
    
    # Determine destination based on filename
    if [[ "$filename" == *codex* ]]; then
      safe_copy "$file" "$DEST_CODEX/$filename" "restore_temp → codex-144-99/data/$filename"
    elif [[ "$filename" == *arcana* ]]; then
      safe_copy "$file" "$DEST_LIBER/$filename" "restore_temp → liber-arcanae/data/$filename"
    else
      safe_copy "$file" "$DEST_DATA/$filename" "restore_temp → data/$filename"
    fi
  done
fi

# Verify critical files
echo "\n🔍 Verifying critical data files..."
critical_files=(
  "$DEST_DATA/codex-144-expanded.json"
  "$DEST_DATA/complete-arcana-profiles.json"
  "$DEST_CODEX/codex-144-expanded.json"
  "$DEST_LIBER/complete-arcana-profiles.json"
)

all_good=true
for file in "${critical_files[@]}"; do
  if [ -f "$file" ]; then
    # Validate JSON
    if python3 -m json.tool "$file" > /dev/null 2>&1 || node -e "JSON.parse(require('fs').readFileSync('$file'))" 2>/dev/null; then
      size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "0")
      echo "  ✅ Valid: $(basename "$file") ($(numfmt --to=iec-i --suffix=B "$size" 2>/dev/null || echo "${size} bytes"))"
    else
      echo "  ❌ Invalid JSON: $(basename "$file")"
      all_good=false
    fi
  else
    echo "  ⚠️  Missing: $(basename "$file")"
    all_good=false
  fi
done

# Summary
echo "\n📊 Recovery Summary:"
echo "  Data directory: $DEST_DATA"
echo "  Codex data: $DEST_CODEX"
echo "  Liber Arcanae data: $DEST_LIBER"
echo "  Circuitum99 data: $DEST_CIRCUITUM"
echo "  Stone Grimoire data: $DEST_STONE"

if [ "$all_good" = true ]; then
  echo "\n✅ All critical data files recovered and verified!"
else
  echo "\n⚠️  Some data files need attention"
fi

echo "\n✅ Comprehensive data recovery complete!"

