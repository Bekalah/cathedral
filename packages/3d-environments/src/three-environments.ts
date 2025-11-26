/**
 * three-environments
 * 
 * @package @cathedral/3d-environments
 */
/**
 * Three.js 3D Environments
 * 
 * Master art principles applied to Three.js scenes
 */

import * as THREE from 'three';
import {
  createGoldenScene,
  createSacredGeometryMesh,
  createFluidAnimation,
  goldenEasing,
  CameraSettings,
  LightingSettings,
} from '@cathedral/master-art-principles/3d-principles';
import { SACRED_MATH, goldenRatio } from '@cathedral/master-art-principles/sacred-math';

export interface Environment3D {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls?: any;
  animationId?: number;
}

/**
 * Create Stone Grimoire 3D Environment
 * 
 * 8 octagram halls with master art principles
 */
export function createStoneGrimoireEnvironment(
  container: HTMLElement,
  width: number = container.clientWidth,
  height: number = container.clientHeight
): Environment3D {
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Museum quality
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
  
  // Enhanced rendering with sophisticated quality
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // High-end tone mapping
  renderer.toneMappingExposure = 1.2; // Perfect exposure
  renderer.outputColorSpace = THREE.SRGBColorSpace; // Accurate colors
  renderer.physicallyCorrectLights = true; // Physically-based lighting
  container.appendChild(renderer.domElement);

  // Create golden scene
  const { scene, camera, lighting } = createGoldenScene(renderer, width, height);

  // Add Stone Grimoire halls (8 octagrams)
  for (let i = 1; i <= 8; i++) {
    const hall = createOctagramHall(i, 20);
    scene.add(hall);
  }

  // Add sacred geometry elements
  const vesicaGeometry = createSacredGeometryMesh('vesica', 15);
  const vesicaMaterial = new THREE.LineBasicMaterial({ 
    color: 0xd4af37, // Gold
    linewidth: 2,
  });
  const vesica = new THREE.Line(vesicaGeometry, vesicaMaterial);
  vesica.position.y = 5;
  scene.add(vesica);

  // Animate
  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    
    // Gentle rotation using golden ratio timing
    scene.children.forEach((child, index) => {
      if (child instanceof THREE.Group || child instanceof THREE.Line) {
        child.rotation.y += 0.001 * goldenEasing((Date.now() % 2000) / 2000);
      }
    });
    
    renderer.render(scene, camera);
    
    return animationId;
  };

  const animationId = animate();

  return {
    scene,
    camera,
    renderer,
    animationId,
  };
}

/**
 * Create octagram hall mesh
 */
function createOctagramHall(hallId: number, size: number): THREE.Group {
  const group = new THREE.Group();
  
  // Octagram geometry
  const geometry = new THREE.RingGeometry(size * 0.6, size, 8);
  const material = new THREE.MeshStandardMaterial({
    color: getHallColor(hallId),
    metalness: 0.3,
    roughness: 0.7,
    emissive: getHallColor(hallId),
    emissiveIntensity: 0.2,
  });
  
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = -Math.PI / 2;
  ring.receiveShadow = true;
  group.add(ring);
  
  // Position using golden ratio
  const angle = (hallId - 1) * (360 / 8);
  const rad = (angle * Math.PI) / 180;
  const radius = size * 3 * SACRED_MATH.PHI;
  group.position.x = Math.cos(rad) * radius;
  group.position.z = Math.sin(rad) * radius;
  group.position.y = 0;
  
  return group;
}

/**
 * Get hall color
 */
function getHallColor(hallId: number): number {
  const colors = [
    0xff6b35, // Fire
    0x4a90e2, // Water
    0x8b7355, // Earth
    0xe8e8e8, // Air
    0xd4af37, // Spirit
    0x1a1a1a, // Void
    0xffffff, // Light
    0x4a4a4a, // Shadow
  ];
  return colors[hallId - 1] || 0xffffff;
}

/**
 * Create fluid camera animation
 */
export function createFluidCameraAnimation(
  camera: THREE.PerspectiveCamera,
  target: { x: number; y: number; z: number },
  duration: number = 2000
): { start: () => void; stop: () => void } {
  const startPos = { ...camera.position };
  let startTime: number | null = null;
  let animationId: number | null = null;

  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = goldenEasing(progress);

    camera.position.x = startPos.x + (target.x - startPos.x) * eased;
    camera.position.y = startPos.y + (target.y - startPos.y) * eased;
    camera.position.z = startPos.z + (target.z - startPos.z) * eased;
    camera.lookAt(target.x, target.y, target.z);

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  return {
    start: () => {
      startTime = null;
      animationId = requestAnimationFrame(animate);
    },
    stop: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}
