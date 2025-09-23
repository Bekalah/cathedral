/*
  helix-renderer.mjs
  Static ND-safe renderer for layered sacred geometry.

  Layer sequence (outer to inner):
    1. Vesica field
    2. Tree-of-Life scaffold
    3. Fibonacci curve
    4. Double helix lattice

  Each helper is a small pure function so edits remain deterministic and
  append-only. No animation loops are introduced anywhere in this file.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
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

export function renderHelix(ctx, config = {}) {
  if (!ctx) {
    return;
  }

  const width = normaliseDimension(config.width, ctx.canvas.width || 1440);
  const height = normaliseDimension(config.height, ctx.canvas.height || 900);
  const palette = normalisePalette(config.palette);
  const NUM = normaliseNumerology(config.NUM);

  ctx.save();
  configureContext(ctx);
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  fillBackground(ctx, width, height, palette.bg);

  drawVesicaField(ctx, { width, height, color: palette.layers[0], NUM });
  drawTreeOfLife(ctx, {
    width,
    height,
    strokeColor: palette.layers[1],
    nodeColor: palette.ink,
    haloColor: palette.layers[5],
    NUM
  });
  drawFibonacciCurve(ctx, { width, height, color: palette.layers[2], NUM });
  drawHelixLattice(ctx, {
    width,
    height,
    strandAColor: palette.layers[3],
    strandBColor: palette.layers[4],
    rungColor: palette.layers[5],
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

function normaliseNumerology(NUM) {
  if (!NUM) {
    return DEFAULT_NUM;
  }
  const merged = {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    merged[key] = Number.isFinite(NUM[key]) ? NUM[key] : DEFAULT_NUM[key];
  }
  return merged;
}

function configureContext(ctx) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

function fillBackground(ctx, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function drawVesicaField(ctx, { width, height, color, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * (NUM.NINE / NUM.THREE);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.32;
  ctx.lineWidth = Math.max(1.25, radius / NUM.NINETYNINE * NUM.SEVEN);

  const offsets = [
    { x: -radius / NUM.THREE, y: 0 },
    { x: radius / NUM.THREE, y: 0 },
    { x: 0, y: -radius / NUM.THREE },
    { x: 0, y: radius / NUM.THREE }
  ];
  offsets.forEach((offset) => {
    drawCircleOutline(ctx, centerX + offset.x, centerY + offset.y, radius);
  });

  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = radius * (1 + i / (ringCount + NUM.THREE));
    ctx.globalAlpha = 0.18;
    drawCircleOutline(ctx, centerX, centerY, ringRadius);
  }

  ctx.globalAlpha = 0.14;
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const offset = (i / steps) * gridExtent;
    drawLine(ctx, centerX + offset, centerY - gridExtent, centerX + offset, centerY + gridExtent);
    drawLine(ctx, centerX - gridExtent, centerY + offset, centerX + gridExtent, centerY + offset);
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, { width, height, strokeColor, nodeColor, haloColor, NUM }) {
  const nodes = computeTreeNodes(width, height, NUM);
  const paths = computeTreePaths();
  const strokeWidth = Math.max(1.2, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE * (NUM.THREE / NUM.SEVEN));

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      return;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

  ctx.globalAlpha = 0.92;
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = haloColor;
  ctx.lineWidth = strokeWidth / NUM.THREE;
  Object.values(nodes).forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.globalAlpha = 0.55;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.92;
  });

  ctx.restore();
}

function drawFibonacciCurve(ctx, { width, height, color, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const rotations = NUM.ELEVEN / NUM.THREE; // 3.66 turns keeps motion implied yet static.
  const growth = NUM.SEVEN;
  const startRadius = maxRadius / Math.pow(phi, growth);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growth * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandAColor, strandBColor, rungColor, NUM }) {
  const sampleCount = NUM.ONEFORTYFOUR;
  const marginY = height / NUM.ELEVEN;
  const spanY = height - marginY * 2;
  const centerX = width / 2;
  const amplitude = Math.min(width / NUM.THREE, width / NUM.SEVEN);
  const phaseShift = Math.PI / NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / (sampleCount - 1);
    const angle = t * Math.PI * NUM.THIRTYTHREE / NUM.ELEVEN;
    const y = marginY + spanY * t;
    strandA.push({ x: centerX + Math.sin(angle) * amplitude, y });
    strandB.push({ x: centerX - Math.sin(angle + phaseShift) * amplitude, y });
  }

  ctx.save();
  ctx.lineWidth = Math.max(1.2, width / NUM.ONEFORTYFOUR);

  ctx.strokeStyle = strandAColor;
  drawPolyline(ctx, strandA);

  ctx.strokeStyle = strandBColor;
  drawPolyline(ctx, strandB);

  ctx.strokeStyle = rungColor;
  ctx.globalAlpha = 0.4;
  const rungStep = Math.max(1, Math.floor(sampleCount / NUM.TWENTYTWO));
  for (let i = 0; i < sampleCount; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    if (!a || !b) {
      continue;
    }
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.restore();
}

function drawCircleOutline(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawCircle(ctx, x, y, radius, mode) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (mode && mode.fill) {
    ctx.fill();
  }
  if (mode && mode.stroke) {
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
  if (!Array.isArray(points) || points.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

function computeTreeNodes(width, height, NUM) {
  const topMargin = height / NUM.TWENTYTWO * NUM.THREE;
  const verticalSpan = height - topMargin * 2;
  const verticalStep = verticalSpan / NUM.SEVEN;
  const lateralSpread = width / NUM.THREE;
  const centerX = width / 2;

  return {
    keter: { x: centerX, y: topMargin },
    chokmah: { x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep },
    binah: { x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep },
    chesed: { x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep * 2 },
    gevurah: { x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep * 2 },
    tiferet: { x: centerX, y: topMargin + verticalStep * 3 },
    netzach: { x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep * 4 },
    hod: { x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep * 4 },
    yesod: { x: centerX, y: topMargin + verticalStep * 5 },
    malkuth: { x: centerX, y: topMargin + verticalStep * 6 }
  };
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
