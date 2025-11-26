# 🗺️ Cathedral Monorepo - Complete Directory Map

**Version:** 1.0.0  
**Last Updated:** 2025-01-11  
**Purpose:** Clear map of what's in each folder - no more confusion!

---

## 📁 Root Structure

```
cathedral-fixed-clean/
├── apps/                    # Frontend applications
├── packages/                # Reusable packages and engines
├── data/                    # Knowledge databases and registries
├── docs/                    # Documentation
├── scripts/                 # Build and utility scripts
├── tools/                   # Development tools
├── godot/                   # Godot 4.5 game project
├── rust-engines/            # Rust game engine modules
└── assets/                  # Shared assets (images, audio, etc.)
```

---

## 📱 Apps Directory (`apps/`)

**Purpose:** User-facing frontend applications

| App | Description | Tech Stack | Status |
|-----|-------------|------------|--------|
| `web/` | Main Cathedral web platform | Next.js, React, Three.js, Babylon.js | ✅ Active |
| `synth-lab/` | 10 Legendary Synthesizers | React, Vite, Tone.js | ✅ Active |
| `tarot-arena/` | Tarot deck and reading system | React, Vite | ✅ Active |
| `liber-arcanae-tarot/` | Liber Arcanae tarot interface | React, TypeScript | ✅ Active |
| `test-ground/` | Development testing sandbox | React, Vite | ✅ Active |
| `cathedral-connection-map/` | Navigation maps | HTML | ✅ Active |
| `cathedral-design-studio/` | Design studio interface | HTML | ✅ Active |
| `cathedral-immersive-creative-studio/` | Immersive creative studio | HTML | ✅ Active |
| `cosmogenesis-visualizer/` | Cosmogenesis visualizer | HTML | ✅ Active |
| `master-catalog-browser/` | Content catalog browser | HTML | ✅ Active |
| `rosslyn-explorer/` | Rosslyn explorer | HTML | ✅ Active |
| `worker/` | Cloudflare Worker | TypeScript | ✅ Active |

---

## 📦 Packages Directory (`packages/`)

**Purpose:** Reusable packages and engines

### **Core Trinity (Foundation)**
| Package | Description | Status |
|---------|-------------|--------|
| `circuitum99/` | Soul - 99 gates, 33 chapters | ✅ Active |
| `stone-grimoire/` | Body - 8 chapels, 144 folios | ✅ Active |
| `cosmogenesis-learning-engine/` | Spirit/Brain - 144 nodes | ✅ Active |

### **Sacred Knowledge (Perfect)**
| Package | Description | Status |
|---------|-------------|--------|
| `codex-144-99/` | Complete 144-node system | ✅ Active |
| `liber-arcanae/` | Complete 78-card tarot | ✅ Active |
| `tesseract-bridge/` | Integration bridge | ✅ Active |

### **Creative Systems (Unified)**
| Package | Description | Status |
|---------|-------------|--------|
| `violet-flame-transmutation/` | Universal transmutation | ✅ Active |
| `game-music-integration/` | Game + Music sync | ✅ Active |
| `fractal-sound-game-bridge/` | Unified fractal/sound/game | ✅ Active |
| `professional-design-suite/` | Complete design system | ✅ Active |

### **Visionary Art (Master Quality)**
| Package | Description | Status |
|---------|-------------|--------|
| `visionary-art-colors/` | Master color palettes | ✅ Active |
| `visionary-art-textures/` | Master textures and tools | ✅ Active |
| `fusionkink-design-system/` | GitHub-compatible design | ✅ Active |

### **RPG & Game (Fable-like)**
| Package | Description | Status |
|---------|-------------|--------|
| `fable-rpg-mechanics/` | RPG mechanics | ✅ Active |
| `unified-canon-system/` | Unified canon system | ✅ Active |
| `cyoa-book-game/` | Choose Your Own Adventure | ✅ Active |

### **Tools & Infrastructure**
| Package | Description | Status |
|---------|-------------|--------|
| `shared/` | Shared utilities | ✅ Active |
| `cathedral-cli/` | Command-line tools | ✅ Active |
| `cathedral-tools/` | Utility functions | ✅ Active |
| `cathedral-analytics/` | Privacy-respecting analytics | ✅ Active |
| `brain/` | Core intelligence | ✅ Active |
| `synth/` | Audio synthesis library | ✅ Active |
| `art-generation-node/` | Art generation | ✅ Active |
| `magical-mystery-house/` | Navigation system | ✅ Active |

### **Other Packages**
| Package | Description | Status |
|---------|-------------|--------|
| `game-engine/` | Game engine | ✅ Active |
| `crystals/` | Crystal resonance | ✅ Active |
| `soul/` | Archetype systems | ✅ Active |
| `web-platform/` | Web platform utilities | ✅ Active |

---

## 📊 Data Directory (`data/`)

**Purpose:** Knowledge databases and registries

| File | Description |
|------|-------------|
| `codex-144-expanded.json` | Complete Codex 144:99 nodes |
| `complete-arcana-profiles.json` | Living Arcanae data (22 Major Arcana) |
| `research-sources.json` | Canonical research sources |
| `trinity-architecture.json` | System architecture |
| `palette.json` | Color science data |
| `pigments-database.json` | Artistic pigments |

---

## 📚 Docs Directory (`docs/`)

**Purpose:** Documentation

| Directory | Description |
|-----------|-------------|
| `guides/` | Development guides |
| `specs/` | System specifications |
| `research/` | Research documents |
| `master/` | Master documentation |
| `systems/` | System documentation |
| `deployment/` | Deployment guides |

---

## 🎮 Game Directories

| Directory | Description |
|-----------|-------------|
| `godot/` | Godot 4.5 game project |
| `rust-engines/` | Rust game engine modules |

---

## 🔗 Cross-Directory Connections

### **Magical Mystery House → All Systems**
- `packages/magical-mystery-house/` connects to:
  - `packages/circuitum99/` (Soul Library)
  - `packages/stone-grimoire/` (Body Archive)
  - `packages/cosmogenesis-learning-engine/` (Spirit Observatory)
  - `packages/tesseract-bridge/` (Ribbon Nexus)
  - `apps/web/` (Entry Hall)

### **Codex 144:99 → All Systems**
- `packages/codex-144-99/` connects to:
  - `packages/liber-arcanae/` (Tarot correspondences)
  - `packages/circuitum99/` (Chapter correspondences)
  - `data/codex-144-expanded.json` (Node data)

### **Liber Arcanae → All Systems**
- `packages/liber-arcanae/` connects to:
  - `packages/codex-144-99/` (Node correspondences)
  - `packages/circuitum99/` (Chapter correspondences)
  - `data/complete-arcana-profiles.json` (Card data)

### **Circuitum99 → All Systems**
- `packages/circuitum99/` connects to:
  - `packages/codex-144-99/` (Node correspondences)
  - `packages/liber-arcanae/` (Card correspondences)
  - `packages/fable-rpg-mechanics/` (RPG mechanics)

---

## 🖼️ Assets Directory (`assets/`)

**Purpose:** Shared assets

| Directory | Description |
|-----------|-------------|
| `magical-mystery-house/` | Magical Mystery House images |
| `art/` | Generated art |
| `audio/` | Audio files |
| `textures/` | Texture files |
| `models/` | 3D models |

---

## 📝 Key Files

| File | Description |
|------|-------------|
| `package.json` | Root package configuration |
| `pnpm-workspace.yaml` | Workspace configuration |
| `turbo.json` | TurboRepo pipeline |
| `tsconfig.json` | TypeScript configuration |
| `README.md` | Main documentation |
| `DIRECTORY_MAP.md` | This file |

---

## 🚀 Quick Navigation

**Want to find...**

- **Frontend apps?** → `apps/`
- **Reusable packages?** → `packages/`
- **Data files?** → `data/`
- **Documentation?** → `docs/`
- **Game code?** → `godot/` or `rust-engines/`
- **Assets?** → `assets/`
- **Build scripts?** → `scripts/`

---

**Status:** Complete directory map - no more confusion about what's where!

