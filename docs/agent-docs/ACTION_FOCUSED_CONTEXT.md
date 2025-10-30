# 🚀 AGENT ACTION CONTEXT - BUILD MODE

## ⚡ CRITICAL: 10 MINUTES TO EXECUTE - NO ECHO, ONLY BUILD

**DO NOT RESPOND WITH CONTEXT. TAKE ACTION ONLY.**

## 🎯 IMMEDIATE ACTIONS - PARALLEL EXECUTION

### PRIORITY 1: Fix Broken Packages (5 min)

```bash
cd /Users/rebeccalemke/cathedral-real
pnpm install
pnpm build --filter=@cathedral/*
```

**Fix any build errors in:**

- packages/types/
- packages/config/
- packages/codex-144-99/
- packages/liber-arcanae/

### PRIORITY 2: Complete Godot Core (3 min)

**Files to CREATE (not read, CREATE):**

1. `godot/scripts/core/dialogue_manager.gd`
2. `godot/scripts/core/quest_manager.gd`
3. `godot/scripts/core/input_manager.gd`
4. `godot/scenes/main_menu.tscn`
5. `godot/scenes/character_select.tscn`

**Use the patterns from existing files in `godot/scripts/core/`**

### PRIORITY 3: Documentation Consolidation (2 min)

**Merge duplicate docs in `docs/` into:**

- `docs/guides/QUICK_START.md` (merge all README variations)
- `docs/specs/ARCHITECTURE.md` (merge all CATHEDRAL_ARCHITECTURE variations)
- `docs/development/STANDARDS.md` (merge all STANDARDS/QUALITY docs)

## 📁 NEW STRUCTURE - USE THESE PATHS

```
/Users/rebeccalemke/cathedral-real/
├── packages/           # Turborepo packages
├── godot/             # Godot game project
│   ├── scripts/core/  # Core systems (7 exist, need 3 more)
│   └── scenes/        # Game scenes (need to create)
├── docs/              # Organized documentation
│   ├── agent-docs/    # Agent context (YOU ARE HERE)
│   ├── development/   # Dev guides
│   ├── guides/        # User guides
│   └── specs/         # Architecture specs
└── tools/             # Automation scripts
    └── automation/    # Your runner is here
```

## 🤖 AGENT ROLES - EXECUTE YOUR TASK

### KAOZ Agents (50)

**Break things that are broken, fix them properly:**

1. Delete duplicate/conflicting docs in `docs/`
2. Fix TypeScript build errors
3. Remove unused dependencies
4. Clean up `docs/` further (still 70+ files)

### ORDER Agents (50)

**Build new things:**

1. Create missing Godot scripts
2. Implement missing TypeScript packages
3. Write consolidated documentation
4. Set up CI/CD configs

## ⚠️ CRITICAL RULES

1. **NO ECHO** - Don't respond with this context back to me
2. **FILE OPERATIONS ONLY** - Create, edit, delete files
3. **USE REAL PATHS** - All paths start with `/Users/rebeccalemke/cathedral-real/`
4. **TEST YOUR CHANGES** - Run `pnpm build` after package changes
5. **GIT COMMIT YOUR WORK** - Make commits with clear messages

## 🎯 SUCCESS METRICS

After your 10-minute run:

- [ ] `pnpm build` succeeds with no errors
- [ ] 10 new Godot scripts created
- [ ] `docs/` reduced to <40 organized files
- [ ] Git commits show real changes

## 🚀 START NOW - TIMER RUNNING

Current time: Check system clock
Deadline: 10 minutes from start
Credits: Burning fast

**GO GO GO!**
