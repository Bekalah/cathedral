shader_type spatial;
render_mode blend_mix, depth_draw_opaque, cull_back, diffuse_burley, specular_schlick_ggx;

uniform vec3 albedo_color : source_color = vec3(0.541, 0.498, 1.0);
uniform float emission_power : hint_range(0.0, 2.0) = 0.45;
uniform float metallic : hint_range(0.0, 1.0) = 0.1;
uniform float roughness : hint_range(0.0, 1.0) = 0.3;

void fragment() {
    ALBEDO = albedo_color;
    EMISSION = albedo_color * emission_power;
    METALLIC = metallic;
    ROUGHNESS = roughness;
}
