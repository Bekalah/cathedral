/**
 * three-shaders
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Three.js Luxury Metallic Shaders
 * 
 * High-end PBR materials for Three.js with luxury metallic properties
 */

import * as THREE from 'three';
import { TiffanyMaterial, getTiffanyMaterial } from './tiffany-materials';
import { LuxuryMetal, getLuxuryMetal } from './luxury-metals';
import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

/**
 * Create Three.js material from Tiffany material
 */
export function createTiffanyThreeMaterial(
  materialName: keyof typeof import('./tiffany-materials').TIFFANY_MATERIALS
): THREE.MeshStandardMaterial {
  const tiffany = getTiffanyMaterial(materialName);
  
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tiffany.color),
    metalness: tiffany.metalness,
    roughness: tiffany.roughness,
    emissive: tiffany.emissive ? new THREE.Color(tiffany.emissive) : undefined,
    emissiveIntensity: tiffany.emissiveIntensity || 0,
    reflectivity: tiffany.reflectivity || 0.5,
    clearcoat: tiffany.clearcoat || 0,
    clearcoatRoughness: tiffany.clearcoatRoughness || 0,
    sheen: tiffany.sheen || 0,
    sheenColor: tiffany.sheenColor ? new THREE.Color(tiffany.sheenColor) : undefined,
    sheenRoughness: tiffany.sheenRoughness || 0,
  });

  return material;
}

/**
 * Create Three.js material from luxury metal
 */
export function createLuxuryMetalThreeMaterial(
  metalName: keyof typeof import('./luxury-metals').LUXURY_METALS
): THREE.MeshStandardMaterial {
  const metal = getLuxuryMetal(metalName);
  
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(metal.color),
    metalness: metal.metalness,
    roughness: metal.roughness,
    emissive: metal.emissive ? new THREE.Color(metal.emissive) : undefined,
    emissiveIntensity: metal.emissiveIntensity || 0,
    reflectivity: metal.reflectivity,
    clearcoat: metal.clearcoat,
    clearcoatRoughness: metal.clearcoatRoughness,
    sheen: metal.sheen,
    sheenColor: new THREE.Color(metal.sheenColor),
    sheenRoughness: metal.sheenRoughness,
  });

  return material;
}

/**
 * Create custom luxury metallic material
 */
export function createCustomLuxuryMaterial(config: {
  color: string;
  metalness?: number;
  roughness?: number;
  reflectivity?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenColor?: string;
  sheenRoughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(config.color),
    metalness: config.metalness ?? 1.0,
    roughness: config.roughness ?? 0.1,
    reflectivity: config.reflectivity ?? 0.95,
    clearcoat: config.clearcoat ?? 0.9,
    clearcoatRoughness: config.clearcoatRoughness ?? 0.05,
    sheen: config.sheen ?? 0.5,
    sheenColor: config.sheenColor ? new THREE.Color(config.sheenColor) : undefined,
    sheenRoughness: config.sheenRoughness ?? 0.1,
    emissive: config.emissive ? new THREE.Color(config.emissive) : undefined,
    emissiveIntensity: config.emissiveIntensity ?? 0,
  });
}

/**
 * Create golden ratio metallic material
 * 
 * Uses golden ratio for material properties
 */
export function createGoldenRatioMetallic(
  baseColor: string,
  baseMetalness: number = 1.0
): THREE.MeshStandardMaterial {
  const goldenRoughness = baseMetalness * SACRED_MATH.PHI_INVERSE; // ~0.618
  const goldenReflectivity = baseMetalness * SACRED_MATH.PHI; // ~1.618
  
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColor),
    metalness: baseMetalness,
    roughness: Math.min(goldenRoughness, 1.0),
    reflectivity: Math.min(goldenReflectivity, 1.0),
    clearcoat: 0.9,
    clearcoatRoughness: goldenRoughness * 0.1,
    sheen: 0.5,
    sheenColor: new THREE.Color(baseColor),
    sheenRoughness: goldenRoughness * 0.2,
  });
}

/**
 * Create animated luxury material
 * 
 * Material with subtle animation for luxury effects
 */
export function createAnimatedLuxuryMaterial(
  baseMaterial: THREE.MeshStandardMaterial,
  animationSpeed: number = 0.001
): {
  material: THREE.MeshStandardMaterial;
  update: (deltaTime: number) => void;
} {
  let time = 0;
  
  const update = (deltaTime: number) => {
    time += deltaTime * animationSpeed;
    
    // Subtle sheen animation
    baseMaterial.sheen = 0.5 + Math.sin(time) * 0.1;
    
    // Subtle emissive pulse
    if (baseMaterial.emissive) {
      baseMaterial.emissiveIntensity = 0.05 + Math.sin(time * 2) * 0.02;
    }
  };

  return {
    material: baseMaterial,
    update,
  };
}

/**
 * Create environment map for luxury reflections
 */
export function createLuxuryEnvironmentMap(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  size: number = 512
): THREE.CubeTexture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  
  // Create a simple environment for luxury reflections
  const envScene = new THREE.Scene();
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  envScene.add(light);
  
  const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();
  
  return envMap;
}
