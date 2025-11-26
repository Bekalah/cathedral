/**
 * patterns
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Luxury Metallic Patterns
 * 
 * Sacred geometry patterns for luxury metallic surfaces
 */

import { generatePentagram, generateOctagon, generateFibonacciSpiral } from '@cathedral/master-art-principles/geometry';
import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

export interface MetallicPattern {
  name: string;
  type: 'pentagram' | 'octagon' | 'spiral' | 'floral' | 'geometric';
  points: { x: number; y: number; z: number }[];
  scale: number;
  rotation: number;
}

/**
 * Create pentagram pattern for luxury items
 */
export function createPentagramPattern(radius: number = 50): MetallicPattern {
  const points = generatePentagram(radius);
  
  return {
    name: 'Pentagram Pattern',
    type: 'pentagram',
    points: points.map(p => ({ x: p.x, y: p.y || 0, z: 0 })),
    scale: 1.0,
    rotation: 0,
  };
}

/**
 * Create octagon pattern (sacred geometry)
 */
export function createOctagonPattern(radius: number = 50): MetallicPattern {
  const points = generateOctagon(radius);
  
  return {
    name: 'Octagon Pattern',
    type: 'octagon',
    points: points.map(p => ({ x: p.x, y: p.y || 0, z: 0 })),
    scale: 1.0,
    rotation: 0,
  };
}

/**
 * Create fibonacci spiral pattern
 */
export function createFibonacciSpiralPattern(
  turns: number = 5,
  scale: number = 1
): MetallicPattern {
  const points = generateFibonacciSpiral(turns, scale);
  
  return {
    name: 'Fibonacci Spiral Pattern',
    type: 'spiral',
    points: points.map(p => ({ x: p.x, y: p.y || 0, z: 0 })),
    scale: scale,
    rotation: 0,
  };
}

/**
 * Create golden ratio floral pattern
 */
export function createFloralPattern(radius: number = 50): MetallicPattern {
  const points: { x: number; y: number; z: number }[] = [];
  const petals = 8; // Golden ratio related
  
  for (let i = 0; i < petals; i++) {
    const angle = (i * 360 / petals) * (Math.PI / 180);
    const petalRadius = radius * SACRED_MATH.PHI_INVERSE;
    
    // Create petal shape
    for (let j = 0; j < 5; j++) {
      const petalAngle = angle + (j - 2) * 0.1;
      points.push({
        x: Math.cos(petalAngle) * petalRadius,
        y: Math.sin(petalAngle) * petalRadius,
        z: 0,
      });
    }
  }
  
  return {
    name: 'Floral Pattern',
    type: 'floral',
    points,
    scale: 1.0,
    rotation: 0,
  };
}

/**
 * Create geometric luxury pattern
 */
export function createGeometricPattern(radius: number = 50): MetallicPattern {
  const points: { x: number; y: number; z: number }[] = [];
  const sides = 12; // Sacred number
  
  // Outer circle
  for (let i = 0; i < sides; i++) {
    const angle = (i * 360 / sides) * (Math.PI / 180);
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: 0,
    });
  }
  
  // Inner golden ratio circle
  const innerRadius = radius * SACRED_MATH.PHI_INVERSE;
  for (let i = 0; i < sides; i++) {
    const angle = (i * 360 / sides) * (Math.PI / 180);
    points.push({
      x: Math.cos(angle) * innerRadius,
      y: Math.sin(angle) * innerRadius,
      z: 0,
    });
  }
  
  return {
    name: 'Geometric Pattern',
    type: 'geometric',
    points,
    scale: 1.0,
    rotation: 0,
  };
}

/**
 * All pattern generators
 */
export const PATTERN_GENERATORS = {
  pentagram: createPentagramPattern,
  octagon: createOctagonPattern,
  spiral: createFibonacciSpiralPattern,
  floral: createFloralPattern,
  geometric: createGeometricPattern,
} as const;
