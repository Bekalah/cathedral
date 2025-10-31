import * as THREE from 'three';
import {
  SynthesizedElement,
  SacredGeometry,
  GeometryType,
  VisualProperties,
  AnimationType,
  ThreeJsIntegration
} from '../types/FusionTypes';

/**
 * ThreeJsBridge - Integration bridge between synthesis engine and Three.js rendering
 *
 * This module provides seamless integration with the existing Three.js engine,
 * allowing synthesized elements to be rendered using the established sacred geometry
 * rendering pipeline and mystical materials system.
 */
export class ThreeJsBridge {
  private threeJsIntegration: ThreeJsIntegration;
  private scene?: THREE.Scene;
  private camera?: THREE.Camera;
  private renderer?: THREE.WebGLRenderer;

  constructor() {
    this.threeJsIntegration = {
      geometries: new Map(),
      materials: new Map(),
      animations: new Map()
    };
  }

  /**
   * Initialize the bridge with existing Three.js components
   */
  public initialize(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer
  ): void {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.threeJsIntegration.scene = scene;
    this.threeJsIntegration.camera = camera;
    this.threeJsIntegration.renderer = renderer;
  }

  /**
   * Create Three.js geometry from sacred geometry definition
   */
  public createGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometryKey = `${sacredGeometry.type}_${sacredGeometry.vertices}`;

    // Check if geometry already exists
    if (this.threeJsIntegration.geometries.has(geometryKey)) {
      return this.threeJsIntegration.geometries.get(geometryKey) as THREE.BufferGeometry;
    }

    let geometry: THREE.BufferGeometry;

    switch (sacredGeometry.type) {
      case GeometryType.MERKABA:
        geometry = this.createMerkabaGeometry(sacredGeometry);
        break;
      case GeometryType.FLOWER_OF_LIFE:
        geometry = this.createFlowerOfLifeGeometry(sacredGeometry);
        break;
      case GeometryType.METATRONS_CUBE:
        geometry = this.createMetatronGeometry(sacredGeometry);
        break;
      case GeometryType.TREE_OF_LIFE:
        geometry = this.createTreeOfLifeGeometry(sacredGeometry);
        break;
      case GeometryType.VESICA_PISCIS:
        geometry = this.createVesicaPiscisGeometry(sacredGeometry);
        break;
      case GeometryType.OCTAGRAM:
        geometry = this.createOctagramGeometry(sacredGeometry);
        break;
      case GeometryType.DODECAGRAM:
        geometry = this.createDodecagramGeometry(sacredGeometry);
        break;
      case GeometryType.SACRED_CIRCLE:
        geometry = this.createSacredCircleGeometry(sacredGeometry);
        break;
      default:
        geometry = new THREE.SphereGeometry(10, 32, 32);
    }

    // Cache the geometry
    this.threeJsIntegration.geometries.set(geometryKey, geometry);
    return geometry;
  }

  /**
   * Create Merkaba (Star Tetrahedron) geometry
   */
  private createMerkabaGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const size = 10;
    const geometry = new THREE.BufferGeometry();

    // Vertices for two tetrahedrons
    const vertices = new Float32Array([
      // Upward tetrahedron
      0, size, 0,
      size * 0.8, -size * 0.4, 0,
      -size * 0.8, -size * 0.4, 0,
      0, 0, size * 1.2,

      // Downward tetrahedron
      0, -size, 0,
      size * 0.8, size * 0.4, 0,
      -size * 0.8, size * 0.4, 0,
      0, 0, -size * 1.2
    ]);

    // Faces connecting the vertices
    const indices = new Uint16Array([
      // Upward tetrahedron faces
      0, 1, 2,
      0, 1, 3,
      0, 2, 3,
      1, 2, 3,

      // Downward tetrahedron faces
      4, 5, 6,
      4, 5, 7,
      4, 6, 7,
      5, 6, 7,

      // Inter-connections for star tetrahedron
      0, 4, 1, 5, 2, 6, 3, 7
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    geometry.computeVertexNormals();
    return geometry;
  }

  /**
   * Create Flower of Life geometry
   */
  private createFlowerOfLifeGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const radius = 8;
    const geometry = new THREE.BufferGeometry();

    const vertices: number[] = [];
    const indices: number[] = [];

    // Center circle
    this.addCircleVertices(vertices, 0, 0, 0, radius, 32);

    // Surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * radius * 2;
      const y = Math.sin(angle) * radius * 2;

      this.addCircleVertices(vertices, x, y, 0, radius, 32);

      // Connect to center
      const centerStart = 0;
      const surroundStart = (i + 1) * 32;

      for (let j = 0; j < 32; j++) {
        indices.push(centerStart + j, surroundStart + j);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Metatron's Cube geometry
   */
  private createMetatronGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 6;

    // 13 spheres of Metatron's Cube
    const positions = [
      { x: 0, y: 0, z: 0 }, // Center

      // Inner ring
      { x: radius, y: 0, z: 0 },
      { x: radius * 0.5, y: radius * (Math.sqrt(3)/2), z: 0 },
      { x: -radius * 0.5, y: radius * (Math.sqrt(3)/2), z: 0 },
      { x: -radius, y: 0, z: 0 },
      { x: -radius * 0.5, y: -radius * (Math.sqrt(3)/2), z: 0 },
      { x: radius * 0.5, y: -radius * (Math.sqrt(3)/2), z: 0 },

      // Outer ring
      { x: radius * 1.5, y: 0, z: 0 },
      { x: radius * 0.75, y: radius * 1.5 * (Math.sqrt(3)/2), z: 0 },
      { x: -radius * 0.75, y: radius * 1.5 * (Math.sqrt(3)/2), z: 0 },
      { x: -radius * 1.5, y: 0, z: 0 },
      { x: -radius * 0.75, y: -radius * 1.5 * (Math.sqrt(3)/2), z: 0 },
      { x: radius * 0.75, y: -radius * 1.5 * (Math.sqrt(3)/2), z: 0 }
    ];

    positions.forEach(pos => {
      this.addSphereVertices(vertices, pos.x, pos.y, pos.z, radius * 0.3, 16);
    });

    // Add connections between spheres
    const connections = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
      [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 7],
      [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12]
    ];

    connections.forEach(([i, j]) => {
      const startIdx = i * (16 * 3); // 16 segments per sphere
      const endIdx = j * (16 * 3);

      // Connect sphere centers (simplified)
      indices.push(startIdx, endIdx);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Tree of Life geometry
   */
  private createTreeOfLifeGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    // 10 Sephiroth positions (simplified 2D projection)
    const sephirothPositions = [
      { x: 0, y: 15, z: 0 },   // Kether (Crown)
      { x: -8, y: 10, z: 0 },  // Chokmah (Wisdom)
      { x: 8, y: 10, z: 0 },   // Binah (Understanding)
      { x: -12, y: 5, z: 0 },  // Chesed (Mercy)
      { x: 0, y: 5, z: 0 },    // Tiphereth (Beauty)
      { x: 12, y: 5, z: 0 },   // Geburah (Severity)
      { x: -8, y: 0, z: 0 },   // Netzach (Victory)
      { x: 8, y: 0, z: 0 },    // Hod (Glory)
      { x: 0, y: -5, z: 0 },   // Yesod (Foundation)
      { x: 0, y: -10, z: 0 }   // Malkuth (Kingdom)
    ];

    sephirothPositions.forEach(pos => {
      this.addSphereVertices(vertices, pos.x, pos.y, pos.z, 2, 12);
    });

    // Add paths (22 connections)
    const paths = [
      [0, 1], [0, 2], [1, 2], [1, 4], [1, 5], [2, 3], [2, 4], [2, 6],
      [3, 6], [4, 5], [4, 7], [5, 8], [6, 7], [6, 8], [7, 9], [8, 9]
    ];

    paths.forEach(([i, j]) => {
      const startIdx = i * (12 * 3);
      const endIdx = j * (12 * 3);
      indices.push(startIdx, endIdx);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Vesica Piscis geometry
   */
  private createVesicaPiscisGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 8;
    const distance = radius; // Overlapping circles

    // Left circle
    this.addCircleVertices(vertices, -distance/2, 0, 0, radius, 32);

    // Right circle
    this.addCircleVertices(vertices, distance/2, 0, 0, radius, 32);

    // Add lens-shaped intersection
    const lensVertices = this.createLensShape(-distance/2, distance/2, radius);
    vertices.push(...lensVertices);

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Octagram geometry
   */
  private createOctagramGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    const outerRadius = 10;
    const innerRadius = 4;

    // Create 8-pointed star
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI) / 8;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      vertices.push(x, y, 0);
    }

    // Connect vertices to form star
    for (let i = 0; i < 16; i++) {
      indices.push(i, (i + 1) % 16);
      if (i % 2 === 0) {
        indices.push(i, (i + 4) % 16);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Dodecagram geometry
   */
  private createDodecagramGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 10;

    // Create 12-pointed star
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI) / 12;
      const r = i % 2 === 0 ? radius : radius * 0.4;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;

      vertices.push(x, y, 0);
    }

    // Connect vertices
    for (let i = 0; i < 24; i++) {
      indices.push(i, (i + 1) % 24);
      if (i % 2 === 0) {
        indices.push(i, (i + 6) % 24);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create Sacred Circle geometry
   */
  private createSacredCircleGeometry(sacredGeometry: SacredGeometry): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];

    const radius = 10;

    // Main circle
    this.addCircleVertices(vertices, 0, 0, 0, radius, 64);

    // Add 12 zodiac points
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      vertices.push(x, y, 0);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Create material from visual properties
   */
  public createMaterial(visual: VisualProperties): THREE.Material {
    const materialKey = `${visual.color}_${visual.pattern}_${visual.intensity}`;

    if (this.threeJsIntegration.materials.has(materialKey)) {
      return this.threeJsIntegration.materials.get(materialKey) as THREE.Material;
    }

    let material: THREE.Material;

    switch (visual.pattern) {
      case 'crystal':
        material = this.createCrystalMaterial(visual);
        break;
      case 'fractal':
        material = this.createFractalMaterial(visual);
        break;
      case 'mandala':
        material = this.createMandalaMaterial(visual);
        break;
      default:
        material = this.createMysticalMaterial(visual);
    }

    this.threeJsIntegration.materials.set(materialKey, material);
    return material;
  }

  /**
   * Create crystal-like material
   */
  private createCrystalMaterial(visual: VisualProperties): THREE.Material {
    return new THREE.MeshPhysicalMaterial({
      color: visual.color,
      transparent: true,
      opacity: visual.intensity / 100,
      transmission: 0.8,
      thickness: 0.5,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: visual.color,
      emissiveIntensity: 0.2
    });
  }

  /**
   * Create fractal pattern material
   */
  private createFractalMaterial(visual: VisualProperties): THREE.Material {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Generate fractal pattern on canvas
    this.drawFractalTexture(ctx, visual.color, visual.intensity);

    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.MeshLambertMaterial({
      color: visual.color,
      transparent: true,
      opacity: visual.intensity / 100,
      map: texture,
      emissive: visual.color,
      emissiveIntensity: 0.1
    });
  }

  /**
   * Create mandala pattern material
   */
  private createMandalaMaterial(visual: VisualProperties): THREE.Material {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    this.drawMandalaTexture(ctx, visual.color);

    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.MeshPhongMaterial({
      color: visual.color,
      transparent: true,
      opacity: visual.intensity / 100,
      map: texture,
      shininess: 100
    });
  }

  /**
   * Create mystical material with energy effects
   */
  private createMysticalMaterial(visual: VisualProperties): THREE.Material {
    return new THREE.MeshPhongMaterial({
      color: visual.color,
      transparent: true,
      opacity: visual.intensity / 100,
      emissive: visual.color,
      emissiveIntensity: 0.3,
      shininess: 100,
      specular: 0xffffff
    });
  }

  /**
   * Render synthesized element in the scene
   */
  public async renderSynthesizedElement(
    element: SynthesizedElement,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ): Promise<THREE.Group> {
    const group = new THREE.Group();

    // Create geometry
    const geometry = this.createGeometry(element.primaryGeometry);

    // Create material
    const material = this.createMaterial(element.visual);

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    group.add(mesh);

    // Add secondary geometries if present
    element.secondaryGeometries.forEach((secondaryGeometry, index) => {
      const secondaryGeometryMesh = this.createGeometry(secondaryGeometry);
      const secondaryMaterial = this.createMaterial(element.visual);

      const secondaryMesh = new THREE.Mesh(secondaryGeometryMesh, secondaryMaterial);
      secondaryMesh.position.copy(position);
      secondaryMesh.position.x += (index - 1) * 15; // Offset secondary geometries
      group.add(secondaryMesh);
    });

    // Set up animations
    this.setupAnimations(group, element);

    // Add to scene if available
    if (this.scene) {
      this.scene.add(group);
    }

    return group;
  }

  /**
   * Set up animations for the rendered element
   */
  private setupAnimations(group: THREE.Group, element: SynthesizedElement): void {
    const animationData = {
      startTime: Date.now(),
      element,
      group
    };

    this.threeJsIntegration.animations.set(element.id, animationData);

    // Start animation loop
    this.animateElement(element.id);
  }

  /**
   * Animate individual element
   */
  private animateElement(elementId: string): void {
    const animationData = this.threeJsIntegration.animations.get(elementId);
    if (!animationData) return;

    const { group, element, startTime } = animationData;
    const elapsed = (Date.now() - startTime) / 1000;

    // Apply animation based on type
    switch (element.visual.animation) {
      case AnimationType.PULSING:
        this.applyPulsingAnimation(group, elapsed);
        break;
      case AnimationType.ROTATING:
        this.applyRotatingAnimation(group, elapsed);
        break;
      case AnimationType.SPIRALING:
        this.applySpiralingAnimation(group, elapsed);
        break;
      case AnimationType.BREATHING:
        this.applyBreathingAnimation(group, elapsed);
        break;
      case AnimationType.FLOWING:
        this.applyFlowingAnimation(group, elapsed);
        break;
      case AnimationType.CRYSTALLIZING:
        this.applyCrystallizingAnimation(group, elapsed);
        break;
    }

    // Continue animation
    requestAnimationFrame(() => this.animateElement(elementId));
  }

  /**
   * Apply pulsing animation
   */
  private applyPulsingAnimation(group: THREE.Group, elapsed: number): void {
    const scale = 1 + Math.sin(elapsed * 2) * 0.1;
    group.scale.setScalar(scale);

    // Update material emissive intensity
    group.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
        (child.material as THREE.MeshPhongMaterial).emissiveIntensity =
          0.3 + Math.sin(elapsed * 3) * 0.2;
      }
    });
  }

  /**
   * Apply rotating animation
   */
  private applyRotatingAnimation(group: THREE.Group, elapsed: number): void {
    group.rotation.y = elapsed * 0.5;
    group.rotation.x = elapsed * 0.3;
  }

  /**
   * Apply spiraling animation
   */
  private applySpiralingAnimation(group: THREE.Group, elapsed: number): void {
    group.rotation.y = elapsed * 0.8;
    group.position.y = Math.sin(elapsed * 2) * 2;

    // Spiral motion
    const radius = 3;
    group.position.x = Math.cos(elapsed * 1.5) * radius;
    group.position.z = Math.sin(elapsed * 1.5) * radius;
  }

  /**
   * Apply breathing animation
   */
  private applyBreathingAnimation(group: THREE.Group, elapsed: number): void {
    const breatheScale = 1 + Math.sin(elapsed * 1.5) * 0.15;
    group.scale.setScalar(breatheScale);

    // Gentle floating motion
    group.position.y = Math.sin(elapsed * 0.8) * 1;
  }

  /**
   * Apply flowing animation
   */
  private applyFlowingAnimation(group: THREE.Group, elapsed: number): void {
    // Wave-like motion
    group.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        child.position.y = Math.sin(elapsed * 2 + index) * 0.5;
        child.rotation.z = Math.sin(elapsed * 1.5 + index) * 0.2;
      }
    });
  }

  /**
   * Apply crystallizing animation
   */
  private applyCrystallizingAnimation(group: THREE.Group, elapsed: number): void {
    // Crystallization effect with sharp geometric transformations
    const crystalPhase = (elapsed * 0.5) % (Math.PI * 2);
    const crystalScale = 1 + Math.abs(Math.sin(crystalPhase)) * 0.2;

    group.scale.setScalar(crystalScale);
    group.rotation.y = elapsed * 0.3;

    // Faceted rotation
    group.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x = crystalPhase * (index + 1) * 0.5;
      }
    });
  }

  /**
   * Get Three.js integration instance
   */
  public getThreeJsIntegration(): ThreeJsIntegration {
    return this.threeJsIntegration;
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    // Dispose geometries
    this.threeJsIntegration.geometries.forEach(geometry => {
      geometry.dispose();
    });

    // Dispose materials
    this.threeJsIntegration.materials.forEach(material => {
      if (material instanceof THREE.Material) {
        material.dispose();
      }
    });

    // Clear maps
    this.threeJsIntegration.geometries.clear();
    this.threeJsIntegration.materials.clear();
    this.threeJsIntegration.animations.clear();
  }

  // Helper methods for geometry creation
  private addCircleVertices(vertices: number[], x: number, y: number, z: number, radius: number, segments: number): void {
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      vertices.push(
        x + Math.cos(angle) * radius,
        y + Math.sin(angle) * radius,
        z
      );
    }
  }

  private addSphereVertices(vertices: number[], x: number, y: number, z: number, radius: number, segments: number): void {
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const phi = (i / segments) * Math.PI * 2;
        const theta = (j / segments) * Math.PI;

        vertices.push(
          x + radius * Math.sin(theta) * Math.cos(phi),
          y + radius * Math.sin(theta) * Math.sin(phi),
          z + radius * Math.cos(theta)
        );
      }
    }
  }

  private createLensShape(x1: number, x2: number, radius: number): number[] {
    const vertices: number[] = [];
    const distance = x2 - x1;

    // Create lens shape vertices
    const steps = 32;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI;
      const y = Math.sin(t) * radius;
      const x = x1 + (distance / 2) + Math.cos(t) * (distance / 2);

      vertices.push(x, y, 0);
    }

    return vertices;
  }

  private drawFractalTexture(ctx: CanvasRenderingContext2D, color: string, intensity: number): void {
    // Simple Mandelbrot-like fractal texture
    const imageData = ctx.createImageData(512, 512);
    const data = imageData.data;

    for (let x = 0; x < 512; x++) {
      for (let y = 0; y < 512; y++) {
        const cx = (x - 256) / 128;
        const cy = (y - 256) / 128;

        let zx = 0, zy = 0;
        let iteration = 0;
        const maxIteration = 50;

        while (zx * zx + zy * zy < 4 && iteration < maxIteration) {
          const tmp = zx * zx - zy * zy + cx;
          zy = 2 * zx * zy + cy;
          zx = tmp;
          iteration++;
        }

        const intensityValue = iteration / maxIteration;
        const pixelIndex = (y * 512 + x) * 4;

        data[pixelIndex] = Math.floor(intensityValue * 255);     // R
        data[pixelIndex + 1] = Math.floor(intensityValue * 128); // G
        data[pixelIndex + 2] = Math.floor(intensityValue * 255); // B
        data[pixelIndex + 3] = Math.floor(intensity * 2.55);     // A
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private drawMandalaTexture(ctx: CanvasRenderingContext2D, color: string): void {
    // Draw radial mandala pattern
    const centerX = 128;
    const centerY = 128;

    for (let layer = 1; layer <= 8; layer++) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8 / layer;

      ctx.beginPath();
      ctx.arc(centerX, centerY, layer * 12, 0, Math.PI * 2);
      ctx.stroke();

      // Add radial lines
      for (let i = 0; i < layer * 4; i++) {
        const angle = (i / (layer * 4)) * Math.PI * 2;
        const innerRadius = (layer - 1) * 12;
        const outerRadius = layer * 12;

        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * innerRadius,
          centerY + Math.sin(angle) * innerRadius
        );
        ctx.lineTo(
          centerX + Math.cos(angle) * outerRadius,
          centerY + Math.sin(angle) * outerRadius
        );
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1;
  }
}