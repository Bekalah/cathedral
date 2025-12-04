/**
 * facultyArtGenerator
 *
 * @package @cathedral/art-generation-node
 */
/**
 * Faculty Art Generator for Cathedral
 * Generates museum-quality character art for the 22 faculty members
 * Uses Azure AI Foundry with Rebecca's authentic research data
 */
import { AzureAIConfig } from './azureAIFoundry';
export interface FacultyArtGenerationRequest {
    facultyMember: string;
    style?: string;
    quality?: 'standard' | 'hd';
    includeResearchContext?: boolean;
    customPrompt?: string;
}
export interface FacultyArtResult {
    facultyName: string;
    artUrl: string;
    generationMetadata: {
        style: string;
        quality: string;
        influences: string[];
        arcanaCard: string;
        codexNode: number;
        timestamp: string;
    };
}
export declare class FacultyArtGenerator {
    private aiFoundry;
    private config;
    constructor(config: AzureAIConfig);
    /**
     * Generate art for a specific faculty member
     */
    generateFacultyArt(request: FacultyArtGenerationRequest): Promise<FacultyArtResult>;
    /**
     * Generate art for all 22 faculty members
     */
    generateAllFacultyArt(options?: {
        style?: string;
        quality?: 'standard' | 'hd';
        includeResearchContext?: boolean;
        batchSize?: number;
    }): Promise<FacultyArtResult[]>;
    /**
     * Generate art gallery for all faculty with metadata
     */
    generateFacultyGallery(): Promise<{
        gallery: FacultyArtResult[];
        metadata: {
            totalFaculty: number;
            successfulGenerations: number;
            failedGenerations: number;
            generationTimestamp: string;
            researchIntegration: boolean;
        };
    }>;
    private getFacultyMember;
    private getAllFacultyMembers;
    private buildInfluencesList;
    private getOptimalStyle;
    private getCodexNodeForFaculty;
    private buildFacultyPrompt;
    /**
     * Get faculty art generation statistics
     */
    getFacultyStats(): {
        totalFaculty: number;
        availableStyles: string[];
        supportedElements: string[];
        researchIntegration: boolean;
    };
}
export default FacultyArtGenerator;
//# sourceMappingURL=facultyArtGenerator.d.ts.map