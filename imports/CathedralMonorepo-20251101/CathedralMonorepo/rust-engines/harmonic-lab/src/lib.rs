//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! 🜔  HARMONIC LAB  —  Codex 144:99  |  Magnum Opus v1.0
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! Real-time solfeggio + cymatic synthesis with ND-safe amplitude controls.
//! Generates tone-maps from sacred frequencies and fusion derivatives.
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

use kira::{
    manager::{AudioManager, AudioManagerSettings, backend::DefaultBackend},
    sound::static_sound::{StaticSoundData, StaticSoundSettings},
    tween::Tween,
};
use fusion_kink::DerivativeD;

/// Solfeggio sacred frequencies (Hz)
pub const SOLFEGGIO_FREQUENCIES: [f32; 9] = [
    174.0,  // Foundation
    285.0,  // Quantum cognition
    396.0,  // Liberation from fear
    417.0,  // Transmutation
    528.0,  // Transformation/DNA repair
    639.0,  // Connecting/relationships
    741.0,  // Awakening intuition
    852.0,  // Returning to spiritual order
    963.0,  // Divine consciousness
];

/// ND-safe amplitude range (prevents overstimulation)
pub const ND_SAFE_AMPLITUDE: f32 = 0.15;
pub const ND_SAFE_FADE_DURATION: f64 = 0.3;

/// Harmonic synthesizer with ND-safe controls
pub struct HarmonicSynth {
    manager: AudioManager,
}

impl HarmonicSynth {
    /// Create a new harmonic synthesizer
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let manager = AudioManager::<DefaultBackend>::new(AudioManagerSettings::default())?;
        Ok(Self { manager })
    }

    /// Emit a tone from a derivative vector
    /// 
    /// # Arguments
    /// * `d` - Derivative vector from fusion operator
    /// * `base_hz` - Base frequency (default: 220.0)
    /// * `range_hz` - Frequency range modulation (default: 220.0)
    pub fn emit_fusion_tone(&mut self, d: &DerivativeD, base_hz: f32, range_hz: f32) -> Result<(), Box<dyn std::error::Error>> {
        let freq = base_hz + (d.0.z * range_hz);
        let freq = freq.clamp(20.0, 20000.0); // Human hearing range
        
        self.emit_tone(freq, ND_SAFE_AMPLITUDE, ND_SAFE_FADE_DURATION)
    }

    /// Emit a specific solfeggio frequency
    pub fn emit_solfeggio(&mut self, index: usize) -> Result<(), Box<dyn std::error::Error>> {
        if index >= SOLFEGGIO_FREQUENCIES.len() {
            return Err("Invalid solfeggio index".into());
        }
        
        let freq = SOLFEGGIO_FREQUENCIES[index];
        self.emit_tone(freq, ND_SAFE_AMPLITUDE, ND_SAFE_FADE_DURATION)
    }

    /// Emit a pure tone with ND-safe controls
    fn emit_tone(&mut self, frequency: f32, amplitude: f32, fade_duration: f64) -> Result<(), Box<dyn std::error::Error>> {
        let sound_data = StaticSoundData::from_sine_wave(
            frequency as f64,
            fade_duration,
        );
        
        self.manager.play(sound_data.with_settings(
            StaticSoundSettings::new()
                .volume(amplitude as f64)
                .fade_in_tween(Tween {
                    duration: fade_duration,
                    ..Default::default()
                })
        ))?;
        
        Ok(())
    }

    /// Get the audio manager (for advanced control)
    pub fn manager(&mut self) -> &mut AudioManager {
        &mut self.manager
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_solfeggio_frequencies() {
        assert_eq!(SOLFEGGIO_FREQUENCIES.len(), 9);
        assert_eq!(SOLFEGGIO_FREQUENCIES[4], 528.0); // DNA repair frequency
    }

    #[test]
    fn test_nd_safe_amplitude() {
        assert!(ND_SAFE_AMPLITUDE <= 0.2);
        assert!(ND_SAFE_FADE_DURATION >= 0.1);
    }
}
