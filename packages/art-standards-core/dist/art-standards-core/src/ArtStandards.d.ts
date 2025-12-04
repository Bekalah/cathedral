/**
 * Art Standards - Museum-Grade Quality & Sacred Geometry
 *
 * Defines art standards for Cathedral:
 * - Museum-grade quality
 * - Sacred geometry (144:99 ratio, golden ratio, Fibonacci)
 * - Trauma-aware design
 * - Multi-modal integration
 * - Consciousness-based aesthetics
 *
 * @license CC0-1.0 - Public Domain
 */
export interface ArtStandard {
    name: string;
    description: string;
    requirements: string[];
    sacredGeometry: {
        ratio: number;
        goldenRatio: boolean;
        fibonacci: boolean;
    };
    traumaAware: boolean;
    consciousnessLevel: number;
}
export interface ColorStandard {
    name: string;
    rgb: {
        r: number;
        g: number;
        b: number;
    };
    hex: string;
    consciousnessLevel: number;
    emotionalResonance: string;
    sacredRatio: number;
}
export interface CompositionStandard {
    name: string;
    layout: 'golden-ratio' | 'rule-of-thirds' | 'sacred-geometry' | 'fibonacci' | '144-99';
    focalPoints: number;
    balance: 'symmetrical' | 'asymmetrical' | 'radial';
    depth: number;
    sacredGeometry: boolean;
}
export interface QualityStandard {
    level: 'museum-grade' | 'professional' | 'high' | 'standard';
    requirements: {
        resolution: {
            min: number;
            recommended: number;
        };
        colorDepth: number;
        fileFormat: string[];
        sacredGeometry: boolean;
        traumaAware: boolean;
        consciousnessMapping: boolean;
    };
}
/**
 * Art Standards Engine
 */
export declare class ArtStandards {
    private readonly STANDARDS;
    private readonly COLOR_STANDARDS;
    private readonly COMPOSITION_STANDARDS;
    private readonly QUALITY_STANDARDS;
    /**
     * Get art standard by name
     */
    getStandard(name: string): ArtStandard | null;
    /**
     * Get color standard by consciousness level
     */
    getColorByConsciousness(level: number): ColorStandard | null;
    /**
     * Get composition standard by layout
     */
    getComposition(layout: CompositionStandard['layout']): CompositionStandard | null;
    /**
     * Get quality standard by level
     */
    getQuality(level: QualityStandard['level']): QualityStandard | null;
    /**
     * Validate art against standards
     */
    validateArt(art: {
        width: number;
        height: number;
        colorDepth: number;
        fileFormat: string;
        consciousnessLevel: number;
        sacredGeometry: boolean;
        traumaAware: boolean;
    }): {
        valid: boolean;
        standard: ArtStandard | null;
        issues: string[];
        recommendations: string[];
    };
    /**
     * Get all standards
     */
    getAllStandards(): ArtStandard[];
    /**
     * Get all color standards
     */
    getAllColors(): ColorStandard[];
    /**
     * Get all composition standards
     */
    getAllCompositions(): CompositionStandard[];
}
//# sourceMappingURL=ArtStandards.d.ts.map