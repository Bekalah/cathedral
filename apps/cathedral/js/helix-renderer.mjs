/*
  helix-renderer.mjs
  ND-safe static renderer for layered sacred geometry.

  Layer order is fixed to preserve calm depth:
    1) Vesica field (intersecting circles)
    2) Tree-of-Life scaffold (ten nodes, twenty-two paths)
    3) Fibonacci spiral (log curve hinting at motion without animation)
    4) Double-helix lattice (phase-shifted strands and rungs)

  All helpers are pure; no global state or animation loops.
*/

const FALLBACK_PALETTE = Object.freeze({
  bg: "#0b0b12",
  ink: "#e8e8f0",
  layers: ["#b1c7ff", "#89f7fe", "#a0ffa1", "#ffd27f", "#f5a3ff", "#d0d0e6"]
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
    haloColor: palette.layers[5],
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

  const ringCount = NUM.SEVEN;
  for (let i = 1; i <= ringCount; i += 1) {
    const ringRadius = baseRadius * (1 + i / (ringCount + NUM.THREE));
    drawCircleOutline(ctx, centerX, centerY, ringRadius);
  }

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

function drawTreeOfLife(ctx, { width, height, lineColor, nodeColor, haloColor, NUM }) {
  const nodes = getTreeNodes({ width, height, NUM });
  const paths = getTreePaths();
  const strokeWidth = Math.max(1.25, Math.min(width, height) / (NUM.ONEFORTYFOUR / NUM.THREE));
  const nodeRadius = Math.max(6, Math.min(width, height) / NUM.NINETYNINE);

  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = strokeWidth;
  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodes[startId];
    const end = nodes[endId];
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = strokeWidth / NUM.THREE;
  const haloAlpha = 0.4;
  const haloScale = NUM.THIRTYTHREE / NUM.TWENTYTWO;
  for (const node of Object.values(nodes)) {
    drawCircleFilled(ctx, node.x, node.y, nodeRadius);
    ctx.save();
    ctx.globalAlpha = haloAlpha;
    ctx.strokeStyle = haloColor;
    drawCircleOutline(ctx, node.x, node.y, nodeRadius * haloScale);
    ctx.restore();
  }

  ctx.restore();
}

function drawFibonacciCurve(ctx, { width, height, color, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / NUM.THREE;
  const phi = (1 + Math.sqrt(5)) / 2;
  const steps = NUM.TWENTYTWO;
  const rotations = NUM.ELEVEN / NUM.THREE;
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
  ctx.restore();
}

function drawHelixLattice(ctx, { width, height, strandA, strandB, rungColor, NUM }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const amplitude = Math.min(width, height) / NUM.SEVEN;
  const strandLength = height * (NUM.THIRTYTHREE / NUM.TWENTYTWO);
  const segments = NUM.ONEFORTYFOUR;

  ctx.save();
  ctx.globalAlpha = 0.68;

  const top = centerY - strandLength / 2;
  const bottom = centerY + strandLength / 2;

  ctx.lineWidth = Math.max(1.25, width / NUM.ONEFORTYFOUR * NUM.THREE);
  ctx.strokeStyle = strandA;
  ctx.beginPath();
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const y = top + (bottom - top) * t;
    const x = centerX + Math.sin(t * Math.PI * NUM.ELEVEN / NUM.THREE) * amplitude;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.strokeStyle = strandB;
  ctx.beginPath();
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const y = top + (bottom - top) * t;
    const x = centerX - Math.sin((t + 1 / NUM.TWENTYTWO) * Math.PI * NUM.ELEVEN / NUM.THREE) * amplitude;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = rungColor;
  const rungCount = Math.floor(segments / NUM.THREE);
  for (let i = 0; i <= rungCount; i += 1) {
    const t = i / rungCount;
    const y = top + (bottom - top) * t;
    const phase = t * Math.PI * NUM.NINE / NUM.SEVEN;
    const xA = centerX + Math.sin(phase) * amplitude;
    const xB = centerX - Math.sin(phase + Math.PI / NUM.SEVEN) * amplitude;
    ctx.beginPath();
    ctx.moveTo(xA, y);
    ctx.lineTo(xB, y);
    ctx.stroke();
  }

  ctx.restore();
}

function getTreeNodes({ width, height, NUM }) {
  const marginY = height / NUM.TWENTYTWO * NUM.THREE;
  const spanY = height - marginY * 2;
  const stepY = spanY / NUM.SEVEN;
  const spreadX = width / NUM.THREE;
  const centerX = width / 2;

  return {
    keter: { x: centerX, y: marginY },
    chokmah: { x: centerX + spreadX / NUM.THREE, y: marginY + stepY },
    binah: { x: centerX - spreadX / NUM.THREE, y: marginY + stepY },
    chesed: { x: centerX + spreadX / NUM.THREE, y: marginY + stepY * 2 },
    gevurah: { x: centerX - spreadX / NUM.THREE, y: marginY + stepY * 2 },
    tiferet: { x: centerX, y: marginY + stepY * 3 },
    netzach: { x: centerX + spreadX / NUM.THREE, y: marginY + stepY * 4 },
    hod: { x: centerX - spreadX / NUM.THREE, y: marginY + stepY * 4 },
    yesod: { x: centerX, y: marginY + stepY * 5 },
    malkuth: { x: centerX, y: marginY + stepY * 6 }
  };
}

function getTreePaths() {
  return [
    ['keter', 'chokmah'],
    ['keter', 'binah'],
    ['keter', 'tiferet'],
    ['chokmah', 'binah'],
    ['chokmah', 'chesed'],
    ['chokmah', 'tiferet'],
    ['binah', 'gevurah'],
    ['binah', 'tiferet'],
    ['chesed', 'gevurah'],
    ['chesed', 'tiferet'],
    ['chesed', 'netzach'],
    ['gevurah', 'tiferet'],
    ['gevurah', 'hod'],
    ['tiferet', 'netzach'],
    ['tiferet', 'hod'],
    ['tiferet', 'yesod'],
    ['netzach', 'hod'],
    ['netzach', 'yesod'],
    ['hod', 'yesod'],
    ['netzach', 'malkuth'],
    ['hod', 'malkuth'],
    ['yesod', 'malkuth']
  ];
}

function drawCircleOutline(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawCircleFilled(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
