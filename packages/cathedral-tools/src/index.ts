/**
 * index
 * 
 * @package @cathedral/cathedral-tools
 */
/**
 * Cathedral Tools - Utility functions and helpers
 * 
 * Provides:
 * - Node relationship calculators
 * - Sacred geometry generators
 * - Frequency calculators
 * - Color correspondences
 * - Pattern generators
 * - Integration helpers
 */

import { CodexLibrary } from '@cathedral/codex-144-99';
import { LiberArcanae } from '@cathedral/liber-arcanae';

// Sacred Mathematics
export const SACRED_CONSTANTS = {
  GOLDEN_RATIO: 1.618033988749895,
  FUSION_RATIO: 144 / 99, // 1.454545...
  PI: Math.PI,
  E: Math.E,
  PHI: (1 + Math.sqrt(5)) / 2
};

/**
 * Calculate Fibonacci sequence up to n terms
 */
export function fibonacci(n: number): number[] {
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

/**
 * Calculate golden ratio spiral coordinates
 */
export function goldenSpiral(iterations: number, scale: number = 1): Array<{ x: number; y: number; angle: number }> {
  const points: Array<{ x: number; y: number; angle: number }> = [];
  const phi = SACRED_CONSTANTS.GOLDEN_RATIO;
  
  for (let i = 0; i < iterations; i++) {
    const angle = i * phi * Math.PI * 2;
    const radius = Math.sqrt(i) * scale * phi;
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle
    });
  }
  
  return points;
}

/**
 * Calculate node relationships in Codex 144:99
 */
export function calculateNodeRelationships(nodeId: number): {
  harmonic: number[];
  dissonant: number[];
  tritone: number[];
} {
  const codex = new CodexLibrary();
  const node = codex.getNode(nodeId);
  
  if (!node || !node.harmonics) {
    return { harmonic: [], dissonant: [], tritone: [] };
  }
  
  return {
    harmonic: node.harmonics.perfectConsonance || [],
    dissonant: node.harmonics.dissonance || [],
    tritone: node.harmonics.tritone || []
  };
}

/**
 * Calculate frequency from solfeggio Hz
 */
export function calculateFrequency(baseHz: number, octave: number = 0): number {
  return baseHz * Math.pow(2, octave);
}

/**
 * Get color from node element
 */
export function getElementColor(element: string): string {
  const colorMap: Record<string, string> = {
    'Fire': '#FF4500',
    'Water': '#1E90FF',
    'Air': '#87CEEB',
    'Earth': '#8B4513',
    'Spirit': '#9370DB'
  };
  return colorMap[element] || '#FFFFFF';
}

/**
 * Generate sacred geometry pattern
 */
export function generateSacredGeometry(
  type: 'flower' | 'star' | 'spiral' | 'lattice',
  points: number = 12
): Array<{ x: number; y: number }> {
  const geometry: Array<{ x: number; y: number }> = [];
  const angleStep = (Math.PI * 2) / points;
  
  switch (type) {
    case 'flower':
      for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const radius = Math.cos(angle * 3) * 0.5 + 0.5;
        geometry.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      break;
      
    case 'star':
      for (let i = 0; i < points * 2; i++) {
        const angle = i * angleStep / 2;
        const radius = i % 2 === 0 ? 1 : 0.5;
        geometry.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      break;
      
    case 'spiral':
      for (let i = 0; i < points; i++) {
        const angle = i * SACRED_CONSTANTS.GOLDEN_RATIO * Math.PI;
        const radius = Math.sqrt(i) * 0.1;
        geometry.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      break;
      
    case 'lattice':
      // 144:99 lattice pattern
      for (let i = 0; i < 144; i++) {
        const angle = (i * 99 / 144) * Math.PI * 2;
        const radius = Math.sqrt(i) * 0.05;
        geometry.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius
        });
      }
      break;
  }
  
  return geometry;
}

/**
 * Calculate fusion result (A×B=D)
 */
export function calculateFusion(nodeAId: number, nodeBId: number): {
  result: string;
  ratio: number;
  harmony: number;
  description: string;
} {
  const codex = new CodexLibrary();
  const nodeA = codex.getNode(nodeAId);
  const nodeB = codex.getNode(nodeBId);
  
  if (!nodeA || !nodeB) {
    throw new Error('Invalid node IDs');
  }
  
  // Calculate harmony based on element compatibility
  const elementCompatibility: Record<string, Record<string, number>> = {
    'Fire': { 'Water': 0.3, 'Air': 0.8, 'Earth': 0.5, 'Fire': 1.0 },
    'Water': { 'Fire': 0.3, 'Earth': 0.8, 'Air': 0.5, 'Water': 1.0 },
    'Air': { 'Earth': 0.3, 'Fire': 0.8, 'Water': 0.5, 'Air': 1.0 },
    'Earth': { 'Air': 0.3, 'Water': 0.8, 'Fire': 0.5, 'Earth': 1.0 }
  };
  
  const harmony = elementCompatibility[nodeA.element]?.[nodeB.element] || 0.5;
  
  return {
    result: `${nodeA.name} × ${nodeB.name}`,
    ratio: SACRED_CONSTANTS.FUSION_RATIO,
    harmony,
    description: `Fusion of ${nodeA.element} and ${nodeB.element} elements with ${(harmony * 100).toFixed(0)}% harmony`
  };
}

/**
 * Generate tarot spread positions
 */
export function generateTarotSpread(type: 'single' | 'three' | 'celtic'): Array<{
  position: string;
  meaning: string;
}> {
  const spreads: Record<string, Array<{ position: string; meaning: string }>> = {
    single: [
      { position: 'Present', meaning: 'Current situation or energy' }
    ],
    three: [
      { position: 'Past', meaning: 'What has been' },
      { position: 'Present', meaning: 'What is now' },
      { position: 'Future', meaning: 'What may come' }
    ],
    celtic: [
      { position: '1 - Present', meaning: 'Current situation' },
      { position: '2 - Challenge', meaning: 'Obstacle or block' },
      { position: '3 - Past', meaning: 'Foundation or history' },
      { position: '4 - Future', meaning: 'Potential outcome' },
      { position: '5 - Above', meaning: 'Conscious awareness' },
      { position: '6 - Below', meaning: 'Unconscious influences' },
      { position: '7 - Advice', meaning: 'Recommended action' },
      { position: '8 - External', meaning: 'External influences' },
      { position: '9 - Hopes/Fears', meaning: 'Inner hopes or fears' },
      { position: '10 - Outcome', meaning: 'Final resolution' }
    ]
  };
  
  return spreads[type] || spreads.single;
}

/**
 * Calculate node path through Codex 144:99
 */
export function calculateNodePath(startNode: number, endNode: number, maxSteps: number = 10): number[] {
  const codex = new CodexLibrary();
  const path: number[] = [startNode];
  let current = startNode;
  
  for (let step = 0; step < maxSteps && current !== endNode; step++) {
    const node = codex.getNode(current);
    if (!node || !node.harmonics) break;
    
    // Find next node using harmonic connections
    const harmonics = node.harmonics.perfectConsonance || [];
    if (harmonics.length === 0) break;
    
    // Choose harmonic closest to target
    const nextNode = harmonics.reduce((closest, candidate) => {
      const currentDist = Math.abs(candidate - endNode);
      const closestDist = Math.abs(closest - endNode);
      return currentDist < closestDist ? candidate : closest;
    }, harmonics[0]);
    
    if (nextNode === current) break; // No progress
    path.push(nextNode);
    current = nextNode;
  }
  
  return path;
}

/**
 * Generate synthesis parameters for legendary synths
 */
export function generateSynthParameters(synthType: string, nodeId: number): {
  frequency: number;
  waveform: string;
  envelope: { attack: number; decay: number; sustain: number; release: number };
  filter: { cutoff: number; resonance: number };
} {
  const codex = new CodexLibrary();
  const node = codex.getNode(nodeId);
  
  const baseFreq = node?.solfeggio || 432;
  
  return {
    frequency: baseFreq,
    waveform: synthType.includes('Moog') ? 'sawtooth' : 'sine',
    envelope: {
      attack: 0.1,
      decay: 0.3,
      sustain: 0.7,
      release: 0.5
    },
    filter: {
      cutoff: baseFreq * 2,
      resonance: 0.7
    }
  };
}

export {
  CodexLibrary,
  LiberArcanae
};
