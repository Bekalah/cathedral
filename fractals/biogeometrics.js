// Biogeometrics lattice: static earth grid harmonics, no flashing lines.
export function renderBiogeometrics(ctx, params = {}) {
  const { grid = "666", harmonic = 144 } = params;
  const { width, height } = ctx.canvas;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  const divisions = parseInt(grid, 10) || 6;
  const spacingX = width / divisions;
  const spacingY = height / divisions;

  ctx.strokeStyle = "#b1c7ff";
  ctx.lineWidth = 1;
  for (let i = 0; i <= divisions; i += 1) {
    const x = i * spacingX;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let j = 0; j <= divisions; j += 1) {
    const y = j * spacingY;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#ffd27f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.moveTo(width, 0);
  ctx.lineTo(0, height);
  ctx.stroke();

  ctx.fillStyle = "#a0ffa1";
  ctx.font = "16px monospace";
  ctx.fillText(`Harmonic ${harmonic}`, 12, height - 16);
}
