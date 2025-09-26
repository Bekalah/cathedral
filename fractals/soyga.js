// Soyga grid renderer: static character lattice, no animation (ND-safe).
export function renderSoyga(ctx, params = {}) {
  const { size = 36, seed = "A", iterations = 7 } = params;
  const side = Math.min(ctx.canvas.width, ctx.canvas.height);
  const cellSize = side / size;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "#d4af37";
  ctx.font = `${cellSize * 0.6}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const charIndex = (x * iterations + y + seed.charCodeAt(0)) % 26;
      const char = String.fromCharCode(65 + charIndex);
      ctx.fillText(char, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
    }
  }
}
