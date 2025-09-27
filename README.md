# Cathedral Monorepo

Offline-first home for the Cathedral corpus. This repository now acts as the
primary hub that feeds every mode of the project:

* **Stone Grimoire** - material body work (pigments, CSS, tactile palettes).
* **Liber Arcanae** - tarot, correspondences, narrative spine.
* **Cosmogenesis Engine** - interactive research and art laboratory.

All datasets, shared schemata, and renderer assets live here so the satellite
apps can pull from the same canon without juggling separate repositories or
network deployments.

## Layout at a Glance

```
apps/                  # Offline application shells (hub, cosmogenesis demos, etc.)
assets/                # Overlay generators and shared imagery helpers
codex-engines/         # Thin HTTP wrapper for blessed-build exports
engines/               # Muse overlay builder that honours the padding law
js/helix-renderer.mjs  # Sacred geometry renderer module (shared by static apps)
apps/web/public/registry/
  palette.json         # Active palette for the Cosmic Helix renderer
  palettes/            # Archived palettes; copy one over palette.json to swap hues
packages/
  codex-14499/         # Append-only codex gatherer + JSON schemas
shared/                # Canonical corpus, graph tables, and source packs
scripts/               # Corpus build and integrity helpers
```

`docs/legacy-cosmogenesis-ui.html` preserves the previous README's inline HTML
prototype so the lore remains available without cluttering the main document.

## Data Canon

* `shared/corpus/` gathers all textual excerpts, symbols, and generated search
  indexes. Each addition must be real canon - no placeholders.
* `shared/graph/` hosts correspondence tables and external graph hooks.
* `shared/packs/` stores node and chapter packs for future Stone Grimoire or
  Liber Arcanae builds.
* `apps/web/public/registry/palette.json` controls the colour scheme for the helix renderer. The
  `apps/web/public/registry/palettes/` directory archives alternative palettes (for example
  `muse.json`). Copy the desired palette over `apps/web/public/registry/palette.json` to swap schemes
  while staying offline-first.

## Renderer Integration

`index.html` and `js/helix-renderer.mjs` expose the static Cosmic Helix renderer.
They draw four calm layers - Vesica field, Tree-of-Life scaffold, Fibonacci
curve, and double-helix lattice - using deterministic numerology constants
(3, 7, 9, 11, 22, 33, 99, 144). No animation, autoplay, or external libraries are
introduced.

The renderer is consumed directly by several apps (e.g. `apps/hub/` and
`apps/cosmogenesis-engine/`) via relative imports, so keeping the module at the
repository root avoids broken links across the monorepo.

## Codex + Tools

* `packages/codex-14499/` contains the append-only gatherer, schema files, and
  safety reports. Outputs land under `packages/codex-14499/dist/`.
* `engines/blessed-build.js` synthesises muse overlays with enforced clearspace
  and provenance metadata. `codex-engines/server.js` wraps those exports behind a
  minimal HTTP API when needed.
* `scripts/build-corpus-index.mjs` regenerates the offline search index used by
  `apps/hub/`. Run it whenever corpus data changes.
* `scripts/no-placeholders.mjs` blocks placeholder or fake content before
  commits. Run it manually (`node scripts/no-placeholders.mjs`) to honour the
  Cathedral integrity gate.

## Legacy + Lore

* `docs/legacy-cosmogenesis-ui.html` archives the animated UI concept from the
  early Cosmogenesis Engine README. Keep it untouched for reference.
* Additional lore files continue to live beside the code they describe; do not
  invent scaffolds or mock data when extending the canon.

With the renderer assets centralised, duplicate folders removed, and alternate
palettes archived, the Cathedral repository now represents the agreed monorepo
plan. Fly.io deployments can point at this tree without worrying about stray
artifacts or missing datasets.
