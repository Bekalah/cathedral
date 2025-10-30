# Cathedral Godot Development Guide

## Museum-Quality Game Development Standards

### 🎯 Project Vision

Building a AAA-quality mystical adventure game featuring 22 Living Arcana characters with:

- **NIN/Aphex Twin level audio** - Real-time synthesis, Solfeggio frequencies, generative music
- **Museum-quality visuals** - Classical renaissance aesthetics, perfect symmetry, sacred geometry
- **Scientific precision** - Golden ratio mathematics, Fibonacci sequences, harmonic resonance
- **Professional systems** - Advanced save/load, encryption, trauma-informed UX
- **Zero compromises** - Competing with elite European/Asian developers

---

## 🏗️ Architecture Overview

### Core Systems (Autoloads)

1. **GameManager** - Master orchestrator
   - State machine, settings, performance monitoring
   - Trauma-informed defaults, accessibility support
2. **CodexSystem** - Sacred mathematics engine
   - 144 nodes, 99 gates, Fibonacci progression
   - Golden ratio calculations, harmonic relationships
3. **ArcanaRegistry** - Character management
   - 22 Living Arcana tracking, relationship matrix
   - Party system, bond progression
4. **AudioManager** - Professional synthesis
   - Solfeggio frequencies (396-963 Hz)
   - Real-time synthesis, generative music
   - Waveforms: sine, square, saw, triangle
   - Effects: reverb, chorus, compression
5. **SaveManager** - Encrypted persistence
   - 10 save slots, auto-save, quick-save
   - Encrypted data, automatic backups
   - Screenshot previews, metadata tracking
6. **DialogueManager** - Narrative system (TODO)
   - Branching conversations, consent-based
   - Relationship tracking, quest integration

### Character System

**ArcanaCharacter** - Base class for all 22 Arcana

- **Sacred Geometry**: 5 Platonic solids (Tetrahedron, Cube, Octahedron, Dodecahedron, Icosahedron)
- **Aspects**: Divine (golden), Infernal (crimson), Harmony (iridescent)
- **Physics**: Classical movement with smooth acceleration
- **Visual**: Particle systems, aura effects, Fibonacci spiral rotation
- **Stats**: Wisdom, Courage, Compassion, Knowledge

Each Arcana has:

- Unique frequency signature (Solfeggio + golden ratio)
- Sacred geometry tier (1-5)
- Codex node connections (7 nodes per Arcana)
- Divine/Infernal/Harmony color schemes
- Custom waveform for audio synthesis

---

## 🎨 Visual Standards

### Museum Quality Requirements

✅ **Classical Precision**

- Perfect symmetry and balance
- Golden ratio proportions (φ = 1.618)
- Renaissance/Baroque artistic mastery
- Zero amateur mistakes

✅ **Sacred Geometry**

- Mathematically perfect Platonic solids
- Fibonacci spiral animations
- Harmonic scaling (breathing effect)
- Precise vertex calculations

✅ **Rendering Quality**

- Forward+ renderer (Godot 4.2.5)
- MSAA 2x + Screen-space AA
- Soft shadows (quality 3)
- Bloom, sharpening, ambient occlusion

✅ **Trauma-Informed Design**

- Motion blur OFF by default
- Reduce motion option
- High contrast mode
- Adjustable chromatic aberration

### Color Palettes

**Divine Aspect** - Celestial perfection

- Primary: Gold (#FFE870), Pale Gold (#FFF2B3)
- Glow: Warm white, subtle bloom
- Particles: Upward spirals

**Infernal Aspect** - Chthonic power

- Primary: Crimson (#CC1A1A), Deep Red (#8F0000)
- Glow: Orange-red, intense
- Particles: Downward spirals

**Harmony Aspect** - Perfect balance

- Primary: Iridescent blue-white (#B3D9FF)
- Glow: Soft multi-spectral
- Particles: Fibonacci spirals

---

## 🎵 Audio Standards

### Professional-Grade Synthesis

**Solfeggio Frequencies** (Ancient healing tones)

```gdscript
UT = 396 Hz   # Liberation from fear
RE = 417 Hz   # Undoing situations
MI = 528 Hz   # Transformation/DNA repair
FA = 639 Hz   # Connecting/relationships
SOL = 741 Hz  # Awakening intuition
LA = 852 Hz   # Returning to spiritual order
SI = 963 Hz   # Divine consciousness
```

**Synthesis Capabilities**

- Real-time waveform generation (sine, square, saw, triangle)
- Harmonic series (fundamental + overtones)
- FM/AM/Ring modulation
- ADSR envelopes
- Effects chain: Reverb → Chorus → Compressor

**Per-Arcana Sound Design**

- Unique frequency (Solfeggio + φ offset)
- Character-specific waveform
- 7-harmonic overtone series
- Modulation depth by ID

**Generative Music System**

- Multi-layer synthesis
- Adaptive composition
- Context-aware mood shifts
- NIN/Aphex Twin complexity

### Audio Buses

```
Master
├── Music (0.7)
├── SFX (0.8)
├── Voice (1.0)
├── Ambient (0.6)
└── Synthesis (custom chain)
```

---

## 📐 Sacred Mathematics

### Constants

```gdscript
PHI = 1.618033988749895  # Golden ratio
PI = 3.14159265358979
SQRT2 = 1.41421356237    # Silver ratio
SQRT3 = 1.73205080757    # Bronze ratio
EULER = 2.71828182846
```

### Codex 144:99 Structure

**144 Nodes** (8 categories)

- SPIRIT: 8 nodes (Divine essence)
- WISDOM: 22 nodes (Knowledge paths)
- POWER: 28 nodes (Energy manifestation)
- HARMONY: 22 nodes (Balance points)
- SHADOW: 20 nodes (Infernal depths)
- FUSION: 18 nodes (Synthesis)
- MYSTERY: 13 nodes (Hidden knowledge)
- UNITY: 13 nodes (Cosmic integration)

**99 Gates** (Connections)

- Sequential: Arcana node chains
- Harmonic: Cross-category φ-based links

**22 Arcana → 144 Nodes Mapping**

- Each Arcana: 6-7 nodes
- Root node = Arcana ID
- Progression through categories

### Fibonacci Progression

```gdscript
Node values: Fib(n) % 144 + 1
Timing: Golden ratio intervals
Animations: φ-based easing
```

---

## 🎮 Gameplay Systems

### Character Aspects (Trinity System)

Players can shift between 3 aspects:

1. **Divine** - Celestial/Ascension focus
   - Upward movement, golden light
   - High wisdom/knowledge stats
   - Healing, protection abilities

2. **Infernal** - Chthonic/Descent focus
   - Downward movement, crimson glow
   - High courage/power stats
   - Aggressive, transformative abilities

3. **Harmony** - Perfect balance
   - Circular/spiral movement, iridescent
   - Balanced stats
   - Fusion, synthesis abilities

### Progression Systems

**Codex Discovery**

- Find nodes through exploration
- Unlock gates by discovering connected nodes
- Create fusions for new abilities

**Relationship Bonds**

- Build trust with other Arcana (0.0-1.0 scale)
- Unlock fusion abilities at threshold levels
- Affects dialogue options, quest outcomes

**Stats Growth**

- Wisdom, Courage, Compassion, Knowledge
- Gained through actions, choices, discoveries
- Affects ability power, dialogue options

---

## 💾 Save System

### Save Slots

- **Slot 0**: Auto-save (every 5 minutes)
- **Slot 1**: Quick-save (F5/F9)
- **Slots 2-9**: Manual saves

### Save Data Contents

- Player character, party, stats
- Codex progress (nodes, gates, fusions)
- Arcana relationships
- Quest progress
- Settings
- Screenshot preview (320x180)

### Security

- XOR encryption (TODO: upgrade to AES)
- Automatic backups (keep 5 most recent)
- Corruption recovery from backups

---

## 🎯 Development Workflow

### File Organization

```
godot/
├── project.godot
├── scenes/
│   ├── main/           # Main menu, character select
│   ├── characters/     # Character scenes (22 Arcana)
│   ├── environments/   # Exploration worlds
│   ├── ui/            # HUD, dialogue, menus
│   └── effects/       # VFX, particles
├── scripts/
│   ├── core/          # Autoload singletons
│   ├── characters/    # Character implementations
│   ├── quests/        # Quest logic
│   └── ui/            # UI controllers
├── assets/
│   ├── models/        # 3D geometry
│   ├── textures/      # Materials, sprites
│   ├── audio/         # Music, SFX, voice
│   ├── fonts/         # Typography
│   └── shaders/       # Custom GLSL
└── data/
    ├── dialogues/     # Conversation trees
    ├── quests/        # Quest definitions
    └── codex/         # Node/gate data
```

### Coding Standards

**GDScript Style**

```gdscript
# Class documentation with ##
## Brief description
##
## Detailed explanation
## @param name Description
## @return Description

class_name ClassName

# Type hints always
var my_variable: int = 0
func my_function(param: String) -> bool:
    return true

# Constants in CAPS
const MAX_VALUE := 100

# Enums for states
enum State { IDLE, MOVING, ATTACKING }

# Signal documentation
signal event_happened(param: Type)
```

**Comments**

- Document WHY, not WHAT
- Explain complex algorithms
- Reference sacred mathematics
- Mark TODOs with context

**Performance**

- Pool objects, avoid new in loops
- Cache node references
- Use typed GDScript
- Profile regularly

### Quality Checklist

Before committing code:

✅ **Functionality**

- [ ] Feature works as intended
- [ ] Edge cases handled
- [ ] Error messages clear

✅ **Code Quality**

- [ ] Type hints everywhere
- [ ] Proper documentation
- [ ] No magic numbers
- [ ] Clean variable names

✅ **Performance**

- [ ] No frame drops
- [ ] Memory stable
- [ ] Draw calls optimized

✅ **Accessibility**

- [ ] Screen reader compatible
- [ ] Keyboard navigable
- [ ] High contrast tested
- [ ] Motion reduction respected

✅ **Aesthetics**

- [ ] Visual quality matches standard
- [ ] Sacred geometry precise
- [ ] Colors harmonious
- [ ] Animations smooth

---

## 🚀 Build & Run

### Development Build

```bash
# From project root
godot --path godot/ --editor
```

### Production Build

```bash
# Export settings in project.godot
# Export → Desktop (macOS/Windows/Linux)
```

### Testing

- Manual: Play through all 22 Arcana
- Automated: GDScript unit tests (TODO)
- Performance: Maintain 60fps minimum

---

## 📚 References

### Inspiration Sources

- **Audio**: Nine Inch Nails (layered synthesis), Aphex Twin (generative systems)
- **Visuals**: Renaissance masters (da Vinci, Michelangelo), Baroque precision
- **Mathematics**: Sacred geometry texts, golden ratio studies
- **Game Design**: Persona series, Hades, Hollow Knight

### Technical Resources

- Godot 4.2 Documentation: https://docs.godotengine.org/
- Sacred Geometry: https://www.sacred-geometry.com/
- Solfeggio Frequencies: Research papers on healing tones
- Audio Synthesis: Overtone series, FM synthesis theory

---

## 🎯 Next Steps

### Immediate Priorities

1. Implement 22 character definitions (extending ArcanaCharacter)
2. Build dialogue system with branching narratives
3. Create scene templates (main menu, character select, exploration)
4. Design shader materials for Divine/Infernal/Harmony
5. Implement quest/progression system

### Medium-Term Goals

- Mini-games for each Arcana (unique mechanics)
- Generative art system (visual codex representations)
- Advanced synthesis (real-time AudioStreamGenerator)
- Multiplayer codex sharing (optional)

### Long-Term Vision

- Cosmogenesis Learning Engine integration
- Plugin system for modding
- VR/AR support
- Live synthesis performances

---

**Quality Standard**: Every line of code must meet museum-quality standards. No compromises. We're competing with the best developers globally.

**Philosophy**: Trauma-informed, neurodivergent-safe, scientifically precise, artistically masterful.

**Mission**: Create a game that stands alongside NIN's sonic landscapes and Aphex Twin's generative complexity while being accessible and healing.
