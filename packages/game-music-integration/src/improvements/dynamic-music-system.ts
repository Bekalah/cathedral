/**
 * Dynamic Music System
 * 
 * Created from doubt: "The music needs to respond to the game and player state"
 * Improvement: Create music that dynamically changes based on what's happening
 * 
 * This is how visionary art is created - music that lives and breathes with the experience.
 * 
 * @package @cathedral/game-music-integration
 */

export interface MusicLayer {
  id: string;
  name: string;
  instrument: string;
  frequency: number;
  volume: number;
  pattern: 'ambient' | 'rhythmic' | 'melodic' | 'harmonic';
  triggers: string[]; // What game events trigger this layer
}

export interface DynamicMusicState {
  currentLayers: MusicLayer[];
  intensity: number; // 0-100
  mood: 'calm' | 'focused' | 'energetic' | 'triumphant' | 'contemplative';
  struggleActive: string | null; // Which struggle is active
  boonActive: string | null; // Which boon is active
}

/**
 * Dynamic Music System
 * 
 * Music that responds to game state, struggles, and player progress
 */
export class DynamicMusicSystem {
  private layers: Map<string, MusicLayer> = new Map();
  private currentState: DynamicMusicState = {
    currentLayers: [],
    intensity: 50,
    mood: 'calm',
    struggleActive: null,
    boonActive: null
  };

  constructor() {
    this.initializeLayers();
  }

  /**
   * Initialize music layers
   */
  private initializeLayers(): void {
    const layers: MusicLayer[] = [
      {
        id: 'base-ambient',
        name: 'Base Ambient',
        instrument: 'pad',
        frequency: 528, // Solfeggio
        volume: 0.3,
        pattern: 'ambient',
        triggers: ['always']
      },
      {
        id: 'perfectionism-layer',
        name: 'Perfectionism Tension',
        instrument: 'strings',
        frequency: 396,
        volume: 0.2,
        pattern: 'harmonic',
        triggers: ['perfectionism-demon-active']
      },
      {
        id: 'pain-fog-layer',
        name: 'Pain Fog Atmosphere',
        instrument: 'drone',
        frequency: 417,
        volume: 0.15,
        pattern: 'ambient',
        triggers: ['pain-fog-active']
      },
      {
        id: 'flow-state-layer',
        name: 'Flow State Harmony',
        instrument: 'bell',
        frequency: 528,
        volume: 0.4,
        pattern: 'melodic',
        triggers: ['flow-state-active']
      },
      {
        id: 'breakthrough-layer',
        name: 'Breakthrough Resolution',
        instrument: 'chord',
        frequency: 639,
        volume: 0.5,
        pattern: 'harmonic',
        triggers: ['breakthrough-active']
      },
      {
        id: 'abyss-crossing-layer',
        name: 'Abyss Crossing',
        instrument: 'orchestral',
        frequency: 741,
        volume: 0.6,
        pattern: 'melodic',
        triggers: ['abyss-crossing']
      }
    ];

    layers.forEach(layer => {
      this.layers.set(layer.id, layer);
    });
  }

  /**
   * Update music state based on game events
   */
  updateState(events: {
    struggleActive?: string;
    boonActive?: string;
    intensity?: number;
    mood?: DynamicMusicState['mood'];
    abyssCrossing?: boolean;
  }): void {
    if (events.struggleActive !== undefined) {
      this.currentState.struggleActive = events.struggleActive;
    }
    if (events.boonActive !== undefined) {
      this.currentState.boonActive = events.boonActive;
    }
    if (events.intensity !== undefined) {
      this.currentState.intensity = events.intensity;
    }
    if (events.mood !== undefined) {
      this.currentState.mood = events.mood;
    }

    // Update active layers
    this.updateActiveLayers(events.abyssCrossing || false);
  }

  /**
   * Update active layers based on state
   */
  private updateActiveLayers(abyssCrossing: boolean): void {
    const activeLayers: MusicLayer[] = [];

    // Base layer always active
    const baseLayer = this.layers.get('base-ambient');
    if (baseLayer) {
      activeLayers.push(baseLayer);
    }

    // Struggle layers
    if (this.currentState.struggleActive) {
      const struggleLayer = this.layers.get(`${this.currentState.struggleActive}-layer`);
      if (struggleLayer) {
        activeLayers.push(struggleLayer);
      }
    }

    // Boon layers
    if (this.currentState.boonActive) {
      const boonLayer = this.layers.get(`${this.currentState.boonActive}-layer`);
      if (boonLayer) {
        activeLayers.push(boonLayer);
      }
    }

    // Abyss crossing
    if (abyssCrossing) {
      const abyssLayer = this.layers.get('abyss-crossing-layer');
      if (abyssLayer) {
        activeLayers.push(abyssLayer);
      }
    }

    this.currentState.currentLayers = activeLayers;
  }

  /**
   * Get current music state
   */
  getState(): DynamicMusicState {
    return { ...this.currentState };
  }

  /**
   * Get music layers for current state
   */
  getActiveLayers(): MusicLayer[] {
    return [...this.currentState.currentLayers];
  }

  /**
   * Generate music composition
   */
  generateComposition(): {
    layers: MusicLayer[];
    totalDuration: number;
    frequencies: number[];
  } {
    return {
      layers: this.currentState.currentLayers,
      totalDuration: 300, // 5 minutes
      frequencies: this.currentState.currentLayers.map(l => l.frequency)
    };
  }
}

// Export singleton
export const dynamicMusicSystem = new DynamicMusicSystem();

// Export for easy use
export default dynamicMusicSystem;

