/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order sustains calm depth:
    1) Vesica field primes the space with intersecting circles.
    2) Tree-of-Life scaffold anchors ten sephirot and twenty-two paths.
    3) Fibonacci spiral adds phi-based growth without any motion.
    4) Double-helix lattice introduces mirrored strands for vertical balance.

  All helpers are small pure functions so the geometry stays deterministic.
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

  const width = sanitiseDimension(options.width, ctx.canvas.width, 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height, 900);
  const palette = selectPalette(options.palette);
  const NUM = selectNumerology(options.NUM);

  setCanvasSize(ctx.canvas, width, height);
  ctx.save();
  configureContext(ctx);

  fillBackground(ctx, width, height, palette.bg);
  paintVesicaField(ctx, width, height, palette, NUM);
  paintTreeOfLife(ctx, width, height, palette, NUM);
  paintFibonacciCurve(ctx, width, height, palette, NUM);
  paintHelixLattice(ctx, width, height, palette, NUM);

  ctx.restore();
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
  }
  const merged = {};
  for (const key of Object.keys(DEFAULT_NUM)) {
    merged[key] = Number.isFinite(source[key]) ? source[key] : DEFAULT_NUM[key];
  }
  return merged;
}

function fillBackground(ctx, width, height, color) {
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
  }

  ctx.restore();
}

function paintTreeOfLife(ctx, width, height, palette, NUM) {
  const nodes = getTreeNodes(width, height, NUM);
  const paths = getTreePaths();
  const strokeWidth = Math.max(1.2, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE);

  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = strokeWidth;
  paths.forEach(([startId, endId]) => {
    const start = nodes[startId];
    const end = nodes[endId];
    if (!start || !end) {
      return;
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
  });

  ctx.restore();
}

function paintFibonacciCurve(ctx, width, height, palette, NUM) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.ONEFORTYFOUR;
  const rotations = NUM.ELEVEN / NUM.THREE;
  const startRadius = maxRadius / Math.pow(phi, NUM.SEVEN);

  ctx.save();
  // Spiral is traced once; no animation loops to preserve ND-safe stillness.
  ctx.strokeStyle = palette.layers[2];
  ctx.globalAlpha = 0.74;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.NINETYNINE * NUM.SEVEN);
  ctx.beginPath();

  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
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
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}
