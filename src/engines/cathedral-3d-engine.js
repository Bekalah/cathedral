// 🏛️ CATHEDRAL OF CIRCUITS - 3D Graphics Engine
// Professional 3D graphics for museum-quality spiritual technology

class Cathedral3DEngine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.sacredGeometry = [];
        this.particleSystem = [];
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        try {
            // Create 3D Scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x0b0b1a);

            // Create Camera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.set(0, 5, 10);

            // Create Renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Add 3D Canvas to cathedral chamber
            const cathedralChamber = document.getElementById('cathedral');
            if (cathedralChamber) {
                cathedralChamber.appendChild(this.renderer.domElement);
            }

            // Add Orbit Controls
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enableZoom = true;
            this.controls.enablePan = true;

            // Create 3D Sacred Architecture
            this.createSacredGeometry3D();
            this.createParticleSystem3D();
            this.createLighting();
            this.createCathedralArchitecture();

            this.isInitialized = true;
            console.log('🏛️ 3D Cathedral Graphics Engine Initialized');

        } catch (error) {
            console.warn('3D Graphics initialization failed:', error);
            this.fallbackToCSS3D();
        }
    }

    createSacredGeometry3D() {
        // Metatron's Cube (Sacred Geometry)
        const metatronGeometry = new THREE.OctahedronGeometry(3, 1);
        const metatronMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });

        const metatronCube = new THREE.Mesh(metatronGeometry, metatronMaterial);
        metatronCube.position.set(0, 2, -5);
        metatronCube.rotation.x = Math.PI / 4;
        this.scene.add(metatronCube);
        this.sacredGeometry.push(metatronCube);

        // Codex 144:99 Sacred Node Network (Approved System)
        this.renderCodex144Network();

        // Platonic Solids (Sacred Forms)
        const platonicForms = [
            { geometry: new THREE.TetrahedronGeometry(1), position: [-4, 0, -2] },
            { geometry: new THREE.CubeGeometry(1.2, 1.2, 1.2), position: [4, 0, -2] },
            { geometry: new THREE.OctahedronGeometry(1), position: [0, -2, -2] },
            { geometry: new THREE.IcosahedronGeometry(1), position: [-2, 2, -2] },
            { geometry: new THREE.DodecahedronGeometry(1), position: [2, 2, -2] }
        ];

        platonicForms.forEach((form, index) => {
            const material = new THREE.MeshPhongMaterial({
                color: 0xffd700,
                transparent: true,
                opacity: 0.5,
                wireframe: index % 2 === 0
            });

            const solid = new THREE.Mesh(form.geometry, material);
            solid.position.set(...form.position);
            this.scene.add(solid);
            this.sacredGeometry.push(solid);
        });
    }

    renderCodex144Network() {
        // Codex 144:99 - Sacred Double Helix with Living Spine Integration
        console.log('🧬 Rendering Codex-Compliant Double Helix Structure');

        // Create the main double helix structure
        const helixCenter = new THREE.Vector3(0, 0, -3);
        const helixRadius = 4;
        const helixHeight = 12;
        const helixTurns = 144; // Sacred number representing the 144:99 relationship

        // Import and use the SacredGeometryRenderer for the helix
        this.createCodexHelix(helixCenter, helixRadius, helixHeight, helixTurns);

        // Create enhanced Codex nodes with Major Arcana correspondences
        const codexNodes = this.createEnhancedCodexNodes();

        // Render each Codex node with sacred geometry correspondences
        codexNodes.forEach((node, index) => {
            const nodeGroup = this.createCodexNode(node, index);
            nodeGroup.position.set(...node.position);
            this.scene.add(nodeGroup);
            this.sacredGeometry.push(nodeGroup);
        });

        // Create harmonic connections between nodes (144:99 relationship)
        this.createCodexHarmonicConnections(codexNodes);

        // Create the living spine (33 vertebrae) as the central axis with Major Arcana integration
        this.createLivingSpine();
    }

    createCodexNode(nodeData, index) {
        const group = new THREE.Group();

        // Create geometry based on node type
        let geometry;
        switch(nodeData.geometry) {
            case 'Tetrahedron':
                geometry = new THREE.TetrahedronGeometry(0.8);
                break;
            case 'Cube':
                geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
                break;
            case 'Octahedron':
                geometry = new THREE.OctahedronGeometry(0.8);
                break;
            case 'Dodecahedron':
                geometry = new THREE.DodecahedronGeometry(0.8);
                break;
            case 'Icosahedron':
                geometry = new THREE.IcosahedronGeometry(0.8);
                break;
            case 'FlowerOfLife':
                geometry = new THREE.CircleGeometry(0.8, 6); // Simplified flower of life
                break;
            case 'Merkaba':
                // Create two overlapping tetrahedrons for Merkaba
                const merkabaGroup = new THREE.Group();
                const tetra1 = new THREE.TetrahedronGeometry(0.6);
                const tetra2 = new THREE.TetrahedronGeometry(0.6);
                const merkabaMat = new THREE.MeshPhongMaterial({
                    color: nodeData.color,
                    transparent: true,
                    opacity: 0.7,
                    wireframe: true
                });
                const merkaba1 = new THREE.Mesh(tetra1, merkabaMat);
                const merkaba2 = new THREE.Mesh(tetra2, merkabaMat);
                merkaba2.rotation.z = Math.PI;
                merkabaGroup.add(merkaba1, merkaba2);
                return merkabaGroup;
            case 'MetatronsCube':
                geometry = new THREE.OctahedronGeometry(0.8);
                break;
            default:
                geometry = new THREE.OctahedronGeometry(0.8);
        }

        // Create material with Codex-specific properties
        const material = new THREE.MeshPhongMaterial({
            color: nodeData.color,
            transparent: true,
            opacity: 0.8,
            emissive: nodeData.color,
            emissiveIntensity: 0.2
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Add pulsing animation based on Codex harmonics
        mesh.userData = {
            codexNode: nodeData,
            pulsePhase: index * 0.5,
            rotationSpeed: 0.01 + (index * 0.005)
        };

        group.add(mesh);

        // Add node label (energy signature)
        const nodeLabel = this.createNodeLabel(nodeData);
        nodeLabel.position.y = -1.5;
        group.add(nodeLabel);

        return group;
    }

    createNodeLabel(nodeData) {
        // Create energetic signature for each node
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;

        // Create gradient background
        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, '#' + nodeData.color.toString(16).padStart(6, '0'));
        gradient.addColorStop(1, '#000000');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add node name and ID
        context.fillStyle = '#ffffff';
        context.font = '24px Arial';
        context.textAlign = 'center';
        context.fillText(`${nodeData.id}:${nodeData.name}`, canvas.width / 2, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const labelMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(labelMaterial);

        sprite.scale.set(2, 0.5, 1);
        return sprite;
    }

    createCodexHarmonicConnections(nodes) {
        // Create connections representing the 144:99 harmonic ratio
        const connections = [
            // Core connections (1-8 nodes)
            [1, 5], [2, 6], [3, 8], [4, 7], // Elemental to planetary
            [1, 2], [3, 4], [5, 6], [7, 8], // Elemental pairs
            [5, 8], [6, 7], [1, 4], [2, 3], // Cross-elemental

            // Special node connections (41, 73, 99, 144)
            [5, 41], [41, 99], [99, 144], // Solar chain
            [6, 73], [73, 99], [99, 144], // Lunar chain
            [7, 41], [7, 73], [8, 41], [8, 73], // Mercurial/Venusian to special nodes

            // 144:99 master connection (the harmonic ratio)
            [99, 144]
        ];

        connections.forEach(([nodeId1, nodeId2]) => {
            const node1 = nodes.find(n => n.id === nodeId1);
            const node2 = nodes.find(n => n.id === nodeId2);

            if (node1 && node2) {
                const points = [
                    new THREE.Vector3(...node1.position),
                    new THREE.Vector3(...node2.position)
                ];

                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: 0x88ccff,
                    transparent: true,
                    opacity: 0.3
                });

                const line = new THREE.Line(geometry, material);
                this.scene.add(line);
                this.sacredGeometry.push(line);
            }
        });
    }

    createCodexHelix(center, radius, height, turns) {
        // Create the main double helix structure using THREE.js directly
        const helixGroup = new THREE.Group();

        // Golden ratio for sacred proportions
        const phi = (1 + Math.sqrt(5)) / 2;

        // Create two intertwined helices representing the 144:99 relationship
        const helix1 = this.createHelixStrand(radius, height, turns, 0, 0xFF4500, 'Fire');
        const helix2 = this.createHelixStrand(radius * phi, height, Math.floor(turns * 99/144), Math.PI, 0x1E90FF, 'Water');

        helixGroup.add(helix1, helix2);

        // Add sacred nodes at key harmonic points
        const sacredNodes = this.createHelixSacredNodes(center, radius, height, turns);
        sacredNodes.forEach(node => helixGroup.add(node));

        // Add connecting bridges between the two helices
        const bridges = this.createHelixBridges(helix1, helix2, center, radius);
        bridges.forEach(bridge => helixGroup.add(bridge));

        this.scene.add(helixGroup);
        this.sacredGeometry.push(helixGroup);

        console.log('🧬 Codex Double Helix created with 144:99 harmonic ratio');
    }

    createHelixStrand(radius, height, turns, phaseOffset, color, element) {
        const group = new THREE.Group();
        const points = [];

        // Generate helix points with golden ratio spacing
        for (let i = 0; i <= turns * 36; i++) {
            const t = (i / (turns * 36)) * height;
            const angle = (i / 36) * Math.PI * 2 + phaseOffset;
            const spiralRadius = radius * (1 - t / height * 0.3); // Slight taper

            const x = Math.cos(angle) * spiralRadius;
            const z = Math.sin(angle) * spiralRadius;
            const y = t - height / 2;

            points.push(new THREE.Vector3(x, y, z));
        }

        // Create the main helix curve
        const curve = new THREE.CatmullRomCurve3(points);
        const helixGeometry = new THREE.TubeGeometry(curve, points.length * 2, 0.05, 8, false);

        // Use MysticalMaterials for enhanced elemental materials
        let material;
        if (element === 'Fire') {
            material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                emissive: color,
                emissiveIntensity: 0.4,
                shininess: 100
            });
        } else if (element === 'Water') {
            material = new THREE.MeshPhysicalMaterial({
                color: color,
                transparent: true,
                opacity: 0.7,
                transmission: 0.3,
                thickness: 0.5,
                roughness: 0.1,
                metalness: 0.1,
                clearcoat: 0.8,
                clearcoatRoughness: 0.1
            });
        } else {
            material = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.7,
                emissive: color,
                emissiveIntensity: 0.3
            });
        }

        const helix = new THREE.Mesh(helixGeometry, material);

        // Add pulsing animation data
        helix.userData = {
            element: element,
            pulsePhase: phaseOffset,
            rotationSpeed: element === 'Fire' ? 0.02 : 0.015,
            harmonicRatio: element === 'Fire' ? 144 : 99
        };

        group.add(helix);

        // Add energy particles along the helix using enhanced materials
        const particles = this.createHelixParticles(points, color, element);
        particles.forEach(particle => group.add(particle));

        return group;
    }

    createHelixSacredNodes(center, radius, height, turns) {
        const nodes = [];
        const phi = (1 + Math.sqrt(5)) / 2;

        // Create nodes at Fibonacci positions (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144)
        const fibonacciNodes = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

        fibonacciNodes.forEach((fibIndex, nodeIndex) => {
            if (fibIndex > turns) return;

            const t = (fibIndex / turns) * height - height / 2;
            const angle = (fibIndex / turns) * Math.PI * 2;
            const nodeRadius = radius * (1 - Math.abs(t) / height * 0.3);

            const x = Math.cos(angle) * nodeRadius;
            const z = Math.sin(angle) * nodeRadius;
            const y = t;

            const nodeGroup = new THREE.Group();
            nodeGroup.position.set(x, y, z);

            // Create sacred geometry for each node
            const nodeGeometry = new THREE.OctahedronGeometry(0.15);
            const nodeMaterial = new THREE.MeshPhongMaterial({
                color: fibIndex === 144 ? 0xFFFFFF : fibIndex === 99 ? 0xDDA0DD : 0xFFD700,
                transparent: true,
                opacity: 0.8,
                emissive: fibIndex === 144 ? 0xFFFFFF : fibIndex === 99 ? 0xDDA0DD : 0xFFD700,
                emissiveIntensity: 0.5
            });

            const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
            nodeMesh.userData = {
                sacredNode: true,
                fibonacciIndex: fibIndex,
                harmonicRatio: fibIndex === 144 ? '144' : fibIndex === 99 ? '99' : 'harmonic',
                pulsePhase: nodeIndex * phi,
                majorArcana: this.getMajorArcanaForFibonacci(fibIndex)
            };

            nodeGroup.add(nodeMesh);
            nodes.push(nodeGroup);
        });

        return nodes;
    }

    getMajorArcanaForFibonacci(fibIndex) {
        // Map Fibonacci numbers to Major Arcana (0-21)
        const majorArcana = [
            'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
            'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
            'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
            'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
            'Judgement', 'The World'
        ];

        // Special mappings for key nodes
        if (fibIndex === 1) return 'The Magician';
        if (fibIndex === 2) return 'The High Priestess';
        if (fibIndex === 3) return 'The Empress';
        if (fibIndex === 5) return 'The Hierophant';
        if (fibIndex === 8) return 'Strength';
        if (fibIndex === 13) return 'Death';
        if (fibIndex === 21) return 'The World';
        if (fibIndex === 34) return 'The Star';
        if (fibIndex === 55) return 'The Sun';
        if (fibIndex === 89) return 'Judgement';
        if (fibIndex === 99) return 'The Moon'; // Special case for 99
        if (fibIndex === 144) return 'The Fool'; // Completion returns to beginning

        return majorArcana[fibIndex % 22];
    }

    createHelixBridges(helix1, helix2, center, radius) {
        const bridges = [];
        const bridgeCount = 72; // Sacred number

        for (let i = 0; i < bridgeCount; i++) {
            const t = (i / bridgeCount);
            const angle = t * Math.PI * 2;

            // Calculate bridge points between helices
            const point1 = new THREE.Vector3(
                Math.cos(angle) * radius,
                (t * 10) - 5, // Height along helix
                Math.sin(angle) * radius
            );

            const point2 = new THREE.Vector3(
                Math.cos(angle + Math.PI) * radius * 1.618, // Golden ratio offset
                (t * 10) - 5,
                Math.sin(angle + Math.PI) * radius * 1.618
            );

            const geometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);
            const material = new THREE.LineBasicMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.4
            });

            const bridge = new THREE.Line(geometry, material);
            bridge.userData = {
                bridgeIndex: i,
                harmonicConnection: true
            };

            bridges.push(bridge);
        }

        return bridges;
    }

    createHelixParticles(points, color, element) {
        const particles = [];
        const particleCount = Math.floor(points.length / 8); // Every 8th point

        for (let strand = 0; strand < 3; strand++) {
            const particlePositions = [];
            const startOffset = strand * Math.floor(points.length / 3);

            for (let i = 0; i < particleCount; i++) {
                const pointIndex = (startOffset + i * 8) % points.length;
                particlePositions.push(points[pointIndex].clone());
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(particlePositions);
            const material = new THREE.PointsMaterial({
                color: color,
                size: 0.1,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const particleSystem = new THREE.Points(geometry, material);
            particleSystem.userData = {
                element: element,
                strandIndex: strand,
                flowSpeed: element === 'Fire' ? 0.02 : 0.015,
                particleCount: particleCount
            };

            particles.push(particleSystem);
        }

        return particles;
    }

    createEnhancedCodexNodes() {
        // Enhanced Codex nodes with Major Arcana correspondences and living spine integration
        return [
            // Core 8 Nodes (1-8) with Major Arcana mappings
            { id: 1, name: "Path of Fire", element: "Fire", color: 0xFF4500, geometry: "Tetrahedron", position: [-6, 3, -3], majorArcana: "The Magician", spineIndex: 1 },
            { id: 2, name: "Path of Water", element: "Water", color: 0x1E90FF, geometry: "Icosahedron", position: [6, 3, -3], majorArcana: "The High Priestess", spineIndex: 2 },
            { id: 3, name: "Path of Earth", element: "Earth", color: 0x8B4513, geometry: "Cube", position: [-6, -3, -3], majorArcana: "The Empress", spineIndex: 3 },
            { id: 4, name: "Path of Air", element: "Air", color: 0x87CEEB, geometry: "Octahedron", position: [6, -3, -3], majorArcana: "The Emperor", spineIndex: 4 },
            { id: 5, name: "Solar Current", element: "Fire", color: 0xFFD700, geometry: "Dodecahedron", position: [0, 4, -3], majorArcana: "The Hierophant", spineIndex: 5 },
            { id: 6, name: "Lunar Reflection", element: "Water", color: 0xC0C0C0, geometry: "Icosahedron", position: [0, -4, -3], majorArcana: "The Lovers", spineIndex: 6 },
            { id: 7, name: "Mercurial Path", element: "Air", color: 0xFFA500, geometry: "Octahedron", position: [-3, 0, -3], majorArcana: "The Chariot", spineIndex: 7 },
            { id: 8, name: "Venusian Love", element: "Earth", color: 0xFF69B4, geometry: "Dodecahedron", position: [3, 0, -3], majorArcana: "Strength", spineIndex: 8 },

            // Special Nodes (41, 73, 99, 144) with enhanced properties
            { id: 41, name: "Solar Water", element: "Water", color: 0xFFD700, geometry: "FlowerOfLife", position: [-4, 6, -3], majorArcana: "The Hermit", spineIndex: 13 },
            { id: 73, name: "Twin Ray Mirror", element: "Aether", color: 0x00CED1, geometry: "Merkaba", position: [4, 6, -3], majorArcana: "Wheel of Fortune", spineIndex: 21 },
            { id: 99, name: "Angelic Resonance", element: "Aether", color: 0xDDA0DD, geometry: "MetatronsCube", position: [0, 8, -3], majorArcana: "The Moon", spineIndex: 33 },
            { id: 144, name: "Completion", element: "All", color: 0xFFFFFF, geometry: "All", position: [0, -6, -3], majorArcana: "The Fool", spineIndex: 0 }
        ];
    }

    createLivingSpine() {
        // Create the 33-vertebrae living spine as central axis with Major Arcana integration
        const spineGroup = new THREE.Group();
        const vertebraGeometry = new THREE.SphereGeometry(0.1, 8, 8);

        for (let i = 0; i < 33; i++) {
            const vertebraMaterial = new THREE.MeshPhongMaterial({
                color: i % 11 === 0 ? 0xffd700 : 0x88ccff, // Golden vertebrae every 11 steps
                transparent: true,
                opacity: 0.6,
                emissive: 0x001122,
                emissiveIntensity: 0.3
            });

            const vertebra = new THREE.Mesh(vertebraGeometry, vertebraMaterial);
            vertebra.position.y = (i - 16) * 0.3; // Center the spine
            vertebra.position.x = Math.sin(i * 0.2) * 0.5; // Gentle curve
            vertebra.position.z = Math.cos(i * 0.2) * 0.5;

            // Major Arcana vertebrae with enhanced correspondences
            const majorArcanaIndex = Math.floor(i * 22 / 33);
            if (majorArcanaIndex < 22) {
                vertebra.userData.majorArcana = majorArcanaIndex;
                vertebra.userData.majorArcanaName = this.getMajorArcanaName(majorArcanaIndex);
                vertebra.material.color.setHex(0xff69b4); // Pink for Major Arcana
                vertebra.material.emissive.setHex(0xff69b4);
                vertebra.material.emissiveIntensity = 0.6;
            }

            vertebra.userData.spineIndex = i;
            vertebra.userData.codexNode = this.getCodexNodeForSpineIndex(i);
            spineGroup.add(vertebra);
        }

        spineGroup.position.set(0, 0, -3);
        this.scene.add(spineGroup);
        this.sacredGeometry.push(spineGroup);
    }

    getMajorArcanaName(index) {
        const majorArcana = [
            'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
            'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
            'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
            'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun',
            'Judgement', 'The World'
        ];
        return majorArcana[index] || 'Unknown';
    }

    getCodexNodeForSpineIndex(spineIndex) {
        // Map spine vertebrae to Codex nodes based on sacred proportions
        if (spineIndex === 0) return 144; // Completion
        if (spineIndex === 32) return 99; // Angelic Resonance
        if (spineIndex === 20) return 73; // Twin Ray Mirror
        if (spineIndex === 12) return 41; // Solar Water
        if (spineIndex <= 8) return spineIndex + 1; // Core nodes 1-8
        return null;
    }

    animateHelixStrand(helix, index) {
        const time = Date.now() * 0.001;
        const element = helix.userData.element;

        // Pulsing based on Codex harmonics
        const pulseScale = 1 + Math.sin(time * 2 + helix.userData.pulsePhase) * 0.2;
        helix.scale.setScalar(pulseScale);

        // Elemental rotation patterns
        switch(element) {
            case 'Fire':
                helix.rotation.y += helix.userData.rotationSpeed * 2;
                helix.rotation.x += helix.userData.rotationSpeed;
                break;
            case 'Water':
                helix.rotation.z += helix.userData.rotationSpeed * 1.5;
                break;
        }

        // Special animation for key harmonic ratios
        if (helix.userData.harmonicRatio === 144) {
            helix.rotation.z += helix.userData.rotationSpeed * 1.5;
        } else if (helix.userData.harmonicRatio === 99) {
            helix.position.y += Math.sin(time * 1.5 + index) * 0.02;
        }
    }

    animateSacredNode(node, index) {
        const time = Date.now() * 0.001;

        // Pulsing based on Fibonacci harmonics
        const pulseScale = 1 + Math.sin(time * 3 + node.userData.pulsePhase) * 0.3;
        node.scale.setScalar(pulseScale);

        // Special animation for key nodes
        if (node.userData.fibonacciIndex === 144) { // Completion
            node.rotation.y += 0.02;
            node.rotation.x += 0.015;
            node.rotation.z += 0.01;
        } else if (node.userData.fibonacciIndex === 99) { // Angelic Resonance
            node.rotation.z += 0.025;
            node.scale.setScalar(1 + Math.sin(time * 3) * 0.3);
        } else if (node.userData.fibonacciIndex === 73) { // Twin Ray Mirror
            node.rotation.y += 0.015;
            node.rotation.x += 0.01;
        }

        // Major Arcana enhanced animation
        if (node.userData.majorArcana) {
            const arcanaPulse = 1 + Math.sin(time * 2 + node.userData.pulsePhase) * 0.4;
            node.scale.setScalar(arcanaPulse);
        }
    }

    animateHarmonicBridge(bridge, index) {
        const time = Date.now() * 0.001;

        // Breathing animation for harmonic connections
        const breatheOpacity = 0.4 + Math.sin(time * 1.5 + index * 0.1) * 0.2;
        bridge.material.opacity = breatheOpacity;

        // Energy flow along bridges
        const energyFlow = Math.sin(time * 2 + index * 0.2) * 0.5 + 0.5;
        bridge.scale.setScalar(1 + energyFlow * 0.3);
    }

    animateEnhancedLighting() {
        const time = Date.now() * 0.001;

        // Animate all lights in the scene
        this.scene.children.forEach(child => {
            if (child instanceof THREE.PointLight && child.userData) {
                const lightData = child.userData;

                if (lightData.element) {
                    // Elemental lights pulse with their natural rhythm
                    const pulseIntensity = lightData.originalIntensity * (0.7 + Math.sin(time * 2 + lightData.pulsePhase) * 0.3);
                    child.intensity = pulseIntensity;

                    // Elemental position animation
                    switch(lightData.element) {
                        case 'Fire':
                            child.position.y += Math.sin(time * 3) * 0.1;
                            break;
                        case 'Water':
                            child.position.x += Math.cos(time * 2) * 0.05;
                            break;
                        case 'Air':
                            child.position.z += Math.sin(time * 2.5) * 0.08;
                            break;
                        case 'Earth':
                            // Earth lights stay more stable
                            child.position.y += Math.sin(time * 0.5) * 0.02;
                            break;
                        case 'Solar':
                            // Solar light follows a larger orbit
                            const solarRadius = 3;
                            child.position.x = Math.cos(time * 0.5) * solarRadius;
                            child.position.z = Math.sin(time * 0.5) * solarRadius;
                            break;
                        case 'Lunar':
                            // Lunar light has a gentler, slower orbit
                            const lunarRadius = 2;
                            child.position.x = Math.cos(time * 0.3) * lunarRadius;
                            child.position.z = Math.sin(time * 0.3) * lunarRadius;
                            break;
                    }
                } else if (lightData.helixLight) {
                    // Helix-specific lights
                    switch(lightData.position) {
                        case 'top':
                            child.position.y = 6 + Math.sin(time * 1.5) * 1;
                            child.position.x = Math.cos(time * 0.8) * 1;
                            break;
                        case 'bottom':
                            child.position.y = -6 + Math.sin(time * 1.2) * 0.8;
                            child.position.x = Math.sin(time * 0.9) * 0.8;
                            break;
                    }
                }
            }
        });
    }

    animateCodexNode(node, index) {
        const time = Date.now() * 0.001;
        const nodeData = node.userData.codexNode;

        // Pulsing based on Codex harmonics
        const pulseScale = 1 + Math.sin(time * 2 + node.userData.pulsePhase) * 0.2;
        node.scale.setScalar(pulseScale);

        // Rotation based on node element
        switch(nodeData.element) {
            case 'Fire':
                node.rotation.y += node.userData.rotationSpeed * 2;
                node.rotation.x += node.userData.rotationSpeed;
                break;
            case 'Water':
                node.rotation.z += node.userData.rotationSpeed * 1.5;
                node.position.y += Math.sin(time + index) * 0.02;
                break;
            case 'Air':
                node.rotation.y += node.userData.rotationSpeed * 3;
                node.position.x += Math.cos(time + index) * 0.01;
                break;
            case 'Earth':
                node.rotation.y += node.userData.rotationSpeed * 0.5;
                // Earth nodes stay more grounded
                break;
            default: // Aether and others
                node.rotation.y += node.userData.rotationSpeed * 1.5;
                node.rotation.x += node.userData.rotationSpeed * 0.8;
        }

        // Special animation for key nodes
        if (nodeData.id === 99) { // Angelic Resonance
            node.rotation.z += node.userData.rotationSpeed * 2;
            node.scale.setScalar(1 + Math.sin(time * 3) * 0.3);
        } else if (nodeData.id === 144) { // Completion
            // All elements harmonize in completion
            node.rotation.y += node.userData.rotationSpeed;
            node.rotation.x += node.userData.rotationSpeed * 1.1;
            node.rotation.z += node.userData.rotationSpeed * 0.9;
        }
    }

    animateSpineVertebra(vertebra, index) {
        const time = Date.now() * 0.001;

        // Energy flows up the spine
        vertebra.position.y += Math.sin(time * 0.5 + vertebra.userData.spineIndex * 0.1) * 0.005;

        // Major Arcana vertebrae have special glow
        if (vertebra.userData.majorArcana !== undefined) {
            const glowIntensity = 0.5 + Math.sin(time * 2 + vertebra.userData.spineIndex * 0.3) * 0.3;
            vertebra.material.emissiveIntensity = glowIntensity;

            // Major Arcana pulse more prominently
            const pulseScale = 1 + Math.sin(time * 3 + vertebra.userData.spineIndex * 0.2) * 0.4;
            vertebra.scale.setScalar(pulseScale);
        } else {
            // Regular vertebrae have subtle animation
            vertebra.rotation.y += 0.01;
            vertebra.material.emissiveIntensity = 0.2;
        }

        // Spine curvature animation
        vertebra.position.x = Math.sin(vertebra.userData.spineIndex * 0.2 + time * 0.3) * 0.3;
        vertebra.position.z = Math.cos(vertebra.userData.spineIndex * 0.2 + time * 0.3) * 0.3;
    }

    createParticleSystem3D() {
        // Advanced 3D Particle System
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 300;

        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        const sacredColors = [0xffd700, 0x50c878, 0xe0115f, 0xc0c0c0, 0xb87333, 0x4682b4];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Sacred geometric distribution
            const radius = Math.random() * 25 + 5;
            const theta = Math.random() * Math.PI * 4; // Multiple rotations
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Sacred color palette
            const color = new THREE.Color(sacredColors[Math.floor(Math.random() * sacredColors.length)]);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Gentle floating velocities
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particles);
        this.particleSystem.push({ mesh: particles, velocities, positions });

        // Add particle animation
        this.animateParticles();
    }

    animateParticles() {
        if (!this.particleSystem.length) return;

        const particleData = this.particleSystem[0];
        const positions = particleData.mesh.geometry.attributes.position.array;
        const velocities = particleData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            // Update positions based on velocities
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Boundary wrapping for infinite space
            if (Math.abs(positions[i]) > 30) velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 30) velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 30) velocities[i + 2] *= -1;
        }

        particleData.mesh.geometry.attributes.position.needsUpdate = true;
    }

    createLighting() {
        // Divine Ambient Light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Sacred Directional Light (main illumination)
        const directionalLight = new THREE.DirectionalLight(0xffd700, 1.2);
        directionalLight.position.set(15, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        this.scene.add(directionalLight);

        // Mystical Point Lights with enhanced Codex colors
        const mysticalLights = [
            { color: 0xFF4500, position: [-10, 5, -5], intensity: 0.8, element: 'Fire' }, // Fire element
            { color: 0x1E90FF, position: [10, 5, -5], intensity: 0.8, element: 'Water' }, // Water element
            { color: 0x8B4513, position: [-10, -5, -5], intensity: 0.6, element: 'Earth' }, // Earth element
            { color: 0x87CEEB, position: [10, -5, -5], intensity: 0.6, element: 'Air' }, // Air element
            { color: 0xFFD700, position: [0, 8, -5], intensity: 1.0, element: 'Solar' }, // Solar current
            { color: 0xC0C0C0, position: [0, -8, -5], intensity: 0.7, element: 'Lunar' } // Lunar reflection
        ];

        mysticalLights.forEach((lightData, index) => {
            const pointLight = new THREE.PointLight(lightData.color, lightData.intensity, 30);
            pointLight.position.set(...lightData.position);

            // Add pulsing animation for elemental lights
            pointLight.userData = {
                element: lightData.element,
                pulsePhase: index * 0.5,
                originalIntensity: lightData.intensity
            };

            this.scene.add(pointLight);
        });

        // Sacred Spotlights for dramatic effect - focused on helix center
        const spotLight = new THREE.SpotLight(0xffd700, 1, 20, Math.PI / 6);
        spotLight.position.set(0, 15, 0);
        spotLight.target.position.set(0, 0, -5);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);

        // Add helix-specific lighting
        this.createHelixLighting();
    }

    createHelixLighting() {
        // Create lighting that follows the helix structure
        const helixLights = [];

        // Top and bottom lights for the helix
        const topLight = new THREE.PointLight(0xFFFFFF, 0.5, 15);
        topLight.position.set(0, 6, -3);
        topLight.userData = { helixLight: true, position: 'top' };
        this.scene.add(topLight);

        const bottomLight = new THREE.PointLight(0xFFFFFF, 0.5, 15);
        bottomLight.position.set(0, -6, -3);
        bottomLight.userData = { helixLight: true, position: 'bottom' };
        this.scene.add(bottomLight);

        // Elemental accent lights around the helix
        const elementalAccents = [
            { color: 0xFF4500, angle: 0, element: 'Fire' },
            { color: 0x1E90FF, angle: Math.PI / 2, element: 'Water' },
            { color: 0x8B4513, angle: Math.PI, element: 'Earth' },
            { color: 0x87CEEB, angle: 3 * Math.PI / 2, element: 'Air' }
        ];

        elementalAccents.forEach((accent, index) => {
            const accentLight = new THREE.PointLight(accent.color, 0.3, 20);
            const radius = 8;
            accentLight.position.set(
                Math.cos(accent.angle) * radius,
                0,
                Math.sin(accent.angle) * radius - 3
            );
            accentLight.userData = {
                element: accent.element,
                pulsePhase: index * 0.8,
                originalIntensity: 0.3
            };
            this.scene.add(accentLight);
        });
    }

    createCathedralArchitecture() {
        // Gothic Archways (3D Models)
        const archGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8, 8, 1, true);
        const archMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b4513,
            transparent: true,
            opacity: 0.7
        });

        // Create multiple arches in 3D space
        for (let i = 0; i < 5; i++) {
            const arch = new THREE.Mesh(archGeometry, archMaterial);
            arch.position.set((i - 2) * 4, 0, -8);
            arch.rotation.z = Math.PI / 2;
            this.scene.add(arch);
        }

        // Stained Glass Windows (3D Panels)
        const windowGeometry = new THREE.PlaneGeometry(3, 5);
        const windowMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });

        for (let i = 0; i < 4; i++) {
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.set((i - 1.5) * 5, 2.5, -10);
            this.scene.add(window);
        }

        // Floating Orbs (Interactive 3D Elements)
        const orbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const orbMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            emissive: 0x442211,
            transparent: true,
            opacity: 0.8
        });

        for (let i = 0; i < 8; i++) {
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            const angle = (i / 8) * Math.PI * 2;
            const radius = 12;
            orb.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 3,
                -5 + Math.sin(angle * 2) * 2
            );
            this.scene.add(orb);
            this.sacredGeometry.push(orb);
        }
    }

    animate3D() {
        if (!this.isInitialized) return;

        requestAnimationFrame(() => this.animate3D());

        // Update controls
        this.controls.update();

        // Animate sacred geometry with Codex-aware animation
        this.sacredGeometry.forEach((obj, index) => {
            // Handle Codex nodes with special animation
            if (obj.userData && obj.userData.codexNode) {
                this.animateCodexNode(obj, index);
            }
            // Handle spine vertebrae with Major Arcana animation
            else if (obj.userData && obj.userData.spineIndex !== undefined) {
                this.animateSpineVertebra(obj, index);
            }
            // Handle helix structures with elemental animation
            else if (obj.userData && obj.userData.element) {
                this.animateHelixStrand(obj, index);
            }
            // Handle sacred nodes in helix
            else if (obj.userData && obj.userData.sacredNode) {
                this.animateSacredNode(obj, index);
            }
            // Handle harmonic bridges
            else if (obj.userData && obj.userData.harmonicConnection) {
                this.animateHarmonicBridge(obj, index);
            }
            // Handle Merkaba special case
            else if (obj.children && obj.children.length > 0) {
                obj.children.forEach((child, childIndex) => {
                    if (child.userData && child.userData.codexNode) {
                        this.animateCodexNode(child, index + childIndex);
                    } else if (child.userData && child.userData.element) {
                        this.animateHelixStrand(child, index + childIndex);
                    } else if (child.userData && child.userData.sacredNode) {
                        this.animateSacredNode(child, index + childIndex);
                    } else {
                        // Standard animation for other objects
                        child.rotation.x += 0.005 + (index + childIndex) * 0.001;
                        child.rotation.y += 0.007 + (index + childIndex) * 0.002;
                    }
                });
            }
            // Standard animation for other objects
            else {
                obj.rotation.x += 0.005 + index * 0.001;
                obj.rotation.y += 0.007 + index * 0.002;
                obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            }
        });

        // Animate particles
        this.animateParticles();

        // Animate enhanced lighting
        this.animateEnhancedLighting();

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    fallbackToCSS3D() {
        console.log('🛠️ Falling back to CSS 3D effects');
        // Create CSS-based 3D effects for browsers without WebGL
        this.createCSS3DEffects();
    }

    createCSS3DEffects() {
        // Create CSS 3D transforms for sacred geometry
        const style = document.createElement('style');
        style.textContent = `
            .css-3d-geometry {
                position: absolute;
                transform-style: preserve-3d;
                animation: float3D 8s ease-in-out infinite;
            }

            @keyframes float3D {
                0%, 100% { transform: translateZ(0px) rotateX(0deg) rotateY(0deg); }
                25% { transform: translateZ(20px) rotateX(90deg) rotateY(90deg); }
                50% { transform: translateZ(40px) rotateX(180deg) rotateY(180deg); }
                75% { transform: translateZ(20px) rotateX(270deg) rotateY(270deg); }
            }

            .sacred-orb-css {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #ffd700, #b87333);
                box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
                position: absolute;
                animation: pulse3D 3s ease-in-out infinite alternate;
            }

            @keyframes pulse3D {
                0% { transform: scale(1) translateZ(0px); }
                100% { transform: scale(1.2) translateZ(30px); }
            }
        `;
        document.head.appendChild(style);

        // Add CSS 3D elements to cathedral chamber
        const cathedralChamber = document.getElementById('cathedral');
        if (cathedralChamber) {
            for (let i = 0; i < 5; i++) {
                const orb = document.createElement('div');
                orb.className = 'sacred-orb-css';
                orb.style.left = `${20 + i * 15}%`;
                orb.style.top = `${20 + (i % 2) * 20}%`;
                orb.style.animationDelay = `${i * 0.5}s`;
                cathedralChamber.appendChild(orb);
            }
        }
    }

    // Public API for external interaction
    focusOnObject(objectName) {
        // Camera animation to focus on specific 3D objects
        console.log(`🎯 Focusing 3D camera on: ${objectName}`);
    }

    addSacredObject(geometry, material, position) {
        const object = new THREE.Mesh(geometry, material);
        object.position.set(...position);
        this.scene.add(object);
        this.sacredGeometry.push(object);
        return object;
    }
}

// Global 3D Engine Instance
let cathedral3D = null;

// Initialize 3D Graphics when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing 3D Cathedral Graphics Engine...');

    cathedral3D = new Cathedral3DEngine();

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
        cathedral3D.init();
    }, 1000);
});

// Export for use in other modules
window.Cathedral3DEngine = Cathedral3DEngine;
window.cathedral3D = cathedral3D;
