# 🔗 CATHEDRAL CONSOLIDATION AUDIT

**Version**: 1.0.0  
**Date**: October 30, 2025  
**Purpose**: Identify all Azure/Copilot connections, redundant repos, and merge opportunities  
**Status**: ✅ AUDIT COMPLETE

---

## 🎯 EXECUTIVE SUMMARY

### Current State

- **Repos**: 4 workspace folders (cathedral-real + 3 backup/research folders)
- **Packages**: 43 JavaScript packages in monorepo
- **Apps**: 6 primary apps (web, tarot, synth-lab, worker, test-ground, rosslyn-explorer)
- **Deployments**: 3 URLs (GitHub Pages primary, Vercel configured, Cloudflare configured)
- **Azure Integration**: Optional, build-time only (not runtime dependency)

### Consolidation Opportunities

- ✅ **Repos**: Merge to 1 (cathedral-real is canonical)
- ✅ **Packages**: Reduce 43 → ~25 (merge overlapping functionality)
- ✅ **Apps**: Merge 6 → 3 Trinity apps (MIND-SOUL-BODY)
- ✅ **Deployments**: Simplify to 1 primary URL (GitHub Pages)
- ✅ **Azure**: Already optional and properly scoped

---

## 🔍 AZURE & AI INTEGRATIONS

### Azure Services (Optional, Build-Time Only)

#### 1. Azure OpenAI Integration

**Location**: `apps/web/`, `packages/config/`
**Purpose**: Optional art enhancement (not required for core functionality)
**Status**: ✅ PROPERLY SCOPED
**Dependencies**:

```json
"@azure-rest/ai-inference": "^1.0.0-beta.6",
"@azure/identity": "^4.13.0",
"@azure/openai": "^2.0.0"
```

**Usage**:

- `apps/web/scripts/azure-art-enhancer.js` - Optional image enhancement
- `apps/web/package.json` - Script: `azure:image`
- **NOT** in critical path - app works without Azure

#### 2. Azure AI Foundry (Decommissioned)

**Location**: `tools/automation/`, `EMERGENCY_RUN.py`
**Purpose**: Agent batch processing (time-limited credits)
**Status**: ⚠️ REMOVED - Credits expired
**Action**: Archive remaining files to `archive/azure-agents/`

**Files to Archive**:

- `tools/automation/run_agents_fast.py`
- `tools/automation/run_agent_batch.py`
- `EMERGENCY_RUN.py`
- `ENHANCED_AGENTS_README.md`
- `docs/AGENT_RUN_REPORT_2025-10-30.md`

#### 3. Azure Static Web Apps Config

**Location**: `apps/web/azure-static-web-apps.yml`
**Purpose**: Alternative deployment option
**Status**: ⚠️ UNUSED - GitHub Pages is primary
**Action**: Keep as documentation but not in CI/CD

### Copilot Integration

**Location**: `.github/copilot-instructions.md`, `AGENTS.md`
**Purpose**: AI assistant guidance for development
**Status**: ✅ ACTIVE AND CONNECTED
**Files**:

- `.github/copilot-instructions.md` - Workspace-specific instructions
- `openspec/AGENTS.md` - OpenSpec AI agent protocols
- `MASTER_INDEX.md` - Referenced by Copilot for keyword search
- `MASTER_V1_CONTROL.md` - Version control guidance

**Connection**: All copilot files properly reference Master Index and control documents ✅

---

## 📦 PACKAGE CONSOLIDATION OPPORTUNITIES

### Current: 43 Packages

#### Core Packages (Keep - 10)

1. `@cathedral/core` - Shared utilities ✅
2. `@cathedral/config` - Configuration ✅
3. `@cathedral/types` - TypeScript types ✅
4. `@cathedral/data` - Data management ✅
5. `@cathedral/liber-arcanae` - Tarot system ✅
6. `@cathedral/circuitum99` - 99 Gates ✅
7. `@cathedral/stone-grimoire` - Chapel system ✅
8. `@cathedral/cosmogenesis-learning-engine` - MIND (Brain) ✅
9. `@cathedral/magical-mystery-house` - Navigation ✅
10. `@cathedral/tesseract-bridge` - Integration ✅

#### Merge Candidates (Reduce 33 → 15)

**Game Engine Consolidation**:

- ❌ `@cathedral/game-engine`
- ❌ `@cathedral/circuit-craft-creative-game`
- ❌ `@cathedral/cyoa-book-game`
- ❌ `@cathedral/circuitum99-arcanae-cyoa`
- ✅ **Merge into**: `@cathedral/game-systems` (single game engine package)

**Creative Tools Consolidation**:

- ❌ `@cathedral/creative-engine`
- ❌ `@cathedral/cathedral-design-library`
- ❌ `@cathedral/cathedral-lightweight-library`
- ❌ `@cathedral/cathedral-plugin-system`
- ✅ **Merge into**: `@cathedral/design-tools` (unified creative suite)

**Godot Bridge Consolidation**:

- ❌ `@cathedral/godot-design-studio`
- ❌ `@cathedral/godot-liber-arcanae`
- ❌ `@cathedral/godot-codex-14499`
- ❌ `@cathedral/godot-vfx-library`
- ✅ **Merge into**: `@cathedral/godot-bridge` (single Godot integration)

**Fusion/Kink Engine Consolidation**:

- ❌ `@cathedral/cathedral-fusion-kink-engine`
- ❌ `@cathedral/gentle-fusion-lab`
- ❌ `@cathedral/fractal-flames-daemon-deity`
- ✅ **Merge into**: `@cathedral/fusion-systems` (unified fusion mechanics)

**Visual/UI Consolidation**:

- ❌ `@cathedral/ui`
- ❌ `@cathedral/avatar-experience-system`
- ✅ **Merge into**: `@cathedral/interface` (unified UI components)

**Music/Audio Consolidation**:

- ❌ `@cathedral/synth`
- ❌ `@cathedral/crystals` (sound-related)
- ✅ **Merge into**: `@cathedral/audio-systems` (unified audio)

**Meta Packages** (Keep as-is):

- ✅ `@cathedral/brain` - Alias to cosmogenesis
- ✅ `@cathedral/soul` - Alias to circuitum99
- ✅ `@cathedral/engines` - Meta-package
- ✅ `@cathedral/shared` - Shared resources
- ✅ `@cathedral/luxcrux` - Specialty system
- ✅ `@cathedral/codex-144-99` - Core codex

### Proposed Package Structure (25 Total)

**Core (10)**: core, config, types, data, liber-arcanae, circuitum99, stone-grimoire, cosmogenesis, mystery-house, tesseract-bridge

**Consolidated (9)**: game-systems, design-tools, godot-bridge, fusion-systems, interface, audio-systems, brain (alias), soul (alias), engines (meta)

**Specialty (6)**: shared, luxcrux, codex-144-99, crystals (if not merged), avatar (if kept separate), plugin-system (if architecture requires)

---

## 🎮 APP CONSOLIDATION OPPORTUNITIES

### Current: 6 Apps

#### Primary Apps (Keep - 3 Trinity)

1. **apps/web/** - MIND/SPIRIT (Main Cathedral 3D)
   - Three.js 3D viewer
   - Sacred geometry
   - Primary entry point
   - **Deploy**: bekalah.github.io/cathedral

2. **apps/liber-arcanae-tarot/** - SOUL (Tarot System)
   - 22 Major Arcana
   - Interactive readings
   - Living tradition engines
   - **Deploy**: bekalah.github.io/cathedral/soul

3. **apps/cosmogenesis/** - MIND/BRAIN (Learning Engine)
   - Research systems
   - Knowledge lattice
   - Educational content
   - **Deploy**: bekalah.github.io/cathedral/mind

#### Secondary Apps (Merge or Archive)

**4. apps/synth-lab/** - Music Synthesizer

- **Status**: Standalone but could merge into apps/web as subpage
- **Action**: Keep separate OR merge as /synth route in apps/web
- **Decision**: Keep if independent value, merge if just feature

**5. apps/test-ground/** - Development Testing

- **Status**: Dev-only, not for production
- **Action**: Keep but don't deploy (dev tools only)

**6. apps/rosslyn-explorer/** - Rosslyn Chapel Explorer

- **Status**: Specialty app for specific content
- **Action**: Merge into apps/web as /rosslyn route
- **Rationale**: Same 3D engine, just different content

**7. apps/tarot-arena/** - Tarot Game/Battle System

- **Status**: Gaming variant of tarot
- **Action**: Merge into apps/liber-arcanae-tarot as /arena mode
- **Rationale**: Same tarot data, just different interface

**8. apps/worker/** - Cloudflare Worker API

- **Status**: Backend/API for deployed apps
- **Action**: Keep - required for dynamic features
- **Deploy**: cathedral-api.bekalah.workers.dev

### Proposed App Structure (4 Deployed)

1. **apps/web/** (MIND+SPIRIT) - Main entry + sacred geometry + Rosslyn
2. **apps/liber-arcanae-tarot/** (SOUL) - Tarot + arena mode
3. **apps/synth-lab/** (Optional standalone) - Music synthesis
4. **apps/worker/** (API) - Cloudflare Worker backend

**Not Deployed**:

- apps/test-ground (dev only)

---

## 🌐 DEPLOYMENT CONSOLIDATION

### Current Deployments (3 Configured)

#### 1. GitHub Pages (Primary - Active)

**URL**: https://bekalah.github.io/cathedral
**Status**: ✅ CONFIGURED (needs manual Pages enable)
**Workflow**: `.github/workflows/deploy.yml`
**Apps**: All static apps deploy here
**Action**: **KEEP AS PRIMARY**

#### 2. Vercel (Alternative - Configured but unused)

**URL**: https://cathedral.vercel.app (planned)
**Config**: `vercel.json` in root
**Status**: ⚠️ CONFIGURED BUT NOT DEPLOYED
**Action**: **REMOVE or use as preview deployments only**

#### 3. Cloudflare Pages (Alternative - Configured but unused)

**URL**: https://cathedral.pages.dev (planned)
**Config**: `config/wrangler.toml`
**Status**: ⚠️ CONFIGURED BUT NOT DEPLOYED
**Action**: **KEEP for Worker API only**

- Deploy apps/worker to: cathedral-api.bekalah.workers.dev
- Don't duplicate static site to Cloudflare Pages

### Proposed Deployment Strategy (1 Primary + 1 API)

**Primary Static Site**:

- Platform: GitHub Pages
- URL: https://bekalah.github.io/cathedral
- Apps: web, liber-arcanae-tarot, synth-lab (all static)

**API/Backend**:

- Platform: Cloudflare Workers
- URL: https://cathedral-api.bekalah.workers.dev
- App: apps/worker only

**Remove**:

- Vercel deployment (unnecessary duplication)
- Cloudflare Pages static site (use GitHub Pages instead)
- Azure Static Web Apps config (unused)

---

## 🗂️ REPOSITORY CONSOLIDATION

### Current: 4 Workspace Folders

1. **cathedral-real/** - ✅ CANONICAL (keep)
   - Main development repository
   - All current work
   - GitHub: github.com/Bekalah/cathedral

2. **cathedral/** - ❌ EMPTY (remove from workspace)
   - Empty folder in workspace
   - No content
   - Action: Remove from VS Code workspace

3. **cathedral-research/** - ⚠️ BACKUP (archive)
   - Location: ~/Developer/cathedral-research
   - Research notes and backups
   - Action: Keep as local backup, remove from active workspace

4. **CATHEDRAL-SORT THROUGH/** - ⚠️ iCLOUD BACKUP (archive)
   - Location: iCloud Documents
   - Mirrors and old versions
   - Action: Keep in iCloud, remove from active workspace

### External Repos (Separate Deployments)

**stone-grimoire** - https://github.com/Bekalah/stone-grimoire

- Status: Separate repo for BODY system
- Deploy: https://bekalah.github.io/stone-grimoire
- Action: **KEEP SEPARATE** (by design - Trinity architecture)

**cosmogenesis-learning-engine** - Planned separate repo

- Status: Not yet created
- Deploy: https://bekalah.github.io/cosmogenesis-learning-engine (planned)
- Action: **CREATE WHEN READY** for MIND/BRAIN system

### Proposed Repo Structure

**Active Development (1 workspace folder)**:

- cathedral-real/ - Main monorepo

**Separate Deployments (2-3 external repos)**:

- stone-grimoire (BODY) - Already exists
- cosmogenesis-learning-engine (MIND) - Create later
- cathedral (SPIRIT) - Main repo

**Archives (keep locally, not in workspace)**:

- ~/Developer/cathedral-research/
- ~/Library/Mobile Documents/.../CATHEDRAL-SORT THROUGH/

---

## 🔗 PUBLISHED LINKS & TOOLS AUDIT

### GitHub Published Links

**Primary Repository**:

- URL: https://github.com/Bekalah/cathedral
- Status: ✅ ACTIVE
- Visibility: Public
- License: MIT

**GitHub Pages**:

- URL: https://bekalah.github.io/cathedral
- Status: ⚠️ CONFIGURED (needs manual enable)
- Action: Enable in repo settings → Pages → Source: GitHub Actions

**External Repos**:

- stone-grimoire: https://github.com/Bekalah/stone-grimoire ✅
- (planned) cosmogenesis: https://github.com/Bekalah/cosmogenesis-learning-engine

### npm Published Packages

**Status**: ⚠️ NONE PUBLISHED YET
**Scope**: @bekalah or @cathedral
**Action**: Publish core packages after consolidation

**Recommended for Publication**:

1. `@bekalah/cathedral-core` - Core utilities
2. `@bekalah/liber-arcanae` - Tarot system (research-backed, reusable)
3. `@bekalah/codex-144-99` - Sacred math library
4. `@bekalah/design-tools` - Design suite (after consolidation)

**Keep Private** (game-specific):

- game-systems, fusion-systems, mystery-house, etc.

### Tools & Scripts

**Build Tools** (already consolidated):

- ✅ TurboRepo 2.1.3 - Monorepo orchestration
- ✅ Vite 5.4.21 - App bundling
- ✅ TypeScript 5.6.3 - Type checking
- ✅ pnpm 8.15.0 - Package management

**Cathedral CLI** (`tools/cathedral-cli.js`):

- ✅ Health check
- ✅ Backup
- ✅ Audit
- Status: Good, keep as-is

**Validation Tools**:

- ✅ `tools/validate-turbo-config.cjs`
- ✅ `tools/validate-ownership.js`
- ✅ `tools/health-check.js`
- Status: Good, all connected properly

**Python Tools**:

- ✅ `design-suite/cathedral_design_suite.py` - Main CLI
- ✅ `hall-of-mysteries/frater_achad_system.py` - QBLH system
- ✅ `tools/validate/design_suite_smoketest.py` - Tests
- Status: Good, proper separation

**Azure Agent Tools** (decommissioned):

- ⚠️ `tools/automation/run_agents_fast.py`
- ⚠️ `tools/automation/run_agent_batch.py`
- Action: Archive to `archive/azure-agents/`

---

## 🔧 CONSOLIDATION ACTION PLAN

### Phase 1: Repository Cleanup (1 hour)

```bash
# 1. Remove empty workspace folders
code --remove-folder /Users/rebeccalemke/cathedral
code --remove-folder /Users/rebeccalemke/Developer/cathedral-research
code --remove-folder "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/CATHEDRAL-SORT THROUGH"

# 2. Archive Azure agent files
mkdir -p archive/azure-agents
mv tools/automation/run_agents_fast.py archive/azure-agents/
mv tools/automation/run_agent_batch.py archive/azure-agents/
mv EMERGENCY_RUN.py archive/azure-agents/
mv ENHANCED_AGENTS_README.md archive/azure-agents/
mv docs/AGENT_RUN_REPORT_2025-10-30.md archive/azure-agents/

# 3. Remove unused deployment configs
rm apps/web/azure-static-web-apps.yml  # Keep as doc reference only
```

### Phase 2: Package Consolidation (4-6 hours)

```bash
# 1. Create consolidated packages
mkdir -p packages/game-systems
mkdir -p packages/design-tools
mkdir -p packages/godot-bridge
mkdir -p packages/fusion-systems
mkdir -p packages/interface
mkdir -p packages/audio-systems

# 2. Merge packages (manual code review required)
# - Copy code from old packages to new consolidated ones
# - Update imports across codebase
# - Test thoroughly

# 3. Update package.json workspaces
# Remove old packages, add new consolidated ones

# 4. Run validation
pnpm install
pnpm run build
pnpm run test
```

### Phase 3: App Consolidation (2-3 hours)

```bash
# 1. Merge rosslyn-explorer into apps/web
# - Copy components to apps/web/src/components/Rosslyn/
# - Add /rosslyn route
# - Test 3D rendering works

# 2. Merge tarot-arena into apps/liber-arcanae-tarot
# - Add /arena mode toggle
# - Reuse existing tarot data
# - Test game mechanics

# 3. Decide on synth-lab
# Option A: Keep separate (if substantial)
# Option B: Merge into apps/web as /synth route

# 4. Clean up apps/ directory
rm -rf apps/rosslyn-explorer  # After merge
rm -rf apps/tarot-arena  # After merge
```

### Phase 4: Deployment Simplification (1 hour)

```bash
# 1. Enable GitHub Pages
# - Go to repo settings
# - Pages → Source: GitHub Actions
# - Test: https://bekalah.github.io/cathedral

# 2. Remove Vercel config (or keep for previews)
# Optional: rm vercel.json

# 3. Update wrangler.toml for Worker only
# Keep only apps/worker config

# 4. Update all documentation
# - Update MASTER_V1_INTEGRATION.md
# - Update package.json homepage URLs
# - Update README.md
```

### Phase 5: Documentation Update (1 hour)

```bash
# 1. Update MASTER_INDEX.md
# - Reflect new package names
# - Update file paths after consolidation

# 2. Update MASTER_V1_INTEGRATION.md
# - New app structure
# - Simplified deployment
# - Updated package list

# 3. Update MASTER_V1_CONTROL.md
# - New version after consolidation
# - Updated component manifest

# 4. Create migration guide
# - Document package name changes
# - Update import paths
# - Breaking changes (if any)
```

---

## 📊 BEFORE & AFTER COMPARISON

### Before Consolidation

| Category          | Count | Issues                    |
| ----------------- | ----- | ------------------------- |
| Workspace Folders | 4     | 3 are duplicates/archives |
| JS Packages       | 43    | Overlapping functionality |
| Apps              | 6     | 2 can merge               |
| Deployments       | 3     | 2 unused                  |
| Azure Integration | Mixed | Some files orphaned       |

**Total Complexity**: HIGH (hard to maintain)

### After Consolidation

| Category          | Count | Benefits                         |
| ----------------- | ----- | -------------------------------- |
| Workspace Folders | 1     | Single source of truth           |
| JS Packages       | 25    | Clear separation of concerns     |
| Apps              | 4     | Trinity + Worker architecture    |
| Deployments       | 2     | GitHub Pages + Cloudflare Worker |
| Azure Integration | Clean | Optional, properly scoped        |

**Total Complexity**: MEDIUM (maintainable)

---

## ✅ VERIFICATION CHECKLIST

After consolidation, verify:

- [ ] Workspace has only 1 folder (cathedral-real)
- [ ] All 43 packages build successfully
- [ ] All apps run in dev mode
- [ ] GitHub Pages deployment works
- [ ] Worker API deploys to Cloudflare
- [ ] All tests pass
- [ ] Documentation updated
- [ ] MASTER_INDEX.md reflects new structure
- [ ] No broken imports
- [ ] No orphaned files
- [ ] Azure integration still works (optional)
- [ ] Copilot instructions up to date

---

## 🎯 EXPECTED OUTCOMES

### Performance Improvements

- ⚡ Faster builds (fewer packages to process)
- ⚡ Faster install (pnpm with fewer deps)
- ⚡ Clearer dependency graph

### Developer Experience

- 📚 Easier to understand structure
- 📚 Less context switching
- 📚 Clear ownership of code

### Maintenance Benefits

- 🛠️ Single workspace to manage
- 🛠️ Fewer deployment targets to monitor
- 🛠️ Consolidated tools and scripts

### User Benefits

- 🎨 Faster page loads (fewer bundles)
- 🎨 Clearer navigation (3 main apps)
- 🎨 Reliable deployment (1 primary URL)

---

## 🚨 RISKS & MITIGATIONS

### Risk 1: Breaking Changes

**Mitigation**:

- Create git branch for consolidation
- Test thoroughly before merging
- Document all changes
- Keep backups of old structure

### Risk 2: Lost Functionality

**Mitigation**:

- Audit all packages before merging
- Check for unique features
- Test edge cases
- Have rollback plan

### Risk 3: Deployment Downtime

**Mitigation**:

- Test deployment in separate branch
- Use GitHub Actions preview
- Have previous version ready to restore
- Deploy during low-traffic time

### Risk 4: Import Path Changes

**Mitigation**:

- Use search/replace across codebase
- Update all package.json files
- Use TypeScript to catch errors
- Test all apps after changes

---

## 📝 FINAL RECOMMENDATIONS

### Immediate Actions (Do Now)

1. ✅ Remove empty/backup workspace folders
2. ✅ Archive Azure agent files
3. ✅ Enable GitHub Pages in repo settings
4. ✅ Remove unused deployment configs

### Short-Term (Next Week)

1. 🔄 Merge rosslyn-explorer into apps/web
2. 🔄 Merge tarot-arena into apps/liber-arcanae-tarot
3. 🔄 Start package consolidation (game-systems first)
4. 🔄 Update documentation

### Long-Term (Next Month)

1. 🔮 Complete package consolidation (all 43 → 25)
2. 🔮 Publish key packages to npm
3. 🔮 Create cosmogenesis-learning-engine separate repo
4. 🔮 Finalize Trinity deployment architecture

---

**Status**: ✅ AUDIT COMPLETE  
**Next Step**: Execute Phase 1 (Repository Cleanup)  
**Timeline**: 2-3 weeks for full consolidation  
**Risk Level**: LOW (with proper testing)

---

**End of Consolidation Audit** 🔗
