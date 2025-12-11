#!/bin/bash
# Restore custom shaders from all Godot packages

echo "✨ Restoring Custom Shaders"

BASE_DIR="/Users/rebeccalemke/Documents/cathedral"
SHADER_DIRS=(
    "packages/godot-vfx-library/shaders"
    "packages/godot-liber-arcanae/shaders" 
    "packages/godot-codex-14499/shaders"
    "packages/godot-design-studio/shaders"
)

# Create main shader directory
mkdir -p "$BASE_DIR/godot/assets/shaders"

# Collect all shaders from packages
for shader_dir in "${SHADER_DIRS[@]}"; do
    if [ -d "$BASE_DIR/$shader_dir" ]; then
        echo "Collecting shaders from $shader_dir"
        find "$BASE_DIR/$shader_dir" -name "*.gdshader" -exec cp {} "$BASE_DIR/godot/assets/shaders/" \;
    fi
done

# Create realm shaders based on previews
REALM_SHADERS=(
    "prima_materia"
    "lunar_tides" 
    "emerald_tablet"
    "golden_dawn"
    "unified_field"
    "ideaspace"
    "moonchild_nexus"
    "sonic_frequencies"
    "omega_point"
)

for realm in "${REALM_SHADERS[@]}"; do
    cat > "$BASE_DIR/godot/assets/shaders/realm_${realm}.gdshader" << EOF
shader_type canvas_item;

uniform float time : hint_range(0.0, 10.0) = 1.0;
uniform vec3 primary_color : source_color = vec3(1.0, 0.8, 0.2);
uniform float intensity : hint_range(0.0, 2.0) = 1.0;
uniform float frequency : hint_range(0.1, 10.0) = 1.0;

void fragment() {
    vec2 uv = UV;
    float wave = sin(uv.x * frequency + TIME * time) * cos(uv.y * frequency + TIME * time);
    vec3 color = primary_color * (0.5 + 0.5 * wave) * intensity;
    COLOR = vec4(color, 1.0);
}
EOF
done

echo "✅ Custom shaders restored"