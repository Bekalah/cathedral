extends Node3D

var cathedral_bridge
var selected_arcana = null
var arcana_buttons = []

const OPENSPEC_COLORS = {
	"gold": Color(0.957, 0.815, 0.247, 1.0),
	"gold_highlight": Color(1.0, 0.918, 0.655, 1.0),
	"teal": Color(0.427, 0.878, 0.878, 1.0),
	"teal_highlight": Color(0.655, 1.0, 1.0, 1.0),
	"rose": Color(1.0, 0.624, 0.745, 1.0),
	"rose_highlight": Color(1.0, 0.769, 0.839, 1.0),
	"vesica": Color(0.541, 0.467, 1.0, 1.0),
	"obsidian": Color(0.051, 0.043, 0.071, 1.0),
	"obsidian_light": Color(0.149, 0.125, 0.192, 1.0),
	"angel": Color(1.0, 0.961, 0.882, 1.0),
	"demon": Color(0.051, 0.043, 0.071, 1.0)
}

func _ready():
	print("Cathedral of Circuits - Master Opus v1.0")
	print("Initializing Codex 144:99 Bridge...")
	
	load_cathedral_bridge()
	load_tarot_data()
	create_arcana_buttons()

func load_cathedral_bridge():
	var bridge_node = get_node("CathedralBridge")
	if bridge_node:
		cathedral_bridge = bridge_node
		print("Bridge connected - Fusion Ratio: ", cathedral_bridge.calculate_fusion_ratio())

func load_tarot_data():
	if not cathedral_bridge:
		print("ERROR: Cathedral Bridge not found")
		return
	
	var tarot_path = "res://data/TAROT_MASTER_DATASET.json"
	var circuitum_path = "res://data/circuitum99-nodes.json"
	
	if cathedral_bridge.load_tarot_json(tarot_path):
		print("✓ Loaded Tarot Master Dataset")
		print("  Major Arcana Count: ", cathedral_bridge.get_card_count())
	else:
		print("✗ Failed to load Tarot data")
	
	if cathedral_bridge.load_circuitum_json(circuitum_path):
		print("✓ Loaded Circuitum 99 Nodes")
	else:
		print("✗ Failed to load Circuitum data")

func create_arcana_buttons():
	if not cathedral_bridge:
		return
	
	var grid = get_node("ArcanaSelector/ArcanaGrid")
	if not grid:
		return
	
	var card_count = cathedral_bridge.get_card_count()
	
	for i in range(card_count):
		var btn = Button.new()
		var card_name = cathedral_bridge.get_card_name(i)
		var card_freq = cathedral_bridge.get_card_frequency(i)
		var card_color_name = cathedral_bridge.get_card_color(i)
		
		btn.text = "%d. %s\n%d Hz" % [i, card_name, card_freq]
		btn.custom_minimum_size = Vector2(180, 100)
		
		var style = StyleBoxFlat.new()
		style.bg_color = OPENSPEC_COLORS["obsidian_light"]
		style.border_color = OPENSPEC_COLORS["teal"]
		style.border_width_left = 2
		style.border_width_right = 2
		style.border_width_top = 2
		style.border_width_bottom = 2
		style.corner_radius_top_left = 8
		style.corner_radius_top_right = 8
		style.corner_radius_bottom_left = 8
		style.corner_radius_bottom_right = 8
		
		btn.add_theme_stylebox_override("normal", style)
		btn.add_theme_color_override("font_color", OPENSPEC_COLORS["teal"])
		
		btn.pressed.connect(_on_arcana_selected.bind(i))
		
		grid.add_child(btn)
		arcana_buttons.append(btn)
	
	print("Created %d Arcana selection buttons" % card_count)

func _on_arcana_selected(index):
	selected_arcana = index
	var card_name = cathedral_bridge.get_card_name(index)
	var card_freq = cathedral_bridge.get_card_frequency(index)
	var card_merkaba = cathedral_bridge.get_card_merkaba(index)
	
	print("═══════════════════════════════════════")
	print("ARCANA SELECTED: %s" % card_name)
	print("Frequency: %d Hz" % card_freq)
	print("Merkaba Chariot: %s" % card_merkaba)
	print("═══════════════════════════════════════")
	
	highlight_selected_button(index)

func highlight_selected_button(index):
	for i in range(arcana_buttons.size()):
		var btn = arcana_buttons[i]
		var style = StyleBoxFlat.new()
		style.bg_color = OPENSPEC_COLORS["obsidian_light"]
		style.corner_radius_top_left = 8
		style.corner_radius_top_right = 8
		style.corner_radius_bottom_left = 8
		style.corner_radius_bottom_right = 8
		
		if i == index:
			style.border_color = OPENSPEC_COLORS["gold"]
			style.bg_color = Color(OPENSPEC_COLORS["gold"].r, OPENSPEC_COLORS["gold"].g, OPENSPEC_COLORS["gold"].b, 0.2)
			btn.add_theme_color_override("font_color", OPENSPEC_COLORS["gold_highlight"])
		else:
			style.border_color = OPENSPEC_COLORS["teal"]
			btn.add_theme_color_override("font_color", OPENSPEC_COLORS["teal"])
		
		style.border_width_left = 3
		style.border_width_right = 3
		style.border_width_top = 3
		style.border_width_bottom = 3
		
		btn.add_theme_stylebox_override("normal", style)

func _input(event):
	if event is InputEventKey and event.pressed:
		if event.keycode == KEY_ESCAPE:
			get_tree().quit()
