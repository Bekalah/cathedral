/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order (outer to inner) is intentional:
    1) Vesica field provides the calm backdrop.
    2) Tree-of-Life scaffold anchors nodes and paths.
    3) Fibonacci curve adds gentle spiral motion without animation.
    4) Double helix lattice offers depth using static strands.

  All helpers are small pure functions so future edits remain additive.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
});

export function renderHelix(ctx, options) {
  if (!ctx) {
    return;
  }

  const opts = options || {};
  const width = Math.max(1, opts.width || ctx.canvas.width);
  const height = Math.max(1, opts.height || ctx.canvas.height);
  const palette = normalizePalette(opts.palette);
  const NUM = ensureNumerology(opts.NUM);

  ctx.save();
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // Calm background wash: drawn once to avoid flicker or motion.
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  paintVesicaField(ctx, { width, height, palette, NUM });
  paintTreeOfLife(ctx, { width, height, palette, NUM });
  paintFibonacciCurve(ctx, { width, height, palette, NUM });
  paintHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();
}

function normalizePalette(palette) {
  if (!palette || !Array.isArray(palette.layers)) {
    return FALLBACK_PALETTE;
  }
  const layers = palette.layers.slice(0, FALLBACK_PALETTE.layers.length);
  while (layers.length < FALLBACK_PALETTE.layers.length) {
    layers.push(FALLBACK_PALETTE.layers[layers.length]);
  }
  return {
    bg: palette.bg || FALLBACK_PALETTE.bg,
    ink: palette.ink || FALLBACK_PALETTE.ink,
    layers
  };
}

function ensureNumerology(NUM) {
  if (NUM) {
    return NUM;
  }
  return Object.freeze({
    THREE: 3,
    SEVEN: 7,
    NINE: 9,
    ELEVEN: 11,
    TWENTYTWO: 22,
    THIRTYTHREE: 33,
    NINETYNINE: 99,
    ONEFORTYFOUR: 144
  });
}

function paintVesicaField(ctx, { width, height, palette, NUM }) {
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * NUM.NINE;
  const cx = width / 2;
  const cy = height / 2;
  const offset = radius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.globalAlpha = 0.24;
  ctx.fillStyle = palette.layers[0];
  drawCircle(ctx, cx - offset, cy, radius, { fill: true });
  ctx.fillStyle = palette.layers[1];
  drawCircle(ctx, cx + offset, cy, radius, { fill: true });

  // Harmonic rings maintain layered depth without motion.
  const rings = [1, NUM.THIRTYTHREE / NUM.TWENTYTWO, NUM.NINETYNINE / NUM.ONEFORTYFOUR];
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(NUM.TWENTYTWO / NUM.TWENTYTWO, Math.min(width, height) / NUM.ONEFORTYFOUR);
  rings.forEach((scale, idx) => {
    ctx.globalAlpha = 0.12 + idx * 0.06;
    drawCircle(ctx, cx, cy, radius * scale, { stroke: true });
  });

  // Vesica grid uses 3x3 symmetry; spacing keyed to numerology constants.
  ctx.globalAlpha = 0.18;
  const gridCount = NUM.THREE;
  const spacing = radius / (gridCount + 1);
  for (let gx = -gridCount; gx <= gridCount; gx += 1) {
    const x = cx + gx * spacing * (NUM.SEVEN / NUM.NINE);
    ctx.beginPath();
    ctx.moveTo(x, cy - radius);
    ctx.lineTo(x, cy + radius);
    ctx.stroke();
  }
  for (let gy = -gridCount; gy <= gridCount; gy += 1) {
    const y = cy + gy * spacing * (NUM.SEVEN / NUM.NINE);
    ctx.beginPath();
    ctx.moveTo(cx - radius, y);
    ctx.lineTo(cx + radius, y);
    ctx.stroke();
  }

  ctx.restore();
}

function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = getTreeNodes({ width, height, NUM });
  const paths = getTreePaths();
  const strokeScaled = Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE);
  const strokeWidth = Math.max(NUM.THIRTYTHREE / NUM.TWENTYTWO, strokeScaled);
  const radiusScaled = Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE);
  const nodeRadius = Math.max(NUM.THREE * (NUM.TWENTYTWO / NUM.ELEVEN), radiusScaled);

  ctx.save();
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = strokeWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });

  // Nodes rendered last for clarity; gentle halos avoid harsh focus.
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = palette.ink;
  nodes.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = palette.layers[5];
    ctx.lineWidth = strokeWidth / NUM.THREE;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.92;
    ctx.strokeStyle = palette.layers[2];
  });

  ctx.restore();
}

function getTreeNodes({ width, height, NUM }) {
  const marginX = width / NUM.NINETYNINE * NUM.ELEVEN;
  const marginY = height / NUM.NINETYNINE * NUM.ELEVEN;
  const usableWidth = width - marginX * 2;
  const usableHeight = height - marginY * 2;
  const layout = [
    { u: 0.5, v: 0.04 },
    { u: 0.75, v: 0.18 },
    { u: 0.25, v: 0.18 },
    { u: 0.75, v: 0.32 },
    { u: 0.25, v: 0.32 },
    { u: 0.5, v: 0.48 },
    { u: 0.82, v: 0.64 },
    { u: 0.18, v: 0.64 },
    { u: 0.5, v: 0.78 },
    { u: 0.5, v: 0.92 }
  ];
  return layout.map((pos) => ({
    x: marginX + pos.u * usableWidth,
    y: marginY + pos.v * usableHeight
  }));
}

function getTreePaths() {
  return [
    [0, 1], [0, 2], [0, 5],
    [1, 2], [1, 3], [1, 5],
    [2, 4], [2, 5],
    [3, 4], [3, 5], [3, 6],
    [4, 5], [4, 7],
    [5, 6], [5, 7], [5, 8],
    [6, 8], [6, 9],
    [7, 8], [7, 9],
    [8, 9]
  ];
}

function paintFibonacciCurve(ctx, { width, height, palette, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const totalTurns = NUM.NINE / NUM.THREE;
  const totalTheta = totalTurns * Math.PI * 2;
  const growth = Math.log(phi) / (Math.PI / 2);
  const baseRadius = Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THIRTYTHREE;
  const centerX = width * 0.3;
  const centerY = height * 0.6;
  const points = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const theta = totalTheta * t;
    const radius = baseRadius * Math.exp(growth * theta);
    const x = centerX + radius * Math.cos(theta);
    const y = centerY + radius * Math.sin(theta);
    points.push({ x, y });
  }

  const strokeScaled = Math.min(width, height) / (NUM.ONEFORTYFOUR / (NUM.TWENTYTWO / NUM.ELEVEN));
  const strokeWidth = Math.max(NUM.TWENTYTWO / NUM.ELEVEN, strokeScaled);

  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = strokeWidth;
  tracePolyline(ctx, points);
  ctx.restore();
}

function paintHelixLattice(ctx, { width, height, palette, NUM }) {
  const strandSamples = NUM.ONEFORTYFOUR;
  const frequency = NUM.THREE;
  const amplitude = height / NUM.THIRTYTHREE * NUM.SEVEN;
  const midY = height / 2;
  const strandA = [];
  const strandB = [];

  for (let i = 0; i <= strandSamples; i += 1) {
    const t = i / strandSamples;
    const theta = t * Math.PI * 2 * frequency;
    const x = t * width;
    strandA.push({ x, y: midY + Math.sin(theta) * amplitude });
    strandB.push({ x, y: midY + Math.sin(theta + Math.PI) * amplitude });
  }

  const baseLine = Math.min(width, height) / NUM.ONEFORTYFOUR;
  const lineWidth = Math.max(NUM.TWENTYTWO / NUM.TWENTYTWO, baseLine);

  ctx.save();
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = palette.layers[4];
  tracePolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[5];
  tracePolyline(ctx, strandB);

  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = palette.layers[2];
  const rungStep = Math.max(NUM.TWENTYTWO / NUM.TWENTYTWO, Math.floor(strandSamples / NUM.TWENTYTWO));
  for (let i = 0; i <= strandSamples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    if (!a || !b) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius, options = {}) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (options.fill) {
    ctx.fill();
  }
  if (options.stroke || !options.fill) {
    ctx.stroke();
  }
}

function tracePolyline(ctx, points) {
  if (!points.length) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}

