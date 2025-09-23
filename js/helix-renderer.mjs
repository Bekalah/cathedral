/*
  helix-renderer.mjs
  Static renderer for layered cosmology scenes.
  ND-safe choices:
    - All geometry rendered once (no animation) to honour sensory safety.
    - Palette hues remain soft but high contrast for AA+ legibility.
    - Layer order preserves depth: Vesica field, Tree-of-Life, Fibonacci curve, helix lattice.
*/

export function renderHelix(ctx, config) {
  const { width, height, palette, NUM } = config;
  const layers = Array.isArray(palette.layers) ? palette.layers : [];
  const resolvedLayers = ensureLayerPalette(layers);

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.bg ? palette.bg : "#0b0b12";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  drawVesicaField(ctx, width, height, resolvedLayers[0], NUM);
  drawTreeOfLife(ctx, width, height, {
    line: resolvedLayers[1],
    node: palette.ink ? palette.ink : "#f0f0ff"
  }, NUM);
  drawFibonacciCurve(ctx, width, height, resolvedLayers[2], NUM);
  drawHelixLattice(ctx, width, height, {
    strandA: resolvedLayers[3],
    strandB: resolvedLayers[4],
    rungs: resolvedLayers[5]
  }, NUM);
}

function ensureLayerPalette(layers) {
  if (layers.length >= 6) {
    return layers.slice(0, 6);
  }
  const fallback = [
    "#6d7bff",
    "#4ed4c8",
    "#f5c66f",
    "#ff92d0",
    "#d4a9ff",
    "#f7f7ff"
  ];
  return fallback;
}

function drawVesicaField(ctx, width, height, color, NUM) {
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE * (NUM.NINE / NUM.THREE);
  const centerX = width / 2;
  const centerY = height / 2;
  const offsets = [
    { x: -baseRadius * 0.6, y: 0 },
    { x: baseRadius * 0.6, y: 0 },
    { x: 0, y: -baseRadius * 0.7 },
    { x: 0, y: baseRadius * 0.7 }
  ];

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = Math.max(1, baseRadius / NUM.NINETYNINE * NUM.SEVEN);
  ctx.strokeStyle = color;

  for (let i = 0; i < offsets.length; i += 1) {
    const offset = offsets[i];
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, baseRadius);
  }

  const gridCount = NUM.THREE;
  const spacing = baseRadius / (gridCount + 1);
  for (let gx = -gridCount; gx <= gridCount; gx += 1) {
    for (let gy = -gridCount; gy <= gridCount; gy += 1) {
      if (gx === 0 && gy === 0) {
        continue;
      }
      const radius = baseRadius * 0.45;
      drawCircle(ctx, centerX + gx * spacing * NUM.SEVEN / NUM.NINE, centerY + gy * spacing * NUM.SEVEN / NUM.NINE, radius);
    }
  }

  ctx.restore();
}

function drawCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawTreeOfLife(ctx, width, height, colors, NUM) {
  const verticalMargin = height / NUM.TWENTYTWO;
  const verticalStep = (height - verticalMargin * 2) / (NUM.SEVEN);
  const columnOffset = width / NUM.THREE;
  const centerX = width / 2;

  const nodes = [
    { id: "keter", x: centerX, y: verticalMargin },
    { id: "chokmah", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep },
    { id: "binah", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep },
    { id: "chesed", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep * 2 },
    { id: "gevurah", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep * 2 },
    { id: "tiferet", x: centerX, y: verticalMargin + verticalStep * 3 },
    { id: "netzach", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep * 4 },
    { id: "hod", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep * 4 },
    { id: "yesod", x: centerX, y: verticalMargin + verticalStep * 5 },
    { id: "malkuth", x: centerX, y: verticalMargin + verticalStep * 6 }
  ];

  const nodeById = new Map();
  for (let i = 0; i < nodes.length; i += 1) {
    nodeById.set(nodes[i].id, nodes[i]);
  }

  const paths = [
    ["keter", "chokmah"],
    ["keter", "binah"],
    ["keter", "tiferet"],
    ["chokmah", "binah"],
    ["chokmah", "tiferet"],
    ["chokmah", "chesed"],
    ["binah", "tiferet"],
    ["binah", "gevurah"],
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

  ctx.save();
  ctx.strokeStyle = colors.line;
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);
  ctx.globalAlpha = 0.65;
  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodeById.get(startId);
    const end = nodeById.get(endId);
    if (!start || !end) {
      continue;
    }
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
  }

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = colors.node;
  const nodeRadius = Math.max(6, width / NUM.NINETYNINE);
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFibonacciCurve(ctx, width, height, color, NUM) {
  const centerX = width / NUM.THREE;
  const centerY = height * 0.5;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const quarterTurns = NUM.NINE / NUM.THREE;
  const totalTheta = quarterTurns * Math.PI * 2;
  const growthRate = Math.log(goldenRatio) / (Math.PI / 2);
  const startRadius = Math.min(width, height) / NUM.NINETYNINE * NUM.NINE;
  const steps = NUM.TWENTYTWO;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, width / NUM.ONEFORTYFOUR);
  ctx.globalAlpha = 0.85;
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = totalTheta * (i / steps);
    const radius = startRadius * Math.exp(growthRate * t);
    const x = centerX + radius * Math.cos(t);
    const y = centerY + radius * Math.sin(t);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.restore();
}

function drawHelixLattice(ctx, width, height, colors, NUM) {
  const midY = height * 0.5;
  const amplitude = height / NUM.THIRTYTHREE * NUM.SEVEN;
  const sampleCount = NUM.ONEFORTYFOUR;
  const frequency = NUM.THREE;
  const rungInterval = Math.floor(sampleCount / NUM.TWENTYTWO);

  const strandA = [];
  const strandB = [];

  for (let i = 0; i <= sampleCount; i += 1) {
    const t = i / sampleCount;
    const theta = t * Math.PI * frequency * 2;
    const x = t * width;
    const yA = midY + Math.sin(theta) * amplitude;
    const yB = midY + Math.sin(theta + Math.PI) * amplitude;
    strandA.push({ x, y: yA });
    strandB.push({ x, y: yB });
  }

  ctx.save();
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);

  ctx.strokeStyle = colors.strandA;
  tracePolyline(ctx, strandA);
  ctx.strokeStyle = colors.strandB;
  tracePolyline(ctx, strandB);

  ctx.strokeStyle = colors.rungs;
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < strandA.length; i += rungInterval) {
    const a = strandA[i];
    const b = strandB[i];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

function tracePolyline(ctx, points) {
  if (points.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
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
