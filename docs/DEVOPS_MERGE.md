# Monorepo Merge & Import Guide (for Cline)

Purpose
This document explains how to:
- Reorganize local top-level folders into a canonical monorepo layout (apps/, packages/, backend/, assets/).
- Import other Git repositories into the monorepo while preserving their commit history using git-subtree.

Safety first
1. Always create a backup branch:
   git checkout -b monorepo-merge-backup
   git push -u origin monorepo-merge-backup
2. Work on a feature branch:
   git checkout -b monorepo-merge-work
3. Ensure working tree is clean:
   git status
4. Run scripts in dry-run mode first (see below).

What to run (quick)
1. Review top-level folders:
   find . -maxdepth 1 -type d | sed 's/^\.\///'
2. Add scripts and config files from this package to repo root.
3. For local moves:
   bash scripts/merge-local-folders.sh --dry-run
   Inspect output. If OK:
   bash scripts/merge-local-folders.sh
4. To import remote repos with history:
   Edit repos-to-import.json and add remotes.
   bash scripts/import-remote-repos.sh --dry-run
   Inspect results. If OK:
   bash scripts/import-remote-repos.sh

When to use which script
- Use merge-local-folders.sh when your repo already contains all code but folders are scattered or named inconsistently (no external repo history to preserve).
- Use import-remote-repos.sh when you have separate remote Git repositories and you want to consolidate them into the monorepo while keeping their commits.

Post-merge tasks (always)
- Run dependency install:
  npm i -g pnpm
  pnpm install
- Create or update pnpm-workspace.yaml (sample provided).
- Create tsconfig.base.json with path aliases and ensure Vite's resolve.alias or tsconfigPaths plugin corresponds.
- Open each moved package to fix broken relative imports (use path aliases to reduce friction).
- Update Storybook main config to include new package paths.
- Check Strapi: if moved, update env vars, media paths, and Docker Compose.
- Rebuild and run (`pnpm -w -r dev` or start per-app scripts).
- Run linters and tests:
  pnpm -w -r lint
  pnpm -w -r test

Common fixes
- Fix package.json name collisions by prefixing with @coc/<pkg-name>.
- Fix imports by adding tsconfig path alias:
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@coc/*": ["packages/*/src"]
      }
    }
  }
- Add Vite alias mapping:
  resolve: { alias: { '@coc': path.resolve(__dirname, 'packages') } }

Troubleshooting
- "git mv" failures: check file permissions; ensure the destination dir doesn't exist.
- Missing node_modules in workspaces: run pnpm install at repo root.
- Storybook cannot resolve packages: start Storybook from package root or add workspace symlink handling.

Notes about git-subtree vs git-submodule
- git-subtree imports code and history into your monorepo (recommended for monorepo consolidation).
- git-submodule keeps repos separate (not recommended here).

If you need:
- A Docker Compose dev stack (Strapi + Meilisearch + MinIO) — I can generate it.
- A Strapi seed script to re-seed demo content after the merge — I can generate it.
- A jscodeshift transform to update old import paths to new aliases — I can produce it.

Run the scripts now with dry-run and paste the dry-run output here if you'd like me to inspect and refine before committing.
