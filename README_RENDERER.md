# Cosmic Helix Renderer (Offline, ND-safe)

Static HTML plus Canvas renderer that honors the Cosmic-Helix spec with layered geometry and sensory calming choices. Everything runs offline: double-clicking `index.html` is enough.

## Files

- `index.html` - entry point with a 1440x900 canvas, calm status line, and local palette loading with a built-in fallback.
- `js/helix-renderer.mjs` - pure ES module that draws the Vesica field, Tree-of-Life scaffold, Fibonacci curve, and static double-helix lattice in that order.
- `data/palette.json` - editable ND-safe palette. If missing, the renderer falls back to embedded colors and paints a gentle inline notice.
- `data/palettes/` - optional curated palettes to copy over `data/palette.json`.
- `_headers` - security and CORS headers for Cloudflare Pages.
- `.cfignore` - excludes development assets from the upload bundle.

## Rendered Layers
1. **Vesica field** - Seven by nine circle lattice using constants 7 and 9 for grounding repetition.
2. **Tree-of-Life scaffold** - Ten sephirot nodes with twenty-two connective paths. Layout ratios weave constants 3, 7, 9, 11, 22, 33, 99, and 144.
3. **Fibonacci curve** - Logarithmic spiral approximation sampled with constants 11, 22, 33, and 99 for calm growth.
4. **Double-helix lattice** - Phase-shifted strands sampled ninety-nine times with thirty-three crossbars; ratios lean on constants 7, 11, 22, 33, 99, and 144.

## Palette Notes
- Default palette favors serene blues, teals, gold, and violet on deep charcoal for readability.
- Edit `data/palette.json` to adjust tones; keep six layer colors so each geometry band remains distinct.
- To test the fallback, temporarily rename or remove `data/palette.json`. The canvas will render with embedded colors and note the fallback status.

## Offline Usage
1. Keep the files in the same folder.
2. Double-click `index.html` (or use a browser "Open File" command).
3. The canvas renders immediately. No network, build step, or workflow exists here.

## Cloudflare Pages Deployment
1. Create a new Cloudflare Pages project and choose the repository.
2. Set the **Build command** to `None` and **Build output directory** to the repository root.
3. Deploy. Cloudflare serves the static files as-is, honoring the `_headers` directives for MIME safety and cross-origin isolation.
4. For multi-site routing later, point a Cloudflare Worker at this project (for example `/helix` maps to `https://<project>.pages.dev`).

All geometry helpers live in `js/helix-renderer.mjs` as small pure functions with comments explaining ND-safe choices and layer ordering.
