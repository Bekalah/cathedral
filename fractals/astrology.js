// Evolutionary astrology orbits: concentric bands with gentle resonant arcs.
export function renderAstrology(ctx, params = {}) {
  const { bodies = 12, resonance = 0.618 } = params;
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(centerX, centerY) * 0.85;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  for (let i = 1; i <= bodies; i += 1) {
    const ratio = i / bodies;
    const radius = maxRadius * ratio;
    ctx.strokeStyle = i % 2 === 0 ? "#89f7fe" : "#ffd27f";
    ctx.lineWidth = i % 3 === 0 ? 2 : 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    const arcLength = resonance * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -arcLength, arcLength);
    ctx.stroke();
  }
}
