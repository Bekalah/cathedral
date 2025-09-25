# Cosmic Helix Renderer (Offline)

Static HTML + Canvas renderer that honors the Cosmic-Helix spec with ND-safe practices: no motion, soft yet legible contrast, and layered geometry that preserves depth. Everything works offline; double-clicking `index.html` is enough.

## Files
- `index.html` - entry point with a 1440x900 canvas, calm status line, and local palette loading that first tries `fetch` then falls back to JSON modules.
- `js/helix-renderer.mjs` - pure ES module that draws the Vesica lattice, Tree-of-Life scaffold, Fibonacci curve, and static double-helix lattice.
- `data/palette.json` - editable ND-safe palette. If missing or blocked, the renderer falls back to an embedded palette and paints a gentle inline notice.

## Layer Breakdown
1. **Vesica field** - Seven-by-nine lattice of intersecting circles (constants 7 and 9) with harmonic rings to ground the grid.
2. **Tree-of-Life scaffold** - Ten sephirot nodes with twenty-two connective paths. Layout ratios use constants 3, 7, 9, 11, 22, 33, 99, and 144.
3. **Fibonacci curve** - Static polyline approximation of a logarithmic spiral (phi scaled with constants 3, 11, 22, 33, 99).
4. **Double-helix lattice** - Ninety-nine point samples per strand with mirrored phase offsets (constants 7, 11, 22, 33, 99, 144) and calm rungs.

## Palette Notes
- Default palette favors serene blues, teals, gold, and violet on deep charcoal for high readability.
- Edit `data/palette.json` to adjust tones; keep six layer colors so each geometry band remains distinct.
- Additional curated palettes live in `data/palettes/` (for example `muse.json`). Copy one of those files over `data/palette.json` when you want to swap schemes without editing hex values by hand.
- Removing the JSON file triggers the fallback palette and an inline notice, confirming the renderer is still safe.

## Using the Renderer
1. Keep the four files together.
2. Double-click `index.html` (or use your browser's "Open File..." command).
3. The canvas renders immediately; no network, build step, or workflow is required.

## Accessibility + ND-safe Choices
- No animation, autoplay, or audio; every draw happens once.
- Clearspace is computed from numerology constants to keep forms away from edges.
- Palette choices sustain contrast above WCAG 2.1 AA while staying gentle on sensory systems.
- Layer order preserves depth: Vesica base, Tree-of-Life structure, Fibonacci growth, Helix lattice crown.
