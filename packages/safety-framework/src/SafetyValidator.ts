/**
 * Safety Validator - Comprehensive Safety Validation System
 * Validates safety configurations, user profiles, and system operations
 */

import {
  SafetyConfiguration,
  UserSafetyProfile,
  ContentAnalysis,
  SafetySession,
  ValidationResult,
  SafetyLevel,
  ContentIntensity,
  TriggerCategory,
  UserRiskLevel,
  ConsentStatus,
  SessionStatus,
  SafetyError,
  SafetyLogEntry,
  TypeGuards
} from './types/SafetyTypes.js';

/**
 * Comprehensive safety validation system
 */
export class SafetyValidator {
  private typeGuards: TypeGuards;
  private validationRules: Map<string, ValidationRule[]> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    this.typeGuards = this.createTypeGuards();
    this.initializeValidationRules();
  }

  /**
   * Initialize the safety validator
   */
  public async initialize(): Promise<boolean> {
    try {
      // Load validation rules from configuration
      await this.loadValidationRules();

      // Initialize validation engines
      await this.initializeValidationEngines();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize SafetyValidator:', error);
      return false;
    }
  }

  /**
   * Validate safety configuration
   */
  public validateSafetyConfiguration(config: SafetyConfiguration): ValidationResult {
    if (!this.isInitialized) {
      console.warn('SafetyValidator not initialized');
      return 'error';
    }

    try {
      const errors: string[] = [];

      // Validate max content intensity
      if (!this.typeGuards.isValidContentIntensity(config.maxContentIntensity)) {
        errors.push('Invalid max content intensity');
      }

      // Validate session timeout
      if (config.sessionTimeoutMinutes < 5 || config.sessionTimeoutMinutes > 480) {
        errors.push('Session timeout must be between 5 and 480 minutes');
      }

      // Validate safety check interval
      if (config.safetyCheckIntervalSeconds < 10 || config.safetyCheckIntervalSeconds > 300) {
        errors.push('Safety check interval must be between 10 and 300 seconds');
      }

      // Validate cultural sensitivity level
      if (!this.typeGuards.isValidSafetyLevel(config.culturalSensitivityLevel)) {
        errors.push('Invalid cultural sensitivity level');
      }

      // Validate configuration consistency
      if (config.requireTriggerWarnings && !config.enableRealTimeFiltering) {
        errors.push('Real-time filtering required when trigger warnings are enabled');
      }

      if (errors.length > 0) {
        console.warn('Safety configuration validation errors:', errors);
        return 'warning';
      }

      return 'valid';
    } catch (error) {
      console.error('Safety configuration validation failed:', error);
      return 'error';
    }
  }

  /**
   * Validate user safety profile
   */
  public validateUserSafetyProfile(profile: UserSafetyProfile): ValidationResult {
    if (!this.isInitialized) {
      console.warn('SafetyValidator not initialized');
      return 'error';
    }

    try {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Validate user ID
      if (!profile.userId || profile.userId.trim().length === 0) {
        errors.push('User ID is required');
      }

      // Validate risk level
      if (!this.typeGuards.isValidUserRiskLevel(profile.riskLevel)) {
        errors.push('Invalid risk level');
      }

      // Validate trigger categories
      if (profile.triggerCategories.length > 0) {
        const invalidCategories = profile.triggerCategories.filter(
          cat => !this.typeGuards.isValidTriggerCategory(cat)
        );
        if (invalidCategories.length > 0) {
          errors.push(`Invalid trigger categories: ${invalidCategories.join(', ')}`);
        }
      }

      // Validate content preferences
      for (const preference of profile.contentPreferences) {
        if (!this.typeGuards.isValidTriggerCategory(preference.category)) {
          errors.push(`Invalid trigger category in preferences: ${preference.category}`);
        }
        if (!this.typeGuards.isValidContentIntensity(preference.maxIntensity)) {
          errors.push(`Invalid content intensity in preferences: ${preference.maxIntensity}`);
        }
      }

      // Validate boundaries
      for (const boundary of profile.boundaries) {
        if (!boundary.description || boundary.description.trim().length === 0) {
          warnings.push('Boundary missing description');
        }
        if (boundary.boundaryType === 'hard' && boundary.consequences.length === 0) {
          errors.push('Hard boundaries must have consequences defined');
        }
      }

      // Validate emergency contacts
      for (const contact of profile.emergencyContacts) {
        if (!contact.name || !contact.contactInfo) {
          errors.push('Emergency contact missing required information');
        }
        if (!this.isValidContactInfo(contact.contactInfo)) {
          errors.push('Invalid emergency contact information format');
        }
      }

      // Validate accessibility needs
      for (const need of profile.accessibilityNeeds) {
        if (!need.description || need.description.trim().length === 0) {
          warnings.push('Accessibility need missing description');
        }
        if (need.priority === 'critical' && need.accommodations.length === 0) {
          errors.push('Critical accessibility needs must have accommodations');
        }
      }

      // Validate age verification
      if (profile.ageVerification) {
        if (profile.ageVerification.verified && profile.ageVerification.age < 13) {
          warnings.push('User age is below recommended minimum');
        }
        if (profile.ageVerification.age < 0 || profile.ageVerification.age > 150) {
          errors.push('Invalid age value');
        }
      }

      // Validate consent status
      if (!this.typeGuards.isValidConsentStatus(profile.consentStatus)) {
        errors.push('Invalid consent status');
      }

      // Check for critical risk without proper support
      if (profile.riskLevel === UserRiskLevel.CRITICAL) {
        if (profile.emergencyContacts.length === 0) {
          errors.push('Critical risk users must have emergency contacts');
        }
        if (profile.boundaries.length === 0) {
          warnings.push('Critical risk users should have clear boundaries defined');
        }
      }

      if (errors.length > 0) {
        console.error('User safety profile validation errors:', errors);
        return 'invalid';
      }

      if (warnings.length > 0) {
        console.warn('User safety profile validation warnings:', warnings);
        return 'warning';
      }

      return 'valid';
    } catch (error) {
      console.error('User safety profile validation failed:', error);
      return 'error';
    }
  }

  /**
   * Validate content analysis
   */
  public validateContentAnalysis(analysis: ContentAnalysis): ValidationResult {
    if (!this.isInitialized) {
      console.warn('SafetyValidator not initialized');
      return 'error';
    }

    try {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Validate content ID
      if (!analysis.contentId || analysis.contentId.trim().length === 0) {
        errors.push('Content ID is required');
      }

      // Validate content intensity
      if (!this.typeGuards.isValidContentIntensity(analysis.contentIntensity)) {
        errors.push('Invalid content intensity');
      }

      // Validate trigger warnings
      for (const warning of analysis.triggerWarnings) {
        if (!this.typeGuards.isValidTriggerCategory(warning.category)) {
          errors.push(`Invalid trigger category in warning: ${warning.category}`);
        }
        if (!this.typeGuards.isValidSafetyLevel(warning.severity)) {
          errors.push(`Invalid severity level in warning: ${warning.severity}`);
        }
        if (!warning.description || warning.description.trim().length === 0) {
          warnings.push('Trigger warning missing description');
        }
      }

      // Validate risk assessment
      if (analysis.riskAssessment) {
        if (!this.typeGuards.isValidUserRiskLevel(analysis.riskAssessment.overallRisk)) {
          errors.push('Invalid overall risk level in assessment');
        }

        // Validate category risks
        for (const [category, risk] of Object.entries(analysis.riskAssessment.categoryRisks)) {
          if (!this.typeGuards.isValidTriggerCategory(category as TriggerCategory)) {
            errors.push(`Invalid trigger category in risk assessment: ${category}`);
          }
          if (!this.typeGuards.isValidUserRiskLevel(risk)) {
            errors.push(`Invalid risk level for category ${category}: ${risk}`);
          }
        }
      }

      // Validate cultural sensitivity flags
      for (const flag of analysis.culturalSensitivityFlags) {
        if (!this.typeGuards.isValidSafetyLevel(flag.sensitivityLevel)) {
          errors.push(`Invalid sensitivity level in cultural flag: ${flag.sensitivityLevel}`);
        }
      }

      // Validate age rating
      if (analysis.ageRating) {
        if (analysis.ageRating.minimumAge < 0 || analysis.ageRating.minimumAge > 21) {
          errors.push('Invalid minimum age in rating');
        }
      }

      // Validate accessibility impact
      for (const impact of analysis.accessibilityImpact) {
        const validImpacts = ['none', 'mild', 'moderate', 'severe', 'prohibitive'];
        if (!validImpacts.includes(impact.impactLevel)) {
          errors.push(`Invalid accessibility impact level: ${impact.impactLevel}`);
        }
      }

      if (errors.length > 0) {
        console.error('Content analysis validation errors:', errors);
        return 'invalid';
      }

      if (warnings.length > 0) {
        console.warn('Content analysis validation warnings:', warnings);
        return 'warning';
      }

      return 'valid';
    } catch (error) {
      console.error('Content analysis validation failed:', error);
      return 'error';
    }
  }

  /**
   * Validate safety session
   */
  public validateSafetySession(session: SafetySession): ValidationResult {
    if (!this.isInitialized) {
      console.warn('SafetyValidator not initialized');
      return 'error';
    }

    try {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Validate session ID
      if (!session.sessionId || session.sessionId.trim().length === 0) {
        errors.push('Session ID is required');
      }

      // Validate user ID
      if (!session.userId || session.userId.trim().length === 0) {
        errors.push('User ID is required');
      }

      // Validate session status
      if (!this.typeGuards.isValidSessionStatus(session.status)) {
        errors.push('Invalid session status');
      }

      // Validate timestamps
      if (session.endTime && session.endTime <= session.startTime) {
        errors.push('Session end time must be after start time');
      }

      // Validate safety configuration
      if (session.safetyConfiguration) {
        const configValidation = this.validateSafetyConfiguration(session.safetyConfiguration);
        if (configValidation === 'invalid') {
          errors.push('Invalid safety configuration in session');
        } else if (configValidation === 'warning') {
          warnings.push('Safety configuration has warnings');
        }
      }

      // Validate active filters
      for (const filter of session.activeFilters) {
        if (!filter.filterId || filter.filterId.trim().length === 0) {
          errors.push('Filter missing ID');
        }
        if (filter.priority < 0 || filter.priority > 100) {
          errors.push('Invalid filter priority');
        }
      }

      // Validate violations
      for (const violation of session.violations) {
        if (!violation.description || violation.description.trim().length === 0) {
          warnings.push('Safety violation missing description');
        }
        if (!this.typeGuards.isValidSafetyLevel(violation.severity)) {
          errors.push(`Invalid severity level in violation: ${violation.severity}`);
        }
      }

      // Validate emergency actions
      for (const action of session.emergencyActions) {
        if (!action.reason || action.reason.trim().length === 0) {
          warnings.push('Emergency action missing reason');
        }
      }

      if (errors.length > 0) {
        console.error('Safety session validation errors:', errors);
        return 'invalid';
      }

      if (warnings.length > 0) {
        console.warn('Safety session validation warnings:', warnings);
        return 'warning';
      }

      return 'valid';
    } catch (error) {
      console.error('Safety session validation failed:', error);
      return 'error';
    }
  }

  /**
   * Validate safety operation
   */
  public validateSafetyOperation(
    operation: string,
    parameters: Record<string, any>,
    context: { userId?: string; sessionId?: string }
  ): ValidationResult {
    if (!this.isInitialized) {
      console.warn('SafetyValidator not initialized');
      return 'error';
    }

    try {
      const rules = this.validationRules.get(operation);
      if (!rules) {
        console.warn(`No validation rules found for operation: ${operation}`);
        return 'warning';
      }

      const errors: string[] = [];

      // Apply validation rules
      for (const rule of rules) {
        const ruleResult = this.applyValidationRule(rule, parameters, context);
        if (ruleResult !== 'valid') {
          if (rule.severity === 'error') {
            errors.push(rule.message);
          }
        }
      }

      if (errors.length > 0) {
        console.error(`Safety operation validation errors for ${operation}:`, errors);
        return 'invalid';
      }

      return 'valid';
    } catch (error) {
      console.error(`Safety operation validation failed for ${operation}:`, error);
      return 'error';
    }
  }

  /**
   * Validate system integrity
   */
  public async validateSystemIntegrity(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    recommendations: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    try {
      // Check validation rules integrity
      if (this.validationRules.size === 0) {
        errors.push('No validation rules loaded');
      }

      // Check type guards
      if (!this.typeGuards.isValidSafetyLevel) {
        errors.push('Type guards not properly initialized');
      }

      // Check for critical validation rules
      const criticalOperations = ['create_session', 'validate_content', 'process_emergency'];
      for (const operation of criticalOperations) {
        if (!this.validationRules.has(operation)) {
          errors.push(`Missing validation rules for critical operation: ${operation}`);
        }
      }

      // Generate recommendations
      if (errors.length > 0) {
        recommendations.push('Fix validation errors before proceeding');
        recommendations.push('Review and update validation rules');
      }

      if (warnings.length > 0) {
        recommendations.push('Address validation warnings to improve system reliability');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        recommendations
      };
    } catch (error) {
      console.error('System integrity validation failed:', error);
      return {
        isValid: false,
        errors: ['System integrity validation failed'],
        warnings: [],
        recommendations: ['Contact system administrator']
      };
    }
  }

  // Private helper methods

  private createTypeGuards(): TypeGuards {
    return {
      isValidSafetyLevel: (level: string): level is SafetyLevel => {
        const validLevels = Object.values(SafetyLevel);
        return validLevels.includes(level as SafetyLevel);
      },

      isValidContentIntensity: (intensity: string): intensity is ContentIntensity => {
        const validIntensities = Object.values(ContentIntensity);
        return validIntensities.includes(intensity as ContentIntensity);
      },

      isValidTriggerCategory: (category: string): category is TriggerCategory => {
        const validCategories = Object.values(TriggerCategory);
        return validCategories.includes(category as TriggerCategory);
      },

      isValidUserRiskLevel: (level: string): level is UserRiskLevel => {
        const validLevels = Object.values(UserRiskLevel);
        return validLevels.includes(level as UserRiskLevel);
      },

      isValidConsentStatus: (status: string): status is ConsentStatus => {
        const validStatuses = Object.values(ConsentStatus);
        return validStatuses.includes(status as ConsentStatus);
      },

      isValidSessionStatus: (status: string): status is SessionStatus => {
        const validStatuses = Object.values(SessionStatus);
        return validStatuses.includes(status as SessionStatus);
      }
    };
  }

  private initializeValidationRules(): void {
    // Session creation rules
    this.validationRules.set('create_session', [
      {
        name: 'user_id_required',
        condition: (params) => params.userId && params.userId.trim().length > 0,
        message: 'User ID is required for session creation',
        severity: 'error'
      },
      {
        name: 'valid_user_id_format',
        condition: (params) => /^[a-zA-Z0-9_-]+$/.test(params.userId),
        message: 'User ID must contain only alphanumeric characters, hyphens, and underscores',
        severity: 'error'
      }
    ]);

    // Content validation rules
    this.validationRules.set('validate_content', [
      {
        name: 'content_not_empty',
        condition: (params) => params.content && params.content.trim().length > 0,
        message: 'Content cannot be empty',
        severity: 'error'
      },
      {
        name: 'session_id_required',
        condition: (params) => params.sessionId && params.sessionId.trim().length > 0,
        message: 'Session ID is required for content validation',
        severity: 'error'
      }
    ]);

    // Emergency operation rules
    this.validationRules.set('process_emergency', [
      {
        name: 'emergency_reason_required',
        condition: (params) => params.reason && params.reason.trim().length > 0,
        message: 'Emergency reason is required',
        severity: 'error'
      },
      {
        name: 'valid_session_id',
        condition: (params) => params.sessionId && params.sessionId.trim().length > 0,
        message: 'Session ID is required for emergency operations',
        severity: 'error'
      }
    ]);

    // User profile rules
    this.validationRules.set('update_profile', [
      {
        name: 'profile_data_provided',
        condition: (params) => params.profileData && Object.keys(params.profileData).length > 0,
        message: 'Profile data must be provided',
        severity: 'error'
      }
    ]);
  }

  private applyValidationRule(
    rule: ValidationRule,
    parameters: Record<string, any>,
    context: { userId?: string; sessionId?: string }
  ): ValidationResult {
    try {
      const isValid = rule.condition(parameters, context);

      if (!isValid) {
        if (rule.severity === 'error') {
          return 'invalid';
        } else {
          return 'warning';
        }
      }

      return 'valid';
    } catch (error) {
      console.error(`Validation rule ${rule.name} failed:`, error);
      return 'error';
    }
  }

  private isValidContactInfo(contactInfo: string): boolean {
    // Basic validation for contact information format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    return emailRegex.test(contactInfo) || phoneRegex.test(contactInfo.replace(/[\s\-\(\)]/g, ''));
  }

  private async loadValidationRules(): Promise<void> {
    // Load validation rules from configuration or external sources
    // This would typically load from files or a validation service
  }

  private async initializeValidationEngines(): Promise<void> {
    // Initialize any external validation engines or services
  }
}

// Supporting interfaces
interface ValidationRule {
  name: string;
  condition: (parameters: Record<string, any>, context?: any) => boolean;
  message: string;
  severity: 'error' | 'warning';
}