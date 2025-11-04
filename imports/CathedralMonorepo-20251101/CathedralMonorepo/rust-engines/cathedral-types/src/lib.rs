//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! 🜏  CATHEDRAL TYPES  —  Codex 144:99  |  Magnum Opus v1.0
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! Shared data structures for the Cathedral engine system.
//! All canonical types, datasets, and sacred constants live here.
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

use serde::{Deserialize, Serialize};
use glam::Vec3;

/// Sacred ratio: 144 / 99 = 1.454545...
/// The Fusion Kink constant uniting celestial and human circuits
pub const FUSION_RATIO: f32 = 1.454545;

/// The 22 Major Arcana + extended paths
pub const ARCANA_COUNT: usize = 22;

/// The 72 Shem angels/demons
pub const SHEM_COUNT: usize = 72;

/// Circuitum nodes in the human circuit
pub const CIRCUITUM_NODES: usize = 99;

/// Cathedral nodes in the celestial circuit  
pub const CATHEDRAL_NODES: usize = 144;

/// Major Arcana card data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TarotCard {
    pub number: u8,
    pub name: String,
    pub hebrew_letter: String,
    pub path: String,
    pub description: String,
    pub merkaba: String,
    pub faculty_role: String,
    pub department: String,
    pub powers: Vec<String>,
    pub frequency_hz: f32,
    pub primary_color: String,
    pub secondary_color: String,
}

/// Circuitum node (part of the 99)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CircuitumNode {
    pub id: String,
    pub gate_id: String,
    pub name: String,
    pub description: String,
    pub node_type: String,
    pub ribbon: String,
}

/// Shem angel/demon pair
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ShemPair {
    pub number: u8,
    pub angel: String,
    pub demon: String,
    pub hebrew: String,
    pub meaning: String,
}

/// OpenSpec Master Palette
#[derive(Debug, Clone, Copy)]
pub struct OpenSpecPalette {
    pub obsidian: [f32; 3],        // #0d0b12
    pub alchemical_gold: [f32; 3], // #f4d03f
    pub rose_quartz: [f32; 3],     // #ff9fbe
    pub teal_phosphor: [f32; 3],   // #6de0e0
    pub fusion_vesica: [f32; 3],   // #8a7fff
}

impl Default for OpenSpecPalette {
    fn default() -> Self {
        Self {
            obsidian: [0.051, 0.043, 0.071],
            alchemical_gold: [0.957, 0.816, 0.247],
            rose_quartz: [1.0, 0.624, 0.745],
            teal_phosphor: [0.427, 0.878, 0.878],
            fusion_vesica: [0.541, 0.498, 1.0],
        }
    }
}

/// Alchemy stage progression
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum AlchemyStage {
    Nigredo,   // Earth - foundation
    Albedo,    // Water - reflection
    Citrinitas, // Air - messengers
    Rubedo,    // Fire - transmutation
    Azoth,     // Æther - total synthesis
}

/// Creative Lab identifier
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CreativeLab {
    StoneGrimoire,
    SanctuaryBaths,
    OakGrove,
    LabyrinthCourts,
    VioletFlameHearths,
}

/// Cathedral mode (Game/Design/Music)
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum CathedralMode {
    Game,
    Design,
    Music,
}
