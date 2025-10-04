/**
 * Graphics Engine - Museum-quality rendering
 */

class GraphicsEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn('Canvas not found, creating one');
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.pigmentEngine = new PigmentEngine();
        this.particles = [];
        this.animationFrame = null;
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
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
        glow.addColorStop(0, color + 'AA');
        glow.addColorStop(0.5, color + '44');
        glow.addColorStop(1, color + '00');
        
        ctx.save();
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Particle system for active nodes
    createParticles(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1.0,
                size: Math.random() * 3 + 1,
                color: color
            });
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vy += 0.1; // Gravity
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