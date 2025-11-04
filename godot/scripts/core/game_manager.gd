extends Node
## Cathedral Game Manager - Master orchestrator for museum-quality mystical experience
## Manages game state, scene transitions, and coordinates all core systems
##
## Quality Standards:
## - Classical renaissance precision in all interactions
## - Perfect balance and symmetry in state management
## - Trauma-informed design patterns throughout
## - Zero amateur compromises in architecture

class_name GameManager

## Game state enumeration
enum GameState {
	MAIN_MENU,
	CHARACTER_SELECT,
	EXPLORATION,
	DIALOGUE,
	COMBAT,
	TAROT_READING,
	SACRED_GEOMETRY_PUZZLE,
	PAUSE_MENU,
	SETTINGS,
	LOADING
}

## Current game state
var current_state: GameState = GameState.MAIN_MENU

## Player data
var player_data: Dictionary = {
	"selected_arcana": null,  # Current player character
	"companion_arcana": [],    # Party members
	"discovered_nodes": [],    # Codex 144:99 nodes unlocked
	"unlocked_gates": [],      # Fusion gates available
	"stats": {
		"wisdom": 0,
		"courage": 0,
		"compassion": 0,
		"knowledge": 0,
		"experience": 0
	},
	"relationships": {},       # Bonds with each Arcana
	"inventory": [],
	"quest_progress": {},
	"playtime": 0.0
}

## Game settings - trauma-informed defaults
var settings: Dictionary = {
	"graphics": {
		"quality": "high",           # high, medium, low
		"vsync": true,
		"msaa": "2x",                # off, 2x, 4x, 8x
		"shadows": "high",           # high, medium, low, off
		"particles": "high",         # high, medium, low, off
		"motion_blur": false,        # Disabled by default for trauma safety
		"chromatic_aberration": 0.0, # Minimal by default
		"bloom": 0.3,                # Subtle divine glow
		"ambient_occlusion": true
	},
	"audio": {
		"master_volume": 0.8,
		"music_volume": 0.7,
		"sfx_volume": 0.8,
		"voice_volume": 1.0,
		"ambient_volume": 0.6,
		"solfeggio_enabled": true    # Sacred frequencies
	},
	"accessibility": {
		"text_size": 1.0,            # Multiplier
		"text_speed": 1.0,           # Multiplier
		"auto_advance": false,
		"screen_reader": false,
		"high_contrast": false,
		"reduce_motion": false,      # Motion reduction for sensitivity
		"colorblind_mode": "none",   # none, protanopia, deuteranopia, tritanopia
		"subtitles": true,
		"audio_descriptions": false
	},
	"gameplay": {
		"difficulty": "balanced",    # story, balanced, challenging
		"auto_save": true,
		"auto_save_interval": 300.0, # Seconds
		"tutorial_hints": true,
		"combat_speed": 1.0
	}
}

## Scene history for navigation
var scene_history: Array[String] = []

## Performance metrics
var performance_metrics: Dictionary = {
	"fps": 60.0,
	"frame_time": 0.0,
	"memory_usage": 0.0,
	"draw_calls": 0
}

signal state_changed(new_state: GameState)
signal settings_changed(category: String)
signal player_data_updated(key: String)

func _ready() -> void:
	print("🏰 Cathedral Game Manager Initialized")
	print("   Quality Standard: Museum-level classical mastery")
	print("   Design Philosophy: Trauma-informed, neurodivergent-safe")
	
	# Load settings from file
	_load_settings()
	
	# Apply loaded settings
	_apply_all_settings()
	
	# Initialize performance monitoring
	_start_performance_monitoring()

func _process(delta: float) -> void:
	# Update playtime
	if current_state != GameState.MAIN_MENU and current_state != GameState.PAUSE_MENU:
		player_data.playtime += delta
	
	# Update performance metrics
	_update_performance_metrics()

## Change game state with validation and callbacks
func change_state(new_state: GameState) -> void:
	if current_state == new_state:
		return
	
	var old_state := current_state
	current_state = new_state
	
	print("🎭 State transition: %s → %s" % [
		GameState.keys()[old_state],
		GameState.keys()[new_state]
	])
	
	# State-specific logic
	match new_state:
		GameState.PAUSE_MENU:
			_pause_game()
		GameState.LOADING:
			_show_loading_screen()
		_:
			if old_state == GameState.PAUSE_MENU:
				_resume_game()
	
	state_changed.emit(new_state)

## Update game settings with validation
func update_setting(category: String, key: String, value: Variant) -> void:
	if not settings.has(category):
		push_error("Invalid settings category: " + category)
		return
	
	if not settings[category].has(key):
		push_error("Invalid settings key: %s.%s" % [category, key])
		return
	
	settings[category][key] = value
	_apply_setting(category, key, value)
	settings_changed.emit(category)
	
	# Save settings to disk
	_save_settings()

## Apply all settings to the game engine
func _apply_all_settings() -> void:
	# Graphics settings
	var gfx := settings.graphics
	ProjectSettings.set_setting("rendering/quality/shadows/soft_shadow_quality", 
		{"high": 3, "medium": 2, "low": 1, "off": 0}[gfx.shadows])
	
	# Audio settings
	var audio := settings.audio
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), 
		linear_to_db(audio.master_volume))
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Music"), 
		linear_to_db(audio.music_volume))
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("SFX"), 
		linear_to_db(audio.sfx_volume))
	
	# Accessibility settings
	_apply_accessibility_settings()

## Apply individual setting
func _apply_setting(category: String, key: String, value: Variant) -> void:
	match category:
		"graphics":
			_apply_graphics_setting(key, value)
		"audio":
			_apply_audio_setting(key, value)
		"accessibility":
			_apply_accessibility_setting(key, value)
		"gameplay":
			_apply_gameplay_setting(key, value)

func _apply_graphics_setting(key: String, value: Variant) -> void:
	match key:
		"vsync":
			DisplayServer.window_set_vsync_mode(
				DisplayServer.VSYNC_ENABLED if value else DisplayServer.VSYNC_DISABLED
			)
		"quality":
			# Adjust overall quality preset
			match value:
				"high":
					ProjectSettings.set_setting("rendering/quality/filters/sharpen_intensity", 0.2)
				"medium":
					ProjectSettings.set_setting("rendering/quality/filters/sharpen_intensity", 0.1)
				"low":
					ProjectSettings.set_setting("rendering/quality/filters/sharpen_intensity", 0.0)

func _apply_audio_setting(key: String, value: Variant) -> void:
	var bus_names := {
		"master_volume": "Master",
		"music_volume": "Music",
		"sfx_volume": "SFX",
		"voice_volume": "Voice",
		"ambient_volume": "Ambient"
	}
	
	if key in bus_names:
		var bus_idx := AudioServer.get_bus_index(bus_names[key])
		if bus_idx != -1:
			AudioServer.set_bus_volume_db(bus_idx, linear_to_db(value))

func _apply_accessibility_settings() -> void:
	var a11y := settings.accessibility
	
	# Enable/disable screen reader
	DisplayServer.tts_set_enabled(a11y.screen_reader)
	
	# Apply text size globally
	# This would be propagated to UI themes
	
	# Motion reduction affects particle systems and camera
	if a11y.reduce_motion:
		Engine.time_scale = 1.0  # Ensure no unexpected speed changes

func _apply_gameplay_setting(key: String, value: Variant) -> void:
	match key:
		"auto_save":
			if value:
				_start_auto_save()
			else:
				_stop_auto_save()

## Performance monitoring
func _start_performance_monitoring() -> void:
	var timer := Timer.new()
	timer.wait_time = 1.0
	timer.timeout.connect(_update_performance_metrics)
	add_child(timer)
	timer.start()

func _update_performance_metrics() -> void:
	performance_metrics.fps = Engine.get_frames_per_second()
	performance_metrics.frame_time = 1.0 / max(performance_metrics.fps, 1.0)
	performance_metrics.memory_usage = OS.get_static_memory_usage() / 1048576.0  # MB

## Save/Load settings
func _save_settings() -> void:
	var save_path := "user://settings.json"
	var file := FileAccess.open(save_path, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(settings, "\t"))
		file.close()
		print("💾 Settings saved to: " + save_path)

func _load_settings() -> void:
	var save_path := "user://settings.json"
	if not FileAccess.file_exists(save_path):
		print("📝 No saved settings found, using defaults")
		return
	
	var file := FileAccess.open(save_path, FileAccess.READ)
	if file:
		var json := JSON.new()
		var parse_result := json.parse(file.get_as_text())
		file.close()
		
		if parse_result == OK:
			var loaded_settings: Dictionary = json.get_data()
			# Merge loaded settings with defaults (in case new settings were added)
			_merge_dictionaries(settings, loaded_settings)
			print("✅ Settings loaded from: " + save_path)
		else:
			push_error("Failed to parse settings file")

## Merge dictionaries recursively
func _merge_dictionaries(target: Dictionary, source: Dictionary) -> void:
	for key in source:
		if key in target and target[key] is Dictionary and source[key] is Dictionary:
			_merge_dictionaries(target[key], source[key])
		else:
			target[key] = source[key]

## Game state management
func _pause_game() -> void:
	get_tree().paused = true

func _resume_game() -> void:
	get_tree().paused = false

func _show_loading_screen() -> void:
	# Trigger loading screen UI
	pass

## Auto-save functionality
var _auto_save_timer: Timer

func _start_auto_save() -> void:
	if _auto_save_timer:
		return
	
	_auto_save_timer = Timer.new()
	_auto_save_timer.wait_time = settings.gameplay.auto_save_interval
	_auto_save_timer.timeout.connect(_perform_auto_save)
	add_child(_auto_save_timer)
	_auto_save_timer.start()

func _stop_auto_save() -> void:
	if _auto_save_timer:
		_auto_save_timer.queue_free()
		_auto_save_timer = null

func _perform_auto_save() -> void:
	if SaveManager:
		SaveManager.auto_save()
		print("💾 Auto-save completed")
