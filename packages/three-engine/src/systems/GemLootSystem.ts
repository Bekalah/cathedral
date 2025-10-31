import { GemLootTable } from './SacredGeometryEngine';

/**
 * GemLootSystem - Handles gem loot mechanics and integration with game systems
 */
export class GemLootSystem {
  private static lootTables: Map<string, GemLootTable> = new Map();
  private static dropHistory: Array<{ gemType: string; timestamp: number; source: string }> = [];

  /**
   * Initialize loot system with gem data
   */
  static initializeLootSystem(gemTypes: string[]): void {
    gemTypes.forEach(gemType => {
      const lootTable = this.generateLootTable(gemType);
      this.lootTables.set(gemType, lootTable);
    });
  }

  /**
   * Generate loot table for a gem type
   */
  private static generateLootTable(gemType: string): GemLootTable {
    const gemKey = gemType.toLowerCase().replace(/\s+/g, '_');

    const lootData: Record<string, any> = {
      clear_quartz: {
        rarity: 'Common',
        dropRate: 0.15,
        value: { min: 5, max: 50 },
        sources: ['mines', 'rivers', 'mountains']
      },
      amethyst: {
        rarity: 'Uncommon',
        dropRate: 0.08,
        value: { min: 25, max: 200 },
        sources: ['amethyst_caves', 'ancient_temples', 'royal_tombs']
      },
      rose_quartz: {
        rarity: 'Uncommon',
        dropRate: 0.06,
        value: { min: 30, max: 180 },
        sources: ['love_shrines', 'emotional_nexus', 'relationship_altars']
      },
      emerald: {
        rarity: 'Rare',
        dropRate: 0.03,
        value: { min: 200, max: 2000 },
        sources: ['emerald_mines', 'ancient_forests', 'druid_groves']
      },
      ruby: {
        rarity: 'Rare',
        dropRate: 0.025,
        value: { min: 300, max: 5000 },
        sources: ['ruby_mines', 'volcanic_craters', 'warrior_shrines']
      },
      sapphire: {
        rarity: 'Rare',
        dropRate: 0.035,
        value: { min: 250, max: 3000 },
        sources: ['sapphire_mines', 'deep_caves', 'wisdom_temples']
      },
      diamond: {
        rarity: 'Legendary',
        dropRate: 0.005,
        value: { min: 1000, max: 50000 },
        sources: ['diamond_mines', 'meteor_craters', 'ancient_vaults']
      },
      citrine: {
        rarity: 'Common',
        dropRate: 0.12,
        value: { min: 15, max: 100 },
        sources: ['sun_temples', 'golden_fields', 'merchant_chests']
      },
      black_tourmaline: {
        rarity: 'Uncommon',
        dropRate: 0.07,
        value: { min: 20, max: 150 },
        sources: ['protection_shrines', 'shadow_realms', 'guardian_posts']
      },
      moonstone: {
        rarity: 'Uncommon',
        dropRate: 0.06,
        value: { min: 40, max: 250 },
        sources: ['moon_shrines', 'tidal_pools', 'dream_realms']
      }
    };

    const data = lootData[gemKey];
    if (!data) {
      throw new Error(`No loot data found for gem type: ${gemType}`);
    }

    return {
      gemType,
      rarity: data.rarity,
      dropRate: data.dropRate,
      value: data.value,
      sources: data.sources
    };
  }

  /**
   * Attempt to generate loot from a source
   */
  static attemptLootGeneration(source: string, playerLuck?: number): { gemType: string; value: number; rarity: string } | null {
    const availableGems = Array.from(this.lootTables.values())
      .filter(table => table.sources.includes(source));

    if (availableGems.length === 0) {
      return null;
    }

    // Calculate total drop rate for this source
    const totalDropRate = availableGems.reduce((sum, gem) => sum + gem.dropRate, 0);

    // Apply player luck modifier
    const luckModifier = playerLuck ? (1 + playerLuck * 0.1) : 1.0;
    const roll = Math.random() * totalDropRate * luckModifier;

    let cumulativeRate = 0;
    for (const gem of availableGems) {
      cumulativeRate += gem.dropRate;
      if (roll <= cumulativeRate) {
        const value = Math.floor(Math.random() * (gem.value.max - gem.value.min + 1)) + gem.value.min;

        // Record drop in history
        this.dropHistory.push({
          gemType: gem.gemType,
          timestamp: Date.now(),
          source
        });

        return {
          gemType: gem.gemType,
          value,
          rarity: gem.rarity
        };
      }
    }

    return null;
  }

  /**
   * Get loot table for a specific gem
   */
  static getLootTable(gemType: string): GemLootTable | undefined {
    return this.lootTables.get(gemType);
  }

  /**
   * Get all available loot tables
   */
  static getAllLootTables(): GemLootTable[] {
    return Array.from(this.lootTables.values());
  }

  /**
   * Calculate drop statistics
   */
  static getDropStatistics(): {
    totalDrops: number;
    dropsByGem: Record<string, number>;
    dropsBySource: Record<string, number>;
    averageValue: number;
  } {
    const dropsByGem: Record<string, number> = {};
    const dropsBySource: Record<string, number> = {};
    let totalValue = 0;

    this.dropHistory.forEach(drop => {
      dropsByGem[drop.gemType] = (dropsByGem[drop.gemType] || 0) + 1;
      dropsBySource[drop.source] = (dropsBySource[drop.source] || 0) + 1;

      const lootTable = this.lootTables.get(drop.gemType);
      if (lootTable) {
        totalValue += Math.floor((lootTable.value.min + lootTable.value.max) / 2);
      }
    });

    return {
      totalDrops: this.dropHistory.length,
      dropsByGem,
      dropsBySource,
      averageValue: this.dropHistory.length > 0 ? totalValue / this.dropHistory.length : 0
    };
  }

  /**
   * Get gems available from a specific source
   */
  static getGemsFromSource(source: string): GemLootTable[] {
    return Array.from(this.lootTables.values())
      .filter(table => table.sources.includes(source));
  }

  /**
   * Get gems by rarity
   */
  static getGemsByRarity(rarity: string): GemLootTable[] {
    return Array.from(this.lootTables.values())
      .filter(table => table.rarity.toLowerCase() === rarity.toLowerCase());
  }

  /**
   * Calculate expected value for farming a source
   */
  static calculateExpectedValue(source: string, attempts: number = 100): {
    expectedGems: number;
    expectedValue: number;
    bestGem: string;
    worstGem: string;
  } {
    const availableGems = this.getGemsFromSource(source);

    if (availableGems.length === 0) {
      return {
        expectedGems: 0,
        expectedValue: 0,
        bestGem: '',
        worstGem: ''
      };
    }

    let expectedGems = 0;
    let expectedValue = 0;
    let bestValue = 0;
    let worstValue = Infinity;
    let bestGem = '';
    let worstGem = '';

    availableGems.forEach(gem => {
      const gemDrops = gem.dropRate * attempts;
      const gemValue = (gem.value.min + gem.value.max) / 2;

      expectedGems += gemDrops;
      expectedValue += gemDrops * gemValue;

      if (gemValue > bestValue) {
        bestValue = gemValue;
        bestGem = gem.gemType;
      }

      if (gemValue < worstValue) {
        worstValue = gemValue;
        worstGem = gem.gemType;
      }
    });

    return {
      expectedGems,
      expectedValue,
      bestGem,
      worstGem
    };
  }

  /**
   * Generate loot recommendation for player
   */
  static generateLootRecommendation(playerLevel: number, preferredRarity?: string): {
    recommendedSource: string;
    expectedGems: string[];
    timeEstimate: string;
    valueEstimate: number;
  } {
    const sources = [
      'mines', 'amethyst_caves', 'emerald_mines', 'ruby_mines', 'sapphire_mines',
      'diamond_mines', 'sun_temples', 'moon_shrines', 'ancient_temples',
      'protection_shrines', 'love_shrines', 'wisdom_temples'
    ];

    let bestSource = '';
    let bestValue = 0;
    let bestGems: string[] = [];

    sources.forEach(source => {
      const analysis = this.calculateExpectedValue(source, 100);

      if (analysis.expectedValue > bestValue) {
        bestValue = analysis.expectedValue;
        bestSource = source;
        bestGems = this.getGemsFromSource(source).map(gem => gem.gemType);
      }
    });

    // Adjust for player level
    const levelMultiplier = 1 + (playerLevel * 0.1);
    const timeEstimate = `${Math.floor(100 / levelMultiplier)} minutes`;

    return {
      recommendedSource: bestSource,
      expectedGems: bestGems,
      timeEstimate,
      valueEstimate: Math.floor(bestValue * levelMultiplier)
    };
  }

  /**
   * Clear drop history (for testing or reset)
   */
  static clearHistory(): void {
    this.dropHistory = [];
  }

  /**
   * Export loot data for save game
   */
  static exportLootData(): {
    lootTables: Record<string, GemLootTable>;
    dropHistory: Array<{ gemType: string; timestamp: number; source: string }>;
    statistics: ReturnType<typeof this.getDropStatistics>;
  } {
    const lootTables: Record<string, GemLootTable> = {};
    this.lootTables.forEach((table, gemType) => {
      lootTables[gemType] = table;
    });

    return {
      lootTables,
      dropHistory: this.dropHistory,
      statistics: this.getDropStatistics()
    };
  }

  /**
   * Import loot data from save game
   */
  static importLootData(data: {
    lootTables: Record<string, GemLootTable>;
    dropHistory: Array<{ gemType: string; timestamp: number; source: string }>;
  }): void {
    this.lootTables.clear();
    Object.entries(data.lootTables).forEach(([gemType, table]) => {
      this.lootTables.set(gemType, table);
    });
    this.dropHistory = data.dropHistory;
  }
}

export default GemLootSystem;
