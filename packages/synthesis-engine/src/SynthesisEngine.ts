import {
  FusionInput,
  FusionResult,
  SynthesizedElement,
  DomainElement,
  SynthesisEngineConfig,
  FusionEvent,
  FusionEventType,
  UserProgression,
  FusionRecipe,
  HarmonicRatio,
  GeometryType,
  Domain,
  Rarity,
  ThreeJsIntegration
} from './types/FusionTypes';

import { FusionKinkGenerator } from './generators/FusionKinkGenerator';
import { MysticalPatternEngine } from './patterns/MysticalPatternEngine';

/**
 * SynthesisEngine - Main orchestrator for the fusion game mechanics system
 *
 * This is the central engine that coordinates all fusion operations, manages
 * user progression, handles sacred geometry generation, and integrates with
 * Three.js for visual rendering.
 */
export class SynthesisEngine {
  private config: SynthesisEngineConfig;
  private fusionGenerator: FusionKinkGenerator;
  private patternEngine: MysticalPatternEngine;
  private eventListeners: Map<FusionEventType, Function[]>;
  private activeFusions: Map<string, FusionResult>;
  private threeJsIntegration?: ThreeJsIntegration;

  constructor(config: SynthesisEngineConfig) {
    this.config = config;
    this.fusionGenerator = new FusionKinkGenerator(config);
    this.patternEngine = new MysticalPatternEngine();
    this.eventListeners = new Map();
    this.activeFusions = new Map();

    this.initializeEventSystem();
    this.setupThreeJsIntegration();
  }

  /**
   * Initialize the event system for real-time updates
   */
  private initializeEventSystem(): void {
    Object.values(FusionEventType).forEach(eventType => {
      this.eventListeners.set(eventType, []);
    });
  }

  /**
   * Set up Three.js integration for visual rendering
   */
  private setupThreeJsIntegration(): void {
    try {
      // Dynamic import to avoid issues if Three.js is not available
      import('three').then(THREE => {
        this.threeJsIntegration = {
          geometries: new Map(),
          materials: new Map(),
          animations: new Map()
        };
        this.emitEvent(FusionEventType.FUSION_STARTED, {
          message: 'Three.js integration initialized'
        });
      }).catch(error => {
        console.warn('Three.js not available for integration:', error);
      });
    } catch (error) {
      console.warn('Three.js integration setup failed:', error);
    }
  }

  /**
   * Subscribe to fusion events
   */
  public on(eventType: FusionEventType, callback: Function): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.push(callback);
    this.eventListeners.set(eventType, listeners);
  }

  /**
   * Emit fusion events to all subscribers
   */
  private emitEvent(eventType: FusionEventType, payload: any): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.forEach(callback => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error in event listener for ${eventType}:`, error);
      }
    });
  }

  /**
   * Perform element fusion using the 144:99 harmonic ratio system
   */
  public async performFusion(input: FusionInput): Promise<FusionResult> {
    this.emitEvent(FusionEventType.FUSION_STARTED, { input });

    try {
      // Validate fusion input
      this.validateFusionInput(input);

      // Perform fusion using the kink generator
      const result = await this.fusionGenerator.performFusion(input);

      // Store result for tracking
      this.activeFusions.set(result.id, result);

      // Generate mystical patterns for visualization
      if (result.success && result.output) {
        await this.generateMysticalPatterns(result.output);
      }

      // Emit completion event
      this.emitEvent(FusionEventType.FUSION_COMPLETED, { result });

      return result;

    } catch (error) {
      const fusionError = {
        code: 'SYNTHESIS_ERROR',
        message: error instanceof Error ? error.message : 'Unknown synthesis error',
        timestamp: new Date(),
        recoverable: true
      };

      this.emitEvent(FusionEventType.FUSION_FAILED, { error: fusionError, input });

      throw fusionError;
    }
  }

  /**
   * Validate fusion input parameters
   */
  private validateFusionInput(input: FusionInput): void {
    if (!input.elements || input.elements.length < 2) {
      throw new Error('Fusion requires at least 2 elements');
    }

    if (input.elements.length > 5) {
      throw new Error('Fusion cannot combine more than 5 elements');
    }

    if (!input.userId) {
      throw new Error('User ID is required for fusion tracking');
    }

    if (!input.intention || input.intention.trim().length === 0) {
      throw new Error('Fusion intention is required');
    }
  }

  /**
   * Generate mystical patterns for a synthesized element
   */
  private async generateMysticalPatterns(element: SynthesizedElement): Promise<void> {
    try {
      // Generate fractal pattern based on primary geometry
      const fractalPattern = this.patternEngine.generateFractalPattern(
        element.primaryGeometry,
        5,
        element.energy / 100
      );

      // Generate mystical color palette
      const colorPalette = this.patternEngine.generateMysticalPalette(element.domains);

      // Generate sound pattern
      const soundPattern = this.patternEngine.generateMysticalSoundPattern(element);

      // Store patterns for Three.js rendering
      if (this.threeJsIntegration) {
        this.storePatternsForRendering(element.id, {
          fractal: fractalPattern,
          colors: colorPalette,
          sound: soundPattern
        });
      }

      this.emitEvent(FusionEventType.FUSION_PROGRESS, {
        elementId: element.id,
        patterns: { fractalPattern, colorPalette, soundPattern }
      });

    } catch (error) {
      console.error('Error generating mystical patterns:', error);
    }
  }

  /**
   * Store patterns for Three.js rendering
   */
  private storePatternsForRendering(
    elementId: string,
    patterns: {
      fractal: any;
      colors: any;
      sound: any;
    }
  ): void {
    if (!this.threeJsIntegration) return;

    this.threeJsIntegration.animations.set(elementId, {
      patterns,
      timestamp: Date.now()
    });
  }

  /**
   * Get available domain elements for fusion
   */
  public getAvailableElements(userProgression: UserProgression): DomainElement[] {
    // This would typically fetch from a database or configuration
    // For now, return a sample set of elements
    return this.generateSampleElements(userProgression);
  }

  /**
   * Generate sample domain elements for demonstration
   */
  private generateSampleElements(userProgression: UserProgression): DomainElement[] {
    const elements: DomainElement[] = [];

    // Art domain elements
    elements.push({
      id: 'art_paint_brush',
      domain: Domain.ART,
      name: 'Sacred Paintbrush',
      description: 'A brush infused with creative fire',
      sacredGeometry: {
        type: GeometryType.FLOWER_OF_LIFE,
        vertices: 12,
        harmonicRatio: { numerator: 144, denominator: 99, ratio: 144/99, fibonacciIndex: 12 },
        sacredNumber: 12,
        properties: {
          rotationalSymmetry: 6,
          reflectionSymmetry: true,
          selfSimilar: true,
          goldenRatio: true
        }
      },
      energy: 75,
      frequency: 432,
      unlocked: true,
      rarity: Rarity.COMMON,
      attributes: {
        creativity: 90,
        logic: 30,
        intuition: 60,
        harmony: 70,
        transformation: 50
      }
    });

    // Science domain elements
    elements.push({
      id: 'science_atom',
      domain: Domain.SCIENCE,
      name: 'Quantum Atom',
      description: 'The building block of reality',
      sacredGeometry: {
        type: GeometryType.METATRONS_CUBE,
        vertices: 13,
        harmonicRatio: { numerator: 144, denominator: 99, ratio: 144/99, fibonacciIndex: 12 },
        sacredNumber: 13,
        properties: {
          rotationalSymmetry: 4,
          reflectionSymmetry: true,
          selfSimilar: false,
          goldenRatio: false
        }
      },
      energy: 85,
      frequency: 528,
      unlocked: userProgression.level >= 3,
      rarity: Rarity.UNCOMMON,
      attributes: {
        creativity: 40,
        logic: 95,
        intuition: 45,
        harmony: 60,
        transformation: 70
      }
    });

    // Spirituality domain elements
    elements.push({
      id: 'spirit_lotus',
      domain: Domain.SPIRITUALITY,
      name: 'Enlightened Lotus',
      description: 'Flower of spiritual awakening',
      sacredGeometry: {
        type: GeometryType.TREE_OF_LIFE,
        vertices: 10,
        harmonicRatio: { numerator: 144, denominator: 99, ratio: 144/99, fibonacciIndex: 12 },
        sacredNumber: 10,
        properties: {
          rotationalSymmetry: 5,
          reflectionSymmetry: true,
          selfSimilar: true,
          goldenRatio: true
        }
      },
      energy: 90,
      frequency: 396,
      unlocked: userProgression.level >= 5,
      rarity: Rarity.RARE,
      attributes: {
        creativity: 55,
        logic: 35,
        intuition: 95,
        harmony: 85,
        transformation: 80
      }
    });

    return elements.filter(el => el.unlocked);
  }

  /**
   * Get fusion recipes available to the user
   */
  public getAvailableRecipes(userProgression: UserProgression): FusionRecipe[] {
    const recipes: FusionRecipe[] = [];

    // Basic art + science fusion
    recipes.push({
      id: 'recipe_basic_harmony',
      name: 'Harmonic Convergence',
      description: 'Combine art and science for basic harmony',
      requiredElements: [], // Will be populated with actual DomainElement objects
      result: {} as SynthesizedElement, // Would be generated
      difficulty: 3,
      successRate: 75,
      requiredLevel: 1,
      category: 'basic' as any
    });

    // Advanced spiritual fusion
    if (userProgression.level >= 5) {
      recipes.push({
        id: 'recipe_spiritual_ascension',
        name: 'Spiritual Ascension',
        description: 'Achieve higher consciousness through fusion',
        requiredElements: [], // Will be populated with actual DomainElement objects
        result: {} as SynthesizedElement,
        difficulty: 7,
        successRate: 45,
        requiredLevel: 5,
        category: 'advanced' as any
      });
    }

    return recipes.filter(recipe => userProgression.level >= recipe.requiredLevel);
  }

  /**
   * Execute fusion recipe
   */
  public async executeRecipe(
    recipe: FusionRecipe,
    userProgression: UserProgression
  ): Promise<FusionResult> {
    const elements = this.getAvailableElements(userProgression)
      .filter(el => recipe.requiredElements.some(reqEl => typeof reqEl === 'object' && reqEl.id === el.id));

    if (elements.length !== recipe.requiredElements.length) {
      throw new Error('Not all required elements are available');
    }

    const input: FusionInput = {
      elements,
      harmony: 80, // Base harmony for recipes
      intention: `Executing recipe: ${recipe.name}`,
      userId: userProgression.userId,
      timestamp: new Date()
    };

    return this.performFusion(input);
  }

  /**
   * Get Three.js integration instance
   */
  public getThreeJsIntegration(): ThreeJsIntegration | undefined {
    return this.threeJsIntegration;
  }

  /**
   * Render synthesized element in Three.js scene
   */
  public async renderElement(
    element: SynthesizedElement,
    scene?: any,
    position?: { x: number; y: number; z: number }
  ): Promise<void> {
    if (!this.threeJsIntegration || !scene) {
      console.warn('Three.js integration not available for rendering');
      return;
    }

    try {
      // Generate geometry based on sacred geometry type
      const geometry = await this.generateThreeJsGeometry(element.primaryGeometry);

      // Generate material based on visual properties
      const material = await this.generateThreeJsMaterial(element.visual);

      // Create mesh
      const THREE = await import('three');
      const mesh = new THREE.Mesh(geometry, material);

      if (position) {
        mesh.position.set(position.x, position.y, position.z);
      }

      scene.add(mesh);

      // Store for animation updates
      this.threeJsIntegration.geometries.set(element.id, geometry);
      this.threeJsIntegration.materials.set(element.id, material);

      this.emitEvent(FusionEventType.FUSION_PROGRESS, {
        elementId: element.id,
        threeJsObject: mesh
      });

    } catch (error) {
      console.error('Error rendering element in Three.js:', error);
    }
  }

  /**
   * Generate Three.js geometry from sacred geometry
   */
  private async generateThreeJsGeometry(sacredGeometry: any): Promise<any> {
    // This would integrate with the existing SacredGeometryRenderer
    // For now, return a basic geometry
    try {
      const THREE = await import('three');
      switch (sacredGeometry.type) {
        case GeometryType.MERKABA:
          return new THREE.TetrahedronGeometry(10);
        case GeometryType.FLOWER_OF_LIFE:
          return new THREE.CircleGeometry(10, 12);
        case GeometryType.METATRONS_CUBE:
          return new THREE.BoxGeometry(10, 10, 10);
        default:
          return new THREE.SphereGeometry(10);
      }
    } catch (error) {
      console.error('Error generating Three.js geometry:', error);
      const THREE = await import('three');
      return new THREE.SphereGeometry(10);
    }
  }

  /**
   * Generate Three.js material from visual properties
   */
  private async generateThreeJsMaterial(visual: any): Promise<any> {
    try {
      const THREE = await import('three');
      return new THREE.MeshPhongMaterial({
        color: visual.color,
        transparent: true,
        opacity: visual.intensity / 100,
        emissive: visual.color,
        emissiveIntensity: 0.3
      });
    } catch (error) {
      console.error('Error generating Three.js material:', error);
      const THREE = await import('three');
      return new THREE.MeshBasicMaterial({ color: 0xffffff });
    }
  }

  /**
   * Update user progression based on fusion results
   */
  public updateUserProgression(
    userProgression: UserProgression,
    fusionResult: FusionResult
  ): UserProgression {
    const updated = { ...userProgression };

    // Add experience
    updated.experience += fusionResult.experience;
    updated.experienceToNext = this.calculateExperienceToNext(updated.level);

    // Check for level up
    if (updated.experience >= this.calculateTotalExperienceForLevel(updated.level + 1)) {
      updated.level += 1;
      this.emitEvent(FusionEventType.LEVEL_UP, {
        userId: updated.userId,
        newLevel: updated.level
      });
    }

    // Track fusion statistics
    updated.completedFusions.push(fusionResult.id);
    if (fusionResult.success) {
      updated.statistics.successfulFusions += 1;
      updated.statistics.averageQuality =
        (updated.statistics.averageQuality * (updated.statistics.successfulFusions - 1) + fusionResult.quality) /
        updated.statistics.successfulFusions;
    }
    updated.statistics.totalFusions += 1;

    // Update highest rarity if needed
    if (fusionResult.success && fusionResult.output) {
      const resultRarity = fusionResult.output.rarity;
      if (this.rarityToNumber(resultRarity) > this.rarityToNumber(updated.statistics.highestRarity)) {
        updated.statistics.highestRarity = resultRarity;
      }
    }

    return updated;
  }

  /**
   * Calculate experience required for next level
   */
  private calculateExperienceToNext(currentLevel: number): number {
    return currentLevel * 1000; // Simple linear progression
  }

  /**
   * Calculate total experience required for a specific level
   */
  private calculateTotalExperienceForLevel(level: number): number {
    return (level * (level + 1) * 500); // Quadratic progression
  }

  /**
   * Convert rarity enum to numeric value for comparison
   */
  private rarityToNumber(rarity: Rarity): number {
    const rarityValues = {
      [Rarity.COMMON]: 1,
      [Rarity.UNCOMMON]: 2,
      [Rarity.RARE]: 3,
      [Rarity.EPIC]: 4,
      [Rarity.LEGENDARY]: 5,
      [Rarity.MYTHICAL]: 6
    };
    return rarityValues[rarity];
  }

  /**
   * Get active fusions for a user
   */
  public getActiveFusions(userId: string): FusionResult[] {
    return Array.from(this.activeFusions.values())
      .filter(result => result.input.userId === userId);
  }

  /**
   * Get fusion statistics for analytics
   */
  public getFusionStatistics(userId?: string): any {
    const allResults = Array.from(this.activeFusions.values());

    if (userId) {
      const userResults = allResults.filter(result => result.input.userId === userId);
      return this.calculateStatistics(userResults);
    }

    return this.calculateStatistics(allResults);
  }

  /**
   * Calculate fusion statistics
   */
  private calculateStatistics(results: FusionResult[]): any {
    const successful = results.filter(r => r.success);
    const total = results.length;

    return {
      totalFusions: total,
      successfulFusions: successful.length,
      successRate: total > 0 ? (successful.length / total) * 100 : 0,
      averageQuality: successful.length > 0 ?
        successful.reduce((sum, r) => sum + r.quality, 0) / successful.length : 0,
      highestRarity: successful.length > 0 ?
        successful.reduce((highest, r) =>
          this.rarityToNumber(r.output.rarity) > this.rarityToNumber(highest) ?
            r.output.rarity : highest,
          Rarity.COMMON
        ) : Rarity.COMMON
    };
  }

  /**
   * Clean up old fusion results to manage memory
   */
  public cleanupOldFusions(maxAge: number = 3600000): void { // 1 hour default
    const cutoffTime = Date.now() - maxAge;

    for (const [id, result] of this.activeFusions.entries()) {
      if (result.timestamp.getTime() < cutoffTime) {
        this.activeFusions.delete(id);
      }
    }
  }

  /**
   * Get engine configuration
   */
  public getConfig(): SynthesisEngineConfig {
    return { ...this.config };
  }

  /**
   * Update engine configuration
   */
  public updateConfig(newConfig: Partial<SynthesisEngineConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}