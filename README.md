# Cathedral of Circuits — Monorepo (Free / Open Source)

Purpose
Cathedral of Circuits is a modular platform for visionary art, archetypes & daimon experiences, scientific research integration, and RPG-style narrative learning — built with free and open-source tools.

Quick local setup (dev)
1. Clone + install:
   ```bash
   git clone <repo-url>
   cd cathedral-of-circuits
   npm i -g pnpm
   pnpm install
   ```
2. Start frontend (dev):
   ```bash
   pnpm --filter web dev
   ```
3. Start Storybook:
   ```bash
   pnpm --filter packages/ui storybook
   ```
4. Start Strapi (dev):
   - Option A: Docker Compose (recommended)
     ```bash
     docker compose up -d
     # then check http://localhost:1337/admin
     ```
   - Option B: local (sqlite)
     ```bash
     cd backend/strapi
     pnpm install
     pnpm run develop
     ```

Repository layout (recommended)
- /apps
  - /web           -> Vite + React app (public UI)
  - /godot         -> Godot project for prototype gameplay (binary project files)
- /packages
  - /ui            -> Shared React components (used by apps/web & storybook)
  - /api           -> API clients & types (Strapi client, search client)
  - /storybook     -> Storybook app (may live under packages/ui)
- /backend
  - /strapi        -> Strapi project (content types, seed scripts)
- /assets
  - /2d
  - /3d
  - /ai-generated
- /notebooks       -> Jupyter notebooks & data exports
- /scripts        -> helper scripts (seed, import, export)
- /docs
- pnpm-workspace.yaml
- nx.json / turbo.json

Development conventions
- TypeScript across frontend & packages.
- Keep UI components in /packages/ui and add Storybook stories for every component change.
- Create small, focused PRs that include Storybook updates for new or changed components.
- Component Acceptance: each component must have:
  - Storybook stories (default props + edge cases)
  - Unit test (Jest or Vitest) for core behavior
  - Accessibility checks manually in Storybook

Strapi: content models & best practices
- Canonical models:
  - book (title, authors, source_url, license)
  - chapter (book -> chapter index, text, excerpt)
  - archetype (see sample model in root /content-models)
  - daimon (relation to archetype)
  - artwork (media, metadata JSON)
  - journey (ordered chapters, state machine metadata)
  - journal_entry (user relation, content JSON)
- Use Strapi relations rather than embedded JSON when you want referential integrity.
- Seed scripts: put in /backend/strapi/scripts/seed-*.js to bootstrap demo content (use sqlite for local).
- Web client: use the /api endpoints (REST or GraphQL). Expose only public read endpoints to anonymous users.

Example API call (frontend)
```ts
// packages/api/strapiClient.ts
export async function getArchetypes(): Promise<Archetype[]> {
  const res = await fetch(`${process.env.STRAPI_URL}/api/archetypes`);
  const json = await res.json();
  return json.data;
}
```

Asset & metadata workflow
- Add assets under relevant /assets subfolder.
- Add a metadata file named <slug>.meta.json alongside each asset:
  ```json
  {
    "title": "Archetype Portrait",
    "author": "Artist Name",
    "license": "CC-BY-4.0",
    "source": "local-generation",
    "created_at": "2025-10-09T00:00:00Z",
    "model": "stable-diffusion-v1",
    "prompt": "visionary archetype portrait, ...",
    "seed": 123456789,
    "tags": ["visionary","archetype"]
  }
  ```
- If large binary assets are used, enable Git LFS or store in MinIO/S3-compatible store and reference via Strapi media uploads.

AI art generation (developer)
- Preferred approach: keep generation local. Use Python diffusers scripts to generate and produce metadata JSON.
- Example (python pseudo):
  ```bash
  python scripts/generate_sd.py --prompt "visionary daimon portrait" --out-dir assets/ai-generated
  ```
- Script writes image and <image>.meta.json.

Narrative & Twine integration
- Author Twine stories and export to JSON or HTML.
- Convert Twine export to a Strapi Journey content item with ordered chapters and step metadata.
- Godot can fetch a Journey JSON via REST and render chapters locally.

Godot integration pattern
- Use Strapi as canonical content provider.
- Godot scenes read JSON for chapters and assets; fallback to embed content for offline prototypes.
- For web parity, mirror UI state and content model shapes in packages/api to share types.

CI & Pull Requests
- GitHub Actions tasks:
  - Install pnpm dependencies
  - Run linters (ESLint)
  - Run unit tests (Vitest/Jest)
  - Build Storybook (artifact)
  - Optionally run a Strapi Docker build/test step
- PR checklist:
  - Has unit tests or Storybook stories for UI changes
  - Strapi schema changes documented in /docs or via content-model JSON
  - Assets added have metadata files
  - No secret keys in commits

Testing
- Unit tests: packages/ui components with Vitest or Jest + Testing Library
- Storybook snapshots: for visual regression (optional)
- Integration tests: minimal E2E with Playwright targeting frontend routes and API availability

Debugging tips
- API 401/403: check Strapi roles & permissions for public endpoints
- Missing images: verify Strapi media library or file path under /assets
- Search failures: check Meilisearch index status and webhook connectivity from Strapi

Adding a new archetype (developer steps)
1. Create Strapi content entry (Archetype) with title, summary, full_text and upload artwork.
2. Add related books via Book content-type or link external sources.
3. Create Storybook stories for UI cards/displays that show the archetype entry shape.
4. Add indexing: ensure Strapi webhook updates Meilisearch on create/update.
5. Add unit tests for components consuming archetype data.

Content model example (Archetype)
```json
{
  "collectionName": "archetypes",
  "info": {"name": "Archetype"},
  "attributes": {
    "title": {"type": "string"},
    "slug": {"type": "uid"},
    "summary": {"type": "text"},
    "full_text": {"type": "richtext"},
    "tags": {"type": "json"},
    "artwork": {"type": "media", "multiple": true}
  }
}
```

Contribution & code review
- Use feature branches: feature/<short-description>
- Keep commits focused and atomic; write clear PR descriptions referencing issues.
- Tag reviewers for UI, backend (Strapi), and content when relevant.

Onboarding checklist for new dev
- Install dependencies (pnpm)
- Run Docker Compose to start Strapi and Meilisearch
- Start frontend & Storybook
- Run seed script to populate demo content
- Read INFRASTRUCTURE.md & USER_GUIDE.md

Contact & escalation
- Project owner: Bekalah
- Developer lead: Cline
- For urgent infra issues: open a GitHub Issue with "infra" label and notify lead.
