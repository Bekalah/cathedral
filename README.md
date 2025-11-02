# tesseract-bridge

Central connector for the Cathedral of Circuits. It now runs as a pure JSON API so other repos can stay synchronized without a front-end.

## Web app (apps/web) – Deploy

[![Deploy to Vercel (apps/web)](https://github.com/bekalah/cathedral/actions/workflows/vercel-deploy.yml/badge.svg?branch=main)](https://github.com/bekalah/cathedral/actions/workflows/vercel-deploy.yml)
[![Pages build and deployment](https://github.com/bekalah/cathedral/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/bekalah/cathedral/actions/workflows/pages.yml)

Static Next.js site is located in `apps/web` and exports to `apps/web/out` for Vercel, Cloudflare Pages, or GitHub Pages.

- Vercel: Use the GitHub Action above (add repo secrets) or import via dashboard with Root Directory `apps/web`. See `apps/web/README-deploy.md` for exact steps.
- GitHub Pages: Workflow builds with `GH_PAGES=true` so basePath is `/cathedral` automatically.
- Cloudflare Pages: `wrangler.toml` builds `apps/web` and publishes `apps/web/out`.

Config notes:

- `apps/web/next.config.js` is fully env-driven. On Vercel, no basePath; on GH Pages, set `GH_PAGES=true`.
- Monorepo install/build is workspace-scoped (`pnpm -w install`, `pnpm -C apps/web run build`).

### Live URLs

- GitHub Pages: <https://bekalah.github.io/cathedral/>
- Vercel (production): <https://cathedral-vercel.vercel.app/>
- Cloudflare Pages: add after first deploy

## Service overview

- `server.mjs` provides an Express application that exposes offline registry data at `/registry/*`.
- `/registry` returns a directory listing, while `/registry/:path` streams JSON, CSV (converted to JSON), and NDJSON files directly from `./registry`.
- `/sync` aggregates `registry/ids.json`, `registry/notes/bridge_manifest.json`, and the event queue for quick status polls.
- Every response is JSON; there is no SPA or rendered HTML served by the process.

## Local usage

1. Install dependencies: `npm install`.
2. Start the API: `npm start` (defaults to port 3000).
3. Example checks:
   - `curl http://localhost:3000/registry` → list registry folders/files.
   - `curl http://localhost:3000/registry/ids.json` → parsed registry IDs.
   - `curl http://localhost:3000/sync` → combined manifest + queue snapshot.

## Registry maintenance

- Update `registry/ids.json` before introducing new IDs in downstream repos to keep `core/check_ids.py` happy.
- `registry/notes/bridge_manifest.json` records status for liber-arcanae, liber-arcanae-game, circuitum99, cosmogenesis-learning-engine, and stone-cathedral.
- Run `python3 core/check_ids.py --bridge .` to verify IDs remain consistent.

## Offline geometry renderer

`index.html` and the related assets remain for offline study of the layered geometry (Vesica grid, Tree-of-Life nodes, Fibonacci curve, static helix). Open the file directly; it is not served by the API.

## Fly.io notes

- Deploy manually with `flyctl deploy --config fly.toml` when ready.
- `fly.toml` builds the Docker image defined in `Dockerfile` and keeps autosuspend enabled (`auto_stop_machines = true`, `min_machines_running = 0`).
- Update the Fly app name locally; never commit secrets or automation workflows.

Keep all updates offline-first, trauma-informed, and layered—never flatten the Cathedral geometry.

## Cathedral Creative Design Suite (Python)

Headless, modular sacred-geometry and fractal renderer with a bridge to the Frater Achad system.

Quick start:

1. Ensure Python deps are in the project virtualenv (already set up in `.venv`).
2. Validate everything via VS Code task: Run the task "validate: design suite".
   - This runs two smoketests: the base suite and the Achad integration bridge.
3. CLI demos:
   - Python wrapper: `design-suite/cathedral_design_suite.py`
   - Achad system demo: `hall-of-mysteries/frater_achad_system.py`
4. Export JSON artifacts: `python tools/export/combined_export.py`
   - Generates lightweight JSON for cross-platform use (Godot, TypeScript)
   - PNG export available but disabled by default (keeps repo modular and lightweight)
   - Uncomment PNG section in `combined_export.py` for on-demand image generation

Architecture: JSON specs for interchange, dynamic rendering on-demand, no heavy assets in repo.

Key modules:

- `design-suite/design_suite/` – package entry.
- `geometry.py`, `fractals.py`, `templates.py`, `render.py`, `suite.py` – core modules.
- `integrations/achad_bridge.py` – maps True Will pathways to palettes, geometries, and fractals.

Exports for cross-platform use: JSON-like specs and rendered RGB arrays suitable for Godot/JS.
