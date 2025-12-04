/**
 * Consciousness Types - 22-Level Evolution System
 *
 * Defines the consciousness progression levels and fusion patterns
 * based on the 22 Major Arcana integration
 */
export interface ConsciousnessLevel {
    id: number;
    name: string;
    majorArcana: string;
    rebeccaProfile: string;
    frequency: number;
    colorPalette: string[];
    fractalSignature: string;
    healingBenefits: string[];
    progressionRequirements: string[];
    traumaSafeLevel: number;
}
export interface ConsciousnessFusion {
    level1: number;
    level2: number;
    result: number;
    harmonicResonance: number;
    karmicInteraction: string;
    healingPotential: number;
    aftercare: {
        focus: string;
        techniques: string[];
        gentleProgression: boolean;
    };
}
export interface SacredGeometry {
    goldenRatio: number;
    fibonacci: number[];
    platonicSolids: {
        tetrahedron: number;
        cube: number;
        octahedron: number;
        dodecahedron: number;
        icosahedron: number;
    };
    merkabaVertices: {
        upper: [number, number, number][];
        lower: [number, number, number][];
        connection: [number, number, number][];
    };
    flowerOfLife: {
        circles: number;
        intersections: number;
        totalArea: number;
    };
}
export interface TraumaSafeConfig {
    level: number;
    escExitAvailable: boolean;
    motionControl: boolean;
    screenReaderSupport: boolean;
    processingTimeAllowance: number;
    gentleDefaults: boolean;
    neurodivergentFriendly: boolean;
}
export interface ConsciousnessState {
    currentLevel: number;
    activeFusions: ConsciousnessFusion[];
    sacredGeometryActive: SacredGeometry;
    traumaConfig: TraumaSafeConfig;
    lastUpdate: Date;
    sessionDuration: number;
}
//# sourceMappingURL=consciousness.d.ts.map