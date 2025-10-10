# 🏛️ CATHEDRAL MAIN REPOSITORY - DEVELOPMENT GUIDE

## ✅ CORRECT LOCATION - THIS IS THE MAIN REPOSITORY

**You are in the production Cathedral system at `/Users/rebeccalemke/cathedral/`**

---

## 🎯 TRINITY ARCHITECTURE OVERVIEW

### Modular Mega-System Design:
```
Soul (Circuitum99)         Body (Stone Grimoire)      Spirit (Cosmogenesis)
├── 78 Tarot archetypes   ├── 8 Chapels             ├── Four Worlds brain
├── 99 Gates system      ├── 144 Folios            ├── 144-node lattice  
├── RPG mechanics        ├── 3D art navigation     ├── Learning engine
└── Story pathworking    └── Teaching portals      └── Consciousness tech
```

### Cross-Integration:
- **Tesseract Bridge:** Seamless component connection
- **Character Guides:** Rebecca Respawn, Virelai Ezra Lux across all apps
- **Unified Datasets:** Shared angels-72.json, demons-72.json, spine-33.json

---

## 📁 PRODUCTION FILE STRUCTURE

### Core Packages (Modular Components):
```
packages/
├── circuitum99/                    # Soul: Complete RPG + Tarot system
├── stone-grimoire/                 # Body: 8-chapel art realm
├── cosmogenesis-learning-engine/   # Spirit: Brain expansion engine
├── tesseract-bridge/              # Integration layer
├── liber-arcanae/                 # RPG engine + magical datasets
├── codex-14499/                   # Complete 144:99 lattice system
├── gentle-fusion-lab/             # Healing + integration tools
└── magical-mystery-house/         # Interactive exploration
```

### Infrastructure:
```
infrastructure/
├── deployment/                    # Production deployment
├── docker/                       # Containerization
├── kubernetes/                   # Orchestration
└── terraform/                    # Infrastructure as code
```

### Applications:
```
apps/
├── cathedral-connection-map/      # System overview
├── cosmogenesis-visualizer/       # Sacred world building
├── master-catalog-browser/        # Content navigation
├── web/                          # Main web interface
└── worker/                       # Background processing
```

---

## 🔧 DEVELOPMENT WORKFLOW

### Starting Development:
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build specific package
npm run build:circuitum99

# Test integration
npm run test:integration
```

### Package Development:
```bash
# Work on specific component
cd packages/[component-name]

# Component has own dev server
npm run dev

# Test standalone functionality
npm run test

# Build for integration
npm run build
```

---

## 🏗️ MODULAR DESIGN PRINCIPLES

### Each Package Must:
1. **Work Standalone** - Independent functionality
2. **Integrate Seamlessly** - Via tesseract-bridge
3. **Follow Trinity** - Soul/Body/Spirit architecture
4. **Use Modern Standards** - Vite, TypeScript, ES modules
5. **Share Datasets** - Common data sources in `/data/`

### Integration Points:
- **Character System:** Shared guides across all apps
- **Navigation:** Portal system between components  
- **Data Flow:** Unified datasets + real-time sync
- **Theming:** Consistent mystical aesthetic

---

## 📊 DATASETS & CONTENT

### Real Data Sources:
```
data/
├── angels-72.json                 # 72 Shem HaMephorash angels
├── demons-72.json                 # Goetic hierarchies
├── spine-33.json                  # Vertebrae + chakras
├── majors-complete.json           # 22 Major Arcana engines
└── codex_nodes.json              # 144 total lattice nodes
```

### Content Organization:
- **Mystical Accurate:** Real correspondences + frequencies
- **CPTSD Safe:** Trauma-informed design throughout
- **Scientifically Grounded:** Music theory + sacred geometry
- **Experientially Rich:** Interactive + immersive

---

## 🚀 DEPLOYMENT STANDARDS

### Production Pipeline:
```bash
# Full system build
npm run build:all

# Deploy to production
npm run deploy:production

# Health check
npm run status:all

# Rollback if needed
npm run rollback
```

### Quality Gates:
- [ ] All packages build successfully
- [ ] Integration tests pass
- [ ] Cross-app navigation works
- [ ] Datasets load properly
- [ ] Performance benchmarks met

---

## 🔄 CONSOLIDATION RULES

### When Adding Research Files:
1. **Check Existing:** Does component already exist in `/packages/`?
2. **Follow Standards:** Match established architecture
3. **Archive Legacy:** Move old versions to `/archive/`
4. **Document Changes:** Update component docs
5. **Test Integration:** Ensure cross-app compatibility

### File Movement Guidelines:
```
Research Location → Production Location
├── BUILDING CATHEDRALS/scripts/ → /infrastructure/deployment/
├── research/datasets/ → /data/
├── packages/ → /packages/ (merge with existing)
├── docs/ → /docs/ (consolidate)
└── scattered files → /archive/research-consolidation/
```

---

## 🆘 TROUBLESHOOTING

### Common Issues:
- **Wrong Directory:** Ensure you're in `/Users/rebeccalemke/cathedral/`
- **Missing Dependencies:** Run `npm install` in root and packages
- **Integration Broken:** Check tesseract-bridge connections
- **Data Missing:** Verify datasets in `/data/` directory

### Quick Health Check:
```bash
# Verify repository
pwd  # Should show: /Users/rebeccalemke/cathedral

# Check package structure
ls packages/

# Test core systems
npm run test:core

# Verify integrations
npm run test:integration
```

---

## 📋 AI DEVELOPMENT CHECKLIST

When working on Cathedral components:

- [ ] Am I in the main repository (`/Users/rebeccalemke/cathedral/`)?
- [ ] Have I checked existing packages before creating new ones?
- [ ] Does my code follow Trinity Architecture (Soul/Body/Spirit)?
- [ ] Is the component both standalone AND integrated?
- [ ] Are datasets properly connected?
- [ ] Does cross-app navigation work?
- [ ] Is the design CPTSD-safe and mystically accurate?
- [ ] Have I tested builds and deployment?

---

**This is your production workspace. Build amazing modular mystical technology here.**