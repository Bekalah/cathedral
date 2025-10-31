/**
 * Content Filter - Multi-Layer Content Filtering System
 * Implements comprehensive content filtering for trauma-informed safety
 */

import {
  ContentFilter as IContentFilter,
  ContentAnalysis,
  SafetySession,
  UserSafetyProfile,
  TriggerWarning,
  ContentIntensity,
  TriggerCategory,
  SafetyLevel,
  FilterResult,
  FilterConfiguration,
  FilterRule,
  CulturalSensitivityFlag,
  AgeRating,
  AccessibilityImpact,
  ContentRiskAssessment,
  TraumaIndicator,
  ValidationResult
} from './types/SafetyTypes.js';

/**
 * Multi-layer content filtering system
 */
export class ContentFilter implements IContentFilter {
  private filters: Map<string, ContentFilter> = new Map();
  private traumaKeywords: Map<TriggerCategory, string[]> = new Map();
  private culturalSensitivityData: Map<string, CulturalSensitivityFlag[]> = new Map();
  private ageRatingGuidelines: Map<string, AgeRating> = new Map();
  private isInitialized: boolean = false;

  constructor() {
    this.initializeTraumaKeywords();
    this.initializeCulturalSensitivityData();
    this.initializeAgeRatingGuidelines();
  }

  /**
   * Initialize the content filtering system
   */
  public async initialize(): Promise<boolean> {
    try {
      // Load filtering rules and patterns
      await this.loadFilteringRules();

      // Initialize ML models for content analysis if available
      await this.initializeContentAnalysisModels();

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize ContentFilter:', error);
      return false;
    }
  }

  /**
   * Analyze content for safety concerns
   */
  public async analyzeContent(
    content: string,
    session: SafetySession,
    metadata?: Record<string, any>
  ): Promise<ContentAnalysis> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const contentId = this.generateContentId(content, metadata);

      // Layer 1: Keyword and pattern filtering
      const keywordAnalysis = await this.performKeywordAnalysis(content);

      // Layer 2: Trauma content detection
      const traumaAnalysis = await this.performTraumaAnalysis(content, keywordAnalysis);

      // Layer 3: Cultural sensitivity analysis
      const culturalAnalysis = await this.performCulturalSensitivityAnalysis(content, session);

      // Layer 4: Age appropriateness analysis
      const ageAnalysis = await this.performAgeAppropriatenessAnalysis(content, session);

      // Layer 5: Accessibility impact analysis
      const accessibilityAnalysis = await this.performAccessibilityImpactAnalysis(content, session);

      // Layer 6: Semantic content analysis
      const semanticAnalysis = await this.performSemanticAnalysis(content, metadata);

      // Combine all analyses
      const combinedAnalysis = this.combineAnalyses([
        keywordAnalysis,
        traumaAnalysis,
        culturalAnalysis,
        ageAnalysis,
        accessibilityAnalysis,
        semanticAnalysis
      ]);

      // Generate content analysis result
      const analysis: ContentAnalysis = {
        contentId,
        originalContent: content,
        filteredContent: combinedAnalysis.filteredContent,
        triggerWarnings: combinedAnalysis.triggerWarnings,
        contentIntensity: combinedAnalysis.contentIntensity,
        riskAssessment: combinedAnalysis.riskAssessment,
        culturalSensitivityFlags: combinedAnalysis.culturalSensitivityFlags,
        ageRating: combinedAnalysis.ageRating,
        accessibilityImpact: combinedAnalysis.accessibilityImpact,
        analyzedAt: new Date(),
        analyzerVersion: '1.0.0'
      };

      return analysis;
    } catch (error) {
      console.error('Content analysis failed:', error);
      throw error;
    }
  }

  /**
   * Create user-specific content filters
   */
  public async createFiltersForUser(userProfile: UserSafetyProfile): Promise<ContentFilter[]> {
    const filters: ContentFilter[] = [];

    try {
      // Create trauma-based filter
      if (userProfile.triggerCategories.length > 0) {
        const traumaFilter = await this.createTraumaFilter(userProfile);
        filters.push(traumaFilter);
      }

      // Create cultural sensitivity filter
      if (userProfile.culturalBackground.culturalSensitivityPreferences.length > 0) {
        const culturalFilter = await this.createCulturalFilter(userProfile);
        filters.push(culturalFilter);
      }

      // Create age-appropriate filter
      if (userProfile.ageVerification?.verified) {
        const ageFilter = await this.createAgeFilter(userProfile);
        filters.push(ageFilter);
      }

      // Create accessibility filter
      if (userProfile.accessibilityNeeds.length > 0) {
        const accessibilityFilter = await this.createAccessibilityFilter(userProfile);
        filters.push(accessibilityFilter);
      }

      return filters;
    } catch (error) {
      console.error('Failed to create filters for user:', error);
      return [];
    }
  }

  /**
   * Apply content filters to text
   */
  public async applyFilters(
    content: string,
    filters: ContentFilter[],
    session: SafetySession
  ): Promise<{ filteredContent: string; filterResults: FilterResult[] }> {
    let filteredContent = content;
    const filterResults: FilterResult[] = [];

    try {
      // Sort filters by priority
      const sortedFilters = filters.sort((a, b) => a.priority - b.priority);

      for (const filter of sortedFilters) {
        if (!filter.isActive) continue;

        const result = await this.applySingleFilter(filteredContent, filter, session);
        filteredContent = result.content;
        filterResults.push(result.action);
      }

      return { filteredContent, filterResults };
    } catch (error) {
      console.error('Filter application failed:', error);
      return { filteredContent: content, filterResults: ['error' as FilterResult] };
    }
  }

  // Private analysis methods

  private async performKeywordAnalysis(content: string): Promise<Partial<ContentAnalysis>> {
    const triggerWarnings: TriggerWarning[] = [];
    let contentIntensity = ContentIntensity.VERY_MILD;

    // Check for trauma keywords in each category
    for (const [category, keywords] of this.traumaKeywords) {
      const foundKeywords = this.findKeywordsInContent(content, keywords);

      if (foundKeywords.length > 0) {
        triggerWarnings.push({
          category,
          severity: this.calculateKeywordSeverity(foundKeywords, category),
          description: `Content contains ${category} related keywords: ${foundKeywords.slice(0, 3).join(', ')}`,
          timestamp: Date.now(),
          duration: this.estimateTriggerDuration(category, foundKeywords.length)
        });

        // Update content intensity based on findings
        contentIntensity = this.updateIntensityFromKeywords(contentIntensity, category, foundKeywords.length);
      }
    }

    return {
      triggerWarnings,
      contentIntensity,
      filteredContent: content // No filtering at keyword level
    };
  }

  private async performTraumaAnalysis(
    content: string,
    keywordAnalysis: Partial<ContentAnalysis>
  ): Promise<Partial<ContentAnalysis>> {
    const traumaIndicators: TraumaIndicator[] = [];
    let filteredContent = content;

    // Analyze context around trauma keywords
    for (const warning of keywordAnalysis.triggerWarnings || []) {
      const context = this.extractContextAroundKeywords(content, warning.category);
      const traumaScore = this.calculateTraumaScore(context, warning.category);

      traumaIndicators.push({
        indicator: `${warning.category}_context`,
        confidence: traumaScore,
        context: context.substring(0, 200) + '...',
        mitigatingFactors: this.identifyMitigatingFactors(context)
      });

      // Apply trauma-specific filtering if needed
      if (traumaScore > 0.8) {
        filteredContent = await this.applyTraumaFiltering(filteredContent, warning.category);
      }
    }

    return {
      filteredContent,
      riskAssessment: {
        overallRisk: this.calculateOverallRisk(traumaIndicators),
        categoryRisks: this.categorizeRisks(keywordAnalysis.triggerWarnings || []),
        traumaIndicators,
        protectiveFactors: this.identifyProtectiveFactors(content),
        recommendedActions: this.generateRecommendedActions(traumaIndicators)
      }
    };
  }

  private async performCulturalSensitivityAnalysis(
    content: string,
    session: SafetySession
  ): Promise<Partial<ContentAnalysis>> {
    const userProfile = await this.getUserProfileForSession(session);
    if (!userProfile) {
      return { culturalSensitivityFlags: [] };
    }

    const flags: CulturalSensitivityFlag[] = [];

    // Check against user's cultural background
    for (const sensitivity of userProfile.culturalBackground.culturalSensitivityPreferences) {
      const sensitivityFlags = this.analyzeCulturalSensitivity(content, sensitivity);
      flags.push(...sensitivityFlags);
    }

    // Check for general cultural sensitivity issues
    const generalFlags = this.analyzeGeneralCulturalSensitivity(content);
    flags.push(...generalFlags);

    return { culturalSensitivityFlags: flags };
  }

  private async performAgeAppropriatenessAnalysis(
    content: string,
    session: SafetySession
  ): Promise<Partial<ContentAnalysis>> {
    const userProfile = await this.getUserProfileForSession(session);
    if (!userProfile?.ageVerification?.verified) {
      return { ageRating: { rating: 'unknown', minimumAge: 0, warnings: [], regionalVariations: {} } };
    }

    const age = userProfile.ageVerification.age;
    const ageRating = this.determineAgeRating(content, age);

    let filteredContent = content;
    if (ageRating.minimumAge > age) {
      filteredContent = await this.applyAgeAppropriateFiltering(content, age);
    }

    return {
      filteredContent,
      ageRating
    };
  }

  private async performAccessibilityImpactAnalysis(
    content: string,
    session: SafetySession
  ): Promise<Partial<ContentAnalysis>> {
    const userProfile = await this.getUserProfileForSession(session);
    if (!userProfile) {
      return { accessibilityImpact: [] };
    }

    const impacts: AccessibilityImpact[] = [];

    // Analyze for each accessibility need
    for (const need of userProfile.accessibilityNeeds) {
      const impact = this.analyzeAccessibilityImpact(content, need);
      if (impact.impactLevel !== 'none') {
        impacts.push(impact);
      }
    }

    return { accessibilityImpact: impacts };
  }

  private async performSemanticAnalysis(
    content: string,
    metadata?: Record<string, any>
  ): Promise<Partial<ContentAnalysis>> {
    // Perform semantic analysis for deeper content understanding
    // This would integrate with NLP models or AI services

    const semanticIntensity = this.analyzeSemanticIntensity(content);
    const contextualTriggers = this.identifyContextualTriggers(content);

    return {
      contentIntensity: semanticIntensity,
      triggerWarnings: contextualTriggers
    };
  }

  // Filter creation methods

  private async createTraumaFilter(userProfile: UserSafetyProfile): Promise<ContentFilter> {
    const rules: FilterRule[] = [];

    // Create rules for each trigger category
    for (const category of userProfile.triggerCategories) {
      const keywords = this.traumaKeywords.get(category) || [];

      rules.push({
        ruleId: `trauma_${category}`,
        pattern: `\\b(${keywords.join('|')})\\b`,
        action: 'warn',
        conditions: [
          {
            conditionType: 'context',
            operator: 'contains',
            value: 'trauma_context'
          }
        ],
        warningMessage: `Content may contain ${category} related material`
      });
    }

    return {
      filterId: `trauma_filter_${userProfile.userId}`,
      name: 'Trauma Content Filter',
      description: 'Filters content based on user trauma triggers',
      filterType: 'keyword',
      isActive: true,
      priority: 1,
      configuration: {
        sensitivityLevel: SafetyLevel.HIGH,
        customRules: rules,
        contextWindow: 50,
        realTimeProcessing: true
      },
      createdAt: new Date(),
      lastUpdated: new Date()
    };
  }

  private async createCulturalFilter(userProfile: UserSafetyProfile): Promise<ContentFilter> {
    const rules: FilterRule[] = [];

    for (const sensitivity of userProfile.culturalBackground.culturalSensitivityPreferences) {
      rules.push({
        ruleId: `cultural_${sensitivity.topic}`,
        pattern: this.generateCulturalPattern(sensitivity.topic),
        action: 'warn',
        conditions: [
          {
            conditionType: 'cultural',
            operator: 'equals',
            value: sensitivity.topic
          }
        ],
        warningMessage: `Content may be culturally sensitive for ${sensitivity.topic}`
      });
    }

    return {
      filterId: `cultural_filter_${userProfile.userId}`,
      name: 'Cultural Sensitivity Filter',
      description: 'Filters content based on cultural sensitivity preferences',
      filterType: 'cultural',
      isActive: true,
      priority: 2,
      configuration: {
        sensitivityLevel: userProfile.culturalBackground.culturalSensitivityPreferences[0]?.sensitivityLevel || SafetyLevel.MEDIUM,
        customRules: rules,
        contextWindow: 100,
        realTimeProcessing: true
      },
      createdAt: new Date(),
      lastUpdated: new Date()
    };
  }

  private async createAgeFilter(userProfile: UserSafetyProfile): Promise<ContentFilter> {
    if (!userProfile.ageVerification?.verified) {
      throw new Error('Age verification required for age filter');
    }

    const age = userProfile.ageVerification.age;
    const rules: FilterRule[] = [];

    // Create age-appropriate filtering rules
    if (age < 13) {
      rules.push({
        ruleId: 'age_under_13',
        pattern: '(violence|sexual|drug|alcohol)',
        action: 'block',
        conditions: [
          {
            conditionType: 'age_based',
            operator: 'less_than',
            value: 13
          }
        ]
      });
    } else if (age < 18) {
      rules.push({
        ruleId: 'age_under_18',
        pattern: '(explicit_sexual|extreme_violence|drug_use)',
        action: 'warn',
        conditions: [
          {
            conditionType: 'age_based',
            operator: 'less_than',
            value: 18
          }
        ],
        warningMessage: 'Content may not be appropriate for users under 18'
      });
    }

    return {
      filterId: `age_filter_${userProfile.userId}`,
      name: 'Age-Appropriate Filter',
      description: 'Filters content based on age appropriateness',
      filterType: 'age_based',
      isActive: true,
      priority: 3,
      configuration: {
        sensitivityLevel: SafetyLevel.HIGH,
        customRules: rules,
        contextWindow: 25,
        realTimeProcessing: true
      },
      createdAt: new Date(),
      lastUpdated: new Date()
    };
  }

  private async createAccessibilityFilter(userProfile: UserSafetyProfile): Promise<ContentFilter> {
    const rules: FilterRule[] = [];

    for (const need of userProfile.accessibilityNeeds) {
      switch (need.requirementType) {
        case 'visual':
          rules.push({
            ruleId: `visual_${need.requirementType}`,
            pattern: '(flashing|bright|color_intense)',
            action: 'warn',
            conditions: [
              {
                conditionType: 'accessibility',
                operator: 'equals',
                value: 'visual'
              }
            ],
            warningMessage: 'Content may cause visual accessibility issues'
          });
          break;

        case 'auditory':
          rules.push({
            ruleId: `auditory_${need.requirementType}`,
            pattern: '(loud|sudden_noise|audio_intense)',
            action: 'warn',
            conditions: [
              {
                conditionType: 'accessibility',
                operator: 'equals',
                value: 'auditory'
              }
            ],
            warningMessage: 'Content may cause auditory accessibility issues'
          });
          break;

        case 'cognitive':
          rules.push({
            ruleId: `cognitive_${need.requirementType}`,
            pattern: '(complex|fast_paced|dense)',
            action: 'warn',
            conditions: [
              {
                conditionType: 'accessibility',
                operator: 'equals',
                value: 'cognitive'
              }
            ],
            warningMessage: 'Content may cause cognitive accessibility issues'
          });
          break;
      }
    }

    return {
      filterId: `accessibility_filter_${userProfile.userId}`,
      name: 'Accessibility Filter',
      description: 'Filters content based on accessibility needs',
      filterType: 'contextual',
      isActive: true,
      priority: 4,
      configuration: {
        sensitivityLevel: SafetyLevel.HIGH,
        customRules: rules,
        contextWindow: 75,
        realTimeProcessing: true
      },
      createdAt: new Date(),
      lastUpdated: new Date()
    };
  }

  // Utility methods

  private async applySingleFilter(
    content: string,
    filter: ContentFilter,
    session: SafetySession
  ): Promise<{ content: string; action: FilterResult }> {
    // Apply a single filter's rules
    let filteredContent = content;
    let action: FilterResult = 'pass';

    for (const rule of filter.configuration.customRules || []) {
      const matches = this.findPatternMatches(content, rule.pattern);
      if (matches.length > 0) {
        switch (rule.action) {
          case 'filter':
            filteredContent = this.applyContentFilter(filteredContent, matches);
            action = 'modify';
            break;
          case 'warn':
            action = 'warn';
            break;
          case 'block':
            return { content: '[CONTENT BLOCKED FOR SAFETY]', action: 'block' };
          case 'replace':
            filteredContent = this.applyContentReplacement(filteredContent, matches, rule.replacement || '');
            action = 'modify';
            break;
        }
      }
    }

    return { content: filteredContent, action };
  }

  private findKeywordsInContent(content: string, keywords: string[]): string[] {
    const found: string[] = [];
    const lowerContent = content.toLowerCase();

    for (const keyword of keywords) {
      if (lowerContent.includes(keyword.toLowerCase())) {
        found.push(keyword);
      }
    }

    return found;
  }

  private calculateKeywordSeverity(foundKeywords: string[], category: TriggerCategory): SafetyLevel {
    // Calculate severity based on keyword count and category
    if (foundKeywords.length >= 5) return SafetyLevel.CRITICAL;
    if (foundKeywords.length >= 3) return SafetyLevel.HIGH;
    if (foundKeywords.length >= 2) return SafetyLevel.MEDIUM;
    return SafetyLevel.LOW;
  }

  private estimateTriggerDuration(category: TriggerCategory, keywordCount: number): number {
    // Estimate how long trigger effects might last
    const baseDuration = 30; // 30 seconds base
    const categoryMultiplier = this.getCategoryDurationMultiplier(category);
    return baseDuration * categoryMultiplier * Math.min(keywordCount, 5);
  }

  private updateIntensityFromKeywords(
    currentIntensity: ContentIntensity,
    category: TriggerCategory,
    keywordCount: number
  ): ContentIntensity {
    const intensityLevels = [
      ContentIntensity.VERY_MILD,
      ContentIntensity.MILD,
      ContentIntensity.MODERATE,
      ContentIntensity.INTENSE,
      ContentIntensity.VERY_INTENSE,
      ContentIntensity.EXTREME
    ];

    const currentIndex = intensityLevels.indexOf(currentIntensity);
    const categoryBoost = this.getCategoryIntensityBoost(category);
    const newIndex = Math.min(currentIndex + categoryBoost + Math.floor(keywordCount / 2), intensityLevels.length - 1);

    return intensityLevels[newIndex];
  }

  private extractContextAroundKeywords(content: string, category: TriggerCategory): string {
    // Extract context around trauma keywords for better analysis
    const keywords = this.traumaKeywords.get(category) || [];
    let context = '';

    for (const keyword of keywords) {
      const index = content.toLowerCase().indexOf(keyword.toLowerCase());
      if (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + keyword.length + 50);
        context += content.substring(start, end) + ' ';
      }
    }

    return context.trim();
  }

  private calculateTraumaScore(context: string, category: TriggerCategory): number {
    // Calculate trauma score based on context analysis
    let score = 0;

    // Check for trauma-indicative patterns
    if (context.includes('graphic') || context.includes('detailed')) score += 0.3;
    if (context.includes('personal') || context.includes('experience')) score += 0.2;
    if (context.includes('violent') || context.includes('abuse')) score += 0.4;
    if (context.includes('childhood') || context.includes('trauma')) score += 0.5;

    return Math.min(score, 1.0);
  }

  private identifyMitigatingFactors(context: string): string[] {
    const factors: string[] = [];

    if (context.includes('healing') || context.includes('recovery')) factors.push('healing_context');
    if (context.includes('therapy') || context.includes('support')) factors.push('therapeutic_context');
    if (context.includes('educational') || context.includes('informational')) factors.push('educational_context');
    if (context.includes('fiction') || context.includes('story')) factors.push('fictional_context');

    return factors;
  }

  private analyzeCulturalSensitivity(content: string, sensitivity: any): CulturalSensitivityFlag[] {
    const flags: CulturalSensitivityFlag[] = [];

    // Analyze content for cultural sensitivity issues
    // This would use cultural databases and sensitivity guidelines

    return flags;
  }

  private analyzeGeneralCulturalSensitivity(content: string): CulturalSensitivityFlag[] {
    const flags: CulturalSensitivityFlag[] = [];

    // General cultural sensitivity analysis
    // Check for potentially sensitive cultural, religious, or ethnic content

    return flags;
  }

  private determineAgeRating(content: string, userAge: number): AgeRating {
    // Determine appropriate age rating for content
    let minimumAge = 0;
    const warnings: string[] = [];

    // Simple age rating logic (would be more sophisticated in practice)
    if (content.includes('violence') || content.includes('death')) {
      minimumAge = Math.max(minimumAge, 13);
      warnings.push('Contains violent content');
    }

    if (content.includes('sexual') || content.includes('intimate')) {
      minimumAge = Math.max(minimumAge, 18);
      warnings.push('Contains sexual content');
    }

    if (content.includes('drug') || content.includes('alcohol')) {
      minimumAge = Math.max(minimumAge, 16);
      warnings.push('Contains substance-related content');
    }

    return {
      rating: this.getAgeRatingString(minimumAge),
      minimumAge,
      warnings,
      regionalVariations: {}
    };
  }

  private async applyAgeAppropriateFiltering(content: string, userAge: number): Promise<string> {
    // Apply age-appropriate content filtering
    let filtered = content;

    if (userAge < 13) {
      filtered = filtered.replace(/violence|death|sexual|drug|alcohol/gi, '[AGE-APPROPRIATE CONTENT]');
    } else if (userAge < 18) {
      filtered = filtered.replace(/explicit_sexual|extreme_violence|drug_use/gi, '[RESTRICTED CONTENT]');
    }

    return filtered;
  }

  private analyzeAccessibilityImpact(content: string, need: any): AccessibilityImpact {
    // Analyze content impact on specific accessibility needs
    return {
      accessibilityType: need.requirementType,
      impactLevel: 'none',
      description: 'No significant accessibility impact detected',
      alternatives: [],
      requiresAccommodation: false
    };
  }

  private analyzeSemanticIntensity(content: string): ContentIntensity {
    // Analyze semantic intensity of content
    // This would use NLP models to understand emotional intensity
    return ContentIntensity.MODERATE;
  }

  private identifyContextualTriggers(content: string): TriggerWarning[] {
    // Identify contextual triggers beyond keyword matching
    return [];
  }

  private combineAnalyses(analyses: Partial<ContentAnalysis>[]): Partial<ContentAnalysis> {
    // Combine results from all analysis layers
    const combined: Partial<ContentAnalysis> = {
      triggerWarnings: [],
      contentIntensity: ContentIntensity.VERY_MILD,
      culturalSensitivityFlags: [],
      accessibilityImpact: []
    };

    for (const analysis of analyses) {
      if (analysis.triggerWarnings) {
        combined.triggerWarnings!.push(...analysis.triggerWarnings);
      }
      if (analysis.contentIntensity) {
        combined.contentIntensity = this.combineIntensityLevels(combined.contentIntensity!, analysis.contentIntensity);
      }
      if (analysis.culturalSensitivityFlags) {
        combined.culturalSensitivityFlags!.push(...analysis.culturalSensitivityFlags);
      }
      if (analysis.accessibilityImpact) {
        combined.accessibilityImpact!.push(...analysis.accessibilityImpact);
      }
      if (analysis.filteredContent) {
        combined.filteredContent = analysis.filteredContent;
      }
    }

    return combined;
  }

  private combineIntensityLevels(current: ContentIntensity, newIntensity: ContentIntensity): ContentIntensity {
    const levels = [
      ContentIntensity.VERY_MILD,
      ContentIntensity.MILD,
      ContentIntensity.MODERATE,
      ContentIntensity.INTENSE,
      ContentIntensity.VERY_INTENSE,
      ContentIntensity.EXTREME
    ];

    const currentIndex = levels.indexOf(current);
    const newIndex = levels.indexOf(newIntensity);

    return levels[Math.max(currentIndex, newIndex)];
  }

  // Helper methods

  private generateContentId(content: string, metadata?: Record<string, any>): string {
    const hash = this.simpleHash(content);
    const timestamp = Date.now();
    return `content_${timestamp}_${hash}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private findPatternMatches(content: string, pattern: string): string[] {
    const regex = new RegExp(pattern, 'gi');
    const matches: string[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      matches.push(match[0]);
    }

    return matches;
  }

  private applyContentFilter(content: string, matches: string[]): string {
    // Apply content filtering (redaction, replacement, etc.)
    let filtered = content;
    for (const match of matches) {
      filtered = filtered.replace(new RegExp(match, 'gi'), '[FILTERED]');
    }
    return filtered;
  }

  private applyContentReplacement(content: string, matches: string[], replacement: string): string {
    let filtered = content;
    for (const match of matches) {
      filtered = filtered.replace(new RegExp(match, 'gi'), replacement);
    }
    return filtered;
  }

  private getCategoryDurationMultiplier(category: TriggerCategory): number {
    // Different categories may have different duration impacts
    switch (category) {
      case TriggerCategory.VIOLENCE: return 2.0;
      case TriggerCategory.SEXUAL_CONTENT: return 1.5;
      case TriggerCategory.TRAUMA: return 3.0;
      case TriggerCategory.DEATH_LOSS: return 2.5;
      default: return 1.0;
    }
  }

  private getCategoryIntensityBoost(category: TriggerCategory): number {
    // Different categories may boost intensity more
    switch (category) {
      case TriggerCategory.VIOLENCE: return 2;
      case TriggerCategory.SEXUAL_CONTENT: return 1;
      case TriggerCategory.TRAUMA: return 3;
      case TriggerCategory.DEATH_LOSS: return 2;
      default: return 1;
    }
  }

  private calculateOverallRisk(traumaIndicators: TraumaIndicator[]): any {
    const avgConfidence = traumaIndicators.reduce((sum, indicator) => sum + indicator.confidence, 0) / traumaIndicators.length;

    if (avgConfidence >= 0.8) return 'critical';
    if (avgConfidence >= 0.6) return 'high';
    if (avgConfidence >= 0.4) return 'moderate';
    return 'low';
  }

  private categorizeRisks(triggerWarnings: TriggerWarning[]): Record<TriggerCategory, any> {
    const risks: Record<string, any> = {};

    for (const warning of triggerWarnings) {
      risks[warning.category] = warning.severity;
    }

    return risks;
  }

  private identifyProtectiveFactors(content: string): string[] {
    const factors: string[] = [];

    if (content.includes('support') || content.includes('help')) factors.push('support_available');
    if (content.includes('resources') || content.includes('information')) factors.push('informational_content');
    if (content.includes('community') || content.includes('connection')) factors.push('community_context');

    return factors;
  }

  private generateRecommendedActions(traumaIndicators: TraumaIndicator[]): any[] {
    const actions: any[] = [];

    const highConfidenceIndicators = traumaIndicators.filter(i => i.confidence > 0.7);
    if (highConfidenceIndicators.length > 0) {
      actions.push('pause');
    } else {
      actions.push('continue');
    }

    return actions;
  }

  private generateCulturalPattern(topic: string): string {
    // Generate regex pattern for cultural sensitivity topics
    return `\\b${topic}\\b`;
  }

  private getAgeRatingString(minimumAge: number): string {
    if (minimumAge >= 18) return 'ADULT';
    if (minimumAge >= 16) return 'MATURE';
    if (minimumAge >= 13) return 'TEEN';
    return 'GENERAL';
  }

  private async getUserProfileForSession(session: SafetySession): Promise<UserSafetyProfile | null> {
    // This would integrate with the UserSafetyManager to get the user profile
    // For now, return null as placeholder
    return null;
  }

  private async applyTraumaFiltering(content: string, category: TriggerCategory): Promise<string> {
    // Apply trauma-specific content filtering
    return content.replace(/trauma|trigger|distress/gi, '[TRAUMA CONTENT]');
  }

  private async loadFilteringRules(): Promise<void> {
    // Load filtering rules from configuration or external sources
  }

  private async initializeContentAnalysisModels(): Promise<void> {
    // Initialize ML models for content analysis if available
  }

  private initializeTraumaKeywords(): void {
    // Initialize trauma keyword mappings
    this.traumaKeywords.set(TriggerCategory.VIOLENCE, [
      'violence', 'abuse', 'assault', 'attack', 'harm', 'hurt', 'injury', 'wound', 'blood', 'death'
    ]);

    this.traumaKeywords.set(TriggerCategory.SEXUAL_CONTENT, [
      'sexual', 'intimate', 'consent', 'assault', 'harassment', 'abuse', 'trauma', 'violation'
    ]);

    this.traumaKeywords.set(TriggerCategory.TRAUMA, [
      'trauma', 'ptsd', 'flashback', 'trigger', 'nightmare', 'panic', 'anxiety', 'fear'
    ]);

    this.traumaKeywords.set(TriggerCategory.SUBSTANCE_USE, [
      'drug', 'alcohol', 'addiction', 'substance', 'abuse', 'overdose', 'withdrawal'
    ]);

    this.traumaKeywords.set(TriggerCategory.MENTAL_HEALTH, [
      'depression', 'anxiety', 'suicide', 'self-harm', 'mental', 'crisis', 'breakdown'
    ]);

    this.traumaKeywords.set(TriggerCategory.DEATH_LOSS, [
      'death', 'dying', 'loss', 'grief', 'mourning', 'bereavement', 'funeral', 'memorial'
    ]);
  }

  private initializeCulturalSensitivityData(): void {
    // Initialize cultural sensitivity data
    this.culturalSensitivityData.set('indigenous', [
      {
        culture: 'indigenous',
        sensitivityLevel: SafetyLevel.HIGH,
        concern: 'Cultural appropriation or misrepresentation',
        recommendation: 'Consult with cultural experts',
        requiresExpertReview: true
      }
    ]);
  }

  private initializeAgeRatingGuidelines(): void {
    // Initialize age rating guidelines
    this.ageRatingGuidelines.set('general', {
      rating: 'GENERAL',
      minimumAge: 0,
      warnings: [],
      regionalVariations: {}
    });
  }
}