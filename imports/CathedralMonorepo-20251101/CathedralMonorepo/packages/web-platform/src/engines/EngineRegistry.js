/**
 * ✦ ENGINE REGISTRY - Manifest-based lazy loading for 255 cathedral engines
 * Consolidates all 13 GitHub repositories into loadable modules
 * 
 * Architecture:
 * - Lazy imports (only load engines when needed)
 * - Mode-specific batching (Cosmogenesis mode loads Cosmogenesis engines)
 * - React state integration (engines stored in context, not globals)
 * - Error recovery and fallbacks
 */

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 1: Priority Engines (24 downloaded)
// ═══════════════════════════════════════════════════════════════════════════
export const ENGINE_MANIFEST = {
  cosmogenesis: {
    id: 'cosmogenesis',
    name: 'Cosmogenesis Spiral Engine',
    repo: 'cosmogenesis-learning-engine',
    loader: () => import('./consolidated/Cosmogenesis.js'),
    api: 'class', // exports { Cosmogenesis } class
    description: 'SVG spiral renderer - Monad → Ring → Border sacred geometry'
  },
  
  cymatics: {
    id: 'cymatics',
    name: 'Cymatics Audio-Reactive Engine',
    repo: 'cosmogenesis-learning-engine',
    loader: () => import('./consolidated/Cymatics.js'),
    api: 'function', // exports { applySound } async function
    description: 'Sound ↔ spiral visualization with Web Audio API'
  },
  
  oscilloscope: {
    id: 'oscilloscope',
    name: 'Oscilloscope Fractal Science Engine',
    repo: 'BUILDING-CATHEDRALS',
    loader: () => import('./consolidated/oscilloscope-fractal-engine.js'),
    api: 'class', // exports OscilloscopeFractalEngine class
    description: 'Mathematical fractals with audio-reactive oscilloscope patterns'
  },
  
  indraNet: {
    id: 'indraNet',
    name: 'Indra\'s Net Interconnection Engine',
    repo: 'cosmogenesis-learning-engine',
    loader: () => import('./consolidated/IndraNet.js'),
    api: 'class',
    description: 'Network visualization - jewels reflecting infinite connections'
  },
  
  jacobsLadder: {
    id: 'jacobsLadder',
    name: 'Jacob\'s Ladder Ascension Engine',
    repo: 'cosmogenesis-learning-engine',
    loader: () => import('./consolidated/JacobsLadder.js'),
    api: 'class',
    description: 'Vertical spiral - earth to heaven connection'
  },
  
  ambientEngine: {
    id: 'ambientEngine',
    name: 'Ambient Spatial Audio Engine',
    repo: 'BUILDING-CATHEDRALS',
    loader: () => import('./consolidated/ambient-engine.js'),
    api: 'class',
    description: 'Solfeggio frequencies with IR reverb for cathedral acoustics'
  },
  
  cymaticEngine: {
    id: 'cymaticEngine',
    name: 'Cymatic Visualization Engine',
    repo: 'BUILDING-CATHEDRALS',
    loader: () => import('./consolidated/cymatic-engine.js'),
    api: 'class',
    description: 'Sound-to-pattern cymatics visualization'
  },
  
  arcanaArtSynthesis: {
    id: 'arcanaArtSynthesis',
    name: 'Arcana Art Synthesis Labs',
    repo: 'BUILDING-CATHEDRALS',
    loader: () => import('./consolidated/arcana-art-synthesis-labs.js'),
    api: 'class',
    description: 'Procedural art generation for 22 Major Arcana'
  },
  
  arcanaMusicModes: {
    id: 'arcanaMusicModes',
    name: 'Arcana Music Modes Engine',
    repo: 'BUILDING-CATHEDRALS',
    loader: () => import('./consolidated/arcana-music-modes.js'),
    api: 'class',
    description: 'Musical modes and frequencies for each Arcana character'
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MODE-SPECIFIC ENGINE GROUPS
// ═══════════════════════════════════════════════════════════════════════════
export const MODE_ENGINE_GROUPS = {
  cosmogenesis: ['cosmogenesis'], // indraNet has corrupted syntax from GitHub - fixing separately
  cymatics: ['cymatics', 'cymaticEngine', 'ambientEngine'],
  oscilloscope: ['oscilloscope', 'arcanaArtSynthesis'],
  liberArcanae: ['arcanaArtSynthesis', 'arcanaMusicModes'],
  jacobsLadder: ['jacobsLadder', 'ambientEngine']
}

// ═══════════════════════════════════════════════════════════════════════════
// ENGINE LOADER - Batched async loading with error recovery
// ═══════════════════════════════════════════════════════════════════════════
export class EngineLoader {
  constructor() {
    this.loadedEngines = new Map()
    this.loadingPromises = new Map()
    this.errors = new Map()
  }

  /**
   * Load engines for a specific mode (batched Promise.all)
   * @param {string} mode - Mode name from MODE_ENGINE_GROUPS
   * @returns {Promise<Map>} Map of engineId -> loaded module
   */
  async loadModeEngines(mode) {
    const engineIds = MODE_ENGINE_GROUPS[mode] || []
    const promises = engineIds.map(id => this.loadEngine(id))
    
    try {
      await Promise.all(promises)
      console.log(`✨ Loaded ${engineIds.length} engines for mode: ${mode}`)
      return this.loadedEngines
    } catch (err) {
      console.error(`Failed to load engines for mode ${mode}:`, err)
      throw err
    }
  }

  /**
   * Load a single engine (with deduplication)
   * @param {string} engineId - Engine ID from ENGINE_MANIFEST
   * @returns {Promise<any>} Loaded engine module
   */
  async loadEngine(engineId) {
    // Already loaded
    if (this.loadedEngines.has(engineId)) {
      return this.loadedEngines.get(engineId)
    }

    // Already loading (deduplicate parallel requests)
    if (this.loadingPromises.has(engineId)) {
      return this.loadingPromises.get(engineId)
    }

    const manifest = ENGINE_MANIFEST[engineId]
    if (!manifest) {
      throw new Error(`Unknown engine: ${engineId}`)
    }

    const loadPromise = (async () => {
      try {
        const module = await manifest.loader()
        this.loadedEngines.set(engineId, module)
        this.loadingPromises.delete(engineId)
        console.log(`✓ Loaded engine: ${manifest.name}`)
        return module
      } catch (err) {
        this.errors.set(engineId, err)
        this.loadingPromises.delete(engineId)
        console.error(`✗ Failed to load ${manifest.name}:`, err)
        throw err
      }
    })()

    this.loadingPromises.set(engineId, loadPromise)
    return loadPromise
  }

  /**
   * Get a loaded engine instance
   * @param {string} engineId - Engine ID
   * @returns {any} Loaded engine module or null
   */
  getEngine(engineId) {
    return this.loadedEngines.get(engineId) || null
  }

  /**
   * Check if engine is loaded
   * @param {string} engineId - Engine ID
   * @returns {boolean}
   */
  isLoaded(engineId) {
    return this.loadedEngines.has(engineId)
  }

  /**
   * Get loading status for all engines
   * @returns {Object} Status object
   */
  getStatus() {
    return {
      loaded: Array.from(this.loadedEngines.keys()),
      loading: Array.from(this.loadingPromises.keys()),
      errors: Array.from(this.errors.entries())
    }
  }
}

// Singleton instance
export const engineLoader = new EngineLoader()
