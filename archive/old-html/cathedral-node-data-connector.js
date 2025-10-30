// 🏛️ CATHEDRAL NODE DATA CONNECTOR
// Connects real datasets to generate immersive art and content for each node

class NodeDataConnector {
    constructor() {
        this.codexData = null;
        this.pigmentData = null;
        this.isLoaded = false;
    }

    async loadDatasets() {
        try {
            // Load Codex 144:99 data
            const codexResponse = await fetch('data/codex-144-expanded.json');
            this.codexData = await codexResponse.json();

            // Load pigment data
            const pigmentResponse = await fetch('data/pigments-database.json');
            this.pigmentData = await pigmentResponse.json();

            this.isLoaded = true;
            console.log('📚 Node datasets loaded successfully');
            console.log(`📊 Codex nodes: ${this.codexData.nodes.length}`);
            console.log(`🎨 Pigments: ${this.pigmentData.pigments ? this.pigmentData.pigments.length : 'N/A'}`);

        } catch (error) {
            console.error('Failed to load node datasets:', error);
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // Fallback data if files don't load
        this.codexData = {
            nodes: [
                {
                    id: 1,
                    name: "Path of Fire",
                    element: "Fire",
                    color: "#FF4500",
                    geometry: "Tetrahedron",
                    narrative: { theme: "Transformation through fire" },
                    gameDesign: { abilityType: "Combat" },
                    architecture: { spatialQuality: "Ascending" },
                    symbolism: { primarySymbol: "▲" }
                }
            ]
        };
        this.isLoaded = true;
    }

    getNodeData(nodeId) {
        if (!this.isLoaded) {
            console.warn('Node data not loaded yet');
            return null;
        }

        const node = this.codexData.nodes.find(n => n.id === nodeId);
        if (!node) {
            console.warn(`Node ${nodeId} not found`);
            return null;
        }

        return node;
    }

    generateNodeArt(nodeId) {
        const node = this.getNodeData(nodeId);
        if (!node) return null;

        return {
            colorPalette: this.generateColorPalette(node),
            geometricForms: this.generateGeometricForms(node),
            narrativeElements: this.generateNarrativeElements(node),
            architecturalElements: this.generateArchitecturalElements(node),
            gameMechanics: this.generateGameMechanics(node),
            soundDesign: this.generateSoundDesign(node),
            visualEffects: this.generateVisualEffects(node)
        };
    }

    generateColorPalette(node) {
        const baseColor = node.color;
        const element = node.element;

        // Generate harmonious color palette based on node data
        const palettes = {
            Fire: [baseColor, '#FF6B35', '#F7931E', '#FFD23F'],
            Water: [baseColor, '#1E90FF', '#4682B4', '#87CEEB'],
            Earth: [baseColor, '#8B4513', '#228B22', '#9ACD32'],
            Air: [baseColor, '#87CEEB', '#B0C4DE', '#E6E6FA']
        };

        return palettes[element] || [baseColor, '#CCCCCC', '#999999', '#666666'];
    }

    generateGeometricForms(node) {
        const geometry = node.geometry;
        const element = node.element;

        const forms = {
            Tetrahedron: {
                vertices: 4,
                faces: 4,
                sacredMeaning: "Foundation and stability"
            },
            Cube: {
                vertices: 8,
                faces: 6,
                sacredMeaning: "Material manifestation"
            },
            Octahedron: {
                vertices: 6,
                faces: 8,
                sacredMeaning: "Balance and harmony"
            },
            Icosahedron: {
                vertices: 12,
                faces: 20,
                sacredMeaning: "Water and flow"
            },
            Dodecahedron: {
                vertices: 20,
                faces: 12,
                sacredMeaning: "Divine proportion"
            }
        };

        return forms[geometry] || forms.Tetrahedron;
    }

    generateNarrativeElements(node) {
        return {
            theme: node.narrative?.theme || "Universal wisdom",
            archetype: node.narrative?.archetype || "The Seeker",
            storyBeats: node.narrative?.storyBeats || ["Discovery", "Growth", "Integration"],
            keywords: node.narrative?.keywords || ["wisdom", "growth", "transformation"],
            dialogueStyle: node.narrative?.dialogueStyle || "Wise and compassionate"
        };
    }

    generateArchitecturalElements(node) {
        return {
            spatialQuality: node.architecture?.spatialQuality || "Sacred",
            roomType: node.architecture?.roomType || "Temple",
            lighting: node.architecture?.lighting || "Divine",
            materials: node.architecture?.materials || ["Stone", "Crystal", "Light"],
            ambience: node.architecture?.ambience || "Sacred resonance"
        };
    }

    generateGameMechanics(node) {
        return {
            abilityType: node.gameDesign?.abilityType || "Universal",
            mechanics: node.gameDesign?.mechanics || ["Basic interaction"],
            questType: node.gameDesign?.questType || "Exploration",
            rewardStyle: node.gameDesign?.rewardStyle || "Wisdom",
            environmentEffect: node.gameDesign?.environmentEffect || "Harmonious"
        };
    }

    generateSoundDesign(node) {
        const solfeggio = node.solfeggio || 432;
        const element = node.element;

        const soundProfiles = {
            Fire: { frequencies: [solfeggio, solfeggio * 1.5], waveform: 'sawtooth', reverb: 'large' },
            Water: { frequencies: [solfeggio, solfeggio * 0.75], waveform: 'sine', reverb: 'medium' },
            Earth: { frequencies: [solfeggio, solfeggio * 0.5], waveform: 'triangle', reverb: 'small' },
            Air: { frequencies: [solfeggio, solfeggio * 2], waveform: 'square', reverb: 'minimal' }
        };

        return soundProfiles[element] || soundProfiles.Fire;
    }

    generateVisualEffects(node) {
        return {
            particleType: this.getParticleType(node.element),
            animationSpeed: this.getAnimationSpeed(node),
            glowIntensity: this.getGlowIntensity(node),
            texture: this.getTexture(node),
            blendMode: this.getBlendMode(node.element)
        };
    }

    getParticleType(element) {
        const types = {
            Fire: 'flame',
            Water: 'bubble',
            Earth: 'dust',
            Air: 'mist'
        };
        return types[element] || 'energy';
    }

    getAnimationSpeed(node) {
        const speeds = {
            Fire: 1.5,
            Water: 0.8,
            Earth: 0.6,
            Air: 1.2
        };
        return speeds[node.element] || 1.0;
    }

    getGlowIntensity(node) {
        const intensities = {
            Fire: 0.8,
            Water: 0.4,
            Earth: 0.3,
            Air: 0.6
        };
        return intensities[node.element] || 0.5;
    }

    getTexture(node) {
        const textures = {
            Fire: 'flame-pattern',
            Water: 'water-ripple',
            Earth: 'stone-texture',
            Air: 'cloud-pattern'
        };
        return textures[node.element] || 'energy-texture';
    }

    getBlendMode(element) {
        const modes = {
            Fire: 'screen',
            Water: 'multiply',
            Earth: 'overlay',
            Air: 'soft-light'
        };
        return modes[element] || 'normal';
    }

    // Generate 3D art parameters for Three.js
    generate3DArtParams(nodeId) {
        const node = this.getNodeData(nodeId);
        if (!node) return null;

        return {
            geometry: this.mapGeometryTo3D(node.geometry),
            material: this.generate3DMaterial(node),
            position: this.generate3DPosition(node),
            rotation: this.generate3DRotation(node),
            scale: this.generate3DScale(node),
            animation: this.generate3DAnimation(node)
        };
    }

    mapGeometryTo3D(geometryName) {
        const geometryMap = {
            'Tetrahedron': 'TetrahedronGeometry',
            'Cube': 'BoxGeometry',
            'Octahedron': 'OctahedronGeometry',
            'Icosahedron': 'IcosahedronGeometry',
            'Dodecahedron': 'DodecahedronGeometry',
            'Flower of Life': 'SphereGeometry',
            'Merkaba': 'OctahedronGeometry',
            'Metatron\'s Cube': 'OctahedronGeometry'
        };

        return geometryMap[geometryName] || 'OctahedronGeometry';
    }

    generate3DMaterial(node) {
        return {
            color: node.color,
            wireframe: node.id % 2 === 0,
            transparent: true,
            opacity: 0.6 + (node.id * 0.01),
            emissive: this.getEmissiveColor(node),
            metalness: 0.3,
            roughness: 0.4
        };
    }

    getEmissiveColor(node) {
        // Convert hex color to emissive version
        const color = node.color.replace('#', '');
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);

        return `rgb(${r * 0.2}, ${g * 0.2}, ${b * 0.2})`;
    }

    generate3DPosition(node) {
        const angle = (node.id * 137.5) % (Math.PI * 2); // Golden angle
        const radius = 5 + (node.id * 0.1);
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(node.id) * 2,
            z: Math.sin(angle) * radius
        };
    }

    generate3DRotation(node) {
        return {
            x: node.id * 0.01,
            y: node.id * 0.015,
            z: node.id * 0.008
        };
    }

    generate3DScale(node) {
        const baseScale = 0.5 + (node.id * 0.02);
        return {
            x: baseScale,
            y: baseScale,
            z: baseScale
        };
    }

    generate3DAnimation(node) {
        return {
            rotationSpeed: { x: 0.01, y: 0.015, z: 0.008 },
            floatAmplitude: 0.5 + (node.id * 0.05),
            floatSpeed: 0.02 + (node.id * 0.001),
            pulseScale: 0.1 + (node.id * 0.01)
        };
    }

    // Generate art using p5.js for creative coding
    generateP5Art(nodeId, p5Instance) {
        const node = this.getNodeData(nodeId);
        if (!node) return;

        const colors = this.generateColorPalette(node);
        const geometry = this.generateGeometricForms(node);

        p5Instance.background(10, 10, 20);
        p5Instance.colorMode(p5Instance.HSB, 360, 100, 100, 100);

        // Draw sacred geometry based on node data
        this.drawNodeGeometry(p5Instance, node, colors);

        // Add particle effects
        this.drawNodeParticles(p5Instance, node, colors);

        // Add narrative text elements
        this.drawNodeText(p5Instance, node);
    }

    drawNodeGeometry(p, node, colors) {
        p.push();
        p.translate(p.width/2, p.height/2);

        // Rotate based on node harmonics
        const time = p.millis() * 0.001;
        p.rotateX(time * node.harmonics?.perfectConsonance?.[0] * 0.01 || 0.01);
        p.rotateY(time * node.harmonics?.perfectConsonance?.[1] * 0.01 || 0.015);
        p.rotateZ(time * node.harmonics?.perfectConsonance?.[2] * 0.01 || 0.008);

        // Draw geometry based on node type
        p.stroke(colors[0]);
        p.strokeWeight(2);
        p.fill(colors[1]);
        p.noFill();

        switch(node.geometry) {
            case 'Tetrahedron':
                this.drawTetrahedron(p, 100);
                break;
            case 'Cube':
                p.box(100);
                break;
            case 'Octahedron':
                this.drawOctahedron(p, 100);
                break;
            case 'Icosahedron':
                this.drawIcosahedron(p, 80);
                break;
            case 'Dodecahedron':
                this.drawDodecahedron(p, 100);
                break;
            default:
                p.sphere(80);
        }

        p.pop();
    }

    drawTetrahedron(p, size) {
        // Draw tetrahedron using triangles
        const vertices = [
            [0, -size, 0],
            [size * 0.9428, size * 0.3333, 0],
            [-size * 0.4714, size * 0.3333, size * 0.8165],
            [-size * 0.4714, size * 0.3333, -size * 0.8165]
        ];

        // Draw edges
        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                p.line(vertices[i][0], vertices[i][1], vertices[i][2],
                       vertices[j][0], vertices[j][1], vertices[j][2]);
            }
        }
    }

    drawOctahedron(p, size) {
        // Draw octahedron using triangles
        const vertices = [
            [size, 0, 0], [-size, 0, 0],
            [0, size, 0], [0, -size, 0],
            [0, 0, size], [0, 0, -size]
        ];

        // Draw triangular faces
        const faces = [
            [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
            [1, 2, 5], [1, 5, 3], [1, 3, 4], [1, 4, 2]
        ];

        faces.forEach(face => {
            p.beginShape(p.TRIANGLES);
            face.forEach(vertexIndex => {
                p.vertex(vertices[vertexIndex][0], vertices[vertexIndex][1], vertices[vertexIndex][2]);
            });
            p.endShape();
        });
    }

    drawIcosahedron(p, size) {
        // Simplified icosahedron representation
        const phi = (1 + Math.sqrt(5)) / 2;

        const vertices = [
            [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
            [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
            [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ];

        vertices.forEach(vertex => {
            p.push();
            p.translate(vertex[0] * size * 0.5, vertex[1] * size * 0.5, vertex[2] * size * 0.5);
            p.sphere(5);
            p.pop();
        });
    }

    drawDodecahedron(p, size) {
        // Simplified dodecahedron representation
        const goldenRatio = 1.618;

        for (let i = 0; i < 12; i++) {
            const angle1 = (i / 12) * Math.PI * 2;
            const angle2 = Math.acos(1 - 2 * (i % 2));

            const x = Math.cos(angle1) * Math.sin(angle2) * size * 0.6;
            const y = Math.sin(angle1) * Math.sin(angle2) * size * 0.6;
            const z = Math.cos(angle2) * size * 0.6;

            p.push();
            p.translate(x, y, z);
            p.sphere(8);
            p.pop();
        }
    }

    drawNodeParticles(p, node, colors) {
        // Draw particles based on node element
        const particleCount = 50;
        const element = node.element;

        for (let i = 0; i < particleCount; i++) {
            const angle = (p.millis() * 0.001 + i * 0.1) % (Math.PI * 2);
            const radius = 100 + Math.sin(p.millis() * 0.002 + i) * 50;
            const x = p.width/2 + Math.cos(angle) * radius;
            const y = p.height/2 + Math.sin(angle) * radius;

            p.fill(colors[i % colors.length]);
            p.noStroke();

            const size = 3 + Math.sin(p.millis() * 0.003 + i) * 2;
            p.ellipse(x, y, size, size);
        }
    }

    drawNodeText(p, node) {
        // Draw node information as text overlay
        p.fill(255, 255, 255, 200);
        p.textAlign(p.CENTER);
        p.textSize(16);
        p.text(node.name, p.width/2, p.height - 60);

        p.textSize(12);
        p.text(node.element + ' - ' + node.narrative?.theme || 'Universal', p.width/2, p.height - 40);

        p.textSize(10);
        p.text('Node ' + node.id + ' - ' + node.geometry, p.width/2, p.height - 20);
    }

    // Generate complete node experience
    generateNodeExperience(nodeId) {
        const node = this.getNodeData(nodeId);
        if (!node) return null;

        return {
            nodeData: node,
            artGeneration: this.generateNodeArt(nodeId),
            threeJSParams: this.generate3DArtParams(nodeId),
            p5Params: {
                colors: this.generateColorPalette(node),
                geometry: node.geometry,
                narrative: node.narrative,
                animationSpeed: this.getAnimationSpeed(node)
            },
            audioParams: this.generateSoundDesign(node),
            interactionParams: {
                hoverEffects: this.generateHoverEffects(node),
                clickActions: this.generateClickActions(node),
                ambientEffects: this.generateAmbientEffects(node)
            }
        };
    }

    generateHoverEffects(node) {
        return {
            scale: 1.1,
            glowIntensity: 0.8,
            particleEmission: 'increased',
            soundVolume: 0.3,
            colorShift: 'saturated'
        };
    }

    generateClickActions(node) {
        return {
            soundEffect: 'node_activation',
            particleBurst: 'medium',
            screenShake: 'subtle',
            narrativeReveal: 'story_beat',
            dataDisplay: 'node_details'
        };
    }

    generateAmbientEffects(node) {
        return {
            backgroundParticles: 'continuous',
            colorBreathing: 'subtle',
            geometricRotation: 'slow',
            harmonicResonance: 'ambient'
        };
    }
}

// Global Node Data Connector
let nodeDataConnector = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 Initializing Node Data Connector...');

    nodeDataConnector = new NodeDataConnector();
    nodeDataConnector.loadDatasets().then(() => {
        console.log('✅ Node Data Connector Ready');
        console.log('🎨 Real data connected to art generation');
        console.log('📊 Immersive node experiences available');

        // Test with node 1
        const testNode = nodeDataConnector.getNodeData(1);
        if (testNode) {
            console.log('🧪 Test Node Data:', testNode.name, testNode.element);
        }
    });
});

// Export for use in other modules
window.NodeDataConnector = NodeDataConnector;
window.nodeDataConnector = nodeDataConnector;
