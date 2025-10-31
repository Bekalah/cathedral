/**
 * 🏛️ MYSTICAL NODE TYPES - Complete 99-Node System
 * The complete brain architecture for all codex nodes
 */

export interface MysticalNode {
  // Core Identity
  id: string
  name: string
  type: 'major' | 'minor' | 'gate' | 'element' | 'angel' | 'demon' | 'primal'
  family: 'major-arcana' | 'suits' | 'gates' | 'shem-angels' | 'elements' | 'primals'

  // Trinitarian Structure (Brain + Navigation + Integration)
  sphere: 'keter' | 'chokmah' | 'binah' | 'chesed' | 'geburah' | 'tiphereth' | 'netzach' | 'hod' | 'yesod' | 'malkuth'
  element: 'fire' | 'water' | 'air' | 'earth' | 'spirit'
  planet: string // Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto

  // Health & Synchronization
  health: NodeHealth
  connections: NodeConnection[]
  dependencies: string[] // Node IDs this node depends on

  // Data Sources
  datasets: DataSource[]
  workers: WorkerConnection[]

  // Mystical Properties
  numerology: NumerologyData
  vibration: number // Hz frequency
  chakra: ChakraData
  emotion: EmotionalSpectrum
  consciousness: ConsciousnessState

  // Content & Stories
  grimoire: GrimoirePage
  stories: StoryBranch[]
  teachings: TeachingContent

  // Interactive Features
  puzzles: MysticalPuzzle[]
  altars: AltarConfiguration[]
  rituals: RitualData[]

  // Technical Data
  fractalParams: FractalParameters
  gemStyle: GemConfiguration
  soundProfile: SoundProfile
  visualProfile: VisualProfile

  // Timestamps & Tracking
  created: Date
  lastActivated: Date
  activationCount: number
  resonanceScore: number
}

export interface NodeHealth {
  physical: HealthMetric
  energetic: HealthMetric
  spiritual: HealthMetric
  overall: number // 0-1 scale
  synchronization: SynchronizationData[]
}

export interface HealthMetric {
  current: number // 0-1 scale
  maximum: number
  regeneration: number // per second
  critical: boolean
  blocked: boolean
  timestamp: Date
}

export interface SynchronizationData {
  targetNodeId: string
  resonanceFrequency: number
  synchronicityScore: number
  lastSync: Date
  active: boolean
}

export interface NodeConnection {
  target: string
  type: 'passive' | 'active' | 'hidden' | 'bridge'
  strength: number // 0-1 scale
  frequency: number // Hz
  resonant: boolean
  bidirectional: boolean
  dataFlow: 'incoming' | 'outgoing' | 'both'
}

export interface DataSource {
  name: string
  type: 'json' | 'csv' | 'api' | 'realtime' | 'worker' | 'cloud'
  endpoint: string
  refreshRate: number // seconds
  lastUpdated: Date
  status: 'active' | 'inactive' | 'error'
  errorCount: number
}

export interface WorkerConnection {
  name: string
  workerId: string
  endpoint: string
  status: 'online' | 'offline' | 'maintenance'
  latency: number // ms
  lastHealthCheck: Date
  capabilities: string[]
}

export interface NumerologyData {
  core: number
  path: number
  reduction: number
  harmonicas: number[]
  divisors: number[]
  properties: string[]
  mysticalRelationships: string[]
}

export interface ChakraData {
  primary: ChakraType
  activated: ChakraType[]
  rootColor: string
  wavelength: number
  blockages: string[]
  opening: number // 0-1 scale
}

export type ChakraType = 'root' | 'sacral' | 'solar-plexus' | 'heart' | 'throat' | 'third-eye' | 'crown'

export interface EmotionalSpectrum {
  primary: EmotionType
  spectrum: EmotionType[]
  intensity: number // 0-1 scale
  balance: number // -1 (destructive) to +1 (constructive)
  triggers: string[]
  antidotes: string[]
}

export type EmotionType = 'joy' | 'sadness' | 'anger' | 'fear' | 'love' | 'hate' | 'peace' | 'chaos' | 'creativity' | 'destruction'

export interface ConsciousnessState {
  current: ConsciousnessLevel
  journey: ConsciousnessLevel[]
  awakeningLevel: number // 0-1 scale
  thirdEye: boolean
  crown: boolean
  crystal: boolean // Clear Quartz consciousness
  ascended: boolean
}

export type ConsciousnessLevel = 'unconscious' | 'subconscious' | 'conscious' | 'superconscious' | 'cosmic' | 'unity'

export interface GrimoirePage {
  title: string
  content: string
  formattedContent: string
  images: GrimoireImage[]
  meditation: MeditationGuide
  symbols: SymbolData[]
  keywords: string[]
  themes: string[]
  lineages: string[] // Spiritual tradition connections
  warnings: string[]
  requirements: RitualRequirement[]
}

export interface GrimoireImage {
  url: string
  alt: string
  description: string
  mysticalMeaning: string
  sacredGeometry?: string
}

export interface MeditationGuide {
  duration: number // minutes
  technique: string
  posture: string
  mantras: string[]
  affirmations: string[]
  visualization: string
  energyWork: string
}

export interface SymbolData {
  symbol: string
  meaning: string
  tradition: string
  activation: string
  properties: string[]
}

export interface RitualRequirement {
  item: string
  quantity: number
  quality: string
  preparation: string
}

export interface StoryBranch {
  id: string
  title: string
  description: string
  prerequisites: string[]
  choices: StoryChoice[]
  outcomes: StoryOutcome[]
  scenes: StoryScene[]
  emotionalArc: EmotionalSpectrum
  karmicWeight: number
}

export interface StoryChoice {
  id: string
  text: string
  consequences: string[]
  requirements: ChoiceRequirement[]
  unlocks: string[]
}

export interface ChoiceRequirement {
  type: 'health' | 'knowledge' | 'ritual' | 'synchronization'
  target: string | number
  minimum: boolean | number
}

export interface StoryOutcome {
  id: string
  description: string
  leadsTo: string[]
  karmicPoints: number
  consciousnessShift: ConsciousnessLevel
  unlocks: string[]
}

export interface StoryScene {
  id: string
  description: string
  environment: SceneEnvironment
  entities: SceneEntity[]
  dialogue: SceneDialogue[]
  events: StoryEvent[]
}

export interface SceneEnvironment {
  setting: string
  atmosphere: string
  lighting: string
  sounds: string[]
  mysticalOverlays: string[]
}

export interface SceneEntity {
  name: string
  type: string
  appearance: string
  role: string
  speechStyle: string
}

export interface SceneDialogue {
  speaker: string
  line: string
  mysticalLayer: string
  emotionalTone: EmotionType
}

export interface StoryEvent {
  id: string
  type: 'mystery' | 'challenge' | 'revelation' | 'union' | 'transformation'
  description: string
  triggers: string[]
  outcomes: StoryOutcome[]
}

export interface TeachingContent {
  basic: TeachingLevel
  intermediate: TeachingLevel
  advanced: TeachingLevel
  master: TeachingLevel
  cosmic: TeachingLevel
}

export interface TeachingLevel {
  explanations: TeachingExplanation[]
  exercises: TeachingExercise[]
  meditations: MeditationGuide[]
  integrations: IntegrationPractice[]
}

export interface TeachingExplanation {
  concept: string
  analogy: string
  examples: string[]
  connections: string[]
}

export interface TeachingExercise {
  name: string
  steps: string[]
  duration: number // minutes
  materials: string[]
  goals: string[]
}

export interface IntegrationPractice {
  name: string
  purpose: string
  protocols: string[]
  duration: string
  frequency: string
  measurements: string[]
}

export interface MysticalPuzzle {
  id: string
  type: 'mandala' | 'geometry' | 'numerology' | 'rhythm' | 'vision'
  difficulty: number
  solution: string[]
  hints: string[]
  rewards: PuzzleReward[]
  connectedNodes: string[]
}

export interface PuzzleReward {
  type: 'knowledge' | 'energy' | 'health' | 'synchronization'
  target: string
  amount: number
  description: string
}

export interface AltarConfiguration {
  type: 'invocation' | 'banishment' | 'healing' | 'manifestation' | 'meditation'
  elements: AltarElement[]
  orientation: string
  sacredGeometry: string
  activation: string
}

export interface AltarElement {
  item: string
  position: string
  purpose: string
  charged: boolean
}

export interface RitualData {
  name: string
  type: string
  duration: number
  participants: number
  requirements: RitualRequirement[]
  steps: RitualStep[]
  outcomes: string[]
  warnings: string[]
  masterRitual: boolean
}

export interface RitualStep {
  sequence: number
  instruction: string
  duration: number
  audio: string
  visualization: string
}

export interface FractalParameters {
  type: 'mandelbrot' | 'julia' | 'ifs' | 'lsystem' | 'dragon' | 'sierpinski'
  iterations: number
  scale: number
  rotation: number
  colorMapping: ColorMapping
  dimensions: number
  parameters: Record<string, number>
}

export interface ColorMapping {
  palette: string[]
  algorithm: 'linear' | 'spiral' | 'orbital'
  saturation: number
  brightness: number
  contrast: number
}

export interface GemConfiguration {
  type: string
  cut: 'round' | 'princess' | 'emerald' | 'marquise' | 'cabochon' | 'custom'
  color: string
  clarity: string
  carat: number
  settings: GemSetting[]
  energy: GemEnergy[]
}

export interface GemSetting {
  metal: string
  style: string
  position: string
}

export interface GemEnergy {
  property: string
  strength: number
  frequency: number
}

export interface SoundProfile {
  baseFrequency: number
  waveform: 'sine' | 'triangle' | 'sawtooth' | 'square' | 'custom'
  harmonics: HarmonicProfile[]
  envelope: EnvelopeData
  effects: EffectData[]
}

export interface HarmonicProfile {
  index: number
  amplitude: number
  phase: number
  detune: number
}

export interface EnvelopeData {
  attack: number
  decay: number
  sustain: number
  release: number
}

export interface EffectData {
  type: 'reverb' | 'delay' | 'chorus' | 'distortion' | 'phaser'
  parameters: Record<string, number>
}

export interface VisualProfile {
  baseColors: string[]
  gradients: GradientData[]
  animations: AnimationData[]
  overlays: OverlayData[]
  particleSystems: ParticleSystemData[]
}

export interface GradientData {
  colors: string[]
  direction: string
  speed: number
}

export interface AnimationData {
  type: 'rotation' | 'pulse' | 'wave' | 'spiral' | 'fractal'
  duration: number
  parameters: Record<string, any>
}

export interface OverlayData {
  texture: string
  opacity: number
  blend: string
  animation: string
}

export interface ParticleSystemData {
  count: number
  colors: string[]
  size: number
  speed: number
  lifetime: number
  shape: 'sphere' | 'cone' | 'ring' | 'random'
}

// Collection & System Types
export interface NodeRegistry {
  nodes: Map<string, MysticalNode>
  hierarchies: NodeHierarchy[]
  synchronization: SynchronizationSystem
  healthMonitor: HealthMonitor
  navigationMap: NavigationMap
  storyEngine: StoryEngine
}

export interface NodeHierarchy {
  id: string
  root: string
  relationships: RelationshipData[]
  syncPriority: number
}

export interface RelationshipData {
  parent: string
  child: string
  relationship: 'contains' | 'connects' | 'influences' | 'manifests' | 'blocks'
  strength: number
}

export interface SynchronizationSystem {
  syncPairs: string[][]
  globalResonance: number
  lastGlobalSync: Date
  syncHistory: SyncEvent[]
}

export interface SyncEvent {
  timestamp: Date
  nodes: string[]
  resonanceAchieved: number
  duration: number
  initiator: string
}

export interface HealthMonitor {
  nodes: Map<string, NodeHealth>
  alerts: HealthAlert[]
  healingProtocols: HealingProtocol[]
  severityLevels: SeverityLevel[]
}

export interface HealthAlert {
  nodeId: string
  type: 'critical' | 'warning' | 'info'
  message: string
  timestamp: Date
  resolved: boolean
  resolution: string
}

export interface HealingProtocol {
  id: string
  name: string
  requirements: string[]
  steps: string[]
  duration: number
  effectiveness: number
  applied: Date[]
}

export interface SeverityLevel {
  code: 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN'
  threshold: number
  description: string
  actions: string[]
}

export interface NavigationMap {
  regions: MapRegion[]
  paths: MapPath[]
  landmarks: MapLandmark[]
  coordinates: MapCoordinate[]
}

export interface MapRegion {
  id: string
  name: string
  boundaries: MapCoordinate[]
  category: string
  difficulty: number
  rewards: string[]
}

export interface MapPath {
  from: MapCoordinate
  to: MapCoordinate
  type: 'primary' | 'hidden' | 'challenge' | 'reward'
  requirements: string[]
  hazards: string[]
}

export interface MapLandmark {
  id: string
  position: MapCoordinate
  type: 'gate' | 'altar' | 'library' | 'temple' | 'prison' | 'portal'
  significance: string
  guards: string[]
  unlocks: string[]
}

export interface MapCoordinate {
  x: number
  y: number
  z: number
  realm: string
}

export interface StoryEngine {
  activeStories: Map<string, ActiveStory>
  storyLibrary: Map<string, StoryBranch>
  playerChoices: Map<string, string[]>
  karmicBalance: number
  progressMarkers: ProgressMarker[]
}

export interface ActiveStory {
  branchId: string
  currentScene: string
  progress: number
  choicesMade: string[]
  unlockedPaths: string[]
}

export interface ProgressMarker {
  location: string
  achievement: string
  unlocks: string[]
  timestamp: Date
}
