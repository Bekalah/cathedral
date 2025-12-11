#!/bin/bash
# Checkout and track all remote branches across repos

echo "🌿 Checking out all branches"

checkout_all_branches() {
    local repo_path=$1
    echo "Processing $repo_path"
    cd "$repo_path"
    
    # Fetch all remotes
    git fetch --all
    
    # Get all remote branches and checkout locally
    git branch -r | grep -v '\->' | while read remote; do
        branch=${remote#*/}
        if ! git show-ref --verify --quiet refs/heads/$branch; then
            echo "Creating local branch: $branch"
            git checkout -b "$branch" "$remote" 2>/dev/null || true
        fi
    done
    
    # List all branches
    echo "Branches in $repo_path:"
    git branch -a | head -10
    echo "---"
}

# Process all repos
checkout_all_branches "/Users/rebeccalemke/Documents/cathedral"
checkout_all_branches "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-master"
checkout_all_branches "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-connection-map"
checkout_all_branches "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-integration-workspace"

echo "✅ All branches checked out"