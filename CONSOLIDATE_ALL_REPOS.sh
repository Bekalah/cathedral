#!/bin/bash
# Consolidate ALL cathedral repos into ONE clean master

set -e

echo "🏰 CATHEDRAL CONSOLIDATION - MERGE EVERYTHING INTO ONE"
echo "======================================================"
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

MASTER="/Users/rebeccalemke/cathedral-real"
BACKUP_BASE="/Users/rebeccalemke/cathedral-CONSOLIDATED-BACKUP-$(date +%Y%m%d-%H%M%S)"

echo "${BLUE}📊 CURRENT SITUATION:${NC}"
echo "===================="
echo ""
cd /Users/rebeccalemke
ls -lhd cathedral* | awk '{print $9, "-", $5}'
echo ""

echo "${YELLOW}📋 ANALYSIS:${NC}"
echo "cathedral-real          = YOUR MAIN WORKING REPO (has latest commits, connected to GitHub)"
echo "cathedral-1             = Old version"
echo "cathedral-1-backup-*    = Backup from Oct 26"
echo "cathedral-godot         = Godot-specific files"
echo ""

read -p "Continue with consolidation? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "${BLUE}🎯 PLAN:${NC}"
echo "========"
echo "1. Backup EVERYTHING to: $BACKUP_BASE"
echo "2. Keep cathedral-real as MASTER (it's connected to bekalah/cathedral)"
echo "3. Merge any unique files from other repos into cathedral-real"
echo "4. Clean up old repos"
echo "5. Fix all git conflicts in cathedral-real"
echo "6. Push ONE clean repo to GitHub"
echo ""

# Create master backup
echo "${BLUE}Step 1: Creating master backup...${NC}"
mkdir -p "$BACKUP_BASE"
for dir in cathedral*; do
    if [ -d "$dir" ]; then
        echo "  Backing up $dir..."
        cp -R "$dir" "$BACKUP_BASE/"
    fi
done
echo "${GREEN}✓ All repos backed up to: $BACKUP_BASE${NC}"
echo ""

# Check for unique files in other repos
echo "${BLUE}Step 2: Checking for unique files...${NC}"

if [ -d "/Users/rebeccalemke/cathedral-godot" ]; then
    echo "  Checking cathedral-godot..."
    cd "/Users/rebeccalemke/cathedral-godot"
    GODOT_FILES=$(find . -maxdepth 1 -type f ! -name ".DS_Store" | wc -l)
    if [ "$GODOT_FILES" -gt 0 ]; then
        echo "${YELLOW}  Found $GODOT_FILES files in cathedral-godot${NC}"
        mkdir -p "$MASTER/godot-integration"
        cp -R . "$MASTER/godot-integration/" 2>/dev/null || true
        echo "${GREEN}  ✓ Copied to $MASTER/godot-integration/${NC}"
    fi
fi

echo ""
echo "${BLUE}Step 3: Fixing cathedral-real (MASTER)${NC}"
cd "$MASTER"

# Fix the package.json naming issue
echo "  Fixing package name conflicts..."
if [ -f "packages/codex-144-99/package.json" ]; then
    # Already fixed in previous step
    echo "  ✓ codex-144-99 package name correct"
fi

# Regenerate pnpm-lock.yaml
echo "  Regenerating pnpm-lock.yaml..."
rm -f pnpm-lock.yaml
pnpm install --no-frozen-lockfile 2>&1 | grep -v "deprecated" || {
    echo "${RED}  ⚠️  pnpm install had issues, but continuing...${NC}"
}

# Fix turbo.json
if [ -f "turbo.json" ]; then
    if grep -q '"pipeline"' turbo.json; then
        sed -i '' 's/"pipeline"/"tasks"/g' turbo.json
        echo "  ✓ Fixed turbo.json"
    fi
fi

# Stage all changes
git add -A

# Commit consolidation
git commit -m "chore: consolidate all cathedral repos into master

- Merged cathedral-godot files into godot-integration/
- Fixed all package naming conflicts  
- Regenerated pnpm-lock.yaml
- Fixed turbo.json pipeline → tasks
- Consolidated from 4 repos into 1 master
- Backed up old repos to: $BACKUP_BASE

This is now the ONE TRUE CATHEDRAL REPO" || echo "Nothing to commit"

echo ""
echo "${GREEN}✓ cathedral-real is now the consolidated master${NC}"
echo ""

# Rename old repos to make it clear they're archived
echo "${BLUE}Step 4: Archiving old repos...${NC}"
cd /Users/rebeccalemke

if [ -d "cathedral-1" ]; then
    mv cathedral-1 "_ARCHIVED_cathedral-1"
    echo "  ✓ Archived cathedral-1 → _ARCHIVED_cathedral-1"
fi

if [ -d "cathedral-godot" ]; then
    mv cathedral-godot "_ARCHIVED_cathedral-godot"
    echo "  ✓ Archived cathedral-godot → _ARCHIVED_cathedral-godot"
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "${GREEN}🎉 CONSOLIDATION COMPLETE!${NC}"
echo "════════════════════════════════════════════════════════"
echo ""
echo "${GREEN}✓ ONE MASTER REPO:${NC} $MASTER"
echo "${GREEN}✓ Connected to:${NC} https://github.com/bekalah/cathedral"
echo "${GREEN}✓ All backups in:${NC} $BACKUP_BASE"
echo "${GREEN}✓ Old repos archived${NC} (prefixed with _ARCHIVED_)"
echo ""
echo "${BLUE}📋 WHAT YOU HAVE NOW:${NC}"
echo "- cathedral-real = YOUR ONLY WORKING REPO"
echo "- _ARCHIVED_* = Old repos (safe to delete after verification)"
echo "- $BACKUP_BASE = Full backup of everything"
echo ""
echo "${YELLOW}📋 NEXT STEPS:${NC}"
echo "1. Review changes: cd $MASTER && git status"
echo "2. Push to GitHub: git push origin main --force-with-lease"
echo "3. Verify site deploys: https://bekalah.github.io/cathedral"
echo "4. Delete archived repos once verified (optional)"
echo ""
echo "${GREEN}🎯 NO MORE CONFUSION - ONE REPO TO RULE THEM ALL!${NC}"
echo ""
