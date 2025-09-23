# Cosmic Helix Renderer

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
