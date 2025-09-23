# Shared Data Layout

This directory centralises the corpus and knowledge graph used by every mode in the Cathedral project.

```
shared/
  corpus/
    texts/        # Markdown or TEI excerpts (public domain preferred)
    images/       # IIIF manifest snapshots and notes
    symbols/      # Layered SVG sigils referenced by metadata
    licenses/     # License ledger per work
    index/        # Offline search index (generated)
  graph/
    correspondences.json    # Hermetic correspondences
    wikidata-links.json     # External knowledge graph hooks
  packs/
    node/        # Curated source packs per node
    chapter/     # Chapter-level packs
```

Update `scripts/build-corpus-index.mjs` whenever you add or edit corpus assets so that the hub search stays accurate.
