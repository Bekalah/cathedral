import * as THREE from 'three';
import { GemTowerEngine } from './GemTowerEngine';
import { CodexCrystalMatrix } from './CodexCrystalMatrix';
import { GemLootSystem } from './GemLootSystem';

/**
 * DynamicGemManager - Handles real-time gem swapping and tower modifications
 * Enables changeable gem structures like "emerald cities" for different gems
 */
export class DynamicGemManager {
  private static activeTowers: Map<string, {
    mesh: THREE.Mesh;
    currentGem: string;
    nodeId: number;
    energyLevel: number;
    lastUpdate: number;
  }> = new Map();

  private static gemSwapQueue: Array<{
    towerId: string;
    newGem: string;
    transitionTime: number;
    startTime: number;
  }> = new Map();

  private static energyFlowConnections: Map<string, {
    fromTower: string;
    toTower: string;
    strength: number;
    gemCompatibility: number;
  }> = new Map();

  /**
   * Register a gem tower for dynamic management
   */
  static registerGemTower(towerId: string, mesh: THREE.Mesh, gemType: string, nodeId: number): void {
    this.activeTowers.set(towerId, {
      mesh,
      currentGem: gemType,
      nodeId,
      energyLevel: 1.0,
      lastUpdate: Date.now()
    });

    // Initialize matrix if not already done
    if (this.activeTowers.size === 1) {
      CodexCrystalMatrix.initializeMatrix();
      GemLootSystem.initializeLootSystem(CodexCrystalMatrix.getAllGems());
    }
  }

  /**
   * Unregister a gem tower
   */
  static unregisterGemTower(towerId: string): void {
    this.activeTowers.delete(towerId);
    // Clean up any connections involving this tower
    this.removeTowerConnections(towerId);
  }

  /**
   * Swap gem in a tower with smooth transition
   */
  static swapGemInTower(towerId: string, newGemType: string, transitionTime: number = 2000): boolean {
    const tower = this.activeTowers.get(towerId);
    if (!tower) {
      console.warn(`Tower ${towerId} not found`);
      return false;
    }

    if (tower.currentGem === newGemType) {
      console.log(`Tower ${towerId} already has gem ${newGemType}`);
      return false;
    }

    // Check if the new gem is compatible with the tower's node
    const nodeGems = CodexCrystalMatrix.getGemsForNode(tower.nodeId);
    if (!nodeGems.includes(newGemType)) {
      console.warn(`Gem ${newGemType} is not compatible with node ${tower.nodeId}`);
      return false;
    }

    // Queue the gem swap
    this.gemSwapQueue.set(towerId, {
      towerId,
      newGem: newGemType,
      transitionTime,
      startTime: Date.now()
    });

    return true;
  }

  /**
   * Update all active towers (call this in animation loop)
   */
  static updateTowers(deltaTime: number): void {
    const currentTime = Date.now();

    // Process gem swaps in progress
    this.processGemSwaps(currentTime);

    // Update energy levels and visual effects
    this.updateTowerEnergy(currentTime);

    // Update energy flow between connected towers
    this.updateEnergyFlow(currentTime);
  }

  /**
   * Process queued gem swaps with smooth transitions
   */
  private static processGemSwaps(currentTime: number): void {
    this.gemSwapQueue.forEach((swap, towerId) => {
      const tower = this.activeTowers.get(towerId);
      if (!tower) {
        this.gemSwapQueue.delete(towerId);
        return;
      }

      const elapsed = currentTime - swap.startTime;
      const progress = Math.min(elapsed / swap.transitionTime, 1.0);

      // Smooth transition of material properties
      this.animateGemTransition(tower, swap.newGem, progress);

      // Complete the swap if transition is finished
      if (progress >= 1.0) {
        this.completeGemSwap(towerId, swap.newGem);
        this.gemSwapQueue.delete(towerId);
      }
    });
  }

  /**
   * Animate the transition between gem types
   */
  private static animateGemTransition(tower: any, newGem: string, progress: number): void {
    const currentGem = tower.currentGem;
    const mesh = tower.mesh;

    // Get properties for both gems
    const currentProps = CodexCrystalMatrix.getCrystalEnergyProperties(currentGem);
    const newProps = CodexCrystalMatrix.getCrystalEnergyProperties(newGem);

    if (!currentProps || !newProps) return;

    // Interpolate material properties
    if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
      // Interpolate color
      const currentColor = new THREE.Color(GemTowerEngine['getGemColor'](currentGem));
      const newColor = new THREE.Color(GemTowerEngine['getGemColor'](newGem));
      const interpolatedColor = currentColor.clone().lerp(newColor, progress);

      mesh.material.color = interpolatedColor;
      mesh.material.ior = THREE.MathUtils.lerp(
        GemTowerEngine['getGemIOR'](currentGem),
        GemTowerEngine['getGemIOR'](newGem),
        progress
      );

      mesh.material.needsUpdate = true;
    }

    // Animate energy level during transition
    tower.energyLevel = 0.5 + Math.sin(progress * Math.PI) * 0.5;
  }

  /**
   * Complete a gem swap operation
   */
  private static completeGemSwap(towerId: string, newGem: string): void {
    const tower = this.activeTowers.get(towerId);
    if (!tower) return;

    const oldGem = tower.currentGem;
    tower.currentGem = newGem;
    tower.energyLevel = 1.0;
    tower.lastUpdate = Date.now();

    console.log(`Gem swap completed: ${towerId} from ${oldGem} to ${newGem}`);

    // Update energy connections
    this.updateTowerConnections(towerId);

    // Trigger any game events or loot generation
    this.onGemSwapComplete(towerId, oldGem, newGem);
  }

  /**
   * Update tower energy levels and visual effects
   */
  private static updateTowerEnergy(currentTime: number): void {
    this.activeTowers.forEach((tower, towerId) => {
      const timeSinceUpdate = currentTime - tower.lastUpdate;

      // Natural energy fluctuation
      const fluctuation = Math.sin(currentTime * 0.001) * 0.1;
      tower.energyLevel = Math.max(0.1, Math.min(1.0, tower.energyLevel + fluctuation));

      // Apply energy effects to mesh
      this.applyEnergyEffects(tower);
    });
  }

  /**
   * Apply visual energy effects to tower mesh
   */
  private static applyEnergyEffects(tower: any): void {
    const mesh = tower.mesh;
    const energyLevel = tower.energyLevel;

    // Pulsing scale effect based on energy level
    const baseScale = 1.0;
    const pulseScale = 1.0 + Math.sin(Date.now() * 0.003) * energyLevel * 0.1;
    mesh.scale.setScalar(baseScale * pulseScale);

    // Energy glow effect
    if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
      mesh.material.emissive.setHex(0x444444);
      mesh.material.emissiveIntensity = energyLevel * 0.2;
    }
  }

  /**
   * Update energy flow between connected towers
   */
  private static updateEnergyFlow(currentTime: number): void {
    this.energyFlowConnections.forEach((connection, connectionId) => {
      const fromTower = this.activeTowers.get(connection.fromTower);
      const toTower = this.activeTowers.get(connection.toTower);

      if (!fromTower || !toTower) {
        this.energyFlowConnections.delete(connectionId);
        return;
      }

      // Energy transfer based on compatibility
      const transferRate = connection.strength * connection.gemCompatibility * 0.01;

      if (fromTower.energyLevel > toTower.energyLevel + 0.1) {
        // Transfer energy from higher to lower
        const transferAmount = transferRate;
        fromTower.energyLevel = Math.max(0.1, fromTower.energyLevel - transferAmount);
        toTower.energyLevel = Math.min(1.0, toTower.energyLevel + transferAmount);
      }
    });
  }

  /**
   * Create energy connection between two towers
   */
  static createTowerConnection(towerId1: string, towerId2: string): boolean {
    const tower1 = this.activeTowers.get(towerId1);
    const tower2 = this.activeTowers.get(towerId2);

    if (!tower1 || !tower2) {
      console.warn('Cannot create connection: one or both towers not found');
      return false;
    }

    // Calculate compatibility between gems
    const compatibility = CodexCrystalMatrix.calculateGemCompatibility(
      tower1.currentGem,
      tower2.currentGem
    );

    if (compatibility.recommendation === 'poor') {
      console.warn('Cannot create connection: poor gem compatibility');
      return false;
    }

    const connectionId = `${towerId1}_${towerId2}`;
    const reverseConnectionId = `${towerId2}_${towerId1}`;

    // Remove any existing reverse connection
    this.energyFlowConnections.delete(reverseConnectionId);

    this.energyFlowConnections.set(connectionId, {
      fromTower: towerId1,
      toTower: towerId2,
      strength: 1.0,
      gemCompatibility: compatibility.compatibility
    });

    console.log(`Created energy connection: ${towerId1} -> ${towerId2} (compatibility: ${compatibility.recommendation})`);
    return true;
  }

  /**
   * Remove all connections for a tower
   */
  private static removeTowerConnections(towerId: string): void {
    const connectionsToRemove: string[] = [];

    this.energyFlowConnections.forEach((connection, connectionId) => {
      if (connection.fromTower === towerId || connection.toTower === towerId) {
        connectionsToRemove.push(connectionId);
      }
    });

    connectionsToRemove.forEach(id => this.energyFlowConnections.delete(id));
  }

  /**
   * Update connections when a tower's gem changes
   */
  private static updateTowerConnections(towerId: string): void {
    const tower = this.activeTowers.get(towerId);
    if (!tower) return;

    // Find nearby towers for potential connections
    const nearbyTowers = Array.from(this.activeTowers.entries())
      .filter(([id, t]) => id !== towerId && this.calculateTowerDistance(tower, t) < 10);

    // Create connections with compatible towers
    nearbyTowers.forEach(([nearbyId, nearbyTower]) => {
      const compatibility = CodexCrystalMatrix.calculateGemCompatibility(
        tower.currentGem,
        nearbyTower.currentGem
      );

      if (compatibility.recommendation !== 'poor') {
        this.createTowerConnection(towerId, nearbyId);
      }
    });
  }

  /**
   * Calculate distance between two towers
   */
  private static calculateTowerDistance(tower1: any, tower2: any): number {
    const pos1 = tower1.mesh.position;
    const pos2 = tower2.mesh.position;

    return Math.sqrt(
      Math.pow(pos2.x - pos1.x, 2) +
      Math.pow(pos2.y - pos1.y, 2) +
      Math.pow(pos2.z - pos1.z, 2)
    );
  }

  /**
   * Handle gem swap completion events
   */
  private static onGemSwapComplete(towerId: string, oldGem: string, newGem: string): void {
    const tower = this.activeTowers.get(towerId);
    if (!tower) return;

    // Generate loot based on the new gem
    const lootResult = GemLootSystem.attemptLootGeneration(
      `${newGem.toLowerCase()}_shrines`,
      1.0 // Player luck modifier
    );

    if (lootResult) {
      console.log(`Gem swap loot generated: ${lootResult.gemType} worth ${lootResult.value}`);
    }

    // Update tower structure if needed
    if (GemTowerEngine['requiresGeometryUpdate'](newGem)) {
      console.log(`Major structural update required for ${newGem} tower`);
      // This would trigger a geometry regeneration
    }
  }

  /**
   * Get tower information
   */
  static getTowerInfo(towerId: string): {
    currentGem: string;
    nodeId: number;
    energyLevel: number;
    connections: string[];
    lootTable: any;
  } | null {
    const tower = this.activeTowers.get(towerId);
    if (!tower) return null;

    const connections = Array.from(this.energyFlowConnections.entries())
      .filter(([_, conn]) => conn.fromTower === towerId || conn.toTower === towerId)
      .map(([_, conn]) => conn.fromTower === towerId ? conn.toTower : conn.fromTower);

    const lootTable = GemLootSystem.getLootTable(tower.currentGem);

    return {
      currentGem: tower.currentGem,
      nodeId: tower.nodeId,
      energyLevel: tower.energyLevel,
      connections,
      lootTable
    };
  }

  /**
   * Get all active towers
   */
  static getAllTowers(): Array<{
    id: string;
    gemType: string;
    nodeId: number;
    energyLevel: number;
    position: THREE.Vector3;
  }> {
    return Array.from(this.activeTowers.entries()).map(([id, tower]) => ({
      id,
      gemType: tower.currentGem,
      nodeId: tower.nodeId,
      energyLevel: tower.energyLevel,
      position: tower.mesh.position.clone()
    }));
  }

  /**
   * Generate a complete gem city with multiple interconnected towers
   */
  static generateGemCity(gemType: string, nodeIds: number[], radius: number = 15): {
    towers: THREE.Group;
    connections: Array<{ from: number; to: number; strength: number }>;
  } {
    const city = new THREE.Group();
    const towers: THREE.Group[] = [];
    const connections: Array<{ from: number; to: number; strength: number }> = [];

    // Generate towers for each node
    nodeIds.forEach((nodeId, index) => {
      const angle = (Math.PI * 2 * index) / nodeIds.length;
      const distance = radius * (0.3 + Math.random() * 0.7);

      const towerConfig = CodexCrystalMatrix.generateTowerConfigForNode(nodeId, gemType);
      const tower = GemTowerEngine.generateGemTower(towerConfig.towerConfig as any);
      const towerMesh = new THREE.Mesh(tower.geometry, tower.materials[0]);

      towerMesh.position.set(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      );

      // Register the tower for dynamic management
      const towerId = `city_tower_${nodeId}_${index}`;
      this.registerGemTower(towerId, towerMesh, gemType, nodeId);

      towers.push(towerMesh);
      city.add(towerMesh);
    });

    // Create connections between nearby towers
    for (let i = 0; i < towers.length; i++) {
      for (let j = i + 1; j < towers.length; j++) {
        const distance = towers[i].position.distanceTo(towers[j].position);
        if (distance < radius * 0.8) {
          const towerId1 = `city_tower_${nodeIds[i]}_${i}`;
          const towerId2 = `city_tower_${nodeIds[j]}_${j}`;

          if (this.createTowerConnection(towerId1, towerId2)) {
            connections.push({
              from: nodeIds[i],
              to: nodeIds[j],
              strength: Math.max(0, 1 - distance / (radius * 0.8))
            });
          }
        }
      }
    }

    return { towers: city, connections };
  }

  /**
   * Clear all active towers and reset the system
   */
  static resetSystem(): void {
    this.activeTowers.clear();
    this.gemSwapQueue.clear();
    this.energyFlowConnections.clear();
  }

  /**
   * Export system state for save game
   */
  static exportSystemState(): {
    activeTowers: Record<string, any>;
    energyConnections: Record<string, any>;
    gemSwapQueue: Record<string, any>;
  } {
    const activeTowers: Record<string, any> = {};
    this.activeTowers.forEach((tower, id) => {
      activeTowers[id] = {
        currentGem: tower.currentGem,
        nodeId: tower.nodeId,
        energyLevel: tower.energyLevel,
        position: tower.mesh.position.toArray()
      };
    });

    const energyConnections: Record<string, any> = {};
    this.energyFlowConnections.forEach((connection, id) => {
      energyConnections[id] = connection;
    });

    const gemSwapQueue: Record<string, any> = {};
    this.gemSwapQueue.forEach((swap, id) => {
      gemSwapQueue[id] = swap;
    });

    return {
      activeTowers,
      energyConnections,
      gemSwapQueue
    };
  }

  /**
   * Import system state from save game
   */
  static importSystemState(state: {
    activeTowers: Record<string, any>;
    energyConnections: Record<string, any>;
    gemSwapQueue: Record<string, any>;
  }): void {
    this.resetSystem();

    // Note: This would need to recreate the THREE.js objects
    // For now, just restore the data structures
    Object.entries(state.activeTowers).forEach(([id, tower]) => {
      // This would need the actual mesh objects to be passed in
      console.log(`Would restore tower ${id} with gem ${tower.currentGem}`);
    });
  }
}

export default DynamicGemManager;
