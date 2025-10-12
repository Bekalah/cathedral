// ColorScience: wavelength to RGB, tetrachromat, harmonic colors
export class ColorScience {
    wavelengthToRGB(wavelength) {
        let R = 0, G = 0, B = 0;
        if (wavelength >= 380 && wavelength < 440) {
            R = -(wavelength - 440) / (440 - 380);
            G = 0.0;
            B = 1.0;
        }
        else if (wavelength >= 440 && wavelength < 490) {
            R = 0.0;
            G = (wavelength - 440) / (490 - 440);
            B = 1.0;
        }
        else if (wavelength >= 490 && wavelength < 510) {
            R = 0.0;
            G = 1.0;
            B = -(wavelength - 510) / (510 - 490);
        }
        // ...continue for full spectrum
        const gamma = 0.80;
        R = Math.pow(R, gamma);
        G = Math.pow(G, gamma);
        B = Math.pow(B, gamma);
        return { r: R * 255, g: G * 255, b: B * 255 };
    }
    expandToTetrachromat(rgb) {
        const uv = (rgb.b * 0.5 + rgb.r * 0.3) * 0.8;
        return { ...rgb, uv };
    }
    harmonicColors(baseWavelength) {
        return {
            fundamental: baseWavelength,
            octave: baseWavelength * 2,
            fifth: baseWavelength * 1.5,
            fourth: baseWavelength * 1.333,
            majorThird: baseWavelength * 1.25
        };
    }
}
//# sourceMappingURL=colorScience.js.map