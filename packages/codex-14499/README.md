# Codex 144:99 — Master Builder

Offline-first gatherer for sacred dataset artifacts across Cathedral-related repositories.

## Modes
- **Local**: sweep sibling repositories on disk using glob patterns.
- **GitHub**: fetch blobs from the `bekalah` org using a read-only `GITHUB_TOKEN` (no writes).

## Usage
```
node packages/codex-14499/tools/gather-codex.mjs --config=packages/codex-14499/config/sources.local.json
node packages/codex-14499/tools/gather-codex.mjs --config=packages/codex-14499/config/sources.github.json --out=packages/codex-14499/dist
```

Outputs land in `packages/codex-14499/dist/`:
- `codex.master.json`
- `codex.index.json`
- `codex.report.md`
- `codex.safety.json`

The merge is append-only, highlights conflicts, and keeps ND-safe checks visible in the report.
