# Minimal Godot 4 GDScript loader for Achad integration specs
# Usage: var spec = AchadLoader.load_spec(json_string)
# Replace placeholder types or wire to your game as needed.

class_name AchadLoader

static func load_spec(json_str: String) -> Dictionary:
	var result := JSON.parse_string(json_str)
	if typeof(result) != TYPE_DICTIONARY:
		push_warning("Invalid spec JSON")
		return {}
	# Validate expected fields
	if not result.has("design") or not result.has("individual"):
		push_warning("Spec missing required fields")
		return {}
	return result
