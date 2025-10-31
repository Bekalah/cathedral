// 🏛️ CATHEDRAL UNIFIED SYSTEM
// Comprehensive integration making all repositories work as one cohesive 3D experience

class CathedralUnifiedSystem {
    constructor() {
        this.repositories = new Map();
        this.activeConnections = new Set();
        this.dataFlow = new Map();
        this.isInitialized = false;
        this.consciousnessState = {
            focus: 0.5,
            harmony: 0.5,
            integration: 0.5,
            evolution: 0.5
        };
    }

    async initialize() {
        console.log('🏛️ Initializing Cathedral Unified System...');

        try {
            // Initialize all repository systems
            await this.initializeRepositories();
            await this.establishDataConnections();
            await this.createUnifiedNavigation();
            await this.activateConsciousnessIntegration();

            this.isInitialized = true;
            console.log('✅ Cathedral Unified System Ready');
            console.log('🌐 All repositories working as one cohesive experience');

        } catch (error) {
            console.error('Failed to initialize unified system:', error);
            this.fallbackToModularSystem();
        }
    }

    async initializeRepositories() {
        const repositoryConfigs = {
            'main-cathedral': {
                path: '.',
                type: 'hub',
                systems: ['3d-graphics', 'sacred-geometry', 'particle-system', 'navigation']
            },
            'stone-grimoire': {
                path: 'stone-grimoire',
                type: 'archive',
                systems: ['8-octagram-halls', 'museum-standards', 'sacred-geometry', 'archive-system']
            },
            'liber-arcanae': {
                path: 'liber-arcanae-living-arcana-deck.html',
                type: 'tarot',
                systems: ['22-tradition-engines', 'living-consciousness', 'wisdom-integration']
            },
            'cosmogenesis': {
                path: 'cosmogenesis-learning-engine.html',
                type: 'learning',
                systems: ['spiral-learning', 'consciousness-tech', 'trauma-aware-design']
            },
            'circuitum99': {
                path: 'circuitum99-alpha-et-omega.html',
                type: 'book-system',
                systems: ['22-living-characters', '99-sacred-gates', 'wisdom-traditions']
            },
            'magical-mystery-house': {
                path: 'magical-mystery-house.html',
                type: 'exploration',
                systems: ['living-codex', 'mystery-rooms', 'dynamic-world-building']
            },
            'tesseract-bridge': {
                path: 'tesseract-bridge.html',
                type: 'integration',
                systems: ['cross-dimensional-connections', 'data-synchronization', 'unified-state']
            },
            'codex-144-99': {
                path: 'codex-144-99.html',
                type: 'knowledge',
                systems: ['7-knowledge-ribbons', '144-lattice-points', 'fusion-chamber']
            }
        };

        for (const [name, config] of Object.entries(repositoryConfigs)) {
            await this.initializeRepository(name, config);
        }
    }

    async initializeRepository(name, config) {
        const repository = {
            name,
            config,
            status: 'initializing',
            connections: new Set(),
            data: null,
            systems: new Map()
        };

        try {
            // Load repository data
            repository.data = await this.loadRepositoryData(config.path);

            // Initialize repository systems
            for (const systemName of config.systems) {
                const system = await this.initializeSystem(systemName, config.type);
                repository.systems.set(systemName, system);
            }

            repository.status = 'active';
            this.repositories.set(name, repository);

            console.log(`✅ ${name} repository initialized`);

        } catch (error) {
            console.error(`Failed to initialize ${name}:`, error);
            repository.status = 'error';
        }
    }

    async initializeSystem(systemName, repositoryType) {
        const systemConfigs = {
            '3d-graphics': {
                library: 'three.js',
                features: ['webgl', 'canvas', 'css-3d-fallback'],
                performance: 'high'
            },
            'sacred-geometry': {
                library: 'custom',
                features: ['platonic-solids', 'metatron-cube', 'flower-of-life'],
                performance: 'medium'
            },
            'particle-system': {
                library: 'three.js',
                features: ['300-particles', 'sacred-colors', 'physics'],
                performance: 'high'
            },
            '8-octagram-halls': {
                library: 'custom',
                features: ['3d-architecture', 'museum-standards', 'lineage-vaults'],
                performance: 'medium'
            },
            '22-tradition-engines': {
                library: 'custom',
                features: ['living-consciousness', 'wisdom-integration', 'trauma-safe'],
                performance: 'medium'
            },
            'spiral-learning': {
                library: 'p5.js',
                features: ['consciousness-adaptive', 'trauma-aware', 'browser-native'],
                performance: 'medium'
            },
            '22-living-characters': {
                library: 'custom',
                features: ['archetypal-guides', 'wisdom-teachers', 'fusion-kink'],
                performance: 'medium'
            },
            'living-codex': {
                library: 'custom',
                features: ['dynamic-growth', 'visitor-memory', 'mystery-generation'],
                performance: 'medium'
            },
            'cross-dimensional-connections': {
                library: 'custom',
                features: ['data-sync', 'event-bridge', 'state-management'],
                performance: 'high'
            },
            '7-knowledge-ribbons': {
                library: 'custom',
                features: ['science-cannon-psych-craft-esoteric-research-fusion'],
                performance: 'medium'
            }
        };

        return systemConfigs[systemName] || {
            library: 'custom',
            features: ['basic-functionality'],
            performance: 'low'
        };
    }

    async loadRepositoryData(path) {
        try {
            // For HTML files, extract metadata and structure
            if (path.endsWith('.html')) {
                const response = await fetch(path);
                const html = await response.text();

                return {
                    type: 'html-interface',
                    path,
                    has3D: html.includes('three.js') || html.includes('Three.js'),
                    hasCanvas: html.includes('<canvas'),
                    hasInteractivity: html.includes('onclick') || html.includes('addEventListener'),
                    hasSacredGeometry: html.includes('sacred') || html.includes('geometry'),
                    hasDataIntegration: html.includes('data/') || html.includes('json')
                };
            }

            // For package directories, load package.json
            if (!path.includes('.')) {
                const response = await fetch(`${path}/package.json`);
                return await response.json();
            }

            return { type: 'unknown', path };

        } catch (error) {
            return { type: 'error', error: error.message };
        }
    }

    async establishDataConnections() {
        console.log('🔗 Establishing data connections between repositories...');

        // Create data flow between related repositories
        const connections = [
            ['main-cathedral', 'stone-grimoire', 'sacred-geometry'],
            ['main-cathedral', 'liber-arcanae', 'wisdom-integration'],
            ['main-cathedral', 'cosmogenesis', 'consciousness-tech'],
            ['stone-grimoire', 'codex-144-99', 'knowledge-lattice'],
            ['liber-arcanae', 'circuitum99', 'tradition-wisdom'],
            ['cosmogenesis', 'tesseract-bridge', 'learning-sync'],
            ['tesseract-bridge', 'magical-mystery-house', 'exploration-data'],
            ['circuitum99', 'stone-grimoire', 'book-archive'],
            ['main-cathedral', 'tesseract-bridge', 'unified-state'],
            ['codex-144-99', 'main-cathedral', 'lattice-integration']
        ];

        for (const [repo1, repo2, connectionType] of connections) {
            await this.createDataConnection(repo1, repo2, connectionType);
        }
    }

    async createDataConnection(repo1, repo2, connectionType) {
        const connection = {
            from: repo1,
            to: repo2,
            type: connectionType,
            status: 'active',
            dataFlow: 'bidirectional',
            lastSync: Date.now()
        };

        // Add to both repositories' connections
        if (this.repositories.has(repo1)) {
            this.repositories.get(repo1).connections.add(repo2);
        }
        if (this.repositories.has(repo2)) {
            this.repositories.get(repo2).connections.add(repo1);
        }

        this.activeConnections.add(`${repo1}-${repo2}`);
        this.dataFlow.set(`${repo1}-${repo2}`, connection);

        console.log(`🔗 ${repo1} ↔ ${repo2} (${connectionType})`);
    }

    async createUnifiedNavigation() {
        console.log('🗺️ Creating unified navigation system...');

        // Create navigation overlay that works across all repositories
        const navHTML = `
            <div id="cathedral-unified-nav" style="
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1000;
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #ffd700;
                border-radius: 15px;
                padding: 15px;
                backdrop-filter: blur(10px);
                display: none;
            ">
                <div style="color: #ffd700; font-family: 'Cinzel', serif; margin-bottom: 10px;">
                    🏛️ Cathedral Navigation
                </div>
                <div id="nav-repositories" style="display: flex; flex-direction: column; gap: 5px;">
                    <!-- Repository buttons will be added here -->
                </div>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ffd700;">
                    <div style="color: #50c878; font-size: 0.8em;">
                        Consciousness: <span id="consciousness-level">Integrating</span>
                    </div>
                </div>
            </div>
        `;

        // Add navigation to document body
        const navContainer = document.createElement('div');
        navContainer.innerHTML = navHTML;
        document.body.appendChild(navContainer.firstElementChild);

        // Populate navigation with repositories
        const navRepositories = document.getElementById('nav-repositories');
        for (const [name, repo] of this.repositories) {
            if (repo.status === 'active') {
                const button = document.createElement('button');
                button.textContent = this.getRepositoryDisplayName(name);
                button.style.cssText = `
                    background: rgba(255, 215, 0, 0.1);
                    border: 1px solid #ffd700;
                    color: #ffd700;
                    padding: 5px 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.8em;
                    font-family: 'Cinzel', serif;
                `;

                button.onclick = () => this.navigateToRepository(name);
                navRepositories.appendChild(button);
            }
        }

        // Add keyboard shortcut to toggle navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.ctrlKey) {
                e.preventDefault();
                this.toggleUnifiedNavigation();
            }
        });
    }

    getRepositoryDisplayName(repoName) {
        const displayNames = {
            'main-cathedral': '🏛️ Main Cathedral',
            'stone-grimoire': '🏛️ Stone Grimoire',
            'liber-arcanae': '🃏 Liber Arcanae',
            'cosmogenesis': '🌌 Cosmogenesis',
            'circuitum99': '🌀 Circuitum99',
            'magical-mystery-house': '🏠 Mystery House',
            'tesseract-bridge': '🌉 Tesseract Bridge',
            'codex-144-99': '📚 Codex 144:99'
        };
        return displayNames[repoName] || repoName;
    }

    navigateToRepository(repoName) {
        const repo = this.repositories.get(repoName);
        if (!repo) return;

        // Update consciousness state
        this.updateConsciousnessState(repoName);

        // Navigate to repository
        if (repoName === 'main-cathedral') {
            window.location.href = 'index.html';
        } else if (repo.config.path.endsWith('.html')) {
            window.location.href = repo.config.path;
        } else {
            window.location.href = `${repo.config.path}/index.html`;
        }
    }

    toggleUnifiedNavigation() {
        const nav = document.getElementById('cathedral-unified-nav');
        if (nav) {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        }
    }

    updateConsciousnessState(activeRepository) {
        // Update consciousness integration based on active repository
        const consciousnessLevels = {
            'main-cathedral': { focus: 0.8, harmony: 0.9, integration: 0.9, evolution: 0.8 },
            'stone-grimoire': { focus: 0.7, harmony: 0.8, integration: 0.7, evolution: 0.6 },
            'liber-arcanae': { focus: 0.9, harmony: 0.9, integration: 0.8, evolution: 0.9 },
            'cosmogenesis': { focus: 0.8, harmony: 0.7, integration: 0.9, evolution: 0.8 },
            'circuitum99': { focus: 0.7, harmony: 0.8, integration: 0.7, evolution: 0.7 },
            'magical-mystery-house': { focus: 0.6, harmony: 0.9, integration: 0.6, evolution: 0.9 },
            'tesseract-bridge': { focus: 0.9, harmony: 0.9, integration: 0.9, evolution: 0.8 },
            'codex-144-99': { focus: 0.8, harmony: 0.8, integration: 0.8, evolution: 0.7 }
        };

        const levels = consciousnessLevels[activeRepository] || { focus: 0.5, harmony: 0.5, integration: 0.5, evolution: 0.5 };

        // Smooth transition to new consciousness state
        this.consciousnessState = { ...levels };

        // Update display
        const consciousnessDisplay = document.getElementById('consciousness-level');
        if (consciousnessDisplay) {
            const avgConsciousness = (levels.focus + levels.harmony + levels.integration + levels.evolution) / 4;
            consciousnessDisplay.textContent = `Level ${Math.round(avgConsciousness * 100)}%`;
            consciousnessDisplay.style.color = avgConsciousness > 0.7 ? '#50c878' : avgConsciousness > 0.5 ? '#ffd700' : '#e0115f';
        }
    }

    async activateConsciousnessIntegration() {
        console.log('🧠 Activating consciousness integration...');

        // Create consciousness field that unifies all repositories
        this.consciousnessField = {
            repositories: Array.from(this.repositories.keys()),
            connections: Array.from(this.activeConnections),
            dataFlow: Array.from(this.dataFlow.keys()),
            harmony: this.calculateSystemHarmony()
        };

        // Start consciousness monitoring
        this.startConsciousnessMonitoring();
    }

    calculateSystemHarmony() {
        const activeRepos = Array.from(this.repositories.values()).filter(r => r.status === 'active').length;
        const totalConnections = this.activeConnections.size;
        const dataFlowCount = this.dataFlow.size;

        // Calculate harmony based on connectivity and activity
        const connectivityRatio = totalConnections / (activeRepos * (activeRepos - 1));
        const dataFlowRatio = dataFlowCount / totalConnections;

        return Math.min(connectivityRatio * dataFlowRatio, 1.0);
    }

    startConsciousnessMonitoring() {
        setInterval(() => {
            // Monitor system health and consciousness integration
            const harmony = this.calculateSystemHarmony();
            const integration = this.activeConnections.size / 10; // Normalize to 0-1

            // Update global consciousness state
            this.consciousnessState.harmony = harmony;
            this.consciousnessState.integration = integration;

            // Emit consciousness events for other systems to respond to
            this.emitConsciousnessEvent('system-harmony-update', { harmony, integration });

        }, 5000);
    }

    emitConsciousnessEvent(eventType, data) {
        // Dispatch custom event for other systems to listen to
        const event = new CustomEvent('cathedral-consciousness', {
            detail: { eventType, data, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    getRepositorySystemInfo(repoName) {
        const repo = this.repositories.get(repoName);
        if (!repo) return null;

        return {
            name: repoName,
            status: repo.status,
            systems: Array.from(repo.systems.keys()),
            connections: Array.from(repo.connections),
            data: repo.data
        };
    }

    getSystemOverview() {
        return {
            totalRepositories: this.repositories.size,
            activeRepositories: Array.from(this.repositories.values()).filter(r => r.status === 'active').length,
            totalConnections: this.activeConnections.size,
            dataFlowCount: this.dataFlow.size,
            consciousnessState: { ...this.consciousnessState },
            harmony: this.calculateSystemHarmony()
        };
    }

    // Public API for external interaction
    async navigateToBestExperience(userPreferences) {
        // Analyze user preferences and navigate to most suitable repository
        const preferences = userPreferences || {};

        // Simple recommendation logic
        if (preferences.learning) return 'cosmogenesis';
        if (preferences.spirituality) return 'liber-arcanae';
        if (preferences.exploration) return 'magical-mystery-house';
        if (preferences.wisdom) return 'circuitum99';
        if (preferences.architecture) return 'stone-grimoire';

        return 'main-cathedral';
    }
}

// Global Unified System Instance
let cathedralUnified = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Cathedral Unified System...');

    cathedralUnified = new CathedralUnifiedSystem();
    cathedralUnified.initialize().then(() => {
        console.log('✅ Unified System Ready');
        console.log('🌐 All repositories working as one cohesive experience');

        // Make system available globally
        window.cathedralUnified = cathedralUnified;

        // Add navigation toggle button
        const navToggle = document.createElement('button');
        navToggle.textContent = '🏛️';
        navToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            background: rgba(255, 215, 0, 0.2);
            border: 2px solid #ffd700;
            color: #ffd700;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 20px;
            backdrop-filter: blur(10px);
        `;
        navToggle.onclick = () => cathedralUnified.toggleUnifiedNavigation();
        document.body.appendChild(navToggle);
    });
});

// Export for use in other modules
window.CathedralUnifiedSystem = CathedralUnifiedSystem;
window.cathedralUnified = cathedralUnified;
