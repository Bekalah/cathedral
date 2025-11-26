#!/bin/bash
# =====================================================
# COMPREHENSIVE DATA CONSOLIDATION
# 
# Reads ALL real data from:
# - cathedral-real
# - cathedral-v1-consolidated
# - restore_temp
# 
# Merges into cathedral-fixed-clean, keeping largest versions
# =====================================================

set -e

TARGET="/Users/rebeccalemke/cathedral-fixed-clean"
SOURCE_REAL="/Users/rebeccalemke/cathedral-real"
SOURCE_V1="/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master"
SOURCE_RESTORE="/Users/rebeccalemke/restore_temp"

echo "📦 COMPREHENSIVE DATA CONSOLIDATION"
echo "===================================="
echo ""
echo "Target: $TARGET"
echo "Sources:"
echo "  - $SOURCE_REAL"
echo "  - $SOURCE_V1"
echo "  - $SOURCE_RESTORE"
echo ""

# Create data directories
mkdir -p "$TARGET/data"
mkdir -p "$TARGET/data/codex"
mkdir -p "$TARGET/data/arcana"
mkdir -p "$TARGET/data/research"
mkdir -p "$TARGET/data/design"
mkdir -p "$TARGET/data/esoteric"
mkdir -p "$TARGET/config"

# Function to copy largest version of a file
copy_largest() {
  local filename="$1"
  local target_path="$2"
  local sources=("$3" "$4" "$5" "$6" "$7")
  
  local largest_file=""
  local largest_size=0
  
  for src in "${sources[@]}"; do
    if [ -f "$src" ]; then
      local size=$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src" 2>/dev/null || echo 0)
      if [ "$size" -gt "$largest_size" ]; then
        largest_size=$size
        largest_file="$src"
      fi
    fi
  done
  
  if [ -n "$largest_file" ] && [ "$largest_size" -gt 0 ]; then
    echo "  ✅ $filename (${largest_size} bytes from $largest_file)"
    cp "$largest_file" "$target_path"
  else
    echo "  ❌ $filename not found"
  fi
}

echo "1. CODEX DATA"
echo "============="

copy_largest "codex-144-expanded.json" "$TARGET/data/codex/codex-144-expanded.json" \
  "$SOURCE_REAL/config/codex-144-expanded.json" \
  "$SOURCE_REAL/codex-144-expanded.json" \
  "$SOURCE_V1/config/codex-144-expanded.json"

copy_largest "codex-arcanae-mirror.json" "$TARGET/data/codex/codex-arcanae-mirror.json" \
  "$SOURCE_REAL/codex-arcanae-mirror.json" \
  "$SOURCE_REAL/data/codex-arcanae-mirror.json"

copy_largest "codex_nodes.json" "$TARGET/data/codex/codex_nodes.json" \
  "$SOURCE_REAL/integration/codex_nodes.json" \
  "$SOURCE_REAL/packages/data/codex/codex_nodes.json" \
  "$SOURCE_V1/integration/codex_nodes.json"

copy_largest "codex_14499.json" "$TARGET/data/codex/codex_14499.json" \
  "$SOURCE_REAL/codex/codex_14499.json" \
  "$SOURCE_V1/codex/codex_14499.json"

copy_largest "node-registry-complete.json" "$TARGET/data/codex/node-registry-complete.json" \
  "$SOURCE_REAL/node-registry-complete.json" \
  "$SOURCE_REAL/data/node-registry-complete.json"

echo ""
echo "2. ARCANA/TAROT DATA"
echo "===================="

copy_largest "TAROT_MASTER_DATASET.json" "$TARGET/data/arcana/TAROT_MASTER_DATASET.json" \
  "$SOURCE_REAL/config/TAROT_MASTER_DATASET.json" \
  "$SOURCE_REAL/TAROT_MASTER_DATASET.json" \
  "$SOURCE_V1/config/TAROT_MASTER_DATASET.json"

copy_largest "complete-arcana-profiles.json" "$TARGET/data/arcana/complete-arcana-profiles.json" \
  "$SOURCE_REAL/config/complete-arcana-profiles.json" \
  "$SOURCE_REAL/complete-arcana-profiles.json" \
  "$SOURCE_V1/config/complete-arcana-profiles.json"

copy_largest "majors.json" "$TARGET/data/arcana/majors.json" \
  "$SOURCE_REAL/packages/data/arcana/majors.json"

copy_largest "majors-complete.json" "$TARGET/data/arcana/majors-complete.json" \
  "$SOURCE_REAL/packages/data/arcana/majors-complete.json"

echo ""
echo "3. RESEARCH DATA"
echo "================"

copy_largest "research-sources.json" "$TARGET/data/research/research-sources.json" \
  "$SOURCE_REAL/research-sources.json" \
  "$SOURCE_REAL/data/research-sources.json" \
  "$SOURCE_V1/research-sources.json"

copy_largest "mcp-permanent-dataset.json" "$TARGET/data/research/mcp-permanent-dataset.json" \
  "$SOURCE_REAL/mcp-permanent-dataset.json" \
  "$SOURCE_REAL/data/mcp-permanent-dataset.json" \
  "$SOURCE_V1/mcp-permanent-dataset.json"

copy_largest "quality-guardian-registry.json" "$TARGET/data/research/quality-guardian-registry.json" \
  "$SOURCE_REAL/quality-guardian-registry.json" \
  "$SOURCE_REAL/data/quality-guardian-registry.json" \
  "$SOURCE_V1/quality-guardian-registry.json"

copy_largest "complete-rebecca-arcanae-influences.json" "$TARGET/data/research/complete-rebecca-arcanae-influences.json" \
  "$SOURCE_REAL/data/complete-rebecca-arcanae-influences.json"

echo ""
echo "4. DESIGN DATA"
echo "=============="

copy_largest "pigments-database.json" "$TARGET/data/design/pigments-database.json" \
  "$SOURCE_REAL/pigments-database.json" \
  "$SOURCE_REAL/data/pigments-database.json" \
  "$SOURCE_V1/pigments-database.json"

copy_largest "grimoire_concepts.json" "$TARGET/data/design/grimoire_concepts.json" \
  "$SOURCE_REAL/grimoire_concepts.json" \
  "$SOURCE_REAL/config/grimoire_concepts.json" \
  "$SOURCE_V1/config/grimoire_concepts.json"

# Design suite outputs
if [ -d "$SOURCE_REAL/design-suite/outputs" ]; then
  echo "  Copying design-suite outputs..."
  mkdir -p "$TARGET/data/design/design-suite"
  cp -r "$SOURCE_REAL/design-suite/outputs/"*.json "$TARGET/data/design/design-suite/" 2>/dev/null || true
fi

echo ""
echo "5. ESOTERIC DATA"
echo "================"

# Angels data
if [ -f "$SOURCE_V1/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform/public/data/angels72.json" ]; then
  echo "  ✅ angels72.json"
  cp "$SOURCE_V1/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform/public/data/angels72.json" "$TARGET/data/esoteric/angels72.json"
fi

if [ -f "$SOURCE_V1/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform/public/data/codex_of_abyssiae.json" ]; then
  echo "  ✅ codex_of_abyssiae.json"
  cp "$SOURCE_V1/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform/public/data/codex_of_abyssiae.json" "$TARGET/data/esoteric/codex_of_abyssiae.json"
fi

echo ""
echo "6. CONFIG FILES"
echo "==============="

copy_largest "CATHEDRAL_INTEGRATION_MAP.json" "$TARGET/config/CATHEDRAL_INTEGRATION_MAP.json" \
  "$SOURCE_REAL/CATHEDRAL_INTEGRATION_MAP.json" \
  "$SOURCE_V1/CATHEDRAL_INTEGRATION_MAP.json"

echo ""
echo "7. REGISTRY DATA"
echo "================"

if [ -d "$SOURCE_REAL/REGISTRY" ]; then
  echo "  Copying REGISTRY folder..."
  cp -r "$SOURCE_REAL/REGISTRY" "$TARGET/" 2>/dev/null || true
fi

echo ""
echo "===================================="
echo "✅ DATA CONSOLIDATION COMPLETE"
echo ""
echo "Summary:"
echo "  - Codex data: $(ls $TARGET/data/codex/*.json 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Arcana data: $(ls $TARGET/data/arcana/*.json 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Research data: $(ls $TARGET/data/research/*.json 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Design data: $(ls $TARGET/data/design/*.json 2>/dev/null | wc -l | tr -d ' ') files"
echo "  - Esoteric data: $(ls $TARGET/data/esoteric/*.json 2>/dev/null | wc -l | tr -d ' ') files"
echo ""
echo "All data now in: $TARGET/data/"

