/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order is intentional:
    1) Vesica field provides the breathing lattice (soft stroke, no fill).
    2) Tree-of-Life scaffold anchors numerology with 10 nodes and 22 paths.
    3) Fibonacci curve adds growth arc (static polyline, no motion).
    4) Double-helix lattice crowns the scene with mirrored strands.

  All strokes stay inside a 8-10% margin so sacred forms keep clearspace.
  Small pure helpers keep readability and make offline maintenance simple.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#6f9bff","#74f1ff","#8ef7c3","#ffd27f","#f5a3ff","#d4d7ff"]
  layers: ["#6f9bff", "#74f1ff", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]
  ND-safe static renderer for layered sacred geometry.

  Layer order is intentional to preserve calm depth:
    1. Vesica field (grounding lattice of intersecting circles)
    2. Tree-of-Life scaffold (ten sephirot, twenty-two paths)
    3. Fibonacci spiral (phi-guided curve rendered without motion)
    4. Double helix lattice (mirrored strands sampled at 144 points)

  All helpers are pure: no shared mutable state, no timers, no animation.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#6f9bff', '#74f1ff', '#8ef7c3', '#ffd27f', '#f5a3ff', '#d4d7ff']
});

const DEFAULT_NUM = Object.freeze({
const DEFAULT_NUMERLOGY = Object.freeze({
  layers: ["#6f9bff", "#5bd6c9", "#8ef7c3", "#ffd27f", "#f5a3ff", "#d4d7ff"]

  Layer hierarchy (outer to inner):
    1. Vesica field (grounding lattice with clearspace enforcement)
    2. Tree-of-Life scaffold (ten sephirot, twenty-two paths)
    3. Fibonacci curve (phi-guided spiral, drawn once)
    4. Double helix lattice (two phase-shifted strands plus rungs)

  Every helper is a pure function that depends solely on the arguments passed in.
  This keeps edits deterministic and prevents accidental animation loops.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: '#0b0b12',
  ink: '#e8e8f0',
  layers: ['#b1c7ff', '#89f7fe', '#a0ffa1', '#ffd27f', '#f5a3ff', '#d0d0e6']
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

const CLEARSPACE_MIN_RATIO = 0.07;
const CLEARSPACE_MIN_PX = 24;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export function renderHelix(ctx, config = {}) {
  if (!ctx) {
    return;
  }

  const settings = createSettings(ctx, config);

  drawBackground(ctx, settings);
  if (settings.missingPalette) {
    drawPaletteNotice(ctx, settings);
  }
  drawVesicaField(ctx, settings);
  drawTreeOfLife(ctx, settings);
  drawFibonacciCurve(ctx, settings);
  drawHelixLattice(ctx, settings);
}

function createSettings(ctx, config) {
  const defaultPalette = {
    bg:"#0b0b12",
    ink:"#e8e8f0",
    layers:["#b1c7ff","#89f7fe","#a0ffa1","#ffd27f","#f5a3ff","#d0d0e6"]
  };

  const paletteInput = config.palette || defaultPalette;
  const palette = {
    bg: paletteInput.bg || defaultPalette.bg,
    ink: paletteInput.ink || defaultPalette.ink,
    layers: ensureLayerArray(paletteInput.layers, defaultPalette.layers)
  };

  const fallbackNUM = {
    THREE:3,
    SEVEN:7,
    NINE:9,
    ELEVEN:11,
    TWENTYTWO:22,
    THIRTYTHREE:33,
    NINETYNINE:99,
    ONEFORTYFOUR:144
  };

  const NUM = config.NUM || fallbackNUM;
  const width = config.width || (ctx.canvas ? ctx.canvas.width : 1440);
  const height = config.height || (ctx.canvas ? ctx.canvas.height : 900);
  const margin = Math.min(width, height) / NUM.ELEVEN;
  const stageWidth = width - margin * 2;
  const stageHeight = height - margin * 2;

  return {
    width,
    height,
    palette.layers[3],
    palette.layers[4],
    palette.layers[5],
    numerology
  );
  const width = sanitiseDimension(options.width, ctx.canvas.width || 1440);
  const height = sanitiseDimension(options.height, ctx.canvas.height || 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  ctx.save();
  resetCanvas(ctx, width, height, palette.bg);

  paintVesicaField(ctx, { width, height, palette, NUM });
  paintTreeOfLife(ctx, { width, height, palette, NUM });
  paintFibonacciCurve(ctx, { width, height, palette, NUM });
  paintHelixLattice(ctx, { width, height, palette, NUM });

  ctx.restore();

  return {
    ok: true,
    palette,
    NUM,
    render: {
      width,
      height,
      clearspace_px: clearspace,
      safe_frame: frame
    }
  };
}

function sanitiseDimension(value, fallback) {
  if (Number.isFinite(value) && value > 0) {
    return value;
  }
  if (Number.isFinite(fallback) && fallback > 0) {
    return fallback;
  }
  return 1;
}

function normalisePalette(palette) {
  if (!palette || !Array.isArray(palette.layers)) {
    return FALLBACK_PALETTE;
  }
  if (Number.isFinite(fallback) && fallback > 0) {
    return fallback;
  }
  return 1;
}

function setCanvasSize(canvas, width, height) {
  if (!canvas) {
    return;
  }
  canvas.width = width;
  canvas.height = height;
}

function normalisePalette(input) {
  if (!input) {
    return DEFAULT_PALETTE;
  }
  const layers = Array.isArray(input.layers) && input.layers.length >= 4
    ? input.layers.slice(0, DEFAULT_PALETTE.layers.length)
    : DEFAULT_PALETTE.layers;
  return {
    bg: typeof input.bg === "string" ? input.bg : DEFAULT_PALETTE.bg,
    ink: typeof input.ink === "string" ? input.ink : DEFAULT_PALETTE.ink,
    layers: layers.concat(DEFAULT_PALETTE.layers).slice(0, DEFAULT_PALETTE.layers.length)
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
    bg: palette.bg || DEFAULT_PALETTE.bg,
    ink: palette.ink || DEFAULT_PALETTE.ink,
    layers
    palette,
    NUM,
    margin,
    stageWidth,
    stageHeight,
    centerX: width / 2,
    centerY: height / 2,
    missingPalette: Boolean(config.missingPalette)
  };
}

function drawBackground(ctx, settings) {
  ctx.save();
  ctx.fillStyle = color;
function resetCanvas(ctx, width, height, background) {
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = settings.palette.bg;
  ctx.fillRect(0, 0, settings.width, settings.height);
  ctx.restore();
}

function drawPaletteNotice(ctx, settings) {
  const message = "palette data missing - fallback active";
  ctx.save();
  ctx.fillStyle = applyAlpha(settings.palette.ink, 0.58);
  ctx.font = "14px system-ui, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(message, settings.margin, settings.margin / settings.NUM.THREE);
  ctx.restore();
}

function drawVesicaField(ctx, settings) {
  const rows = settings.NUM.SEVEN;
  const cols = settings.NUM.NINE;
  const base = Math.min(settings.stageWidth, settings.stageHeight);
  const radius = (base / settings.NUM.THIRTYTHREE) * 2;
  const stepX = cols > 1 ? (settings.stageWidth - radius * 2) / (cols - 1) : 0;
  const stepY = rows > 1 ? (settings.stageHeight - radius * 2) / (rows - 1) : 0;
  const startX = settings.margin + radius;
  const startY = settings.margin + radius;
  const offset = radius / settings.NUM.THREE;

  ctx.save();
  ctx.strokeStyle = applyAlpha(settings.palette.layers[0], 0.35);
  ctx.lineWidth = 1.2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = startX + col * stepX;
      const cy = startY + row * stepY;
      drawCircle(ctx, cx - offset, cy, radius);
      drawCircle(ctx, cx + offset, cy, radius);
    }
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, settings) {
  const nodes = buildTreeNodes(settings);
  const nodeMap = nodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});

  const paths = buildTreePaths();

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = color;
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
function drawSafeFrame(ctx, frame, { palette, clearspace, NUM }) {
  ctx.save();
  const rectColor = withAlpha(palette.ink, 0.18);
  ctx.strokeStyle = rectColor;
  ctx.lineWidth = Math.max(1, clearspace / NUM.SEVEN);
  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);

  // Golden ratio guide lines keep exports aligned to the safe frame.
  const v1 = frame.x + frame.width / PHI;
  const v2 = frame.x + frame.width - frame.width / PHI;
  const h1 = frame.y + frame.height / PHI;
  const h2 = frame.y + frame.height - frame.height / PHI;
function paintVesicaField(ctx, { width, height, palette, NUM }) {
  const radius = Math.min(width, height) / NUM.THIRTYTHREE * NUM.NINE;
  const centerX = width / 2;
  const centerY = height / 2;
  const offset = radius * (NUM.SEVEN / NUM.TWENTYTWO);

  ctx.setLineDash([clearspace / NUM.ELEVEN, clearspace / NUM.ELEVEN]);
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.22);
  ctx.lineWidth = Math.max(1, clearspace / NUM.TWENTYTWO);

  ctx.beginPath();
  ctx.moveTo(v1, frame.y);
  ctx.lineTo(v1, frame.y + frame.height);
  ctx.moveTo(v2, frame.y);
  ctx.lineTo(v2, frame.y + frame.height);
  ctx.moveTo(frame.x, h1);
  ctx.lineTo(frame.x + frame.width, h1);
  ctx.moveTo(frame.x, h2);
  ctx.lineTo(frame.x + frame.width, h2);
  ctx.stroke();

  ctx.restore();
}

function drawVesicaField(ctx, frame, { palette, clearspace, NUM }) {
  ctx.save();

  const centerX = frame.x + frame.width / 2;
  const centerY = frame.y + frame.height / 2;
  const radius = Math.min(frame.width, frame.height) / (2 + 1 / NUM.THREE);
  const strokeWidth = Math.min(clearspace * 0.9, Math.max(2, radius / NUM.NINETYNINE * NUM.SEVEN));

  ctx.strokeStyle = withAlpha(palette.layers[0], 0.6);
  ctx.lineWidth = strokeWidth;

  const offsets = [
    { x: -radius / NUM.THREE, y: 0 },
    { x: radius / NUM.THREE, y: 0 },
    { x: 0, y: -radius / NUM.THREE },
    { x: 0, y: radius / NUM.THREE }
  ];

  for (const offset of offsets) {
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, radius);
  }

  // Harmonic rings reinforce depth without animation.
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.35);
  for (let i = 1; i <= NUM.SEVEN; i += 1) {
    const ringRadius = radius * (1 + i / (NUM.SEVEN + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius);
  }

  // Vesica grid anchored to 3x3 intersections.
  const gridExtent = radius * (NUM.ELEVEN / NUM.NINE);
  const gridStroke = Math.max(1, strokeWidth * 0.4);
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.22);
  ctx.lineWidth = gridStroke;

  for (let i = -NUM.NINE; i <= NUM.NINE; i += 1) {
    const offset = (i / NUM.NINE) * gridExtent;
    ctx.beginPath();
    ctx.moveTo(centerX + offset, centerY - gridExtent);
    ctx.lineTo(centerX + offset, centerY + gridExtent);
    ctx.stroke();
  ctx.strokeStyle = applyAlpha(settings.palette.layers[1], 0.6);
  ctx.lineWidth = 2.2;

  paths.forEach(pair => {
    const a = nodeMap[pair[0]];
    const b = nodeMap[pair[1]];
    if (!a || !b) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  ctx.globalAlpha = 0.26;
  ctx.fillStyle = palette.layers[0];
  drawCircle(ctx, centerX - offset, centerY, radius, { fill: true });
  ctx.fillStyle = palette.layers[1];
  drawCircle(ctx, centerX + offset, centerY, radius, { fill: true });

  // Rings use numerology ratios to hold depth without motion.
  const ringCount = NUM.SEVEN;
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(1.2, radius / NUM.NINETYNINE * NUM.SEVEN);
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = radius * (1 + i / (ringCount + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius, { stroke: true });
  }

  // Vesica grid anchored to a 3x3 lattice keeps the base calm and symmetric.
  const gridSteps = NUM.THREE;
  const extent = radius * (NUM.ELEVEN / NUM.NINE);
  ctx.globalAlpha = 0.16;
  for (let i = -gridSteps; i <= gridSteps; i += 1) {
    const offsetX = (i / gridSteps) * extent;
    drawLine(ctx, centerX + offsetX, centerY - extent, centerX + offsetX, centerY + extent);
    const offsetY = (i / gridSteps) * extent;
    drawLine(ctx, centerX - extent, centerY + offsetY, centerX + extent, centerY + offsetY);
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
  ctx.strokeStyle = palette.layers[1];
  ctx.lineWidth = pathWidth;
  paths.forEach(([from, to]) => {
    const start = nodes[from];
    const end = nodes[to];
    if (!start || !end) {
      continue;
    }
    drawLine(ctx, start.x, start.y, end.x, end.y);
  });

  ctx.fillStyle = settings.palette.bg;
  ctx.strokeStyle = applyAlpha(settings.palette.layers[1], 0.9);
  const nodeRadius = (Math.min(settings.stageWidth, settings.stageHeight) / settings.NUM.ONEFORTYFOUR) * settings.NUM.THREE;

  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.restore();
}

function buildTreeNodes(settings) {
  const yBuffer = settings.stageHeight / settings.NUM.TWENTYTWO;
  const xBuffer = settings.stageWidth / settings.NUM.THIRTYTHREE;
  const scale = (settings.stageHeight - yBuffer * 2) / settings.NUM.NINE;
  const basePositions = [0,1,1,3,3,4.5,6,6,7.5,9];
  const leftX = settings.margin + xBuffer;
  const rightX = settings.width - settings.margin - xBuffer;
  const centerX = settings.centerX;

  return [
    { id:"keter", x:centerX, y:settings.margin + yBuffer + basePositions[0] * scale },
    { id:"chokmah", x:rightX, y:settings.margin + yBuffer + basePositions[1] * scale },
    { id:"binah", x:leftX, y:settings.margin + yBuffer + basePositions[2] * scale },
    { id:"chesed", x:rightX, y:settings.margin + yBuffer + basePositions[3] * scale },
    { id:"geburah", x:leftX, y:settings.margin + yBuffer + basePositions[4] * scale },
    { id:"tiphareth", x:centerX, y:settings.margin + yBuffer + basePositions[5] * scale },
    { id:"netzach", x:rightX, y:settings.margin + yBuffer + basePositions[6] * scale },
    { id:"hod", x:leftX, y:settings.margin + yBuffer + basePositions[7] * scale },
    { id:"yesod", x:centerX, y:settings.margin + yBuffer + basePositions[8] * scale },
    { id:"malkuth", x:centerX, y:settings.margin + yBuffer + basePositions[9] * scale }
  ];
}

function buildTreePaths() {
  return [
    ["keter","chokmah"],
    ["keter","binah"],
    ["chokmah","binah"],
    ["chokmah","chesed"],
    ["binah","geburah"],
    ["chesed","geburah"],
    ["chesed","tiphareth"],
    ["geburah","tiphareth"],
    ["chesed","netzach"],
    ["geburah","hod"],
    ["netzach","hod"],
    ["netzach","yesod"],
    ["hod","yesod"],
    ["yesod","malkuth"],
    ["tiphareth","netzach"],
    ["tiphareth","hod"],
    ["tiphareth","yesod"],
    ["keter","tiphareth"],
    ["binah","tiphareth"],
    ["chokmah","tiphareth"],
    ["netzach","malkuth"],
    ["hod","malkuth"]
  ];
}

function drawFibonacciCurve(ctx, settings) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const turns = settings.NUM.THREE;
  const samples = settings.NUM.NINETYNINE;
  const maxRadius = Math.min(settings.stageWidth, settings.stageHeight) / 2.4;
  const baseRadius = (maxRadius / settings.NUM.TWENTYTWO) * settings.NUM.THREE;
  const totalAngle = Math.PI * 2 * turns;
  const growthFactor = (Math.PI * 2) / settings.NUM.ELEVEN;
  const points = [];

  for (let i = 0; i <= samples; i += 1) {
    const ratio = i / samples;
    const angle = totalAngle * ratio - Math.PI / 2;
    const radius = Math.min(baseRadius * Math.pow(phi, angle / growthFactor), maxRadius);
    const x = settings.centerX + radius * Math.cos(angle);
    const y = settings.centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }

  ctx.save();
  ctx.lineWidth = 2.4;
  ctx.lineJoin = "round";
  ctx.strokeStyle = applyAlpha(settings.palette.layers[2], 0.9);
  drawPolyline(ctx, points);
  ctx.restore();
}

function drawHelixLattice(ctx, settings) {
  const segments = settings.NUM.NINETYNINE;
  const amplitude = (settings.stageWidth / settings.NUM.THIRTYTHREE) * (settings.NUM.SEVEN / settings.NUM.ELEVEN);
  const verticalStep = settings.stageHeight / segments;
  const phaseStride = (Math.PI * 2) / settings.NUM.TWENTYTWO;
  const leftPoints = [];
  const rightPoints = [];

  for (let i = 0; i <= segments; i += 1) {
    const y = settings.margin + i * verticalStep;
    const phase = phaseStride * i;
    const xLeft = settings.centerX - amplitude * Math.sin(phase);
    const xRight = settings.centerX + amplitude * Math.sin(phase + Math.PI / settings.NUM.ELEVEN);
    leftPoints.push({ x: xLeft, y });
    rightPoints.push({ x: xRight, y });
  }

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = applyAlpha(settings.palette.layers[3], 0.75);
  drawPolyline(ctx, leftPoints);
  drawPolyline(ctx, rightPoints);

  ctx.strokeStyle = applyAlpha(settings.palette.layers[4], 0.5);
  ctx.lineWidth = 1.4;
  const rungStep = settings.NUM.ELEVEN;
  for (let i = 0; i < leftPoints.length; i += rungStep) {
    const a = leftPoints[i];
    const b = rightPoints[i];
    if (!a || !b) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();

  ctx.save();
  ctx.strokeStyle = applyAlpha(settings.palette.layers[5], 0.45);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(settings.centerX, settings.margin);
  ctx.lineTo(settings.centerX, settings.height - settings.margin);
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

    ctx.fillStyle = palette.ink;
    ctx.strokeStyle = withAlpha(palette.layers[1], 0.7);
    ctx.lineWidth = Math.max(1, clearspace / NUM.NINETYNINE * NUM.SEVEN);
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
function paintTreeOfLife(ctx, { width, height, palette, NUM }) {
  const nodes = buildTreeNodes(width, height, NUM);
  const paths = buildTreePaths();
  const strokeWidth = Math.max(1.4, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / (NUM.NINETYNINE / NUM.THREE));

  ctx.save();
  ctx.globalAlpha = 0.68;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = strokeWidth;
  for (let i = 0; i < paths.length; i += 1) {
    const [fromIndex, toIndex] = paths[i];
    const start = nodes[fromIndex];
    const end = nodes[toIndex];
    drawLine(ctx, start.x, start.y, end.x, end.y);
  }

  // Nodes render last for clarity; halos stay gentle for ND safety.
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = palette.ink;
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = strokeWidth / NUM.THREE;
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    drawCircle(ctx, node.x, node.y, nodeRadius, { fill: true });
    ctx.globalAlpha = 0.55;
    drawCircle(ctx, node.x, node.y, nodeRadius * (NUM.THIRTYTHREE / NUM.TWENTYTWO), { stroke: true });
    ctx.globalAlpha = 0.9;
  }
  ctx.restore();
}

function getTreeNodes({ width, height, NUM }) {
  const marginX = width / NUM.TWENTYTWO * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const marginY = height / NUM.TWENTYTWO * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
function buildTreeNodes(width, height, NUM) {
  const marginX = width / NUM.NINETYNINE * NUM.ELEVEN;
  const marginY = height / NUM.NINETYNINE * NUM.ELEVEN;
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

function buildTreePaths() {
  // Twenty-two connections honour the sephirot pathways.
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
  ctx.restore();
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

function drawCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function ensureLayerArray(layers, fallback) {
  const base = Array.isArray(layers) ? layers.slice(0) : [];
  for (let i = 0; i < fallback.length; i += 1) {
    if (!base[i]) {
      base[i] = fallback[i];
    }
  }
  return base.slice(0, fallback.length);
}

function drawHelixLattice(ctx, frame, { palette, NUM }) {
  ctx.save();

  const samples = NUM.ONEFORTYFOUR;
  const centerY = frame.y + frame.height / 2;
  const amplitude = frame.height / (NUM.THREE + NUM.SEVEN / NUM.TWENTYTWO);
  const angleMultiplier = Math.PI * (NUM.THREE + NUM.ELEVEN / NUM.TWENTYTWO);

  const strandA = [];
  const strandB = [];
  for (let i = 0; i < samples; i += 1) {
    const t = i / (samples - 1);
    const x = frame.x + t * frame.width;
    const angle = t * angleMultiplier;
    strandA.push({ x, y: centerY + Math.sin(angle) * amplitude });
    strandB.push({ x, y: centerY + Math.sin(angle + Math.PI) * amplitude });
function paintFibonacciCurve(ctx, { width, height, palette, NUM }) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const rotations = NUM.NINE / NUM.THREE; // Three full turns keep the spiral serene.
  const centerX = width * (NUM.SEVEN / NUM.TWENTYTWO);
  const centerY = height * (NUM.ELEVEN / NUM.TWENTYTWO);
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE;
  const growth = NUM.ELEVEN / NUM.SEVEN;

  const points = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = rotations * Math.PI * 2 * t;
    const radius = baseRadius * Math.pow(phi, growth * t);
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  }

  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = Math.max(1.5, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE);
  strokePolyline(ctx, points);

  // Anchor markers provide gentle focus without motion cues.
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = palette.layers[3];
  const markerRadius = Math.max(3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN / NUM.ELEVEN);
  for (let i = 1; i < points.length; i += Math.max(1, Math.floor(points.length / NUM.NINE))) {
    const point = points[i];
    drawCircle(ctx, point.x, point.y, markerRadius, { fill: true });
  }
  ctx.restore();
}

function paintHelixLattice(ctx, { width, height, palette, NUM }) {
  const samples = NUM.ONEFORTYFOUR;
  const verticalMargin = height / NUM.ELEVEN;
  const usableHeight = height - verticalMargin * 2;
  const centerX = width * (NUM.ELEVEN / NUM.TWENTYTWO);
  const amplitude = width / NUM.NINE;
  const turns = NUM.THREE;

  const strandA = [];
  const strandB = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const angle = turns * Math.PI * 2 * t;
    const y = verticalMargin + usableHeight * t;
    strandA.push({ x: centerX + Math.sin(angle) * amplitude, y });
    strandB.push({ x: centerX + Math.sin(angle + Math.PI) * amplitude, y });
  }
  return points;
function applyAlpha(hex, alpha) {
  const rgb = hexToRgb(hex);
  const safeAlpha = Math.max(0, Math.min(alpha, 1));
  return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + safeAlpha + ")";
}

function hexToRgb(hex) {
  if (!hex) {
    return { r: 232, g: 232, b: 240 };
  }

  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = strandA;
  ctx.lineWidth = 2;
  drawPolyline(ctx, strand1);
  ctx.strokeStyle = strandB;
  drawPolyline(ctx, strand2);

  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = rungColor;
  ctx.lineWidth = 1.2;
  const rungStep = Math.max(1, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < strand1.length; i += rungStep) {
    const a = strand1[i];
    const b = strand2[i];
    drawLine(ctx, a.x, a.y, b.x, b.y);
  const strandWidth = Math.max(1.25, frame.width / NUM.ONEFORTYFOUR * NUM.THREE / NUM.ELEVEN);
  tracePolyline(ctx, strandA, { color: palette.layers[3], lineWidth: strandWidth, alpha: 0.7 });
  tracePolyline(ctx, strandB, { color: palette.layers[4], lineWidth: strandWidth, alpha: 0.7 });

  ctx.strokeStyle = withAlpha(palette.layers[5], 0.45);
  ctx.lineWidth = Math.max(1, strandWidth * 0.85);
  const rungStep = Math.max(2, Math.floor(samples / NUM.TWENTYTWO));
  for (let i = 0; i < samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius) {
function drawCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawPolyline(ctx, points) {
function drawCircle(ctx, cx, cy, radius, options = {}) {
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }

  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();
}

  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius) {
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = Math.max(1.3, Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.SEVEN);
  ctx.strokeStyle = palette.layers[4];
  strokePolyline(ctx, strandA);
  ctx.strokeStyle = palette.layers[5];
  strokePolyline(ctx, strandB);

  // Cross rungs reference 33 + 66 ratios for a static lattice rhythm.
  const rungStep = Math.max(2, Math.floor(samples / NUM.THIRTYTHREE));
  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.layers[2];
  for (let i = 0; i <= samples; i += rungStep) {
    const a = strandA[i];
    const b = strandB[i];
    drawLine(ctx, a.x, a.y, b.x, b.y);
  }
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius, options) {
  const opts = options || {};
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  if (opts.fill) {
    ctx.fill();
  }
  if (options.stroke) {
  if (opts.stroke) {
    ctx.stroke();
  }
}

function drawPolyline(ctx, points) {
  if (!points.length) {
function drawLine(ctx, ax, ay, bx, by) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

function strokePolyline(ctx, points) {
  if (!Array.isArray(points) || points.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    ctx.lineTo(point.x, point.y);
  const raw = hex.replace("#", "");
  const value = raw.length === 3
    ? raw.split("").map(ch => ch + ch).join("")
    : raw;
  const intValue = parseInt(value, 16);
  if (Number.isNaN(intValue)) {
    return { r: 232, g: 232, b: 240 };
  }
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
}
