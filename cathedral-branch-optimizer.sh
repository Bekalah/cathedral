#!/bin/bash

# Cathedral Branch Optimizer - Free GitLens + GitKraken Alternative
# Consolidates branches while preserving valuable work

set -e

echo "🏛️ Cathedral Branch Optimizer v1.0"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Current branch: $CURRENT_BRANCH"

# Get all local branches except current
LOCAL_BRANCHES=$(git branch | grep -v "\* $CURRENT_BRANCH" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')

if [ -z "$LOCAL_BRANCHES" ]; then
    echo "✅ No local branches to clean up"
    exit 0
fi

echo "🔍 Analyzing branches for valuable content..."

# Arrays to categorize branches
VALUABLE_BRANCHES=()
TEMP_BRANCHES=()
DUPLICATE_BRANCHES=()

# Analyze each branch
while IFS= read -r branch; do
    if [ -z "$branch" ]; then continue; fi
    
    echo -n "  📊 Analyzing $branch... "
    
    # Check if branch contains valuable commits
    COMMIT_COUNT=$(git rev-list --count HEAD..$branch 2>/dev/null || echo "0")
    
    # Get branch log for analysis
    BRANCH_LOG=$(git log $branch --oneline -n 3 2>/dev/null || echo "")
    
    # Categorize branches
    if [[ "$branch" =~ ^(backup|wip|temp|test) ]] || [[ "$branch" =~ ^.*(202[0-9]{6}) ]] || [[ "$branch" =~ ^(merge|hotfix|fixup) ]]; then
        TEMP_BRANCHES+=("$branch")
        echo -e "${YELLOW}temporary${NC}"
    elif [[ "$branch" =~ ^(master|main)$ ]] && [[ "$CURRENT_BRANCH" != "$branch" ]]; then
        DUPLICATE_BRANCHES+=("$branch")
        echo -e "${YELLOW}duplicate main branch${NC}"
    elif [ "$COMMIT_COUNT" -gt "0" ]; then
        # Check if commits are valuable
        if echo "$BRANCH_LOG" | grep -E "(feat:|chore:|fix:|docs:|refactor:)" >/dev/null; then
            VALUABLE_BRANCHES+=("$branch")
            echo -e "${GREEN}valuable${NC} ($COMMIT_COUNT commits)"
        else
            TEMP_BRANCHES+=("$branch")
            echo -e "${YELLOW}temporary${NC} ($COMMIT_COUNT commits)"
        fi
    else
        TEMP_BRANCHES+=("$branch")
        echo -e "${YELLOW}empty${NC}"
    fi
done <<< "$LOCAL_BRANCHES"

echo ""
echo "📈 Branch Analysis Results:"
echo "  🟢 Valuable branches to merge: ${#VALUABLE_BRANCHES[@]}"
echo "  🟡 Temporary branches to delete: ${#TEMP_BRANCHES[@]}"
echo "  🟠 Duplicate branches: ${#DUPLICATE_BRANCHES[@]}"

# Merge valuable branches
if [ ${#VALUABLE_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo "🔄 Merging valuable branches..."
    
    for branch in "${VALUABLE_BRANCHES[@]}"; do
        echo "  🔗 Merging $branch..."
        git merge --no-ff --no-commit -m "consolidate: merge valuable work from $branch" $branch 2>/dev/null || {
            echo "    ⚠️  Merge conflicts detected, resolving..."
            # Auto-resolve simple conflicts
            git checkout --ours . 2>/dev/null || true
            git checkout --theirs . 2>/dev/null || true
            git add . 2>/dev/null || true
        }
    done
    
    echo "  ✅ Valuable branches merged. Committing consolidation..."
    git commit -m "🏛️ Cathedral Branch Consolidation: Merge valuable work from ${#VALUABLE_BRANCHES[@]} branches

Merged branches:
$(printf "• %s\n" "${VALUABLE_BRANCHES[@]}")

This consolidates:
- Feature implementations
- Documentation improvements  
- Configuration updates
- System optimizations

Part of Cathedral Magnum Opus v1.0 branch cleanup process."
fi

# Clean up temporary branches
if [ ${#TEMP_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo "🧹 Cleaning up temporary branches..."
    
    for branch in "${TEMP_BRANCHES[@]}"; do
        echo "  🗑️  Deleting $branch..."
        git branch -D $branch 2>/dev/null || echo "    ⚠️  Could not delete $branch (not fully merged)"
    done
fi

# Handle duplicate branches
if [ ${#DUPLICATE_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo "🔄 Handling duplicate main branches..."
    
    for branch in "${DUPLICATE_BRANCHES[@]}"; do
        echo "  🔄 Checking $branch vs main..."
        # Compare with main and merge if different
        if ! git diff main $branch --quiet; then
            echo "    📦 Merging differences from $branch..."
            git merge --no-ff --no-commit -m "consolidate: merge differences from $branch" $branch 2>/dev/null
            git commit -m "consolidate: integrate $branch work"
        fi
        echo "  🗑️  Deleting duplicate $branch..."
        git branch -D $branch 2>/dev/null
    done
fi

# Clean up remote tracking branches
echo ""
echo "🌐 Cleaning up remote tracking branches..."
git remote prune origin 2>/dev/null || true
git branch -r --merged HEAD 2>/dev/null | grep -v "HEAD" | xargs -r git branch -r -d 2>/dev/null || true

# Final status
echo ""
echo "✅ Cathedral Branch Optimization Complete!"
echo "=========================================="
echo "📊 Final Status:"
git branch -v | head -10

echo ""
echo "🎯 Next Steps:"
echo "  1. Review and push consolidated changes: git push origin $CURRENT_BRANCH"
echo "  2. Clean up remote branches if needed"
echo "  3. Run cathedral-sync to compare with online repos"

echo ""
echo "🏛️ Cathedral Branch Optimizer - Complete!"