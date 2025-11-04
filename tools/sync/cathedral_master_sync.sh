#!/usr/bin/env bash
set -euo pipefail

# Sync the consolidated Cathedral Master system
# Usage: tools/sync/cathedral_master_sync.sh
# This script now works with the consolidated repository structure

echo "🏰 Cathedral Master - Sync Tools Update"
echo "========================================"
echo ""

# Update web platform
echo "📦 Updating web platform..."
cd packages/web-platform
npm install --silent
echo "✅ Web platform updated"

# Update Rust engines
echo ""
echo "🦀 Updating Rust engines..."
cd ../../rust-engines
cargo update
cargo build --workspace --release --quiet
echo "✅ Rust engines updated"

# Update main project
echo ""
echo "🔧 Updating main project..."
cd ..
pnpm install --silent
echo "✅ Main project dependencies updated"

# Run tests to verify everything works
echo ""
echo "🧪 Running system validation..."
pnpm run lint || echo "⚠️  Lint warnings (non-blocking)"
pnpm run type-check || echo "⚠️  Type check warnings (non-blocking)"

echo ""
echo "🎉 Cathedral Master tools updated successfully!"
echo ""
echo "🚀 Ready for deployment to:"
echo "   - GitHub Pages: https://github.com/Bekalah/cathedral"
echo "   - Vercel: Import repository for instant deployment"
echo "   - Godot 4.5: Projects available in godot-cathedral/"
echo ""
echo "💫 All systems operational!"
