import * as THREE from 'three';
import { MysticalMaterials } from './MysticalMaterials';
import { CathedralLighting } from './CathedralLighting';

/**
 * SacredGeometryRenderer
 * Renders sacred geometric forms with mystical properties
 */
export class SacredGeometryRenderer {
  private scene: THREE.Scene;
  private materials: MysticalMaterials;
  private lighting: CathedralLighting;
  private geometryCache: Map<string, THREE.BufferGeometry> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.materials = new MysticalMaterials();
    this.lighting = new CathedralLighting(scene);
  }

  /**
   * Render Flower of Life pattern
   */
  renderFlowerOfLife(center: THREE.Vector3, radius: number, layers: number = 3): THREE.Group {
    const group = new THREE.Group();

    for (let layer = 1; layer <= layers; layer++) {
      const layerRadius = radius * (layer / layers);
      const circles = this.createFlowerOfLifeLayer(layerRadius, layer);

      circles.forEach(circle => {
        circle.position.copy(center);
        group.add(circle);
      });
    }

    // Add central point
    const centerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const centerMaterial = this.materials.createAuraMaterial({
      color: 0x88ccff,
      intensity: 0.8,
      opacity: 0.8
    });
    const centerPoint = new THREE.Mesh(centerGeometry, centerMaterial);
    centerPoint.position.copy(center);
    group.add(centerPoint);

    this.scene.add(group);
    return group;
  }

  /**
   * Create a single layer of Flower of Life pattern
   */
  private createFlowerOfLifeLayer(radius: number, points: number): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    const angleStep = (Math.PI * 2) / points;

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const circleGeometry = new THREE.RingGeometry(radius * 0.95, radius * 1.05, 32);
      const circleMaterial = this.materials.createSacredGeometryMaterial();

      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.rotation.x = -Math.PI / 2; // Lay flat
      circle.position.set(x, 0, z);

      meshes.push(circle);
    }

    return meshes;
  }

  /**
   * Render Metatron's Cube
   */
  renderMetatronsCube(center: THREE.Vector3, size: number): THREE.Group {
    const group = new THREE.Group();

    // Create the 13 spheres of Metatron's Cube
    const spherePositions = this.calculateMetatronPositions(size);

    spherePositions.forEach((position, index) => {
      const sphereGeometry = new THREE.SphereGeometry(0.1, 12, 12);
      const sphereMaterial = this.materials.createAuraMaterial({
        color: 0xff6b6b,
        intensity: 0.7,
        opacity: 0.8
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(center).add(position);
      group.add(sphere);

      // Add connecting lines between spheres
      if (index > 0) {
        const lines = this.createMetatronConnections(spherePositions, index, center);
        lines.forEach(line => group.add(line));
      }
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Calculate positions for Metatron's Cube spheres
   */
  private calculateMetatronPositions(size: number): THREE.Vector3[] {
    const positions: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    // Central sphere
    positions.push(new THREE.Vector3(0, 0, 0));

    // Inner ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * size,
        0,
        Math.sin(angle) * size
      ));
    }

    // Outer ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * size * phi,
        0,
        Math.sin(angle) * size * phi
      ));
    }

    return positions;
  }

  /**
   * Create connecting lines for Metatron's Cube
   */
  private createMetatronConnections(positions: THREE.Vector3[], currentIndex: number, center: THREE.Vector3): THREE.Line[] {
    const lines: THREE.Line[] = [];

    for (let i = 0; i < currentIndex; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        positions[currentIndex].clone().add(center),
        positions[i].clone().add(center)
      ]);

      const material = new THREE.LineBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.4
      });

      lines.push(new THREE.Line(geometry, material));
    }

    return lines;
  }

  /**
   * Render Sri Yantra pattern
   */
  renderSriYantra(center: THREE.Vector3, size: number): THREE.Group {
    const group = new THREE.Group();

    // Create multiple interlocking triangles and circles
    const triangles = this.createSriYantraTriangles(size);
    triangles.forEach(triangle => {
      triangle.position.copy(center);
      group.add(triangle);
    });

    // Add lotus petals around the edge
    const petals = this.createLotusPetals(size * 1.2);
    petals.forEach(petal => {
      petal.position.copy(center);
      group.add(petal);
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Create Sri Yantra triangular components
   */
  private createSriYantraTriangles(size: number): THREE.Mesh[] {
    const triangles: THREE.Mesh[] = [];

    // Upward triangles (masculine energy)
    const upwardTriangleGeometry = new THREE.BufferGeometry();
    const upwardVertices = new Float32Array([
      -size, 0, 0,
      size, 0, 0,
      0, size * 1.5, 0
    ]);
    upwardTriangleGeometry.setAttribute('position', new THREE.BufferAttribute(upwardVertices, 3));

    const upwardMaterial = this.materials.createSacredGeometryMaterial();
    const upwardTriangle = new THREE.Mesh(upwardTriangleGeometry, upwardMaterial);
    triangles.push(upwardTriangle);

    // Downward triangles (feminine energy)
    const downwardTriangleGeometry = new THREE.BufferGeometry();
    const downwardVertices = new Float32Array([
      -size, 0, 0,
      size, 0, 0,
      0, -size * 1.5, 0
    ]);
    downwardTriangleGeometry.setAttribute('position', new THREE.BufferAttribute(downwardVertices, 3));

    const downwardMaterial = this.materials.createSacredGeometryMaterial();
    const downwardTriangle = new THREE.Mesh(downwardTriangleGeometry, downwardMaterial);
    triangles.push(downwardTriangle);

    return triangles;
  }

  /**
   * Create lotus petal decorations
   */
  private createLotusPetals(radius: number): THREE.Mesh[] {
    const petals: THREE.Mesh[] = [];
    const petalCount = 16;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const petalGeometry = new THREE.SphereGeometry(0.1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      const petalMaterial = this.materials.createAuraMaterial({
        color: 0xff69b4,
        intensity: 0.6,
        opacity: 0.8
      });

      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      petal.position.set(x, 0, z);
      petal.rotation.z = angle;

      petals.push(petal);
    }

    return petals;
  }

  /**
   * Render Platonic Solids
   */
  renderPlatonicSolid(center: THREE.Vector3, type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron', size: number): THREE.Mesh {
    let geometry: THREE.BufferGeometry;

    switch (type) {
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(size);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(size);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(size);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(size);
        break;
      default:
        geometry = new THREE.OctahedronGeometry(size);
    }

    const material = this.materials.createSacredGeometryMaterial();
    const solid = new THREE.Mesh(geometry, material);
    solid.position.copy(center);

    // Add wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    wireframe.position.copy(center);
    solid.add(wireframe);

    this.scene.add(solid);
    return solid;
  }

  /**
   * Animate sacred geometry with mystical energy patterns
   */
  animateSacredGeometry(object: THREE.Object3D, animationType: 'pulse' | 'rotate' | 'breathe' | 'flow'): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      switch (animationType) {
        case 'pulse':
          object.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
          break;
        case 'rotate':
          object.rotation.y = time * 0.5;
          break;
        case 'breathe':
          const breatheScale = 1 + Math.sin(time) * 0.05;
          object.scale.setScalar(breatheScale);
          break;
        case 'flow':
          object.rotation.x = Math.sin(time * 0.3) * 0.2;
          object.rotation.y = time * 0.2;
          break;
      }
    };
    animate();
  }

  /**
   * Render ROSS LYN CATHEDRAL Architecture - Authentic Recreation
   * Models the famous Rosslyn Chapel with cubic pillars and elaborate stone carvings
   */
  renderRosslynCathedral(center: THREE.Vector3, scale: number = 1): THREE.Group {
    const group = new THREE.Group();
    const stoneMaterial = this.materials.createStoneMaterial();
    const lightMaterial = this.materials.createAuraMaterial({ color: 0xffd700, intensity: 0.6 });

    // MAIN PILLARS - Cubic with Transmission Engravings (Rosslyn's signature design)
    const pillars = this.createRosslynPillars(center, scale);
    pillars.forEach(pillar => group.add(pillar));

    // APPRENTICE PILLAR - The most ornate with unique carvings
    const apprenticePillar = this.createApprenticePillar(
      new THREE.Vector3(center.x - scale * 2.5, center.y, center.z),
      scale
    );
    group.add(apprenticePillar);

    // APPRENTICE MASTER PILLAR - Different design from the apprentice
    const masterPillar = this.createApprenticeMasterPillar(
      new THREE.Vector3(center.x + scale * 2.5, center.y, center.z),
      scale
    );
    group.add(masterPillar);

    // VAULTED ARCHWAYS - Gothic stone arches with detailed carvings
    const archways = this.createVaultedArchways(center, scale);
    archways.forEach(arch => group.add(arch));

    // CEILING VAULTS - Complex Gothic ribbed ceilings
    const vaults = this.createRosslynVaults(center, scale);
    vaults.forEach(vault => group.add(vault));

    // SACRED GEOMETRY CARVINGS - Cube within spheres/angels/reptiles/vegetation
    const carvings = this.createRosslynCarvings(center, scale);
    carvings.forEach(carving => group.add(carving));

    // TRANSMISSION PATTERNS - Wall engravings like DNA/144:99 patterns
    const transmissions = this.createTransmissionPatterns(center, scale);
    transmissions.forEach(transmission => group.add(transmission));

    this.scene.add(group);
    return group;
  }

  /**
   * Create a single helix strand with codex-compliant geometry
   */
  private createHelixStrand(radius: number, height: number, turns: number, phaseOffset: number, color: number, element: string): THREE.Group {
    const group = new THREE.Group();
    const points: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;

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

    // Create material based on element
    const material = this.createElementalMaterial(color, element);
    const helix = new THREE.Mesh(helixGeometry, material);

    // Add pulsing animation data
    helix.userData = {
      element,
      pulsePhase: phaseOffset,
      rotationSpeed: element === 'Fire' ? 0.02 : 0.015,
      harmonicRatio: element === 'Fire' ? 144 : 99
    };

    group.add(helix);

    // Add energy particles along the helix
    const particles = this.createHelixParticles(points, color, element);
    particles.forEach(particle => group.add(particle));

    return group;
  }

  /**
   * Create elemental material with codex properties
   */
  private createElementalMaterial(color: number, element: string): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      attribute float energy;

      void main() {
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;
      uniform float intensity;
      uniform float opacity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        float alpha = fresnel * pulse * opacity * intensity;

        gl_FragColor = vec4(baseColor, alpha);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(color) },
        intensity: { value: 0.8 },
        opacity: { value: 0.7 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Create sacred nodes at key harmonic points along the helix
   */
  private createSacredNodes(center: THREE.Vector3, radius: number, height: number, turns: number): THREE.Group[] {
    const nodes: THREE.Group[] = [];
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
      const nodeMaterial = this.materials.createAuraMaterial({
        color: fibIndex === 144 ? 0xFFFFFF : fibIndex === 99 ? 0xDDA0DD : 0xFFD700,
        intensity: 0.9,
        opacity: 0.8
      });

      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.userData = {
        sacredNode: true,
        fibonacciIndex: fibIndex,
        harmonicRatio: fibIndex === 144 ? '144' : fibIndex === 99 ? '99' : 'harmonic',
        pulsePhase: nodeIndex * phi
      };

      nodeGroup.add(nodeMesh);
      nodes.push(nodeGroup);
    });

    return nodes;
  }

  /**
   * Create energy bridges between the two helices
   */
  private createHelixBridges(helix1: THREE.Group, helix2: THREE.Group, center: THREE.Vector3, radius: number): THREE.Line[] {
    const bridges: THREE.Line[] = [];
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

  /**
   * Create energy particles flowing along the helix
   */
  private createHelixParticles(points: THREE.Vector3[], color: number, element: string): THREE.Points[] {
    const particles: THREE.Points[] = [];
    const particleCount = Math.floor(points.length / 8); // Every 8th point

    for (let strand = 0; strand < 3; strand++) {
      const particlePositions: THREE.Vector3[] = [];
      const startOffset = strand * Math.floor(points.length / 3);

      for (let i = 0; i < particleCount; i++) {
        const pointIndex = (startOffset + i * 8) % points.length;
        particlePositions.push(points[pointIndex].clone());
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(particlePositions);
      const material = new THREE.PointsMaterial({
        color,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(geometry, material);
      particleSystem.userData = {
        element,
        strandIndex: strand,
        flowSpeed: element === 'Fire' ? 0.02 : 0.015,
        particleCount
      };

      particles.push(particleSystem);
    }

    return particles;
  }

  /**
   * Animate the codex helix with elemental patterns
   */
  animateCodexHelix(helixGroup: THREE.Group, deltaTime: number): void {
    const time = Date.now() * 0.001;

    helixGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.userData.element) {
        // Animate helix strands
        const element = child.userData.element;
        const pulseScale = 1 + Math.sin(time * 2 + child.userData.pulsePhase) * 0.2;
        child.scale.setScalar(pulseScale);

        // Elemental rotation patterns
        switch(element) {
          case 'Fire':
            child.rotation.y += child.userData.rotationSpeed * 2;
            child.rotation.x += child.userData.rotationSpeed;
            break;
          case 'Water':
            child.rotation.z += child.userData.rotationSpeed * 1.5;
            break;
        }
      } else if (child instanceof THREE.Mesh && child.userData.sacredNode) {
        // Animate sacred nodes
        const pulseScale = 1 + Math.sin(time * 3 + child.userData.pulsePhase) * 0.3;
        child.scale.setScalar(pulseScale);

        // Special animation for key nodes
        if (child.userData.fibonacciIndex === 144) {
          child.rotation.y += 0.02;
          child.rotation.x += 0.015;
          child.rotation.z += 0.01;
        }
      } else if (child instanceof THREE.Points && child.userData.element) {
        // Animate flowing particles
        const positions = child.geometry.attributes.position.array as Float32Array;
        const element = child.userData.element;
        const flowSpeed = child.userData.flowSpeed;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(time + i * 0.1) * flowSpeed;
        }

        child.geometry.attributes.position.needsUpdate = true;
      }
    });
  }

  // ============================================================================
  // 🏰 ROSS LYN CATHEDRAL ARCHITECTURE METHODS
  // ============================================================================

  /**
   * Create cubic pillars with transmission engravings - Rosslyn's signature design
   */
  private createRosslynPillars(center: THREE.Vector3, scale: number): THREE.Mesh[] {
    const pillars: THREE.Mesh[] = [];
    const pillarPositions = [
      new THREE.Vector3(-scale * 1.2, 0, 0),  // Left pillar
      new THREE.Vector3(scale * 1.2, 0, 0),   // Right pillar
      new THREE.Vector3(0, 0, -scale * 1.2),  // Back pillar
    ];

    pillarPositions.forEach((offset, index) => {
      const pos = center.clone().add(offset);
      const pillar = this.createCubicPillar(pos, scale, index);
      pillars.push(pillar);
    });

    return pillars;
  }

  /**
   * Create cubic pillar with transmission engravings
   */
  private createCubicPillar(position: THREE.Vector3, scale: number, pillarIndex: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(scale * 0.4, scale * 4, scale * 0.4);

    // Create material with stone-like appearance
    const material = new THREE.MeshPhongMaterial({
      color: 0x8B7355,
      shininess: 30,
      specular: 0x222222
    });

    const pillar = new THREE.Mesh(geometry, material);
    pillar.position.copy(position);

    // Add transmission engravings (geometric patterns)
    const carvings = this.createTransmissionCarvings(pillar, scale);
    carvings.forEach(carving => pillar.add(carving));

    pillar.userData = { rosslynPillar: true, pillarIndex };
    return pillar;
  }

  /**
   * Apprentice Pillar - Most ornate with unique carvings
   */
  private createApprenticePillar(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();
    const pillar = this.createCubicPillar(position, scale, -1);
    group.add(pillar);

    // Add extensive carvings: angels, plants, celestial symbols
    const carvings = this.createApprenticeCarvings(position, scale);
    carvings.forEach(carving => group.add(carving));

    // Add symbolic light (blue)
    const lightGeometry = new THREE.CylinderGeometry(0.1, 0.1, scale * 4);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x4169E1, transparent: true, opacity: 0.3 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.copy(position);
    group.add(light);

    group.userData = { apprenticePillar: true };
    return group;
  }

  /**
   * Apprentice Master Pillar - Different design than apprentice
   */
  private createApprenticeMasterPillar(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();
    const pillar = this.createCubicPillar(position, scale, -2);
    group.add(pillar);

    // Different carving style: more masculine, sophisticated
    const carvings = this.createMasterCarvings(position, scale);
    carvings.forEach(carving => group.add(carving));

    // Add symbolic light (golden)
    const lightGeometry = new THREE.CylinderGeometry(0.1, 0.1, scale * 4);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.4 });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.copy(position);
    group.add(light);

    group.userData = { masterPillar: true };
    return group;
  }

  /**
   * Create Gothic vaulted archways
   */
  private createVaultedArchways(center: THREE.Vector3, scale: number): THREE.Mesh[] {
    const arches: THREE.Mesh[] = [];

    // Create multiple archways around the structure
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const pos = center.clone().add(
        new THREE.Vector3(Math.cos(angle) * scale * 1.5, 0, Math.sin(angle) * scale * 1.5)
      );

      const arch = this.createGothicArch(pos, scale);
      arches.push(arch);
    }

    return arches;
  }

  /**
   * Create Gothic-style arch
   */
  private createGothicArch(position: THREE.Vector3, scale: number): THREE.Mesh {
    const points: THREE.Vector3[] = [];

    // Create ogive (sharp) arch shape
    for (let i = 0; i <= 18; i++) {
      const theta = (Math.PI / 3) * (i / 18); // 60 degrees for ogive
      const x = scale * Math.sin(theta);
      const y = scale * Math.cos(theta);
      points.push(new THREE.Vector3(x, y, 0));
    }

    // Mirror for full arch
    const reversedPoints = points.map(p => new THREE.Vector3(-p.x, p.y, p.z)).reverse();
    points.push(...reversedPoints);

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 50, scale * 0.1);

    const material = new THREE.MeshPhongMaterial({
      color: 0x8B7355,
      shininess: 20
    });

    const arch = new THREE.Mesh(geometry, material);
    arch.position.copy(position);

    // Add detailed carvings on the arch
    const archCarvings = this.createArchCarvings(arch, scale);
    archCarvings.forEach(carving => arch.add(carving));

    return arch;
  }

  /**
   * Create complex Gothic ribbed ceiling vaults
   */
  private createRosslynVaults(center: THREE.Vector3, scale: number): THREE.Group[] {
    const vaults: THREE.Group[] = [];

    // Boss position (ceiling center)
    const bossPos = center.clone().add(new THREE.Vector3(0, scale * 2.5, 0));

    // Create multiple vault compartments
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        const vaultPos = bossPos.clone().add(
          new THREE.Vector3(x * scale, 0, z * scale)
        );

        const vault = this.createVaultCompartment(vaultPos, scale);
        vaults.push(vault);
      }
    }

    // Create central boss (ornate ceiling carving)
    const boss = this.createCeilingBoss(bossPos, scale);
    vaults.push(boss);

    return vaults;
  }

  /**
   * Create individual vault compartment with ribs
   */
  private createVaultCompartment(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Create ribbed vault structure
    const ribs = ['diagonal', 'transverse', 'longitudinal'];
    ribs.forEach(ribType => {
      const rib = this.createVaultRib(position, scale, ribType);
      group.add(rib);
    });

    // Thin ceiling panel
    const panelGeometry = new THREE.PlaneGeometry(scale * 0.8, scale * 0.8);
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B7355,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });

    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.copy(position);
    panel.rotation.x = -Math.PI / 2;
    group.add(panel);

    return group;
  }

  /**
   * Create vault ribbing
   */
  private createVaultRib(position: THREE.Vector3, scale: number, type: string): THREE.Mesh {
    let points: THREE.Vector3[] = [];

    switch (type) {
      case 'diagonal':
        points = [
          new THREE.Vector3(position.x - scale/2, position.y, position.z - scale/2),
          new THREE.Vector3(position.x, position.y, position.z),
          new THREE.Vector3(position.x + scale/2, position.y, position.z + scale/2)
        ];
        break;
      case 'transverse':
        points = [
          new THREE.Vector3(position.x - scale/3, position.y, position.z),
          new THREE.Vector3(position.x, position.y, position.z),
          new THREE.Vector3(position.x + scale/3, position.y, position.z)
        ];
        break;
      case 'longitudinal':
        points = [
          new THREE.Vector3(position.x, position.y, position.z - scale/3),
          new THREE.Vector3(position.x, position.y, position.z),
          new THREE.Vector3(position.x, position.y, position.z + scale/3)
        ];
        break;
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, scale * 0.02);

    const material = new THREE.MeshPhongMaterial({
      color: 0x654321,
      shininess: 15
    });

    const rib = new THREE.Mesh(geometry, material);
    return rib;
  }

  /**
   * Create ornate ceiling boss (center carving)
   */
  private createCeilingBoss(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Complex geometric boss in the center
    const bossGeometry = new THREE.DodecahedronGeometry(scale * 0.3);
    const bossMaterial = this.materials.createAuraMaterial({
      color: 0xFFD700,
      intensity: 0.8,
      opacity: 0.9
    });

    const boss = new THREE.Mesh(bossGeometry, bossMaterial);
    boss.position.copy(position);
    group.add(boss);

    // Add symbolic light emanating from boss
    this.lighting.createArchitecturalLight(boss.position.clone().add(new THREE.Vector3(0, 1, 0)), 'boss', 0xFFD700);

    return group;
  }

  /**
   * Sacred geometric carvings throughout walls and pillars
   */
  private createRosslynCarvings(center: THREE.Vector3, scale: number): THREE.Group[] {
    const carvings: THREE.Group[] = [];

    // Angel carvings
    const angelPositions = [
      new THREE.Vector3(-scale * 1.8, scale * 1.5, scale * 1.8),
      new THREE.Vector3(scale * 1.8, scale * 1.5, -scale * 1.8)
    ];

    angelPositions.forEach(pos => {
      const angel = this.createAngelCarving(pos, scale);
      carvings.push(angel);
    });

    // Plant/reptile carvings
    const plantPositions = [
      new THREE.Vector3(scale * 1.8, scale, scale * 1.8),
      new THREE.Vector3(-scale * 1.8, scale, -scale * 1.8)
    ];

    plantPositions.forEach(pos => {
      const plant = this.createPlantCarving(pos, scale);
      carvings.push(plant);
    });

    // Cube within sphere carvings (metatron's cube themes)
    const cubeSpherePositions = [
      new THREE.Vector3(0, scale * 2, scale * 0.8),
      new THREE.Vector3(0, scale * 2, -scale * 0.8)
    ];

    cubeSpherePositions.forEach(pos => {
      const cubeSphere = this.createCubeSphereCarving(pos, scale);
      carvings.push(cubeSphere);
    });

    return carvings;
  }

  /**
   * Transmission patterns - DNA-like geometries on walls
   */
  private createTransmissionPatterns(center: THREE.Vector3, scale: number): THREE.Group[] {
    const patterns: THREE.Group[] = [];

    // Wall engravings with flowing patterns like DNA/144:99 harmonics
    const wallPositions = [
      new THREE.Vector3(-scale * 2, scale, 0), // Left wall
      new THREE.Vector3(scale * 2, scale, 0),  // Right wall
      new THREE.Vector3(0, scale, -scale * 2), // Back wall
      new THREE.Vector3(0, scale, scale * 2)   // Front wall
    ];

    wallPositions.forEach(pos => {
      const pattern = this.createFlowingTransmissionPattern(pos, scale);
      patterns.push(pattern);
    });

    return patterns;
  }

  // ============================================================================
  // DETAILED CARVING METHODS
  // ============================================================================

  private createTransmissionCarvings(pillar: THREE.Mesh, scale: number): THREE.Mesh[] {
    const carvings: THREE.Mesh[] = [];

    // Create geometric engravings on pillar faces
    const geometry = new THREE.PlaneGeometry(scale * 0.15, scale * 0.15);
    const material = this.materials.createSacredGeometryMaterial();

    for (let face = 0; face < 4; face++) {
      for (let level = 0; level < 6; level++) {
        const angle = (face * Math.PI / 2);
        const radius = scale * 0.15;
        const y = (level - 2.5) * scale * 0.5;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const carving = new THREE.Mesh(geometry, material);
        carving.position.set(x, y, z);
        carving.rotation.y = angle;
        carvings.push(carving);
      }
    }

    return carvings;
  }

  private createApprenticeCarvings(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const carvings: THREE.Mesh[] = [];

    // Apprentice pillar carvings (playing card panels, angels, plants)
    const carvingTypes = ['angel', 'plant', 'jack-playing-card', 'queen-playing-card'];

    let angle = 0;
    carvingTypes.forEach(type => {
      const carving = this.createDetailedCarving(type, position, scale, angle);
      carvings.push(carving.mesh);
      if (carving.symbols) carvings.push(...carving.symbols);
      angle += Math.PI / 2;
    });

    return carvings;
  }

  private createMasterCarvings(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const carvings: THREE.Mesh[] = [];

    // Master pillar carvings (editing tools, calendar stone, lizards)
    const carvingTypes = ['calendar-stone', 'editing-tools', 'lizards', 'masonic-symbols'];

    let angle = 0;
    carvingTypes.forEach(type => {
      const carving = this.createDetailedCarving(type, position, scale, angle);
      carvings.push(carving.mesh);
      if (carving.symbols) carvings.push(...carving.symbols);
      angle += Math.PI / 2;
    });

    return carvings;
  }

  private createDetailedCarving(type: string, position: THREE.Vector3, scale: number, angle: number): { mesh: THREE.Mesh, symbols?: THREE.Mesh[] } {
    const geometry = new THREE.PlaneGeometry(scale * 0.4, scale * 1.5);
    const carvingMaterial = new THREE.MeshPhongMaterial({
      color: 0x5d4e37,
      shininess: 10,
      specular: 0x1a1a1a
    });

    const mesh = new THREE.Mesh(geometry, carvingMaterial);
    mesh.position.copy(position);
    mesh.rotation.y = angle;

    const symbols: THREE.Mesh[] = [];

    switch (type) {
      case 'angel':
        symbols.push(...this.createAngelSymbols(position, scale));
        break;
      case 'calendar-stone':
        symbols.push(...this.createCalendarSymbols(position, scale));
        break;
      case 'lizards':
        symbols.push(...this.createLizardSymbols(position, scale));
        break;
      // ... other carvings
    }

    return { mesh, symbols };
  }

  private createArchCarvings(arch: THREE.Mesh, scale: number): THREE.Mesh[] {
    const carvings: THREE.Mesh[] = [];

    // Add geometric carvings along the arch
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      const archPoint = this.getArchPoint(arch, t);

      const geometry = new THREE.OctahedronGeometry(scale * 0.03);
      const material = this.materials.createSacredGeometryMaterial();

      const carving = new THREE.Mesh(geometry, material);
      carving.position.copy(archPoint);
      carvings.push(carving);
    }

    return carvings;
  }

  private createAngelCarving(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Angel figure carving
    const baseGeometry = new THREE.CylinderGeometry(scale * 0.1, scale * 0.15, scale * 0.6);
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x5d4e37 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    group.add(base);

    // Add wings and halo
    const wings = this.createWingCarvings(position, scale);
    wings.forEach(wing => group.add(wing));

    group.position.copy(position);
    return group;
  }

  private createPlantCarving(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    const plantGeometry = new THREE.CylinderGeometry(scale * 0.02, scale * 0.04, scale * 0.8);
    const plantMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5016 });
    const stem = new THREE.Mesh(plantGeometry, plantMaterial);
    group.add(stem);

    // Add leaves
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const leafGeometry = new THREE.PlaneGeometry(scale * 0.1, scale * 0.2);
      const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x3d6036, side: THREE.DoubleSide });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(
        Math.cos(angle) * scale * 0.05,
        scale * 0.2 + Math.sin(angle * 3) * scale * 0.1,
        Math.sin(angle) * scale * 0.05
      );
      leaf.rotation.z = angle;
      group.add(leaf);
    }

    group.position.copy(position);
    return group;
  }

  private createCubeSphereCarving(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Cube within sphere - Metatron's cube theme
    const sphereGeometry = new THREE.SphereGeometry(scale * 0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const sphereMaterial = this.materials.createAuraMaterial({ color: 0xffd700 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(sphere);

    // Cube inscription
    const cubeGeometry = new THREE.BoxGeometry(scale * 0.1, scale * 0.1, scale * 0.1);
    const cubeMaterial = this.materials.createSacredGeometryMaterial();
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = scale * 0.05;
    group.add(cube);

    group.position.copy(position);
    return group;
  }

  private createFlowingTransmissionPattern(position: THREE.Vector3, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Create flowing helical patterns on walls
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      const y = (t - 0.5) * scale * 0.8;
      const x = Math.sin(y * 0.1) * scale * 0.05;
      points.push(new THREE.Vector3(x, y, 0));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 50, scale * 0.005);
    const material = this.materials.createSacredGeometryMaterial();

    const flow = new THREE.Mesh(geometry, material);
    flow.position.copy(position);
    group.add(flow);

    // Add symbolic nodes along the flow
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const nodePoint = curve.getPointAt(t);
      const nodeGeometry = new THREE.SphereGeometry(scale * 0.008);
      const nodeMaterial = this.materials.createAuraMaterial({ color: 0x88ccff });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position).add(nodePoint);
      group.add(node);
    }

    return group;
  }

  // Helper methods for carvings and symbols
  private createAngelSymbols(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const symbols: THREE.Mesh[] = [];
    // Wing shapes, halo rings, etc.
    return symbols;
  }

  private createCalendarSymbols(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const symbols: THREE.Mesh[] = [];
    // Date markers, seasonal symbols, etc.
    return symbols;
  }

  private createLizardSymbols(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const symbols: THREE.Mesh[] = [];
    // Reptilian motifs, transformation symbols, etc.
    return symbols;
  }

  private createWingCarvings(position: THREE.Vector3, scale: number): THREE.Mesh[] {
    const wings: THREE.Mesh[] = [];
    // Wing details for angel carvings
    return wings;
  }

  private getArchPoint(arch: THREE.Mesh, t: number): THREE.Vector3 {
    // Helper to get points along arch for carvings
    return new THREE.Vector3();
  }

  /**
   * Animate the Rosslyn Cathedral with mystical energy
   */
  animateRosslynCathedral(cathedralGroup: THREE.Group, deltaTime: number): void {
    const time = Date.now() * 0.001;

    cathedralGroup.traverse((child) => {
      if (child.userData.apprenticePillar) {
        // Animate apprentice pillar with spiritual energy
        child.children.forEach((carving: any) => {
          carving.rotation.y += 0.005;
        });
      } else if (child.userData.masterPillar) {
        // Animate master pillar with wisdom energy
        child.children.forEach((carving: any, index: number) => {
          carving.rotation.y += 0.003 * (index + 1);
        });
      } else if (child.userData.sacredNode && child.userData.fibonacciIndex) {
        // Pulse Fibonacci-coded carvings
        const pulse = 1 + Math.sin(time * 2 + child.userData.pulsePhase) * 0.2;
        child.scale.setScalar(pulse);
      }
    });
  }

  /**
   * Clear all sacred geometry from scene
   */
  clearSacredGeometry(): void {
    const objectsToRemove: THREE.Object3D[] = [];

    this.scene.traverse((object) => {
      if (object.userData && (object.userData.sacredGeometry || object.userData.rosslynPillar ||
                             object.userData.apprenticePillar || object.userData.masterPillar ||
                             object.userData.sacredNode)) {
        objectsToRemove.push(object);
      }
    });

    objectsToRemove.forEach(object => {
      this.scene.remove(object);
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
  }
}

export default SacredGeometryRenderer;
