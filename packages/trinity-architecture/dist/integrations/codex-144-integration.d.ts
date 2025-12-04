/**
 * Codex 144:99 Integration - Real Data Connection
 *
 * Connects Trinity Architecture to the actual Codex 144:99 datasets
 * with proper provenance tracking and node connectivity
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
import { TraumaSafeConfig } from '../types/consciousness';
export interface CodexNode {
    id: number;
    name: string;
    element: string;
    planet: string;
    zodiac: string;
    chakra: string;
    solfeggio: number;
    color: string;
    geometry: string;
    pigment: string;
    shem: string;
    goetia: string;
    narrative: {
        theme: string;
        archetype: string;
        storyBeats: string[];
        dialogueStyle: string;
        keywords: string[];
    };
    gameDesign: {
        abilityType: string;
        mechanics: string[];
        questType: string;
        rewardStyle: string;
        enemyAffinity: string;
        environmentEffect: string;
    };
    architecture: {
        spatialQuality: string;
        roomType: string;
        lighting: string;
        materials: string[];
        ambience: string;
        symbolPlacement: string;
    };
    symbolism: {
        primarySymbol: string;
        secondarySymbols: string[];
        geometricPattern: string;
        colorBlending: string;
    };
    harmonics: {
        perfectConsonance: number[];
        consonance: number[];
        dissonance: number[];
        tritone: number[];
    };
    rebeccaProfile: {
        purityDesignation: string;
        fractalSignature: string;
        colorPalette: string[];
        frequencyResonance: number;
        inspirations: {
            literary: string[];
            artistic: string[];
            scientific: string[];
            mystical: string[];
            technological: string[];
        };
    };
    provenance: {
        dataSource: string;
        lineage: string[];
        verification: string[];
        lastUpdated: string;
        authenticityScore: number;
    };
}
export interface ConsciousnessFusion {
    id: string;
    arcanaIds: number[];
    resultLevel: number;
    frequencyResonance: number;
    healingPotential: number;
    karmicInteraction: string;
    rebeccaIntegration: {
        level: number;
        experience: string;
        transformation: string;
    };
    sacredGeometry: {
        primaryForm: string;
        proportions: number[];
        activation: string[];
    };
    traumaSafe: {
        level: number;
        preparation: string[];
        aftercare: string[];
        contraindications: string[];
    };
    professionalApplication: {
        creative_techniques: string[];
        healing_approaches: string[];
        collaboration_methods: string[];
    };
    provenance: {
        sources: string[];
        data_integrity: string;
        authenticity: number;
    };
}
export interface QualityGuardian {
    entity: string;
    qualityDomain: string;
    specialties: string[];
    artGeneration: {
        style: string;
        mediaTypes: string[];
        colorPalette: string[];
        energySignature: string;
    };
    qualityCriteria: {
        [key: string]: string;
    };
    rebeccaAlignment: {
        personalConnection: string;
        healingFocus: string;
        professionalApplication: string;
    };
    provenance: {
        source: string;
        authenticity: number;
        lastValidation: string;
    };
}
export interface SacredMathematicsConnection {
    ratio: number;
    source: string;
    applications: string[];
    consciousnessMapping: {
        level: number;
        geometry: string;
        healing_focus: string;
    }[];
    rebeccaProfile: {
        personalRatio: string;
        frequency: number;
        geometricPreference: string;
    };
    traumaSafe: {
        gentle_approach: boolean;
        progression_pacing: string;
        safety_protocols: string[];
    };
}
/**
 * Codex 144:99 Integration System
 *
 * Connects all Trinity Architecture components to real Codex data
 * with complete provenance tracking and authenticity validation
 */
export declare class Codex144Integration {
    private mcdDataset;
    private completeArcanaProfiles;
    private codexExpanded;
    private codexNodes;
    private consciousnessFusions;
    private qualityGuardians;
    private sacredMathematicsConnections;
    private traumaConfig;
    constructor(traumaConfig: TraumaSafeConfig);
    /**
     * Load and integrate all Codex 144:99 datasets
     */
    loadCodexDatasets(): Promise<void>;
    /**
     * Load MCP Permanent Dataset
     */
    private loadMcdPermanentDataset;
    /**
     * Load and process Codex nodes from the 144:99 system
     */
    private loadCodexNodes;
    /**
     * Load Complete Arcana Profiles
     */
    private loadCompleteArcanaProfiles;
    /**
     * Load Expanded Codex 144:99
     */
    private loadCodexExpanded;
    /**
     * Process consciousness fusions from the data
     */
    private processConsciousnessFusions;
    /**
     * Process quality guardians from the data
     */
    private processQualityGuardians;
    /**
     * Process sacred mathematics connections
     */
    private processSacredMathematics;
    /**
     * Get Codex node by ID
     */
    getCodexNode(nodeId: number): CodexNode | null;
    /**
     * Get all Codex nodes
     */
    getAllCodexNodes(): CodexNode[];
    /**
     * Get consciousness fusion
     */
    getConsciousnessFusion(fusionId: string): ConsciousnessFusion | null;
    /**
     * Get quality guardian
     */
    getQualityGuardian(guardianName: string): QualityGuardian | null;
    /**
     * Get sacred mathematics connections
     */
    getSacredMathematicsConnections(): SacredMathematicsConnection[];
    /**
     * Validate 144:99 ratio compliance
     */
    validate144_99Ratio(): {
        compliant: boolean;
        actual_ratio: number;
        expected_ratio: number;
        nodes_count: number;
        gates_count: number;
    };
    /**
     * Get complete provenance report
     */
    getProvenanceReport(): {
        datasets_loaded: string[];
        nodes_processed: number;
        fusions_created: number;
        quality_guardians_activated: number;
        sacred_mathematics_connected: number;
        authenticity_scores: {
            [key: string]: number;
        };
        data_integrity: {
            mcd_dataset: boolean;
            arcana_profiles: boolean;
            codex_expanded: boolean;
        };
        trinity_integration: {
            body_component: boolean;
            soul_component: boolean;
            spirit_component: boolean;
            bridge_communication: boolean;
        };
    };
    /**
     * Get integration status
     */
    getIntegrationStatus(): {
        codex_datasets_loaded: boolean;
        trinity_components_connected: boolean;
        provenance_tracking: boolean;
        trauma_safety_compliant: boolean;
        authenticity_validation: boolean;
        data_sources: string[];
    };
}
//# sourceMappingURL=codex-144-integration.d.ts.map