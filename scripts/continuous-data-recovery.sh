#!/bin/bash
# Continuous Data Recovery
# Monitors and recovers data from all sources continuously

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔄 Continuous Data Recovery"
echo "===========================\n"

# Source directories to monitor
SOURCES=(
  "/Users/rebeccalemke/cathedral-real/data"
  "/Users/rebeccalemke/cathedral-real/packages/codex-144-99/data"
  "/Users/rebeccalemke/cathedral-real/packages/liber-arcanae/data"
  "/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master/data"
  "/Users/rebeccalemke/restore_temp"
)

# Destination
DEST_DATA="$ROOT_DIR/data"
DEST_CODEX="$ROOT_DIR/packages/codex-144-99/data"
DEST_LIBER="$ROOT_DIR/packages/liber-arcanae/data"

mkdir -p "$DEST_DATA" "$DEST_CODEX" "$DEST_LIBER"

# Function to recover file if needed
recover_if_needed() {
  local source="$1"
  local dest="$2"
  local name="$3"
  
  if [ ! -f "$source" ]; then
    return 1
  fi
  
  if [ ! -f "$dest" ]; then
    echo "  📥 New: $name"
    cp "$source" "$dest"
    return 0
  fi
  
  # Compare sizes
  local source_size=$(stat -f%z "$source" 2>/dev/null || stat -c%s "$source" 2>/dev/null || echo "0")
  local dest_size=$(stat -f%z "$dest" 2>/dev/null || stat -c%s "$dest" 2>/dev/null || echo "0")
  
  if [ "$source_size" -gt "$dest_size" ]; then
    echo "  📥 Updated: $name (${source_size} > ${dest_size} bytes)"
    cp "$source" "$dest"
    return 0
  fi
  
  return 0
}

# Recover from all sources
recovered_count=0
for source_dir in "${SOURCES[@]}"; do
  if [ ! -d "$source_dir" ]; then
    continue
  fi
  
  echo "📁 Scanning: $source_dir"
  
  find "$source_dir" -name "*.json" -type f | while read -r source_file; do
    filename=$(basename "$source_file")
    
    # Determine destination
    if [[ "$filename" == *codex* ]] || [[ "$filename" == *lattice* ]]; then
      dest="$DEST_CODEX/$filename"
    elif [[ "$filename" == *arcana* ]] || [[ "$filename" == *rebecca* ]]; then
      dest="$DEST_LIBER/$filename"
    else
      dest="$DEST_DATA/$filename"
    fi
    
    if recover_if_needed "$source_file" "$dest" "$filename"; then
      recovered_count=$((recovered_count + 1))
    fi
  done
done

echo "\n✅ Continuous recovery complete!"
echo "📊 Files processed from ${#SOURCES[@]} source directories"

