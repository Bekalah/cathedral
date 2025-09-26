// Noetic coherence: layered interference circles marking Schumann resonance.
export function renderNoetics(ctx, params = {}) {
  const { frequency = 7.83, coherence = 0.9 } = params;
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(centerX, centerY) * 0.6;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  const rings = Math.round(coherence * 11) || 1;
  for (let i = 0; i < rings; i += 1) {
    const radius = baseRadius * (1 + i * 0.12);
    ctx.strokeStyle = i % 2 === 0 ? "#a0ffa1" : "#f5a3ff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    const offset = (i + 1) * frequency * 0.01;
    ctx.beginPath();
    ctx.arc(centerX + offset * 20, centerY - offset * 10, radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
  }
}
