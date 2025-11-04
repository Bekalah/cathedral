import { create } from 'zustand'

const useAppState = create((set) => ({
  mode: 'art',
  view: 'workstation', // workstation, codex, characters, synths
  activePersona: null,
  activeSynth: null,
  activeRibbon: null,
  activeTool: null,
  nodes: [],
  tarotData: [],
  synthStations: [],
  codexRibbons: [],
  
  setMode: (mode) => set({ mode }),
  setView: (view) => set({ view }),
  setActivePersona: (persona) => set({ activePersona: persona }),
  setActiveSynth: (synth) => set({ activeSynth: synth }),
  setActiveRibbon: (ribbon) => set({ activeRibbon: ribbon }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setNodes: (nodes) => set({ nodes }),
  setTarotData: (data) => set({ tarotData: data }),
  
  loadData: async () => {
    try {
      const [tarotRes, circuitumRes] = await Promise.all([
        fetch('/data/TAROT_MASTER_DATASET.json'),
        fetch('/data/circuitum99-nodes.json')
      ])
      
      const tarotData = await tarotRes.json()
      const circuitumData = await circuitumRes.json()
      
      // Extract data from TAROT_MASTER_DATASET
      const majorArcana = tarotData.tarot_master_dataset?.major_arcana || []
      const synthStations = tarotData.tarot_master_dataset?.cathedral_integrations?.synth_stations || []
      
      set({
        nodes: circuitumData,
        tarotData: majorArcana,
        synthStations,
        codexRibbons: [
          { id: 'science', name: 'SCIENCE', color: '#00d9ff', desc: 'Empirical knowledge, Sacred geometry mathematics' },
          { id: 'cannon', name: 'CANNON', color: '#d4af37', desc: 'Established wisdom, Traditional grimoire systems' },
          { id: 'psych', name: 'PSYCH', color: '#9b59b6', desc: 'Mind sciences, Consciousness exploration' },
          { id: 'craft', name: 'CRAFT', color: '#e74c3c', desc: 'Practical arts, Ritual implementation' },
          { id: 'esoteric', name: 'ESOTERIC', color: '#2ecc71', desc: 'Hidden teachings, Mystery traditions' },
          { id: 'research', name: 'RESEARCH', color: '#f39c12', desc: 'Active inquiry, Experimental pathworking' },
          { id: 'fusion', name: 'FUSION', color: '#e91e63', desc: 'Integration, Where all streams converge' }
        ]
      })
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }
}))

export default useAppState
