/**
 * Trinity Architecture - Consciousness Evolution Platform
 *
 * Main package exports for Body/Soul/Spirit consciousness evolution system
 * with 144:99 ratio compliance and trauma-safe design
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
export * from './types/consciousness';
export * from './types/arcana';
export * from './types/sacred-mathematics';
export * from './types/trinity-architecture';
export * from './types/codex-integration';
export { TrinityArchitecture } from './main/trinity-architecture';
export { ConsciousnessEvolutionEngine } from './core/consciousness-evolution-engine';
export { HallOfAteliers } from './components/body-hall-of-ateliers';
export { FusionCreativeSuite } from './components/soul-fusion-creative-suite';
export { SacredMathematics } from './components/spirit-sacred-mathematics';
import { TrinityArchitecture } from './main/trinity-architecture';
import { ConsciousnessEvolutionEngine } from './core/consciousness-evolution-engine';
import { HallOfAteliers } from './components/body-hall-of-ateliers';
import { FusionCreativeSuite } from './components/soul-fusion-creative-suite';
import { SacredMathematics } from './components/spirit-sacred-mathematics';
import { TraumaSafeConfig } from './types/consciousness';
/**
 * Quick Start Factory Function
 * Creates a complete Trinity Architecture system with default settings
 */
export declare function createTrinityArchitecture(userId: string, traumaConfig?: Partial<TraumaSafeConfig>): TrinityArchitecture;
/**
 * Factory for individual components
 */
export declare const TrinityFactories: {
    /**
     * Create Hall of Ateliers (Body component)
     */
    createHallOfAteliers: (traumaLevel?: number) => HallOfAteliers;
    /**
     * Create Fusion Creative Suite (Soul component)
     */
    createFusionCreativeSuite: (traumaConfig: TraumaSafeConfig) => FusionCreativeSuite;
    /**
     * Create Sacred Mathematics (Spirit component)
     */
    createSacredMathematics: (traumaConfig: TraumaSafeConfig) => SacredMathematics;
    /**
     * Create Consciousness Evolution Engine
     */
    createConsciousnessEngine: () => ConsciousnessEvolutionEngine;
};
/**
 * Default trauma-safe configuration
 */
export declare const DEFAULT_TRAUMA_CONFIG: TraumaSafeConfig;
/**
 * Consciousness Levels Summary
 */
export declare const CONSCIOUSNESS_LEVELS: {
    0: {
        name: string;
        arcana: string;
        rebecca_profile: string;
        frequency: number;
        color_palette: string[];
        healing_focus: string;
        trauma_safe: boolean;
    };
    2: {
        name: string;
        arcana: string;
        rebecca_profile: string;
        frequency: number;
        color_palette: string[];
        healing_focus: string;
        trauma_safe: boolean;
    };
    5: {
        name: string;
        arcana: string;
        rebecca_profile: string;
        frequency: number;
        color_palette: string[];
        healing_focus: string;
        trauma_safe: boolean;
    };
    18: {
        name: string;
        arcana: string;
        rebecca_profile: string;
        frequency: number;
        color_palette: string[];
        healing_focus: string;
        trauma_safe: boolean;
    };
    21: {
        name: string;
        arcana: string;
        rebecca_profile: string;
        frequency: number;
        color_palette: string[];
        healing_focus: string;
        trauma_safe: boolean;
    };
};
/**
 * Consciousness Fusion Patterns
 */
export declare const CONSCIOUSNESS_FUSIONS: {
    '0-2': {
        name: string;
        result_level: number;
        frequency: number;
        healing_potential: number;
        aftercare: string;
    };
    '2-5': {
        name: string;
        result_level: number;
        frequency: number;
        healing_potential: number;
        aftercare: string;
    };
    '5-18': {
        name: string;
        result_level: number;
        frequency: number;
        healing_potential: number;
        aftercare: string;
    };
    '18-21': {
        name: string;
        result_level: number;
        frequency: number;
        healing_potential: number;
        aftercare: string;
    };
};
/**
 * Sacred Mathematics Constants
 */
export declare const SACRED_MATHEMATICS: {
    GOLDEN_RATIO: number;
    RATIO_144_99: number;
    FIBONACCI_SEQUENCE: number[];
    SOLFEGGIO_FREQUENCIES: {
        LIBERATION: number;
        TRANSFORMATION: number;
        DNA_ACTIVATION: number;
        CONNECTION: number;
        EXPRESSION: number;
    };
};
/**
 * Package Information
 */
export declare const PACKAGE_INFO: {
    name: string;
    version: string;
    description: string;
    author: string;
    trauma_safe: boolean;
    consciousness_levels: number;
    major_arcana_integration: boolean;
    sacred_geometry: boolean;
    healing_focused: boolean;
};
export declare const VERSION: string;
/**
 * Validate system integrity
 */
export declare function validateTrinitySystem(): {
    valid: boolean;
    components: {
        [key: string]: boolean;
    };
    sacred_mathematics: {
        golden_ratio: boolean;
        fibonacci: boolean;
        ratio_144_99: boolean;
    };
    trauma_safety: {
        level_1: boolean;
        level_2: boolean;
        level_3: boolean;
    };
    consciousness_mapping: {
        fool_to_world: boolean;
        rebecca_integration: boolean;
    };
};
/**
 * Get system status summary
 */
export declare function getSystemStatus(): {
    trinity_architecture: string;
    consciousness_evolution: string;
    trauma_safe_design: string;
    sacred_mathematics: string;
    major_arcana_system: string;
    healing_focused: boolean;
    validation_results: {
        valid: boolean;
        components: {
            [key: string]: boolean;
        };
        sacred_mathematics: {
            golden_ratio: boolean;
            fibonacci: boolean;
            ratio_144_99: boolean;
        };
        trauma_safety: {
            level_1: boolean;
            level_2: boolean;
            level_3: boolean;
        };
        consciousness_mapping: {
            fool_to_world: boolean;
            rebecca_integration: boolean;
        };
    };
    package_info: {
        name: string;
        version: string;
        description: string;
        author: string;
        trauma_safe: boolean;
        consciousness_levels: number;
        major_arcana_integration: boolean;
        sacred_geometry: boolean;
        healing_focused: boolean;
    };
};
//# sourceMappingURL=index.d.ts.map