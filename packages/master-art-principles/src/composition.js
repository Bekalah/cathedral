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
import { SACRED_MATH, applyGoldenLayout } from './sacred-math';
/**
 * Golden Ratio Composition
 *
 * Divides space using golden ratio for natural beauty
 */
export function goldenComposition(width, height, direction = 'horizontal') {
    if (direction === 'horizontal') {
        const { primary, secondary } = applyGoldenLayout(width, 'horizontal');
        return {
            primary: { x: 0, y: 0, width: primary, height },
            secondary: { x: primary, y: 0, width: secondary, height },
            focalPoint: { x: primary * 0.618, y: height * 0.618 },
        };
    }
    else {
        const { primary, secondary } = applyGoldenLayout(height, 'vertical');
        return {
            primary: { x: 0, y: 0, width, height: primary },
            secondary: { x: 0, y: primary, width, height: secondary },
            focalPoint: { x: width * 0.618, y: primary * 0.618 },
        };
    }
}
/**
 * Rule of Thirds Composition
 *
 * Classic photography/painting composition
 */
export function ruleOfThirds(width, height) {
    const thirdW = width / 3;
    const thirdH = height / 3;
    const grid = [
        { x: 0, y: 0, width: thirdW, height: thirdH },
        { x: thirdW, y: 0, width: thirdW, height: thirdH },
        { x: thirdW * 2, y: 0, width: thirdW, height: thirdH },
        { x: 0, y: thirdH, width: thirdW, height: thirdH },
        { x: thirdW, y: thirdH, width: thirdW, height: thirdH },
        { x: thirdW * 2, y: thirdH, width: thirdW, height: thirdH },
        { x: 0, y: thirdH * 2, width: thirdW, height: thirdH },
        { x: thirdW, y: thirdH * 2, width: thirdW, height: thirdH },
        { x: thirdW * 2, y: thirdH * 2, width: thirdW, height: thirdH },
    ];
    // Focal points at intersections
    const focalPoints = [
        { x: thirdW, y: thirdH },
        { x: thirdW * 2, y: thirdH },
        { x: thirdW, y: thirdH * 2 },
        { x: thirdW * 2, y: thirdH * 2 },
    ];
    return { grid, focalPoints };
}
/**
 * Center Composition
 *
 * Symmetrical, balanced composition
 */
export function centerComposition(width, height, elementSize) {
    return {
        x: (width - elementSize) / 2,
        y: (height - elementSize) / 2,
        width: elementSize,
        height: elementSize,
    };
}
/**
 * Dynamic Symmetry
 *
 * Root rectangle composition (√2, √3, √5)
 */
export function dynamicSymmetry(width, height, root = 2) {
    const ratio = root === 2 ? SACRED_MATH.SQRT_2 : root === 3 ? SACRED_MATH.SQRT_3 : SACRED_MATH.SQRT_5;
    const adjustedHeight = width / ratio;
    return {
        primary: { x: 0, y: 0, width, height: adjustedHeight },
        secondary: { x: 0, y: adjustedHeight, width, height: height - adjustedHeight },
        focalPoint: { x: width * 0.618, y: adjustedHeight * 0.618 },
    };
}
//# sourceMappingURL=composition.js.map