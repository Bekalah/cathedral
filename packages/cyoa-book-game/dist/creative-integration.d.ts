/**
 * Creative Engine Integration for CYOA Book Game
 * Adds harmonic generation capabilities to the interactive story system
 */
interface CodexNode {
    id: number;
    name: string;
    element: string;
    solfeggio: number;
    color: string;
    geometry: string;
    narrative?: any;
    architecture?: any;
}
interface HarmonicAnalysis {
    relationship: string;
    consonanceScore: number;
    elementalBalance: any;
    freqRatios: any[];
    overallHarmony: string;
}
interface CreativeEngine {
    combineNodes(nodeIds: number[]): any;
    getNodes(nodeIds: number[]): CodexNode[];
    getAllNodes(): CodexNode[];
    harmonic: {
        analyzeHarmony(nodes: CodexNode[]): HarmonicAnalysis;
    };
}
declare global {
    var creativeEngineInstance: CreativeEngine | null;
    var loadCodexData: () => Promise<CodexNode[]>;
    var createCreativeEngine: (nodes: CodexNode[]) => CreativeEngine;
}
export interface CreativeScene {
    id: string;
    title: string;
    description: string;
    choices: CreativeChoice[];
    nodeIds: number[];
    realObjects?: RealObject[];
    backgroundMusic?: string;
    atmosphere?: string;
}
export interface CreativeChoice {
    id: string;
    text: string;
    targetScene?: string;
    nodeIds?: number[];
    effects?: {
        wisdom?: number;
        courage?: number;
        compassion?: number;
        knowledge?: number;
        experience?: number;
    };
    requirements?: {
        minWisdom?: number;
        minCourage?: number;
        minCompassion?: number;
        minKnowledge?: number;
    };
}
export interface RealObject {
    name: string;
    description: string;
    gameConnection: string;
    realWorldLink?: string;
    imageUrl?: string;
    nodeId?: number;
}
export interface CreativeGameState {
    currentScene: string;
    visitedScenes: string[];
    playerStats: {
        wisdom: number;
        courage: number;
        compassion: number;
        knowledge: number;
        experience: number;
    };
    selectedNodes: number[];
    realObjects: RealObject[];
    creativeMode: boolean;
}
/**
 * Enhanced Game Engine with Creative Integration
 */
export declare class CreativeGameEngine {
    private creativeEngine;
    private gameState;
    private scenes;
    constructor();
    /**
     * Initialize the creative game engine
     */
    initialize(): Promise<void>;
    /**
     * Initialize scenes with creative node integration
     */
    private initializeCreativeScenes;
    /**
     * Create a scene from a single node
     */
    private createSceneFromNode;
    /**
     * Create scenes from node combinations
     */
    private createCombinationScenes;
    /**
     * Generate scene description from node properties
     */
    private generateNodeDescription;
    /**
     * Make a choice and update game state
     */
    makeChoice(choiceId: string): boolean;
    /**
     * Generate real-world objects connected to nodes
     */
    private generateRealObjects;
    /**
     * Create real-world object connection from node
     */
    private createRealObjectFromNode;
    /**
     * Get current scene with creative enhancements
     */
    getCurrentScene(): CreativeScene | null;
    /**
     * Get game state
     */
    getGameState(): CreativeGameState;
    /**
     * Toggle creative mode
     */
    toggleCreativeMode(): void;
    /**
     * Generate creative content from selected nodes
     */
    generateCreativeContent(): any;
    /**
     * Get creative suggestions for current state
     */
    getCreativeSuggestions(): string[];
}
/**
 * Integration with existing game engine
 */
export declare class GameEngineIntegration {
    private creativeEngine;
    constructor(existingGameEngine: any);
    /**
     * Enhance existing scene with creative elements
     */
    enhanceScene(scene: any, nodeIds: number[]): any;
    /**
     * Blend original and creative descriptions
     */
    private blendDescriptions;
    /**
     * Generate dynamic choices based on node combinations
     */
    generateDynamicChoices(baseChoices: any[], nodeIds: number[]): any[];
}
export {};
//# sourceMappingURL=creative-integration.d.ts.map