/**
 * @license CC0-1.0 - Public Domain
 */
export interface FusionHelpers {
    listFusionSets: () => Array<{
        id: string;
        name: string;
    }>;
    computeFusionResonance: (id: string) => any;
}
export declare function mapFusionToPatchModifiers(fusionId: string, helpers: FusionHelpers): {
    suggestedLfoRate: number;
    suggestedReverbMix: number;
    colorField: any;
    patchCandidates: string[];
};
//# sourceMappingURL=integration.d.ts.map