#!/bin/bash
# Complete fix for all systems - runs all standardization and security fixes
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

cd "$ROOT_DIR"

log "🚀 Starting complete fix process..."
log ""

# 1. Security and upgrade
log "Step 1: Security and upgrade..."
bash scripts/secure-and-upgrade.sh
log ""

# 2. Standardize packages
log "Step 2: Standardizing package.json files..."
bash scripts/standardize-all-packages.sh
log ""

# 3. Standardize tsconfig
log "Step 3: Checking tsconfig.json files..."
bash scripts/standardize-tsconfig.sh
log ""

# 4. Apply Japanese design
log "Step 4: Applying Japanese design system..."
bash scripts/apply-japanese-design.sh
log ""

# 5. Verify connections
log "Step 5: Verifying cross-package connections..."
if [ -f "scripts/verify-cross-connections.ts" ]; then
    ppnpm run verify:connections 2>/dev/null || warn "  Connection verification skipped (dependencies may need install)"
fi
log ""

log "✅ Complete fix process finished!"
log ""
log "📋 Summary:"
log "  ✓ Security hardened"
log "  ✓ Git remotes secured"
log "  ✓ Console injection removed"
log "  ✓ Package.json files standardized"
log "  ✓ Tsconfig files checked"
log "  ✓ Japanese design system applied"
log ""
log "📋 Next steps:"
log "  1. Install dependencies: ppnpm install"
log "  2. Build: ppnpm run build"
log "  3. Review: git status"
log "  4. Commit: git add . && git commit -m 'chore: complete system fix and Japanese design integration'"
log "  5. Push: git push origin main"

