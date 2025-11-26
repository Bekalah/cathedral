/**
 * sacred-math
 * 
 * @package @cathedral/master-art-principles
 * @license CC0-1.0 - Public Domain
 * 
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate sacred mathematics
 * 
 * Creative use: Art apps, design apps, math apps, visual apps
 */
/**
 * Sacred Mathematics Constants
 * 
 * Master art rules based on real mathematical beauty
 */

export const SACRED_MATH = {
  // Golden Ratio (phi) - 1.618033988749...
  PHI: (1 + Math.sqrt(5)) / 2,
  PHI_INVERSE: (Math.sqrt(5) - 1) / 2, // ~0.618
  PHI_SQUARED: Math.pow((1 + Math.sqrt(5)) / 2, 2), // ~2.618
  
  // Cathedral Ratio - 144:99
  CATHEDRAL_RATIO: 144 / 99, // ~1.4545
  CATHEDRAL_INVERSE: 99 / 144, // ~0.6875
  
  // Square Root of 2 - Dynamic symmetry
  SQRT_2: Math.sqrt(2), // ~1.414
  SQRT_2_INVERSE: 1 / Math.sqrt(2), // ~0.707
  
  // Square Root of 3 - Equilateral triangle
  SQRT_3: Math.sqrt(3), // ~1.732
  
  // Square Root of 5 - Golden ratio base
  SQRT_5: Math.sqrt(5), // ~2.236
  
  // Pi and Tau
  PI: Math.PI,
  TAU: Math.PI * 2,
  
  // Fibonacci sequence (first 20)
  FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765],
  
  // Golden Angle (degrees)
  GOLDEN_ANGLE: 137.508, // 360 / phi^2
  
  // Sacred proportions
  PROPORTIONS: {
    // Rule of thirds (simplified golden ratio)
    THIRD: 1 / 3,
    TWO_THIRDS: 2 / 3,
    
    // Golden section
    GOLDEN_SECTION: (Math.sqrt(5) - 1) / 2, // ~0.618
    
    // Root rectangles
    ROOT_2: Math.sqrt(2),
    ROOT_3: Math.sqrt(3),
    ROOT_5: Math.sqrt(5),
  },
} as const;

/**
 * Calculate golden ratio proportion
 */
export function goldenRatio(value: number, useLarger: boolean = true): number {
  return useLarger ? value * SACRED_MATH.PHI : value * SACRED_MATH.PHI_INVERSE;
}

/**
 * Calculate golden rectangle dimensions
 */
export function goldenRectangle(width: number): { width: number; height: number } {
  return {
    width,
    height: width * SACRED_MATH.PHI_INVERSE,
  };
}

/**
 * Calculate fibonacci-based sizing
 */
export function fibonacciSize(index: number): number {
  if (index < 0 || index >= SACRED_MATH.FIBONACCI.length) {
    return 1;
  }
  return SACRED_MATH.FIBONACCI[index];
}

/**
 * Apply golden ratio to layout
 */
export function applyGoldenLayout(
  containerSize: number,
  direction: 'horizontal' | 'vertical' = 'horizontal'
): { primary: number; secondary: number } {
  const primary = containerSize * SACRED_MATH.PHI_INVERSE;
  const secondary = containerSize - primary;
  return { primary, secondary };
}

/**
 * Calculate spiral point using golden angle
 */
export function goldenSpiralPoint(
  angle: number,
  radius: number,
  center: { x: number; y: number } = { x: 0, y: 0 }
): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180;
  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians),
  };
}

/**
 * Calculate 144:99 ratio proportion
 */
export function cathedralRatio(value: number, use144: boolean = true): number {
  return use144 ? value * SACRED_MATH.CATHEDRAL_RATIO : value * SACRED_MATH.CATHEDRAL_INVERSE;
}
