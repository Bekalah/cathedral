# 🔐 Modular Node Safety System
# Ensures fractal toggling never breaks connections

# Repository dependency mapping
repository_dependencies = {
    "cathedral": {
        "critical_dependencies": [],  # Hub - no dependencies
        "optional_connections": ["circuitum99", "tesseract-bridge"],
        "safe_to_toggle_alone": True,
        "fallback_mode": "minimal_hub"
    },
    
    "circuitum99": {
        "critical_dependencies": ["cathedral"],  # Needs hub
        "optional_connections": ["liber-arcanae", "stone-grimoire"],
        "safe_to_toggle_alone": False,
        "fallback_mode": "standalone_codex"
    },
    
    "tesseract-bridge": {
        "critical_dependencies": ["cathedral"],
        "optional_connections": ["ALL"],  # Connector to everything
        "safe_to_toggle_alone": False, 
        "fallback_mode": "bridge_minimal"
    },
    
    "liber-arcanae": {
        "critical_dependencies": ["circuitum99"],  # Needs soul/codex
        "optional_connections": ["mystery-house", "cosmogenesis"],
        "safe_to_toggle_alone": False,
        "fallback_mode": "static_tarot"
    },
    
    "stone-grimoire": {
        "critical_dependencies": [],  # Foundation - independent
        "optional_connections": ["cathedral", "circuitum99"],
        "safe_to_toggle_alone": True,
        "fallback_mode": "geometric_only"
    },
    
    "cosmogenesis": {
        "critical_dependencies": ["cathedral"],
        "optional_connections": ["mystery-house", "liber-arcanae"],
        "safe_to_toggle_alone": False,
        "fallback_mode": "learning_engine_basic"
    },
    
    "mystery-house": {
        "critical_dependencies": ["cosmogenesis"],  # Needs learning engine
        "optional_connections": ["liber-arcanae", "tesseract-bridge"],
        "safe_to_toggle_alone": False,
        "fallback_mode": "static_rooms"
    },
    
    "luxcrux": {
        "critical_dependencies": [],  # Compassion base - independent
        "optional_connections": ["cathedral", "liber-arcanae"],
        "safe_to_toggle_alone": True,
        "fallback_mode": "heart_center_only"
    }
}

# Node connection integrity checker
def check_toggle_safety(proposed_toggle_state):
    """
    Validates that proposed repository toggle won't break critical connections
    Returns: (safe: bool, warnings: list, required_fallbacks: list)
    """
    active_repos = set(proposed_toggle_state)
    warnings = []
    required_fallbacks = []
    
    for repo, config in repository_dependencies.items():
        if repo in active_repos:
            # Check if critical dependencies are met
            for dep in config["critical_dependencies"]:
                if dep != "ALL" and dep not in active_repos:
                    warnings.append(f"⚠️ {repo} needs {dep} but it's not active")
                    if not config["safe_to_toggle_alone"]:
                        required_fallbacks.append(f"{repo} -> {config['fallback_mode']}")
    
    is_safe = len([w for w in warnings if "needs" in w]) == 0
    return is_safe, warnings, required_fallbacks

# Fractal depth safety limits
fractal_safety_limits = {
    "max_depth": 7,  # Beyond this, UI becomes unusable
    "performance_warning_depth": 5,
    "auto_simplify_depth": 6,  # Start reducing detail
    "emergency_fallback_depth": 8  # Force reset if exceeded
}

# Connection health monitoring
connection_health_thresholds = {
    "strong": 0.8,      # 🟢 Green
    "moderate": 0.6,    # 🟡 Yellow  
    "weak": 0.4,        # 🟠 Orange
    "critical": 0.2,    # 🔴 Red
    "broken": 0.0       # ❌ Broken
}

# Piano key chord combinations (safe combinations)
safe_chord_combinations = {
    # Solo keys (always safe)
    "cathedral_solo": ["cathedral"],
    "foundation_solo": ["stone-grimoire"],
    "heart_solo": ["luxcrux"],
    
    # Basic chords
    "core_triad": ["cathedral", "circuitum99", "tesseract-bridge"],
    "creative_triad": ["circuitum99", "liber-arcanae", "mystery-house"],
    "learning_triad": ["cathedral", "cosmogenesis", "mystery-house"],
    
    # Complex chords  
    "full_orchestra": ["cathedral", "circuitum99", "tesseract-bridge", 
                      "liber-arcanae", "cosmogenesis", "mystery-house"],
    
    # Specialized combinations
    "art_focus": ["cathedral", "circuitum99", "stone-grimoire", "liber-arcanae"],
    "science_focus": ["cathedral", "stone-grimoire", "cosmogenesis"],
    "fusion_focus": ["cathedral", "tesseract-bridge", "cosmogenesis", "mystery-house"]
}

# Upside Down portal safety
upside_down_portal_rules = {
    "max_simultaneous_portals": 3,  # Don't overload the user
    "portal_cooldown_ms": 2000,     # 2 second cooldown between portals
    "reality_anchor_required": "cathedral",  # Always keep cathedral as anchor
    "emergency_exit_key": "Escape",  # Always available exit
    "portal_depth_limit": 3         # Max nested portal depth
}

# Auto-backup before dangerous operations
auto_backup_triggers = [
    "fractal_depth_change > 5",
    "toggle_complex_chord",
    "upside_down_portal_activate", 
    "connection_health < 0.4",
    "emergency_fallback_activated"
]

# System recovery protocols  
recovery_protocols = {
    "gentle_reset": {
        "action": "fade_to_cathedral_hub",
        "duration_ms": 3000,
        "preserve_state": True
    },
    
    "emergency_reset": {
        "action": "immediate_cathedral_only",
        "duration_ms": 500,
        "preserve_state": False,
        "show_warning": True
    },
    
    "connection_repair": {
        "action": "rebuild_broken_connections", 
        "duration_ms": 5000,
        "show_progress": True
    }
}