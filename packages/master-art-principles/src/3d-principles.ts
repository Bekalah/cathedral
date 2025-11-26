/**
 * 3d-principles
 * 
 * @package @cathedral/master-art-principles
 */
/**
 * 3D Master Art Principles
 * 
 * Principles for beautiful 3D environments and animations
 */

import * as THREE from 'three';
import { SACRED_MATH, goldenRatio, cathedralRatio } from './sacred-math';
import { generateFibonacciSpiral, generateVesicaPiscis, generatePentagram } from './geometry';

export interface CameraSettings {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  fov: number;
  near: number;
  far: number;
}

export interface LightingSettings {
  ambient: { color: number; intensity: number };
  directional: { color: number; intensity: number; position: { x: number; y: number; z: number } };
  point: { color: number; intensity: number; position: { x: number; y: number; z: number }; distance: number }[];
}

/**
 * Golden Ratio Camera Setup
 * 
 * Camera positioned using golden ratio for natural beauty
 */
export function goldenCamera(
  sceneSize: number,
  height: number = sceneSize
): CameraSettings {
  const distance = sceneSize * SACRED_MATH.PHI;
  const goldenHeight = height * SACRED_MATH.PHI_INVERSE;
  
  return {
    position: {
      x: distance * 0.618,
      y: goldenHeight,
      z: distance,
    },
    target: { x: 0, y: 0, z: 0 },
    fov: 50, // Natural field of view
    near: 0.1,
    far: distance * 2,
  };
}

/**
 * Master Art Lighting
 * 
 * Lighting based on classical painting techniques
 */
export function masterLighting(
  sceneSize: number = 100
): LightingSettings {
  return {
    ambient: {
      color: 0xffffff,
      intensity: 0.4, // Soft ambient for depth
    },
    directional: {
      color: 0xfff8e1, // Warm golden light
      intensity: 0.8,
      position: {
        x: sceneSize * 0.618,
        y: sceneSize * SACRED_MATH.PHI,
        z: sceneSize * 0.618,
      },
    },
    point: [
      {
        color: 0xffd700, // Gold accent
        intensity: 0.6,
        position: { x: 0, y: sceneSize * 0.618, z: 0 },
        distance: sceneSize * 2,
      },
    ],
  };
}

/**
 * Create Golden Ratio Scene
 */
export function createGoldenScene(
  renderer: THREE.WebGLRenderer,
  width: number,
  height: number
): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; lighting: LightingSettings } {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f0); // Off-white, museum quality
  
  // Golden ratio camera
  const cameraSettings = goldenCamera(Math.max(width, height));
  const camera = new THREE.PerspectiveCamera(
    cameraSettings.fov,
    width / height,
    cameraSettings.near,
    cameraSettings.far
  );
  camera.position.set(
    cameraSettings.position.x,
    cameraSettings.position.y,
    cameraSettings.position.z
  );
  camera.lookAt(
    cameraSettings.target.x,
    cameraSettings.target.y,
    cameraSettings.target.z
  );
  
  // Master lighting
  const lighting = masterLighting(Math.max(width, height));
  
  // Ambient light
  const ambientLight = new THREE.AmbientLight(lighting.ambient.color, lighting.ambient.intensity);
  scene.add(ambientLight);
  
  // Directional light (main)
  const directionalLight = new THREE.DirectionalLight(
    lighting.directional.color,
    lighting.directional.intensity
  );
  directionalLight.position.set(
    lighting.directional.position.x,
    lighting.directional.position.y,
    lighting.directional.position.z
  );
  scene.add(directionalLight);
  
  // Point lights
  lighting.point.forEach(point => {
    const light = new THREE.PointLight(point.color, point.intensity, point.distance);
    light.position.set(point.position.x, point.position.y, point.position.z);
    scene.add(light);
  });
  
  return { scene, camera, lighting };
}

/**
 * Create Sacred Geometry Mesh
 */
export function createSacredGeometryMesh(
  type: 'vesica' | 'pentagram' | 'octagon' | 'spiral',
  size: number = 10
): THREE.BufferGeometry {
  let points: { x: number; y: number; z: number }[] = [];
  
  switch (type) {
    case 'vesica':
      const vesica = generateVesicaPiscis(size);
      points = [...vesica.circle1, ...vesica.circle2];
      break;
    case 'pentagram':
      points = generatePentagram(size).map(p => ({ ...p, z: 0 }));
      break;
    case 'spiral':
      points = generateFibonacciSpiral(3, size / 10).map(p => ({ ...p, z: 0 }));
      break;
    default:
      points = [];
  }
  
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(points.flatMap(p => [p.x, p.y, p.z || 0]));
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  return geometry;
}

/**
 * Golden Ratio Animation Easing
 * 
 * Smooth, natural animation curves
 */
export function goldenEasing(t: number): number {
  // Ease in-out using golden ratio
  if (t < 0.5) {
    return Math.pow(t * 2, SACRED_MATH.PHI_INVERSE) / 2;
  }
  return 1 - Math.pow((1 - t) * 2, SACRED_MATH.PHI_INVERSE) / 2;
}

/**
 * Create Fluid Animation
 * 
 * Smooth, flowing animation based on golden ratio
 */
export function createFluidAnimation(
  duration: number = 2000,
  callback: (progress: number) => void
): { start: () => void; stop: () => void } {
  let animationId: number | null = null;
  let startTime: number | null = null;
  
  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = goldenEasing(progress);
    callback(easedProgress);
    
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
