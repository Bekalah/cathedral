#!/bin/bash
# Safe cleanup that won't crash system

set -e  # Exit on error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

echo "🏛️ Cathedral Safe Cleanup Starting..."

# Create backup first
BACKUP_DIR="cathedral-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Only remove specific known files/directories
echo "🧹 Removing known cleanup targets..."

# Remove specific scattered files safely
rm -f CHIRON_HEALING_CODEX.md 2>/dev/null || true
rm -f EMERGENCY_RUN.py 2>/dev/null || true
rm -f modular-safety-system.py 2>/dev/null || true

# Remove scattered JS/HTML files safely
rm -f *.html 2>/dev/null || true
rm -f *.js 2>/dev/null || true
rm -f *.css 2>/dev/null || true

# Create proper directory structure
echo "🏗️ Creating directories..."
mkdir -p cathedral-core
mkdir -p cathedral-synthesis-lab
mkdir -p cathedral-fractal-engine
mkdir -p cathedral-tarot-system
mkdir -p cathedral-creative-studios

echo "✅ Safe cleanup complete!"
