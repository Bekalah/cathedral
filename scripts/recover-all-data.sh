#!/bin/bash
# Complete Data Recovery Script
# Safely recovers all real data from all cathedral repositories

set -e

echo "🔍 Complete Data Recovery Process"
echo "=================================\n"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Step 1: Run TypeScript recovery script
echo "Step 1: Running TypeScript data recovery..."
if command -v tsx &> /dev/null; then
  tsx scripts/recover-real-data.ts
elif command -v ts-node &> /dev/null; then
  ts-node scripts/recover-real-data.ts
else
  echo "⚠️  TypeScript runner not found, using Node with --loader"
  node --loader ts-node/esm scripts/recover-real-data.ts || echo "⚠️  TypeScript recovery skipped"
fi

# Step 2: Manual recovery from cathedral-real
echo "\nStep 2: Manual recovery from cathedral-real..."
CATHEDRAL_REAL_DATA="/Users/rebeccalemke/cathedral-real/data"
CATHEDRAL_FIXED_DATA="$ROOT_DIR/data"

if [ -d "$CATHEDRAL_REAL_DATA" ]; then
  echo "  📁 Found cathedral-real/data directory"
  
  # Create data directory if it doesn't exist
  mkdir -p "$CATHEDRAL_FIXED_DATA"
  
  # Copy critical files
  for file in codex-144-expanded.json complete-arcana-profiles.json mcp-permanent-dataset.json; do
    if [ -f "$CATHEDRAL_REAL_DATA/$file" ]; then
      if [ ! -f "$CATHEDRAL_FIXED_DATA/$file" ] || [ "$CATHEDRAL_REAL_DATA/$file" -nt "$CATHEDRAL_FIXED_DATA/$file" ]; then
        echo "  📥 Recovering: $file"
        cp "$CATHEDRAL_REAL_DATA/$file" "$CATHEDRAL_FIXED_DATA/$file"
      else
        echo "  ✓ Preserved: $file"
      fi
    fi
  done
else
  echo "  ⚠️  cathedral-real/data not found"
fi

# Step 3: Recover package-specific data
echo "\nStep 3: Recovering package-specific data..."

# Codex 144:99 data
CODEX_DATA_DIR="$ROOT_DIR/packages/codex-144-99/data"
mkdir -p "$CODEX_DATA_DIR"
if [ -f "$CATHEDRAL_REAL_DATA/codex-144-expanded.json" ]; then
  if [ ! -f "$CODEX_DATA_DIR/codex-144-expanded.json" ] || [ "$CATHEDRAL_REAL_DATA/codex-144-expanded.json" -nt "$CODEX_DATA_DIR/codex-144-expanded.json" ]; then
    echo "  📥 Recovering: codex-144-expanded.json → codex-144-99/data/"
    cp "$CATHEDRAL_REAL_DATA/codex-144-expanded.json" "$CODEX_DATA_DIR/codex-144-expanded.json"
  fi
fi

# Liber Arcanae data
LIBER_DATA_DIR="$ROOT_DIR/packages/liber-arcanae/data"
mkdir -p "$LIBER_DATA_DIR"
if [ -f "$CATHEDRAL_REAL_DATA/complete-arcana-profiles.json" ]; then
  if [ ! -f "$LIBER_DATA_DIR/complete-arcana-profiles.json" ] || [ "$CATHEDRAL_REAL_DATA/complete-arcana-profiles.json" -nt "$LIBER_DATA_DIR/complete-arcana-profiles.json" ]; then
    echo "  📥 Recovering: complete-arcana-profiles.json → liber-arcanae/data/"
    cp "$CATHEDRAL_REAL_DATA/complete-arcana-profiles.json" "$LIBER_DATA_DIR/complete-arcana-profiles.json"
  fi
fi

# Step 4: Verify recovered data
echo "\nStep 4: Verifying recovered data..."
if [ -f "$ROOT_DIR/scripts/recover-real-data.ts" ]; then
  if command -v tsx &> /dev/null; then
    tsx -e "import('./scripts/recover-real-data.ts').then(m => m.verifyData())" || true
  fi
fi

echo "\n✅ Data recovery complete!"
echo "📄 Check DATA_RECOVERY_REPORT.json for details"

