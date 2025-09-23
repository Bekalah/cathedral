# Cosmic Helix Renderer

Static, offline renderer for the layered Cosmogenesis helix field. The code is
ND-safe by design: no motion, calm palette, and clear comments so the next
maintainer understands why the layer order matters.

## Files

* `index.html` - entry point that fetches an optional palette, renders once, and
  records clearspace provenance on the canvas element.
* `js/helix-renderer.mjs` - pure helpers that paint the four sacred geometry
  layers and an optional QA overlay.
* `data/palette.json` - palette override. Remove it and the renderer falls back
  to the hard-coded calm palette.

## Layer Order

1. **Vesica Field** - intersecting circles arranged with constants (3, 7, 9)
   to ground the space.
2. **Tree-of-Life Scaffold** - ten sephirot and twenty-two paths drawn with
   soft halos for clarity.
3. **Fibonacci Curve** - phi-driven spiral rendered as a static polyline across
   twenty-two segments.
4. **Double Helix Lattice** - mirrored strands with rungs sampled across one
   hundred forty-four points.

## Clearspace and QA Overlay

* Clearspace is computed as `max(0.07 * min(width, height), 24, side/144 * 3)`
  and capped so nothing touches the edges.
* Pass `?overlay=safe` when opening `index.html` to draw the translucent frame
  used to audit the safe region.
* `canvas.dataset.provenance` captures the render size, clearspace, palette
  source, and overlay state for downstream verification.

## Offline Usage

1. Double-click `index.html` in any modern browser. No server is required.
2. If `data/palette.json` cannot be loaded (typical for `file://` fetches), the
   page reports the fallback palette and still renders.
3. The renderer exports no animation loops, so once the canvas is drawn the
   page remains calm.

## Extending

* Adjust palette colours in `data/palette.json` (keep `bg`, `ink`, and at least
  four `layers`).
* The numerology constants are passed in from `index.html`; tweak them to shift
  spacing while preserving symbolic ratios (3, 7, 9, 11, 22, 33, 99, 144).
* To integrate with future repos, import `renderHelix` and feed it a 2D canvas
  context. The helper returns provenance metadata so you can log the render.
Static, offline renderer for the layered Cosmogenesis helix field. The bundle honours ND-safe practice: no motion, calm palette, and explanatory comments so future maintainers know why each choice exists.

## Files
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
