Title: feat(external): add demo consumer for codex-144-99 & liber-arcanae, + PR metadata

What
- Adds a minimal `SpiralEngine` stub export at `external/codex-144-99/src/core.ts`.
- Adds a small demo React component (`apps/web/src/components/liberCodexDemo.tsx`) and a page (`apps/web/src/pages/liber-codex-demo.tsx`) that import and show `liber-arcanae` and `codex-144-99`.

Why
- Provide a live, low-friction example that proves the `external/*` workspace packages can be imported by `apps/web`.
- Makes it easier for reviewers to run the monorepo and see quick integration without heavy code.

Notes & Next Steps
- After merge, run `pnpm -w install` then `pnpm run dev` (or `pnpm run turbo:dev`) and visit the dev server route that serves the `apps/web` page (for Vite typical route: http://localhost:5173/liber-codex-demo or adapt based on your routing).
- The `SpiralEngine` and `liber-arcanae` exports are intentionally minimal stubs. Replace with the real engine implementations as you develop.
- This PR is append-only (adds new files only) and includes no destructive edits.

— Moonchild (Rebecca Respawn)
