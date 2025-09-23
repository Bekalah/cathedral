/*
  helix-renderer.mjs
  Offline ND-safe renderer that draws four sacred geometry layers without animation.
  Each helper is a small pure function that only depends on its inputs so future edits remain additive.
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
  const { width, height } = options;
  const palette = normalizePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);

  ctx.save();
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  // Background wash keeps contrast gentle; no flicker because we render once.
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesicaField(ctx, { width, height, palette, NUM });
  drawTreeOfLife(ctx, { width, height, palette, NUM });
  drawFibonacciCurve(ctx, { width, height, palette, NUM });
  drawHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();
}

function normalizePalette(palette) {
  if (!palette || !Array.isArray(palette.layers)) {
    return FALLBACK_PALETTE;
  }
  const layers = palette.layers.slice();
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
    return {
      THREE: 3,
      SEVEN: 7,
      NINE: 9,
      ELEVEN: 11,
      TWENTYTWO: 22,
      THIRTYTHREE: 33,
      NINETYNINE: 99,
      ONEFORTYFOUR: 144
    };
  }
  return NUM;
}

function drawVesicaField(ctx, { width, height, palette, NUM }) {
  ctx.save();
  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) / (NUM.THREE - NUM.NINE / NUM.NINETYNINE);
  const offset = baseRadius * (NUM.NINE / NUM.TWENTYTWO);

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = palette.layers[0];
  drawCircle(ctx, cx - offset, cy, baseRadius, { fill: true, stroke: false });

  ctx.fillStyle = palette.layers[1];
  drawCircle(ctx, cx + offset, cy, baseRadius, { fill: true, stroke: false });

  // Harmonic rings give layered depth without motion; radii reference numerology constants.
  const harmonicRadii = [
    baseRadius,
    baseRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO),
    baseRadius * (NUM.NINETYNINE / NUM.ONEFORTYFOUR)
  ];
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(1, Math.min(width, height) / NUM.ONEFORTYFOUR);
  harmonicRadii.forEach((radius, idx) => {
    ctx.globalAlpha = 0.12 + idx * 0.05;
    drawCircle(ctx, cx, cy, radius, { fill: false, stroke: true });
  });

  // Vesica grid lines stay static; spacing uses the 7-fold division for calm rhythm.
  ctx.globalAlpha = 0.18;
  const horizontalSpan = baseRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const verticalStep = baseRadius / NUM.SEVEN;
  for (let i = -NUM.THREE; i <= NUM.THREE; i += 1) {
    const y = cy + i * verticalStep;
    ctx.beginPath();
    ctx.moveTo(cx - horizontalSpan, y);
    ctx.lineTo(cx + horizontalSpan, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTreeOfLife(ctx, { width, height, palette, NUM }) {
  ctx.save();
  const margin = Math.min(width, height) / NUM.NINE;
  const nodeRadius = Math.min(width, height) / (NUM.THIRTYTHREE * 1.5);
  const strokeWidth = Math.max(1.5, Math.min(width, height) / NUM.THIRTYTHREE);

  const nodes = getTreeOfLifeNodes({ width, height, margin });
  const paths = getTreeOfLifePaths();

  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = strokeWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.layers[3];
  nodes.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true, stroke: false });
    ctx.strokeStyle = palette.layers[5];
    ctx.lineWidth = strokeWidth / NUM.THREE;
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: false, stroke: true });
  });
  ctx.restore();
}

function getTreeOfLifeNodes({ width, height, margin }) {
  const usableWidth = width - margin * 2;
  const usableHeight = height - margin * 2;
  const positions = [
    { u: 0.5, v: 0.05 },
    { u: 0.25, v: 0.18 },
    { u: 0.75, v: 0.18 },
    { u: 0.25, v: 0.36 },
    { u: 0.75, v: 0.36 },
    { u: 0.5, v: 0.5 },
    { u: 0.32, v: 0.68 },
    { u: 0.68, v: 0.68 },
    { u: 0.5, v: 0.82 },
    { u: 0.5, v: 0.94 }
  ];
  return positions.map((pos) => ({
    x: margin + pos.u * usableWidth,
    y: margin + pos.v * usableHeight
  }));
}

function getTreeOfLifePaths() {
  return [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [2, 4],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [4, 7],
    [6, 7], [6, 8], [7, 8],
    [6, 9], [7, 9], [8, 9],
    [5, 6], [5, 7], [5, 8],
    [1, 5], [2, 5], [2, 3]
  ];
}

function drawFibonacciCurve(ctx, { width, height, palette, NUM }) {
  ctx.save();
  const cx = width * 0.28;
  const cy = height * 0.62;
  const steps = NUM.ONEFORTYFOUR;
  const angleStep = (NUM.THIRTYTHREE / NUM.NINETYNINE) * Math.PI;
  const growth = 1 + 1 / NUM.ELEVEN;
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE;
  const points = [];

  for (let i = 0; i <= steps; i += 1) {
    const angle = i * angleStep;
    const radius = baseRadius * Math.pow(growth, i / NUM.SEVEN);
    const x = cx + Math.cos(angle) * radius;
    const y = cy - Math.sin(angle) * radius;
    points.push([x, y]);
  }

  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.layers[4];
  ctx.lineWidth = Math.max(1.2, Math.min(width, height) / NUM.NINETYNINE * 2);
  drawPolyline(ctx, points);
  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, palette, NUM }) {
  ctx.save();
  const cx = width * 0.68;
  const top = height * 0.12;
  const bottom = height * 0.9;
  const steps = NUM.NINETYNINE;
  const amplitude = Math.min(width, height) / NUM.SEVEN;
  const verticalSpan = bottom - top;
  const stepY = verticalSpan / (steps - 1);
  const frequency = NUM.THREE / NUM.TWENTYTWO;
  const phase = Math.PI / NUM.THREE;

  const leftPoints = [];
  const rightPoints = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const angle = t * Math.PI * NUM.THIRTYTHREE / NUM.TWENTYTWO;
    const y = bottom - i * stepY;
    const offset = Math.sin(angle * frequency) * amplitude;
    leftPoints.push([cx - offset, y]);
    rightPoints.push([cx + offset * Math.cos(phase), y]);
  }

  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = Math.max(1, Math.min(width, height) / NUM.NINETYNINE * 1.5);
  drawPolyline(ctx, leftPoints);

  ctx.strokeStyle = palette.layers[5];
  drawPolyline(ctx, rightPoints);

  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = palette.layers[3];
  const rungStep = Math.max(1, Math.round(NUM.ELEVEN / NUM.SEVEN));
  for (let i = 0; i < steps; i += rungStep) {
    const lp = leftPoints[i];
    const rp = rightPoints[i];
    if (!lp || !rp) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(lp[0], lp[1]);
    ctx.lineTo(rp[0], rp[1]);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius, options) {
  const fill = options && options.fill;
  const stroke = options ? options.stroke !== false : true;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function drawPolyline(ctx, points) {
  if (!points.length) {
    return;
  }
  ctx.beginPath();
  const [firstX, firstY] = points[0];
  ctx.moveTo(firstX, firstY);
  for (let i = 1; i < points.length; i += 1) {
    const [x, y] = points[i];
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}
