/**
 * 🎵 CATHEDRAL MYSTICAL SOUND ENGINE
 * Real-time audio synthesis for mystical research and meditation
 */

export interface SoundConfiguration {
  baseFrequency: number
  element: 'fire' | 'water' | 'air' | 'earth'
  energy: number
  cardType: 'major' | 'minor'
  shemAngel?: any
}

export interface BinauralBeatConfig {
  carrier: number
  offset: number
  beat: number
  intensity: number
}

export class MysticalSoundEngine {
  private audioContext: AudioContext | null = null
  private oscillators: Map<string, OscillatorNode> = new Map()
  private gainNodes: Map<string, GainNode> = new Map()
  private isInitialized = false
  private masterVolume = 0.3

  constructor() {
    this.initializeAudioContext()
  }

  /**
   * Initialize Web Audio API context
   */
  private async initializeAudioContext() {
    try {
      // @ts-ignore - AudioContext may not be available in all environments
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      this.isInitialized = true
      console.log('🎵 Mystical Sound Engine initialized')
    } catch (error) {
      console.error('❌ Failed to initialize audio context:', error)
    }
  }

  /**
   * Generate sound for a mystical node
   */
  async playMysticalSound(config: SoundConfiguration): Promise<string> {
    if (!this.isInitialized || !this.audioContext) {
      console.warn('⚠️ Sound engine not initialized')
      return ''
    }

    const soundId = `sound-${Date.now()}-${Math.random()}`

    try {
      // Create oscillator for base frequency
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      // Configure sound based on element and energy
      const frequency = this.calculateElementalFrequency(config)
      const volume = this.calculateVolume(config)

      oscillator.type = this.getWaveformForElement(config.element)
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

      // Apply elemental modulation
      this.applyElementalModulation(oscillator, config)

      // Set up volume envelope
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2.0)

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      // Start and schedule stop
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 2.0)

      // Store references for cleanup
      this.oscillators.set(soundId, oscillator)
      this.gainNodes.set(soundId, gainNode)

      // Clean up after sound ends
      setTimeout(() => {
        this.cleanupSound(soundId)
      }, 2100)

      console.log(`🎵 Playing ${config.element} sound: ${frequency.toFixed(1)}Hz`)
      return soundId

    } catch (error) {
      console.error('❌ Failed to play mystical sound:', error)
      return ''
    }
  }

  /**
   * Generate binaural beats for meditation
   */
  async playBinauralBeats(config: BinauralBeatConfig): Promise<string> {
    if (!this.isInitialized || !this.audioContext) {
      return ''
    }

    const beatId = `binaural-${Date.now()}`

    try {
      // Create left and right channel oscillators
      const leftOsc = this.audioContext.createOscillator()
      const rightOsc = this.audioContext.createOscillator()
      const leftGain = this.audioContext.createGain()
      const rightGain = this.audioContext.createGain()
      const merger = this.audioContext.createChannelMerger(2)

      // Configure binaural beat frequencies
      leftOsc.frequency.setValueAtTime(config.carrier + (config.beat / 2), this.audioContext.currentTime)
      rightOsc.frequency.setValueAtTime(config.carrier - (config.beat / 2), this.audioContext.currentTime)

      leftOsc.type = rightOsc.type = 'sine'

      // Set up stereo panning
      leftGain.gain.setValueAtTime(config.intensity, this.audioContext.currentTime)
      rightGain.gain.setValueAtTime(config.intensity, this.audioContext.currentTime)

      // Connect left channel
      leftOsc.connect(leftGain)
      leftGain.connect(merger, 0, 0)

      // Connect right channel
      rightOsc.connect(rightGain)
      rightGain.connect(merger, 0, 1)

      // Connect to output
      merger.connect(this.audioContext.destination)

      // Start oscillators
      leftOsc.start()
      rightOsc.start()

      this.oscillators.set(beatId + '-left', leftOsc)
      this.oscillators.set(beatId + '-right', rightOsc)
      this.gainNodes.set(beatId + '-left', leftGain)
      this.gainNodes.set(beatId + '-right', rightGain)

      console.log(`🧠 Playing binaural beats: ${config.beat.toFixed(2)}Hz beat frequency`)
      return beatId

    } catch (error) {
      console.error('❌ Failed to play binaural beats:', error)
      return ''
    }
  }

  /**
   * Generate mystical chant audio
   */
  async playMysticalChant(chant: string, frequency: number = 432): Promise<string> {
    if (!this.isInitialized || !this.audioContext) {
      return ''
    }

    const chantId = `chant-${Date.now()}`

    try {
      // Create oscillator for chant frequency
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.type = 'triangle' // Good for chant-like sounds
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

      // Create subtle vibrato effect
      const vibrato = this.audioContext.createOscillator()
      const vibratoGain = this.audioContext.createGain()

      vibrato.frequency.setValueAtTime(5, this.audioContext.currentTime) // 5Hz vibrato
      vibratoGain.gain.setValueAtTime(2, this.audioContext.currentTime) // 2Hz deviation

      vibrato.connect(vibratoGain)
      vibratoGain.connect(oscillator.frequency)

      // Set up volume envelope for chant
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.2)
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime + 1.5)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3.0)

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      // Start all oscillators
      oscillator.start()
      vibrato.start()
      oscillator.stop(this.audioContext.currentTime + 3.0)
      vibrato.stop(this.audioContext.currentTime + 3.0)

      this.oscillators.set(chantId, oscillator)
      this.oscillators.set(chantId + '-vibrato', vibrato)
      this.gainNodes.set(chantId, gainNode)
      this.gainNodes.set(chantId + '-vibrato', vibratoGain)

      console.log(`🎵 Playing mystical chant: "${chant}" at ${frequency}Hz`)
      return chantId

    } catch (error) {
      console.error('❌ Failed to play mystical chant:', error)
      return ''
    }
  }

  /**
   * Stop all currently playing sounds
   */
  stopAllSounds() {
    this.oscillators.clear()
    this.gainNodes.clear()
    console.log('🔇 Stopped all mystical sounds')
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    console.log(`🔊 Master volume set to ${(this.masterVolume * 100).toFixed(0)}%`)
  }

  /**
   * Calculate frequency based on element
   */
  private calculateElementalFrequency(config: SoundConfiguration): number {
    const baseFreq = config.baseFrequency
    const elementMultipliers = {
      fire: 1.0,    // Base frequency
      water: 1.22,  // Perfect fifth
      air: 1.5,     // Perfect octave
      earth: 1.78   // Major third + octave
    }

    const multiplier = elementMultipliers[config.element] || 1.0
    const energyModulation = 1 + (config.energy * 0.1) // Energy affects pitch

    return baseFreq * multiplier * energyModulation
  }

  /**
   * Calculate volume based on energy and card type
   */
  private calculateVolume(config: SoundConfiguration): number {
    const baseVolume = config.energy * this.masterVolume
    const typeMultiplier = config.cardType === 'major' ? 1.2 : 0.8
    return Math.max(0, Math.min(baseVolume * typeMultiplier, 0.5))
  }

  /**
   * Get appropriate waveform for element
   */
  private getWaveformForElement(element: string): OscillatorType {
    const waveforms = {
      fire: 'sawtooth',   // Sharp, cutting sound
      water: 'sine',      // Smooth, flowing sound
      air: 'triangle',    // Clear, pure sound
      earth: 'square'     // Strong, grounded sound
    }

    return (waveforms[element as keyof typeof waveforms] || 'sine') as OscillatorType
  }

  /**
   * Apply elemental modulation effects
   */
  private applyElementalModulation(oscillator: OscillatorNode, config: SoundConfiguration) {
    const modulation = this.audioContext!.createOscillator()
    const modGain = this.audioContext!.createGain()

    // Different modulation frequencies for each element
    const modFreqs = {
      fire: 8,    // Fast, aggressive modulation
      water: 3,   // Slow, gentle modulation
      air: 5,     // Moderate, clear modulation
      earth: 2    // Very slow, grounding modulation
    }

    modulation.frequency.setValueAtTime(modFreqs[config.element], this.audioContext!.currentTime)
    modGain.gain.setValueAtTime(config.energy * 10, this.audioContext!.currentTime)

    modulation.connect(modGain)
    modGain.connect(oscillator.frequency)

    modulation.start()
    modulation.stop(this.audioContext!.currentTime + 2.0)
  }

  /**
   * Clean up sound resources
   */
  private cleanupSound(soundId: string) {
    const oscillator = this.oscillators.get(soundId)
    const gainNode = this.gainNodes.get(soundId)

    if (oscillator) {
      try {
        oscillator.stop()
      } catch (e) {
        // Oscillator may already be stopped
      }
      this.oscillators.delete(soundId)
    }

    if (gainNode) {
      this.gainNodes.delete(soundId)
    }
  }

  /**
   * Generate sound configuration for a mystical node
   */
  static generateSoundConfig(node: any): SoundConfiguration {
    return {
      baseFrequency: node.frequency || 432,
      element: node.element?.toLowerCase() || 'air',
      energy: node.energy || 0.5,
      cardType: node.type || 'major',
      shemAngel: node.shemConnection
    }
  }

  /**
   * Generate binaural beat configuration for meditation
   */
  static generateBinauralConfig(card: any): BinauralBeatConfig {
    const baseFreq = card.frequency_hz || 432
    const schumannFreq = 7.83 // Earth's natural frequency

    return {
      carrier: baseFreq,
      offset: schumannFreq,
      beat: baseFreq - schumannFreq,
      intensity: 0.3
    }
  }
}

// Export singleton instance
export const soundEngine = new MysticalSoundEngine()
