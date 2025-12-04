import { StudioSpace, CollaborationSession } from '../types/arcana';
import { TraumaSafeConfig } from '../types/consciousness';
export interface ArtistProfile {
    id: string;
    name: string;
    arcana_alignment: number;
    consciousness_level: number;
    specializations: string[];
    portfolio_items: PortfolioItem[];
    trauma_config: TraumaSafeConfig;
    booking_history: BookingRecord[];
}
export interface PortfolioItem {
    id: string;
    title: string;
    type: 'visual_art' | 'sculpture' | 'digital_art' | 'textile' | 'mixed_media' | 'installation';
    arcana_inspiration: number;
    consciousness_level: number;
    trauma_safe_elements: string[];
    healing_impact: string[];
    collaborative_creation: boolean;
    created_date: Date;
}
export interface BookingRecord {
    studio_id: string;
    date: Date;
    duration_minutes: number;
    activities: string[];
    collaboration_participants: string[];
    healing_progress: number;
    arcana_progression: number;
}
export interface HallOfAteliersConfig {
    trauma_safe_level: number;
    available_studios: number;
    max_session_duration: number;
    collaboration_enabled: boolean;
    exhibition_spaces: number;
    material_library_size: number;
}
/**
 * Hall of Ateliers - Body Component Implementation
 *
 * Manages physical creative spaces aligned with Major Arcana
 * Provides trauma-safe environments for consciousness-based creation
 */
export declare class HallOfAteliers {
    private config;
    private studios;
    private artistProfiles;
    private activeSessions;
    private exhibitionSpaces;
    constructor(config: HallOfAteliersConfig);
    /**
     * Initialize Arcana-aligned studio spaces
     */
    private initializeStudios;
    /**
     * Initialize exhibition spaces
     */
    private initializeExhibitionSpaces;
    /**
     * Create artist profile with Arcana alignment
     */
    createArtistProfile(name: string, arcanaAlignment: number, traumaConfig: TraumaSafeConfig): ArtistProfile;
    /**
     * Get specializations for specific Major Arcanum
     */
    private getArcanaSpecializations;
    /**
     * Book studio space for consciousness-based creation
     */
    bookStudio(artistId: string, studioId: string, date: Date, duration: number, activities?: string[]): Promise<{
        success: boolean;
        sessionId?: string;
        message: string;
    }>;
    /**
     * Start collaboration session
     */
    startCollaboration(facilitatorId: string, participantIds: string[], fusionId: number, activities: string[]): Promise<CollaborationSession>;
    /**
     * Get healing goals for specific fusion
     */
    private getCollaborationHealingGoals;
    /**
     * Get techniques for specific fusion
     */
    private getCollaborationTechniques;
    /**
     * Get available studios for artist's Arcana alignment
     */
    getAvailableStudios(artistId: string): StudioSpace[];
    /**
     * Get artist's portfolio with healing impact analysis
     */
    getArtistPortfolio(artistId: string): PortfolioItem[];
    /**
     * Add portfolio item with Arcana analysis
     */
    addPortfolioItem(artistId: string, title: string, type: PortfolioItem['type'], arcanaInspiration: number, healingImpact: string[]): void;
    /**
     * Get trauma-safe elements for Arcana
     */
    private getTraumaSafeElements;
    /**
     * Get exhibition spaces with Arcana themes
     */
    getExhibitionSpaces(): ExhibitionSpace[];
    /**
     * Get Hall of Ateliers status and analytics
     */
    getStatus(): {
        total_studios: number;
        active_sessions: number;
        total_artists: number;
        trauma_safe_coverage: number;
        arcana_distribution: {
            [key: number]: number;
        };
    };
    /**
     * Calculate trauma-safe coverage percentage
     */
    private calculateTraumaSafeCoverage;
    /**
     * Update artist's consciousness level
     */
    updateArtistConsciousness(artistId: string, newLevel: number): boolean;
}
interface ExhibitionSpace {
    id: string;
    name: string;
    theme: string;
    arcana_focus: number[];
    trauma_level: number;
    capacity: number;
    featured_works: PortfolioItem[];
}
export {};
//# sourceMappingURL=body-hall-of-ateliers.d.ts.map