#!/bin/bash
# Restore full Godot 4.5 game with Rust integration and custom shaders

echo "🎮 Restoring Cathedral Godot 4.5 Game"

BASE_DIR="/Users/rebeccalemke/Documents/cathedral"
GODOT_MAIN="$BASE_DIR/godot"
RUST_DIR="$BASE_DIR/rust-bindings"

# Create complete Godot project structure
mkdir -p "$GODOT_MAIN"/{scenes/{main,studios,characters,environments},scripts/{core,studios,characters},assets/{textures,models,audio,shaders},materials,effects,resources}

# Restore main project file for Godot 4.5
cat > "$GODOT_MAIN/project.godot" << 'EOF'
; Engine configuration file.
; It's best edited using the editor UI and not directly,
; since the parameters that go here are not all obvious.

config_version=5

[application]
config/name="Cathedral of Circuits - Living Arcana"
config/description="Museum-quality mystical adventure game with Rust integration"
config/version="2.0.0"
run/main_scene="res://scenes/main/main_menu.tscn"
config/features=PackedStringArray("4.5", "Forward+")

[autoload]
GameManager="*res://scripts/core/game_manager.gd"
CodexSystem="*res://scripts/core/codex_system.gd"
RustBridge="*res://scripts/core/rust_bridge.gd"

[display]
window/size/viewport_width=1920
window/size/viewport_height=1080
window/size/mode=2
window/stretch/mode="canvas_items"

[rendering]
renderer/rendering_method="forward_plus"
textures/canvas_textures/default_texture_filter=2
anti_aliasing/quality/msaa_3d=2
environment/defaults/default_environment="res://environment/default_env.tres"

[physics]
common/physics_ticks_per_second=60
EOF

# Restore Rust Cargo.toml for Godot 4.5
cat > "$RUST_DIR/Cargo.toml" << 'EOF'
[package]
name = "cathedral-godot"
version = "2.0.0"
edition = "2021"
description = "Cathedral Godot 4.5 Rust Integration"

[dependencies]
godot = { version = "0.1", features = ["experimental-threads"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[lib]
crate-type = ["cdylib"]
EOF

echo "✅ Godot 4.5 project structure restored"