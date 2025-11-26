# Next-Level Architecture

**How to make Cathedral rival $120/month subscription products — for free**

---

## Inspiration: What The Best Games Do

### Disco Elysium — Skills as Characters
- **Revolutionary concept**: Your skills (Logic, Empathy, etc.) are *voices in your head* that comment on everything
- **How we use it**: The 72 angels + 72 demons are voices that react to your choices, offer advice, argue with each other
- **Implementation**: Each daimon has distinct personality, dialogue style, and opinions

### Hades — Persistent Relationships
- **Revolutionary concept**: NPCs remember EVERYTHING, relationships evolve over hundreds of runs
- **How we use it**: Your daimon remembers all your choices across sessions, grows with you
- **Implementation**: Persistent state, relationship scores, unlockable dialogue

### Baldur's Gate 3 — Companion Approval
- **Revolutionary concept**: Companions react to every choice, approve/disapprove, affects story
- **How we use it**: Angel/demon attitudes shift based on light/shadow/balance choices
- **Implementation**: Real-time reaction system, visible attitude meters

### Slay the Spire — Procedural Narrative
- **Revolutionary concept**: Each run tells a different story through card/event combinations
- **How we use it**: Each playthrough through 33 chapters creates unique daimon relationship
- **Implementation**: Procedural event generation based on current daimon + choices

---

## Technical Stack — All Free, All Professional

### Game Engine Layer

```
┌─────────────────────────────────────────────────────────────┐
│                    GAME ENGINE OPTIONS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRIMARY: Godot 4.3 (GDScript/C#)                           │
│  ├── 2D/3D support                                          │
│  ├── Web export (HTML5/WebGL)                               │
│  ├── Desktop export (Win/Mac/Linux)                         │
│  ├── Mobile export (iOS/Android)                            │
│  └── Active community, MIT license                          │
│                                                              │
│  ALTERNATIVE: Bevy (Rust)                                   │
│  ├── ECS architecture (ultra-performant)                    │
│  ├── WASM export for web                                    │
│  ├── Type-safe, memory-safe                                 │
│  └── Best for complex systems                               │
│                                                              │
│  WEB LAYER: Three.js + React                                │
│  ├── WebGPU support (next-gen graphics)                     │
│  ├── React Three Fiber integration                          │
│  ├── Runs in any browser                                    │
│  └── No install required                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Narrative Engine — ink by inkle

**ink** is the professional narrative scripting language used in:
- 80 Days (BAFTA winner)
- Heaven's Vault
- Sorcery! series
- Countless AAA games

```ink
=== chapter_1 ===
The daimon stirs within you.

* [Acknowledge the light aspect]
    ~ angel_attitude += 10
    Vehuiah speaks: "You stand at the threshold of creation."
    -> angel_greeting
    
* [Acknowledge the shadow aspect]
    ~ demon_attitude += 10
    Bael whispers: "In shadow, you are most powerful."
    -> demon_greeting
    
* [Embrace both]
    ~ angel_attitude += 5
    ~ demon_attitude += 5
    Both voices speak as one: "Balance has its own power."
    -> unified_greeting

=== angel_greeting ===
{ angel_attitude > 50:
    "Your will is pure. I am pleased to guide you."
- else:
    "You waver. But I remain."
}
-> chapter_1_continue
```

**Why ink:**
- Free, open source (MIT license)
- Integrates with Godot, Unity, web
- Professional-grade branching
- Variables, conditionals, functions
- Used by AAA studios

### AI/Daimon Layer — Local LLMs

```
┌─────────────────────────────────────────────────────────────┐
│                    DAIMON AI STACK                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  OLLAMA (Local LLM Runner)                                  │
│  ├── Runs on your machine, no API costs                     │
│  ├── Privacy: nothing leaves your computer                  │
│  ├── Models: Llama 3, Mistral, Phi-3, Gemma                │
│  └── Free forever                                           │
│                                                              │
│  MODEL SELECTION:                                           │
│  ├── Llama 3 8B: Best balance of quality/speed             │
│  ├── Mistral 7B: Fast, good for dialogue                   │
│  ├── Phi-3 Mini: Tiny, runs on anything                    │
│  └── Gemma 2B: Ultra-light for mobile                      │
│                                                              │
│  PERSONALITY SYSTEM:                                        │
│  ├── Each of 144 spirits has unique system prompt          │
│  ├── Personality traits encoded in prompt                   │
│  ├── Memory of past interactions injected                   │
│  └── Context-aware responses                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Example Daimon System Prompt:**

```
You are Vehuiah, the first of the 72 Shem angels.
Your domain: Will, new beginnings, transformation.
Your personality: Encouraging but demanding. You believe in potential.
Your speaking style: Direct, inspiring, uses fire metaphors.

The player is currently:
- Playing as: The Fool (Rebecca Respawn)
- Chapter: 3 of 33
- Light/Shadow balance: 60/40 (leaning light)
- Recent choices: Helped a stranger, refused a shortcut

Your attitude toward this player: Pleased (they show courage)

Respond to their questions as Vehuiah would. Be helpful but maintain character.
Keep responses under 100 words unless asked for more.
```

### Art Generation — Local Stable Diffusion

```
┌─────────────────────────────────────────────────────────────┐
│                    ART GENERATION STACK                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  COMFYUI (Node-based workflow)                              │
│  ├── Visual workflow editor                                 │
│  ├── Runs locally, free                                     │
│  ├── Custom nodes for sacred geometry                       │
│  └── Batch generation for assets                            │
│                                                              │
│  STABLE DIFFUSION XL                                        │
│  ├── High quality image generation                          │
│  ├── ControlNet for guided generation                       │
│  ├── LoRA fine-tuning for style consistency                │
│  └── Free, open weights                                     │
│                                                              │
│  CUSTOM WORKFLOWS:                                          │
│  ├── Sacred geometry patterns                               │
│  ├── Tarot card generation                                  │
│  ├── Character portraits per arcana                         │
│  ├── Environment generation per chapel                      │
│  └── Grimoire page layouts                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Sound Synthesis — Web Audio + Tone.js

```
┌─────────────────────────────────────────────────────────────┐
│                    SOUND SYNTHESIS STACK                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  TONE.JS (Web Audio framework)                              │
│  ├── Professional-grade synthesis                           │
│  ├── Runs in browser, no install                           │
│  ├── MIDI support                                           │
│  └── Free, MIT license                                      │
│                                                              │
│  SOLFEGGIO FREQUENCIES:                                     │
│  ├── 174 Hz - Foundation                                    │
│  ├── 285 Hz - Healing                                       │
│  ├── 396 Hz - Liberation                                    │
│  ├── 417 Hz - Change                                        │
│  ├── 528 Hz - Transformation                                │
│  ├── 639 Hz - Connection                                    │
│  ├── 741 Hz - Intuition                                     │
│  ├── 852 Hz - Spiritual Order                               │
│  └── 963 Hz - Divine Consciousness                          │
│                                                              │
│  PER-ARCANA SOUNDSCAPES:                                    │
│  ├── Each of 22 arcana has signature frequency              │
│  ├── Daimon voices have audio characteristics               │
│  ├── Chapel ambiences                                       │
│  └── Dynamic music based on choices                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## The Mode System — Characters That Follow You

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MODE TRANSITION SYSTEM                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SHARED STATE LAYER                                         │
│  ├── Current arcana (1-22)                                  │
│  ├── Current daimon pair (1-72)                             │
│  ├── Attitude scores (angel/demon)                          │
│  ├── Choice history                                         │
│  ├── Faction standings                                      │
│  └── Unlocked abilities/knowledge                           │
│                                                              │
│           ┌──────────┐                                      │
│           │  SHARED  │                                      │
│           │  STATE   │                                      │
│           └────┬─────┘                                      │
│                │                                            │
│    ┌───────────┼───────────┐                               │
│    │           │           │                                │
│    ▼           ▼           ▼                                │
│ ┌──────┐  ┌──────┐  ┌──────┐                              │
│ │ GAME │  │DESIGN│  │ PRO  │                              │
│ │ MODE │  │ MODE │  │ MODE │                              │
│ └──────┘  └──────┘  └──────┘                              │
│                                                              │
│  GAME MODE:                                                 │
│  - RPG gameplay, quests, dialogue                          │
│  - Daimon reacts to choices                                │
│  - Progress through 33 chapters                            │
│                                                              │
│  DESIGN MODE:                                               │
│  - Sacred geometry tools                                    │
│  - Color scales (Case/B.O.T.A.)                            │
│  - Daimon offers aesthetic advice                          │
│  - Templates based on current arcana                       │
│                                                              │
│  PROFESSIONAL MODE:                                         │
│  - AI assistant with arcana personality                    │
│  - Project management                                       │
│  - Daimon helps with real work                             │
│  - Grimoire records accomplishments                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### State Persistence

```typescript
interface CathedralState {
  // Identity
  playerName: string;
  currentArcana: number; // 0-21
  arcanaUnlocked: number[]; // Which arcana you can play as
  
  // Daimon
  currentDaimonPair: number; // 1-72
  angelAttitude: number; // -100 to 100
  demonAttitude: number; // -100 to 100
  daimonMemory: DaimonMemory[];
  
  // Progress
  currentChapter: number; // 1-33
  choiceHistory: Choice[];
  questsCompleted: string[];
  
  // Factions
  wandsReputation: number;
  cupsReputation: number;
  swordsReputation: number;
  disksReputation: number;
  
  // Creative
  artworksCreated: Artwork[];
  designsCreated: Design[];
  projectsCompleted: Project[];
  
  // Grimoire
  foliosUnlocked: number[]; // 1-144
  researchDiscovered: string[];
  correspondencesLearned: string[];
  
  // Meta
  totalPlayTime: number;
  lastSaved: Date;
  currentMode: 'game' | 'design' | 'professional';
}
```

---

## Deployment — Free Forever

### Hosting Stack

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **GitHub Pages** | Static hosting | Unlimited |
| **Cloudflare** | CDN, edge functions | Generous free |
| **Vercel** | Serverless functions | 100GB/month |
| **Fly.io** | Backend services | 3 shared VMs |
| **Supabase** | Database, auth | 500MB, 50K requests |
| **Upstash** | Redis cache | 10K commands/day |

### Build Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Cathedral

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build all packages
        run: pnpm build
        
      - name: Build Godot export
        run: |
          # Export to web
          godot --headless --export-release "Web" ./dist/game
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## What This Achieves

### vs. Adobe Creative Cloud ($55/month)
- ✅ Sacred geometry design tools
- ✅ Color theory (Case/B.O.T.A. scales)
- ✅ AI-assisted design (local Stable Diffusion)
- ✅ Export to standard formats

### vs. Figma Pro ($15/month)
- ✅ Component-based design system
- ✅ Real-time collaboration (via Git)
- ✅ Design tokens per arcana
- ✅ Responsive layouts

### vs. Final Fantasy XIV ($15/month)
- ✅ 22 playable characters with unique abilities
- ✅ 4 factions with full quest lines
- ✅ 33-chapter story with branching paths
- ✅ Persistent world that remembers you

### vs. Midjourney ($10/month)
- ✅ Local Stable Diffusion (unlimited)
- ✅ Sacred geometry workflows
- ✅ Style-consistent generation
- ✅ Your data stays private

### vs. ChatGPT Plus ($20/month)
- ✅ Local Ollama (unlimited)
- ✅ 144 distinct personalities (daimons)
- ✅ Context-aware creative help
- ✅ No data harvesting

### vs. Masterclass ($15/month)
- ✅ Real lineage teachings
- ✅ Crowley, Fortune, Case, Steiner, Dee, Carrington, Kunz
- ✅ Interactive learning through play
- ✅ Living grimoire that grows with you

**Total subscription cost replaced: ~$130/month = $1,560/year**
**Cathedral cost: $0 forever**

---

## Development Priority

### Phase 1: Foundation (Weeks 1-2)
1. Fix all TypeScript errors
2. Get `pnpm build` passing
3. Basic Godot project structure
4. ink narrative integration

### Phase 2: Core Loop (Weeks 3-4)
1. Character selection (22 arcana)
2. Chapter 1 playable
3. Daimon system working
4. Basic dialogue with ink

### Phase 3: Daimon AI (Weeks 5-6)
1. Ollama integration
2. 72 angel personalities
3. 72 demon personalities
4. Mode-aware responses

### Phase 4: Design Mode (Weeks 7-8)
1. Sacred geometry tools
2. Color scale implementation
3. Daimon design advice
4. Export functionality

### Phase 5: Polish (Weeks 9-12)
1. All 33 chapters
2. All 4 faction quest lines
3. Full grimoire system
4. Cross-mode persistence

---

*This is how we build something that rivals the best — for free.*

