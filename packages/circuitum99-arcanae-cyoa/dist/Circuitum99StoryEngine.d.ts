/**
 * Circuitum99: Alpha et Omega Story Engine
 * Interactive storytelling system connecting all Arcanae in massive narrative experience
 * For real visionary work across all creative fields
 */
import { CYOAStory, TheatreExperience, DesignMode, StoryAnalytics } from './types.js';
export declare class Circuitum99StoryEngine {
    private engine;
    private sacredSystems;
    constructor();
    private initializeEngine;
    private loadArcanaeStories;
    private loadCodexStories;
    private createArcanaStory;
    private createCodexStory;
    private getArcanaName;
    private getCodexNodeName;
    private getMirroredCodexNodes;
    private getMirroredArcanae;
    private getArcanaNumber;
    private createArcanaPathways;
    private createCodexPathways;
    private createInitialState;
    private createDefaultSettings;
    private initializeParticipants;
    private createArcanaParticipant;
    private setupGlobalState;
    /**
     * Start a new story
     */
    startStory(storyId: string, participantId: string): CYOAStory | null;
    /**
     * Make a choice in a story
     */
    makeChoice(storyId: string, choiceId: string): boolean;
    private checkRequirements;
    private applyConsequences;
    /**
     * Get random story
     */
    getRandomStory(): CYOAStory | null;
    /**
     * Get story by Arcana
     */
    getStoryByArcana(arcanaId: string): CYOAStory | null;
    /**
     * Get story by Codex node
     */
    getStoryByCodexNode(nodeId: number): CYOAStory | null;
    /**
     * Create fusion story between multiple Arcanae
     */
    createFusionStory(arcanaeIds: string[]): CYOAStory | null;
    private createFusionPathways;
    /**
     * Get story analytics
     */
    getAnalytics(): StoryAnalytics;
    /**
     * Generate comprehensive story report
     */
    generateReport(): string;
    private hasCodexIntegration;
    private hasArcanaeIntegration;
    private hasFusionIntegration;
    private getStoryList;
    /**
     * Create theatre experience
     */
    createTheatreExperience(storyIds: string[], experienceType: string): TheatreExperience;
    /**
     * Create design mode for story
     */
    createDesignMode(storyId: string): DesignMode;
    private createDesignTools;
    private createDesignElements;
}
