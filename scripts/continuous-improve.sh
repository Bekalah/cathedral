#!/bin/bash
# Continuous Improve
# Runs all improvement and merge operations continuously

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔄 Continuous Improvement Cycle"
echo "==============================\n"

# Run all improvement scripts
echo "1. Improving and merging..."
bash scripts/improve-and-merge.sh

echo "\n2. Securing and integrating..."
bash scripts/secure-integrate-improve.sh

echo "\n3. Recovering data..."
bash scripts/comprehensive-data-recovery.sh

echo "\n4. Verifying..."
bash scripts/verify-recovered-data.sh

echo "\n✅ Continuous improvement cycle complete!"

