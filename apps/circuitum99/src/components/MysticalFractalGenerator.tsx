ther eimport { useRef, useEffect, useState, useCallback } from 'react';

interface MysticalFractalGeneratorProps {
  codexData: any;
  gateIndex: number;
  width: number;
  height: number;
}

/**
 * REAL fractal generator using actual math and Canvas API
 * Generates mystical patterns based on Codex 144:99 parameters
 */
export default function MysticalFractalGenerator({
  codexData,
  gateIndex,
  width = 800,
  height = 600
}: MysticalFractalGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parameters, setParameters] = useState({
    iterations: 50,
    zoom: 2.0,
    offsetX: 0,
    offsetY: 0,
    fractalType: 'mandelbrot'
  });

  const gateData = codexData?.find((g: any) => g.gate_index === gateIndex) || {};

  // Mandelbrot set calculation - REAL mathematical computation
  const mandelbrot = useCallback((cx: number, cy: number, maxIter: number): number => {
    let zx = 0, zy = 0;
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIter) {
      const zxTemp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = zxTemp;
      iteration++;
    }

    return iteration;
  }, []);

  // Julia set calculation - REAL mathematical computation
  const julia = useCallback((zx: number, zy: number, cx: number, cy: number, maxIter: number): number => {
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIter) {
      const zxTemp = zx * zx - zy * zy + cx;
      zy = 2 * zx * zy + cy;
      zx = zxTemp;
      iteration++;
    }

    return iteration;
  }, []);

  // Convert iterations to color using gate's energy and numerology
  const iterationToColor = useCallback((iteration: number, maxIter: number): [number, number, number] => {
    if (iteration === maxIter) return [0, 0, 0]; // Black for points in set

    const normalized = iteration / maxIter;
    const energy = gateData.energy || 0.5;
    const coreNum = gateData.numerology?.core || 7;

    // Use energy and numerology for color palette
    const r = Math.sin(normalized * Math.PI + energy * coreNum) * 127 + 128;
    const g = Math.cos(normalized * Math.PI + energy * (coreNum + 3)) * 127 + 128;
    const b = Math.sin(normalized * Math.PI * 2 + energy * (coreNum + 6)) * 127 + 128;

    return [Math.floor(r), Math.floor(g), Math.floor(b)];
  }, [gateData]);

  // Generate fractal - REAL canvas rendering with actual fractal math
  const generateFractal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const { iterations, zoom, offsetX, offsetY, fractalType } = parameters;
    const cx = -0.7 + (offsetX * 0.1); // Julia set parameter modified by gate
    const cy = 0.27015 + (offsetY * 0.1); // Julia set parameter

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // Map canvas coordinates to complex plane
        const cx_real = (x - width / 2) / (width / 4) / zoom + offsetX;
        const cy_real = (y - height / 2) / (height / 4) / zoom + offsetY;

        let iteration: number;

        if (fractalType === 'mandelbrot') {
          iteration = mandelbrot(cx_real, cy_real, iterations);
        } else {
          iteration = julia(cx_real, cy_real, cx, cy, iterations);
        }

        const [r, g, b] = iterationToColor(iteration, iterations);

        const pixelIndex = (y * width + x) * 4;
        data[pixelIndex] = r;     // Red
        data[pixelIndex + 1] = g; // Green
        data[pixelIndex + 2] = b; // Blue
        data[pixelIndex + 3] = 255; // Alpha
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [parameters, width, height, mandelbrot, julia, iterationToColor, gateData]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      generateFractal();
    }
  }, [generateFractal]);

  const updateParameter = (key: string, value: number | string) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `codex-${gateIndex}-fractal-${parameters.fractalType}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="mystical-fractal-generator">
      <h3>Mystical Fractal Generator - Gate {gateIndex}</h3>
      <p>Gate: {gateData.name || `Gate ${gateIndex}`}</p>
      <p>Energy: {gateData.energy}, Numerology: {gateData.numerology?.core}</p>

      <div className="controls">
        <div>
          <label>Iterations:</label>
          <input
            type="range"
            min="10"
            max="200"
            value={parameters.iterations}
            onChange={(e) => updateParameter('iterations', parseInt(e.target.value))}
          />
          <span>{parameters.iterations}</span>
        </div>

        <div>
          <label>Zoom:</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={parameters.zoom}
            onChange={(e) => updateParameter('zoom', parseFloat(e.target.value))}
          />
          <span>{parameters.zoom.toFixed(1)}</span>
        </div>

        <div>
          <label>Type:</label>
          <select
            value={parameters.fractalType}
            onChange={(e) => updateParameter('fractalType', e.target.value)}
          >
            <option value="mandelbrot">Mandelbrot</option>
            <option value="julia">Julia</option>
          </select>
        </div>

        <button onClick={downloadImage}>Download Fractal</button>
      </div>

      <canvas
        ref={canvasRef}
        className="fractal-canvas"
        style={{
          border: '1px solid #ccc',
          background: 'black',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
}
