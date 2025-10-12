export declare class ColorScience {
    wavelengthToRGB(wavelength: number): {
        r: number;
        g: number;
        b: number;
    };
    expandToTetrachromat(rgb: {
        r: number;
        g: number;
        b: number;
    }): {
        uv: number;
        r: number;
        g: number;
        b: number;
    };
    harmonicColors(baseWavelength: number): {
        fundamental: number;
        octave: number;
        fifth: number;
        fourth: number;
        majorThird: number;
    };
}
//# sourceMappingURL=colorScience.d.ts.map