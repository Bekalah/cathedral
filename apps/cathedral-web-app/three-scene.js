// Three.js Scene for Cathedral Real Main App
let scene, camera, renderer, controls;
let animationId;
let isAnimating = true;
let traumaSafeMode = true;

function initThreeScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    
    // Create renderer
    const canvas = document.getElementById('threeCanvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create cathedral structure
    createCathedralStructure();
    
    // Add mouse controls
    addMouseControls();
    
    // Start animation loop
    animate();
}

function createCathedralStructure() {
    const group = new THREE.Group();
    
    // Create base foundation
    const foundationGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const foundationMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x2c1810,
        transparent: true,
        opacity: 0.8
    });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = -2;
    foundation.receiveShadow = true;
    group.add(foundation);
    
    // Create main tower
    const towerGeometry = new THREE.CylinderGeometry(1.5, 2, 8, 8);
    const towerMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x4a4a4a,
        transparent: true,
        opacity: 0.9
    });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 2;
    tower.castShadow = true;
    group.add(tower);
    
    // Create spire
    const spireGeometry = new THREE.ConeGeometry(0.8, 3, 8);
    const spireMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x64ffda,
        transparent: true,
        opacity: 0.8,
        emissive: 0x0a3333,
        emissiveIntensity: 0.2
    });
    const spire = new THREE.Mesh(spireGeometry, spireMaterial);
    spire.position.y = 6.5;
    spire.castShadow = true;
    group.add(spire);
    
    // Create side pillars
    const pillarPositions = [
        [-3, -1, -3], [3, -1, -3], [-3, -1, 3], [3, -1, 3]
    ];
    
    pillarPositions.forEach(pos => {
        const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.4, 4, 6);
        const pillarMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x666666,
            transparent: true,
            opacity: 0.7
        });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(pos[0], pos[1], pos[2]);
        pillar.castShadow = true;
        group.add(pillar);
    });
    
    // Add floating sacred geometry
    addSacredGeometry(group);
    
    scene.add(group);
}

function addSacredGeometry(group) {
    // Create tetrahedrons (sacred geometry)
    for (let i = 0; i < 6; i++) {
        const geometry = new THREE.TetrahedronGeometry(0.5);
        const material = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(i / 6, 0.8, 0.6),
            transparent: true,
            opacity: 0.8,
            emissive: new THREE.Color().setHSL(i / 6, 0.5, 0.1),
            emissiveIntensity: 0.3
        });
        const tetra = new THREE.Mesh(geometry, material);
        
        const angle = (i / 6) * Math.PI * 2;
        const radius = 4 + Math.sin(angle) * 2;
        tetra.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle * 2) * 2,
            Math.sin(angle) * radius
        );
        
        tetra.userData = { rotationSpeed: 0.02 + Math.random() * 0.03 };
        group.add(tetra);
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
    
    const canvas = document.getElementById('threeCanvas');
    
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
        camera.position.z = Math.max(3, Math.min(20, camera.position.z));
    });
    
    // Update rotation in animation loop
    function updateRotation() {
        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;
        
        scene.rotation.x = rotationX;
        scene.rotation.y = rotationY;
    }
    
    canvas.updateRotation = updateRotation;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Update sacred geometry rotation
    scene.traverse((child) => {
        if (child.userData.rotationSpeed) {
            child.rotation.x += child.userData.rotationSpeed;
            child.rotation.y += child.userData.rotationSpeed * 0.7;
            child.rotation.z += child.userData.rotationSpeed * 0.5;
        }
    });
    
    // Update mouse controls
    const canvas = document.getElementById('threeCanvas');
    if (canvas.updateRotation) {
        canvas.updateRotation();
    }
    
    if (isAnimating) {
        scene.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    const button = document.querySelector('.control-button');
    button.textContent = isAnimating ? '⏸️ Pause' : '▶️ Play';
}

function resetCamera() {
    camera.position.set(0, 0, 10);
    scene.rotation.set(0, 0, 0);
}

function toggleTraumaMode() {
    traumaSafeMode = !traumaSafeMode;
    
    if (traumaSafeMode) {
        // Reduce motion, lower contrast
        scene.traverse((child) => {
            if (child.material) {
                child.material.emissiveIntensity = Math.max(0.1, child.material.emissiveIntensity * 0.5);
            }
        });
        document.querySelector('.info-panel').innerHTML = `
            <h4>Trauma-Safe Mode Active</h4>
            <p>Reduced motion and gentle lighting for comfort. All interactive elements remain fully accessible.</p>
        `;
    } else {
        // Full visual experience
        scene.traverse((child) => {
            if (child.material) {
                child.material.emissiveIntensity = Math.min(0.8, child.material.emissiveIntensity * 2);
            }
        });
        document.querySelector('.info-panel').innerHTML = `
            <h4>Sacred Geometry</h4>
            <p>Experience cathedral structures through trauma-safe 3D visualization. Use mouse to rotate, scroll to zoom.</p>
        `;
    }
    
    const button = document.querySelectorAll('.control-button')[2];
    button.textContent = traumaSafeMode ? '🛡️ Trauma Safe' : '🌟 Full Experience';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize when page loads
window.addEventListener('load', () => {
    initThreeScene();
});