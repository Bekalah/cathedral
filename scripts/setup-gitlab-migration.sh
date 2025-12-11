#!/bin/bash
# Setup GitLab migration for bekalah-group

echo "🦊 Setting up GitLab migration for bekalah-group"

BASE_DIR="/Users/rebeccalemke/Documents/cathedral"
GITLAB_GROUP="bekalah-group"

# Add GitLab remotes for all repos
setup_gitlab_remote() {
    local repo_path=$1
    local repo_name=$2
    
    cd "$repo_path"
    echo "Setting up GitLab remote for $repo_name"
    
    # Add GitLab remote
    git remote add gitlab "https://gitlab.com/$GITLAB_GROUP/$repo_name.git" 2>/dev/null || true
    
    # Show remotes
    echo "Remotes for $repo_name:"
    git remote -v
    echo "---"
}

# Setup main repos
setup_gitlab_remote "$BASE_DIR" "cathedral"
setup_gitlab_remote "$BASE_DIR/external-repos/cathedral-master" "cathedral-master"
setup_gitlab_remote "$BASE_DIR/external-repos/cathedral-connection-map" "cathedral-connection-map"
setup_gitlab_remote "$BASE_DIR/external-repos/cathedral-integration-workspace" "cathedral-integration-workspace"

# Create migration script
cat > "$BASE_DIR/migrate-to-gitlab.sh" << 'EOF'
#!/bin/bash
echo "🚀 Migrating to GitLab bekalah-group"

# Push all branches to GitLab
repos=(
    "/Users/rebeccalemke/Documents/cathedral:cathedral"
    "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-master:cathedral-master"
    "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-connection-map:cathedral-connection-map"
    "/Users/rebeccalemke/Documents/cathedral/external-repos/cathedral-integration-workspace:cathedral-integration-workspace"
)

for repo_info in "${repos[@]}"; do
    IFS=':' read -r repo_path repo_name <<< "$repo_info"
    cd "$repo_path"
    echo "Migrating $repo_name"
    
    # Push all branches
    git push gitlab --all
    git push gitlab --tags
    
    echo "✅ $repo_name migrated to GitLab"
done

echo "🎉 All repos migrated to GitLab bekalah-group"
EOF

chmod +x "$BASE_DIR/migrate-to-gitlab.sh"

echo "✅ GitLab migration setup complete"
echo "Run ./migrate-to-gitlab.sh when ready to migrate"