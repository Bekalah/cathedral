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
