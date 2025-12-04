/**
 * Beautiful Details System
 *
 * Created from doubt: "The design needs more beautiful details that people love"
 * Improvement: Create a system for adding beautiful, meaningful details everywhere
 *
 * This is how visionary art is created - every detail matters.
 *
 * @package @cathedral/cathedral-design-library
 */
export interface BeautifulDetail {
    id: string;
    type: 'micro-interaction' | 'typography' | 'spacing' | 'color' | 'animation' | 'pattern';
    description: string;
    implementation: string;
    beauty: string;
    wisdom: string;
}
export declare const BEAUTIFUL_DETAILS: BeautifulDetail[];
/**
 * Beautiful Details System
 *
 * Applies beautiful, meaningful details throughout the design
 */
export declare class BeautifulDetailsSystem {
    /**
     * Get details by type
     */
    getDetailsByType(type: BeautifulDetail['type']): BeautifulDetail[];
    /**
     * Apply beautiful spacing
     */
    getSpacing(level: number): string;
    /**
     * Get typography scale
     */
    getTypographyScale(level: number): string;
    /**
     * Get alchemical color
     */
    getAlchemicalColor(element: string, planet?: string): string;
    /**
     * Generate breathing animation CSS
     */
    getBreathingAnimation(): string;
    /**
     * Apply beautiful detail
     */
    applyDetail(element: HTMLElement, detail: BeautifulDetail): void;
}
export declare const beautifulDetailsSystem: BeautifulDetailsSystem;
export default beautifulDetailsSystem;
