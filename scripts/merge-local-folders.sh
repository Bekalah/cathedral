#!/usr/bin/env bash
#
# Merge local folders into canonical monorepo layout.
# - Moves listed folders into apps/ packages/ backend/ assets/
# - Attempts to normalize package.json name fields to avoid collisions
# - Supports --dry-run to preview actions
#
# Usage:
#   bash scripts/merge-local-folders.sh            # run actual moves
#   bash scripts/merge-local-folders.sh --dry-run # print actions only
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

DRY_RUN=false
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=true
fi

echo "Repository root: $REPO_ROOT"
echo "Dry-run: $DRY_RUN"
echo

# Edit this list to reflect the folders you actually have at repo root.
# Provide exact top-level folder names.
FOLDERS_TO_MOVE=(
  "apps"
  "packages"
  "data"
  "js"
  "docs"
  "archive"
  "automation"
  "connected-repos"
  "infrastructure"
  "locales"
  "monitoring"
  "scripts"
  "security"
  "src"
)

# infer target by folder name
infer_target() {
  local name="$1"
  if [[ "$name" =~ ^(apps)$ ]]; then echo "apps"; return; fi
  if [[ "$name" =~ ^(packages)$ ]]; then echo "packages"; return; fi
  if [[ "$name" =~ ^(data|docs|archive|automation|connected-repos|infrastructure|locales|monitoring|scripts|security|src)$ ]]; then echo "packages"; return; fi
  # default
  echo "packages"
}

echo "Creating canonical directories if missing: apps/ packages/ backend/ assets/"
for d in apps packages backend assets; do
  if [ ! -d "$d" ]; then
    if [ "$DRY_RUN" = "true" ]; then
      echo "[DRY] mkdir -p $d"
    else
      mkdir -p "$d"
      git add "$d" || true
      echo "Created $d/"
    fi
  fi
done
echo

for f in "${FOLDERS_TO_MOVE[@]}"; do
  if [ ! -d "$f" ]; then
    echo "Skipping missing folder: $f"
    continue
  fi

  target_dir="$(infer_target "$f")"
  dest="${target_dir}/${f}"

  # If destination exists, append timestamp to avoid overwrite
  if [ -e "$dest" ]; then
    timestamp=$(date +%s)
    dest="${dest}-$timestamp"
    echo "Destination already exists. Using: $dest"
  fi

  if [ "$DRY_RUN" = "true" ]; then
    echo "[DRY] git mv $f $dest"
  else
    echo "Moving $f -> $dest"
    git mv "$f" "$dest" || {
      echo "git mv failed, falling back to mv"
      mv "$f" "$dest"
      git add "$dest"
      git commit -m "Move $f to $dest" || true
    }
  fi

  # Fix package.json if exists
  pkgjson="$dest/package.json"
  if [ -f "$pkgjson" ]; then
    newname="@cathedral/$(basename "$dest")"
    if [ "$DRY_RUN" = "true" ]; then
      echo "[DRY] update $pkgjson name -> $newname"
    else
      if command -v jq >/dev/null 2>&1; then
        tmp=$(mktemp)
        jq --arg n "$newname" '.name = $n' "$pkgjson" > "$tmp" && mv "$tmp" "$pkgjson"
        git add "$pkgjson"
        git commit -m "Normalize package name to $newname in $dest" || true
        echo "Normalized package.json name to $newname"
      else
        echo "jq not installed. Please update $pkgjson name to $newname manually."
      fi
    fi
  fi
done

# Add pnpm-workspace.yaml if missing
if [ ! -f pnpm-workspace.yaml ]; then
  if [ "$DRY_RUN" = "true" ]; then
    echo "[DRY] create pnpm-workspace.yaml"
  else
    cat > pnpm-workspace.yaml <<'YAML'
packages:
  - 'apps/*'
  - 'packages/*'
  - 'backend/*'
  - '*/'
YAML
    git add pnpm-workspace.yaml
    git commit -m "Add pnpm-workspace.yaml" || true
    echo "Created pnpm-workspace.yaml"
  fi
else
  echo "pnpm-workspace.yaml already exists"
fi

# Create tsconfig.base.json if missing
if [ ! -f tsconfig.base.json ]; then
  if [ "$DRY_RUN" = "true" ]; then
    echo "[DRY] create tsconfig.base.json"
  else
    cat > tsconfig.base.json <<'JSON'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@cathedral/*": ["packages/*/src"]
    },
    "preserveSymlinks": true,
    "skipLibCheck": true
  }
}
JSON
    git add tsconfig.base.json
    git commit -m "Add tsconfig.base.json" || true
    echo "Created tsconfig.base.json"
  fi
else
  echo "tsconfig.base.json already exists"
fi

echo
echo "Finished."
echo
echo "NEXT STEPS:"
echo "1) Run 'pnpm install' at repo root"
echo "2) Inspect moved packages for broken relative imports and update to @cathedral/* aliases or fix paths"
echo "3) Update Storybook main.js if necessary to include new paths"
echo "4) Run 'pnpm -w -r lint' and 'pnpm -w -r test' and fix issues"
echo "If you need help generating a jscodeshift transform for import path updates, ask me and include a few example import lines."
