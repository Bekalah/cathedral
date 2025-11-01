#!/bin/bash
echo "🏰 Cathedral Git Status & Sync Check"

cd /Users/rebeccalemke/cathedral-real

echo "📊 Current Git Status:"
git status --porcelain

echo -e "\n🔄 Remote Status:"
git fetch origin
git status -uno

echo -e "\n📋 Stash Status:"
git stash list

echo -e "\n🌿 Branch Status:"
git branch -vv

echo -e "\n🔗 Remote URLs:"
git remote -v

echo -e "\n⚡ Last 3 Commits:"
git log --oneline -3