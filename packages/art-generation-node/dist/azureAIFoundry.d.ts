/**
 * azureAIFoundry
 *
 * @package @cathedral/art-generation-node
 */
/**
 * Azure AI Foundry Service - DISABLED
 *
 * This file has been disabled to ensure the system remains free.
 * All AI functionality has been removed to prevent paid API usage.
 *
 * The Cathedral system uses pure algorithmic approaches instead:
 * - Codex 144:99 (pure algorithmic, no AI)
 * - Sacred geometry generation (mathematical)
 * - Pattern generation (algorithmic)
 * - Art synthesis (local processing)
 */
export interface AzureAIConfig {
    openAIEndpoint: string;
    openAIKey: string;
    openAIDeployment: string;
    computerVisionEndpoint: string;
    computerVisionKey: string;
}
export interface ArtGenerationRequest {
    prompt: string;
    style: string;
    influences: string[];
    arcanaCard?: string;
    codexNode?: number;
    dimensions?: {
        width: number;
        height: number;
    };
    quality?: 'standard' | 'hd';
}
export interface ResearchAnalysisRequest {
    researchData: any;
    analysisType: 'literary' | 'artistic' | 'scientific' | 'mystical' | 'technological';
    depth: 'summary' | 'detailed' | 'comprehensive';
}
export interface FusionKinkAnalysis {
    arcanaResonance: number;
    codexAlignment: number;
    alchemicalCompatibility: number;
    mysticalInsights: string[];
    practicalApplications: string[];
}
export declare class AzureAIFoundry {
    private config;
    constructor(config?: AzureAIConfig);
    /**
     * All methods return null/empty to prevent accidental usage
     */
    generateArt(request: ArtGenerationRequest): Promise<string>;
    analyzeResearch(request: ResearchAnalysisRequest): Promise<string>;
    analyzeFusionKink(arcanaCard: string, codexNode: number): Promise<FusionKinkAnalysis>;
    generateFacultyArt(facultyMember: any): Promise<string>;
    healthCheck(): Promise<boolean>;
}
export default AzureAIFoundry;
//# sourceMappingURL=azureAIFoundry.d.ts.map