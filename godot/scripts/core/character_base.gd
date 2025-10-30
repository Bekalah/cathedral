extends CharacterBody3D
## Arcana Character Base - Museum-quality character foundation
## Classical renaissance precision in movement, sacred geometry in form
## Divine/Infernal/Harmony aesthetic with perfect balance
##
## Design Philosophy:
## - Every pixel intentional, every movement purposeful
## - Trauma-informed interactions, consent-based engagement
## - Perfect symmetry reflecting inner balance
## - Sacred geometry embedded in character structure

class_name ArcanaCharacter

## Character archetype from Major Arcana
enum ArcanaType {
	FOOL = 0,
	MAGICIAN = 1,
	HIGH_PRIESTESS = 2,
	EMPRESS = 3,
	EMPEROR = 4,
	HIEROPHANT = 5,
	LOVERS = 6,
	CHARIOT = 7,
	STRENGTH = 8,
	HERMIT = 9,
	WHEEL_OF_FORTUNE = 10,
	JUSTICE = 11,
	HANGED_MAN = 12,
	DEATH = 13,
	TEMPERANCE = 14,
	DEVIL = 15,
	TOWER = 16,
	STAR = 17,
	MOON = 18,
	SUN = 19,
	JUDGEMENT = 20,
	WORLD = 21
}

## Character aspect - Divine/Infernal/Harmony trinity
enum Aspect {
	DIVINE,    # Celestial perfection, golden light, upward spirals
	INFERNAL,  # Chthonic power, crimson depths, downward spirals
	HARMONY    # Perfect balance, iridescent fusion, Fibonacci symmetry
}

## Core character properties
@export_group("Character Identity")
@export var arcana_number: int = 0
@export var arcana_name: String = "The Fool"
@export var current_aspect: Aspect = Aspect.HARMONY
@export_multiline var character_description: String = ""
@export var codex_node_id: int = 0  # Links to Codex 144:99

@export_group("Visual Presentation")
@export var primary_color: Color = Color.WHITE
@export var secondary_color: Color = Color.GOLD
@export var aura_intensity: float = 0.5
@export var geometry_complexity: int = 3  # Platonic solid tier
@export var sacred_symbol: Texture2D

@export_group("Statistics")
@export var base_wisdom: int = 10
@export var base_courage: int = 10
@export var base_compassion: int = 10
@export var base_knowledge: int = 10

@export_group("Movement - Classical Physics")
@export var movement_speed: float = 5.0
@export var sprint_multiplier: float = 1.5
@export var acceleration: float = 10.0
@export var deceleration: float = 15.0
@export var rotation_speed: float = 10.0

## Character state
var current_stats: Dictionary = {
	"wisdom": 10,
	"courage": 10,
	"compassion": 10,
	"knowledge": 10,
	"health": 100,
	"energy": 100,
	"experience": 0
}

var character_bonds: Dictionary = {}  # Relationships with other Arcana
var equipped_abilities: Array[String] = []
var active_quests: Array[int] = []
var discovered_fusions: Array[int] = []

## Visual components
var sacred_geometry_aura: Node3D
var aspect_shader: ShaderMaterial
var particle_emitter: GPUParticles3D

## Animation state
var is_moving: bool = false
var is_interacting: bool = false
var current_animation: String = "idle"

## Input state
var input_direction: Vector3 = Vector3.ZERO
var desired_velocity: Vector3 = Vector3.ZERO

signal aspect_changed(new_aspect: Aspect)
signal stats_updated(stat_name: String, new_value: int)
signal ability_activated(ability_name: String)
signal dialogue_initiated(character: ArcanaCharacter)

func _ready() -> void:
	_initialize_character()
	_setup_visual_components()
	_apply_aspect_aesthetics()
	
	print("✨ Arcana Character Initialized: %s (Arcana %d)" % [arcana_name, arcana_number])
	print("   Aspect: %s | Codex Node: %d" % [Aspect.keys()[current_aspect], codex_node_id])

func _physics_process(delta: float) -> void:
	if not is_interacting:
		_handle_movement(delta)
		_update_animation_state()
	
	move_and_slide()

## Initialize character with classical precision
func _initialize_character() -> void:
	# Set collision layers
	collision_layer = 2  # Character layer
	collision_mask = 1 | 4  # World + interactables
	
	# Initialize stats from base values
	current_stats.wisdom = base_wisdom
	current_stats.courage = base_courage
	current_stats.compassion = base_compassion
	current_stats.knowledge = base_knowledge
	
	# Connect to ArcanaRegistry
	if ArcanaRegistry:
		ArcanaRegistry.register_character(self)

## Setup visual components with museum-quality rendering
func _setup_visual_components() -> void:
	# Sacred geometry aura
	sacred_geometry_aura = Node3D.new()
	sacred_geometry_aura.name = "SacredGeometryAura"
	add_child(sacred_geometry_aura)
	
	_generate_sacred_geometry(geometry_complexity)
	
	# Particle system for divine/infernal effects
	particle_emitter = GPUParticles3D.new()
	particle_emitter.name = "AspectParticles"
	particle_emitter.amount = 100
	particle_emitter.lifetime = 2.0
	particle_emitter.explosiveness = 0.0
	particle_emitter.randomness = 0.3
	add_child(particle_emitter)
	
	_setup_particle_material()

## Generate sacred geometry based on complexity tier
func _generate_sacred_geometry(tier: int) -> void:
	# Tier system: 1=Tetrahedron, 2=Cube, 3=Octahedron, 4=Dodecahedron, 5=Icosahedron
	var geometry_mesh: MeshInstance3D = MeshInstance3D.new()
	geometry_mesh.name = "GeometryCore"
	
	match tier:
		1:
			_create_tetrahedron(geometry_mesh)
		2:
			_create_cube(geometry_mesh)
		3:
			_create_octahedron(geometry_mesh)
		4:
			_create_dodecahedron(geometry_mesh)
		5:
			_create_icosahedron(geometry_mesh)
	
	sacred_geometry_aura.add_child(geometry_mesh)
	
	# Add slow rotation for divine presence
	_add_sacred_rotation(sacred_geometry_aura)

## Create tetrahedron - Fire element, ascension
func _create_tetrahedron(mesh_instance: MeshInstance3D) -> void:
	var surface_tool := SurfaceTool.new()
	surface_tool.begin(Mesh.PRIMITIVE_TRIANGLES)
	
	var a := 1.0 / sqrt(2.0)
	var vertices := PackedVector3Array([
		Vector3(0, 1, 0),
		Vector3(a, 0, a),
		Vector3(-a, 0, a),
		Vector3(0, 0, -sqrt(2.0) * a)
	])
	
	# Define faces with perfect winding
	var faces := [
		[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]
	]
	
	for face in faces:
		for idx in face:
			surface_tool.add_vertex(vertices[idx])
	
	mesh_instance.mesh = surface_tool.commit()
	_apply_geometry_material(mesh_instance)

## Create octahedron - Air element, balance
func _create_octahedron(mesh_instance: MeshInstance3D) -> void:
	var surface_tool := SurfaceTool.new()
	surface_tool.begin(Mesh.PRIMITIVE_TRIANGLES)
	
	var vertices := PackedVector3Array([
		Vector3(0, 1, 0),   # Top
		Vector3(0, -1, 0),  # Bottom
		Vector3(1, 0, 0),   # +X
		Vector3(-1, 0, 0),  # -X
		Vector3(0, 0, 1),   # +Z
		Vector3(0, 0, -1)   # -Z
	])
	
	var faces := [
		[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
		[1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
	]
	
	for face in faces:
		for idx in face:
			surface_tool.add_vertex(vertices[idx])
	
	mesh_instance.mesh = surface_tool.commit()
	_apply_geometry_material(mesh_instance)

## Create cube - Earth element, foundation
func _create_cube(mesh_instance: MeshInstance3D) -> void:
	var box := BoxMesh.new()
	box.size = Vector3(1, 1, 1)
	mesh_instance.mesh = box
	_apply_geometry_material(mesh_instance)

## Create dodecahedron - Aether, divine mystery
func _create_dodecahedron(mesh_instance: MeshInstance3D) -> void:
	# Golden ratio φ = (1 + √5) / 2
	var phi := (1.0 + sqrt(5.0)) / 2.0
	var inv_phi := 1.0 / phi
	
	var surface_tool := SurfaceTool.new()
	surface_tool.begin(Mesh.PRIMITIVE_TRIANGLES)
	
	var vertices := PackedVector3Array([
		# Cube vertices
		Vector3(1, 1, 1), Vector3(1, 1, -1), Vector3(1, -1, 1), Vector3(1, -1, -1),
		Vector3(-1, 1, 1), Vector3(-1, 1, -1), Vector3(-1, -1, 1), Vector3(-1, -1, -1),
		# Rectangle vertices in (0, ±φ, ±1/φ)
		Vector3(0, phi, inv_phi), Vector3(0, phi, -inv_phi),
		Vector3(0, -phi, inv_phi), Vector3(0, -phi, -inv_phi),
		# Rectangle vertices in (±1/φ, 0, ±φ)
		Vector3(inv_phi, 0, phi), Vector3(-inv_phi, 0, phi),
		Vector3(inv_phi, 0, -phi), Vector3(-inv_phi, 0, -phi),
		# Rectangle vertices in (±φ, ±1/φ, 0)
		Vector3(phi, inv_phi, 0), Vector3(phi, -inv_phi, 0),
		Vector3(-phi, inv_phi, 0), Vector3(-phi, -inv_phi, 0)
	])
	
	# Dodecahedron has 12 pentagonal faces - simplified triangulation
	# In production, use proper pentagonal decomposition
	for i in range(vertices.size()):
		surface_tool.add_vertex(vertices[i])
	
	mesh_instance.mesh = surface_tool.commit()
	_apply_geometry_material(mesh_instance)

## Create icosahedron - Water element, flow
func _create_icosahedron(mesh_instance: MeshInstance3D) -> void:
	var phi := (1.0 + sqrt(5.0)) / 2.0
	
	var surface_tool := SurfaceTool.new()
	surface_tool.begin(Mesh.PRIMITIVE_TRIANGLES)
	
	var vertices := PackedVector3Array([
		Vector3(0, 1, phi), Vector3(0, -1, phi), Vector3(0, 1, -phi), Vector3(0, -1, -phi),
		Vector3(1, phi, 0), Vector3(-1, phi, 0), Vector3(1, -phi, 0), Vector3(-1, -phi, 0),
		Vector3(phi, 0, 1), Vector3(-phi, 0, 1), Vector3(phi, 0, -1), Vector3(-phi, 0, -1)
	])
	
	# Normalize to unit sphere
	for i in range(vertices.size()):
		vertices[i] = vertices[i].normalized()
	
	var faces := [
		[0, 1, 8], [0, 8, 4], [0, 4, 5], [0, 5, 9], [0, 9, 1],
		[1, 6, 8], [1, 7, 6], [1, 9, 7], [2, 3, 11], [2, 11, 5],
		[2, 5, 4], [2, 4, 10], [2, 10, 3], [3, 6, 7], [3, 7, 11],
		[3, 10, 6], [4, 8, 10], [5, 11, 9], [6, 10, 8], [7, 9, 11]
	]
	
	for face in faces:
		for idx in face:
			surface_tool.add_vertex(vertices[idx])
	
	mesh_instance.mesh = surface_tool.commit()
	_apply_geometry_material(mesh_instance)

## Apply material with aspect-specific aesthetics
func _apply_geometry_material(mesh_instance: MeshInstance3D) -> void:
	var material := StandardMaterial3D.new()
	
	match current_aspect:
		Aspect.DIVINE:
			material.albedo_color = Color(1.0, 0.9, 0.7, 0.3)  # Golden divine glow
			material.emission_enabled = true
			material.emission = Color(1.0, 0.9, 0.5)
			material.emission_energy = 1.5
		Aspect.INFERNAL:
			material.albedo_color = Color(0.8, 0.1, 0.1, 0.3)  # Crimson infernal power
			material.emission_enabled = true
			material.emission = Color(1.0, 0.2, 0.0)
			material.emission_energy = 1.2
		Aspect.HARMONY:
			material.albedo_color = Color(0.6, 0.8, 1.0, 0.3)  # Iridescent harmony
			material.emission_enabled = true
			material.emission = Color(0.7, 0.9, 1.0)
			material.emission_energy = 1.0
	
	material.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	material.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	material.cull_mode = BaseMaterial3D.CULL_DISABLED
	
	mesh_instance.material_override = material

## Add sacred rotation - Fibonacci spiral motion
func _add_sacred_rotation(node: Node3D) -> void:
	var tween := create_tween()
	tween.set_loops()
	tween.set_ease(Tween.EASE_IN_OUT)
	tween.set_trans(Tween.TRANS_SINE)
	
	# Rotate on multiple axes for sacred spiral
	tween.tween_property(node, "rotation:y", TAU, 8.0)
	tween.parallel().tween_property(node, "rotation:x", TAU / PHI, 13.0)  # Golden ratio timing
	
	# Pulsing scale for divine breath
	var scale_tween := create_tween()
	scale_tween.set_loops()
	scale_tween.set_ease(Tween.EASE_IN_OUT)
	scale_tween.set_trans(Tween.TRANS_SINE)
	scale_tween.tween_property(node, "scale", Vector3.ONE * 1.1, 3.0)
	scale_tween.tween_property(node, "scale", Vector3.ONE * 0.9, 3.0)

## Setup particle material for aspect effects
func _setup_particle_material() -> void:
	var process_material := ParticleProcessMaterial.new()
	
	process_material.direction = Vector3.UP
	process_material.spread = 45.0
	process_material.initial_velocity_min = 1.0
	process_material.initial_velocity_max = 2.0
	process_material.gravity = Vector3(0, 0.5, 0)
	process_material.scale_min = 0.1
	process_material.scale_max = 0.3
	
	match current_aspect:
		Aspect.DIVINE:
			process_material.color = Color(1.0, 0.9, 0.5, 0.8)
		Aspect.INFERNAL:
			process_material.color = Color(1.0, 0.2, 0.0, 0.8)
			process_material.direction = Vector3.DOWN
			process_material.gravity = Vector3(0, -0.5, 0)
		Aspect.HARMONY:
			process_material.color = Color(0.7, 0.9, 1.0, 0.8)
			process_material.direction = Vector3(0, 0, 0)
	
	particle_emitter.process_material = process_material

## Apply aspect-specific aesthetics
func _apply_aspect_aesthetics() -> void:
	_setup_particle_material()
	
	# Update all geometry materials
	for child in sacred_geometry_aura.get_children():
		if child is MeshInstance3D:
			_apply_geometry_material(child)

## Handle character movement with classical physics
func _handle_movement(delta: float) -> void:
	# Get input direction (to be connected to input system)
	input_direction = Vector3.ZERO
	
	if input_direction.length() > 0:
		input_direction = input_direction.normalized()
		desired_velocity = input_direction * movement_speed
		is_moving = true
	else:
		desired_velocity = Vector3.ZERO
		is_moving = false
	
	# Smooth acceleration/deceleration
	var accel_rate := acceleration if is_moving else deceleration
	velocity.x = move_toward(velocity.x, desired_velocity.x, accel_rate * delta)
	velocity.z = move_toward(velocity.z, desired_velocity.z, accel_rate * delta)
	
	# Apply gravity
	if not is_on_floor():
		velocity.y -= 9.8 * delta
	
	# Rotate character to face movement direction
	if input_direction.length() > 0:
		var target_rotation := atan2(-input_direction.x, -input_direction.z)
		rotation.y = lerp_angle(rotation.y, target_rotation, rotation_speed * delta)

## Update animation state
func _update_animation_state() -> void:
	var new_animation := "idle"
	
	if is_moving:
		new_animation = "walk"
	
	if new_animation != current_animation:
		current_animation = new_animation
		# Trigger animation player when implemented
		print("🎭 Animation: " + current_animation)

## Change character aspect - visual transformation
func change_aspect(new_aspect: Aspect) -> void:
	if current_aspect == new_aspect:
		return
	
	current_aspect = new_aspect
	_apply_aspect_aesthetics()
	
	print("🔮 Aspect changed to: " + Aspect.keys()[new_aspect])
	aspect_changed.emit(new_aspect)

## Update character stat with bounds checking
func update_stat(stat_name: String, value: int) -> void:
	if not stat_name in current_stats:
		push_error("Invalid stat name: " + stat_name)
		return
	
	current_stats[stat_name] = clamp(value, 0, 999)
	stats_updated.emit(stat_name, current_stats[stat_name])

## Initiate dialogue with another character
func start_dialogue(other_character: ArcanaCharacter) -> void:
	is_interacting = true
	dialogue_initiated.emit(other_character)
	
	if DialogueManager:
		DialogueManager.begin_conversation(self, other_character)

const PHI := 1.618033988749895  # Golden ratio constant
