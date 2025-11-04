//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! 🜏  FUSION KINK CORE  —  Codex 144:99  |  Magnum Opus v1.0
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! Pure mathematical operator for alchemical fusion: A × B = D
//! 
//! Where:
//! - A = Active principle (Fire, Logos, outward vector)
//! - B = Receptive principle (Water, Sophia, inward spiral)
//! - × = Kink (sacred friction, tensional field)
//! - D = Derivative (Divine Child, embodied synthesis)
//!
//! This multiplication is not arithmetic but *creative fusion* —
//! a non-linear harmonic resonance modeled through quaternionic rotation
//! and symbolic field entanglement.
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

use glam::Vec3;
use std::f32::consts::PI;

/// A: the active, initiating vector (energy / intent / Fire)
#[derive(Clone, Copy, Debug)]
pub struct PrincipleA(pub Vec3);

/// B: the receptive, form-holding vector (pattern / imagination / Water)
#[derive(Clone, Copy, Debug)]
pub struct PrincipleB(pub Vec3);

/// D: the embodied synthesis (manifest result / Divine Child)
#[derive(Clone, Copy, Debug)]
pub struct DerivativeD(pub Vec3);

/// The Fusion Kink operator.
/// Blends A and B through harmonic rotation, returning D.
/// 
/// # Arguments
/// * `a` - Active principle vector
/// * `b` - Receptive principle vector  
/// * `phase` - The kink's erotic tension field (0–2π)
///
/// # Returns
/// The derivative vector D representing the fused manifestation
pub fn fusion_kink(a: PrincipleA, b: PrincipleB, phase: f32) -> DerivativeD {
    let na = a.0.normalize_or_zero();
    let nb = b.0.normalize_or_zero();
    
    // Compute orthogonal tension (the kink)
    let cross = na.cross(nb);
    
    // The "phase" acts as the kink's erotic tension field
    let scalar = phase.sin();
    
    // Fusion: linear + rotational blend
    let fused = na + nb + (cross * scalar);
    
    DerivativeD(fused.normalize_or_zero())
}

/// Extract hue from derivative (for color synthesis)
pub fn derivative_to_hue(d: &DerivativeD) -> f32 {
    (d.0.x * 0.5 + 0.5).clamp(0.0, 1.0)
}

/// Extract frequency from derivative (for audio synthesis)
pub fn derivative_to_frequency(d: &DerivativeD, base_hz: f32, range_hz: f32) -> f32 {
    base_hz + (d.0.z * range_hz)
}

/// Extract rotation angles from derivative (for geometry)
pub fn derivative_to_rotation(d: &DerivativeD) -> (f32, f32, f32) {
    (d.0.x * 0.02, d.0.y * 0.02, d.0.z * 0.01)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_fusion_produces_normalized_output() {
        let a = PrincipleA(Vec3::new(1.0, 0.0, 0.0));
        let b = PrincipleB(Vec3::new(0.0, 1.0, 0.0));
        let d = fusion_kink(a, b, PI / 4.0);
        
        let magnitude = d.0.length();
        assert!((magnitude - 1.0).abs() < 0.001, "D should be normalized");
    }

    #[test]
    fn test_fusion_at_zero_phase() {
        let a = PrincipleA(Vec3::new(1.0, 0.0, 0.0));
        let b = PrincipleB(Vec3::new(0.0, 1.0, 0.0));
        let d = fusion_kink(a, b, 0.0);
        
        // At phase=0, cross product contribution is zero
        assert!(d.0.length() > 0.0);
    }
}
