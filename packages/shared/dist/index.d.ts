/**
 * Cathedral Shared Utilities
 * Core system utilities for the Magnum Opus
 */
export interface CathedralConfig {
    version: string;
    codex_144_99: {
        manifestation_nodes: number;
        dissolution_gates: number;
        ratio: number;
    };
    data_sources: {
        complete_arcana_profiles: string;
        codex_144_expanded: string;
        trinity_architecture: string;
    };
}
export declare const CATHEDRAL_CONFIG: CathedralConfig;
export declare class DataLoader {
    loadData<T>(path: string): Promise<T>;
}
export declare const dataLoader: DataLoader;
export declare const SACRED_MATH: {
    golden_ratio: number;
    fibonacci: (n: number) => number;
    ratio_144_99: number;
};
