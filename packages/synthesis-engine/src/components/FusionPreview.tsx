import React, { useEffect, useRef } from 'react';
import {
  FusionPreviewProps,
  SynthesizedElement,
  AnimationType,
  Domain
} from '../types/FusionTypes';

/**
 * FusionPreview - React component for real-time fusion preview
 *
 * Displays animated preview of synthesized elements with mystical
 * visual effects and sacred geometry patterns.
 */
export const FusionPreview: React.FC<FusionPreviewProps> = ({
  elements,
  preview,
  loading,
  error
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Start animation when preview is available
  useEffect(() => {
    if (preview?.success && preview.output && canvasRef.current) {
      startPreviewAnimation(preview.output);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [preview]);

  // Start the preview animation
  const startPreviewAnimation = (element: SynthesizedElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    let time = 0;
    const animate = () => {
      time += 0.02;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mystical background
      drawMysticalBackground(ctx, canvas.width, canvas.height, time);

      // Draw sacred geometry pattern
      drawSacredGeometry(ctx, element, time);

      // Draw energy field
      drawEnergyField(ctx, element, time);

      // Draw element information
      drawElementInfo(ctx, element);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Draw mystical animated background
  const drawMysticalBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number
  ) => {
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) / 2
    );

    // Create color based on element domains
    const hue = (time * 30) % 360;
    gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.8)`);
    gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 50%, 40%, 0.4)`);
    gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 30%, 20%, 0.1)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw energy particles
    for (let i = 0; i < 20; i++) {
      const x = (Math.sin(time + i) * width / 4) + width / 2;
      const y = (Math.cos(time * 0.7 + i) * height / 4) + height / 2;
      const size = Math.sin(time * 2 + i) * 3 + 5;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${(hue + i * 18) % 360}, 80%, 60%, 0.6)`;
      ctx.fill();
    }
  };

  // Draw sacred geometry pattern
  const drawSacredGeometry = (
    ctx: CanvasRenderingContext2D,
    element: SynthesizedElement,
    time: number
  ) => {
    ctx.save();
    ctx.translate(200, 150); // Center of canvas

    const scale = 1 + Math.sin(time) * 0.1; // Pulsing effect
    ctx.scale(scale, scale);

    switch (element.primaryGeometry.type) {
      case 'flower_of_life':
        drawFlowerOfLife(ctx, time);
        break;
      case 'merkaba':
        drawMerkaba(ctx, time);
        break;
      case 'metatrons_cube':
        drawMetatronCube(ctx, time);
        break;
      default:
        drawSacredCircle(ctx, time);
    }

    ctx.restore();
  };

  // Draw Flower of Life pattern
  const drawFlowerOfLife = (ctx: CanvasRenderingContext2D, time: number) => {
    const radius = 60;
    const rotation = time * 0.5;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;

    // Draw central circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + rotation;
      const x = Math.cos(angle) * radius * 2;
      const y = Math.sin(angle) * radius * 2;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw vesica piscis intersections
      if (i > 0) {
        drawVesicaPiscis(ctx, 0, 0, x, y, radius);
      }
    }
  };

  // Draw Merkaba star tetrahedron
  const drawMerkaba = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 3;

    const size = 50;
    const rotation = time * 0.8;

    // Draw upward tetrahedron
    drawTetrahedron(ctx, size, rotation);

    // Draw downward tetrahedron (inverted)
    ctx.scale(1, -1);
    drawTetrahedron(ctx, size, -rotation);
    ctx.scale(1, -1);

    // Connect corresponding vertices
    drawMerkabaConnections(ctx, size);
  };

  // Draw Metatron's Cube
  const drawMetatronCube = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;

    const radius = 40;
    const rotation = time * 0.3;

    // Draw 13 spheres
    for (let i = 0; i < 13; i++) {
      const angle = (i * 2 * Math.PI) / 13 + rotation;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw connections (simplified)
    ctx.beginPath();
    for (let i = 0; i < 13; i++) {
      for (let j = i + 1; j < 13; j++) {
        const angle1 = (i * 2 * Math.PI) / 13;
        const angle2 = (j * 2 * Math.PI) / 13;
        const distance = Math.abs(angle1 - angle2);

        if (distance < Math.PI / 4 || distance > Math.PI * 1.75) {
          const x1 = Math.cos(angle1) * radius;
          const y1 = Math.sin(angle1) * radius;
          const x2 = Math.cos(angle2) * radius;
          const y2 = Math.sin(angle2) * radius;

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
      }
    }
    ctx.stroke();
  };

  // Draw sacred circle with rotating elements
  const drawSacredCircle = (ctx: CanvasRenderingContext2D, time: number) => {
    const radius = 60;
    const rotation = time * 0.6;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;

    // Draw main circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw 12 points around circle
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6 + rotation;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }
  };

  // Helper function to draw tetrahedron
  const drawTetrahedron = (ctx: CanvasRenderingContext2D, size: number, rotation: number) => {
    const points = [
      { x: 0, y: -size, z: 0 },
      { x: size * 0.8, y: size * 0.4, z: 0 },
      { x: -size * 0.8, y: size * 0.4, z: 0 },
      { x: 0, y: 0, z: size * 1.2 }
    ];

    // Apply rotation
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const rotatedPoints = points.map(point => ({
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos
    }));

    // Project 3D to 2D and draw edges
    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [1, 3], [2, 3]
    ];

    ctx.beginPath();
    edges.forEach(([i, j]) => {
      const p1 = rotatedPoints[i];
      const p2 = rotatedPoints[j];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    });
    ctx.stroke();
  };

  // Draw Merkaba connections
  const drawMerkabaConnections = (ctx: CanvasRenderingContext2D, size: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;

    // Connect corresponding vertices between tetrahedrons
    const connections = [
      { x: -size * 0.8, y: size * 0.4 },
      { x: size * 0.8, y: size * 0.4 },
      { x: 0, y: -size }
    ];

    ctx.beginPath();
    connections.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.stroke();
  };

  // Draw vesica piscis intersection
  const drawVesicaPiscis = (
    ctx: CanvasRenderingContext2D,
    x1: number, y1: number,
    x2: number, y2: number,
    radius: number
  ) => {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const intersectionRadius = Math.sqrt(radius ** 2 - (distance / 2) ** 2);

    if (intersectionRadius > 0) {
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      ctx.beginPath();
      ctx.ellipse(midX, midY, distance / 2, intersectionRadius, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.stroke();
    }
  };

  // Draw energy field around the pattern
  const drawEnergyField = (
    ctx: CanvasRenderingContext2D,
    element: SynthesizedElement,
    time: number
  ) => {
    const intensity = element.energy / 100;
    const pulse = Math.sin(time * 3) * 0.5 + 0.5;

    ctx.save();
    ctx.translate(200, 150);

    // Draw energy rings
    for (let i = 1; i <= 3; i++) {
      const radius = 80 + i * 30;
      const alpha = (intensity * 0.3 * pulse) / i;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();
  };

  // Draw element information overlay
  const drawElementInfo = (ctx: CanvasRenderingContext2D, element: SynthesizedElement) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(element.name, 20, 30);

    ctx.font = '12px Arial';
    ctx.fillText(`Rarity: ${element.rarity}`, 20, 50);
    ctx.fillText(`Energy: ${element.energy}`, 20, 65);
    ctx.fillText(`Frequency: ${Math.floor(element.frequency)}Hz`, 20, 80);

    // Draw domain indicators
    element.domains.forEach((domain, index) => {
      const x = 300 + index * 30;
      const y = 30;

      ctx.fillStyle = getDomainColor(domain);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(domain.charAt(0), x, y + 3);
      ctx.textAlign = 'left';
    });
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="fusion-preview loading">
        <div className="loading-spinner" />
        <p>Generating fusion preview...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="fusion-preview error">
        <div className="error-icon">⚠️</div>
        <p>Fusion preview unavailable</p>
        <small>{error.message}</small>
      </div>
    );
  }

  // Handle no preview state
  if (!preview) {
    return (
      <div className="fusion-preview empty">
        <div className="empty-icon">🔮</div>
        <p>Select elements to preview fusion</p>
      </div>
    );
  }

  return (
    <div className="fusion-preview">
      <div className="preview-header">
        <h4>Fusion Preview</h4>
        {preview.success && (
          <div className="preview-quality">
            Quality: {preview.quality.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="preview-canvas-container">
        <canvas
          ref={canvasRef}
          className="preview-canvas"
          style={{
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>

      {preview.success && preview.output && (
        <div className="preview-details">
          <div className="preview-abilities">
            <h5>Abilities</h5>
            {preview.output.abilities.map(ability => (
              <div key={ability.id} className="ability-preview">
                <span className="ability-name">{ability.name}</span>
                <span className="ability-type">{ability.type.replace('_', ' ')}</span>
                <div className="ability-power">Power: {ability.power}</div>
              </div>
            ))}
          </div>

          <div className="preview-audio">
            <h5>Sound Signature</h5>
            <div className="audio-info">
              <span>Base Frequency: {Math.floor(preview.output.frequency)}Hz</span>
              <span>Waveform: {preview.output.audio.waveform}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get domain colors
function getDomainColor(domain: Domain): string {
  switch (domain) {
    case Domain.ART: return '#FF6B9D';
    case Domain.SCIENCE: return '#4834D4';
    case Domain.SPIRITUALITY: return '#78E08F';
    default: return '#F8B500';
  }
}