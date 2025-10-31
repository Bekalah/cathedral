import * as THREE from 'three';
// TODO: Update imports when sacred-geometry-engine is properly configured in unified monorepo
// import { SacredGeometryEngine, Vector3D, GemTowerConfig, GemLootTable } from '@cathedral/sacred-geometry-engine';

// Temporary interface definitions for compilation
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

interface GemTowerConfig {
  gemType: string;
  baseForm?: string;
  height?: number;
  tiers?: number;
  spires?: number;
  hasBridges?: boolean;
  hasFloatingCrystals?: boolean;
  energyPattern?: string;
  scale?: number;
  position?: Vector3D;
}

interface GemLootTable {
  gemType: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  dropRate: number;
  value: { min: number; max: number };
  sources: string[];
}

/**
 * GemTowerEngine - Sacred Geometry Gem Tower Generation System
 * Creates changeable "emerald city" style towers for different gem types
 * Consolidated into main cathedral monorepo structure
 */
export class GemTowerEngine {
  private static readonly GEM_TOWER_DATA: Record<string, any> = {
    clear_quartz: {
      baseForm: 'pyramid',
      energyPattern: 'radial',
      lightRefraction: 'prismatic',
      soundResonance: 'clear_tone',
      structure: {
        tiers: { min: 4, max: 7 },
        spires: { min: 1, max: 3 },
        bridges: true,
        floatingCrystals: true
      }
    },
    amethyst: {
      baseForm: 'step_pyramid',
      energyPattern: 'spiral',
      lightRefraction: 'violet_prism',
      soundResonance: 'deep_meditation',
      structure: {
        tiers: { min: 6, max: 9 },
        spires: { min: 2, max: 5 },
        bridges: true,
        floatingCrystals: true,
        mysticalRunes: true
      }
    },
    rose_quartz: {
      baseForm: 'heart_spire',
      energyPattern: 'heart_rhythm',
      lightRefraction: 'soft_glow',
      soundResonance: 'gentle_harmony',
      structure: {
        tiers: { min: 3, max: 6 },
        spires: { min: 1, max: 2 },
        bridges: false,
        floatingCrystals: true,
        heartChambers: true,
        roseGardens: true
      }
    },
    emerald: {
      baseForm: 'emerald_city',
      energyPattern: 'verdant_spiral',
      lightRefraction: 'emerald_ray',
      soundResonance: 'forest_whisper',
      structure: {
        tiers: { min: 7, max: 12 },
        spires: { min: 3, max: 7 },
        bridges: true,
        floatingCrystals: true,
        gardenTerraces: true,
        crystalFountains: true,
        verdantCanopies: true
      }
    },
    ruby: {
      baseForm: 'crimson_citadel',
      energyPattern: 'fiery_pulse',
      lightRefraction: 'crimson_fire',
      soundResonance: 'warrior_drum',
      structure: {
        tiers: { min: 8, max: 15 },
        spires: { min: 4, max: 9 },
        bridges: true,
        floatingCrystals: true,
        flameAltars: true,
        guardianStatues: true,
        crimsonBanners: true
      }
    },
    sapphire: {
      baseForm: 'sapphire_spire',
      energyPattern: 'stellar_flow',
      lightRefraction: 'blue_starlight',
      soundResonance: 'celestial_harmony',
      structure: {
        tiers: { min: 6, max: 11 },
        spires: { min: 2, max: 6 },
        bridges: true,
        floatingCrystals: true,
        wisdomLibraries: true,
        starChambers: true,
        celestialMaps: true
      }
    },
    diamond: {
      baseForm: 'diamond_palace',
      energyPattern: 'perfect_harmony',
      lightRefraction: 'perfect_prism',
      soundResonance: 'divine_tone',
      structure: {
        tiers: { min: 10, max: 20 },
        spires: { min: 5, max: 12 },
        bridges: true,
        floatingCrystals: true,
        prismGalleries: true,
        lightChambers: true,
        rainbowHalls: true,
        celestialObservatory: true
      }
    },
    citrine: {
      baseForm: 'sun_tower',
      energyPattern: 'solar_flare',
      lightRefraction: 'golden_light',
      soundResonance: 'bright_melody',
      structure: {
        tiers: { min: 5, max: 8 },
        spires: { min: 2, max: 4 },
        bridges: true,
        floatingCrystals: true,
        sunGardens: true,
        goldenAltars: true
      }
    },
    black_tourmaline: {
      baseForm: 'obsidian_fortress',
      energyPattern: 'protective_field',
      lightRefraction: 'shadow_absorption',
      soundResonance: 'deep_protection',
      structure: {
        tiers: { min: 4, max: 7 },
        spires: { min: 1, max: 3 },
        bridges: false,
        floatingCrystals: false,
        protectionWards: true,
        shadowChambers: true,
        guardianAltars: true
      }
    },
    moonstone: {
      baseForm: 'lunar_spire',
      energyPattern: 'lunar_cycle',
      lightRefraction: 'moonlight_sheen',
      soundResonance: 'gentle_waves',
      structure: {
        tiers: { min: 4, max: 8 },
        spires: { min: 2, max: 4 },
        bridges: true,
        floatingCrystals: true,
        moonGardens: true,
        reflectionPools: true,
        dreamChambers: true
      }
    }
  };

  /**
   * Generate a complete gem tower structure with sacred geometry
   */
  static generateGemTower(config: GemTowerConfig): {
    geometry: THREE.BufferGeometry;
    materials: THREE.Material[];
    energyPattern: string;
    lootTable: GemLootTable;
  } {
    const gemData = this.GEM_TOWER_DATA[config.gemType.toLowerCase()];
    if (!gemData) {
      throw new Error(`Unknown gem type: ${config.gemType}`);
    }

    // Generate tower geometry using sacred geometry principles
    const towerGeometry = this.generateTowerGeometry(config, gemData);

    // Generate materials based on gem properties and chakra correspondences
    const materials = this.generateGemMaterials(config.gemType);

    // Create energy pattern configuration following fibonacci spirals
    const energyPattern = this.generateEnergyPattern(config, gemData);

    // Generate loot table with sacred economy principles
    const lootTable = this.generateLootTable(config.gemType);

    return {
      geometry: towerGeometry,
      materials,
      energyPattern,
      lootTable
    };
  }

  /**
   * Generate tower geometry based on gem configuration and sacred proportions
   */
  private static generateTowerGeometry(config: GemTowerConfig, gemData: any): THREE.BufferGeometry {
    const vertices: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    const baseRadius = config.scale || 1.0;
    const height = config.height || 10;
    const tiers = config.tiers || 5;

    // Generate tiered structure following fibonacci sequence
    for (let tier = 0; tier < tiers; tier++) {
      const tierHeight = (height / tiers) * (tier + 1);
      // Apply golden ratio to radius reduction
      const tierRadius = baseRadius * (1 - (tier / tiers) * 0.382); // 1-φ ≈ 0.382

      // Generate vertices for this tier using sacred geometry
      const tierVertices = this.generateTierVertices(tierRadius, tierHeight, 8);

      tierVertices.forEach(vertex => {
        vertices.push(vertex.x, vertex.y, vertex.z);
        colors.push(1, 1, 1); // Will be enhanced by chakra-based materials
      });

      // Generate indices for this tier with proper triangulation
      if (tier > 0) {
        const prevTierStart = (tier - 1) * 8;
        const currentTierStart = tier * 8;

        // Connect tiers with faces using golden triangle principles
        for (let i = 0; i < 8; i++) {
          const next = (i + 1) % 8;
          indices.push(
            prevTierStart + i, currentTierStart + i, currentTierStart + next,
            prevTierStart + i, currentTierStart + next, prevTierStart + next
          );
        }
      }
    }

    // Generate spires following fibonacci heights
    const spireVertices = this.generateSpires(config.spires, height, baseRadius * 0.1);
    spireVertices.forEach(vertex => {
      vertices.push(vertex.x, vertex.y, vertex.z);
      colors.push(1, 1, 1);
    });

    // Generate special features based on gem type and chakra properties
    if (config.hasBridges) {
      const bridgeVertices = this.generateBridges(config, vertices.length / 3);
      bridgeVertices.forEach(vertex => {
        vertices.push(vertex.x, vertex.y, vertex.z);
        colors.push(1, 1, 1);
      });
    }

    if (config.hasFloatingCrystals) {
      const crystalVertices = this.generateFloatingCrystals(config, vertices.length / 3);
      crystalVertices.forEach(vertex => {
        vertices.push(vertex.x, vertex.y, vertex.z);
        colors.push(1, 1, 1);
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);

    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Generate vertices for a single tier using octagonal sacred geometry
   */
  private static generateTierVertices(radius: number, height: number, segments: number): Vector3D[] {
    const vertices: Vector3D[] = [];

    for (let i = 0; i < segments; i++) {
      const angle = (Math.PI * 2 * i) / segments;
      vertices.push({
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius
      });
    }

    return vertices;
  }

  /**
   * Generate spire structures following fibonacci proportions
   */
  private static generateSpires(count: number, baseHeight: number, radius: number): Vector3D[] {
    const vertices: Vector3D[] = [];

    for (let spire = 0; spire < count; spire++) {
      const angle = (Math.PI * 2 * spire) / count;
      const x = Math.cos(angle) * radius * 2;
      const z = Math.sin(angle) * radius * 2;

      // Spire vertices following fibonacci heights (1, 1, 2, 3, 5, 8...)
      const fibonacciHeights = [1, 2, 3, 5, 8];
      for (let h = 0; h < fibonacciHeights.length; h++) {
        const spireHeight = baseHeight + (fibonacciHeights[h] * 0.5);
        const spireRadius = radius * (1 - h * 0.2);

        vertices.push({
          x: x + Math.cos(angle) * spireRadius,
          y: spireHeight,
          z: z + Math.sin(angle) * spireRadius
        });
      }
    }

    return vertices;
  }

  /**
   * Generate bridge structures between tiers using sacred geometry
   */
  private static generateBridges(config: GemTowerConfig, startIndex: number): Vector3D[] {
    const vertices: Vector3D[] = [];
    const tiers = config.tiers;

    for (let tier = 0; tier < tiers - 1; tier++) {
      const bridgeCount = Math.min(4, Math.floor(tiers / 2));

      for (let bridge = 0; bridge < bridgeCount; bridge++) {
        const angle1 = (Math.PI * 2 * bridge) / bridgeCount;
        const angle2 = (Math.PI * 2 * (bridge + 1)) / bridgeCount;

        const height = (config.height / tiers) * (tier + 0.5);

        vertices.push(
          {
            x: Math.cos(angle1) * (config.scale || 1) * (1 - tier * 0.1),
            y: height,
            z: Math.sin(angle1) * (config.scale || 1) * (1 - tier * 0.1)
          },
          {
            x: Math.cos(angle2) * (config.scale || 1) * (1 - tier * 0.1),
            y: height,
            z: Math.sin(angle2) * (config.scale || 1) * (1 - tier * 0.1)
          }
        );
      }
    }

    return vertices;
  }

  /**
   * Generate floating crystal formations using platonic solids
   */
  private static generateFloatingCrystals(config: GemTowerConfig, startIndex: number): Vector3D[] {
    const vertices: Vector3D[] = [];
    const crystalCount = Math.floor(config.tiers / 2);

    for (let crystal = 0; crystal < crystalCount; crystal++) {
      const angle = (Math.PI * 2 * crystal) / crystalCount;
      const radius = (config.scale || 1) * (1.5 + crystal * 0.3);
      const height = (config.height / config.tiers) * (crystal + 1);

      // Create crystal cluster using octahedral geometry (8 faces)
      for (let point = 0; point < 6; point++) {
        const crystalAngle = (Math.PI * 2 * point) / 6;
        const crystalRadius = 0.3;

        vertices.push({
          x: Math.cos(angle) * radius + Math.cos(crystalAngle) * crystalRadius,
          y: height + Math.sin(crystalAngle) * crystalRadius,
          z: Math.sin(angle) * radius + Math.sin(crystalAngle) * crystalRadius
        });
      }
    }

    return vertices;
  }

  /**
   * Generate materials for gem rendering with chakra-based color theory
   */
  private static generateGemMaterials(gemType: string): THREE.Material[] {
    const materials: THREE.Material[] = [];

    // Base crystal material with chakra color correspondence
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: this.getGemColor(gemType),
      metalness: 0.0,
      roughness: 0.0,
      transmission: 0.8,
      thickness: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
      ior: this.getGemIOR(gemType)
    });

    // Energy field material with fibonacci pulsing animation
    const energyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(this.getGemColor(gemType)) }
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPosition;

        void main() {
          // Fibonacci-based pulsing animation
          float fib1 = 1.6180339887;
          float pulse = sin(time * fib1) * 0.5 + 0.5;
          gl_FragColor = vec4(color, pulse * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    materials.push(crystalMaterial, energyMaterial);
    return materials;
  }

  /**
   * Generate energy pattern configuration following sacred geometry
   */
  private static generateEnergyPattern(config: GemTowerConfig, gemData: any): string {
    return JSON.stringify({
      pattern: gemData.energyPattern,
      intensity: config.scale || 1.0,
      frequency: this.getGemFrequency(config.gemType),
      color: this.getGemColor(config.gemType),
      // Sacred geometry properties
      fibonacciRatio: 1.6180339887,
      chakraAlignment: this.getChakraForGem(config.gemType),
      platonicForm: this.getPlatonicFormForGem(config.gemType)
    });
  }

  /**
   * Generate loot table for the gem with sacred economy principles
   */
  private static generateLootTable(gemType: string): GemLootTable {
    const gemKey = gemType.toLowerCase().replace(' ', '_');
    const gemData = this.GEM_TOWER_DATA[gemKey];

    if (!gemData) {
      throw new Error(`No loot data for gem type: ${gemType}`);
    }

    return {
      gemType,
      rarity: this.getGemRarity(gemType),
      dropRate: this.getGemDropRate(gemType),
      value: this.getGemValue(gemType),
      sources: this.getGemSources(gemType)
    };
  }

  /**
   * Get gem color based on chakra correspondence
   */
  private static getGemColor(gemType: string): number {
    const colors: Record<string, number> = {
      clear_quartz: 0xffffff, // Crown chakra
      amethyst: 0x9966cc,     // Third Eye chakra
      rose_quartz: 0xff99cc,  // Heart chakra
      emerald: 0x50c878,      // Heart chakra
      ruby: 0xe0115f,         // Root chakra
      sapphire: 0x0f52ba,     // Throat chakra
      diamond: 0xffffff,      // Crown chakra
      citrine: 0xffd700,      // Solar Plexus chakra
      black_tourmaline: 0x2c2c2c, // Root chakra
      moonstone: 0xf5f5dc     // Sacral chakra
    };

    return colors[gemType.toLowerCase()] || 0xffffff;
  }

  /**
   * Get gem refractive index for realistic crystal properties
   */
  private static getGemIOR(gemType: string): number {
    const ior: Record<string, number> = {
      clear_quartz: 1.544,
      amethyst: 1.544,
      rose_quartz: 1.544,
      emerald: 1.577,
      ruby: 1.762,
      sapphire: 1.762,
      diamond: 2.417,
      citrine: 1.544,
      black_tourmaline: 1.624,
      moonstone: 1.520
    };

    return ior[gemType.toLowerCase()] || 1.5;
  }

  /**
   * Get gem frequency for audio resonance
   */
  private static getGemFrequency(gemType: string): number {
    const frequencies: Record<string, number> = {
      clear_quartz: 963,      // Crown chakra frequency
      amethyst: 741,          // Third Eye chakra frequency
      rose_quartz: 528,       // Heart chakra frequency
      emerald: 528,           // Heart chakra frequency
      ruby: 285,              // Root chakra frequency
      sapphire: 741,          // Throat chakra frequency
      diamond: 963,           // Crown chakra frequency
      citrine: 528,           // Solar Plexus chakra frequency
      black_tourmaline: 396,  // Root chakra frequency
      moonstone: 432          // Sacral chakra frequency
    };

    return frequencies[gemType.toLowerCase()] || 528;
  }

  /**
   * Get chakra correspondence for gem
   */
  private static getChakraForGem(gemType: string): string {
    const chakras: Record<string, string> = {
      clear_quartz: 'Crown',
      amethyst: 'Third Eye',
      rose_quartz: 'Heart',
      emerald: 'Heart',
      ruby: 'Root',
      sapphire: 'Throat',
      diamond: 'Crown',
      citrine: 'Solar Plexus',
      black_tourmaline: 'Root',
      moonstone: 'Sacral'
    };

    return chakras[gemType.toLowerCase()] || 'Heart';
  }

  /**
   * Get platonic solid correspondence for gem
   */
  private static getPlatonicFormForGem(gemType: string): string {
    const forms: Record<string, string> = {
      clear_quartz: 'Dodecahedron',     // Ether/Crown
      amethyst: 'Icosahedron',          // Water/Third Eye
      rose_quartz: 'Octahedron',        // Air/Heart
      emerald: 'Octahedron',            // Air/Heart
      ruby: 'Cube',                     // Earth/Root
      sapphire: 'Octahedron',           // Air/Throat
      diamond: 'Dodecahedron',          // Ether/Crown
      citrine: 'Tetrahedron',           // Fire/Solar Plexus
      black_tourmaline: 'Cube',         // Earth/Root
      moonstone: 'Icosahedron'          // Water/Sacral
    };

    return forms[gemType.toLowerCase()] || 'Octahedron';
  }

  /**
   * Get gem rarity following fibonacci distribution
   */
  private static getGemRarity(gemType: string): 'Common' | 'Uncommon' | 'Rare' | 'Legendary' {
    const rarity: Record<string, 'Common' | 'Uncommon' | 'Rare' | 'Legendary'> = {
      clear_quartz: 'Common',
      citrine: 'Common',
      amethyst: 'Uncommon',
      rose_quartz: 'Uncommon',
      black_tourmaline: 'Uncommon',
      moonstone: 'Uncommon',
      emerald: 'Rare',
      ruby: 'Rare',
      sapphire: 'Rare',
      diamond: 'Legendary'
    };

    return rarity[gemType.toLowerCase()] || 'Common';
  }

  /**
   * Get gem drop rate following sacred probability distributions
   */
  private static getGemDropRate(gemType: string): number {
    const dropRates: Record<string, number> = {
      clear_quartz: 0.15,
      citrine: 0.12,
      amethyst: 0.08,
      rose_quartz: 0.06,
      black_tourmaline: 0.07,
      moonstone: 0.06,
      emerald: 0.03,
      ruby: 0.025,
      sapphire: 0.035,
      diamond: 0.005
    };

    return dropRates[gemType.toLowerCase()] || 0.1;
  }

  /**
   * Get gem value range following golden ratio proportions
   */
  private static getGemValue(gemType: string): { min: number; max: number } {
    const values: Record<string, { min: number; max: number }> = {
      clear_quartz: { min: 5, max: 50 },
      citrine: { min: 15, max: 100 },
      amethyst: { min: 25, max: 200 },
      rose_quartz: { min: 30, max: 180 },
      black_tourmaline: { min: 20, max: 150 },
      moonstone: { min: 40, max: 250 },
      emerald: { min: 200, max: 2000 },
      ruby: { min: 300, max: 5000 },
      sapphire: { min: 250, max: 3000 },
      diamond: { min: 1000, max: 50000 }
    };

    return values[gemType.toLowerCase()] || { min: 10, max: 100 };
  }

  /**
   * Get gem sources following elemental correspondences
   */
  private static getGemSources(gemType: string): string[] {
    const sources: Record<string, string[]> = {
      clear_quartz: ['mines', 'rivers', 'mountains'],
      citrine: ['sun_temples', 'golden_fields', 'merchant_chests'],
      amethyst: ['amethyst_caves', 'ancient_temples', 'royal_tombs'],
      rose_quartz: ['love_shrines', 'emotional_nexus', 'relationship_altars'],
      black_tourmaline: ['protection_shrines', 'shadow_realms', 'guardian_posts'],
      moonstone: ['moon_shrines', 'tidal_pools', 'dream_realms'],
      emerald: ['emerald_mines', 'ancient_forests', 'druid_groves'],
      ruby: ['ruby_mines', 'volcanic_craters', 'warrior_shrines'],
      sapphire: ['sapphire_mines', 'deep_caves', 'wisdom_temples'],
      diamond: ['diamond_mines', 'meteor_craters', 'ancient_vaults']
    };

    return sources[gemType.toLowerCase()] || ['general_sources'];
  }

  /**
   * Update gem tower with new gem type using sacred geometry transitions
   */
  static updateGemTower(towerMesh: THREE.Mesh, newGemType: string): void {
    const gemData = this.GEM_TOWER_DATA[newGemType.toLowerCase()];
    if (!gemData) {
      console.warn(`Unknown gem type for update: ${newGemType}`);
      return;
    }

    // Update material color with chakra correspondence
    if (towerMesh.material instanceof THREE.MeshPhysicalMaterial) {
      towerMesh.material.color.setHex(this.getGemColor(newGemType));
      towerMesh.material.ior = this.getGemIOR(newGemType);
      towerMesh.material.needsUpdate = true;
    }

    // Update geometry if needed for major structural changes
    if (this.requiresGeometryUpdate(newGemType)) {
      console.log(`Major structural change required for ${newGemType} tower`);
    }
  }

  /**
   * Check if gem type change requires geometry update using sacred proportion analysis
   */
  private static requiresGeometryUpdate(gemType: string): boolean {
    const structuralGems = ['diamond', 'emerald', 'ruby'];
    return structuralGems.includes(gemType.toLowerCase());
  }

  /**
   * Generate multiple gem towers for a gem city using fibonacci distribution
   */
  static generateGemCity(gemType: string, towerCount: number, radius: number): THREE.Group {
    const city = new THREE.Group();

    for (let i = 0; i < towerCount; i++) {
      // Use fibonacci spiral for tower placement
      const angle = (Math.PI * 2 * i) / towerCount;
      const fibonacciRadius = radius * (0.5 + Math.sin(i * 0.618) * 0.5); // Golden angle

      const config: GemTowerConfig = {
        gemType,
        baseForm: this.GEM_TOWER_DATA[gemType.toLowerCase()]?.baseForm || 'pyramid',
        height: 5 + Math.sin(i * 0.618) * 5, // Fibonacci-based height variation
        tiers: 3 + Math.floor(Math.sin(i * 0.382) * 3), // Golden ratio variation
        spires: 1 + Math.floor(Math.sin(i * 1.618) * 2), // Fibonacci spire count
        hasBridges: Math.sin(i * 0.618) > 0,
        hasFloatingCrystals: Math.sin(i * 1.0) > -0.3,
        energyPattern: this.GEM_TOWER_DATA[gemType.toLowerCase()]?.energyPattern || 'radial',
        scale: 0.5 + Math.sin(i * 2.618) * 0.3, // Golden ratio scaling
        position: {
          x: Math.cos(angle) * fibonacciRadius,
          y: 0,
          z: Math.sin(angle) * fibonacciRadius
        }
      };

      const tower = this.generateGemTower(config);
      const towerMesh = new THREE.Mesh(tower.geometry, tower.materials[0]);

      if (config.position) {
        towerMesh.position.set(config.position.x, config.position.y, config.position.z);
      }

      city.add(towerMesh);
    }

    return city;
  }
}

export default GemTowerEngine;
