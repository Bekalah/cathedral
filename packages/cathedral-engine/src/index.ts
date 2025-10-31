/**
 * @cathedral/cathedral-engine
 * Main entry point for the Unified Cathedral Engine
 */

// Main engine export
export { UnifiedCathedralEngine, getUnifiedCathedralEngine } from './UnifiedCathedralEngine';

// Types
export type {
  CathedralEvent,
  EngineState,
  UnifiedCathedralConfig,
} from './UnifiedCathedralEngine';

// Version and metadata
export const VERSION = '1.0.0';
export const ENGINE_NAME = 'Unified Cathedral Engine';
export const BUILT_AT = new Date().toISOString();

// Re-export key types from other engines for convenience
export type {
  SafetySession,
  UserSafetyProfile,
  ContentAnalysis,
  SafetyAction,
  SessionStatus,
  UserRiskLevel,
  ContentIntensity,
  TriggerCategory,
  SafetyLevel,
} from '@cathedral/safety-framework';

export type {
  SynthesisEngine,
  SynthesisEngineConfig,
} from '@cathedral/synthesis-engine';

export type {
  MysticalScene,
  SacredGeometryRenderer,
  CathedralLighting,
  MysticalMaterials,
  EsotericPostProcessing,
  ParticleSystem,
  FractalGenerator,
  HolographicDisplay,
  SacredGeometryEngine,
} from '@cathedral/three-engine';

// Default configuration
export const defaultConfig: Required<UnifiedCathedralConfig> = {
  synthesis: {},
  enableThreeJs: true,
  enableLearning: true,
  enableSafety: true,
  maxConcurrentOperations: 5,
  defaultRenderQuality: 'high',
  enableEventLogging: true,
  autoSaveInterval: 30000,
};

// Utility functions
export const createCathedralEngine = (config?: UnifiedCathedralConfig) => {
  return getUnifiedCathedralEngine(config);
};

export const initializeCathedralExperience = async (userProfile?: UserSafetyProfile) => {
  const engine = getUnifiedCathedralEngine();
  return await engine.initialize(userProfile);
};

// Health check utility
export const checkEngineHealth = () => {
  const engine = getUnifiedCathedralEngine();
  return engine.getHealthStatus();
};

export default {
  UnifiedCathedralEngine,
  getUnifiedCathedralEngine,
  createCathedralEngine,
  initializeCathedralExperience,
  checkEngineHealth,
  VERSION,
  ENGINE_NAME,
  defaultConfig,
};