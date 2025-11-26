/**
 * color-harmony
 * 
 * @package @cathedral/master-art-principles
 */
/**
 * Master Art Color Harmony
 * 
 * Color principles based on classical and sacred traditions
 */

import { SACRED_MATH } from './sacred-math';

export interface ColorHarmony {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  complementary: string;
}

/**
 * Golden Ratio Color Harmony
 * 
 * Colors based on golden ratio relationships in color wheel
 */
export function goldenColorHarmony(baseHue: number): ColorHarmony {
  // Golden ratio in color wheel (360 degrees)
  const goldenAngle = 360 / SACRED_MATH.PHI; // ~222.5 degrees
  
  return {
    primary: `hsl(${baseHue}, 70%, 50%)`,
    secondary: `hsl(${(baseHue + goldenAngle) % 360}, 60%, 55%)`,
    accent: `hsl(${(baseHue + goldenAngle * 2) % 360}, 80%, 45%)`,
    neutral: `hsl(${baseHue}, 20%, 85%)`,
    complementary: `hsl(${(baseHue + 180) % 360}, 70%, 50%)`,
  };
}

/**
 * Triadic Color Harmony
 * 
 * Three colors evenly spaced on color wheel
 */
export function triadicHarmony(baseHue: number): ColorHarmony {
  return {
    primary: `hsl(${baseHue}, 70%, 50%)`,
    secondary: `hsl(${(baseHue + 120) % 360}, 70%, 50%)`,
    accent: `hsl(${(baseHue + 240) % 360}, 70%, 50%)`,
    neutral: `hsl(${baseHue}, 20%, 85%)`,
    complementary: `hsl(${(baseHue + 180) % 360}, 70%, 50%)`,
  };
}

/**
 * Analogous Color Harmony
 * 
 * Colors next to each other on color wheel
 */
export function analogousHarmony(baseHue: number): ColorHarmony {
  return {
    primary: `hsl(${baseHue}, 70%, 50%)`,
    secondary: `hsl(${(baseHue + 30) % 360}, 65%, 55%)`,
    accent: `hsl(${(baseHue - 30 + 360) % 360}, 75%, 45%)`,
    neutral: `hsl(${baseHue}, 20%, 85%)`,
    complementary: `hsl(${(baseHue + 180) % 360}, 70%, 50%)`,
  };
}
