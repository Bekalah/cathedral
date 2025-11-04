use gdnative::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TarotCard {
    pub number: u8,
    pub name: String,
    pub element: String,
    pub planet: String,
    pub hebrew_letter: String,
    pub keywords: Vec<String>,
    pub powers: Vec<String>,
    pub merkaba_chariot: String,
    pub faculty_role: String,
    pub department: String,
    pub specialties: Vec<String>,
    pub frequency_hz: u32,
    pub color: String,
    pub archetype: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CodexNode {
    pub id: String,
    pub gate: Option<String>,
    pub tree_path: Option<String>,
    pub tarot_overlays: Vec<String>,
    pub character_guides: Vec<String>,
    pub shem: Option<ShemPair>,
    pub numerology: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ShemPair {
    pub angel: String,
    pub demon: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CircuitumNode {
    pub id: String,
    pub name: String,
    #[serde(rename = "type")]
    pub node_type: String,
    pub numerology: u32,
    pub lore: String,
    pub art: String,
    pub lab: String,
    pub links: Vec<String>,
}

pub struct CathedralCore {
    pub tarot_cards: Vec<TarotCard>,
    pub codex_nodes: Vec<CodexNode>,
    pub circuitum_nodes: Vec<CircuitumNode>,
    pub fusion_ratio: f64,
}

impl CathedralCore {
    pub fn new() -> Self {
        Self {
            tarot_cards: Vec::new(),
            codex_nodes: Vec::new(),
            circuitum_nodes: Vec::new(),
            fusion_ratio: 144.0 / 99.0,
        }
    }

    pub fn load_tarot_data(&mut self, json_data: &str) -> Result<(), String> {
        #[derive(Deserialize)]
        struct TarotDataset {
            tarot_master_dataset: TarotMasterDataset,
        }
        
        #[derive(Deserialize)]
        struct TarotMasterDataset {
            major_arcana: Vec<TarotCard>,
        }

        let dataset: TarotDataset = serde_json::from_str(json_data)
            .map_err(|e| format!("Failed to parse tarot data: {}", e))?;
        
        self.tarot_cards = dataset.tarot_master_dataset.major_arcana;
        Ok(())
    }

    pub fn load_circuitum_data(&mut self, json_data: &str) -> Result<(), String> {
        let nodes: Vec<CircuitumNode> = serde_json::from_str(json_data)
            .map_err(|e| format!("Failed to parse circuitum data: {}", e))?;
        
        self.circuitum_nodes = nodes;
        Ok(())
    }

    pub fn get_card_by_number(&self, number: u8) -> Option<&TarotCard> {
        self.tarot_cards.iter().find(|card| card.number == number)
    }

    pub fn get_card_by_name(&self, name: &str) -> Option<&TarotCard> {
        self.tarot_cards.iter().find(|card| card.name == name)
    }

    pub fn get_node_by_id(&self, id: &str) -> Option<&CircuitumNode> {
        self.circuitum_nodes.iter().find(|node| node.id == id)
    }

    pub fn get_all_major_arcana(&self) -> &Vec<TarotCard> {
        &self.tarot_cards
    }

    pub fn calculate_fusion(&self, manifestation: f64, dissolution: f64) -> f64 {
        manifestation / dissolution
    }

    pub fn calculate_144_99_harmonic(&self, base_freq: f64) -> f64 {
        base_freq * self.fusion_ratio
    }
}

#[derive(NativeClass)]
#[inherit(Node)]
pub struct CathedralBridge {
    core: CathedralCore,
}

#[methods]
impl CathedralBridge {
    fn new(_owner: &Node) -> Self {
        CathedralBridge {
            core: CathedralCore::new(),
        }
    }

    #[export]
    fn _ready(&self, _owner: &Node) {
        godot_print!("Cathedral Core Bridge initialized - Fusion Ratio: {}", self.core.fusion_ratio);
    }

    #[export]
    fn load_tarot_json(&mut self, _owner: &Node, json_path: GodotString) -> bool {
        let file = gdnative::api::File::new();
        let err = file.open(json_path.clone(), gdnative::api::file::ModeFlags::READ);
        
        if err != gdnative::core_types::error::GodotError::Ok {
            godot_error!("Failed to open tarot file: {}", json_path);
            return false;
        }
        
        let content = file.get_as_text().to_string();
        file.close();
        
        match self.core.load_tarot_data(&content) {
            Ok(_) => {
                godot_print!("✓ Loaded {} Major Arcana cards from {}", self.core.tarot_cards.len(), json_path);
                true
            },
            Err(e) => {
                godot_error!("Failed to parse tarot data: {}", e);
                false
            }
        }
    }

    #[export]
    fn load_circuitum_json(&mut self, _owner: &Node, json_path: GodotString) -> bool {
        let file = gdnative::api::File::new();
        let err = file.open(json_path.clone(), gdnative::api::file::ModeFlags::READ);
        
        if err != gdnative::core_types::error::GodotError::Ok {
            godot_error!("Failed to open circuitum file: {}", json_path);
            return false;
        }
        
        let content = file.get_as_text().to_string();
        file.close();
        
        match self.core.load_circuitum_data(&content) {
            Ok(_) => {
                godot_print!("✓ Loaded {} Circuitum nodes from {}", self.core.circuitum_nodes.len(), json_path);
                true
            },
            Err(e) => {
                godot_error!("Failed to parse circuitum data: {}", e);
                false
            }
        }
    }

    #[export]
    fn get_card_count(&self, _owner: &Node) -> i32 {
        self.core.tarot_cards.len() as i32
    }

    #[export]
    fn get_card_name(&self, _owner: &Node, index: i32) -> GodotString {
        if let Some(card) = self.core.tarot_cards.get(index as usize) {
            GodotString::from(&card.name)
        } else {
            GodotString::from("")
        }
    }

    #[export]
    fn get_card_frequency(&self, _owner: &Node, index: i32) -> i32 {
        if let Some(card) = self.core.tarot_cards.get(index as usize) {
            card.frequency_hz as i32
        } else {
            0
        }
    }

    #[export]
    fn get_card_color(&self, _owner: &Node, index: i32) -> GodotString {
        if let Some(card) = self.core.tarot_cards.get(index as usize) {
            GodotString::from(&card.color)
        } else {
            GodotString::from("")
        }
    }

    #[export]
    fn get_card_merkaba(&self, _owner: &Node, index: i32) -> GodotString {
        if let Some(card) = self.core.tarot_cards.get(index as usize) {
            GodotString::from(&card.merkaba_chariot)
        } else {
            GodotString::from("")
        }
    }

    #[export]
    fn calculate_fusion_ratio(&self, _owner: &Node) -> f64 {
        self.core.fusion_ratio
    }

    #[export]
    fn apply_fusion_harmonic(&self, _owner: &Node, base_frequency: f64) -> f64 {
        self.core.calculate_144_99_harmonic(base_frequency)
    }
}

fn init(handle: InitHandle) {
    handle.add_class::<CathedralBridge>();
}

godot_init!(init);
