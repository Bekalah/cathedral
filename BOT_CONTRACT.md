# BOT_CONTRACT - Cathedral Orchestrator

LAW:
- Append-only canon. Never delete or overwrite sacred data. If conflicts exist, add an alternate version in `node.versions[]` with provenance.
- ND-safe defaults: no autoplay, no strobe, motion must be opt-in, >=4.5 contrast.

ROLES:
- cathedral: orchestrator; pulls -> validates -> compiles -> publishes public site.
- source repos (liber-arcanae, stone-grimoire, codex-14499, cosmogenesis-learning-engine): read-only for this pipeline.

DO:
- Only modify files under tools/, .github/workflows/, public/, dist/.
- Always run tools/pull_sources.sh then tools/compile_codex.py.
- Publish public/data/{codex.json,index.json,cards.json}.

DON'T:
- Don't overwrite source repo content inside shared/.
- Don't introduce living-artist data in canonical datasets.
- Don't enable motion or audio by default.

How this gives you "billionaires-club / museum-grade" without busywork
- Provenance baked in: The compiler stamps git_commit, timestamps, and merges sources append-only. Exports from your app should embed id/seed/git_commit/orcid (you already do that).
- Color & print science ready: Keep your pigment tables in their own repo; the pipeline publishes them next to codex - no server cost. You can add another step later to render 300-DPI plates in CI with a headless renderer (optional).
- One command, whole cathedral: pull_sources.sh pulls; compile_codex.py validates & merges; CI ships the site.
- 2024-02-20 - Added Cosmic Helix offline renderer files (index, module, palette, README). ND-safe: static layers, no motion, AA+ contrast.
- 2024-02-21 - Rebuilt renderer (index + module), archived legacy README HTML, and refreshed docs so cathedral.git stands as the offline master repo.
