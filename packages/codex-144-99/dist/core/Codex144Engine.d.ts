/**
 * Codex 144:99 - Real Working System Engine
 *
 * Complete consciousness evolution platform that integrates with:
 * - Godot games and design tools
 * - Sound synthesizers and audio systems
 * - Fractal engines and visual generation
 * - Living Canon Engine with historical creators
 * - Real-time creative applications
 *
 * @author Rebecca Respawn (International Reiki Master)
 * @version 1.0.0
 * @license CC0 - Your Original Work
 */
export interface CodexNode {
    id: number;
    name: string;
    element: string;
    planet: string;
    zodiac: string;
    chakra: string;
    solfeggio: number;
    color: string;
    geometry: string;
    frequency: number;
    creativity: {
        design: string[];
        sound: string[];
        game: string[];
        fractal: string[];
    };
    consciousness: {
        level: number;
        transformation: string;
        integration: string;
    };
    integration: {
        godot: string;
        web: string;
        audio: string;
        visual: string;
    };
}
export interface ConsciousnessFusion {
    id: string;
    nodes: number[];
    result: CodexNode;
    harmonics: {
        primary: number[];
        secondary: number[];
        resonance: number;
    };
    creative: {
        synthesis: string[];
        applications: string[];
        output: string;
    };
    game: {
        mechanics: string[];
        abilities: string[];
        progression: string;
    };
}
export declare class Codex144Engine {
    private nodes;
    private fusions;
    private activeConnections;
    constructor();
    /**
     * Initialize all 144:99 consciousness nodes
     */
    private initializeCodexNodes;
    /**
     * Add additional nodes for complete 144:99 system
     */
    private addAdditionalNodes;
    /**
     * Initialize consciousness fusion combinations
     */
    private initializeFusions;
    /**
     * Setup integrations with external systems
     */
    private setupIntegrations;
    /**
     * Public API Methods for External Systems
     */
    /**
     * Get all available Codex nodes
     */
    getNodes(): CodexNode[];
    /**
     * Get specific Codex node by ID
     */
    getNode(nodeId: number): CodexNode | null;
    /**
     * Process consciousness fusion and return creative output
     */
    processFusion(fusionId: string): ConsciousnessFusion | null;
    /**
     * Create custom fusion between specific nodes
     */
    createCustomFusion(nodeIds: number[]): ConsciousnessFusion;
    /**
     * Godot Integration Methods
     */
    spawnNodeInGodot(nodeId: number): CodexNode | null;
    getCreativeState(): any;
    /**
     * Audio Integration Methods
     */
    playNodeFrequency(nodeId: number): any;
    processAudioFusion(fusionId: string): any;
    /**
     * Fractal Engine Integration
     */
    generateFractal(nodeId: number): any;
    processFractalFusion(fusionId: string): any;
    /**
     * Process fusion request for web interface
     */
    processFusionRequest(nodeIds: number[]): ConsciousnessFusion;
    /**
     * Web Interface Methods
     */
    getCreativityOutput(): any;
    /**
     * Helper Methods
     */
    private calculateConsciousnessLevel;
    private frequencyToNote;
    private getHarmonicSeries;
    private getCreativeGeometry;
}
export declare const codex144Engine: Codex144Engine;
declare global {
    interface Window {
        codex144Engine: Codex144Engine;
    }
}
export default codex144Engine;
//# sourceMappingURL=Codex144Engine.d.ts.map