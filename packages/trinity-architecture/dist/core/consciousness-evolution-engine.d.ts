/**
 * Consciousness Evolution Engine - 22-Level Major Arcanum System
 *
 * Core engine for consciousness evolution through the 22 Major Arcana
 * Implements trauma-safe progression with 144:99 ratio compliance
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
import { ConsciousnessLevel, ConsciousnessFusion, TraumaSafeConfig, ConsciousnessState } from '../types/consciousness';
/**
 * Consciousness Evolution Engine
 *
 * Manages the 22-level consciousness progression system with
 * trauma-safe design and Major Arcanum integration
 */
export declare class ConsciousnessEvolutionEngine {
    private levels;
    private fusions;
    private activeState;
    constructor();
    /**
     * Initialize all 22 consciousness levels with Major Arcana integration
     */
    private initializeLevels;
    /**
     * Initialize consciousness fusion patterns
     */
    private initializeFusions;
    /**
     * Create initial consciousness state
     */
    private createInitialState;
    /**
     * Create default sacred geometry configuration
     */
    private createDefaultSacredGeometry;
    /**
     * Progress consciousness to next level
     */
    progressConsciousness(targetLevel: number): Promise<ConsciousnessState>;
    /**
     * Execute consciousness fusion
     */
    performFusion(level1: number, level2: number): Promise<ConsciousnessFusion>;
    /**
     * Get current consciousness state
     */
    getState(): ConsciousnessState;
    /**
     * Get available progressions from current level
     */
    getAvailableProgressions(): ConsciousnessLevel[];
    /**
     * Get fusion possibilities from current level
     */
    getAvailableFusions(): ConsciousnessFusion[];
    /**
     * Validate consciousness state integrity
     */
    validateState(): {
        valid: boolean;
        issues: string[];
    };
    /**
     * Update trauma-safe configuration
     */
    updateTraumaConfig(config: Partial<TraumaSafeConfig>): void;
    /**
     * Get consciousness progression recommendations
     */
    getRecommendations(): string[];
}
//# sourceMappingURL=consciousness-evolution-engine.d.ts.map