/**
 * Safety Framework - Main Entry Point
 * Exports all safety framework components for integration with other engines
 */

// Core framework exports
export { SafetyFramework } from './SafetyFramework.js';
export { TraumaInformedEngine } from './TraumaInformedEngine.js';
export { ContentFilter } from './ContentFilter.js';
export { UserSafetyManager } from './UserSafetyManager.js';
export { SafetyValidator } from './SafetyValidator.js';
export { SafetyLogger } from './SafetyLogger.js';

// Type exports
export type {
  // Core safety types
  SafetyConfiguration,
  UserSafetyProfile,
  SafetySession,
  ContentAnalysis,
  SafetyReport,
  EngineIntegration,
  SafetyError,
  SafetyLogEntry,

  // Enums
  SafetyLevel,
  ContentIntensity,
  TriggerCategory,
  UserRiskLevel,
  ConsentStatus,
  SessionStatus,

  // Content filtering types
  ContentFilter as ContentFilterInterface,
  FilterConfiguration,
  FilterRule,
  TriggerWarning,
  ContentRiskAssessment,
  TraumaIndicator,
  CulturalSensitivityFlag,
  AgeRating,
  AccessibilityImpact,

  // Trauma-informed types
  TraumaInformedConfiguration,
  IntensityRampConfiguration,
  SafeWordConfiguration,
  GroundingTechnique,
  AftercareProtocol,
  IntegrationSupport,

  // User safety types
  ContentPreference,
  UserBoundary,
  BoundaryViolationAction,
  EmergencyContact,
  AccessibilityRequirement,
  CulturalProfile,
  AgeVerification,

  // Session management types
  SafetyCheckpoint,
  UserStateAssessment,
  ContentState,
  SafetyViolation,
  EmergencyAction,
  UserFeedback,

  // Reporting types
  TimeRange,
  SafetyMetrics,
  SafetyInsight,

  // Integration types
  SafetyHook,
  ValidationRequirement,
  FallbackBehavior,

  // Utility types
  SafetyAction,
  FilterResult,
  ValidationResult,
  TypeGuards,
  SafetyConfigurationBuilder
} from './types/SafetyTypes.js';

// Integration helpers for existing engines
import { SafetyFramework } from './SafetyFramework.js';

/**
 * Initialize safety framework with default configuration
 */
export async function initializeSafetyFramework(): Promise<boolean> {
  const framework = SafetyFramework.getInstance();
  const result = await framework.initialize();
  return result === 'valid';
}

/**
 * Create safety session for user
 */
export async function createSafetySession(
  userId: string,
  userProfile?: UserSafetyProfile
): Promise<SafetySession | null> {
  const framework = SafetyFramework.getInstance();
  return await framework.createSession(userId, userProfile);
}

/**
 * Validate content through safety framework
 */
export async function validateContent(
  content: string,
  sessionId: string,
  metadata?: Record<string, any>
): Promise<ContentAnalysis | null> {
  const framework = SafetyFramework.getInstance();
  return await framework.validateContent(content, sessionId, metadata);
}

/**
 * Process user interaction through safety framework
 */
export async function processUserInteraction(
  sessionId: string,
  interaction: string,
  interactionType: 'feedback' | 'safe_word' | 'boundary_check' | 'emergency' | 'general'
): Promise<SafetyAction> {
  const framework = SafetyFramework.getInstance();
  return await framework.processUserInteraction(sessionId, interaction, interactionType);
}

/**
 * End safety session
 */
export async function endSafetySession(sessionId: string, reason?: string): Promise<boolean> {
  const framework = SafetyFramework.getInstance();
  return await framework.endSession(sessionId, reason);
}

/**
 * Generate safety report
 */
export async function generateSafetyReport(
  reportType: 'session_summary' | 'violation_report' | 'user_feedback' | 'system_health' | 'trend_analysis',
  timeRange?: TimeRange
): Promise<SafetyReport | null> {
  const framework = SafetyFramework.getInstance();
  return await framework.generateSafetyReport(reportType, timeRange);
}

/**
 * Get session safety status
 */
export function getSessionSafetyStatus(sessionId: string): {
  status: SessionStatus;
  riskLevel: UserRiskLevel;
  activeViolations: number;
  lastCheck: Date;
} | null {
  const framework = SafetyFramework.getInstance();
  return framework.getSessionSafetyStatus(sessionId);
}

/**
 * Emergency stop all sessions
 */
export async function emergencyStopAll(reason?: string): Promise<number> {
  const framework = SafetyFramework.getInstance();
  return await framework.emergencyStopAll(reason);
}

// Integration hooks for synthesis engine
export const synthesisEngineHooks = {
  /**
   * Pre-generation safety validation for synthesis engine
   */
  async validateSynthesisInput(input: any): Promise<ValidationResult> {
    // Integration point for synthesis engine safety validation
    const framework = SafetyFramework.getInstance();

    if (!framework.isFrameworkInitialized()) {
      await framework.initialize();
    }

    // This would integrate with actual synthesis engine input validation
    return 'valid';
  },

  /**
   * Post-generation content filtering for synthesis engine
   */
  async filterSynthesisOutput(output: any): Promise<any> {
    // Integration point for synthesis engine output filtering
    const framework = SafetyFramework.getInstance();

    // This would apply trauma-informed processing to synthesis output
    return output;
  }
};

// Integration hooks for learning engine
export const learningEngineHooks = {
  /**
   * Pre-generation safety validation for learning engine
   */
  async validateLearningContent(content: any): Promise<ValidationResult> {
    // Integration point for learning engine safety validation
    const framework = SafetyFramework.getInstance();

    // This would validate learning content for age-appropriateness and triggers
    return 'valid';
  },

  /**
   * Adaptive pacing for learning engine
   */
  async applyAdaptivePacing(sessionId: string, userState: any): Promise<any> {
    // Integration point for learning engine adaptive pacing
    const framework = SafetyFramework.getInstance();

    // This would adjust learning pace based on user safety state
    return userState;
  }
};

// Integration hooks for three.js engine
export const threeEngineHooks = {
  /**
   * Visual content safety validation for three.js engine
   */
  async validateVisualContent(visualContent: any): Promise<ValidationResult> {
    // Integration point for three.js engine visual safety validation
    const framework = SafetyFramework.getInstance();

    // This would check for seizure-inducing visuals, accessibility issues, etc.
    return 'valid';
  },

  /**
   * Accessibility compliance for three.js engine
   */
  async ensureAccessibilityCompliance(scene: any, userProfile: UserSafetyProfile): Promise<any> {
    // Integration point for three.js engine accessibility compliance
    const framework = SafetyFramework.getInstance();

    // This would modify 3D scenes for accessibility needs
    return scene;
  }
};

// Utility functions for easy integration
export const safetyUtils = {
  /**
   * Check if content contains potential triggers
   */
  containsTriggers(content: string, triggerCategories: TriggerCategory[]): boolean {
    // Simple utility to check for trigger keywords
    const triggerKeywords: Record<TriggerCategory, string[]> = {
      [TriggerCategory.VIOLENCE]: ['violence', 'harm', 'attack', 'hurt'],
      [TriggerCategory.SEXUAL_CONTENT]: ['sexual', 'intimate', 'consent'],
      [TriggerCategory.TRAUMA]: ['trauma', 'ptsd', 'trigger'],
      [TriggerCategory.SUBSTANCE_USE]: ['drug', 'alcohol', 'substance'],
      [TriggerCategory.MENTAL_HEALTH]: ['depression', 'anxiety', 'suicide'],
      [TriggerCategory.DEATH_LOSS]: ['death', 'dying', 'loss'],
      [TriggerCategory.PHYSICAL_HARM]: ['injury', 'pain', 'medical'],
      [TriggerCategory.EMOTIONAL_DISTRESS]: ['sadness', 'grief', 'heartbreak'],
      [TriggerCategory.CULTURAL_SENSITIVITY]: ['cultural', 'tradition', 'heritage'],
      [TriggerCategory.SPIRITUAL_CONTENT]: ['spiritual', 'religious', 'sacred']
    };

    const contentLower = content.toLowerCase();

    return triggerCategories.some(category => {
      const keywords = triggerKeywords[category] || [];
      return keywords.some(keyword => contentLower.includes(keyword));
    });
  },

  /**
   * Calculate content intensity level
   */
  calculateIntensity(content: string): ContentIntensity {
    // Simple intensity calculation based on trigger keywords
    const intensityKeywords = {
      [ContentIntensity.VERY_MILD]: ['gentle', 'soft', 'calm'],
      [ContentIntensity.MILD]: ['moderate', 'light', 'easy'],
      [ContentIntensity.MODERATE]: ['medium', 'balanced', 'standard'],
      [ContentIntensity.INTENSE]: ['strong', 'powerful', 'intense'],
      [ContentIntensity.VERY_INTENSE]: ['extreme', 'powerful', 'overwhelming'],
      [ContentIntensity.EXTREME]: ['maximum', 'extreme', 'dangerous']
    };

    let maxIntensity = ContentIntensity.VERY_MILD;

    for (const [intensity, keywords] of Object.entries(intensityKeywords)) {
      const foundKeywords = keywords.filter(keyword => content.toLowerCase().includes(keyword));
      if (foundKeywords.length > 0) {
        maxIntensity = intensity as ContentIntensity;
      }
    }

    return maxIntensity;
  },

  /**
   * Generate trigger warning for content
   */
  generateTriggerWarning(
    content: string,
    detectedTriggers: TriggerCategory[]
  ): TriggerWarning | null {
    if (detectedTriggers.length === 0) return null;

    const primaryTrigger = detectedTriggers[0];

    return {
      category: primaryTrigger,
      severity: detectedTriggers.length > 2 ? SafetyLevel.HIGH : SafetyLevel.MEDIUM,
      description: `Content may contain ${primaryTrigger} related material`,
      timestamp: Date.now(),
      duration: 30 // 30 seconds estimated duration
    };
  }
};

// Default export for easy importing
export default {
  SafetyFramework,
  TraumaInformedEngine,
  ContentFilter,
  UserSafetyManager,
  SafetyValidator,
  SafetyLogger,
  initializeSafetyFramework,
  createSafetySession,
  validateContent,
  processUserInteraction,
  endSafetySession,
  generateSafetyReport,
  getSessionSafetyStatus,
  emergencyStopAll,
  synthesisEngineHooks,
  learningEngineHooks,
  threeEngineHooks,
  safetyUtils
};