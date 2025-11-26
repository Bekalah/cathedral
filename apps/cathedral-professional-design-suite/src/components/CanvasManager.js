/**
 * CanvasManager.js - Trinity Architecture Canvas Management
 * Cathedral Professional Design Suite
 * 
 * Handles the central canvas for the Trinity Architecture integration
 * Brain (Cosmogenesis) + Soul (Circuitum99) + Body (Stone Grimoire)
 */

export class CanvasManager {
    constructor(canvasId = 'design-canvas') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.isInitialized = false;
        this.sacredGeometryActive = false;
        this.trinityState = {
            brain: false,
            soul: false,
            body: false
        };
        
        this.init();
    }

    async init() {
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        // Set up high DPI support
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        this.setupEventListeners();
        this.drawInitialState();
        this.isInitialized = true;
        
        console.log('🧠💫🪨 Canvas Manager initialized - Trinity Architecture ready');
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        console.log(`🎨 Canvas interaction at ${x}, ${y}`);
    }

    handleMouseMove(e) {
        // Handle mouse movement for real-time drawing
    }

    handleMouseUp(e) {
        // Handle mouse release
    }

    handleWheel(e) {
        e.preventDefault();
        // Handle zoom functionality
    }

    drawInitialState() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawSacredGeometry();
        this.updateWorkspaceInfo();
    }

    drawSacredGeometry() {
        const centerX = this.canvas.width / 4;
        const centerY = this.canvas.height / 2;
        
        // Golden Ratio Spiral
        this.drawGoldenRatioSpiral(centerX, centerY);
        
        // Fibonacci pattern
        this.drawFibonacciPattern(centerX + 200, centerY);
    }

    drawGoldenRatioSpiral(centerX, centerY) {
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        let radius = 10;
        let angle = 0;
        const goldenAngle = Math.PI * 0.618; // φ - golden ratio
        
        for (let i = 0; i < 500; i++) {
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
            
            angle += goldenAngle;
            radius += 0.5;
            
            if (radius > 100) break;
        }
        
        this.ctx.stroke();
    }

    drawFibonacciPattern(centerX, centerY) {
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21];
        
        fibonacci.forEach((num, index) => {
            const size = num * 10;
            this.ctx.strokeStyle = `hsl(${index * 45}, 70%, 60%)`;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                centerX + index * 15,
                centerY + index * 15,
                size,
                size
            );
        });
    }

    activateTrinityComponent(component) {
        if (component === 'brain') this.trinityState.brain = true;
        if (component === 'soul') this.trinityState.soul = true;
        if (component === 'body') this.trinityState.body = true;
        
        console.log('🧠💫🪨 Trinity component activated:', component);
        this.updateTrinityVisualization();
    }

    updateTrinityVisualization() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.trinityState.brain) this.drawBrainIndicator();
        if (this.trinityState.soul) this.drawSoulIndicator();
        if (this.trinityState.body) this.drawBodyIndicator();
        
        this.drawSacredGeometry();
    }

    drawBrainIndicator() {
        const x = 50, y = 50;
        this.ctx.fillStyle = '#4A90E2';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('🧠 BRAIN', x, y);
    }

    drawSoulIndicator() {
        const x = 50, y = 80;
        this.ctx.fillStyle = '#E24A90';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('💫 SOUL', x, y);
    }

    drawBodyIndicator() {
        const x = 50, y = 110;
        this.ctx.fillStyle = '#90E24A';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('🪨 BODY', x, y);
    }

    updateWorkspaceInfo() {
        const workspaceInfo = document.getElementById('workspace-info');
        if (workspaceInfo) {
            const trinityCount = Object.values(this.trinityState).filter(Boolean).length;
            workspaceInfo.textContent = `Workspace: Trinity (${trinityCount}/3 active)`;
        }
    }

    getCanvasData() {
        return {
            width: this.canvas.width,
            height: this.canvas.height,
            trinityState: this.trinityState,
            sacredGeometryActive: this.sacredGeometryActive
        };
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawInitialState();
    }
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
    window.CanvasManager = CanvasManager;
}