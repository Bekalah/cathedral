/**
 * Creative UI - Interface for generative systems
 */

class CreativeUI {
    constructor(creativeEngine) {
        this.engine = creativeEngine;
        this.selectedNodes = [];
        this.initUI();
    }

    initUI() {
        this.createCreativePanel();
        this.setupNodeSelection();
        this.wireControls();
    }

    createCreativePanel() {
        const panel = document.createElement('div');
        panel.id = 'creative-panel';
        panel.style.cssText = `
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 350px;
            max-height: 80vh;
            overflow-y: auto;
            background: rgba(0, 20, 40, 0.95);
            border: 2px solid #0ff;
            border-radius: 8px;
            padding: 20px;
            font-family: 'Courier New', monospace;
            color: #0ff;
            display: none;
        `;

        panel.innerHTML = `
            <h3>🎨 Creative Engine</h3>

            <div style="margin: 15px 0;">
                <strong>Selected Nodes:</strong>
                <div id="selected-nodes" style="min-height: 40px; border: 1px solid #0ff; padding: 8px; margin-top: 5px;">
                    Click orbs to select...
                </div>
            </div>

            <div style="margin: 15px 0;">
                <strong>Harmonic Analysis:</strong>
                <div id="harmony-display" style="font-size: 11px; line-height: 1.6; margin-top: 5px;">
                    Select 2+ nodes to analyze
                </div>
            </div>

            <div style="margin: 15px 0;">
                <button id="gen-story" class="creative-btn">📖 Generate Story</button>
                <button id="gen-quest" class="creative-btn">⚔️ Design Quest</button>
                <button id="gen-space" class="creative-btn">🏛️ Design Space</button>
                <button id="gen-symbol" class="creative-btn">✨ Fuse Symbols</button>
            </div>

            <div id="output-display" style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.5); border-radius: 4px; max-height: 300px; overflow-y: auto; display: none;">
            </div>

            <button id="clear-selection" style="width: 100%; margin-top: 10px; padding: 8px; background: rgba(255,0,0,0.3); border: 1px solid #f00; color: #f00; cursor: pointer; border-radius: 4px;">
                Clear Selection
            </button>
        `;

        document.getElementById('cathedral-container')?.appendChild(panel);

        // Add CSS for buttons
        const style = document.createElement('style');
        style.textContent = `
            .creative-btn {
                width: 48%;
                margin: 2px;
                padding: 8px;
                background: rgba(0, 255, 255, 0.2);
                border: 1px solid #0ff;
                color: #0ff;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                border-radius: 4px;
                font-size: 11px;
            }
            .creative-btn:hover {
                background: rgba(0, 255, 255, 0.4);
            }
        `;
        document.head.appendChild(style);
    }

    setupNodeSelection() {
        // Modify orb click to add to selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('node-orb')) {
                const nodeId = parseInt(e.target.dataset.nodeId);
                this.toggleNodeSelection(nodeId);
            }
        });

        // Toggle panel with 'C' key
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'c') {
                this.togglePanel();
            }
        });
    }

    toggleNodeSelection(nodeId) {
        const index = this.selectedNodes.indexOf(nodeId);
        const orb = document.querySelector(`[data-node-id="${nodeId}"]`);

        if (index > -1) {
            this.selectedNodes.splice(index, 1);
            if (orb) orb.style.border = '2px solid rgba(0, 255, 255, 0.3)';
        } else {
            this.selectedNodes.push(nodeId);
            if (orb) orb.style.border = '3px solid #0ff';
        }

        this.updateSelectionDisplay();
        this.updateHarmonyDisplay();
    }

    updateSelectionDisplay() {
        const display = document.getElementById('selected-nodes');
        if (!display) return;

        if (this.selectedNodes.length === 0) {
            display.textContent = 'Click orbs to select...';
        } else {
            const nodeNames = this.selectedNodes.map(id => {
                const node = window.codexNodes?.find(n => n.id === id);
                return node ? `${node.id}: ${node.name}` : id;
            });
            display.innerHTML = nodeNames.map(n => `<div style="padding: 2px;">${n}</div>`).join('');
        }
    }

    updateHarmonyDisplay() {
        const display = document.getElementById('harmony-display');
        if (!display || this.selectedNodes.length < 2) {
            display.textContent = 'Select 2+ nodes to analyze';
            return;
        }

        const nodes = this.selectedNodes.map(id => window.codexNodes?.find(n => n.id === id)).filter(Boolean);
        if (nodes.length < 2) return;

        const harmonic = new HarmonicResolver();
        const harmony = harmonic.analyzeHarmony(nodes);

        display.innerHTML = `
            <div>Relationship: <strong>${harmony.relationship}</strong></div>
            <div>Consonance: ${harmony.consonanceScore.toFixed(1)}/10</div>
            <div>Overall Harmony: ${harmony.overallHarmony}/10</div>
            <div>Elements: ${Object.keys(harmony.elementalBalance.elements).join(', ')}</div>
            <div style="margin-top: 8px; padding: 8px; background: rgba(0,255,255,0.1);">
                ${harmony.freqRatios.map(r => `${r.simplified} (${r.type})`).join(', ')}
            </div>
        `;
    }

    wireControls() {
        document.getElementById('gen-story')?.addEventListener('click', () => {
            this.generateStory();
        });

        document.getElementById('gen-quest')?.addEventListener('click', () => {
            this.generateQuest();
        });

        document.getElementById('gen-space')?.addEventListener('click', () => {
            this.generateSpace();
        });

        document.getElementById('gen-symbol')?.addEventListener('click', () => {
            this.generateSymbol();
        });

        document.getElementById('clear-selection')?.addEventListener('click', () => {
            this.clearSelection();
        });
    }

    generateStory() {
        if (this.selectedNodes.length < 2) {
            alert('Select at least 2 nodes to generate a story');
            return;
        }

        const story = this.engine.generateStory(this.selectedNodes);
        this.displayOutput('Story Generated', `
            <h4>${story.title}</h4>
            <p><strong>Themes:</strong> ${story.themes.join(', ')}</p>
            <p><strong>Structure:</strong> ${story.structure}</p>
            <div style="margin-top: 10px; line-height: 1.6;">
                ${story.fullText}
            </div>
        `);
    }

    generateQuest() {
        if (this.selectedNodes.length < 2) {
            alert('Select at least 2 nodes to design a quest');
            return;
        }

        const quest = this.engine.designQuest(this.selectedNodes);
        this.displayOutput('Quest Designed', `
            <h4>${quest.questType}</h4>
            <p><strong>Difficulty:</strong> ${quest.difficulty}</p>
            <p><strong>Objectives:</strong></p>
            <ul style="margin-left: 20px;">
                ${quest.objectives.map(o => `<li>${o.description} (${o.location})</li>`).join('')}
            </ul>
            <p><strong>Abilities Unlocked:</strong></p>
            ${quest.abilities.slice(0, 3).map(a => `
                <div style="margin: 5px 0; padding: 5px; background: rgba(0,255,255,0.1);">
                    ${a.name} - ${a.effect}
                </div>
            `).join('')}
        `);
    }

    generateSpace() {
        if (this.selectedNodes.length < 2) {
            alert('Select at least 2 nodes to design a space');
            return;
        }

        const space = this.engine.designSpace(this.selectedNodes);
        this.displayOutput('Space Designed', `
            <h4>${space.layout.shape} Chamber</h4>
            <p>${space.layout.description}</p>
            <p><strong>Dimensions:</strong> ${space.layout.dimensions}</p>
            <p><strong>Lighting:</strong> ${space.lighting.quality}</p>
            <p><strong>Materials:</strong> ${space.materials.all.join(', ')}</p>
            <p><strong>Atmosphere:</strong> ${space.atmosphere.mood}</p>
            <p><strong>Acoustics:</strong> ${space.acoustics.recommendation}</p>
        `);
    }

    generateSymbol() {
        if (this.selectedNodes.length < 2) {
            alert('Select at least 2 nodes to fuse symbols');
            return;
        }

        const symbol = this.engine.fuseSymbols(this.selectedNodes);
        this.displayOutput('Symbol Fused', `
            <h4>${symbol.fusedSymbol}</h4>
            <div style="margin: 10px 0;">
                ${symbol.svgCode}
            </div>
            <p><strong>Meaning:</strong> ${symbol.meaning.synthesis}</p>
            <p><strong>Harmonic Significance:</strong> ${symbol.meaning.harmonicMeaning}</p>
            <p><strong>Suggested Use:</strong> ${symbol.meaning.usage}</p>
        `);
    }

    displayOutput(title, content) {
        const display = document.getElementById('output-display');
        if (!display) return;

        display.style.display = 'block';
        display.innerHTML = `
            <h4 style="color: #0ff; margin-bottom: 10px;">${title}</h4>
            ${content}
        `;

        // Scroll to output
        display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    clearSelection() {
        this.selectedNodes.forEach(id => {
            const orb = document.querySelector(`[data-node-id="${id}"]`);
            if (orb) orb.style.border = '2px solid rgba(0, 255, 255, 0.3)';
        });
        this.selectedNodes = [];
        this.updateSelectionDisplay();
        this.updateHarmonyDisplay();

        const display = document.getElementById('output-display');
        if (display) display.style.display = 'none';
    }

    togglePanel() {
        const panel = document.getElementById('creative-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }
}

// Initialize when ready
window.addEventListener('load', () => {
    if (window.codexNodes && window.CreativeEngine) {
        const engine = new CreativeEngine(window.codexNodes);
        const ui = new CreativeUI(engine);
        window.creativeEngine = engine;
        window.creativeUI = ui;
        console.log('🎨 Creative Engine ready! Press C to toggle panel');
    }
});
