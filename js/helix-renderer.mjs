/*
  helix-renderer.mjs
  ND-safe static renderer that paints four sacred geometry layers without motion.
  Layer order preserves calm depth:
    1) Vesica field (intersecting circles) grounds the space.
    2) Tree-of-Life scaffold anchors ten sephirot and twenty-two paths.
    3) Fibonacci curve adds phi growth as a static polyline.
    4) Double helix lattice provides mirrored strands with rungs sampled across 144 points.

  Each helper is a pure function fed only through arguments so edits stay predictable.
  Comments explain the sensory-safe choices: soft contrast, no animation, deterministic ratios.
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

const CLEARSPACE_MIN_RATIO = 0.07;
const CLEARSPACE_MIN_PX = 24;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export function renderHelix(ctx, config = {}) {
  if (!ctx) {
    return { ok: false, reason: "no-context" };
  }

  const width = sanitiseDimension(config.width, ctx.canvas?.width ?? 1440);
  const height = sanitiseDimension(config.height, ctx.canvas?.height ?? 900);
  setCanvasSize(ctx.canvas, width, height);

  const palette = normalisePalette(config.palette);
  const NUM = normaliseNumerology(config.NUM);
  const debugOverlay = Boolean(config.debugOverlay);

  const clearspace = computeClearspace(width, height, NUM);
  const frame = {
    x: clearspace,
    y: clearspace,
    width: Math.max(1, width - clearspace * 2),
    height: Math.max(1, height - clearspace * 2)
  };

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  fillBackground(ctx, width, height, palette.bg);

  const shared = { ctx, frame, palette, NUM };
  drawVesicaField(shared);
  drawTreeOfLife(shared);
  drawFibonacciCurve(shared);
  drawHelixLattice(shared);

  if (debugOverlay) {
    drawSafeFrameOverlay(shared);
  }

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

function normaliseNumerology(input) {
  if (!input) {
    return DEFAULT_NUM;
  }
  const merged = { ...DEFAULT_NUM };
  for (const key of Object.keys(DEFAULT_NUM)) {
    if (Number.isFinite(input[key])) {
      merged[key] = input[key];
    }
  }
  return Object.freeze(merged);
}

function computeClearspace(width, height, NUM) {
  const minSide = Math.min(width, height);
  const ratioValue = minSide * CLEARSPACE_MIN_RATIO;
  const numerologyStep = minSide / Math.max(NUM.ONEFORTYFOUR, 1);
  const raw = Math.max(CLEARSPACE_MIN_PX, ratioValue, numerologyStep * NUM.THREE);
  const maxAllowed = minSide / NUM.THREE;
  return Math.min(raw, maxAllowed);
}

function fillBackground(ctx, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawVesicaField({ ctx, frame, palette, NUM }) {
  const { x, y, width, height } = frame;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.min(width, height) / NUM.THREE;
  const offset = radius * 0.75;
  const lineWidth = Math.max(Math.min(width, height) / NUM.NINETYNINE, 1.2);

  ctx.save();
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = 0.9;

  drawCircle(ctx, centerX - offset, centerY, radius);
  drawCircle(ctx, centerX + offset, centerY, radius);

  ctx.strokeStyle = palette.layers[1];
  ctx.globalAlpha = 0.6;
  const verticalSpacing = height / NUM.NINE;
  for (let step = -1; step <= 1; step += 1) {
    drawCircle(ctx, centerX, centerY + verticalSpacing * step * NUM.THREE / NUM.SEVEN, radius * 0.82);
  }

  ctx.strokeStyle = palette.layers[0];
  ctx.globalAlpha = 0.4;
  const horizontalSpacing = width / NUM.NINE;
  for (let index = -NUM.THREE; index <= NUM.THREE; index += 1) {
    const cx = centerX + horizontalSpacing * index / NUM.THREE;
    drawCircle(ctx, cx, centerY, radius * 0.42);
  }

  ctx.restore();
}

function drawTreeOfLife({ ctx, frame, palette, NUM }) {
  const { x, y, width, height } = frame;
  const columns = [x + width * 0.2, x + width * 0.5, x + width * 0.8];
  const rowStep = height / (NUM.SEVEN - 1);
  const nodeRadius = Math.max(Math.min(width, height) / NUM.ONEFORTYFOUR * NUM.THREE, 6);

  const nodes = [
    { id: "keter", col: 1, row: 0 },
    { id: "chokmah", col: 2, row: 1 },
    { id: "binah", col: 0, row: 1 },
    { id: "chesed", col: 2, row: 2 },
    { id: "geburah", col: 0, row: 2 },
    { id: "tiphareth", col: 1, row: 3 },
    { id: "netzach", col: 2, row: 4 },
    { id: "hod", col: 0, row: 4 },
    { id: "yesod", col: 1, row: 5 },
    { id: "malkuth", col: 1, row: 6 }
  ].map(node => ({
    ...node,
    x: columns[node.col],
    y: y + rowStep * node.row
  }));

  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const paths = [
    ["keter", "chokmah"], ["keter", "binah"],
    ["chokmah", "binah"], ["chokmah", "chesed"],
    ["binah", "geburah"], ["chesed", "geburah"],
    ["chesed", "tiphareth"], ["geburah", "tiphareth"],
    ["tiphareth", "netzach"], ["tiphareth", "hod"],
    ["netzach", "hod"], ["netzach", "yesod"],
    ["hod", "yesod"], ["yesod", "malkuth"],
    ["binah", "tiphareth"], ["chokmah", "tiphareth"],
    ["keter", "tiphareth"], ["chokmah", "netzach"],
    ["binah", "hod"], ["chesed", "netzach"],
    ["geburah", "hod"], ["netzach", "malkuth"],
    ["hod", "malkuth"]
  ];

  ctx.save();
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = Math.max(nodeRadius / NUM.THREE, 1.6);
  ctx.globalAlpha = 0.7;

  for (const [fromId, toId] of paths) {
    const from = nodeMap.get(fromId);
    const to = nodeMap.get(toId);
    if (!from || !to) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.8;
  for (const node of nodes) {
    ctx.beginPath();
    ctx.fillStyle = withAlpha(palette.layers[5], 0.2);
    ctx.arc(node.x, node.y, nodeRadius * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.ink;
  ctx.strokeStyle = palette.layers[2];
  ctx.lineWidth = Math.max(nodeRadius / NUM.SEVEN, 1);
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawFibonacciCurve({ ctx, frame, palette, NUM }) {
  const { x, y, width, height } = frame;
  const segments = Math.max(NUM.TWENTYTWO, 12);
  const center = {
    x: x + width * 0.32,
    y: y + height * 0.68
  };
  const startRadius = Math.min(width, height) / NUM.SEVEN;
  const thetaStep = Math.PI / NUM.ELEVEN;

  ctx.save();
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = Math.max(startRadius / NUM.THREE, 1.4);
  ctx.globalAlpha = 0.9;
  ctx.beginPath();

  for (let index = 0; index <= segments; index += 1) {
    const theta = index * thetaStep;
    const radius = startRadius * Math.pow(GOLDEN_RATIO, theta / (Math.PI * 2));
    const px = center.x + Math.cos(theta) * radius;
    const py = center.y - Math.sin(theta) * radius;
    if (index === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
  ctx.restore();
}

function drawHelixLattice({ ctx, frame, palette, NUM }) {
  const { x, y, width, height } = frame;
  const centerX = x + width * 0.72;
  const amplitude = width / NUM.SEVEN;
  const steps = Math.max(NUM.ONEFORTYFOUR, 90);
  const period = Math.PI * NUM.THREE;

  const leftPath = [];
  const rightPath = [];
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const angle = t * period;
    const vertical = y + t * height;
    const offset = Math.sin(angle) * amplitude;
    leftPath.push({ x: centerX - offset, y: vertical });
    rightPath.push({ x: centerX + offset, y: vertical });
  }

  ctx.save();
  ctx.strokeStyle = palette.layers[4];
  ctx.lineWidth = Math.max(width / NUM.NINETYNINE, 1.2);
  drawPolyline(ctx, leftPath);
  drawPolyline(ctx, rightPath);

  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(width / NUM.ONEFORTYFOUR, 0.9);
  const rungStep = Math.max(1, Math.floor(steps / NUM.TWENTYTWO));
  for (let index = 0; index <= steps; index += rungStep) {
    const left = leftPath[index];
    const right = rightPath[index];
    if (!left || !right) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSafeFrameOverlay({ ctx, frame }) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 1;
  ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
  ctx.restore();
}

function drawCircle(ctx, cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawPolyline(ctx, points) {
  if (!points.length) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    const point = points[index];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}

function withAlpha(hex, alpha) {
  if (typeof hex !== "string" || hex[0] !== "#") {
    return hex;
  }
  const value = hex.slice(1);
  if (value.length === 6) {
    return `rgba(${parseInt(value.slice(0, 2), 16)}, ${parseInt(value.slice(2, 4), 16)}, ${parseInt(value.slice(4, 6), 16)}, ${alpha})`;
  }
  return hex;
}
