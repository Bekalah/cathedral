/**
 * babylon-shaders
 * 
 * @package @cathedral/luxury-metallics-shaders
 */
/**
 * Babylon.js Luxury Metallic Shaders
 * 
 * High-end PBR materials for Babylon.js with luxury metallic properties
 */

import * as BABYLON from 'babylonjs';
import { TiffanyMaterial, getTiffanyMaterial } from './tiffany-materials';
import { LuxuryMetal, getLuxuryMetal } from './luxury-metals';
import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

/**
 * Create Babylon.js material from Tiffany material
 */
export function createTiffanyBabylonMaterial(
  materialName: keyof typeof import('./tiffany-materials').TIFFANY_MATERIALS,
  scene: BABYLON.Scene
): BABYLON.PBRMaterial {
  const tiffany = getTiffanyMaterial(materialName);
  
  const material = new BABYLON.PBRMaterial(`${materialName}_material`, scene);
  
  material.baseColor = BABYLON.Color3.FromHexString(tiffany.color);
  material.metallic = tiffany.metalness;
  material.roughness = tiffany.roughness;
  
  if (tiffany.emissive) {
    material.emissiveColor = BABYLON.Color3.FromHexString(tiffany.emissive);
    material.emissiveIntensity = tiffany.emissiveIntensity || 0;
  }
  
  material.reflectivityColor = BABYLON.Color3.White();
  material.reflectivityTexture = null;
  material.metallicReflectanceTexture = null;
  
  material.clearCoat = {
    intensity: tiffany.clearcoat || 0,
    roughness: tiffany.clearcoatRoughness || 0,
  };
  
  material.sheen = {
    intensity: tiffany.sheen || 0,
    color: tiffany.sheenColor ? BABYLON.Color3.FromHexString(tiffany.sheenColor) : BABYLON.Color3.White(),
    roughness: tiffany.sheenRoughness || 0,
  };
  
  material.indexOfRefraction = tiffany.ior || 1.5;
  
  return material;
}

/**
 * Create Babylon.js material from luxury metal
 */
export function createLuxuryMetalBabylonMaterial(
  metalName: keyof typeof import('./luxury-metals').LUXURY_METALS,
  scene: BABYLON.Scene
): BABYLON.PBRMaterial {
  const metal = getLuxuryMetal(metalName);
  
  const material = new BABYLON.PBRMaterial(`${metalName}_material`, scene);
  
  material.baseColor = BABYLON.Color3.FromHexString(metal.color);
  material.metallic = metal.metalness;
  material.roughness = metal.roughness;
  
  if (metal.emissive) {
    material.emissiveColor = BABYLON.Color3.FromHexString(metal.emissive);
    material.emissiveIntensity = metal.emissiveIntensity || 0;
  }
  
  material.clearCoat = {
    intensity: metal.clearcoat,
    roughness: metal.clearcoatRoughness,
  };
  
  material.sheen = {
    intensity: metal.sheen,
    color: BABYLON.Color3.FromHexString(metal.sheenColor),
    roughness: metal.sheenRoughness,
  };
  
  material.indexOfRefraction = metal.ior;
  
  return material;
}

/**
 * Create golden ratio metallic material for Babylon.js
 */
export function createGoldenRatioMetallicBabylon(
  baseColor: string,
  scene: BABYLON.Scene,
  baseMetalness: number = 1.0
): BABYLON.PBRMaterial {
  const goldenRoughness = baseMetalness * SACRED_MATH.PHI_INVERSE;
  const goldenReflectivity = baseMetalness * SACRED_MATH.PHI;
  
  const material = new BABYLON.PBRMaterial('golden_ratio_metallic', scene);
  
  material.baseColor = BABYLON.Color3.FromHexString(baseColor);
  material.metallic = baseMetalness;
  material.roughness = Math.min(goldenRoughness, 1.0);
  
  material.clearCoat = {
    intensity: 0.9,
    roughness: goldenRoughness * 0.1,
  };
  
  material.sheen = {
    intensity: 0.5,
    color: BABYLON.Color3.FromHexString(baseColor),
    roughness: goldenRoughness * 0.2,
  };
  
  return material;
}
