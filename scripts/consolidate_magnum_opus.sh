#!/bin/bash

# Cathedral Magnum Opus Consolidation Script
# This script stages all changes, cleans up artifacts, and creates a consolidated commit.

set -e

echo "🏰 Cathedral Magnum Opus - Consolidation Sequence Initiated..."

# 1. Clean up known generated artifacts (optional but good for clean state)
echo "🧹 Cleaning temporary artifacts..."
rm -rf node_modules/.turbo
rm -f .DS_Store
find . -name ".DS_Store" -delete

# 2. Stage everything
echo "📦 Staging all files..."
git add .

# 3. Status check
echo "📊 Git Status:"
git status

# 4. Commit prompt
echo ""
echo "✨ Ready to commit. The standard message will be:"
echo "   'chore(release): Cathedral Real Magnum Opus v1.0.0'"
echo ""
read -p "Do you want to proceed with this commit? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git commit -m "chore(release): Cathedral Real Magnum Opus v1.0.0"
    echo "✅ Committed! You are ready to push to GitLab."
    echo "   git push origin main"
else
    echo "❌ Consolidation aborted."
fi
