// Raku Reiki renderer: spiral traces only, no pulsing animation.
export function renderRakuReiki(ctx, params = {}) {
  const { chakras = 7, shamanic_layers = 3 } = params;
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(centerX, centerY) * 0.9;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  const colors = [
    "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"
  ];

  for (let i = 0; i < chakras; i += 1) {
    const radius = maxRadius * (i + 1) / chakras;
    const color = colors[i] || "#d4af37";
    const alpha = 0.3 + (i / Math.max(1, chakras)) * 0.4;

    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = shamanic_layers;
    ctx.beginPath();
    for (let angle = 0; angle <= Math.PI * 4; angle += 0.1) {
      const spiralRadius = radius * (angle / (Math.PI * 4));
      const x = centerX + Math.cos(angle) * spiralRadius;
      const y = centerY + Math.sin(angle) * spiralRadius;
      if (angle === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}
