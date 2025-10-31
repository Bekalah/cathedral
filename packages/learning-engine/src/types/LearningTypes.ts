/**
 * @cathedral/learning-engine
 * Type definitions for the educational 3D graphics learning system
 */

import * as THREE from 'three';

// Core learning progression types
export interface LearningProgress {
  userId: string;
  topicId: string;
  currentLevel: number;
  experiencePoints: number;
  masteryScore: number; // 0-100
  timeSpent: number; // milliseconds
  lastAccessed: Date;
  learningPath: LearningNode[];
  achievements: Achievement[];
}

export interface LearningNode {
  id: string;
  title: string;
  description: string;
  difficulty: LearningDifficulty;
  prerequisites: string[];
  learningObjectives: LearningObjective[];
  estimatedDuration: number; // minutes
  content: LearningContent;
  assessment?: AssessmentCriteria;
}

export interface LearningObjective {
  id: string;
  description: string;
  type: ObjectiveType;
  criteria: string[];
  weight: number; // for scoring
}

export interface LearningContent {
  type: ContentType;
  data: EducationalGraphicsData | InteractiveTutorialData | AssessmentData;
  metadata: ContentMetadata;
}

export interface ContentMetadata {
  version: string;
  createdBy: string;
  tags: string[];
  language: string;
  accessibilityLevel: AccessibilityLevel;
}

// Graphics and 3D content types
export interface EducationalGraphicsData {
  sceneConfig: THREE.Scene;
  geometries: SacredGeometry[];
  materials: MysticalMaterial[];
  animations: LearningAnimation[];
  interactiveElements: InteractiveElement[];
  lightingSetup: LightingConfiguration;
  cameraPositions: CameraPosition[];
  harmonicRatios: HarmonicRatio[];
}

export interface SacredGeometry {
  type: GeometryType;
  parameters: Record<string, number>;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  materialId: string;
  animationId?: string;
  interactive: boolean;
}

export interface MysticalMaterial {
  id: string;
  type: MaterialType;
  color: THREE.Color;
  opacity: number;
  emissive: THREE.Color;
  metalness: number;
  roughness: number;
  transmission: number;
  mysticalProperties: MysticalProperties;
}

export interface MysticalProperties {
  resonance: number; // 0-1
  frequency: number; // Hz
  sacredRatio: HarmonicRatio;
  energyLevel: number; // 0-1
  consciousnessAlignment: number; // 0-1
}

export interface LearningAnimation {
  id: string;
  targetId: string; // geometry or material ID
  type: AnimationType;
  duration: number;
  easing: string;
  keyframes: Keyframe[];
  triggers: AnimationTrigger[];
}

export interface Keyframe {
  time: number; // 0-1
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
  color?: THREE.Color;
  opacity?: number;
  intensity?: number;
}

export interface AnimationTrigger {
  event: TriggerEvent;
  condition?: string;
  delay?: number;
}

// Accessibility and safety types
export interface AccessibilityInfo {
  screenReader: boolean;
  keyboardNavigation: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  colorBlindSupport: boolean;
  alternativeText: string[];
  focusIndicators: boolean;
  timeoutAdjustments: boolean;
}

export interface InteractiveElement {
  id: string;
  type: InteractionType;
  geometryId: string;
  position: THREE.Vector3;
  bounds: THREE.Box3;
  actions: InteractionAction[];
  feedback: InteractionFeedback;
  accessibility: AccessibilityInfo;
}

export interface InteractionAction {
  type: ActionType;
  parameters: Record<string, any>;
  response: string;
  learningImpact: LearningImpact;
}

export interface InteractionFeedback {
  visual: VisualFeedback;
  audio: AudioFeedback;
  haptic: HapticFeedback;
  progress: ProgressFeedback;
}

export interface VisualFeedback {
  highlightColor: THREE.Color;
  glowIntensity: number;
  particleEffect?: ParticleEffect;
  animation?: string;
}

export interface AudioFeedback {
  soundId?: string;
  frequency?: number;
  volume: number;
  duration: number;
}

export interface HapticFeedback {
  pattern: number[];
  intensity: number;
  duration: number;
}

export interface ProgressFeedback {
  showScore: boolean;
  showHints: boolean;
  encouragement: string[];
  nextSteps: string[];
}

export interface LearningImpact {
  experienceGain: number;
  masteryIncrease: number;
  hintLevel: number;
  conceptReinforcement: string[];
}

// Tutorial and interaction types
export interface InteractiveTutorialData {
  steps: TutorialStep[];
  navigation: TutorialNavigation;
  hints: TutorialHint[];
  checkpoints: TutorialCheckpoint[];
  completionCriteria: CompletionCriteria;
}

export interface TutorialStep {
  id: string;
  title: string;
  instruction: string;
  visualGuide: VisualGuide;
  interaction: StepInteraction;
  validation: StepValidation;
  feedback: StepFeedback;
  duration: number;
}

export interface VisualGuide {
  highlightElements: string[];
  overlayText?: string;
  arrows: ArrowGuide[];
  animations: string[];
}

export interface ArrowGuide {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: THREE.Color;
  animation: string;
}

export interface StepInteraction {
  type: InteractionType;
  required: boolean;
  timeout?: number;
  retryLimit?: number;
}

export interface StepValidation {
  criteria: ValidationCriteria[];
  successThreshold: number;
  strictMode: boolean;
}

export interface ValidationCriteria {
  type: ValidationType;
  target: string;
  operator: ComparisonOperator;
  value: any;
  tolerance?: number;
}

export interface StepFeedback {
  success: FeedbackMessage;
  failure: FeedbackMessage;
  hint: FeedbackMessage;
  encouragement: string[];
}

export interface FeedbackMessage {
  text: string;
  audio?: string;
  visual?: string;
  duration: number;
}

export interface TutorialNavigation {
  allowSkip: boolean;
  allowBacktrack: boolean;
  autoAdvance: boolean;
  pauseOnError: boolean;
}

export interface TutorialHint {
  id: string;
  trigger: HintTrigger;
  content: string;
  visualAid?: string;
  delay: number;
  persistence: number;
}

export interface HintTrigger {
  event: string;
  condition?: string;
  probability: number;
}

export interface TutorialCheckpoint {
  id: string;
  stepId: string;
  saveState: boolean;
  validationRequired: boolean;
  reward?: Reward;
}

export interface CompletionCriteria {
  minScore: number;
  maxTime?: number;
  requiredSteps: string[];
  optionalSteps?: string[];
}

// Assessment types
export interface AssessmentData {
  questions: AssessmentQuestion[];
  configuration: AssessmentConfiguration;
  scoring: AssessmentScoring;
  feedback: AssessmentFeedback;
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: QuestionOption[];
  correctAnswer: any;
  explanation: string;
  difficulty: LearningDifficulty;
  tags: string[];
  timeLimit?: number;
  hints: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
  value: any;
  isCorrect: boolean;
  explanation?: string;
}

export interface AssessmentConfiguration {
  randomizeOrder: boolean;
  allowReview: boolean;
  showResults: boolean;
  timeLimit?: number;
  attemptsAllowed: number;
  passingScore: number;
}

export interface AssessmentScoring {
  pointsPerQuestion: number;
  penaltyPerAttempt: number;
  bonusForSpeed: boolean;
  curveGrading: boolean;
}

export interface AssessmentFeedback {
  showCorrectAnswers: boolean;
  detailedExplanations: boolean;
  personalizedHints: boolean;
  progressTracking: boolean;
}

// Learning progression and adaptation
export interface AdaptiveLearningProfile {
  userId: string;
  learningStyle: LearningStyle;
  preferences: LearningPreferences;
  strengths: string[];
  challenges: string[];
  paceMultiplier: number;
  difficultyAdjustment: number;
  contentPreferences: ContentPreferences;
  accessibilityNeeds: AccessibilityNeeds;
}

export interface LearningStyle {
  visual: number; // 0-1
  auditory: number;
  kinesthetic: number;
  reading: number;
  social: number;
  solitary: number;
}

export interface LearningPreferences {
  pace: LearningPace;
  complexity: ComplexityPreference;
  interaction: InteractionPreference;
  feedback: FeedbackPreference;
  repetition: RepetitionPreference;
}

export interface ContentPreferences {
  topics: string[];
  formats: ContentType[];
  duration: DurationPreference;
  depth: DepthPreference;
}

export interface AccessibilityNeeds {
  visual: VisualAccessibility;
  auditory: AuditoryAccessibility;
  motor: MotorAccessibility;
  cognitive: CognitiveAccessibility;
}

// Camera and lighting configuration
export interface CameraPosition {
  id: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  near: number;
  far: number;
  animation?: CameraAnimation;
}

export interface CameraAnimation {
  duration: number;
  easing: string;
  waypoints: THREE.Vector3[];
}

export interface LightingConfiguration {
  ambient: AmbientLightConfig;
  directional: DirectionalLightConfig[];
  point: PointLightConfig[];
  spot: SpotLightConfig[];
  mystical: MysticalLightConfig[];
}

export interface AmbientLightConfig {
  color: THREE.Color;
  intensity: number;
  mysticalAlignment: number;
}

export interface DirectionalLightConfig {
  color: THREE.Color;
  intensity: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
  castShadow: boolean;
  shadowMapSize: number;
  mysticalProperties: MysticalProperties;
}

export interface PointLightConfig {
  color: THREE.Color;
  intensity: number;
  position: THREE.Vector3;
  distance: number;
  decay: number;
  mysticalProperties: MysticalProperties;
}

export interface SpotLightConfig {
  color: THREE.Color;
  intensity: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
  angle: number;
  penumbra: number;
  distance: number;
  decay: number;
  mysticalProperties: MysticalProperties;
}

export interface MysticalLightConfig {
  type: MysticalLightType;
  frequency: number;
  resonance: number;
  sacredRatio: HarmonicRatio;
  consciousnessField: ConsciousnessField;
}

export interface ConsciousnessField {
  strength: number;
  radius: number;
  frequency: number;
  harmony: number;
}

// Harmonic and mystical systems
export interface HarmonicRatio {
  numerator: number;
  denominator: number;
  ratio: number;
  fibonacciIndex: number;
  mysticalSignificance: string;
  applications: string[];
}

export interface ParticleEffect {
  type: ParticleType;
  count: number;
  size: number;
  color: THREE.Color;
  lifetime: number;
  velocity: THREE.Vector3;
  spread: number;
  mysticalAlignment: number;
}

// Enums and constants
export enum LearningDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum ContentType {
  GRAPHICS_3D = 'graphics_3d',
  INTERACTIVE_TUTORIAL = 'interactive_tutorial',
  ASSESSMENT = 'assessment',
  DEMONSTRATION = 'demonstration',
  EXPLORATION = 'exploration'
}

export enum ObjectiveType {
  KNOWLEDGE = 'knowledge',
  SKILL = 'skill',
  ATTITUDE = 'attitude',
  BEHAVIOR = 'behavior'
}

export enum GeometryType {
  PLATONIC_SOLID = 'platonic_solid',
  SACRED_GEOMETRY = 'sacred_geometry',
  FRACTAL = 'fractal',
  TORUS = 'torus',
  SPHERE = 'sphere',
  CUSTOM = 'custom'
}

export enum MaterialType {
  MYSTICAL_METAL = 'mystical_metal',
  CONSCIOUSNESS_GLOW = 'consciousness_glow',
  HARMONIC_CRYSTAL = 'harmonic_crystal',
  ENERGY_FIELD = 'energy_field',
  SACRED_LIGHT = 'sacred_light'
}

export enum AnimationType {
  ROTATION = 'rotation',
  TRANSLATION = 'translation',
  SCALE = 'scale',
  COLOR_SHIFT = 'color_shift',
  MORPH = 'morph',
  SPIRAL = 'spiral',
  PULSATION = 'pulsation'
}

export enum TriggerEvent {
  ON_CLICK = 'on_click',
  ON_HOVER = 'on_hover',
  ON_COMPLETE = 'on_complete',
  ON_PROGRESS = 'on_progress',
  ON_TIME = 'on_time'
}

export enum InteractionType {
  DRAG_DROP = 'drag_drop',
  CLICK_SELECT = 'click_select',
  DRAW_TRACE = 'draw_trace',
  VOICE_COMMAND = 'voice_command',
  GESTURE = 'gesture'
}

export enum ActionType {
  TRANSFORM = 'transform',
  COMBINE = 'combine',
  SEPARATE = 'separate',
  MEASURE = 'measure',
  COMPARE = 'compare'
}

export enum ValidationType {
  POSITION = 'position',
  DISTANCE = 'distance',
  ANGLE = 'angle',
  COUNT = 'count',
  SEQUENCE = 'sequence'
}

export enum ComparisonOperator {
  EQUALS = 'equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  WITHIN_RANGE = 'within_range',
  CONTAINS = 'contains'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  DRAG_DROP = 'drag_drop',
  SEQUENCE = 'sequence',
  MATCHING = 'matching'
}

export enum LearningPace {
  SLOW = 'slow',
  MODERATE = 'moderate',
  FAST = 'fast',
  ADAPTIVE = 'adaptive'
}

export enum ComplexityPreference {
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  DYNAMIC = 'dynamic'
}

export enum InteractionPreference {
  MINIMAL = 'minimal',
  MODERATE = 'moderate',
  HIGH = 'high',
  IMMERSIVE = 'immersive'
}

export enum FeedbackPreference {
  IMMEDIATE = 'immediate',
  DELAYED = 'delayed',
  ON_REQUEST = 'on_request',
  MINIMAL = 'minimal'
}

export enum RepetitionPreference {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  SPACED = 'spaced'
}

export enum DurationPreference {
  SHORT = 'short', // 5-15 minutes
  MEDIUM = 'medium', // 15-30 minutes
  LONG = 'long', // 30-60 minutes
  EXTENDED = 'extended' // 60+ minutes
}

export enum DepthPreference {
  OVERVIEW = 'overview',
  DETAILED = 'detailed',
  COMPREHENSIVE = 'comprehensive',
  EXPERT = 'expert'
}

export enum AccessibilityLevel {
  A = 'A', // WCAG Level A
  AA = 'AA', // WCAG Level AA
  AAA = 'AAA' // WCAG Level AAA
}

export enum VisualAccessibility {
  NORMAL = 'normal',
  HIGH_CONTRAST = 'high_contrast',
  LARGE_TEXT = 'large_text',
  COLOR_BLIND_FRIENDLY = 'color_blind_friendly'
}

export enum AuditoryAccessibility {
  NORMAL = 'normal',
  SUBTITLES = 'subtitles',
  SIGN_LANGUAGE = 'sign_language',
  TEXT_TO_SPEECH = 'text_to_speech'
}

export enum MotorAccessibility {
  NORMAL = 'normal',
  LARGE_TARGETS = 'large_targets',
  VOICE_CONTROL = 'voice_control',
  SWITCH_ACCESS = 'switch_access'
}

export enum CognitiveAccessibility {
  NORMAL = 'normal',
  SIMPLIFIED_LANGUAGE = 'simplified_language',
  BREAKS_PROVIDED = 'breaks_provided',
  MULTI_MODAL = 'multi_modal'
}

export enum ParticleType {
  SPARK = 'spark',
  GLOW = 'glow',
  ENERGY = 'energy',
  CONSCIOUSNESS = 'consciousness',
  HARMONIC = 'harmonic'
}

export enum MysticalLightType {
  CONSCIOUSNESS_FIELD = 'consciousness_field',
  SACRED_FLAME = 'sacred_flame',
  HARMONIC_RESONANCE = 'harmonic_resonance',
  ENERGY_VORTEX = 'energy_vortex'
}

// Assessment criteria and rewards
export interface AssessmentCriteria {
  type: AssessmentType;
  weight: number;
  passingScore: number;
  timeLimit?: number;
  retryLimit?: number;
}

export enum AssessmentType {
  QUIZ = 'quiz',
  PRACTICAL = 'practical',
  PROJECT = 'project',
  PRESENTATION = 'presentation',
  PEER_REVIEW = 'peer_review'
}

export interface Reward {
  type: RewardType;
  value: number;
  description: string;
  unlockCriteria?: string[];
}

export enum RewardType {
  EXPERIENCE_POINTS = 'experience_points',
  ACHIEVEMENT = 'achievement',
  UNLOCK_CONTENT = 'unlock_content',
  VIRTUAL_ITEM = 'virtual_item',
  CERTIFICATE = 'certificate'
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  unlockedAt: Date;
  progress?: number;
  maxProgress?: number;
}

export enum AchievementRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

// Error handling and safety
export interface LearningError {
  code: string;
  message: string;
  severity: ErrorSeverity;
  context: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface SafetyConfiguration {
  maxSessionTime: number;
  breakReminders: boolean;
  contentWarnings: string[];
  emergencyExits: boolean;
  traumaInformed: boolean;
  accessibilityCompliance: AccessibilityLevel;
}

// Configuration and settings
export interface LearningEngineConfiguration {
  graphics: GraphicsConfiguration;
  interaction: InteractionConfiguration;
  assessment: AssessmentConfiguration;
  adaptation: AdaptationConfiguration;
  safety: SafetyConfiguration;
  integration: IntegrationConfiguration;
}

export interface GraphicsConfiguration {
  quality: GraphicsQuality;
  performance: PerformanceSettings;
  accessibility: GraphicsAccessibility;
  mystical: MysticalSettings;
}

export enum GraphicsQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra'
}

export interface PerformanceSettings {
  targetFPS: number;
  maxParticles: number;
  shadowQuality: ShadowQuality;
  antiAliasing: boolean;
}

export enum ShadowQuality {
  OFF = 'off',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface GraphicsAccessibility {
  colorBlindSupport: boolean;
  motionSensitivity: boolean;
  textScaling: number;
  contrastEnhancement: boolean;
}

export interface MysticalSettings {
  harmonicRatios: HarmonicRatio[];
  consciousnessAlignment: boolean;
  sacredGeometry: boolean;
  energyVisualization: boolean;
}

export interface InteractionConfiguration {
  inputMethods: InputMethod[];
  feedbackIntensity: FeedbackIntensity;
  timeoutSettings: TimeoutSettings;
  retrySettings: RetrySettings;
}

export enum InputMethod {
  MOUSE = 'mouse',
  TOUCH = 'touch',
  VOICE = 'voice',
  GESTURE = 'gesture',
  KEYBOARD = 'keyboard'
}

export enum FeedbackIntensity {
  MINIMAL = 'minimal',
  MODERATE = 'moderate',
  RICH = 'rich',
  IMMERSIVE = 'immersive'
}

export interface TimeoutSettings {
  defaultTimeout: number;
  warningTime: number;
  gracePeriod: number;
}

export interface RetrySettings {
  maxAttempts: number;
  backoffStrategy: BackoffStrategy;
  hintDelay: number;
}

export enum BackoffStrategy {
  IMMEDIATE = 'immediate',
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  FIBONACCI = 'fibonacci'
}

export interface AdaptationConfiguration {
  sensitivity: AdaptationSensitivity;
  updateFrequency: number;
  dataRetention: number;
  privacyLevel: PrivacyLevel;
}

export enum AdaptationSensitivity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  DYNAMIC = 'dynamic'
}

export enum PrivacyLevel {
  ANONYMOUS = 'anonymous',
  PSEUDONYMOUS = 'pseudonymous',
  IDENTIFIED = 'identified',
  PERSONAL = 'personal'
}

export interface IntegrationConfiguration {
  threeJs: ThreeJsIntegration;
  synthesis: SynthesisIntegration;
  audio: AudioIntegration;
  haptics: HapticsIntegration;
}

export interface ThreeJsIntegration {
  version: string;
  features: string[];
  compatibility: CompatibilityLevel;
}

export enum CompatibilityLevel {
  FULL = 'full',
  PARTIAL = 'partial',
  MINIMAL = 'minimal',
  NONE = 'none'
}

export interface SynthesisIntegration {
  fusionMechanics: boolean;
  progressionSystem: boolean;
  mysticalPatterns: boolean;
  harmonicRatios: boolean;
}

export interface AudioIntegration {
  spatialAudio: boolean;
  mysticalSounds: boolean;
  adaptiveMusic: boolean;
  voiceSynthesis: boolean;
}

export interface HapticsIntegration {
  vibrationPatterns: boolean;
  forceFeedback: boolean;
  mysticalResonance: boolean;
  biofeedback: boolean;
}

// Event system
export interface LearningEvent {
  type: LearningEventType;
  userId: string;
  sessionId: string;
  timestamp: Date;
  data: Record<string, any>;
}

export enum LearningEventType {
  SESSION_START = 'session_start',
  SESSION_END = 'session_end',
  STEP_COMPLETE = 'step_complete',
  ASSESSMENT_START = 'assessment_start',
  ASSESSMENT_COMPLETE = 'assessment_complete',
  PROGRESS_UPDATE = 'progress_update',
  ACHIEVEMENT_UNLOCK = 'achievement_unlock',
  HINT_REQUEST = 'hint_request',
  ERROR_OCCURRED = 'error_occurred'
}

// Export utility types
export type LearningPath = LearningNode[];
export type UserProgress = Map<string, LearningProgress>;
export type ContentLibrary = Map<string, LearningContent>;
export type AssessmentResults = Map<string, AssessmentData>;