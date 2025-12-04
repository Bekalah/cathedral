/**
 * index
 *
 * @package @cathedral/config
 */
/**
 * @cathedral/config
 * Shared configuration constants for Cathedral monorepo
 */
export declare const CATHEDRAL_CONFIG: {
    readonly codex: {
        readonly nodeCount: 144;
        readonly ratio: "144:99";
        readonly categories: 8;
    };
    readonly arcana: {
        readonly majorCount: 22;
        readonly aspectCount: 3;
    };
    readonly build: {
        readonly nodeEnv: string;
        readonly target: "esnext";
        readonly minify: true;
    };
    readonly azure: {
        readonly endpoint: string;
        readonly apiKey: string;
    };
};
export declare const SACRED_GEOMETRY_PATTERNS: readonly ["flower-of-life", "metatrons-cube", "vesica-piscis", "golden-spiral", "seed-of-life", "tree-of-life"];
export declare const ARCANA_ELEMENTS: {
    readonly fire: readonly [1, 8, 13, 19];
    readonly water: readonly [2, 7, 12, 18];
    readonly air: readonly [0, 6, 15, 20];
    readonly earth: readonly [3, 4, 5, 21];
    readonly spirit: readonly [9, 10, 11, 14, 16, 17];
};
export type SacredPattern = (typeof SACRED_GEOMETRY_PATTERNS)[number];
//# sourceMappingURL=index.d.ts.map