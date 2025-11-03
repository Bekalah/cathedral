# CathedralMonorepo import — provenance and handling

- Imported on: 2025-11-01 (local time)
- Imported by: GitHub Copilot agent (in-editor)
- Source artifact: macOS shared-pasteboard ZIP
  - Path: /Users/rebeccalemke/Library/Group Containers/group.com.apple.coreservices.useractivityd/shared-pasteboard/items/4A82183C-CF37-4017-A593-BA80463BF64C/CathedralMonorepo.zip
- Destination: external/imports/CathedralMonorepo-20251101/
- Extraction command (recorded from terminal history):
  - unzip -q -o "/Users/rebeccalemke/Library/Group Containers/group.com.apple.coreservices.useractivityd/shared-pasteboard/items/4A82183C-CF37-4017-A593-BA80463BF64C/CathedralMonorepo.zip" -d "/Users/rebeccalemke/cathedral-real/external/imports/CathedralMonorepo-20251101"

## Contents

The ZIP extracted into the subfolder `CathedralMonorepo/` and contains a monorepo layout with Next.js/Turbo, Godot assets, and Rust engines. It also contains a `.git/` directory from the original source. No files were executed during import.

Top-level notable files/folders:

- .git/ (preserved for forensic provenance; do not reuse directly)
- .github/ workflows and docs
- packages/, rust-engines/, godot-cathedral/, docs/
- TAROT_MASTER_DATASET.json and other datasets

## Handling rules

- Treat this directory as READ-ONLY import for analysis and selective integration.
- Do NOT re-use or push the embedded `.git/` directory; our canonical git history remains in this repo.
- Do NOT run unreviewed binaries or scripts from this import.
- Prefer selective copy or subtree import of specific packages/assets after review.

## Integration plan (high level)

1. Map overlapping components (web app, worker, godot, rust engines) against `cathedral-real/` current state.
2. Cherry-pick content we’re missing (e.g., minimal cymatics engine placeholder) into safe locations under our monorepo.
3. Add explicit provenance notes in any copied directories (header with original path and commit-ish if available).
4. Verify static export still builds (Next.js), and run existing smoketests.

## Next actions

- Add a quick scan for spam/placeholder markers and sensitive terms to triage review scope.
- Create an integration checklist PR referencing this provenance doc.
