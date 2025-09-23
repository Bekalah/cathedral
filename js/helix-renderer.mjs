/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order honours calm depth:
    1. Vesica field anchors the scene with gentle symmetry.
    2. Tree-of-Life scaffold provides the 10 nodes and 22 paths.
    3. Fibonacci spiral adds a single phi-guided curve.
    4. Double-helix lattice establishes layered geometry without motion.

  All helpers are small pure functions that only rely on arguments to stay deterministic.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff", "#5bd6c9", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
});

const DEFAULT_NUM = Object.freeze({
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

  const width = normaliseDimension(options.width, ctx.canvas?.width || 1440);
  const height = normaliseDimension(options.height, ctx.canvas?.height || 900);
  const palette = mergePalette(options.palette);
  const NUM = mergeNumerology(options.NUM);

  ctx.save();
  configureContext(ctx, width, height, palette.bg);

  drawVesicaField(ctx, {
    width,
    height,
    baseColor: palette.layers[0],
    accentColor: palette.layers[1],
    NUM
  });

  drawTreeOfLife(ctx, {
    width,
    height,
    lineColor: palette.layers[2],
    haloColor: palette.layers[3],
    nodeColor: palette.ink,
    NUM
  });

  drawFibonacciCurve(ctx, {
    width,
    height,
    curveColor: palette.layers[4],
    markerColor: palette.layers[3],
    NUM
  });

  drawHelixLattice(ctx, {
    width,
    height,
    strandColorA: palette.layers[5],
    strandColorB: palette.layers[0],
    rungColor: palette.layers[2],
    NUM
  });

  ctx.restore();
}

function normaliseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return fallback;
}

function mergePalette(palette) {
  if (!palette) {
    return DEFAULT_PALETTE;
  }
  const layers = [];
  for (let i = 0; i < DEFAULT_PALETTE.layers.length; i += 1) {
    const custom = palette.layers && palette.layers[i];
    layers.push(isValidColor(custom) ? custom : DEFAULT_PALETTE.layers[i]);
  }
  const bg = isValidColor(palette.bg) ? palette.bg : DEFAULT_PALETTE.bg;
  const ink = isValidColor(palette.ink) ? palette.ink : DEFAULT_PALETTE.ink;
  return { bg, ink, layers };
}

function mergeNumerology(NUM = {}) {
  const merged = {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    const value = Number(NUM[key]);
    merged[key] = Number.isFinite(value) ? value : DEFAULT_NUM[key];
  }
  return merged;
}

function configureContext(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function drawVesicaField(ctx, { width, height, baseColor, accentColor, NUM }) {
  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) * NUM.NINE / NUM.THIRTYTHREE;
  const offset = baseRadius / NUM.THREE;

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = Math.max(1.25, baseRadius / NUM.NINETYNINE * NUM.SEVEN);
  ctx.strokeStyle = baseColor;

  const offsets = [
    { x: -offset, y: 0 },
    { x: offset, y: 0 },
    { x: 0, y: -offset },
    { x: 0, y: offset }
  ];
  offsets.forEach(({ x, y }) => {
    drawCircle(ctx, cx + x, cy + y, baseRadius, { stroke: true });
  });

  // Gentle harmonic rings provide layered depth with no motion.
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = accentColor;
  for (let i = 1; i <= NUM.SEVEN; i += 1) {
    const ringRadius = baseRadius * (1 + i / (NUM.SEVEN + NUM.THREE));
    drawCircle(ctx, cx, cy, ringRadius, { stroke: true });
  }

  // Vesica grid based on 3x3 symmetry anchors the eye calmly.
  ctx.globalAlpha = 0.12;
  const gridExtent = baseRadius * (NUM.ELEVEN / NUM.NINE);
  const gridSteps = NUM.NINE;
  ctx.strokeStyle = baseColor;
  for (let i = -gridSteps; i <= gridSteps; i += 1) {
    const delta = (i / gridSteps) * gridExtent;
    drawLine(ctx, cx + delta, cy - gridExtent, cx + delta, cy + gridExtent);
    drawLine(ctx, cx - gridExtent, cy + delta, cx + gridExtent, cy + delta);
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, { width, height, lineColor, haloColor, nodeColor, NUM }) {
  const nodes = getTreeNodes({ width, height, NUM });
  const paths = getTreePaths();

  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = lineColor;
  const pathWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.SEVEN));
  ctx.lineWidth = pathWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      return;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

  // Nodes rendered last for clarity; halos explain calm focus.
  ctx.globalAlpha = 0.9;
  const nodeRadius = Math.max(10, Math.min(width, height) / NUM.THIRTYTHREE);
  nodes.forEach((node) => {
    ctx.fillStyle = nodeColor;
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });

    ctx.strokeStyle = haloColor;
    ctx.globalAlpha = 0.45;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.9;
  });

  ctx.restore();
}

function drawFibonacciCurve(ctx, { width, height, curveColor, markerColor, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const turns = NUM.ELEVEN / NUM.THREE; // ~3.67 turns keeps the spiral calm.
  const growth = NUM.SEVEN;
  const startRadius = Math.min(width, height) / NUM.NINETYNINE;
  const centerX = width * 0.32;
  const centerY = height * 0.6;

  ctx.save();
  ctx.strokeStyle = curveColor;
  ctx.globalAlpha = 0.82;
  ctx.lineWidth = Math.max(1.4, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const theta = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growth * t);
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // Calm markers along the curve reinforce numerology touch points.
  const markerCount = NUM.NINE;
  const markerRadius = Math.max(3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.fillStyle = markerColor;
  ctx.globalAlpha = 0.55;
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const theta = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growth * t);
    const x = centerX + Math.cos(theta) * radius;
    const y = centerY + Math.sin(theta) * radius;
    drawCircle(ctx, x, y, markerRadius, { fill: true });
  }

  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandColorA, strandColorB, rungColor, NUM }) {
  const topMargin = height / NUM.NINE;
  const bottomMargin = height / NUM.NINE;
  const usableHeight = height - topMargin - bottomMargin;
  const centerX = width * 0.68;
  const amplitude = width / NUM.ELEVEN;
  const steps = NUM.ONEFORTYFOUR;
  const turns = NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + usableHeight * t;
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    strandA.push({ x: xA, y });
    strandB.push({ x: xB, y });
  }

  ctx.save();
  const strandWidth = Math.max(1.4, width / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.NINE);
  ctx.globalAlpha = 0.7;
  tracePolyline(ctx, strandA, strandColorA, strandWidth);
  tracePolyline(ctx, strandB, strandColorB, strandWidth);

  // Cross rungs every ~22 segments for balanced lattice depth.
  const rungStep = Math.max(2, Math.floor(steps / NUM.TWENTYTWO));
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = Math.max(1, strandWidth / NUM.THREE);
  for (let i = 0; i <= steps; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.restore();
}

function getTreeNodes({ width, height, NUM }) {
  const marginX = width / NUM.TWENTYTWO * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const marginY = height / NUM.TWENTYTWO * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const usableWidth = width - marginX * 2;
  const usableHeight = height - marginY * 2;
  const layout = [
    { u: 0.5, v: 0.02 },
    { u: 0.72, v: 0.14 },
    { u: 0.28, v: 0.14 },
    { u: 0.72, v: 0.3 },
    { u: 0.28, v: 0.3 },
    { u: 0.5, v: 0.46 },
    { u: 0.78, v: 0.62 },
    { u: 0.22, v: 0.62 },
    { u: 0.5, v: 0.78 },
    { u: 0.5, v: 0.94 }
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
    [8, 9], [6, 7]
  ];
}

function tracePolyline(ctx, points, strokeStyle, lineWidth) {
  if (!points.length) {
    return;
  }
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}

function drawCircle(ctx, cx, cy, radius, options = {}) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (options.fill) {
    ctx.fill();
  }
  if (options.stroke) {
    ctx.stroke();
  }
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function isValidColor(value) {
  return typeof value === "string" && value.trim().length > 0;
}
