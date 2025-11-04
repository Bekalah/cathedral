<<<<<<< HEAD
<<<<<<< Updated upstream
=======
<!-- MAGNUM OPUS SCOPE: START -->

=======
<!-- MAGNUM OPUS SCOPE: START -->
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
# Cathedral Magnum Opus — Unified Wisdom, Science, Art, and Design

This project permanently unifies and embraces all traditions, wisdom schools, sciences, arts, and design disciplines:

- Alchemy, Hermeticism, Kabbalah, Reiki, and esoteric wisdom
- Academic research, anthropology, physics, mathematics, and architecture
- Traditional and modern art, design, and the secret teachings of all ages
- Integration of global libraries, sacred geometry, fractals, and Codex 144:99

All code, data, and creative work are aligned in grace, beauty, and harmony, connecting every subject and school into a living, trauma-informed, open-source magnum opus.

This scope is permanent and reflected in all turbo monorepo, OpenSpec, and master-cathedral version 1.0 documentation, including:

- [bekalah.github.io/cathedral](https://bekalah.github.io/cathedral)
- All master-cathedral repositories and deployment guides
- Turbo.json and OpenSpec instructions

Every update, integration, and deployment is designed to honor and connect these traditions, ensuring no duplicates, no empty data, and full alignment across all platforms.
<<<<<<< HEAD

<!-- MAGNUM OPUS SCOPE: END -->
>>>>>>> Stashed changes
=======
<!-- MAGNUM OPUS SCOPE: END -->
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<<<<<<< HEAD
<<<<<<< Updated upstream
<!-- OPENSPEC:END -->
=======
=======
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
<!-- OPENSPEC:END -->

## Assistant pairing policy — coderabbit_free by default

To protect the project from accidental paid API usage and to respect contributors' budgets,
the repository's agent integrations now default to a free pairing mode.

- Default: `PREFERRED_ASSISTANT=coderabbit_free` — the agent will not call paid endpoints unless
<<<<<<< HEAD
  a free/public Coderabbit-compatible endpoint is configured via `CODERABBIT_API_URL`.
- To opt into Azure (explicit and deliberate): set `PREFERRED_ASSISTANT=azure` in the environment.
  Use this only if you understand the cost and have valid Azure credentials. The code requires
  an explicit opt-in; Azure is not used by default.
=======
	a free/public Coderabbit-compatible endpoint is configured via `CODERABBIT_API_URL`.
- To opt into Azure (explicit and deliberate): set `PREFERRED_ASSISTANT=azure` in the environment.
	Use this only if you understand the cost and have valid Azure credentials. The code requires
	an explicit opt-in; Azure is not used by default.
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2

Note on extra safety: some repository utilities may still contain Azure-related codepaths
for development or CI. To avoid accidental usage, this repository requires an explicit
opt-in to enable Azure at runtime. You can enable Azure by either:

- Setting environment variable: `ALLOW_AZURE=1` (or `true`/`yes`)
- Creating an empty file named `.allow_azure` at the repository root

When `ALLOW_AZURE` is not present, many runtime entrypoints will refuse to initialize
Azure clients and will provide a clear, non-actionable message instead. This is
intentional to prevent accidental use of paid services and to keep development safe.
<<<<<<< HEAD

- If `coderabbit_free` is selected but `CODERABBIT_API_URL` is not set, the agent returns a
  clear, non-actionable message rather than calling paid services.

This policy minimizes surprises and supports offline/local development using free resources.
>>>>>>> Stashed changes
=======
- If `coderabbit_free` is selected but `CODERABBIT_API_URL` is not set, the agent returns a
	clear, non-actionable message rather than calling paid services.

This policy minimizes surprises and supports offline/local development using free resources.
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
