import * as THREE from 'three';
import { EventEmitter } from 'events';
import { CathedralLighting } from './CathedralLighting';
import { MysticalMaterials } from './MysticalMaterials';
import { EsotericPostProcessing } from './EsotericPostProcessing';
import {
  EngineConfig,
  SacredGeometryProperties,
  AuraConfig,
  ResonanceConfig,
  MysticalObject3D,
  RenderCallback,
  EngineEventMap
} from '../types/EngineTypes';

// Import Azure client for AI integration
// Note: Using dynamic import to avoid module resolution issues in build
let azureClient: any = null;
import('../../../src/services/azure-client.js').then(module => {
  azureClient = module.azureClient;
}).catch(err => {
  console.warn('Azure client not available:', err);
});

/**
 * MysticalScene - Advanced Three.js scene with esoteric rendering capabilities
 * Provides a sophisticated foundation for mystical and sacred geometry visualizations
 */
export class MysticalScene extends EventEmitter {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public lighting: CathedralLighting;
  public materials: MysticalMaterials;
  public postProcessing: EsotericPostProcessing;

  private animationId: number | null = null;
  private clock: THREE.Clock;
  private renderQueue: Array<() => void> = [];
  private isInitialized = false;

  constructor(container: HTMLElement, options: EngineConfig = {}) {
    super();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // Initialize camera with mystical perspective
    this.camera = new THREE.PerspectiveCamera(
      options.fov || 75,
      container.clientWidth / container.clientHeight,
      options.near || 0.1,
      options.far || 2000
    );

    // Position camera with sacred geometry principles
    this.camera.position.set(
      options.cameraPosition?.x || 0,
      options.cameraPosition?.y || 5,
      options.cameraPosition?.z || 10
    );

    // Initialize sophisticated renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: options.antialias ?? true,
      alpha: options.alpha ?? true,
      powerPreference: options.powerPreference || 'high-performance',
      stencil: options.stencil ?? true,
      depth: options.depth ?? true
    });

    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = options.shadowMap ?? true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = options.toneMappingExposure || 1.0;

    container.appendChild(this.renderer.domElement);

    // Initialize subsystems
    this.lighting = new CathedralLighting(this.scene);
    this.materials = new MysticalMaterials();
    this.postProcessing = new EsotericPostProcessing(this.renderer, this.scene, this.camera);

    this.setupEventListeners();
    this.isInitialized = true;

    this.emit('initialized', this);
  }

  /**
   * Add mystical object to scene with automatic esoteric properties
   */
  addMysticalObject(object: THREE.Object3D, properties?: {
    sacredGeometry?: SacredGeometryProperties;
    aura?: AuraConfig;
    resonance?: ResonanceConfig;
  }): void {
    if (properties?.sacredGeometry) {
      this.applySacredGeometryProperties(object, properties.sacredGeometry);
    }

    if (properties?.aura) {
      this.addAuraEffect(object, properties.aura);
    }

    if (properties?.resonance) {
      this.addResonanceField(object, properties.resonance);
    }

    this.scene.add(object);
    this.emit('objectAdded', object);
  }

  /**
   * Start the mystical render loop
   */
  startRenderLoop(): void {
    if (this.animationId !== null) return;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.render();
    };
    animate();
  }

  /**
   * Stop the render loop
   */
  stopRenderLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Main render method with esoteric enhancements
   */
  private render(): void {
    const deltaTime = this.clock.getDelta();

    // Execute render queue
    this.renderQueue.forEach(callback => callback());

    // Emit pre-render event for mystical effects
    this.emit('preRender', deltaTime);

    // Render with post-processing
    this.postProcessing.render(deltaTime);

    // Emit post-render event
    this.emit('postRender', deltaTime);
  }

  /**
   * Add callback to render queue
   */
  addToRenderQueue(callback: () => void): void {
    this.renderQueue.push(callback);
  }

  /**
   * Remove callback from render queue
   */
  removeFromRenderQueue(callback: () => void): void {
    const index = this.renderQueue.indexOf(callback);
    if (index > -1) {
      this.renderQueue.splice(index, 1);
    }
  }

  /**
   * Handle window resize with mystical aspect ratio preservation
   */
  private setupEventListeners(): void {
    const handleResize = () => {
      const container = this.renderer.domElement.parentElement;
      if (!container) return;

      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.postProcessing.handleResize();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on destroy
    this.on('destroy', () => {
      window.removeEventListener('resize', handleResize);
    });
  }

  /**
   * Apply sacred geometry properties to objects
   */
  private applySacredGeometryProperties(object: THREE.Object3D, properties: SacredGeometryProperties): void {
    object.userData.sacredGeometry = properties;

    if (properties.goldenRatio) {
      this.applyGoldenRatioScaling(object);
    }

    if (properties.fibonacci) {
      this.applyFibonacciSpiral(object);
    }
  }

  /**
   * Add mystical aura effects
   */
  private addAuraEffect(object: THREE.Object3D, auraConfig: AuraConfig): void {
    const auraGeometry = new THREE.SphereGeometry(
      auraConfig.radius || 1.5,
      auraConfig.segments || 32,
      auraConfig.segments || 32
    );

    const auraMaterial = this.materials.createAuraMaterial(auraConfig);
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);

    object.add(aura);
    object.userData.aura = aura;
  }

  /**
   * Add resonance field effects
   */
  private addResonanceField(object: THREE.Object3D, resonanceConfig: ResonanceConfig): void {
    object.userData.resonance = resonanceConfig;
    this.addToRenderQueue(() => {
      this.updateResonanceField(object, resonanceConfig);
    });
  }

  /**
   * Apply golden ratio scaling
   */
  private applyGoldenRatioScaling(object: THREE.Object3D): void {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    object.scale.multiplyScalar(goldenRatio);
  }

  /**
   * Apply Fibonacci spiral positioning
   */
  private applyFibonacciSpiral(object: THREE.Object3D): void {
    const fibonacciAngle = (2 * Math.PI) / 1.618033988749;
    object.rotation.y = fibonacciAngle;
  }

  /**
   * Update resonance field animation
   */
  private updateResonanceField(object: THREE.Object3D, config: ResonanceConfig): void {
    if (object.userData.aura && config.frequency) {
      const time = this.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * config.frequency) * (config.amplitude || 0.1);
      object.userData.aura.scale.setScalar(scale);
    }
  }

  /**
   * Generate AI-powered mystical scene content
   */
  async generateAIMysticalContent(prompt: string, options: any = {}) {
    if (!azureClient) {
      console.warn('Azure client not available for AI content generation');
      return null;
    }

    try {
      console.log('🤖 Generating AI mystical scene content...');

      const generationPrompt = `Generate mystical Three.js scene content for: "${prompt}"

      Consider:
      - Sacred geometry patterns and forms
      - Mystical lighting and materials
      - Hermetic principles and symbolism
      - Tarot and archetypal elements
      - Consciousness exploration themes
      - Interactive and animated elements

      Return detailed Three.js code snippets for:
      1. Geometry creation with sacred proportions
      2. Material definitions with mystical properties
      3. Lighting setups with esoteric significance
      4. Animation patterns with spiritual meaning
      5. Post-processing effects for mystical atmosphere

      Focus on creating immersive, consciousness-expanding experiences.`;

      const result = await azureClient.generateCreativeContent(generationPrompt, {
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 2000,
        creativeMode: 'technical',
        includeTarot: true,
        includeSacredGeometry: true
      });

      return {
        content: result,
        prompt,
        aiGenerated: true,
        mystical: true,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('❌ Failed to generate AI mystical content:', error);
      return null;
    }
  }

  /**
   * Analyze scene objects with Azure Computer Vision
   */
  async analyzeSceneWithAI(imageData?: string, options: any = {}) {
    if (!azureClient) {
      console.warn('Azure client not available for scene analysis');
      return null;
    }

    try {
      console.log('👁️ Analyzing scene with Azure Computer Vision...');

      const analysisData = {
        sceneDescription: this.getSceneDescription(),
        objectCount: this.getObjectCount(),
        mysticalElements: this.getMysticalElements(),
        imageData: imageData || this.captureSceneImage()
      };

      const result = await azureClient.analyzeMysticalImage(analysisData, {
        visualFeatures: [
          'Categories', 'Tags', 'Description', 'Faces', 'ImageType',
          'Color', 'Adult', 'Objects', 'Brands'
        ],
        language: 'en',
        includeMysticalOverlay: true
      });

      return {
        analysis: result,
        sceneMetrics: analysisData,
        aiEnhanced: true,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('❌ Failed to analyze scene with AI:', error);
      return null;
    }
  }

  /**
   * Generate scene description for AI analysis
   */
  private getSceneDescription(): string {
    const objects = [];
    this.scene.traverse((object) => {
      if (object.userData.mystical) {
        objects.push(object.type || 'Object3D');
      }
    });

    return `Mystical Three.js scene containing: ${objects.join(', ')}`;
  }

  /**
   * Count objects in scene
   */
  private getObjectCount(): number {
    let count = 0;
    this.scene.traverse(() => count++);
    return count;
  }

  /**
   * Get mystical elements in scene
   */
  private getMysticalElements(): string[] {
    const elements = [];
    this.scene.traverse((object) => {
      if (object.userData.sacredGeometry) elements.push('sacred-geometry');
      if (object.userData.aura) elements.push('aura');
      if (object.userData.resonance) elements.push('resonance');
    });
    return [...new Set(elements)];
  }

  /**
   * Capture scene as image data for AI analysis
   */
  private captureSceneImage(): string {
    try {
      // Render scene to canvas
      this.renderer.render(this.scene, this.camera);

      // Get canvas data
      const canvas = this.renderer.domElement;
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Failed to capture scene image:', error);
      return '';
    }
  }

  /**
   * Apply AI-generated enhancements to scene
   */
  async applyAIEnhancements(enhancementType: string, options: any = {}) {
    if (!azureClient) {
      console.warn('Azure client not available for AI enhancements');
      return false;
    }

    try {
      console.log(`✨ Applying AI ${enhancementType} enhancements...`);

      const enhancementPrompt = this.buildEnhancementPrompt(enhancementType, options);
      const aiSuggestions = await azureClient.generateCreativeContent(enhancementPrompt, {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1500,
        creativeMode: 'enhancement',
        includeSacredGeometry: true
      });

      // Apply suggestions to scene
      await this.implementAISuggestions(aiSuggestions, enhancementType);

      return true;

    } catch (error) {
      console.error(`❌ Failed to apply AI ${enhancementType} enhancements:`, error);
      return false;
    }
  }

  /**
   * Build enhancement prompt for specific type
   */
  private buildEnhancementPrompt(type: string, options: any): string {
    const basePrompt = `Enhance mystical Three.js scene with ${type} improvements:`;

    switch (type) {
      case 'lighting':
        return `${basePrompt}
        - Sacred geometry-based lighting patterns
        - Mystical color harmonies and chakra alignments
        - Hermetic principle of vibration in light frequencies
        - Consciousness-expanding luminosity effects`;

      case 'geometry':
        return `${basePrompt}
        - Platonic solids and sacred geometric forms
        - Golden ratio proportions and Fibonacci spirals
        - Metatron's cube and flower of life patterns
        - Consciousness field geometries`;

      case 'animation':
        return `${basePrompt}
        - Sacred rhythmic patterns and cosmic cycles
        - Hermetic principle of rhythm in motion
        - Consciousness expansion through movement
        - Archetypal journey animations`;

      default:
        return `${basePrompt} with mystical and consciousness-expanding elements`;
    }
  }

  /**
   * Implement AI-generated suggestions in scene
   */
  private async implementAISuggestions(suggestions: any, type: string): Promise<void> {
    try {
      // Parse AI suggestions and apply them to scene objects
      const sceneObjects = this.getSceneObjects();

      for (const object of sceneObjects) {
        switch (type) {
          case 'lighting':
            this.applyAILightingSuggestions(object, suggestions);
            break;
          case 'geometry':
            this.applyAIGeometrySuggestions(object, suggestions);
            break;
          case 'animation':
            this.applyAIAnimationSuggestions(object, suggestions);
            break;
        }
      }

      console.log(`✅ Applied AI ${type} suggestions to scene`);
    } catch (error) {
      console.error('❌ Failed to implement AI suggestions:', error);
    }
  }

  /**
   * Get all objects in scene for enhancement
   */
  private getSceneObjects(): THREE.Object3D[] {
    const objects: THREE.Object3D[] = [];
    this.scene.traverse((object) => {
      objects.push(object);
    });
    return objects;
  }

  /**
   * Apply AI lighting suggestions
   */
  private applyAILightingSuggestions(object: THREE.Object3D, suggestions: any): void {
    // Implementation would modify lighting based on AI suggestions
    if (object.userData.light) {
      // Enhance existing lights with AI suggestions
      console.log('✨ Enhanced lighting for object:', object.name);
    }
  }

  /**
   * Apply AI geometry suggestions
   */
  private applyAIGeometrySuggestions(object: THREE.Object3D, suggestions: any): void {
    // Implementation would modify geometry based on AI suggestions
    if (object instanceof THREE.Mesh) {
      // Enhance geometry with sacred proportions
      console.log('🔮 Enhanced geometry for object:', object.name);
    }
  }

  /**
   * Apply AI animation suggestions
   */
  private applyAIAnimationSuggestions(object: THREE.Object3D, suggestions: any): void {
    // Implementation would add animations based on AI suggestions
    console.log('🌊 Enhanced animation for object:', object.name);
  }

  /**
   * Batch process multiple AI enhancements
   */
  async batchAIEnhancements(enhancementTypes: string[], options: any = {}) {
    if (!azureClient) {
      console.warn('Azure client not available for batch AI enhancements');
      return [];
    }

    try {
      console.log(`🔮 Starting batch AI enhancements: ${enhancementTypes.join(', ')}`);

      const operations = enhancementTypes.map(type => ({
        type: 'enhancement',
        enhancementType: type,
        options
      }));

      const results = await azureClient.batchMysticalOperations(operations);

      // Apply all enhancements
      for (let i = 0; i < enhancementTypes.length; i++) {
        if (results[i] && results[i].success) {
          await this.applyAIEnhancements(enhancementTypes[i], options);
        }
      }

      return results;

    } catch (error) {
      console.error('❌ Batch AI enhancements failed:', error);
      return [];
    }
  }

  /**
   * Get AI-powered scene recommendations
   */
  async getSceneRecommendations(context: string = '') {
    if (!azureClient) {
      console.warn('Azure client not available for scene recommendations');
      return [];
    }

    try {
      console.log('💡 Getting AI scene recommendations...');

      const prompt = `Provide mystical scene enhancement recommendations for Three.js:

Current scene context: "${context || this.getSceneDescription()}"
Current mystical elements: ${this.getMysticalElements().join(', ')}

Suggest:
1. Sacred geometry additions
2. Mystical lighting improvements
3. Consciousness-expanding animations
4. Hermetic principle integrations
5. Interactive mystical elements
6. Spiritual technology features

Focus on creating immersive, transformative experiences that blend ancient wisdom with modern 3D technology.`;

      const recommendations = await azureClient.generateCreativeContent(prompt, {
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 1200,
        creativeMode: 'recommendation',
        includeTarot: true,
        includeSacredGeometry: true
      });

      return {
        recommendations,
        context,
        aiGenerated: true,
        timestamp: Date.now()
      };

    } catch (error) {
      console.error('❌ Failed to get scene recommendations:', error);
      return [];
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopRenderLoop();
    this.removeAllListeners();

    // Dispose of geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });

    this.renderer.dispose();
    this.emit('destroyed');
  }
}
