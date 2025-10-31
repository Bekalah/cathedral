import {
  SacredGeometry,
  GeometryType,
  Domain,
  DomainElement,
  SynthesizedElement,
  VisualProperties,
  AnimationType,
  AudioProperties,
  WaveformType,
  HarmonicRatio
} from '../types/FusionTypes';

/**
 * MysticalPatternEngine - Generates mystical patterns and visualizations
 *
 * This engine creates sacred geometric patterns, mystical visualizations,
 * and generative content using fractal mathematics and divine proportions.
 */
export class MysticalPatternEngine {
  private readonly goldenRatio: number;
  private readonly sacredNumbers: number[];
  private readonly fibonacciSequence: number[];
  private readonly baseHarmonicRatio: HarmonicRatio;

  constructor() {
    this.goldenRatio = (1 + Math.sqrt(5)) / 2;
    this.sacredNumbers = [3, 7, 12, 21, 33, 54, 87, 144];
    this.fibonacciSequence = this.generateFibonacciSequence(15);
    this.baseHarmonicRatio = {
      numerator: 144,
      denominator: 99,
      ratio: 144 / 99,
      fibonacciIndex: 12
    };
  }

  /**
   * Generate Fibonacci sequence up to n terms
   */
  private generateFibonacciSequence(n: number): number[] {
    const sequence = [0, 1];
    for (let i = 2; i <= n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  }

  /**
   * Generate fractal pattern based on sacred geometry
   */
  public generateFractalPattern(
    geometry: SacredGeometry,
    iterations: number = 5,
    scale: number = 1
  ): FractalPattern {
    const pattern: FractalPattern = {
      id: `fractal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      geometry: geometry.type,
      iterations,
      scale,
      points: [],
      connections: [],
      harmonics: []
    };

    switch (geometry.type) {
      case GeometryType.MERKABA:
        return this.generateMerkabaPattern(pattern, iterations, scale);
      case GeometryType.FLOWER_OF_LIFE:
        return this.generateFlowerOfLifePattern(pattern, iterations, scale);
      case GeometryType.METATRONS_CUBE:
        return this.generateMetatronPattern(pattern, iterations, scale);
      case GeometryType.TREE_OF_LIFE:
        return this.generateTreeOfLifePattern(pattern, iterations, scale);
      default:
        return this.generateSacredCirclePattern(pattern, iterations, scale);
    }
  }

  /**
   * Generate Merkaba star pattern with sacred proportions
   */
  private generateMerkabaPattern(
    basePattern: FractalPattern,
    iterations: number,
    scale: number
  ): FractalPattern {
    const points: Point3D[] = [];
    const connections: Connection[] = [];

    // Generate tetrahedron points using golden ratio
    const tetraPoints = this.generateTetrahedronPoints(scale);

    // Add upward tetrahedron
    points.push(...tetraPoints);

    // Add downward tetrahedron (inverted)
    const invertedTetra = tetraPoints.map(point => ({
      x: point.x,
      y: -point.y,
      z: -point.z
    }));
    points.push(...invertedTetra);

    // Create connections for star tetrahedron
    for (let i = 0; i < tetraPoints.length; i++) {
      for (let j = 0; j < tetraPoints.length; j++) {
        if (i !== j) {
          connections.push({
            from: i,
            to: j,
            strength: 0.7,
            harmonic: this.calculateHarmonicDistance(tetraPoints[i], tetraPoints[j])
          });
        }
      }
    }

    // Add inter-tetrahedron connections
    for (let i = 0; i < tetraPoints.length; i++) {
      connections.push({
        from: i,
        to: i + tetraPoints.length,
        strength: 0.9,
        harmonic: this.goldenRatio
      });
    }

    return {
      ...basePattern,
      points,
      connections,
      harmonics: [this.goldenRatio, this.baseHarmonicRatio.ratio]
    };
  }

  /**
   * Generate Flower of Life pattern
   */
  private generateFlowerOfLifePattern(
    basePattern: FractalPattern,
    iterations: number,
    scale: number
  ): FractalPattern {
    const points: Point3D[] = [];
    const connections: Connection[] = [];
    const radius = scale * 50;

    // Center circle
    points.push({ x: 0, y: 0, z: 0 });

    // Generate overlapping circles using sacred geometry
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      points.push({ x, y, z: 0 });

      // Connect to center
      connections.push({
        from: 0,
        to: i + 1,
        strength: 0.8,
        harmonic: this.goldenRatio
      });
    }

    // Add vesica piscis intersections
    for (let i = 1; i <= 6; i++) {
      const next = i === 6 ? 1 : i + 1;
      const intersection = this.findCircleIntersection(points[i], points[next], radius);

      if (intersection) {
        points.push(intersection);
        const intersectIndex = points.length - 1;

        connections.push({
          from: i,
          to: intersectIndex,
          strength: 0.6,
          harmonic: Math.PI / 2
        });
      }
    }

    return {
      ...basePattern,
      points,
      connections,
      harmonics: [this.goldenRatio, Math.PI, this.baseHarmonicRatio.ratio]
    };
  }

  /**
   * Generate Metatron's Cube pattern
   */
  private generateMetatronPattern(
    basePattern: FractalPattern,
    iterations: number,
    scale: number
  ): FractalPattern {
    const points: Point3D[] = [];
    const connections: Connection[] = [];

    // 13 spheres of Metatron's Cube
    const metatronPoints = this.generateMetatronPoints(scale);
    points.push(...metatronPoints);

    // Connect spheres according to Metatron's Cube geometry
    const metatronConnections = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
      [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 7],
      [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12]
    ];

    metatronConnections.forEach(([from, to]) => {
      connections.push({
        from,
        to,
        strength: 0.8,
        harmonic: this.baseHarmonicRatio.ratio
      });
    });

    return {
      ...basePattern,
      points,
      connections,
      harmonics: [this.baseHarmonicRatio.ratio, 13, this.goldenRatio]
    };
  }

  /**
   * Generate Tree of Life pattern
   */
  private generateTreeOfLifePattern(
    basePattern: FractalPattern,
    iterations: number,
    scale: number
  ): FractalPattern {
    const points: Point3D[] = [];
    const connections: Connection[] = [];

    // 10 Sephiroth arranged in Tree of Life pattern
    const sephirothPositions = this.generateSephirothPositions(scale);
    points.push(...sephirothPositions);

    // 22 paths connecting the Sephiroth
    const treePaths = [
      [0, 1], [0, 2], [0, 3], [1, 2], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 6], [3, 6], [4, 5], [4, 7],
      [5, 8], [6, 7], [6, 8], [7, 9], [8, 9], [9, 10],
      [9, 11], [9, 12], [10, 11], [11, 12]
    ];

    treePaths.forEach(([from, to]) => {
      connections.push({
        from,
        to,
        strength: 0.7,
        harmonic: this.fibonacciSequence[from % this.fibonacciSequence.length] /
                 this.fibonacciSequence[to % this.fibonacciSequence.length]
      });
    });

    return {
      ...basePattern,
      points,
      connections,
      harmonics: [10, 22, this.goldenRatio, this.baseHarmonicRatio.ratio]
    };
  }

  /**
   * Generate sacred circle pattern
   */
  private generateSacredCirclePattern(
    basePattern: FractalPattern,
    iterations: number,
    scale: number
  ): FractalPattern {
    const points: Point3D[] = [];
    const connections: Connection[] = [];
    const radius = scale * 30;

    // Generate points on sacred circle
    for (let i = 0; i < 12; i++) {
      const angle = (i * 2 * Math.PI) / 12;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      points.push({ x, y, z: 0 });

      // Connect to center
      connections.push({
        from: i,
        to: 12, // Center point
        strength: 0.6,
        harmonic: this.goldenRatio
      });
    }

    // Add center point
    points.push({ x: 0, y: 0, z: 0 });

    return {
      ...basePattern,
      points,
      connections,
      harmonics: [12, this.goldenRatio, Math.PI]
    };
  }

  /**
   * Generate tetrahedron vertex points using golden ratio
   */
  private generateTetrahedronPoints(scale: number): Point3D[] {
    const phi = this.goldenRatio;
    const a = scale * 50;

    return [
      { x: a, y: a, z: a },
      { x: -a, y: -a, z: a },
      { x: -a, y: a, z: -a },
      { x: a, y: -a, z: -a }
    ];
  }

  /**
   * Generate Metatron's Cube sphere positions
   */
  private generateMetatronPoints(scale: number): Point3D[] {
    const points: Point3D[] = [];
    const radius = scale * 40;

    // Central sphere
    points.push({ x: 0, y: 0, z: 0 });

    // Inner ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0
      });
    }

    // Outer ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      points.push({
        x: Math.cos(angle) * radius * 1.5,
        y: Math.sin(angle) * radius * 1.5,
        z: 0
      });
    }

    return points;
  }

  /**
   * Generate Tree of Life Sephiroth positions
   */
  private generateSephirothPositions(scale: number): Point3D[] {
    const positions: Point3D[] = [];
    const spacing = scale * 60;

    // Crown
    positions.push({ x: 0, y: spacing * 3, z: 0 });

    // Wisdom and Understanding
    positions.push({ x: -spacing, y: spacing * 2, z: 0 });
    positions.push({ x: spacing, y: spacing * 2, z: 0 });

    // Mercy and Severity
    positions.push({ x: -spacing * 1.5, y: spacing, z: 0 });
    positions.push({ x: spacing * 1.5, y: spacing, z: 0 });

    // Beauty
    positions.push({ x: 0, y: spacing, z: 0 });

    // Victory and Glory
    positions.push({ x: -spacing, y: 0, z: 0 });
    positions.push({ x: spacing, y: 0, z: 0 });

    // Foundation
    positions.push({ x: 0, y: -spacing, z: 0 });

    // Kingdom
    positions.push({ x: 0, y: -spacing * 2, z: 0 });

    return positions;
  }

  /**
   * Find intersection point between two circles
   */
  private findCircleIntersection(
    center1: Point3D,
    center2: Point3D,
    radius: number
  ): Point3D | null {
    const distance = Math.sqrt(
      Math.pow(center2.x - center1.x, 2) +
      Math.pow(center2.y - center1.y, 2)
    );

    if (distance > 2 * radius || distance === 0) {
      return null;
    }

    const a = (radius * radius - radius * radius + distance * distance) / (2 * distance);
    const h = Math.sqrt(radius * radius - a * a);

    const x2 = center1.x + a * (center2.x - center1.x) / distance;
    const y2 = center1.y + a * (center2.y - center1.y) / distance;

    const x3 = x2 + h * (center2.y - center1.y) / distance;
    const y3 = y2 - h * (center2.x - center1.x) / distance;

    return { x: x3, y: y3, z: 0 };
  }

  /**
   * Calculate harmonic distance between two points
   */
  private calculateHarmonicDistance(point1: Point3D, point2: Point3D): number {
    const distance = Math.sqrt(
      Math.pow(point2.x - point1.x, 2) +
      Math.pow(point2.y - point1.y, 2) +
      Math.pow(point2.z - point1.z, 2)
    );

    return this.goldenRatio / (1 + distance / 100);
  }

  /**
   * Generate mystical color palette based on element domains
   */
  public generateMysticalPalette(domains: Domain[]): MysticalColor[] {
    const palette: MysticalColor[] = [];

    domains.forEach((domain, index) => {
      const baseColor = this.getDomainColor(domain);
      const harmonics = this.generateColorHarmonics(baseColor, 3);

      palette.push({
        primary: baseColor,
        harmonics,
        domain,
        sacredNumber: this.sacredNumbers[index % this.sacredNumbers.length]
      });
    });

    return palette;
  }

  /**
   * Get base color for each domain
   */
  private getDomainColor(domain: Domain): string {
    switch (domain) {
      case Domain.ART:
        return '#FF6B9D'; // Creative pink
      case Domain.SCIENCE:
        return '#4834D4'; // Scientific purple
      case Domain.SPIRITUALITY:
        return '#78E08F'; // Spiritual green
      default:
        return '#F8B500'; // Golden
    }
  }

  /**
   * Generate harmonic color variations
   */
  private generateColorHarmonics(baseColor: string, count: number): string[] {
    const harmonics: string[] = [];
    const base = this.hexToHsl(baseColor);

    for (let i = 1; i <= count; i++) {
      const harmonic = {
        h: (base.h + i * 30) % 360,
        s: Math.max(0, Math.min(100, base.s + i * 10)),
        l: Math.max(0, Math.min(100, base.l + i * 5))
      };

      harmonics.push(this.hslToHex(harmonic));
    }

    return harmonics;
  }

  /**
   * Convert hex color to HSL
   */
  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * Convert HSL to hex color
   */
  private hslToHex(hsl: { h: number; s: number; l: number }): string {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Generate mystical sound pattern for synthesized element
   */
  public generateMysticalSoundPattern(element: SynthesizedElement): SoundPattern {
    const frequencies = this.generateHarmonicFrequencies(element);
    const waveforms = this.generateWaveforms(element);

    return {
      id: `sound_${element.id}`,
      frequencies,
      waveforms,
      duration: 3000, // 3 seconds
      harmonics: element.audio.harmonics,
      sacredRatio: this.baseHarmonicRatio,
      domains: element.domains
    };
  }

  /**
   * Generate harmonic frequencies based on element properties
   */
  private generateHarmonicFrequencies(element: SynthesizedElement): number[] {
    const baseFreq = element.frequency;
    const frequencies: number[] = [baseFreq];

    // Generate harmonics using sacred ratios
    const ratios = [1, this.goldenRatio, this.baseHarmonicRatio.ratio, Math.PI, Math.sqrt(2)];

    ratios.forEach(ratio => {
      frequencies.push(baseFreq * ratio);
      frequencies.push(baseFreq / ratio);
    });

    return frequencies.filter(f => f > 20 && f < 20000); // Audible range
  }

  /**
   * Generate waveforms based on element domains
   */
  private generateWaveforms(element: SynthesizedElement): WaveformType[] {
    const waveforms: WaveformType[] = [];

    element.domains.forEach(domain => {
      switch (domain) {
        case Domain.ART:
          waveforms.push(WaveformType.ORGANIC);
          break;
        case Domain.SCIENCE:
          waveforms.push(WaveformType.SQUARE);
          break;
        case Domain.SPIRITUALITY:
          waveforms.push(WaveformType.SINE);
          break;
      }
    });

    return [...new Set(waveforms)]; // Remove duplicates
  }
}

// Supporting interfaces for mystical patterns
export interface FractalPattern {
  id: string;
  geometry: GeometryType;
  iterations: number;
  scale: number;
  points: Point3D[];
  connections: Connection[];
  harmonics: number[];
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Connection {
  from: number;
  to: number;
  strength: number;
  harmonic: number;
}

export interface MysticalColor {
  primary: string;
  harmonics: string[];
  domain: Domain;
  sacredNumber: number;
}

export interface SoundPattern {
  id: string;
  frequencies: number[];
  waveforms: WaveformType[];
  duration: number;
  harmonics: number[];
  sacredRatio: HarmonicRatio;
  domains: Domain[];
}