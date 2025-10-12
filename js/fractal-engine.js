/**
 * Fractal Engine - Complete fractal processing system
 * Generates visuals, architecture, narratives, and music from fractal patterns
 */

class FractalEngine {
    constructor() {
        this.renderers = {
            mandelbrot: new MandelbrotRenderer(),
            julia: new JuliaRenderer(),
            lsystem: new LSystemRenderer(),
            ifs: new IFSRenderer(),
            lorenz: new LorenzRenderer(),
            koch: new KochRenderer(),
            dragon: new DragonRenderer(),
            hilbert: new HilbertRenderer(),
            fibonacci: new FibonacciRenderer(),
            cellular: new CellularRenderer(),
            apollonian: new ApollonianRenderer(),
            menger: new MengerRenderer()
        };
    }
    
    // Generate fractal visual for node
    renderFractal(node, width = 512, height = 512) {
        const type = node.fractal?.type?.toLowerCase();
        const renderer = this.renderers[type];
        
        if (!renderer) {
            console.warn(`No renderer for fractal type: ${type}`);
            return this.defaultPattern(node, width, height);
        }
        
        return renderer.render(node.fractal.parameters, width, height, node.color);
    }
    
    // Generate architecture from fractal
    generateArchitecture(node, scale = 1) {
        const type = node.fractal?.type?.toLowerCase();
        const depth = node.fractal?.recursionDepth || 5;
        const ratio = node.fractal?.selfSimilarityRatio || 2;
        
        return {
            layout: this.fractalToLayout(type, depth, ratio, scale),
            rooms: this.fractalToRooms(node, depth),
            connections: this.fractalToConnections(type, depth),
            decorations: this.fractalToDecorations(node)
        };
    }
    
    // Generate narrative structure from fractal
    generateNarrative(node, length = 'medium') {
        const type = node.fractal?.type?.toLowerCase();
        const recursion = node.fractalApplications?.narrative?.recursion;
        
        return {
            structure: this.fractalToStoryStructure(type),
            recursiveBeats: this.fractalToBeats(node, length),
            nestedPlots: this.fractalToSubplots(node),
            climaxPattern: this.fractalToClimax(type)
        };
    }
    
    // Generate musical pattern from fractal
    generateMusic(node) {
        const type = node.fractal?.type?.toLowerCase();
        const rhythm = node.fractalApplications?.music?.rhythm;
        
        return {
            timeSignature: this.fractalToTimeSignature(type),
            rhythmPattern: this.fractalToRhythm(node),
            melodicSequence: this.fractalToMelody(node),
            polyrhythm: this.fractalToPolyrhythm(type)
        };
    }
    
    // FRACTAL TO LAYOUT CONVERSION
    fractalToLayout(type, depth, ratio, scale) {
        const layouts = {
            mandelbrot: this.mandelbrotLayout(depth, ratio, scale),
            lsystem: this.lsystemLayout(depth, ratio, scale),
            ifs: this.ifsLayout(depth, ratio, scale),
            hilbert: this.hilbertLayout(depth, scale),
            fibonacci: this.fibonacciLayout(depth, scale),
            koch: this.kochLayout(depth, scale),
            dragon: this.dragonLayout(depth, scale)
        };
        
        return layouts[type] || this.defaultLayout(depth, scale);
    }
    
    mandelbrotLayout(depth, ratio, scale) {
        // Spiral expanding rooms with self-similar alcoves
        const rooms = [];
        let angle = 0;
        let radius = scale;
        
        for (let i = 0; i < depth; i++) {
            rooms.push({
                id: i,
                position: {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    z: i * scale * 0.5
                },
                size: scale / Math.pow(ratio, i),
                children: i < depth - 1 ? 3 : 0, // 3 alcoves per room
                type: 'Expanding Chamber'
            });
            
            angle += Math.PI / 3; // 60 degree rotation
            radius *= 1.3; // Expand outward
        }
        
        return {
            type: 'Spiral Mandelbrot',
            rooms: rooms,
            totalArea: rooms.reduce((sum, r) => sum + r.size * r.size, 0),
            depth: depth
        };
    }
    
    lsystemLayout(depth, ratio, scale) {
        // Branching tree structure
        const axiom = 'F';
        const rules = { 'F': 'FF+[+F-F-F]-[-F+F+F]' };
        let current = axiom;
        
        // Generate L-system string
        for (let i = 0; i < depth; i++) {
            current = this.applyLSystemRules(current, rules);
        }
        
        // Convert to room positions
        const rooms = this.lsystemToRooms(current, scale);
        
        return {
            type: 'Branching L-System',
            rooms: rooms,
            pattern: current.substring(0, 50) + '...', // Truncate for display
            depth: depth
        };
    }
    
    applyLSystemRules(input, rules) {
        return input.split('').map(char => rules[char] || char).join('');
    }
    
    lsystemToRooms(lstring, scale) {
        const rooms = [];
        let x = 0, y = 0, angle = 90;
        const stack = [];
        let id = 0;
        
        for (const char of lstring) {
            switch(char) {
                case 'F':
                    const newX = x + Math.cos(angle * Math.PI / 180) * scale;
                    const newY = y + Math.sin(angle * Math.PI / 180) * scale;
                    rooms.push({
                        id: id++,
                        position: { x: newX, y: newY, z: 0 },
                        size: scale * 0.8,
                        type: 'Branch Chamber'
                    });
                    x = newX;
                    y = newY;
                    break;
                case '+':
                    angle += 25;
                    break;
                case '-':
                    angle -= 25;
                    break;
                case '[':
                    stack.push({ x, y, angle });
                    break;
                case ']':
                    const state = stack.pop();
                    if (state) {
                        x = state.x;
                        y = state.y;
                        angle = state.angle;
                    }
                    break;
            }
            
            if (id > 50) break; // Limit room count
        }
        
        return rooms;
    }
    
    fibonacciLayout(depth, scale) {
        // Golden spiral arrangement
        const phi = 1.618033988749;
        const rooms = [];
        
        let fib = [1, 1];
        for (let i = 2; i < depth; i++) {
            fib.push(fib[i-1] + fib[i-2]);
        }
        
        for (let i = 0; i < depth; i++) {
            const angle = i * 137.5 * Math.PI / 180; // Golden angle
            const radius = fib[i] * scale * 0.5;
            
            rooms.push({
                id: i,
                position: {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    z: 0
                },
                size: fib[i] * scale * 0.3,
                type: 'Golden Chamber',
                fibNumber: fib[i]
            });
        }
        
        return {
            type: 'Fibonacci Spiral',
            rooms: rooms,
            sequence: fib,
            ratio: phi,
            depth: depth
        };
    }
    
    // FRACTAL TO NARRATIVE
    fractalToStoryStructure(type) {
        const structures = {
            mandelbrot: 'Infinite Regress (story within story)',
            lsystem: 'Branching Multiverse (choice trees)',
            fibonacci: 'Golden Spiral (escalating tension)',
            hilbert: 'Labyrinthine Quest (all paths lead to center)',
            koch: 'Crystalline Revelation (pattern emerges)',
            dragon: 'Serpentine Journey (twisting fate)',
            lorenz: 'Chaotic Butterfly (small choices, big effects)',
            cellular: 'Emergent Saga (simple rules, complex story)'
        };
        
        return structures[type] || 'Fractal Narrative';
    }
    
    fractalToBeats(node, length) {
        const depth = node.fractal?.recursionDepth || 5;
        const beats = [];
        
        // Generate self-similar story beats
        const generateBeat = (level, prefix = '') => {
            if (level === 0) return;
            
            beats.push({
                level: depth - level,
                description: `${prefix}Trial ${depth - level + 1}`,
                recursion: `Contains ${level} nested sub-trials`,
                scale: Math.pow(2, level)
            });
            
            generateBeat(level - 1, prefix + '  ');
        };
        
        generateBeat(length === 'short' ? 3 : length === 'long' ? 7 : 5);
        
        return beats;
    }
    
    // FRACTAL TO MUSIC
    fractalToTimeSignature(type) {
        const signatures = {
            mandelbrot: '7/8 (nested 7/8 within each beat)',
            fibonacci: '13/8 (Fibonacci numbers)',
            lsystem: '5/4 + 7/8 alternating',
            hilbert: '4/4 with fractal subdivisions',
            koch: '3/4 tripled (9/4)',
            dragon: '2/4 with irregular doubling'
        };
        
        return signatures[type] || '4/4';
    }
    
    fractalToRhythm(node) {
        const type = node.fractal?.type?.toLowerCase();
        const depth = node.fractal?.recursionDepth || 4;
        
        // Generate fractal rhythm pattern
        let pattern = [1]; // Start with single beat
        
        for (let i = 0; i < depth; i++) {
            pattern = this.subdivideRhythm(pattern, type);
        }
        
        return {
            pattern: pattern,
            notation: this.rhythmToNotation(pattern),
            bpm: node.solfeggio ? Math.floor(node.solfeggio / 2) : 120
        };
    }
    
    subdivideRhythm(pattern, type) {
        if (type === 'fibonacci') {
            return pattern.flatMap(beat => [beat, beat, beat * 1.618]);
        } else if (type === 'mandelbrot') {
            return pattern.flatMap(beat => [beat, beat * 2, beat]);
        } else if (type === 'lsystem') {
            return pattern.flatMap(beat => [beat, beat / 2, beat / 2]);
        }
        
        return pattern.flatMap(beat => [beat, beat]); // Default: doubling
    }
    
    rhythmToNotation(pattern) {
        return pattern.map(beat => {
            if (beat >= 1) return '♩'; // Quarter note
            if (beat >= 0.5) return '♪'; // Eighth note
            return '♬'; // Sixteenth note
        }).join(' ');
    }
    
    // Default implementations
    fractalToRooms(node, depth) {
        return Array(depth).fill(null).map((_, i) => ({
            id: i,
            description: `Room ${i + 1} - ${node.name} influence`,
            features: node.fractalApplications?.architecture?.pattern || 'Standard room'
        }));
    }
    
    fractalToConnections(type, depth) {
        return Array(depth - 1).fill(null).map((_, i) => ({
            from: i,
            to: i + 1,
            type: 'corridor'
        }));
    }
    
    fractalToDecorations(node) {
        return {
            theme: node.element || 'neutral',
            colors: [node.color],
            symbols: node.geometry || 'abstract'
        };
    }
    
    fractalToSubplots(node) {
        return [
            { level: 1, plot: `Main quest involving ${node.name}` },
            { level: 2, plot: `Sub-quest exploring ${node.element} mysteries` },
            { level: 3, plot: `Personal journey of character development` }
        ];
    }
    
    fractalToClimax(type) {
        const climaxTypes = {
            mandelbrot: 'Infinite complexity reveals simple truth',
            fibonacci: 'Perfect harmony achieved through golden ratio',
            koch: 'Pattern completes, crystalline clarity emerges',
            dragon: 'Serpentine path leads to unexpected destination'
        };
        
        return climaxTypes[type] || 'Pattern reaches completion';
    }
    
    fractalToMelody(node) {
        const baseFreq = node.solfeggio || 440;
        return {
            notes: [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2],
            progression: 'ascending spiral',
            mode: node.element === 'Fire' ? 'dorian' : 'aeolian'
        };
    }
    
    fractalToPolyrhythm(type) {
        const polyrhythms = {
            mandelbrot: '3 against 2 (complexity vs simplicity)',
            fibonacci: '5 against 8 (golden ratio rhythm)',
            koch: '3 against 6 (crystalline structure)',
            lsystem: '2 against 3 against 5 (branching time)'
        };
        
        return polyrhythms[type] || 'standard 4/4';
    }
    
    // Stub implementations for missing methods
    ifsLayout(depth, ratio, scale) {
        return this.defaultLayout(depth, scale);
    }
    
    hilbertLayout(depth, scale) {
        return this.defaultLayout(depth, scale);
    }
    
    kochLayout(depth, scale) {
        return this.defaultLayout(depth, scale);
    }
    
    dragonLayout(depth, scale) {
        return this.defaultLayout(depth, scale);
    }
    
    // Default fallback
    defaultLayout(depth, scale) {
        return {
            type: 'Simple Grid',
            rooms: Array(depth * depth).fill(null).map((_, i) => ({
                id: i,
                position: {
                    x: (i % depth) * scale,
                    y: Math.floor(i / depth) * scale,
                    z: 0
                },
                size: scale * 0.8,
                type: 'Standard Chamber'
            }))
        };
    }
    
    defaultPattern(node, width, height) {
        return `<svg width="${width}" height="${height}">
            <circle cx="${width/2}" cy="${height/2}" r="${width/3}" fill="${node.color}" opacity="0.5"/>
        </svg>`;
    }
}

// FRACTAL RENDERERS (Visual Generation)
class MandelbrotRenderer {
    render(params, width, height, color) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
        
        const { centerReal = -0.5, centerImag = 0, zoom = 1, maxIterations = 100 } = params || {};
        
        for (let px = 0; px < width; px++) {
            for (let py = 0; py < height; py++) {
                const x0 = (px / width - 0.5) * 4 / zoom + centerReal;
                const y0 = (py / height - 0.5) * 4 / zoom + centerImag;
                
                let x = 0, y = 0;
                let iteration = 0;
                
                while (x*x + y*y <= 4 && iteration < maxIterations) {
                    const xtemp = x*x - y*y + x0;
                    y = 2*x*y + y0;
                    x = xtemp;
                    iteration++;
                }
                
                const idx = (py * width + px) * 4;
                const brightness = iteration < maxIterations ? 
                    255 * iteration / maxIterations : 0;
                
                imageData.data[idx] = brightness; // R
                imageData.data[idx + 1] = brightness * 0.5; // G
                imageData.data[idx + 2] = brightness * 0.3; // B
                imageData.data[idx + 3] = 255; // A
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }
}

// Simple stub renderers for other fractals
class JuliaRenderer extends MandelbrotRenderer {}
class LSystemRenderer extends MandelbrotRenderer {}
class IFSRenderer extends MandelbrotRenderer {}
class LorenzRenderer extends MandelbrotRenderer {}
class KochRenderer extends MandelbrotRenderer {}
class DragonRenderer extends MandelbrotRenderer {}
class HilbertRenderer extends MandelbrotRenderer {}
class FibonacciRenderer extends MandelbrotRenderer {}
class CellularRenderer extends MandelbrotRenderer {}
class ApollonianRenderer extends MandelbrotRenderer {}
class MengerRenderer extends MandelbrotRenderer {}

// Export
if (typeof window !== 'undefined') {
    window.FractalEngine = FractalEngine;
} else if (typeof module !== 'undefined') {
    module.exports = FractalEngine;
}