/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order respects calm depth:
    1. Vesica field (intersecting circles hold the ground)
    2. Tree-of-Life scaffold (nodes and 22 paths)
    3. Fibonacci curve (phi spiral without motion)
    4. Double helix lattice (mirrored strands sampled at 144 points)

  Pure helpers keep changes predictable and avoid accidental animation loops.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff", "#74f1ff", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
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

export function renderHelix(ctx, config = {}) {
  if (!ctx) {
    return;
  }

  const width = Number.isFinite(config.width) ? config.width : ctx.canvas.width || 1440;
  const height = Number.isFinite(config.height) ? config.height : ctx.canvas.height || 900;
  const palette = normalisePalette(config.palette);
  const NUM = ensureNumerology(config.NUM);

  ctx.save();
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // Calm background wash; drawn once to avoid flicker.
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesicaField(ctx, {
    width,
    height,
    colorA: palette.layers[0],
    colorB: palette.layers[1],
    accent: palette.layers[5],
    NUM
  });

  drawTreeOfLife(ctx, {
    width,
    height,
    lineColor: palette.layers[2],
    nodeFill: palette.ink,
    haloColor: palette.layers[5],
    NUM
  });

  drawFibonacciCurve(ctx, {
    width,
    height,
    strokeColor: palette.layers[3],
    markerColor: palette.layers[4],
    NUM
  });

  drawHelixLattice(ctx, {
    width,
    height,
    strandColorA: palette.layers[4],
    strandColorB: palette.layers[5],
    rungColor: palette.layers[2],
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

function drawVesicaField(ctx, { width, height, colorA, colorB, accent, NUM }) {
  const radius = Math.min(width, height) / (NUM.THIRTYTHREE / NUM.NINE);
  const cx = width / 2;
  const cy = height / 2;
  const offset = radius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = colorA;
  fillCircle(ctx, cx - offset, cy, radius);
  ctx.fillStyle = colorB;
  fillCircle(ctx, cx + offset, cy, radius);

  // Soft rings maintain layered depth without animation.
  const ringCount = NUM.SEVEN;
  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(1.2, radius / NUM.NINETYNINE * NUM.SEVEN);
  for (let i = 1; i <= ringCount; i += 1) {
    ctx.globalAlpha = 0.12 + i * 0.02;
    strokeCircle(ctx, cx, cy, radius * (1 + i / (ringCount + NUM.THREE)));
  }

  // Vesica grid using 3x3 symmetry keeps geometry grounded.
  ctx.globalAlpha = 0.18;
  const gridRadius = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const ratio = i / steps;
    const x = cx + ratio * gridRadius;
    const y = cy + ratio * gridRadius;
    drawLine(ctx, x, cy - gridRadius, x, cy + gridRadius);
    drawLine(ctx, cx - gridRadius, y, cx + gridRadius, y);
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, { width, height, lineColor, nodeFill, haloColor, NUM }) {
  const nodes = computeTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const strokeWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE));

  ctx.save();
  ctx.globalAlpha = 0.65;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = strokeWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

  // Nodes rendered last for clarity with gentle halos.
  ctx.globalAlpha = 0.88;
  nodes.forEach((node) => {
    ctx.fillStyle = nodeFill;
    fillCircle(ctx, node.x, node.y, nodeRadius);
    ctx.strokeStyle = haloColor;
    ctx.lineWidth = strokeWidth / NUM.THREE;
    ctx.globalAlpha = 0.5;
    strokeCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO));
    ctx.globalAlpha = 0.88;
  });

  ctx.restore();
}

function drawFibonacciCurve(ctx, { width, height, strokeColor, markerColor, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const turns = NUM.NINE / NUM.THREE; // three calm turns
  const maxRadius = Math.min(width, height) / (NUM.THREE + NUM.SEVEN / NUM.ELEVEN);
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN / NUM.THREE);
  const centerX = width * 0.34;
  const centerY = height * 0.6;

  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.globalAlpha = 0.72;
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t / NUM.THREE);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // Anchor markers give gentle focus with no motion cues.
  const markerCount = NUM.NINE;
  const markerRadius = Math.max(3, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.fillStyle = markerColor;
  ctx.globalAlpha = 0.55;
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t / NUM.THREE);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    fillCircle(ctx, x, y, markerRadius);
  }

  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandColorA, strandColorB, rungColor, NUM }) {
  const samples = NUM.ONEFORTYFOUR;
  const topMargin = height / NUM.ELEVEN;
  const bottomMargin = height - topMargin;
  const usableHeight = bottomMargin - topMargin;
  const centerX = width / 2;
  const amplitude = width / NUM.NINE;
  const turns = NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + usableHeight * t;
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    strandA.push({ x: xA, y });
    strandB.push({ x: xB, y });
  }

  ctx.save();
  ctx.lineWidth = Math.max(1.2, width / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.globalAlpha = 0.7;
  strokePolyline(ctx, strandA, strandColorA);
  strokePolyline(ctx, strandB, strandColorB);

  // Cross rungs follow 33/66 cadence for steady rhythm.
  const rungStep = Math.max(2, Math.floor(samples / NUM.THIRTYTHREE));
  ctx.strokeStyle = rungColor;
  ctx.globalAlpha = 0.45;
  for (let i = 0; i <= samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    if (!a || !b) {
      continue;
    }
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.restore();
}

function computeTreeNodes(width, height, NUM) {
  const marginX = width / NUM.NINETYNINE * NUM.ELEVEN;
  const marginY = height / NUM.NINETYNINE * NUM.ELEVEN;
  const usableWidth = width - marginX * 2;
  const usableHeight = height - marginY * 2;
  const layout = [
    { u: 0.5, v: 0.02 },
    { u: 0.78, v: 0.16 },
    { u: 0.22, v: 0.16 },
    { u: 0.78, v: 0.32 },
    { u: 0.22, v: 0.32 },
    { u: 0.5, v: 0.48 },
    { u: 0.84, v: 0.66 },
    { u: 0.16, v: 0.66 },
    { u: 0.5, v: 0.82 },
    { u: 0.5, v: 0.96 }
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
    [6, 7], [6, 8], [6, 9],
    [7, 8], [7, 9],
    [8, 9]
  ];
}

function fillCircle(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

function strokeCircle(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function strokePolyline(ctx, points, strokeStyle) {
  if (!points.length) {
    return;
  }
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}
