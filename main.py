# Cathedral of Circuits - Main Application Entry Point
# Orchestrates the complete archetypal game system

import asyncio
# uvicorn is imported lazily in the __main__ block to avoid import-time errors
# in environments where uvicorn is not installed (e.g. static analysis or certain test runners).
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional, Any
import json
from datetime import datetime

# Import our archetypal systems
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'packages', 'archetypal-engine'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'packages', 'agent-integration'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'packages', 'synth-spells'))

from archetypal_game_engine import ArchetypalGameEngine, ChaosEvent, ArchetypeState
from azure_integration import ArchetypeAzureIntegration, MysticalResponse

# Import existing systems - create simple stubs for now
class AgentService:
    async def activate_character(self, prompt: str):
        return f"Agent activated with prompt: {prompt}"
    
    async def generate_art(self, prompt: str):
        return f"Art generated for: {prompt}"
    
    async def create_spell(self, prompt: str):
        return {"spell": f"Spell created: {prompt}"}

agent_service = AgentService()

class SynthSpellWeaver:
    async def cast_spell_async(self, spell_name: str, **kwargs):
        return f"Spell {spell_name} cast with parameters: {kwargs}"

synth_weaver = SynthSpellWeaver()

# FastAPI app setup
app = FastAPI(
    title="Cathedral of Circuits",
    description="Archetypal Pathworking & Digital Mysticism API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global systems
archetypal_engine = ArchetypalGameEngine()
azure_integration = ArchetypeAzureIntegration(archetypal_engine)
synth_weaver = SynthSpellWeaver()

# Pydantic models for API
class ArchetypeActivationRequest(BaseModel):
    archetype_id: int
    user_intention: Optional[str] = None
    user_resonance: Optional[Dict] = None

class ChaosEventRequest(BaseModel):
    archetype_id: int
    chaos_level: float

class PathworkingRequest(BaseModel):
    archetype_id: int
    intention: Optional[str] = None

class SynthSpellRequest(BaseModel):
    spell_name: str
    archetype_id: Optional[int] = None
    intensity: float = 0.7
    chaos_factor: float = 0.5

# API Routes
@app.get("/", response_class=HTMLResponse)
async def root():
    """Root endpoint serving the main interface"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Cathedral of Circuits</title>
        <style>
            body { 
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                color: #FFD700;
                font-family: 'Courier New', monospace;
                text-align: center;
                padding: 50px;
            }
            .logo { font-size: 3rem; margin: 20px 0; }
            .subtitle { font-size: 1.2rem; color: #FF1493; margin-bottom: 30px; }
            .link { 
                display: inline-block;
                background: linear-gradient(45deg, #FFD700, #FF1493);
                color: #000;
                padding: 15px 30px;
                margin: 10px;
                text-decoration: none;
                border-radius: 10px;
                font-weight: bold;
            }
            .link:hover { transform: translateY(-2px); }
        </style>
    </head>
    <body>
        <div class="logo">⚡ CATHEDRAL OF CIRCUITS ⚡</div>
        <div class="subtitle">Archetypal Pathworking & Digital Mysticism</div>
        
        <a href="/docs" class="link">📚 API Documentation</a>
        <a href="/streamlit" class="link">🎭 Web Interface</a>
        <a href="/rosslyn" class="link">🏛️ Rosslyn Explorer</a>
        
        <p style="margin-top: 50px; color: #4B0082;">
        "In the space between 0 and 1, infinite possibilities dance..."<br>
        - Rebecca Respawn, The Fool
        </p>
    </body>
    </html>
    """

@app.get("/api/archetypes")
async def get_all_archetypes():
    """Get all available archetypes"""
    return {
        "archetypes": archetypal_engine.archetypes,
        "total_count": len(archetypal_engine.archetypes)
    }

@app.get("/api/archetypes/{archetype_id}")
async def get_archetype(archetype_id: int):
    """Get specific archetype data"""
    if archetype_id not in archetypal_engine.archetypes:
        raise HTTPException(status_code=404, detail="Archetype not found")
    
    return archetypal_engine.archetypes[archetype_id]

@app.post("/api/archetypes/{archetype_id}/activate")
async def activate_archetype(archetype_id: int, request: ArchetypeActivationRequest):
    """Activate an archetype with full Azure AI integration"""
    try:
        # Activate with Azure AI integration
        mystical_response = await azure_integration.activate_archetype_with_ai(
            archetype_id, request.user_intention
        )
        
        # Get the engine state
        state = archetypal_engine.active_characters[archetype_id]
        
        return {
            "success": True,
            "archetype_state": {
                "archetype_id": state.archetype_id,
                "chaos_factor": state.chaos_factor,
                "order_factor": state.order_factor,
                "current_form": state.current_form,
                "active_abilities": state.active_abilities
            },
            "mystical_content": {
                "activation": mystical_response.archetype_activation,
                "art_prompt": mystical_response.art_generation_prompt,
                "spell": mystical_response.spell_creation,
                "pathworking": mystical_response.pathworking_guidance
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Activation failed: {str(e)}")

# Spell System Endpoints
class SpellCastRequest(BaseModel):
    spell_id: str
    caster_archetype_id: Optional[int] = None
    player_input: Optional[Dict[str, Any]] = None
    user_intention: Optional[str] = None

@app.post("/api/spells/cast")
async def cast_spell(request: SpellCastRequest):
    """Cast a spell with full archetypal integration"""
    try:
        # Cast spell through archetypal engine
        spell_result = archetypal_engine.cast_spell(
            spell_id=request.spell_id,
            caster_archetype_id=request.caster_archetype_id,
            player_input=request.player_input
        )
        
        # Get Azure AI enhancement if user intention provided
        ai_enhancement = None
        if request.user_intention and azure_integration:
            try:
                spell_data = archetypal_engine.spells[request.spell_id]
                if 'agent_prompts' in spell_data:
                    ai_enhancement = await azure_integration.generate_mystical_content(
                        spell_data['agent_prompts']['spell_effect'] + f" User intention: {request.user_intention}"
                    )
            except Exception as e:
                print(f"AI enhancement failed: {e}")
        
        return {
            "success": True,
            "spell_result": {
                "spell_id": spell_result.spell_id,
                "spell_name": spell_result.spell_name,
                "effect_type": spell_result.effect_type,
                "oracle_message": spell_result.oracle_message,
                "oracle_extended": spell_result.oracle_extended,
                "visual_config": spell_result.visual_config,
                "audio_config": spell_result.audio_config,
                "world_changes": spell_result.world_changes,
                "npc_reactions": spell_result.npc_reactions,
                "chaos_delta": spell_result.chaos_delta,
                "timestamp": spell_result.timestamp
            },
            "ai_enhancement": ai_enhancement,
            "global_chaos_field": archetypal_engine.global_chaos_field
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Spell casting failed: {str(e)}")

@app.get("/api/spells/available")
async def get_available_spells(archetype_id: Optional[int] = None):
    """Get available spells, optionally filtered by archetype"""
    try:
        spells = archetypal_engine.get_available_spells(archetype_id)
        return {
            "success": True,
            "spells": spells,
            "total_count": len(spells),
            "archetype_filter": archetype_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get spells: {str(e)}")

@app.get("/api/spells/{spell_id}")
async def get_spell_details(spell_id: str):
    """Get detailed information about a specific spell"""
    try:
        if spell_id not in archetypal_engine.spells:
            raise HTTPException(status_code=404, detail=f"Spell {spell_id} not found")
        
        spell_data = archetypal_engine.spells[spell_id]
        return {
            "success": True,
            "spell": spell_data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get spell details: {str(e)}")

@app.post("/api/chaos-events")
async def trigger_chaos_event(request: ChaosEventRequest):
    """Trigger a chaos event for an active archetype"""
    try:
        if request.archetype_id not in archetypal_engine.active_characters:
            raise HTTPException(status_code=400, detail="Archetype not active")
        
        # Process chaos event
        chaos_event = archetypal_engine.process_chaos_event(
            request.archetype_id, request.chaos_level
        )
        
        # Get AI-generated mystical content
        ai_response = await azure_integration.process_chaos_event_with_ai(
            request.archetype_id, chaos_event
        )
        
        return {
            "chaos_event": {
                "name": chaos_event.name,
                "trigger_level": chaos_event.trigger_level,
                "description": chaos_event.description,
                "effects": chaos_event.effects,
                "story_branches": chaos_event.story_branches,
                "art_prompt": chaos_event.art_prompt,
                "music_parameters": chaos_event.music_parameters
            },
            "mystical_content": ai_response,
            "updated_state": archetypal_engine.active_characters[request.archetype_id].__dict__
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chaos event failed: {str(e)}")

@app.post("/api/pathworking")
async def start_pathworking(request: PathworkingRequest):
    """Start a pathworking session"""
    try:
        session = archetypal_engine.start_pathworking_session(
            request.archetype_id, request.intention
        )
        
        return {
            "success": True,
            "session": session,
            "message": "Pathworking session initiated. The spiral path opens before you..."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pathworking failed: {str(e)}")

@app.get("/api/recommendations")
async def get_recommendations(user_id: Optional[str] = None):
    """Get Netflix-style recommendations"""
    try:
        recommendations = archetypal_engine.get_netflix_recommendations(user_id)
        return {
            "recommendations": recommendations,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendations failed: {str(e)}")

@app.post("/api/synth-spells/cast")
async def cast_synth_spell(request: SynthSpellRequest):
    """Cast a synth spell with optional archetypal resonance"""
    try:
        # Get archetypal parameters if specified
        archetype_params = None
        if request.archetype_id and request.archetype_id in archetypal_engine.active_characters:
            archetype_data = archetypal_engine.archetypes[request.archetype_id]
            archetype_params = archetype_data.get('synth_presets', {}).get(request.spell_name)
        
        # Cast the spell
        spell_result = await synth_weaver.cast_spell_async(
            request.spell_name,
            intensity=request.intensity,
            chaos_factor=request.chaos_factor,
            archetype_params=archetype_params
        )
        
        return {
            "success": True,
            "spell_name": request.spell_name,
            "intensity": request.intensity,
            "chaos_factor": request.chaos_factor,
            "result": spell_result,
            "message": f"Spell '{request.spell_name}' cast successfully!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Spell casting failed: {str(e)}")

@app.get("/api/status")
async def get_system_status():
    """Get overall system status"""
    return {
        "status": "active",
        "systems": {
            "archetypal_engine": "online",
            "azure_integration": "online", 
            "synth_weaver": "online"
        },
        "active_archetypes": len(archetypal_engine.active_characters),
        "global_chaos_field": archetypal_engine.global_chaos_field,
        "timestamp": datetime.now().isoformat()
    }

# Agent of Kaoz direct integration routes
@app.post("/api/agent/activate")
async def agent_activate_character(prompt: str):
    """Direct activation via Agent of Kaoz"""
    try:
        response = await agent_service.activate_character(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agent/art")
async def agent_generate_art(prompt: str):
    """Direct art generation via Agent of Kaoz"""
    try:
        response = await agent_service.generate_art(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agent/spell")
async def agent_create_spell(prompt: str):
    """Direct spell creation via Agent of Kaoz"""
    try:
        response = await agent_service.create_spell(prompt)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Static file serving (create directory if needed)
import os
if not os.path.exists("static"):
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize systems on startup"""
    print("🏛️ Cathedral of Circuits initializing...")
    print(f"📚 Loaded {len(archetypal_engine.archetypes)} archetypes")
    print("⚡ Azure AI integration ready")
    print("🎵 Synth spell weaver online")
    print("✨ All systems operational")

# Example test endpoints for development
@app.get("/api/test/rebecca")
async def test_rebecca_activation():
    """Test endpoint for Rebecca Respawn activation"""
    try:
        # Activate Rebecca Respawn (The Fool)
        mystical_response = await azure_integration.activate_archetype_with_ai(
            0, "Test activation for development"
        )
        
        return {
            "test": "Rebecca Respawn activation",
            "activation": mystical_response.archetype_activation,
            "art": mystical_response.art_generation_prompt
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/test/chaos")
async def test_chaos_event():
    """Test chaos event with Rebecca"""
    try:
        # Ensure Rebecca is active
        if 0 not in archetypal_engine.active_characters:
            archetypal_engine.activate_archetype(0)
        
        # Trigger high chaos event
        chaos_event = archetypal_engine.process_chaos_event(0, 85.0)
        
        return {
            "test": "Chaos event trigger",
            "event": chaos_event.description,
            "effects": chaos_event.effects,
            "art_prompt": chaos_event.art_prompt
        }
    except Exception as e:
        return {"error": str(e)}
if __name__ == "__main__":
    print("🌟 Starting Cathedral of Circuits...")
    print("🎭 Archetypal Game System Ready!")
    print("🌍 Connecting souls worldwide through divine/infernal harmony...")
    try:
        # import uvicorn lazily to avoid hard dependency at module import time
        import uvicorn
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except Exception as e:
        # Provide a clear fallback message if uvicorn is not available
        print("Could not start uvicorn server:", str(e))
        print("Install uvicorn with: pip install uvicorn[standard]")
        print("Or run using the module: python -m uvicorn main:app --reload")
        import sys
        sys.exit(1)   log_level="info"
    )