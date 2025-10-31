/**
 * Cathedral Architect Engine
 * Transforms Codex 144:99 nodes into explorable chambers in a living digital cathedral
 *
 * "Not a collection of tools, but a place to explore" - Cathedral of Circuits Vision
 */

import * as THREE from 'three';
// TODO: Update imports when packages are properly configured in unified monorepo
// import { SacredGeometryRenderer } from '@cathedral/three-engine';
// import { CodexNode } from '@cathedral/codex-engine';

// Temporary type definitions for compilation
interface SacredGeometryRenderer {
  renderPlatonicSolid(position: THREE.Vector3, type: string, size: number): THREE.Mesh;
  renderFlowerOfLife(center: THREE.Vector3, radius: number, layers: number): THREE.Group;
}

interface CodexNode {
  id: string;
  name: string;
  element: string;
  frequency?: number;
  color?: string;
  sacred_geometry?: string;
  correspondences?: any;
  tools?: any[];
  astrology?: any;
}

export interface CanonicalStory {
  storyId: string;
  title: string;
  loreText: string;
  author: string;
  hash: string;
  immutable: boolean;
  editPolicy: {
    canEdit: string[];
    requireApproval: boolean;
  };
  versions: Array<{
    versionId: string;
    timestamp: string;
    hash: string;
    text: string;
    approvedBy?: string;
    bundleId?: string;
  }>;
}

export interface BundleMetadata {
  bundleId: string;
  parentStoryId?: string;
  parentStoryHash?: string;
  proposedStoryDelta?: string;
  status: 'proposed' | 'staged' | 'consecrated' | 'forked';
  author: string;
  approvals: Array<{
    user: string;
    role: string;
    time: string;
    decision: string;
  }>;
  forkOf?: string;
  permissions: {
    allowReuse: boolean;
  };
  provenance: {
    prompt?: string;
    seed: number;
    model: string;
    lora?: string;
    timestamp: string;
    hash: string;
  };
}

export interface ChamberDefinition {
  nodeId: string;
  archetype: string;
  element: 'air' | 'fire' | 'water' | 'earth' | 'ether';
  geometry: SacredGeometry;
  artifacts: Artifact[];
  connections: string[];
  state: ChamberState;
  position: THREE.Vector3;
  frequency: number;
  color: string;
  canonicalStory?: CanonicalStory;
  bundleMeta?: BundleMetadata;
}

export interface SacredGeometry {
  type: 'dodecahedron' | 'icosahedron' | 'cube' | 'tetrahedron' | 'octahedron' | 'flower_of_life' | 'metatron_cube' | 'sri_yantra';
  frequency: number;
  color: string;
  pattern: string;
  platonicSolid?: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron';
}

export interface Artifact {
  id: string;
  name: string;
  type: 'grimoire_fragment' | 'tool' | 'symbol' | 'key' | 'relic';
  description: string;
  mysticalProperties: string[];
  visualRepresentation: string;
  interaction: InteractionType;
}

export type ChamberState = 'locked' | 'discovered' | 'explored' | 'mastered' | 'transcendent';

export type InteractionType = 'read' | 'use' | 'meditate' | 'experiment' | 'commune';

export interface Corridor {
  fromChamber: string;
  toChamber: string;
  path: THREE.Vector3[];
  guardians?: Guardian[];
  challenges?: Challenge[];
  length: number;
  mysticalSignificance: string;
}

export interface Guardian {
  name: string;
  archetype: string;
  challenge: string;
  reward: string;
}

export interface Challenge {
  type: 'riddle' | 'frequency' | 'geometric' | 'meditation' | 'experiment';
  description: string;
  solution?: string;
  difficulty: number;
}

export class CathedralArchitect {
  private chambers: Map<string, ChamberDefinition> = new Map();
  private corridors: Map<string, Corridor> = new Map();
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    // TODO: Initialize SacredGeometryRenderer when properly imported
    // this.sacredGeometryRenderer = new SacredGeometryRenderer(scene);
  }

  /**
   * Transform a Codex node into an explorable chamber
   */
  generateChamber(nodeData: CodexNode): ChamberDefinition {
    const baseGeometry = this.selectPlatonicSolid(nodeData.element);
    const frequency = nodeData.frequency || this.calculateSacredFrequency(nodeData);
    const color = nodeData.color || this.deriveColorFromElement(nodeData.element);

    const chamber: ChamberDefinition = {
      nodeId: nodeData.id,
      archetype: nodeData.name,
      element: nodeData.element as 'air' | 'fire' | 'water' | 'earth' | 'ether',
      geometry: {
        type: baseGeometry,
        frequency: frequency,
        color: color,
        pattern: this.generateFloorPattern(nodeData.sacred_geometry),
        platonicSolid: baseGeometry
      },
      artifacts: this.populateArtifacts(nodeData),
      connections: this.generateConnections(nodeData),
      state: 'locked',
      position: this.calculateChamberPosition(nodeData),
      frequency: frequency,
      color: color
    };

    this.chambers.set(nodeData.id, chamber);
    return chamber;
  }

  /**
   * Select appropriate Platonic solid based on element
   */
  private selectPlatonicSolid(element: string): 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron' {
    const elementGeometry: Record<string, any> = {
      'fire': 'tetrahedron',      // 4 faces - primal energy
      'earth': 'cube',            // 6 faces - stability
      'air': 'octahedron',        // 8 faces - balance
      'water': 'icosahedron',     // 20 faces - flow
      'ether': 'dodecahedron'     // 12 faces - divine
    };

    return elementGeometry[element] || 'dodecahedron';
  }

  /**
   * Calculate sacred frequency for chamber ambience
   */
  private calculateSacredFrequency(nodeData: CodexNode): number {
    // Use existing mystical frequency mapping
    const solfeggioFrequencies = [396, 417, 528, 639, 741, 852, 963];
    const planetaryFrequencies = [210.42, 141.27, 221.23, 126.22, 144.72, 183.58, 147.85];

    // Map based on node properties
    if (nodeData.astrology?.planet) {
      const planetIndex = ['moon', 'mercury', 'venus', 'sun', 'mars', 'jupiter', 'saturn'].indexOf(nodeData.astrology.planet.toLowerCase());
      if (planetIndex >= 0) return planetaryFrequencies[planetIndex];
    }

    // Default to transformation frequency
    return 528; // MI - DNA repair / transformation
  }

  /**
   * Derive archetypal color from element
   */
  private deriveColorFromElement(element: string): string {
    const elementColors: Record<string, string> = {
      'fire': '#FF4500',      // Red-orange fire
      'earth': '#8B4513',     // Brown earth
      'air': '#87CEEB',       // Sky blue
      'water': '#1E90FF',     // Deep blue
      'ether': '#9370DB'      // Purple divine
    };

    return elementColors[element] || '#FFD700'; // Gold default
  }

  /**
   * Generate mystical floor pattern for chamber
   */
  private generateFloorPattern(sacredGeometry?: string): string {
    const patterns = [
      'flower_of_life',
      'vesica_piscis',
      'metatron_cube',
      'sri_yantra',
      'tree_of_life',
      'labyrinth',
      'celtic_knot',
      'mandala'
    ];

    return sacredGeometry || patterns[Math.floor(Math.random() * patterns.length)];
  }

  /**
   * Populate chamber with mystical artifacts
   */
  private populateArtifacts(nodeData: CodexNode): Artifact[] {
    const artifacts: Artifact[] = [];

    // Grimoire fragment (from public domain texts)
    if (nodeData.correspondences?.grimoire) {
      artifacts.push({
        id: `grimoire_${nodeData.id}`,
        name: `${nodeData.name} Grimoire Fragment`,
        type: 'grimoire_fragment',
        description: `Ancient text fragment related to ${nodeData.name}`,
        mysticalProperties: ['wisdom', 'power', 'transformation'],
        visualRepresentation: 'ancient_parchment',
        interaction: 'read'
      });
    }

    // Mystical tool or instrument
    if (nodeData.tools && nodeData.tools.length > 0) {
      artifacts.push({
        id: `tool_${nodeData.id}`,
        name: `${nodeData.name} Tool`,
        type: 'tool',
        description: nodeData.tools[0].description,
        mysticalProperties: nodeData.tools[0].properties || [],
        visualRepresentation: nodeData.tools[0].visual || 'mystical_orb',
        interaction: 'use'
      });
    }

    // Sacred symbol or key
    artifacts.push({
      id: `symbol_${nodeData.id}`,
      name: `${nodeData.name} Symbol`,
      type: 'symbol',
      description: `Sacred symbol representing ${nodeData.name}`,
      mysticalProperties: ['resonance', 'power', 'connection'],
      visualRepresentation: 'glowing_sigil',
      interaction: 'meditate'
    });

    return artifacts;
  }

  /**
   * Generate esoteric connections between chambers
   */
  private generateConnections(nodeData: CodexNode): string[] {
    const connections: string[] = [];

    // Connect based on elemental relationships
    if (nodeData.element === 'fire') {
      connections.push('tarot-01-magician', 'tarot-08-strength', 'tarot-10-wheel');
    } else if (nodeData.element === 'water') {
      connections.push('tarot-02-high-priestess', 'tarot-12-hanged-man', 'tarot-18-moon');
    } else if (nodeData.element === 'air') {
      connections.push('tarot-00-fool', 'tarot-06-lovers', 'tarot-17-star');
    } else if (nodeData.element === 'earth') {
      connections.push('tarot-03-empress', 'tarot-09-hermit', 'tarot-15-devil');
    }

    // Connect based on numerical relationships
    const nodeNumber = parseInt(nodeData.id.split('-')[1]) || 0;
    if (nodeNumber > 0) {
      // Connect to complementary numbers (golden ratio relationships)
      const complementary = Math.floor(nodeNumber * 1.618) % 78;
      connections.push(`tarot-${complementary.toString().padStart(2, '0')}`);
    }

    return [...new Set(connections)]; // Remove duplicates
  }

  /**
   * Calculate 3D position for chamber in cathedral space
   */
  private calculateChamberPosition(nodeData: CodexNode): THREE.Vector3 {
    const nodeNumber = parseInt(nodeData.id.split('-')[1]) || 0;

    // Use golden ratio spiral for natural distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.4 radians
    const radius = Math.sqrt(nodeNumber) * 5; // Spiral outward
    const angle = nodeNumber * goldenAngle;

    // Different heights based on element
    const heightMap: Record<string, number> = {
      'fire': 2,
      'air': 8,
      'water': -2,
      'earth': 0,
      'ether': 12
    };

    const baseHeight = heightMap[nodeData.element] || 0;

    return new THREE.Vector3(
      Math.cos(angle) * radius,
      baseHeight + (nodeNumber * 0.1), // Slight vertical stagger
      Math.sin(angle) * radius
    );
  }

  /**
   * Generate corridor between two chambers
   */
  generateCorridor(fromChamber: string, toChamber: string): Corridor {
    const fromPos = this.chambers.get(fromChamber)?.position;
    const toPos = this.chambers.get(toChamber)?.position;

    if (!fromPos || !toPos) {
      throw new Error(`Chamber not found: ${fromChamber} or ${toChamber}`);
    }

    // Generate organic path using L-System
    const path = this.generateOrganicPath(fromPos, toPos);

    const corridor: Corridor = {
      fromChamber,
      toChamber,
      path,
      length: this.calculatePathLength(path),
      mysticalSignificance: this.determineMysticalSignificance(fromChamber, toChamber),
      guardians: this.spawnGuardians(fromChamber, toChamber),
      challenges: this.designChallenges(fromChamber, toChamber)
    };

    this.corridors.set(`${fromChamber}_${toChamber}`, corridor);
    return corridor;
  }

  /**
   * Generate organic path using L-System
   */
  private generateOrganicPath(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3[] {
    const path: THREE.Vector3[] = [];
    const steps = 20;
    const distance = from.distanceTo(to);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      // Organic curve with slight randomness
      const organicT = t + Math.sin(t * Math.PI * 4) * 0.1;

      const x = THREE.MathUtils.lerp(from.x, to.x, organicT) + Math.sin(t * Math.PI * 2) * 2;
      const y = THREE.MathUtils.lerp(from.y, to.y, organicT) + Math.cos(t * Math.PI * 3) * 1;
      const z = THREE.MathUtils.lerp(from.z, to.z, organicT) + Math.sin(t * Math.PI * 2.5) * 2;

      path.push(new THREE.Vector3(x, y, z));
    }

    return path;
  }

  /**
   * Calculate total path length
   */
  private calculatePathLength(path: THREE.Vector3[]): number {
    let length = 0;
    for (let i = 1; i < path.length; i++) {
      length += path[i].distanceTo(path[i - 1]);
    }
    return length;
  }

  /**
   * Determine mystical significance of connection
   */
  private determineMysticalSignificance(fromId: string, toId: string): string {
    const fromNode = this.chambers.get(fromId);
    const toNode = this.chambers.get(toId);

    if (!fromNode || !toNode) return 'Unknown connection';

    // Elemental relationships
    if (fromNode.element === 'fire' && toNode.element === 'water') {
      return 'Alchemical marriage of opposites';
    }

    if (fromNode.element === 'air' && toNode.element === 'earth') {
      return 'Manifestation from thought to form';
    }

    // Numerical relationships
    const fromNum = parseInt(fromId.split('-')[1]) || 0;
    const toNum = parseInt(toId.split('-')[1]) || 0;

    if (Math.abs(fromNum - toNum) === 1) {
      return 'Sequential revelation';
    }

    if (Math.abs(fromNum - toNum) === 9) {
      return 'Hermetic cycle completion';
    }

    return 'Mysterious conjunction';
  }

  /**
   * Spawn archetypal guardians for corridor
   */
  private spawnGuardians(fromChamber: string, toChamber: string): Guardian[] {
    const guardians: Guardian[] = [];

    // Threshold guardian (tests readiness)
    guardians.push({
      name: 'Threshold Guardian',
      archetype: 'Gatekeeper',
      challenge: 'Prove your understanding of the mysteries',
      reward: 'Passage to new knowledge'
    });

    // Shadow aspects
    const fromNode = this.chambers.get(fromChamber);
    if (fromNode && fromNode.element === 'water') {
      guardians.push({
        name: 'Shadow of Doubt',
        archetype: 'Shadow',
        challenge: 'Face your uncertainties',
        reward: 'Emotional clarity'
      });
    }

    return guardians;
  }

  /**
   * Design mystical challenges for corridor
   */
  private designChallenges(fromChamber: string, toChamber: string): Challenge[] {
    const challenges: Challenge[] = [];

    // Frequency challenge
    challenges.push({
      type: 'frequency',
      description: 'Match the resonant frequency of both chambers',
      difficulty: 3
    });

    // Geometric challenge
    challenges.push({
      type: 'geometric',
      description: 'Trace the sacred geometry pattern without error',
      difficulty: 2
    });

    // Meditation challenge
    challenges.push({
      type: 'meditation',
      description: 'Maintain focus for the entire journey',
      difficulty: 4
    });

    return challenges;
  }

  /**
   * Render chamber in 3D space
   */
  renderChamber(chamber: ChamberDefinition): THREE.Group {
    const group = new THREE.Group();

    // Position chamber
    group.position.copy(chamber.position);

    // TODO: Render sacred geometry walls when SacredGeometryRenderer is properly imported
    // const geometryMesh = this.sacredGeometryRenderer.renderPlatonicSolid(
    //   new THREE.Vector3(0, 0, 0),
    //   chamber.geometry.platonicSolid || 'dodecahedron',
    //   8
    // );
    // group.add(geometryMesh);

    // Create basic geometry for now
    const geometry = new THREE.BoxGeometry(8, 6, 8);
    const material = new THREE.MeshStandardMaterial({
      color: chamber.geometry.color,
      transparent: true,
      opacity: 0.8
    });
    const geometryMesh = new THREE.Mesh(geometry, material);
    group.add(geometryMesh);

    // Render floor pattern
    const floorPattern = this.renderFloorPattern(chamber.geometry.pattern, chamber.geometry.color);
    group.add(floorPattern);

    // Add floating artifacts
    chamber.artifacts.forEach((artifact, index) => {
      const artifactMesh = this.createArtifactMesh(artifact);
      const angle = (index / chamber.artifacts.length) * Math.PI * 2;
      const radius = 3;
      artifactMesh.position.set(
        Math.cos(angle) * radius,
        2 + Math.sin(index) * 1,
        Math.sin(angle) * radius
      );
      group.add(artifactMesh);
    });

    // Add mystical lighting
    const light = new THREE.PointLight(chamber.geometry.color, 1, 50);
    light.position.set(0, 5, 0);
    group.add(light);

    this.scene.add(group);
    return group;
  }

  /**
   * Render mystical floor pattern
   */
  private renderFloorPattern(pattern: string, color: string): THREE.Mesh {
    let geometry: THREE.BufferGeometry;

    switch (pattern) {
      case 'flower_of_life':
        // TODO: Use SacredGeometryRenderer when properly imported
        // return this.sacredGeometryRenderer.renderFlowerOfLife(
        //   new THREE.Vector3(0, -4, 0),
        //   6,
        //   2
        // );
        geometry = new THREE.CircleGeometry(4, 32);
      case 'vesica_piscis':
        geometry = new THREE.RingGeometry(2, 3, 32);
        break;
      default:
        geometry = new THREE.CircleGeometry(4, 32);
    }

    const material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4;

    return mesh;
  }

  /**
   * Create 3D mesh for mystical artifact
   */
  private createArtifactMesh(artifact: Artifact): THREE.Mesh {
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    switch (artifact.visualRepresentation) {
      case 'ancient_parchment':
        geometry = new THREE.PlaneGeometry(1, 1.4);
        material = new THREE.MeshStandardMaterial({
          color: '#F4E4BC',
          transparent: true,
          opacity: 0.8
        });
        break;

      case 'mystical_orb':
        geometry = new THREE.SphereGeometry(0.5, 16, 16);
        material = new THREE.MeshStandardMaterial({
          color: '#FFD700',
          emissive: '#FFD700',
          emissiveIntensity: 0.3
        });
        break;

      case 'glowing_sigil':
        geometry = new THREE.RingGeometry(0.3, 0.7, 16);
        material = new THREE.MeshBasicMaterial({
          color: '#00FFFF',
          transparent: true,
          opacity: 0.7
        });
        break;

      default:
        geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        material = new THREE.MeshStandardMaterial({ color: '#888888' });
    }

    const mesh = new THREE.Mesh(geometry, material);

    // Add floating animation
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.position.y += Math.sin(Date.now() * 0.001) * 0.01;
      mesh.rotation.y += 0.01;
    };
    animate();

    return mesh;
  }

  /**
   * Get all chambers
   */
  getChambers(): Map<string, ChamberDefinition> {
    return this.chambers;
  }

  /**
   * Get specific chamber
   */
  getChamber(chamberId: string): ChamberDefinition | undefined {
    return this.chambers.get(chamberId);
  }

  /**
   * Unlock chamber (through discovery or challenge completion)
   */
  unlockChamber(chamberId: string): void {
    const chamber = this.chambers.get(chamberId);
    if (chamber) {
      chamber.state = 'discovered';
      this.emitChamberEvent('chamberUnlocked', chamber);
    }
  }

  /**
   * Generate entire cathedral from all Codex nodes
   */
  async generateCathedral(nodes: CodexNode[]): Promise<void> {
    console.log(`🏛️ Generating Cathedral with ${nodes.length} chambers...`);

    // Generate all chambers
    for (const node of nodes) {
      const chamber = this.generateChamber(node);
      console.log(`Generated chamber: ${chamber.archetype} (${chamber.element})`);
    }

    // Generate corridors between connected chambers
    for (const [chamberId, chamber] of this.chambers) {
      for (const connection of chamber.connections) {
        if (this.chambers.has(connection)) {
          this.generateCorridor(chamberId, connection);
        }
      }
    }

    // Render starting chamber (The Fool)
    const startingChamber = this.chambers.get('tarot-00-fool');
    if (startingChamber) {
      this.renderChamber(startingChamber);
      startingChamber.state = 'discovered';
    }

    console.log(`✨ Cathedral generated with ${this.chambers.size} chambers and ${this.corridors.size} corridors`);
  }

  /**
   * Event system for chamber interactions
   */
  private emitChamberEvent(event: string, chamber: ChamberDefinition): void {
    // Emit custom events for chamber state changes
    console.log(`Chamber Event: ${event} - ${chamber.archetype}`);
  }
}

export default CathedralArchitect;
