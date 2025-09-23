/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer hierarchy (outer to inner):
    1. Vesica field (grounding lattice with clearspace enforcement)
    2. Tree-of-Life scaffold (ten sephirot, twenty-two paths)
    3. Fibonacci curve (phi-guided spiral, drawn once)
    4. Double helix lattice (two phase-shifted strands plus rungs)

  Every helper is a pure function that depends solely on the arguments passed in.
  This keeps edits deterministic and prevents accidental animation loops.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#b1c7ff', '#89f7fe', '#a0ffa1', '#ffd27f', '#f5a3ff', '#d0d0e6']
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

const PHI = (1 + Math.sqrt(5)) / 2;

export function renderHelix(ctx, options = {}) {
  if (!ctx) {
    return;
  }

  const width = resolveDimension(options.width, ctx.canvas.width, 1440);
  const height = resolveDimension(options.height, ctx.canvas.height, 900);
  const palette = normalisePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);

  const shorter = Math.min(width, height);
  const clearspace = computeClearspace(shorter, NUM);
  const frame = {
    x: clearspace,
    y: clearspace,
    width: width - clearspace * 2,
    height: height - clearspace * 2
  };

  if (frame.width <= 0 || frame.height <= 0) {
    return;
  }

  ctx.save();
  prepareCanvas(ctx, width, height, palette.bg);

  drawSafeFrame(ctx, frame, { palette, clearspace, NUM });
  drawVesicaField(ctx, frame, { palette, clearspace, NUM });
  drawTreeOfLife(ctx, frame, { palette, clearspace, NUM });
  drawFibonacciCurve(ctx, frame, { palette, NUM });
  drawHelixLattice(ctx, frame, { palette, NUM });

  ctx.restore();
}

function resolveDimension(requested, fallback, defaultValue) {
  if (Number.isFinite(requested) && requested > 0) {
    return requested;
  }
  if (Number.isFinite(fallback) && fallback > 0) {
    return fallback;
  }
  return defaultValue;
}

function normalisePalette(palette) {
  if (!palette || !Array.isArray(palette.layers)) {
    return DEFAULT_PALETTE;
  }
  const layers = palette.layers.slice(0, DEFAULT_PALETTE.layers.length);
  while (layers.length < DEFAULT_PALETTE.layers.length) {
    layers.push(DEFAULT_PALETTE.layers[layers.length]);
  }
  return {
    bg: palette.bg || DEFAULT_PALETTE.bg,
    ink: palette.ink || DEFAULT_PALETTE.ink,
    layers
  };
}

function ensureNumerology(NUM) {
  if (!NUM) {
    return DEFAULT_NUM;
  }
  const merged = {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    merged[key] = Number.isFinite(NUM[key]) ? NUM[key] : DEFAULT_NUM[key];
  }
  return merged;
}

function computeClearspace(shorterSide, NUM) {
  const fivePercent = shorterSide * 0.05;
  const strokeEstimate = shorterSide / NUM.ONEFORTYFOUR * NUM.SEVEN;
  const tenPercent = shorterSide * 0.1;
  // Padding law: choose the largest value so the safe frame exceeds 5% and all strokes fit comfortably.
  return Math.max(fivePercent, strokeEstimate, tenPercent);
}

function prepareCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function drawSafeFrame(ctx, frame, { palette, clearspace, NUM }) {
  ctx.save();
  const rectColor = withAlpha(palette.ink, 0.18);
  ctx.strokeStyle = rectColor;
  ctx.lineWidth = Math.max(1, clearspace / NUM.SEVEN);
  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);

  // Golden ratio guide lines keep exports aligned to the safe frame.
  const v1 = frame.x + frame.width / PHI;
  const v2 = frame.x + frame.width - frame.width / PHI;
  const h1 = frame.y + frame.height / PHI;
  const h2 = frame.y + frame.height - frame.height / PHI;

  ctx.setLineDash([clearspace / NUM.ELEVEN, clearspace / NUM.ELEVEN]);
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.22);
  ctx.lineWidth = Math.max(1, clearspace / NUM.TWENTYTWO);

  ctx.beginPath();
  ctx.moveTo(v1, frame.y);
  ctx.lineTo(v1, frame.y + frame.height);
  ctx.moveTo(v2, frame.y);
  ctx.lineTo(v2, frame.y + frame.height);
  ctx.moveTo(frame.x, h1);
  ctx.lineTo(frame.x + frame.width, h1);
  ctx.moveTo(frame.x, h2);
  ctx.lineTo(frame.x + frame.width, h2);
  ctx.stroke();

  ctx.restore();
}

function drawVesicaField(ctx, frame, { palette, clearspace, NUM }) {
  ctx.save();

  const centerX = frame.x + frame.width / 2;
  const centerY = frame.y + frame.height / 2;
  const radius = Math.min(frame.width, frame.height) / (2 + 1 / NUM.THREE);
  const strokeWidth = Math.min(clearspace * 0.9, Math.max(2, radius / NUM.NINETYNINE * NUM.SEVEN));

  ctx.strokeStyle = withAlpha(palette.layers[0], 0.6);
  ctx.lineWidth = strokeWidth;

  const offsets = [
    { x: -radius / NUM.THREE, y: 0 },
    { x: radius / NUM.THREE, y: 0 },
    { x: 0, y: -radius / NUM.THREE },
    { x: 0, y: radius / NUM.THREE }
  ];

  for (const offset of offsets) {
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, radius);
  }

  // Harmonic rings reinforce depth without animation.
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.35);
  for (let i = 1; i <= NUM.SEVEN; i += 1) {
    const ringRadius = radius * (1 + i / (NUM.SEVEN + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius);
  }

  // Vesica grid anchored to 3x3 intersections.
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const gridStroke = Math.max(1, strokeWidth * 0.4);
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.22);
  ctx.lineWidth = gridStroke;

  for (let i = -NUM.NINE; i <= NUM.NINE; i += 1) {
    const offset = (i / NUM.NINE) * gridExtent;
    ctx.beginPath();
    ctx.moveTo(centerX + offset, centerY - gridExtent);
    ctx.lineTo(centerX + offset, centerY + gridExtent);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - gridExtent, centerY + offset);
    ctx.lineTo(centerX + gridExtent, centerY + offset);
    ctx.stroke();
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, frame, { palette, clearspace, NUM }) {
  ctx.save();

  const nodeRadius = Math.min(frame.width, frame.height) / NUM.ONEFORTYFOUR * NUM.ELEVEN;
  const layout = [
    { x: 0.5, y: 0.05 }, // Keter
    { x: 0.25, y: 0.18 }, // Chokmah
    { x: 0.75, y: 0.18 }, // Binah
    { x: 0.25, y: 0.38 }, // Chesed
    { x: 0.75, y: 0.38 }, // Gevurah
    { x: 0.5, y: 0.54 },  // Tiferet
    { x: 0.32, y: 0.7 },  // Netzach
    { x: 0.68, y: 0.7 },  // Hod
    { x: 0.5, y: 0.84 },  // Yesod
    { x: 0.5, y: 0.95 }   // Malkuth
  ];

  const nodes = layout.map(point => ({
    x: frame.x + point.x * frame.width,
    y: frame.y + point.y * frame.height
  }));

  const edges = [
    [0, 1], [0, 2], [1, 2], [1, 3], [1, 5], [2, 4], [2, 5],
    [3, 4], [3, 5], [4, 5], [3, 6], [4, 7], [3, 8],
    [5, 6], [5, 7], [5, 8], [6, 7], [6, 8], [7, 8],
    [6, 9], [7, 9], [8, 9]
  ];

  ctx.strokeStyle = withAlpha(palette.layers[1], 0.55);
  ctx.lineWidth = Math.max(1.5, nodeRadius * 0.45);
  for (const [from, to] of edges) {
    const start = nodes[from];
    const end = nodes[to];
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  for (const node of nodes) {
    ctx.fillStyle = withAlpha(palette.layers[1], 0.18);
    ctx.beginPath();
    ctx.ellipse(node.x, node.y, nodeRadius * 1.3, nodeRadius * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.ink;
    ctx.strokeStyle = withAlpha(palette.layers[1], 0.7);
    ctx.lineWidth = Math.max(1, clearspace / NUM.NINETYNINE * NUM.SEVEN);
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawFibonacciCurve(ctx, frame, { palette, NUM }) {
  ctx.save();

  const segments = NUM.TWENTYTWO;
  const maxRadius = Math.min(frame.width, frame.height) / 2.15;
  const baseRadius = maxRadius / Math.pow(PHI, segments / NUM.SEVEN);
  const centerX = frame.x + frame.width * 0.42;
  const centerY = frame.y + frame.height * 0.58;

  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = (Math.PI / NUM.THREE) * i;
    const radius = baseRadius * Math.pow(PHI, i / NUM.SEVEN);
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }

  tracePolyline(ctx, points, {
    color: palette.layers[2],
    lineWidth: Math.max(1.5, Math.min(frame.width, frame.height) / NUM.ONEFORTYFOUR * NUM.NINE),
    alpha: 0.75
  });

  ctx.restore();
}

function drawHelixLattice(ctx, frame, { palette, NUM }) {
  ctx.save();

  const samples = NUM.ONEFORTYFOUR;
  const centerY = frame.y + frame.height / 2;
  const amplitude = frame.height / (NUM.THREE + NUM.SEVEN / NUM.TWENTYTWO);
  const angleMultiplier = Math.PI * (NUM.THREE + NUM.ELEVEN / NUM.TWENTYTWO);

  const strandA = [];
  const strandB = [];
  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const x = frame.x + t * frame.width;
    const angle = t * angleMultiplier;
    strandA.push({ x, y: centerY + Math.sin(angle) * amplitude });
    strandB.push({ x, y: centerY + Math.sin(angle + Math.PI) * amplitude });
  }

  const strandWidth = Math.max(1.25, frame.width / NUM.ONEFORTYFOUR * NUM.THREE / NUM.ELEVEN);
  tracePolyline(ctx, strandA, { color: palette.layers[3], lineWidth: strandWidth, alpha: 0.7 });
  tracePolyline(ctx, strandB, { color: palette.layers[4], lineWidth: strandWidth, alpha: 0.7 });

  ctx.strokeStyle = withAlpha(palette.layers[5], 0.45);
  ctx.lineWidth = Math.max(1, strandWidth * 0.85);
  const rungStep = Math.max(2, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function tracePolyline(ctx, points, style) {
  if (!points || points.length < 2) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = withAlpha(style.color, style.alpha ?? 1);
  ctx.lineWidth = style.lineWidth;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}

function withAlpha(hex, alpha) {
  const value = hex.replace('#', '');
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}
