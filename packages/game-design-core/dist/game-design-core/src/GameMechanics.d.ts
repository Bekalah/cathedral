/**
 * Game Mechanics - Advanced Game Design Tools
 *
 * Advanced game mechanics for Game Design Engine
 * Includes balance analysis, progression systems, and player experience optimization
 *
 * @license CC0-1.0 - Public Domain
 */
import type { GameMechanic, RPGElement, RewardStructure } from './GameDesignEngine';
export interface BalanceAnalysis {
    challenge: number;
    reward: number;
    flow: number;
    balance: number;
    sacredRatio: number;
}
export interface ProgressionSystem {
    type: 'linear' | 'exponential' | 'fibonacci' | 'golden-ratio' | 'consciousness-based';
    levels: number;
    milestones: number[];
    sacredRatio: number;
}
export interface PlayerExperience {
    engagement: number;
    satisfaction: number;
    flow: number;
    learning: number;
    consciousnessEvolution: number;
    sacredRatio: number;
}
/**
 * Advanced Game Mechanics Tools
 */
export declare class GameMechanicsTools {
    private readonly GOLDEN_RATIO;
    private readonly RATIO_144_99;
    private readonly FIBONACCI;
    /**
     * Analyze game balance
     */
    analyzeBalance(challengeLevel: number, rewardStructure: RewardStructure, consciousnessLevel: number): BalanceAnalysis;
    /**
     * Generate progression system
     */
    generateProgression(consciousnessLevel: number, nodeCount: number): ProgressionSystem;
    /**
     * Optimize player experience
     */
    optimizeExperience(gameMechanics: GameMechanic[], rpgElements: RPGElement[], consciousnessLevel: number): PlayerExperience;
    /**
     * Calculate difficulty curve
     */
    calculateDifficultyCurve(levels: number, consciousnessLevel: number): number[];
    /**
     * Generate quest structure
     */
    generateQuestStructure(nodeCount: number, consciousnessLevel: number): {
        mainQuests: number;
        sideQuests: number;
        totalQuests: number;
        sacredRatio: number;
    };
}
//# sourceMappingURL=GameMechanics.d.ts.map