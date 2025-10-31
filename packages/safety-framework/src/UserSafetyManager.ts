/**
 * User Safety Manager - Comprehensive User Protection System
 * Manages user profiles, risk assessment, and safety throughout the experience
 */

import {
  UserSafetyProfile,
  SafetySession,
  SafetyReport,
  UserRiskLevel,
  ConsentStatus,
  TriggerCategory,
  ContentIntensity,
  SafetyLevel,
  SessionStatus,
  TimeRange,
  SafetyMetrics,
  SafetyInsight,
  ContentPreference,
  UserBoundary,
  EmergencyContact,
  AccessibilityRequirement,
  CulturalProfile,
  AgeVerification,
  ValidationResult
} from './types/SafetyTypes.js';

/**
 * User Safety Manager for comprehensive user protection
 */
export class UserSafetyManager {
  private userProfiles: Map<string, UserSafetyProfile> = new Map();
  private sessionHistory: Map<string, SafetySession[]> = new Map();
  private safetyReports: Map<string, SafetyReport[]> = new Map();
  private riskAssessmentCache: Map<string, { assessment: UserRiskLevel; timestamp: Date }> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    // Initialize with default safety profiles if needed
  }

  /**
   * Initialize the user safety manager
   */
  public async initialize(): Promise<boolean> {
    try {
      // Load existing user profiles
      await this.loadUserProfiles();

      // Initialize risk assessment models
      await this.initializeRiskAssessment();

      // Setup periodic safety checks
      this.setupPeriodicSafetyChecks();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize UserSafetyManager:', error);
      return false;
    }
  }

  /**
   * Create or update a user safety profile
   */
  public async createUserProfile(profileData: {
    userId: string;
    triggerCategories?: TriggerCategory[];
    contentPreferences?: ContentPreference[];
    boundaries?: UserBoundary[];
    emergencyContacts?: EmergencyContact[];
    accessibilityNeeds?: AccessibilityRequirement[];
    culturalBackground?: CulturalProfile;
    ageVerification?: AgeVerification;
  }): Promise<UserSafetyProfile> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Validate input data
      const validation = this.validateProfileData(profileData);
      if (validation !== 'valid') {
        throw new Error(`Invalid profile data: ${validation}`);
      }

      // Create new profile
      const profile: UserSafetyProfile = {
        userId: profileData.userId,
        riskLevel: await this.assessUserRisk(profileData),
        triggerCategories: profileData.triggerCategories || [],
        contentPreferences: profileData.contentPreferences || [],
        boundaries: profileData.boundaries || [],
        emergencyContacts: profileData.emergencyContacts || [],
        accessibilityNeeds: profileData.accessibilityNeeds || [],
        culturalBackground: profileData.culturalBackground || {
          primaryCulture: 'general',
          secondaryCultures: [],
          spiritualPractices: [],
          culturalSensitivityPreferences: []
        },
        ageVerification: profileData.ageVerification,
        consentStatus: ConsentStatus.PENDING,
        lastUpdated: new Date(),
        createdAt: new Date()
      };

      // Store profile
      this.userProfiles.set(profileData.userId, profile);

      // Update risk assessment cache
      this.riskAssessmentCache.set(profileData.userId, {
        assessment: profile.riskLevel,
        timestamp: new Date()
      });

      // Log profile creation
      this.logSafetyEvent('info', 'user_action', `Created safety profile for user ${profileData.userId}`);

      return profile;
    } catch (error) {
      console.error(`Failed to create user profile for ${profileData.userId}:`, error);
      throw error;
    }
  }

  /**
   * Get user safety profile
   */
  public async getUserProfile(userId: string): Promise<UserSafetyProfile | null> {
    try {
      // Check cache first
      let profile = this.userProfiles.get(userId);

      if (!profile) {
        // Try to load from persistent storage
        profile = await this.loadUserProfileFromStorage(userId);
        if (profile) {
          this.userProfiles.set(userId, profile);
        }
      }

      return profile || null;
    } catch (error) {
      console.error(`Failed to get user profile for ${userId}:`, error);
      return null;
    }
  }

  /**
   * Update user consent status
   */
  public async updateConsentStatus(
    userId: string,
    consentStatus: ConsentStatus,
    additionalInfo?: Record<string, any>
  ): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        throw new Error(`User profile not found for ${userId}`);
      }

      // Update consent status
      profile.consentStatus = consentStatus;
      profile.lastUpdated = new Date();

      // Store updated profile
      this.userProfiles.set(userId, profile);

      // Log consent update
      this.logSafetyEvent('info', 'user_action', `Updated consent status for user ${userId}: ${consentStatus}`);

      return true;
    } catch (error) {
      console.error(`Failed to update consent status for ${userId}:`, error);
      return false;
    }
  }

  /**
   * Record session for user
   */
  public async recordSession(session: SafetySession): Promise<boolean> {
    try {
      const userId = session.userId;

      // Get or create session history for user
      let sessions = this.sessionHistory.get(userId) || [];
      sessions.push(session);

      // Keep only last 100 sessions per user
      if (sessions.length > 100) {
        sessions = sessions.slice(-100);
      }

      this.sessionHistory.set(userId, sessions);

      // Update user profile based on session outcome
      await this.updateProfileFromSession(session);

      return true;
    } catch (error) {
      console.error(`Failed to record session for user ${session.userId}:`, error);
      return false;
    }
  }

  /**
   * Assess current user risk level
   */
  public async assessCurrentRisk(userId: string): Promise<UserRiskLevel> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        return UserRiskLevel.MODERATE; // Default to moderate if no profile
      }

      // Check cache first
      const cached = this.riskAssessmentCache.get(userId);
      if (cached && (Date.now() - cached.timestamp.getTime()) < 300000) { // 5 minutes
        return cached.assessment;
      }

      // Perform comprehensive risk assessment
      const riskLevel = await this.performRiskAssessment(profile);

      // Update cache
      this.riskAssessmentCache.set(userId, {
        assessment: riskLevel,
        timestamp: new Date()
      });

      return riskLevel;
    } catch (error) {
      console.error(`Failed to assess risk for user ${userId}:`, error);
      return UserRiskLevel.MODERATE;
    }
  }

  /**
   * Generate safety report
   */
  public async generateSafetyReport(
    reportType: 'session_summary' | 'violation_report' | 'user_feedback' | 'system_health' | 'trend_analysis',
    timeRange?: TimeRange
  ): Promise<SafetyReport> {
    try {
      const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const range = timeRange || {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        end: new Date(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      // Gather data based on report type
      const metrics = await this.gatherSafetyMetrics(reportType, range);
      const insights = await this.generateSafetyInsights(reportType, metrics);
      const recommendations = await this.generateRecommendations(reportType, insights);

      const report: SafetyReport = {
        reportId,
        reportType,
        timeRange: range,
        generatedAt: new Date(),
        data: metrics,
        insights,
        recommendations
      };

      // Store report
      const reports = this.safetyReports.get(reportType) || [];
      reports.push(report);
      if (reports.length > 50) {
        reports.shift(); // Keep only last 50 reports
      }
      this.safetyReports.set(reportType, reports);

      return report;
    } catch (error) {
      console.error(`Failed to generate safety report ${reportType}:`, error);
      throw error;
    }
  }

  /**
   * Check if user can safely start a new session
   */
  public async canStartNewSession(userId: string): Promise<{
    canStart: boolean;
    reason?: string;
    recommendations?: string[];
  }> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        return {
          canStart: false,
          reason: 'No safety profile found'
        };
      }

      // Check consent status
      if (profile.consentStatus !== ConsentStatus.GRANTED) {
        return {
          canStart: false,
          reason: 'Consent not granted',
          recommendations: ['Complete consent process before starting session']
        };
      }

      // Check recent session history for safety concerns
      const recentSessions = await this.getRecentSessions(userId, 24); // Last 24 hours
      const concerningSessions = recentSessions.filter(s =>
        s.status === SessionStatus.EMERGENCY_STOP ||
        s.status === SessionStatus.TERMINATED ||
        s.emergencyActions.length > 0
      );

      if (concerningSessions.length > 0) {
        return {
          canStart: false,
          reason: 'Recent safety concerns detected',
          recommendations: [
            'Wait 24 hours before starting new session',
            'Contact support for safety consultation',
            'Review and update safety preferences'
          ]
        };
      }

      // Check current risk level
      const currentRisk = await this.assessCurrentRisk(userId);
      if (currentRisk === UserRiskLevel.CRITICAL) {
        return {
          canStart: false,
          reason: 'Critical risk level detected',
          recommendations: [
            'Seek professional support before continuing',
            'Contact emergency services if in crisis',
            'Update safety profile with current needs'
          ]
        };
      }

      return { canStart: true };
    } catch (error) {
      console.error(`Failed to check session eligibility for user ${userId}:`, error);
      return {
        canStart: false,
        reason: 'Safety check failed'
      };
    }
  }

  /**
   * Get user's session history
   */
  public async getUserSessionHistory(
    userId: string,
    limit?: number
  ): Promise<SafetySession[]> {
    try {
      let sessions = this.sessionHistory.get(userId) || [];

      // Try to load from persistent storage if not in memory
      if (sessions.length === 0) {
        sessions = await this.loadSessionHistoryFromStorage(userId);
      }

      // Sort by start time (most recent first)
      sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

      return limit ? sessions.slice(0, limit) : sessions;
    } catch (error) {
      console.error(`Failed to get session history for user ${userId}:`, error);
      return [];
    }
  }

  /**
   * Update user boundaries
   */
  public async updateUserBoundaries(
    userId: string,
    boundaries: UserBoundary[]
  ): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        throw new Error(`User profile not found for ${userId}`);
      }

      profile.boundaries = boundaries;
      profile.lastUpdated = new Date();

      this.userProfiles.set(userId, profile);

      this.logSafetyEvent('info', 'user_action', `Updated boundaries for user ${userId}`);

      return true;
    } catch (error) {
      console.error(`Failed to update boundaries for user ${userId}:`, error);
      return false;
    }
  }

  /**
   * Add emergency contact for user
   */
  public async addEmergencyContact(
    userId: string,
    contact: EmergencyContact
  ): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(userId);
      if (!profile) {
        throw new Error(`User profile not found for ${userId}`);
      }

      profile.emergencyContacts.push(contact);
      profile.lastUpdated = new Date();

      this.userProfiles.set(userId, profile);

      this.logSafetyEvent('info', 'user_action', `Added emergency contact for user ${userId}`);

      return true;
    } catch (error) {
      console.error(`Failed to add emergency contact for user ${userId}:`, error);
      return false;
    }
  }

  // Private helper methods

  private validateProfileData(profileData: any): ValidationResult {
    if (!profileData.userId) {
      return 'invalid';
    }

    // Validate trigger categories
    if (profileData.triggerCategories) {
      const validCategories = Object.values(TriggerCategory);
      const invalidCategories = profileData.triggerCategories.filter((c: string) => !validCategories.includes(c));
      if (invalidCategories.length > 0) {
        return 'invalid';
      }
    }

    return 'valid';
  }

  private async assessUserRisk(profileData: any): Promise<UserRiskLevel> {
    let riskScore = 0;

    // Base risk from trigger categories
    riskScore += profileData.triggerCategories?.length * 0.5 || 0;

    // Risk from accessibility needs
    riskScore += profileData.accessibilityNeeds?.length * 0.3 || 0;

    // Risk from boundaries
    const hardBoundaries = profileData.boundaries?.filter((b: UserBoundary) => b.boundaryType === 'hard').length || 0;
    riskScore += hardBoundaries * 0.8;

    // Convert score to risk level
    if (riskScore >= 8) return UserRiskLevel.CRITICAL;
    if (riskScore >= 5) return UserRiskLevel.HIGH;
    if (riskScore >= 3) return UserRiskLevel.MODERATE;
    return UserRiskLevel.LOW;
  }

  private async performRiskAssessment(profile: UserSafetyProfile): Promise<UserRiskLevel> {
    // Comprehensive risk assessment based on profile and history
    let riskScore = 0;

    // Current profile factors
    riskScore += profile.triggerCategories.length * 0.5;
    riskScore += profile.accessibilityNeeds.length * 0.3;

    // Historical factors
    const recentSessions = await this.getRecentSessions(profile.userId, 7); // Last 7 days
    const emergencySessions = recentSessions.filter(s => s.emergencyActions.length > 0).length;
    riskScore += emergencySessions * 2;

    // Recency factors
    const daysSinceLastSession = await this.getDaysSinceLastSession(profile.userId);
    if (daysSinceLastSession > 30) {
      riskScore += 1; // Increased risk after long absence
    }

    // Convert to risk level
    if (riskScore >= 10) return UserRiskLevel.CRITICAL;
    if (riskScore >= 6) return UserRiskLevel.HIGH;
    if (riskScore >= 3) return UserRiskLevel.MODERATE;
    return UserRiskLevel.LOW;
  }

  private async getRecentSessions(userId: string, hours: number): Promise<SafetySession[]> {
    const sessions = await this.getUserSessionHistory(userId);
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);

    return sessions.filter(session => session.startTime >= cutoffTime);
  }

  private async getDaysSinceLastSession(userId: string): Promise<number> {
    const sessions = await this.getUserSessionHistory(userId, 1);
    if (sessions.length === 0) return 999; // Never had a session

    const lastSession = sessions[0];
    return Math.floor((Date.now() - lastSession.startTime.getTime()) / (24 * 60 * 60 * 1000));
  }

  private async updateProfileFromSession(session: SafetySession): Promise<void> {
    const profile = await this.getUserProfile(session.userId);
    if (!profile) return;

    // Update profile based on session outcomes
    if (session.emergencyActions.length > 0) {
      // Increase risk level if there were emergencies
      profile.riskLevel = this.increaseRiskLevel(profile.riskLevel);
    }

    if (session.violations.length > 0) {
      // Add any new trigger categories discovered
      const newTriggers = session.violations
        .filter(v => v.violationType === 'trigger')
        .map(v => v.description)
        .filter(desc => !profile.triggerCategories.includes(desc as TriggerCategory));

      profile.triggerCategories.push(...newTriggers as TriggerCategory[]);
    }

    profile.lastUpdated = new Date();
    this.userProfiles.set(session.userId, profile);
  }

  private increaseRiskLevel(currentLevel: UserRiskLevel): UserRiskLevel {
    switch (currentLevel) {
      case UserRiskLevel.LOW: return UserRiskLevel.MODERATE;
      case UserRiskLevel.MODERATE: return UserRiskLevel.HIGH;
      case UserRiskLevel.HIGH: return UserRiskLevel.CRITICAL;
      case UserRiskLevel.CRITICAL: return UserRiskLevel.CRITICAL;
      default: return UserRiskLevel.MODERATE;
    }
  }

  private async gatherSafetyMetrics(reportType: string, timeRange: TimeRange): Promise<SafetyMetrics> {
    // Gather metrics based on report type and time range
    const sessions = await this.getSessionsInTimeRange(timeRange);

    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === SessionStatus.COMPLETED).length;
    const terminatedSessions = sessions.filter(s => s.status === SessionStatus.TERMINATED).length;
    const emergencyActions = sessions.reduce((sum, s) => sum + s.emergencyActions.length, 0);

    // Calculate violation types
    const violationsByType: Record<string, number> = {};
    sessions.forEach(session => {
      session.violations.forEach(violation => {
        violationsByType[violation.violationType] = (violationsByType[violation.violationType] || 0) + 1;
      });
    });

    return {
      totalSessions,
      completedSessions,
      terminatedSessions,
      emergencyActions,
      violationsByType,
      userSatisfaction: await this.calculateUserSatisfaction(sessions),
      contentIntensityDistribution: this.calculateIntensityDistribution(sessions),
      triggerWarningEffectiveness: await this.calculateTriggerWarningEffectiveness(sessions),
      accessibilityCompliance: await this.calculateAccessibilityCompliance(sessions)
    };
  }

  private async generateSafetyInsights(reportType: string, metrics: SafetyMetrics): Promise<SafetyInsight[]> {
    const insights: SafetyInsight[] = [];

    // Generate insights based on metrics
    if (metrics.emergencyActions > metrics.totalSessions * 0.1) {
      insights.push({
        insightType: 'concern',
        title: 'High Emergency Rate',
        description: 'Emergency actions exceed 10% of total sessions',
        confidence: 0.9,
        actionable: true
      });
    }

    if (metrics.userSatisfaction < 3) {
      insights.push({
        insightType: 'improvement',
        title: 'User Satisfaction Needs Attention',
        description: 'Average user satisfaction is below acceptable levels',
        confidence: 0.8,
        actionable: true
      });
    }

    return insights;
  }

  private async generateRecommendations(reportType: string, insights: SafetyInsight[]): Promise<string[]> {
    const recommendations: string[] = [];

    for (const insight of insights) {
      if (insight.insightType === 'concern') {
        recommendations.push('Review and strengthen safety protocols');
        recommendations.push('Increase frequency of safety check-ins');
      }

      if (insight.insightType === 'improvement') {
        recommendations.push('Gather more detailed user feedback');
        recommendations.push('Review content intensity guidelines');
      }
    }

    return recommendations;
  }

  private async getSessionsInTimeRange(timeRange: TimeRange): Promise<SafetySession[]> {
    const sessions: SafetySession[] = [];

    for (const userSessions of this.sessionHistory.values()) {
      const filteredSessions = userSessions.filter(session =>
        session.startTime >= timeRange.start && session.startTime <= timeRange.end
      );
      sessions.push(...filteredSessions);
    }

    return sessions;
  }

  private async calculateUserSatisfaction(sessions: SafetySession[]): Promise<number> {
    // Calculate average user satisfaction from session feedback
    const feedbackRatings = sessions
      .flatMap(s => s.userFeedback)
      .map(f => f.rating);

    if (feedbackRatings.length === 0) return 3; // Default neutral

    return feedbackRatings.reduce((sum, rating) => sum + rating, 0) / feedbackRatings.length;
  }

  private calculateIntensityDistribution(sessions: SafetySession[]): Record<ContentIntensity, number> {
    const distribution: Record<string, number> = {};

    // This would analyze actual content intensity from sessions
    // For now, return placeholder data
    Object.values(ContentIntensity).forEach(intensity => {
      distribution[intensity] = Math.floor(Math.random() * 10);
    });

    return distribution as Record<ContentIntensity, number>;
  }

  private async calculateTriggerWarningEffectiveness(sessions: SafetySession[]): Promise<number> {
    // Calculate how effective trigger warnings are
    // This would analyze user responses to warnings
    return 0.8; // Placeholder
  }

  private async calculateAccessibilityCompliance(sessions: SafetySession[]): Promise<number> {
    // Calculate accessibility compliance rate
    return 0.9; // Placeholder
  }

  private async loadUserProfiles(): Promise<void> {
    // Load user profiles from persistent storage
    // This would integrate with actual user data storage
  }

  private async loadUserProfileFromStorage(userId: string): Promise<UserSafetyProfile | null> {
    // Load specific user profile from storage
    return null; // Placeholder
  }

  private async loadSessionHistoryFromStorage(userId: string): Promise<SafetySession[]> {
    // Load session history from storage
    return []; // Placeholder
  }

  private async initializeRiskAssessment(): Promise<void> {
    // Initialize risk assessment models and algorithms
  }

  private setupPeriodicSafetyChecks(): void {
    // Setup periodic checks for user safety
    setInterval(() => {
      this.performPeriodicSafetyChecks();
    }, 60000); // Check every minute
  }

  private async performPeriodicSafetyChecks(): Promise<void> {
    // Perform periodic safety checks on active sessions and user states
    for (const [userId, profile] of this.userProfiles) {
      try {
        // Update risk assessment if needed
        const currentRisk = await this.assessCurrentRisk(userId);

        // Check for users who might need additional support
        if (currentRisk === UserRiskLevel.HIGH || currentRisk === UserRiskLevel.CRITICAL) {
          await this.initiateAdditionalSupport(userId, currentRisk);
        }
      } catch (error) {
        console.error(`Periodic safety check failed for user ${userId}:`, error);
      }
    }
  }

  private async initiateAdditionalSupport(userId: string, riskLevel: UserRiskLevel): Promise<void> {
    // Initiate additional support for high-risk users
    this.logSafetyEvent('warning', 'safety_check', `Initiating additional support for high-risk user ${userId}`, {
      riskLevel
    });
  }

  private logSafetyEvent(
    level: 'debug' | 'info' | 'warning' | 'error' | 'critical',
    category: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency',
    message: string,
    context?: Record<string, any>
  ): void {
    // Log safety events (would integrate with actual logging system)
    console.log(`[UserSafetyManager:${level}] ${message}`, context);
  }
}