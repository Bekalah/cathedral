"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAIFoundry = void 0;
class AzureAIFoundry {
    constructor(config) {
        this.config = null;
        // console.warn('⚠️ Azure AI Foundry is disabled. This system is free and does not use paid AI services.');
        // console.warn('   Use algorithmic systems instead: Codex 144:99, sacred geometry, pattern generation.');
        this.config = null; // Never initialize
    }
    /**
     * All methods return null/empty to prevent accidental usage
     */
    async generateArt(request) {
        // console.warn('Azure AI art generation is disabled. Use local algorithmic art generation instead.');
        return '';
    }
    async analyzeResearch(request) {
        // console.warn('Azure AI research analysis is disabled. Use Codex 144:99 algorithmic analysis instead.');
        return '';
    }
    async analyzeFusionKink(arcanaCard, codexNode) {
        // console.warn('Azure AI fusion kink analysis is disabled. Use local algorithmic fusion calculations instead.');
        return {
            arcanaResonance: 0,
            codexAlignment: 0,
            alchemicalCompatibility: 0,
            mysticalInsights: [],
            practicalApplications: []
        };
    }
    async generateFacultyArt(facultyMember) {
        // console.warn('Azure AI faculty art generation is disabled. Use local algorithmic art generation instead.');
        return '';
    }
    async healthCheck() {
        // console.warn('Azure AI health check disabled. System uses free algorithmic approaches.');
        return false;
    }
}
exports.AzureAIFoundry = AzureAIFoundry;
exports.default = AzureAIFoundry;
//# sourceMappingURL=azureAIFoundry.js.map