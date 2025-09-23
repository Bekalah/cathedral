/*
  helix-renderer.mjs
  Static ND-safe renderer for the Cosmic Helix layers.

  Layer order preserves calm depth:
    1. Vesica field establishes the grounding lattice.
    2. Tree-of-Life scaffold links nodes for narrative structure.
    3. Fibonacci curve adds phi-driven flow without animation.
    4. Double-helix lattice brings vertical resonance with 144 samples.

  Every helper is a small pure function so the renderer stays deterministic.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
});

const DEFAULT_NUMERLOGY = Object.freeze({
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
    return;
  }

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
}

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

function normaliseNumerology(input) {
  if (!input) {
    return DEFAULT_NUMERLOGY;
  }
  const result = {};
  for (const key of Object.keys(DEFAULT_NUMERLOGY)) {
    result[key] = Number.isFinite(input[key]) ? input[key] : DEFAULT_NUMERLOGY[key];
  }
  return result;
}

function paintBackground(ctx, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

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

  ctx.restore();
}

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
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.92;
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1, strokeWidth / NUM.THREE);
  for (const node of Object.values(nodes)) {
    drawCircle(ctx, node.x, node.y, nodeRadius, true, true);
  }

  ctx.restore();
}

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
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();

  // Small markers stabilise focus without animation pulses.
  const markerCount = NUM.NINE;
  const markerRadius = Math.max(3, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.globalAlpha = 0.52;
  ctx.fillStyle = color;
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    drawCircle(ctx, x, y, markerRadius, true, false);
  }

  ctx.restore();
}

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
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}
