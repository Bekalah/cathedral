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

function applyAlpha(hex, alpha) {
  const rgb = hexToRgb(hex);
  const safeAlpha = Math.max(0, Math.min(alpha, 1));
  return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + safeAlpha + ")";
}

function hexToRgb(hex) {
  if (!hex) {
    return { r: 232, g: 232, b: 240 };
  }
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
