#!/usr/bin/env bash
set -euo pipefail

# Pull latest from cathedral-master into external/cathedral-master via subtree
# Usage: tools/sync/cathedral_master_sync.sh [branch]
# Default branch: main

BRANCH="${1:-main}"

if ! git remote get-url cathedral-master >/dev/null 2>&1; then
  git remote add cathedral-master https://github.com/Bekalah/cathedral-master.git
fi

echo "[sync] fetching cathedral-master:$BRANCH"
git fetch --no-tags cathedral-master "$BRANCH"

echo "[sync] subtree pull into external/cathedral-master (branch: $BRANCH)"
# Will create the dir if missing; use --squash to keep history small
if [ -d external/cathedral-master ]; then
  git subtree pull --prefix=external/cathedral-master cathedral-master "$BRANCH" --squash
else
  git subtree add --prefix=external/cathedral-master cathedral-master "$BRANCH" --squash
fi

echo "[sync] done"