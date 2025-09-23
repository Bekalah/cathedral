# Cathedral Monorepo

Offline-first home for the Cathedral corpus. This repository now acts as the
primary hub that will feed the three public faces of the project:

* **Stone Grimoire** - material body work (pigments, CSS, tactile palettes).
* **Liber Arcanae** - tarot, correspondences, narrative spine.
* **Cosmogenesis Engine** - interactive research and art laboratory.

The data and renderer that already live here are ready to be consumed by those
reliant repos. Old deployment placeholders (Netlify, Fly.io, etc.) have been
removed so the tree only carries offline-friendly assets.

## Layout at a Glance

```
apps/
  hub/                # Offline corpus demonstrator
index.html            # Cosmic helix renderer entry point (static)
js/helix-renderer.mjs # Layered sacred geometry renderer
shared/               # Canonical corpus, symbols, packs, and search index
scripts/              # Build helpers (currently corpus index only)
data/palette.json     # Optional palette override for the helix renderer
```

`docs/legacy-cosmogenesis-ui.html` preserves the previous README's inline HTML
prototype. Keeping it in `docs/` honours the lore without letting outdated UI
fragments shadow the actual code we ship.

## Data Readiness

* The corpus index (`shared/corpus/index/corpusIndex.json`) is built from the
  works, symbols, and node packs under `shared/`. No network calls are
  necessary to query it.
* `shared/corpus/texts/` holds TEI/Markdown excerpts for Agrippa, Dee, and the
  Gra recension of *Sefer Yetzirah*.
* `shared/corpus/symbols/` stores layered SVGs for seals, glyphs, and tarot
  plates alongside a metadata manifest.
* `shared/packs/node/` keeps ritual source packets that can be imported into
  future Stone Grimoire or Liber Arcanae builds.

Nothing here blocks ingesting real datasets: there are no stale Netlify config
files, empty deployment folders, or dangling references to external services.

## Merge Path for the Trinity Repos

1. **Stone Grimoire** can mount its pigment and material libraries under
   `apps/` or `shared/` by reusing the current corpus schema.
2. **Liber Arcanae** already has tarot correspondences inside the
   `shared/graph/` files and the source pack for `C144N-000`; extend those JSON
   tables instead of duplicating them in a separate repository.
3. **Cosmogenesis Engine** can reference the renderer module (`js/`) and the
   offline corpus search utilities from `apps/hub/js/` once the UI shell is
   rebuilt.

When each repo is ready, wire them in as Git submodules or packages that read
from this monorepo's `shared/` data so we can retire the legacy stand-alone
repositories.

## Housekeeping Notes

* Cleaned duplicated HTML and conflicting inline scripts from `index.html`.
* Rebuilt `js/helix-renderer.mjs` as a single deterministic module.
* Archived the legacy README HTML into `docs/legacy-cosmogenesis-ui.html` with
  context for future reference.
* Confirmed there are no references to Netlify, Fly.io, or other deploy-only
  scaffolding that would block dataset work.

The Cathedral repository is now a calm, ND-safe foundation ready to absorb the
remaining knowledge from Stone Grimoire and Liber Arcanae.
