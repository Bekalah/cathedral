// I Ching renderer: static radial hexagram lines, no motion for ND safety.
export function renderIChing(ctx, params = {}) {
  const { hexagram = 1, depth = 6 } = params;
  const { width, height } = ctx.canvas;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) * 0.75;

  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, width, height);

  const lines = hexagramToLines(hexagram);
  lines.forEach((line, index) => {
    const angle = (index / depth) * Math.PI * 2 - Math.PI / 2;
    const lineRadius = radius * (1 - index / depth);
    const x1 = centerX + Math.cos(angle) * lineRadius;
    const y1 = centerY + Math.sin(angle) * lineRadius;
    const x2 = centerX - Math.cos(angle) * lineRadius;
    const y2 = centerY - Math.sin(angle) * lineRadius;

    ctx.strokeStyle = line === 1 ? "#d4af37" : "#7c4dff";
    ctx.lineWidth = line === 1 ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

function hexagramToLines(hexagram) {
  const value = Math.max(1, Math.min(64, Math.floor(hexagram)));
  const binary = (value - 1).toString(2).padStart(6, "0");
  return [...binary].map((bit) => (bit === "1" ? 1 : 0));
}
