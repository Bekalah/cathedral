# 🏰 CATHEDRAL PROJECT - MASTER CONTEXT FOR AGENTS

## 🎯 PROJECT VISION

Cathedral is a comprehensive mystical technology platform combining:

- **22 Living Arcana** - Major Tarot archetypes as interactive game characters
- **Godot 4.2.5 Game** - Full 3D/2D mystical game engine integration
- **Cosmogenesis Learning Engine** - Educational platform with sacred geometry
- **Codex 144:99 System** - Sacred mathematics (144 nodes, 99 gates)
- **Turborepo Monorepo** - Modern build tools and package management
- **Azure AI Integration** - Automated content and art generation
- **Trauma-Informed Design** - Neurodivergent-safe, inclusive UX

## 📊 CURRENT STATUS

**Running**: 100 Azure AI agents executing continuously (50 KAOZ + 50 ORDER)
**Credits**: ~$200 Azure credits being utilized
**Repository**: https://github.com/Bekalah/cathedral
**Current Site**: https://bekalah.github.io/cathedral (needs updates)

### Recent Agent Run Metrics

- Total Agents: 100 (50 KAOZ, 50 ORDER)
- Success Rate: 100% (0 failures)
- Messages: 300 sent, 400 received
- Average Duration: 294.95s per agent
- Throughput: 0.18 agents/second

## 🏗️ MONOREPO STRUCTURE

```
cathedral-real/
├── apps/
│   ├── web/                    # Main Cathedral web application
│   ├── liber-arcanae-tarot/    # Tarot reading and character exploration
│   ├── synth-lab/              # Audio synthesis experiments
│   ├── tarot-arena/            # Interactive tarot battles
│   ├── test-ground/            # Testing environment
│   └── worker/                 # Cloudflare edge worker
├── packages/
│   ├── codex-144-99/           # Sacred mathematics core library
│   ├── liber-arcanae/          # Living Arcana character system
│   ├── cyoa-book-game/         # Choose-your-own-adventure engine
│   ├── godot-codex-14499/      # Godot integration library
│   ├── cathedral-fusion-kink-engine/
│   ├── circuitum99-arcanae-cyoa/
│   ├── fractal-flames-daemon-deity/
│   └── [20+ other packages]
├── godot/                      # Godot 4.2.5 game project
├── tools/                      # Build and development tools
├── data/                       # JSON data for codex, arcana, etc.
└── docs/                       # Documentation
```

## 🎮 GODOT GAME REQUIREMENTS

### Core Systems Needed

1. **Character System**
   - 22 Living Arcana characters (Major Tarot)
   - Each has: Divine aspect, Infernal aspect, Harmony form
   - Stats: Wisdom, Courage, Compassion, Knowledge, Experience
   - Elemental associations (Fire, Water, Air, Earth)
   - Astrological correspondences
   - Color associations
   - Sacred geometry patterns

2. **Dialogue System**
   - Branching narrative trees
   - Character personality engines
   - Wisdom teachings from each Arcana
   - Trauma-informed language
   - Accessibility options (text size, speed, audio descriptions)

3. **Quest/Narrative Engine**
   - Story progression tracking
   - Character relationship system
   - Sacred geometry puzzles
   - Tarot reading mechanics
   - Combination/fusion system (144:99 gates)

4. **Visual Systems**
   - 3D sacred geometry rendering
   - Particle effects for mystical elements
   - Character model loading and animation
   - Dynamic lighting (based on elemental associations)
   - Post-processing effects (subtle, trauma-safe)

5. **Audio Systems**
   - Character theme music
   - Ambient soundscapes
   - Sound synthesis (Solfeggio frequencies)
   - Adaptive audio (based on player state)
   - Accessibility options (volume control, captioning)

6. **Save/Load System**
   - Local save files (encrypted)
   - Cloud sync (optional, privacy-first)
   - Multiple save slots
   - Auto-save functionality
   - Import/export for backup

7. **Integration Layer**
   - JSON API communication with web apps
   - WebSocket for real-time updates
   - REST endpoints for data exchange
   - Asset pipeline (load from web URLs)

### Godot File Structure

```
godot/
├── project.godot              # Main project configuration
├── scenes/
│   ├── main/                  # Main game scene
│   ├── characters/            # 22 Arcana character scenes
│   ├── environments/          # Sacred geometry environments
│   ├── ui/                    # User interface scenes
│   └── effects/               # Visual and particle effects
├── scripts/
│   ├── core/                  # Core game systems
│   ├── characters/            # Character controllers
│   ├── dialogue/              # Dialogue system
│   ├── quests/                # Quest management
│   └── integration/           # Web integration
├── assets/
│   ├── models/                # 3D models
│   ├── textures/              # Textures and materials
│   ├── audio/                 # Sound effects and music
│   ├── fonts/                 # Typography
│   └── shaders/               # Custom shaders
├── data/                      # JSON data files
└── addons/                    # Godot plugins
```

## 🎨 COSMOGENESIS LEARNING ENGINE

### Architecture

The Cosmogenesis Learning Engine is a sophisticated educational platform that combines:

1. **Sacred Geometry Visualization**
   - Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron)
   - Golden ratio spirals
   - Fibonacci sequences
   - Vesica Piscis
   - Metatron's Cube
   - Flower of Life patterns

2. **Interactive Learning Modules**
   - Adaptive difficulty based on user performance
   - Multi-sensory learning (visual, auditory, kinesthetic)
   - Progress tracking and analytics
   - Personalized learning paths
   - Trauma-informed pacing

3. **Accessibility Features**
   - Screen reader support
   - Keyboard navigation
   - Voice control options
   - Adjustable visual contrast
   - Motion reduction options
   - Customizable text size and spacing

4. **Content Types**
   - Video lessons
   - Interactive simulations
   - Quizzes and assessments
   - Meditation/breathing exercises
   - Creative expression tools

### Technical Stack

- **Frontend**: React 18.x, TypeScript 5.x, Vite 5.x
- **3D Rendering**: Three.js with custom shaders
- **Audio**: Tone.js for synthesis and effects
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query
- **Styling**: Tailwind CSS with custom theme
- **Testing**: Vitest, React Testing Library

### Integration Points

- Connects to Codex 144:99 for sacred mathematics
- Uses Liber Arcanae for character teachings
- Integrates with Godot game for interactive exercises
- Syncs with Azure AI for personalized content
- Exports data to pub/turbo monorepo

## 📚 CODEX 144:99 SYSTEM

### Core Concept

The Codex 144:99 is a sacred knowledge system based on:

- **144 Nodes**: Fibonacci sequence milestone (12th Fibonacci number)
- **99 Gates**: Fusion points between nodes (based on ratio 144:99 = 1.454...)
- **8 Categories**: Major organizational structure
- **22 Major Arcana**: Primary archetypal framework

### Structure

```typescript
interface CodexNode {
  id: number; // 0-143
  name: string; // Descriptive name
  element: "Fire" | "Water" | "Air" | "Earth";
  planet?: string; // Astrological association
  zodiac?: string; // Zodiac sign
  hebrewLetter?: string; // Kabbalistic correspondence
  tarotCard?: string; // Major Arcana association
  solfeggio: number; // Frequency in Hz
  color: string; // Hex color code
  geometry: string; // Sacred geometry pattern
  position: [number, number, number]; // 3D coordinates
  connections: number[]; // Connected node IDs
  gateType?: "major" | "minor"; // Gate classification
}
```

### Usage in Project

1. **Navigation**: Nodes form the structure of the knowledge graph
2. **Character Design**: Each Arcana maps to specific nodes
3. **Progression System**: Players "unlock" nodes through gameplay
4. **Sacred Geometry**: Visual representation in 3D space
5. **Audio Synthesis**: Solfeggio frequencies for each node
6. **Color Theory**: Palette generation from node colors

### Data Files

- `data/codex_nodes_99.json` - Full 145-node dataset (0-144)
- `packages/codex-144-99/data/codex-144-expanded.json` - Extended metadata
- `packages/codex-144-99/src/validation.ts` - Validation system
- `packages/codex-144-99/src/CodexLibrary.ts` - Main API

## 🔧 BUILD TOOLS & DEVELOPMENT

### Turborepo Configuration

Current `turbo.json` defines these tasks:

- `build` - Compile TypeScript, bundle assets
- `dev` - Development mode with hot reload
- `type-check` - TypeScript validation
- `lint` - ESLint checking
- `test` - Run test suites
- `clean` - Remove build artifacts
- `build-art` - Generate art assets
- `build-synth` - Audio synthesis
- `generate-arcana` - Create Arcana data
- `connect-modules` - Link packages
- `architect-scribe` - Documentation generation
- `deploy` - Production deployment

### Package Scripts

```json
{
  "dev": "turbo run dev --parallel",
  "build": "turbo run build",
  "cathedral:health": "node tools/cathedral-cli.js health-check",
  "cathedral:backup": "node tools/cathedral-cli.js backup",
  "deploy:pages": "pnpm run build && pnpm run cathedral:deploy"
}
```

### Development Workflow

1. **Local Development**

   ```bash
   pnpm install           # Install dependencies
   pnpm dev              # Start all apps in dev mode
   pnpm cathedral:dev    # Start only apps
   pnpm packages:dev     # Start only packages
   ```

2. **Building**

   ```bash
   pnpm build            # Build everything
   pnpm packages:build   # Build packages only
   pnpm cathedral:build  # Build apps only
   ```

3. **Quality Checks**

   ```bash
   pnpm validate:all     # Run lint, type-check, test
   pnpm cathedral:health # Check system health
   pnpm integrity-check  # Validate ownership and config
   ```

4. **Deployment**
   ```bash
   pnpm deploy:pages     # Deploy to GitHub Pages
   pnpm cathedral:deploy # Full deployment pipeline
   ```

## 🔮 VERSION 1 CONTROL STRATEGY

### Git Workflow

1. **Branch Strategy**
   - `main` - Production-ready code
   - `develop` - Integration branch
   - `feature/*` - Feature development
   - `fix/*` - Bug fixes
   - `agent/*` - Agent-generated content

2. **Commit Conventions**

   ```
   feat(scope): Add new feature
   fix(scope): Fix bug
   docs(scope): Update documentation
   refactor(scope): Code refactoring
   test(scope): Add or update tests
   chore(scope): Maintenance tasks
   art(scope): Art asset updates
   ```

3. **Release Process**
   - Semantic versioning (MAJOR.MINOR.PATCH)
   - Changelog generation
   - Tag releases
   - GitHub releases with notes

4. **Agent Integration**
   - Agents commit to `agent/*` branches
   - Human review before merging
   - Automated PR creation
   - CI/CD validation

### Package Versioning

All packages follow semantic versioning:

- **Major** (v2.0.0): Breaking changes
- **Minor** (v2.1.0): New features, backward compatible
- **Patch** (v2.1.1): Bug fixes

### Monorepo Management

1. **Workspace Protocol**

   ```json
   "dependencies": {
     "@cathedral/codex-144-99": "workspace:*"
   }
   ```

2. **Publishing**

   ```bash
   pnpm -r publish --access public
   ```

3. **Dependency Updates**
   ```bash
   pnpm update --interactive --recursive
   ```

## 🎭 22 LIVING ARCANA CHARACTERS

### Character Design Framework

Each Major Arcana character has:

1. **Identity**
   - Number (0-21)
   - Name
   - Archetype
   - Keywords (3-5)

2. **Aspects**
   - **Divine Form**: Angelic, celestial, light aspect
   - **Infernal Form**: Demonic, chthonic, shadow aspect
   - **Harmony Form**: Balanced integration with golden heart

3. **Associations**
   - Element (Fire, Water, Air, Earth)
   - Planet/Zodiac
   - Hebrew letter
   - Color palette
   - Sacred geometry pattern
   - Solfeggio frequency

4. **Stats & Abilities**
   - Wisdom (0-100)
   - Courage (0-100)
   - Compassion (0-100)
   - Knowledge (0-100)
   - Experience (0-1000+)
   - Special abilities (unique per character)

5. **Narrative Role**
   - Character arc
   - Teachings/lessons
   - Relationship dynamics
   - Quest involvement

### Character List

1. **The Fool (0)** - Rebecca Respawn
   - Lightning dragon transformation
   - Element: Air
   - Planet: Uranus
   - Color: Yellow-white
   - Geometry: Spiral
   - Frequency: 396 Hz

2. **The Magician (I)** - Virelai Ezra Lux
   - Element: Air/Fire
   - Planet: Mercury
   - Color: Yellow
   - Geometry: Eight-pointed star

3. **The High Priestess (II)**
   - Element: Water
   - Planet: Moon
   - Color: Blue-silver

4. **The Empress (III)**
   - Element: Earth
   - Planet: Venus
   - Color: Green

5. **The Emperor (IV)**
   - Element: Fire
   - Planet: Aries/Mars
   - Color: Red

6. **The Hierophant (V)**
   - Element: Earth
   - Planet: Taurus/Venus
   - Color: Red-orange

7. **The Lovers (VI)**
   - Element: Air
   - Planet: Gemini/Mercury
   - Color: Orange

8. **The Chariot (VII)**
   - Element: Water
   - Planet: Cancer/Moon
   - Color: Orange-yellow

9. **Strength (VIII)**
   - Element: Fire
   - Planet: Leo/Sun
   - Color: Yellow

10. **The Hermit (IX)**
    - Element: Earth
    - Planet: Virgo/Mercury
    - Color: Yellow-green

11. **Wheel of Fortune (X)**
    - Element: Fire
    - Planet: Jupiter
    - Color: Violet

12. **Justice (XI)**
    - Element: Air
    - Planet: Libra/Venus
    - Color: Green

13. **The Hanged Man (XII)**
    - Element: Water
    - Planet: Neptune
    - Color: Blue

14. **Death (XIII)**
    - Element: Water
    - Planet: Scorpio/Pluto
    - Color: Blue-green

15. **Temperance (XIV)**
    - Element: Fire
    - Planet: Sagittarius/Jupiter
    - Color: Blue

16. **The Devil (XV)**
    - Element: Earth
    - Planet: Capricorn/Saturn
    - Color: Indigo

17. **The Tower (XVI)**
    - Element: Fire
    - Planet: Mars
    - Color: Red

18. **The Star (XVII)**
    - Element: Air
    - Planet: Aquarius/Uranus
    - Color: Violet

19. **The Moon (XVIII)**
    - Element: Water
    - Planet: Pisces/Neptune
    - Color: Red-violet

20. **The Sun (XIX)**
    - Element: Fire
    - Planet: Sun
    - Color: Orange

21. **Judgement (XX)**
    - Element: Fire
    - Planet: Pluto
    - Color: Red

22. **The World (XXI)**
    - Element: Earth
    - Planet: Saturn
    - Color: Indigo

## 🚀 DEPLOYMENT TARGETS

### GitHub Pages

- **URL**: https://bekalah.github.io/cathedral
- **Branch**: `gh-pages` (auto-generated)
- **Build Command**: `pnpm build && pnpm deploy:pages`
- **Assets**: Optimized, CDN-ready

### Vercel

- **URL**: https://cathedral.vercel.app
- **Integration**: GitHub auto-deploy
- **Environment**: Production, Preview, Development

### Cloudflare Pages

- **URL**: https://cathedral.pages.dev
- **Worker**: Edge functions for API
- **KV Storage**: For game saves and user data

### Azure Static Web Apps

- **URL**: Custom domain
- **Functions**: Azure Functions for backend
- **Storage**: Blob storage for assets

## 🤖 AGENT TASK PRIORITIES

### Immediate Tasks (Current Sprint)

1. **Build Tool Improvements**
   - Optimize Turbo cache configuration
   - Reduce build times
   - Fix circular dependencies
   - Improve watch mode performance

2. **Godot Game Development**
   - Create `project.godot` with proper config
   - Build character controller base class
   - Implement dialogue system
   - Create first playable scene

3. **Cosmogenesis Engine**
   - Complete sacred geometry renderer
   - Add interactive learning modules
   - Implement accessibility features
   - Create content authoring tools

4. **Codex 144:99**
   - Validate all 145 nodes
   - Generate visualization tools
   - Create API documentation
   - Build query system

5. **Documentation**
   - API reference for all packages
   - User guides for apps
   - Developer setup instructions
   - Architecture decision records

### Medium-Term Tasks

1. **Art Asset Generation**
   - 22 Arcana character art (3 forms each = 66 images)
   - Sacred geometry patterns (144 unique)
   - UI icons and elements
   - Environmental assets

2. **Audio System**
   - Character theme music (22 tracks)
   - Ambient soundscapes (12 per element)
   - Sound effects library
   - Solfeggio frequency synthesis

3. **Game Content**
   - Character dialogue trees
   - Quest narratives
   - Tutorial sequences
   - Achievement system

4. **Testing**
   - Unit tests for all packages
   - Integration tests for apps
   - E2E tests for user flows
   - Performance benchmarks

### Long-Term Goals

1. **Platform Expansion**
   - Mobile apps (iOS, Android)
   - Desktop apps (Windows, Mac, Linux)
   - Console ports (if feasible)
   - VR/AR experiences

2. **Community Features**
   - User-generated content tools
   - Sharing and collaboration
   - Multiplayer elements
   - Social features

3. **Monetization**
   - Premium content packs
   - Support/donation system
   - Educational institution licenses
   - Workshop/course offerings

4. **Localization**
   - Multi-language support
   - Cultural adaptations
   - Accessibility in all languages

## 🎯 SUCCESS METRICS

### Technical Metrics

- ✅ Build time < 2 minutes
- ✅ Test coverage > 80%
- ✅ Lighthouse score > 90
- ✅ Zero TypeScript errors
- ✅ Zero security vulnerabilities

### User Experience Metrics

- ✅ Load time < 3 seconds
- ✅ Smooth 60 FPS rendering
- ✅ Accessible to screen readers
- ✅ Mobile-responsive design
- ✅ Trauma-informed UX

### Content Metrics

- ✅ All 22 Arcana characters complete
- ✅ 144:99 Codex fully implemented
- ✅ 10+ hours of gameplay content
- ✅ 100+ sacred geometry visualizations
- ✅ Comprehensive documentation

### Community Metrics

- ✅ Active GitHub repository
- ✅ Documentation website
- ✅ Tutorial videos
- ✅ Community Discord
- ✅ Regular updates

## 🛡️ QUALITY STANDARDS

### Code Quality

- TypeScript strict mode (no `any`)
- Full error handling
- Comprehensive tests
- Clear documentation
- Consistent style (Prettier)
- Security best practices

### Design Quality

- Museum-quality execution
- Classical artistic mastery
- Perfect symmetry and balance
- Sacred geometry precision
- Inclusive, trauma-informed
- Accessible to all users

### Content Quality

- Research-backed accuracy
- Respectful cultural treatment
- Trauma-informed language
- Inclusive representation
- Educational value
- Creative expression

## 📋 CURRENT BLOCKERS & ISSUES

None currently blocking continuous agent execution.

## 🔗 IMPORTANT LINKS

- **Repository**: https://github.com/Bekalah/cathedral
- **GitHub Pages**: https://bekalah.github.io/cathedral
- **Azure AI Foundry**: https://cathedral-resource.services.ai.azure.com/
- **Package Documentation**: (to be generated)
- **API Reference**: (to be generated)

## 📝 NOTES FOR AGENTS

- Work can proceed in parallel across multiple domains
- Prioritize unblocking others (fix dependencies first)
- Document architectural decisions
- Follow existing code patterns
- Maintain trauma-informed design principles
- Keep accessibility as top priority
- Generate museum-quality outputs only
- No placeholders or "TODO" code
- All code must be production-ready
- Test everything before committing

---

**This master context provides complete project understanding for all agent work.**
