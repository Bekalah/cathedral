/**
 * Creative Engine Integration for CYOA Book Game
 * Adds harmonic generation capabilities to the interactive story system
 */
/**
 * Enhanced Game Engine with Creative Integration
 */
export class CreativeGameEngine {
    constructor() {
        this.creativeEngine = null;
        this.scenes = new Map();
        this.gameState = {
            currentScene: 'start',
            visitedScenes: [],
            playerStats: {
                wisdom: 0,
                courage: 0,
                compassion: 0,
                knowledge: 0,
                experience: 0
            },
            selectedNodes: [],
            realObjects: [],
            creativeMode: false
        };
    }
    /**
     * Initialize the creative game engine
     */
    async initialize() {
        try {
            // Load codex data
            const codexData = await loadCodexData();
            this.creativeEngine = createCreativeEngine(codexData);
            // Initialize scenes with creative content
            this.initializeCreativeScenes();
            console.log('✅ Creative Game Engine initialized with', codexData.length, 'nodes');
        }
        catch (error) {
            console.error('❌ Failed to initialize creative game engine:', error);
            throw error;
        }
    }
    /**
     * Initialize scenes with creative node integration
     */
    initializeCreativeScenes() {
        if (!this.creativeEngine)
            return;
        // Create scenes based on node combinations
        const nodes = this.creativeEngine.getAllNodes();
        nodes.slice(0, 8).forEach((node, index) => {
            const sceneId = `node-${node.id}`;
            const scene = this.createSceneFromNode(node, index);
            this.scenes.set(sceneId, scene);
        });
        // Create combination scenes
        this.createCombinationScenes();
    }
    /**
     * Create a scene from a single node
     */
    createSceneFromNode(node, index) {
        const nextNodeId = index < 7 ? `node-${node.id + 1}` : 'combination-scene';
        return {
            id: `node-${node.id}`,
            title: `The ${node.name}`,
            description: this.generateNodeDescription(node),
            nodeIds: [node.id],
            choices: [
                {
                    id: `explore-${node.id}`,
                    text: `Explore the ${node.element} aspect of ${node.name}`,
                    targetScene: nextNodeId,
                    nodeIds: [node.id],
                    effects: {
                        wisdom: node.element === 'Air' ? 2 : 1,
                        courage: node.element === 'Fire' ? 2 : 1,
                        experience: node.solfeggio / 50
                    }
                },
                {
                    id: `meditate-${node.id}`,
                    text: `Meditate on the ${node.solfeggio}Hz frequency`,
                    targetScene: 'meditation-scene',
                    nodeIds: [node.id],
                    effects: {
                        compassion: 2,
                        knowledge: 1,
                        experience: node.solfeggio / 100
                    }
                }
            ],
            backgroundMusic: `${node.element.toLowerCase()}-frequency-${node.solfeggio}`,
            atmosphere: node.architecture?.ambience || 'Sacred silence'
        };
    }
    /**
     * Create scenes from node combinations
     */
    createCombinationScenes() {
        // Fire + Water combination scene
        const fireWaterCombo = this.scenes.get('node-1');
        if (fireWaterCombo) {
            const combinationScene = {
                id: 'combination-scene',
                title: 'Elemental Fusion Chamber',
                description: 'You stand in a chamber where fire and water energies dance in perfect balance. The air shimmers with harmonic resonance as opposing elements find unity.',
                nodeIds: [1, 2], // Fire + Water
                choices: [
                    {
                        id: 'embrace-unity',
                        text: 'Embrace the unity of opposing forces',
                        targetScene: 'unity-reward',
                        nodeIds: [1, 2],
                        effects: {
                            wisdom: 3,
                            courage: 2,
                            compassion: 2,
                            experience: 100
                        }
                    },
                    {
                        id: 'study-balance',
                        text: 'Study the delicate balance between elements',
                        targetScene: 'balance-reward',
                        nodeIds: [1, 2],
                        effects: {
                            knowledge: 4,
                            experience: 80
                        }
                    }
                ]
            };
            this.scenes.set('combination-scene', combinationScene);
        }
    }
    /**
     * Generate scene description from node properties
     */
    generateNodeDescription(node) {
        const baseDescription = `You enter the realm of ${node.name}, where ${node.element.toLowerCase()} energy flows through sacred geometry.`;
        if (node.architecture) {
            return `${baseDescription} The ${node.architecture.roomType.toLowerCase()} is illuminated with ${node.architecture.lighting.toLowerCase()} light, creating an atmosphere of ${node.architecture.ambience.toLowerCase()}.`;
        }
        if (node.narrative) {
            return `${baseDescription} Here, ${node.narrative.theme.toLowerCase()} guides those who follow ${node.narrative.archetype.toLowerCase()} path.`;
        }
        return baseDescription;
    }
    /**
     * Make a choice and update game state
     */
    makeChoice(choiceId) {
        const currentScene = this.scenes.get(this.gameState.currentScene);
        if (!currentScene)
            return false;
        const choice = currentScene.choices.find(c => c.id === choiceId);
        if (!choice)
            return false;
        // Apply choice effects
        if (choice.effects) {
            Object.keys(choice.effects).forEach(stat => {
                if (stat in this.gameState.playerStats) {
                    const effectValue = choice.effects[stat];
                    this.gameState.playerStats[stat] += effectValue || 0;
                }
            });
        }
        // Add selected nodes to game state
        if (choice.nodeIds) {
            this.gameState.selectedNodes.push(...choice.nodeIds);
        }
        // Move to next scene
        if (choice.targetScene) {
            this.gameState.currentScene = choice.targetScene;
            if (!this.gameState.visitedScenes.includes(choice.targetScene)) {
                this.gameState.visitedScenes.push(choice.targetScene);
            }
        }
        // Generate real objects if creative mode is active
        if (this.gameState.creativeMode && choice.nodeIds) {
            this.generateRealObjects(choice.nodeIds);
        }
        return true;
    }
    /**
     * Generate real-world objects connected to nodes
     */
    generateRealObjects(nodeIds) {
        if (!this.creativeEngine)
            return;
        const nodes = this.creativeEngine.getNodes(nodeIds);
        nodes.forEach(node => {
            const realObject = this.createRealObjectFromNode(node);
            if (realObject) {
                this.gameState.realObjects.push(realObject);
            }
        });
    }
    /**
     * Create real-world object connection from node
     */
    createRealObjectFromNode(node) {
        // Map nodes to real books, artworks, and sacred sites
        const realConnections = {
            1: {
                name: "The Alchemist",
                description: "Paulo Coelho's masterpiece about following dreams and omens",
                gameConnection: "Teaches the Path of Fire - transformation through courage",
                realWorldLink: "https://en.wikipedia.org/wiki/The_Alchemist_(novel)",
                nodeId: 1
            },
            2: {
                name: "The Prophet",
                description: "Kahlil Gibran's poetic wisdom on love, marriage, and life",
                gameConnection: "Reveals the Path of Water - emotional wisdom and flow",
                realWorldLink: "https://en.wikipedia.org/wiki/The_Prophet_(book)",
                nodeId: 2
            },
            3: {
                name: "Chartres Cathedral",
                description: "Medieval Gothic cathedral with sacred geometry and labyrinth",
                gameConnection: "Embodies the Path of Earth - solid foundation and patient growth",
                realWorldLink: "https://en.wikipedia.org/wiki/Chartres_Cathedral",
                nodeId: 3
            }
        };
        return realConnections[node.id] || null;
    }
    /**
     * Get current scene with creative enhancements
     */
    getCurrentScene() {
        return this.scenes.get(this.gameState.currentScene) || null;
    }
    /**
     * Get game state
     */
    getGameState() {
        return { ...this.gameState };
    }
    /**
     * Toggle creative mode
     */
    toggleCreativeMode() {
        this.gameState.creativeMode = !this.gameState.creativeMode;
    }
    /**
     * Generate creative content from selected nodes
     */
    generateCreativeContent() {
        if (this.gameState.selectedNodes.length < 2) {
            return null;
        }
        return this.creativeEngine.combineNodes(this.gameState.selectedNodes);
    }
    /**
     * Get creative suggestions for current state
     */
    getCreativeSuggestions() {
        const suggestions = [];
        if (this.gameState.selectedNodes.length > 0) {
            const nodes = this.creativeEngine.getNodes(this.gameState.selectedNodes);
            const harmony = this.creativeEngine['harmonic'].analyzeHarmony(nodes);
            suggestions.push(`Harmonic relationship: ${harmony.relationship}`);
            suggestions.push(`Dominant element: ${harmony.elementalBalance.dominant}`);
            suggestions.push(`Overall harmony: ${harmony.overallHarmony}/10`);
        }
        if (this.gameState.realObjects.length > 0) {
            suggestions.push(`Discovered ${this.gameState.realObjects.length} real-world connections`);
        }
        return suggestions;
    }
}
/**
 * Integration with existing game engine
 */
export class GameEngineIntegration {
    constructor(existingGameEngine) {
        this.creativeEngine = new CreativeGameEngine();
    }
    /**
     * Enhance existing scene with creative elements
     */
    enhanceScene(scene, nodeIds) {
        if (!this.creativeEngine)
            return scene;
        const creativeOutput = this.creativeEngine.combineNodes(nodeIds);
        return {
            ...scene,
            creative: {
                harmony: creativeOutput.harmony,
                narrative: creativeOutput.narrative,
                architecture: creativeOutput.architecture
            },
            enhancedDescription: this.blendDescriptions(scene.description, creativeOutput)
        };
    }
    /**
     * Blend original and creative descriptions
     */
    blendDescriptions(original, creative) {
        if (!creative.narrative)
            return original;
        const creativeIntro = `This space resonates with ${creative.harmony.relationship.toLowerCase()} energy, where ${creative.narrative.themes.join(' and ').toLowerCase()} guide the seeker.`;
        return `${original}\n\n${creativeIntro}`;
    }
    /**
     * Generate dynamic choices based on node combinations
     */
    generateDynamicChoices(baseChoices, nodeIds) {
        if (nodeIds.length < 2 || !this.creativeEngine)
            return baseChoices;
        const creativeOutput = this.creativeEngine.combineNodes(nodeIds);
        const dynamicChoices = [];
        // Add creative choice based on harmony
        if (creativeOutput.harmony.relationship === 'Perfect Harmony') {
            dynamicChoices.push({
                id: 'creative-harmony',
                text: 'Follow the path of perfect harmony',
                effects: { wisdom: 3, experience: 50 },
                creative: true
            });
        }
        return [...baseChoices, ...dynamicChoices];
    }
}
//# sourceMappingURL=creative-integration.js.map