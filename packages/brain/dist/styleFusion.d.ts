/**
 * @license CC0-1.0 - Public Domain
 */
export declare class StyleFusion {
    fourierAnalysis(_imageData: Float32Array): Promise<{
        dominant: any[];
        phase: any[];
        magnitude: any[];
    }>;
    goldenRatioComposition(width: number, height: number): {
        points: {
            x: number;
            y: number;
        }[];
    };
    generateFractal(_type: string, _iterations?: number): any[];
}
//# sourceMappingURL=styleFusion.d.ts.map