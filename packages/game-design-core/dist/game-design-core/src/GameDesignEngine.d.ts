/**
 * Game Design Engine - Interactive Experiences & RPG Mechanics
 *
 * Creates game design frameworks from Codex144 nodes
 * Integrates RPG elements, interactive mechanics, and consciousness-based gameplay
 *
 * @license CC0-1.0 - Public Domain
 */
export interface GameNode {
    nodeIndex: number;
    gameMechanics: GameMechanic[];
    rpgElements: RPGElement[];
    interactionType: InteractionType;
    playStyle: PlayStyle;
    challengeLevel: number;
    rewardStructure: RewardStructure;
    consciousnessLevel: number;
    sacredRatio: number;
}
export interface GameMechanic {
    name: string;
    type: 'exploration' | 'combat' | 'puzzle' | 'social' | 'creative' | 'narrative';
    complexity: number;
    sacredGeometry: boolean;
    traumaAware: boolean;
}
export interface RPGElement {
    name: string;
    type: 'character' | 'quest' | 'item' | 'location' | 'ability' | 'story';
    consciousnessLevel: number;
    sacredRatio: number;
}
export type InteractionType = 'immersive-3d' | 'point-click' | 'text-based' | 'gesture' | 'voice' | 'multi-modal';
export type PlayStyle = 'open-world' | 'linear' | 'sandbox' | 'narrative-driven' | 'exploration-focused' | 'creative';
export interface RewardStructure {
    type: 'intrinsic' | 'extrinsic' | 'flow-state' | 'consciousness-evolution';
    rewards: string[];
    traumaAware: boolean;
}
export interface GameDesign {
    nodes: GameNode[];
    world: GameWorld;
    narrative: NarrativeStructure;
    sacredGeometry: {
        ratio: number;
        goldenRatio: number;
        fibonacci: number;
    };
}
export interface GameWorld {
    type: 'open-world' | 'procedural' | 'hand-crafted' | 'hybrid';
    size: number;
    consciousnessMapping: boolean;
    sacredGeometry: boolean;
}
export interface NarrativeStructure {
    type: 'non-linear' | 'branching' | 'emergent' | 'procedural';
    consciousnessBased: boolean;
    traumaAware: boolean;
    sacredGeometry: boolean;
}
/**
 * Game Design Engine
 */
export declare class GameDesignEngine {
    private readonly GOLDEN_RATIO;
    private readonly RATIO_144_99;
    private readonly FIBONACCI;
    constructor();
    /**
     * Create game node from Codex144 node
     */
    createGameNode(nodeIndex: number): GameNode;
    /**
     * Generate game mechanics
     */
    private generateGameMechanics;
    /**
     * Generate RPG elements
     */
    private generateRPGElements;
    /**
     * Determine interaction type
     */
    private determineInteractionType;
    /**
     * Determine play style
     */
    private determinePlayStyle;
    /**
     * Calculate challenge level
     */
    private calculateChallengeLevel;
    /**
     * Create reward structure
     */
    private createRewardStructure;
    /**
     * Calculate sacred ratio
     */
    private calculateSacredRatio;
    /**
     * Create game design from multiple nodes
     */
    createGameDesign(nodeIndices: number[], worldType?: GameWorld['type']): GameDesign;
    /**
     * Get all game nodes for a range
     */
    getGameNodes(startIndex?: number, endIndex?: number): GameNode[];
}
//# sourceMappingURL=GameDesignEngine.d.ts.map