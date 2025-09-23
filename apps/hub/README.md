# Cathedral Hub (Corpus Integration)

This hub demonstrates how the esoteric corpus feeds into gameplay, art, and research modes without requiring a network connection.

## Features

- Offline search powered by the generated `shared/corpus/index/corpusIndex.json` file.
- Source pack modal that renders curated quotations and sigils.
- IIIF helper that resolves a static tile URL when a manifest is available.
- Ritual packet compiler that aligns a node with its hermetic correspondences.

## Usage

1. Ensure the search index is built:

   ```sh
   node scripts/build-corpus-index.mjs
   ```

2. Open `apps/hub/index.html` directly in a browser. The page uses pure ES modules and does not require a server.

3. Trigger the “Sources” buttons to preview the curated pack for node `C144N-000`.

4. Switch between Study, Art, and Adventure mode buttons to watch the ritual packet update with the same data.

5. Click **Load Monas Plate** while online to fetch a representative IIIF tile. Offline, the button displays a safe fallback notice.

## Customising

- Add more works to `shared/corpus/works.json` and place their texts in `shared/corpus/texts/`.
- Expand `shared/corpus/symbols/symbols.json` with additional sigils. Store the layered SVG files alongside the metadata.
- Create additional node packs in `shared/packs/node/`. The UI picks them up automatically via the search index.
- Rerun the build script after any corpus change so the index stays in sync.

All code avoids animation and heavy visual stimulation to remain ND-safe.
