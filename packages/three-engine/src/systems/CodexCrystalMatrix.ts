import { unifiedMysticalData } from '../../../data/unified-mystical-data';

/**
 * CodexCrystalMatrix - Connects Codex 144:99 nodes with crystal/gem systems
 * Creates the bridge between mystical correspondences and real gem properties
 */
export class CodexCrystalMatrix {
  private static nodeGemMappings: Map<number, string[]> = new Map();
  private static gemNodeMappings: Map<string, number[]> = new Map();
  private static crystalEnergyMatrix: Map<string, {
    frequency: number;
    chakra: string;
    element: string;
    planetaryRuler: string;
    tarotCards: string[];
  }> = new Map();

  /**
   * Initialize the codex-crystal matrix
   */
  static initializeMatrix(): void {
    this.buildNodeGemMappings();
    this.buildGemNodeMappings();
    this.buildCrystalEnergyMatrix();
  }

  /**
   * Build mappings from codex nodes to gem types
   */
  private static buildNodeGemMappings(): void {
    // Define which gems correspond to each codex node based on mystical properties
    const nodeMappings: Record<number, string[]> = {
      // Crown chakra nodes (7, 8, 9) - Clear stones, divine connection
      7: ['Clear Quartz', 'Diamond', 'Moonstone'],
      8: ['Clear Quartz', 'Diamond'],
      9: ['Clear Quartz', 'Diamond', 'Moonstone'],

      // Third Eye chakra nodes (6, 96, 99) - Purple stones, intuition
      6: ['Amethyst', 'Sapphire'],
      96: ['Amethyst', 'Sapphire', 'Moonstone'],
      99: ['Amethyst', 'Sapphire'],

      // Heart chakra nodes (3, 33, 63) - Green and pink stones, love
      3: ['Rose Quartz', 'Emerald'],
      33: ['Rose Quartz', 'Emerald', 'Moonstone'],
      63: ['Rose Quartz', 'Emerald'],

      // Solar Plexus chakra nodes (1, 11, 21) - Yellow stones, power
      1: ['Citrine', 'Diamond'],
      11: ['Citrine', 'Clear Quartz'],
      21: ['Citrine', 'Diamond'],

      // Sacral chakra nodes (2, 12, 22) - Orange stones, creativity
      2: ['Moonstone', 'Citrine'],
      12: ['Moonstone', 'Citrine'],
      22: ['Moonstone', 'Citrine'],

      // Root chakra nodes (4, 44, 74) - Red and black stones, grounding
      4: ['Ruby', 'Black Tourmaline'],
      44: ['Ruby', 'Black Tourmaline'],
      74: ['Ruby', 'Black Tourmaline'],

      // Fire element nodes - Red/orange stones
      5: ['Ruby', 'Citrine'],
      15: ['Ruby', 'Citrine'],
      25: ['Ruby', 'Citrine'],

      // Water element nodes - Blue/clear stones
      35: ['Sapphire', 'Moonstone', 'Clear Quartz'],
      45: ['Sapphire', 'Moonstone'],
      55: ['Sapphire', 'Moonstone'],

      // Air element nodes - Clear/purple stones
      65: ['Clear Quartz', 'Amethyst'],
      75: ['Clear Quartz', 'Amethyst'],
      85: ['Clear Quartz', 'Amethyst'],

      // Earth element nodes - Green/black stones
      95: ['Emerald', 'Black Tourmaline'],
      105: ['Emerald', 'Black Tourmaline'],
      115: ['Emerald', 'Black Tourmaline']
    };

    // Add default mappings for nodes without specific assignments
    for (let node = 1; node <= 144; node++) {
      if (!nodeMappings[node]) {
        // Base mapping on numerology and element
        const numerology = ((node - 1) % 9) + 1;
        const element = this.getNodeElement(node);

        switch (element) {
          case 'fire':
            nodeMappings[node] = ['Ruby', 'Citrine'];
            break;
          case 'water':
            nodeMappings[node] = ['Sapphire', 'Moonstone'];
            break;
          case 'air':
            nodeMappings[node] = ['Clear Quartz', 'Amethyst'];
            break;
          case 'earth':
            nodeMappings[node] = ['Emerald', 'Black Tourmaline'];
            break;
          default:
            nodeMappings[node] = ['Clear Quartz'];
        }
      }
    }

    this.nodeGemMappings = new Map(Object.entries(nodeMappings).map(([k, v]) => [parseInt(k), v]));
  }

  /**
   * Build reverse mappings from gems to nodes
   */
  private static buildGemNodeMappings(): void {
    this.nodeGemMappings.forEach((gems, node) => {
      gems.forEach(gem => {
        if (!this.gemNodeMappings.has(gem)) {
          this.gemNodeMappings.set(gem, []);
        }
        this.gemNodeMappings.get(gem)!.push(node);
      });
    });
  }

  /**
   * Build crystal energy matrix with mystical properties
   */
  private static buildCrystalEnergyMatrix(): void {
    const crystals = unifiedMysticalData.crystals.minerals;

    crystals.forEach(crystal => {
      this.crystalEnergyMatrix.set(crystal.name, {
        frequency: crystal.frequency,
        chakra: crystal.chakra,
        element: crystal.element,
        planetaryRuler: crystal.planetaryRuler,
        tarotCards: this.getTarotCardsForCrystal(crystal.name)
      });
    });
  }

  /**
   * Get element for a codex node
   */
  private static getNodeElement(node: number): string {
    // Simple element calculation based on node number
    const elementIndex = ((node - 1) % 4);
    const elements = ['fire', 'water', 'air', 'earth'];
    return elements[elementIndex];
  }

  /**
   * Get tarot cards associated with a crystal
   */
  private static getTarotCardsForCrystal(crystalName: string): string[] {
    const cards: string[] = [];

    // Map crystals to tarot cards based on properties
    unifiedMysticalData.tarot.majorArcana.forEach(card => {
      if (card.crystal && card.crystal.name === crystalName) {
        cards.push(card.name);
      }
    });

    return cards;
  }

  /**
   * Get gem types for a specific codex node
   */
  static getGemsForNode(nodeId: number): string[] {
    return this.nodeGemMappings.get(nodeId) || ['Clear Quartz'];
  }

  /**
   * Get codex nodes for a specific gem type
   */
  static getNodesForGem(gemType: string): number[] {
    return this.gemNodeMappings.get(gemType) || [];
  }

  /**
   * Get crystal energy properties
   */
  static getCrystalEnergyProperties(gemType: string): {
    frequency: number;
    chakra: string;
    element: string;
    planetaryRuler: string;
    tarotCards: string[];
  } | undefined {
    return this.crystalEnergyMatrix.get(gemType);
  }

  /**
   * Find optimal gem for a codex node based on energy requirements
   */
  static findOptimalGemForNode(nodeId: number, energyRequirement?: {
    frequency?: number;
    chakra?: string;
    element?: string;
  }): { gemType: string; compatibility: number; reason: string } {
    const availableGems = this.getGemsForNode(nodeId);

    let bestGem = availableGems[0];
    let bestCompatibility = 0;
    let bestReason = 'Default gem for this node';

    availableGems.forEach(gem => {
      const properties = this.getCrystalEnergyProperties(gem);
      if (!properties) return;

      let compatibility = 0;
      const reasons: string[] = [];

      // Check frequency compatibility
      if (energyRequirement?.frequency) {
        const freqDiff = Math.abs(properties.frequency - energyRequirement.frequency);
        if (freqDiff < 50) {
          compatibility += 3;
          reasons.push('frequency alignment');
        } else if (freqDiff < 100) {
          compatibility += 2;
          reasons.push('moderate frequency alignment');
        } else {
          compatibility += 1;
          reasons.push('loose frequency alignment');
        }
      }

      // Check chakra compatibility
      if (energyRequirement?.chakra && properties.chakra === energyRequirement.chakra) {
        compatibility += 2;
        reasons.push('chakra alignment');
      }

      // Check element compatibility
      if (energyRequirement?.element && properties.element === energyRequirement.element) {
        compatibility += 2;
        reasons.push('elemental alignment');
      }

      // Base compatibility for being in the node's gem list
      compatibility += 1;
      reasons.push('codex node correspondence');

      if (compatibility > bestCompatibility) {
        bestCompatibility = compatibility;
        bestGem = gem;
        bestReason = reasons.join(', ');
      }
    });

    return {
      gemType: bestGem,
      compatibility: bestCompatibility,
      reason: bestReason
    };
  }

  /**
   * Calculate gem compatibility between two gems for tower building
   */
  static calculateGemCompatibility(gem1: string, gem2: string): {
    compatibility: number;
    factors: string[];
    recommendation: 'excellent' | 'good' | 'fair' | 'poor';
  } {
    const props1 = this.getCrystalEnergyProperties(gem1);
    const props2 = this.getCrystalEnergyProperties(gem2);

    if (!props1 || !props2) {
      return {
        compatibility: 0,
        factors: ['Unknown gem properties'],
        recommendation: 'poor'
      };
    }

    let compatibility = 0;
    const factors: string[] = [];

    // Chakra compatibility
    if (props1.chakra === props2.chakra) {
      compatibility += 3;
      factors.push('shared chakra alignment');
    }

    // Element compatibility
    if (props1.element === props2.element) {
      compatibility += 2;
      factors.push('elemental harmony');
    }

    // Frequency compatibility (within 100 Hz)
    const freqDiff = Math.abs(props1.frequency - props2.frequency);
    if (freqDiff < 50) {
      compatibility += 3;
      factors.push('frequency resonance');
    } else if (freqDiff < 100) {
      compatibility += 2;
      factors.push('moderate frequency alignment');
    } else if (freqDiff < 200) {
      compatibility += 1;
      factors.push('loose frequency connection');
    }

    // Planetary ruler compatibility
    if (props1.planetaryRuler === props2.planetaryRuler) {
      compatibility += 1;
      factors.push('planetary alignment');
    }

    // Tarot card overlap
    const sharedCards = props1.tarotCards.filter(card => props2.tarotCards.includes(card));
    if (sharedCards.length > 0) {
      compatibility += sharedCards.length;
      factors.push('tarot correspondence');
    }

    let recommendation: 'excellent' | 'good' | 'fair' | 'poor';
    if (compatibility >= 8) recommendation = 'excellent';
    else if (compatibility >= 5) recommendation = 'good';
    else if (compatibility >= 3) recommendation = 'fair';
    else recommendation = 'poor';

    return {
      compatibility,
      factors,
      recommendation
    };
  }

  /**
   * Generate gem tower configuration for a codex node
   */
  static generateTowerConfigForNode(nodeId: number, primaryGem?: string): {
    nodeId: number;
    primaryGem: string;
    secondaryGems: string[];
    towerConfig: any;
    energyMatrix: any;
  } {
    const gems = this.getGemsForNode(nodeId);
    const primary = primaryGem || gems[0];
    const secondary = gems.filter(g => g !== primary);

    const primaryProps = this.getCrystalEnergyProperties(primary);
    if (!primaryProps) {
      throw new Error(`No properties found for gem: ${primary}`);
    }

    // Generate tower configuration based on gem properties
    const towerConfig = {
      baseForm: this.getTowerFormForGem(primary),
      height: this.getTowerHeightForGem(primary),
      tiers: this.getTowerTiersForGem(primary),
      spires: this.getTowerSpiresForGem(primary),
      hasBridges: this.getTowerBridgesForGem(primary),
      hasFloatingCrystals: true,
      energyPattern: primaryProps.element,
      scale: this.getTowerScaleForGem(primary)
    };

    const energyMatrix = {
      frequency: primaryProps.frequency,
      chakra: primaryProps.chakra,
      element: primaryProps.element,
      planetaryRuler: primaryProps.planetaryRuler,
      tarotCards: primaryProps.tarotCards,
      nodeId,
      connectedNodes: this.getNodesForGem(primary)
    };

    return {
      nodeId,
      primaryGem: primary,
      secondaryGems: secondary,
      towerConfig,
      energyMatrix
    };
  }

  /**
   * Get tower form based on gem type
   */
  private static getTowerFormForGem(gemType: string): string {
    const forms: Record<string, string> = {
      'Clear Quartz': 'pyramid',
      'Amethyst': 'step_pyramid',
      'Rose Quartz': 'heart_spire',
      'Emerald': 'emerald_city',
      'Ruby': 'crimson_citadel',
      'Sapphire': 'sapphire_spire',
      'Diamond': 'diamond_palace',
      'Citrine': 'sun_tower',
      'Black Tourmaline': 'obsidian_fortress',
      'Moonstone': 'lunar_spire'
    };

    return forms[gemType] || 'pyramid';
  }

  /**
   * Get tower height based on gem properties
   */
  private static getTowerHeightForGem(gemType: string): number {
    const props = this.getCrystalEnergyProperties(gemType);
    if (!props) return 5;

    // Height based on frequency intensity
    const baseHeight = 5;
    const frequencyMultiplier = props.frequency / 500; // Normalize around 528 Hz
    return Math.floor(baseHeight + frequencyMultiplier * 2);
  }

  /**
   * Get tower tiers based on chakra level
   */
  private static getTowerTiersForGem(gemType: string): number {
    const props = this.getCrystalEnergyProperties(gemType);
    if (!props) return 4;

    const chakraLevels: Record<string, number> = {
      'Root': 3,
      'Sacral': 4,
      'Solar Plexus': 5,
      'Heart': 6,
      'Throat': 5,
      'Third Eye': 7,
      'Crown': 8
    };

    return chakraLevels[props.chakra] || 4;
  }

  /**
   * Get spire count based on planetary ruler
   */
  private static getTowerSpiresForGem(gemType: string): number {
    const props = this.getCrystalEnergyProperties(gemType);
    if (!props) return 2;

    const planetarySpires: Record<string, number> = {
      'Sun': 3,
      'Moon': 2,
      'Mercury': 4,
      'Venus': 3,
      'Mars': 5,
      'Jupiter': 4,
      'Saturn': 2
    };

    return planetarySpires[props.planetaryRuler] || 2;
  }

  /**
   * Determine if tower should have bridges
   */
  private static getTowerBridgesForGem(gemType: string): boolean {
    const bridgeGems = ['Clear Quartz', 'Amethyst', 'Emerald', 'Ruby', 'Sapphire', 'Diamond'];
    return bridgeGems.includes(gemType);
  }

  /**
   * Get tower scale based on gem rarity
   */
  private static getTowerScaleForGem(gemType: string): number {
    const rarityScales: Record<string, number> = {
      'Common': 0.8,
      'Uncommon': 1.0,
      'Rare': 1.2,
      'Legendary': 1.5
    };

    // This would need to be implemented based on actual rarity data
    return rarityScales['Uncommon'] || 1.0;
  }

  /**
   * Get all gems in the matrix
   */
  static getAllGems(): string[] {
    return Array.from(this.crystalEnergyMatrix.keys());
  }

  /**
   * Get all nodes in the matrix
   */
  static getAllNodes(): number[] {
    return Array.from(this.nodeGemMappings.keys()).sort((a, b) => a - b);
  }

  /**
   * Export matrix data for debugging or analysis
   */
  static exportMatrixData(): {
    nodeGemMappings: Record<number, string[]>;
    gemNodeMappings: Record<string, number[]>;
    crystalEnergyMatrix: Record<string, any>;
  } {
    const nodeGemMappings: Record<number, string[]> = {};
    this.nodeGemMappings.forEach((gems, node) => {
      nodeGemMappings[node] = gems;
    });

    const gemNodeMappings: Record<string, number[]> = {};
    this.gemNodeMappings.forEach((nodes, gem) => {
      gemNodeMappings[gem] = nodes;
    });

    const crystalEnergyMatrix: Record<string, any> = {};
    this.crystalEnergyMatrix.forEach((props, gem) => {
      crystalEnergyMatrix[gem] = props;
    });

    return {
      nodeGemMappings,
      gemNodeMappings,
      crystalEnergyMatrix
    };
  }
}

export default CodexCrystalMatrix;
