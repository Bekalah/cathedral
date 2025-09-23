/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order preserves calm depth:
    1. Vesica field (soft intersecting circles)
    2. Tree-of-Life scaffold (ten nodes, twenty-two paths)
    3. Fibonacci spiral (phi ratio curve drawn once)
    4. Double-helix lattice (static twin strands with 144 samples)

  Every helper is a small pure function. No animation loops are used so the
  study stays trauma-informed and ND-safe.
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

  const width = normaliseDimension(options.width, ctx.canvas?.width ?? 1440);
  const height = normaliseDimension(options.height, ctx.canvas?.height ?? 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  ctx.save();
  prepareCanvas(ctx, width, height, palette.bg);

  drawVesicaField(ctx, {
    width,
    height,
    primary: palette.layers[0],
    secondary: palette.layers[1],
    grid: palette.layers[5],
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
    stroke: palette.layers[3],
    marker: palette.layers[4],
    NUM
  });

  drawHelixLattice(ctx, {
    width,
    height,
    strandA: palette.layers[4],
    strandB: palette.layers[5],
    rung: palette.layers[2],
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

function prepareCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function drawVesicaField(ctx, { width, height, primary, secondary, grid, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * NUM.NINE;
  const offset = radius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.save();
  ctx.globalAlpha = 0.32;
  ctx.fillStyle = primary;
  drawCircle(ctx, centerX - offset, centerY, radius, { fill: true });
  ctx.fillStyle = secondary;
  drawCircle(ctx, centerX + offset, centerY, radius, { fill: true });

  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = primary;
  ctx.lineWidth = Math.max(1.25, radius / NUM.NINETYNINE * NUM.SEVEN);
  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = radius * (1 + i / (ringCount + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius, { stroke: true });
  }

  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = grid;
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  for (let i = -steps; i <= steps; i += 1) {
    const offsetRatio = i / steps;
    const x = centerX + offsetRatio * gridExtent;
    const y = centerY + offsetRatio * gridExtent;
    drawLine(ctx, x, centerY - gridExtent, x, centerY + gridExtent);
    drawLine(ctx, centerX - gridExtent, y, centerX + gridExtent, y);
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, { width, height, lineColor, nodeFill, haloColor, NUM }) {
  const nodes = getTreeNodes(width, height, NUM);
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const paths = getTreePaths();

  const lineWidth = Math.max(1.2, Math.min(width, height) / (NUM.ONEFORTYFOUR / (NUM.TWENTYTWO / NUM.ELEVEN)));
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE * (NUM.THREE / NUM.TWENTYTWO * NUM.ELEVEN));

  ctx.save();
  ctx.globalAlpha = 0.66;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodeMap.get(startId);
    const end = nodeMap.get(endId);
    if (!start || !end) {
      continue;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  }

  ctx.globalAlpha = 0.88;
  ctx.fillStyle = nodeFill;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth / NUM.THREE;
  nodes.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
  });

  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = haloColor;
  nodes.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
  });

  ctx.restore();
}

function getTreeNodes(width, height, NUM) {
  const marginX = width / NUM.NINETYNINE * NUM.ELEVEN;
  const marginY = height / NUM.NINETYNINE * NUM.ELEVEN;
  const usableWidth = width - marginX * 2;
  const usableHeight = height - marginY * 2;

  const layout = [
    { id: "keter", u: 0.5, v: 0.04 },
    { id: "chokmah", u: 0.74, v: 0.18 },
    { id: "binah", u: 0.26, v: 0.18 },
    { id: "chesed", u: 0.72, v: 0.34 },
    { id: "gevurah", u: 0.28, v: 0.34 },
    { id: "tiferet", u: 0.5, v: 0.5 },
    { id: "netzach", u: 0.78, v: 0.66 },
    { id: "hod", u: 0.22, v: 0.66 },
    { id: "yesod", u: 0.5, v: 0.82 },
    { id: "malkuth", u: 0.5, v: 0.96 }
  ];

  return layout.map((node) => ({
    id: node.id,
    x: marginX + node.u * usableWidth,
    y: marginY + node.v * usableHeight
  }));
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

function drawFibonacciCurve(ctx, { width, height, stroke, marker, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const turns = NUM.NINE / NUM.THREE;
  const startRadius = Math.min(width, height) / NUM.THREE / Math.pow(phi, NUM.SEVEN);
  const centerX = width * 0.32;
  const centerY = height * 0.58;

  ctx.save();
  ctx.globalAlpha = 0.74;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = Math.max(1.4, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = turns * Math.PI * 2 * t;
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

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = marker;
  const markerCount = NUM.SEVEN;
  const markerRadius = Math.max(3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = turns * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, NUM.SEVEN * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    drawCircle(ctx, x, y, markerRadius, { fill: true });
  }

  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandA, strandB, rung, NUM }) {
  const samples = NUM.ONEFORTYFOUR;
  const turns = NUM.THREE;
  const topMargin = height / NUM.ELEVEN;
  const span = height - topMargin * 2;
  const centerX = width / 2;
  const amplitude = width / NUM.NINE;

  const pathA = [];
  const pathB = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + span * t;
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    pathA.push({ x: xA, y });
    pathB.push({ x: xB, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.lineWidth = Math.max(1.3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN);
  drawPolyline(ctx, pathA, strandA);
  drawPolyline(ctx, pathB, strandB);

  ctx.globalAlpha = 0.38;
  ctx.strokeStyle = rung;
  ctx.lineWidth = Math.max(1, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  const rungStep = Math.max(2, Math.floor(samples / NUM.THIRTYTHREE));
  for (let i = 0; i <= samples; i += rungStep) {
    const a = pathA[i];
    const b = pathB[i];
    if (!a || !b) {
      continue;
    }
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius, options = {}) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
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

function drawPolyline(ctx, points, strokeStyle) {
  if (!points.length) {
    return;
  }
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}
