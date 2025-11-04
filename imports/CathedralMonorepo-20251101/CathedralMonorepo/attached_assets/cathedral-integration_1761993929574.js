/**
 * Cathedral Bridge - Connects existing cathedral-helper.js with new interactive system
 * Drop this file in your repo and include it after the interactive app loads
 */

class CathedralBridge {
    constructor() {
        this.audioEngine = null;
        this.visualEngine = null;
        this.narrativeEngine = null;
        this.init();
    }

    init() {
        console.log('⧖ Cathedral Bridge initializing...');
        
        // Wait for DOM and Audio Context
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.connect());
        } else {
            this.connect();
        }
    }

    connect() {
        // Integrate with existing cathedral-helper if it exists
        if (window.cathedralHelper) {
            this.integrateWithHelper();
        }

        // Setup keyboard shortcuts
        this.setupKeyboardControls();
        
        // Add advanced features toggle
        this.addAdvancedControls();
        
        // Enable developer mode features
        this.enableDevMode();
    }

    integrateWithHelper() {
        console.log('✅ Found cathedral-helper.js, integrating...');
        
        // If cathedral-helper has ND-safe features, respect them
        if (window.cathedralHelper.ndSafe) {
            this.enableAccessibilityMode();
        }

        // Sync any existing data
        if (window.cathedralHelper.codexData) {
            console.log('📚 Loading Codex data from helper...');
            // Merge with current nodes
            this.mergeCodexData(window.cathedralHelper.codexData);
        }
    }

    setupKeyboardControls() {
        const shortcuts = {
            'Space': () => this.triggerRandom(),
            'Escape': () => stopAll(),
            'Enter': () => document.getElementById('play-sequence')?.click(),
            '1-9': (num) => this.triggerNodeByIndex(num - 1),
            's': () => this.saveCurrentState(),
            'h': () => this.toggleHelp(),
            'm': () => this.toggleMute(),
            'f': () => this.toggleFullscreen()
        };

        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            
            // Number keys
            if (key >= '1' && key <= '9' && !e.ctrlKey && !e.metaKey) {
                const index = parseInt(key) - 1;
                if (codexNodes[index]) {
                    triggerNode(codexNodes[index]);
                }
                return;
            }

            // Special keys
            switch(key) {
                case ' ':
                    e.preventDefault();
                    this.triggerRandom();
                    break;
                case 'escape':
                    if (typeof stopAll === 'function') stopAll();
                    break;
                case 'enter':
                    document.getElementById('play-sequence')?.click();
                    break;
                case 's':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.saveCurrentState();
                    }
                    break;
                case 'h':
                    this.toggleHelp();
                    break;
                case 'm':
                    this.toggleMute();
                    break;
                case 'f':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleFullscreen();
                    }
                    break;
            }
        });

        console.log('⌨️ Keyboard shortcuts enabled');
    }

    addAdvancedControls() {
        const advancedPanel = document.createElement('div');
        advancedPanel.id = 'advanced-controls';
        advancedPanel.style.cssText = `
            position: absolute;
            bottom: 170px;
            right: 20px;
            background: rgba(0, 20, 40, 0.9);
            padding: 15px;
            border: 2px solid #0ff;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            color: #0ff;
            font-size: 12px;
        `;

        advancedPanel.innerHTML = `
            <h4>🔬 Advanced Controls</h4>
            <label style="display: block; margin: 8px 0;">
                <input type="range" id="master-volume" min="0" max="100" value="30" style="width: 150px;">
                <span id="vol-display">30%</span> Volume
            </label>
            <label style="display: block; margin: 8px 0;">
                <input type="range" id="reverb-amount" min="0" max="100" value="30" style="width: 150px;">
                <span id="rev-display">30%</span> Reverb
            </label>
            <label style="display: block; margin: 8px 0;">
                <input type="checkbox" id="auto-sequence"> Auto Sequence
            </label>
            <label style="display: block; margin: 8px 0;">
                <input type="checkbox" id="enable-midi"> MIDI Input
            </label>
            <button id="export-audio" style="margin-top: 10px; padding: 5px 10px; background: rgba(0,255,255,0.2); border: 1px solid #0ff; color: #0ff; cursor: pointer;">
                💾 Export Recording
            </button>
        `;

        document.getElementById('cathedral-container')?.appendChild(advancedPanel);

        // Wire up controls
        this.wireAdvancedControls();
    }

    wireAdvancedControls() {
        // Volume control
        const volumeSlider = document.getElementById('master-volume');
        const volumeDisplay = document.getElementById('vol-display');
        
        if (volumeSlider && volumeDisplay && window.masterGain) {
            volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                masterGain.gain.value = value / 100;
                volumeDisplay.textContent = `${value}%`;
            });
        }

        // Reverb amount (would need reverb node in main app)
        const reverbSlider = document.getElementById('reverb-amount');
        const reverbDisplay = document.getElementById('rev-display');
        
        if (reverbSlider && reverbDisplay) {
            reverbSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                reverbDisplay.textContent = `${value}%`;
                // TODO: Wire to actual reverb send level
            });
        }

        // Auto sequence
        const autoSeq = document.getElementById('auto-sequence');
        if (autoSeq) {
            autoSeq.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.startAutoSequence();
                } else {
                    this.stopAutoSequence();
                }
            });
        }

        // MIDI input
        const midiEnable = document.getElementById('enable-midi');
        if (midiEnable) {
            midiEnable.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.enableMIDI();
                } else {
                    this.disableMIDI();
                }
            });
        }

        // Export recording
        const exportBtn = document.getElementById('export-audio');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportAudio());
        }
    }

    enableDevMode() {
        // Add FPS counter
        const fpsCounter = document.createElement('div');
        fpsCounter.id = 'fps-counter';
        fpsCounter.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #0f0;
            padding: 5px 10px;
            font-family: monospace;
            font-size: 12px;
            border: 1px solid #0f0;
        `;
        document.getElementById('cathedral-container')?.appendChild(fpsCounter);

        let lastTime = performance.now();
        let frames = 0;

        const updateFPS = () => {
            frames++;
            const now = performance.now();
            if (now >= lastTime + 1000) {
                fpsCounter.textContent = `FPS: ${frames}`;
                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(updateFPS);
        };
        updateFPS();

        // Add console commands
        window.cathedral = {
            triggerNode: (id) => {
                const node = codexNodes.find(n => n.id === id);
                if (node) triggerNode(node);
            },
            stopAll: () => stopAll(),
            listNodes: () => console.table(codexNodes),
            setVolume: (v) => masterGain.gain.value = v,
            exportState: () => this.saveCurrentState(),
            loadSpectral: (url) => this.loadSpectralImage(url)
        };

        console.log('🛠️ Dev mode enabled. Try: cathedral.listNodes()');
    }

    // Auto-sequence mode
    startAutoSequence() {
        this.autoSeqInterval = setInterval(() => {
            const node = codexNodes[Math.floor(Math.random() * codexNodes.length)];
            if (typeof triggerNode === 'function') {
                triggerNode(node);
            }
        }, 2000);
        console.log('🎵 Auto-sequence started');
    }

    stopAutoSequence() {
        if (this.autoSeqInterval) {
            clearInterval(this.autoSeqInterval);
            this.autoSeqInterval = null;
        }
        console.log('🎵 Auto-sequence stopped');
    }

    // MIDI support
    async enableMIDI() {
        if (!navigator.requestMIDIAccess) {
            alert('MIDI not supported in this browser');
            return;
        }

        try {
            const access = await navigator.requestMIDIAccess();
            console.log('🎹 MIDI enabled');
            
            access.inputs.forEach(input => {
                input.onmidimessage = (e) => {
                    const [command, note, velocity] = e.data;
                    
                    // Note on (144 = 0x90)
                    if (command === 144 && velocity > 0) {
                        // Map MIDI notes to Codex nodes
                        const nodeIndex = note % codexNodes.length;
                        const node = codexNodes[nodeIndex];
                        if (node && typeof triggerNode === 'function') {
                            triggerNode(node);
                        }
                    }
                };
            });
        } catch (err) {
            console.error('MIDI error:', err);
            alert('Could not access MIDI devices');
        }
    }

    disableMIDI() {
        // Would need to store MIDI access to properly disconnect
        console.log('🎹 MIDI disabled');
    }

    // Save/Load state
    saveCurrentState() {
        const state = {
            timestamp: Date.now(),
            activeNodes: Array.from(activeNodes?.keys() || []),
            volume: masterGain?.gain?.value || 0.3,
            // Add more state as needed
        };

        const json = JSON.stringify(state, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cathedral-state-${Date.now()}.json`;
        a.click();
        
        console.log('💾 State saved', state);
    }

    // Export audio recording
    exportAudio() {
        alert('Audio export coming soon! This will record your session and save as WAV.');
        // TODO: Implement MediaRecorder API capture
    }

    // Spectral image loader
    async loadSpectralImage(url) {
        alert(`Spectral mode: Would load ${url} and convert to audio`);
        // TODO: Integrate SpectralSynth from previous artifacts
    }

    // Helper functions
    triggerRandom() {
        if (typeof codexNodes !== 'undefined' && codexNodes.length > 0) {
            const node = codexNodes[Math.floor(Math.random() * codexNodes.length)];
            if (typeof triggerNode === 'function') {
                triggerNode(node);
            }
        }
    }

    triggerNodeByIndex(index) {
        if (typeof codexNodes !== 'undefined' && codexNodes[index]) {
            if (typeof triggerNode === 'function') {
                triggerNode(codexNodes[index]);
            }
        }
    }

    toggleHelp() {
        const helpPanel = document.getElementById('help-panel') || this.createHelpPanel();
        helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
    }

    createHelpPanel() {
        const help = document.createElement('div');
        help.id = 'help-panel';
        help.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 20, 40, 0.95);
            padding: 30px;
            border: 3px solid #0ff;
            border-radius: 8px;
            max-width: 600px;
            z-index: 1000;
            font-family: 'Courier New', monospace;
            color: #0ff;
        `;

        help.innerHTML = `
            <h2>⌨️ Keyboard Shortcuts</h2>
            <ul style="list-style: none; padding: 0;">
                <li><strong>1-9</strong> - Trigger nodes 1-9</li>
                <li><strong>Space</strong> - Random node</li>
                <li><strong>Enter</strong> - Play sequence</li>
                <li><strong>Escape</strong> - Stop all</li>
                <li><strong>M</strong> - Mute/Unmute</li>
                <li><strong>H</strong> - Toggle this help</li>
                <li><strong>Ctrl+S</strong> - Save state</li>
                <li><strong>Ctrl+F</strong> - Fullscreen</li>
            </ul>
            <button onclick="this.parentElement.style.display='none'" 
                style="margin-top: 15px; padding: 8px 15px; background: rgba(0,255,255,0.2); border: 1px solid #0ff; color: #0ff; cursor: pointer;">
                Close
            </button>
        `;

        document.getElementById('cathedral-container')?.appendChild(help);
        return help;
    }

    toggleMute() {
        if (window.masterGain) {
            const isMuted = masterGain.gain.value === 0;
            masterGain.gain.value = isMuted ? 0.3 : 0;
            console.log(isMuted ? '🔊 Unmuted' : '🔇 Muted');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    enableAccessibilityMode() {
        console.log('♿ Accessibility mode enabled');
        // Reduce particle count
        if (window.particles) {
            window.particles.length = Math.min(window.particles.length, 30);
        }
        // Add aria labels
        document.querySelectorAll('.node-orb').forEach(orb => {
            const nodeId = orb.dataset.nodeId;
            const node = codexNodes?.find(n => n.id == nodeId);
            if (node) {
                orb.setAttribute('aria-label', `Trigger ${node.name}`);
                orb.setAttribute('role', 'button');
            }
        });
    }

    mergeCodexData(externalData) {
        // Merge external Codex data with current nodes
        if (typeof codexNodes !== 'undefined') {
            externalData.forEach(ext => {
                const existing = codexNodes.find(n => n.id === ext.id);
                if (existing) {
                    Object.assign(existing, ext);
                } else {
                    codexNodes.push(ext);
                }
            });
            console.log(`📚 Merged ${externalData.length} nodes`);
        }
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.cathedralBridge = new CathedralBridge();
}

export default CathedralBridge;