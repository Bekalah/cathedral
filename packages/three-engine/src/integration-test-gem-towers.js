/**
 * Gem Tower Integration Test
 * Demonstrates the complete gem tower system with real gems, loot, and changeable structures
 */

import * as THREE from 'three';
import { GemTowerEngine } from './systems/GemTowerEngine.js';
import { GemLootSystem } from './systems/GemLootSystem.js';
import { CodexCrystalMatrix } from './systems/CodexCrystalMatrix.js';
import { DynamicGemManager } from './systems/DynamicGemManager.js';

// Test scene setup
let scene, camera, renderer;
let gemTowers = new Map();
let animationId;

// Initialize the test scene
export function initializeGemTowerTest() {
  console.log('🚀 Initializing Gem Tower Integration Test...');

  // Initialize systems
  CodexCrystalMatrix.initializeMatrix();
  GemLootSystem.initializeLootSystem(CodexCrystalMatrix.getAllGems());

  // Setup Three.js scene
  setupThreeScene();

  // Create gem towers for demonstration
  createGemTowers();

  // Setup UI controls
  setupControls();

  // Start animation loop
  animate();

  console.log('✅ Gem Tower Integration Test initialized successfully!');
  console.log('🎮 Controls:');
  console.log('  1-9: Swap gems in towers');
  console.log('  C: Create gem city');
  console.log('  L: Generate loot');
  console.log('  I: Show tower info');
  console.log('  R: Reset scene');
}

// Setup Three.js scene
function setupThreeScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000011);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(20, 15, 20);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Add grid helper
  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);
}

// Create demonstration gem towers
function createGemTowers() {
  const gemTypes = ['Clear Quartz', 'Amethyst', 'Rose Quartz', 'Emerald'];
  const positions = [
    { x: -10, y: 0, z: -10 },
    { x: 10, y: 0, z: -10 },
    { x: -10, y: 0, z: 10 },
    { x: 10, y: 0, z: 10 }
  ];

  gemTypes.forEach((gemType, index) => {
    // Create tower configuration for node 1 (sample node)
    const towerConfig = CodexCrystalMatrix.generateTowerConfigForNode(1, gemType);

    // Generate the tower
    const tower = GemTowerEngine.generateGemTower(towerConfig.towerConfig);
    const towerMesh = new THREE.Mesh(tower.geometry, tower.materials[0]);

    // Position the tower
    towerMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
    towerMesh.castShadow = true;
    towerMesh.receiveShadow = true;

    // Register with dynamic manager
    const towerId = `demo_tower_${index}`;
    DynamicGemManager.registerGemTower(towerId, towerMesh, gemType, 1);

    // Store reference
    gemTowers.set(towerId, { mesh: towerMesh, gemType, nodeId: 1 });

    // Add to scene
    scene.add(towerMesh);

    console.log(`🏗️ Created ${gemType} tower at position ${index + 1}`);
  });
}

// Setup keyboard controls
function setupControls() {
  document.addEventListener('keydown', (event) => {
    switch (event.key.toLowerCase()) {
      case '1':
      case '2':
      case '3':
      case '4':
        swapGemInTower(parseInt(event.key) - 1);
        break;
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        swapGemInTower(parseInt(event.key) - 1);
        break;
      case 'c':
        createGemCity();
        break;
      case 'l':
        generateLoot();
        break;
      case 'i':
        showTowerInfo();
        break;
      case 'r':
        resetScene();
        break;
      case 'escape':
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        document.body.removeChild(renderer.domElement);
        console.log('🛑 Gem Tower Test terminated');
        break;
    }
  });
}

// Swap gem in a specific tower
function swapGemInTower(towerIndex) {
  const towerIds = Array.from(gemTowers.keys());
  if (towerIndex >= towerIds.length) {
    console.log('❌ Invalid tower index');
    return;
  }

  const towerId = towerIds[towerIndex];
  const currentTower = gemTowers.get(towerId);

  // Get available gem types for this tower's node
  const nodeGems = CodexCrystalMatrix.getGemsForNode(currentTower.nodeId);
  const currentIndex = nodeGems.indexOf(currentTower.gemType);
  const nextGem = nodeGems[(currentIndex + 1) % nodeGems.length];

  console.log(`🔄 Swapping tower ${towerIndex + 1} from ${currentTower.gemType} to ${nextGem}`);

  // Perform the gem swap
  DynamicGemManager.swapGemInTower(towerId, nextGem, 2000);

  // Update our reference
  currentTower.gemType = nextGem;
  gemTowers.set(towerId, currentTower);
}

// Create a gem city with multiple interconnected towers
function createGemCity() {
  console.log('🏙️ Creating Emerald City...');

  // Generate a city with nodes 1, 3, 5, 7, 9 (sample nodes)
  const nodeIds = [1, 3, 5, 7, 9];
  const city = DynamicGemManager.generateGemCity('Emerald', nodeIds, 25);

  // Position the city
  city.towers.position.set(0, 0, 0);

  // Add to scene
  scene.add(city.towers);

  console.log(`✅ Created Emerald City with ${nodeIds.length} towers`);
  console.log(`🔗 Energy connections: ${city.connections.length}`);
}

// Generate loot from various sources
function generateLoot() {
  console.log('🎒 Generating loot...');

  const sources = [
    'mines', 'amethyst_caves', 'emerald_mines', 'ruby_mines',
    'sun_temples', 'moon_shrines', 'ancient_temples'
  ];

  sources.forEach(source => {
    const loot = GemLootSystem.attemptLootGeneration(source, 1.0);
    if (loot) {
      console.log(`💎 Loot from ${source}: ${loot.gemType} (value: ${loot.value})`);
    } else {
      console.log(`💨 No loot from ${source}`);
    }
  });

  // Show statistics
  const stats = GemLootSystem.getDropStatistics();
  console.log(`📊 Total drops: ${stats.totalDrops}`);
  console.log(`💰 Average value: ${stats.averageValue.toFixed(2)}`);
}

// Show information about all towers
function showTowerInfo() {
  console.log('📋 Tower Information:');

  gemTowers.forEach((tower, towerId) => {
    const info = DynamicGemManager.getTowerInfo(towerId);
    if (info) {
      console.log(`🏗️ Tower ${towerId}:`);
      console.log(`  💎 Gem: ${info.currentGem}`);
      console.log(`  🔢 Node: ${info.nodeId}`);
      console.log(`  ⚡ Energy: ${(info.energyLevel * 100).toFixed(1)}%`);
      console.log(`  🔗 Connections: ${info.connections.length}`);
      console.log(`  🎲 Loot rarity: ${info.lootTable?.rarity || 'Unknown'}`);
    }
  });

  // Show gem compatibility matrix
  console.log('\n🔗 Gem Compatibility Matrix:');
  const gems = ['Clear Quartz', 'Amethyst', 'Rose Quartz', 'Emerald'];
  gems.forEach(gem1 => {
    gems.forEach(gem2 => {
      if (gem1 !== gem2) {
        const compatibility = CodexCrystalMatrix.calculateGemCompatibility(gem1, gem2);
        console.log(`${gem1} + ${gem2}: ${compatibility.recommendation} (${compatibility.compatibility}%)`);
      }
    });
  });
}

// Reset the scene
function resetScene() {
  console.log('🔄 Resetting scene...');

  // Clear existing towers
  gemTowers.forEach((tower) => {
    scene.remove(tower.mesh);
  });
  gemTowers.clear();

  // Reset dynamic manager
  DynamicGemManager.resetSystem();

  // Recreate towers
  createGemTowers();

  console.log('✅ Scene reset complete');
}

// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);

  const deltaTime = 0.016; // Approximate 60fps

  // Update dynamic gem manager
  DynamicGemManager.updateTowers(deltaTime);

  // Render scene
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Export functions for external use
export {
  scene,
  camera,
  renderer,
  gemTowers,
  swapGemInTower,
  createGemCity,
  generateLoot,
  showTowerInfo,
  resetScene
};

// Auto-initialize if this script is run directly
if (typeof window !== 'undefined') {
  window.addEventListener('load', initializeGemTowerTest);
}
