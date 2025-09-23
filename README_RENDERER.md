# Cosmic Helix Renderer

Static, offline renderer for the layered Cosmogenesis helix field. This bundle honours ND-safe practices: no motion, calm palette, and descriptive comments for maintainers.

## Files
- `index.html` - entry point that loads the renderer module and optional palette data.
- `js/helix-renderer.mjs` - pure functions that paint each sacred geometry layer.
- `data/palette.json` - tweakable palette. Remove or edit to taste; fallback hues keep AA+ contrast.

## Usage
1. Double-click `index.html` in any modern browser. No server or build steps are required.
2. If `data/palette.json` is present, the renderer uses those hues. When the file is missing (or blocked by browser security rules), a safe fallback palette is used and the page status message notes the substitution.

## Geometry Layers
1. **Vesica Field** - overlapping circles arranged with constants (3, 9, 33) to ground the canvas.
2. **Tree-of-Life Scaffold** - ten nodes and twenty-two connecting paths drawn with gentle strokes.
3. **Fibonacci Curve** - a log spiral guided by phi ratios across 22 segments.
4. **Double Helix Lattice** - twin strands and rungs sampled across 144 points for static depth.

## ND-safe Choices
- No animation, autoplay, or strobing visuals.
- Palette colours maintain 4.5:1 or higher contrast against the background.
- Comments in the module explain the order of layers so future edits preserve calm depth.

## Customising
- Adjust the palette JSON for alternate hues (keep `bg`, `ink`, and six `layers`).
- Tweak numerology-based constants inside `js/helix-renderer.mjs` to shift spacing while preserving symbolic ratios (3, 7, 9, 11, 22, 33, 99, 144).

## Offline Notes
- Browsers may block `fetch` calls on `file://` URLs. The script catches these errors and keeps rendering with fallback data so the experience remains offline-first.
- No external network, build tools, or workflows are required.
