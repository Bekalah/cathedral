/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer sequence preserves calm depth:
    1. Vesica field — soft lattice foundation.
    2. Tree-of-Life — scaffold of ten nodes and twenty-two paths.
    3. Fibonacci curve — static spiral to suggest motion without animation.
    4. Double helix lattice — mirrored strands sampled at 144 points.

  All helpers are pure and depend only on input parameters so edits stay deterministic.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff","#74f1ff","#8ef7c3","#ffd27f","#f5a3ff","#d4d7ff"]
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

  const width = Number.isFinite(options.width) ? options.width : ctx.canvas.width;
  const height = Number.isFinite(options.height) ? options.height : ctx.canvas.height;
  const palette = normalisePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);

  ctx.save();
  paintBackground(ctx, width, height, palette.bg);

  paintVesicaField(ctx, { width, height, color: palette.layers[0], NUM });
  paintTreeOfLife(ctx, {
    width,
    height,
    lineColor: palette.layers[1],
    nodeColor: palette.ink,
    NUM
  });
  paintFibonacciCurve(ctx, { width, height, color: palette.layers[2], NUM });
  paintHelixLattice(ctx, {
    width,
    height,
    strandA: palette.layers[3],
    strandB: palette.layers[4],
    rungColor: palette.layers[5],
    NUM
  });

  ctx.restore();
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

function ensureNumerology(NUM) {
  if (!NUM) {
    return FALLBACK_NUM;
  }
  const merged = {};
  for (const key of Object.keys(FALLBACK_NUM)) {
    merged[key] = Number.isFinite(NUM[key]) ? NUM[key] : FALLBACK_NUM[key];
  }
  return merged;
}

function paintBackground(ctx, width, height, color) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function paintVesicaField(ctx, { width, height, color, NUM }) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * (NUM.NINE / NUM.THREE);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = Math.max(radius / NUM.NINETYNINE * NUM.SEVEN, radius / NUM.TWENTYTWO);

  const offsets = [
    { x: 0, y: 0 },
    { x: radius / NUM.THREE, y: 0 },
    { x: -radius / NUM.THREE, y: 0 },
    { x: 0, y: radius / NUM.THREE },
    { x: 0, y: -radius / NUM.THREE }
  ];
  offsets.forEach(offset => drawCircleOutline(ctx, cx + offset.x, cy + offset.y, radius));

  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = radius * (1 + i / (ringCount + NUM.THREE));
    drawCircleOutline(ctx, cx, cy, ringRadius);
  }

  ctx.globalAlpha = 0.16;
  const gridRange = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const offset = (i / steps) * gridRange;
    drawLine(ctx, cx - gridRange, cy + offset, cx + gridRange, cy + offset);
    drawLine(ctx, cx + offset, cy - gridRange, cx + offset, cy + gridRange);
  }

  ctx.restore();
}

function drawCircleOutline(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function paintTreeOfLife(ctx, { width, height, lineColor, nodeColor, NUM }) {
  const nodes = buildTreeOfLifeNodes(width, height, NUM);
  const paths = buildTreeOfLifePaths();

  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(Math.min(width, height) / NUM.NINETYNINE * NUM.THREE, Math.min(width, height) / NUM.TWENTYTWO);
  paths.forEach(([a, b]) => {
    const from = nodes[a];
    const to = nodes[b];
    drawLine(ctx, from.x, from.y, to.x, to.y);
  });

  ctx.globalAlpha = 1;
  ctx.fillStyle = nodeColor;
  const baseRadius = Math.min(width, height) / NUM.TWENTYTWO;
  const minRadius = Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE);
  const nodeRadius = Math.max(baseRadius, minRadius);
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function buildTreeOfLifeNodes(width, height, NUM) {
  const cx = width / 2;
  const top = height / NUM.SEVEN;
  const bottom = height - top;
  const range = bottom - top;
  const verticalUnits = NUM.TWENTYTWO;
  const level = units => top + range * (units / verticalUnits);
  const horizontalUnit = width / NUM.THREE * (NUM.NINE / NUM.TWENTYTWO);
  const outerUnit = horizontalUnit * (NUM.ELEVEN / NUM.NINE);

  return [
    { x: cx, y: level(0) },
    { x: cx - horizontalUnit, y: level(NUM.THREE) },
    { x: cx + horizontalUnit, y: level(NUM.THREE) },
    { x: cx - outerUnit, y: level(NUM.SEVEN + NUM.THREE) },
    { x: cx + outerUnit, y: level(NUM.SEVEN + NUM.THREE) },
    { x: cx, y: level(NUM.ELEVEN) },
    { x: cx - horizontalUnit, y: level(NUM.ELEVEN + NUM.THREE) },
    { x: cx + horizontalUnit, y: level(NUM.ELEVEN + NUM.THREE) },
    { x: cx, y: level(NUM.ELEVEN + NUM.SEVEN) },
    { x: cx, y: level(NUM.TWENTYTWO) }
  ];
}

function buildTreeOfLifePaths() {
  return [
    [0, 1],[0, 2],[0, 5],
    [1, 2],[1, 3],[1, 5],
    [2, 4],[2, 5],[3, 4],
    [3, 5],[4, 5],
    [3, 6],[4, 7],
    [5, 6],[5, 7],[5, 8],
    [6, 7],[6, 8],[7, 8],
    [6, 9],[7, 9],[8, 9]
  ];
}

function paintFibonacciCurve(ctx, { width, height, color, NUM }) {
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) / NUM.TWENTYTWO;
  const segments = NUM.TWENTYTWO;
  const points = buildFibonacciSpiralPoints({ cx, cy, base, segments, NUM });

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(base / NUM.NINE, base / NUM.TWENTYTWO);
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  points.forEach((pt, index) => {
    if (index === 0) {
      ctx.moveTo(pt.x, pt.y);
    } else {
      ctx.lineTo(pt.x, pt.y);
    }
  });
  ctx.stroke();
  ctx.restore();
}

function buildFibonacciSpiralPoints({ cx, cy, base, segments, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const turnFraction = 1 / NUM.THREE;
  const exponentDivisor = NUM.NINE - NUM.THREE;
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = i * turnFraction * Math.PI * 2;
    const radius = base * Math.pow(phi, i / exponentDivisor);
    points.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
  }
  return points;
}

function paintHelixLattice(ctx, { width, height, strandA, strandB, rungColor, NUM }) {
  const cx = width / 2;
  const top = height / NUM.ELEVEN;
  const bottom = height - top;
  const samples = NUM.ONEFORTYFOUR;
  const amplitude = Math.min(width, height) / NUM.THREE;
  const frequency = NUM.THREE / NUM.ELEVEN;

  const strand1 = [];
  const strand2 = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const y = top + (bottom - top) * t;
    const angle = t * Math.PI * frequency;
    const xOffset = Math.sin(angle) * amplitude;
    strand1.push({ x: cx - xOffset, y });
    strand2.push({ x: cx + xOffset, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = strandA;
  ctx.lineWidth = 2;
  drawPolyline(ctx, strand1);
  ctx.strokeStyle = strandB;
  drawPolyline(ctx, strand2);

  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1.2;
  const rungStep = Math.max(1, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < strand1.length; i += rungStep) {
    const a = strand1[i];
    const b = strand2[i];
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.restore();
}

function drawPolyline(ctx, points) {
  if (!points.length) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}
