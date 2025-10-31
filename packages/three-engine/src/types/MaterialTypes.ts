import * as THREE from 'three';

/**
 * Base material configuration
 */
export interface BaseMaterialConfig {
  color?: THREE.Color | string | number;
  opacity?: number;
  transparent?: boolean;
  side?: THREE.Side;
  blending?: THREE.Blending;
  blendSrc?: THREE.BlendingSrcFactor;
  blendDst?: THREE.BlendingDstFactor;
  depthWrite?: boolean;
  depthTest?: boolean;
}

/**
 * Mystical material configuration
 */
export interface MysticalMaterialConfig extends BaseMaterialConfig {
  energyIntensity?: number;
  auraRadius?: number;
  glowColor?: THREE.Color | string | number;
  mysticalPattern?: 'flower' | 'spiral' | 'mandala' | 'hexagon';
  animationSpeed?: number;
  pulseIntensity?: number;
}

/**
 * Energy field material configuration
 */
export interface EnergyFieldConfig extends BaseMaterialConfig {
  fieldType?: 'spherical' | 'cylindrical' | 'planar' | 'toroidal';
  fieldStrength?: number;
  fieldRadius?: number;
  energyColor?: THREE.Color | string | number;
  turbulence?: number;
  flowSpeed?: number;
  particleCount?: number;
}

/**
 * Crystal material configuration
 */
export interface CrystalMaterialConfig extends BaseMaterialConfig {
  refractiveIndex?: number;
  dispersion?: number;
  clarity?: number;
  cut?: 'round' | 'emerald' | 'princess' | 'marquise' | 'pear' | 'heart';
  facets?: number;
  reflectionIntensity?: number;
  refractionIntensity?: number;
}

/**
 * Aura material configuration
 */
export interface AuraMaterialConfig extends BaseMaterialConfig {
  auraType?: 'spherical' | 'cylindrical' | 'conical' | 'custom';
  auraSize?: number;
  auraColor?: THREE.Color | string | number;
  auraIntensity?: number;
  pulseRate?: number;
  layers?: number;
  gradient?: boolean;
}

/**
 * Holographic material configuration
 */
export interface HolographicMaterialConfig extends BaseMaterialConfig {
  hologramType?: 'rainbow' | 'scanline' | 'interference' | 'volumetric';
  distortionAmount?: number;
  scanlineDensity?: number;
  interferencePattern?: 'linear' | 'circular' | 'radial' | 'spiral';
  colorShift?: number;
  depthLayers?: number;
  parallaxAmount?: number;
}

/**
 * Sacred geometry material configuration
 */
export interface SacredGeometryMaterialConfig extends BaseMaterialConfig {
  geometryType?: 'platonic' | 'archimedean' | 'sacred' | 'fractal';
  goldenRatio?: boolean;
  fibonacci?: boolean;
  symmetry?: number;
  patternDensity?: number;
  energyFlow?: boolean;
  harmonicResonance?: number;
}

/**
 * Particle material configuration
 */
export interface ParticleMaterialConfig extends BaseMaterialConfig {
  particleShape?: 'circle' | 'square' | 'triangle' | 'star' | 'custom';
  sizeRange?: [number, number];
  sizeOverLifetime?: boolean;
  colorOverLifetime?: boolean;
  velocityDamping?: number;
  gravity?: number;
  turbulence?: number;
  spawnRate?: number;
  maxParticles?: number;
}

/**
 * Material type definitions
 */
export type MaterialType =
  | 'basic'
  | 'lambert'
  | 'phong'
  | 'standard'
  | 'physical'
  | 'matcap'
  | 'toon'
  | 'normal'
  | 'depth'
  | 'distance'
  | 'sprite'
  | 'mystical'
  | 'energy'
  | 'crystal'
  | 'aura'
  | 'holographic'
  | 'sacred'
  | 'particle';

/**
 * Material blend modes
 */
export type BlendMode =
  | 'normal'
  | 'additive'
  | 'subtractive'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'soft-light'
  | 'color-dodge'
  | 'color-burn'
  | 'darken'
  | 'lighten'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * Material animation types
 */
export type MaterialAnimationType =
  | 'pulse'
  | 'glow'
  | 'flow'
  | 'rotate'
  | 'scale'
  | 'color-shift'
  | 'opacity-wave'
  | 'energy-field'
  | 'mystical-pattern';

/**
 * Material texture types
 */
export type MaterialTextureType =
  | 'diffuse'
  | 'normal'
  | 'roughness'
  | 'metalness'
  | 'emissive'
  | 'ambient-occlusion'
  | 'displacement'
  | 'alpha'
  | 'environment'
  | 'light'
  | 'reflection'
  | 'refraction';

/**
 * Material property definitions
 */
export interface MaterialProperties {
  // Physical properties
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  transmission?: number;
  thickness?: number;
  ior?: number;

  // Lighting properties
  emissive?: THREE.Color | string | number;
  emissiveIntensity?: number;
  lightMap?: THREE.Texture;
  lightMapIntensity?: number;

  // Environment properties
  envMap?: THREE.Texture;
  envMapIntensity?: number;
  refractionRatio?: number;

  // Advanced properties
  wireframe?: boolean;
  wireframeLinewidth?: number;
  skinning?: boolean;
  morphTargets?: boolean;
  morphNormals?: boolean;

  // Custom mystical properties
  energyIntensity?: number;
  auraRadius?: number;
  mysticalPattern?: string;
  animationSpeed?: number;
}

/**
 * Shader material configuration
 */
export interface ShaderMaterialConfig {
  vertexShader: string;
  fragmentShader: string;
  uniforms?: { [key: string]: THREE.IUniform };
  defines?: { [key: string]: string };
  lights?: boolean;
  fog?: boolean;
  extensions?: {
    derivatives?: boolean;
    fragDepth?: boolean;
    drawBuffers?: boolean;
    shaderTextureLOD?: boolean;
  };
}

/**
 * Material preset configurations
 */
export interface MaterialPresets {
  // Basic presets
  basic: BaseMaterialConfig;
  mystical: MysticalMaterialConfig;
  energy: EnergyFieldConfig;
  crystal: CrystalMaterialConfig;
  aura: AuraMaterialConfig;
  holographic: HolographicMaterialConfig;
  sacred: SacredGeometryMaterialConfig;
  particle: ParticleMaterialConfig;

  // Specialized presets
  gold: MysticalMaterialConfig;
  silver: MysticalMaterialConfig;
  diamond: CrystalMaterialConfig;
  emerald: CrystalMaterialConfig;
  sapphire: CrystalMaterialConfig;
  ruby: CrystalMaterialConfig;
  amethyst: CrystalMaterialConfig;
}

/**
 * Material animation configuration
 */
export interface MaterialAnimationConfig {
  type: MaterialAnimationType;
  duration?: number;
  intensity?: number;
  speed?: number;
  loop?: boolean;
  easing?: (t: number) => number;
}

/**
 * Material layer configuration for complex materials
 */
export interface MaterialLayer {
  material: THREE.Material;
  blendMode: BlendMode;
  opacity: number;
  mask?: THREE.Texture;
}

/**
 * Complex material configuration
 */
export interface ComplexMaterialConfig {
  name: string;
  layers: MaterialLayer[];
  baseConfig: BaseMaterialConfig;
  animations?: MaterialAnimationConfig[];
}

/**
 * Material instance data
 */
export interface MaterialInstance {
  id: string;
  material: THREE.Material;
  config: BaseMaterialConfig | MysticalMaterialConfig | EnergyFieldConfig;
  animations: MaterialAnimationConfig[];
  createdAt: Date;
  lastModified: Date;
}

/**
 * Material library interface
 */
export interface MaterialLibrary {
  register(material: MaterialInstance): void;
  get(id: string): MaterialInstance | null;
  getByType(type: MaterialType): MaterialInstance[];
  remove(id: string): boolean;
  clear(): void;
  getAll(): MaterialInstance[];
}

/**
 * Material factory interface
 */
export interface MaterialFactory {
  createBasic(config: BaseMaterialConfig): THREE.MeshBasicMaterial;
  createLambert(config: BaseMaterialConfig): THREE.MeshLambertMaterial;
  createPhong(config: BaseMaterialConfig): THREE.MeshPhongMaterial;
  createStandard(config: BaseMaterialConfig): THREE.MeshStandardMaterial;
  createPhysical(config: BaseMaterialConfig): THREE.MeshPhysicalMaterial;

  createMystical(config: MysticalMaterialConfig): THREE.ShaderMaterial;
  createEnergy(config: EnergyFieldConfig): THREE.ShaderMaterial;
  createCrystal(config: CrystalMaterialConfig): THREE.ShaderMaterial;
  createAura(config: AuraMaterialConfig): THREE.ShaderMaterial;
  createHolographic(config: HolographicMaterialConfig): THREE.ShaderMaterial;
  createSacred(config: SacredGeometryMaterialConfig): THREE.ShaderMaterial;
  createParticle(config: ParticleMaterialConfig): THREE.ShaderMaterial;

  createFromPreset(presetName: keyof MaterialPresets): THREE.Material;
  createComplex(config: ComplexMaterialConfig): THREE.Material;
}

/**
 * Material utility functions interface
 */
export interface MaterialUtils {
  cloneMaterial(material: THREE.Material): THREE.Material;
  mergeMaterials(base: THREE.Material, overlay: THREE.Material, blendMode: BlendMode): THREE.Material;
  convertToShader(material: THREE.Material): THREE.ShaderMaterial;
  extractTextures(material: THREE.Material): Map<MaterialTextureType, THREE.Texture>;
  applyAnimation(material: THREE.Material, animation: MaterialAnimationConfig): void;
  updateMaterialProperties(material: THREE.Material, properties: Partial<MaterialProperties>): void;
  disposeMaterial(material: THREE.Material): void;
}

/**
 * Material validation interface
 */
export interface MaterialValidation {
  validateConfig(config: any): { valid: boolean; errors: string[] };
  validateCompatibility(material1: THREE.Material, material2: THREE.Material): boolean;
  checkWebGLCompatibility(material: THREE.Material): { supported: boolean; warnings: string[] };
}

/**
 * Material export/import interface
 */
export interface MaterialSerialization {
  exportMaterial(material: THREE.Material): string;
  importMaterial(json: string): THREE.Material;
  exportLibrary(library: MaterialLibrary): string;
  importLibrary(json: string): MaterialLibrary;
}

// All types and interfaces are already exported above
