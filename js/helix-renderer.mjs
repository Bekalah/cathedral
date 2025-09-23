/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order is intentional to preserve calm depth:
    1. Vesica field (grounding lattice of intersecting circles)
    2. Tree-of-Life scaffold (ten sephirot, twenty-two paths)
    3. Fibonacci spiral (phi-based curve for gentle motion cues without animation)
    4. Double-helix lattice (mirrored strands with 144 sample points)

  All helpers are pure and only depend on the arguments passed in.
  This keeps edits deterministic and prevents accidental motion loops.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff", "#74f1ff", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
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
    return;
  }

  const width = Number.isFinite(options.width) ? options.width : 1440;
  const height = Number.isFinite(options.height) ? options.height : 900;
  const palette = normalisePalette(options.palette);
  const NUM = ensureNumerology(options.NUM);

  ctx.save();
  prepareCanvas(ctx, width, height, palette.bg);

  drawVesicaField(ctx, { width, height, color: palette.layers[0], NUM });
  drawTreeOfLife(ctx, {
    width,
    height,
    lineColor: palette.layers[1],
    nodeColor: palette.ink,
    NUM
  });
  drawFibonacciCurve(ctx, { width, height, color: palette.layers[2], NUM });
  drawHelixLattice(ctx, {
    width,
    height,
    strandA: palette.layers[3],
    strandB: palette.layers[4],
    rungColor: palette.layers[5],
    NUM
  });

  ctx.restore();
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

function prepareCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
}

function drawVesicaField(ctx, { width, height, color, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE * (NUM.NINE / NUM.THREE);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.32;
  ctx.lineWidth = Math.max(1.25, baseRadius / NUM.NINETYNINE * NUM.SEVEN);

  const offsets = [
    { x: -baseRadius / NUM.THREE, y: 0 },
    { x: baseRadius / NUM.THREE, y: 0 },
    { x: 0, y: -baseRadius / NUM.THREE },
    { x: 0, y: baseRadius / NUM.THREE }
  ];
  for (let i = 0; i < offsets.length; i += 1) {
    const offset = offsets[i];
    drawCircleOutline(ctx, centerX + offset.x, centerY + offset.y, baseRadius);
  }

  // Harmonic rings reinforce depth without animation.
  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = baseRadius * (1 + i / (ringCount + NUM.THREE));
    drawCircleOutline(ctx, centerX, centerY, ringRadius);
  }

  // Vesica grid: lines anchored to 3x3 intersections.
  const gridExtent = baseRadius * (NUM.ELEVEN / NUM.NINE);
  const steps = NUM.NINE;
  ctx.globalAlpha = 0.18;
  for (let i = -steps; i <= steps; i += 1) {
    const offset = (i / steps) * gridExtent;
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

function drawTreeOfLife(ctx, { width, height, lineColor, nodeColor, NUM }) {
  const topMargin = height / NUM.TWENTYTWO * NUM.THREE;
  const verticalSpan = height - topMargin * 2;
  const verticalStep = verticalSpan / NUM.SEVEN;
  const lateralSpread = width / NUM.THREE;
  const centerX = width / 2;

  const nodes = [
    { id: "keter", x: centerX, y: topMargin },
    { id: "chokmah", x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep },
    { id: "binah", x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep },
    { id: "chesed", x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep * 2 },
    { id: "gevurah", x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep * 2 },
    { id: "tiferet", x: centerX, y: topMargin + verticalStep * 3 },
    { id: "netzach", x: centerX + lateralSpread / NUM.THREE, y: topMargin + verticalStep * 4 },
    { id: "hod", x: centerX - lateralSpread / NUM.THREE, y: topMargin + verticalStep * 4 },
    { id: "yesod", x: centerX, y: topMargin + verticalStep * 5 },
    { id: "malkuth", x: centerX, y: topMargin + verticalStep * 6 }
  ];

  const nodeMap = new Map();
  for (let i = 0; i < nodes.length; i += 1) {
    nodeMap.set(nodes[i].id, nodes[i]);
  }

  const paths = [
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

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1.2, width / (NUM.ONEFORTYFOUR * 1.2));
  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodeMap.get(startId);
    const end = nodeMap.get(endId);
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.88;
  const nodeRadius = Math.max(6, width / NUM.NINETYNINE);
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = Math.max(1, nodeRadius / NUM.THIRTYTHREE * NUM.THREE);
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawFibonacciCurve(ctx, { width, height, color, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const rotations = NUM.ELEVEN / NUM.THREE; // 3.66 turns keeps the spiral calm.
  const growthSteps = NUM.SEVEN;
  const startRadius = maxRadius / Math.pow(phi, growthSteps);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.72;
  ctx.lineWidth = Math.max(1.4, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
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

  // Anchor points along the spiral provide gentle focus points.
  const markerCount = NUM.NINE;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.5;
  const markerRadius = Math.max(3, maxRadius / NUM.ONEFORTYFOUR * NUM.THREE);
  for (let i = 1; i <= markerCount; i += 1) {
    const t = i / (markerCount + 1);
    const angle = rotations * Math.PI * 2 * t;
    const radius = startRadius * Math.pow(phi, growthSteps * t);
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.arc(x, y, markerRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandA, strandB, rungColor, NUM }) {
  const topMargin = height / NUM.ELEVEN;
  const helixHeight = height - topMargin * 2;
  const centerX = width / 2;
  const amplitude = width / NUM.NINE;
  const steps = NUM.ONEFORTYFOUR;
  const turns = NUM.THREE; // three full twists for symbolic balance.

  const pointsA = [];
  const pointsB = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = turns * Math.PI * 2 * t;
    const y = topMargin + helixHeight * t;
    const xA = centerX + Math.sin(angle) * amplitude;
    const xB = centerX + Math.sin(angle + Math.PI) * amplitude;
    pointsA.push({ x: xA, y });
    pointsB.push({ x: xB, y });
  }

  ctx.save();
  ctx.globalAlpha = 0.66;
  ctx.lineWidth = Math.max(1.4, width / NUM.ONEFORTYFOUR * NUM.THREE);
  drawPolyline(ctx, pointsA, strandA);
  drawPolyline(ctx, pointsB, strandB);

  // Cross rungs referencing 33 + 66 ratios for stable lattice.
  const rungInterval = Math.max(2, Math.floor(steps / NUM.THIRTYTHREE));
  ctx.strokeStyle = rungColor;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  for (let i = 0; i <= steps; i += rungInterval) {
    const a = pointsA[i];
    const b = pointsB[i];
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

function drawCircleOutline(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
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
