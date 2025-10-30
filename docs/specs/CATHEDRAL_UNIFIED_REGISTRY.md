# Cathedral Unified App & Domain Registry

This file is AUTO-GENERATED draft. Central index of all active playable/interactive modules, domain datasets, and lore codices to enforce monostructure.

## Active Applications
- web (primary portal)
- test-ground (R&D sandbox)
- tarot-arena (Avatar resonance duels / collaboration)
- synth-lab (Audio synthesis + crystal/archetype modulation)

## Planned / To Consolidate
- master-catalog-browser (convert into modular data explorer React app)
- cathedral-connection-map (migrate graph data into @cathedral/shared + React visualization)
- cosmogenesis-visualizer (fold into a single Exploration app with dynamic loaders)
- magical mystery house (future: separate app or integrated exploration mode)

## Domain Packages
- @cathedral/brain (color, sound, style engines)
- @cathedral/soul (archetypes + interference functions)
- @cathedral/labs (collaboration utilities)
- @cathedral/shared (UI + couture assets baseline)
- @cathedral/crystals (crystal intelligence + fusion resonance)
- @cathedral/synth (synthesis engine + patch library)

## Data / Lore Reconciliation (NEXT)
- Merge MASTER_* codices into structured JSON under `data/registry/` with provenance keys.
- Establish `@cathedral/datasets` (future) to expose typed loaders for: numbers, provenance, nodes, lattice links, sessions.

## Immediate Structural Tasks
1. Create data registry folder: data/registry with JSON index.
2. Build transformer to parse scattered MD -> JSON canonical forms.
3. Replace raw HTML standalone pages with React route-mountable components.
4. Provide site-wide navigation manifest consumed by all apps.
5. Introduce workspace lint to forbid new top-level HTML except app entrypoints.

## Cross-System Mappings
- Archetype ↔ Crystal ↔ Patch (soul + crystals + synth) => harmonic persona API.
- Number Evolution ↔ Resonance metrics (brain + number codex) => pattern mining.
- Provenance ↔ Renderable Assets => automatically show source lineage.

## Enforcement Hooks (Planned)
- Script: `pnpm run audit:structure` ensuring only whitelisted top-level files added.
- Generation: `scripts/build-registry.mjs` outputs `data/registry/index.json` consumed by apps.

(End of draft. Edits will be overwritten by generator once implemented.)
