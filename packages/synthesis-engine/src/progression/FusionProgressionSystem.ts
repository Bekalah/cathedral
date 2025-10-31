import {
  UserProgression,
  Achievement,
  UserStatistics,
  UserPreferences,
  Theme,
  NotificationSettings,
  Domain,
  Rarity,
  FusionResult,
  SynthesizedElement
} from '../types/FusionTypes';

/**
 * FusionProgressionSystem - Manages user progression, achievements, and unlock mechanics
 *
 * This system tracks user advancement through the fusion game, manages experience points,
 * handles achievement unlocking, and controls progression-based content gating.
 */
export class FusionProgressionSystem {
  private static readonly EXPERIENCE_BASE = 1000;
  private static readonly LEVEL_CAP = 99;

  private achievements: AchievementDefinition[];
  private levelThresholds: number[];

  constructor() {
    this.achievements = this.initializeAchievements();
    this.levelThresholds = this.generateLevelThresholds();
  }

  /**
   * Initialize all available achievements
   */
  private initializeAchievements(): AchievementDefinition[] {
    return [
      {
        id: 'first_fusion',
        name: 'First Synthesis',
        description: 'Complete your first element fusion',
        icon: '⚗️',
        rarity: Rarity.COMMON,
        condition: (stats: UserStatistics) => stats.totalFusions >= 1,
        reward: { experience: 100, title: 'Apprentice Alchemist' }
      },
      {
        id: 'fusion_master',
        name: 'Fusion Master',
        description: 'Complete 50 successful fusions',
        icon: '🔥',
        rarity: Rarity.RARE,
        condition: (stats: UserStatistics) => stats.successfulFusions >= 50,
        reward: { experience: 1000, title: 'Master Fusionist' }
      },
      {
        id: 'quality_seeker',
        name: 'Quality Seeker',
        description: 'Achieve a fusion quality of 95% or higher',
        icon: '💎',
        rarity: Rarity.EPIC,
        condition: (stats: UserStatistics) => stats.averageQuality >= 95,
        reward: { experience: 2000, title: 'Perfectionist' }
      },
      {
        id: 'domain_master',
        name: 'Domain Master',
        description: 'Master all three domains (Art, Science, Spirituality)',
        icon: '👑',
        rarity: Rarity.LEGENDARY,
        condition: (stats: UserStatistics) => stats.domainsMastered.length >= 3,
        reward: { experience: 5000, title: 'Triune Master' }
      },
      {
        id: 'mythical_creator',
        name: 'Mythical Creator',
        description: 'Create a Mythical rarity element',
        icon: '🌟',
        rarity: Rarity.MYTHICAL,
        condition: (stats: UserStatistics) =>
          stats.highestRarity === Rarity.MYTHICAL,
        reward: { experience: 10000, title: 'Legend Among Legends' }
      },
      {
        id: 'speed_runner',
        name: 'Speed Runner',
        description: 'Complete 10 fusions in under an hour',
        icon: '⚡',
        rarity: Rarity.RARE,
        condition: (stats: UserStatistics, timeSpent?: number) =>
          (timeSpent || 0) < 3600 && stats.totalFusions >= 10,
        reward: { experience: 1500, title: 'Swift Alchemist' }
      },
      {
        id: 'dedicated_student',
        name: 'Dedicated Student',
        description: 'Spend 10 hours studying the art of fusion',
        icon: '📚',
        rarity: Rarity.UNCOMMON,
        condition: (stats: UserStatistics, timeSpent?: number) =>
          (timeSpent || 0) >= 36000, // 10 hours in seconds
        reward: { experience: 800, title: 'Scholar of Fusion' }
      },
      {
        id: 'harmonic_balance',
        name: 'Harmonic Balance',
        description: 'Achieve perfect harmony (100%) in a fusion',
        icon: '☯️',
        rarity: Rarity.EPIC,
        condition: (stats: UserStatistics, timeSpent?: number, recentFusions?: FusionResult[]) =>
          (recentFusions || []).some(fusion => fusion.quality >= 100),
        reward: { experience: 3000, title: 'Harmony Seeker' }
      }
    ];
  }

  /**
   * Generate experience thresholds for each level
   */
  private generateLevelThresholds(): number[] {
    const thresholds: number[] = [0];

    for (let level = 1; level <= FusionProgressionSystem.LEVEL_CAP; level++) {
      // Use 144:99 ratio for level progression
      const threshold = Math.floor(
        FusionProgressionSystem.EXPERIENCE_BASE *
        Math.pow(level, 1.5) *
        (144 / 99)
      );
      thresholds.push(threshold);
    }

    return thresholds;
  }

  /**
   * Create new user progression
   */
  public createUserProgression(userId: string): UserProgression {
    return {
      userId,
      level: 1,
      experience: 0,
      experienceToNext: this.levelThresholds[1],
      unlockedElements: ['art_paint_brush'], // Start with basic art element
      completedFusions: [],
      achievements: [],
      statistics: {
        totalFusions: 0,
        successfulFusions: 0,
        averageQuality: 0,
        highestRarity: Rarity.COMMON,
        domainsMastered: [],
        timeSpent: 0,
        favoriteCombination: []
      },
      preferences: {
        autoSave: true,
        soundEnabled: true,
        visualEffects: true,
        theme: Theme.MYSTICAL,
        language: 'en',
        notifications: {
          fusionComplete: true,
          levelUp: true,
          achievementUnlocked: true,
          newElements: true
        }
      }
    };
  }

  /**
   * Update user progression based on fusion result
   */
  public updateProgression(
    currentProgression: UserProgression,
    fusionResult: FusionResult,
    timeSpent: number = 0
  ): UserProgression {
    const updated = { ...currentProgression };

    // Update experience and level
    updated.experience += fusionResult.experience;
    updated.experienceToNext = this.calculateExperienceToNext(updated.level, updated.experience);

    // Check for level up
    if (updated.experience >= this.levelThresholds[updated.level]) {
      updated.level += 1;
      updated.experienceToNext = this.calculateExperienceToNext(updated.level, updated.experience);

      // Unlock new elements based on level
      this.unlockElementsForLevel(updated);
    }

    // Update statistics
    updated.completedFusions.push(fusionResult.id);
    if (fusionResult.success) {
      updated.statistics.successfulFusions += 1;
      updated.statistics.averageQuality =
        (updated.statistics.averageQuality * (updated.statistics.successfulFusions - 1) + fusionResult.quality) /
        updated.statistics.successfulFusions;
    }
    updated.statistics.totalFusions += 1;
    updated.statistics.timeSpent += timeSpent;

    // Update highest rarity
    if (fusionResult.success && fusionResult.output) {
      const resultRarity = fusionResult.output.rarity;
      if (this.rarityToNumber(resultRarity) > this.rarityToNumber(updated.statistics.highestRarity)) {
        updated.statistics.highestRarity = resultRarity;
      }
    }

    // Check for new achievements
    this.checkAchievements(updated, fusionResult);

    return updated;
  }

  /**
   * Calculate experience needed for next level
   */
  private calculateExperienceToNext(currentLevel: number, currentExperience: number): number {
    const nextLevelThreshold = this.levelThresholds[currentLevel] || 0;
    return Math.max(0, nextLevelThreshold - currentExperience);
  }

  /**
   * Unlock new elements based on user level
   */
  private unlockElementsForLevel(progression: UserProgression): void {
    const newUnlocks: string[] = [];

    // Level-based unlocks using sacred numbers
    if (progression.level >= 3 && !progression.unlockedElements.includes('science_atom')) {
      newUnlocks.push('science_atom');
    }
    if (progression.level >= 5 && !progression.unlockedElements.includes('spirit_lotus')) {
      newUnlocks.push('spirit_lotus');
    }
    if (progression.level >= 7 && !progression.unlockedElements.includes('art_masterpiece')) {
      newUnlocks.push('art_masterpiece');
    }
    if (progression.level >= 12 && !progression.unlockedElements.includes('science_quantum_field')) {
      newUnlocks.push('science_quantum_field');
    }
    if (progression.level >= 21 && !progression.unlockedElements.includes('spirit_enlightenment')) {
      newUnlocks.push('spirit_enlightenment');
    }

    progression.unlockedElements.push(...newUnlocks);
  }

  /**
   * Check and unlock achievements
   */
  private checkAchievements(
    progression: UserProgression,
    fusionResult: FusionResult
  ): void {
    const recentFusions = [fusionResult]; // In a real implementation, this would be the last N fusions

    this.achievements.forEach(achievement => {
      // Skip if already unlocked
      if (progression.achievements.some(a => a.id === achievement.id)) {
        return;
      }

      let shouldUnlock = false;

      if (achievement.condition.length === 1) {
        // Condition only uses statistics
        shouldUnlock = achievement.condition(progression.statistics);
      } else {
        // Condition uses additional parameters
        shouldUnlock = achievement.condition(
          progression.statistics,
          progression.statistics.timeSpent,
          recentFusions
        );
      }

      if (shouldUnlock) {
        const newAchievement: Achievement = {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          rarity: achievement.rarity,
          unlockedAt: new Date()
        };

        progression.achievements.push(newAchievement);

        // Apply achievement rewards
        if (achievement.reward.experience) {
          // Create new progression object with updated experience
          return {
            ...progression,
            experience: progression.experience + achievement.reward.experience,
            experienceToNext: this.calculateExperienceToNext(progression.level, progression.experience + achievement.reward.experience)
          };
        }
      }
    });
  }

  /**
   * Get domain mastery progress for a user
   */
  public getDomainMasteryProgress(progression: UserProgression): DomainMasteryProgress[] {
    const domains = Object.values(Domain);
    return domains.map(domain => {
      const domainFusions = progression.completedFusions.filter(fusionId => {
        // In a real implementation, this would check the actual fusion data
        return Math.random() > 0.5; // Placeholder
      }).length;

      const masteryThresholds = [0, 10, 25, 50, 100, 200]; // Fusions required for each mastery level
      const masteryLevel = masteryThresholds.findIndex(threshold => domainFusions < threshold) - 1;

      return {
        domain,
        fusionsCompleted: domainFusions,
        masteryLevel: Math.max(0, masteryLevel),
        progressToNext: masteryLevel < masteryThresholds.length - 1 ?
          domainFusions / masteryThresholds[masteryLevel + 1] : 1,
        isMastered: masteryLevel >= 4
      };
    });
  }

  /**
   * Check if user can access specific content
   */
  public canAccessContent(
    progression: UserProgression,
    contentType: ContentType,
    contentId: string
  ): boolean {
    switch (contentType) {
      case ContentType.ELEMENT:
        return progression.unlockedElements.includes(contentId);

      case ContentType.RECIPE:
        const recipeLevel = this.getRecipeRequiredLevel(contentId);
        return progression.level >= recipeLevel;

      case ContentType.FEATURE:
        return this.getFeatureRequiredLevel(contentId) <= progression.level;

      case ContentType.DOMAIN:
        return this.getDomainRequiredLevel(contentId) <= progression.level;

      default:
        return false;
    }
  }

  /**
   * Get required level for specific recipes
   */
  private getRecipeRequiredLevel(recipeId: string): number {
    const recipeLevels: Record<string, number> = {
      'recipe_basic_harmony': 1,
      'recipe_spiritual_ascension': 5,
      'recipe_quantum_mysticism': 12,
      'recipe_cosmic_synthesis': 21,
      'recipe_divine_unity': 33
    };

    return recipeLevels[recipeId] || 1;
  }

  /**
   * Get required level for specific features
   */
  private getFeatureRequiredLevel(featureId: string): number {
    const featureLevels: Record<string, number> = {
      'advanced_patterns': 3,
      'custom_recipes': 7,
      'quantum_effects': 12,
      'mystical_visualization': 5,
      'sound_synthesis': 8
    };

    return featureLevels[featureId] || 1;
  }

  /**
   * Get required level for specific domains
   */
  private getDomainRequiredLevel(domainId: string): number {
    const domainLevels: Record<string, number> = {
      [Domain.ART]: 1,
      [Domain.SCIENCE]: 3,
      [Domain.SPIRITUALITY]: 5
    };

    return domainLevels[domainId] || 1;
  }

  /**
   * Calculate user rank based on progression
   */
  public calculateUserRank(progression: UserProgression): UserRank {
    const totalScore = progression.level * 1000 +
                      progression.experience * 10 +
                      progression.achievements.length * 500;

    if (totalScore >= 100000) return UserRank.GRAND_MASTER;
    if (totalScore >= 50000) return UserRank.MASTER;
    if (totalScore >= 25000) return UserRank.EXPERT;
    if (totalScore >= 10000) return UserRank.ADVANCED;
    if (totalScore >= 5000) return UserRank.INTERMEDIATE;
    if (totalScore >= 1000) return UserRank.BEGINNER;

    return UserRank.NOVICE;
  }

  /**
   * Get progression insights and recommendations
   */
  public getProgressionInsights(progression: UserProgression): ProgressionInsight[] {
    const insights: ProgressionInsight[] = [];

    // Level up recommendation
    if (progression.experienceToNext < 1000) {
      insights.push({
        type: InsightType.LEVEL_UP_SOON,
        message: `You're close to reaching level ${progression.level + 1}!`,
        priority: Priority.HIGH,
        actionable: true
      });
    }

    // Domain mastery recommendations
    const masteryProgress = this.getDomainMasteryProgress(progression);
    const incompleteDomains = masteryProgress.filter(d => !d.isMastered);

    if (incompleteDomains.length > 0) {
      const nextDomain = incompleteDomains.sort((a, b) => b.progressToNext - a.progressToNext)[0];
      insights.push({
        type: InsightType.DOMAIN_MASTERY,
        message: `Focus on ${nextDomain.domain} fusions to achieve mastery!`,
        priority: Priority.MEDIUM,
        actionable: true
      });
    }

    // Achievement recommendations
    const availableAchievements = this.getAvailableAchievements(progression);
    if (availableAchievements.length > 0) {
      insights.push({
        type: InsightType.ACHIEVEMENT_AVAILABLE,
        message: `${availableAchievements.length} achievements available to unlock!`,
        priority: Priority.LOW,
        actionable: true
      });
    }

    return insights;
  }

  /**
   * Get achievements available to unlock
   */
  private getAvailableAchievements(progression: UserProgression): AchievementDefinition[] {
    return this.achievements.filter(achievement =>
      !progression.achievements.some(a => a.id === achievement.id)
    );
  }

  /**
   * Convert rarity enum to numeric value for comparison
   */
  private rarityToNumber(rarity: Rarity): number {
    const rarityValues = {
      [Rarity.COMMON]: 1,
      [Rarity.UNCOMMON]: 2,
      [Rarity.RARE]: 3,
      [Rarity.EPIC]: 4,
      [Rarity.LEGENDARY]: 5,
      [Rarity.MYTHICAL]: 6
    };
    return rarityValues[rarity];
  }

  /**
   * Export user progression data
   */
  public exportProgressionData(progression: UserProgression): ExportedProgressionData {
    return {
      userId: progression.userId,
      level: progression.level,
      experience: progression.experience,
      achievements: progression.achievements.map(a => a.id),
      statistics: progression.statistics,
      preferences: progression.preferences,
      exportDate: new Date(),
      version: '1.0.0'
    };
  }

  /**
   * Import user progression data
   */
  public importProgressionData(data: ExportedProgressionData): UserProgression {
    return {
      userId: data.userId,
      level: data.level,
      experience: data.experience,
      experienceToNext: this.calculateExperienceToNext(data.level, data.experience),
      unlockedElements: [], // Would be populated based on level/achievements
      completedFusions: [],
      achievements: data.achievements.map(id => ({
        id,
        name: '', // Would look up from achievement definitions
        description: '',
        icon: '',
        rarity: Rarity.COMMON,
        unlockedAt: new Date()
      })),
      statistics: data.statistics,
      preferences: data.preferences
    };
  }
}

// Supporting types and enums
export enum UserRank {
  NOVICE = 'novice',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
  MASTER = 'master',
  GRAND_MASTER = 'grand_master'
}

export enum ContentType {
  ELEMENT = 'element',
  RECIPE = 'recipe',
  FEATURE = 'feature',
  DOMAIN = 'domain'
}

export enum InsightType {
  LEVEL_UP_SOON = 'level_up_soon',
  DOMAIN_MASTERY = 'domain_mastery',
  ACHIEVEMENT_AVAILABLE = 'achievement_available',
  UNLOCK_AVAILABLE = 'unlock_available'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface ProgressionInsight {
  type: InsightType;
  message: string;
  priority: Priority;
  actionable: boolean;
}

export interface DomainMasteryProgress {
  domain: Domain;
  fusionsCompleted: number;
  masteryLevel: number; // 0-5
  progressToNext: number; // 0-1
  isMastered: boolean;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  condition: (
    stats: UserStatistics,
    timeSpent?: number,
    recentFusions?: FusionResult[]
  ) => boolean;
  reward: {
    experience: number;
    title?: string;
  };
}

export interface ExportedProgressionData {
  userId: string;
  level: number;
  experience: number;
  achievements: string[];
  statistics: UserStatistics;
  preferences: UserPreferences;
  exportDate: Date;
  version: string;
}