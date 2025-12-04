/**
 * Trinity Architecture - Main Coordinator
 *
 * Integrates Body (Hall of Ateliers), Soul (Fusion Creative Suite),
 * and Spirit (Sacred Mathematics) with 144:99 ratio compliance
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
import { TrinitySession, TrinityValidation } from '../types/trinity-architecture';
import { ConsciousnessState } from '../types/consciousness';
import { TraumaSafeConfig } from '../types/consciousness';
/**
 * Trinity Architecture Main Coordinator
 *
 * Coordinates the Body/Soul/Spirit consciousness evolution system
 * with cross-component communication and validation
 */
export declare class TrinityArchitecture {
    private consciousnessEngine;
    private bodyComponent;
    private soulComponent;
    private spiritComponent;
    private activeSession;
    private traumaConfig;
    constructor();
    /**
     * Create default trauma-safe configuration
     */
    private createDefaultTraumaConfig;
    /**
     * Initialize all Trinity components
     */
    private initializeComponents;
    /**
     * Start a new Trinity session
     */
    startSession(userId: string, traumaConfig?: Partial<TraumaSafeConfig>): Promise<TrinitySession>;
    /**
     * Progress consciousness through Trinity components
     */
    progressThroughTrinity(targetLevel: number): Promise<ConsciousnessState>;
    /**
     * Add activities to Trinity components based on consciousness level
     */
    private addComponentActivities;
    /**
     * Get Body component activities for consciousness level
     */
    private getBodyActivities;
    /**
     * Get Soul component activities for consciousness level
     */
    private getSoulActivities;
    /**
     * Get Spirit component activities for consciousness level
     */
    private getSpiritActivities;
    /**
     * Perform consciousness fusion across Trinity components
     */
    performTrinityFusion(level1: number, level2: number): Promise<any>;
    /**
     * Validate Trinity harmony
     */
    private validateTrinityHarmony;
    /**
     * Get comprehensive Trinity validation
     */
    getValidation(): TrinityValidation;
    /**
     * Validate 144:99 ratio compliance
     */
    private validate144_99Ratio;
    /**
     * Generate recommendations for session optimization
     */
    private generateRecommendations;
    /**
     * End current session
     */
    endSession(): any;
    /**
     * Get current session status
     */
    getSessionStatus(): any;
    /**
     * Update trauma-safe configuration
     */
    updateTraumaConfiguration(config: Partial<TraumaSafeConfig>): void;
    /**
     * Get consciousness evolution recommendations
     */
    getEvolutionRecommendations(): string[];
    /**
     * Get available consciousness progressions
     */
    getAvailableProgressions(): any[];
    /**
     * Get available consciousness fusions
     */
    getAvailableFusions(): any[];
}
//# sourceMappingURL=trinity-architecture.d.ts.map