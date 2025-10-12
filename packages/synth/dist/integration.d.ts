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
} | null;
//# sourceMappingURL=integration.d.ts.map