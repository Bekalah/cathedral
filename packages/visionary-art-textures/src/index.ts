/**
 * index
 * 
 * @package @cathedral/visionary-art-textures
 */
/**
 * Master Visionary Art Textures & Tools
 * 
 * Museum-quality textures and tools inspired by:
 * - Renaissance Masters (canvas, fresco, oil techniques)
 * - Baroque Excellence (dramatic textures, rich materials)
 * - Visionary Artists (sacred geometry, mystical patterns)
 * 
 * Never flat - always flowing, trauma-informed design
 */

export interface Texture {
  id: string;
  name: string;
  description: string;
  tradition: string;
  type: 'canvas' | 'fresco' | 'oil' | 'watercolor' | 'digital' | 'sacred-geometry' | 'pattern';
  properties: TextureProperties;
  usage: string[];
  masters: string[];
}

export interface TextureProperties {
  roughness: number; // 0-1
  metallic: number; // 0-1
  opacity: number; // 0-1
  pattern?: string;
  scale?: number;
  rotation?: number;
}

export interface ArtTool {
  id: string;
  name: string;
  description: string;
  type: 'brush' | 'pen' | 'pencil' | 'palette-knife' | 'spray' | 'digital';
  properties: ToolProperties;
  tradition: string;
}

export interface ToolProperties {
  size: number;
  hardness: number; // 0-1
  opacity: number; // 0-1
  flow: number; // 0-1
  texture?: string;
}

// Master Textures
export const VISIONARY_TEXTURES: Texture[] = [
  {
    id: 'renaissance-canvas',
    name: 'Renaissance Canvas',
    description: 'Traditional canvas texture used by Renaissance masters',
    tradition: 'Renaissance',
    type: 'canvas',
    properties: {
      roughness: 0.7,
      metallic: 0.0,
      opacity: 1.0,
      pattern: 'canvas-weave',
      scale: 1.0
    },
    usage: ['Oil painting', 'Portraits', 'Sacred art'],
    masters: ['Leonardo da Vinci', 'Michelangelo', 'Raphael']
  },
  {
    id: 'baroque-velvet',
    name: 'Baroque Velvet',
    description: 'Rich velvet texture for dramatic Baroque compositions',
    tradition: 'Baroque',
    type: 'pattern',
    properties: {
      roughness: 0.3,
      metallic: 0.1,
      opacity: 1.0,
      pattern: 'velvet',
      scale: 0.5
    },
    usage: ['Dramatic compositions', 'Royal portraits', 'Sacred drama'],
    masters: ['Caravaggio', 'Rembrandt', 'Vermeer']
  },
  {
    id: 'golden-ratio-spiral',
    name: 'Golden Ratio Spiral',
    description: 'Sacred geometry spiral pattern based on golden ratio',
    tradition: 'Visionary',
    type: 'sacred-geometry',
    properties: {
      roughness: 0.5,
      metallic: 0.0,
      opacity: 1.0,
      pattern: 'golden-spiral',
      scale: 1.618
    },
    usage: ['Sacred geometry', 'Visionary art', 'Mystical compositions'],
    masters: ['Hilma af Klint', 'Leonora Carrington', 'Emma Kunz']
  },
  {
    id: 'vesica-piscis',
    name: 'Vesica Piscis Pattern',
    description: 'Sacred vesica piscis pattern for fusion and union',
    tradition: 'FusionKink',
    type: 'sacred-geometry',
    properties: {
      roughness: 0.4,
      metallic: 0.2,
      opacity: 1.0,
      pattern: 'vesica-piscis',
      scale: 1.0
    },
    usage: ['FusionKink art', 'Sacred union', 'A×B=D compositions'],
    masters: ['Rebecca Respawn', 'Alchemical Masters']
  },
  {
    id: 'chiaroscuro-shadow',
    name: 'Chiaroscuro Shadow',
    description: 'Dramatic shadow texture for chiaroscuro technique',
    tradition: 'Baroque',
    type: 'pattern',
    properties: {
      roughness: 0.8,
      metallic: 0.0,
      opacity: 0.7,
      pattern: 'shadow-gradient',
      scale: 2.0
    },
    usage: ['Chiaroscuro', 'Dramatic lighting', 'Emotional expression'],
    masters: ['Caravaggio', 'Rembrandt']
  }
];

// Master Art Tools
export const ART_TOOLS: ArtTool[] = [
  {
    id: 'renaissance-brush',
    name: 'Renaissance Master Brush',
    description: 'Traditional brush used by Renaissance masters',
    type: 'brush',
    properties: {
      size: 20,
      hardness: 0.5,
      opacity: 0.8,
      flow: 0.7,
      texture: 'renaissance-canvas'
    },
    tradition: 'Renaissance'
  },
  {
    id: 'baroque-palette-knife',
    name: 'Baroque Palette Knife',
    description: 'Palette knife for dramatic impasto technique',
    type: 'palette-knife',
    properties: {
      size: 30,
      hardness: 1.0,
      opacity: 1.0,
      flow: 0.9
    },
    tradition: 'Baroque'
  },
  {
    id: 'visionary-geometry-pen',
    name: 'Visionary Geometry Pen',
    description: 'Precision pen for sacred geometry',
    type: 'pen',
    properties: {
      size: 2,
      hardness: 1.0,
      opacity: 1.0,
      flow: 1.0
    },
    tradition: 'Visionary'
  },
  {
    id: 'fusionkink-brush',
    name: 'FusionKink Synthesis Brush',
    description: 'Brush for creating fusion and synthesis',
    type: 'brush',
    properties: {
      size: 25,
      hardness: 0.6,
      opacity: 0.9,
      flow: 0.8,
      texture: 'vesica-piscis'
    },
    tradition: 'FusionKink'
  }
];

/**
 * Get texture by ID
 */
export function getTexture(id: string): Texture | undefined {
  return VISIONARY_TEXTURES.find(texture => texture.id === id);
}

/**
 * Get all textures
 */
export function getAllTextures(): Texture[] {
  return VISIONARY_TEXTURES;
}

/**
 * Get textures by tradition
 */
export function getTexturesByTradition(tradition: string): Texture[] {
  return VISIONARY_TEXTURES.filter(texture => texture.tradition === tradition);
}

/**
 * Get tool by ID
 */
export function getTool(id: string): ArtTool | undefined {
  return ART_TOOLS.find(tool => tool.id === id);
}

/**
 * Get all tools
 */
export function getAllTools(): ArtTool[] {
  return ART_TOOLS;
}

/**
 * Get tools by tradition
 */
export function getToolsByTradition(tradition: string): ArtTool[] {
  return ART_TOOLS.filter(tool => tool.tradition === tradition);
}
