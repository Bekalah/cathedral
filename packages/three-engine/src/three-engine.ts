/**
 * @fileoverview Three.js Engine wrapper for Cathedral 3D visualizations
 * @license CC0-1.0 - Public Domain
 */

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

// Trauma-safe 3D settings for Cathedral system
export interface TraumaSafe3DSettings {
  motionSensitivity: number;
  intensityLevel: 'gentle' | 'moderate' | 'intense';
  autoRotate: boolean;
  autoplayDisabled: boolean;
  accessibilityMode: boolean;
}

export interface CathedralSceneConfig {
  backgroundColor: string;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
  fogEnabled: boolean;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  enableShadows: boolean;
  shadowMapSize: number;
}

// Sacred Geometry configuration
export interface SacredGeometryConfig {
  goldenRatio: number;
  cathedralRatio: number;
  fibonacciSequence: number[];
  divineProportions: {
    phi: number;
    phiSquared: number;
    phiInverse: number;
  };
}

/**
 * Cathedral Three.js Engine - Main class for 3D scene management
 */
export class CathedralThreeEngine {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private controls?: OrbitControls;
  private sacredGeometryConfig: SacredGeometryConfig;

  constructor(canvasElement: HTMLCanvasElement, config?: CathedralSceneConfig) {
    // Initialize sacred geometry configuration
    this.sacredGeometryConfig = {
      goldenRatio: 1.618033988749,
      cathedralRatio: 1.455,
      fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      divineProportions: {
        phi: 1.618033988749,
        phiSquared: 2.618033988749,
        phiInverse: 0.618033988749
      }
    };

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(config?.backgroundColor || '#1a1a1a');

    // Initialize renderer with trauma-safe settings
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });

    this.renderer.shadowMap.enabled = config?.enableShadows ?? true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvasElement.clientWidth / canvasElement.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    // Add trauma-safe fog if enabled
    if (config?.fogEnabled) {
      this.scene.fog = new THREE.Fog(
        config.fogColor || '#1a1a1a',
        config.fogNear || 10,
        config.fogFar || 100
      );
    }

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(
      0x404040,
      config?.ambientLightIntensity || 0.3
    );
    this.scene.add(ambientLight);

    // Add directional lighting
    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      config?.directionalLightIntensity || 1
    );
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = config?.shadowMapSize || 2048;
    directionalLight.shadow.mapSize.height = config?.shadowMapSize || 2048;
    this.scene.add(directionalLight);
  }

  /**
   * Create sacred geometry object using Cathedral proportions
   */
  public createSacredGeometry(
    type: 'mandala' | 'flower-of-life' | 'metatrons-cube' | 'fibonacci-spiral',
    size: number = 1
  ): THREE.Object3D {
    const geometry = new THREE.Group();

    switch (type) {
      case 'mandala':
        geometry.add(this.createMandala(size));
        break;
      case 'flower-of-life':
        geometry.add(this.createFlowerOfLife(size));
        break;
      case 'metatrons-cube':
        geometry.add(this.createMetatronsCube(size));
        break;
      case 'fibonacci-spiral':
        geometry.add(this.createFibonacciSpiral(size));
        break;
    }

    return geometry;
  }

  private createMandala(size: number): THREE.Object3D {
    const mandala = new THREE.Group();
    const { phi, phiInverse } = this.sacredGeometryConfig.divineProportions;
    const numPetals = 12;

    for (let i = 0; i < numPetals; i++) {
      const angle = (i / numPetals) * Math.PI * 2;
      const radius = size * phiInverse;
      
      const petalGeometry = new THREE.CircleGeometry(radius * 0.5, 8);
      const petalMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(i / numPetals, 0.7, 0.6),
        transparent: true,
        opacity: 0.8
      });
      
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      petal.position.x = Math.cos(angle) * radius;
      petal.position.y = Math.sin(angle) * radius;
      petal.position.z = Math.sin(angle * phi) * 0.1;
      
      mandala.add(petal);
    }

    return mandala;
  }

  private createFlowerOfLife(size: number): THREE.Object3D {
    const flower = new THREE.Group();
    const { phi } = this.sacredGeometryConfig.divineProportions;
    const radius = size * 0.3;

    // Central circle
    const centralCircle = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 32),
      new THREE.MeshLambertMaterial({ color: 0x4444aa })
    );
    flower.add(centralCircle);

    // Surrounding circles
    const surroundingCount = 6;
    for (let i = 0; i < surroundingCount; i++) {
      const angle = (i / surroundingCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius * phi;
      const y = Math.sin(angle) * radius * phi;

      const circle = new THREE.Mesh(
        new THREE.CircleGeometry(radius, 32),
        new THREE.MeshLambertMaterial({ color: 0xaa4444 })
      );
      circle.position.set(x, y, 0);
      flower.add(circle);
    }

    return flower;
  }

  private createMetatronsCube(size: number): THREE.Object3D {
    const cube = new THREE.Group();
    const { phi } = this.sacredGeometryConfig.divineProportions;
    const vertices = this.generatePlatonicVertices(1);
    
    // Create edges
    const edges = this.generateMetatronEdges(vertices);
    
    edges.forEach(edge => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        vertices[edge[0]].clone().multiplyScalar(size),
        vertices[edge[1]].clone().multiplyScalar(size)
      ]);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x44aa44,
        linewidth: 2 
      });
      const line = new THREE.Line(geometry, material);
      cube.add(line);
    });

    return cube;
  }

  private createFibonacciSpiral(size: number): THREE.Object3D {
    const spiral = new THREE.Group();
    const { fibonacciSequence } = this.sacredGeometryConfig;
    
    let currentSize = size * 0.1;
    let angle = 0;
    const growth = this.sacredGeometryConfig.goldenRatio;

    for (let i = 0; i < fibonacciSequence.length - 1; i++) {
      const nextSize = size * (fibonacciSequence[i + 1] / fibonacciSequence[fibonacciSequence.length - 1]);
      
      // Create quarter circle
      const curve = new THREE.ArcCurve(
        0, 0,
        currentSize,
        angle,
        angle + Math.PI / 2,
        false
      );
      
      const points = curve.getPoints(20);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: new THREE.Color().setHSL(i / fibonacciSequence.length, 0.8, 0.6) 
      });
      
      const line = new THREE.Line(geometry, material);
      spiral.add(line);
      
      currentSize = nextSize;
      angle += Math.PI / 2;
    }

    return spiral;
  }

  private generatePlatonicVertices(size: number): THREE.Vector3[] {
    const phi = this.sacredGeometryConfig.divineProportions.phi;
    const vertices = [];
    
    // 8 vertices of a cube
    for (let x of [-1, 1]) {
      for (let y of [-1, 1]) {
        for (let z of [-1, 1]) {
          vertices.push(new THREE.Vector3(x * size, y * size, z * size));
        }
      }
    }
    
    return vertices;
  }

  private generateMetatronEdges(vertices: THREE.Vector3[]): number[][] {
    const edges: number[][] = [];
    const center = new THREE.Vector3(0, 0, 0);
    
    // Connect each vertex to center and to other vertices based on distance
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const distance = vertices[i].distanceTo(vertices[j]);
        const expectedDistance = Math.sqrt(8); // Distance between opposite corners
        
        if (Math.abs(distance - expectedDistance) < 0.1) {
          edges.push([i, j]);
        }
      }
    }
    
    return edges;
  }

  /**
   * Create trauma-safe 3D environment
   */
  public createTraumaSafeEnvironment(settings: TraumaSafe3DSettings): THREE.Object3D {
    const environment = new THREE.Group();

    // Create gentle, flowing elements based on trauma-safe settings
    const intensityMultiplier = settings.motionSensitivity;
    const elementCount = Math.floor(settings.intensityLevel === 'gentle' ? 6 : 
                                   settings.intensityLevel === 'moderate' ? 12 : 18);

    for (let i = 0; i < elementCount; i++) {
      const angle = (i / elementCount) * Math.PI * 2;
      const radius = 2 + (i % 3) * 0.5;
      const height = Math.sin(angle * this.sacredGeometryConfig.goldenRatio) * intensityMultiplier;

      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(i / elementCount, 0.6, 0.5),
        transparent: true,
        opacity: 0.7
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );

      environment.add(sphere);
    }

    return environment;
  }

  /**
   * Render scene with trauma-safe controls
   */
  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Update scene (call in animation loop)
   */
  public update(deltaTime: number): void {
    // Add gentle animations based on sacred geometry
    this.scene.rotation.y += deltaTime * 0.1;
  }

  /**
   * Resize renderer and camera
   */
  public resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    this.renderer.dispose();
    this.scene.clear();
  }

  // Getters for external access
  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  public getSacredGeometryConfig(): SacredGeometryConfig {
    return this.sacredGeometryConfig;
  }
}

/**
 * React Three Fiber component for Cathedral 3D scenes
 */
export interface Cathedral3DSceneProps {
  traumaSafeSettings: TraumaSafe3DSettings;
  sceneConfig?: CathedralSceneConfig;
  children?: React.ReactNode;
}

export function Cathedral3DScene({ 
  traumaSafeSettings, 
  sceneConfig, 
  children 
}: Cathedral3DSceneProps) {
  return (
    <div className="cathedral-3d-scene">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ 
          background: sceneConfig?.backgroundColor || '#1a1a1a',
          touchAction: 'none' // Prevent default touch behaviors for accessibility
        }}
      >
        {/* Trauma-safe lighting */}
        <ambientLight intensity={sceneConfig?.ambientLightIntensity || 0.3} />
        <directionalLight 
          intensity={sceneConfig?.directionalLightIntensity || 1}
          position={[5, 10, 5]}
          castShadow
        />

        {/* Environment */}
        <Environment preset="night" />
        
        {/* Camera controls with trauma-safe settings */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={traumaSafeSettings.autoRotate}
          autoRotateSpeed={0.5}
          dampingFactor={0.05}
          enableDamping={true}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
        />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />

        {/* Scene content */}
        {children}
      </Canvas>
    </div>
  );
}

/**
 * Utility functions for Three.js integration
 */
export const Cathedral3DUtils = {
  /**
   * Convert degrees to radians
   */
  degreesToRadians: (degrees: number): number => (degrees * Math.PI) / 180,

  /**
   * Create trauma-safe color palette
   */
  createTraumaSafePalette: (): string[] => [
    '#4A90E2', // Calming blue
    '#7ED321', // Gentle green
    '#F5A623', // Warm amber
    '#BD10E0', // Deep purple
    '#50E3C2', // Soft teal
    '#B8E986', // Light green
  ],

  /**
   * Generate sacred geometry points
   */
  generateSacredPoints: (count: number, radius: number): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const phi = 1.618033988749;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * phi;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * phi;
      const z = Math.sin(angle * phi) * radius * 0.5;
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    return points;
  },

  /**
   * Create accessibility-friendly 3D element
   */
  createAccessible3D: (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    description: string
  ): THREE.Mesh => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.accessibility = {
      description,
      level: 'moderate',
      alternative: 'Sacred geometry visualization'
    };
    return mesh;
  }
};

export default CathedralThreeEngine;