/**
 * sacred-math
 *
 * @package @cathedral/master-art-principles
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate sacred mathematics
 *
 * Creative use: Art apps, design apps, math apps, visual apps
 */
/**
 * Sacred Mathematics Constants
 *
 * Master art rules based on real mathematical beauty
 */
export declare const SACRED_MATH: {
    readonly PHI: number;
    readonly PHI_INVERSE: number;
    readonly PHI_SQUARED: number;
    readonly CATHEDRAL_RATIO: number;
    readonly CATHEDRAL_INVERSE: number;
    readonly SQRT_2: number;
    readonly SQRT_2_INVERSE: number;
    readonly SQRT_3: number;
    readonly SQRT_5: number;
    readonly PI: number;
    readonly TAU: number;
    readonly FIBONACCI: readonly [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
    readonly GOLDEN_ANGLE: 137.508;
    readonly PROPORTIONS: {
        readonly THIRD: number;
        readonly TWO_THIRDS: number;
        readonly GOLDEN_SECTION: number;
        readonly ROOT_2: number;
        readonly ROOT_3: number;
        readonly ROOT_5: number;
    };
};
/**
 * Calculate golden ratio proportion
 */
export declare function goldenRatio(value: number, useLarger?: boolean): number;
/**
 * Calculate golden rectangle dimensions
 */
export declare function goldenRectangle(width: number): {
    width: number;
    height: number;
};
/**
 * Calculate fibonacci-based sizing
 */
export declare function fibonacciSize(index: number): number;
/**
 * Apply golden ratio to layout
 */
export declare function applyGoldenLayout(containerSize: number, direction?: 'horizontal' | 'vertical'): {
    primary: number;
    secondary: number;
};
/**
 * Calculate spiral point using golden angle
 */
export declare function goldenSpiralPoint(angle: number, radius: number, center?: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
/**
 * Calculate 144:99 ratio proportion
 */
export declare function cathedralRatio(value: number, use144?: boolean): number;
//# sourceMappingURL=sacred-math.d.ts.map