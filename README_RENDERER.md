# Cosmic Helix Renderer

Static, offline renderer for the layered Cosmogenesis helix field. The bundle honours ND-safe practice: no motion, calm palette, and explanatory comments so future maintainers know why each choice exists.

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
- `index.html` — entry point that loads the renderer module, fetches the optional palette, and reports status.
- `js/helix-renderer.mjs` — pure drawing helpers that paint each sacred geometry layer in order.
- `data/palette.json` — tweakable palette. Remove or edit to taste; fallback hues keep AA+ contrast.

## Usage
1. Double-click `index.html` in any modern browser. No server or build steps are required.
2. If `data/palette.json` is present, the renderer uses those hues. When the file is missing (or blocked by browser security rules), the page reports the fallback and still renders with calm defaults.

## Geometry Layers
1. **Vesica Field** — overlapping circles and a 3x3 grid arranged with constants (3, 7, 9, 11, 22, 33) to ground the canvas.
2. **Tree-of-Life Scaffold** — ten nodes and twenty-two connecting paths drawn with gentle halos for clarity.
3. **Fibonacci Curve** — a logarithmic spiral guided by phi ratios across twenty-two segments to represent growth without motion.
4. **Double Helix Lattice** — twin strands and rungs sampled across one hundred forty-four points for static depth.

## ND-safe Choices
- No animation, autoplay, strobing, or sudden contrast shifts.
- Palette colours maintain calm contrast against the background; fallbacks use the same hues as the inline CSS.
- Comments in the module explain the layer order so future edits preserve the sensory-safe depth stack.

## Customising
- Adjust the palette JSON for alternate hues (keep `bg`, `ink`, and six `layers`).
- Tweak numerology-based constants inside `js/helix-renderer.mjs` to shift spacing while preserving symbolic ratios (3, 7, 9, 11, 22, 33, 99, 144).

## Offline Notes
- Browsers may block `fetch` calls on `file://` URLs. The script catches these errors and keeps rendering with fallback data so the experience remains offline-first.
- No external network, build tools, or workflows are required.

This renderer is a self-contained, offline-safe study of layered sacred geometry. It follows the ND-safe law: calm contrast, no animation, no strobe, and layer order explained for trauma-aware maintenance.
