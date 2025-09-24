/*
  helix-renderer.mjs

  Static, offline renderer for the layered Cosmic Helix cosmology.

  Layer sequence (renders from base to crown):
    1. Vesica field (intersecting lattice) for grounding geometry.
    2. Tree-of-Life scaffold (10 nodes, 22 paths) for structure.
    3. Fibonacci curve (phi spiral approximation) for growth.
    4. Double-helix lattice (mirrored strands) for crown resonance.

  ND-safe principles: no animation loops, calm contrast, generous clearspace.
  All helpers are pure and side-effect free beyond drawing into the provided context.

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

  layers: ["#88a6ff", "#7fe7f2", "#9cf5b4", "#ffd27f", "#f4a7ff", "#d6d6ed"]

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

export function renderHelix(ctx, options = {}) {
  if (!ctx) {
    return { ok: false, reason: "missing-context" };
  }

  const width = sanitiseDimension(options.width, ctx.canvas && ctx.canvas.width ? ctx.canvas.width : 1440);
  const height = sanitiseDimension(options.height, ctx.canvas && ctx.canvas.height ? ctx.canvas.height : 900);
  const palette = normalisePalette(options.palette);
  const NUM = normaliseNumerology(options.NUM);

  const minDimension = Math.min(width, height);
  const clearCandidate = minDimension / NUM.ELEVEN;
  const clearMinimum = (minDimension / NUM.ONEFORTYFOUR) * NUM.THREE;
  const clearspace = Math.max(clearCandidate, clearMinimum);
  const frame = createFrame(width, height, clearspace);

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


  ctx.save();
  configureContext(ctx);
  paintBackground(ctx, width, height, palette.bg);


  if (options.missingPalette) {
    drawPaletteNotice(ctx, frame, palette, NUM);
  }

  paintVesicaField(ctx, frame, palette, NUM);
  paintTreeOfLife(ctx, frame, palette, NUM);
  paintFibonacciCurve(ctx, frame, palette, NUM);
  paintHelixLattice(ctx, frame, palette, NUM);

  ctx.restore();

  return { ok: true, palette, NUM, frame, clearspace };
}

function configureContext(ctx) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function paintBackground(ctx, width, height, color) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

function drawPaletteNotice(ctx, frame, palette, NUM) {
  const message = "Palette fallback active (data/palette.json missing).";
  const padding = frame.clearspace / NUM.ONEFORTYFOUR * NUM.SEVEN;
  const textY = frame.y + Math.max(4, frame.clearspace / NUM.ELEVEN);

  ctx.save();
  ctx.font = "14px system-ui, sans-serif";
  ctx.textBaseline = "top";
  const metrics = ctx.measureText(message);
  const textWidth = metrics.width;
  const textHeight = 18;

  ctx.fillStyle = withAlpha(palette.bg, 0.85);
  ctx.fillRect(frame.x - padding, textY - padding, textWidth + padding * 2, textHeight + padding);

  ctx.fillStyle = withAlpha(palette.ink, 0.7);
  ctx.fillText(message, frame.x, textY);
  ctx.restore();
}

function paintVesicaField(ctx, frame, palette, NUM) {
  const rows = NUM.SEVEN;
  const cols = NUM.NINE;
  const stepX = frame.width / (cols - 1);
  const stepY = frame.height / (rows - 1);
  const radius = Math.min(stepX, stepY) * NUM.NINE / NUM.TWENTYTWO;
  const offset = radius / NUM.THREE;

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.45);
  ctx.lineWidth = Math.max(1, radius / NUM.ELEVEN);

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

      const cx = frame.x + col * stepX;
      const cy = frame.y + row * stepY;
      drawCircle(ctx, cx - offset, cy, radius, { stroke: true, fill: false });
      drawCircle(ctx, cx + offset, cy, radius, { stroke: true, fill: false });

      const x = field.x + col * spacingX;
      strokeCircle(ctx, x, y, radius);
      // Offset circle to create vesica overlap using numerology.THREE as divisor.
      const offset = spacingX / numerology.THREE;
      strokeCircle(ctx, x + offset / 2, y, radius);

    }
  }

  ctx.restore();


  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[0], 0.2);
  ctx.lineWidth = Math.max(1, radius / NUM.NINETYNINE * NUM.SEVEN);
  const centerX = frame.x + frame.width / 2;
  const centerY = frame.y + frame.height / 2;
  const ringCount = NUM.SEVEN;
  for (let index = 1; index <= ringCount; index += 1) {
    const ringRadius = radius * (1 + index / (NUM.SEVEN + NUM.THREE));
    drawCircle(ctx, centerX, centerY, ringRadius, { stroke: true, fill: false });
  }

  const gridSteps = NUM.NINE;
  for (let i = 0; i <= gridSteps; i += 1) {
    const x = frame.x + (frame.width / gridSteps) * i;
    const y = frame.y + (frame.height / gridSteps) * i;
    drawLine(ctx, x, frame.y, x, frame.y + frame.height);
    drawLine(ctx, frame.x, y, frame.x + frame.width, y);
  }
  ctx.restore();
}

function paintTreeOfLife(ctx, frame, palette, NUM) {
  const nodes = buildTreeNodes(frame, NUM);
  const nodeRadius = Math.min(frame.width, frame.height) / NUM.THIRTYTHREE;
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[1], 0.6);
  ctx.lineWidth = Math.max(1.2, nodeRadius / NUM.ELEVEN);
  TREE_PATHS.forEach(([fromId, toId]) => {
    const from = nodeMap.get(fromId);
    const to = nodeMap.get(toId);
    if (from && to) {
      drawLine(ctx, from.x, from.y, to.x, to.y);
    }
  });
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.ink, 0.72);
  ctx.fillStyle = withAlpha(palette.layers[2], 0.85);
  ctx.lineWidth = Math.max(1, nodeRadius / NUM.THIRTYTHREE * NUM.SEVEN);
  nodes.forEach((node) => {
    drawCircle(ctx, node.x, node.y, nodeRadius, { stroke: true, fill: true });
  });
  ctx.restore();
}

function paintFibonacciCurve(ctx, frame, palette, NUM) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO + NUM.ELEVEN;
  const angleRange = Math.PI * (NUM.THIRTYTHREE / NUM.ELEVEN);
  const originX = frame.x + frame.width / NUM.THREE;
  const originY = frame.y + frame.height * (NUM.TWENTYTWO / NUM.THIRTYTHREE);
  const scale = Math.min(frame.width, frame.height) / NUM.TWENTYTWO;

  const points = [];
  for (let index = 0; index <= steps; index += 1) {
    const ratio = index / steps;
    const angle = angleRange * ratio;
    const radius = scale * Math.pow(phi, ratio * (NUM.THIRTYTHREE / NUM.NINETYNINE));
    const x = originX + radius * Math.cos(angle);
    const y = originY - radius * Math.sin(angle);
    points.push({ x, y });
  }

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[3], 0.82);
  ctx.lineWidth = Math.max(1.5, scale / NUM.ELEVEN);
  drawPolyline(ctx, points);
  ctx.restore();

  if (points.length > 1) {
    ctx.save();
    ctx.fillStyle = withAlpha(palette.layers[3], 0.9);
    const markerRadius = Math.max(2, scale / NUM.THIRTYTHREE);
    drawCircle(ctx, points[0].x, points[0].y, markerRadius, { stroke: false, fill: true });
    const last = points[points.length - 1];
    drawCircle(ctx, last.x, last.y, markerRadius, { stroke: false, fill: true });
    ctx.restore();
  }
}

function paintHelixLattice(ctx, frame, palette, NUM) {
  const samples = NUM.NINETYNINE;
  const centerX = frame.x + frame.width / 2;
  const amplitude = frame.width / NUM.TWENTYTWO;
  const frequency = Math.PI * (NUM.THIRTYTHREE / NUM.ELEVEN);
  const pointsA = [];
  const pointsB = [];

  for (let index = 0; index < samples; index += 1) {
    const t = index / (samples - 1);
    const angle = frequency * t;
    const y = frame.y + t * frame.height;
    const xA = centerX + amplitude * Math.sin(angle);
    const xB = centerX - amplitude * Math.sin(angle);
    pointsA.push({ x: xA, y });
    pointsB.push({ x: xB, y });
  }

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[4], 0.7);
  ctx.lineWidth = Math.max(1, amplitude / NUM.THIRTYTHREE);
  drawPolyline(ctx, pointsA);
  drawPolyline(ctx, pointsB);
  ctx.restore();

  const rungStep = Math.max(1, Math.round(samples / NUM.TWENTYTWO));
  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[5], 0.45);
  ctx.lineWidth = Math.max(1, amplitude / NUM.NINETYNINE * NUM.SEVEN);
  for (let i = 0; i < samples; i += rungStep) {
    const start = pointsA[i];
    const end = pointsB[i];
    if (start && end) {
      drawLine(ctx, start.x, start.y, end.x, end.y);
    }
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = withAlpha(palette.layers[5], 0.22);
  ctx.lineWidth = Math.max(1, amplitude / NUM.ONEFORTYFOUR * NUM.SEVEN);
  drawLine(ctx, centerX, frame.y, centerX, frame.y + frame.height);
  ctx.restore();

  const beadStep = Math.max(1, Math.round(samples / NUM.THIRTYTHREE));
  ctx.save();
  ctx.fillStyle = withAlpha(palette.layers[4], 0.82);
  const beadRadius = Math.max(1.5, amplitude / NUM.ONEFORTYFOUR * NUM.SEVEN);
  for (let i = 0; i < samples; i += beadStep) {
    const a = pointsA[i];
    const b = pointsB[i];
    if (a && b) {
      drawCircle(ctx, a.x, a.y, beadRadius, { stroke: false, fill: true });
      drawCircle(ctx, b.x, b.y, beadRadius, { stroke: false, fill: true });
    }
  }
  ctx.restore();
}

function buildTreeNodes(frame, NUM) {
  const centerX = frame.x + frame.width / 2;
  const offsetMajor = frame.width * NUM.SEVEN / NUM.THIRTYTHREE;
  const offsetMinor = frame.width * NUM.THREE / NUM.THIRTYTHREE;
  const tierSpacing = frame.height / (NUM.SEVEN + NUM.THREE);

  const yKeter = frame.y + tierSpacing;
  const ySupernal = yKeter + tierSpacing;
  const yChesed = ySupernal + tierSpacing * (NUM.TWENTYTWO / NUM.ELEVEN);
  const yTiferet = yChesed + tierSpacing;
  const yNetzach = yTiferet + tierSpacing * (NUM.TWENTYTWO / NUM.ELEVEN);
  const yYesod = yNetzach + tierSpacing;
  const yMalkuth = yYesod + tierSpacing;

  return [
    { id: "keter", x: centerX, y: yKeter },
    { id: "chokmah", x: centerX + offsetMajor, y: ySupernal },
    { id: "binah", x: centerX - offsetMajor, y: ySupernal },
    { id: "chesed", x: centerX + offsetMinor, y: yChesed },
    { id: "gevurah", x: centerX - offsetMinor, y: yChesed },
    { id: "tiferet", x: centerX, y: yTiferet },
    { id: "netzach", x: centerX + offsetMinor, y: yNetzach },
    { id: "hod", x: centerX - offsetMinor, y: yNetzach },
    { id: "yesod", x: centerX, y: yYesod },
    { id: "malkuth", x: centerX, y: yMalkuth }
  ];
}

function drawCircle(ctx, x, y, radius, mode) {
=======
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
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (mode && mode.fill) {
    ctx.fill();
  }
  if (!mode || mode.stroke) {
    ctx.stroke();
  }


function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawPolyline(ctx, points) {
  if (!Array.isArray(points) || points.length < 2) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();
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

function createFrame(width, height, clearspace) {
  const safeClear = Math.min(clearspace, Math.min(width, height) / 2);
  return {
    x: safeClear,
    y: safeClear,
    width: width - safeClear * 2,
    height: height - safeClear * 2,
    clearspace: safeClear
  };
}

function normalisePalette(candidate) {
  if (!candidate) {
    return DEFAULT_PALETTE;
  }

  const bg = typeof candidate.bg === "string" ? candidate.bg : DEFAULT_PALETTE.bg;
  const ink = typeof candidate.ink === "string" ? candidate.ink : DEFAULT_PALETTE.ink;
  const layersInput = Array.isArray(candidate.layers) ? candidate.layers : [];
  const layers = DEFAULT_PALETTE.layers.map((color, index) => {
    const candidateColor = layersInput[index];
    return typeof candidateColor === "string" ? candidateColor : color;
  });

  return { bg, ink, layers };
}

function normaliseNumerology(source = {}) {
  const numerology = {};
  Object.keys(DEFAULT_NUM).forEach((key) => {
    const value = source[key];
    numerology[key] = Number.isFinite(value) && value > 0 ? value : DEFAULT_NUM[key];
  });
  return numerology;
}

function withAlpha(color, alpha) {
  const { r, g, b } = parseHexColor(color || "#000000");
  return `rgba(${r}, ${g}, ${b}, ${clampAlpha(alpha)})`;
}

function parseHexColor(value) {
  if (typeof value !== "string") {
    return { r: 0, g: 0, b: 0 };
  }
  const match = value.trim().match(/^#?([0-9a-fA-F]{6})$/);
  if (!match) {
    return { r: 0, g: 0, b: 0 };
  }
  const hex = match[1];
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
}

function clampAlpha(value) {
  if (!Number.isFinite(value)) {
    return 1;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
=======
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
