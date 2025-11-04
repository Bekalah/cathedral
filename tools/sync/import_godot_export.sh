#!/usr/bin/env bash
set -euo pipefail

# Copy a Godot 4.x HTML5 export into apps/web/public/godot
# Usage: tools/sync/import_godot_export.sh <export_dir> [--apply]

SRC_DIR=${1:-}
APPLY=0

if [[ -z "${SRC_DIR}" ]]; then
  echo "Usage: tools/sync/import_godot_export.sh <export_dir> [--apply]" >&2
  exit 1
fi
if [[ ! -d "${SRC_DIR}" ]]; then
  echo "[godot-import] export_dir not found: ${SRC_DIR}" >&2
  exit 1
fi
if [[ "${2:-}" == "--apply" ]]; then
  APPLY=1
fi

DST_DIR="apps/web/public/godot"
mkdir -p "${DST_DIR}"

echo "[godot-import] Source: ${SRC_DIR}"
echo "[godot-import] Dest  : ${DST_DIR}"

echo "[godot-import] Files to copy (preview):"
rsync -av --dry-run --delete --exclude ".DS_Store" "${SRC_DIR}/" "${DST_DIR}/" | sed 's/^/  /'

if (( APPLY )); then
  echo "[godot-import] Applying copy"
  rsync -av --delete --exclude ".DS_Store" "${SRC_DIR}/" "${DST_DIR}/"
  echo "[godot-import] Done"
else
  echo "[godot-import] Dry-run only. Re-run with --apply to copy."
fi
