#!/bin/bash
# =====================================================
# CLEANUP JUNK NOW - Non-interactive immediate cleanup
# =====================================================

set -e

ROOT="/Users/rebeccalemke/cathedral-fixed-clean"

echo "🗑️ CLEANING UP JUNK (automatic)"
echo "==============================="

# =====================================================
# 1. DELETE JUNK PACKAGES
# =====================================================
echo ""
echo "1. Deleting junk packages..."

JUNK_PACKAGES=(
  "agent-integration"
  "arcana"
  "archetypal-engine"
  "art-systems"
  "atelier-constitution"
  "avatar-experience-system"
  "cathedral-144"
  "cathedral-lightweight-library"
  "cathedral-style"
  "circuit-craft-creative-game"
  "connections"
  "labs"
)

deleted_count=0
for pkg in "${JUNK_PACKAGES[@]}"; do
  if [ -d "$ROOT/packages/$pkg" ]; then
    echo "   ❌ Deleting: packages/$pkg"
    rm -rf "$ROOT/packages/$pkg"
    ((deleted_count++))
  fi
done

echo "   Deleted: $deleted_count packages"

# =====================================================
# 2. ARCHIVE OLD MARKDOWN FILES
# =====================================================
echo ""
echo "2. Archiving progress report markdown files..."

mkdir -p "$ROOT/docs/archive/progress-reports"

# Files to keep in root
KEEP_FILES="README.md CONTRIBUTING.md LICENSE JUNK_IDENTIFIED.md DATA_INVENTORY.md"

archived_count=0
for file in "$ROOT"/*.md; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    
    # Check if in keep list
    if echo "$KEEP_FILES" | grep -qw "$filename"; then
      echo "   ✓ Keeping: $filename"
    else
      echo "   → Archiving: $filename"
      mv "$file" "$ROOT/docs/archive/progress-reports/"
      ((archived_count++))
    fi
  fi
done

echo "   Archived: $archived_count files"

# =====================================================
# 3. DELETE OLD IMPORTS
# =====================================================
echo ""
echo "3. Removing old import snapshots..."

if [ -d "$ROOT/imports" ]; then
  echo "   ❌ Deleting: imports/"
  rm -rf "$ROOT/imports"
fi

# =====================================================
# 4. CLEAN UP EMPTY DIRECTORIES
# =====================================================
echo ""
echo "4. Cleaning up empty directories..."

find "$ROOT/packages" -type d -empty -delete 2>/dev/null || true

# =====================================================
# SUMMARY
# =====================================================
echo ""
echo "==============================="
echo "✅ CLEANUP COMPLETE"
echo ""
echo "Remaining structure:"
echo "  packages: $(ls -d $ROOT/packages/*/ 2>/dev/null | wc -l | tr -d ' ')"
echo "  apps: $(ls -d $ROOT/apps/*/ 2>/dev/null | wc -l | tr -d ' ')"
echo "  root .md files: $(ls $ROOT/*.md 2>/dev/null | wc -l | tr -d ' ')"

