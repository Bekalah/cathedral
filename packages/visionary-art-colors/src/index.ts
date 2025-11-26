/**
 * index
 * 
 * @package @cathedral/visionary-art-colors
 */
/**
 * Master Visionary Art Colors & Palettes
 * 
 * Museum-quality color systems inspired by:
 * - Renaissance Masters (da Vinci, Michelangelo, Raphael)
 * - Baroque Excellence (Caravaggio, Rembrandt, Vermeer)
 * - Visionary Artists (Hilma af Klint, Leonora Carrington, Emma Kunz)
 * - Sacred Traditions (Golden Ratio, Sacred Geometry, Mystical Aesthetics)
 * 
 * Never flat - always flowing, trauma-informed design
 */

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  tradition: string;
  colors: Color[];
  usage: string[];
  masters: string[];
}

export interface Color {
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  meaning: string;
  correspondences: ColorCorrespondences;
}

export interface ColorCorrespondences {
  element?: string;
  planet?: string;
  zodiac?: string;
  chakra?: string;
  solfeggio?: number;
  shemAngel?: string;
  deity?: string;
}

// Master Visionary Art Palettes
export const VISIONARY_PALETTES: ColorPalette[] = [
  {
    id: 'renaissance-golden',
    name: 'Renaissance Golden Ratio',
    description: 'The golden palette of Renaissance masters - warm, luminous, divine proportions',
    tradition: 'Renaissance',
    colors: [
      {
        name: 'Alchemical Gold',
        hex: '#F4D03F',
        rgb: { r: 244, g: 208, b: 63 },
        hsl: { h: 48, s: 89, l: 60 },
        meaning: 'Divine light, transformation, mastery',
        correspondences: {
          element: 'Spirit',
          planet: 'Sun',
          zodiac: 'Leo',
          chakra: 'Crown',
          solfeggio: 528,
          deity: 'Ra (Egyptian), Apollo (Greek), Surya (Vedic)'
        }
      },
      {
        name: 'Vermillion Fire',
        hex: '#FF4500',
        rgb: { r: 255, g: 69, b: 0 },
        hsl: { h: 16, s: 100, l: 50 },
        meaning: 'Passion, transformation, initiation',
        correspondences: {
          element: 'Fire',
          planet: 'Mars',
          zodiac: 'Aries',
          chakra: 'Root',
          solfeggio: 396
        }
      },
      {
        name: 'Lapis Lazuli',
        hex: '#1E90FF',
        rgb: { r: 30, g: 144, b: 255 },
        hsl: { h: 210, s: 100, l: 56 },
        meaning: 'Wisdom, truth, divine communication',
        correspondences: {
          element: 'Water',
          planet: 'Moon',
          zodiac: 'Cancer',
          chakra: 'Throat',
          solfeggio: 417
        }
      },
      {
        name: 'Terra Cotta',
        hex: '#8B4513',
        rgb: { r: 139, g: 69, b: 19 },
        hsl: { h: 25, s: 76, l: 31 },
        meaning: 'Grounding, stability, manifestation',
        correspondences: {
          element: 'Earth',
          planet: 'Venus',
          zodiac: 'Taurus',
          chakra: 'Root',
          solfeggio: 396
        }
      },
      {
        name: 'Celestial Blue',
        hex: '#87CEEB',
        rgb: { r: 135, g: 206, b: 235 },
        hsl: { h: 197, s: 71, l: 73 },
        meaning: 'Communication, intellect, inspiration',
        correspondences: {
          element: 'Air',
          planet: 'Mercury',
          zodiac: 'Gemini',
          chakra: 'Throat',
          solfeggio: 528
        }
      }
    ],
    usage: ['Sacred art', 'Divine portraits', 'Master works', 'Golden ratio compositions'],
    masters: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Titian']
  },
  {
    id: 'baroque-dramatic',
    name: 'Baroque Dramatic Light',
    description: 'The dramatic chiaroscuro palette of Baroque masters - deep shadows, brilliant light',
    tradition: 'Baroque',
    colors: [
      {
        name: 'Obsidian Night',
        hex: '#0D0B12',
        rgb: { r: 13, g: 11, b: 18 },
        hsl: { h: 260, s: 24, l: 6 },
        meaning: 'Mystery, depth, shadow work',
        correspondences: {
          element: 'Shadow',
          planet: 'Saturn',
          zodiac: 'Capricorn',
          chakra: 'Root',
          solfeggio: 396
        }
      },
      {
        name: 'Crimson Passion',
        hex: '#DC143C',
        rgb: { r: 220, g: 20, b: 60 },
        hsl: { h: 348, s: 83, l: 47 },
        meaning: 'Passion, intensity, transformation',
        correspondences: {
          element: 'Fire',
          planet: 'Mars',
          zodiac: 'Scorpio',
          chakra: 'Sacral',
          solfeggio: 417
        }
      },
      {
        name: 'Royal Purple',
        hex: '#4B0082',
        rgb: { r: 75, g: 0, b: 130 },
        hsl: { h: 275, s: 100, l: 25 },
        meaning: 'Royalty, mysticism, transformation',
        correspondences: {
          element: 'Spirit',
          planet: 'Jupiter',
          zodiac: 'Sagittarius',
          chakra: 'Crown',
          solfeggio: 528
        }
      },
      {
        name: 'Golden Light',
        hex: '#FFD700',
        rgb: { r: 255, g: 215, b: 0 },
        hsl: { h: 51, s: 100, l: 50 },
        meaning: 'Divine light, illumination, revelation',
        correspondences: {
          element: 'Spirit',
          planet: 'Sun',
          zodiac: 'Leo',
          chakra: 'Solar Plexus',
          solfeggio: 528
        }
      },
      {
        name: 'Ivory White',
        hex: '#FFFFF0',
        rgb: { r: 255, g: 255, b: 240 },
        hsl: { h: 60, s: 100, l: 97 },
        meaning: 'Purity, clarity, divine presence',
        correspondences: {
          element: 'Spirit',
          planet: 'Moon',
          zodiac: 'Cancer',
          chakra: 'Crown',
          solfeggio: 741
        }
      }
    ],
    usage: ['Dramatic compositions', 'Chiaroscuro', 'Emotional expression', 'Sacred drama'],
    masters: ['Caravaggio', 'Rembrandt', 'Vermeer', 'Rubens']
  },
  {
    id: 'visionary-mystical',
    name: 'Visionary Mystical',
    description: 'The mystical palette of visionary artists - ethereal, transcendent, otherworldly',
    tradition: 'Visionary',
    colors: [
      {
        name: 'Rose Quartz',
        hex: '#FF9FBE',
        rgb: { r: 255, g: 159, b: 190 },
        hsl: { h: 340, s: 100, l: 81 },
        meaning: 'Love, compassion, healing',
        correspondences: {
          element: 'Water',
          planet: 'Venus',
          zodiac: 'Libra',
          chakra: 'Heart',
          solfeggio: 528
        }
      },
      {
        name: 'Teal Phosphorescence',
        hex: '#6DE0E0',
        rgb: { r: 109, g: 224, b: 224 },
        hsl: { h: 180, s: 66, l: 65 },
        meaning: 'Healing, communication, angelic frequencies',
        correspondences: {
          element: 'Water',
          planet: 'Neptune',
          zodiac: 'Pisces',
          chakra: 'Throat',
          solfeggio: 528
        }
      },
      {
        name: 'Vesica Piscis',
        hex: '#8A7FFF',
        rgb: { r: 138, g: 127, b: 255 },
        hsl: { h: 247, s: 100, l: 75 },
        meaning: 'Sacred union, divine marriage, fusion',
        correspondences: {
          element: 'Spirit',
          planet: 'Jupiter',
          zodiac: 'Sagittarius',
          chakra: 'Third Eye',
          solfeggio: 528
        }
      },
      {
        name: 'Iridescent Pearl',
        hex: '#F0E68C',
        rgb: { r: 240, g: 230, b: 140 },
        hsl: { h: 54, s: 77, l: 75 },
        meaning: 'Transcendence, iridescence, divine beauty',
        correspondences: {
          element: 'Spirit',
          planet: 'Venus',
          zodiac: 'Taurus',
          chakra: 'Crown',
          solfeggio: 741
        }
      },
      {
        name: 'Mystic Violet',
        hex: '#9370DB',
        rgb: { r: 147, g: 112, b: 219 },
        hsl: { h: 260, s: 60, l: 65 },
        meaning: 'Mysticism, intuition, spiritual connection',
        correspondences: {
          element: 'Spirit',
          planet: 'Neptune',
          zodiac: 'Pisces',
          chakra: 'Third Eye',
          solfeggio: 528
        }
      }
    ],
    usage: ['Visionary art', 'Mystical compositions', 'Sacred geometry', 'Transcendent works'],
    masters: ['Hilma af Klint', 'Leonora Carrington', 'Emma Kunz', 'Max Ernst']
  },
  {
    id: 'fusionkink-alchemical',
    name: 'FusionKink Alchemical',
    description: 'The FusionKink palette - divine/infernal/harmony synthesis (A×B=D)',
    tradition: 'FusionKink',
    colors: [
      {
        name: 'Divine Gold',
        hex: '#FFD700',
        rgb: { r: 255, g: 215, b: 0 },
        hsl: { h: 51, s: 100, l: 50 },
        meaning: 'Divine principle, light, ascension',
        correspondences: {
          element: 'Spirit',
          planet: 'Sun',
          zodiac: 'Leo',
          chakra: 'Crown',
          solfeggio: 528
        }
      },
      {
        name: 'Infernal Crimson',
        hex: '#8B0000',
        rgb: { r: 139, g: 0, b: 0 },
        hsl: { h: 0, s: 100, l: 27 },
        meaning: 'Infernal principle, shadow, depth',
        correspondences: {
          element: 'Fire',
          planet: 'Mars',
          zodiac: 'Scorpio',
          chakra: 'Root',
          solfeggio: 396
        }
      },
      {
        name: 'Harmony Iridescent',
        hex: '#FF69B4',
        rgb: { r: 255, g: 105, b: 180 },
        hsl: { h: 330, s: 100, l: 71 },
        meaning: 'Harmony, fusion, balance of opposites',
        correspondences: {
          element: 'Spirit',
          planet: 'Venus',
          zodiac: 'Libra',
          chakra: 'Heart',
          solfeggio: 528
        }
      },
      {
        name: 'Vesica Union',
        hex: '#9370DB',
        rgb: { r: 147, g: 112, b: 219 },
        hsl: { h: 260, s: 60, l: 65 },
        meaning: 'Sacred union, divine marriage, A×B=D',
        correspondences: {
          element: 'Spirit',
          planet: 'Jupiter',
          zodiac: 'Sagittarius',
          chakra: 'Third Eye',
          solfeggio: 528
        }
      },
      {
        name: 'Alchemical White',
        hex: '#FFFFFF',
        rgb: { r: 255, g: 255, b: 255 },
        hsl: { h: 0, s: 0, l: 100 },
        meaning: 'Completion, unity, all colors in synthesis',
        correspondences: {
          element: 'All',
          planet: 'All',
          zodiac: 'All',
          chakra: 'All',
          solfeggio: 963
        }
      }
    ],
    usage: ['FusionKink art', 'Alchemical synthesis', 'Divine/Infernal harmony', 'A×B=D compositions'],
    masters: ['Rebecca Respawn', 'Alchemical Masters', 'Fusion Artists']
  }
];

/**
 * Get palette by ID
 */
export function getPalette(id: string): ColorPalette | undefined {
  return VISIONARY_PALETTES.find(palette => palette.id === id);
}

/**
 * Get all palettes
 */
export function getAllPalettes(): ColorPalette[] {
  return VISIONARY_PALETTES;
}

/**
 * Get palette by tradition
 */
export function getPalettesByTradition(tradition: string): ColorPalette[] {
  return VISIONARY_PALETTES.filter(palette => palette.tradition === tradition);
}

/**
 * Get color by name
 */
export function getColor(name: string): Color | undefined {
  for (const palette of VISIONARY_PALETTES) {
    const color = palette.colors.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (color) return color;
  }
  return undefined;
}

/**
 * Generate gradient between two colors
 */
export function generateGradient(color1: Color, color2: Color, steps: number = 10): Color[] {
  const gradient: Color[] = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const r = Math.round(color1.rgb.r + (color2.rgb.r - color1.rgb.r) * ratio);
    const g = Math.round(color1.rgb.g + (color2.rgb.g - color1.rgb.g) * ratio);
    const b = Math.round(color1.rgb.b + (color2.rgb.b - color1.rgb.b) * ratio);
    
    gradient.push({
      name: `${color1.name} → ${color2.name} (${i})`,
      hex: `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,
      rgb: { r, g, b },
      hsl: rgbToHsl(r, g, b),
      meaning: `Gradient step ${i} between ${color1.name} and ${color2.name}`,
      correspondences: {}
    });
  }
  return gradient;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Get colors by element
 */
export function getColorsByElement(element: string): Color[] {
  const colors: Color[] = [];
  for (const palette of VISIONARY_PALETTES) {
    colors.push(...palette.colors.filter(c => c.correspondences.element === element));
  }
  return colors;
}

/**
 * Get colors by planet
 */
export function getColorsByPlanet(planet: string): Color[] {
  const colors: Color[] = [];
  for (const palette of VISIONARY_PALETTES) {
    colors.push(...palette.colors.filter(c => c.correspondences.planet === planet));
  }
  return colors;
}
