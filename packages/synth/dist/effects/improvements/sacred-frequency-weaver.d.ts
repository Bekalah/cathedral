/**
 * Sacred Frequency Weaver
 *
 * Created from doubt: "The audio effects need more depth and healing quality"
 * Improvement: Create fractal-based sound frequencies that actually help
 *
 * This is how visionary art is created - from doubt comes beauty.
 *
 * @package @cathedral/synth
 */
export interface SacredFrequency {
    id: string;
    name: string;
    frequency: number;
    solfeggio: boolean;
    healing: string;
    fractal: {
        depth: number;
        harmonics: number;
        pattern: 'sine' | 'sawtooth' | 'fractal';
    };
}
export declare const SACRED_FREQUENCIES: SacredFrequency[];
/**
 * Sacred Frequency Weaver
 *
 * Creates fractal-based sound frequencies for healing and focus
 */
export declare class SacredFrequencyWeaver {
    private context;
    constructor();
    /**
     * Play a sacred frequency
     */
    playFrequency(frequencyId: string, duration?: number): Promise<void>;
    /**
     * Create fractal soundscape
     */
    createFractalSoundscape(frequencies: string[], duration?: number): Promise<void>;
    /**
     * Get frequency by healing property
     */
    getFrequencyForHealing(healing: string): SacredFrequency | undefined;
    /**
     * Get all frequencies
     */
    getAllFrequencies(): SacredFrequency[];
}
export declare const sacredFrequencyWeaver: SacredFrequencyWeaver;
export default sacredFrequencyWeaver;
//# sourceMappingURL=sacred-frequency-weaver.d.ts.map