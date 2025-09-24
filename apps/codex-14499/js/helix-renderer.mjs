/*
  helix-renderer.mjs
  Static, ND-safe renderer for the Cosmic Helix canvas.

  Layer order preserves sensory calm and sacred depth:
    1) Vesica field (interlocking circles as the grounding lattice)
    2) Tree-of-Life scaffold (ten sephirot, twenty-two connective paths)
    3) Fibonacci curve (phi-guided spiral drawn once, no motion)
    4) Double helix lattice (two mirrored strands with steady crossbars)

  All helpers are pure and deterministic so offline edits stay predictable.
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

const CLEARSPACE_MIN_RATIO = 0.08;
const CLEARSPACE_MIN_PX = 48;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export function renderHelix(ctx, options = {}) {
  if (!ctx) {
    return { ok: false, reason: "No 2d context provided." };
  }

  const settings = createSettings(ctx, options);

  ctx.save();
  resetCanvas(ctx, settings);

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

function createSettings(ctx, options) {
  const width = sanitiseDimension(options.width, ctx.canvas ? ctx.canvas.width : 1440);
  const height = sanitiseDimension(options.height, ctx.canvas ? ctx.canvas.height : 900);
  const palette = normalisePalette(options.palette);
  const numerology = normaliseNumerology(options.numerology || options.NUM);
  const margin = Math.max(CLEARSPACE_MIN_PX, Math.min(width, height) * CLEARSPACE_MIN_RATIO);
  const stage = {
    x: margin,
    y: margin,
    width: Math.max(1, width - margin * 2),
    height: Math.max(1, height - margin * 2)
  };

  return {
    width,
    height,
    palette,
    numerology,
    margin,
    stage,
    center: { x: width / 2, y: height / 2 },
    missingPalette: Boolean(options.missingPalette)
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

function normalisePalette(input) {
  if (!input) {
    return DEFAULT_PALETTE;
  }

  const layers = Array.isArray(input.layers)
    ? input.layers.filter(color => typeof color === "string" && color.trim())
    : [];

  while (layers.length < DEFAULT_PALETTE.layers.length) {
    layers.push(DEFAULT_PALETTE.layers[layers.length]);
  }

  return {
    bg: typeof input.bg === "string" ? input.bg : DEFAULT_PALETTE.bg,
    ink: typeof input.ink === "string" ? input.ink : DEFAULT_PALETTE.ink,
    layers: layers.slice(0, DEFAULT_PALETTE.layers.length)
  };
}

function normaliseNumerology(input) {
  if (!input) {
    return DEFAULT_NUMEROLOGY;
  }

  const output = { ...DEFAULT_NUMEROLOGY };
  for (const key of Object.keys(DEFAULT_NUMEROLOGY)) {
    const value = input[key];
    if (Number.isFinite(value) && value > 0) {
      output[key] = value;
    }
  }
  return output;
}

function resetCanvas(ctx, settings) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, settings.width, settings.height);
  ctx.fillStyle = settings.palette.bg;
  ctx.fillRect(0, 0, settings.width, settings.height);
}

function drawVesicaField(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const cols = Math.max(2, Math.floor(numerology.NINE));
  const rows = Math.max(2, Math.floor(numerology.SEVEN));
  const field = insetRect(stage, 0.92);
  const spacingX = cols > 1 ? field.width / (cols - 1) : field.width;
  const spacingY = rows > 1 ? field.height / (rows - 1) : field.height;
  const radius = Math.min(spacingX, spacingY) / 2.2;

  ctx.save();
  ctx.strokeStyle = palette.layers[0];
  ctx.lineWidth = Math.max(1, stage.width / 720);
  ctx.globalAlpha = 0.88;

  for (let row = 0; row < rows; row += 1) {
    const y = field.y + row * spacingY;
    for (let col = 0; col < cols; col += 1) {
      const x = field.x + col * spacingX;
      strokeCircle(ctx, x, y, radius);
      // Offset circle to create vesica overlap using numerology.THREE as divisor.
      const offset = spacingX / numerology.THREE;
      strokeCircle(ctx, x + offset / 2, y, radius);
    }
  }

  ctx.restore();
}

function drawTreeOfLife(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const nodes = computeTreeNodes(stage);
  const paths = computeTreePaths();
  const nodeRadius = Math.max(6, Math.min(stage.width, stage.height) / (numerology.TWENTYTWO));
  const pathWidth = Math.max(1.5, stage.width / (numerology.NINETYNINE));

  ctx.save();
  ctx.lineWidth = pathWidth;
  ctx.strokeStyle = palette.layers[1];
  ctx.globalAlpha = 0.9;

  for (const [fromIndex, toIndex] of paths) {
    const from = nodes[fromIndex];
    const to = nodes[toIndex];
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  ctx.fillStyle = palette.layers[2];
  ctx.strokeStyle = palette.ink;
  ctx.lineWidth = Math.max(1, pathWidth / 2);

  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function computeTreeNodes(stage) {
  const layout = [
    { x: 0.5, y: 0.04 }, // Keter
    { x: 0.78, y: 0.16 }, // Chokmah
    { x: 0.22, y: 0.16 }, // Binah
    { x: 0.8, y: 0.34 }, // Chesed
    { x: 0.2, y: 0.34 }, // Gevurah
    { x: 0.5, y: 0.48 }, // Tiferet
    { x: 0.82, y: 0.64 }, // Netzach
    { x: 0.18, y: 0.64 }, // Hod
    { x: 0.5, y: 0.78 }, // Yesod
    { x: 0.5, y: 0.92 }  // Malkuth
  ];

  return layout.map(point => ({
    x: stage.x + point.x * stage.width,
    y: stage.y + point.y * stage.height
  }));
}

function computeTreePaths() {
  return [
    [0, 1], [0, 2], [1, 2],
    [1, 3], [1, 5], [2, 4], [2, 5],
    [3, 4], [3, 5], [4, 5],
    [3, 6], [3, 8], [4, 7], [4, 8],
    [5, 6], [5, 7], [6, 7],
    [6, 8], [7, 8], [6, 9], [7, 9], [8, 9]
  ];
}

function drawFibonacciCurve(ctx, settings) {
  const { stage, palette, numerology, center } = settings;
  const steps = Math.max(12, Math.floor(numerology.NINETYNINE));
  const angleIncrement = Math.PI / numerology.ELEVEN;
  const maxRadius = Math.min(stage.width, stage.height) * 0.46;
  const baseRadius = maxRadius / numerology.THREE;
  const spiralCenter = {
    x: center.x,
    y: stage.y + stage.height * 0.6
  };

  const points = [];
  for (let index = 0; index < steps; index += 1) {
    const angle = index * angleIncrement;
    const growth = Math.pow(GOLDEN_RATIO, angle / Math.PI);
    const radius = Math.min(maxRadius, baseRadius * growth);
    const x = spiralCenter.x + Math.cos(angle) * radius;
    const y = spiralCenter.y + Math.sin(angle) * radius;
    points.push({ x, y });
  }

  if (points.length < 2) {
    return;
  }

  ctx.save();
  ctx.strokeStyle = palette.layers[3];
  ctx.lineWidth = Math.max(1, stage.width / 960);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawHelixLattice(ctx, settings) {
  const { stage, palette, numerology } = settings;
  const samples = Math.max(12, Math.floor(numerology.ONEFORTYFOUR));
  const amplitude = stage.width / numerology.SEVEN;
  const verticalStep = stage.height / (samples - 1);
  const frequency = (Math.PI * 2) / numerology.THIRTYTHREE;

  const strandA = [];
  const strandB = [];

  for (let index = 0; index < samples; index += 1) {
    const y = stage.y + index * verticalStep;
    const angle = index * frequency;
    const xA = stage.x + stage.width / 2 + Math.sin(angle) * amplitude;
    const xB = stage.x + stage.width / 2 + Math.sin(angle + Math.PI) * amplitude;
    strandA.push({ x: xA, y });
    strandB.push({ x: xB, y });
  }

  ctx.save();
  ctx.lineWidth = Math.max(1.25, stage.width / 840);
  ctx.strokeStyle = palette.layers[4];
  strokePolyline(ctx, strandA);
  strokePolyline(ctx, strandB);

  const rungInterval = Math.max(3, Math.floor(samples / numerology.TWENTYTWO));
  ctx.strokeStyle = palette.layers[5];
  ctx.lineWidth = Math.max(1, stage.width / 1024);
  ctx.globalAlpha = 0.85;

  for (let index = 0; index < samples; index += rungInterval) {
    const a = strandA[index];
    const b = strandB[index];
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

function drawPaletteNotice(ctx, settings) {
  const { palette, stage } = settings;
  const y = Math.max(20, stage.y - 18);
  ctx.save();
  ctx.fillStyle = palette.ink;
  ctx.globalAlpha = 0.72;
  ctx.font = "13px system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("Palette file missing — using built-in fallback.", stage.x, y);
  ctx.restore();
}

function insetRect(rect, factor) {
  const clamped = Math.min(Math.max(factor, 0.1), 1);
  const insetX = rect.width * (1 - clamped) / 2;
  const insetY = rect.height * (1 - clamped) / 2;
  return {
    x: rect.x + insetX,
    y: rect.y + insetY,
    width: rect.width * clamped,
    height: rect.height * clamped
  };
}

function strokeCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
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
