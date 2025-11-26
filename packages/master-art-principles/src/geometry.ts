/**
 * geometry
 * 
 * @package @cathedral/master-art-principles
 */
/**
 * Sacred Geometry Patterns
 * 
 * Master art geometry based on real sacred patterns
 */

import { SACRED_MATH, goldenSpiralPoint } from './sacred-math';

export interface GeometryPoint {
  x: number;
  y: number;
  z?: number;
}

/**
 * Generate Vesica Piscis (two overlapping circles)
 */
export function generateVesicaPiscis(radius: number, center: GeometryPoint = { x: 0, y: 0 }): {
  circle1: GeometryPoint[];
  circle2: GeometryPoint[];
  intersection: GeometryPoint[];
} {
  const points: GeometryPoint[] = [];
  const circle1: GeometryPoint[] = [];
  const circle2: GeometryPoint[] = [];
  
  // Generate points for two overlapping circles
  for (let i = 0; i < 360; i += 5) {
    const rad = (i * Math.PI) / 180;
    circle1.push({
      x: center.x + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    });
    circle2.push({
      x: center.x - radius * 0.5 + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    });
  }
  
  return { circle1, circle2, intersection: [] };
}

/**
 * Generate Pentagram (5-pointed star)
 */
export function generatePentagram(radius: number, center: GeometryPoint = { x: 0, y: 0 }): GeometryPoint[] {
  const points: GeometryPoint[] = [];
  const angleStep = 72; // 360 / 5
  
  for (let i = 0; i < 5; i++) {
    const angle = i * angleStep - 90; // Start at top
    const rad = (angle * Math.PI) / 180;
    points.push({
      x: center.x + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    });
  }
  
  return points;
}

/**
 * Generate Octagon (8-sided polygon)
 */
export function generateOctagon(radius: number, center: GeometryPoint = { x: 0, y: 0 }): GeometryPoint[] {
  const points: GeometryPoint[] = [];
  const angleStep = 45; // 360 / 8
  
  for (let i = 0; i < 8; i++) {
    const angle = i * angleStep - 22.5; // Offset for flat top
    const rad = (angle * Math.PI) / 180;
    points.push({
      x: center.x + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    });
  }
  
  return points;
}

/**
 * Generate Fibonacci Spiral
 */
export function generateFibonacciSpiral(
  turns: number = 5,
  scale: number = 1,
  center: GeometryPoint = { x: 0, y: 0 }
): GeometryPoint[] {
  const points: GeometryPoint[] = [];
  const goldenAngle = SACRED_MATH.GOLDEN_ANGLE;
  
  for (let i = 0; i < turns * 360; i += 2) {
    const angle = i * goldenAngle;
    const radius = scale * Math.sqrt(i / 100) * 10;
    const point = goldenSpiralPoint(angle, radius, center);
    points.push(point);
  }
  
  return points;
}

/**
 * Generate Flower of Life pattern
 */
export function generateFlowerOfLife(
  rings: number = 3,
  radius: number = 50,
  center: GeometryPoint = { x: 0, y: 0 }
): GeometryPoint[][] {
  const circles: GeometryPoint[][] = [];
  
  // Center circle
  const centerCircle: GeometryPoint[] = [];
  for (let i = 0; i < 360; i += 5) {
    const rad = (i * Math.PI) / 180;
    centerCircle.push({
      x: center.x + radius * Math.cos(rad),
      y: center.y + radius * Math.sin(rad),
    });
  }
  circles.push(centerCircle);
  
  // Surrounding circles (simplified)
  for (let ring = 1; ring <= rings; ring++) {
    const ringRadius = radius * (1 + ring * 0.5);
    const circleCount = 6 * ring; // 6 circles per ring
    
    for (let j = 0; j < circleCount; j++) {
      const angle = (j * 360) / circleCount;
      const rad = (angle * Math.PI) / 180;
      const circleCenter: GeometryPoint = {
        x: center.x + ringRadius * Math.cos(rad),
        y: center.y + ringRadius * Math.sin(rad),
      };
      
      const circle: GeometryPoint[] = [];
      for (let i = 0; i < 360; i += 5) {
        const circleRad = (i * Math.PI) / 180;
        circle.push({
          x: circleCenter.x + radius * Math.cos(circleRad),
          y: circleCenter.y + radius * Math.sin(circleRad),
        });
      }
      circles.push(circle);
    }
  }
  
  return circles;
}

/**
 * Generate Metatron's Cube
 */
export function generateMetatronsCube(size: number, center: GeometryPoint = { x: 0, y: 0 }): {
  circles: GeometryPoint[][];
  lines: { start: GeometryPoint; end: GeometryPoint }[];
} {
  const circles: GeometryPoint[][] = [];
  const lines: { start: GeometryPoint; end: GeometryPoint }[] = [];
  
  // 13 circles in Metatron's Cube pattern
  const positions = [
    { x: 0, y: -size * 2 }, // Top
    { x: -size * SACRED_MATH.SQRT_3, y: -size }, // Top left
    { x: size * SACRED_MATH.SQRT_3, y: -size }, // Top right
    { x: -size * 2 * SACRED_MATH.SQRT_3, y: 0 }, // Left
    { x: 0, y: 0 }, // Center
    { x: size * 2 * SACRED_MATH.SQRT_3, y: 0 }, // Right
    { x: -size * SACRED_MATH.SQRT_3, y: size }, // Bottom left
    { x: size * SACRED_MATH.SQRT_3, y: size }, // Bottom right
    { x: 0, y: size * 2 }, // Bottom
    // Additional circles for complete pattern
    { x: -size * SACRED_MATH.SQRT_3, y: -size * 2 },
    { x: size * SACRED_MATH.SQRT_3, y: -size * 2 },
    { x: -size * SACRED_MATH.SQRT_3, y: size * 2 },
    { x: size * SACRED_MATH.SQRT_3, y: size * 2 },
  ];
  
  positions.forEach(pos => {
    const circle: GeometryPoint[] = [];
    for (let i = 0; i < 360; i += 5) {
      const rad = (i * Math.PI) / 180;
      circle.push({
        x: center.x + pos.x + size * Math.cos(rad),
        y: center.y + pos.y + size * Math.sin(rad),
      });
    }
    circles.push(circle);
  });
  
  return { circles, lines };
}
