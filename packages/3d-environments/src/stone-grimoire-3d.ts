/**
 * stone-grimoire-3d
 * 
 * @package @cathedral/3d-environments
 */
/**
 * Stone Grimoire 3D Environment
 * 
 * 8 octagram halls rendered in 3D with master art principles
 */

import * as THREE from 'three';
import { StoneGrimoire } from '@cathedral/stone-grimoire';
import { createGoldenScene } from '@cathedral/master-art-principles/3d-principles';
import { SACRED_MATH } from '@cathedral/master-art-principles/sacred-math';

export interface StoneGrimoire3D {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  grimoire: StoneGrimoire;
  halls: THREE.Group[];
}

/**
 * Create Stone Grimoire 3D Scene
 */
export function createStoneGrimoire3D(
  container: HTMLElement,
  width: number = container.clientWidth,
  height: number = container.clientHeight
): StoneGrimoire3D {
  // Create renderer with museum quality
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Create golden scene
  const { scene, camera } = createGoldenScene(renderer, width, height);

  // Initialize Stone Grimoire
  const grimoire = new StoneGrimoire();

  // Create 8 octagram halls
  const halls: THREE.Group[] = [];
  const allHalls = grimoire.getAllHalls();

  allHalls.forEach(hall => {
    const hallGroup = createHall3D(hall);
    scene.add(hallGroup);
    halls.push(hallGroup);
  });

  // Add central sacred geometry
  const centerGeometry = new THREE.RingGeometry(5, 15, 64);
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // Gold
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xd4af37,
    emissiveIntensity: 0.3,
  });
  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  center.rotation.x = -Math.PI / 2;
  center.receiveShadow = true;
  scene.add(center);

  // Animate
  const animate = () => {
    requestAnimationFrame(animate);

    // Gentle rotation
    halls.forEach((hall, index) => {
      hall.rotation.y += 0.0005 * (index + 1);
    });
    center.rotation.z += 0.001;

    renderer.render(scene, camera);
  };
  animate();

  return {
    scene,
    camera,
    renderer,
    grimoire,
    halls,
  };
}

/**
 * Create 3D hall mesh
 */
function createHall3D(hall: any): THREE.Group {
  const group = new THREE.Group();

  // Octagram ring
  const ringGeometry = new THREE.RingGeometry(
    hall.geometry.radius * 0.6,
    hall.geometry.radius,
    8
  );
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: parseInt(hall.correspondences.color.replace('#', '0x')),
    metalness: 0.4,
    roughness: 0.6,
    emissive: parseInt(hall.correspondences.color.replace('#', '0x')),
    emissiveIntensity: 0.2,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.receiveShadow = true;
  ring.castShadow = true;
  group.add(ring);

  // Position using golden ratio
  group.position.set(
    hall.geometry.center.x,
    hall.geometry.center.y,
    hall.geometry.center.z
  );

  return group;
}
