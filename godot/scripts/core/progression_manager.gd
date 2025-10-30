extends Node
## Progression Manager - 999 Level System with Daimon Armor + Real Tool Unlocks
## Fable-like RPG progression connected to Trinity App Suite
## Magical Mystery House + Circuitum 99 + Liber Arcanae + Codex Abyssiae

class_name ProgressionManager

## Level system
const MAX_LEVEL := 999  # Godmode cap
const DAIMON_ARMOR_UNLOCK_LEVEL := 777  # Divine/Infernal mastery
const MYSTERY_HOUSE_UNLOCK := 333  # Magical Mystery House access
const CIRCUITUM_ALPHA := 144  # Alpha unlock
const CIRCUITUM_OMEGA := 666  # Omega unlock

## Experience progression (Fibonacci-based curve)
var experience_curve: Array[int] = []

## Player progression state
var current_level: int = 1
var current_experience: int = 0
var total_stat_points: int = 0

## Stat distribution (999 max in each)
var stats: Dictionary = {
	"wisdom": 1,
	"courage": 1,
	"compassion": 1,
	"knowledge": 1,
	"power": 1,
	"balance": 1,
	"mystery": 1,
	"unity": 1
}

## Ability trees (expanded from Codex 144:99)
var unlocked_abilities: Array[String] = []
var ability_levels: Dictionary = {}  # ability_name -> level

## Daimon Armor system
class DaimonArmor:
	var unlocked: bool = false
	var aspect: String = "harmony"  # divine, infernal, harmony
	var enhancement_level: int = 0
	var active_enchantments: Array[String] = []
	var real_world_tools: Array[String] = []
	
	# Armor provides access to Trinity App Suite tools
	var tool_unlocks: Dictionary = {
		"art_replicator": false,      # Traditional art AI tools
		"synthesis_suite": false,     # Professional audio synthesis
		"codex_library": false,       # Full Codex 144:99 + expansions
		"geometry_engine": false,     # Sacred geometry generator
		"tarot_oracle": false,        # Liber Arcanae readings
		"abyssal_grimoire": false,    # Codex Abyssiae dark arts
		"mystery_navigator": false,   # Magical Mystery House explorer
		"circuitum_interface": false, # Alpha et Omega access
		"trinity_architect": false    # Full app suite integration
	}

var daimon_armor: DaimonArmor = DaimonArmor.new()

## Magical Mystery House progression
var mystery_house_rooms_discovered: int = 0
const MYSTERY_HOUSE_TOTAL_ROOMS := 99

## Circuitum 99: Alpha et Omega
var circuitum_alpha_progress: float = 0.0  # 0.0 - 1.0
var circuitum_omega_progress: float = 0.0
var alpha_omega_fusions: Array[int] = []

## Liber Arcanae mastery (22 Major Arcana)
var arcana_mastery: Dictionary = {}  # arcana_id -> mastery_level (0-99)

## Codex Abyssiae (Shadow work / Infernal path)
var abyssal_knowledge: int = 0  # 0-999
var shadow_integrations: Array[String] = []

## Real-world creative tool connections
var trinity_app_connections: Dictionary = {
	"liber_arcanae_tarot": {"unlocked": false, "level": 0},
	"synth_lab": {"unlocked": false, "level": 0},
	"cyoa_book_game": {"unlocked": false, "level": 0},
	"codex_144_99": {"unlocked": false, "level": 0},
	"traditional_art_tools": {"unlocked": false, "level": 0},
	"sacred_geometry_suite": {"unlocked": false, "level": 0}
}

## Milestone unlocks
var milestones: Dictionary = {
	10: "First Ascension - Basic abilities",
	22: "Arcana Awareness - All 22 characters met",
	99: "Century Mark - Mystery House entrance",
	144: "Codex Mastery - Alpha unlocked",
	333: "Mystery House Full Access",
	555: "Quincentuple Mastery",
	666: "Omega Unlocked - Infernal power",
	777: "Daimon Armor - Divine/Infernal fusion",
	888: "Near Godhood - Reality manipulation",
	999: "GODMODE - All tools, all power, all knowledge"
}

signal level_up(new_level: int, stat_points_gained: int)
signal milestone_reached(level: int, milestone: String)
signal ability_unlocked(ability_name: String)
signal daimon_armor_unlocked()
signal tool_unlocked(tool_name: String)
signal experience_gained(amount: int, total: int)

func _ready() -> void:
	_generate_experience_curve()
	_initialize_arcana_mastery()
	print("📊 Progression Manager Initialized")
	print("   Level Cap: 999 (GODMODE)")
	print("   Daimon Armor: Level 777")
	print("   Systems: Mystery House, Circuitum 99, Liber Arcanae, Codex Abyssiae")

## Generate Fibonacci-based experience curve to level 999
func _generate_experience_curve() -> void:
	experience_curve.append(0)  # Level 1
	
	var fib_a := 100
	var fib_b := 162  # Start with golden ratio approximation
	
	for i in range(1, MAX_LEVEL):
		var exp_required := fib_a + fib_b
		experience_curve.append(exp_required)
		
		# Fibonacci progression with scaling for 999 levels
		var temp := fib_a + fib_b
		fib_a = fib_b
		fib_b = temp
		
		# Keep numbers manageable - apply modulo with large prime
		if fib_b > 100000:
			fib_b = fib_b % 99991
			fib_a = fib_a % 99991

## Gain experience and check for level ups
func gain_experience(amount: int) -> void:
	current_experience += amount
	experience_gained.emit(amount, current_experience)
	
	# Check for level up
	while current_level < MAX_LEVEL and current_experience >= _get_exp_for_next_level():
		_level_up()

func _get_exp_for_next_level() -> int:
	if current_level >= MAX_LEVEL:
		return 999999999
	return experience_curve[current_level]

func _level_up() -> void:
	current_level += 1
	
	# Calculate stat points gained (more at higher levels)
	var stat_points_gained := _calculate_stat_points(current_level)
	total_stat_points += stat_points_gained
	
	print("⬆️ LEVEL UP! Now level %d (Stat points: +%d)" % [current_level, stat_points_gained])
	
	# Check for milestone unlocks
	_check_milestone_unlocks()
	
	level_up.emit(current_level, stat_points_gained)

func _calculate_stat_points(level: int) -> int:
	# Base points + bonus for milestone levels
	var base := 5
	
	# Bonus for significant levels
	if level % 100 == 0:
		base += 50
	elif level % 50 == 0:
		base += 25
	elif level % 10 == 0:
		base += 10
	
	# Golden ratio scaling for higher levels
	var scale := 1.0 + (float(level) / MAX_LEVEL) * 0.618
	
	return int(base * scale)

func _check_milestone_unlocks() -> void:
	if current_level in milestones:
		var milestone: String = milestones[current_level]
		print("🏆 MILESTONE: Level %d - %s" % [current_level, milestone])
		milestone_reached.emit(current_level, milestone)
		
		# Trigger specific unlocks
		match current_level:
			99:
				_unlock_mystery_house()
			144:
				_unlock_circuitum_alpha()
			333:
				_unlock_full_mystery_house()
			666:
				_unlock_circuitum_omega()
			777:
				_unlock_daimon_armor()
			999:
				_unlock_godmode()

## Allocate stat points
func allocate_stat(stat_name: String, points: int) -> bool:
	if not stat_name in stats:
		return false
	
	if points > total_stat_points:
		push_error("Not enough stat points (%d available)" % total_stat_points)
		return false
	
	var new_value := stats[stat_name] + points
	if new_value > MAX_LEVEL:
		push_error("Stat cannot exceed %d" % MAX_LEVEL)
		return false
	
	stats[stat_name] = new_value
	total_stat_points -= points
	
	print("📊 %s: %d (+%d)" % [stat_name.capitalize(), stats[stat_name], points])
	return true

## Ability system
func unlock_ability(ability_name: String) -> void:
	if ability_name in unlocked_abilities:
		return
	
	unlocked_abilities.append(ability_name)
	ability_levels[ability_name] = 1
	
	print("✨ Ability unlocked: %s" % ability_name)
	ability_unlocked.emit(ability_name)

func upgrade_ability(ability_name: String) -> bool:
	if not ability_name in ability_levels:
		return false
	
	var current_lvl: int = ability_levels[ability_name]
	if current_lvl >= 99:  # Max ability level
		return false
	
	ability_levels[ability_name] = current_lvl + 1
	print("⬆️ %s → Level %d" % [ability_name, ability_levels[ability_name]])
	return true

## Daimon Armor system
func _unlock_daimon_armor() -> void:
	daimon_armor.unlocked = true
	
	# Unlock all Trinity App Suite tools
	daimon_armor.tool_unlocks.art_replicator = true
	daimon_armor.tool_unlocks.synthesis_suite = true
	daimon_armor.tool_unlocks.codex_library = true
	daimon_armor.tool_unlocks.geometry_engine = true
	daimon_armor.tool_unlocks.tarot_oracle = true
	
	print("⚔️ DAIMON ARMOR UNLOCKED!")
	print("   🎨 Art Replicator - Traditional art AI")
	print("   🎹 Synthesis Suite - Professional audio")
	print("   📖 Codex Library - Full 144:99")
	print("   📐 Geometry Engine - Sacred patterns")
	print("   🔮 Tarot Oracle - Liber Arcanae")
	
	daimon_armor_unlocked.emit()

func enhance_daimon_armor() -> void:
	if not daimon_armor.unlocked:
		return
	
	daimon_armor.enhancement_level += 1
	
	# Higher enhancements unlock more tools
	match daimon_armor.enhancement_level:
		5:
			daimon_armor.tool_unlocks.abyssal_grimoire = true
			_unlock_tool("Codex Abyssiae - Shadow Work")
		10:
			daimon_armor.tool_unlocks.mystery_navigator = true
			_unlock_tool("Mystery House Navigator")
		15:
			daimon_armor.tool_unlocks.circuitum_interface = true
			_unlock_tool("Circuitum 99 Interface")
		20:
			daimon_armor.tool_unlocks.trinity_architect = true
			_unlock_tool("Trinity Architect - Full Suite")

func _unlock_tool(tool_name: String) -> void:
	print("🔓 TOOL UNLOCKED: %s" % tool_name)
	tool_unlocked.emit(tool_name)

## Magical Mystery House
func _unlock_mystery_house() -> void:
	print("🏠 MAGICAL MYSTERY HOUSE: Entrance Unlocked")
	print("   99 rooms of esoteric knowledge await")

func _unlock_full_mystery_house() -> void:
	print("🏠 MYSTERY HOUSE: Full Access Granted")
	print("   All 99 rooms now accessible")

func discover_mystery_room(room_id: int) -> void:
	mystery_house_rooms_discovered += 1
	print("🚪 Mystery Room %d discovered (%d/%d)" % [
		room_id,
		mystery_house_rooms_discovered,
		MYSTERY_HOUSE_TOTAL_ROOMS
	])

## Circuitum 99: Alpha et Omega
func _unlock_circuitum_alpha() -> void:
	print("⭕ CIRCUITUM ALPHA UNLOCKED")
	print("   Beginning of eternal cycle")

func _unlock_circuitum_omega() -> void:
	print("⭕ CIRCUITUM OMEGA UNLOCKED")
	print("   End and rebirth - Infernal power")

func progress_circuitum(is_alpha: bool, amount: float) -> void:
	if is_alpha:
		circuitum_alpha_progress = clamp(circuitum_alpha_progress + amount, 0.0, 1.0)
		if circuitum_alpha_progress >= 1.0:
			print("⭕ ALPHA COMPLETE - Fusion with Omega available")
	else:
		circuitum_omega_progress = clamp(circuitum_omega_progress + amount, 0.0, 1.0)
		if circuitum_omega_progress >= 1.0:
			print("⭕ OMEGA COMPLETE - Eternal cycle mastered")

## Liber Arcanae mastery
func _initialize_arcana_mastery() -> void:
	for i in range(22):
		arcana_mastery[i] = 0

func gain_arcana_mastery(arcana_id: int, amount: int) -> void:
	if not arcana_id in arcana_mastery:
		return
	
	arcana_mastery[arcana_id] = clamp(arcana_mastery[arcana_id] + amount, 0, 99)
	
	if arcana_mastery[arcana_id] == 99:
		print("🔮 ARCANA MASTERY: %s - COMPLETE" % ArcanaRegistry.ARCANA_DATA[arcana_id].name)

## Codex Abyssiae (Shadow work)
func gain_abyssal_knowledge(amount: int) -> void:
	abyssal_knowledge = clamp(abyssal_knowledge + amount, 0, MAX_LEVEL)
	
	if abyssal_knowledge >= 666 and not daimon_armor.tool_unlocks.abyssal_grimoire:
		daimon_armor.tool_unlocks.abyssal_grimoire = true
		print("📕 CODEX ABYSSIAE: Full access granted")

func integrate_shadow(shadow_name: String) -> void:
	if shadow_name in shadow_integrations:
		return
	
	shadow_integrations.append(shadow_name)
	print("🌑 Shadow integrated: %s" % shadow_name)

## Trinity App Suite connections
func unlock_trinity_app(app_name: String) -> void:
	if not app_name in trinity_app_connections:
		return
	
	trinity_app_connections[app_name].unlocked = true
	print("🔗 Trinity App Connected: %s" % app_name)

func upgrade_trinity_app(app_name: String) -> void:
	if not app_name in trinity_app_connections:
		return
	
	if not trinity_app_connections[app_name].unlocked:
		return
	
	trinity_app_connections[app_name].level += 1
	print("⬆️ %s → Level %d" % [app_name, trinity_app_connections[app_name].level])

## Godmode unlock (Level 999)
func _unlock_godmode() -> void:
	print("")
	print("═══════════════════════════════════════")
	print("    ⚡ GODMODE ACHIEVED - LEVEL 999 ⚡")
	print("═══════════════════════════════════════")
	print("")
	print("🏆 ALL SYSTEMS UNLOCKED:")
	print("   ⚔️  Daimon Armor - Maximum enhancement")
	print("   🏠 Magical Mystery House - Complete")
	print("   ⭕ Circuitum 99 - Alpha & Omega mastery")
	print("   🔮 Liber Arcanae - All 22 Arcana")
	print("   📕 Codex Abyssiae - Shadow integration")
	print("   📖 Codex 144:99 - Complete knowledge")
	print("")
	print("🎨 TRINITY APP SUITE - FULL ACCESS:")
	print("   • Traditional Art Replicator")
	print("   • Professional Audio Synthesis")
	print("   • Sacred Geometry Generator")
	print("   • Tarot Oracle System")
	print("   • CYOA Book Game Engine")
	print("   • Complete Tool Library")
	print("")
	print("⚡ REALITY MANIPULATION ENABLED")
	print("═══════════════════════════════════════")
	
	# Unlock everything
	for tool_key in daimon_armor.tool_unlocks.keys():
		daimon_armor.tool_unlocks[tool_key] = true
	
	for app_name in trinity_app_connections.keys():
		trinity_app_connections[app_name].unlocked = true
		trinity_app_connections[app_name].level = 99

## Get progression summary
func get_progression_summary() -> Dictionary:
	return {
		"level": current_level,
		"experience": current_experience,
		"next_level_exp": _get_exp_for_next_level(),
		"stat_points_available": total_stat_points,
		"stats": stats.duplicate(),
		"abilities_unlocked": unlocked_abilities.size(),
		"daimon_armor_unlocked": daimon_armor.unlocked,
		"mystery_house_rooms": mystery_house_rooms_discovered,
		"circuitum_alpha": circuitum_alpha_progress,
		"circuitum_omega": circuitum_omega_progress,
		"abyssal_knowledge": abyssal_knowledge,
		"godmode": current_level >= MAX_LEVEL
	}

## Save progression
func save_progression() -> Dictionary:
	return {
		"level": current_level,
		"experience": current_experience,
		"stats": stats.duplicate(),
		"total_stat_points": total_stat_points,
		"unlocked_abilities": unlocked_abilities.duplicate(),
		"ability_levels": ability_levels.duplicate(),
		"daimon_armor": {
			"unlocked": daimon_armor.unlocked,
			"aspect": daimon_armor.aspect,
			"enhancement_level": daimon_armor.enhancement_level,
			"tool_unlocks": daimon_armor.tool_unlocks.duplicate()
		},
		"mystery_house_rooms": mystery_house_rooms_discovered,
		"circuitum_alpha": circuitum_alpha_progress,
		"circuitum_omega": circuitum_omega_progress,
		"arcana_mastery": arcana_mastery.duplicate(),
		"abyssal_knowledge": abyssal_knowledge,
		"shadow_integrations": shadow_integrations.duplicate(),
		"trinity_apps": trinity_app_connections.duplicate(true)
	}

## Load progression
func load_progression(data: Dictionary) -> void:
	current_level = data.get("level", 1)
	current_experience = data.get("experience", 0)
	stats = data.get("stats", stats).duplicate()
	total_stat_points = data.get("total_stat_points", 0)
	unlocked_abilities = data.get("unlocked_abilities", []).duplicate()
	ability_levels = data.get("ability_levels", {}).duplicate()
	
	if data.has("daimon_armor"):
		var armor_data: Dictionary = data.daimon_armor
		daimon_armor.unlocked = armor_data.get("unlocked", false)
		daimon_armor.aspect = armor_data.get("aspect", "harmony")
		daimon_armor.enhancement_level = armor_data.get("enhancement_level", 0)
		daimon_armor.tool_unlocks = armor_data.get("tool_unlocks", {}).duplicate()
	
	mystery_house_rooms_discovered = data.get("mystery_house_rooms", 0)
	circuitum_alpha_progress = data.get("circuitum_alpha", 0.0)
	circuitum_omega_progress = data.get("circuitum_omega", 0.0)
	arcana_mastery = data.get("arcana_mastery", {}).duplicate()
	abyssal_knowledge = data.get("abyssal_knowledge", 0)
	shadow_integrations = data.get("shadow_integrations", []).duplicate()
	trinity_app_connections = data.get("trinity_apps", trinity_app_connections).duplicate(true)
	
	print("📊 Progression loaded: Level %d (%s)" % [
		current_level,
		"GODMODE" if current_level >= MAX_LEVEL else "In Progress"
	])
