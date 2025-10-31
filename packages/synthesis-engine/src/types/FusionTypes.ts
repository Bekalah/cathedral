// Core Fusion Types for the 144:99 Harmonic Ratio System

export interface HarmonicRatio {
  readonly numerator: number;    // 144
  readonly denominator: number;  // 99
  readonly ratio: number;        // 144/99 ≈ 1.4545...
  readonly fibonacciIndex: number; // 12th Fibonacci number
}

export interface SacredGeometry {
  readonly type: GeometryType;
  readonly vertices: number;
  readonly harmonicRatio: HarmonicRatio;
  readonly sacredNumber: number;
  readonly properties: GeometryProperties;
}

export interface GeometryProperties {
  rotationalSymmetry: number;
  reflectionSymmetry: boolean;
  selfSimilar: boolean;
  fractalDimension?: number;
  goldenRatio: boolean;
}

export enum GeometryType {
  MERKABA = 'merkaba',
  VESICA_PISCIS = 'vesica_piscis',
  FLOWER_OF_LIFE = 'flower_of_life',
  METATRONS_CUBE = 'metatrons_cube',
  TREE_OF_LIFE = 'tree_of_life',
  OCTAGRAM = 'octagram',
  DODECAGRAM = 'dodecagram',
  SACRED_CIRCLE = 'sacred_circle'
}

export enum Domain {
  ART = 'art',
  SCIENCE = 'science',
  SPIRITUALITY = 'spirituality'
}

export interface DomainElement {
  readonly id: string;
  readonly domain: Domain;
  readonly name: string;
  readonly description: string;
  readonly sacredGeometry: SacredGeometry;
  readonly energy: number; // 0-100
  readonly frequency: number; // Hz
  readonly unlocked: boolean;
  readonly rarity: Rarity;
  readonly attributes: DomainAttributes;
}

export interface DomainAttributes {
  creativity: number;    // 0-100
  logic: number;        // 0-100
  intuition: number;    // 0-100
  harmony: number;      // 0-100
  transformation: number; // 0-100
}

export enum Rarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHICAL = 'mythical'
}

export interface FusionInput {
  readonly elements: DomainElement[];
  readonly harmony: number; // 0-100
  readonly intention: string;
  readonly userId: string;
  readonly timestamp: Date;
}

export interface FusionResult {
  readonly id: string;
  readonly input: FusionInput;
  readonly output: SynthesizedElement;
  readonly success: boolean;
  readonly quality: number; // 0-100
  readonly experience: number;
  readonly timestamp: Date;
  readonly metadata: FusionMetadata;
}

export interface SynthesizedElement {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly domains: Domain[];
  readonly primaryGeometry: SacredGeometry;
  readonly secondaryGeometries: SacredGeometry[];
  readonly energy: number;
  readonly frequency: number;
  readonly abilities: Ability[];
  readonly visual: VisualProperties;
  readonly audio: AudioProperties;
  readonly rarity: Rarity;
}

export interface Ability {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: AbilityType;
  readonly power: number;
  readonly cooldown?: number;
  readonly duration?: number;
}

export enum AbilityType {
  CREATIVE_BOOST = 'creative_boost',
  HEALING = 'healing',
  MANIFESTATION = 'manifestation',
  PROTECTION = 'protection',
  WISDOM = 'wisdom',
  TRANSFORMATION = 'transformation',
  HARMONY = 'harmony',
  INSIGHT = 'insight'
}

export interface VisualProperties {
  color: string;
  pattern: string;
  intensity: number;
  animation: AnimationType;
  threeJsMaterial?: any; // Three.js material properties
}

export enum AnimationType {
  PULSING = 'pulsing',
  ROTATING = 'rotating',
  FLOWING = 'flowing',
  SPIRALING = 'spiraling',
  BREATHING = 'breathing',
  CRYSTALLIZING = 'crystallizing'
}

export interface AudioProperties {
  frequency: number;
  waveform: WaveformType;
  harmonics: number[];
  volume: number;
  reverb: boolean;
}

export enum WaveformType {
  SINE = 'sine',
  SQUARE = 'square',
  TRIANGLE = 'triangle',
  SAWTOOTH = 'sawtooth',
  ORGANIC = 'organic'
}

export interface FusionMetadata {
  processingTime: number;
  algorithmVersion: string;
  harmonicRatios: HarmonicRatio[];
  energySignature: string;
  quantumEntanglement: boolean;
  mysticalAlignment: number;
}

export interface UserProgression {
  readonly userId: string;
  readonly level: number;
  readonly experience: number;
  readonly experienceToNext: number;
  readonly unlockedElements: string[];
  readonly completedFusions: string[];
  readonly achievements: Achievement[];
  readonly statistics: UserStatistics;
  readonly preferences: UserPreferences;
}

export interface Achievement {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon: string;
  readonly rarity: Rarity;
  readonly unlockedAt: Date;
  readonly progress?: number;
  readonly maxProgress?: number;
}

export interface UserStatistics {
  totalFusions: number;
  successfulFusions: number;
  averageQuality: number;
  highestRarity: Rarity;
  domainsMastered: Domain[];
  timeSpent: number; // minutes
  favoriteCombination: Domain[];
}

export interface UserPreferences {
  autoSave: boolean;
  soundEnabled: boolean;
  visualEffects: boolean;
  theme: Theme;
  language: string;
  notifications: NotificationSettings;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  MYSTICAL = 'mystical',
  SACRED = 'sacred'
}

export interface NotificationSettings {
  fusionComplete: boolean;
  levelUp: boolean;
  achievementUnlocked: boolean;
  newElements: boolean;
}

export interface FusionRecipe {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly requiredElements: DomainElement[];
  readonly result: SynthesizedElement;
  readonly difficulty: number; // 1-10
  readonly successRate: number; // 0-100
  readonly requiredLevel: number;
  readonly category: RecipeCategory;
}

export enum RecipeCategory {
  BASIC = 'basic',
  ADVANCED = 'advanced',
  MASTER = 'master',
  LEGENDARY = 'legendary',
  TRANSCENDENT = 'transcendent'
}

export interface FusionError {
  readonly code: string;
  readonly message: string;
  readonly details?: any;
  readonly timestamp: Date;
  readonly recoverable: boolean;
}

export interface SynthesisEngineConfig {
  readonly maxConcurrentFusions: number;
  readonly defaultTimeout: number;
  readonly qualityThresholds: Record<Rarity, number>;
  readonly experienceMultipliers: Record<Rarity, number>;
  readonly harmonicRatios: HarmonicRatio[];
  readonly enableQuantumEffects: boolean;
  readonly enableMysticalAlignment: boolean;
}

// Event types for real-time updates
export interface FusionEvent {
  readonly type: FusionEventType;
  readonly payload: any;
  readonly timestamp: Date;
}

export enum FusionEventType {
  FUSION_STARTED = 'fusion_started',
  FUSION_PROGRESS = 'fusion_progress',
  FUSION_COMPLETED = 'fusion_completed',
  FUSION_FAILED = 'fusion_failed',
  ELEMENT_UNLOCKED = 'element_unlocked',
  LEVEL_UP = 'level_up',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked'
}

// Three.js integration types
export interface ThreeJsIntegration {
  scene?: any;
  camera?: any;
  renderer?: any;
  geometries: Map<string, any>;
  materials: Map<string, any>;
  animations: Map<string, any>;
}

// React component prop types
export interface FusionControlsProps {
  availableElements: DomainElement[];
  userProgression: UserProgression;
  onFusion: (input: FusionInput) => Promise<FusionResult>;
  onElementSelect: (element: DomainElement) => void;
  selectedElements: DomainElement[];
  config: SynthesisEngineConfig;
}

export interface FusionPreviewProps {
  elements: DomainElement[];
  preview: FusionResult | null;
  loading: boolean;
  error?: FusionError;
}

export interface GrimoireInterfaceProps {
  userProgression: UserProgression;
  recentFusions: FusionResult[];
  availableRecipes: FusionRecipe[];
  onRecipeSelect: (recipe: FusionRecipe) => void;
  onElementUnlock: (elementId: string) => void;
}