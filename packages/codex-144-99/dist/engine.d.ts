import type { CodexNode, CodexLattice } from './types';
/**
 * Public Engine API
 *
 * This is the contract other packages rely on.
 * Keep these surfaces stable and additive.
 */
export declare function getCodexLattice(): CodexLattice;
export declare function getNode(id: string): CodexNode | undefined;
export declare function getAllNodes(): CodexNode[];
export declare function resolveSymbol(symbol: {
    node_id?: string;
    geometry_profile_id?: string;
    color_profile_id?: string;
    sound_profile_id?: string;
    crystal_profile_id?: string;
    archetype_profile_id?: string;
}): {
    node: CodexNode | undefined;
    geometry: any;
    color: any;
    sound: any;
    crystal: any;
    archetype: any;
};
/**
 * Neighborhood/query helpers
 */
export interface LatticeNeighborhoodOptions {
    ringRadius?: number;
}
export declare function latticeNeighborhood(centerId: string, options?: LatticeNeighborhoodOptions): CodexNode[];
/**
 * Palette helper, for UI/design tools.
 * Deterministic: uses lattice color profiles only.
 */
export declare function samplePalette(nodeId: string): string[];
/**
 * Export mappings for consumers
 */
export declare function exportForGodot(): {
    version: any;
    nodes: {
        id: number;
        kind: any;
        label: any;
        coordinates: any;
        vector_profile_ids: any;
    }[];
};
export declare function exportForSPIRIT(): {
    sound_profiles: any;
    crystal_profiles: any;
    geometry_profiles: any;
    color_profiles: any;
};
export declare function exportForCircuitum99(): {
    nodes: {
        id: number;
        label: any;
        circuitum99_ids: any;
    }[];
};
export declare function exportForLiberArcanae(): {
    nodes: {
        id: number;
        label: any;
        liber_arcanae_ids: any;
        archetype_profile_id: any;
    }[];
    archetype_profiles: any;
};
export declare function exportForCosmogenesis(): {
    version: any;
    nodes: CodexNode[];
    geometry_profiles: any;
    color_profiles: any;
    sound_profiles: any;
    crystal_profiles: any;
    archetype_profiles: any;
};
/**
 * Validation / audit
 *
 * Used to confirm that online data matches the expectations from the offline manifest.
 */
export interface CodexValidationIssue {
    level: 'error' | 'warning';
    message: string;
    context?: Record<string, unknown>;
}
export interface CodexValidationReport {
    ok: boolean;
    issues: CodexValidationIssue[];
    summary: {
        total_nodes: number;
        primary_nodes: number;
        gateway_nodes: number;
        geometry_profiles: number;
        color_profiles: number;
        sound_profiles: number;
        crystal_profiles: number;
        archetype_profiles: number;
    };
}
export declare function validateCodex(): CodexValidationReport;
/**
 * Human-readable status for dashboards / health checks.
 */
export declare function generateReport(): string;
declare const Codex144Engine: {
    getCodexLattice: typeof getCodexLattice;
    getNode: typeof getNode;
    getAllNodes: typeof getAllNodes;
    resolveSymbol: typeof resolveSymbol;
    latticeNeighborhood: typeof latticeNeighborhood;
    samplePalette: typeof samplePalette;
    exportForGodot: typeof exportForGodot;
    exportForSPIRIT: typeof exportForSPIRIT;
    exportForCircuitum99: typeof exportForCircuitum99;
    exportForLiberArcanae: typeof exportForLiberArcanae;
    exportForCosmogenesis: typeof exportForCosmogenesis;
    validateCodex: typeof validateCodex;
    generateReport: typeof generateReport;
};
export default Codex144Engine;
//# sourceMappingURL=engine.d.ts.map