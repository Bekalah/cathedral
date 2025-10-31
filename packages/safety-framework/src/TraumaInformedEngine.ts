/**
 * Trauma-Informed Content Engine
 * Handles sensitive content processing, user boundaries, and trauma-informed delivery
 */

import {
  TraumaInformedConfiguration,
  UserSafetyProfile,
  ContentAnalysis,
  SafetySession,
  ContentIntensity,
  TriggerWarning,
  GroundingTechnique,
  AftercareProtocol,
  IntegrationSupport,
  IntensityRampConfiguration,
  SafeWordConfiguration,
  UserStateAssessment,
  SessionStatus,
  SafetyLevel,
  SafetyAction
} from './types/SafetyTypes.js';

/**
 * Trauma-Informed Engine for sensitive content handling
 */
export class TraumaInformedEngine {
  private configuration: TraumaInformedConfiguration;
  private sessionStates: Map<string, SessionState> = new Map();
  private userStates: Map<string, UserState> = new Map();
  private groundingTechniques: GroundingTechnique[] = [];
  private aftercareProtocols: AftercareProtocol[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.configuration = this.createDefaultConfiguration();
    this.initializeGroundingTechniques();
    this.initializeAftercareProtocols();
  }

  /**
   * Initialize the trauma-informed engine
   */
  public async initialize(): Promise<boolean> {
    try {
      // Load trauma-informed best practices
      await this.loadTraumaInformedGuidelines();

      // Initialize monitoring systems
      this.startStateMonitoring();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize TraumaInformedEngine:', error);
      return false;
    }
  }

  /**
   * Initialize a new session with trauma-informed systems
   */
  public async initializeSession(
    sessionId: string,
    userProfile: UserSafetyProfile
  ): Promise<boolean> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const sessionState: SessionState = {
        sessionId,
        userId: userProfile.userId,
        currentIntensity: this.configuration.intensityRamping.initialLevel,
        intensityRampProgress: 0,
        lastIntensityChange: new Date(),
        safeWordsUsed: [],
        groundingSessionsInitiated: 0,
        currentUserState: {
          emotionalState: 'calm',
          engagementLevel: 'passive',
          comfortLevel: 10,
          stressIndicators: [],
          copingResources: []
        },
        pacingAdjustments: [],
        boundaryViolations: []
      };

      const userState: UserState = {
        userId: userProfile.userId,
        baselineEmotionalState: 'calm',
        currentEmotionalState: 'calm',
        stressThreshold: this.calculateStressThreshold(userProfile),
        copingStrategies: this.extractCopingStrategies(userProfile),
        lastAssessment: new Date(),
        assessments: []
      };

      this.sessionStates.set(sessionId, sessionState);
      this.userStates.set(userProfile.userId, userState);

      return true;
    } catch (error) {
      console.error(`Failed to initialize session ${sessionId}:`, error);
      return false;
    }
  }

  /**
   * Process content through trauma-informed filters
   */
  public async processContent(
    analysis: ContentAnalysis,
    sessionId: string,
    userProfile: UserSafetyProfile
  ): Promise<Partial<ContentAnalysis>> {
    const sessionState = this.sessionStates.get(sessionId);
    if (!sessionState) {
      throw new Error(`Session ${sessionId} not found`);
    }

    try {
      // Assess current user state
      const currentState = await this.assessCurrentUserState(sessionId, userProfile);

      // Apply intensity scaling based on user state and preferences
      const intensityAdjusted = await this.applyIntensityScaling(
        analysis,
        sessionState,
        currentState,
        userProfile
      );

      // Add trauma-informed trigger warnings
      const enhancedWarnings = await this.enhanceTriggerWarnings(
        analysis.triggerWarnings,
        userProfile,
        currentState
      );

      // Apply pacing adjustments
      const pacingAdjusted = await this.applyPacingAdjustments(
        intensityAdjusted,
        sessionState,
        currentState
      );

      // Check for boundary violations
      const boundaryCheck = await this.checkContentBoundaries(
        pacingAdjusted,
        userProfile
      );

      return {
        filteredContent: pacingAdjusted.filteredContent,
        triggerWarnings: enhancedWarnings,
        contentIntensity: pacingAdjusted.contentIntensity,
        riskAssessment: boundaryCheck.riskAssessment
      };
    } catch (error) {
      console.error(`Content processing failed for session ${sessionId}:`, error);
      throw error;
    }
  }

  /**
   * Handle safe word activation
   */
  public async handleSafeWord(
    sessionId: string,
    safeWord: string
  ): Promise<SafetyAction> {
    const sessionState = this.sessionStates.get(sessionId);
    if (!sessionState) {
      return 'stop';
    }

    try {
      // Record safe word usage
      sessionState.safeWordsUsed.push({
        word: safeWord,
        timestamp: new Date(),
        context: 'user_initiated'
      });

      // Immediately pause content delivery
      sessionState.currentIntensity = ContentIntensity.VERY_MILD;

      // Initiate grounding sequence
      await this.initiateGroundingSequence(sessionId);

      // Update user state
      const userState = this.userStates.get(sessionState.userId);
      if (userState) {
        userState.currentEmotionalState = 'distressed';
        userState.lastAssessment = new Date();
      }

      return 'pause';
    } catch (error) {
      console.error(`Safe word handling failed for session ${sessionId}:`, error);
      return 'stop';
    }
  }

  /**
   * Initiate grounding sequence for user
   */
  public async initiateGroundingSequence(sessionId: string): Promise<boolean> {
    const sessionState = this.sessionStates.get(sessionId);
    if (!sessionState) {
      return false;
    }

    try {
      sessionState.groundingSessionsInitiated++;

      // Select appropriate grounding techniques
      const techniques = this.selectGroundingTechniques(sessionState);

      // Apply grounding techniques based on user state and preferences
      for (const technique of techniques) {
        await this.applyGroundingTechnique(sessionId, technique);
      }

      return true;
    } catch (error) {
      console.error(`Grounding sequence failed for session ${sessionId}:`, error);
      return false;
    }
  }

  /**
   * Process session end and initiate aftercare
   */
  public async processSessionEnd(
    sessionId: string,
    reason: string
  ): Promise<boolean> {
    const sessionState = this.sessionStates.get(sessionId);
    if (!sessionState) {
      return false;
    }

    try {
      // Determine appropriate aftercare protocol
      const protocol = this.selectAftercareProtocol(reason, sessionState);

      // Initiate aftercare
      await this.initiateAftercareProtocol(sessionId, protocol);

      // Schedule integration support
      await this.scheduleIntegrationSupport(sessionId, sessionState);

      // Clean up session state
      this.sessionStates.delete(sessionId);

      return true;
    } catch (error) {
      console.error(`Session end processing failed for session ${sessionId}:`, error);
      return false;
    }
  }

  /**
   * Monitor and assess current user state
   */
  public async assessCurrentUserState(
    sessionId: string,
    userProfile: UserSafetyProfile
  ): Promise<UserStateAssessment> {
    const sessionState = this.sessionStates.get(sessionId);
    const userState = this.userStates.get(userProfile.userId);

    if (!sessionState || !userState) {
      throw new Error(`Session or user state not found for ${sessionId}`);
    }

    // This would integrate with actual user monitoring (biometrics, interaction patterns, etc.)
    const assessment: UserStateAssessment = {
      emotionalState: userState.currentEmotionalState,
      engagementLevel: this.calculateEngagementLevel(sessionState),
      comfortLevel: this.calculateComfortLevel(sessionState, userState),
      stressIndicators: this.detectStressIndicators(sessionState, userState),
      copingResources: userState.copingStrategies
    };

    // Update user state
    userState.lastAssessment = new Date();
    userState.assessments.push(assessment);

    return assessment;
  }

  /**
   * Adjust content intensity based on user state and preferences
   */
  public async adjustContentIntensity(
    sessionId: string,
    targetIntensity: ContentIntensity,
    reason: string
  ): Promise<boolean> {
    const sessionState = this.sessionStates.get(sessionId);
    if (!sessionState) {
      return false;
    }

    try {
      const currentTime = new Date();
      const timeSinceLastChange = currentTime.getTime() - sessionState.lastIntensityChange.getTime();
      const minIntervalMs = this.configuration.intensityRamping.rampIntervalMinutes * 60 * 1000;

      // Check if enough time has passed for intensity change
      if (timeSinceLastChange < minIntervalMs && sessionState.intensityRampProgress > 0) {
        return false; // Too soon for another change
      }

      // Validate intensity change is within safe bounds
      if (!this.isIntensityChangeSafe(sessionState.currentIntensity, targetIntensity, sessionState)) {
        return false;
      }

      // Apply intensity change
      sessionState.currentIntensity = targetIntensity;
      sessionState.lastIntensityChange = currentTime;
      sessionState.intensityRampProgress++;

      // Record pacing adjustment
      sessionState.pacingAdjustments.push({
        timestamp: currentTime,
        fromIntensity: sessionState.currentIntensity,
        toIntensity: targetIntensity,
        reason
      });

      return true;
    } catch (error) {
      console.error(`Intensity adjustment failed for session ${sessionId}:`, error);
      return false;
    }
  }

  // Private helper methods

  private createDefaultConfiguration(): TraumaInformedConfiguration {
    return {
      pacingStrategy: 'adaptive',
      intensityRamping: {
        initialLevel: ContentIntensity.VERY_MILD,
        maxRampPerSession: 50, // 50% max increase per session
        rampIntervalMinutes: 15,
        userControlledRamping: true,
        automaticReductionTriggers: [
          'stress_detected',
          'multiple_safe_words',
          'boundary_violation',
          'emotional_distress'
        ]
      },
      safeWordMechanism: {
        safeWords: ['red', 'stop', 'pause', 'safe'],
        immediateAction: 'pause',
        confirmationRequired: false,
        notificationTriggers: ['emergency_contacts', 'support_team']
      },
      groundingTechniques: [],
      aftercareProtocols: [],
      integrationSupport: {
        integrationPeriodDays: 7,
        supportTypes: ['check_in', 'resources', 'community'],
        resourceRecommendations: [],
        followUpSessions: true,
        communitySupport: true
      }
    };
  }

  private initializeGroundingTechniques(): void {
    this.groundingTechniques = [
      {
        techniqueId: 'breathing_478',
        name: '4-7-8 Breathing',
        description: 'Calming breathing technique to reduce anxiety and promote grounding',
        category: 'breathing',
        durationMinutes: 5,
        instructions: [
          'Breathe in quietly through your nose for 4 seconds',
          'Hold your breath for 7 seconds',
          'Exhale completely through your mouth for 8 seconds',
          'Repeat 4 times'
        ],
        accessibilityNotes: 'Suitable for most users, can be done seated or lying down'
      },
      {
        techniqueId: 'sensory_54321',
        name: '5-4-3-2-1 Grounding',
        description: 'Sensory grounding technique using all five senses',
        category: 'sensory',
        durationMinutes: 3,
        instructions: [
          'Name 5 things you can see',
          'Name 4 things you can touch',
          'Name 3 things you can hear',
          'Name 2 things you can smell',
          'Name 1 thing you can taste'
        ],
        accessibilityNotes: 'Adaptable for visual impairments, focus on available senses'
      },
      {
        techniqueId: 'cognitive_categories',
        name: 'Category Grounding',
        description: 'Cognitive technique using categorization to redirect focus',
        category: 'cognitive',
        durationMinutes: 5,
        instructions: [
          'Name 3 colors you see around you',
          'Name 3 shapes you can identify',
          'Name 3 textures you can feel or imagine',
          'Name 3 sounds you can hear',
          'Name 3 things you appreciate about yourself'
        ],
        accessibilityNotes: 'Good for neurodiverse users, highly adaptable'
      }
    ];
  }

  private initializeAftercareProtocols(): void {
    this.aftercareProtocols = [
      {
        protocolId: 'standard_integration',
        name: 'Standard Integration Support',
        triggers: ['session_completed', 'mild_intensity'],
        durationMinutes: 30,
        activities: [
          {
            activityType: 'reflection',
            description: 'Guided reflection on the experience',
            durationMinutes: 10,
            required: true
          },
          {
            activityType: 'journaling',
            description: 'Optional journaling for personal insights',
            durationMinutes: 15,
            required: false
          }
        ],
        checkInSchedule: [
          {
            timeAfterSession: 60, // 1 hour
            checkInType: 'automated',
            questions: ['How are you feeling?', 'Do you need additional support?'],
            required: false
          },
          {
            timeAfterSession: 1440, // 24 hours
            checkInType: 'automated',
            questions: ['How has your experience settled?', 'Any lingering thoughts or feelings?'],
            required: false
          }
        ]
      },
      {
        protocolId: 'intensive_aftercare',
        name: 'Intensive Aftercare Support',
        triggers: ['emergency_stop', 'safe_word_used', 'high_intensity'],
        durationMinutes: 60,
        activities: [
          {
            activityType: 'rest',
            description: 'Encouraged rest and self-care period',
            durationMinutes: 20,
            required: true
          },
          {
            activityType: 'discussion',
            description: 'Facilitated discussion about the experience',
            durationMinutes: 30,
            required: true
          },
          {
            activityType: 'professional_referral',
            description: 'Assessment for professional support if needed',
            durationMinutes: 10,
            required: false
          }
        ],
        checkInSchedule: [
          {
            timeAfterSession: 30, // 30 minutes
            checkInType: 'facilitated',
            questions: ['How are you feeling right now?', 'Do you feel safe?'],
            required: true
          },
          {
            timeAfterSession: 120, // 2 hours
            checkInType: 'facilitated',
            questions: ['How has your state changed?', 'Any immediate needs?'],
            required: true
          }
        ]
      }
    ];
  }

  private async loadTraumaInformedGuidelines(): Promise<void> {
    // Load trauma-informed care guidelines and best practices
    // This would typically load from external resources or configuration
  }

  private startStateMonitoring(): void {
    // Start background monitoring of user states
    setInterval(() => {
      this.performStateAssessments();
    }, 30000); // Check every 30 seconds
  }

  private async performStateAssessments(): Promise<void> {
    for (const [sessionId, sessionState] of this.sessionStates) {
      try {
        // This would integrate with actual user monitoring systems
        // For now, we'll simulate basic state assessment
        await this.updateSessionState(sessionId, sessionState);
      } catch (error) {
        console.error(`State assessment failed for session ${sessionId}:`, error);
      }
    }
  }

  private async updateSessionState(sessionId: string, sessionState: SessionState): Promise<void> {
    // Update session state based on monitoring data
    // This is where real user monitoring integration would happen
  }

  private calculateStressThreshold(profile: UserSafetyProfile): number {
    // Calculate stress threshold based on user profile and history
    switch (profile.riskLevel) {
      case 'low': return 3;
      case 'moderate': return 5;
      case 'high': return 7;
      case 'critical': return 9;
      default: return 5;
    }
  }

  private extractCopingStrategies(profile: UserSafetyProfile): string[] {
    // Extract coping strategies from user profile and accessibility needs
    const strategies: string[] = [];

    if (profile.accessibilityNeeds.some(need => need.accommodations.includes('sensory_support'))) {
      strategies.push('sensory_grounding');
    }

    if (profile.culturalBackground.spiritualPractices.length > 0) {
      strategies.push('spiritual_grounding');
    }

    strategies.push('breathing_techniques');
    return strategies;
  }

  private async applyIntensityScaling(
    analysis: ContentAnalysis,
    sessionState: SessionState,
    currentState: UserStateAssessment,
    userProfile: UserSafetyProfile
  ): Promise<ContentAnalysis> {
    let adjustedIntensity = analysis.contentIntensity;
    let adjustedContent = analysis.filteredContent || analysis.originalContent;

    // Apply automatic intensity reduction if user shows distress
    if (currentState.emotionalState === 'distressed' || currentState.stressIndicators.length > 2) {
      adjustedIntensity = this.reduceIntensity(analysis.contentIntensity);
      adjustedContent = await this.applyIntensityReduction(analysis.originalContent, adjustedIntensity);
    }

    // Check against user preferences
    const userMaxIntensity = userProfile.contentPreferences[0]?.maxIntensity || ContentIntensity.MODERATE;
    if (adjustedIntensity > userMaxIntensity) {
      adjustedIntensity = userMaxIntensity;
      adjustedContent = await this.applyIntensityReduction(analysis.originalContent, adjustedIntensity);
    }

    return {
      ...analysis,
      contentIntensity: adjustedIntensity,
      filteredContent: adjustedContent
    };
  }

  private async enhanceTriggerWarnings(
    warnings: TriggerWarning[],
    userProfile: UserSafetyProfile,
    currentState: UserStateAssessment
  ): Promise<TriggerWarning[]> {
    const enhancedWarnings = [...warnings];

    // Add user-specific context to warnings
    for (const warning of enhancedWarnings) {
      if (userProfile.triggerCategories.includes(warning.category)) {
        warning.severity = Math.max(warning.severity, SafetyLevel.MEDIUM);
      }

      // Add alternatives based on user preferences
      warning.alternatives = this.generateWarningAlternatives(warning, userProfile);
    }

    return enhancedWarnings;
  }

  private async applyPacingAdjustments(
    analysis: ContentAnalysis,
    sessionState: SessionState,
    currentState: UserStateAssessment
  ): Promise<ContentAnalysis> {
    // Apply pacing adjustments based on user engagement and comfort
    if (currentState.engagementLevel === 'overwhelmed' || currentState.comfortLevel < 5) {
      // Slow down pacing
      return {
        ...analysis,
        filteredContent: await this.applyPacingReduction(analysis.filteredContent || analysis.originalContent)
      };
    }

    return analysis;
  }

  private async checkContentBoundaries(
    analysis: ContentAnalysis,
    userProfile: UserSafetyProfile
  ): Promise<{ riskAssessment: any; violations: string[] }> {
    const violations: string[] = [];
    let overallRisk = 'low' as const;

    // Check each user boundary
    for (const boundary of userProfile.boundaries) {
      if (this.violatesBoundary(analysis, boundary)) {
        violations.push(boundary.description);
        if (boundary.boundaryType === 'hard') {
          overallRisk = 'high';
        }
      }
    }

    return {
      riskAssessment: {
        overallRisk,
        categoryRisks: {},
        traumaIndicators: [],
        protectiveFactors: ['trauma_informed_processing'],
        recommendedActions: violations.length > 0 ? ['pause' as SafetyAction] : ['continue' as SafetyAction]
      },
      violations
    };
  }

  private selectGroundingTechniques(sessionState: SessionState): GroundingTechnique[] {
    // Select appropriate techniques based on session state and user needs
    const techniques: GroundingTechnique[] = [];

    if (sessionState.currentUserState.emotionalState === 'distressed') {
      techniques.push(this.groundingTechniques.find(t => t.techniqueId === 'breathing_478')!);
    }

    if (sessionState.currentUserState.stressIndicators.includes('sensory_overload')) {
      techniques.push(this.groundingTechniques.find(t => t.techniqueId === 'sensory_54321')!);
    }

    // Always include at least one technique
    if (techniques.length === 0) {
      techniques.push(this.groundingTechniques[0]);
    }

    return techniques;
  }

  private async applyGroundingTechnique(sessionId: string, technique: GroundingTechnique): Promise<void> {
    // Apply the grounding technique
    // This would integrate with UI systems to present the technique to the user
  }

  private selectAftercareProtocol(reason: string, sessionState: SessionState): string {
    if (reason === 'emergency' || sessionState.safeWordsUsed.length > 0) {
      return 'intensive_aftercare';
    }
    return 'standard_integration';
  }

  private async initiateAftercareProtocol(sessionId: string, protocolName: string): Promise<void> {
    const protocol = this.aftercareProtocols.find(p => p.protocolId === protocolName);
    if (!protocol) return;

    // Initiate aftercare activities
    for (const activity of protocol.activities) {
      await this.executeAftercareActivity(sessionId, activity);
    }
  }

  private async executeAftercareActivity(sessionId: string, activity: any): Promise<void> {
    // Execute the aftercare activity
    // This would integrate with UI and support systems
  }

  private async scheduleIntegrationSupport(sessionId: string, sessionState: SessionState): Promise<void> {
    // Schedule follow-up support and check-ins
  }

  private calculateEngagementLevel(sessionState: SessionState): 'disengaged' | 'passive' | 'active' | 'intense' | 'overwhelmed' {
    // Calculate engagement level based on session metrics
    return 'active';
  }

  private calculateComfortLevel(sessionState: SessionState, userState: UserState): number {
    // Calculate comfort level on 1-10 scale
    return 8;
  }

  private detectStressIndicators(sessionState: SessionState, userState: UserState): string[] {
    const indicators: string[] = [];

    if (userState.currentEmotionalState === 'agitated' || userState.currentEmotionalState === 'distressed') {
      indicators.push('emotional_distress');
    }

    if (sessionState.safeWordsUsed.length > 0) {
      indicators.push('safe_word_usage');
    }

    return indicators;
  }

  private reduceIntensity(currentIntensity: ContentIntensity): ContentIntensity {
    const intensityLevels = [
      ContentIntensity.VERY_MILD,
      ContentIntensity.MILD,
      ContentIntensity.MODERATE,
      ContentIntensity.INTENSE,
      ContentIntensity.VERY_INTENSE,
      ContentIntensity.EXTREME
    ];

    const currentIndex = intensityLevels.indexOf(currentIntensity);
    return currentIndex > 0 ? intensityLevels[currentIndex - 1] : ContentIntensity.VERY_MILD;
  }

  private async applyIntensityReduction(content: string, targetIntensity: ContentIntensity): Promise<string> {
    // Apply content modifications to reduce intensity
    // This would use sophisticated NLP and content transformation
    return content; // Placeholder
  }

  private generateWarningAlternatives(warning: TriggerWarning, userProfile: UserSafetyProfile): string[] {
    // Generate alternative approaches for trigger warnings
    return ['Alternative content available', 'Skip this section', 'Modified version available'];
  }

  private async applyPacingReduction(content: string): Promise<string> {
    // Apply pacing modifications to slow down content delivery
    return content; // Placeholder
  }

  private isIntensityChangeSafe(
    currentIntensity: ContentIntensity,
    targetIntensity: ContentIntensity,
    sessionState: SessionState
  ): boolean {
    const intensityLevels = [
      ContentIntensity.VERY_MILD,
      ContentIntensity.MILD,
      ContentIntensity.MODERATE,
      ContentIntensity.INTENSE,
      ContentIntensity.VERY_INTENSE,
      ContentIntensity.EXTREME
    ];

    const currentIndex = intensityLevels.indexOf(currentIntensity);
    const targetIndex = intensityLevels.indexOf(targetIntensity);

    // Don't allow intensity to increase too rapidly
    if (targetIndex > currentIndex + 1) {
      return false;
    }

    // Check ramp configuration
    if (targetIndex > currentIndex &&
        sessionState.intensityRampProgress >= this.configuration.intensityRamping.maxRampPerSession) {
      return false;
    }

    return true;
  }

  private violatesBoundary(analysis: ContentAnalysis, boundary: any): boolean {
    // Check if content violates user boundaries
    return false; // Placeholder
  }
}

// Supporting interfaces
interface SessionState {
  sessionId: string;
  userId: string;
  currentIntensity: ContentIntensity;
  intensityRampProgress: number;
  lastIntensityChange: Date;
  safeWordsUsed: Array<{
    word: string;
    timestamp: Date;
    context: string;
  }>;
  groundingSessionsInitiated: number;
  currentUserState: UserStateAssessment;
  pacingAdjustments: Array<{
    timestamp: Date;
    fromIntensity: ContentIntensity;
    toIntensity: ContentIntensity;
    reason: string;
  }>;
  boundaryViolations: string[];
}

interface UserState {
  userId: string;
  baselineEmotionalState: 'calm' | 'agitated' | 'distressed' | 'overwhelmed' | 'crisis';
  currentEmotionalState: 'calm' | 'agitated' | 'distressed' | 'overwhelmed' | 'crisis';
  stressThreshold: number;
  copingStrategies: string[];
  lastAssessment: Date;
  assessments: UserStateAssessment[];
}