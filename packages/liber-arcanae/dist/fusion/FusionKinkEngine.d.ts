/**
 * FusionKinkEngine
 *
 * @package @cathedral/src
 */
/**
 * Fusion Kink Engine
 * Advanced fusion mechanics connecting Liber Arcanae and Codex 144:99
 */
import { ArcanaCard, FusionKinkSession } from '../types';
export declare class FusionKinkEngine {
    private activeSessions;
    /**
     * Create a fusion kink session between Arcana cards
     */
    createFusionSession(cardIds: string[], intensity?: number, safetyProtocols?: string[]): FusionKinkSession;
    private getCard;
    private determineFusionType;
    private calculateTransformation;
    private calculateOutcome;
    private calculateDuration;
    private generateAftercare;
    /**
     * Get active fusion session
     */
    getFusionSession(id: string): FusionKinkSession | undefined;
    /**
     * Get all active fusion sessions
     */
    getAllFusionSessions(): FusionKinkSession[];
    /**
     * End fusion session
     */
    endFusionSession(id: string): FusionKinkSession | undefined;
    /**
     * Calculate fusion compatibility between cards
     */
    calculateCompatibility(card1: ArcanaCard, card2: ArcanaCard): number;
    private areComplementaryElements;
    /**
     * Generate fusion recommendations
     */
    generateFusionRecommendations(cardId: string, availableCards: ArcanaCard[]): string[];
    /**
     * Calculate fusion energy requirements
     */
    calculateFusionEnergy(cards: ArcanaCard[], intensity: number): number;
    /**
     * Validate fusion safety
     */
    validateFusionSafety(cards: ArcanaCard[], intensity: number): {
        isSafe: boolean;
        warnings: string[];
        recommendations: string[];
    };
    private hasOpposingElements;
    /**
     * Generate fusion session report
     */
    generateFusionReport(session: FusionKinkSession): string;
}
//# sourceMappingURL=FusionKinkEngine.d.ts.map