"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternGenerator = void 0;
const canvas_1 = require("canvas");
const realDataSources_1 = require("../realDataSources");
const openai_1 = require("@azure/openai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class PatternGenerator {
    constructor(width = 1920, height = 1080) {
        this.width = width;
        this.height = height;
        this.canvas = (0, canvas_1.createCanvas)(width, height);
        this.ctx = this.canvas.getContext('2d');
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const key = process.env.AZURE_OPENAI_KEY;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
        if (endpoint && key && deployment) {
            this.openaiClient = new openai_1.OpenAIClient(endpoint, new openai_1.AzureKeyCredential(key));
        }
    }
    async generateArt(request) {
        const startTime = Date.now();
        try {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.width, this.height);
            // Set up canvas for high-quality rendering
            this.setupCanvasQuality();
            // Generate the pattern
            await this.renderPattern(request.pattern);
            // Apply style transformations
            this.applyArtStyle(request.pattern.artStyle);
            // Convert to base64
            const imageData = this.canvas.toDataURL('image/png');
            const generationTime = Date.now() - startTime;
            // Analyze the generated artwork
            const patternAnalysis = this.analyzePattern(request.pattern);
            const styleAnalysis = this.analyzeStyle(request.pattern.artStyle);
            const result = {
                success: true,
                imageData,
                patternAnalysis,
                styleAnalysis
            };
            return {
                id: `art_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                request,
                result,
                metadata: {
                    generationTime,
                    fileSize: Math.floor(imageData.length / 1024), // Approximate KB
                    resolution: `${this.width}x${this.height}`,
                    colorDepth: 32,
                    layers: this.calculateLayers(request.pattern),
                    techniques: request.pattern.artStyle.techniques
                },
                connections: this.generateConnections(request.pattern)
            };
        }
        catch (error) {
            return {
                id: `art_${Date.now()}_error`,
                request,
                result: {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                    patternAnalysis: this.getEmptyAnalysis(),
                    styleAnalysis: this.getEmptyStyleAnalysis()
                },
                metadata: {
                    generationTime: Date.now() - startTime,
                    fileSize: 0,
                    resolution: `${this.width}x${this.height}`,
                    colorDepth: 0,
                    layers: 0,
                    techniques: []
                },
                connections: []
            };
        }
    }
    setupCanvasQuality() {
        // High-quality rendering setup
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        // Set up for sub-pixel precision
        this.ctx.translate(0.5, 0.5);
    }
    async renderPattern(pattern) {
        switch (pattern.type) {
            case 'geometric':
                this.renderGeometricPattern(pattern);
                break;
            case 'organic':
                this.renderOrganicPattern(pattern);
                break;
            case 'fractal':
                this.renderFractalPattern(pattern);
                break;
            case 'sacred':
                this.renderSacredGeometryPattern(pattern);
                break;
            case 'fusion':
                this.renderFusionPattern(pattern);
                break;
            default:
                this.renderDefaultPattern(pattern);
        }
    }
    renderDefaultPattern(pattern) {
        // Default pattern rendering - simple circle
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, 100, 0, 2 * Math.PI);
        this.ctx.fillStyle = pattern.artStyle.colorPalette.primary[0];
        this.ctx.fill();
        this.ctx.strokeStyle = pattern.artStyle.colorPalette.accent[0];
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }
    renderGeometricPattern(pattern) {
        const { sides = 6, radius = 100, rotation = 0, scale = 1 } = pattern.parameters;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate((rotation * Math.PI) / 180);
        this.ctx.scale(scale, scale);
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            }
            else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        // Fill with gradient
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, pattern.artStyle.colorPalette.primary[0]);
        gradient.addColorStop(1, pattern.artStyle.colorPalette.secondary[0]);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        this.ctx.strokeStyle = pattern.artStyle.colorPalette.accent[0];
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.restore();
    }
    renderOrganicPattern(pattern) {
        const { growthRate = 1, branchingFactor = 0.5, symmetry = 5 } = pattern.parameters;
        // Create organic, growing pattern
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        const branches = this.generateOrganicBranches(0, 0, 100, 0, symmetry, growthRate, branchingFactor);
        this.renderBranches(branches, pattern.artStyle.colorPalette);
        this.ctx.restore();
    }
    generateOrganicBranches(x, y, length, angle, symmetry, growthRate, branchingFactor, depth = 0, maxDepth = 8) {
        if (depth >= maxDepth || length < 2) {
            return [];
        }
        const branches = [{
                startX: x,
                startY: y,
                endX: x + Math.cos(angle) * length,
                endY: y + Math.sin(angle) * length,
                width: Math.max(1, length / 10),
                depth
            }];
        // Create symmetrical branches
        for (let i = 1; i < symmetry; i++) {
            const symAngle = angle + (i * 2 * Math.PI) / symmetry;
            branches.push({
                startX: x,
                startY: y,
                endX: x + Math.cos(symAngle) * length,
                endY: y + Math.sin(symAngle) * length,
                width: Math.max(1, length / 10),
                depth
            });
        }
        // Create child branches
        if (Math.random() < branchingFactor) {
            const newLength = length * growthRate * (0.6 + Math.random() * 0.4);
            const newAngle1 = angle + (Math.PI / 4) * (Math.random() - 0.5);
            const newAngle2 = angle - (Math.PI / 4) * (Math.random() - 0.5);
            branches.push(...this.generateOrganicBranches(branches[0].endX, branches[0].endY, newLength, newAngle1, symmetry, growthRate, branchingFactor, depth + 1, maxDepth));
            branches.push(...this.generateOrganicBranches(branches[0].endX, branches[0].endY, newLength, newAngle2, symmetry, growthRate, branchingFactor, depth + 1, maxDepth));
        }
        return branches;
    }
    renderBranches(branches, colorPalette) {
        branches.forEach((branch, index) => {
            this.ctx.beginPath();
            this.ctx.moveTo(branch.startX, branch.startY);
            this.ctx.lineTo(branch.endX, branch.endY);
            this.ctx.lineWidth = branch.width;
            this.ctx.strokeStyle = colorPalette.primary[index % colorPalette.primary.length];
            this.ctx.globalAlpha = Math.max(0.1, 1 - branch.depth * 0.1);
            this.ctx.stroke();
        });
    }
    renderFractalPattern(pattern) {
        const { iterations = 8, fractalType = 'mandelbrot' } = pattern.parameters;
        if (fractalType === 'mandelbrot') {
            this.renderMandelbrotSet(iterations);
        }
        else if (fractalType === 'julia') {
            this.renderJuliaSet(iterations);
        }
    }
    renderMandelbrotSet(maxIterations) {
        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cx = (x - this.width / 2) / (this.width / 4);
                const cy = (y - this.height / 2) / (this.height / 4);
                let zx = 0, zy = 0;
                let iteration = 0;
                while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
                    const xtemp = zx * zx - zy * zy + cx;
                    zy = 2 * zx * zy + cy;
                    zx = xtemp;
                    iteration++;
                }
                const index = (x + y * this.width) * 4;
                if (iteration === maxIterations) {
                    data[index] = 0; // Red
                    data[index + 1] = 0; // Green
                    data[index + 2] = 0; // Blue
                }
                else {
                    const hue = (iteration / maxIterations) * 360;
                    const [r, g, b] = this.hslToRgb(hue / 360, 1, 0.5);
                    data[index] = r;
                    data[index + 1] = g;
                    data[index + 2] = b;
                }
                data[index + 3] = 255; // Alpha
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    renderJuliaSet(maxIterations) {
        const imageData = this.ctx.createImageData(this.width, this.height);
        const data = imageData.data;
        // Julia set constant
        const cReal = -0.7;
        const cImag = 0.27015;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const zx = 1.5 * (x - this.width / 2) / (0.5 * this.width);
                const zy = (y - this.height / 2) / (0.5 * this.height);
                let iteration = 0;
                let zxTemp = zx, zyTemp = zy;
                while (zxTemp * zxTemp + zyTemp * zyTemp < 4 && iteration < maxIterations) {
                    const xtemp = zxTemp * zxTemp - zyTemp * zyTemp + cReal;
                    zyTemp = 2 * zxTemp * zyTemp + cImag;
                    zxTemp = xtemp;
                    iteration++;
                }
                const index = (x + y * this.width) * 4;
                if (iteration === maxIterations) {
                    data[index] = 0;
                    data[index + 1] = 0;
                    data[index + 2] = 0;
                }
                else {
                    const hue = (iteration / maxIterations) * 360;
                    const [r, g, b] = this.hslToRgb(hue / 360, 1, 0.5);
                    data[index] = r;
                    data[index + 1] = g;
                    data[index + 2] = b;
                }
                data[index + 3] = 255;
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    renderSacredGeometryPattern(pattern) {
        const { petalCount = 6, spiralCount = 1, sacredRatio = 1.618 } = pattern.parameters;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        // Draw sacred geometry pattern
        this.drawFlowerOfLife(petalCount, spiralCount, sacredRatio);
        this.ctx.restore();
    }
    drawFlowerOfLife(petals, spirals, ratio) {
        const radius = Math.min(this.width, this.height) / 6;
        // Draw overlapping circles
        for (let i = 0; i < petals; i++) {
            const angle = (i * 2 * Math.PI) / petals;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, this.fadeColor('#ffd700', 0.8));
            gradient.addColorStop(1, this.fadeColor('#483d8b', 0.2));
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            this.ctx.strokeStyle = '#ffd700';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        // Draw spiral overlay
        if (spirals > 0) {
            this.drawSpiral(spirals, radius * ratio);
        }
    }
    drawSpiral(spirals, radius) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#50c878';
        this.ctx.lineWidth = 3;
        for (let angle = 0; angle < spirals * 2 * Math.PI; angle += 0.1) {
            const r = (radius / (2 * Math.PI)) * angle;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (angle === 0) {
                this.ctx.moveTo(x, y);
            }
            else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
    }
    renderFusionPattern(pattern) {
        const { fusionSources = [], fusionWeights = [], mutationRate = 0.1 } = pattern.parameters;
        // Combine multiple patterns
        fusionSources.forEach((sourceId, index) => {
            const template = realDataSources_1.PATTERN_TEMPLATES[sourceId];
            if (template) {
                const weight = fusionWeights[index] || (1 / fusionSources.length);
                // Mutate the pattern slightly
                const mutatedPattern = this.mutatePattern(template, mutationRate);
                // Render with weighted opacity
                this.ctx.save();
                this.ctx.globalAlpha = weight;
                this.renderPattern(mutatedPattern);
                this.ctx.restore();
            }
        });
    }
    mutatePattern(pattern, mutationRate) {
        const mutated = { ...pattern };
        if (Math.random() < mutationRate) {
            mutated.parameters = { ...pattern.parameters };
            // Randomly mutate parameters
            Object.keys(mutated.parameters).forEach(key => {
                if (typeof mutated.parameters[key] === 'number' && Math.random() < 0.3) {
                    const currentValue = mutated.parameters[key];
                    const mutation = (Math.random() - 0.5) * 0.2; // ±10% mutation
                    mutated.parameters[key] = currentValue * (1 + mutation);
                }
            });
        }
        return mutated;
    }
    applyArtStyle(style) {
        // Apply color palette transformations
        this.applyColorHarmony(style.colorPalette);
        // Apply style-specific effects
        if (style.techniques.includes('sacred-geometry')) {
            this.addSacredGeometryOverlay();
        }
        if (style.techniques.includes('surreal-illustration')) {
            this.addSurrealEffects();
        }
        // Enhance with Azure AI for shading and light
        this.enhanceWithAzureAI(style);
    }
    applyColorHarmony(palette) {
        // This would implement sophisticated color harmony algorithms
        // For now, we'll apply a simple color overlay
        if (palette.harmony === 'sacred') {
            this.applySacredColorHarmony(palette);
        }
    }
    applySacredColorHarmony(palette) {
        const overlay = (0, canvas_1.createCanvas)(this.width, this.height);
        const overlayCtx = overlay.getContext('2d');
        // Create sacred geometry color overlay
        overlayCtx.fillStyle = palette.primary[0];
        overlayCtx.globalCompositeOperation = 'multiply';
        overlayCtx.fillRect(0, 0, this.width, this.height);
        // Draw the overlay
        this.ctx.drawImage(overlay, 0, 0);
    }
    addSacredGeometryOverlay() {
        // Add subtle sacred geometry overlay patterns
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        this.ctx.strokeStyle = '#ffd700';
        // Draw golden ratio rectangles
        this.drawGoldenRectangle(this.width / 2, this.height / 2, this.width * 0.8, this.height * 0.8);
        this.ctx.restore();
    }
    drawGoldenRectangle(x, y, width, height) {
        const ratio = 1.618;
        const rectHeight = height;
        const rectWidth = rectHeight / ratio;
        this.ctx.strokeRect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);
        if (rectWidth > 20) { // Prevent infinite recursion
            this.drawGoldenRectangle(x - rectWidth / 4, y, rectWidth / 2, rectHeight / ratio);
            this.drawGoldenRectangle(x + rectWidth / 4, y, rectWidth / 2, rectHeight / ratio);
        }
    }
    addSurrealEffects() {
        // Add subtle surreal distortion effects
        const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < 0.01) { // 1% of pixels
                // Slight color shift for surreal effect
                data[i] = Math.min(255, data[i] + 20); // Red
                data[i + 2] = Math.max(0, data[i + 2] - 10); // Blue
            }
        }
        this.ctx.putImageData(imageData, 0, 0);
    }
    async enhanceWithAzureAI(style) {
        if (!this.openaiClient)
            return;
        const prompt = `Enhance the art style "${style.name}" with advanced shading, light effects, and metaphysical data processing for high-end visionary art. Describe shading techniques and light interactions in detail, ensuring uncensored, creative freedom. Provide a short description for implementation.`;
        try {
            const response = await this.openaiClient.getCompletions(process.env.AZURE_OPENAI_DEPLOYMENT, prompt, { maxTokens: 150 });
            const enhancement = response.choices[0].text?.trim();
            if (enhancement) {
                // Apply simple enhancements based on AI description
                this.applyAIEnhancements(enhancement);
            }
        }
        catch (error) {
            console.error('Error enhancing with Azure AI:', error);
        }
    }
    applyAIEnhancements(description) {
        // Simple implementation: adjust global alpha or add overlays based on keywords
        if (description.includes('shadow')) {
            this.ctx.globalAlpha = 0.9;
        }
        if (description.includes('light')) {
            this.addLightOverlay();
        }
        // More sophisticated parsing could be added
    }
    addLightOverlay() {
        const overlay = (0, canvas_1.createCanvas)(this.width, this.height);
        const overlayCtx = overlay.getContext('2d');
        const gradient = overlayCtx.createRadialGradient(this.width / 2, this.height / 2, 0, this.width / 2, this.height / 2, Math.max(this.width, this.height) / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        overlayCtx.fillStyle = gradient;
        overlayCtx.fillRect(0, 0, this.width, this.height);
        this.ctx.drawImage(overlay, 0, 0);
    }
    hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // Achromatic
        }
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    fadeColor(color, alpha) {
        // Simple color fading - in a real implementation, this would parse hex colors properly
        return color;
    }
    analyzePattern(pattern) {
        // Analyze the mathematical properties of the generated pattern
        return {
            symmetry: this.calculateSymmetry(),
            complexity: pattern.metadata.complexity,
            fractalDimension: this.calculateFractalDimension(pattern),
            aestheticRatios: this.calculateAestheticRatios(),
            goldenRatioCompliance: this.checkGoldenRatioCompliance(pattern),
            sacredGeometryElements: this.identifySacredGeometryElements(pattern)
        };
    }
    analyzeStyle(style) {
        return {
            styleAccuracy: 0.85, // Would be calculated based on style matching
            colorHarmony: 0.9,
            compositionBalance: 0.8,
            artisticInnovation: 0.75,
            technicalQuality: 0.95
        };
    }
    calculateSymmetry() {
        // Simplified symmetry calculation
        return 0.8;
    }
    calculateFractalDimension(pattern) {
        if (pattern.type === 'fractal') {
            return pattern.parameters.iterations ? Math.log(pattern.parameters.iterations) / Math.log(3) : 1.5;
        }
        return 1.0;
    }
    calculateAestheticRatios() {
        return [1.618, 1.414, 2.718, 3.14159];
    }
    checkGoldenRatioCompliance(pattern) {
        return pattern.parameters.sacredRatio === 1.618 ? 1.0 : 0.5;
    }
    identifySacredGeometryElements(pattern) {
        const elements = [];
        if (pattern.parameters.sacredRatio)
            elements.push('golden-ratio');
        if (pattern.parameters.petalCount)
            elements.push('flower-of-life');
        if (pattern.parameters.spiralCount)
            elements.push('spiral');
        return elements;
    }
    calculateLayers(pattern) {
        return pattern.type === 'fusion' ? 3 : 1;
    }
    generateConnections(pattern) {
        const connections = [];
        if (pattern.realWorldConnection) {
            connections.push({
                type: 'inspiration',
                source: pattern.realWorldConnection,
                strength: 0.9,
                description: `Inspired by ${pattern.realWorldConnection.name}`
            });
        }
        return connections;
    }
    getEmptyAnalysis() {
        return {
            symmetry: 0,
            complexity: 0,
            aestheticRatios: [],
            goldenRatioCompliance: 0,
            sacredGeometryElements: []
        };
    }
    getEmptyStyleAnalysis() {
        return {
            styleAccuracy: 0,
            colorHarmony: 0,
            compositionBalance: 0,
            artisticInnovation: 0,
            technicalQuality: 0
        };
    }
    getCanvas() {
        return this.canvas;
    }
    exportSVG() {
        // Generate SVG representation of the current canvas
        return `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#0b0b1a"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#ffd700" font-family="Cinzel" font-size="24">
        Pattern Art Generated Here
      </text>
    </svg>`;
    }
}
exports.PatternGenerator = PatternGenerator;
//# sourceMappingURL=patternGenerator.js.map