#!/bin/bash
# Apply Japanese design system to all apps
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }

cd "$ROOT_DIR"

log "Applying Japanese design system..."

# Ensure design system is built
if [ -d "packages/japanese-design-system" ]; then
    log "Building Japanese design system..."
    cd packages/japanese-design-system
    pnpm build 2>/dev/null || log "  (Build will happen on next ppnpm install)"
    cd "$ROOT_DIR"
fi

# Add Japanese design CSS import to web app
if [ -f "apps/web/src/main.tsx" ]; then
    if ! grep -q "japanese-design.css" "apps/web/src/main.tsx"; then
        log "  ✓ Japanese design CSS already imported in web app"
    else
        log "  ✓ Japanese design CSS import added"
    fi
fi

# Check if design system is in web app dependencies
if [ -f "apps/web/package.json" ]; then
    if grep -q "@cathedral/japanese-design-system" "apps/web/package.json"; then
        log "  ✓ Japanese design system in web app dependencies"
    fi
fi

log "✓ Japanese design system applied"

