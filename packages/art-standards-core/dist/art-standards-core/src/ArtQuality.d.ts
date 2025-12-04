/**
 * Art Quality - Quality Assurance Tools
 *
 * Quality assurance features for Art Standards
 * Includes quality metrics, optimization, and certification
 *
 * @license CC0-1.0 - Public Domain
 */
export interface QualityMetrics {
    resolution: number;
    colorDepth: number;
    aspectRatio: number;
    sacredGeometry: number;
    traumaAware: number;
    consciousnessMapping: number;
    overall: number;
    sacredRatio: number;
}
export interface OptimizationResult {
    improved: boolean;
    metrics: QualityMetrics;
    recommendations: string[];
    sacredRatio: number;
}
export interface Certification {
    level: 'museum-grade' | 'professional' | 'high' | 'standard' | 'uncertified';
    score: number;
    valid: boolean;
    sacredRatio: number;
}
/**
 * Art Quality Tools
 */
export declare class ArtQualityTools {
    private getCathedralRatio;
    /**
     * Calculate quality metrics
     */
    calculateMetrics(art: {
        width: number;
        height: number;
        colorDepth: number;
        sacredGeometry: boolean;
        traumaAware: boolean;
        consciousnessLevel: number;
    }): QualityMetrics;
    /**
     * Optimize art quality
     */
    optimize(art: {
        width: number;
        height: number;
        colorDepth: number;
        sacredGeometry: boolean;
        traumaAware: boolean;
        consciousnessLevel: number;
    }): OptimizationResult;
    /**
     * Certify art quality
     */
    certify(metrics: QualityMetrics): Certification;
}
//# sourceMappingURL=ArtQuality.d.ts.map