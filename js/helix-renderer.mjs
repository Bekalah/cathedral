/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order preserves calm depth:
    1. Vesica field grounds the canvas with soft symmetry.
    2. Tree-of-Life scaffold anchors the nodes and paths.
    3. Fibonacci spiral introduces gentle phi-guided flow without motion.
    4. Double-helix lattice adds static depth with mirrored strands.

  All drawing helpers are pure; no animation loops or side effects beyond the
  supplied canvas context. Comments explain ND-safe choices for future editors.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff", "#74f1ff", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
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

  const width = Number.isFinite(options.width) ? options.width : ctx.canvas.width || 1440;
  const height = Number.isFinite(options.height) ? options.height : ctx.canvas.height || 900;
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  ctx.save();
  prepareCanvas(ctx, width, height, palette.bg);

  paintVesicaField(ctx, { width, height, palette, NUM });
  paintTreeOfLife(ctx, { width, height, palette, NUM });
  paintFibonacciCurve(ctx, { width, height, palette, NUM });
  paintHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();
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

function normaliseNumerology(overrides) {
  const merged = {};
  const source = overrides || {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    const value = Number(source[key]);
    merged[key] = Number.isFinite(value) ? value : DEFAULT_NUM[key];
  }
  return merged;
}

function prepareCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

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

function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = getTreeNodes({ width, height, NUM });
  const paths = getTreePaths();
  const baseSize = Math.min(width, height);
  const pathWidth = Math.max(1.1, baseSize / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  const nodeRadius = Math.max(6, baseSize / NUM.NINETYNINE * NUM.THREE);

  ctx.save();
  ctx.globalAlpha = 0.62;
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
  });

  ctx.restore();
}

function paintFibonacciCurve(ctx, { width, height, palette, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN);

  ctx.save();
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.72;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.SEVEN);
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t);
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
  ctx.lineWidth = Math.max(1.1, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = palette.layers[3];
  drawPolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[4];
  drawPolyline(ctx, strandB);

  // Rungs sampled every few points to hint at lattice depth without clutter.
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.layers[5];
  const rungStep = Math.max(1, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    if (a && b) {
      drawLine(ctx, a.x, a.y, b.x, b.y);
    }
  }

  ctx.restore();
}

function drawCircle(ctx, x, y, radius, options = {}) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
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
}
