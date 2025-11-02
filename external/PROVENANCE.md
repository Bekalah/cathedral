# External Content Provenance

This document records sources, timestamps, and intended integration paths for external/offline content merged into this repository.

- Created: 2025-11-01
- Maintainer: @Bekalah

## Sources

1. GitHub Pages
   - URL: https://bekalah.github.io/cathedral
   - Snapshot: `external/snapshots/2025-11-01/github_pages_main.txt`
   - Notes: Static renderer text captured (tool-limited). Use snapshot tool to refresh.

2. Replit (static export of apps/web)
   - URL: Unknown (Replit URL not found in repo). The `.replit` config builds `apps/web/out` and serves on port 3000.
   - Action: Add your Replit URL to `external/import_map.json` under `online.replit.url` to snapshot.

3. Offline Folders (local-only)
   - Paths:
     - `/Users/rebeccalemke/cathedral`
     - `/Users/rebeccalemke/Developer/cathedral-research`
     - `/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/CATHEDRAL-SORT THROUGH`
   - Status: Not accessible to automated tools in this environment. Please run the ingest script locally with access.

4. cathedral-master (Git remote)
   - URL: <https://github.com/Bekalah/cathedral-master>
   - Import method: git subtree add --prefix=external/cathedral-master cathedral-master main --squash
   - Notes: Full history squashed; contents staged under `external/cathedral-master` for review and selective merge.

## How to Refresh Snapshots (local)

Use `tools/external/ingest_external_sources.py` with `external/import_map.json` to fetch online sources and copy selected offline files into the repo with per-file provenance.

Example steps (run locally):

1. Edit `external/import_map.json` to include the Replit URL and any offline files to import.
2. Run the ingest script; it will:
   - Download online content into `external/snapshots/<date>/`
   - Copy mapped offline files into target locations
   - Write a `.provenance.json` next to each imported file

All imports are additive and do not overwrite existing files unless explicitly mapped. Review diffs before committing.
