/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

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
    return null;
  }

  const width = Math.max(1, Math.floor(options.width ?? ctx.canvas.width ?? 1440));
  const height = Math.max(1, Math.floor(options.height ?? ctx.canvas.height ?? 900));
  const palette = normalisePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);
  const debugOverlay = Boolean(options.debugOverlay);

  const outerStrokePx = computeOuterStroke(width, height);
  const safe = computeSafeFrame(width, height, outerStrokePx);

  ctx.save();
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

  ctx.restore();

  return buildProvenance({ width, height, safe, outerStrokePx });
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
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, { safe, palette, NUM, outerStrokePx }) {
  const nodes = computeTreeNodes(safe, NUM);
  const paths = computeTreePaths();

  const pathWidth = Math.min(outerStrokePx * 0.7, safe.pad / NUM.NINE);
  const nodeRadius = Math.min(outerStrokePx * 0.55, Math.min(safe.w, safe.h) / NUM.NINETYNINE * NUM.THREE);

  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = palette.layers[1];
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
  });

  ctx.restore();
}

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
  ctx.beginPath();

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(GOLDEN_RATIO, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  const markerCount = NUM.NINE;
  const markerRadius = Math.min(strokeWidth * 0.9, safe.pad / NUM.THIRTYTHREE * NUM.THREE);
  ctx.fillStyle = palette.layers[2];
  ctx.globalAlpha = 0.45;
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(GOLDEN_RATIO, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
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
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    strandA.push({ x: xA, y });
    strandB.push({ x: xB, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = strandWidth;
  ctx.strokeStyle = palette.layers[3];
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[4];
  drawPolyline(ctx, strandB);

  const rungInterval = Math.max(2, Math.floor(steps / NUM.THIRTYTHREE));
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.min(outerStrokePx * 0.5, safe.pad / NUM.ELEVEN);
  for (let i = 0; i <= steps; i += rungInterval) {
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

function drawSafeFrameOverlay(ctx, safe) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 208, 64, 0.7)';
  ctx.lineWidth = 1;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(safe.x, safe.y, safe.w, safe.h);
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
