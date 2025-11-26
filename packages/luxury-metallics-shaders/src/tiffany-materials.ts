/**
 * tiffany-materials
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Tiffany & Co Style Materials
 * 
 * Iconic luxury materials with signature colors and finishes
 */

import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

export interface TiffanyMaterial {
  name: string;
  color: string;
  metalness: number; // 0-1
  roughness: number; // 0-1
  emissive?: string;
  emissiveIntensity?: number;
  reflectivity?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  ior?: number; // Index of refraction
  sheen?: number;
  sheenColor?: string;
  sheenRoughness?: number;
}

/**
 * Tiffany Blue - Iconic signature color
 */
export const TIFFANY_BLUE: TiffanyMaterial = {
  name: 'Tiffany Blue',
  color: '#0ABAB5', // Classic Tiffany blue
  metalness: 0.0,
  roughness: 0.1,
  emissive: '#0ABAB5',
  emissiveIntensity: 0.05,
  reflectivity: 0.9,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1,
  ior: 1.5,
  sheen: 0.3,
  sheenColor: '#0ABAB5',
  sheenRoughness: 0.2,
};

/**
 * Tiffany Sterling Silver
 */
export const TIFFANY_SILVER: TiffanyMaterial = {
  name: 'Tiffany Sterling Silver',
  color: '#E8E8E8',
  metalness: 1.0,
  roughness: 0.15,
  reflectivity: 0.95,
  clearcoat: 0.9,
  clearcoatRoughness: 0.05,
  ior: 0.18, // Silver IOR
  sheen: 0.5,
  sheenColor: '#FFFFFF',
  sheenRoughness: 0.1,
};

/**
 * Tiffany Gold
 */
export const TIFFANY_GOLD: TiffanyMaterial = {
  name: 'Tiffany Gold',
  color: '#D4AF37', // Classic gold
  metalness: 1.0,
  roughness: 0.1,
  reflectivity: 0.98,
  clearcoat: 0.95,
  clearcoatRoughness: 0.03,
  ior: 0.37, // Gold IOR
  sheen: 0.6,
  sheenColor: '#FFD700',
  sheenRoughness: 0.05,
};

/**
 * Tiffany Rose Gold
 */
export const TIFFANY_ROSE_GOLD: TiffanyMaterial = {
  name: 'Tiffany Rose Gold',
  color: '#E8B4B8', // Rose gold
  metalness: 1.0,
  roughness: 0.12,
  reflectivity: 0.97,
  clearcoat: 0.92,
  clearcoatRoughness: 0.04,
  ior: 0.35,
  sheen: 0.55,
  sheenColor: '#FFB6C1',
  sheenRoughness: 0.08,
};

/**
 * Tiffany Platinum
 */
export const TIFFANY_PLATINUM: TiffanyMaterial = {
  name: 'Tiffany Platinum',
  color: '#E5E4E2',
  metalness: 1.0,
  roughness: 0.08,
  reflectivity: 0.99,
  clearcoat: 0.98,
  clearcoatRoughness: 0.02,
  ior: 0.22, // Platinum IOR
  sheen: 0.7,
  sheenColor: '#FFFFFF',
  sheenRoughness: 0.03,
};

/**
 * Tiffany Diamond
 */
export const TIFFANY_DIAMOND: TiffanyMaterial = {
  name: 'Tiffany Diamond',
  color: '#FFFFFF',
  metalness: 0.0,
  roughness: 0.0,
  emissive: '#FFFFFF',
  emissiveIntensity: 0.1,
  reflectivity: 1.0,
  clearcoat: 1.0,
  clearcoatRoughness: 0.0,
  ior: 2.42, // Diamond IOR
  sheen: 0.0,
};

/**
 * All Tiffany materials
 */
export const TIFFANY_MATERIALS = {
  blue: TIFFANY_BLUE,
  silver: TIFFANY_SILVER,
  gold: TIFFANY_GOLD,
  roseGold: TIFFANY_ROSE_GOLD,
  platinum: TIFFANY_PLATINUM,
  diamond: TIFFANY_DIAMOND,
} as const;

/**
 * Get Tiffany material by name
 */
export function getTiffanyMaterial(name: keyof typeof TIFFANY_MATERIALS): TiffanyMaterial {
  return TIFFANY_MATERIALS[name];
}
