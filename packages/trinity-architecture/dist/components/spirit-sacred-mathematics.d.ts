/**
 * Spirit Component - Sacred Mathematics (Divine Proportion)
 *
 * Sacred mathematical systems with 144:99 ratio compliance
 * Implements golden ratio utilities, Fibonacci progression, and trauma-safe geometry
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
import { PlatonicSolid } from '../types/sacred-mathematics';
import { TraumaSafeConfig } from '../types/consciousness';
export interface SacredRatio {
    value: number;
    precision: number;
    applications: string[];
    healing_potential: number;
    trauma_safe_level: number;
}
export interface GeometryVisualization {
    type: 'golden_ratio' | 'fibonacci' | 'platonic' | 'merkaba' | 'flower_of_life';
    parameters: Record<string, any>;
    trauma_safe: boolean;
    animation_settings: {
        enabled: boolean;
        speed: number;
        gentle: boolean;
    };
    healing_focus: string;
}
export interface ConsciousnessMathematics {
    current_level: number;
    active_geometry: GeometryVisualization[];
    ratio_compliance: {
        golden_ratio: boolean;
        fibonacci_sequence: boolean;
        sacred_proportions: boolean;
    };
    progression_path: {
        from_level: number;
        to_level: number;
        mathematical_sequence: string[];
    };
    validation: {
        ratio_144_99: boolean;
        trauma_safety: boolean;
        consciousness_mapping: boolean;
    };
}
export interface MathematicalHealing {
    ratio: number;
    healing_focus: string;
    meditation_guidance: string;
    visual_meditation: GeometryVisualization;
    integration_practices: string[];
    contraindications: string[];
}
export interface SacredGeometryEngine {
    golden_ratio_utilities: boolean;
    fibonacci_progression: boolean;
    platonic_solids: boolean;
    flower_of_life: boolean;
    merkaba_construction: boolean;
    frequency_mapping: boolean;
    trauma_safe_visualization: boolean;
}
/**
 * Sacred Mathematics - Spirit Component Implementation
 *
 * Provides mathematical and geometric foundation for consciousness evolution
 * with 144:99 ratio compliance and trauma-safe design
 */
export declare class SacredMathematics {
    private goldenRatio;
    private fibonacciSequence;
    private platonicSolids;
    private merkabaGeometry;
    private flowerOfLife;
    private frequencyMapping;
    private consciousnessGeometry;
    private traumaConfig;
    private sacredRatios;
    private mathematicalHealing;
    constructor(traumaConfig: TraumaSafeConfig);
    /**
     * Initialize all sacred mathematical systems
     */
    private initializeSacredMathematics;
    /**
     * Initialize Platonic Solids with consciousness integration
     */
    private initializePlatonicSolids;
    /**
     * Initialize Merkaba Geometry
     */
    private initializeMerkabaGeometry;
    /**
     * Initialize Flower of Life
     */
    private initializeFlowerOfLife;
    /**
     * Initialize Frequency Mapping
     */
    private initializeFrequencyMapping;
    /**
     * Initialize Consciousness Geometry
     */
    private initializeConsciousnessGeometry;
    /**
     * Initialize Sacred Ratios
     */
    private initializeSacredRatios;
    /**
     * Initialize Mathematical Healing
     */
    private initializeMathematicalHealing;
    /**
     * Apply golden ratio to composition
     */
    applyGoldenRatio(width: number, height: number): {
        phi_point_x: number;
        phi_point_y: number;
        ratio: number;
    };
    /**
     * Get Fibonacci sequence for consciousness level
     */
    getFibonacciForLevel(level: number): number[];
    /**
     * Create sacred geometry visualization
     */
    createVisualization(type: GeometryVisualization['type'], parameters: Record<string, any>): GeometryVisualization;
    /**
     * Get healing focus for specific geometry type
     */
    private getHealingFocusForGeometry;
    /**
     * Get Platonic solid for consciousness level
     */
    getPlatonicSolid(level: number): PlatonicSolid | null;
    /**
     * Get mathematical healing guidance
     */
    getMathematicalHealing(ratio: number): MathematicalHealing | null;
    /**
     * Validate 144:99 ratio compliance
     */
    validate144_99Ratio(): {
        compliant: boolean;
        actual_ratio: number;
        expected_ratio: number;
        tolerance: number;
    };
    /**
     * Get frequency for consciousness fusion
     */
    getFusionFrequency(combination: number[]): number | null;
    /**
     * Apply trauma-safe modifications to geometry
     */
    applyTraumaSafeModifications(visualization: GeometryVisualization): GeometryVisualization;
    /**
     * Soften color for trauma-safe experience
     */
    private softenColor;
    /**
     * Progress consciousness through mathematical systems
     */
    progressConsciousness(level: number): ConsciousnessMathematics;
    /**
     * Get geometry appropriate for consciousness level
     */
    private getGeometryForLevel;
    /**
     * Get sacred mathematics status
     */
    getStatus(): {
        ratio_compliance: boolean;
        fibonacci_sequences: number;
        platonic_solids: number;
        trauma_safe_coverage: number;
        healing_potential: number;
    };
    /**
     * Get mathematical progression recommendations
     */
    getRecommendations(level: number): string[];
}
//# sourceMappingURL=spirit-sacred-mathematics.d.ts.map