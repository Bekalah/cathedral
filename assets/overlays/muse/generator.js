// assets/overlays/muse/generator.js
// Pure functions that assemble muse overlays with the clearspace law applied.
// Every overlay keeps layered geometry (no flattening) and embeds provenance metadata.

const BASE_SIZE = 1000;
const MIN_CLEARSPACE = 24;
const CLEARSPACE_RATIO = 0.07; // 7% as mandated by the padding law.

/**
 * Compute the clearspace padding (P) using the law: max(7% of canvas, 24px).
 */
export function computeClearspace(baseSize = BASE_SIZE) {
  const raw = Math.round(baseSize * CLEARSPACE_RATIO);
  return raw < MIN_CLEARSPACE ? MIN_CLEARSPACE : raw;
}

/**
 * Build the safe-frame descriptor that documents the padded viewBox.
 */
export function buildSafeFrame({ width = BASE_SIZE, height = BASE_SIZE, clearspacePx }) {
  const safe = clearspacePx ?? computeClearspace(Math.max(width, height));
  return {
    width,
    height,
    padding_px: safe,
    viewBox: {
      minX: -safe,
      minY: -safe,
      width: width + safe * 2,
      height: height + safe * 2
    }
  };
}

/**
 * Wrap layered SVG content with the mandated padded viewBox and metadata.
 */
export function wrapSvgLayer({ id, label, layers, palette, safeFrame }) {
  const clearspacePx = safeFrame.padding_px;
  const { minX, minY, width, height } = safeFrame.viewBox;
  const metadata = {
    render: { clearspace_px: clearspacePx },
    policy: { padding_law: "v1.0" }
  };

  const layerMarkup = layers.join("\n    ");
  const stack = `<g id=\"muse-layers\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    ${layerMarkup}\n  </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" width="${safeFrame.width}" height="${safeFrame.height}" aria-label="${label}" data-muse="${id}">\n` +
    `  <metadata>${JSON.stringify(metadata)}</metadata>\n` +
    `  ${stack}\n` +
    `</svg>\n`;
}

/**
 * Geometry helpers: small pure functions keep the shapes calm and layered.
 */
function vesicaPaths({ radius, rings }) {
  const arcs = [];
  for (let i = 0; i < rings; i += 1) {
    const offset = (i + 1) * radius * 0.5;
    arcs.push(`<circle cx="${-offset}" cy="0" r="${radius}" />`);
    arcs.push(`<circle cx="${offset}" cy="0" r="${radius}" />`);
    arcs.push(`<circle cx="0" cy="${-offset}" r="${radius}" />`);
    arcs.push(`<circle cx="0" cy="${offset}" r="${radius}" />`);
  }
  return arcs;
}

function treeOfLifeLayer({ radius, palette }) {
  const nodes = [];
  const paths = [];
  const verticalStep = radius * 0.88;
  const horizontalStep = radius * 0.75;
  const positions = [
    { id: "kether", x: 0, y: -verticalStep * 4 },
    { id: "chokmah", x: horizontalStep, y: -verticalStep * 3 },
    { id: "binah", x: -horizontalStep, y: -verticalStep * 3 },
    { id: "chesed", x: horizontalStep * 1.2, y: -verticalStep * 2 },
    { id: "geburah", x: -horizontalStep * 1.2, y: -verticalStep * 2 },
    { id: "tiphareth", x: 0, y: -verticalStep },
    { id: "netzach", x: horizontalStep * 1.4, y: 0 },
    { id: "hod", x: -horizontalStep * 1.4, y: 0 },
    { id: "yesod", x: 0, y: verticalStep },
    { id: "malkuth", x: 0, y: verticalStep * 2 }
  ];

  const link = (a, b) => paths.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${palette.paths}" stroke-width="1.5" />`);

  const links = [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [2, 4], [3, 5], [4, 5],
    [3, 6], [4, 7], [5, 8],
    [6, 8], [7, 8], [8, 9]
  ];
  links.forEach(([aIdx, bIdx]) => link(positions[aIdx], positions[bIdx]));

  positions.forEach((pos, index) => {
    const radiusFactor = index % 3 === 0 ? 9 : 7;
    const nodeRadius = Math.max(4, radius * (radiusFactor / 144));
    nodes.push(`<circle cx="${pos.x}" cy="${pos.y}" r="${nodeRadius}" fill="${palette.nodes}" stroke="${palette.paths}" stroke-width="1" />`);
  });

  return { nodes, paths };
}

function fibonacciPolyline({ turns, scale, palette }) {
  const points = [];
  for (let i = 0; i < turns; i += 1) {
    const theta = i * (Math.PI / 11);
    const r = scale * Math.pow(1.618, i / 9);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `<polyline points="${points.join(" ")}" fill="none" stroke="${palette.curve}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;
}

function helixLattice({ strands, height, palette }) {
  const pieces = [];
  const segments = Math.max(33, strands * 11);
  const amplitude = height * 0.4;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const angle = t * Math.PI * strands;
    const xA = amplitude * Math.sin(angle);
    const xB = amplitude * Math.sin(angle + Math.PI);
    const y = height * (t - 0.5);
    pieces.push(`<circle cx="${xA.toFixed(2)}" cy="${y.toFixed(2)}" r="2.5" fill="${palette.helixA}" />`);
    pieces.push(`<circle cx="${xB.toFixed(2)}" cy="${y.toFixed(2)}" r="2.5" fill="${palette.helixB}" />`);
    if (i % 3 === 0) {
      pieces.push(`<line x1="${xA.toFixed(2)}" y1="${y.toFixed(2)}" x2="${xB.toFixed(2)}" y2="${y.toFixed(2)}" stroke="${palette.rungs}" stroke-width="1" />`);
    }
  }
  return pieces;
}

/**
 * Assemble a single muse overlay definition using layered geometry.
 */
function buildOverlayDefinition(seed) {
  const clearspacePx = computeClearspace(BASE_SIZE);
  const safeFrame = buildSafeFrame({ width: BASE_SIZE, height: BASE_SIZE, clearspacePx });

  const palette = {
    field: seed.palette.field,
    nodes: seed.palette.nodes,
    paths: seed.palette.paths,
    curve: seed.palette.curve,
    helixA: seed.palette.helixA,
    helixB: seed.palette.helixB,
    rungs: seed.palette.rungs
  };

  const vesica = vesicaPaths({ radius: seed.radius, rings: seed.rings });
  const tree = treeOfLifeLayer({ radius: seed.radius, palette });
  const spiral = fibonacciPolyline({ turns: seed.turns, scale: seed.radius * 0.6, palette });
  const latticePieces = helixLattice({ strands: seed.strands, height: BASE_SIZE * 0.9, palette });

  const layers = [
    `<g id="vesica-field" fill="none" stroke="${palette.field}" stroke-width="2">${vesica.join("")}</g>`,
    `<g id="tree-of-life" stroke="${palette.paths}" stroke-width="1.5">${tree.paths.join("")}<g id="sephirot" fill="${palette.nodes}" stroke="${palette.paths}" stroke-width="1">${tree.nodes.join("")}</g></g>`,
    `<g id="fibonacci-curve">${spiral}</g>`,
    `<g id="helix-lattice">${latticePieces.join("")}</g>`
  ];

  const svg = wrapSvgLayer({
    id: seed.id,
    label: seed.label,
    layers,
    palette,
    safeFrame
  });

  return {
    id: seed.id,
    label: seed.label,
    muse: seed.muse,
    clearspace_px: clearspacePx,
    safe_frame: safeFrame,
    svg
  };
}

const SEEDS = [
  {
    id: "hilma",
    label: "Hilma Resonance Field",
    muse: {
      id: "muse-hilma",
      title: "Hilma",
      inspiration: "Cosmic abstraction and botanical diagrams",
      numerology: [3, 9, 33]
    },
    radius: 144,
    rings: 3,
    turns: 22,
    strands: 7,
    palette: {
      field: "#b1c7ff",
      nodes: "#f5f7ff",
      paths: "#7a90f5",
      curve: "#f5a3ff",
      helixA: "#ffd27f",
      helixB: "#89f7fe",
      rungs: "#d0d0e6"
    }
  },
  {
    id: "vesper",
    label: "Vesper Harmonic Grid",
    muse: {
      id: "muse-vesper",
      title: "Vesper",
      inspiration: "Evening star alignments and harmonic pairs",
      numerology: [7, 11, 22]
    },
    radius: 132,
    rings: 4,
    turns: 33,
    strands: 9,
    palette: {
      field: "#89f7fe",
      nodes: "#fff6e8",
      paths: "#7ad7f0",
      curve: "#ffd27f",
      helixA: "#f5a3ff",
      helixB: "#8dfda7",
      rungs: "#e1d4ff"
    }
  },
  {
    id: "orion",
    label: "Orion Spiral Loom",
    muse: {
      id: "muse-orion",
      title: "Orion",
      inspiration: "Star ladder and astral helix",
      numerology: [9, 22, 99]
    },
    radius: 126,
    rings: 5,
    turns: 44,
    strands: 11,
    palette: {
      field: "#a0ffa1",
      nodes: "#edf5ff",
      paths: "#7ccf9e",
      curve: "#b1c7ff",
      helixA: "#ffd27f",
      helixB: "#b79bff",
      rungs: "#ece6ff"
    }
  }
];

/**
 * Generate the full overlay suite used by the blessed build.
 */
export function generateMuseOverlays() {
  return SEEDS.map(buildOverlayDefinition);
}

export const OVERLAY_SEEDS = SEEDS;
