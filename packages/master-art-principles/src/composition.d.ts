/**
 * composition
 *
 * @package @cathedral/master-art-principles
 */
/**
 * Master Art Composition Rules
 *
 * Classical composition principles for beautiful layouts
 */
export interface Composition {
    primary: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    secondary: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    focalPoint: {
        x: number;
        y: number;
    };
}
/**
 * Golden Ratio Composition
 *
 * Divides space using golden ratio for natural beauty
 */
export declare function goldenComposition(width: number, height: number, direction?: 'horizontal' | 'vertical'): Composition;
/**
 * Rule of Thirds Composition
 *
 * Classic photography/painting composition
 */
export declare function ruleOfThirds(width: number, height: number): {
    grid: {
        x: number;
        y: number;
        width: number;
        height: number;
    }[];
    focalPoints: {
        x: number;
        y: number;
    }[];
};
/**
 * Center Composition
 *
 * Symmetrical, balanced composition
 */
export declare function centerComposition(width: number, height: number, elementSize: number): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * Dynamic Symmetry
 *
 * Root rectangle composition (√2, √3, √5)
 */
export declare function dynamicSymmetry(width: number, height: number, root?: 2 | 3 | 5): Composition;
//# sourceMappingURL=composition.d.ts.map