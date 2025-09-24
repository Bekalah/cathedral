# Cosmic Helix Renderer (Offline)

Static HTML + Canvas renderer that can be opened directly without a server. It encodes the layered cosmology requested by the Cosmic-Helix spec while honoring ND-safe principles: no motion, soft yet legible contrast, and generous canvas padding.

## Files
- `index.html` - entry point with a 1440x900 canvas and a small status line for palette loading state.
- `js/helix-renderer.mjs` - pure ES module that draws the Vesica grid, Tree-of-Life scaffold, Fibonacci curve, and static double-helix lattice.
- `data/palette.json` - editable ND-safe palette. If removed, the renderer falls back to an embedded palette and writes a gentle notice on-canvas.

## Layer Breakdown
1. **Vesica field** - Seven by nine lattice of intersecting circles (constants 7 and 9) to seed the sacred geometry grid without touching canvas edges.
2. **Tree-of-Life scaffold** - Ten sephirot nodes with twenty-two connective paths. Positions are scaled by constants 3, 9, 11, and 22 for numerological resonance.
3. **Fibonacci curve** - Static polyline approximation of a logarithmic spiral. Growth uses phi raised via constants 3, 11, 22, and 99 to keep motion-free expansion.
4. **Double-helix lattice** - Ninety-nine point samples per strand with mirrored phase offsets (constants 7, 11, 22, 33, 99) to suggest a double helix without animation.

## Palette Notes
- Default palette favors calm blues, violets, and golds with high readability on deep charcoal.
- Edit `data/palette.json` to adjust tones. Keep six layer colors so each geometry band can remain distinct.

## Using the Renderer
1. Ensure the four files remain in place.
2. Double-click `index.html` (or open it via File -> Open in your browser).
3. The canvas renders instantly; no network or build steps are required.

If `data/palette.json` is missing or blocked by file:// security rules, the module applies a safe fallback palette and paints a small text notice near the top margin.

## Accessibility + ND-safe Choices
- No animation, autoplay, or audio.
- Minimum 8-10% padding keeps sacred forms from touching frame edges.
- Calm colors respect sensory sensitivities while preserving contrast above WCAG 2.1 AA.
- Layer order is preserved for depth: Vesica base, Tree-of-Life structure, Fibonacci growth, Helix lattice.
