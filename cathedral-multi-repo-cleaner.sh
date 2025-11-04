#!/bin/bash

# Cathedral Multi-Repository Branch Cleaner
# Works with GitKraken CLI + GitLens across all bekalah repos
# Part of Cathedral Magnum Opus v1.0

set -e

echo "🏛️ Cathedral Multi-Repo Branch Cleaner v1.0"
echo "==========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
BEKALAH_ORG="bekalah"
CURRENT_REPO=$(basename "$(git rev-parse --show-toplevel 2>/dev/null)" .git 2>/dev/null || git rev-parse --show-toplevel)

# GitKraken CLI health check
echo "🔧 Checking GitKraken CLI status..."
if command -v gk >/dev/null 2>&1; then
    echo -e "${GREEN}✅ GitKraken CLI detected${NC}"
    GK_AVAILABLE=true
else
    echo -e "${YELLOW}⚠️  GitKraken CLI not available${NC}"
    GK_AVAILABLE=false
fi

# GitLens detection (VS Code extension)
if command -v code >/dev/null 2>&1; then
    echo -e "${GREEN}✅ VS Code detected (GitLens available)${NC}"
    GITLENS_AVAILABLE=true
else
    echo -e "${YELLOW}⚠️  VS Code not detected${NC}"
    GITLENS_AVAILABLE=false
fi

echo ""
echo "🎯 Current Repository: $CURRENT_REPO"

# Create a comprehensive status report
create_status_report() {
    echo "📊 Creating comprehensive status report..."
    
    # Local branches
    echo "## Local Branch Status" > cathedral-branch-status.md
    git branch -v >> cathedral-branch-status.md
    
    echo "" >> cathedral-branch-status.md
    echo "## Remote Branches" >> cathedral-branch-status.md
    git branch -r >> cathedral-branch-status.md
    
    echo "" >> cathedral-branch-status.md
    echo "## Commit History (Last 10)" >> cathedral-branch-status.md
    git log --oneline -10 >> cathedral-branch-status.md
    
    echo "" >> cathedral-branch-status.md
    echo "## File Changes" >> cathedral-branch-status.md
    git status --porcelain >> cathedral-branch-status.md
    
    # Add GitKraken insights if available
    if [ "$GK_AVAILABLE" = true ]; then
        echo "" >> cathedral-branch-status.md
        echo "## GitKraken AI Analysis" >> cathedral-branch-status.md
        echo "Run: gk ai explain branch <branch-name> for detailed AI analysis" >> cathedral-branch-status.md
    fi
    
    echo -e "${GREEN}✅ Status report created: cathedral-branch-status.md${NC}"
}

# Enhanced cleanup function for multiple repos
enhanced_cleanup() {
    echo "🔄 Running enhanced cleanup..."
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "📁 Uncommitted changes detected:"
        git status --porcelain
        echo ""
        read -p "Commit changes before cleanup? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            git commit -m "pre-cleanup: stash changes before branch optimization"
        fi
    fi
    
    # Run the single-repo cleaner
    if [ -f "./cathedral-branch-optimizer.sh" ]; then
        echo "🔧 Running local branch optimizer..."
        ./cathedral-branch-optimizer.sh
    fi
    
    # Additional cleanup tasks
    echo "🧹 Additional cleanup tasks..."
    
    # Prune remote references
    git remote prune origin
    
    # Clean up reflog
    git reflog expire --expire=now --all
    
    # Garbage collect
    git gc --prune=now --aggressive
    
    echo -e "${GREEN}✅ Enhanced cleanup complete${NC}"
}

# GitHub integration for bekalah repos
github_sync() {
    echo "🌐 GitHub integration for bekalah repos..."
    
    # Check if we're in a bekalah repo
    if [[ "$(git remote get-url origin 2>/dev/null)" == *"bekalah"* ]]; then
        echo "📍 This is a bekalah repository"
        
        # Get remote branches info
        echo "📊 Remote branch analysis:"
        git branch -r | head -10
        
        # Check for divergent branches
        echo ""
        echo "🔍 Checking for divergent branches..."
        git for-each-ref --format='%(refname:short) %(upstream:short)' refs/heads | while read local remote; do
            if [ -n "$remote" ]; then
                COMMITS_AHEAD=$(git rev-list --count $local..$remote 2>/dev/null || echo "0")
                COMMITS_BEHIND=$(git rev-list --count $remote..$local 2>/dev/null || echo "0")
                
                if [ "$COMMITS_AHEAD" -gt "0" ] || [ "$COMMITS_BEHIND" -gt "0" ]; then
                    echo "  📊 $local is $COMMITS_AHEAD ahead, $COMMITS_BEHIND behind $remote"
                fi
            fi
        done
        
        echo ""
        echo "🎯 Next steps for bekalah repos:"
        echo "1. Push cleaned changes: git push origin main"
        echo "2. Delete old remote branches: git push origin --delete <branch-name>"
        echo "3. Compare with other bekalah repos"
        
    else
        echo "📍 This is not a bekalah repository"
        echo "Remote: $(git remote get-url origin 2>/dev/null || echo 'No remote')"
    fi
}

# Create a comprehensive script for all bekalah repos
create_bekalah_cleanup_script() {
    echo "📝 Creating bekalah multi-repo cleanup script..."
    
    cat > cathedral-bekalah-cleaner.sh << 'EOF'
#!/bin/bash

# Cathedral Bekalah Organization Cleaner
# Run this to clean up all bekalah repositories

BEKALAH_REPOS=(
    "cathedral"
    "cathedral-fixed-clean" 
    "cathedral-master"
    "liber-arcanae"
    "circuitum99"
    "cosmogenesis"
)

echo "🏛️ Cleaning all bekalah repositories..."

for repo in "${BEKALAH_REPOS[@]}"; do
    if [ -d "../$repo" ] || [ -d "$HOME/src/github.com/bekalah/$repo" ]; then
        echo "🔧 Processing $repo..."
        
        REPO_PATH=""
        if [ -d "../$repo" ]; then
            REPO_PATH="../$repo"
        else
            REPO_PATH="$HOME/src/github.com/bekalah/$repo"
        fi
        
        cd "$REPO_PATH"
        
        if [ -f "./cathedral-branch-optimizer.sh" ]; then
            ./cathedral-branch-optimizer.sh
        else
            echo "  ⚠️  Branch optimizer not found in $repo"
        fi
        
        cd - >/dev/null
    else
        echo "  ⚠️  Repository $repo not found"
    fi
done

echo "✅ All bekalah repositories processed!"
EOF
    
    chmod +x cathedral-bekalah-cleaner.sh
    echo -e "${GREEN}✅ Created cathedral-bekalah-cleaner.sh${NC}"
}

# Main execution
main() {
    echo ""
    echo "🔍 Phase 1: Status Report"
    create_status_report
    
    echo ""
    echo "🧹 Phase 2: Enhanced Cleanup"
    enhanced_cleanup
    
    echo ""
    echo "🌐 Phase 3: GitHub Sync"
    github_sync
    
    echo ""
    echo "📝 Phase 4: Multi-Repo Script"
    create_bekalah_cleanup_script
    
    echo ""
    echo "✅ Cathedral Multi-Repository Clean Complete!"
    echo "==========================================="
    echo ""
    echo "📊 Final Status:"
    git status
    
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Review cathedral-branch-status.md for full analysis"
    echo "2. Push changes: git push origin main"
    echo "3. Run cathedral-bekalah-cleaner.sh for all repos"
    echo "4. Use GitLens/VS Code for visual branch management"
    echo "5. Use 'gk ai explain branch <name>' for AI insights"
    
    echo ""
    echo "🏛️ Cathedral Magnum Opus v1.0 - Branch Management Complete!"
}

# Run main function
main "$@"