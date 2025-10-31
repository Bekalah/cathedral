/**
 * @cathedral/cathedral-engine
 * Unified Cathedral Engine - Main orchestrator for all cathedral systems
 *
 * This engine coordinates the synthesis, learning, safety, and three.js engines
 * into a cohesive, safe, and engaging learning experience.
 */

import {
  SafetyFramework,
  initializeSafetyFramework,
  createSafetySession,
  validateContent,
  processUserInteraction,
  endSafetySession,
  getSessionSafetyStatus,
  type SafetySession,
  type UserSafetyProfile,
  type ContentAnalysis,
  type SafetyAction,
  type SessionStatus,
  type UserRiskLevel
} from '@cathedral/safety-framework';

import {
  SynthesisEngine,
  createSynthesisEngine,
  defaultSynthesisConfig,
  type SynthesisEngineConfig
} from '@cathedral/synthesis-engine';

import {
  MysticalScene,
  SacredGeometryRenderer,
  CathedralLighting,
  MysticalMaterials,
  EsotericPostProcessing,
  ParticleSystem,
  FractalGenerator,
  HolographicDisplay,
  SacredGeometryEngine,
  VERSION as THREE_ENGINE_VERSION,
  ENGINE_NAME as THREE_ENGINE_NAME
} from '@cathedral/three-engine';

// Import learning engine when available
// import { LearningEngine } from '@cathedral/learning-engine';

// Event system types
export interface CathedralEvent {
  type: string;
  payload: any;
  timestamp: number;
  source: string;
  sessionId?: string;
}

export interface EngineState {
  synthesis: {
    isActive: boolean;
    currentFusions: number;
    totalFusions: number;
    lastActivity: number;
  };
  learning: {
    isActive: boolean;
    currentLessons: number;
    completedLessons: number;
    progress: number;
  };
  threeJs: {
    isActive: boolean;
    currentScene: string | null;
    renderQuality: 'low' | 'medium' | 'high' | 'ultra';
    frameRate: number;
  };
  safety: {
    sessionId: string | null;
    status: SessionStatus | null;
    riskLevel: UserRiskLevel | null;
    activeViolations: number;
    lastCheck: number;
  };
}

export interface UnifiedCathedralConfig {
  synthesis?: Partial<SynthesisEngineConfig>;
  enableThreeJs?: boolean;
  enableLearning?: boolean;
  enableSafety?: boolean;
  maxConcurrentOperations?: number;
  defaultRenderQuality?: 'low' | 'medium' | 'high' | 'ultra';
  enableEventLogging?: boolean;
  autoSaveInterval?: number;
}

export class UnifiedCathedralEngine {
  private static instance: UnifiedCathedralEngine | null = null;
  private isInitialized = false;
  private config: Required<UnifiedCathedralConfig>;
  private eventListeners: Map<string, Array<(event: CathedralEvent) => void>> = new Map();
  private engineState: EngineState;
  private autoSaveTimer: NodeJS.Timeout | null = null;

  // Engine instances
  private synthesisEngine: SynthesisEngine | null = null;
  private safetySession: SafetySession | null = null;
  private threeJsScene: MysticalScene | null = null;
  private particleSystem: ParticleSystem | null = null;
  private fractalGenerator: FractalGenerator | null = null;

  // Learning engine (to be integrated when available)
  // private learningEngine: LearningEngine | null = null;

  private constructor(config: UnifiedCathedralConfig = {}) {
    this.config = {
      synthesis: {},
      enableThreeJs: true,
      enableLearning: true,
      enableSafety: true,
      maxConcurrentOperations: 5,
      defaultRenderQuality: 'high',
      enableEventLogging: true,
      autoSaveInterval: 30000, // 30 seconds
      ...config
    };

    this.engineState = {
      synthesis: {
        isActive: false,
        currentFusions: 0,
        totalFusions: 0,
        lastActivity: Date.now(),
      },
      learning: {
        isActive: false,
        currentLessons: 0,
        completedLessons: 0,
        progress: 0,
      },
      threeJs: {
        isActive: false,
        currentScene: null,
        renderQuality: this.config.defaultRenderQuality,
        frameRate: 0,
      },
      safety: {
        sessionId: null,
        status: null,
        riskLevel: null,
        activeViolations: 0,
        lastCheck: Date.now(),
      },
    };
  }

  /**
   * Get singleton instance of the Unified Cathedral Engine
   */
  public static getInstance(config?: UnifiedCathedralConfig): UnifiedCathedralEngine {
    if (!UnifiedCathedralEngine.instance) {
      UnifiedCathedralEngine.instance = new UnifiedCathedralEngine(config);
    }
    return UnifiedCathedralEngine.instance;
  }

  /**
   * Initialize all engines and systems
   */
  public async initialize(userProfile?: UserSafetyProfile): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      this.emitEvent('engine:initializing', { phase: 'start' });

      // Initialize safety framework first (critical for all operations)
      if (this.config.enableSafety) {
        const safetyInitialized = await initializeSafetyFramework();
        if (!safetyInitialized) {
          throw new Error('Failed to initialize safety framework');
        }

        // Create safety session for user
        if (userProfile) {
          this.safetySession = await createSafetySession('default-user', userProfile);
          if (this.safetySession) {
            this.engineState.safety.sessionId = this.safetySession.sessionId;
            this.updateSafetyStatus();
          }
        }

        this.emitEvent('safety:initialized', { sessionId: this.safetySession?.sessionId });
      }

      // Initialize synthesis engine
      const synthesisConfig = { ...defaultSynthesisConfig, ...this.config.synthesis };
      this.synthesisEngine = createSynthesisEngine(synthesisConfig);
      this.engineState.synthesis.isActive = true;
      this.emitEvent('synthesis:initialized', { config: synthesisConfig });

      // Initialize Three.js systems
      if (this.config.enableThreeJs) {
        await this.initializeThreeJsSystems();
        this.emitEvent('threejs:initialized', { renderQuality: this.config.defaultRenderQuality });
      }

      // Initialize learning engine when available
      if (this.config.enableLearning) {
        // this.learningEngine = new LearningEngine();
        // await this.learningEngine.initialize();
        this.engineState.learning.isActive = true;
        this.emitEvent('learning:initialized', {});
      }

      // Set up auto-save if enabled
      if (this.config.autoSaveInterval > 0) {
        this.setupAutoSave();
      }

      this.isInitialized = true;
      this.emitEvent('engine:ready', { timestamp: Date.now() });

      return true;
    } catch (error) {
      this.emitEvent('engine:error', { error: error.message, phase: 'initialization' });
      console.error('Failed to initialize Unified Cathedral Engine:', error);
      return false;
    }
  }

  /**
   * Initialize Three.js systems
   */
  private async initializeThreeJsSystems(): Promise<void> {
    // Create main mystical scene
    this.threeJsScene = new MysticalScene({
      enablePostProcessing: true,
      enableShadows: true,
      quality: this.config.defaultRenderQuality,
    });

    // Initialize particle system for mystical effects
    this.particleSystem = new ParticleSystem({
      maxParticles: 10000,
      enablePhysics: true,
    });

    // Initialize fractal generator for sacred geometry
    this.fractalGenerator = new FractalGenerator({
      maxIterations: 8,
      enableAnimation: true,
    });

    this.engineState.threeJs.isActive = true;
    this.engineState.threeJs.currentScene = 'mystical-scene';
  }

  /**
   * Set up auto-save functionality
   */
  private setupAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }

    this.autoSaveTimer = setInterval(() => {
      this.saveEngineState();
    }, this.config.autoSaveInterval);
  }

  /**
   * Save current engine state
   */
  private saveEngineState(): void {
    try {
      const stateToSave = {
        timestamp: Date.now(),
        state: this.engineState,
        config: this.config,
      };

      localStorage.setItem('cathedral-engine-state', JSON.stringify(stateToSave));
      this.emitEvent('state:saved', { timestamp: Date.now() });
    } catch (error) {
      console.warn('Failed to save engine state:', error);
    }
  }

  /**
   * Load saved engine state
   */
  public loadEngineState(): boolean {
    try {
      const savedState = localStorage.getItem('cathedral-engine-state');
      if (savedState) {
        const { state, timestamp } = JSON.parse(savedState);

        // Only load if state is recent (within last hour)
        if (Date.now() - timestamp < 3600000) {
          this.engineState = { ...this.engineState, ...state };
          this.emitEvent('state:loaded', { timestamp });
          return true;
        }
      }
    } catch (error) {
      console.warn('Failed to load engine state:', error);
    }
    return false;
  }

  /**
   * Update safety status from current session
   */
  private updateSafetyStatus(): void {
    if (this.safetySession) {
      const status = getSessionSafetyStatus(this.safetySession.sessionId);
      if (status) {
        this.engineState.safety.status = status.status;
        this.engineState.safety.riskLevel = status.riskLevel;
        this.engineState.safety.activeViolations = status.activeViolations;
        this.engineState.safety.lastCheck = Date.now();
      }
    }
  }

  /**
   * Event system for inter-engine communication
   */
  public emitEvent(type: string, payload: any, source?: string): void {
    if (!this.config.enableEventLogging && type.startsWith('debug:')) {
      return;
    }

    const event: CathedralEvent = {
      type,
      payload,
      timestamp: Date.now(),
      source: source || 'unified-engine',
    };

    // Notify listeners
    const listeners = this.eventListeners.get(type) || [];
    listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error(`Error in event listener for ${type}:`, error);
      }
    });

    // Also emit to wildcard listeners
    const wildcardListeners = this.eventListeners.get('*') || [];
    wildcardListeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error(`Error in wildcard event listener:`, error);
      }
    });

    // Log significant events
    if (this.config.enableEventLogging) {
      console.log(`[CathedralEngine:${type}]`, payload);
    }
  }

  /**
   * Subscribe to engine events
   */
  public on(eventType: string, listener: (event: CathedralEvent) => void): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(listener);
  }

  /**
   * Unsubscribe from engine events
   */
  public off(eventType: string, listener: (event: CathedralEvent) => void): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * Get current engine state
   */
  public getEngineState(): Readonly<EngineState> {
    return { ...this.engineState };
  }

  /**
   * Get synthesis engine instance
   */
  public getSynthesisEngine(): SynthesisEngine | null {
    return this.synthesisEngine;
  }

  /**
   * Get safety session
   */
  public getSafetySession(): SafetySession | null {
    return this.safetySession;
  }

  /**
   * Get Three.js scene
   */
  public getThreeJsScene(): MysticalScene | null {
    return this.threeJsScene;
  }

  /**
   * Process user interaction through safety framework
   */
  public async processUserInteraction(
    interaction: string,
    interactionType: 'feedback' | 'safe_word' | 'boundary_check' | 'emergency' | 'general' = 'general'
  ): Promise<SafetyAction> {
    if (!this.safetySession) {
      throw new Error('No active safety session');
    }

    const action = await processUserInteraction(
      this.safetySession.sessionId,
      interaction,
      interactionType
    );

    this.updateSafetyStatus();
    this.emitEvent('safety:interaction_processed', {
      interactionType,
      action: action.type,
      timestamp: Date.now()
    });

    return action;
  }

  /**
   * Validate content through safety framework
   */
  public async validateContent(
    content: string,
    metadata?: Record<string, any>
  ): Promise<ContentAnalysis | null> {
    if (!this.safetySession) {
      throw new Error('No active safety session');
    }

    const analysis = await validateContent(
      content,
      this.safetySession.sessionId,
      metadata
    );

    this.emitEvent('safety:content_validated', {
      hasViolations: analysis?.violations.length > 0,
      riskLevel: analysis?.riskLevel,
      timestamp: Date.now()
    });

    return analysis;
  }

  /**
   * Create fusion using synthesis engine
   */
  public async createFusion(
    baseElements: any[],
    fusionType: string,
    options?: any
  ): Promise<any> {
    if (!this.synthesisEngine) {
      throw new Error('Synthesis engine not initialized');
    }

    // Validate fusion request through safety framework
    if (this.config.enableSafety && this.safetySession) {
      const validation = await this.validateContent(
        `Fusion request: ${fusionType} with ${baseElements.length} elements`,
        { fusionType, elementCount: baseElements.length }
      );

      if (validation && validation.riskLevel === 'high') {
        throw new Error('Fusion request blocked due to safety concerns');
      }
    }

    this.engineState.synthesis.currentFusions++;
    this.engineState.synthesis.totalFusions++;
    this.engineState.synthesis.lastActivity = Date.now();

    try {
      const fusion = await this.synthesisEngine.createFusion(baseElements, fusionType, options);

      this.emitEvent('synthesis:fusion_created', {
        fusionType,
        elementCount: baseElements.length,
        timestamp: Date.now()
      });

      return fusion;
    } finally {
      this.engineState.synthesis.currentFusions--;
    }
  }

  /**
   * Render mystical scene with Three.js
   */
  public async renderMysticalScene(container: HTMLElement): Promise<void> {
    if (!this.threeJsScene) {
      throw new Error('Three.js scene not initialized');
    }

    try {
      await this.threeJsScene.initialize(container);

      // Add mystical elements
      if (this.particleSystem) {
        this.threeJsScene.addSystem(this.particleSystem);
      }

      if (this.fractalGenerator) {
        this.threeJsScene.addSystem(this.fractalGenerator);
      }

      this.emitEvent('threejs:scene_rendered', {
        container: container.id || 'unknown',
        timestamp: Date.now()
      });
    } catch (error) {
      this.emitEvent('threejs:render_error', { error: error.message });
      throw error;
    }
  }

  /**
   * Shutdown all engines gracefully
   */
  public async shutdown(reason?: string): Promise<void> {
    this.emitEvent('engine:shutting_down', { reason });

    // Clear auto-save timer
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }

    // Save final state
    this.saveEngineState();

    // End safety session
    if (this.safetySession && this.config.enableSafety) {
      await endSafetySession(this.safetySession.sessionId, reason || 'engine_shutdown');
    }

    // Clear all listeners
    this.eventListeners.clear();

    this.isInitialized = false;
    UnifiedCathedralEngine.instance = null;

    this.emitEvent('engine:shutdown_complete', { timestamp: Date.now() });
  }

  /**
   * Get comprehensive engine health status
   */
  public getHealthStatus(): {
    isHealthy: boolean;
    engines: {
      synthesis: boolean;
      safety: boolean;
      threeJs: boolean;
      learning: boolean;
    };
    performance: {
      memoryUsage?: number;
      frameRate: number;
      activeOperations: number;
    };
    lastUpdate: number;
  } {
    return {
      isHealthy: this.isInitialized &&
        this.engineState.synthesis.isActive &&
        (this.config.enableSafety ? this.safetySession !== null : true) &&
        (this.config.enableThreeJs ? this.threeJsScene !== null : true),
      engines: {
        synthesis: this.engineState.synthesis.isActive,
        safety: this.config.enableSafety ? this.safetySession !== null : false,
        threeJs: this.config.enableThreeJs ? this.threeJsScene !== null : false,
        learning: this.config.enableLearning ? this.engineState.learning.isActive : false,
      },
      performance: {
        frameRate: this.engineState.threeJs.frameRate,
        activeOperations: this.engineState.synthesis.currentFusions,
        memoryUsage: (performance as any).memory?.usedJSHeapSize,
      },
      lastUpdate: Date.now(),
    };
  }
}

// Export singleton instance getter
export const getUnifiedCathedralEngine = (config?: UnifiedCathedralConfig): UnifiedCathedralEngine => {
  return UnifiedCathedralEngine.getInstance(config);
};

// Export version and engine info
export const VERSION = '1.0.0';
export const ENGINE_NAME = 'Unified Cathedral Engine';