#!/usr/bin/env bash
#
# Import remote git repositories into this monorepo using git-subtree.
# - Reads repos-to-import.json for {remote, branch, prefix}
# - Adds remote, fetches, and runs git subtree add --prefix=<prefix> <remote> <branch>
# - Supports --dry-run to preview
#
# Usage:
#   bash scripts/import-remote-repos.sh --dry-run
#   bash scripts/import-remote-repos.sh
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

CONFIG="./repos-to-import.json"
DRY_RUN=false
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=true
fi

if [ ! -f "$CONFIG" ]; then
  echo "Missing config file: $CONFIG"
  echo "Copy the provided repos-to-import.json and add your remotes and prefixes."
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required (sudo apt install jq)"
  exit 1
fi

echo "Repository root: $REPO_ROOT"
echo "Config: $CONFIG"
echo "Dry-run: $DRY_RUN"
echo

items=$(jq -c '.[]' "$CONFIG")

for item in $items; do
  remote=$(echo "$item" | jq -r '.remote')
  branch=$(echo "$item" | jq -r '.branch // "main"')
  prefix=$(echo "$item" | jq -r '.prefix')
  remote_name=$(echo "$remote" | sed 's/[^a-zA-Z0-9]/-/g' | cut -c1-30)

  echo "Entry: remote=$remote branch=$branch prefix=$prefix remote_name=$remote_name"

  if [ "$DRY_RUN" = "true" ]; then
    echo "[DRY] git remote add $remote_name $remote || true"
    echo "[DRY] git fetch $remote_name $branch --tags --force"
    echo "[DRY] git subtree add --prefix=$prefix $remote_name $branch --squash (or without --squash to keep full history)"
    echo
    continue
  fi

  # Add remote if not present
  if git remote | grep -q "^${remote_name}$"; then
    echo "Remote $remote_name already exists. Fetching..."
    git fetch "$remote_name" --tags
  else
    git remote add "$remote_name" "$remote"
    echo "Added remote $remote_name -> $remote"
  fi

  # Fetch branch
  git fetch "$remote_name" "$branch" --tags --force

  # Ensure prefix parent exists
  prefix_parent=$(dirname "$prefix")
  mkdir -p "$prefix_parent"

  # If prefix already exists and is non-empty, skip subtree add (fallback to merge/update)
  if [ -d "$prefix" ] && [ "$(ls -A "$prefix" | wc -l)" -ne 0 ]; then
    echo "Prefix $prefix already exists and is non-empty. Attempting subtree pull instead of add."
    # Try subtree pull
    set +e
    git subtree pull --prefix="$prefix" "$remote_name" "$branch" --squash
    rc=$?
    set -e
    if [ $rc -ne 0 ]; then
      echo "git subtree pull failed for $prefix. Consider manual merge or remove prefix and rerun."
    else
      echo "Pulled updates into $prefix"
    fi
  else
    # Do initial subtree add
    echo "Adding subtree at prefix $prefix from $remote_name/$branch"
    git subtree add --prefix="$prefix" "$remote_name" "$branch" --squash
    echo "Subtree added."
  fi

  echo
done

echo "All done. Remember to run 'pnpm install' and adjust workspaces/pkgs."
