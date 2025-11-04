/**
 * Graphics Engine - Museum-quality rendering
 */

class GraphicsEngine {
    constructor(canvasId) {
        // Prefer provided canvas, fall back to an existing background canvas, then create
        const target = document.getElementById(canvasId) || document.getElementById('cosmicCanvas');
        if (target && target.id === 'cosmicCanvas') {
            // Create a non-interactive overlay so we don't erase Cosmogenesis' drawing
            const overlay = document.createElement('canvas');
            overlay.id = `${canvasId}-overlay`;
            document.body.appendChild(overlay);
            this.canvas = overlay;
        } else if (target) {
            this.canvas = target;
        } else {
            const c = document.createElement('canvas');
            c.id = canvasId;
            document.body.appendChild(c);
            this.canvas = c;
        }

        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.pigmentEngine = new PigmentEngine();

        // Event/foreground particles (sparks when nodes trigger)
        this.particles = [];

        // Visionary background state
        this.layers = [];
        this.time = 0;
        this.mouse = { x: 0, y: 0, dx: 0, dy: 0 };
        this.palette = {
            backgroundStart: '#0a0a1a',
            backgroundEnd:   '#000000',
            astral:   'rgba(99, 66, 199, 0.6)',   // deep indigo/purple
            void:     'rgba(10, 20, 40, 0.45)',  // blue-black
            akasha:   'rgba(64, 224, 208, 0.35)',// ethereal cyan-green
            quantum:  'rgba(147, 112, 219, 0.5)',// iridescent violet
            neural:   'rgba(218, 165, 32, 0.35)' // soft golden
        };

        this.animationFrame = null;
        this.setupCanvas();
        this.initVisionaryBackground();
        this.bindInput();
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
    // Place above world canvas but below UI
    this.canvas.style.zIndex = '2';
        this.canvas.style.pointerEvents = 'none';
    }
    
    // High-quality node rendering
    renderNode(node, x, y, size, active = false) {
        const ctx = this.ctx;
        
        // Get pigment for this node
        const pigment = this.getPigmentForNode(node);
        
        // Base layer
        this.pigmentEngine.renderPigment(pigment, x, y, size, ctx);
        
        // Glow when active
        if (active) {
            this.renderGlow(x, y, size * 1.5, node.color);
        }
        
        // Sacred geometry overlay
        if (node.geometry) {
            this.renderGeometry(node.geometry, x, y, size * 0.6);
        }
        
        // Node ID/symbol
        ctx.save();
        ctx.fillStyle = this.getContrastColor(node.color);
        ctx.font = `bold ${size * 0.3}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, x, y);
        ctx.restore();
    }
    
    // Map elements to historical pigments
    getPigmentForNode(node) {
        const elementPigments = {
            'Fire': 'vermillion',
            'Water': 'lapis_lazuli',
            'Earth': 'malachite',
            'Air': 'egyptian_blue',
            'Aether': 'gold_leaf',
            'Spirit': 'ultramarine',
            'Metal': 'verdigris'
        };
        
        return elementPigments[node.element] || 'vermillion';
    }
    
    // Render sacred geometry
    renderGeometry(type, x, y, size) {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        
        switch(type) {
            case 'Tetrahedron':
                this.drawTetrahedron(x, y, size);
                break;
            case 'Cube':
                this.drawCube(x, y, size);
                break;
            case 'Octahedron':
                this.drawOctahedron(x, y, size);
                break;
            case 'Dodecahedron':
                this.drawDodecahedron(x, y, size);
                break;
            case 'Icosahedron':
                this.drawIcosahedron(x, y, size);
                break;
            default:
                this.drawCircle(x, y, size);
        }
        
        ctx.restore();
    }
    
    drawTetrahedron(x, y, size) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.closePath();
        ctx.stroke();
    }
    
    drawCube(x, y, size) {
        const ctx = this.ctx;
        const s = size * 0.7;
        ctx.strokeRect(x - s, y - s, s * 2, s * 2);
        ctx.strokeRect(x - s * 0.7, y - s * 1.3, s * 2, s * 2);
        ctx.beginPath();
        ctx.moveTo(x - s, y - s);
        ctx.lineTo(x - s * 0.7, y - s * 1.3);
        ctx.moveTo(x + s, y - s);
        ctx.lineTo(x + s * 1.3, y - s * 1.3);
        ctx.moveTo(x - s, y + s);
        ctx.lineTo(x - s * 0.7, y + s * 0.7);
        ctx.moveTo(x + s, y + s);
        ctx.lineTo(x + s * 1.3, y + s * 0.7);
        ctx.stroke();
    }
    
    drawOctahedron(x, y, size) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - size * 0.7, y);
        ctx.lineTo(x, y - size * 0.7);
        ctx.lineTo(x + size * 0.7, y);
        ctx.lineTo(x, y + size * 0.7);
        ctx.closePath();
        ctx.stroke();
    }
    
    drawDodecahedron(x, y, size) {
        const ctx = this.ctx;
        const sides = 5;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
            const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }
    
    drawIcosahedron(x, y, size) {
        const ctx = this.ctx;
        const sides = 3;
        for (let ring = 0; ring < 2; ring++) {
            const r = size * (1 - ring * 0.4);
            ctx.beginPath();
            for (let i = 0; i <= sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
    }
    
    drawCircle(x, y, size) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Radial glow effect
    renderGlow(x, y, size, color) {
        const ctx = this.ctx;
        const glow = ctx.createRadialGradient(x, y, size * 0.3, x, y, size);
        // Softer glow: cap alpha ~0.7
        const clamp = (hex, a) => hex + Math.round(a * 255).toString(16).padStart(2, '0');
        glow.addColorStop(0, clamp(color.replace(/#?([0-9a-f]{6}).*/i, '#$1'), 0.7));
        glow.addColorStop(0.5, clamp(color.replace(/#?([0-9a-f]{6}).*/i, '#$1'), 0.26));
        glow.addColorStop(1, clamp(color.replace(/#?([0-9a-f]{6}).*/i, '#$1'), 0.0));
        
        ctx.save();
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Particle system for active nodes
    createParticles(x, y, color, count = 12) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                // Subtle motion
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                life: 0.9 + Math.random() * 0.3,
                size: Math.random() * 2.2 + 0.6,
                color: color
            });
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            // Slow fade with gentle float
            p.life -= 0.01;
            return p.life > 0;
        });
    }
    
    renderParticles() {
        const ctx = this.ctx;
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    // =============== Visionary Background ===============
    bindInput() {
        // Subtle mouse influence (2x vs 10x typical)
        window.addEventListener('mousemove', (e) => {
            const cx = this.canvas.width / 2;
            const cy = this.canvas.height / 2;
            this.mouse.dx = (e.clientX - cx) / cx; // -1..1
            this.mouse.dy = (e.clientY - cy) / cy; // -1..1
        });
        window.addEventListener('resize', () => this.resize());
    }

    initVisionaryBackground() {
        // Create mystical layers with reduced particle counts and slow motion
        this.layers = [
            this.createLayer('ASTRAL PLANE', this.palette.astral, 26, 0.018, 0.9),
            this.createLayer('VOID PASSAGE', this.palette.void, 22, 0.012, 1.2),
            this.createLayer('DIGITAL AKASHA', this.palette.akasha, 18, 0.02, 1.0),
            this.createLayer('QUANTUM FIELD', this.palette.quantum, 18, 0.028, 0.8),
            this.createLayer('NEURAL COSMOS', this.palette.neural, 16, 0.015, 1.1)
        ];
    }

    createLayer(name, color, count, speed, depth) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = (Math.random() ** 0.7) * Math.min(this.canvas.width, this.canvas.height) * 0.45;
            particles.push({
                angle,
                baseRadius: radius,
                radius,
                size: 1 + Math.random() * 2.5,
                drift: Math.random() * 0.004 + 0.001,
                breathe: 0.02 + Math.random() * 0.04,
                twinkle: Math.random() * Math.PI * 2
            });
        }
        return { name, color, count, speed, depth, particles };
    }

    drawBackgroundGradient() {
        const g = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.min(this.canvas.width, this.canvas.height) * 0.05,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height) * 0.7
        );
        g.addColorStop(0, this.palette.backgroundStart);
        g.addColorStop(1, this.palette.backgroundEnd);
        this.ctx.save();
        // Multiply to blend with world beneath; avoids harsh occlusion
        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    updateVisionaryLayers(dt) {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const mouseInfluence = 6; // subtle drift radius in px

        for (const layer of this.layers) {
            for (const p of layer.particles) {
                // slow meditative rotation
                p.angle += layer.speed * dt;
                // breathing: small radius oscillation
                const breath = 1 + Math.sin(this.time * p.breathe) * 0.06;
                p.radius = p.baseRadius * breath;

                const x = cx + Math.cos(p.angle) * p.radius + this.mouse.dx * mouseInfluence * layer.depth;
                const y = cy + Math.sin(p.angle) * p.radius + this.mouse.dy * mouseInfluence * layer.depth;

                // twinkle alpha
                const a = 0.25 + Math.abs(Math.sin(this.time * 0.001 + p.twinkle)) * 0.45; // max ~0.7
                this.drawLayerParticle(x, y, p.size, layer.color, a);
            }
        }
    }

    drawLayerParticle(x, y, size, color, alpha) {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = alpha; // capped by updateVisionaryLayers (~0.7)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawSacredCenter() {
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const base = Math.min(this.canvas.width, this.canvas.height) * 0.12;
        const pulsate = 1 + Math.sin(this.time * 0.0012) * 0.03; // gentle breathing
        const size = base * pulsate;

        this.ctx.save();
        this.ctx.lineWidth = 1.2;
        this.ctx.strokeStyle = 'rgba(200, 180, 255, 0.35)';
        this.drawIcosahedron(cx, cy, size * 0.55);
        this.ctx.strokeStyle = 'rgba(255, 215, 128, 0.28)';
        this.drawDodecahedron(cx, cy, size * 0.42);
        this.ctx.restore();
    }

    drawFog() {
        const ctx = this.ctx;
        const grad = ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.min(this.canvas.width, this.canvas.height) * 0.2,
            this.canvas.width / 2,
            this.canvas.height / 2,
            Math.max(this.canvas.width, this.canvas.height) * 0.8
        );
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.25)'); // gentle fog vignette
        ctx.save();
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.restore();
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Get contrasting text color
    getContrastColor(hex) {
        const rgb = this.pigmentEngine.hexToRgb(hex);
        const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    
    // Animation loop
    animate() {
        const now = performance.now();
        const last = this._lastTime || now;
        const dt = (now - last) * 0.001; // seconds
        this._lastTime = now;
        this.time += (now - (this._prevTime || now));
        this._prevTime = now;

        // Background
        this.drawBackgroundGradient();
        this.updateVisionaryLayers(dt);
        this.drawSacredCenter();
        this.drawFog();

        // Foreground transient particles (sparks)
        this.updateParticles();
        this.renderParticles();

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    startAnimation() {
        if (!this.animationFrame) {
            this.animate();
        }
    }
    
    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
    
    // Resize handler
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Recalculate base radii for background particles to keep proportions
        const maxR = Math.min(this.canvas.width, this.canvas.height) * 0.45;
        for (const layer of this.layers) {
            for (const p of layer.particles) {
                // keep relative radius within new max
                p.baseRadius = Math.min(p.baseRadius, maxR);
            }
        }
    }
}

// Export
if (typeof window !== 'undefined') {
    window.GraphicsEngine = GraphicsEngine;
    
    // Auto-resize on window resize
    window.addEventListener('resize', () => {
        if (window.graphicsEngine) {
            window.graphicsEngine.resize();
        }
    });
} else if (typeof module !== 'undefined') {
    module.exports = GraphicsEngine;
}