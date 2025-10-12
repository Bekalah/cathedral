export declare const archetypes: {
    creator: {
        colorWavelength: number;
        soundFrequency: number;
        harmonics: number[];
        element: string;
    };
    transformer: {
        colorWavelength: number;
        soundFrequency: number;
        harmonics: number[];
        element: string;
    };
    preserver: {
        colorWavelength: number;
        soundFrequency: number;
        harmonics: number[];
        element: string;
    };
};
export declare function archetypeInterference(arch1: {
    soundFrequency: number;
}, arch2: {
    soundFrequency: number;
}, time: number): {
    constructive: number;
    destructive: number;
    beat: number;
};
//# sourceMappingURL=archetypes.d.ts.map