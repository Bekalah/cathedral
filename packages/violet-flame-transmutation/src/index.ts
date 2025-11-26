/**
 * index
 * 
 * @package @cathedral/violet-flame-transmutation
 */
/**
 * Violet Flame of Transmutation
 * 
 * Universal transformation system where:
 * - Game becomes Art
 * - Art becomes Music
 * - Music becomes Game
 * - All forms flow into each other
 * 
 * Like the violet flame of alchemy, everything can be transmuted into everything else.
 * Never flat - always flowing, trauma-informed design.
 */

import { LegendarySynth } from '@cathedral/synth';
import { ArtGenerationNode } from '@cathedral/art-generation-node';
import { getPalette } from '@cathedral/visionary-art-colors';
import { getTexture } from '@cathedral/visionary-art-textures';

export type TransmutationForm = 'game' | 'art' | 'music' | 'design' | 'fractal' | 'science';

export interface Transmutation {
  from: TransmutationForm;
  to: TransmutationForm;
  data: any;
  result: any;
  quality: 'master' | 'professional' | 'experimental';
}

export interface FractalData {
  pattern: number[][];
  colors: string[];
  complexity: number;
  seed: string;
}

export interface SoundData {
  frequencies: number[];
  waveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
  duration: number;
  envelope: { attack: number; decay: number; sustain: number; release: number };
}

export interface ArtData {
  colors: string[];
  pattern: string;
  style: string;
  dimensions: { width: number; height: number };
  texture?: string;
}

export interface GameData {
  positions: Array<{ x: number; y: number; z: number }>;
  colors: string[];
  movements: Array<{ type: string; params: any }>;
  physics: any;
}

export interface DesignData {
  layout: any;
  colors: string[];
  typography: any;
  components: any[];
}

/**
 * Violet Flame Transmutation Engine
 * 
 * Transforms any form into any other form:
 * - Fractal → Sound → Art → Game → Design
 * - All forms are interchangeable
 * - Master-quality transformations
 */
export class VioletFlameTransmutation {
  private synth: LegendarySynth;
  private artGen: ArtGenerationNode;

  constructor() {
    this.synth = new LegendarySynth();
    this.artGen = new ArtGenerationNode();
  }

  /**
   * Transmute Fractal → Sound
   * Convert fractal patterns into musical frequencies and waveforms
   */
  transmuteFractalToSound(fractal: FractalData): SoundData {
// console.log('🔥 Transmuting Fractal → Sound...');
    
    // Extract frequencies from fractal pattern
    const frequencies: number[] = [];
    const goldenRatio = 1.618033988749895;
    
    fractal.pattern.forEach((row, i) => {
      row.forEach((value, j) => {
        // Convert fractal value to frequency using golden ratio
        const baseFreq = 256; // Base frequency (C4)
        const freq = baseFreq * Math.pow(goldenRatio, (value / 100) * 2);
        frequencies.push(freq);
      });
    });

    // Determine waveform based on fractal complexity
    let waveform: 'sine' | 'square' | 'sawtooth' | 'triangle' = 'sine';
    if (fractal.complexity > 0.7) waveform = 'sawtooth';
    else if (fractal.complexity > 0.4) waveform = 'triangle';
    else if (fractal.complexity > 0.2) waveform = 'square';

    return {
      frequencies: frequencies.slice(0, 100), // Limit to 100 frequencies
      waveform,
      duration: fractal.complexity * 10, // Duration based on complexity
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.7,
        release: 0.5
      }
    };
  }

  /**
   * Transmute Sound → Art
   * Convert sound frequencies into visual art patterns
   */
  transmuteSoundToArt(sound: SoundData): ArtData {
// console.log('🎨 Transmuting Sound → Art...');
    
    const palette = getPalette('fusionkink-alchemical');
    const colors: string[] = [];
    
    // Map frequencies to colors
    sound.frequencies.forEach((freq, i) => {
      // Convert frequency to hue (0-360)
      const hue = (freq % 360);
      const saturation = 80 + (i % 20);
      const lightness = 50 + (freq % 30);
      
      // Convert HSL to hex (simplified)
      const color = this.hslToHex(hue, saturation, lightness);
      colors.push(color);
    });

    // Generate pattern based on waveform
    let pattern = 'spiral';
    if (sound.waveform === 'sawtooth') pattern = 'geometric';
    else if (sound.waveform === 'square') pattern = 'grid';
    else if (sound.waveform === 'triangle') pattern = 'triangular';
    else pattern = 'flowing';

    return {
      colors: colors.slice(0, 20), // Limit colors
      pattern,
      style: 'visionary',
      dimensions: {
        width: 1920,
        height: 1080
      },
      texture: 'vesica-piscis'
    };
  }

  /**
   * Transmute Art → Game
   * Convert art patterns into game positions and movements
   */
  transmuteArtToGame(art: ArtData): GameData {
// console.log('🎮 Transmuting Art → Game...');
    
    const positions: Array<{ x: number; y: number; z: number }> = [];
    const movements: Array<{ type: string; params: any }> = [];
    const goldenRatio = 1.618033988749895;

    // Convert colors to 3D positions
    art.colors.forEach((color, i) => {
      const angle = i * goldenRatio * Math.PI * 2;
      const radius = Math.sqrt(i) * 10;
      
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: i * 0.5
      });

      // Create movement based on color
      movements.push({
        type: 'spiral',
        params: {
          speed: this.colorToSpeed(color),
          direction: angle,
          radius
        }
      });
    });

    return {
      positions,
      colors: art.colors,
      movements,
      physics: {
        gravity: 0.1,
        friction: 0.95,
        bounce: 0.8
      }
    };
  }

  /**
   * Transmute Game → Music
   * Convert game positions and movements into musical patterns
   */
  transmuteGameToMusic(game: GameData): SoundData {
// console.log('🎵 Transmuting Game → Music...');
    
    const frequencies: number[] = [];
    
    // Convert positions to frequencies
    game.positions.forEach((pos, i) => {
      // Calculate frequency from position
      const distance = Math.sqrt(pos.x ** 2 + pos.y ** 2 + pos.z ** 2);
      const baseFreq = 256;
      const freq = baseFreq + (distance * 10);
      frequencies.push(freq);
    });

    // Determine waveform from movement types
    const movementTypes = game.movements.map(m => m.type);
    let waveform: 'sine' | 'square' | 'sawtooth' | 'triangle' = 'sine';
    if (movementTypes.includes('spiral')) waveform = 'sawtooth';
    else if (movementTypes.includes('linear')) waveform = 'square';
    else if (movementTypes.includes('circular')) waveform = 'triangle';

    return {
      frequencies: frequencies.slice(0, 100),
      waveform,
      duration: game.positions.length * 0.1,
      envelope: {
        attack: 0.05,
        decay: 0.2,
        sustain: 0.8,
        release: 0.4
      }
    };
  }

  /**
   * Transmute Art → Design
   * Convert art into professional design system components
   */
  transmuteArtToDesign(art: ArtData): DesignData {
// console.log('🎨 Transmuting Art → Design...');
    
    const palette = getPalette('fusionkink-alchemical');
    
    return {
      layout: {
        type: 'golden-ratio',
        columns: 12,
        gutter: 16,
        margin: 24
      },
      colors: art.colors,
      typography: {
        fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
        scale: 'golden-ratio',
        sizes: {
          h1: '2.618rem',
          h2: '1.618rem',
          h3: '1rem',
          body: '1rem'
        }
      },
      components: art.colors.map((color, i) => ({
        id: `component-${i}`,
        type: 'card',
        color,
        style: art.style
      }))
    };
  }

  /**
   * Transmute Design → Art
   * Convert design system back into art
   */
  transmuteDesignToArt(design: DesignData): ArtData {
// console.log('🎨 Transmuting Design → Art...');
    
    return {
      colors: design.colors,
      pattern: 'professional',
      style: 'design-system',
      dimensions: {
        width: 1920,
        height: 1080
      }
    };
  }

  /**
   * Universal Transmutation
   * Transmute any form into any other form
   */
  transmute(
    from: TransmutationForm,
    to: TransmutationForm,
    data: any
  ): Transmutation {
// console.log(`🔥 Violet Flame: ${from} → ${to}`);

    let result: any;

    // Fractal transformations
    if (from === 'fractal' && to === 'music') {
      result = this.transmuteFractalToSound(data);
    } else if (from === 'fractal' && to === 'art') {
      const sound = this.transmuteFractalToSound(data);
      result = this.transmuteSoundToArt(sound);
    } else if (from === 'fractal' && to === 'game') {
      const sound = this.transmuteFractalToSound(data);
      const art = this.transmuteSoundToArt(sound);
      result = this.transmuteArtToGame(art);
    }

    // Sound transformations
    else if (from === 'music' && to === 'art') {
      result = this.transmuteSoundToArt(data);
    } else if (from === 'music' && to === 'game') {
      const art = this.transmuteSoundToArt(data);
      result = this.transmuteArtToGame(art);
    } else if (from === 'music' && to === 'fractal') {
      // Reverse: sound → fractal
      result = this.transmuteSoundToFractal(data);
    }

    // Art transformations
    else if (from === 'art' && to === 'music') {
      const game = this.transmuteArtToGame(data);
      result = this.transmuteGameToMusic(game);
    } else if (from === 'art' && to === 'game') {
      result = this.transmuteArtToGame(data);
    } else if (from === 'art' && to === 'design') {
      result = this.transmuteArtToDesign(data);
    }

    // Game transformations
    else if (from === 'game' && to === 'music') {
      result = this.transmuteGameToMusic(data);
    } else if (from === 'game' && to === 'art') {
      const music = this.transmuteGameToMusic(data);
      result = this.transmuteSoundToArt(music);
    }

    // Design transformations
    else if (from === 'design' && to === 'art') {
      result = this.transmuteDesignToArt(data);
    }

    return {
      from,
      to,
      data,
      result,
      quality: 'master'
    };
  }

  /**
   * Transmute Sound → Fractal (reverse)
   */
  private transmuteSoundToFractal(sound: SoundData): FractalData {
    const pattern: number[][] = [];
    const colors: string[] = [];
    
    // Convert frequencies to fractal pattern
    const rows = Math.ceil(Math.sqrt(sound.frequencies.length));
    let row: number[] = [];
    
    sound.frequencies.forEach((freq, i) => {
      const value = (freq % 100) / 100; // Normalize to 0-1
      row.push(value);
      
      if (row.length >= rows) {
        pattern.push(row);
        row = [];
      }
    });

    // Generate colors from frequencies
    sound.frequencies.forEach(freq => {
      const hue = (freq % 360);
      colors.push(this.hslToHex(hue, 80, 60));
    });

    return {
      pattern,
      colors: colors.slice(0, 20),
      complexity: sound.frequencies.length / 100,
      seed: `sound-${Date.now()}`
    };
  }

  /**
   * Helper: Convert HSL to Hex
   */
  private hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h < 1/6) {
      r = c; g = x; b = 0;
    } else if (h < 2/6) {
      r = x; g = c; b = 0;
    } else if (h < 3/6) {
      r = 0; g = c; b = x;
    } else if (h < 4/6) {
      r = 0; g = x; b = c;
    } else if (h < 5/6) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  }

  /**
   * Helper: Convert color to speed
   */
  private colorToSpeed(color: string): number {
    // Extract brightness from hex color
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r + g + b) / 3;
    return brightness / 255; // Normalize to 0-1
  }
}

// Singleton instance
export const violetFlame = new VioletFlameTransmutation();
