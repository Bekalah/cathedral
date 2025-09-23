/*
  helix-renderer.mjs
  Static renderer that respects ND-safe guidance: no motion, layered geometry, and clear comments explaining why.

  Layer order sustains calm depth:
    1) Vesica field primes the space with intersecting circles.
    2) Tree-of-Life scaffold anchors ten sephirot and twenty-two paths.
    3) Fibonacci spiral adds phi-based growth without any motion.
    4) Double-helix lattice introduces mirrored strands for vertical balance.

  All helpers are small pure functions so the geometry stays deterministic.
  Layer order preserves calm depth:
    1. Vesica field grounds the canvas with soft symmetry.
    2. Tree-of-Life scaffold anchors the nodes and paths.
    3. Fibonacci spiral introduces gentle phi-guided flow without motion.
    4. Double-helix lattice adds static depth with mirrored strands.

  All drawing helpers are pure; no animation loops or side effects beyond the
  supplied canvas context. Comments explain ND-safe choices for future editors.
  ND-safe static renderer for layered sacred geometry.

  Layer order respects calm depth:
    1. Vesica field (intersecting circles hold the ground)
    2. Tree-of-Life scaffold (nodes and 22 paths)
    3. Fibonacci curve (phi spiral without motion)
    4. Double helix lattice (mirrored strands sampled at 144 points)

  Pure helpers keep changes predictable and avoid accidental animation loops.
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
  layers: ["#6f9bff", "#74f1ff", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
  Layer order preserves calm depth:
    1. Vesica field (foundation lattice)
    2. Tree-of-Life scaffold (nodes and paths)
    3. Fibonacci curve (log spiral polyline)
    4. Double-helix lattice (mirrored strands with static rungs)

  Each helper is a pure function fed only through arguments. No globals, no hidden state, no animation loops.
*/
  Clearspace Law v1.0 is enforced by computing a safe frame inset before
  rendering any layer. All coordinates stay inside that rectangle so no
  geometry touches the canvas edge. Layer order preserves calm depth:
    1. Vesica field (grounding lattice)
    2. Tree-of-Life scaffold (nodes + paths)
    3. Fibonacci curve (phi-based spiral, static)
    4. Double-helix lattice (mirrored strands)

  Each helper is a small pure function that only consumes its arguments.
  Comments explain ND-safe choices: no animation, soft contrast, and
  consistent ratios derived from the requested numerology constants.
*/

const CLEARSPACE_MIN_RATIO = 0.07;
const CLEARSPACE_MIN_PX = 24;
const STROKE_MULTIPLIER = 1.0;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

const FALLBACK_PALETTE = Object.freeze({
  Static ND-safe renderer for the Cosmic Helix layers.

  Layer order preserves calm depth:
    1. Vesica field establishes the grounding lattice.
    2. Tree-of-Life scaffold links nodes for narrative structure.
    3. Fibonacci curve adds phi-driven flow without animation.
    4. Double-helix lattice brings vertical resonance with 144 samples.

  Every helper is a small pure function so the renderer stays deterministic.
*/

const DEFAULT_PALETTE = Object.freeze({

const FALLBACK_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
});

const DEFAULT_NUM = Object.freeze({
const DEFAULT_NUMERLOGY = Object.freeze({
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

const LAYER_COUNT = DEFAULT_PALETTE.layers.length;

export function renderHelix(ctx, config = {}) {
  if (!ctx) {
    return { ok: false, reason: 'no-context', palette: FALLBACK_PALETTE, NUM: FALLBACK_NUM };
  }

  const width = sanitiseDimension(options.width, ctx.canvas.width, 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height, 900);
  const palette = selectPalette(options.palette);
  const NUM = selectNumerology(options.NUM);
  const width = sanitiseDimension(options.width, ctx.canvas.width || 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height || 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);
    return null;
  }

  const width = Math.max(1, Math.floor(options.width ?? ctx.canvas.width ?? 1440));
  const height = Math.max(1, Math.floor(options.height ?? ctx.canvas.height ?? 900));
  const palette = normalisePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);
  const debugOverlay = Boolean(options.debugOverlay);
  const width = Number.isFinite(options.width) ? options.width : ctx.canvas.width || 1440;
  const height = Number.isFinite(options.height) ? options.height : ctx.canvas.height || 900;
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);
  const width = normaliseDimension(options.width, ctx.canvas?.width || 1440);
  const height = normaliseDimension(options.height, ctx.canvas?.height || 900);
  const palette = mergePalette(options.palette);
  const NUM = mergeNumerology(options.NUM);

  const outerStrokePx = computeOuterStroke(width, height);
  const safe = computeSafeFrame(width, height, outerStrokePx);
  const width = Number.isFinite(config.width) ? config.width : ctx.canvas.width || 1440;
  const height = Number.isFinite(config.height) ? config.height : ctx.canvas.height || 900;
  const palette = normalisePalette(config.palette);
  const NUM = ensureNumerology(config.NUM);

  setCanvasSize(ctx.canvas, width, height);
  ctx.save();
  configureContext(ctx);

  fillBackground(ctx, width, height, palette.bg);
  paintVesicaField(ctx, width, height, palette, NUM);
  paintTreeOfLife(ctx, width, height, palette, NUM);
  paintFibonacciCurve(ctx, width, height, palette, NUM);
  paintHelixLattice(ctx, width, height, palette, NUM);
  prepareCanvas(ctx, width, height, palette.bg);

  const shared = { width, height, palette, NUM };

  paintVesicaField(ctx, shared);
  paintTreeOfLife(ctx, shared);
  paintFibonacciCurve(ctx, shared);
  paintHelixLattice(ctx, shared);
  paintVesicaField(ctx, { width, height, palette, NUM });
  paintTreeOfLife(ctx, { width, height, palette, NUM });
  paintFibonacciCurve(ctx, { width, height, palette, NUM });
  paintHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();
  return { ok: true, palette, NUM };
}

function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 1;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  drawVesicaField(ctx, { safe, palette, NUM, outerStrokePx });
  drawTreeOfLife(ctx, { safe, palette, NUM, outerStrokePx });
  drawFibonacciCurve(ctx, { safe, palette, NUM, outerStrokePx });
  drawHelixLattice(ctx, { safe, palette, NUM, outerStrokePx });

  if (debugOverlay) {
    drawSafeFrameOverlay(ctx, safe);
  }
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
  const width = sanitiseDimension(config.width, ctx.canvas ? ctx.canvas.width : 1440);
  const height = sanitiseDimension(config.height, ctx.canvas ? ctx.canvas.height : 900);
  const palette = normalisePalette(config.palette);
  const numerology = normaliseNumerology(config.numerology || config.NUM);

  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.save();

  paintBackground(ctx, width, height, palette.bg);
  drawVesicaField(ctx, width, height, palette.layers[0], numerology);
  drawTreeOfLife(ctx, width, height, palette.layers[1], palette.ink, numerology);
  drawFibonacciCurve(ctx, width, height, palette.layers[2], numerology);
  drawHelixLattice(
    ctx,
    width,
    height,
    palette.layers[3],
    palette.layers[4],
    palette.layers[5],
    numerology
  );

  ctx.restore();

  return buildProvenance({ width, height, safe, outerStrokePx });

  ctx.restore();
  return { ok: true, palette, NUM };
}

function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 1;
}

function sanitiseDimension(value, fallback, hardDefault) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  if (Number.isFinite(fallback) && fallback > 0) {
    return fallback;
  }
  return hardDefault;
}

function setCanvasSize(canvas, width, height) {
  canvas.width = width;
  canvas.height = height;
}

function configureContext(ctx) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.imageSmoothingEnabled = true;
}

function selectPalette(palette) {
  if (!palette || !Array.isArray(palette.layers)) {
    return DEFAULT_PALETTE;
  }

  const layers = palette.layers.slice(0, DEFAULT_PALETTE.layers.length);
  while (layers.length < DEFAULT_PALETTE.layers.length) {
function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return fallback;
}

function normalisePalette(palette) {
  if (!palette) {
    return DEFAULT_PALETTE;
  }
  const layers = Array.isArray(palette.layers)
    ? palette.layers.slice(0, LAYER_COUNT)
    : [];
  while (layers.length < LAYER_COUNT) {
    layers.push(DEFAULT_PALETTE.layers[layers.length]);
  }

  return {
    bg: palette.bg || DEFAULT_PALETTE.bg,
    ink: palette.ink || DEFAULT_PALETTE.ink,
    layers
  };
}

function selectNumerology(source) {
  if (!source) {
    return DEFAULT_NUM;
function normaliseNumerology(NUM) {
  if (!NUM) {
    return FALLBACK_NUM;
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
    merged[key] = Number.isFinite(source[key]) ? source[key] : DEFAULT_NUM[key];
function normaliseNumerology(overrides) {
  const merged = {};
  const source = overrides || {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    const value = Number(source[key]);
    merged[key] = Number.isFinite(value) ? value : DEFAULT_NUM[key];
function normaliseNumerology(input) {
  if (!input) {
    return DEFAULT_NUMERLOGY;
  }
  const result = {};
  for (const key of Object.keys(DEFAULT_NUMERLOGY)) {
    result[key] = Number.isFinite(input[key]) ? input[key] : DEFAULT_NUMERLOGY[key];
    const value = Number(NUM[key]);
    merged[key] = Number.isFinite(value) ? value : DEFAULT_NUM[key];
  }
  return result;
}

function fillBackground(ctx, width, height, color) {
function paintBackground(ctx, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function paintVesicaField(ctx, width, height, palette, NUM) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * (NUM.NINE / NUM.THIRTYTHREE);

  ctx.save();
  ctx.strokeStyle = palette.layers[0];
  ctx.globalAlpha = 0.32;
  ctx.lineWidth = Math.max(1.25, radius / NUM.NINETYNINE * NUM.SEVEN);

  const offsets = [
    { x: -radius / NUM.THREE, y: 0 },
    { x: radius / NUM.THREE, y: 0 },
    { x: 0, y: -radius / NUM.THREE },
    { x: 0, y: radius / NUM.THREE }
  ];

  offsets.forEach((offset) => {
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, radius, { stroke: true });
  });

  // Harmonic rings reinforce depth without motion cues.
  ctx.strokeStyle = palette.layers[5];
  ctx.globalAlpha = 0.24;
  for (let i = 1; i <= NUM.SEVEN; i += 1) {
    const scale = 1 + i / (NUM.NINE + NUM.THREE);
    drawCircle(ctx, centerX, centerY, radius * scale, { stroke: true });
  }

  // Vesica grid anchored to a 3x3 symmetry using numerology steps.
  ctx.strokeStyle = palette.layers[0];
  ctx.globalAlpha = 0.18;
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const offset = (i / steps) * gridExtent;
    drawLine(ctx, centerX + offset, centerY - gridExtent, centerX + offset, centerY + gridExtent);
    drawLine(ctx, centerX - gridExtent, centerY + offset, centerX + gridExtent, centerY + offset);
function prepareCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function paintVesicaField(ctx, { width, height, palette, NUM }) {
  const minDim = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = minDim / (NUM.THIRTYTHREE / NUM.NINE);
  const offset = baseRadius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = Math.max(1.2, baseRadius / NUM.NINETYNINE * NUM.SEVEN);

  const anchors = [
    { x: centerX - offset, y: centerY },
    { x: centerX + offset, y: centerY },
    { x: centerX, y: centerY - offset },
    { x: centerX, y: centerY + offset }
  ];
  anchors.forEach((anchor) => {
    drawCircle(ctx, anchor.x, anchor.y, baseRadius, { stroke: true });
  });

  // Harmonic rings maintain layered depth without motion or flashing.
  ctx.strokeStyle = palette.layers[5];
  ctx.globalAlpha = 0.18;
  const ringSteps = NUM.SEVEN;
  for (let i = 1; i <= ringSteps; i += 1) {
    const scale = 1 + i / (ringSteps + NUM.THREE);
    drawCircle(ctx, centerX, centerY, baseRadius * scale, { stroke: true });
  }

  // Vesica grid anchors 3x3 symmetry. Calm opacity prevents sensory overload.
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = palette.layers[0];
  const gridRadius = baseRadius * (NUM.ELEVEN / NUM.NINE);
  const segments = NUM.NINE;
  for (let i = -segments; i <= segments; i += 1) {
    const offsetRatio = i / segments;
    const x = centerX + offsetRatio * gridRadius;
    const y = centerY + offsetRatio * gridRadius;
    drawLine(ctx, x, centerY - gridRadius, x, centerY + gridRadius);
    drawLine(ctx, centerX - gridRadius, y, centerX + gridRadius, y);
function computeOuterStroke(width, height) {
  const numerator = Math.max(width, height);
  const divisor = FALLBACK_NUM.ONEFORTYFOUR / (FALLBACK_NUM.THIRTYTHREE / FALLBACK_NUM.ELEVEN);
  const base = numerator / divisor;
  return Math.max(2, base);
}

function computeSafeFrame(width, height, outerStrokePx) {
  const padCandidate = CLEARSPACE_MIN_RATIO * Math.min(width, height);
  const pad = Math.max(padCandidate, CLEARSPACE_MIN_PX, outerStrokePx * STROKE_MULTIPLIER);
  return { x: pad, y: pad, w: width - 2 * pad, h: height - 2 * pad, pad };
}

function drawVesicaField(ctx, { safe, palette, NUM, outerStrokePx }) {
  const centerX = safe.x + safe.w / 2;
  const centerY = safe.y + safe.h / 2;
  const baseRadius = Math.min(safe.w, safe.h) * (NUM.NINE / NUM.THIRTYTHREE);
  const separation = baseRadius * (NUM.SEVEN / NUM.TWENTYTWO);
  const gridSpan = baseRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const strokeWidth = Math.min(outerStrokePx * 0.75, safe.pad / NUM.SEVEN);

  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = strokeWidth;

  const offsets = [
    { x: -separation, y: 0 },
    { x: separation, y: 0 },
    { x: 0, y: -separation },
    { x: 0, y: separation }
  ];
  offsets.forEach((offset) => {
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, baseRadius, { stroke: true });
  });

  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const scale = 1 + (i / (NUM.NINE + NUM.THREE));
    ctx.globalAlpha = 0.18 + i * 0.02;
    drawCircle(ctx, centerX, centerY, baseRadius * scale, { stroke: true });
  }

  const top = Math.max(safe.y, centerY - gridSpan);
  const bottom = Math.min(safe.y + safe.h, centerY + gridSpan);
  const left = Math.max(safe.x, centerX - gridSpan);
  const right = Math.min(safe.x + safe.w, centerX + gridSpan);
  const gridSteps = NUM.NINE;

  ctx.globalAlpha = 0.16;
  for (let i = -gridSteps; i <= gridSteps; i += 1) {
    const ratio = i / gridSteps;
    const x = centerX + ratio * (gridSpan * (NUM.ELEVEN / NUM.NINE));
    const clampedX = clamp(x, left, right);
    ctx.beginPath();
    ctx.moveTo(clampedX, top);
    ctx.lineTo(clampedX, bottom);
    ctx.stroke();

    const y = centerY + ratio * (gridSpan * (NUM.ELEVEN / NUM.NINE));
    const clampedY = clamp(y, top, bottom);
    ctx.beginPath();
    ctx.moveTo(left, clampedY);
    ctx.lineTo(right, clampedY);
    ctx.stroke();
function paintVesicaField(ctx, { width, height, palette, NUM }) {
  const radius = Math.min(width, height) * NUM.NINE / NUM.THIRTYTHREE;
  const centerX = width / 2;
  const centerY = height / 2;
  const axialOffset = radius / NUM.THREE;
  const circleCenters = [
    { x: centerX - axialOffset, y: centerY },
    { x: centerX + axialOffset, y: centerY },
    { x: centerX, y: centerY - axialOffset },
    { x: centerX, y: centerY + axialOffset }
  ];
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
function drawVesicaField(ctx, width, height, color, NUM) {
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE * NUM.NINE;
  const offset = baseRadius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Soft overlapping circles keep the vesica calm and sensory-safe.
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = color;
  drawCircle(ctx, centerX - offset, centerY, baseRadius, true, false);
  drawCircle(ctx, centerX + offset, centerY, baseRadius, true, false);

  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1.4, baseRadius / NUM.NINETYNINE * NUM.SEVEN);
  drawCircle(ctx, centerX - offset, centerY, baseRadius, false, true);
  drawCircle(ctx, centerX + offset, centerY, baseRadius, false, true);

  // Harmonic rings reference 3, 7, and 33 to suggest depth without motion.
  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const scale = 1 + i / (ringCount + NUM.THREE);
    ctx.globalAlpha = 0.18 + i * 0.02;
    drawCircle(ctx, centerX, centerY, baseRadius * scale, false, true);
  }

  // Vesica grid lines anchor the composition; low alpha keeps them gentle.
  ctx.globalAlpha = 0.16;
  const gridSteps = NUM.NINE;
  const gridSpan = baseRadius * (NUM.ELEVEN / NUM.NINE);
  for (let i = -gridSteps; i <= gridSteps; i += 1) {
    const t = i / gridSteps;
    const x = centerX + t * gridSpan;
    const y = centerY + t * gridSpan;
    ctx.beginPath();
    ctx.moveTo(x, centerY - gridSpan);
    ctx.lineTo(x, centerY + gridSpan);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX - gridSpan, y);
    ctx.lineTo(centerX + gridSpan, y);
    ctx.stroke();
  }

  ctx.save();
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = Math.max(1.25, radius / NUM.NINETYNINE * NUM.SEVEN);

  ctx.globalAlpha = 0.28;
  circleCenters.forEach((point) => {
    drawCircle(ctx, point.x, point.y, radius, { stroke: true });
  });

  // Harmonic rings reinforce depth without introducing motion.
  const ringTotal = NUM.SEVEN;
  for (let i = 1; i <= ringTotal; i += 1) {
    const ringRadius = radius * (1 + i / (ringTotal + NUM.THREE));
    ctx.globalAlpha = 0.12 + (i / (ringTotal + NUM.THREE)) * 0.2;
    drawCircle(ctx, centerX, centerY, ringRadius, { stroke: true });
  }

  // Vesica grid uses numerology-aligned spacing to keep symmetry calm.
  ctx.globalAlpha = 0.18;
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const offset = (i / steps) * gridExtent;
    drawLine(ctx, centerX + offset, centerY - gridExtent, centerX + offset, centerY + gridExtent);
    drawLine(ctx, centerX - gridExtent, centerY + offset, centerX + gridExtent, centerY + offset);
  }

  ctx.restore();
}

function paintTreeOfLife(ctx, width, height, palette, NUM) {
  const nodes = getTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const strokeWidth = Math.max(1.2, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE);
function drawTreeOfLife(ctx, { safe, palette, NUM, outerStrokePx }) {
  const nodes = computeTreeNodes(safe, NUM);
  const paths = computeTreePaths();

  const pathWidth = Math.min(outerStrokePx * 0.7, safe.pad / NUM.NINE);
  const nodeRadius = Math.min(outerStrokePx * 0.55, Math.min(safe.w, safe.h) / NUM.NINETYNINE * NUM.THREE);

  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = strokeWidth;
  paths.forEach(([startId, endId]) => {
    const start = nodes[startId];
    const end = nodes[endId];
function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = getTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const nodeRadius = Math.max(6, Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE));
  const haloRadius = nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const pathWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.SEVEN));

  ctx.save();
  ctx.globalAlpha = 0.6;
  const baseSize = Math.min(width, height);
  const pathWidth = Math.max(1.1, baseSize / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  const nodeRadius = Math.max(6, baseSize / NUM.NINETYNINE * NUM.THREE);

  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = pathWidth;
  paths.forEach(([from, to]) => {
function drawTreeOfLife(ctx, width, height, lineColor, nodeColor, NUM) {
  const nodes = createTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE * NUM.SEVEN);
  const strokeWidth = Math.max(1.4, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Paths are laid down first so luminous nodes do not create harsh crossings.
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = strokeWidth;
  for (let i = 0; i < paths.length; i += 1) {
    const [from, to] = paths[i];
  ctx.strokeStyle = palette.layers[1];
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
      continue;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

  // Nodes sit on top with gentle halos for focus without harsh contrast.
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = palette.ink;
  ctx.strokeStyle = palette.layers[1];
  const haloWidth = strokeWidth / NUM.THREE;
  const outlineWidth = strokeWidth / NUM.SEVEN;
  Object.values(nodes).forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.strokeStyle = palette.layers[5];
    ctx.lineWidth = haloWidth;
    ctx.globalAlpha = 0.55;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = palette.layers[1];
    ctx.lineWidth = outlineWidth;
    drawCircle(ctx, node.x, node.y, nodeRadius, { stroke: true });
  // Nodes rendered last for clarity with gentle halos.
  ctx.globalAlpha = 0.88;
  nodes.forEach((node) => {
    ctx.fillStyle = palette.ink;
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.strokeStyle = palette.layers[1];
    ctx.lineWidth = pathWidth / NUM.THREE;
    drawCircle(ctx, node.x, node.y, nodeRadius, { stroke: true });
    ctx.strokeStyle = palette.layers[5];
    ctx.globalAlpha = 0.4;
    drawCircle(ctx, node.x, node.y, haloRadius, { stroke: true });
    ctx.globalAlpha = 0.88;
  ctx.lineWidth = pathWidth;

  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodes[startId];
    const end = nodes[endId];
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.88;
  ctx.fillStyle = palette.ink;
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = Math.max(1, nodeRadius / NUM.THIRTYTHREE * NUM.THREE);

  const haloRadius = nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  nodes.list.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true, stroke: true });
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = palette.layers[5];
    drawCircle(ctx, node.x, node.y, haloRadius, { stroke: true });
    ctx.globalAlpha = 0.88;
    ctx.strokeStyle = palette.layers[1];

  // Nodes are rendered after paths for clarity and calm focus.
  ctx.globalAlpha = 0.9;
  Object.values(nodes).forEach((node) => {
    ctx.fillStyle = palette.ink;
    ctx.strokeStyle = palette.layers[1];
    ctx.lineWidth = pathWidth / NUM.THREE * NUM.SEVEN;
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true, stroke: true });

    ctx.globalAlpha = 0.48;
    ctx.strokeStyle = palette.layers[5];
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.9;
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
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1, strokeWidth / NUM.THREE);
  for (const node of Object.values(nodes)) {
    drawCircle(ctx, node.x, node.y, nodeRadius, true, true);
  }

  ctx.restore();
}

function paintFibonacciCurve(ctx, width, height, palette, NUM) {
function getTreeNodes(width, height, NUM) {
  const topMargin = height / NUM.TWENTYTWO * NUM.THREE;
  const span = height - topMargin * 2;
  const levelCount = NUM.SEVEN;
  const levelStep = span / levelCount;
  const centerX = width / 2;
  const horizontalSpread = width / NUM.THREE;
  const lateral = horizontalSpread / NUM.THREE;

  const layout = [
    { id: 'keter', level: 0, offset: 0 },
    { id: 'chokmah', level: 1, offset: 1 },
    { id: 'binah', level: 1, offset: -1 },
    { id: 'chesed', level: 2, offset: 1 },
    { id: 'gevurah', level: 2, offset: -1 },
    { id: 'tiferet', level: 3, offset: 0 },
    { id: 'netzach', level: 4, offset: 1 },
    { id: 'hod', level: 4, offset: -1 },
    { id: 'yesod', level: 5, offset: 0 },
    { id: 'malkuth', level: 6, offset: 0 }
  ];

  const nodes = {};
  layout.forEach((item) => {
    nodes[item.id] = {
      x: centerX + item.offset * lateral,
      y: topMargin + item.level * levelStep
    };
  });
  return nodes;
}

function getTreePaths() {
function computeTreeNodes(safe, NUM) {
  const marginX = safe.w / NUM.ELEVEN;
  const marginY = safe.h / NUM.THIRTYTHREE;
  const spanX = safe.w - marginX * 2;
  const spanY = safe.h - marginY * 2;
  const verticalSteps = NUM.SEVEN;

  const layout = [
    { id: 'keter', u: 0.5, level: 0 },
    { id: 'chokmah', u: 0.72, level: 1 },
    { id: 'binah', u: 0.28, level: 1 },
    { id: 'chesed', u: 0.72, level: 2 },
    { id: 'gevurah', u: 0.28, level: 2 },
    { id: 'tiferet', u: 0.5, level: 3 },
    { id: 'netzach', u: 0.72, level: 4 },
    { id: 'hod', u: 0.28, level: 4 },
    { id: 'yesod', u: 0.5, level: 5 },
    { id: 'malkuth', u: 0.5, level: 6 }
  ];

  const nodes = {};
  const list = [];
  layout.forEach((entry) => {
    const yRatio = entry.level / verticalSteps;
    const x = clamp(safe.x + marginX + spanX * entry.u, safe.x + marginX, safe.x + safe.w - marginX);
    const y = clamp(safe.y + marginY + spanY * yRatio, safe.y + marginY, safe.y + safe.h - marginY);
    const node = { id: entry.id, x, y };
    nodes[entry.id] = node;
    list.push(node);
  });

  nodes.list = list;
  return nodes;
}

function computeTreePaths() {
  return [
    ['keter', 'chokmah'],
    ['keter', 'binah'],
    ['keter', 'tiferet'],
    ['chokmah', 'binah'],
    ['chokmah', 'chesed'],
    ['chokmah', 'tiferet'],
    ['binah', 'gevurah'],
    ['binah', 'tiferet'],
    ['chesed', 'gevurah'],
    ['chesed', 'tiferet'],
    ['chesed', 'netzach'],
    ['gevurah', 'tiferet'],
    ['gevurah', 'hod'],
    ['tiferet', 'netzach'],
    ['tiferet', 'hod'],
    ['tiferet', 'yesod'],
    ['netzach', 'hod'],
    ['netzach', 'yesod'],
    ['hod', 'yesod'],
    ['netzach', 'malkuth'],
    ['hod', 'malkuth'],
    ['yesod', 'malkuth']
  ];
}

function paintFibonacciCurve(ctx, { width, height, palette, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const minDim = Math.min(width, height);
  const maxRadius = minDim / (NUM.THREE / (NUM.NINE / NUM.SEVEN));
function drawFibonacciCurve(ctx, { width, height, strokeColor, markerColor, NUM }) {
function drawFibonacciCurve(ctx, { width, height, curveColor, markerColor, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN);

  ctx.save();
  // Spiral is traced once; no animation loops to preserve ND-safe stillness.
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.74;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.NINETYNINE * NUM.SEVEN);
  const steps = NUM.TWENTYTWO;
  const growthSteps = NUM.SEVEN;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, growthSteps);

  ctx.save();
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.74;
  ctx.lineWidth = Math.max(1.2, minDim / (NUM.ONEFORTYFOUR / NUM.THREE));
  ctx.beginPath();

  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t);
function drawFibonacciCurve(ctx, { safe, palette, NUM, outerStrokePx }) {
  const centerX = safe.x + safe.w / 2;
  const centerY = safe.y + safe.h / 2;
  const maxRadius = Math.min(safe.w, safe.h) * (NUM.NINETYNINE / (NUM.ONEFORTYFOUR + NUM.NINETYNINE));
  const growthSteps = NUM.SEVEN;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const samples = NUM.TWENTYTWO;
  const startRadius = maxRadius / Math.pow(GOLDEN_RATIO, growthSteps);
  const strokeWidth = Math.min(outerStrokePx * 0.6, safe.pad / NUM.ELEVEN);

  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = strokeWidth;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN);

  ctx.save();
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.72;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.SEVEN);
  ctx.beginPath();

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(GOLDEN_RATIO, growthSteps * t);
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t);
  const turns = NUM.NINE / NUM.THREE; // three calm turns
  const maxRadius = Math.min(width, height) / (NUM.THREE + NUM.SEVEN / NUM.ELEVEN);
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN / NUM.THREE);
  const centerX = width * 0.34;
  const centerY = height * 0.6;

  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.globalAlpha = 0.72;
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
    const angle = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t / NUM.THREE);
function drawFibonacciCurve(ctx, width, height, color, NUM) {
  const centerX = width / 2;
  const centerY = height / 2;
  const phi = (1 + Math.sqrt(5)) / 2;
  const rotations = NUM.ELEVEN / NUM.THREE; // ~3.66 turns for calm flow.
  const segments = NUM.NINETYNINE;
  const growthSteps = NUM.SEVEN;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, growthSteps);

  ctx.save();
  ctx.globalAlpha = 0.74;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineWidth = Math.max(1.3, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.beginPath();

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
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
  ctx.restore();
}

function paintHelixLattice(ctx, width, height, palette, NUM) {
  const sampleCount = NUM.ONEFORTYFOUR;
  const top = height / NUM.TWENTYTWO * NUM.THREE;
  const bottom = height - top;
  const span = bottom - top;
  const centerX = width / 2;
  const amplitude = (width / NUM.THREE) * (NUM.SEVEN / NUM.ELEVEN);
  const strandA = [];
  const strandB = [];

  // 144 samples per strand (NUM.ONEFORTYFOUR) keep the lattice detailed yet static.

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / (sampleCount - 1);
    const y = top + span * t;
    const angle = t * Math.PI * (NUM.ELEVEN / NUM.THREE);

  const markerCount = NUM.NINE;
  const markerRadius = Math.min(strokeWidth * 0.9, safe.pad / NUM.THIRTYTHREE * NUM.THREE);
  ctx.fillStyle = palette.layers[2];
  ctx.globalAlpha = 0.45;
  // Small markers stabilise focus without animation pulses.
  const markerCount = NUM.NINE;
  const markerRadius = Math.max(3, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.globalAlpha = 0.52;
  ctx.fillStyle = color;
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(GOLDEN_RATIO, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    drawCircle(ctx, x, y, markerRadius, { fill: true });
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
    drawCircle(ctx, x, y, markerRadius, true, false);
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

function drawHelixLattice(ctx, { safe, palette, NUM, outerStrokePx }) {
  const steps = NUM.ONEFORTYFOUR;
  const frequency = NUM.THREE;
  const centerX = safe.x + safe.w / 2;
  const topY = safe.y;
  const amplitude = Math.min(safe.w / (NUM.NINE + NUM.SEVEN), safe.w / 6);
  const strandWidth = Math.min(outerStrokePx * 0.66, safe.pad / NUM.NINE);

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * Math.PI * 2 * frequency;
    const y = topY + safe.h * t;
  ctx.restore();
}

function paintHelixLattice(ctx, { width, height, palette, NUM }) {
  const samples = Math.max(NUM.ONEFORTYFOUR, 2);
  const topMargin = height / NUM.ELEVEN;
  const bottomMargin = height / NUM.ELEVEN;
  const verticalSpan = height - topMargin - bottomMargin;
  const amplitude = Math.min(width / NUM.SEVEN, width / NUM.THIRTYTHREE * NUM.ELEVEN / NUM.NINE);
  const turns = NUM.THIRTYTHREE / NUM.ELEVEN;
  const centerX = width / 2;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + verticalSpan * t;
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    strandA.push({ x: xA, y });
    strandB.push({ x: xB, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.82;
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = Math.max(1.1, width / (NUM.ONEFORTYFOUR * NUM.SEVEN));
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = palette.layers[4];
  drawPolyline(ctx, strandB);

  ctx.globalAlpha = 0.38;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(0.8, width / (NUM.ONEFORTYFOUR * NUM.ELEVEN));
  const rungStep = Math.max(1, Math.floor(sampleCount / NUM.TWENTYTWO));
  for (let i = 0; i < sampleCount; i += rungStep) {
    const start = strandA[i];
    const end = strandB[i];
    drawLine(ctx, start.x, start.y, end.x, end.y);
  }

  // Strand anchors use small nodes to echo the Tree-of-Life layer.
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = palette.ink;
  const endRadius = Math.max(4, width / NUM.ONEFORTYFOUR);
  [strandA[0], strandB[0], strandA[strandA.length - 1], strandB[strandB.length - 1]].forEach((point) => {
    drawCircle(ctx, point.x, point.y, endRadius, { fill: true });
  });

  ctx.restore();
}

function getTreeNodes(width, height, NUM) {
  const topMargin = height / NUM.TWENTYTWO * NUM.THREE;
  const bottomMargin = height - topMargin;
  const verticalSpan = bottomMargin - topMargin;
  const step = verticalSpan / NUM.SEVEN;
  const centerX = width / 2;
  const lateral = width / NUM.THREE;
  const offsetX = lateral / NUM.THREE;

  return {
    keter: { x: centerX, y: topMargin },
    chokmah: { x: centerX + offsetX, y: topMargin + step },
    binah: { x: centerX - offsetX, y: topMargin + step },
    chesed: { x: centerX + offsetX, y: topMargin + step * 2 },
    gevurah: { x: centerX - offsetX, y: topMargin + step * 2 },
    tiferet: { x: centerX, y: topMargin + step * 3 },
    netzach: { x: centerX + offsetX, y: topMargin + step * 4 },
    hod: { x: centerX - offsetX, y: topMargin + step * 4 },
    yesod: { x: centerX, y: topMargin + step * 5 },
    malkuth: { x: centerX, y: topMargin + step * 6 }
  };
}

function getTreePaths() {
  return [
    ["keter", "chokmah"],
    ["keter", "binah"],
    ["keter", "tiferet"],
    ["chokmah", "binah"],
    ["chokmah", "chesed"],
    ["chokmah", "tiferet"],
    ["binah", "gevurah"],
    ["binah", "tiferet"],
    ["chesed", "gevurah"],
    ["chesed", "tiferet"],
    ["chesed", "netzach"],
    ["gevurah", "tiferet"],
    ["gevurah", "hod"],
    ["tiferet", "netzach"],
    ["tiferet", "hod"],
    ["tiferet", "yesod"],
    ["netzach", "hod"],
    ["netzach", "yesod"],
    ["hod", "yesod"],
    ["netzach", "malkuth"],
    ["hod", "malkuth"],
    ["yesod", "malkuth"]
  ];
}

function drawCircle(ctx, x, y, radius, modes) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (modes && modes.fill) {
    ctx.fill();
  }
  if (modes && modes.stroke) {
function paintHelixLattice(ctx, { width, height, palette, NUM }) {
  const minDim = Math.min(width, height);
  const spanX = width * (NUM.NINE / NUM.ELEVEN);
  const marginX = (width - spanX) / 2;
  const centerY = height / 2;
  const amplitude = minDim / (NUM.SEVEN + NUM.THREE / NUM.ELEVEN);
  const samples = NUM.ONEFORTYFOUR;
  const strandALines = [];
  const strandBLines = [];

  ctx.save();
  ctx.lineWidth = Math.max(1.1, minDim / (NUM.ONEFORTYFOUR / NUM.SEVEN));
  ctx.globalAlpha = 0.82;

  for (let i = 0; i < samples; i += 1) {
    const t = samples === 1 ? 0 : i / (samples - 1);
    const x = marginX + spanX * t;
    const phase = Math.PI * (NUM.NINE / NUM.THREE) * t;
    const yA = centerY + Math.sin(phase) * amplitude;
    const yB = centerY + Math.sin(phase + Math.PI) * amplitude;
    strandALines.push({ x, y: yA });
    strandBLines.push({ x, y: yB });
  }

  ctx.strokeStyle = palette.layers[3];
  drawPolyline(ctx, strandALines);

  ctx.strokeStyle = palette.layers[4];
  drawPolyline(ctx, strandBLines);

  // Static rungs bind the strands; spacing uses numerology counts to avoid visual noise.
  ctx.strokeStyle = palette.layers[5];
  ctx.globalAlpha = 0.46;
  const rungStep = Math.max(1, Math.floor(samples / NUM.THIRTYTHREE));
  for (let i = 0; i < samples; i += rungStep) {
    const a = strandALines[i];
    const b = strandBLines[i];
  }

  ctx.save();
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = strandWidth;

  ctx.save();
  ctx.lineWidth = Math.max(1.1, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = palette.layers[3];
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[4];
  drawPolyline(ctx, strandB);

  const rungInterval = Math.max(2, Math.floor(steps / NUM.THIRTYTHREE));
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.min(outerStrokePx * 0.5, safe.pad / NUM.ELEVEN);
  for (let i = 0; i <= steps; i += rungInterval) {
  // Rungs sampled every few points to hint at lattice depth without clutter.
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.layers[5];
  const rungStep = Math.max(1, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < samples; i += rungStep) {
function drawHelixLattice(ctx, width, height, strandAColor, strandBColor, rungColor, NUM) {
  const topMargin = height / NUM.ELEVEN;
  const helixHeight = height - topMargin * 2;
  const centerX = width / 2;
  const amplitude = width / NUM.NINE;
  const samples = NUM.ONEFORTYFOUR;
  const turns = NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + helixHeight * t;
    const offset = Math.sin(angle) * amplitude;
    strandA.push({ x: centerX + offset, y });
    strandB.push({ x: centerX + Math.sin(angle + Math.PI) * amplitude, y });
  }

  const baseLineWidth = Math.max(1.2, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.globalAlpha = 0.78;
  ctx.strokeStyle = strandAColor;
  ctx.lineWidth = baseLineWidth;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = strandBColor;
  drawPolyline(ctx, strandB);

  // Cross rungs reference 33 divisions to imply lattice structure.
  const interval = Math.max(2, Math.floor(samples / NUM.THIRTYTHREE));
  ctx.globalAlpha = 0.46;
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = baseLineWidth * 0.66;
  for (let i = 0; i <= samples; i += interval) {
    const a = strandA[i];
    const b = strandB[i];
    if (a && b) {
      drawLine(ctx, a.x, a.y, b.x, b.y);
    if (!a || !b) {
      continue;
    }
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  // Endcaps provide grounding without motion.
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = palette.layers[3];
  drawCircle(ctx, strandALines[0].x, strandALines[0].y, minDim / NUM.ONEFORTYFOUR * NUM.THREE, { stroke: true });
  ctx.strokeStyle = palette.layers[4];
  drawCircle(ctx, strandBLines[strandBLines.length - 1].x, strandBLines[strandBLines.length - 1].y, minDim / NUM.ONEFORTYFOUR * NUM.THREE, { stroke: true });

  ctx.restore();
}

function drawCircle(ctx, x, y, radius, { fill = false, stroke = false } = {}) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) {
function drawSafeFrameOverlay(ctx, safe) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 208, 64, 0.7)';
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(safe.x, safe.y, safe.w, safe.h);
  ctx.restore();
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
function createTreeNodes(width, height, NUM) {
  const marginX = width / NUM.NINETYNINE * NUM.ELEVEN;
  const marginY = height / NUM.NINETYNINE * NUM.ELEVEN;
  const usableWidth = width - marginX * 2;
  const usableHeight = height - marginY * 2;
  const layout = [
    { id: 'keter', u: 0.5, v: 0.04 },
    { id: 'chokmah', u: 0.72, v: 0.18 },
    { id: 'binah', u: 0.28, v: 0.18 },
    { id: 'chesed', u: 0.74, v: 0.32 },
    { id: 'gevurah', u: 0.26, v: 0.32 },
    { id: 'tiferet', u: 0.5, v: 0.48 },
    { id: 'netzach', u: 0.68, v: 0.64 },
    { id: 'hod', u: 0.32, v: 0.64 },
    { id: 'yesod', u: 0.5, v: 0.8 },
    { id: 'malkuth', u: 0.5, v: 0.94 }
  ];

  const nodes = {};
  for (let i = 0; i < layout.length; i += 1) {
    const entry = layout[i];
    nodes[entry.id] = {
      x: marginX + entry.u * usableWidth,
      y: marginY + entry.v * usableHeight
    };
  }
  return nodes;
}

function getTreePaths() {
  return [
    ['keter', 'chokmah'],
    ['keter', 'binah'],
    ['keter', 'tiferet'],
    ['chokmah', 'binah'],
    ['chokmah', 'chesed'],
    ['chokmah', 'tiferet'],
    ['binah', 'gevurah'],
    ['binah', 'tiferet'],
    ['chesed', 'gevurah'],
    ['chesed', 'tiferet'],
    ['chesed', 'netzach'],
    ['gevurah', 'tiferet'],
    ['gevurah', 'hod'],
    ['tiferet', 'netzach'],
    ['tiferet', 'hod'],
    ['tiferet', 'yesod'],
    ['netzach', 'hod'],
    ['netzach', 'yesod'],
    ['hod', 'yesod'],
    ['netzach', 'malkuth'],
    ['hod', 'malkuth'],
    ['yesod', 'malkuth']
  ];
}

function drawCircle(ctx, cx, cy, radius, fill, stroke) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
function drawCircle(ctx, x, y, radius, options = {}) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (options.fill) {
    ctx.fill();
  }
  if (options.stroke) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawPolyline(ctx, points) {
  if (!points || points.length === 0) {
function drawPolyline(ctx, points) {
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildProvenance({ width, height, safe, outerStrokePx }) {
  const aspectValue = width / height;
  const phiDelta = Math.abs(aspectValue - GOLDEN_RATIO);
  const aspect = phiDelta < 0.02 ? 'phi' : Number(aspectValue.toFixed(3));
  return {
    render: {
      canvas: { w: width, h: height, aspect, aspect_value: Number(aspectValue.toFixed(6)) },
      clearspace_px: safe.pad,
      safe_frame: { x: safe.x, y: safe.y, w: safe.w, h: safe.h }
    },
    policy: {
      clearspace_min_ratio: CLEARSPACE_MIN_RATIO,
      clearspace_min_px: CLEARSPACE_MIN_PX,
      stroke_multiplier: STROKE_MULTIPLIER,
      padding_law: 'v1.0',
      outer_stroke_px: Number(outerStrokePx.toFixed(3))
    }
  };
}

export { computeSafeFrame };
function getTreeNodes({ width, height, NUM }) {
  const centerX = width / 2;
  const topMargin = height / NUM.ELEVEN;
  const bottomMargin = height / NUM.ELEVEN;
  const verticalSpan = height - topMargin - bottomMargin;
  const verticalStep = verticalSpan / (NUM.SEVEN - 1);
  const offsetMinor = width / NUM.NINE;
  const offsetMajor = width / NUM.SEVEN;

  return {
    keter: { x: centerX, y: topMargin },
    chokmah: { x: centerX + offsetMinor, y: topMargin + verticalStep },
    binah: { x: centerX - offsetMinor, y: topMargin + verticalStep },
    chesed: { x: centerX + offsetMajor, y: topMargin + verticalStep * 2 },
    gevurah: { x: centerX - offsetMajor, y: topMargin + verticalStep * 2 },
    tiferet: { x: centerX, y: topMargin + verticalStep * 3 },
    netzach: { x: centerX + offsetMajor, y: topMargin + verticalStep * 4 },
    hod: { x: centerX - offsetMajor, y: topMargin + verticalStep * 4 },
    yesod: { x: centerX, y: topMargin + verticalStep * 5 },
    malkuth: { x: centerX, y: topMargin + verticalStep * 6 }
  };
}

function getTreePaths() {
  return [
    ["keter", "chokmah"],
    ["keter", "binah"],
    ["keter", "tiferet"],
    ["chokmah", "binah"],
    ["chokmah", "chesed"],
    ["chokmah", "tiferet"],
    ["binah", "gevurah"],
    ["binah", "tiferet"],
    ["chesed", "gevurah"],
    ["chesed", "tiferet"],
    ["chesed", "netzach"],
    ["gevurah", "tiferet"],
    ["gevurah", "hod"],
    ["tiferet", "netzach"],
    ["tiferet", "hod"],
    ["tiferet", "yesod"],
    ["netzach", "hod"],
    ["netzach", "yesod"],
    ["hod", "yesod"],
    ["netzach", "malkuth"],
    ["hod", "malkuth"],
    ["yesod", "malkuth"]
  ];
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function isValidColor(value) {
  return typeof value === "string" && value.trim().length > 0;
}
