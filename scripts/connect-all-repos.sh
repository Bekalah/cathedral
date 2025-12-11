#!/bin/bash
# Connect all Cathedral repos and sync Liber Arcanae Codex Abyssiae materials

echo "🏛️ Connecting Cathedral Repository Network"

# Main cathedral repo
cd /Users/rebeccalemke/Documents/cathedral
git remote add cathedral-master https://github.com/Bekalah/cathedral-master.git 2>/dev/null
git remote add cathedral-connection-map https://github.com/Bekalah/cathedral-connection-map.git 2>/dev/null
git remote add cathedral-integration-workspace https://github.com/Bekalah/cathedral-integration-workspace.git 2>/dev/null
git remote add liber-arcanae https://github.com/Bekalah/liber-arcanae.git 2>/dev/null
git remote add circuitum99 https://github.com/Bekalah/circuitum99.git 2>/dev/null

# Fetch all remotes
git fetch --all

# External repos - fix remote names
cd external-repos/cathedral-master
git remote rename origin cathedral-master 2>/dev/null
git remote add main-cathedral https://github.com/Bekalah/cathedral.git 2>/dev/null

cd ../cathedral-connection-map  
git remote rename origin connection-map 2>/dev/null
git remote add main-cathedral https://github.com/Bekalah/cathedral.git 2>/dev/null

cd ../cathedral-integration-workspace
git remote rename origin integration-workspace 2>/dev/null
git remote add main-cathedral https://github.com/Bekalah/cathedral.git 2>/dev/null

echo "✅ Repository connections established"