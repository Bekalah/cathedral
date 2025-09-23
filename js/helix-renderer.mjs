/*
  helix-renderer.mjs
  Static renderer for layered cosmology scenes.
  ND-safe choices:
    - All geometry rendered once (no animation) to honour sensory safety.
    - Palette hues remain soft but high contrast for AA+ legibility.
    - Layer order preserves depth: Vesica field, Tree-of-Life, Fibonacci curve, helix lattice.
*/

export function renderHelix(ctx, config) {
  const { width, height, palette, NUM } = config;
  const layers = Array.isArray(palette.layers) ? palette.layers : [];
  const resolvedLayers = ensureLayerPalette(layers);

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.bg ? palette.bg : "#0b0b12";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  drawVesicaField(ctx, width, height, resolvedLayers[0], NUM);
  drawTreeOfLife(ctx, width, height, {
    line: resolvedLayers[1],
    node: palette.ink ? palette.ink : "#f0f0ff"
  }, NUM);
  drawFibonacciCurve(ctx, width, height, resolvedLayers[2], NUM);
  drawHelixLattice(ctx, width, height, {
    strandA: resolvedLayers[3],
    strandB: resolvedLayers[4],
    rungs: resolvedLayers[5]
  }, NUM);
}

function ensureLayerPalette(layers) {
  if (layers.length >= 6) {
    return layers.slice(0, 6);
  }
  const fallback = [
    "#6d7bff",
    "#4ed4c8",
    "#f5c66f",
    "#ff92d0",
    "#d4a9ff",
    "#f7f7ff"
  ];
  return fallback;
}

function drawVesicaField(ctx, width, height, color, NUM) {
  const baseRadius = Math.min(width, height) / NUM.THIRTYTHREE * (NUM.NINE / NUM.THREE);
  const centerX = width / 2;
  const centerY = height / 2;
  const offsets = [
    { x: -baseRadius * 0.6, y: 0 },
    { x: baseRadius * 0.6, y: 0 },
    { x: 0, y: -baseRadius * 0.7 },
    { x: 0, y: baseRadius * 0.7 }
  ];

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = Math.max(1, baseRadius / NUM.NINETYNINE * NUM.SEVEN);
  ctx.strokeStyle = color;

  for (let i = 0; i < offsets.length; i += 1) {
    const offset = offsets[i];
    drawCircle(ctx, centerX + offset.x, centerY + offset.y, baseRadius);
  }

  const gridCount = NUM.THREE;
  const spacing = baseRadius / (gridCount + 1);
  for (let gx = -gridCount; gx <= gridCount; gx += 1) {
    for (let gy = -gridCount; gy <= gridCount; gy += 1) {
      if (gx === 0 && gy === 0) {
        continue;
      }
      const radius = baseRadius * 0.45;
      drawCircle(ctx, centerX + gx * spacing * NUM.SEVEN / NUM.NINE, centerY + gy * spacing * NUM.SEVEN / NUM.NINE, radius);
    }
  }

  ctx.restore();
}

function drawCircle(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawTreeOfLife(ctx, width, height, colors, NUM) {
  const verticalMargin = height / NUM.TWENTYTWO;
  const verticalStep = (height - verticalMargin * 2) / (NUM.SEVEN);
  const columnOffset = width / NUM.THREE;
  const centerX = width / 2;

  const nodes = [
    { id: "keter", x: centerX, y: verticalMargin },
    { id: "chokmah", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep },
    { id: "binah", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep },
    { id: "chesed", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep * 2 },
    { id: "gevurah", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep * 2 },
    { id: "tiferet", x: centerX, y: verticalMargin + verticalStep * 3 },
    { id: "netzach", x: centerX + columnOffset / 2, y: verticalMargin + verticalStep * 4 },
    { id: "hod", x: centerX - columnOffset / 2, y: verticalMargin + verticalStep * 4 },
    { id: "yesod", x: centerX, y: verticalMargin + verticalStep * 5 },
    { id: "malkuth", x: centerX, y: verticalMargin + verticalStep * 6 }
  ];

  const nodeById = new Map();
  for (let i = 0; i < nodes.length; i += 1) {
    nodeById.set(nodes[i].id, nodes[i]);
  }

  const paths = [
    ["keter", "chokmah"],
    ["keter", "binah"],
    ["keter", "tiferet"],
    ["chokmah", "binah"],
    ["chokmah", "tiferet"],
    ["chokmah", "chesed"],
    ["binah", "tiferet"],
    ["binah", "gevurah"],
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
  ctx.strokeStyle = colors.line;
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);
  ctx.globalAlpha = 0.65;
  for (let i = 0; i < paths.length; i += 1) {
    const [startId, endId] = paths[i];
    const start = nodeById.get(startId);
    const end = nodeById.get(endId);
    if (!start || !end) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = colors.node;
  const nodeRadius = Math.max(6, width / NUM.NINETYNINE);
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFibonacciCurve(ctx, width, height, color, NUM) {
  const centerX = width / NUM.THREE;
  const centerY = height * 0.5;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const quarterTurns = NUM.NINE / NUM.THREE;
  const totalTheta = quarterTurns * Math.PI * 2;
  const growthRate = Math.log(goldenRatio) / (Math.PI / 2);
  const startRadius = Math.min(width, height) / NUM.NINETYNINE * NUM.NINE;
  const steps = NUM.TWENTYTWO;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, width / NUM.ONEFORTYFOUR);
  ctx.globalAlpha = 0.85;
  ctx.beginPath();

  for (let i = 0; i <= steps; i += 1) {
    const t = totalTheta * (i / steps);
    const radius = startRadius * Math.exp(growthRate * t);
    const x = centerX + radius * Math.cos(t);
    const y = centerY + radius * Math.sin(t);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
  ctx.restore();
}

function drawHelixLattice(ctx, width, height, colors, NUM) {
  const midY = height * 0.5;
  const amplitude = height / NUM.THIRTYTHREE * NUM.SEVEN;
  const sampleCount = NUM.ONEFORTYFOUR;
  const frequency = NUM.THREE;
  const rungInterval = Math.floor(sampleCount / NUM.TWENTYTWO);

  const strandA = [];
  const strandB = [];

  for (let i = 0; i <= sampleCount; i += 1) {
    const t = i / sampleCount;
    const theta = t * Math.PI * frequency * 2;
    const x = t * width;
    const yA = midY + Math.sin(theta) * amplitude;
    const yB = midY + Math.sin(theta + Math.PI) * amplitude;
    strandA.push({ x, y: yA });
    strandB.push({ x, y: yB });
  }

  ctx.save();
  ctx.lineWidth = Math.max(1, width / NUM.ONEFORTYFOUR);

  ctx.strokeStyle = colors.strandA;
  tracePolyline(ctx, strandA);
  ctx.strokeStyle = colors.strandB;
  tracePolyline(ctx, strandB);

  ctx.strokeStyle = colors.rungs;
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < strandA.length; i += rungInterval) {
    const a = strandA[i];
    const b = strandB[i];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.restore();
}

function tracePolyline(ctx, points) {
  if (points.length === 0) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    const point = points[i];
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}
