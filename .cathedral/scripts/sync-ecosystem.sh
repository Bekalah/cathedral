#!/bin/bash

echo "🔄 Starting Cathedral Ecosystem Synchronization..."

# Function to sync a repository safely
sync_repository() {
    local repo_name=$1
    local repo_path="connected-repos/$repo_name"
    
    if [ -d "$repo_path" ]; then
        echo "📡 Syncing $repo_name..."
        cd "$repo_path" || exit
        
        # Create backup before sync
        git stash push -m "Pre-sync backup $(date)"
        
        # Sync with main
        git fetch origin
        git merge origin/main --no-edit
        
        # Validate sync integrity
        if [ $? -eq 0 ]; then
            echo "✅ $repo_name synced successfully"
        else
            echo "❌ $repo_name sync failed - rolling back"
            git reset --hard HEAD~1
            git stash pop
        fi
        
        cd - || exit
    fi
}

# Sync all connected repositories
for repo in circuitum99 stone-grimoire liber-arcanae tesseract-bridge cosmogenesis-learning-engine magical-mystery-house luxcrux; do
    sync_repository "$repo"
done

echo "🌟 Ecosystem synchronization complete!"
