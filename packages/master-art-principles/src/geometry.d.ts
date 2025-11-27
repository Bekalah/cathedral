/**
 * geometry
 *
 * @package @cathedral/master-art-principles
 * @license CC0-1.0 - Public Domain
 *
 * Enhanced with sophisticated improvements - Cycle Active
 * Perfect quality with ornate sacred geometry
 *
 * Creative use: Art apps, design apps, geometry apps, visual apps
 */
/**
 * Sacred Geometry Patterns
 *
 * Master art geometry based on real sacred patterns
 */
export interface GeometryPoint {
    x: number;
    y: number;
    z?: number;
}
/**
 * Generate Vesica Piscis (two overlapping circles)
 */
export declare function generateVesicaPiscis(radius: number, center?: GeometryPoint): {
    circle1: GeometryPoint[];
    circle2: GeometryPoint[];
    intersection: GeometryPoint[];
};
/**
 * Generate Pentagram (5-pointed star)
 */
export declare function generatePentagram(radius: number, center?: GeometryPoint): GeometryPoint[];
/**
 * Generate Octagon (8-sided polygon)
 */
export declare function generateOctagon(radius: number, center?: GeometryPoint): GeometryPoint[];
/**
 * Generate Fibonacci Spiral
 */
export declare function generateFibonacciSpiral(turns?: number, scale?: number, center?: GeometryPoint): GeometryPoint[];
/**
 * Generate Flower of Life pattern
 */
export declare function generateFlowerOfLife(rings?: number, radius?: number, center?: GeometryPoint): GeometryPoint[][];
/**
 * Generate Metatron's Cube
 */
export declare function generateMetatronsCube(size: number, center?: GeometryPoint): {
    circles: GeometryPoint[][];
    lines: {
        start: GeometryPoint;
        end: GeometryPoint;
    }[];
};
//# sourceMappingURL=geometry.d.ts.map