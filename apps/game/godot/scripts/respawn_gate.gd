extends Area3D

signal gate_activated(player_state, target_realm)

@export var gate_id = "gate-daath-33"
@export var target_realm = "MA:01-Magician"
@export var gate_color = Color(0.043, 0.667, 0.71) # tiffany blue
@export var activation_sound = "res://audio/gate_activation.wav"

var is_active = false
var activation_count = 0

func _ready():
    connect("body_entered", Callable(self, "_on_body_entered"))
    setup_gate_visuals()

func setup_gate_visuals():
    # Create mystical gate effect
    var particles = GPUParticles3D.new()
    particles.name = "GateParticles"
    particles.emitting = true
    particles.amount = 50
    particles.lifetime = 2.0
    particles.one_shot = false
    particles.explosiveness = 0.1
    particles.process_material = create_gate_material()
    add_child(particles)

func create_gate_material():
    var material = ParticleProcessMaterial.new()
    material.emission_shape = ParticleProcessMaterial.EMISSION_SHAPE_SPHERE
    material.emission_sphere_radius = 2.0
    material.direction = Vector3.UP
    material.spread = 45.0
    material.gravity = Vector3.ZERO
    material.initial_velocity_min = 0.5
    material.initial_velocity_max = 1.0
    material.scale_min = 0.1
    material.scale_max = 0.3
    material.color = gate_color
    return material

func _on_body_entered(body):
    if body.name == "Player" and not is_active:
        activate_gate(body)

func activate_gate(player):
    is_active = true
    activation_count += 1

    # Play activation sound
    if activation_sound:
        play_gate_audio()

    # Create activation effect
    create_activation_effect()

    # Get player state for transition
    var player_state = get_player_state(player)

    # Emit signal for realm transition
    emit_signal("gate_activated", player_state, target_realm)

    # Log mystical transition
    log_mystical_transition(player_state)

    print("Gate ", gate_id, " activated! Transitioning to ", target_realm)

func get_player_state(player):
    var state = {
        "player_name": player.name,
        "position": player.global_transform.origin,
        "gate_id": gate_id,
        "activation_count": activation_count,
        "timestamp": Time.get_datetime_string_from_system()
    }

    # Add mystical attributes if they exist
    if player.has_meta("mystical_level"):
        state["mystical_level"] = player.get_meta("mystical_level")
    if player.has_meta("tarot_progression"):
        state["tarot_progression"] = player.get_meta("tarot_progression")

    return state

func play_gate_audio():
    if FileAccess.file_exists(activation_sound):
        var audio_player = AudioStreamPlayer3D.new()
        audio_player.stream = load(activation_sound)
        audio_player.autoplay = true
        add_child(audio_player)

func create_activation_effect():
    # Create mystical activation animation
    var tween = create_tween()
    tween.tween_property(self, "scale", Vector3(1.2, 1.2, 1.2), 0.3)
    tween.tween_property(self, "scale", Vector3(1.0, 1.0, 1.0), 0.3)

    # Add mystical light effect
    var light = OmniLight3D.new()
    light.light_color = gate_color
    light.light_energy = 2.0
    light.omni_range = 5.0
    add_child(light)

    # Remove light after effect
    await get_tree().create_timer(1.0).timeout
    light.queue_free()

func log_mystical_transition(player_state):
    # Log to research system
    var log_entry = {
        "event": "gate_transition",
        "gate_id": gate_id,
        "target_realm": target_realm,
        "player_state": player_state,
        "timestamp": Time.get_datetime_string_from_system()
    }

    # In a real implementation, this would write to a research log file
    # or send to the Ellen3 orchestrator
    print("Research Log: ", JSON.stringify(log_entry))

func get_gate_info():
    return {
        "id": gate_id,
        "target_realm": target_realm,
        "color": gate_color.to_html(),
        "activation_count": activation_count,
        "is_active": is_active
    }
