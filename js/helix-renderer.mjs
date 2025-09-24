/*
  helix-renderer.mjs

  ND-safe static renderer for the layered Cosmic Helix cosmology.
  Geometry renders once per invocation and never animates, ensuring
  sensory calm while keeping sacred depth intact.

  Layer sequence (base to crown):
    1) Vesica field - interlocking circles for grounding geometry.
    2) Tree-of-Life scaffold - ten sephirot with twenty-two connective paths.
    3) Fibonacci curve - phi-guided growth arc plotted as a static polyline.
    4) Double-helix lattice - two phase-shifted strands with gentle crossbars.

  All drawing helpers are pure functions that receive explicit state
  so the renderer stays predictable when edited offline.
*/

const DEFAULT_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
});

const DEFAULT_NUMEROLOGY = Object.freeze({
  THREE: 3,
  SEVEN: 7,
  NINE: 9,
  ELEVEN: 11,
  TWENTYTWO: 22,
  THIRTYTHREE: 33,
  NINETYNINE: 99,
  ONEFORTYFOUR: 144
});

const TREE_PATHS = Object.freeze([
  ["keter", "chokmah"],
  ["keter", "binah"],
  ["chokmah", "binah"],
  ["chokmah", "chesed"],
  ["binah", "gevurah"],
  ["chesed", "gevurah"],
  ["chesed", "tiferet"],
  ["gevurah", "tiferet"],
  ["chesed", "netzach"],
  ["gevurah", "hod"],
  ["tiferet", "netzach"],
  ["tiferet", "hod"],
  ["netzach", "hod"],
  ["netzach", "yesod"],
  ["hod", "yesod"],
  ["yesod", "malkuth"],
  ["binah", "tiferet"],
  ["chokmah", "tiferet"],
  ["keter", "tiferet"],
  ["tiferet", "yesod"],
  ["chokmah", "netzach"],
  ["binah", "hod"]
]);

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const TAU = Math.PI * 2;

export function renderHelix(ctx, options = {}) {
  if (!ctx) {
    return { ok: false, reason: "missing-context" };
  }

  const width = sanitiseDimension(options.width, ctx.canvas ? ctx.canvas.width : 1440);
  const height = sanitiseDimension(options.height, ctx.canvas ? ctx.canvas.height : 900);
  const palette = normalisePalette(options.palette);
  const numerology = normaliseNumerology(options.numerology || options.NUM);
  const margin = computeMargin(width, height, numerology);
  const stage = createStage(width, height, margin);

  const settings = {
    width,
    height,
    palette,
    numerology,
    margin,
    stage,
    center: { x: stage.x + stage.width / 2, y: stage.y + stage.height / 2 },
    missingPalette: Boolean(options.missingPalette)
  };

  ctx.save();
  configureContext(ctx);
  paintBackground(ctx, palette.bg, width, height);

  // Draw order preserves depth: vesica forms the field, then structure, growth, and helix crown.
  drawVesicaField(ctx, settings);
  drawTreeOfLife(ctx, settings);
  drawFibonacciCurve(ctx, settings);
  drawHelixLattice(ctx, settings);

  if (settings.missingPalette) {
    drawPaletteNotice(ctx, settings);
  }

  ctx.restore();
  return { ok: true, settings };
}

function configureContext(ctx) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.miterLimit = 6;
}

function paintBackground(ctx, color, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function drawVesicaField(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const rows = numerology.SEVEN;
  const cols = numerology.NINE;
  const stepX = stage.width / (cols - 1);
  const stepY = stage.height / (rows - 1);
  const radius = Math.min(stepX, stepY) * numerology.NINE / numerology.TWENTYTWO;
  const strokeWidth = Math.max(1.5, radius / numerology.THIRTYTHREE);
  const color = withAlpha(palette.layers[0], 0.22);

  ctx.save();
  // ND-safe: thin translucent lines keep the vesica gentle while preserving contrast.
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = color;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = stage.x + col * stepX;
      const cy = stage.y + row * stepY;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const nodes = createTreeNodes(stage, numerology);
  const pathColor = withAlpha(palette.layers[1], 0.65);
  const nodeColor = palette.layers[2];
  const haloColor = withAlpha(palette.layers[2], 0.2);
  const pathWidth = Math.max(2, stage.width / numerology.ONEFORTYFOUR * numerology.THREE / numerology.SEVEN);
  const nodeRadius = Math.max(stage.width, stage.height) / numerology.NINETYNINE;
  const haloRadius = nodeRadius * (numerology.TWENTYTWO / numerology.ELEVEN);

  ctx.save();
  // ND-safe: halos soften the sephirot without motion; ratios follow sacred numerology constants.
  ctx.lineWidth = pathWidth;
  ctx.strokeStyle = pathColor;

  for (const [a, b] of TREE_PATHS) {
    const start = nodes[a];
    const end = nodes[b];
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  for (const key of Object.keys(nodes)) {
    const node = nodes[key];
    ctx.beginPath();
    ctx.fillStyle = haloColor;
    ctx.arc(node.x, node.y, haloRadius, 0, TAU);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = nodeColor;
    ctx.arc(node.x, node.y, nodeRadius, 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

function createTreeNodes(stage, numerology) {
  const rowCount = numerology.SEVEN;
  const verticalMargin = stage.height / numerology.THIRTYTHREE;
  const usableHeight = stage.height - verticalMargin * 2;
  const rowStep = usableHeight / (rowCount - 1);

  const rowY = (index) => stage.y + verticalMargin + rowStep * index;
  const centerX = stage.x + stage.width / 2;
  const majorOffset = stage.width / numerology.THREE;
  const minorOffset = stage.width / numerology.SEVEN;

  return {
    keter: { x: centerX, y: rowY(0) },
    chokmah: { x: centerX + majorOffset, y: rowY(1) },
    binah: { x: centerX - majorOffset, y: rowY(1) },
    chesed: { x: centerX + minorOffset, y: rowY(2) },
    gevurah: { x: centerX - minorOffset, y: rowY(2) },
    tiferet: { x: centerX, y: rowY(3) },
    netzach: { x: centerX + minorOffset, y: rowY(4) },
    hod: { x: centerX - minorOffset, y: rowY(4) },
    yesod: { x: centerX, y: rowY(5) },
    malkuth: { x: centerX, y: rowY(6) }
  };
}

function drawFibonacciCurve(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const steps = numerology.NINETYNINE;
  const baseRadius = Math.min(stage.width, stage.height) / numerology.THIRTYTHREE;
  const centerX = stage.x + stage.width / numerology.THREE;
  const centerY = stage.y + stage.height * (numerology.SEVEN / numerology.NINE);
  const strokeWidth = Math.max(2, baseRadius / numerology.SEVEN);
  const strokeColor = withAlpha(palette.layers[3], 0.8);

  const points = [];
  for (let index = 0; index < steps; index += 1) {
    const t = index / numerology.THIRTYTHREE;
    const angle = t * TAU;
    const growth = Math.pow(GOLDEN_RATIO, index / numerology.TWENTYTWO);
    const radius = baseRadius * growth;
    const rawX = centerX + Math.cos(angle) * radius;
    const rawY = centerY - Math.sin(angle) * radius;
    points.push({
      x: clamp(rawX, stage.x, stage.x + stage.width),
      y: clamp(rawY, stage.y, stage.y + stage.height)
    });
  }

  ctx.save();
  // ND-safe: polyline is static and clamped inside stage bounds to avoid overstimulation.
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = strokeColor;
  strokePolyline(ctx, points);
  ctx.restore();
}

function drawHelixLattice(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const sampleCount = numerology.NINETYNINE;
  const amplitude = stage.width / numerology.NINE;
  const spineX = stage.x + stage.width * (numerology.ELEVEN / numerology.TWENTYTWO);
  const phaseOffset = stage.width / numerology.THIRTYTHREE;
  const strandA = [];
  const strandB = [];

  for (let index = 0; index < sampleCount; index += 1) {
    const t = index / (sampleCount - 1);
    const angle = t * Math.PI * numerology.TWENTYTWO / numerology.SEVEN;
    const y = stage.y + t * stage.height;
    const offset = Math.sin(angle) * amplitude;
    strandA.push({
      x: clamp(spineX - offset - phaseOffset, stage.x, stage.x + stage.width),
      y
    });
    strandB.push({
      x: clamp(spineX + offset + phaseOffset, stage.x, stage.x + stage.width),
      y
    });
  }

  ctx.save();
  // ND-safe: mirrored strands hint at motion without animating; translucent strokes keep depth soft.
  ctx.lineWidth = Math.max(1.5, stage.width / numerology.ONEFORTYFOUR);
  ctx.strokeStyle = withAlpha(palette.layers[4], 0.7);
  strokePolyline(ctx, strandA);
  ctx.strokeStyle = withAlpha(palette.layers[5], 0.7);
  strokePolyline(ctx, strandB);

  const rungCount = numerology.THIRTYTHREE;
  ctx.strokeStyle = withAlpha(palette.ink, 0.25);
  ctx.lineWidth = Math.max(1, stage.width / numerology.ONEFORTYFOUR);
  for (let rung = 0; rung < rungCount; rung += 1) {
    const t = rung / (rungCount - 1);
    const index = Math.floor(t * (sampleCount - 1));
    const start = strandA[index];
    const end = strandB[index];
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPaletteNotice(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const message = "Palette fallback active (data/palette.json missing).";
  const padding = Math.max(8, stage.width / numerology.ONEFORTYFOUR);
  const x = stage.x + padding;
  const y = stage.y + padding;

  ctx.save();
  ctx.font = "14px system-ui, sans-serif";
  ctx.textBaseline = "top";
  const metrics = ctx.measureText(message);
  const height = 18;

  ctx.fillStyle = withAlpha(palette.bg, 0.85);
  ctx.fillRect(x - padding, y - padding, metrics.width + padding * 2, height + padding * 2);
  ctx.fillStyle = withAlpha(palette.ink, 0.75);
  ctx.fillText(message, x, y);
  ctx.restore();
}

function strokePolyline(ctx, points) {
  if (!points.length) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();
}

function computeMargin(width, height, numerology) {
  const minSide = Math.min(width, height);
  const harmonic = minSide / numerology.ELEVEN;
  const cushion = (minSide / numerology.NINETYNINE) * numerology.THREE;
  const floor = numerology.THIRTYTHREE;
  return Math.max(floor, harmonic, cushion);
}

function createStage(width, height, margin) {
  return {
    x: margin,
    y: margin,
    width: Math.max(1, width - margin * 2),
    height: Math.max(1, height - margin * 2)
  };
}

function sanitiseDimension(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return fallback;
  }
  return numeric;
}

function normalisePalette(input) {
  if (!input || typeof input !== "object") {
    return DEFAULT_PALETTE;
  }

  const layers = [];
  for (let index = 0; index < DEFAULT_PALETTE.layers.length; index += 1) {
    const candidate = Array.isArray(input.layers) ? input.layers[index] : undefined;
    layers.push(typeof candidate === "string" ? candidate : DEFAULT_PALETTE.layers[index]);
  }

  return {
    bg: typeof input.bg === "string" ? input.bg : DEFAULT_PALETTE.bg,
    ink: typeof input.ink === "string" ? input.ink : DEFAULT_PALETTE.ink,
    layers
  };
}

function normaliseNumerology(input) {
  const base = { ...DEFAULT_NUMEROLOGY };
  if (!input || typeof input !== "object") {
    return base;
  }
  for (const key of Object.keys(base)) {
    const numeric = Number(input[key]);
    if (Number.isFinite(numeric) && numeric > 0) {
      base[key] = numeric;
    }
  }
  return base;
}

function withAlpha(hex, alpha) {
  const rgb = hexToRgb(hex);
  const safeAlpha = clamp(alpha, 0, 1);
  if (!rgb) {
    return `rgba(0, 0, 0, ${safeAlpha})`;
  }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${safeAlpha})`;
}

function hexToRgb(hex) {
  if (typeof hex !== "string") {
    return null;
  }
  const normalised = hex.trim().replace(/^#/, "");
  if (normalised.length !== 6) {
    return null;
  }
  const value = Number.parseInt(normalised, 16);
  if (!Number.isFinite(value)) {
    return null;
  }
  return {
    r: (value >> 16) & 0xff,
    g: (value >> 8) & 0xff,
    b: value & 0xff
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
