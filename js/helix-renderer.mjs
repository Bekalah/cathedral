/*
  helix-renderer.mjs
  Static renderer that respects ND-safe guidance: no motion, layered geometry, and clear comments explaining why.

  Layer order preserves calm depth:
    1. Vesica field (foundation lattice)
    2. Tree-of-Life scaffold (nodes and paths)
    3. Fibonacci curve (log spiral polyline)
    4. Double-helix lattice (mirrored strands with static rungs)

  Each helper is a pure function fed only through arguments. No globals, no hidden state, no animation loops.
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
    return { ok: false, reason: 'no-context', palette: FALLBACK_PALETTE, NUM: FALLBACK_NUM };
  }

  const width = sanitiseDimension(options.width, ctx.canvas.width || 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height || 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  ctx.save();
  prepareCanvas(ctx, width, height, palette.bg);

  const shared = { width, height, palette, NUM };

  paintVesicaField(ctx, shared);
  paintTreeOfLife(ctx, shared);
  paintFibonacciCurve(ctx, shared);
  paintHelixLattice(ctx, shared);

  ctx.restore();
  return { ok: true, palette, NUM };
}

function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 1;
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
  }

  ctx.restore();
}

function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = getTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const nodeRadius = Math.max(6, Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE));
  const haloRadius = nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const pathWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.SEVEN));

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = pathWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      return;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

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
  });

  ctx.restore();
}

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
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const growthSteps = NUM.SEVEN;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, growthSteps);

  ctx.save();
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.74;
  ctx.lineWidth = Math.max(1.2, minDim / (NUM.ONEFORTYFOUR / NUM.THREE));
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growthSteps * t);
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
