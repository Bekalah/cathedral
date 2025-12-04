/**
 * DesignLibrary
 *
 * @package @cathedral/cathedral-design-library
 */
/**
 * Cathedral Design Library
 * Figma-style design system integrating sacred mathematics, psychology, and ancient wisdom
 */
import { DesignComponent } from './types';
export declare class CathedralDesignLibrary {
    private library;
    private studio;
    private sacredSystems;
    constructor();
    private createCanvas;
    private createSacredGrid;
    private createTools;
    private createWorkflows;
    private initializeLibrary;
    private loadSacredComponents;
    private loadPsychologicalComponents;
    private loadPhilosophicalComponents;
    private loadAnthropologicalComponents;
    private loadScientificComponents;
    private generateSacredComponents;
    private generatePsychologicalComponents;
    private generatePhilosophicalComponents;
    private generateAnthropologicalComponents;
    private generateScientificComponents;
    private createSacredComponent;
    private createJungianComponents;
    private createIFSComponents;
    private createLevyComponents;
    private createPlatonicComponents;
    private createHermeticComponents;
    private createAlchemicalComponents;
    private createCulturalComponents;
    private createMathematicalComponents;
    private createQuantumComponents;
    private createSacredProperties;
    private createSacredStyles;
    private createSacredBehaviors;
    private createPlatonicAspects;
    private createJungianAspects;
    private createCulturalAspects;
    private createMathematicalAspects;
    private createSacredFusion;
    private createSacredEvolution;
    private generateHarmonicColors;
    private generateAccentColors;
    private generateHarmonyColors;
    private generateDissonantColors;
    private generateSacredColors;
    private getCodexNode;
    private addToCategory;
    private setupSacredGrid;
    private generateSacredPoints;
    private initializeWorkflows;
    /**
     * Get a design component by ID
     */
    getComponent(id: string): DesignComponent | undefined;
    /**
     * Get all components
     */
    getAllComponents(): DesignComponent[];
    /**
     * Get components by category
     */
    getComponentsByCategory(category: string): DesignComponent[];
    /**
     * Search components
     */
    searchComponents(query: string): DesignComponent[];
    /**
     * Create fusion between components
     */
    createComponentFusion(componentIds: string[]): DesignComponent | null;
    private fuseProperties;
    private fuseStyles;
    private fuseBehaviors;
    private fusePhilosophicalAspects;
    private fusePsychologicalAspects;
    private fuseAnthropologicalAspects;
    private fuseScientificAspects;
    private createFusionAspects;
    private createEvolutionAspects;
    /**
     * Generate comprehensive design report
     */
    generateReport(): string;
}
