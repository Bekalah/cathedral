/**
 * Fractal UI - Interface for fractal generation
 */

class FractalUI {
    constructor(fractalEngine) {
        this.engine = fractalEngine;
        this.currentNode = null;
        this.initUI();
    }
    
    initUI() {
        this.createFractalPanel();
        this.wireControls();
    }
    
    createFractalPanel() {
        const panel = document.createElement('div');
        panel.id = 'fractal-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 800px;
            background: linear-gradient(135deg, rgba(11, 11, 11, 0.95), rgba(44, 10, 82, 0.95));
            border: 2px solid var(--gold-blavatsky, #C8A44D);
            border-radius: 15px;
            padding: 20px;
            display: none;
            z-index: 1500;
            backdrop-filter: blur(20px);
            box-shadow: 0 0 40px rgba(200, 164, 77, 0.4);
            font-family: 'Cinzel', serif;
        `;
        
        panel.innerHTML = `
            <h3 style="color: var(--gold-blavatsky, #C8A44D); text-align: center; margin-bottom: 15px;">
                🌀 Fractal Generator
            </h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div>
                    <button id="fractal-visual" class="fractal-btn">🎨 Generate Visual</button>
                    <button id="fractal-architecture" class="fractal-btn">🏛️ Generate Architecture</button>
                    <button id="fractal-narrative" class="fractal-btn">📖 Generate Story</button>
                    <button id="fractal-music" class="fractal-btn">🎵 Generate Music</button>
                </div>
                
                <div id="fractal-preview" style="
                    background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(44, 10, 82, 0.3)); 
                    border: 1px solid var(--gold-blavatsky, #C8A44D); 
                    min-height: 200px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    border-radius: 8px;
                    color: var(--pearl-lemurian, #F5F2EA);
                ">
                    Click a node, then generate...
                </div>
            </div>
            
            <div id="fractal-output" style="
                margin-top: 15px; 
                padding: 15px; 
                background: rgba(0,0,0,0.5); 
                border-radius: 8px; 
                max-height: 200px; 
                overflow-y: auto; 
                display: none;
                border: 1px solid rgba(122, 51, 255, 0.3);
                color: var(--pearl-lemurian, #F5F2EA);
            ">
            </div>
            
            <div style="text-align: center; margin-top: 15px; font-size: 0.9rem; opacity: 0.8;">
                Press <strong>F</strong> to toggle • Click any node orb to select
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .fractal-btn {
                width: 100%;
                margin: 5px 0;
                padding: 12px;
                background: linear-gradient(135deg, rgba(122, 51, 255, 0.2), rgba(200, 164, 77, 0.2));
                border: 1px solid var(--violet-core, #7A33FF);
                color: var(--gold-blavatsky, #C8A44D);
                cursor: pointer;
                font-family: 'Cinzel', serif;
                border-radius: 8px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            .fractal-btn:hover {
                background: linear-gradient(135deg, rgba(122, 51, 255, 0.4), rgba(200, 164, 77, 0.4));
                transform: scale(1.02);
                box-shadow: 0 0 15px rgba(122, 51, 255, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
    
    wireControls() {
        // Listen for node clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('node-orb') || 
                e.target.classList.contains('sacred-number') ||
                e.target.dataset.nodeId) {
                const nodeId = parseInt(e.target.dataset.nodeId || e.target.dataset.number || e.target.textContent);
                this.selectNode(nodeId);
            }
        });
        
        // Fractal generation buttons
        document.getElementById('fractal-visual')?.addEventListener('click', () => {
            this.generateVisual();
        });
        
        document.getElementById('fractal-architecture')?.addEventListener('click', () => {
            this.generateArchitecture();
        });
        
        document.getElementById('fractal-narrative')?.addEventListener('click', () => {
            this.generateNarrative();
        });
        
        document.getElementById('fractal-music')?.addEventListener('click', () => {
            this.generateMusic();
        });
        
        // Toggle with 'F' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'f') {
                this.togglePanel();
            }
        });
    }
    
    selectNode(nodeId) {
        // Create a mock node if we don't have data
        const node = this.createMockNode(nodeId);
        this.currentNode = node;
        this.togglePanel(true);
        
        // Show node info
        const preview = document.getElementById('fractal-preview');
        if (preview) {
            preview.innerHTML = `
                <div style="text-align: center; color: var(--gold-blavatsky, #C8A44D);">
                    <h4>${node.name}</h4>
                    <p>Fractal: ${node.fractal?.type || 'Mandelbrot'}</p>
                    <p>Element: ${node.element || 'Fire'}</p>
                    <p>Recursion Depth: ${node.fractal?.recursionDepth || 5}</p>
                    <p style="font-size: 0.8rem; opacity: 0.8;">Click generate buttons →</p>
                </div>
            `;
        }
    }
    
    createMockNode(nodeId) {
        const elements = ['Fire', 'Water', 'Earth', 'Air', 'Aether'];
        const fractals = ['Mandelbrot', 'Julia', 'Fibonacci', 'Koch', 'Dragon'];
        const colors = ['#FF4500', '#1E3A8A', '#0BDA51', '#4166F5', '#D4AF37'];
        
        return {
            id: nodeId,
            name: `Node ${nodeId}`,
            element: elements[nodeId % elements.length],
            color: colors[nodeId % colors.length],
            solfeggio: 396 + (nodeId * 111),
            fractal: {
                type: fractals[nodeId % fractals.length],
                recursionDepth: 3 + (nodeId % 5),
                selfSimilarityRatio: 2 + (nodeId % 3),
                parameters: {
                    centerReal: -0.5,
                    centerImag: 0,
                    zoom: 1.0,
                    maxIterations: 100
                }
            },
            fractalApplications: {
                architecture: {
                    pattern: "Sacred geometric chambers",
                    recursion: "Self-similar at all scales",
                    layout: "Spiral expanding outward"
                },
                narrative: {
                    structure: "Hero's journey",
                    recursion: "Story within story",
                    beats: "Each chapter mirrors whole"
                },
                music: {
                    rhythm: "5/4 time signature",
                    pattern: "Polyrhythmic complexity",
                    selfSimilarity: "Melodic fractals"
                }
            }
        };
    }
    
    generateVisual() {
        if (!this.currentNode) {
            alert('Select a node first (click any orb)');
            return;
        }
        
        const imageData = this.engine.renderFractal(this.currentNode, 400, 400);
        
        const preview = document.getElementById('fractal-preview');
        if (preview) {
            preview.innerHTML = `<img src="${imageData}" style="max-width: 100%; border-radius: 8px;" alt="Fractal">`;
        }
        
        this.showOutput(`
            <h4>🎨 Fractal Visual Generated</h4>
            <p><strong>Type:</strong> ${this.currentNode.fractal?.type}</p>
            <p><strong>Depth:</strong> ${this.currentNode.fractal?.recursionDepth} levels</p>
            <p><strong>Element:</strong> ${this.currentNode.element}</p>
            <p style="font-size: 0.8rem; opacity: 0.8;">Right-click image to save</p>
        `);
    }
    
    generateArchitecture() {
        if (!this.currentNode) {
            alert('Select a node first');
            return;
        }
        
        const arch = this.engine.generateArchitecture(this.currentNode, 10);
        
        this.showOutput(`
            <h4>🏛️ Fractal Architecture Generated</h4>
            <p><strong>Layout Type:</strong> ${arch.layout.type}</p>
            <p><strong>Total Rooms:</strong> ${arch.layout.rooms.length}</p>
            <p><strong>Pattern:</strong> ${this.currentNode.fractalApplications?.architecture?.pattern}</p>
            <p><strong>Recursion:</strong> ${this.currentNode.fractalApplications?.architecture?.recursion}</p>
            
            <details style="margin-top: 10px;">
                <summary style="cursor: pointer; color: var(--gold-blavatsky, #C8A44D);">View Room Details</summary>
                <div style="max-height: 150px; overflow-y: auto; margin-top: 5px;">
                    ${arch.layout.rooms.slice(0, 10).map(r => `
                        <div style="padding: 5px; border-bottom: 1px solid rgba(122, 51, 255, 0.2);">
                            Room ${r.id}: ${r.type} (${r.size.toFixed(1)}m)
                        </div>
                    `).join('')}
                    ${arch.layout.rooms.length > 10 ? '<p>...and ' + (arch.layout.rooms.length - 10) + ' more rooms</p>' : ''}
                </div>
            </details>
        `);
        
        // Visualize layout
        this.visualizeLayout(arch.layout);
    }
    
    visualizeLayout(layout) {
        const preview = document.getElementById('fractal-preview');
        if (!preview) return;
        
        // Create simple SVG visualization
        const bounds = this.calculateBounds(layout.rooms);
        const scale = 300 / Math.max(bounds.width || 100, bounds.height || 100);
        
        const svg = `
            <svg width="300" height="300" style="border: 1px solid var(--gold-blavatsky, #C8A44D);">
                ${layout.rooms.map(r => `
                    <circle 
                        cx="${(r.position.x - bounds.minX) * scale + 20}" 
                        cy="${(r.position.y - bounds.minY) * scale + 20}" 
                        r="${Math.max(2, r.size * scale * 0.1)}" 
                        fill="rgba(122, 51, 255, 0.3)" 
                        stroke="var(--gold-blavatsky, #C8A44D)" 
                        stroke-width="1"
                    />
                `).join('')}
            </svg>
        `;
        
        preview.innerHTML = svg;
    }
    
    calculateBounds(rooms) {
        if (!rooms.length) return { minX: 0, maxX: 100, minY: 0, maxY: 100, width: 100, height: 100 };
        
        const xs = rooms.map(r => r.position.x);
        const ys = rooms.map(r => r.position.y);
        
        return {
            minX: Math.min(...xs),
            maxX: Math.max(...xs),
            minY: Math.min(...ys),
            maxY: Math.max(...ys),
            width: Math.max(...xs) - Math.min(...xs) || 100,
            height: Math.max(...ys) - Math.min(...ys) || 100
        };
    }
    
    generateNarrative() {
        if (!this.currentNode) {
            alert('Select a node first');
            return;
        }
        
        const narrative = this.engine.generateNarrative(this.currentNode, 'medium');
        
        this.showOutput(`
            <h4>📖 Fractal Narrative Generated</h4>
            <p><strong>Structure:</strong> ${narrative.structure}</p>
            <p><strong>Recursion:</strong> ${this.currentNode.fractalApplications?.narrative?.recursion}</p>
            
            <p style="margin-top: 10px;"><strong>Story Beats:</strong></p>
            <ul style="margin-left: 20px; line-height: 1.6;">
                ${narrative.recursiveBeats.map(beat => `
                    <li>Level ${beat.level}: ${beat.description} (${beat.recursion})</li>
                `).join('')}
            </ul>
            
            <p style="margin-top: 10px; font-style: italic; color: var(--violet-core, #7A33FF);">
                "${this.currentNode.fractalApplications?.narrative?.beats || 'Each chapter mirrors the whole journey'}"
            </p>
        `);
    }
    
    generateMusic() {
        if (!this.currentNode) {
            alert('Select a node first');
            return;
        }
        
        const music = this.engine.generateMusic(this.currentNode);
        
        this.showOutput(`
            <h4>🎵 Fractal Music Generated</h4>
            <p><strong>Time Signature:</strong> ${music.timeSignature}</p>
            <p><strong>BPM:</strong> ${music.rhythmPattern.bpm}</p>
            <p><strong>Pattern:</strong> ${music.rhythmPattern.notation}</p>
            <p><strong>Self-Similarity:</strong> ${this.currentNode.fractalApplications?.music?.selfSimilarity}</p>
            
            <div style="margin-top: 10px; padding: 10px; background: rgba(122, 51, 255, 0.1); border-radius: 4px;">
                <strong>Rhythm Visualization:</strong>
                <div style="font-family: monospace; font-size: 18px; margin-top: 5px; color: var(--gold-blavatsky, #C8A44D);">
                    ${music.rhythmPattern.notation}
                </div>
            </div>
        `);
        
        // Play the rhythm if audio engine is available
        if (window.audioEngine && this.currentNode.solfeggio) {
            window.audioEngine.playTone(this.currentNode.solfeggio, 1.0);
        }
    }
    
    showOutput(content) {
        const output = document.getElementById('fractal-output');
        if (!output) return;
        
        output.style.display = 'block';
        output.innerHTML = content;
        output.scrollTop = 0;
    }
    
    togglePanel(forceShow = false) {
        const panel = document.getElementById('fractal-panel');
        if (panel) {
            if (forceShow) {
                panel.style.display = 'block';
            } else {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        }
    }
}

// Initialize
window.addEventListener('load', () => {
    if (window.FractalEngine) {
        const engine = new FractalEngine();
        const ui = new FractalUI(engine);
        window.fractalEngine = engine;
        window.fractalUI = ui;
        console.log('🌀 Fractal Engine ready! Press F to toggle panel');
    }
});

// Export
if (typeof window !== 'undefined') {
    window.FractalUI = FractalUI;
}