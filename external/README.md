# External ingestion and provenance

This folder stages external data (online snapshots and offline copies) for safe, reviewable import.

- `snapshots/<date>/` — Online snapshots (GitHub Pages, Replit). Each file has a `.provenance.json` sidecar.
- `offline/` — Staged copies from local/offline folders, never overwriting existing files. Each copied file has a `.provenance.json`.
- `PROVENANCE.md` — Human-readable record of sources and how to refresh.
- `import_map.json` — Declarative config describing what to fetch/copy and where to stage.

## Usage (local)

1. Edit `external/import_map.json` with your Replit URL and any offline paths to include.
2. Run the ingest tool to snapshot online sources and stage offline files:

   python tools/external/ingest_external_sources.py

3. Review diffs in `external/` and decide what to merge into core folders with a standard PR.

This process preserves provenance and avoids accidental overwrites.
