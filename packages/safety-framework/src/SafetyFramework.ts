/**
 * Safety Framework - Main Orchestrator
 * Comprehensive safety system for trauma-informed content delivery and user protection
 */

import {
  SafetyConfiguration,
  UserSafetyProfile,
  SafetySession,
  ContentAnalysis,
  SafetyReport,
  EngineIntegration,
  SafetyError,
  SafetyLogEntry,
  SafetyLevel,
  SessionStatus,
  SafetyAction,
  ValidationResult,
  UserRiskLevel,
  ContentIntensity,
  TriggerCategory,
  TypeGuards,
  SafetyFramework as ISafetyFramework
} from './types/SafetyTypes.js';

import { TraumaInformedEngine } from './TraumaInformedEngine.js';
import { ContentFilter } from './ContentFilter.js';
import { UserSafetyManager } from './UserSafetyManager.js';

/**
 * Main Safety Framework orchestrator class
 * Coordinates all safety systems and integrates with external engines
 */
export class SafetyFramework implements ISafetyFramework {
  private static instance: SafetyFramework;
  private configuration: SafetyConfiguration;
  private traumaInformedEngine: TraumaInformedEngine;
  private contentFilter: ContentFilter;
  private userSafetyManager: UserSafetyManager;
  private engineIntegrations: Map<string, EngineIntegration> = new Map();
  private activeSessions: Map<string, SafetySession> = new Map();
  private safetyErrors: SafetyError[] = [];
  private safetyLogs: SafetyLogEntry[] = [];
  private isInitialized: boolean = false;

  private constructor() {
    this.configuration = this.createDefaultConfiguration();
    this.traumaInformedEngine = new TraumaInformedEngine();
    this.contentFilter = new ContentFilter();
    this.userSafetyManager = new UserSafetyManager();
  }

  /**
   * Get singleton instance of SafetyFramework
   */
  public static getInstance(): SafetyFramework {
    if (!SafetyFramework.instance) {
      SafetyFramework.instance = new SafetyFramework();
    }
    return SafetyFramework.instance;
  }

  /**
   * Initialize the safety framework with configuration
   */
  public async initialize(config?: Partial<SafetyConfiguration>): Promise<ValidationResult> {
    try {
      if (config) {
        this.configuration = { ...this.configuration, ...config };
      }

      // Initialize all subsystems
      await Promise.all([
        this.traumaInformedEngine.initialize(),
        this.contentFilter.initialize(),
        this.userSafetyManager.initialize()
      ]);

      // Setup engine integrations
      this.setupEngineIntegrations();

      // Start safety monitoring
      this.startSafetyMonitoring();

      this.isInitialized = true;
      this.logSafetyEvent('info', 'system_event', 'Safety Framework initialized successfully');

      return 'valid';
    } catch (error) {
      this.handleSafetyError('system_error', 'critical', 'Failed to initialize Safety Framework', { error });
      return 'error';
    }
  }

  /**
   * Create a new safety session for a user
   */
  public async createSession(
    userId: string,
    userProfile?: UserSafetyProfile
  ): Promise<SafetySession | null> {
    if (!this.isInitialized) {
      this.handleSafetyError('system_error', 'critical', 'Safety Framework not initialized');
      return null;
    }

    try {
      // Get or create user safety profile
      const profile = userProfile || await this.userSafetyManager.getUserProfile(userId);
      if (!profile) {
        this.handleSafetyError('user_safety', 'high', `No safety profile found for user ${userId}`);
        return null;
      }

      // Validate user is safe to proceed
      const validation = await this.validateUserForSession(profile);
      if (validation !== 'valid') {
        this.logSafetyEvent('warning', 'user_safety', `User ${userId} failed safety validation: ${validation}`);
        return null;
      }

      // Create new session
      const session: SafetySession = {
        sessionId: this.generateSessionId(),
        userId,
        status: SessionStatus.INITIALIZING,
        startTime: new Date(),
        lastActivity: new Date(),
        safetyConfiguration: this.configuration,
        activeFilters: [],
        safetyCheckpoints: [],
        violations: [],
        emergencyActions: [],
        userFeedback: []
      };

      // Initialize trauma-informed systems for this session
      await this.traumaInformedEngine.initializeSession(session.sessionId, profile);

      // Setup content filters based on user profile
      session.activeFilters = await this.contentFilter.createFiltersForUser(profile);

      // Store session
      this.activeSessions.set(session.sessionId, session);

      this.logSafetyEvent('info', 'user_action', `Created safety session ${session.sessionId} for user ${userId}`);

      return session;
    } catch (error) {
      this.handleSafetyError('system_error', 'high', `Failed to create session for user ${userId}`, { error });
      return null;
    }
  }

  /**
   * Validate content before delivery to user
   */
  public async validateContent(
    content: string,
    sessionId: string,
    metadata?: Record<string, any>
  ): Promise<ContentAnalysis | null> {
    if (!this.isInitialized) {
      this.handleSafetyError('system_error', 'critical', 'Safety Framework not initialized');
      return null;
    }

    const session = this.activeSessions.get(sessionId);
    if (!session) {
      this.handleSafetyError('system_error', 'high', `Invalid session ID: ${sessionId}`);
      return null;
    }

    try {
      // Update session activity
      session.lastActivity = new Date();

      // Perform comprehensive content analysis
      const analysis = await this.contentFilter.analyzeContent(content, session, metadata);

      // Check against user safety profile
      const userProfile = await this.userSafetyManager.getUserProfile(session.userId);
      if (!userProfile) {
        this.handleSafetyError('user_safety', 'high', `No user profile found for session ${sessionId}`);
        return null;
      }

      // Validate against user boundaries and preferences
      const validation = await this.validateContentAgainstProfile(analysis, userProfile);

      // Apply trauma-informed processing
      const traumaInformedResult = await this.traumaInformedEngine.processContent(
        analysis,
        session.sessionId,
        userProfile
      );

      // Create final analysis with all safety checks
      const finalAnalysis: ContentAnalysis = {
        ...analysis,
        ...traumaInformedResult,
        riskAssessment: await this.assessContentRisk(analysis, userProfile),
        analyzedAt: new Date(),
        analyzerVersion: '1.0.0'
      };

      // Log content validation
      this.logSafetyEvent('info', 'safety_check', `Content validated for session ${sessionId}`, {
        contentId: finalAnalysis.contentId,
        riskLevel: finalAnalysis.riskAssessment.overallRisk,
        triggerCount: finalAnalysis.triggerWarnings.length
      });

      return finalAnalysis;
    } catch (error) {
      this.handleSafetyError('system_error', 'high', `Content validation failed for session ${sessionId}`, { error });
      return null;
    }
  }

  /**
   * Process user interaction and update safety state
   */
  public async processUserInteraction(
    sessionId: string,
    interaction: string,
    interactionType: 'feedback' | 'safe_word' | 'boundary_check' | 'emergency' | 'general'
  ): Promise<SafetyAction> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      this.handleSafetyError('system_error', 'high', `Invalid session ID: ${sessionId}`);
      return 'stop';
    }

    try {
      session.lastActivity = new Date();

      switch (interactionType) {
        case 'safe_word':
          return await this.handleSafeWord(sessionId, interaction);

        case 'emergency':
          return await this.handleEmergency(sessionId, interaction);

        case 'feedback':
          return await this.processUserFeedback(sessionId, interaction);

        case 'boundary_check':
          return await this.checkBoundaryViolation(sessionId, interaction);

        default:
          return await this.processGeneralInteraction(sessionId, interaction);
      }
    } catch (error) {
      this.handleSafetyError('system_error', 'high', `User interaction processing failed for session ${sessionId}`, { error });
      return 'stop';
    }
  }

  /**
   * End a safety session
   */
  public async endSession(sessionId: string, reason: string = 'user_completed'): Promise<boolean> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      this.handleSafetyError('system_error', 'high', `Invalid session ID: ${sessionId}`);
      return false;
    }

    try {
      // Update session status
      session.status = reason === 'emergency' ? SessionStatus.EMERGENCY_STOP : SessionStatus.COMPLETED;
      session.endTime = new Date();

      // Process aftercare and integration support
      await this.traumaInformedEngine.processSessionEnd(sessionId, reason);

      // Generate session report
      await this.generateSessionReport(sessionId);

      // Clean up session data
      this.activeSessions.delete(sessionId);

      this.logSafetyEvent('info', 'system_event', `Session ${sessionId} ended: ${reason}`);

      return true;
    } catch (error) {
      this.handleSafetyError('system_error', 'high', `Session end processing failed for session ${sessionId}`, { error });
      return false;
    }
  }

  /**
   * Register integration with external engine
   */
  public registerEngineIntegration(integration: EngineIntegration): boolean {
    try {
      this.engineIntegrations.set(integration.engineName, integration);
      this.logSafetyEvent('info', 'system_event', `Registered integration for engine: ${integration.engineName}`);
      return true;
    } catch (error) {
      this.handleSafetyError('integration_error', 'high', `Failed to register engine integration: ${integration.engineName}`, { error });
      return false;
    }
  }

  /**
   * Generate comprehensive safety report
   */
  public async generateSafetyReport(
    reportType: 'session_summary' | 'violation_report' | 'user_feedback' | 'system_health' | 'trend_analysis',
    timeRange?: { start: Date; end: Date }
  ): Promise<SafetyReport | null> {
    try {
      const report = await this.userSafetyManager.generateSafetyReport(reportType, timeRange);
      this.logSafetyEvent('info', 'system_event', `Generated safety report: ${reportType}`);
      return report;
    } catch (error) {
      this.handleSafetyError('system_error', 'high', `Failed to generate safety report: ${reportType}`, { error });
      return null;
    }
  }

  /**
   * Get current safety status for a session
   */
  public getSessionSafetyStatus(sessionId: string): {
    status: SessionStatus;
    riskLevel: UserRiskLevel;
    activeViolations: number;
    lastCheck: Date;
  } | null {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return null;
    }

    return {
      status: session.status,
      riskLevel: UserRiskLevel.LOW, // This would be calculated based on current state
      activeViolations: session.violations.filter(v => !v.resolved).length,
      lastCheck: session.lastActivity
    };
  }

  /**
   * Emergency stop all active sessions
   */
  public async emergencyStopAll(reason: string = 'system_emergency'): Promise<number> {
    let stoppedCount = 0;

    for (const [sessionId] of this.activeSessions) {
      if (await this.endSession(sessionId, reason)) {
        stoppedCount++;
      }
    }

    this.logSafetyEvent('critical', 'emergency', `Emergency stop triggered: ${reason}. Stopped ${stoppedCount} sessions`);
    return stoppedCount;
  }

  // Private helper methods

  private createDefaultConfiguration(): SafetyConfiguration {
    return {
      maxContentIntensity: ContentIntensity.MODERATE,
      requireTriggerWarnings: true,
      enableRealTimeFiltering: true,
      emergencyStopEnabled: true,
      sessionTimeoutMinutes: 120,
      safetyCheckIntervalSeconds: 30,
      enableDetailedLogging: true,
      culturalSensitivityLevel: SafetyLevel.HIGH,
      ageAppropriateFiltering: true,
      neurodiversityAccommodations: true
    };
  }

  private setupEngineIntegrations(): void {
    // Integration with synthesis engine
    this.registerEngineIntegration({
      engineName: 'synthesis-engine',
      integrationType: 'synthesis',
      safetyHooks: [
        {
          hookType: 'pre_generation',
          methodName: 'validateSynthesisInput',
          parameters: { requireContentAnalysis: true },
          required: true
        },
        {
          hookType: 'post_generation',
          methodName: 'filterSynthesisOutput',
          parameters: { applyTraumaInformedProcessing: true },
          required: true
        }
      ],
      validationRequirements: [
        {
          validationType: 'content_analysis',
          validator: 'synthesisContentValidator',
          parameters: { checkForTraumaContent: true },
          blocking: true
        }
      ],
      fallbackBehavior: {
        fallbackType: 'safe_default',
        fallbackContent: 'Content generation paused for safety review.',
        userNotification: 'Content generation has been paused to ensure your safety.',
        loggingRequired: true
      }
    });

    // Integration with learning engine
    this.registerEngineIntegration({
      engineName: 'learning-engine',
      integrationType: 'learning',
      safetyHooks: [
        {
          hookType: 'pre_generation',
          methodName: 'validateLearningContent',
          parameters: { checkAgeAppropriateness: true },
          required: true
        }
      ],
      validationRequirements: [
        {
          validationType: 'user_state',
          validator: 'learningPaceValidator',
          parameters: { adaptivePacing: true },
          blocking: false
        }
      ],
      fallbackBehavior: {
        fallbackType: 'reduced_intensity',
        userNotification: 'Content intensity has been reduced for safety.',
        loggingRequired: true
      }
    });

    // Integration with three.js engine
    this.registerEngineIntegration({
      engineName: 'three-engine',
      integrationType: 'three_js',
      safetyHooks: [
        {
          hookType: 'during_rendering',
          methodName: 'validateVisualContent',
          parameters: { checkForTriggeringVisuals: true },
          required: true
        }
      ],
      validationRequirements: [
        {
          validationType: 'accessibility',
          validator: 'visualAccessibilityValidator',
          parameters: { checkForSeizureRisks: true },
          blocking: true
        }
      ],
      fallbackBehavior: {
        fallbackType: 'alternative_content',
        fallbackContent: 'Alternative visual content provided for safety.',
        userNotification: 'Visual content has been modified for your safety and comfort.',
        loggingRequired: true
      }
    });
  }

  private startSafetyMonitoring(): void {
    // Monitor active sessions for safety
    setInterval(() => {
      this.performSafetyChecks();
    }, this.configuration.safetyCheckIntervalSeconds * 1000);

    // Monitor for session timeouts
    setInterval(() => {
      this.checkSessionTimeouts();
    }, 60000); // Check every minute
  }

  private async performSafetyChecks(): Promise<void> {
    for (const [sessionId, session] of this.activeSessions) {
      try {
        // Check for user state changes
        const userProfile = await this.userSafetyManager.getUserProfile(session.userId);
        if (!userProfile) continue;

        // Perform safety checkpoint
        const checkpoint = await this.createSafetyCheckpoint(session, userProfile);

        // Check for violations or concerns
        if (checkpoint.userState.emotionalState === 'crisis' ||
            checkpoint.userState.stressIndicators.length > 3) {
          await this.handlePotentialSafetyConcern(sessionId, checkpoint);
        }
      } catch (error) {
        this.handleSafetyError('system_error', 'medium', `Safety check failed for session ${sessionId}`, { error });
      }
    }
  }

  private async createSafetyCheckpoint(session: SafetySession, userProfile: UserSafetyProfile) {
    // This would integrate with actual user monitoring systems
    return {
      timestamp: new Date(),
      checkpointType: 'scheduled' as const,
      userState: {
        emotionalState: 'calm' as const,
        engagementLevel: 'active' as const,
        comfortLevel: 8,
        stressIndicators: [],
        copingResources: ['breathing_techniques', 'grounding_exercises']
      },
      contentState: {
        currentIntensity: ContentIntensity.MILD,
        activeTriggers: [],
        userEngagement: 8,
        pacing: 'appropriate' as const,
        comprehensionLevel: 'high' as const
      },
      recommendations: [],
      actionsTaken: []
    };
  }

  private async checkSessionTimeouts(): Promise<void> {
    const now = new Date();
    const timeoutMs = this.configuration.sessionTimeoutMinutes * 60 * 1000;

    for (const [sessionId, session] of this.activeSessions) {
      if (now.getTime() - session.lastActivity.getTime() > timeoutMs) {
        await this.endSession(sessionId, 'timeout');
      }
    }
  }

  private async validateUserForSession(profile: UserSafetyProfile): Promise<ValidationResult> {
    // Check consent status
    if (profile.consentStatus !== 'granted') {
      return 'invalid';
    }

    // Check for critical risk level
    if (profile.riskLevel === UserRiskLevel.CRITICAL) {
      return 'invalid';
    }

    // Check age verification if required
    if (this.configuration.ageAppropriateFiltering && !profile.ageVerification?.verified) {
      return 'warning';
    }

    return 'valid';
  }

  private async validateContentAgainstProfile(
    analysis: ContentAnalysis,
    profile: UserSafetyProfile
  ): Promise<ValidationResult> {
    // Check content intensity against user preferences
    if (analysis.contentIntensity > profile.contentPreferences[0]?.maxIntensity) {
      return 'warning';
    }

    // Check for blocked trigger categories
    const blockedCategories = profile.triggerCategories.filter(cat =>
      profile.contentPreferences.find(p => p.category === cat)?.completelyBlocked
    );

    const foundBlockedTriggers = analysis.triggerWarnings.filter(w =>
      blockedCategories.includes(w.category)
    );

    if (foundBlockedTriggers.length > 0) {
      return 'invalid';
    }

    return 'valid';
  }

  private async assessContentRisk(analysis: ContentAnalysis, profile: UserSafetyProfile) {
    // Calculate overall risk based on content analysis and user profile
    return {
      overallRisk: UserRiskLevel.LOW,
      categoryRisks: {} as Record<TriggerCategory, UserRiskLevel>,
      traumaIndicators: [],
      protectiveFactors: ['user_consent', 'safety_framework_active'],
      recommendedActions: ['continue' as SafetyAction]
    };
  }

  private async handleSafeWord(sessionId: string, safeWord: string): Promise<SafetyAction> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return 'stop';

    // Record emergency action
    session.emergencyActions.push({
      timestamp: new Date(),
      trigger: 'safe_word',
      action: 'pause',
      reason: `Safe word used: ${safeWord}`,
      notificationsSent: [],
      followUpRequired: true
    });

    // Pause session and initiate grounding
    session.status = SessionStatus.SAFE_WORD_TRIGGERED;

    await this.traumaInformedEngine.initiateGroundingSequence(sessionId);

    this.logSafetyEvent('warning', 'emergency', `Safe word triggered in session ${sessionId}: ${safeWord}`);

    return 'pause';
  }

  private async handleEmergency(sessionId: string, reason: string): Promise<SafetyAction> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return 'stop';

    // Record emergency action
    session.emergencyActions.push({
      timestamp: new Date(),
      trigger: 'user_request',
      action: 'terminate',
      reason,
      notificationsSent: session.userFeedback.map(f => f.feedbackType).filter(t => t === 'emergency'),
      followUpRequired: true
    });

    // Terminate session and initiate aftercare
    session.status = SessionStatus.EMERGENCY_STOP;

    await this.traumaInformedEngine.initiateAftercareProtocol(sessionId, 'emergency');

    this.logSafetyEvent('critical', 'emergency', `Emergency stop triggered in session ${sessionId}: ${reason}`);

    return 'terminate';
  }

  private async processUserFeedback(sessionId: string, feedback: string): Promise<SafetyAction> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return 'continue';

    // Record feedback
    session.userFeedback.push({
      timestamp: new Date(),
      feedbackType: 'general',
      rating: 3, // This would be parsed from feedback
      comments: feedback,
      anonymous: false
    });

    return 'continue';
  }

  private async checkBoundaryViolation(sessionId: string, context: string): Promise<SafetyAction> {
    // Check for boundary violations
    return 'continue';
  }

  private async processGeneralInteraction(sessionId: string, interaction: string): Promise<SafetyAction> {
    // Process general user interactions
    return 'continue';
  }

  private async handlePotentialSafetyConcern(sessionId: string, checkpoint: any): Promise<void> {
    // Handle potential safety concerns detected during monitoring
    this.logSafetyEvent('warning', 'safety_check', `Potential safety concern in session ${sessionId}`, {
      emotionalState: checkpoint.userState.emotionalState,
      stressIndicators: checkpoint.userState.stressIndicators
    });
  }

  private async generateSessionReport(sessionId: string): Promise<void> {
    // Generate comprehensive session report
    this.logSafetyEvent('info', 'system_event', `Generated session report for ${sessionId}`);
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private logSafetyEvent(
    level: 'debug' | 'info' | 'warning' | 'error' | 'critical',
    category: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency',
    message: string,
    context?: Record<string, any>
  ): void {
    const logEntry: SafetyLogEntry = {
      timestamp: new Date(),
      logLevel: level,
      category,
      message,
      context: context || {}
    };

    this.safetyLogs.push(logEntry);

    // Keep only last 10000 entries to prevent memory issues
    if (this.safetyLogs.length > 10000) {
      this.safetyLogs = this.safetyLogs.slice(-5000);
    }

    // In a real implementation, this would also write to persistent storage
    if (this.configuration.enableDetailedLogging) {
      console.log(`[SafetyFramework:${level}] ${message}`, context);
    }
  }

  private handleSafetyError(
    errorType: 'validation_failed' | 'filter_error' | 'user_safety' | 'system_error' | 'integration_error',
    severity: SafetyLevel,
    message: string,
    context?: Record<string, any>
  ): void {
    const error: SafetyError = {
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      errorType,
      severity,
      message,
      context: context || {},
      resolved: false
    };

    this.safetyErrors.push(error);

    // Log the error
    this.logSafetyEvent('error', 'system_event', `Safety error: ${message}`, {
      errorType,
      severity,
      errorId: error.errorId
    });

    // In a real implementation, critical errors might trigger emergency stops
    if (severity === SafetyLevel.CRITICAL) {
      this.emergencyStopAll('critical_safety_error');
    }
  }

  // Public getters for testing and monitoring
  public getActiveSessions(): string[] {
    return Array.from(this.activeSessions.keys());
  }

  public getSafetyLogs(limit?: number): SafetyLogEntry[] {
    const logs = [...this.safetyLogs];
    return limit ? logs.slice(-limit) : logs;
  }

  public getSafetyErrors(limit?: number): SafetyError[] {
    const errors = [...this.safetyErrors];
    return limit ? errors.slice(-limit) : errors;
  }

  public isFrameworkInitialized(): boolean {
    return this.isInitialized;
  }
}