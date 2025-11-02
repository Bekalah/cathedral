# Free Deployment Stack – Final Summary (V1)

This repository is configured for a zero-cost, professional deployment stack.

## What’s set up

- apps/web (Next.js static export)
  - `apps/web/next.config.js` – env-driven basePath; `output: "export"`; `trailingSlash: true`
- Vercel (recommended)
  - Root `vercel.json` builds `apps/web` and outputs to `apps/web/out`
  - GitHub Action: `.github/workflows/vercel-deploy.yml` (secrets-based)
- GitHub Pages
  - Workflow: `.github/workflows/pages.yml` (static export uploaded)
- Cloudflare Pages
  - `wrangler.toml` builds `apps/web` and publishes `apps/web/out`
- Documentation
  - `DEPLOYMENT_GUIDE.md` – exact steps for Vercel, GH Pages, Cloudflare
  - `MERGE_GUIDE.md` – safe merge process for external branches/repos
  - `POST_MERGE_VALIDATION.sh` – quick validation script
  - Root `README.md` – Vercel badge + pointers

## Deploy now

- Vercel (dashboard): Import repo → Root Directory `apps/web` → Deploy
- Vercel (Action): Add repo secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) and push or run workflow
- GitHub Pages: Push to `main`; workflow deploys with GH basePath
- Cloudflare Pages: Connect Git, Root `apps/web`, build, publish

## URLs

- GitHub Pages (expected): <https://bekalah.github.io/cathedral/>
- Vercel and Cloudflare: Provided by their dashboards after first deploy

## Notes

- Keep heavy exports out of Git; the site is built on demand.
- If you change hosting, adjust `NEXT_PUBLIC_BASE_PATH`/`BASE_PATH` or `GH_PAGES` accordingly.
- For Godot/Rust work, build locally; CI for native artifacts can be added later.
