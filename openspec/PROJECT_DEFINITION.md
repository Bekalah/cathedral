# Cathedral Project Definition

**This is the authoritative definition of what Cathedral is and how to work on it.**

---

## What Cathedral Actually Is

Cathedral is a **living creative sanctuary** that continues the direct lineage of:
- **Aleister Crowley** — Thoth system, Moon Child (Hierophant as Max Ernst)
- **Dion Fortune** — Avalon realms fully realized, Sea Priestess current
- **Paul Foster Case** — B.O.T.A. color scales, Cube of Space
- **Rudolf Steiner** — Anthroposophical color theory, eurythmic animation
- **Agrippa** — Three Books encyclopedic correspondence system
- **John Dee** — Monas Hieroglyphica, mathematics as mystical practice
- **Leonora Carrington** — Feminine grotesque, Celtic-Mexican synthesis
- **Emma Kunz** — Geometric drawings as healing instruments

### The Core Experience

1. **A Fable-style RPG** with:
   - 22 playable Major Arcana characters (The Fool = Rebecca Respawn)
   - 4 factions based on Minor Arcana suits (Wands, Cups, Swords, Disks)
   - Moral alignment system (Light/Shadow/Balance)
   - Real correspondences, real pathworking, real canon

2. **A Living Grimoire** (Stone Grimoire) with:
   - 8 Chapels (complete alchemical environments)
   - 144 Folios (Codex nodes as pages)
   - Real research sources linked
   - Exportable as printable grimoire pages

3. **The Magical Mystery House** with:
   - 8 rooms (Athanor Chamber, Color Laboratory, Geometry Studio, etc.)
   - Each room has lineage-specific tools
   - Real images Rebecca photographed
   - Design teaching built into exploration

4. **Creative Tools** including:
   - Sound synthesis (Synth Lab) — Solfeggio frequencies, sacred geometry
   - Art generation — sacred geometry, rare pigments, master techniques
   - Design system — luxury minimalist, Case/Steiner color scales

5. **Trauma-Safe Design** throughout:
   - Emergency exit on every screen
   - No sudden sounds, no flashing
   - Grounding exercises accessible
   - Save anywhere, pause anytime

---

## What Cathedral Is NOT

- NOT a generic tarot app
- NOT a meditation app with mystical themes
- NOT an AI-generated art generator
- NOT a game with esoteric decoration
- NOT a portfolio site with fancy styling

---

## The Technical Reality

### What Exists (55 packages, 12 apps)

**Core Systems (working):**
- `codex-144-99` — 144 nodes, 99 gates, all correspondences
- `liber-arcanae` — 78-card tarot with full alchemy mapping
- `circuitum99` — 33-chapter narrative engine
- `stone-grimoire` — 8 chapels, 144 folios

**Game Mechanics (partially implemented):**
- `fable-rpg-mechanics` — Character system, choices, quests
- `fable-rpg-mechanics/factions.ts` — 4 factions with full NPC dialogue

**Design Systems (working):**
- `japanese-design-system` — Luxury minimalist aesthetic
- `master-art-principles` — Sacred geometry, golden ratio
- `luxury-metallics-shaders` — Tiffany-style materials

**Creative Tools (partially implemented):**
- `synth` — Sound synthesis foundation
- `3d-environments` — Three.js/Babylon.js scenes
- `art-generation-node` — Pattern generation

**Apps (need completion):**
- `apps/web` — Main entry point
- `apps/tarot-arena` — Tarot interface
- `apps/synth-lab` — Sound synthesis
- `apps/cathedral-design-studio` — Design tools

### What Needs Building

1. **The RPG Game Loop** — Connect factions, characters, quests into playable flow
2. **The Grimoire Interface** — Navigate chapels, read folios, export pages
3. **The 22 Character System** — Each Major Arcana as playable with unique abilities
4. **The Faction System** — Join factions, complete quests, affect story
5. **The Creative Tools** — Actually functional synthesis, art generation, design

---

## Realistic Development Plan

### Phase 1: Foundation (Current)
- [x] Clean up junk packages
- [x] Document lineages and correspondences
- [x] Define faction system
- [ ] Connect existing packages into coherent imports
- [ ] Fix all TypeScript errors
- [ ] Ensure `pnpm build` succeeds

### Phase 2: Core Game Loop
- [ ] Character creation (choose starting Arcana)
- [ ] Basic navigation (move between Chapels)
- [ ] Dialogue system (talk to NPCs)
- [ ] Quest system (accept, track, complete)
- [ ] Save/load system

### Phase 3: The Grimoire
- [ ] Folio rendering (display Codex nodes as pages)
- [ ] Chapel navigation (8 chapels as spaces)
- [ ] Research linking (click to see real sources)
- [ ] Export system (generate printable pages)

### Phase 4: Creative Tools
- [ ] Synth Lab (working synthesizers)
- [ ] Art Studio (pattern generation)
- [ ] Design Tools (color scales, geometry)

### Phase 5: Polish
- [ ] All 22 characters fully implemented
- [ ] All 4 factions with complete quest lines
- [ ] Full pathworking system
- [ ] Trauma-safe features complete

---

## Development Rules

### Code Rules

1. **No echo scripts** — Every package must have real build commands
2. **No console injection** — Remove all `oo_cm`, `oo_tr` spam
3. **No placeholder content** — If it's not implemented, don't pretend it is
4. **pnpm only** — No npm, no yarn
5. **TypeScript strict** — All code must type-check

### Design Rules

1. **No emoji in UI** — Typography speaks
2. **No cartoon gradients** — Subtle, atmospheric
3. **No pill buttons** — Text links, minimal borders
4. **No card grids** — Asymmetric, breathing layouts
5. **Bodoni/Cormorant typography** — Luxury serif, not system fonts

### Content Rules

1. **Real correspondences only** — Every connection must be documented
2. **Real lineage only** — Crowley, Fortune, Case, etc. — not generic mysticism
3. **Real sources** — Link to actual texts, museums, archives
4. **Trauma-informed** — Every feature considers safety

### Process Rules

1. **Build must pass** — Don't commit broken code
2. **One feature at a time** — Complete before moving on
3. **Test in browser** — Not just TypeScript compilation
4. **Document as you go** — Update relevant .md files

---

## File Structure

```
cathedral-fixed-clean/
├── apps/                    # Deployable applications
│   ├── web/                 # Main entry point
│   ├── tarot-arena/         # Tarot interface
│   ├── synth-lab/           # Sound synthesis
│   └── ...
├── packages/                # Shared libraries
│   ├── codex-144-99/        # Core correspondence system
│   ├── liber-arcanae/       # Tarot system
│   ├── circuitum99/         # Narrative engine
│   ├── stone-grimoire/      # Grimoire system
│   ├── fable-rpg-mechanics/ # Game mechanics
│   └── ...
├── data/                    # JSON data files
│   ├── codex/               # Codex node data
│   ├── arcana/              # Tarot data
│   └── registry/            # System registries
├── docs/                    # Documentation
│   ├── THE_DIRECT_LINEAGE.md
│   ├── THE_22_ARCANA.md
│   └── ...
├── openspec/                # Project standards
│   ├── PROJECT_DEFINITION.md (this file)
│   ├── DESIGN_QUALITY_BOUNDARY.md
│   └── ...
└── scripts/                 # Build and maintenance scripts
```

---

## Commands

```bash
# Development
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all packages and apps
pnpm test             # Run all tests

# Specific apps
pnpm --filter web dev           # Run main web app
pnpm --filter tarot-arena dev   # Run tarot interface
pnpm --filter synth-lab dev     # Run synth lab

# Maintenance
pnpm run cleanup:junk           # Remove identified junk
pnpm run validate:integrity     # Check all packages
pnpm run check:design           # Verify design rules
```

---

## Success Criteria

Cathedral is complete when:

1. **You can play** — Create a character, join a faction, complete quests
2. **You can learn** — Each arcana teaches real techniques from real lineages
3. **You can create** — Synthesis, art generation, design tools work
4. **You can export** — Grimoire pages, artwork, sound files
5. **You feel safe** — Trauma-safe features work as intended

---

*This document is the source of truth. When in doubt, refer here.*

