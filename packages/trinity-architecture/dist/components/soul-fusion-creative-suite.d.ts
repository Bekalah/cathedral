/**
 * Soul Component - Fusion Creative Suite (Consciousness Fusion)
 *
 * 3D consciousness tools with Major Arcana integration
 * Implements Merkaba builder, frequency visualizer, and trauma-safe creative fusion
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
import { TraumaSafeConfig } from '../types/consciousness';
export interface CreativeFusion {
    id: string;
    name: string;
    arcana_combination: number[];
    frequency_resonance: number;
    healing_focus: string;
    visual_elements: VisualElement[];
    trauma_safe_level: number;
    aftercare_protocol: AftercareProtocol;
}
export interface VisualElement {
    type: 'merkaba' | 'sacred_geometry' | 'frequency_wave' | 'arcanum_symbol' | 'fusion_pattern';
    parameters: Record<string, any>;
    trauma_safe: boolean;
    animation: {
        enabled: boolean;
        speed: number;
        gentle: boolean;
    };
}
export interface AftercareProtocol {
    grounding_techniques: string[];
    integration_time: number;
    gentle_progression: boolean;
    contraindication_check: boolean;
    safety_reminders: string[];
}
export interface Merkaba3D {
    upper_tetrahedron: {
        rotation: [number, number, number];
        color: string;
        transparency: number;
    };
    lower_tetrahedron: {
        rotation: [number, number, number];
        color: string;
        transparency: number;
    };
    connection_strength: number;
    consciousness_activation: number;
    trauma_safe_rotation: boolean;
}
export interface FrequencyVisualizer {
    active_frequencies: number[];
    visual_responses: FrequencyResponse[];
    trauma_safe_frequencies: number[];
    arcana_frequency_mapping: {
        [key: number]: number;
    };
}
export interface FrequencyResponse {
    frequency: number;
    visual_pattern: 'wave' | 'spiral' | 'mandala' | 'pulse' | 'harmony';
    color_spectrum: string[];
    intensity_range: [number, number];
    healing_potential: number;
}
export interface ProfessionalCanvas {
    resolution: '4096x4096';
    color_depth: '16-bit';
    color_space: 'sRGB' | 'Adobe_RGB';
    brush_engine: BrushEngine;
    sacred_geometry_tools: SacredGeometryTools;
    trauma_safe_defaults: TraumaSafeDefaults;
}
export interface BrushEngine {
    da_vinci_quality: boolean;
    pressure_sensitivity: boolean;
    frequency_response: boolean;
    arcanum_mappings: {
        [key: number]: string[];
    };
    trauma_safe_presets: BrushPreset[];
}
export interface BrushPreset {
    name: string;
    arcana_alignment: number;
    pressure_curve: number[];
    frequency_response: number[];
    healing_focus: string;
    trauma_safe: boolean;
}
export interface SacredGeometryTools {
    golden_ratio_utilities: boolean;
    fibonacci_tools: boolean;
    platonic_solids: boolean;
    flower_of_life: boolean;
    merkaba_builder: boolean;
    trauma_safe_visualization: boolean;
}
export interface TraumaSafeDefaults {
    gentle_motion: boolean;
    slow_animations: boolean;
    soft_colors: boolean;
    esc_exit: boolean;
    motion_reduction: boolean;
    screen_reader_support: boolean;
}
/**
 * Fusion Creative Suite - Soul Component Implementation
 *
 * Manages consciousness fusion through 3D creative tools
 * with trauma-safe design and Major Arcana integration
 */
export declare class FusionCreativeSuite {
    private creativeFusions;
    private merkaba3D;
    private frequencyVisualizer;
    private professionalCanvas;
    private activeTraumaConfig;
    constructor(traumaConfig: TraumaSafeConfig);
    /**
     * Initialize consciousness fusion patterns
     */
    private initializeCreativeFusions;
    /**
     * Initialize creative components
     */
    private initializeComponents;
    /**
     * Activate consciousness fusion
     */
    activateFusion(fusionId: string, arcanaIds: number[]): Promise<CreativeFusion>;
    /**
     * Build Merkaba with consciousness activation
     */
    buildMerkaba(consciousnessLevel: number, arcanaId: number): Promise<Merkaba3D>;
    /**
     * Apply Arcana-specific coloring to Merkaba
     */
    private applyArcanaColoring;
    /**
     * Start frequency visualization
     */
    startFrequencyVisualization(frequencies: number[]): Promise<FrequencyVisualizer>;
    /**
     * Create trauma-safe canvas session
     */
    createCanvasSession(arcanaId: number): Promise<ProfessionalCanvas>;
    /**
     * Get available fusions for current consciousness level
     */
    getAvailableFusions(): CreativeFusion[];
    /**
     * Get fusion aftercare recommendations
     */
    getAftercareRecommendations(fusionId: string): AftercareProtocol | null;
    /**
     * Update trauma-safe configuration
     */
    updateTraumaConfig(newConfig: Partial<TraumaSafeConfig>): void;
    /**
     * Get consciousness fusion progress tracking
     */
    getFusionProgress(fusionId: string): {
        activation_count: number;
        average_integration_time: number;
        healing_feedback: number;
        safety_record: {
            successful: number;
            warnings: number;
        };
    };
    /**
     * Validate fusion safety for current trauma configuration
     */
    validateFusionSafety(fusionId: string): {
        safe: boolean;
        warnings: string[];
    };
    /**
     * Get creative suite status
     */
    getStatus(): {
        available_fusions: number;
        active_components: string[];
        trauma_safe_coverage: number;
        consciousness_alignment: boolean;
    };
}
//# sourceMappingURL=soul-fusion-creative-suite.d.ts.map