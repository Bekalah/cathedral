/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order is intentional to preserve calm depth:
    1. Vesica field (grounding lattice of intersecting circles)
    2. Tree-of-Life scaffold (ten sephirot, twenty-two paths)
    3. Fibonacci spiral (phi-guided curve rendered without motion)
    4. Double helix lattice (mirrored strands sampled at 144 points)

  All helpers are pure: no shared mutable state, no timers, no animation.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
});

const FALLBACK_NUM = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  ELEVEN: 11,
  TWENTYTWO: 22,
  THIRTYTHREE: 33,
  NINETYNINE: 99,
  ONEFORTYFOUR: 144
});

export function renderHelix(ctx, options = {}) {
  if (!ctx) {
    return;
  }

  const width = sanitiseDimension(options.width, ctx.canvas.width || 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height || 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  ctx.save();
  resetCanvas(ctx, width, height, palette.bg);

  paintVesicaField(ctx, { width, height, palette, NUM });
  paintTreeOfLife(ctx, { width, height, palette, NUM });
  paintFibonacciCurve(ctx, { width, height, palette, NUM });
  paintHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();
}

function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  if (Number.isFinite(fallback) && fallback > 0) {
    return fallback;
  }
  return 1;
}

function normalisePalette(palette) {
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

function normaliseNumerology(NUM) {
  if (!NUM) {
    return FALLBACK_NUM;
  }
  const merged = {};
  for (const key of Object.keys(FALLBACK_NUM)) {
    merged[key] = Number.isFinite(NUM[key]) ? NUM[key] : FALLBACK_NUM[key];
  }
  return merged;
}

function resetCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function paintVesicaField(ctx, { width, height, palette, NUM }) {
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * NUM.NINE;
  const centerX = width / 2;
  const centerY = height / 2;
  const offset = radius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.globalAlpha = 0.26;
  ctx.fillStyle = palette.layers[0];
  drawCircle(ctx, centerX - offset, centerY, radius, { fill: true });
  ctx.fillStyle = palette.layers[1];
  drawCircle(ctx, centerX + offset, centerY, radius, { fill: true });

  // Rings use numerology ratios to hold depth without motion.
  const ringCount = NUM.SEVEN;
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(1.2, radius / NUM.NINETYNINE * NUM.SEVEN);
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = radius * (1 + i / (ringCount + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius, { stroke: true });
  }

  // Vesica grid anchored to a 3x3 lattice keeps the base calm and symmetric.
  const gridSteps = NUM.THREE;
  const extent = radius * (NUM.ELEVEN / NUM.NINE);
  ctx.globalAlpha = 0.16;
  for (let i = -gridSteps; i <= gridSteps; i += 1) {
    const offsetX = (i / gridSteps) * extent;
    drawLine(ctx, centerX + offsetX, centerY - extent, centerX + offsetX, centerY + extent);
    const offsetY = (i / gridSteps) * extent;
    drawLine(ctx, centerX - extent, centerY + offsetY, centerX + extent, centerY + offsetY);
  }
  ctx.restore();
}

function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = buildTreeNodes(width, height, NUM);
  const paths = buildTreePaths();
  const strokeWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE));

  ctx.save();
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = strokeWidth;
  for (let i = 0; i < paths.length; i += 1) {
    const [fromIndex, toIndex] = paths[i];
    const start = nodes[fromIndex];
    const end = nodes[toIndex];
    drawLine(ctx, start.x, start.y, end.x, end.y);
  }

  // Nodes render last for clarity; halos stay gentle for ND safety.
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = palette.ink;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = strokeWidth / NUM.THREE;
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.globalAlpha = 0.55;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.9;
  }
  ctx.restore();
}

function buildTreeNodes(width, height, NUM) {
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

function buildTreePaths() {
  // Twenty-two connections honour the sephirot pathways.
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
  const rotations = NUM.NINE / NUM.THREE; // Three full turns keep the spiral serene.
  const centerX = width * (NUM.SEVEN / NUM.TWENTYTWO);
  const centerY = height * (NUM.ELEVEN / NUM.TWENTYTWO);
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE;
  const growth = NUM.ELEVEN / NUM.SEVEN;

  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = rotations * Math.PI * 2 * t;
    const radius = baseRadius * Math.pow(phi, growth * t);
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }

  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = Math.max(1.5, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  strokePolyline(ctx, points);

  // Anchor markers provide gentle focus without motion cues.
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = palette.layers[3];
  const markerRadius = Math.max(3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  for (let i = 1; i < points.length; i += Math.max(1, Math.floor(points.length / NUM.NINE))) {
    const point = points[i];
    drawCircle(ctx, point.x, point.y, markerRadius, { fill: true });
  }
  ctx.restore();
}

function paintHelixLattice(ctx, { width, height, palette, NUM }) {
  const samples = NUM.ONEFORTYFOUR;
  const verticalMargin = height / NUM.ELEVEN;
  const usableHeight = height - verticalMargin * 2;
  const centerX = width * (NUM.ELEVEN / NUM.TWENTYTWO);
  const amplitude = width / NUM.NINE;
  const turns = NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = turns * Math.PI * 2 * t;
    const y = verticalMargin + usableHeight * t;
    strandA.push({ x: centerX + Math.sin(angle) * amplitude, y });
    strandB.push({ x: centerX + Math.sin(angle + Math.PI) * amplitude, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = Math.max(1.3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN);
  ctx.strokeStyle = palette.layers[4];
  strokePolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[5];
  strokePolyline(ctx, strandB);

  // Cross rungs reference 33 + 66 ratios for a static lattice rhythm.
  const rungStep = Math.max(2, Math.floor(samples / NUM.THIRTYTHREE));
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.layers[2];
  for (let i = 0; i <= samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius, options) {
  const opts = options || {};
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (opts.fill) {
    ctx.fill();
  }
  if (opts.stroke) {
    ctx.stroke();
  }
}

function drawLine(ctx, ax, ay, bx, by) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

function strokePolyline(ctx, points) {
  if (!Array.isArray(points) || points.length === 0) {
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
