/**
 * Pigment Engine - Historical color mixing and rendering
 */

class PigmentEngine {
    constructor() {
        this.pigments = this.loadPigmentDatabase();
        this.canvas = null;
        this.ctx = null;
    }
    
    loadPigmentDatabase() {
        // Load from JSON or use embedded
        return {
            'gold_leaf': {
                hex: '#D4AF37',
                metallic: true,
                reflectance: 0.95,
                shimmer: true,
                blendMode: 'screen',
                historical: '22-24 karat gold, hammered to 0.1 micron thickness',
                binding: 'gum arabic or egg white'
            },
            'lapis_lazuli': {
                hex: '#1E3A8A',
                depth: 'translucent',
                particles: true,
                blendMode: 'multiply',
                mineral: 'Lazurite from Afghanistan',
                cost: 'more expensive than gold in medieval times'
            },
            'vermillion': {
                hex: '#E34234',
                opacity: 1.0,
                blendMode: 'normal',
                source: 'Cinnabar (mercury sulfide)',
                toxicity: 'high - mercury based'
            },
            'egyptian_blue': {
                hex: '#1034A6',
                irLuminescent: true,
                blendMode: 'lighten',
                composition: 'Calcium copper silicate',
                creation: 'First synthetic pigment (2500 BCE)'
            },
            'malachite': {
                hex: '#0BDA51',
                mineral: 'Copper carbonate',
                opacity: 0.7,
                layering: 'multiple glazes for depth',
                blendMode: 'multiply'
            },
            'verdigris': {
                hex: '#43B3AE',
                source: 'Copper acetate from vinegar + copper',
                reactivity: 'corrosive, eats through vellum',
                blendMode: 'overlay'
            },
            'ultramarine': {
                hex: '#4166F5',
                source: 'Lapis lazuli, ground and purified',
                value: 'Reserved for Virgin Mary\'s robes',
                permanence: 'excellent',
                blendMode: 'normal'
            },
            'imperial_purple': {
                hex: '#702963',
                source: 'Murex sea snails (12,000 snails = 1 gram)',
                rarity: 'reserved for emperors',
                colorfast: 'excellent',
                blendMode: 'multiply'
            }
        };
    }
    
    // PHYSICAL PIGMENT MIXING (not RGB)
    mixPigments(pigment1, pigment2, ratio = 0.5) {
        const p1 = this.pigments[pigment1];
        const p2 = this.pigments[pigment2];
        
        if (!p1 || !p2) return null;
        
        // Convert to LAB color space for realistic mixing
        const lab1 = this.hexToLab(p1.hex);
        const lab2 = this.hexToLab(p2.hex);
        
        // Mix in LAB (perceptually uniform)
        const mixedLab = {
            l: lab1.l * (1 - ratio) + lab2.l * ratio,
            a: lab1.a * (1 - ratio) + lab2.a * ratio,
            b: lab1.b * (1 - ratio) + lab2.b * ratio
        };
        
        const mixedHex = this.labToHex(mixedLab);
        
        return {
            hex: mixedHex,
            metallic: p1.metallic || p2.metallic,
            opacity: (p1.opacity || 1) * (p2.opacity || 1),
            blendMode: this.chooseBlendMode(p1, p2),
            components: [pigment1, pigment2],
            ratio: ratio
        };
    }
    
    // Render pigment with physical properties
    renderPigment(pigment, x, y, size, ctx) {
        const p = this.pigments[pigment] || this.pigments['vermillion'];
        
        ctx.save();
        
        // Set blend mode
        ctx.globalCompositeOperation = p.blendMode || 'normal';
        
        // Base color
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        
        if (p.metallic) {
            // Gold/metallic effect
            gradient.addColorStop(0, this.lightenColor(p.hex, 30));
            gradient.addColorStop(0.5, p.hex);
            gradient.addColorStop(1, this.darkenColor(p.hex, 20));
        } else if (p.depth === 'translucent') {
            // Lapis/translucent layers
            gradient.addColorStop(0, p.hex + 'CC'); // 80% opacity
            gradient.addColorStop(0.7, p.hex + '99'); // 60%
            gradient.addColorStop(1, p.hex + '33'); // 20%
        } else {
            // Opaque pigment
            gradient.addColorStop(0, p.hex);
            gradient.addColorStop(1, this.darkenColor(p.hex, 15));
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add texture/particles if needed
        if (p.particles) {
            this.addCrystallineTexture(ctx, x, y, size);
        }
        
        if (p.shimmer) {
            this.addShimmer(ctx, x, y, size);
        }
        
        ctx.restore();
    }
    
    // Add crystalline texture (like lapis)
    addCrystallineTexture(ctx, x, y, size) {
        const particles = 20;
        for (let i = 0; i < particles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * size * 0.8;
            const px = x + Math.cos(angle) * dist;
            const py = y + Math.sin(angle) * dist;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(px, py, 2, 2);
        }
    }
    
    // Add metallic shimmer
    addShimmer(ctx, x, y, size) {
        const shimmer = ctx.createRadialGradient(
            x - size * 0.3, y - size * 0.3, 0,
            x, y, size
        );
        shimmer.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = shimmer;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Color space conversions
    hexToLab(hex) {
        // Hex → RGB → XYZ → LAB
        const rgb = this.hexToRgb(hex);
        const xyz = this.rgbToXyz(rgb);
        return this.xyzToLab(xyz);
    }
    
    labToHex(lab) {
        const xyz = this.labToXyz(lab);
        const rgb = this.xyzToRgb(xyz);
        return this.rgbToHex(rgb);
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 0, g: 0, b: 0 };
    }
    
    rgbToHex(rgb) {
        const r = Math.round(rgb.r * 255);
        const g = Math.round(rgb.g * 255);
        const b = Math.round(rgb.b * 255);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    rgbToXyz(rgb) {
        // sRGB → linear RGB → XYZ
        let r = rgb.r, g = rgb.g, b = rgb.b;
        
        r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        
        return {
            x: r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
            y: r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
            z: r * 0.0193339 + g * 0.1191920 + b * 0.9503041
        };
    }
    
    xyzToLab(xyz) {
        // XYZ → LAB (D65 white point)
        const xn = 0.95047, yn = 1.00000, zn = 1.08883;
        
        let x = xyz.x / xn, y = xyz.y / yn, z = xyz.z / zn;
        
        x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x + 16/116);
        y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y + 16/116);
        z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z + 16/116);
        
        return {
            l: 116 * y - 16,
            a: 500 * (x - y),
            b: 200 * (y - z)
        };
    }
    
    labToXyz(lab) {
        let y = (lab.l + 16) / 116;
        let x = lab.a / 500 + y;
        let z = y - lab.b / 200;
        
        const xn = 0.95047, yn = 1.00000, zn = 1.08883;
        
        x = Math.pow(x, 3) > 0.008856 ? Math.pow(x, 3) : (x - 16/116) / 7.787;
        y = Math.pow(y, 3) > 0.008856 ? Math.pow(y, 3) : (y - 16/116) / 7.787;
        z = Math.pow(z, 3) > 0.008856 ? Math.pow(z, 3) : (z - 16/116) / 7.787;
        
        return { x: x * xn, y: y * yn, z: z * zn };
    }
    
    xyzToRgb(xyz) {
        let r = xyz.x *  3.2404542 + xyz.y * -1.5371385 + xyz.z * -0.4985314;
        let g = xyz.x * -0.9692660 + xyz.y *  1.8760108 + xyz.z *  0.0415560;
        let b = xyz.x *  0.0556434 + xyz.y * -0.2040259 + xyz.z *  1.0572252;
        
        r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r;
        g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g;
        b = b > 0.0031308 ? 1.055 * Math.pow(b, 1/2.4) - 0.055 : 12.92 * b;
        
        return {
            r: Math.max(0, Math.min(1, r)),
            g: Math.max(0, Math.min(1, g)),
            b: Math.max(0, Math.min(1, b))
        };
    }
    
    lightenColor(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const factor = 1 + percent / 100;
        return this.rgbToHex({
            r: Math.min(1, rgb.r * factor),
            g: Math.min(1, rgb.g * factor),
            b: Math.min(1, rgb.b * factor)
        });
    }
    
    darkenColor(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const factor = 1 - percent / 100;
        return this.rgbToHex({
            r: rgb.r * factor,
            g: rgb.g * factor,
            b: rgb.b * factor
        });
    }
    
    chooseBlendMode(p1, p2) {
        if (p1.metallic || p2.metallic) return 'screen';
        if (p1.depth === 'translucent' || p2.depth === 'translucent') return 'multiply';
        return 'normal';
    }
}

// Export
if (typeof window !== 'undefined') {
    window.PigmentEngine = PigmentEngine;
} else if (typeof module !== 'undefined') {
    module.exports = PigmentEngine;
}