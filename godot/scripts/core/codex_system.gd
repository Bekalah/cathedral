extends Node
## Codex System - Bridge between TypeScript Codex 144:99 library and Godot
## Sacred mathematics engine connecting nodes, gates, and Arcana
##
## Design: Museum-quality precision in sacred geometry calculations
## Philosophy: Mathematical perfection revealing divine patterns

class_name CodexSystem

## Codex node structure (mirrors TypeScript library)
class CodexNode:
	var id: int
	var value: int
	var category: String
	var arcana_connection: int = -1
	var gates: Array[int] = []
	var sacred_ratios: Array[float] = []
	var discovered: bool = false
	var fusion_count: int = 0
	
	func _init(node_id: int, node_value: int, node_category: String) -> void:
		id = node_id
		value = node_value
		category = node_category

## Gate structure - connections between nodes
class CodexGate:
	var id: int
	var node_a: int
	var node_b: int
	var fusion_type: String
	var unlocked: bool = false
	var unlock_condition: String = ""
	
	func _init(gate_id: int, a: int, b: int, f_type: String) -> void:
		id = gate_id
		node_a = a
		node_b = b
		fusion_type = f_type

## 144 nodes organized by category
const CODEX_CATEGORIES := {
	"SPIRIT": 8,      # Nodes 0-7: Divine essence
	"WISDOM": 22,     # Nodes 8-29: Knowledge paths
	"POWER": 28,      # Nodes 30-57: Energy manifestation
	"HARMONY": 22,    # Nodes 58-79: Balance points
	"SHADOW": 20,     # Nodes 80-99: Infernal depths
	"FUSION": 18,     # Nodes 100-117: Synthesis
	"MYSTERY": 13,    # Nodes 118-130: Hidden knowledge
	"UNITY": 13       # Nodes 131-143: Cosmic integration
}

## All 144 nodes
var nodes: Array[CodexNode] = []

## All 99 gates
var gates: Array[CodexGate] = []

## Arcana to node mappings (22 Major Arcana)
var arcana_nodes: Dictionary = {
	0: [0, 22, 44, 66, 88, 110, 132],    # Fool - New beginnings
	1: [1, 23, 45, 67, 89, 111, 133],    # Magician - Manifestation
	2: [2, 24, 46, 68, 90, 112, 134],    # High Priestess - Intuition
	3: [3, 25, 47, 69, 91, 113, 135],    # Empress - Abundance
	4: [4, 26, 48, 70, 92, 114, 136],    # Emperor - Authority
	5: [5, 27, 49, 71, 93, 115, 137],    # Hierophant - Tradition
	6: [6, 28, 50, 72, 94, 116, 138],    # Lovers - Choice
	7: [7, 29, 51, 73, 95, 117, 139],    # Chariot - Willpower
	8: [8, 30, 52, 74, 96, 118, 140],    # Strength - Courage
	9: [9, 31, 53, 75, 97, 119, 141],    # Hermit - Solitude
	10: [10, 32, 54, 76, 98, 120, 142],  # Wheel - Destiny
	11: [11, 33, 55, 77, 99, 121, 143],  # Justice - Balance
	12: [12, 34, 56, 78, 100, 122],      # Hanged Man - Surrender
	13: [13, 35, 57, 79, 101, 123],      # Death - Transformation
	14: [14, 36, 58, 80, 102, 124],      # Temperance - Alchemy
	15: [15, 37, 59, 81, 103, 125],      # Devil - Bondage
	16: [16, 38, 60, 82, 104, 126],      # Tower - Revelation
	17: [17, 39, 61, 83, 105, 127],      # Star - Hope
	18: [18, 40, 62, 84, 106, 128],      # Moon - Illusion
	19: [19, 41, 63, 85, 107, 129],      # Sun - Vitality
	20: [20, 42, 64, 86, 108, 130],      # Judgement - Rebirth
	21: [21, 43, 65, 87, 109, 131]       # World - Completion
}

## Player progression
var discovered_nodes: Array[int] = []
var unlocked_gates: Array[int] = []
var active_fusions: Array[int] = []

## Sacred constants
const PHI := 1.618033988749895  # Golden ratio
const PI := 3.14159265358979
const SQRT2 := 1.41421356237
const SQRT3 := 1.73205080757
const EULER := 2.71828182846

signal node_discovered(node_id: int)
signal gate_unlocked(gate_id: int)
signal fusion_created(node_a: int, node_b: int, result: int)
signal codex_progress_updated(completion: float)

func _ready() -> void:
	_initialize_codex()
	_generate_gates()
	print("📖 Codex 144:99 System Initialized")
	print("   Total Nodes: %d | Total Gates: %d" % [nodes.size(), gates.size()])
	print("   Sacred Mathematics: φ=%.6f, π=%.6f" % [PHI, PI])

## Initialize all 144 nodes with sacred structure
func _initialize_codex() -> void:
	var node_index := 0
	
	for category in CODEX_CATEGORIES.keys():
		var count: int = CODEX_CATEGORIES[category]
		for i in range(count):
			var node := CodexNode.new(node_index, _calculate_node_value(node_index), category)
			
			# Link nodes to Arcana
			for arcana_id in arcana_nodes.keys():
				if node_index in arcana_nodes[arcana_id]:
					node.arcana_connection = arcana_id
					break
			
			# Calculate sacred ratios
			node.sacred_ratios = _calculate_sacred_ratios(node_index)
			
			nodes.append(node)
			node_index += 1

## Calculate node value using sacred mathematics
func _calculate_node_value(node_id: int) -> int:
	# Use Fibonacci-based progression
	var fib_a := 0
	var fib_b := 1
	
	for i in range(node_id):
		var temp := fib_a + fib_b
		fib_a = fib_b
		fib_b = temp
	
	return (fib_b % 144) + 1  # Keep in range 1-144

## Calculate sacred ratios for node (golden, silver, bronze)
func _calculate_sacred_ratios(node_id: int) -> Array[float]:
	var ratios: Array[float] = []
	
	# Golden ratio relationship
	var phi_ratio := (float(node_id) / 144.0) * PHI
	ratios.append(phi_ratio)
	
	# Silver ratio (√2)
	var silver_ratio := (float(node_id) / 144.0) * SQRT2
	ratios.append(silver_ratio)
	
	# Bronze ratio (√3)
	var bronze_ratio := (float(node_id) / 144.0) * SQRT3
	ratios.append(bronze_ratio)
	
	return ratios

## Generate 99 gates connecting nodes
func _generate_gates() -> void:
	var gate_count := 99
	
	# Primary gates - connect adjacent Arcana nodes
	for arcana_id in range(22):
		var arcana_node_list: Array = arcana_nodes[arcana_id]
		for i in range(arcana_node_list.size() - 1):
			if gates.size() >= gate_count:
				break
			
			var gate := CodexGate.new(
				gates.size(),
				arcana_node_list[i],
				arcana_node_list[i + 1],
				"sequential"
			)
			gates.append(gate)
	
	# Cross-category gates - sacred connections
	var cross_connections := 22  # (99 - 77 sequential) / additional connections
	for i in range(cross_connections):
		if gates.size() >= gate_count:
			break
		
		var node_a := randi() % 144
		var node_b := (node_a + int(PHI * 22)) % 144
		
		if node_a != node_b:
			var gate := CodexGate.new(
				gates.size(),
				node_a,
				node_b,
				"harmonic"
			)
			gates.append(gate)

## Discover a node - unlock sacred knowledge
func discover_node(node_id: int) -> bool:
	if node_id < 0 or node_id >= nodes.size():
		push_error("Invalid node ID: %d" % node_id)
		return false
	
	if node_id in discovered_nodes:
		return false  # Already discovered
	
	discovered_nodes.append(node_id)
	nodes[node_id].discovered = true
	
	print("✨ Node %d discovered: %s (Category: %s)" % [
		node_id,
		nodes[node_id].value,
		nodes[node_id].category
	])
	
	node_discovered.emit(node_id)
	_check_gate_unlocks(node_id)
	_update_progress()
	
	return true

## Check if discovering a node unlocks gates
func _check_gate_unlocks(node_id: int) -> void:
	for gate in gates:
		if gate.unlocked:
			continue
		
		# Check if both nodes are discovered
		if gate.node_a == node_id or gate.node_b == node_id:
			if gate.node_a in discovered_nodes and gate.node_b in discovered_nodes:
				_unlock_gate(gate.id)

## Unlock a fusion gate
func _unlock_gate(gate_id: int) -> bool:
	if gate_id < 0 or gate_id >= gates.size():
		return false
	
	if gate_id in unlocked_gates:
		return false
	
	unlocked_gates.append(gate_id)
	gates[gate_id].unlocked = true
	
	print("🔓 Gate %d unlocked: %d ↔ %d" % [
		gate_id,
		gates[gate_id].node_a,
		gates[gate_id].node_b
	])
	
	gate_unlocked.emit(gate_id)
	_update_progress()
	
	return true

## Create fusion between two nodes
func create_fusion(node_a_id: int, node_b_id: int) -> int:
	# Find gate connecting these nodes
	var connecting_gate: CodexGate = null
	for gate in gates:
		if (gate.node_a == node_a_id and gate.node_b == node_b_id) or \
		   (gate.node_a == node_b_id and gate.node_b == node_a_id):
			connecting_gate = gate
			break
	
	if not connecting_gate:
		push_error("No gate connects nodes %d and %d" % [node_a_id, node_b_id])
		return -1
	
	if not connecting_gate.unlocked:
		push_error("Gate %d is locked" % connecting_gate.id)
		return -1
	
	# Calculate fusion result (sacred mathematics)
	var result_id := _calculate_fusion_result(node_a_id, node_b_id)
	
	nodes[node_a_id].fusion_count += 1
	nodes[node_b_id].fusion_count += 1
	
	if result_id not in active_fusions:
		active_fusions.append(result_id)
	
	print("🔮 Fusion created: %d + %d = %d" % [node_a_id, node_b_id, result_id])
	fusion_created.emit(node_a_id, node_b_id, result_id)
	
	# Discover result node if not already discovered
	discover_node(result_id)
	
	return result_id

## Calculate fusion result using sacred mathematics
func _calculate_fusion_result(node_a: int, node_b: int) -> int:
	# Golden ratio weighted average
	var weight_a := PHI / (PHI + 1.0)
	var weight_b := 1.0 / (PHI + 1.0)
	
	var result := int((float(node_a) * weight_a + float(node_b) * weight_b))
	return clamp(result, 0, 143)

## Get nodes for specific Arcana
func get_arcana_nodes(arcana_id: int) -> Array[CodexNode]:
	var result: Array[CodexNode] = []
	
	if not arcana_id in arcana_nodes:
		return result
	
	for node_id in arcana_nodes[arcana_id]:
		if node_id < nodes.size():
			result.append(nodes[node_id])
	
	return result

## Get discovered nodes for Arcana
func get_arcana_progress(arcana_id: int) -> Dictionary:
	var arcana_node_ids: Array = arcana_nodes.get(arcana_id, [])
	var discovered_count := 0
	
	for node_id in arcana_node_ids:
		if node_id in discovered_nodes:
			discovered_count += 1
	
	return {
		"total": arcana_node_ids.size(),
		"discovered": discovered_count,
		"percentage": (float(discovered_count) / float(arcana_node_ids.size())) * 100.0 if arcana_node_ids.size() > 0 else 0.0
	}

## Get overall codex completion
func get_codex_completion() -> Dictionary:
	return {
		"nodes_total": nodes.size(),
		"nodes_discovered": discovered_nodes.size(),
		"gates_total": gates.size(),
		"gates_unlocked": unlocked_gates.size(),
		"fusions_created": active_fusions.size(),
		"completion_percentage": (float(discovered_nodes.size()) / float(nodes.size())) * 100.0
	}

## Update progress tracking
func _update_progress() -> void:
	var completion := (float(discovered_nodes.size()) / float(nodes.size())) * 100.0
	codex_progress_updated.emit(completion)
	
	# Check for milestones
	if discovered_nodes.size() == 22:
		print("🏆 Milestone: All Arcana root nodes discovered!")
	elif discovered_nodes.size() == 72:
		print("🏆 Milestone: Half the Codex revealed!")
	elif discovered_nodes.size() == 144:
		print("🏆 MASTERY: Complete Codex 144:99 unlocked!")

## Save codex progression
func save_progress() -> Dictionary:
	return {
		"discovered_nodes": discovered_nodes,
		"unlocked_gates": unlocked_gates,
		"active_fusions": active_fusions,
		"node_fusion_counts": _get_fusion_counts()
	}

func _get_fusion_counts() -> Dictionary:
	var counts := {}
	for node in nodes:
		if node.fusion_count > 0:
			counts[node.id] = node.fusion_count
	return counts

## Load codex progression
func load_progress(data: Dictionary) -> void:
	if data.has("discovered_nodes"):
		discovered_nodes = data.discovered_nodes
		for node_id in discovered_nodes:
			if node_id < nodes.size():
				nodes[node_id].discovered = true
	
	if data.has("unlocked_gates"):
		unlocked_gates = data.unlocked_gates
		for gate_id in unlocked_gates:
			if gate_id < gates.size():
				gates[gate_id].unlocked = true
	
	if data.has("active_fusions"):
		active_fusions = data.active_fusions
	
	if data.has("node_fusion_counts"):
		var counts: Dictionary = data.node_fusion_counts
		for node_id_str in counts.keys():
			var node_id := int(node_id_str)
			if node_id < nodes.size():
				nodes[node_id].fusion_count = counts[node_id_str]
	
	print("📖 Codex progress loaded: %d nodes, %d gates" % [
		discovered_nodes.size(),
		unlocked_gates.size()
	])
