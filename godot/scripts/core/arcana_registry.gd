extends Node
## Arcana Registry - Central management for 22 Living Arcana characters
## Tracks all characters, relationships, and progression
##
## Museum-quality character tracking with trauma-informed relationship system

class_name ArcanaRegistry

## Character registry - all 22 Arcana
var characters: Dictionary = {}  # arcana_id -> ArcanaCharacter

## Character definitions - canonical data
const ARCANA_DATA := {
	0: {
		"name": "The Fool",
		"title": "The Wanderer of Infinite Possibility",
		"element": "Air",
		"geometry_tier": 1,  # Tetrahedron
		"codex_root": 0,
		"divine_color": Color(1.0, 0.95, 0.7),   # Pale gold
		"infernal_color": Color(0.8, 0.2, 0.3),  # Deep crimson
		"harmony_color": Color(0.8, 0.9, 1.0),   # Sky blue
		"base_stats": {"wisdom": 5, "courage": 15, "compassion": 12, "knowledge": 8}
	},
	1: {
		"name": "The Magician",
		"title": "The Master of Manifestation",
		"element": "Fire",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 1,
		"divine_color": Color(1.0, 0.8, 0.3),
		"infernal_color": Color(1.0, 0.3, 0.0),
		"harmony_color": Color(0.9, 0.7, 1.0),
		"base_stats": {"wisdom": 12, "courage": 10, "compassion": 8, "knowledge": 15}
	},
	2: {
		"name": "The High Priestess",
		"title": "The Keeper of Sacred Mysteries",
		"element": "Water",
		"geometry_tier": 4,  # Dodecahedron
		"codex_root": 2,
		"divine_color": Color(0.7, 0.85, 1.0),
		"infernal_color": Color(0.3, 0.1, 0.5),
		"harmony_color": Color(0.6, 0.8, 0.9),
		"base_stats": {"wisdom": 18, "courage": 8, "compassion": 10, "knowledge": 12}
	},
	3: {
		"name": "The Empress",
		"title": "The Mother of Abundance",
		"element": "Earth",
		"geometry_tier": 2,  # Cube
		"codex_root": 3,
		"divine_color": Color(0.9, 1.0, 0.7),
		"infernal_color": Color(0.6, 0.3, 0.2),
		"harmony_color": Color(0.8, 0.95, 0.75),
		"base_stats": {"wisdom": 10, "courage": 8, "compassion": 18, "knowledge": 10}
	},
	4: {
		"name": "The Emperor",
		"title": "The Architect of Order",
		"element": "Fire",
		"geometry_tier": 2,  # Cube
		"codex_root": 4,
		"divine_color": Color(1.0, 0.7, 0.3),
		"infernal_color": Color(0.8, 0.1, 0.1),
		"harmony_color": Color(0.95, 0.8, 0.6),
		"base_stats": {"wisdom": 12, "courage": 15, "compassion": 8, "knowledge": 12}
	},
	5: {
		"name": "The Hierophant",
		"title": "The Bridge Between Worlds",
		"element": "Earth",
		"geometry_tier": 3,  # Octahedron
		"codex_root": 5,
		"divine_color": Color(0.95, 0.9, 0.7),
		"infernal_color": Color(0.5, 0.4, 0.3),
		"harmony_color": Color(0.85, 0.85, 0.85),
		"base_stats": {"wisdom": 15, "courage": 8, "compassion": 12, "knowledge": 15}
	},
	6: {
		"name": "The Lovers",
		"title": "The Union of Opposites",
		"element": "Air",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 6,
		"divine_color": Color(1.0, 0.8, 0.9),
		"infernal_color": Color(0.8, 0.2, 0.5),
		"harmony_color": Color(0.95, 0.7, 0.85),
		"base_stats": {"wisdom": 10, "courage": 10, "compassion": 15, "knowledge": 10}
	},
	7: {
		"name": "The Chariot",
		"title": "The Victor Through Will",
		"element": "Water",
		"geometry_tier": 1,  # Tetrahedron
		"codex_root": 7,
		"divine_color": Color(0.9, 0.95, 1.0),
		"infernal_color": Color(0.3, 0.3, 0.6),
		"harmony_color": Color(0.7, 0.8, 0.95),
		"base_stats": {"wisdom": 8, "courage": 18, "compassion": 8, "knowledge": 10}
	},
	8: {
		"name": "Strength",
		"title": "The Gentle Tamer",
		"element": "Fire",
		"geometry_tier": 3,  # Octahedron
		"codex_root": 8,
		"divine_color": Color(1.0, 0.9, 0.6),
		"infernal_color": Color(0.9, 0.4, 0.2),
		"harmony_color": Color(0.95, 0.85, 0.7),
		"base_stats": {"wisdom": 10, "courage": 15, "compassion": 15, "knowledge": 8}
	},
	9: {
		"name": "The Hermit",
		"title": "The Seeker of Truth",
		"element": "Earth",
		"geometry_tier": 4,  # Dodecahedron
		"codex_root": 9,
		"divine_color": Color(0.85, 0.85, 0.9),
		"infernal_color": Color(0.3, 0.3, 0.4),
		"harmony_color": Color(0.7, 0.75, 0.8),
		"base_stats": {"wisdom": 18, "courage": 8, "compassion": 10, "knowledge": 15}
	},
	10: {
		"name": "Wheel of Fortune",
		"title": "The Spinner of Destiny",
		"element": "Fire",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 10,
		"divine_color": Color(1.0, 0.85, 0.4),
		"infernal_color": Color(0.7, 0.3, 0.6),
		"harmony_color": Color(0.9, 0.75, 0.85),
		"base_stats": {"wisdom": 12, "courage": 12, "compassion": 12, "knowledge": 12}
	},
	11: {
		"name": "Justice",
		"title": "The Arbiter of Balance",
		"element": "Air",
		"geometry_tier": 3,  # Octahedron (perfect balance)
		"codex_root": 11,
		"divine_color": Color(0.9, 0.95, 1.0),
		"infernal_color": Color(0.5, 0.5, 0.7),
		"harmony_color": Color(0.8, 0.85, 0.95),
		"base_stats": {"wisdom": 15, "courage": 10, "compassion": 12, "knowledge": 15}
	},
	12: {
		"name": "The Hanged Man",
		"title": "The Willing Sacrifice",
		"element": "Water",
		"geometry_tier": 1,  # Tetrahedron (inversion)
		"codex_root": 12,
		"divine_color": Color(0.8, 0.9, 1.0),
		"infernal_color": Color(0.4, 0.2, 0.6),
		"harmony_color": Color(0.75, 0.8, 0.9),
		"base_stats": {"wisdom": 15, "courage": 12, "compassion": 15, "knowledge": 10}
	},
	13: {
		"name": "Death",
		"title": "The Transformer of All",
		"element": "Water",
		"geometry_tier": 4,  # Dodecahedron
		"codex_root": 13,
		"divine_color": Color(0.95, 0.95, 1.0),
		"infernal_color": Color(0.2, 0.1, 0.2),
		"harmony_color": Color(0.7, 0.7, 0.8),
		"base_stats": {"wisdom": 15, "courage": 15, "compassion": 12, "knowledge": 12}
	},
	14: {
		"name": "Temperance",
		"title": "The Alchemist of Souls",
		"element": "Fire",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 14,
		"divine_color": Color(0.9, 0.9, 1.0),
		"infernal_color": Color(0.6, 0.4, 0.7),
		"harmony_color": Color(0.85, 0.85, 0.95),
		"base_stats": {"wisdom": 15, "courage": 10, "compassion": 15, "knowledge": 12}
	},
	15: {
		"name": "The Devil",
		"title": "The Liberator Through Bondage",
		"element": "Earth",
		"geometry_tier": 2,  # Cube (material realm)
		"codex_root": 15,
		"divine_color": Color(1.0, 0.8, 0.6),
		"infernal_color": Color(0.8, 0.1, 0.1),
		"harmony_color": Color(0.9, 0.6, 0.6),
		"base_stats": {"wisdom": 12, "courage": 15, "compassion": 8, "knowledge": 15}
	},
	16: {
		"name": "The Tower",
		"title": "The Breaker of Illusions",
		"element": "Fire",
		"geometry_tier": 2,  # Cube (structure)
		"codex_root": 16,
		"divine_color": Color(1.0, 0.95, 0.8),
		"infernal_color": Color(0.9, 0.2, 0.1),
		"harmony_color": Color(0.95, 0.7, 0.6),
		"base_stats": {"wisdom": 10, "courage": 18, "compassion": 8, "knowledge": 12}
	},
	17: {
		"name": "The Star",
		"title": "The Beacon of Hope",
		"element": "Air",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 17,
		"divine_color": Color(0.9, 0.95, 1.0),
		"infernal_color": Color(0.3, 0.4, 0.7),
		"harmony_color": Color(0.8, 0.9, 1.0),
		"base_stats": {"wisdom": 12, "courage": 10, "compassion": 18, "knowledge": 10}
	},
	18: {
		"name": "The Moon",
		"title": "The Walker of Dreams",
		"element": "Water",
		"geometry_tier": 4,  # Dodecahedron
		"codex_root": 18,
		"divine_color": Color(0.9, 0.9, 1.0),
		"infernal_color": Color(0.3, 0.2, 0.5),
		"harmony_color": Color(0.75, 0.8, 0.95),
		"base_stats": {"wisdom": 15, "courage": 8, "compassion": 12, "knowledge": 15}
	},
	19: {
		"name": "The Sun",
		"title": "The Radiant Truth",
		"element": "Fire",
		"geometry_tier": 5,  # Icosahedron
		"codex_root": 19,
		"divine_color": Color(1.0, 0.95, 0.6),
		"infernal_color": Color(1.0, 0.5, 0.2),
		"harmony_color": Color(1.0, 0.85, 0.7),
		"base_stats": {"wisdom": 12, "courage": 15, "compassion": 15, "knowledge": 12}
	},
	20: {
		"name": "Judgement",
		"title": "The Caller to Awakening",
		"element": "Fire",
		"geometry_tier": 3,  # Octahedron
		"codex_root": 20,
		"divine_color": Color(1.0, 0.95, 0.9),
		"infernal_color": Color(0.7, 0.3, 0.4),
		"harmony_color": Color(0.95, 0.85, 0.85),
		"base_stats": {"wisdom": 15, "courage": 12, "compassion": 15, "knowledge": 12}
	},
	21: {
		"name": "The World",
		"title": "The Dancer of Completion",
		"element": "Earth",
		"geometry_tier": 5,  # Icosahedron (unity)
		"codex_root": 21,
		"divine_color": Color(0.95, 1.0, 0.95),
		"infernal_color": Color(0.5, 0.6, 0.5),
		"harmony_color": Color(0.85, 0.95, 0.85),
		"base_stats": {"wisdom": 15, "courage": 15, "compassion": 15, "knowledge": 15}
	}
}

## Relationship bonds between characters
var relationships: Dictionary = {}  # {arcana_a_id: {arcana_b_id: bond_level}}

## Active character (player's current selection)
var active_character: ArcanaCharacter = null

## Party members
var party: Array[ArcanaCharacter] = []

signal character_registered(arcana_id: int)
signal active_character_changed(character: ArcanaCharacter)
signal relationship_updated(arcana_a: int, arcana_b: int, new_level: float)
signal party_changed()

func _ready() -> void:
	_initialize_relationships()
	print("📚 Arcana Registry Initialized")
	print("   22 Living Arcana ready for discovery")

## Register character instance
func register_character(character: ArcanaCharacter) -> void:
	if not character:
		push_error("Cannot register null character")
		return
	
	var arcana_id := character.arcana_number
	characters[arcana_id] = character
	
	print("✅ Registered: %s (Arcana %d)" % [character.arcana_name, arcana_id])
	character_registered.emit(arcana_id)

## Get character by Arcana number
func get_character(arcana_id: int) -> ArcanaCharacter:
	return characters.get(arcana_id, null)

## Get character data definition
func get_arcana_data(arcana_id: int) -> Dictionary:
	return ARCANA_DATA.get(arcana_id, {})

## Set active player character
func set_active_character(arcana_id: int) -> bool:
	if not arcana_id in characters:
		push_error("Character %d not registered" % arcana_id)
		return false
	
	active_character = characters[arcana_id]
	print("⭐ Active character: %s" % active_character.arcana_name)
	active_character_changed.emit(active_character)
	return true

## Initialize relationship matrix
func _initialize_relationships() -> void:
	for i in range(22):
		relationships[i] = {}
		for j in range(22):
			if i != j:
				relationships[i][j] = 0.0  # Start neutral

## Get relationship bond level (0.0 to 1.0)
func get_relationship(arcana_a: int, arcana_b: int) -> float:
	if arcana_a == arcana_b:
		return 1.0  # Perfect self-relationship
	
	if not arcana_a in relationships:
		return 0.0
	
	return relationships[arcana_a].get(arcana_b, 0.0)

## Update relationship bond
func update_relationship(arcana_a: int, arcana_b: int, delta: float) -> void:
	if arcana_a == arcana_b:
		return
	
	if not arcana_a in relationships:
		relationships[arcana_a] = {}
	
	var current := relationships[arcana_a].get(arcana_b, 0.0)
	var new_value := clamp(current + delta, 0.0, 1.0)
	
	relationships[arcana_a][arcana_b] = new_value
	
	# Relationships are mutual (symmetric)
	if not arcana_b in relationships:
		relationships[arcana_b] = {}
	relationships[arcana_b][arcana_a] = new_value
	
	print("💝 Relationship updated: %s ↔ %s = %.2f" % [
		ARCANA_DATA[arcana_a].name if arcana_a in ARCANA_DATA else str(arcana_a),
		ARCANA_DATA[arcana_b].name if arcana_b in ARCANA_DATA else str(arcana_b),
		new_value
	])
	
	relationship_updated.emit(arcana_a, arcana_b, new_value)

## Add character to party
func add_to_party(arcana_id: int) -> bool:
	if not arcana_id in characters:
		return false
	
	var character := characters[arcana_id]
	if character in party:
		return false
	
	if party.size() >= 4:  # Max party size
		push_error("Party full (max 4)")
		return false
	
	party.append(character)
	print("👥 %s joined the party" % character.arcana_name)
	party_changed.emit()
	return true

## Remove character from party
func remove_from_party(arcana_id: int) -> bool:
	if not arcana_id in characters:
		return false
	
	var character := characters[arcana_id]
	var index := party.find(character)
	
	if index == -1:
		return false
	
	party.remove_at(index)
	print("👥 %s left the party" % character.arcana_name)
	party_changed.emit()
	return true

## Get all registered characters
func get_all_characters() -> Array[ArcanaCharacter]:
	var result: Array[ArcanaCharacter] = []
	for arcana_id in characters.keys():
		result.append(characters[arcana_id])
	return result

## Save registry state
func save_state() -> Dictionary:
	return {
		"active_character_id": active_character.arcana_number if active_character else -1,
		"party_ids": party.map(func(c: ArcanaCharacter) -> int: return c.arcana_number),
		"relationships": relationships
	}

## Load registry state
func load_state(data: Dictionary) -> void:
	if data.has("active_character_id") and data.active_character_id >= 0:
		set_active_character(data.active_character_id)
	
	if data.has("party_ids"):
		party.clear()
		for arcana_id in data.party_ids:
			add_to_party(arcana_id)
	
	if data.has("relationships"):
		relationships = data.relationships
	
	print("📚 Registry state loaded")
