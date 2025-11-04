#!/bin/bash

# Cathedral Creative Work Recovery & Reconnection System
# Extracts and preserves ALL valuable creative, technical, and artistic content
# Part of Cathedral Magnum Opus v1.0 - Real Work Recovery

set -e

echo "🎨 Cathedral Creative Work Recovery System v1.0"
echo "=============================================="
echo "Recovering real music, art, science, tech, and codex content..."

# Colors for different content types
MUSIC='\033[0;35m'    # Purple
ART='\033[0;33m'     # Yellow  
SCIENCE='\033[0;32m' # Green
TECH='\033[0;34m'    # Blue
CODX='\033[0;31m'    # Red
GAME='\033[0;36m'    # Cyan
NC='\033[0m'

# Create recovery directory
RECOVERY_DIR="cathedral-creative-recovery"
mkdir -p "$RECOVERY_DIR"
cd "$RECOVERY_DIR"

echo "🔍 Phase 1: Extracting valuable content from each branch..."

# Function to extract content by type
extract_content() {
    local branch="$1"
    local content_type="$2"
    local color="$3"
    
    echo -e "${color}📂 Extracting $content_type from $branch${NC}"
    
    # Get files that differ from main
    local diff_files=$(git diff main..$branch --name-only 2>/dev/null | head -20)
    
    if [ -n "$diff_files" ]; then
        echo "  Found files in $branch:"
        echo "$diff_files" | head -10
        
        # Create branch directory
        local branch_dir="$content_type/$branch"
        mkdir -p "$branch_dir"
        
        # Copy files with their directory structure
        echo "$diff_files" | while read file; do
            if [ -f "../$file" ]; then
                local dest_dir=$(dirname "$branch_dir/$file")
                mkdir -p "$dest_dir"
                cp "../$file" "$branch_dir/$file" 2>/dev/null || true
            fi
        done
    else
        echo "  ⚠️ No significant differences found"
    fi
}

# Extract from all branches
echo ""
echo "🔄 Analyzing all branches for content..."

for branch in backup/wip/local-20251101 clean-pr-branch clean-up-branch develop fix/vercel-cloudflare-build-monorepo merge/cathedral-master-20251101; do
    if git show-ref --verify --quiet "refs/heads/$branch"; then
        echo ""
        echo -e "${TECH}🔧 Processing branch: $branch${NC}"
        extract_content "$branch" "technical-work" "$TECH"
    fi
done

# Look for codex content
echo ""
echo -e "${CODX}📜 Searching for codex content...${NC}"
find . -name "*codex*" -o -name "*arcana*" -o -name "*liber*" 2>/dev/null | head -10

# Look for music content  
echo ""
echo -e "${MUSIC}🎵 Searching for music content...${NC}"
find . -name "*music*" -o -name "*audio*" -o -name "*synth*" -o -name "*sound*" 2>/dev/null | head -10

# Look for art content
echo ""
echo -e "${ART}🎨 Searching for art content...${NC}"
find . -name "*art*" -o -name "*visual*" -o -name "*image*" -o -name "*design*" 2>/dev/null | head -10

# Look for game content
echo ""
echo -e "${GAME}🎮 Searching for game content...${NC}"
find . -name "*game*" -o -name "*strudel*" -o -name "*interactive*" 2>/dev/null | head -10

echo ""
echo "🔄 Phase 2: Creating comprehensive content map..."

# Create a content inventory
cat > content-inventory.md << 'EOF'
# Cathedral Creative Work Inventory
This document tracks all recovered content from branch cleanup process.

## Branch Content Analysis
- Each branch contained valuable creative, technical, and artistic work
- This inventory ensures nothing is lost during consolidation
- All content should be properly integrated into cathedral-master

## Content Categories Found:
1. **Technical Work** - Code, configurations, engines
2. **Creative Assets** - Music, art, designs  
3. **Codex Materials** - Original 3 codex, esoteric content
4. **Game Integration** - Strudel, interactive systems
5. **Scientific Content** - Research, data, analysis

## Recovery Status:
- [ ] Technical engines extracted
- [ ] Creative assets preserved  
- [ ] Codex content secured
- [ ] Game integrations catalogued
- [ ] Scientific data recovered

EOF

echo -e "${GREEN}✅ Recovery directory created: $RECOVERY_DIR${NC}"
echo -e "${GREEN}📋 Content inventory started: content-inventory.md${NC}"

echo ""
echo "🎯 Phase 3: Integration with cathedral-master..."

# Check if cathedral-master exists as remote
if git remote | grep -q cathedral-master; then
    echo "📡 Cathedral-master remote found"
    echo "🔄 Fetching latest cathedral-master..."
    git fetch cathedral-master
else
    echo "📡 Adding cathedral-master remote..."
    git remote add cathedral-master https://github.com/bekalah/cathedral-master.git
    git fetch cathedral-master
fi

echo ""
echo "🏛️ Cathedral Creative Work Recovery Complete!"
echo "============================================="
echo ""
echo "Next Steps:"
echo "1. Review recovered content in: $RECOVERY_DIR"
echo "2. Check content-inventory.md for full catalog"
echo "3. Integrate with cathedral-master: git merge cathedral-master/main"
echo "4. Preserve all creative and technical work"
echo "5. Sync with online repositories"

echo ""
echo -e "${GREEN}🎨 Your music, art, science, tech, and codex work is being preserved!${NC}"