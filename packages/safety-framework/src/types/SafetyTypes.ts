/**
 * Comprehensive Safety Framework Types
 * Defines all interfaces and types for trauma-informed content delivery and user protection
 */

// Core Safety Enums
export enum SafetyLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal'
}

export enum ContentIntensity {
  VERY_MILD = 'very_mild',
  MILD = 'mild',
  MODERATE = 'moderate',
  INTENSE = 'intense',
  VERY_INTENSE = 'very_intense',
  EXTREME = 'extreme'
}

export enum TriggerCategory {
  VIOLENCE = 'violence',
  SEXUAL_CONTENT = 'sexual_content',
  TRAUMA = 'trauma',
  SUBSTANCE_USE = 'substance_use',
  MENTAL_HEALTH = 'mental_health',
  PHYSICAL_HARM = 'physical_harm',
  EMOTIONAL_DISTRESS = 'emotional_distress',
  CULTURAL_SENSITIVITY = 'cultural_sensitivity',
  SPIRITUAL_CONTENT = 'spiritual_content',
  DEATH_LOSS = 'death_loss'
}

export enum UserRiskLevel {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ConsentStatus {
  NOT_GIVEN = 'not_given',
  PENDING = 'pending',
  GRANTED = 'granted',
  WITHDRAWN = 'withdrawn',
  EXPIRED = 'expired'
}

export enum SessionStatus {
  INITIALIZING = 'initializing',
  ACTIVE = 'active',
  PAUSED = 'paused',
  SAFE_WORD_TRIGGERED = 'safe_word_triggered',
  EMERGENCY_STOP = 'emergency_stop',
  COMPLETED = 'completed',
  TERMINATED = 'terminated'
}

// Core Safety Interfaces
export interface SafetyConfiguration {
  readonly maxContentIntensity: ContentIntensity;
  readonly requireTriggerWarnings: boolean;
  readonly enableRealTimeFiltering: boolean;
  readonly emergencyStopEnabled: boolean;
  readonly sessionTimeoutMinutes: number;
  readonly safetyCheckIntervalSeconds: number;
  readonly enableDetailedLogging: boolean;
  readonly culturalSensitivityLevel: SafetyLevel;
  readonly ageAppropriateFiltering: boolean;
  readonly neurodiversityAccommodations: boolean;
}

export interface UserSafetyProfile {
  readonly userId: string;
  readonly riskLevel: UserRiskLevel;
  readonly triggerCategories: TriggerCategory[];
  readonly contentPreferences: ContentPreference[];
  readonly boundaries: UserBoundary[];
  readonly emergencyContacts: EmergencyContact[];
  readonly accessibilityNeeds: AccessibilityRequirement[];
  readonly culturalBackground: CulturalProfile;
  readonly ageVerification?: AgeVerification;
  readonly consentStatus: ConsentStatus;
  readonly lastUpdated: Date;
  readonly createdAt: Date;
}

export interface ContentPreference {
  readonly category: TriggerCategory;
  readonly maxIntensity: ContentIntensity;
  readonly requiresWarning: boolean;
  readonly completelyBlocked: boolean;
  readonly customNotes?: string;
}

export interface UserBoundary {
  readonly boundaryType: 'hard' | 'soft' | 'negotiable';
  readonly description: string;
  readonly consequences: BoundaryViolationAction[];
  readonly monitoringEnabled: boolean;
}

export interface BoundaryViolationAction {
  readonly action: 'warning' | 'pause' | 'stop' | 'terminate';
  readonly message: string;
  readonly requiresUserConfirmation: boolean;
}

export interface EmergencyContact {
  readonly name: string;
  readonly relationship: string;
  readonly contactInfo: string;
  readonly notificationTriggers: SessionStatus[];
}

export interface AccessibilityRequirement {
  readonly requirementType: 'visual' | 'auditory' | 'cognitive' | 'motor' | 'sensory';
  readonly description: string;
  readonly accommodations: string[];
  readonly priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CulturalProfile {
  readonly primaryCulture: string;
  readonly secondaryCultures: string[];
  readonly religiousBackground?: string;
  readonly spiritualPractices: string[];
  readonly culturalSensitivityPreferences: CulturalSensitivity[];
  readonly languagePreferences: string[];
}

export interface CulturalSensitivity {
  readonly topic: string;
  readonly sensitivityLevel: SafetyLevel;
  readonly requiresConsultation: boolean;
  readonly alternativeApproaches: string[];
}

export interface AgeVerification {
  readonly verified: boolean;
  readonly age: number;
  readonly verificationMethod: 'self_declared' | 'document' | 'biometric' | 'parental';
  readonly verifiedAt: Date;
  readonly expiresAt?: Date;
}

// Content Analysis and Filtering
export interface ContentAnalysis {
  readonly contentId: string;
  readonly originalContent: string;
  readonly filteredContent?: string;
  readonly triggerWarnings: TriggerWarning[];
  readonly contentIntensity: ContentIntensity;
  readonly riskAssessment: ContentRiskAssessment;
  readonly culturalSensitivityFlags: CulturalSensitivityFlag[];
  readonly ageRating: AgeRating;
  readonly accessibilityImpact: AccessibilityImpact[];
  readonly analyzedAt: Date;
  readonly analyzerVersion: string;
}

export interface TriggerWarning {
  readonly category: TriggerCategory;
  readonly severity: SafetyLevel;
  readonly description: string;
  readonly timestamp: number;
  readonly duration?: number;
  readonly alternatives?: string[];
}

export interface ContentRiskAssessment {
  readonly overallRisk: UserRiskLevel;
  readonly categoryRisks: Record<TriggerCategory, UserRiskLevel>;
  readonly traumaIndicators: TraumaIndicator[];
  readonly protectiveFactors: string[];
  readonly recommendedActions: SafetyAction[];
}

export interface TraumaIndicator {
  readonly indicator: string;
  readonly confidence: number;
  readonly context: string;
  readonly mitigatingFactors?: string[];
}

export interface CulturalSensitivityFlag {
  readonly culture: string;
  readonly sensitivityLevel: SafetyLevel;
  readonly concern: string;
  readonly recommendation: string;
  readonly requiresExpertReview: boolean;
}

export interface AgeRating {
  readonly rating: string;
  readonly minimumAge: number;
  readonly warnings: string[];
  readonly regionalVariations: Record<string, string>;
}

export interface AccessibilityImpact {
  readonly accessibilityType: string;
  readonly impactLevel: 'none' | 'mild' | 'moderate' | 'severe' | 'prohibitive';
  readonly description: string;
  readonly alternatives: string[];
  readonly requiresAccommodation: boolean;
}

// Session Management
export interface SafetySession {
  readonly sessionId: string;
  readonly userId: string;
  readonly status: SessionStatus;
  readonly startTime: Date;
  readonly lastActivity: Date;
  readonly endTime?: Date;
  readonly safetyConfiguration: SafetyConfiguration;
  readonly activeFilters: ContentFilter[];
  readonly safetyCheckpoints: SafetyCheckpoint[];
  readonly violations: SafetyViolation[];
  readonly emergencyActions: EmergencyAction[];
  readonly userFeedback: UserFeedback[];
}

export interface SafetyCheckpoint {
  readonly timestamp: Date;
  readonly checkpointType: 'scheduled' | 'event_triggered' | 'user_requested';
  readonly userState: UserStateAssessment;
  readonly contentState: ContentState;
  readonly recommendations: string[];
  readonly actionsTaken: string[];
}

export interface UserStateAssessment {
  readonly emotionalState: 'calm' | 'agitated' | 'distressed' | 'overwhelmed' | 'crisis';
  readonly engagementLevel: 'disengaged' | 'passive' | 'active' | 'intense' | 'overwhelmed';
  readonly comfortLevel: number; // 1-10 scale
  readonly stressIndicators: string[];
  readonly copingResources: string[];
}

export interface ContentState {
  readonly currentIntensity: ContentIntensity;
  readonly activeTriggers: TriggerWarning[];
  readonly userEngagement: number; // 1-10 scale
  readonly pacing: 'too_slow' | 'appropriate' | 'too_fast';
  readonly comprehensionLevel: 'low' | 'moderate' | 'high';
}

export interface SafetyViolation {
  readonly timestamp: Date;
  readonly violationType: 'boundary' | 'intensity' | 'trigger' | 'consent' | 'timeout';
  readonly severity: SafetyLevel;
  readonly description: string;
  readonly context: string;
  readonly automaticAction?: BoundaryViolationAction;
  readonly userNotified: boolean;
  readonly resolved: boolean;
}

export interface EmergencyAction {
  readonly timestamp: Date;
  readonly trigger: 'safe_word' | 'automatic_detection' | 'user_request' | 'system_error';
  readonly action: 'pause' | 'stop' | 'terminate' | 'contact_emergency' | 'professional_help';
  readonly reason: string;
  readonly notificationsSent: string[];
  readonly followUpRequired: boolean;
}

export interface UserFeedback {
  readonly timestamp: Date;
  readonly feedbackType: 'comfort' | 'intensity' | 'triggers' | 'suggestions' | 'complaints';
  readonly rating: number; // 1-5 scale
  readonly comments?: string;
  readonly anonymous: boolean;
}

// Content Filtering System
export interface ContentFilter {
  readonly filterId: string;
  readonly name: string;
  readonly description: string;
  readonly filterType: 'keyword' | 'pattern' | 'semantic' | 'contextual' | 'cultural' | 'age_based';
  readonly isActive: boolean;
  readonly priority: number;
  readonly configuration: FilterConfiguration;
  readonly createdAt: Date;
  readonly lastUpdated: Date;
}

export interface FilterConfiguration {
  readonly sensitivityLevel: SafetyLevel;
  readonly customRules?: FilterRule[];
  readonly whitelist?: string[];
  readonly blacklist?: string[];
  readonly contextWindow: number;
  readonly realTimeProcessing: boolean;
}

export interface FilterRule {
  readonly ruleId: string;
  readonly pattern: string;
  readonly action: 'filter' | 'warn' | 'block' | 'replace' | 'redirect';
  readonly conditions: RuleCondition[];
  readonly replacement?: string;
  readonly warningMessage?: string;
}

export interface RuleCondition {
  readonly conditionType: 'context' | 'frequency' | 'intensity' | 'user_state' | 'time_based';
  readonly operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'regex';
  readonly value: string | number | boolean;
}

// Trauma-Informed Engine Types
export interface TraumaInformedConfiguration {
  readonly pacingStrategy: 'gradual' | 'user_controlled' | 'adaptive' | 'conservative';
  readonly intensityRamping: IntensityRampConfiguration;
  readonly safeWordMechanism: SafeWordConfiguration;
  readonly groundingTechniques: GroundingTechnique[];
  readonly aftercareProtocols: AftercareProtocol[];
  readonly integrationSupport: IntegrationSupport;
}

export interface IntensityRampConfiguration {
  readonly initialLevel: ContentIntensity;
  readonly maxRampPerSession: number; // percentage increase
  readonly rampIntervalMinutes: number;
  readonly userControlledRamping: boolean;
  readonly automaticReductionTriggers: string[];
}

export interface SafeWordConfiguration {
  readonly safeWords: string[];
  readonly customSafeWords?: string[];
  readonly immediateAction: 'pause' | 'stop' | 'custom';
  readonly confirmationRequired: boolean;
  readonly notificationTriggers: string[];
}

export interface GroundingTechnique {
  readonly techniqueId: string;
  readonly name: string;
  readonly description: string;
  readonly category: 'breathing' | 'sensory' | 'cognitive' | 'physical' | 'spiritual';
  readonly durationMinutes: number;
  readonly instructions: string[];
  readonly accessibilityNotes?: string;
}

export interface AftercareProtocol {
  readonly protocolId: string;
  readonly name: string;
  readonly triggers: string[];
  readonly durationMinutes: number;
  readonly activities: AftercareActivity[];
  readonly checkInSchedule: CheckInSchedule[];
}

export interface AftercareActivity {
  readonly activityType: 'reflection' | 'journaling' | 'meditation' | 'discussion' | 'rest' | 'professional_referral';
  readonly description: string;
  readonly durationMinutes: number;
  readonly required: boolean;
  readonly resources?: string[];
}

export interface CheckInSchedule {
  readonly timeAfterSession: number; // minutes
  readonly checkInType: 'automated' | 'facilitated' | 'self_directed';
  readonly questions: string[];
  readonly required: boolean;
}

export interface IntegrationSupport {
  readonly integrationPeriodDays: number;
  readonly supportTypes: string[];
  readonly resourceRecommendations: ResourceRecommendation[];
  readonly followUpSessions: boolean;
  readonly communitySupport: boolean;
}

export interface ResourceRecommendation {
  readonly resourceType: 'article' | 'book' | 'video' | 'course' | 'professional' | 'community';
  readonly title: string;
  readonly description: string;
  readonly url?: string;
  readonly accessibilityNotes?: string;
}

// Safety Reporting and Analytics
export interface SafetyReport {
  readonly reportId: string;
  readonly reportType: 'session_summary' | 'violation_report' | 'user_feedback' | 'system_health' | 'trend_analysis';
  readonly timeRange: TimeRange;
  readonly generatedAt: Date;
  readonly data: SafetyMetrics;
  readonly insights: SafetyInsight[];
  readonly recommendations: string[];
}

export interface TimeRange {
  readonly start: Date;
  readonly end: Date;
  readonly timezone: string;
}

export interface SafetyMetrics {
  readonly totalSessions: number;
  readonly completedSessions: number;
  readonly terminatedSessions: number;
  readonly emergencyActions: number;
  readonly violationsByType: Record<string, number>;
  readonly userSatisfaction: number;
  readonly contentIntensityDistribution: Record<ContentIntensity, number>;
  readonly triggerWarningEffectiveness: number;
  readonly accessibilityCompliance: number;
}

export interface SafetyInsight {
  readonly insightType: 'trend' | 'risk' | 'improvement' | 'concern';
  readonly title: string;
  readonly description: string;
  readonly confidence: number;
  readonly actionable: boolean;
}

// Integration Types for External Engines
export interface EngineIntegration {
  readonly engineName: string;
  readonly integrationType: 'synthesis' | 'learning' | 'three_js' | 'custom';
  readonly safetyHooks: SafetyHook[];
  readonly validationRequirements: ValidationRequirement[];
  readonly fallbackBehavior: FallbackBehavior;
}

export interface SafetyHook {
  readonly hookType: 'pre_generation' | 'post_generation' | 'during_rendering' | 'user_interaction';
  readonly methodName: string;
  readonly parameters: Record<string, any>;
  readonly required: boolean;
}

export interface ValidationRequirement {
  readonly validationType: 'content_analysis' | 'user_state' | 'session_status' | 'accessibility';
  readonly validator: string;
  readonly parameters: Record<string, any>;
  readonly blocking: boolean;
}

export interface FallbackBehavior {
  readonly fallbackType: 'safe_default' | 'reduced_intensity' | 'alternative_content' | 'pause_session';
  readonly fallbackContent?: string;
  readonly userNotification: string;
  readonly loggingRequired: boolean;
}

// Error Handling and Logging
export interface SafetyError {
  readonly errorId: string;
  readonly timestamp: Date;
  readonly errorType: 'validation_failed' | 'filter_error' | 'user_safety' | 'system_error' | 'integration_error';
  readonly severity: SafetyLevel;
  readonly message: string;
  readonly context: Record<string, any>;
  readonly stackTrace?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly resolved: boolean;
  readonly resolution?: string;
}

export interface SafetyLogEntry {
  readonly timestamp: Date;
  readonly logLevel: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  readonly category: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency';
  readonly message: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly context: Record<string, any>;
  readonly metadata?: Record<string, any>;
}

// Export utility types
export type SafetyAction = 'continue' | 'warn' | 'pause' | 'stop' | 'terminate' | 'escalate';
export type FilterResult = 'pass' | 'warn' | 'block' | 'modify';
export type ValidationResult = 'valid' | 'warning' | 'invalid' | 'error';

// Type guards and utility functions
export interface TypeGuards {
  isValidSafetyLevel(level: string): level is SafetyLevel;
  isValidContentIntensity(intensity: string): intensity is ContentIntensity;
  isValidTriggerCategory(category: string): category is TriggerCategory;
  isValidUserRiskLevel(level: string): level is UserRiskLevel;
  isValidConsentStatus(status: string): status is ConsentStatus;
  isValidSessionStatus(status: string): status is SessionStatus;
}

// Configuration builders
export interface SafetyConfigurationBuilder {
  withMaxIntensity(intensity: ContentIntensity): SafetyConfigurationBuilder;
  withTriggerWarnings(required: boolean): SafetyConfigurationBuilder;
  withRealTimeFiltering(enabled: boolean): SafetyConfigurationBuilder;
  withEmergencyStop(enabled: boolean): SafetyConfigurationBuilder;
  withSessionTimeout(minutes: number): SafetyConfigurationBuilder;
  withSafetyCheckInterval(seconds: number): SafetyConfigurationBuilder;
  withDetailedLogging(enabled: boolean): SafetyConfigurationBuilder;
  withCulturalSensitivity(level: SafetyLevel): SafetyConfigurationBuilder;
  withAgeAppropriateFiltering(enabled: boolean): SafetyConfigurationBuilder;
  withNeurodiversityAccommodations(enabled: boolean): SafetyConfigurationBuilder;
  build(): SafetyConfiguration;
}