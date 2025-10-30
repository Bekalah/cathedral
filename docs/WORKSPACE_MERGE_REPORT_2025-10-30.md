# Workspace Merge Report — 2025-10-30

Purpose: Document discovered duplicates and the consolidation stance making cathedral-real the provenance master v1.

## Summary

- Canonical repo: cathedral-real/
- Mirrors found under: iCloud CATHEDRAL-SORT THROUGH/working-code and backup-only
- Turborepo and pnpm markers present in cathedral-real
- OpenSpec centralized under cathedral-real/openspec
- Vite apps present in cathedral-real/apps: web, synth-lab, tarot-arena, test-ground
- Agent/Azure pipeline artifacts removed from cathedral-real

## Duplicates and Status

- openspec/\* — Present in both cathedral-real and iCloud mirror → Use cathedral-real as master.
- AVALON_DEPLOYMENT_README.md — Identical in cathedral-real root and docs/deployment; mirror copies exist, no action required.
- apps/\* (Vite) — Duplicates in iCloud mirror; cathedral-real versions are canonical going forward.

## Actions Taken

- Created docs/PROVENANCE_MANIFEST_V1.md with consolidation rules and decommissioned artifacts.
- Verified turborepo (turbo.json) and pnpm-workspace.yaml in cathedral-real.
- Verified OpenSpec: root AGENTS.md points to openspec/AGENTS.md; openspec directory contains active specs/changes.

## Recommended Next Steps

- When a specific file in iCloud mirror is known to be newer, copy into cathedral-real and add a bullet under “Provenance Notes” in PROVENANCE_MANIFEST_V1.md with source path and date.
- Keep mirrors as historical backups; avoid editing them to reduce drift.
