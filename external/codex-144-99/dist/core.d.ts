export type SpiralConfig = {
    seed?: string;
    depth?: number;
};
export declare class SpiralEngine {
    config: SpiralConfig;
    constructor(cfg?: SpiralConfig);
    describe(): string;
    generateNode(index?: number): {
        id: string;
        archetype: string;
    };
}
//# sourceMappingURL=core.d.ts.map