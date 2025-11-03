#!/usr/bin/env bash
# 🏰 SAFE CATHEDRAL CONSOLIDATION SCRIPT
# Change ID: consolidate-master-cathedral-v1

set -e

echo "🏰 Starting Cathedral V1.0 Safe Consolidation"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Create backup of external packages
log_info "Creating backup of external packages..."
if [ -d "external" ]; then
    cp -r external external-backup-$(date +%Y%m%d-%H%M%S)
    log_info "Backup created: external-backup-$(date +%Y%m%d-%H%M%S)/"
else
    log_warn "No external/ directory found to backup"
fi

# 2. Verify no external dependencies exist
log_info "Verifying no external package dependencies..."
EXTERNAL_REFS=$(grep -r "external/codex-144-99\|external/liber-arcanae" . --include="*.ts" --include="*.js" --include="*.json" --exclude-dir=node_modules --exclude-dir=external --exclude-dir="external-backup-*" 2>/dev/null | grep -v placeholder || true)

if [ -n "$EXTERNAL_REFS" ]; then
    log_error "Found external package references that need updating:"
    echo "$EXTERNAL_REFS"
    log_error "Consolidation cancelled - manual intervention required"
    exit 1
else
    log_info "✓ No external package references found - safe to proceed"
fi

# 3. Validate package integrity
log_info "Validating package integrity..."
cd packages/codex-144-99
if [ -f "package.json" ]; then
    log_info "✓ packages/codex-144-99/package.json exists"
else
    log_error "✗ packages/codex-144-99/package.json missing!"
    exit 1
fi
cd ../liber-arcanae
if [ -f "package.json" ]; then
    log_info "✓ packages/liber-arcanae/package.json exists"
else
    log_error "✗ packages/liber-arcanae/package.json missing!"
    exit 1
fi
cd ../..

# 4. Check Turbo configuration
log_info "Checking Turbo configuration..."
if [ -f "turbo.json" ]; then
    log_info "✓ turbo.json exists"
else
    log_warn "turbo.json not found - may need manual configuration"
fi

# 5. Ready for consolidation
log_info "Validation complete - ready for consolidation!"
echo ""
echo "Next steps:"
echo "1. Remove external packages: rm -rf external/"
echo "2. Update any workspace references if needed"
echo "3. Run validation: pnpm run validate:all"
echo "4. Test build: pnpm run build"
echo ""
log_info "Consolidation validation successful! 🎉"