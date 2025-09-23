#!/usr/bin/env bash
set -euo pipefail

# Where we stage pulled content (not committed)
STAGE="shared"
mkdir -p "$STAGE"/{codex,nodes,liber,stone,cosmo,packs}

echo "Pulling canonical sources into $STAGE/..."

# --- Codex 144:99 (nodes, schemas, ledgers) ---
# Pull node JSONs if present (adjust paths to your repo layout)
for i in $(seq -w 1 144); do
  url="https://raw.githubusercontent.com/bekalah/codex-14499/main/data/nodes/C144N-${i}.json"
  out="$STAGE/nodes/C144N-${i}.json"
  curl -fsS "$url" -o "$out" || true
done

# Special/auxiliary (+99) nodes if you have them named explicitly
curl -fsS https://raw.githubusercontent.com/bekalah/codex-14499/main/data/nodes/C144N-ARCANA-HIEROPHANT.json \
  -o "$STAGE/nodes/C144N-ARCANA-HIEROPHANT.json" || true

# Archive / doctrine markdowns (append-only ledgers)
curl -fsS https://raw.githubusercontent.com/bekalah/codex-14499/main/docs/Codex14499_archive.md \
  -o "$STAGE/codex/Codex14499_archive.md" || true
curl -fsS https://raw.githubusercontent.com/bekalah/codex-14499/main/docs/codex_temple_of_the_unbuilt.md \
  -o "$STAGE/codex/codex_temple_of_the_unbuilt.md" || true

# --- Liber Arcanae (cards, IFS helpers, lineages) ---
curl -fsS https://raw.githubusercontent.com/bekalah/liber-arcanae/main/cards/major/LA-05-HIEROPHANT.json \
  -o "$STAGE/liber/LA-05-HIEROPHANT.json" || true
# (Optionally pull all major/minor cards if they exist)
# for f in $(curl -s https://api.github.com/repos/bekalah/liber-arcanae/contents/cards/major | jq -r '.[].download_url'); do curl -fsS "$f" -o "$STAGE/liber/major-$(basename "$f")"; done

# --- Stone Grimoire (style tokens & css) ---
curl -fsS https://raw.githubusercontent.com/bekalah/stone-grimoire/main/public/c99/tokens/perm-style.json \
  -o "$STAGE/stone/perm-style.json" || true

# --- Cosmogenesis (engine/demo data) ---
curl -fsS https://raw.githubusercontent.com/bekalah/cosmogenesis-learning-engine/main/assets/data/codex.144_99.json \
  -o "$STAGE/cosmo/codex.144_99.json" || true

# --- Packs / assets (optional) ---
# curl -fsS <pack-URL> -o "$STAGE/packs/<file>" || true

echo "Sources pulled (missing files are OK and skipped)."
