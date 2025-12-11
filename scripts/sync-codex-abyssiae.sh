#!/bin/bash
# Sync Liber Arcanae Codex Abyssiae materials across all repos

echo "📚 Syncing Codex Abyssiae Materials"

BASE_DIR="/Users/rebeccalemke/Documents/cathedral"
CODEX_FILES=(
    "CODEX_144_99_ABYSSIAE.md"
    "LIBER_ARCANAE_CODEX_ABYSSIAE.md" 
    "codex/codex_14499.json"
    "data-clean/codex_144_99.json"
    "data-clean/CODEX_ABYSSIAE.md"
)

# Copy master files to all repos
for repo in external-repos/cathedral-master external-repos/cathedral-connection-map external-repos/cathedral-integration-workspace; do
    if [ -d "$BASE_DIR/$repo" ]; then
        echo "Syncing to $repo"
        for file in "${CODEX_FILES[@]}"; do
            if [ -f "$BASE_DIR/$file" ]; then
                mkdir -p "$BASE_DIR/$repo/$(dirname "$file")"
                cp "$BASE_DIR/$file" "$BASE_DIR/$repo/$file"
            fi
        done
    fi
done

echo "✅ Codex Abyssiae materials synchronized"