# Cosmic Helix Renderer

Static, offline renderer for the layered Cosmogenesis helix field. The bundle honours ND-safe practice: no motion, calm palette, and explanatory comments for future maintainers.

## Files
- `index.html` - entry point that loads the renderer module and optional palette data.
- `js/helix-renderer.mjs` - pure functions that paint each sacred geometry layer.
- `data/palette.json` - tweakable palette. Remove or edit to taste; fallback hues keep AA+ contrast.

## Geometry Layers
1. **Vesica Field** - overlapping circles arranged with constants (3, 7, 9, 33) to ground the canvas.
2. **Tree-of-Life Scaffold** - ten nodes and twenty-two connecting paths drawn with gentle strokes.
3. **Fibonacci Curve** - a logarithmic spiral guided by phi ratios across twenty-two segments.
4. **Double Helix Lattice** - twin strands and rungs sampled across one hundred forty-four points for static depth.

## Clearspace and Safe Frame
- The renderer computes `clearspace_px = max(0.07 * min(width, height), 24, outerStrokePx)` before any draw calls.
- All geometry is plotted inside the safe frame rectangle `{ x, y, w, h }`, so no sacred form touches the canvas edge.
- Pass `?overlay=safe` in the query string to see the translucent QA overlay that outlines the safe frame.
- Provenance metadata is attached to the canvas (`data-provenance`) including `clearspace_px`, `safe_frame`, and policy constants for downstream validation.

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
