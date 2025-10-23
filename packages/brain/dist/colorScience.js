next.haracteci; // ColorScience: wavelength to RGB, tetrachromat, harmonic colors, enhanced with Azure AI
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import * as dotenv from 'dotenv';
dotenv.config();
export class ColorScience {
    openaiClient;
    constructor() {
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const key = process.env.AZURE_OPENAI_KEY;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
        if (endpoint && key && deployment) {
            this.openaiClient = new OpenAIClient(endpoint, new AzureKeyCredential(key));
        }
    }
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
    async generateVisionaryColorPalette(theme, count = 5) {
        if (!this.openaiClient) {
            throw new Error('Azure OpenAI client not configured');
        }
        const prompt = `Generate a visionary color palette for the theme "${theme}". Provide ${count} hex colors that evoke high-end metaphysical and artistic qualities, focusing on color science, shading, and light. Ensure the palette supports uncensored, visionary art processes. List only the hex colors separated by commas.`;
        try {
            const response = await this.openaiClient.getCompletions(process.env.AZURE_OPENAI_DEPLOYMENT, prompt, { maxTokens: 100 });
            const colors = response.choices[0].text?.trim().split(',').map(c => c.trim()) || [];
            return colors.slice(0, count);
        }
        catch (error) {
            console.error('Error generating color palette:', error);
            return this.fallbackColorPalette(count);
        }
    }
    fallbackColorPalette(count) {
        const fallbackColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        return fallbackColors.slice(0, count);
    }
}
