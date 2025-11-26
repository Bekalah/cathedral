# DESIGN QUALITY BOUNDARY

**This document is LAW. No AI agent, no contributor, no tool may violate these principles.**

This boundary exists because we experienced a catastrophic fall from grace - generic, flat, cartoony, boxed-in design that betrayed the artistic vision. Never again.

---

## THE ABSOLUTE RULES

### 1. NO EMOJI AS UI ELEMENTS
- ❌ `🎮 Begin Game`
- ❌ `⚗️ Fusion Mode`
- ❌ `🃏 Select Card`
- ✅ Text only, let typography speak
- ✅ If icons needed, use minimal SVG or Unicode symbols (→ • ○)

### 2. NO CARTOON GRADIENTS
- ❌ `linear-gradient(135deg, #FFD700, #FF6A00)`
- ❌ Rainbow or multi-color gradients
- ❌ "Glow" effects with saturated colors
- ✅ Subtle single-tone gradients (black to slightly-less-black)
- ✅ Atmospheric radial gradients for depth

### 3. NO PILL BUTTONS
- ❌ `border-radius: 30px; padding: 1rem 2rem;`
- ❌ Buttons that look like lozenges or candy
- ✅ Text links with subtle underlines
- ✅ Minimal bordered rectangles if buttons must exist
- ✅ Actions indicated by lines (→) not boxes

### 4. NO "CARD" LAYOUTS EVERYWHERE
- ❌ Grid of identical rounded rectangles
- ❌ Everything in boxes
- ✅ Asymmetric positioning
- ✅ Content that breathes in space
- ✅ Hierarchy through typography and spacing, not boxes

### 5. NO SYSTEM INFO BADGES
- ❌ `📊 Codex 144:99 Active`
- ❌ `🛡️ Safety Mode: ON`
- ❌ Status pills with icons
- ✅ Information presented as elegant text
- ✅ Status communicated through ambient presence, not badges

### 6. NO ALL-CAPS SCREAMING
- ❌ `WELCOME TO YOUR SACRED JOURNEY`
- ❌ Button text in uppercase
- ✅ Sentence case for all text
- ✅ Small caps ONLY for small labels (node indicators)

### 7. NO SATURATED COLORS
- ❌ `#FF0000`, `#00FF00`, `#0000FF`
- ❌ Neon, bright, or "vibrant" palettes
- ✅ Muted, sophisticated palettes
- ✅ Burnished metallics (gold, bronze, platinum)
- ✅ Deep darks with warm undertones

---

## THE AESTHETIC STANDARD

### Typography
- **Display**: Bodoni Moda, Cormorant Garamond, or equivalent serif
- **Body**: DM Sans, Inter, or system sans-serif at 300-400 weight
- **No**: Comic Sans, Papyrus, Impact, or "fun" fonts
- **Letter-spacing**: Tight for headlines (-0.02em), loose for labels (0.1em)

### Color Palette - THE ONLY ACCEPTABLE COLORS
```css
/* Darks - for backgrounds */
--obsidian: #050505;
--onyx: #0a0a0a;
--graphite: #1a1a1a;
--carbon: #242424;

/* Metallics - for accents */
--burnished-gold: #b8860b;
--champagne: #f7e7ce;
--rose-bronze: #c9a9a6;
--platinum-ice: #e8e8e8;

/* Depths - for atmosphere */
--deep-violet: #2d1b4e;
--midnight-blue: #0d1b2a;

/* Text - for hierarchy */
--text-light: rgba(255, 255, 255, 0.9);
--text-soft: rgba(255, 255, 255, 0.6);
--text-whisper: rgba(255, 255, 255, 0.4);
```

### Spacing
- Generous, asymmetric, breathing
- Minimum 2rem between sections
- Content offset from edges, not centered in boxes
- Vertical rhythm through varied spacing

### Animation
- Subtle, slow, purposeful
- `cubic-bezier(0.16, 1, 0.3, 1)` - smooth deceleration
- No bounce, no elastic, no "playful" motion
- Fade and translate only, no scale or rotate

### Shadows
- Soft, diffuse, creating depth not separation
- No hard drop shadows
- Multiple layered shadows for elevation

---

## RPG GAME INTERFACE RULES

The RPG game IS allowed. But it must follow these rules:

### Choices
- ❌ Big colorful buttons with emoji
- ✅ Text options with subtle hover states
- ✅ Choices presented as a list, not a grid of cards

### Character/Progress
- ❌ Health bars, XP meters, stat grids
- ✅ Progress indicated through narrative text
- ✅ Character state shown through ambient changes

### Navigation
- ❌ Tab bars, icon grids, hamburger menus
- ✅ Minimal text links in corners
- ✅ Contextual actions that appear when relevant

### Real Art/Music/Books Integration
- ❌ Thumbnail grids, album art squares
- ✅ Full-bleed imagery with text overlaid
- ✅ Art presented as gallery experience
- ✅ Music indicated through frequency displays, not player controls

---

## ENFORCEMENT

### Pre-Commit Check
Any PR that introduces these violations MUST be rejected:
- `emoji.*button|button.*emoji`
- `linear-gradient.*#[A-F0-9]{6}.*#[A-F0-9]{6}` (multi-color gradients)
- `border-radius:\s*(20|25|30|35|40)px` (pill shapes)
- `text-transform:\s*uppercase` (screaming text)
- `🎮|⚗️|🃏|🎵|🎨|📊|🛡️|✨` (emoji in UI)

### Design Review Checklist
Before any UI goes live:
- [ ] No emoji in interactive elements
- [ ] No cartoon gradients or glows
- [ ] No pill-shaped buttons
- [ ] No grid-of-cards layout
- [ ] No status badges with icons
- [ ] No all-caps text (except tiny labels)
- [ ] Colors from approved palette only
- [ ] Typography from approved fonts only
- [ ] Animations subtle and purposeful

---

## WHAT WE ARE

- A luxury art experience platform
- A museum-quality digital space
- A place where master art, sound, and knowledge live
- An RPG that feels like walking through Tiffany's, not playing a mobile game

## WHAT WE ARE NOT

- A generic web app
- A cartoon game
- A "fun" colorful interface
- Graphic design school homework

---

**This boundary is permanent. Any violation is a fall from grace.**

