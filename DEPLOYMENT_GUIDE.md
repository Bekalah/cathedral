# Cathedral – Free Deployment Stack (Vercel, GitHub Pages, Cloudflare Pages)

This repo builds the web app in `apps/web` as a static Next.js export (`apps/web/out`) and ships it to any of the free hosts below. Pick one or use all three.

- App root: `apps/web`
- Static export: `apps/web/out`
- Config: `apps/web/next.config.js` (env‑driven basePath)

## 1) Vercel (recommended)

Two options: Dashboard import or GitHub Action with secrets.

### Option A — Dashboard import (fastest)

1. Go to vercel.com → New Project → Import Git Repository → select this repo.
2. Root Directory: `apps/web`
3. Framework: Next.js (auto)
4. Install Command: `pnpm -w install`
5. Build Command: `pnpm -C apps/web run build`
6. Output Directory: `apps/web/out`
7. Deploy. Production URL appears after the first build.

Note: Do not set GH_PAGES for Vercel; the build should have no basePath.

### Option B — GitHub Action (no dashboard)

Use `.github/workflows/vercel-deploy.yml`. Add repo secrets at GitHub → Settings → Secrets and variables → Actions:

- `VERCEL_TOKEN` – Personal token (Vercel → Account → Tokens)
- `VERCEL_ORG_ID` – Team/Org ID (Project’s Team Settings)
- `VERCEL_PROJECT_ID` – Project ID (Project Settings → General)
- Optional: `VERCEL_PROJECT_NAME` – e.g., `master-cathedral`

Trigger a run by pushing a change under `apps/web/**` or manually via Actions → “Deploy to Vercel (apps/web)”.

The workflow builds with `NEXT_PUBLIC_GH_PAGES=false` and `GH_PAGES=false` so no basePath is applied.

## 2) GitHub Pages

Wired via `.github/workflows/pages.yml`. It exports statically and deploys the artifact.

- BasePath: `apps/web/next.config.js` auto‑sets `/cathedral` for GH Pages when `GH_PAGES=true` or `NEXT_PUBLIC_GH_PAGES=true`.
- Expected URL: `https://bekalah.github.io/cathedral/`

If you see asset 404s locally, ensure `trailingSlash: true` and that the basePath is set only for Pages builds.

## 3) Cloudflare Pages

Configured in root `wrangler.toml`:

- Build: `pnpm -w install && pnpm -C apps/web run build`
- Publish: `apps/web/out`

In the Cloudflare Pages dashboard:

1. Create project → Connect Git → select this repo.
2. Root Directory: `apps/web`
3. Build Command: `pnpm -w install && pnpm -C apps/web run build`
4. Output Directory: `out` (Cloudflare expects relative to the root dir)
5. Deploy.

## Environment flags and basePath

`apps/web/next.config.js` behavior:

- If `NEXT_PUBLIC_BASE_PATH` or `BASE_PATH` is set → uses that value for `basePath` and `assetPrefix`.
- Else if `GH_PAGES=true` (or `NEXT_PUBLIC_GH_PAGES=true`) → uses `/cathedral` (for GH Pages).
- Else → no basePath (for Vercel/Cloudflare).

## Monorepo build notes (pnpm)

- Install: `pnpm -w install`
- Build: `pnpm -C apps/web run build`
- Dev: `pnpm -C apps/web run dev`

## Verify a deployment

- Vercel Dashboard: open the latest deployment for Production or Preview.
- GitHub Pages: check the “Pages build and deployment” workflow run and open the published URL.
- Cloudflare Pages: open the “Deployments” tab for the project.
