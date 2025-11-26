#!/bin/bash
# Integrate All Data
# Ensures all recovered data is properly integrated

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔗 Integrating All Data"
echo "=======================\n"

# 1. Ensure all data directories exist
echo "1. Creating data directories..."
mkdir -p data packages/codex-144-99/data packages/liber-arcanae/data packages/circuitum99/data packages/stone-grimoire/data

# 2. Copy main data to package directories
echo "\n2. Copying data to packages..."

# Codex data
if [ -f "data/codex-144-expanded.json" ]; then
  cp "data/codex-144-expanded.json" "packages/codex-144-99/data/" 2>/dev/null || true
  echo "  ✅ Codex data integrated"
fi

if [ -f "data/codex-arcanae-mirror.json" ]; then
  cp "data/codex-arcanae-mirror.json" "packages/codex-144-99/data/" 2>/dev/null || true
fi

# Liber Arcanae data
if [ -f "data/complete-arcana-profiles.json" ]; then
  cp "data/complete-arcana-profiles.json" "packages/liber-arcanae/data/" 2>/dev/null || true
  echo "  ✅ Arcana data integrated"
fi

if [ -f "data/complete-rebecca-arcanae-influences.json" ]; then
  cp "data/complete-rebecca-arcanae-influences.json" "packages/liber-arcanae/data/" 2>/dev/null || true
fi

# 3. Verify data integrity
echo "\n3. Verifying data integrity..."
for data_file in data/*.json; do
  if [ -f "$data_file" ]; then
    if python3 -m json.tool "$data_file" > /dev/null 2>&1 || node -e "JSON.parse(require('fs').readFileSync('$data_file'))" 2>/dev/null; then
      echo "  ✅ Valid: $(basename "$data_file")"
    else
      echo "  ⚠️  Invalid: $(basename "$data_file")"
    fi
  fi
done

# 4. Create data index
echo "\n4. Creating data index..."
cat > data/INDEX.md << 'EOF'
# Data Index

## Critical Files
- `codex-144-expanded.json` - Complete 144-node Codex system
- `complete-arcana-profiles.json` - All 22 Major Arcana profiles
- `complete-rebecca-arcanae-influences.json` - Historical research
- `mcp-permanent-dataset.json` - Mystical dataset

## Package Data
- `packages/codex-144-99/data/` - Codex-specific data
- `packages/liber-arcanae/data/` - Arcana-specific data
- `packages/circuitum99/data/` - Circuitum99 data
- `packages/stone-grimoire/data/` - Stone Grimoire data
EOF

echo "\n✅ Data integration complete!"

