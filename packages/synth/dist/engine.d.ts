import { PatchDefinition, ChainGraphNode, RenderRequest } from './types';
export declare class SynthEngine {
    private patches;
    constructor(seedPatches?: PatchDefinition[]);
    listPatches(): {
        id: string;
        name: string;
    }[];
    getPatch(id: string): PatchDefinition | null;
    planGraph(patchId: string): ChainGraphNode[] | null;
    render(req: RenderRequest): {
        readonly ok: false;
        readonly error: "PATCH_NOT_FOUND";
        patchId?: undefined;
        nodes?: undefined;
        duration?: undefined;
        estimatedVoices?: undefined;
        note?: undefined;
    } | {
        ok: true;
        patchId: string;
        nodes: number;
        duration: number;
        estimatedVoices: number;
        note: string;
        readonly error?: undefined;
    };
}
//# sourceMappingURL=engine.d.ts.map