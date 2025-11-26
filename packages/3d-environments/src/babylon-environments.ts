/**
 * babylon-environments
 * 
 * @package @cathedral/3d-environments
 */
/**
 * Babylon.js 3D Environments
 * 
 * Master art principles applied to Babylon.js scenes
 */

import * as BABYLON from 'babylonjs';
import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

export interface BabylonEnvironment {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
  camera: BABYLON.Camera;
}

/**
 * Create Stone Grimoire Babylon.js Environment
 */
export function createStoneGrimoireBabylon(
  canvas: HTMLCanvasElement
): BabylonEnvironment {
  // Create engine
  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  // Create scene
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.96, 0.96, 0.94); // Off-white, museum quality

  // Golden ratio camera
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    canvas.width * SACRED_MATH.PHI,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControls(canvas, true);

  // Master lighting
  const ambientLight = new BABYLON.HemisphericLight(
    'ambient',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  ambientLight.intensity = 0.4;

  const directionalLight = new BABYLON.DirectionalLight(
    'directional',
    new BABYLON.Vector3(
      canvas.width * 0.618,
      canvas.height * SACRED_MATH.PHI,
      canvas.width * 0.618
    ),
    scene
  );
  directionalLight.intensity = 0.8;
  directionalLight.diffuse = new BABYLON.Color3(1, 0.97, 0.88); // Warm golden

  // Create 8 octagram halls
  for (let i = 1; i <= 8; i++) {
    createBabylonHall(i, 20, scene);
  }

  // Render loop
  engine.runRenderLoop(() => {
    scene.render();
  });

  // Handle resize
  window.addEventListener('resize', () => {
    engine.resize();
  });

  return {
    engine,
    scene,
    camera,
  };
}

/**
 * Create Babylon.js hall
 */
function createBabylonHall(
  hallId: number,
  size: number,
  scene: BABYLON.Scene
): void {
  // Octagram ring
  const ring = BABYLON.MeshBuilder.CreateTorus(
    `hall-${hallId}`,
    {
      diameter: size * 2,
      thickness: size * 0.4,
      tessellation: 8,
    },
    scene
  );

  // Material with master art colors
  const material = new BABYLON.StandardMaterial(`hall-material-${hallId}`, scene);
  material.diffuseColor = getHallColor3(hallId);
  material.emissiveColor = getHallColor3(hallId);
  material.emissiveIntensity = 0.2;
  material.metallicFactor = 0.3;
  material.roughnessFactor = 0.7;
  ring.material = material;

  // Position using golden ratio
  const angle = (hallId - 1) * (360 / 8);
  const rad = (angle * Math.PI) / 180;
  const radius = size * 3 * SACRED_MATH.PHI;
  ring.position.x = Math.cos(rad) * radius;
  ring.position.z = Math.sin(rad) * radius;
  ring.position.y = 0;
}

/**
 * Get hall color as Babylon Color3
 */
function getHallColor3(hallId: number): BABYLON.Color3 {
  const colors = [
    new BABYLON.Color3(1, 0.42, 0.21), // Fire
    new BABYLON.Color3(0.29, 0.56, 0.89), // Water
    new BABYLON.Color3(0.55, 0.45, 0.33), // Earth
    new BABYLON.Color3(0.91, 0.91, 0.91), // Air
    new BABYLON.Color3(0.83, 0.69, 0.22), // Spirit
    new BABYLON.Color3(0.1, 0.1, 0.1), // Void
    new BABYLON.Color3(1, 1, 1), // Light
    new BABYLON.Color3(0.29, 0.29, 0.29), // Shadow
  ];
  return colors[hallId - 1] || new BABYLON.Color3(1, 1, 1);
}
