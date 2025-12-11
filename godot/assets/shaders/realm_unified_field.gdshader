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
