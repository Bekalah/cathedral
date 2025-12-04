/**
 * SacredMaterials
 *
 * @package @cathedral/src
 */
/**
 * Sacred Materials Library
 * Traditional artistic materials and techniques for sacred art creation
 * Inspired by Ernst Fuchs, medieval grimoires, and visionary artists
 */
export interface SacredMaterial {
    id: string;
    name: string;
    type: 'pigment' | 'binder' | 'substrate' | 'metal' | 'tool' | 'technique';
    category: 'traditional' | 'alchemical' | 'visionary' | 'contemporary';
    era: 'ancient' | 'medieval' | 'renaissance' | 'modern' | 'contemporary';
    properties: MaterialProperties;
    correspondences: SacredCorrespondences;
    usage: MaterialUsage;
    history: HistoricalContext;
    applications: ModernApplications;
}
export interface MaterialProperties {
    color?: string;
    transparency: number;
    luminosity: number;
    durability: number;
    flexibility: number;
    toxicity: 'none' | 'low' | 'medium' | 'high';
    stability: number;
    reactivity: number;
    refractiveIndex: number;
    iridescence: number;
    fluorescence: number;
}
export interface SacredCorrespondences {
    element: string;
    planet: string;
    zodiac: string;
    chakra: string;
    solfeggio: number;
    deity: string;
    archangel: string;
    demon: string;
    alchemicalStage: string;
    tarotCard: string;
}
export interface MaterialUsage {
    traditionalTechniques: string[];
    sacredApplications: string[];
    ritualUses: string[];
    preparationMethods: string[];
    combinationMaterials: string[];
    safetyConsiderations: string[];
}
export interface HistoricalContext {
    origin: string;
    era: string;
    culturalContext: string;
    famousPractitioners: string[];
    historicalSignificance: string;
    evolution: string;
}
export interface ModernApplications {
    contemporaryUses: string[];
    sacredTechnologyIntegration: string[];
    artisticInnovations: string[];
    therapeuticApplications: string[];
    educationalValue: string[];
}
export declare class SacredMaterialsLibrary {
    private materials;
    constructor();
    private initializeMaterials;
    private addErnstFuchsMaterials;
    private addMedievalMaterials;
    private addAlchemicalMaterials;
    private addContemporaryMaterials;
    /**
     * Get material by ID
     */
    getMaterial(id: string): SacredMaterial | undefined;
    /**
     * Get all materials
     */
    getAllMaterials(): SacredMaterial[];
    /**
     * Get materials by category
     */
    getMaterialsByCategory(category: string): SacredMaterial[];
    /**
     * Get materials by type
     */
    getMaterialsByType(type: string): SacredMaterial[];
    /**
     * Get materials by element
     */
    getMaterialsByElement(element: string): SacredMaterial[];
    /**
     * Get materials by alchemical stage
     */
    getMaterialsByAlchemicalStage(stage: string): SacredMaterial[];
    /**
     * Search materials
     */
    searchMaterials(query: string): SacredMaterial[];
    /**
     * Get material recommendations for technique
     */
    getRecommendationsForTechnique(technique: string): SacredMaterial[];
    /**
     * Get material combinations
     */
    getMaterialCombinations(materialId: string): string[];
    /**
     * Generate material usage guide
     */
    generateUsageGuide(materialId: string): string;
}
