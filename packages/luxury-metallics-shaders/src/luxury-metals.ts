/**
 * luxury-metals
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Luxury Metal Materials
 * 
 * High-end metallic materials for jewelry, watches, and luxury items
 */

import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

export interface LuxuryMetal {
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  reflectivity: number;
  clearcoat: number;
  clearcoatRoughness: number;
  ior: number;
  sheen: number;
  sheenColor: string;
  sheenRoughness: number;
  emissive?: string;
  emissiveIntensity?: number;
}

/**
 * High-end gold variations
 */
export const LUXURY_GOLDS = {
  yellowGold: {
    name: 'Yellow Gold (18k)',
    color: '#D4AF37',
    metalness: 1.0,
    roughness: 0.1,
    reflectivity: 0.98,
    clearcoat: 0.95,
    clearcoatRoughness: 0.03,
    ior: 0.37,
    sheen: 0.6,
    sheenColor: '#FFD700',
    sheenRoughness: 0.05,
  },
  whiteGold: {
    name: 'White Gold (18k)',
    color: '#F5F5DC',
    metalness: 1.0,
    roughness: 0.12,
    reflectivity: 0.97,
    clearcoat: 0.93,
    clearcoatRoughness: 0.04,
    ior: 0.35,
    sheen: 0.5,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.08,
  },
  roseGold: {
    name: 'Rose Gold (18k)',
    color: '#E8B4B8',
    metalness: 1.0,
    roughness: 0.12,
    reflectivity: 0.97,
    clearcoat: 0.92,
    clearcoatRoughness: 0.04,
    ior: 0.35,
    sheen: 0.55,
    sheenColor: '#FFB6C1',
    sheenRoughness: 0.08,
  },
  greenGold: {
    name: 'Green Gold (18k)',
    color: '#BDB76B',
    metalness: 1.0,
    roughness: 0.15,
    reflectivity: 0.96,
    clearcoat: 0.90,
    clearcoatRoughness: 0.05,
    ior: 0.33,
    sheen: 0.4,
    sheenColor: '#9ACD32',
    sheenRoughness: 0.1,
  },
} as const;

/**
 * Platinum variations
 */
export const LUXURY_PLATINUMS = {
  platinum: {
    name: 'Platinum',
    color: '#E5E4E2',
    metalness: 1.0,
    roughness: 0.08,
    reflectivity: 0.99,
    clearcoat: 0.98,
    clearcoatRoughness: 0.02,
    ior: 0.22,
    sheen: 0.7,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.03,
  },
  palladium: {
    name: 'Palladium',
    color: '#F0F0F0',
    metalness: 1.0,
    roughness: 0.1,
    reflectivity: 0.98,
    clearcoat: 0.96,
    clearcoatRoughness: 0.03,
    ior: 0.20,
    sheen: 0.65,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.05,
  },
} as const;

/**
 * Silver variations
 */
export const LUXURY_SILVERS = {
  sterlingSilver: {
    name: 'Sterling Silver',
    color: '#E8E8E8',
    metalness: 1.0,
    roughness: 0.15,
    reflectivity: 0.95,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    ior: 0.18,
    sheen: 0.5,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.1,
  },
  fineSilver: {
    name: 'Fine Silver (999)',
    color: '#F5F5F5',
    metalness: 1.0,
    roughness: 0.12,
    reflectivity: 0.97,
    clearcoat: 0.92,
    clearcoatRoughness: 0.04,
    ior: 0.18,
    sheen: 0.6,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.08,
  },
  oxidizedSilver: {
    name: 'Oxidized Silver',
    color: '#8B8B8B',
    metalness: 1.0,
    roughness: 0.4,
    reflectivity: 0.7,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
    ior: 0.18,
    sheen: 0.2,
    sheenColor: '#A0A0A0',
    sheenRoughness: 0.3,
  },
} as const;

/**
 * Precious gem materials
 */
export const PRECIOUS_GEMS = {
  diamond: {
    name: 'Diamond',
    color: '#FFFFFF',
    metalness: 0.0,
    roughness: 0.0,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 2.42,
    sheen: 0.0,
    sheenColor: '#FFFFFF',
    sheenRoughness: 0.0,
    emissive: '#FFFFFF',
    emissiveIntensity: 0.1,
  },
  sapphire: {
    name: 'Sapphire',
    color: '#0F52BA',
    metalness: 0.0,
    roughness: 0.0,
    reflectivity: 0.95,
    clearcoat: 0.98,
    clearcoatRoughness: 0.01,
    ior: 1.77,
    sheen: 0.0,
    sheenColor: '#0F52BA',
    sheenRoughness: 0.0,
  },
  ruby: {
    name: 'Ruby',
    color: '#E0115F',
    metalness: 0.0,
    roughness: 0.0,
    reflectivity: 0.95,
    clearcoat: 0.98,
    clearcoatRoughness: 0.01,
    ior: 1.77,
    sheen: 0.0,
    sheenColor: '#E0115F',
    sheenRoughness: 0.0,
  },
  emerald: {
    name: 'Emerald',
    color: '#50C878',
    metalness: 0.0,
    roughness: 0.0,
    reflectivity: 0.93,
    clearcoat: 0.96,
    clearcoatRoughness: 0.02,
    ior: 1.58,
    sheen: 0.0,
    sheenColor: '#50C878',
    sheenRoughness: 0.0,
  },
} as const;

/**
 * All luxury metals
 */
export const LUXURY_METALS = {
  ...LUXURY_GOLDS,
  ...LUXURY_PLATINUMS,
  ...LUXURY_SILVERS,
  ...PRECIOUS_GEMS,
} as const;

/**
 * Get luxury metal by name
 */
export function getLuxuryMetal(name: keyof typeof LUXURY_METALS): LuxuryMetal {
  return LUXURY_METALS[name];
}
