#!/bin/bash
# Standardize all package.json files to best quality (gracefully handles errors)
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

# Standard repository info
REPO_URL="https://github.com/Bekalah/cathedral.git"
HOMEPAGE="https://bekalah.github.io/cathedral"
AUTHOR="Rebecca Respawn <bekalah>"
LICENSE="CC0-1.0"

log "Standardizing all package.json files (preserving existing content)..."

find packages apps -name "package.json" -not -path "*/node_modules/*" | while read pkg_file; do
    dir=$(dirname "$pkg_file")
    
    # Check if file is valid JSON first
    if ! node -e "JSON.parse(require('fs').readFileSync('$pkg_file', 'utf8'))" 2>/dev/null; then
        warn "  Skipping $pkg_file (invalid JSON - manual fix needed)"
        continue
    fi
    
    log "  Updating $pkg_file"
    
    # Use node to update package.json safely with error handling
    node << 'NODE_SCRIPT'
const fs = require('fs');
const path = require('path');

const pkgPath = process.argv[1];
const dir = process.argv[2];
const REPO_URL = process.argv[3];
const HOMEPAGE = process.argv[4];
const AUTHOR = process.argv[5];
const LICENSE = process.argv[6];

try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    
    // Only update if missing or different - preserve existing values
    if (!pkg.repository || pkg.repository.url !== REPO_URL) {
        pkg.repository = {
            type: 'git',
            url: REPO_URL,
            directory: pkg.repository?.directory || dir
        };
    }
    
    if (!pkg.homepage || pkg.homepage !== HOMEPAGE) {
        pkg.homepage = HOMEPAGE;
    }
    
    if (!pkg.author || pkg.author !== AUTHOR) {
        pkg.author = AUTHOR;
    }
    
    if (!pkg.license || pkg.license !== LICENSE) {
        pkg.license = LICENSE;
    }
    
    // Ensure engines if not present (don't overwrite if exists)
    if (!pkg.engines) {
        pkg.engines = {
            node: '>=20.0.0',
            pnpm: '>=8.15.0'
        };
    }
    
    // Write back with proper formatting
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`    ✓ Updated ${pkgPath}`);
} catch (err) {
    console.error(`    ✗ Error updating ${pkgPath}: ${err.message}`);
    process.exit(1);
}
NODE_SCRIPT "$pkg_file" "$dir" "$REPO_URL" "$HOMEPAGE" "$AUTHOR" "$LICENSE" || {
        warn "  Failed to update $pkg_file (preserving original)"
    }
done

log "✓ Package.json standardization complete"
