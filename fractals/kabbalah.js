// Tree of Life renderer: static paths and sephiroth for grounded depth.
export function renderKabbalah(ctx, params = {}) {
  const { sephiroth = 10 } = params;
  const { width, height } = ctx.canvas;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  const positions = basePositions().slice(0, sephiroth);
  drawPaths(ctx, positions);
  drawNodes(ctx, positions);
}

function basePositions() {
  return [
    [0.5, 0.08],
    [0.35, 0.2],
    [0.65, 0.2],
    [0.5, 0.32],
    [0.25, 0.45],
    [0.75, 0.45],
    [0.5, 0.58],
    [0.25, 0.72],
    [0.75, 0.72],
    [0.5, 0.88]
  ];
}

function drawPaths(ctx, positions) {
  const paths = [
    [0, 1], [0, 2], [1, 2], [1, 4], [2, 5], [4, 6], [5, 6], [6, 7], [6, 8], [7, 9], [8, 9]
  ];
  ctx.strokeStyle = "#7c4dff";
  ctx.lineWidth = 2;
  paths.forEach(([a, b]) => {
    if (!positions[a] || !positions[b]) {
      return;
    }
    const [ax, ay] = positions[a];
    const [bx, by] = positions[b];
    ctx.beginPath();
    ctx.moveTo(ax * ctx.canvas.width, ay * ctx.canvas.height);
    ctx.lineTo(bx * ctx.canvas.width, by * ctx.canvas.height);
    ctx.stroke();
  });
}

function drawNodes(ctx, positions) {
  ctx.fillStyle = "#d4af37";
  positions.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}
