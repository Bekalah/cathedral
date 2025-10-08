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

        // DNA Helix (Consciousness Strands)
        for (let i = 0; i < 2; i++) {
            const helixGeometry = new THREE.TorusKnotGeometry(1.5, 0.4, 64, 8, 2, 3);
            const helixMaterial = new THREE.MeshPhongMaterial({
                color: i === 0 ? 0x50c878 : 0xe0115f,
                transparent: true,
                opacity: 0.3
            });

            const helix = new THREE.Mesh(helixGeometry, helixMaterial);
            helix.position.set((i - 0.5) * 6, 1, -3);
            helix.rotation.x = Math.PI / 2;
            this.scene.add(helix);
            this.sacredGeometry.push(helix);
        }

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

        // Mystical Point Lights
        const mysticalLights = [
            { color: 0x50c878, position: [-10, 5, -5], intensity: 0.8 },
            { color: 0xe0115f, position: [10, 5, -5], intensity: 0.8 },
            { color: 0x4682b4, position: [0, -5, -5], intensity: 0.6 }
        ];

        mysticalLights.forEach(lightData => {
            const pointLight = new THREE.PointLight(lightData.color, lightData.intensity, 30);
            pointLight.position.set(...lightData.position);
            this.scene.add(pointLight);
        });

        // Sacred Spotlights for dramatic effect
        const spotLight = new THREE.SpotLight(0xffd700, 1, 20, Math.PI / 6);
        spotLight.position.set(0, 15, 0);
        spotLight.target.position.set(0, 0, -5);
        spotLight.castShadow = true;
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);
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

        // Animate sacred geometry
        this.sacredGeometry.forEach((obj, index) => {
            obj.rotation.x += 0.005 + index * 0.001;
            obj.rotation.y += 0.007 + index * 0.002;
            obj.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });

        // Animate particles
        this.animateParticles();

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
