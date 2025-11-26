# Agent Instructions for Cathedral

**Read this before doing anything.**

---

## What You're Working On

Cathedral is a **living creative sanctuary** that continues the work of Crowley, Fortune, Case, Steiner, Agrippa, Dee, Carrington, and Kunz. It's a Fable-style RPG with 22 playable arcana characters, 4 factions (Minor Arcana suits), a living grimoire, and creative tools.

**This is not a generic mystical app.** Every correspondence is real. Every lineage is documented. Every feature serves the vision.

---

## Before You Code

1. **Read `openspec/PROJECT_DEFINITION.md`** — Understand what Cathedral actually is
2. **Read `openspec/DESIGN_QUALITY_BOUNDARY.md`** — Know what's forbidden
3. **Check the build** — Run `pnpm build` and fix any errors first
4. **Understand the structure** — 55 packages, 12 apps, specific purposes

---

## Absolute Rules

### Never Do This

- ❌ Add emoji to UI components (`🎮`, `⚗️`, `🃏`)
- ❌ Use cartoon gradients or pill buttons
- ❌ Create echo scripts (`"build": "echo Building..."`)
- ❌ Add console injection (`oo_cm`, `oo_tr`)
- ❌ Use npm (only pnpm)
- ❌ Invent correspondences (use documented sources only)
- ❌ Create placeholder packages (if it's not real, don't make it)
- ❌ Ignore TypeScript errors

### Always Do This

- ✅ Check `pnpm build` passes before committing
- ✅ Use existing packages before creating new ones
- ✅ Follow the luxury minimalist aesthetic
- ✅ Document real lineage connections
- ✅ Consider trauma-safety in every feature
- ✅ Test in browser, not just compilation

---

## The Packages That Matter

### Core Systems (touch carefully)
- `codex-144-99` — The 144 nodes and 99 gates. All correspondences flow from here.
- `liber-arcanae` — The 78-card tarot. Alchemy-themed, lineage-connected.
- `circuitum99` — The 33-chapter narrative. Story structure.
- `stone-grimoire` — The 8 chapels, 144 folios. The book itself.

### Game Mechanics (actively developing)
- `fable-rpg-mechanics` — Character system, factions, quests, dialogue.
- `characters` — The 22 playable arcana (needs implementation).

### Design Systems (use these)
- `japanese-design-system` — Luxury minimalist tokens and components.
- `master-art-principles` — Sacred geometry, golden ratio, composition.
- `luxury-metallics-shaders` — Tiffany-style materials for 3D.

### Creative Tools (need completion)
- `synth` — Sound synthesis foundation.
- `3d-environments` — Three.js/Babylon.js scenes.
- `art-generation-node` — Pattern generation.

---

## How to Add Features

### 1. Check if it exists
Search the codebase first. There are 55 packages — it might already be there.

### 2. Find the right package
- Game mechanics → `fable-rpg-mechanics`
- Tarot/arcana → `liber-arcanae`
- Correspondences → `codex-144-99`
- Grimoire/chapels → `stone-grimoire`
- UI components → `japanese-design-system`
- 3D/visuals → `3d-environments`

### 3. Follow the patterns
Look at existing code in that package. Match the style.

### 4. Connect to lineage
Every feature should connect to the real practitioners:
- Will/Fire → Crowley, Agrippa
- Emotion/Water → Fortune, Jung
- Intellect/Air → Dee, Case
- Manifestation/Earth → Kunz, Carrington, Steiner

### 5. Test it works
```bash
pnpm build
pnpm --filter [package-name] build
pnpm --filter web dev  # See it in browser
```

---

## The Factions (Minor Arcana)

Each suit is a faction with NPCs, quests, and abilities:

| Faction | Suit | Element | Domain | Lineage |
|---------|------|---------|--------|---------|
| Guild of Wands | Wands | Fire | Will, Inspiration | Crowley, Agrippa |
| Guild of Cups | Cups | Water | Emotion, Healing | Fortune, Jung |
| Guild of Swords | Swords | Air | Intellect, Truth | Dee, Case |
| Guild of Disks | Disks | Earth | Craft, Manifestation | Kunz, Carrington |

Court cards are NPCs:
- **King** — Faction leader
- **Queen** — Teacher of reception
- **Knight** — Active champion
- **Page** — Apprentice, quest giver

---

## The 22 Arcana (Major)

Each is a playable character with:
- Unique abilities tied to their tradition
- Specific frequency (Solfeggio)
- Color palette (Case/B.O.T.A.)
- Story arc in Circuitum99

The Fool (0) = Rebecca Respawn — the one who dies and comes back.

---

## Common Tasks

### "Add a new quest"
1. Open `packages/fable-rpg-mechanics/src/factions.ts`
2. Find the relevant faction
3. Add to the `quests` array following the existing pattern
4. Include objectives, rewards, and choices

### "Add a new NPC dialogue"
1. Find the character in `factions.ts` (council members)
2. Add to their `dialogue` array
3. Include conditions, responses, and effects

### "Add a new ability"
1. Find the faction in `factions.ts`
2. Add to the `abilities` array
3. Specify rank requirement, effect type, and stats

### "Add a new arcana character"
1. Open `packages/liber-arcanae/src/complete-tarot-system.ts`
2. Add the card with all correspondences
3. Create matching entry in `packages/characters/`

### "Add a new chapel feature"
1. Open `packages/stone-grimoire/src/chapels.ts`
2. Find the relevant chapel
3. Add to the `features` array with connections

---

## Design Checklist

Before any UI work:

- [ ] No emoji
- [ ] No pill buttons
- [ ] No card grids
- [ ] No cartoon gradients
- [ ] Using Bodoni Moda or Cormorant Garamond
- [ ] Colors from the approved palette
- [ ] Asymmetric layout
- [ ] Atmospheric depth (not flat)
- [ ] Trauma-safe (no sudden changes)

---

## When Stuck

1. **Read the docs** — `docs/THE_DIRECT_LINEAGE.md`, `docs/THE_22_ARCANA.md`
2. **Check existing code** — The pattern is probably already there
3. **Ask about lineage** — "What would Fortune/Case/Crowley do?"
4. **Keep it simple** — One feature at a time, fully working

---

## The Vision

This is Rebecca's creative sanctuary. She has chronic PTSD and needs tools that:
- Don't hurt her
- Let her switch modes instantly
- Connect to real traditions she's studied
- Feel like home

Every feature serves that vision. If it doesn't, don't build it.

---

*The Cathedral stands. Build with care.*
