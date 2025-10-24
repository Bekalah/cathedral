/**
 * Liber Arcanae Codex Abyssiae Types
 * Type definitions for the 78-card tarot system that mirrors Codex 144:99
 */

export interface ArcanaCard {
  id: string;
  name: string;
  type: 'major' | 'minor';
  suit?: ArcanaSuit;
  number?: number;
  element: string;
  planet: string;
  zodiac: string;
  chakra: string;
  solfeggio: number;
  color: string;
  geometry: string;
  pigment: string;
  shem: string;
  goetia: string;

  // Mirroring with Codex 144:99
  mirroredCodexNodes: number[];
  resonance: ArcanaResonance;

  // Narrative and character
  narrative: ArcanaNarrative;
  character: ArcanaCharacter;

  // Game mechanics
  gameDesign: ArcanaGameDesign;

  // Art and symbolism
  symbolism: ArcanaSymbolism;

  // Fusion kink mechanics
  fusion: ArcanaFusion;

  // Creator information
  creator: ArcanaCreator;
}

export type ArcanaSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface ArcanaResonance {
  primaryCodexNode: number;
  secondaryCodexNodes: number[];
  resonanceStrength: number; // 0-1
  harmonicAlignment: number[];
  elementalAffinity: string;
  chakraAlignment: string;
}

export interface ArcanaNarrative {
  theme: string;
  archetype: string;
  storyBeats: string[];
  dialogueStyle: string;
  keywords: string[];
  personality: ArcanaPersonality;
  backstory: string;
  motivations: string[];
}

export interface ArcanaPersonality {
  traits: string[];
  flaws: string[];
  virtues: string[];
  communicationStyle: string;
  emotionalRange: string[];
  wisdomTeachings: string[];
}

export interface ArcanaCharacter {
  name: string;
  title: string;
  role: 'teacher' | 'guide' | 'warrior' | 'healer' | 'mystic' | 'creator';
  stats: ArcanaStats;
  abilities: ArcanaAbility[];
  progression: ArcanaProgression;
}

export interface ArcanaStats {
  willpower: number;
  wisdom: number;
  creativity: number;
  healing: number;
  protection: number;
  resonance: number;
}

export interface ArcanaAbility {
  name: string;
  description: string;
  type: 'active' | 'passive' | 'reactive';
  cost: number;
  effects: string[];
  codexNodeAlignment: number[];
}

export interface ArcanaProgression {
  levels: ArcanaLevel[];
  evolutionPaths: string[];
  masteryRequirements: string[];
}

export interface ArcanaLevel {
  level: number;
  name: string;
  abilities: string[];
  requirements: string[];
  wisdom: string;
}

export interface ArcanaGameDesign {
  abilityType: string;
  mechanics: string[];
  questType: string;
  rewardStyle: string;
  enemyAffinity: string;
  environmentEffect: string;
  gameplayStyle: string;
}

export interface ArcanaSymbolism {
  primarySymbol: string;
  secondarySymbols: string[];
  geometricPattern: string;
  colorBlending: string;
  alchemicalSymbol: string;
  kabbalisticPath: string;
}

export interface ArcanaFusion {
  fusionKink: FusionKinkData;
  compatibleCards: string[];
  fusionResults: FusionResult[];
  transformationEffects: string[];
  shadowIntegration: string[];
}

export interface FusionKinkData {
  kinkType: string;
  intensity: number; // 1-10
  mechanics: string[];
  safetyProtocols: string[];
  consentRequirements: string[];
  transformationElements: string[];
}

export interface FusionResult {
  cardCombination: string[];
  resultName: string;
  newAbilities: string[];
  storyOutcome: string;
  gameplayEffects: string[];
  resonanceShift: number[];
}

export interface ArcanaCreator {
  name: string;
  alias: string;
  vision: string;
  influences: string[];
  creationDate: string;
  version: string;
}

export interface LiberArcanaeConfig {
  mirrorCodexNodes: boolean;
  enableFusionKink: boolean;
  enableGameMechanics: boolean;
  enableArtGeneration: boolean;
  enableWisdomTeaching: boolean;
  traumaSafety: boolean;
  ndAccessibility: boolean;
  researchIntegration: boolean;
}

export interface ArcanaSearchQuery {
  keywords: string[];
  arcanaIds?: string[];
  suits?: ArcanaSuit[];
  elements?: string[];
  chakras?: string[];
  gameStyles?: string[];
  fusionTypes?: string[];
  limit?: number;
  offset?: number;
}

export interface ArcanaSearchResult {
  cards: ArcanaCard[];
  totalCount: number;
  facets: {
    suits: { [key: string]: number };
    elements: { [key: string]: number };
    chakras: { [key: string]: number };
    gameStyles: { [key: string]: number };
  };
  query: ArcanaSearchQuery;
}

export interface FusionKinkSession {
  id: string;
  participants: string[]; // Arcana card IDs
  fusionType: string;
  intensity: number;
  safetyProtocols: string[];
  consent: boolean;
  transformation: FusionTransformation;
  results: FusionOutcome;
  duration: number;
  aftercare: string[];
}

export interface FusionTransformation {
  physical: string[];
  emotional: string[];
  spiritual: string[];
  energetic: string[];
  consciousness: string[];
}

export interface FusionOutcome {
  newAbilities: string[];
  storyDevelopment: string[];
  characterGrowth: string[];
  worldChanges: string[];
  resonanceEvolution: number[];
}

export interface ArcanaValidationResult {
  isValid: boolean;
  errors: ArcanaValidationError[];
  warnings: ArcanaValidationWarning[];
  checksum: string;
  lastValidated: Date;
}

export interface ArcanaValidationError {
  card: string;
  field: string;
  message: string;
  value: any;
}

export interface ArcanaValidationWarning {
  card: string;
  field: string;
  message: string;
  suggestion: string;
}

export interface ArcanaAnalytics {
  totalCards: number;
  majorArcana: number;
  minorArcana: number;
  fusionSessions: number;
  mirroredNodes: number;
  activeCharacters: number;
  gameSessions: number;
  artGenerations: number;
  wisdomSessions: number;
  lastUpdated: Date;
}