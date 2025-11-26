//! 🏰 Cathedral Game Engine - Bevy Implementation
//! 
//! FREE, open-source game engine powered by Bevy 0.14
//! Cross-platform: Web, Desktop, Mobile
//! 
//! Features:
//! - 22 Living Arcana system
//! - Codex 144:99 integration
//! - Sacred geometry rendering
//! - Fusion Kink mechanics
//! - Trauma-informed design

use bevy::prelude::*;
use bevy_egui::{egui, EguiContexts, EguiPlugin};
use serde::{Deserialize, Serialize};

// ============================================
// CORE COMPONENTS
// ============================================

/// Player component with consciousness tracking
#[derive(Component, Debug)]
pub struct Player {
    pub name: String,
    pub consciousness_level: u32,
    pub current_arcana: Option<String>,
}

/// Arcana card component (22 Major Arcana)
#[derive(Component, Debug, Clone, Serialize, Deserialize)]
pub struct ArcanaCard {
    pub id: u32,
    pub name: String,
    pub element: String,
    pub path: String,
    pub consciousness_level: u32,
}

/// Codex node component (144 nodes)
#[derive(Component, Debug, Clone, Serialize, Deserialize)]
pub struct CodexNode {
    pub id: u32,
    pub name: String,
    pub layer: u32,
    pub connections: Vec<u32>,
}

/// Sacred geometry component
#[derive(Component, Debug)]
pub struct SacredGeometry {
    pub geometry_type: GeometryType,
    pub scale: f32,
    pub rotation_speed: f32,
}

#[derive(Debug, Clone, Copy)]
pub enum GeometryType {
    FlowerOfLife,
    Metatron,
    SriYantra,
    VesicaPiscis,
    Pentagram,
    Octagram,
}

/// Fusion Kink component (A × B = D)
#[derive(Component, Debug)]
pub struct FusionKink {
    pub card_a: String,
    pub card_b: String,
    pub result_d: String,
    pub active: bool,
}

// ============================================
// RESOURCES
// ============================================

/// Game state resource
#[derive(Resource, Default)]
pub struct GameState {
    pub current_chapter: u32,
    pub gates_unlocked: Vec<u32>,
    pub consciousness_total: u32,
    pub fusion_active: bool,
}

/// Cathedral configuration
#[derive(Resource)]
pub struct CathedralConfig {
    pub total_arcana: u32,
    pub total_nodes: u32,
    pub total_gates: u32,
    pub total_chapters: u32,
}

impl Default for CathedralConfig {
    fn default() -> Self {
        Self {
            total_arcana: 22,
            total_nodes: 144,
            total_gates: 99,
            total_chapters: 33,
        }
    }
}

// ============================================
// SYSTEMS
// ============================================

/// Setup system - initializes the game world
fn setup(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
) {
    // Camera
    commands.spawn(Camera2dBundle::default());
    
    // Player
    commands.spawn((
        Player {
            name: "Seeker".to_string(),
            consciousness_level: 1,
            current_arcana: None,
        },
        SpriteBundle {
            texture: asset_server.load("player.png"),
            transform: Transform::from_xyz(0.0, 0.0, 0.0),
            ..default()
        },
    ));
    
    // Initial sacred geometry (Flower of Life)
    commands.spawn((
        SacredGeometry {
            geometry_type: GeometryType::FlowerOfLife,
            scale: 1.0,
            rotation_speed: 0.5,
        },
        SpriteBundle {
            transform: Transform::from_xyz(0.0, 0.0, -1.0),
            ..default()
        },
    ));
    
    info!("🏰 Cathedral initialized - Codex 144:99 active");
}

/// Sacred geometry rotation system
fn rotate_sacred_geometry(
    time: Res<Time>,
    mut query: Query<(&SacredGeometry, &mut Transform)>,
) {
    for (geometry, mut transform) in query.iter_mut() {
        transform.rotate_z(geometry.rotation_speed * time.delta_seconds());
    }
}

/// Consciousness level system
fn update_consciousness(
    mut game_state: ResMut<GameState>,
    query: Query<&Player>,
) {
    let total: u32 = query.iter().map(|p| p.consciousness_level).sum();
    game_state.consciousness_total = total;
}

/// Fusion Kink system (A × B = D)
fn fusion_system(
    mut game_state: ResMut<GameState>,
    query: Query<&FusionKink>,
) {
    for fusion in query.iter() {
        if fusion.active {
            game_state.fusion_active = true;
            info!("🜏 Fusion active: {} × {} = {}", fusion.card_a, fusion.card_b, fusion.result_d);
        }
    }
}

/// UI system using egui
fn ui_system(
    mut contexts: EguiContexts,
    game_state: Res<GameState>,
    config: Res<CathedralConfig>,
) {
    egui::Window::new("🏰 Cathedral")
        .resizable(true)
        .show(contexts.ctx_mut(), |ui| {
            ui.heading("Codex 144:99");
            ui.separator();
            
            ui.horizontal(|ui| {
                ui.label("Chapter:");
                ui.label(format!("{} / {}", game_state.current_chapter, config.total_chapters));
            });
            
            ui.horizontal(|ui| {
                ui.label("Consciousness:");
                ui.label(format!("{}", game_state.consciousness_total));
            });
            
            ui.horizontal(|ui| {
                ui.label("Gates Unlocked:");
                ui.label(format!("{} / {}", game_state.gates_unlocked.len(), config.total_gates));
            });
            
            ui.separator();
            
            if game_state.fusion_active {
                ui.colored_label(egui::Color32::GOLD, "🜏 Fusion Kink Active");
            }
            
            ui.separator();
            
            if ui.button("🃏 Draw Arcana").clicked() {
                info!("Drawing arcana card...");
            }
            
            if ui.button("🔮 Open Codex").clicked() {
                info!("Opening Codex 144:99...");
            }
            
            if ui.button("⚗️ Activate Fusion").clicked() {
                info!("Activating Fusion Kink...");
            }
        });
}

/// Input handling system
fn input_system(
    keyboard: Res<ButtonInput<KeyCode>>,
    mut query: Query<&mut Transform, With<Player>>,
    time: Res<Time>,
) {
    let speed = 200.0;
    
    for mut transform in query.iter_mut() {
        let mut direction = Vec3::ZERO;
        
        if keyboard.pressed(KeyCode::KeyW) || keyboard.pressed(KeyCode::ArrowUp) {
            direction.y += 1.0;
        }
        if keyboard.pressed(KeyCode::KeyS) || keyboard.pressed(KeyCode::ArrowDown) {
            direction.y -= 1.0;
        }
        if keyboard.pressed(KeyCode::KeyA) || keyboard.pressed(KeyCode::ArrowLeft) {
            direction.x -= 1.0;
        }
        if keyboard.pressed(KeyCode::KeyD) || keyboard.pressed(KeyCode::ArrowRight) {
            direction.x += 1.0;
        }
        
        if direction != Vec3::ZERO {
            transform.translation += direction.normalize() * speed * time.delta_seconds();
        }
    }
}

// ============================================
// PLUGINS
// ============================================

/// Cathedral game plugin
pub struct CathedralPlugin;

impl Plugin for CathedralPlugin {
    fn build(&self, app: &mut App) {
        app
            .init_resource::<GameState>()
            .init_resource::<CathedralConfig>()
            .add_systems(Startup, setup)
            .add_systems(Update, (
                rotate_sacred_geometry,
                update_consciousness,
                fusion_system,
                input_system,
                ui_system,
            ));
    }
}

// ============================================
// MAIN
// ============================================

fn main() {
    App::new()
        // Bevy default plugins
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "🏰 Cathedral - Codex 144:99".to_string(),
                resolution: (1280.0, 720.0).into(),
                ..default()
            }),
            ..default()
        }))
        // UI plugin
        .add_plugins(EguiPlugin)
        // Cathedral game plugin
        .add_plugins(CathedralPlugin)
        .run();
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_arcana_creation() {
        let arcana = ArcanaCard {
            id: 0,
            name: "The Fool".to_string(),
            element: "Air".to_string(),
            path: "Aleph".to_string(),
            consciousness_level: 1,
        };
        assert_eq!(arcana.id, 0);
        assert_eq!(arcana.name, "The Fool");
    }
    
    #[test]
    fn test_codex_node() {
        let node = CodexNode {
            id: 1,
            name: "Node 1".to_string(),
            layer: 1,
            connections: vec![2, 3, 4],
        };
        assert_eq!(node.id, 1);
        assert_eq!(node.connections.len(), 3);
    }
    
    #[test]
    fn test_cathedral_config() {
        let config = CathedralConfig::default();
        assert_eq!(config.total_arcana, 22);
        assert_eq!(config.total_nodes, 144);
        assert_eq!(config.total_gates, 99);
        assert_eq!(config.total_chapters, 33);
    }
}

