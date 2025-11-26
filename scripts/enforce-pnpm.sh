#!/bin/bash
# Enforce pnpm - Check and prevent npm usage

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔒 Checking for npm usage..."

# Check for package-lock.json
if [ -f "package-lock.json" ]; then
  echo "❌ ERROR: package-lock.json found!"
  echo "   This repository uses pnpm only."
  echo "   Run: rm package-lock.json && pnpm install"
  exit 1
fi

# Check for npm in scripts
if grep -r "npm " scripts/ packages/ apps/ --include="*.sh" --include="package.json" 2>/dev/null | grep -v "pnpm" | grep -v "node_modules"; then
  echo "⚠️  WARNING: npm references found in scripts"
  echo "   Run: pnpm run remove:npm to fix"
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "❌ ERROR: pnpm is not installed!"
  echo "   Install: npm install -g pnpm (one-time, then use pnpm only)"
  exit 1
fi

echo "✅ pnpm enforcement check passed"
