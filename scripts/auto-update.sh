#!/bin/bash
# Automatic Update - Free, seamless updates

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔄 Automatic Update..."

# Update dependencies
if command -v pnpm &> /dev/null; then
  echo "  Updating dependencies..."
  pnpm update --latest --recursive || true
fi

# Run security audit
echo "  Running security audit..."
ppnpm audit --audit-level=moderate || true

# Rebuild
echo "  Rebuilding..."
ppnpm run build || true

echo "✅ Automatic update complete"
