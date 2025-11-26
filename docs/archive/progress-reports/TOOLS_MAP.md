# 🗺️ Cathedral Tools Map - Visual System Overview

**Version:** 1.0.0  
**Last Updated:** 2025-01-XX  
**Repository:** https://github.com/Bekalah/cathedral

---

## 🎯 Core Systems Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CATHEDRAL MAGNUM OPUS                     │
│              Codex 144:99 · Fusion Kink · Liber Arcanae      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼───┐          ┌───▼───┐          ┌───▼───┐
    │ SOUL  │          │ BODY  │          │SPIRIT │
    │Circuit│          │Stone  │          │Cosmo  │
    │um99   │          │Grimoire│         │Genesis│
    └───┬───┘          └───┬───┘          └───┬───┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼───────┐
                    │   INTEGRATION  │
                    │    HUB        │
                    └───────┬───────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼───┐          ┌───▼───┐          ┌───▼───┐
    │ ART   │          │ SOUND │          │ GAME  │
    │GEN    │          │SYNTH  │          │ENGINE │
    └───┬───┘          └───┬───┘          └───┬───┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼───────┐
                    │   WEB APPS    │
                    └───────────────┘
```

---

## 📦 Packages (Core Systems)

### Trinity Architecture
- **@cathedral/circuitum99** (v1.0.0) - Soul nodes, 99 Gates, RPG mechanics
- **@cathedral/stone-grimoire** (v1.0.0) - Body nodes, archive systems
- **@cathedral/cosmogenesis-learning-engine** (v1.0.0) - Spirit, planetary consciousness

### Sacred Knowledge
- **@cathedral/codex-144-99** (v2.0.0) - 144 Nodes of Mystical Knowledge
- **@cathedral/liber-arcanae** (v1.0.0) - 78-card tarot system
- **@cathedral/tesseract-bridge** (v1.0.0) - Kabbalistic paths, sacred geometry

### Creative Systems
- **@cathedral/cathedral-fusion-kink-engine** (v1.0.0) - Fusion mechanics (A×B=D)
- **@cathedral/art-generation-node** (v1.0.0) - Art generation & pattern science
- **@cathedral/synth** (v0.1.0) - 10 Legendary Synthesizers (Web Audio)

### Integration & Infrastructure
- **@cathedral/shared** (v1.0.0) - Shared utilities, mode switcher, integration hub
- **@cathedral/magical-mystery-house** (v1.0.0) - Living Library, cultural archetypes
- **@cathedral/brain** (v0.1.0) - Core processing intelligence
- **@cathedral/web-platform** (v1.0.0) - Main web platform (Vite + React)

---

## 🎨 Apps (User Interfaces)

### Main Applications
- **apps/web** - Main Cathedral web application
  - Routes: Home, Codex, Arcana, Fusion, Labs, Library, Portal
  - Tech: Next.js/Vite + React + Three.js
  
- **apps/synth-lab** - Synthesizer laboratory
  - 10 Legendary Synthesizers interface
  - Tech: Vite + React
  
- **apps/tarot-arena** - Tarot reading interface
  - Liber Arcanae visualization
  - Tech: Vite + React

### Specialized Apps
- **apps/liber-arcanae-tarot** - Dedicated tarot reader
- **apps/cosmogenesis-visualizer** - Cosmogenesis spiral visualization
- **apps/cathedral-design-studio** - Design tools
- **apps/cathedral-immersive-creative-studio** - Creative workspace
- **apps/master-catalog-browser** - Catalog browser
- **apps/rosslyn-explorer** - Exploration interface
- **apps/test-ground** - Testing environment

---

## 🛠️ Build Systems

### Package Manager
- **pnpm@8.15.0** (pnpm only - no npm)
- Workspaces: `packages/*`, `apps/*`

### Build Tools
- **TurboRepo** - Monorepo orchestration
- **TypeScript** - Type checking
- **Vite** - Fast build tool for apps
- **Rust** - Game engine components (via cargo)
- **Godot 4.5** - Game engine

### Build Commands
```bash
pnpm run dev          # Development mode (all packages)
pnpm run build        # Build all packages
pnpm run test         # Run tests
pnpm run lint         # Lint code
pnpm run fusion       # Build Rust + Godot
pnpm run web:dev      # Run web app
pnpm run web:build    # Build web app
```

---

## 🔗 System Connections

### Mode Switching
- **ModeSwitcher** - Seamless transitions between:
  - `game` - Game mode
  - `design` - Design mode
  - `music` - Music/synth mode
  - `codex` - Codex 144:99 mode
  - `tarot` - Liber Arcanae mode
  - `fusionkink` - Fusion Kink mode
  - `welcome` - Welcome screen

### Integration Hub
- **CathedralIntegration** - Central hub connecting:
  - FusionKink Engine
  - Liber Arcanae
  - Codex 144:99
  - Magical Mystery House (Living Library)
  - Stone Grimoire (Living Grimoire)
  - Cosmogenesis Learning Engine
  - Art & Sound systems
  - Godot + Rust game engine

---

## 🎨 Visual Tools

### Art Generation
- **Art Generation Node** - Pattern science, traditional art replication
- **Art Loader** - Liber Arcanae card art management
- **Sacred Geometry** - Tesseract Bridge visualizations

### Sound Synthesis
- **10 Legendary Synthesizers**:
  1. Moog System 55
  2. Buchla 200e
  3. Fairlight CMI III
  4. Synclavier
  5. (6 more legendary synths)

### 3D Visualization
- **Three.js** - 3D graphics (via Tesseract Bridge)
- **React Three Fiber** - React 3D components
- **Cosmogenesis Spiral** - Sacred geometry visualization

---

## 📊 Data Systems

### Canonical Datasets
- `data/codex-144-expanded.json` - Codex 144:99 nodes
- `data/complete-arcana-profiles.json` - 22 Major Arcana
- `data/trinity-architecture.json` - Trinity system constants
- `data/codex-arcanae-mirror.json` - Codex-Arcanae mirroring

### Research Integration
- Library of Congress connections
- British Library integration
- Internet Archive links
- Sacred Texts Archive

---

## 🚀 Deployment

### GitHub Pages
- **Live Site:** https://bekalah.github.io/cathedral
- **Workflow:** `.github/workflows/deploy.yml`
- **Build:** Automated via GitHub Actions

### Build Outputs
- `apps/web/dist` - Main web app
- `apps/synth-lab/dist` - Synth lab
- `apps/tarot-arena/dist` - Tarot arena
- `packages/*/dist` - Package builds

---

## 🧹 Cleanup Status

### Removed Junk
- ✅ `.vsix` files (VSCode extensions)
- ✅ `.log` files (build logs)
- ✅ `__pycache__/` directories
- ✅ `*.pyc` files
- ✅ Import snapshots (`imports/CathedralMonorepo-*`)
- ✅ npm references (pnpm only now)

### Ignored (via .gitignore)
- `node_modules/`
- `dist/` and `build/`
- `.turbo/`
- `.DS_Store`
- `*.log`
- `*.tmp`

---

## 📝 License

**CC0-1.0** - Public Domain Dedication
All code and content released to public domain.

---

## 🔄 Version Control

- **Root Version:** 1.0.0 (in `VERSION` file)
- **Package Versions:** Standardized to 1.0.0 (except codex-144-99: 2.0.0)
- **Version File:** `VERSION` (for CI/CD tracking)
- **Version Config:** `.versionrc.json` (for semantic versioning)

---

**Last Updated:** Generated automatically from codebase structure

