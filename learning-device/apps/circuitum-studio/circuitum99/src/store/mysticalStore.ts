import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export interface MysticalNode {
  id: string
  name: string
  type: 'major' | 'minor' | 'gate'
  sphere: string
  element: string
  color: string
  frequency: number
  position: [number, number, number]
  energy: number
  isActive: boolean
  cardData?: any
  shemConnection?: any
  codexConnections?: string[]
  fusion?: {
    canFuseWith: string[]
    fusionEnergy: number
    researchValue: number
  }
  gaming?: {
    experience: number
    level: number
    achievements: string[]
    unlockedPowers: string[]
  }
  sound?: {
    frequencies: number[]
    binauralBeat: any
    chant: string
  }
  research?: {
    experiments: any[]
    successRate: number
    totalAttempts: number
    insights: string[]
  }
}

interface MysticalState {
  nodes: MysticalNode[]
  selectedNode: MysticalNode | null
  energyLevel: number
  currentRealm: string
  isConnected: boolean
  fusionMode: boolean
  researchMode: boolean
  soundEnabled: boolean
  gamingMode: boolean

  // Actions
  selectNode: (node: MysticalNode) => void
  updateNodeEnergy: (nodeId: string, energy: number) => void
  activateNode: (nodeId: string) => void
  attemptFusion: (nodeA: MysticalNode, nodeB: MysticalNode) => boolean
  setEnergyLevel: (level: number) => void
  setCurrentRealm: (realm: string) => void
  toggleFusionMode: () => void
  toggleResearchMode: () => void
  toggleSound: () => void
  toggleGamingMode: () => void
  initializeNodes: () => Promise<void>
  loadCompleteDataset: () => Promise<void>
}

export const useMysticalStore = create<MysticalState>()(
  subscribeWithSelector((set, get) => ({
    nodes: [],
    selectedNode: null,
    energyLevel: 0,
    currentRealm: 'MA:00-TheFool',
    isConnected: false,
    fusionMode: false,
    researchMode: false,
    soundEnabled: true,
    gamingMode: false,

    selectNode: (node) => {
      set({ selectedNode: node })
      // Auto-activate when selected
      get().activateNode(node.id)
    },

    updateNodeEnergy: (nodeId, energy) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId ? { ...node, energy } : node
        ),
      }))
    },

    activateNode: (nodeId) => {
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId
            ? { ...node, isActive: true, energy: Math.min(node.energy + 0.1, 1.0) }
            : { ...node, isActive: false }
        ),
      }))

      // Update global energy level
      const activeNodes = get().nodes.filter(n => n.isActive).length
      const totalEnergy = Math.min(activeNodes * 0.05, 1.0) // Reduced multiplier for 78 nodes
      get().setEnergyLevel(totalEnergy)
    },

    attemptFusion: (nodeA, nodeB) => {
      const state = get();
      if (!state.fusionMode) return false;

      // Check if nodes can fuse
      const canFuse = nodeA.fusion?.canFuseWith.includes(nodeB.id) ||
                     nodeB.fusion?.canFuseWith.includes(nodeA.id);

      if (!canFuse) return false;

      // Calculate fusion success based on energy and compatibility
      const energyAvg = (nodeA.energy + nodeB.energy) / 2;
      const compatibility = canFuse ? 0.8 : 0.3;
      const success = Math.random() < (energyAvg * compatibility);

      if (success) {
        // Successful fusion - create new energy pattern
        const fusionEnergy = Math.min(nodeA.fusion.fusionEnergy + nodeB.fusion.fusionEnergy, 1.0);

        // Update research data
        set((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === nodeA.id || node.id === nodeB.id) {
              return {
                ...node,
                research: {
                  ...node.research,
                  totalAttempts: node.research.totalAttempts + 1,
                  successRate: ((node.research.successRate * (node.research.totalAttempts - 1)) + 1) / node.research.totalAttempts,
                  experiments: [...node.research.experiments, {
                    type: 'fusion',
                    partner: node.id === nodeA.id ? nodeB.id : nodeA.id,
                    success: true,
                    timestamp: new Date().toISOString(),
                    energyChange: fusionEnergy - node.energy
                  }]
                }
              };
            }
            return node;
          })
        }));

        console.log(`🔮 Fusion successful: ${nodeA.name} + ${nodeB.name} = ${fusionEnergy.toFixed(2)} energy`);
      } else {
        // Failed fusion - record attempt
        set((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === nodeA.id || node.id === nodeB.id) {
              return {
                ...node,
                research: {
                  ...node.research,
                  totalAttempts: node.research.totalAttempts + 1,
                  experiments: [...node.research.experiments, {
                    type: 'fusion',
                    partner: node.id === nodeA.id ? nodeB.id : nodeA.id,
                    success: false,
                    timestamp: new Date().toISOString(),
                    energyChange: 0
                  }]
                }
              };
            }
            return node;
          })
        }));

        console.log(`❌ Fusion failed: ${nodeA.name} + ${nodeB.name}`);
      }

      return success;
    },

    setEnergyLevel: (level) => {
      set({ energyLevel: level })
    },

    setCurrentRealm: (realm) => {
      set({ currentRealm: realm })
    },

    toggleFusionMode: () => {
      set((state) => ({ fusionMode: !state.fusionMode }))
    },

    toggleResearchMode: () => {
      set((state) => ({ researchMode: !state.researchMode }))
    },

    toggleSound: () => {
      set((state) => ({ soundEnabled: !state.soundEnabled }))
    },

    toggleGamingMode: () => {
      set((state) => ({ gamingMode: !state.gamingMode }))
    },

    loadCompleteDataset: async () => {
      try {
        // In a real app, this would load from the generated JSON file
        // For now, we'll generate a subset of nodes for demonstration
        const demoNodes: MysticalNode[] = [
          {
            id: 'MA:00-TheFool',
            name: 'The Fool',
            type: 'major',
            sphere: 'Keter',
            element: 'Air',
            color: '#F0F8FF',
            frequency: 256,
            position: [0, 0, 0],
            energy: 0.9,
            isActive: true,
            cardData: {
              number: 0,
              name: 'The Fool',
              element: 'Air',
              keywords: ['new beginnings', 'innocence', 'spontaneity'],
              powers: ['Infinite Potential', 'Quantum Leap Activation', 'Reality Reset']
            }
          },
          {
            id: 'MA:01-TheMagician',
            name: 'The Magician',
            type: 'major',
            sphere: 'Chokmah',
            element: 'Fire',
            color: '#FFD700',
            frequency: 288,
            position: [2, 3, 0],
            energy: 0.8,
            isActive: false,
            cardData: {
              number: 1,
              name: 'The Magician',
              element: 'Fire',
              keywords: ['manifestation', 'power', 'skill'],
              powers: ['Reality Manifestation', 'Elemental Command', 'Will Projection']
            }
          },
          {
            id: 'MA:02-TheHighPriestess',
            name: 'The High Priestess',
            type: 'major',
            sphere: 'Binah',
            element: 'Water',
            color: '#E6E6FA',
            frequency: 210,
            position: [2, 1, 0],
            energy: 0.7,
            isActive: false,
            cardData: {
              number: 2,
              name: 'The High Priestess',
              element: 'Water',
              keywords: ['intuition', 'mystery', 'subconscious'],
              powers: ['Lunar Attunement', 'Psychic Perception', 'Veil Piercing']
            }
          }
        ];

        set({
          nodes: demoNodes,
          selectedNode: demoNodes[0],
          isConnected: true,
        });

        console.log(`✅ Loaded ${demoNodes.length} mystical nodes`);
      } catch (error) {
        console.error('❌ Failed to load dataset:', error);
      }
    },

    initializeNodes: async () => {
      await get().loadCompleteDataset();
    },
  }))
)

// Initialize nodes on store creation
useMysticalStore.getState().initializeNodes()
