// Main exports for the Synthesis Engine package

import { SynthesisEngine } from './SynthesisEngine';
import { FusionProgressionSystem } from './progression/FusionProgressionSystem';

// Core types and interfaces
export * from './types/FusionTypes';

// Core engine components
export { SynthesisEngine } from './SynthesisEngine';
export { FusionKinkGenerator } from './generators/FusionKinkGenerator';
export { MysticalPatternEngine } from './patterns/MysticalPatternEngine';
export { FusionProgressionSystem } from './progression/FusionProgressionSystem';

// React components
export { FusionControls } from './components/FusionControls';
export { FusionPreview } from './components/FusionPreview';

// Integration modules
export { ThreeJsBridge } from './integration/ThreeJsBridge';

// Default configuration
import { SynthesisEngineConfig } from './types/FusionTypes';

export const defaultSynthesisConfig: SynthesisEngineConfig = {
  maxConcurrentFusions: 5,
  defaultTimeout: 30000,
  qualityThresholds: {
    common: 30,
    uncommon: 45,
    rare: 60,
    epic: 75,
    legendary: 85,
    mythical: 95
  },
  experienceMultipliers: {
    common: 1,
    uncommon: 1.5,
    rare: 2,
    epic: 3,
    legendary: 5,
    mythical: 10
  },
  harmonicRatios: [
    { numerator: 144, denominator: 99, ratio: 144/99, fibonacciIndex: 12 }
  ],
  enableQuantumEffects: true,
  enableMysticalAlignment: true
};

// Utility functions
export const createSynthesisEngine = (config?: Partial<SynthesisEngineConfig>) => {
  return new SynthesisEngine({ ...defaultSynthesisConfig, ...config });
};

export const createUserProgression = (userId: string) => {
  const progressionSystem = new FusionProgressionSystem();
  return progressionSystem.createUserProgression(userId);
};

// Version information
export const VERSION = '1.0.0';
export const ENGINE_NAME = 'Synthesis Engine';
export const HARMONIC_RATIO = '144:99';