/**
 * Safety Logger - Comprehensive Safety Event Logging System
 * Provides detailed logging and audit trails for all safety events
 */

import {
  SafetyError,
  SafetyLogEntry,
  SafetyReport,
  SafetySession,
  UserSafetyProfile,
  ContentAnalysis,
  SafetyLevel,
  SessionStatus,
  UserRiskLevel,
  TimeRange
} from './types/SafetyTypes.js';

/**
 * Comprehensive safety logging system
 */
export class SafetyLogger {
  private logEntries: SafetyLogEntry[] = [];
  private safetyErrors: SafetyError[] = [];
  private auditTrails: Map<string, AuditTrail> = new Map();
  private logRetentionDays: number = 90;
  private maxLogEntries: number = 100000;
  private isInitialized: boolean = false;

  constructor() {
    // Initialize logging configuration
  }

  /**
   * Initialize the safety logger
   */
  public async initialize(): Promise<boolean> {
    try {
      // Setup log rotation
      this.setupLogRotation();

      // Initialize external logging services if configured
      await this.initializeExternalLogging();

      // Load existing logs if available
      await this.loadExistingLogs();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize SafetyLogger:', error);
      return false;
    }
  }

  /**
   * Log a safety event
   */
  public logSafetyEvent(
    level: 'debug' | 'info' | 'warning' | 'error' | 'critical',
    category: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency',
    message: string,
    context?: Record<string, any>,
    userId?: string,
    sessionId?: string
  ): string {
    if (!this.isInitialized) {
      console.warn('SafetyLogger not initialized');
    }

    try {
      const logEntry: SafetyLogEntry = {
        timestamp: new Date(),
        logLevel: level,
        category,
        message,
        userId,
        sessionId,
        context: context || {},
        metadata: {
          source: 'safety_framework',
          version: '1.0.0',
          nodeVersion: process.version,
          platform: process.platform
        }
      };

      // Add to in-memory storage
      this.logEntries.push(logEntry);

      // Maintain log size limits
      this.maintainLogLimits();

      // Write to external logging systems
      this.writeToExternalLogs(logEntry);

      // Update audit trails
      this.updateAuditTrails(logEntry);

      // Handle critical events
      if (level === 'critical') {
        this.handleCriticalEvent(logEntry);
      }

      return logEntry.timestamp.toISOString();
    } catch (error) {
      console.error('Failed to log safety event:', error);
      // Fallback to console logging
      console.log(`[SafetyFramework:${level}] ${message}`, context);
      return new Date().toISOString();
    }
  }

  /**
   * Log a safety error
   */
  public logSafetyError(
    errorType: 'validation_failed' | 'filter_error' | 'user_safety' | 'system_error' | 'integration_error',
    severity: SafetyLevel,
    message: string,
    context?: Record<string, any>,
    userId?: string,
    sessionId?: string
  ): string {
    try {
      const error: SafetyError = {
        errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
        errorType,
        severity,
        message,
        context: context || {},
        userId,
        sessionId,
        resolved: false
      };

      // Add to error storage
      this.safetyErrors.push(error);

      // Log as critical safety event
      this.logSafetyEvent('error', 'system_event', `Safety error: ${message}`, {
        errorId: error.errorId,
        errorType,
        severity,
        ...context
      }, userId, sessionId);

      // Handle critical errors
      if (severity === SafetyLevel.CRITICAL) {
        this.handleCriticalError(error);
      }

      return error.errorId;
    } catch (error) {
      console.error('Failed to log safety error:', error);
      return `error_${Date.now()}`;
    }
  }

  /**
   * Log session events
   */
  public logSessionEvent(
    eventType: 'created' | 'started' | 'paused' | 'resumed' | 'ended' | 'terminated',
    session: SafetySession,
    additionalContext?: Record<string, any>
  ): void {
    const context = {
      sessionId: session.sessionId,
      userId: session.userId,
      status: session.status,
      duration: session.endTime ?
        session.endTime.getTime() - session.startTime.getTime() :
        Date.now() - session.startTime.getTime(),
      violationCount: session.violations.length,
      emergencyActionCount: session.emergencyActions.length,
      ...additionalContext
    };

    let level: 'debug' | 'info' | 'warning' | 'error' | 'critical' = 'info';
    let category: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency' = 'system_event';

    switch (eventType) {
      case 'created':
        level = 'info';
        break;
      case 'started':
        level = 'info';
        break;
      case 'paused':
        level = 'warning';
        category = 'safety_check';
        break;
      case 'ended':
        level = 'info';
        break;
      case 'terminated':
        level = 'warning';
        category = 'emergency';
        break;
    }

    this.logSafetyEvent(
      level,
      category,
      `Session ${eventType}: ${session.sessionId}`,
      context,
      session.userId,
      session.sessionId
    );
  }

  /**
   * Log user profile changes
   */
  public logUserProfileEvent(
    eventType: 'created' | 'updated' | 'accessed' | 'deleted',
    userId: string,
    changes?: Record<string, any>
  ): void {
    const context = {
      userId,
      eventType,
      changes: changes ? Object.keys(changes) : []
    };

    this.logSafetyEvent(
      'info',
      'user_action',
      `User profile ${eventType}: ${userId}`,
      context,
      userId
    );
  }

  /**
   * Log content analysis results
   */
  public logContentAnalysis(
    analysis: ContentAnalysis,
    sessionId: string,
    processingTime?: number
  ): void {
    const context = {
      contentId: analysis.contentId,
      contentLength: analysis.originalContent.length,
      triggerWarningCount: analysis.triggerWarnings.length,
      contentIntensity: analysis.contentIntensity,
      riskLevel: analysis.riskAssessment?.overallRisk,
      culturalFlagsCount: analysis.culturalSensitivityFlags.length,
      accessibilityImpactsCount: analysis.accessibilityImpact.length,
      processingTime
    };

    this.logSafetyEvent(
      'info',
      'safety_check',
      `Content analyzed: ${analysis.contentId}`,
      context,
      undefined,
      sessionId
    );
  }

  /**
   * Generate audit trail for user or session
   */
  public generateAuditTrail(
    targetId: string,
    targetType: 'user' | 'session',
    timeRange?: TimeRange
  ): AuditTrail {
    const trailId = `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const range = timeRange || {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      end: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Filter log entries for this target
    const relevantLogs = this.logEntries.filter(entry => {
      if (targetType === 'user' && entry.userId === targetId) return true;
      if (targetType === 'session' && entry.sessionId === targetId) return true;
      return false;
    }).filter(entry =>
      entry.timestamp >= range.start && entry.timestamp <= range.end
    );

    // Filter errors for this target
    const relevantErrors = this.safetyErrors.filter(error => {
      if (targetType === 'user' && error.userId === targetId) return true;
      if (targetType === 'session' && error.sessionId === targetId) return true;
      return false;
    }).filter(error =>
      error.timestamp >= range.start && error.timestamp <= range.end
    );

    const auditTrail: AuditTrail = {
      trailId,
      targetId,
      targetType,
      timeRange: range,
      generatedAt: new Date(),
      logEntries: relevantLogs,
      errors: relevantErrors,
      summary: this.generateAuditSummary(relevantLogs, relevantErrors),
      complianceStatus: this.assessComplianceStatus(relevantLogs, relevantErrors)
    };

    // Store audit trail
    this.auditTrails.set(trailId, auditTrail);

    return auditTrail;
  }

  /**
   * Generate safety report from logs
   */
  public async generateSafetyReportFromLogs(
    reportType: 'session_summary' | 'violation_report' | 'user_feedback' | 'system_health' | 'trend_analysis',
    timeRange: TimeRange
  ): Promise<SafetyReport> {
    // Filter logs based on report type and time range
    const relevantLogs = this.logEntries.filter(entry =>
      entry.timestamp >= timeRange.start && entry.timestamp <= timeRange.end
    );

    // Generate report based on log analysis
    const report = await this.analyzeLogsForReport(reportType, relevantLogs, timeRange);

    return report;
  }

  /**
   * Get logs by criteria
   */
  public getLogs(
    criteria: {
      level?: 'debug' | 'info' | 'warning' | 'error' | 'critical';
      category?: 'user_action' | 'system_event' | 'safety_check' | 'violation' | 'emergency';
      userId?: string;
      sessionId?: string;
      timeRange?: TimeRange;
      limit?: number;
    }
  ): SafetyLogEntry[] {
    let filteredLogs = [...this.logEntries];

    // Apply filters
    if (criteria.level) {
      filteredLogs = filteredLogs.filter(log => log.logLevel === criteria.level);
    }

    if (criteria.category) {
      filteredLogs = filteredLogs.filter(log => log.category === criteria.category);
    }

    if (criteria.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === criteria.userId);
    }

    if (criteria.sessionId) {
      filteredLogs = filteredLogs.filter(log => log.sessionId === criteria.sessionId);
    }

    if (criteria.timeRange) {
      filteredLogs = filteredLogs.filter(log =>
        log.timestamp >= criteria.timeRange!.start && log.timestamp <= criteria.timeRange!.end
      );
    }

    // Sort by timestamp (most recent first)
    filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Apply limit
    if (criteria.limit) {
      filteredLogs = filteredLogs.slice(0, criteria.limit);
    }

    return filteredLogs;
  }

  /**
   * Get error logs
   */
  public getErrors(
    criteria: {
      errorType?: 'validation_failed' | 'filter_error' | 'user_safety' | 'system_error' | 'integration_error';
      severity?: SafetyLevel;
      userId?: string;
      sessionId?: string;
      timeRange?: TimeRange;
      limit?: number;
    }
  ): SafetyError[] {
    let filteredErrors = [...this.safetyErrors];

    // Apply filters
    if (criteria.errorType) {
      filteredErrors = filteredErrors.filter(error => error.errorType === criteria.errorType);
    }

    if (criteria.severity) {
      filteredErrors = filteredErrors.filter(error => error.severity === criteria.severity);
    }

    if (criteria.userId) {
      filteredErrors = filteredErrors.filter(error => error.userId === criteria.userId);
    }

    if (criteria.sessionId) {
      filteredErrors = filteredErrors.filter(error => error.sessionId === criteria.sessionId);
    }

    if (criteria.timeRange) {
      filteredErrors = filteredErrors.filter(error =>
        error.timestamp >= criteria.timeRange!.start && error.timestamp <= criteria.timeRange!.end
      );
    }

    // Sort by timestamp (most recent first)
    filteredErrors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Apply limit
    if (criteria.limit) {
      filteredErrors = filteredErrors.slice(0, criteria.limit);
    }

    return filteredErrors;
  }

  /**
   * Export logs for compliance or analysis
   */
  public async exportLogs(
    format: 'json' | 'csv' | 'xml',
    criteria?: {
      timeRange?: TimeRange;
      level?: 'debug' | 'info' | 'warning' | 'error' | 'critical';
      category?: string;
    }
  ): Promise<string> {
    const logs = this.getLogs({
      timeRange: criteria?.timeRange,
      level: criteria?.level as any,
      category: criteria?.category as any
    });

    switch (format) {
      case 'json':
        return JSON.stringify(logs, null, 2);

      case 'csv':
        return this.convertLogsToCSV(logs);

      case 'xml':
        return this.convertLogsToXML(logs);

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  // Private helper methods

  private setupLogRotation(): void {
    // Setup daily log rotation
    const now = new Date();
    const nextRotation = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 2, 0, 0);

    setTimeout(() => {
      this.performLogRotation();
      // Schedule next rotation
      setInterval(() => this.performLogRotation(), 24 * 60 * 60 * 1000);
    }, nextRotation.getTime() - now.getTime());
  }

  private performLogRotation(): void {
    const cutoffDate = new Date(Date.now() - this.logRetentionDays * 24 * 60 * 60 * 1000);

    // Remove old log entries
    this.logEntries = this.logEntries.filter(entry => entry.timestamp > cutoffDate);

    // Remove old errors
    this.safetyErrors = this.safetyErrors.filter(error => error.timestamp > cutoffDate);

    // Clean up old audit trails
    for (const [trailId, trail] of this.auditTrails) {
      if (trail.generatedAt <= cutoffDate) {
        this.auditTrails.delete(trailId);
      }
    }

    this.logSafetyEvent('info', 'system_event', 'Log rotation completed', {
      retentionDays: this.logRetentionDays,
      remainingLogs: this.logEntries.length,
      remainingErrors: this.safetyErrors.length
    });
  }

  private maintainLogLimits(): void {
    if (this.logEntries.length > this.maxLogEntries) {
      // Remove oldest 10% of logs
      const removeCount = Math.floor(this.maxLogEntries * 0.1);
      this.logEntries = this.logEntries.slice(removeCount);
    }

    if (this.safetyErrors.length > 10000) {
      // Keep only last 10000 errors
      this.safetyErrors = this.safetyErrors.slice(-10000);
    }
  }

  private async initializeExternalLogging(): Promise<void> {
    // Initialize external logging services (e.g., Elasticsearch, CloudWatch, etc.)
    // This would depend on the specific logging infrastructure
  }

  private async loadExistingLogs(): Promise<void> {
    // Load existing logs from persistent storage
    // This would integrate with actual log storage systems
  }

  private writeToExternalLogs(logEntry: SafetyLogEntry): void {
    // Write to external logging systems
    // This would integrate with actual logging infrastructure

    // For now, also write to console for development
    if (logEntry.logLevel === 'error' || logEntry.logLevel === 'critical') {
      console.error(`[Safety:${logEntry.logLevel}] ${logEntry.message}`, logEntry.context);
    } else if (logEntry.logLevel === 'warning') {
      console.warn(`[Safety:${logEntry.logLevel}] ${logEntry.message}`, logEntry.context);
    } else {
      console.log(`[Safety:${logEntry.logLevel}] ${logEntry.message}`, logEntry.context);
    }
  }

  private updateAuditTrails(logEntry: SafetyLogEntry): void {
    // Update relevant audit trails
    if (logEntry.userId) {
      const userTrailId = `user_${logEntry.userId}`;
      if (!this.auditTrails.has(userTrailId)) {
        this.auditTrails.set(userTrailId, {
          trailId: userTrailId,
          targetId: logEntry.userId,
          targetType: 'user',
          timeRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date(),
            timezone: 'UTC'
          },
          generatedAt: new Date(),
          logEntries: [],
          errors: [],
          summary: {},
          complianceStatus: 'unknown'
        });
      }
    }

    if (logEntry.sessionId) {
      const sessionTrailId = `session_${logEntry.sessionId}`;
      if (!this.auditTrails.has(sessionTrailId)) {
        this.auditTrails.set(sessionTrailId, {
          trailId: sessionTrailId,
          targetId: logEntry.sessionId,
          targetType: 'session',
          timeRange: {
            start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            end: new Date(),
            timezone: 'UTC'
          },
          generatedAt: new Date(),
          logEntries: [],
          errors: [],
          summary: {},
          complianceStatus: 'unknown'
        });
      }
    }
  }

  private handleCriticalEvent(logEntry: SafetyLogEntry): void {
    // Handle critical safety events
    // This might include notifications, alerts, or automatic responses

    this.logSafetyEvent('critical', 'emergency', 'Critical safety event detected', {
      originalEvent: logEntry.message,
      category: logEntry.category,
      context: logEntry.context
    });
  }

  private handleCriticalError(error: SafetyError): void {
    // Handle critical safety errors
    // This might include system shutdown, alerts, or emergency procedures

    this.logSafetyEvent('critical', 'emergency', 'Critical safety error detected', {
      errorId: error.errorId,
      errorType: error.errorType,
      message: error.message
    });
  }

  private generateAuditSummary(logEntries: SafetyLogEntry[], errors: SafetyError[]) {
    const summary = {
      totalEvents: logEntries.length,
      errorCount: errors.length,
      criticalEvents: logEntries.filter(l => l.logLevel === 'critical').length,
      warningEvents: logEntries.filter(l => l.logLevel === 'warning').length,
      categories: {} as Record<string, number>,
      timeSpan: {
        start: logEntries.length > 0 ? logEntries[logEntries.length - 1].timestamp : new Date(),
        end: logEntries.length > 0 ? logEntries[0].timestamp : new Date()
      }
    };

    // Count by category
    logEntries.forEach(log => {
      summary.categories[log.category] = (summary.categories[log.category] || 0) + 1;
    });

    return summary;
  }

  private assessComplianceStatus(logEntries: SafetyLogEntry[], errors: SafetyError[]): 'compliant' | 'warning' | 'non_compliant' | 'unknown' {
    const criticalErrors = errors.filter(e => e.severity === SafetyLevel.CRITICAL).length;
    const highErrors = errors.filter(e => e.severity === SafetyLevel.HIGH).length;
    const criticalEvents = logEntries.filter(l => l.logLevel === 'critical').length;

    if (criticalErrors > 0 || criticalEvents > 0) {
      return 'non_compliant';
    }

    if (highErrors > 5) {
      return 'warning';
    }

    return 'compliant';
  }

  private async analyzeLogsForReport(
    reportType: string,
    logs: SafetyLogEntry[],
    timeRange: TimeRange
  ): Promise<SafetyReport> {
    // Analyze logs to generate safety report
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate metrics based on log analysis
    const metrics = {
      totalSessions: new Set(logs.filter(l => l.sessionId).map(l => l.sessionId)).size,
      completedSessions: new Set(logs.filter(l => l.message.includes('ended') && l.sessionId).map(l => l.sessionId)).size,
      terminatedSessions: new Set(logs.filter(l => l.message.includes('terminated') && l.sessionId).map(l => l.sessionId)).size,
      emergencyActions: logs.filter(l => l.category === 'emergency').length,
      violationsByType: {} as Record<string, number>,
      userSatisfaction: 0, // Would need user feedback data
      contentIntensityDistribution: {} as Record<string, number>,
      triggerWarningEffectiveness: 0, // Would need specific tracking
      accessibilityCompliance: 0 // Would need accessibility data
    };

    // Count violations by type
    logs.filter(l => l.category === 'violation').forEach(log => {
      const type = log.context?.violationType || 'unknown';
      metrics.violationsByType[type] = (metrics.violationsByType[type] || 0) + 1;
    });

    // Generate insights
    const insights = [];
    if (metrics.emergencyActions > 10) {
      insights.push({
        insightType: 'concern' as const,
        title: 'High Emergency Rate',
        description: 'Multiple emergency events detected',
        confidence: 0.9,
        actionable: true
      });
    }

    return {
      reportId,
      reportType,
      timeRange,
      generatedAt: new Date(),
      data: metrics,
      insights,
      recommendations: ['Monitor safety events', 'Review emergency protocols']
    };
  }

  private convertLogsToCSV(logs: SafetyLogEntry[]): string {
    const headers = ['timestamp', 'level', 'category', 'message', 'userId', 'sessionId'];
    const csvRows = [headers.join(',')];

    for (const log of logs) {
      const row = [
        log.timestamp.toISOString(),
        log.logLevel,
        log.category,
        `"${log.message.replace(/"/g, '""')}"`,
        log.userId || '',
        log.sessionId || ''
      ];
      csvRows.push(row.join(','));
    }

    return csvRows.join('\n');
  }

  private convertLogsToXML(logs: SafetyLogEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<safety_logs>\n';

    for (const log of logs) {
      xml += '  <log_entry>\n';
      xml += `    <timestamp>${log.timestamp.toISOString()}</timestamp>\n`;
      xml += `    <level>${log.logLevel}</level>\n`;
      xml += `    <category>${log.category}</category>\n`;
      xml += `    <message>${this.escapeXML(log.message)}</message>\n`;
      if (log.userId) xml += `    <user_id>${log.userId}</user_id>\n`;
      if (log.sessionId) xml += `    <session_id>${log.sessionId}</session_id>\n`;
      xml += '  </log_entry>\n';
    }

    xml += '</safety_logs>';
    return xml;
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, ''');
  }
}

// Supporting interfaces
interface AuditTrail {
  trailId: string;
  targetId: string;
  targetType: 'user' | 'session';
  timeRange: TimeRange;
  generatedAt: Date;
  logEntries: SafetyLogEntry[];
  errors: SafetyError[];
  summary: {
    totalEvents: number;
    errorCount: number;
    criticalEvents: number;
    warningEvents: number;
    categories: Record<string, number>;
    timeSpan: {
      start: Date;
      end: Date;
    };
  };
  complianceStatus: 'compliant' | 'warning' | 'non_compliant' | 'unknown';
}