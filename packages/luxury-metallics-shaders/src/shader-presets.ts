/**
 * shader-presets
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Luxury Shader Presets
 * 
 * Pre-configured shader presets for common luxury applications
 */

import { createTiffanyThreeMaterial } from './three-shaders';
import { createLuxuryMetalThreeMaterial } from './three-shaders';
import { createGoldenRatioMetallic } from './three-shaders';
import * as THREE from 'three';

/**
 * Jewelry preset - High-end jewelry materials
 */
export const JEWELRY_PRESETS = {
  engagementRing: () => createTiffanyThreeMaterial('diamond'),
  weddingBand: () => createTiffanyThreeMaterial('platinum'),
  necklace: () => createTiffanyThreeMaterial('gold'),
  bracelet: () => createTiffanyThreeMaterial('roseGold'),
  earrings: () => createTiffanyThreeMaterial('silver'),
} as const;

/**
 * Watch preset - Luxury watch materials
 */
export const WATCH_PRESETS = {
  rolex: () => createLuxuryMetalThreeMaterial('yellowGold'),
  patek: () => createLuxuryMetalThreeMaterial('platinum'),
  cartier: () => createLuxuryMetalThreeMaterial('roseGold'),
  omega: () => createLuxuryMetalThreeMaterial('sterlingSilver'),
} as const;

/**
 * Fashion preset - High-end fashion accessories
 */
export const FASHION_PRESETS = {
  tiffany: () => createTiffanyThreeMaterial('blue'),
  cartier: () => createLuxuryMetalThreeMaterial('roseGold'),
  bulgari: () => createLuxuryMetalThreeMaterial('yellowGold'),
  chanel: () => createLuxuryMetalThreeMaterial('platinum'),
} as const;

/**
 * Architecture preset - Luxury architectural elements
 */
export const ARCHITECTURE_PRESETS = {
  goldAccent: () => createGoldenRatioMetallic('#D4AF37'),
  silverAccent: () => createGoldenRatioMetallic('#E8E8E8'),
  platinumAccent: () => createGoldenRatioMetallic('#E5E4E2'),
  roseGoldAccent: () => createGoldenRatioMetallic('#E8B4B8'),
} as const;

/**
 * Get preset by category and name
 */
export function getShaderPreset(
  category: 'jewelry' | 'watch' | 'fashion' | 'architecture',
  name: string
): THREE.Material {
  switch (category) {
    case 'jewelry':
      return JEWELRY_PRESETS[name as keyof typeof JEWELRY_PRESETS]?.() || createTiffanyThreeMaterial('gold');
    case 'watch':
      return WATCH_PRESETS[name as keyof typeof WATCH_PRESETS]?.() || createLuxuryMetalThreeMaterial('yellowGold');
    case 'fashion':
      return FASHION_PRESETS[name as keyof typeof FASHION_PRESETS]?.() || createTiffanyThreeMaterial('blue');
    case 'architecture':
      return ARCHITECTURE_PRESETS[name as keyof typeof ARCHITECTURE_PRESETS]?.() || createGoldenRatioMetallic('#D4AF37');
    default:
      return createTiffanyThreeMaterial('gold');
  }
}
