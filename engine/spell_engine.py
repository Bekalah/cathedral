# Cathedral Spell Engine
# Modular spell-scene system with museum-grade integration

import json
import sys
import os
from typing import Dict, Any, List, Optional
from dataclasses import dataclass, field
from pathlib import Path

# Add cathedral packages to path
sys.path.append(os.path.join('.', 'packages', 'museum-sources'))
sys.path.append(os.path.join('.', 'packages', 'cathedral-style'))
sys.path.append(os.path.join('.', 'packages', 'graphs'))

try:
    from museum_sources_engine import MuseumSourcesEngine
    from cathedral_style_engine import CathedralStyleEngine, StyleTier
    from cathedral_graph_navigator import CathedralGraphNavigator
    CATHEDRAL_IMPORTS_AVAILABLE = True
except ImportError:
    CATHEDRAL_IMPORTS_AVAILABLE = False

@dataclass
class SpellResult:
    """Result of casting a spell with full cathedral integration"""
    spell_id: str
    effect: str
    palette: List[str]
    musical_mode: str
    oracle_sentence: str
    npcs: List[Dict[str, Any]]
    intensity: float
    museum_sources: List[str] = field(default_factory=list)
    cathedral_style: str = "elevated"
    three_js_config: Dict[str, Any] = field(default_factory=dict)
    graph_navigation: Optional[Dict[str, Any]] = None
    artifacts_generated: List[str] = field(default_factory=list)

class CathedralSpellEngine:
    """Complete spell engine with cathedral integration"""
    
    def __init__(self, data_path: str = "data/spells", graph_path: str = "packages/graphs"):
        self.data_path = Path(data_path)
        self.graph_path = Path(graph_path)
        
        # Initialize cathedral systems if available
        if CATHEDRAL_IMPORTS_AVAILABLE:
            self.museum_engine = MuseumSourcesEngine()
            self.style_engine = CathedralStyleEngine()
            self.graph_navigator = CathedralGraphNavigator(str(self.graph_path))
            self.graph_navigator.start_session("spell_session")
        else:
            self.museum_engine = None
            self.style_engine = None
            self.graph_navigator = None
        
        # Default game state
        self.player_state = {
            "journal": [],
            "artifacts": [],
            "current_location": "cathedral_entrance",
            "energy_level": 100
        }
        
        self.world_state = {
            "weather": "clear",
            "terrain": "stable",
            "npcs": [
                {"name": "Dee", "emotion": "curious", "location": "scrying_chamber"},
                {"name": "Fortune", "emotion": "protective", "location": "temple_sanctuary"},
                {"name": "Tesla", "emotion": "inventive", "location": "laboratory"},
                {"name": "Hilma", "emotion": "visionary", "location": "art_studio"}
            ]
        }
    
    def load_spell(self, spell_id: str) -> Dict[str, Any]:
        """Load spell configuration from JSON"""
        spell_file = self.data_path / f"{spell_id}.json"
        
        if not spell_file.exists():
            return {"error": f"Spell '{spell_id}' not found"}
        
        with open(spell_file, 'r') as f:
            return json.load(f)
    
    def cast_spell(self, spell_id: str, caster_location: Optional[str] = None) -> SpellResult:
        """Cast a spell with full cathedral integration"""
        
        # Load spell configuration
        spell = self.load_spell(spell_id)
        if "error" in spell:
            return SpellResult(
                spell_id=spell_id,
                effect="failed",
                palette=["#000000"],
                musical_mode="silence",
                oracle_sentence="The spell failed to manifest.",
                npcs=[],
                intensity=0.0
            )
        
        # Basic spell effects
        intensity = spell["parameters"]["intensity"]
        element = spell["element"]
        
        # Apply world modifications
        if element == "fire" and intensity > 0.7:
            self.world_state["weather"] = "storm"
            self.world_state["terrain"] = "cracked"
            
            # NPC reactions based on element and intensity
            for npc in self.world_state["npcs"]:
                if intensity > 0.8:
                    npc["emotion"] = "awe"
                elif intensity > 0.6:
                    npc["emotion"] = "alert"
                else:
                    npc["emotion"] = "curious"
        
        # Add to player journal
        self.player_state["journal"].append(spell["oracle_sentence"])
        
        # Museum integration (if available)
        museum_sources = []
        if self.museum_engine:
            sources = self.museum_engine.get_sources_for_spell(element, spell["archetype"])
            museum_sources = [source.source_id for source in sources[:3]]
        
        # Style elevation (if available)
        cathedral_style = "elevated"
        if self.style_engine:
            style_tier = StyleTier.MUSEUM_GRADE if museum_sources else StyleTier.ELEVATED
            cathedral_style = style_tier.value
        
        # Graph navigation integration (if available)
        graph_navigation = None
        if self.graph_navigator and caster_location:
            # Try to enter the location node in the graph
            try:
                nav_result = self.graph_navigator.enter_node(caster_location)
                if "error" not in nav_result:
                    graph_navigation = {
                        "current_node": nav_result["node_entered"],
                        "intensity": nav_result["intensity"],
                        "oracle": nav_result["oracle_message"],
                        "navigation_options": nav_result["navigation_options"]
                    }
            except:
                pass  # Graph navigation optional
        
        # Generate artifacts
        artifacts = []
        if intensity > 0.7:
            artifacts.append(f"{spell['name']} Sigil")
            if intensity > 0.8:
                artifacts.append(f"{spell['archetype']} Plate")
        
        self.player_state["artifacts"].extend(artifacts)
        
        # Create enhanced spell result
        return SpellResult(
            spell_id=spell_id,
            effect=spell_id,
            palette=spell["parameters"]["color_palette"],
            musical_mode=spell["parameters"]["musical_mode"],
            oracle_sentence=spell["oracle_sentence"],
            npcs=self.world_state["npcs"],
            intensity=intensity,
            museum_sources=museum_sources,
            cathedral_style=cathedral_style,
            three_js_config=spell.get("three_js_config", {}),
            graph_navigation=graph_navigation,
            artifacts_generated=artifacts
        )
    
    def get_available_spells(self) -> List[Dict[str, Any]]:
        """Get list of available spells"""
        spells = []
        
        if not self.data_path.exists():
            return spells
        
        for spell_file in self.data_path.glob("*.json"):
            try:
                with open(spell_file, 'r') as f:
                    spell_data = json.load(f)
                    spells.append({
                        "id": spell_data["id"],
                        "name": spell_data["name"],
                        "element": spell_data["element"],
                        "archetype": spell_data["archetype"],
                        "intensity": spell_data["parameters"]["intensity"],
                        "tags": spell_data["tags"]
                    })
            except:
                continue
        
        return spells
    
    def get_world_state(self) -> Dict[str, Any]:
        """Get current world state"""
        return {
            "world": self.world_state,
            "player": self.player_state,
            "cathedral_status": "operational" if CATHEDRAL_IMPORTS_AVAILABLE else "basic",
            "session_active": self.graph_navigator is not None
        }
    
    def reset_world(self) -> Dict[str, Any]:
        """Reset world state (respawn mechanism)"""
        
        # Reset basic state
        self.world_state["weather"] = "clear"
        self.world_state["terrain"] = "stable"
        
        for npc in self.world_state["npcs"]:
            npc["emotion"] = "peaceful"
        
        # Reset player energy
        self.player_state["energy_level"] = 100
        
        # Trigger graph respawn if available
        respawn_result = None
        if self.graph_navigator:
            try:
                respawn_result = self.graph_navigator.trigger_respawn()
            except:
                pass
        
        return {
            "world_reset": True,
            "respawn_triggered": respawn_result is not None,
            "message": "World state reset. Ready for new adventures.",
            "respawn_data": respawn_result
        }


# FastAPI Integration
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Cathedral Spell Engine API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize spell engine
spell_engine = CathedralSpellEngine()

class SpellCastRequest(BaseModel):
    spell_id: str
    caster_location: Optional[str] = None

@app.get("/api/spells/available")
def get_available_spells():
    """Get list of available spells"""
    return {"spells": spell_engine.get_available_spells()}

@app.post("/api/spells/cast")
def cast_spell_api(request: SpellCastRequest):
    """Cast a spell"""
    result = spell_engine.cast_spell(request.spell_id, request.caster_location)
    
    return {
        "success": True,
        "spell_result": {
            "spell_id": result.spell_id,
            "effect": result.effect,
            "palette": result.palette,
            "musical_mode": result.musical_mode,
            "oracle_sentence": result.oracle_sentence,
            "npcs": result.npcs,
            "intensity": result.intensity,
            "museum_sources": result.museum_sources,
            "cathedral_style": result.cathedral_style,
            "three_js_config": result.three_js_config,
            "graph_navigation": result.graph_navigation,
            "artifacts_generated": result.artifacts_generated
        }
    }

@app.get("/api/spells/cast")
def cast_spell_simple(spell_id: str, caster_location: Optional[str] = None):
    """Simple GET endpoint for spell casting (legacy compatibility)"""
    result = spell_engine.cast_spell(spell_id, caster_location)
    
    return {
        "effect": result.effect,
        "palette": result.palette,
        "musicalMode": result.musical_mode,
        "oracle_sentence": result.oracle_sentence,
        "npcs": result.npcs,
        "intensity": result.intensity,
        "museum_sources": result.museum_sources,
        "three_js_config": result.three_js_config
    }

@app.get("/api/world/state")
def get_world_state():
    """Get current world state"""
    return spell_engine.get_world_state()

@app.post("/api/world/reset")
def reset_world():
    """Reset world state (respawn)"""
    return spell_engine.reset_world()

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "operational",
        "cathedral_integration": CATHEDRAL_IMPORTS_AVAILABLE,
        "available_spells": len(spell_engine.get_available_spells())
    }

if __name__ == "__main__":
    import uvicorn
    print("🏛️ Starting Cathedral Spell Engine...")
    print("✨ Museum integration:", "Available" if CATHEDRAL_IMPORTS_AVAILABLE else "Basic mode")
    print("🔥 Available spells:", len(spell_engine.get_available_spells()))
    uvicorn.run(app, host="0.0.0.0", port=8000)