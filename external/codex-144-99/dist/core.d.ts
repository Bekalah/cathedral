export type SpiralConfig = {
    seed?: string;
    depth?: number;
    ratio?: number;
};
export declare class SpiralEngine {
    config: SpiralConfig;
    constructor(cfg?: SpiralConfig);
    describe(): string;
    generateNode(index?: number): {
        id: string;
        archetype: string;
        position: {
            x: number;
            y: number;
            z: number;
        };
        connections: number[];
    };
    private calculateConnections;
    private fibonacci;
}
//# sourceMappingURL=core.d.ts.map