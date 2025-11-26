#!/bin/bash
# =====================================================
# CLEANUP JUNK - Remove spam, stubs, and organize
# 
# This script:
# 1. Deletes identified junk packages
# 2. Archives old markdown files
# 3. Removes old import snapshots
# =====================================================

set -e

ROOT=$(pwd)

echo "🗑️ CLEANING UP JUNK"
echo "==================="
echo ""
echo "This will:"
echo "  - Delete 12 stub/duplicate packages"
echo "  - Archive 50+ progress report markdown files"
echo "  - Remove old import snapshots"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

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

for pkg in "${JUNK_PACKAGES[@]}"; do
  if [ -d "$ROOT/packages/$pkg" ]; then
    echo "   Deleting: packages/$pkg"
    rm -rf "$ROOT/packages/$pkg"
  fi
done

# =====================================================
# 2. ARCHIVE OLD MARKDOWN FILES
# =====================================================
echo ""
echo "2. Archiving progress report markdown files..."

mkdir -p "$ROOT/docs/archive/progress-reports"

# Files to keep in root
KEEP_FILES=(
  "README.md"
  "CONTRIBUTING.md"
  "LICENSE"
  "JUNK_IDENTIFIED.md"
  "DATA_INVENTORY.md"
)

# Move all other .md files to archive
for file in "$ROOT"/*.md; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    
    # Check if in keep list
    keep=false
    for keep_file in "${KEEP_FILES[@]}"; do
      if [ "$filename" = "$keep_file" ]; then
        keep=true
        break
      fi
    done
    
    if [ "$keep" = false ]; then
      echo "   Archiving: $filename"
      mv "$file" "$ROOT/docs/archive/progress-reports/"
    fi
  fi
done

# =====================================================
# 3. DELETE OLD IMPORTS
# =====================================================
echo ""
echo "3. Removing old import snapshots..."

if [ -d "$ROOT/imports" ]; then
  echo "   Deleting: imports/"
  rm -rf "$ROOT/imports"
fi

# =====================================================
# 4. CLEAN UP EMPTY DIRECTORIES
# =====================================================
echo ""
echo "4. Cleaning up empty directories..."

find "$ROOT/packages" -type d -empty -delete 2>/dev/null || true
find "$ROOT/apps" -type d -empty -delete 2>/dev/null || true

# =====================================================
# SUMMARY
# =====================================================
echo ""
echo "==================="
echo "✅ CLEANUP COMPLETE"
echo ""
echo "Deleted packages: ${#JUNK_PACKAGES[@]}"
echo "Archived markdown files to: docs/archive/progress-reports/"
echo "Removed: imports/"
echo ""
echo "Remaining packages: $(ls -d $ROOT/packages/*/ 2>/dev/null | wc -l | tr -d ' ')"
echo "Root markdown files: $(ls $ROOT/*.md 2>/dev/null | wc -l | tr -d ' ')"

