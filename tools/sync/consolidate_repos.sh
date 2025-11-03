#!/usr/bin/env bash
set -euo pipefail

# Consolidation helper for cathedral-real
# - Generates a report comparing local vs remotes
# - Optionally syncs unique files from external imports into canonical locations
# - Never overwrites by default (dry-run)

DRY_RUN=1
APPLY=0
REPORT="consolidation-report-$(date +%Y%m%d-%H%M%S).md"

usage() {
  cat <<USAGE
Usage: tools/sync/consolidate_repos.sh [--apply]

Actions:
  - Fetch all remotes
  - Generate consolidation report at ./${REPORT}
  - (Optional) Sync missing files from imports into canonical paths (no overwrite)

Options:
  --apply   Actually perform sync actions (turns off dry-run). Default is dry-run report only.
USAGE
}

if [[ "${1:-}" == "--help" ]]; then
  usage; exit 0
fi
if [[ "${1:-}" == "--apply" ]]; then
  DRY_RUN=0; APPLY=1
fi

echo "[consolidate] fetching all remotes"
git fetch --all --prune --no-tags || true

current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "[consolidate] current branch: ${current_branch}"

origin_branch="origin/${current_branch}"
if ! git rev-parse --verify -q "${origin_branch}" >/dev/null; then
  # fallback to origin/main
  origin_branch="origin/main"
fi

mkdir -p reports
REPORT_PATH="reports/${REPORT}"
echo "# Consolidation Report" > "${REPORT_PATH}"
echo "Generated: $(date -u)" >> "${REPORT_PATH}"
echo >> "${REPORT_PATH}"

echo "## Branches" >> "${REPORT_PATH}"
echo "Local: ${current_branch} ($(git rev-parse --short HEAD))" >> "${REPORT_PATH}"
if git rev-parse --verify -q "${origin_branch}" >/dev/null; then
  echo "Remote: ${origin_branch} ($(git rev-parse --short ${origin_branch}))" >> "${REPORT_PATH}"
fi
echo >> "${REPORT_PATH}"

echo "## Top-level differences (local vs ${origin_branch})" >> "${REPORT_PATH}"
git diff --name-only "${origin_branch}"...HEAD | awk -F/ '{print $1}' | sort -u >> "${REPORT_PATH}" || true
echo >> "${REPORT_PATH}"

echo "## Duplicates/overlaps (apps, packages, external/imports)" >> "${REPORT_PATH}"
{
  echo "apps/"; find apps -maxdepth 1 -mindepth 1 -type d -print 2>/dev/null | sort
  echo
  echo "packages/"; find packages -maxdepth 1 -mindepth 1 -type d -print 2>/dev/null | sort
  echo
  echo "external/imports/"; find external/imports -maxdepth 2 -mindepth 1 -type d -print 2>/dev/null | sort
} >> "${REPORT_PATH}"
echo >> "${REPORT_PATH}"

# Candidate one-way syncs (missing-only), add more as needed
declare -A SYNC_MAP

# Example: web-platform from imported monorepo into canonical packages/web-platform
if [[ -d external/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform ]]; then
  SYNC_MAP["external/imports/CathedralMonorepo-20251101/CathedralMonorepo/packages/web-platform"]="packages/web-platform"
fi

echo "## Planned sync actions (missing-only)" >> "${REPORT_PATH}"
for SRC in "${!SYNC_MAP[@]}"; do
  DST="${SYNC_MAP[$SRC]}"
  echo "- ${SRC} -> ${DST} (missing-only)" >> "${REPORT_PATH}"
done
echo >> "${REPORT_PATH}"

if (( APPLY )); then
  echo "[consolidate] applying syncs (missing-only)"
  for SRC in "${!SYNC_MAP[@]}"; do
    DST="${SYNC_MAP[$SRC]}"
    mkdir -p "${DST}"
    # rsync missing-only: copy files that do not exist in DST; preserve structure
    rsync -av --ignore-existing --prune-empty-dirs "${SRC}/" "${DST}/"
  done
else
  echo "[consolidate] dry-run mode, no files were changed. See ${REPORT_PATH}"
fi

echo "[consolidate] done"
