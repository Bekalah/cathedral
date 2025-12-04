"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallOfAteliers = void 0;
99; /**
 * Body Component - Hall of Ateliers (Physical Creativity)
 *
 * Professional studio space management with Major Arcana integration
 * Implements trauma-safe creative spaces and collaboration tools
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
/**
 * Hall of Ateliers - Body Component Implementation
 *
 * Manages physical creative spaces aligned with Major Arcana
 * Provides trauma-safe environments for consciousness-based creation
 */
class HallOfAteliers {
    config;
    studios = new Map();
    artistProfiles = new Map();
    activeSessions = new Map();
    exhibitionSpaces = [];
    constructor(config) {
        this.config = config;
        this.initializeStudios();
        this.initializeExhibitionSpaces();
    }
    /**
     * Initialize Arcana-aligned studio spaces
     */
    initializeStudios() {
        // Studio 0: The Fool - Infinite Potential Studio
        this.studios.set('studio_0', {
            id: 'studio_0',
            name: 'The Fool - Infinite Potential Studio',
            arcanaAlignment: 0,
            availableFusions: [1], // Fool + High Priestess = Magician
            equipment: [
                'Blank canvases (various sizes)',
                'Basic drawing materials',
                'Exploration tools',
                'Safe space for mistakes',
                'Gentle lighting'
            ],
            capacity: 1,
            traumaLevel: 1,
            booking: {
                available: true,
                sessionLength: 60,
                recoveryTime: 15
            },
            professional_features: {
                canvas_4096: true,
                sacred_geometry_tools: true,
                frequency_visualizer: false,
                collaboration_space: false,
                healing_focused: true
            }
        });
        // Studio 2: The High Priestess - Intuitive Wisdom Studio
        this.studios.set('studio_2', {
            id: 'studio_2',
            name: 'The High Priestess - Intuitive Wisdom Studio',
            arcanaAlignment: 2,
            availableFusions: [1, 3], // Priestess + Fool = Magician, Priestess + Hierophant = Empress
            equipment: [
                'Sacred geometry tools',
                'Meditation cushions',
                'Lunar phase calendars',
                'Intuitive art supplies',
                'Soft ambient lighting'
            ],
            capacity: 2,
            traumaLevel: 2,
            booking: {
                available: true,
                sessionLength: 90,
                recoveryTime: 20
            },
            professional_features: {
                canvas_4096: true,
                sacred_geometry_tools: true,
                frequency_visualizer: true,
                collaboration_space: true,
                healing_focused: true
            }
        });
        // Studio 5: The Hierophant - Sacred Tradition Studio
        this.studios.set('studio_5', {
            id: 'studio_5',
            name: 'The Hierophant - Sacred Tradition Studio',
            arcanaAlignment: 5,
            availableFusions: [3, 17], // Hierophant + Priestess = Empress, Hierophant + Moon = Star
            equipment: [
                'Traditional art materials',
                'Sacred symbol references',
                'Initiatory art tools',
                'Wisdom texts library',
                'Golden ratio templates'
            ],
            capacity: 3,
            traumaLevel: 3,
            booking: {
                available: true,
                sessionLength: 120,
                recoveryTime: 30
            },
            professional_features: {
                canvas_4096: true,
                sacred_geometry_tools: true,
                frequency_visualizer: true,
                collaboration_space: true,
                healing_focused: true
            }
        });
        // Studio 18: The Moon - Dream Navigation Studio
        this.studios.set('studio_18', {
            id: 'studio_18',
            name: 'The Moon - Dream Navigation Studio',
            arcanaAlignment: 18,
            availableFusions: [17, 144], // Moon + Hierophant = Star, Moon + World = Completion
            equipment: [
                'Dream journal materials',
                'Subconscious art tools',
                'Lunar cycle instruments',
                'Soft lighting controls',
                'Comfortable seating areas'
            ],
            capacity: 2,
            traumaLevel: 4,
            booking: {
                available: true,
                sessionLength: 150,
                recoveryTime: 45
            },
            professional_features: {
                canvas_4096: true,
                sacred_geometry_tools: true,
                frequency_visualizer: true,
                collaboration_space: true,
                healing_focused: true
            }
        });
        // Studio 21: The World - Cosmic Consciousness Studio
        this.studios.set('studio_21', {
            id: 'studio_21',
            name: 'The World - Cosmic Consciousness Studio',
            arcanaAlignment: 21,
            availableFusions: [144], // World + Moon = Completion
            equipment: [
                'Universal art materials',
                'Cosmic perspective tools',
                'Integration artwork supplies',
                'Celebration space',
                'Harmonious lighting system'
            ],
            capacity: 4,
            traumaLevel: 5,
            booking: {
                available: true,
                sessionLength: 180,
                recoveryTime: 60
            },
            professional_features: {
                canvas_4096: true,
                sacred_geometry_tools: true,
                frequency_visualizer: true,
                collaboration_space: true,
                healing_focused: true
            }
        });
    }
    /**
     * Initialize exhibition spaces
     */
    initializeExhibitionSpaces() {
        this.exhibitionSpaces = [
            {
                id: 'exhibition_1',
                name: 'The Fool\'s Journey Gallery',
                theme: 'Beginner\'s mind and infinite potential',
                arcana_focus: [0],
                trauma_level: 1,
                capacity: 20,
                featured_works: []
            },
            {
                id: 'exhibition_2',
                name: 'Sacred Wisdom Chamber',
                theme: 'Traditional teachings and intuitive wisdom',
                arcana_focus: [2, 5],
                trauma_level: 2,
                capacity: 15,
                featured_works: []
            },
            {
                id: 'exhibition_3',
                name: 'Cosmic Dreamscape Hall',
                theme: 'Dream navigation and cosmic consciousness',
                arcana_focus: [18, 21],
                trauma_level: 4,
                capacity: 10,
                featured_works: []
            }
        ];
    }
    /**
     * Create artist profile with Arcana alignment
     */
    createArtistProfile(name, arcanaAlignment, traumaConfig) {
        const profile = {
            id: `artist_${Date.now()}`,
            name,
            arcana_alignment: arcanaAlignment,
            consciousness_level: 0,
            specializations: this.getArcanaSpecializations(arcanaAlignment),
            portfolio_items: [],
            trauma_config: traumaConfig,
            booking_history: []
        };
        this.artistProfiles.set(profile.id, profile);
        return profile;
    }
    /**
     * Get specializations for specific Major Arcanum
     */
    getArcanaSpecializations(arcanaId) {
        const specializations = {
            0: [
                'Beginner\'s mind exploration',
                'Fearless creative experimentation',
                'Infinite possibility visualization',
                'Sacred play and wonder'
            ],
            2: [
                'Intuitive art creation',
                'Lunar cycle art',
                'Sacred feminine expression',
                'Hidden knowledge visualization'
            ],
            5: [
                'Traditional art techniques',
                'Sacred symbol integration',
                'Initiatory artwork',
                'Wisdom teaching visualization'
            ],
            18: [
                'Dream-inspired art',
                'Subconscious exploration',
                'Lunar meditation art',
                'Mystical landscape creation'
            ],
            21: [
                'Cosmic consciousness art',
                'Universal symbol integration',
                'Completion celebration art',
                'Mandala creation'
            ]
        };
        return specializations[arcanaId] || ['General creative expression'];
    }
    /**
     * Book studio space for consciousness-based creation
     */
    async bookStudio(artistId, studioId, date, duration, activities = []) {
        const artist = this.artistProfiles.get(artistId);
        const studio = this.studios.get(studioId);
        if (!artist) {
            return { success: false, message: 'Artist profile not found' };
        }
        if (!studio) {
            return { success: false, message: 'Studio not found' };
        }
        // Validate trauma safety
        if (studio.traumaLevel > artist.trauma_config.level) {
            return {
                success: false,
                message: `Studio trauma level ${studio.traumaLevel} exceeds your safety threshold ${artist.trauma_config.level}`
            };
        }
        // Validate duration
        if (duration > studio.booking.sessionLength) {
            return {
                success: false,
                message: `Duration ${duration} exceeds studio maximum ${studio.booking.sessionLength} minutes`
            };
        }
        // Check Arcana alignment
        if (studio.arcanaAlignment !== artist.arcana_alignment) {
            return {
                success: false,
                message: `Studio alignment ${studio.arcanaAlignment} doesn\'t match your Arcana ${artist.arcana_alignment}`
            };
        }
        // Create booking record
        const booking = {
            studio_id: studioId,
            date,
            duration_minutes: duration,
            activities,
            collaboration_participants: [],
            healing_progress: 0,
            arcana_progression: 0
        };
        artist.booking_history.push(booking);
        return {
            success: true,
            sessionId: `session_${Date.now()}`,
            message: `Studio booking confirmed for ${studio.name}`
        };
    }
    /**
     * Start collaboration session
     */
    async startCollaboration(facilitatorId, participantIds, fusionId, activities) {
        const facilitator = this.artistProfiles.get(facilitatorId);
        if (!facilitator) {
            throw new Error('Facilitator profile not found');
        }
        // Validate all participants
        const participants = participantIds.map(id => {
            const participant = this.artistProfiles.get(id);
            if (!participant) {
                throw new Error(`Participant ${id} not found`);
            }
            return {
                id: participant.id,
                arcana: participant.arcana_alignment,
                level: participant.consciousness_level,
                role: 'participant'
            };
        });
        const session = {
            id: `collab_${Date.now()}`,
            participants: [
                {
                    id: facilitator.id,
                    arcana: facilitator.arcana_alignment,
                    level: facilitator.consciousness_level,
                    role: 'facilitator',
                    professional_contribution: 'Facilitation and healing guidance',
                    healing_focus: 'Consciousness fusion and group healing'
                },
                ...participants.map(p => ({
                    ...p,
                    professional_contribution: 'Creative expression and healing participation',
                    healing_focus: 'Personal healing through collaboration'
                }))
            ],
            fusion: fusionId,
            activities,
            healing: {
                goals: this.getCollaborationHealingGoals(fusionId),
                techniques: this.getCollaborationTechniques(fusionId),
                progress: 0
            },
            safety: {
                level: Math.max(...[facilitator, ...participantIds.map(id => this.artistProfiles.get(id))].map(p => p.trauma_config.level)),
                escExitAvailable: true,
                motionControl: true,
                screenReaderSupport: true,
                processingTimeAllowance: 3000,
                gentleDefaults: true,
                neurodivergentFriendly: true
            },
            professional_outcomes: {
                artworks_created: [],
                techniques_shared: [],
                healing_reports: [],
                future_sessions: true
            }
        };
        this.activeSessions.set(session.id, session);
        return session;
    }
    /**
     * Get healing goals for specific fusion
     */
    getCollaborationHealingGoals(fusionId) {
        const goals = {
            1: ['Intuitive creation mastery', 'Fearless self-expression'],
            3: ['Sacred feminine integration', 'Creative abundance'],
            17: ['Inspiration cultivation', 'Vision clarity'],
            144: ['Cosmic integration', 'Complete healing']
        };
        return goals[fusionId] || ['Collaborative healing through art'];
    }
    /**
     * Get techniques for specific fusion
     */
    getCollaborationTechniques(fusionId) {
        const techniques = {
            1: ['Guided visualization', 'Collaborative painting', 'Intention setting'],
            3: ['Sacred circle creation', 'Feminine energy art', 'Abundance visualization'],
            17: ['Vision board creation', 'Inspiration sharing', 'Star meditation'],
            144: ['Integration mandala', 'Cosmic celebration', 'Completion ritual']
        };
        return techniques[fusionId] || ['Collaborative art creation'];
    }
    /**
     * Get available studios for artist's Arcana alignment
     */
    getAvailableStudios(artistId) {
        const artist = this.artistProfiles.get(artistId);
        if (!artist)
            return [];
        return Array.from(this.studios.values()).filter(studio => {
            return studio.arcanaAlignment === artist.arcana_alignment &&
                studio.traumaLevel <= artist.trauma_config.level &&
                studio.booking.available;
        });
    }
    /**
     * Get artist's portfolio with healing impact analysis
     */
    getArtistPortfolio(artistId) {
        const artist = this.artistProfiles.get(artistId);
        return artist ? artist.portfolio_items : [];
    }
    /**
     * Add portfolio item with Arcana analysis
     */
    addPortfolioItem(artistId, title, type, arcanaInspiration, healingImpact) {
        const artist = this.artistProfiles.get(artistId);
        if (!artist)
            return;
        const item = {
            id: `portfolio_${Date.now()}`,
            title,
            type,
            arcana_inspiration: arcanaInspiration,
            consciousness_level: artist.consciousness_level,
            trauma_safe_elements: this.getTraumaSafeElements(arcanaInspiration),
            healing_impact: healingImpact,
            collaborative_creation: false,
            created_date: new Date()
        };
        artist.portfolio_items.push(item);
    }
    /**
     * Get trauma-safe elements for Arcana
     */
    getTraumaSafeElements(arcanaId) {
        const elements = {
            0: [
                'Beginner-friendly approach',
                'Mistake-friendly environment',
                'Gentle encouragement',
                'No judgment space'
            ],
            2: [
                'Intuitive guidance only',
                'Sacred silence respect',
                'Lunar cycle awareness',
                'Emotional safety'
            ],
            5: [
                'Traditional support',
                'Initiatory preparation',
                'Wisdom pacing',
                'Sacred respect'
            ],
            18: [
                'Dream safety protocols',
                'Subconscious gentle exploration',
                'Lunar rhythm respect',
                'Mystical grounding'
            ],
            21: [
                'Cosmic perspective grounding',
                'Integration pacing',
                'Completion celebration',
                'Universal love focus'
            ]
        };
        return elements[arcanaId] || ['General safety protocols'];
    }
    /**
     * Get exhibition spaces with Arcana themes
     */
    getExhibitionSpaces() {
        return this.exhibitionSpaces;
    }
    /**
     * Get Hall of Ateliers status and analytics
     */
    getStatus() {
        const arcanaDistribution = {};
        this.artistProfiles.forEach(artist => {
            arcanaDistribution[artist.arcana_alignment] =
                (arcanaDistribution[artist.arcana_alignment] || 0) + 1;
        });
        const traumaSafeCoverage = this.calculateTraumaSafeCoverage();
        return {
            total_studios: this.studios.size,
            active_sessions: this.activeSessions.size,
            total_artists: this.artistProfiles.size,
            trauma_safe_coverage: traumaSafeCoverage,
            arcana_distribution: arcanaDistribution
        };
    }
    /**
     * Calculate trauma-safe coverage percentage
     */
    calculateTraumaSafeCoverage() {
        const totalStudios = this.studios.size;
        const safeStudios = Array.from(this.studios.values())
            .filter(studio => studio.traumaLevel <= this.config.trauma_safe_level).length;
        return totalStudios > 0 ? (safeStudios / totalStudios) * 100 : 0;
    }
    /**
     * Update artist's consciousness level
     */
    updateArtistConsciousness(artistId, newLevel) {
        const artist = this.artistProfiles.get(artistId);
        if (!artist)
            return false;
        artist.consciousness_level = newLevel;
        return true;
    }
}
exports.HallOfAteliers = HallOfAteliers;
//# sourceMappingURL=body-hall-of-ateliers.js.map