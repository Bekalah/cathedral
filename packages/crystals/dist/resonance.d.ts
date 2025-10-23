import { ResonanceComputationResult } from './types';
export declare function computeFusionResonance(fusionId: string): Promise<ResonanceComputationResult | null>;
export declare function listCrystalIds(): string[];
export declare function listFusionSets(): {
    id: string;
    name: string;
}[];
//# sourceMappingURL=resonance.d.ts.map