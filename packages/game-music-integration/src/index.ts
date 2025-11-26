/**
 * index
 * 
 * @package @cathedral/game-music-integration
 */
/**
 * Game Music Integration
 * 
 * Bring music into game - sync sound with gameplay:
 * - Music responds to game events
 * - Game positions generate music
 * - Sound affects game physics
 * - Real-time synchronization
 * 
 * Never flat - always flowing, trauma-informed design.
 */

import { LegendarySynth } from '@cathedral/synth';
import { violetFlame } from '@cathedral/violet-flame-transmutation';

export interface GameEvent {
  type: 'movement' | 'collision' | 'interaction' | 'state-change';
  data: any;
  timestamp: number;
}

export interface MusicEvent {
  type: 'note' | 'chord' | 'rhythm' | 'texture';
  frequency: number;
  duration: number;
  timestamp: number;
}

export interface GameMusicSync {
  gameEvent: GameEvent;
  musicEvent: MusicEvent;
  delay: number; // Milliseconds between game and music
}

/**
 * Game Music Integration Engine
 * 
 * Synchronizes game events with music generation
 */
export class GameMusicIntegration {
  private synth: LegendarySynth;
  private audioContext: AudioContext | null = null;
  private gameEvents: GameEvent[] = [];
  private musicEvents: MusicEvent[] = [];
  private syncMap: Map<string, GameMusicSync> = new Map();

  constructor() {
    this.synth = new LegendarySynth();
    this.initializeAudio();
  }

  /**
   * Initialize Web Audio API
   */
  private initializeAudio(): void {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new AudioContext();
    }
  }

  /**
   * Sync game movement to music
   */
  syncMovementToMusic(
    position: { x: number; y: number; z: number },
    velocity: { x: number; y: number; z: number }
  ): MusicEvent {
    // Calculate frequency from position
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
    const baseFreq = 256; // C4
    const frequency = baseFreq + (distance * 5);

    // Calculate duration from velocity
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2);
    const duration = Math.max(0.1, Math.min(2.0, speed * 0.1));

    const musicEvent: MusicEvent = {
      type: 'note',
      frequency,
      duration,
      timestamp: Date.now()
    };

    this.musicEvents.push(musicEvent);
    this.playNote(frequency, duration);

    return musicEvent;
  }

  /**
   * Sync game collision to music
   */
  syncCollisionToMusic(
    collision: {
      position: { x: number; y: number; z: number };
      force: number;
      objects: string[];
    }
  ): MusicEvent {
    // Higher force = higher frequency
    const baseFreq = 440; // A4
    const frequency = baseFreq + (collision.force * 100);

    // Force affects duration
    const duration = Math.max(0.05, Math.min(0.5, collision.force * 0.01));

    const musicEvent: MusicEvent = {
      type: 'note',
      frequency,
      duration,
      timestamp: Date.now()
    };

    this.musicEvents.push(musicEvent);
    this.playNote(frequency, duration);

    return musicEvent;
  }

  /**
   * Sync game state change to music
   */
  syncStateChangeToMusic(
    stateChange: {
      from: string;
      to: string;
      intensity: number;
    }
  ): MusicEvent {
    // State changes create chord progressions
    const frequencies: number[] = [];
    const baseFreq = 256;

    // Generate chord based on state
    if (stateChange.to === 'victory') {
      frequencies.push(baseFreq); // C
      frequencies.push(baseFreq * 1.25); // E
      frequencies.push(baseFreq * 1.5); // G
    } else if (stateChange.to === 'danger') {
      frequencies.push(baseFreq * 0.9); // Bb
      frequencies.push(baseFreq * 1.2); // D
      frequencies.push(baseFreq * 1.35); // F
    } else {
      frequencies.push(baseFreq);
    }

    const musicEvent: MusicEvent = {
      type: 'chord',
      frequency: frequencies[0], // Primary frequency
      duration: stateChange.intensity * 2,
      timestamp: Date.now()
    };

    this.musicEvents.push(musicEvent);
    frequencies.forEach(freq => this.playNote(freq, musicEvent.duration));

    return musicEvent;
  }

  /**
   * Play a note using Web Audio API
   */
  private playNote(frequency: number, duration: number): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * Generate music from game data
   */
  generateMusicFromGame(gameData: {
    positions: Array<{ x: number; y: number; z: number }>;
    movements: any[];
    events: GameEvent[];
  }): SoundData {
    // Use violet flame to transmute game to music
    const transmutation = violetFlame.transmute('game', 'music', gameData);
    return transmutation.result;
  }

  /**
   * Get sync map (game events → music events)
   */
  getSyncMap(): GameMusicSync[] {
    return Array.from(this.syncMap.values());
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.gameEvents = [];
    this.musicEvents = [];
    this.syncMap.clear();
  }
}

// Singleton instance
export const gameMusic = new GameMusicIntegration();
