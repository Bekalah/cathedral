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
This renderer is a self-contained, offline-safe study of layered sacred geometry. It follows the ND-safe law: calm contrast, no animation, no strobe, motion only if the visitor explicitly enables it (none provided by default).

## Files
- `index.html` — entry point; open directly with a double-click.
- `js/helix-renderer.mjs` — pure ES module that draws all four layers on a 2D canvas.
- `data/palette.json` — optional palette override. Remove or edit to switch palettes.

## Offline Usage
1. Download or copy the folder to your machine.
2. Double-click `index.html` in any modern browser (Chromium, Firefox, Safari).
3. The canvas renders at 1440×900 without requiring a local server or network access.

If `data/palette.json` is missing or blocked by the browser's file permissions, a notice appears and a safe fallback palette is used.

## Layer Order
1. **Vesica Field** — two intersecting circles plus harmonic rings informed by the numerology constants (3, 7, 9, 11, 22, 33, 99, 144). Sets the background geometry with soft translucency for depth.
2. **Tree of Life** — ten sephirot nodes and twenty-two connecting paths. Layout proportions are anchored to the same constants to keep the scaffold grounded.
3. **Fibonacci Curve** — static logarithmic spiral polyline. Sample count and growth cadence use the constants, maintaining resonance with the earlier layers.
4. **Double Helix Lattice** — two mirror polylines with crossbars, expressing the helix in stillness.

All geometry is rendered once; there is no animation loop, autoplay, or network request. Comments in the module explain ND-safe choices and numerology hooks so the scaffold can be extended without breaking the law.

## Customization
- Adjust colors by editing `data/palette.json`. Keep contrast above 4.5 for body text.
- Modify geometry by editing the small pure functions in `js/helix-renderer.mjs`. Each function focuses on a single layer to encourage additive, non-destructive changes.

## Safety Notes
- Palette defaults avoid harsh flashes.
- The Tree-of-Life nodes include generous hit radii should you later add interactivity.
- Helix lattice spacing leaves breathing room for overlays or annotations without crowding the visitor.
