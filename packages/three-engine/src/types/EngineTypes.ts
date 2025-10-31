/**
 * Core type definitions for the Three.js engine
 */

export interface EngineConfig {
  antialias?: boolean;
  alpha?: boolean;
  powerPreference?: 'high-performance' | 'low-power' | 'default';
  stencil?: boolean;
  depth?: boolean;
  shadowMap?: boolean;
  toneMappingExposure?: number;
}

export interface SacredGeometryProperties {
  goldenRatio?: boolean;
  fibonacci?: boolean;
  platonic?: boolean;
  metatron?: boolean;
}

export interface AuraConfig {
  radius?: number;
  segments?: number;
  color?: THREE.Color | string | number;
  opacity?: number;
  intensity?: number;
}

export interface ResonanceConfig {
  frequency?: number;
  amplitude?: number;
  phase?: number;
}

export interface MysticalObject3D extends THREE.Object3D {
  userData: {
    sacredGeometry?: SacredGeometryProperties;
    aura?: AuraConfig;
    resonance?: ResonanceConfig;
    [key: string]: any;
  };
}

export interface RenderCallback {
  (deltaTime: number): void;
}

export interface EngineEventMap {
  initialized: [scene: any];
  objectAdded: [object: THREE.Object3D];
  preRender: [deltaTime: number];
  postRender: [deltaTime: number];
  destroyed: [];
}
