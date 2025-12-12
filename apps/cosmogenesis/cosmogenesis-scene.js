// Cosmogenesis 3D Scene - Sacred Geometry Visualization
let scene, camera, renderer, currentGeometry;
let animationId;
let isAnimating = true;
let particles = [];
let particleCount = 1000;

const geometryData = {
    tetrahedron: {
        info: "The tetrahedron is the simplest Platonic solid, representing the element of fire and the foundation of all sacred geometry. Each face is an equilateral triangle, creating perfect balance and harmony.",
        color: 0xff6b6b
    },
    cube: {
        info: "The cube represents earth and stability. With its six square faces and eight vertices, it embodies the foundation of solid reality and earthly structure.",
        color: 0x4ecdc4
    },
    octahedron: {
        info: "The octahedron, with eight triangular faces, represents air and intellect. It bridges the gap between earth and fire, embodying communication and balance.",
        color: 0x45b7d1
    },
    dodecahedron: {
        info: "The dodecahedron contains twelve pentagonal faces and is associated with the cosmos and the universe. It represents the fifth element: ether or spirit.",
        color: 0xf9ca24
    },
    icosahedron: {
        info: "The icosahedron has twenty triangular faces and represents water and emotion. It embodies flow, adaptability, and the creative principle of life.",
        color: 0x6c5ce7
    },
    mandala: {
        info: "Mandala patterns represent wholeness, unity, and the cosmic order. These sacred geometric patterns serve as spiritual and ritual symbols across cultures.",
        color: 0xfd79a8
    }
};

const colorSchemes = {
    cosmic: {
        primary: 0x64ffda,
        secondary: 0x00bcd4,
        accent: 0x9c27b0,
        background: 0x0a0a0a
    },
    sacred: {
        primary: 0xffd700,
        secondary: 0xffa500,
        accent: 0x8b4513,
        background: 0x2c1810
    },
    mystical: {
        primary: 0x9c27b0,
        secondary: 0x673ab7,
        accent: 0xe91e63,
        background: 0x1a1a2e
    },
    neutral: {
        primary: 0x9e9e9e,
        secondary: 0x757575,
        accent: 0x616161,
        background: 0x2d2d2d
    }
};

function initCosmogenesis() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(colorSchemes.cosmic.background);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);
    
    // Create renderer
    const canvas = document.getElementById('cosmosCanvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add lights
    addLighting();
    
    // Create initial geometry
    createGeometry('tetrahedron');
    
    // Add particles
    createParticles();
    
    // Add mouse controls
    addMouseControls();
    
    // Setup controls
    setupControls();
    
    // Start animation
    animate();
}

function addLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x64ffda, 1, 20);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x9c27b0, 1, 20);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

function createGeometry(type) {
    // Remove current geometry
    if (currentGeometry) {
        scene.remove(currentGeometry);
    }
    
    // Create new geometry based on type
    let geometry, material, mesh;
    
    const complexity = parseInt(document.getElementById('complexity').value);
    const speed = parseFloat(document.getElementById('speed').value);
    const wireframe = document.getElementById('wireframe').checked;
    const colorScheme = colorSchemes[document.getElementById('colorScheme').value];
    
    switch(type) {
        case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(2, complexity);
            break;
        case 'cube':
            geometry = new THREE.BoxGeometry(3, 3, 3, complexity, complexity, complexity);
            break;
        case 'octahedron':
            geometry = new THREE.OctahedronGeometry(2, complexity);
            break;
        case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(2, complexity);
            break;
        case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(2, complexity);
            break;
        case 'mandala':
            geometry = createMandalaGeometry(complexity);
            break;
    }
    
    material = new THREE.MeshPhongMaterial({
        color: colorScheme.primary,
        wireframe: wireframe,
        transparent: true,
        opacity: 0.8,
        emissive: colorScheme.accent,
        emissiveIntensity: 0.2,
        shininess: 100
    });
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { 
        rotationSpeed: speed * 0.02,
        originalType: type
    };
    
    currentGeometry = mesh;
    scene.add(mesh);
    
    // Update info panel
    updateInfoPanel(type);
}

function createMandalaGeometry(complexity) {
    const group = new THREE.Group();
    const segments = complexity * 8;
    const radius = 2;
    
    // Create mandala pattern using circles
    for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const innerRadius = radius * 0.3;
        const outerRadius = radius;
        
        const points = [];
        const pointsPerRing = 16;
        
        for (let j = 0; j < pointsPerRing; j++) {
            const t = j / pointsPerRing;
            const r = innerRadius + (outerRadius - innerRadius) * t;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            points.push(new THREE.Vector3(x, y, 0));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.6
        });
        const line = new THREE.LineLoop(geometry, material);
        group.add(line);
    }
    
    // Create center geometry
    const centerGeometry = new THREE.RingGeometry(0, 0.5, 32);
    const centerMaterial = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.8,
        emissive: 0xffa500,
        emissiveIntensity: 0.3
    });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    group.add(center);
    
    return group;
}

function createParticles() {
    // Clear existing particles
    particles.forEach(particle => scene.remove(particle));
    particles = [];
    
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: 0x64ffda,
        transparent: true,
        opacity: 0.6
    });
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material);
        
        // Position particles in a sphere around the geometry
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 8 + Math.random() * 10;
        
        particle.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
        
        particle.userData = {
            originalTheta: theta,
            originalPhi: phi,
            originalRadius: radius,
            rotationSpeed: 0.01 + Math.random() * 0.02
        };
        
        particles.push(particle);
        scene.add(particle);
    }
}

function addMouseControls() {
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationX = 0;
    let rotationY = 0;
    
    const canvas = document.getElementById('cosmosCanvas');
    
    canvas.addEventListener('mousedown', (event) => {
        mouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    canvas.addEventListener('mousemove', (event) => {
        if (!mouseDown) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    canvas.addEventListener('mouseup', () => {
        mouseDown = false;
    });
    
    canvas.addEventListener('wheel', (event) => {
        camera.position.z += event.deltaY * 0.01;
        camera.position.z = Math.max(4, Math.min(25, camera.position.z));
    });
    
    canvas.updateRotation = () => {
        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;
        
        scene.rotation.x = rotationX;
        scene.rotation.y = rotationY;
    };
}

function setupControls() {
    // Mode buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            createGeometry(btn.dataset.mode);
        });
    });
    
    // Color scheme selector
    document.getElementById('colorScheme').addEventListener('change', (e) => {
        const scheme = colorSchemes[e.target.value];
        scene.background = new THREE.Color(scheme.background);
        
        if (currentGeometry && currentGeometry.material) {
            currentGeometry.material.color.setHex(scheme.primary);
            currentGeometry.material.emissive.setHex(scheme.accent);
        }
        
        // Update particle colors
        particles.forEach(particle => {
            particle.material.color.setHex(scheme.secondary);
        });
    });
    
    // Speed slider
    const speedSlider = document.getElementById('speed');
    const speedValue = document.getElementById('speedValue');
    speedSlider.addEventListener('input', (e) => {
        speedValue.textContent = e.target.value;
        if (currentGeometry) {
            currentGeometry.userData.rotationSpeed = parseFloat(e.target.value) * 0.02;
        }
    });
    
    // Complexity slider
    const complexitySlider = document.getElementById('complexity');
    const complexityValue = document.getElementById('complexityValue');
    complexitySlider.addEventListener('input', (e) => {
        complexityValue.textContent = e.target.value;
        const activeBtn = document.querySelector('.mode-btn.active');
        if (activeBtn) {
            createGeometry(activeBtn.dataset.mode);
        }
    });
    
    // Checkboxes
    document.getElementById('wireframe').addEventListener('change', () => {
        if (currentGeometry) {
            currentGeometry.material.wireframe = document.getElementById('wireframe').checked;
        }
    });
    
    document.getElementById('particles').addEventListener('change', (e) => {
        particles.forEach(particle => {
            particle.visible = e.target.checked;
        });
    });
}

function updateInfoPanel(type) {
    const info = geometryData[type];
    document.getElementById('geometryInfo').textContent = info.info;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    if (currentGeometry && isAnimating) {
        const speed = currentGeometry.userData.rotationSpeed || 0.01;
        currentGeometry.rotation.x += speed;
        currentGeometry.rotation.y += speed * 0.7;
        currentGeometry.rotation.z += speed * 0.3;
    }
    
    // Update particles
    if (document.getElementById('particles').checked) {
        particles.forEach(particle => {
            const data = particle.userData;
            particle.rotation.y += data.rotationSpeed;
            particle.position.x = data.originalRadius * Math.sin(data.originalPhi) * Math.cos(data.originalTheta + particle.rotation.y);
            particle.position.z = data.originalRadius * Math.cos(data.originalPhi);
        });
    }
    
    // Update mouse controls
    const canvas = document.getElementById('cosmosCanvas');
    if (canvas.updateRotation) {
        canvas.updateRotation();
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize when page loads
window.addEventListener('load', () => {
    initCosmogenesis();
});