# Cosmic Helix Renderer (Offline, ND-safe)

Static HTML + Canvas renderer that honors the Cosmic-Helix spec with layered geometry and sensory-calming choices. Everything runs offline: double-clicking `index.html` is enough.

## Files
- `index.html` - entry point with a 1440x900 canvas, palette loader, and ND-safe status copy.
- `js/helix-renderer.mjs` - pure ES module that draws the Vesica field, Tree-of-Life scaffold, Fibonacci curve, and static double-helix lattice in that order.
- `data/palette.json` - editable palette file. Remove it to test the inline fallback notice; the renderer stays safe.

- `index.html` - entry point with a 1440x900 canvas, calm status line, and local palette loading that first tries `fetch` then falls back to a built-in palette.
- `js/helix-renderer.mjs` - pure ES module that draws the Vesica lattice, Tree-of-Life scaffold, Fibonacci curve, and static double-helix lattice.
- `data/palette.json` - editable ND-safe palette. If missing or blocked, the renderer falls back to an embedded palette and paints a gentle inline notice.

## Rendered Layers
1. **Vesica field** - Seven by nine circle lattice using constants 7 and 9 for grounding repetition.
2. **Tree-of-Life scaffold** - Ten sephirot nodes with twenty-two connective paths. Layout ratios weave constants 3, 7, 9, 11, 22, 33, 99, and 144.
3. **Fibonacci curve** - Logarithmic spiral approximation sampled with constants 11, 22, 33, and 99 for calm growth.
4. **Double-helix lattice** - Phase-shifted strands sampled ninety-nine times with thirty-three crossbars; ratios lean on constants 7, 11, 22, 33, 99, and 144.

## Palette Notes
- Default palette favors serene blues, teals, gold, and violet on deep charcoal for high readability.
- Edit `data/palette.json` to adjust tones; keep six layer colors so each geometry band remains distinct.
- Additional curated palettes live in `data/palettes/`. Copy one over `data/palette.json` to swap schemes.

## Usage (Offline)
1. Keep the four files together.
2. Double-click `index.html` (or use a browser "Open File" command).
3. The canvas renders immediately. No network, build step, or workflow exists here.

## Accessibility and ND-safe Choices
- No animation, audio, or autoplay; drawing happens once.
- Comments document why each layer stays static and how contrast stays readable.
- Layer order preserves depth: Vesica base, Tree-of-Life structure, Fibonacci growth, Helix crown.
