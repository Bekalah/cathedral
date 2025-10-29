# Hall of Shadows - Trauma, Daimon Archives, Error-Kept Logs
# The southern wing of the Library of Alexandria Restored

import json
import hashlib
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timezone

class ShadowType(Enum):
    """Types of shadow content archived in the Hall"""
    TRAUMA_LOG = "trauma_log"
    DAEMON_RECORD = "daemon_record"
    ERROR_PATTERN = "error_pattern"
    SHADOW_EGREGORE = "shadow_egregore"
    INTEGRATION_WORK = "integration_work"
    HEALING_JOURNEY = "healing_journey"
    PSYCHOPOMP_GUIDANCE = "psychopomp_guidance"

class ProcessingStage(Enum):
    """Stages of shadow integration process"""
    ACKNOWLEDGMENT = "acknowledgment"
    WITNESSING = "witnessing"
    COMPASSIONATE_HOLDING = "compassionate_holding"
    UNDERSTANDING = "understanding"
    INTEGRATION = "integration"
    TRANSFORMATION = "transformation"
    WISDOM_EXTRACTION = "wisdom_extraction"

@dataclass
class ShadowRecord:
    """A record in the shadow archives - acknowledged, not erased"""
    record_id: str
    shadow_type: ShadowType
    title: str
    content: str
    timestamp: str
    processing_stage: ProcessingStage
    integration_notes: List[str] = field(default_factory=list)
    daemon_correspondences: List[str] = field(default_factory=list)
    healing_protocols: List[str] = field(default_factory=list)
    wisdom_extracted: Optional[str] = None
    guardian_blessing: Optional[str] = None
    is_archived: bool = False
    is_integrated: bool = False

@dataclass
class DaemonCorrespondence:
    """Daimonic entities and their correspondences for shadow work"""
    daemon_name: str
    domain: str
    shadow_specialty: str
    invocation_approach: str
    protective_measures: List[str] = field(default_factory=list)
    integration_gifts: List[str] = field(default_factory=list)
    traditional_offerings: List[str] = field(default_factory=list)
    safety_protocols: List[str] = field(default_factory=list)

@dataclass
class ErrorPattern:
    """Computational and life error patterns for learning"""
    pattern_id: str
    error_type: str
    description: str
    frequency: int
    contexts: List[str] = field(default_factory=list)
    lessons_learned: List[str] = field(default_factory=list)
    prevention_strategies: List[str] = field(default_factory=list)
    transformation_potential: str = ""

class HallOfShadows:
    """The trauma and shadow integration wing - southern hall of the Library"""
    
    def __init__(self):
        self.shadow_records = {}
        self.daemon_correspondences = self.load_daemon_correspondences()
        self.error_patterns = {}
        self.healing_protocols = self.initialize_healing_protocols()
        self.psychopomp_guides = self.load_psychopomp_guides()
        self.integration_tools = self.initialize_integration_tools()
        self.guardian_spirits = ["Azrael", "Hecate", "The Morrigan"]
        
    def load_daemon_correspondences(self) -> Dict[str, DaemonCorrespondence]:
        """Load the daimonic correspondences for shadow work"""
        correspondences = {}
        
        # Traditional Goetic daimons with shadow work specialties
        daemon_data = [
            ("Bael", "Leadership & Authority", "Power Shadow Integration", 
             "Respectful approach with clear boundaries",
             ["Protection circle", "Clear intentions", "Time limits"],
             ["Authentic leadership", "Balanced authority", "Sovereign power"],
             ["Quality incense", "Written contracts", "Artistic offerings"]),
            
            ("Paimon", "Knowledge & Teaching", "Intellectual Pride & Isolation",
             "Academic respect with humility practice",
             ["Scholarly protection", "Peer witnesses", "Grounding exercises"],
             ["Humble wisdom", "Connected teaching", "Accessible knowledge"],
             ["Books", "Teaching materials", "Knowledge sharing"]),
            
            ("Beleth", "Love & Relationships", "Attachment & Relationship Patterns",
             "Heart-centered approach with courage",
             ["Heart protection", "Boundary setting", "Self-love practices"],
             ["Healthy attachment", "Authentic relating", "Compassionate boundaries"],
             ["Rose petals", "Love poetry", "Relationship healing"]),
            
            ("Asmodeus", "Passion & Sexuality", "Shame & Sexual Shadow",
             "Body-positive approach with sacred sexuality",
             ["Sacred space", "Body blessing", "Shame transformation"],
             ["Sacred sexuality", "Body wisdom", "Pleasure without shame"],
             ["Sensual foods", "Sacred oils", "Beauty offerings"]),
            
            ("Belphegor", "Sloth & Resistance", "Procrastination & Avoidance",
             "Gentle accountability with self-compassion",
             ["Energy protection", "Motivation practices", "Small steps"],
             ["Sustainable action", "Gentle productivity", "Rest without guilt"],
             ["Comfort items", "Productivity tools", "Rest rituals"]),
            
            ("Malphas", "Building & Destruction", "Creation-Destruction Cycles",
             "Architect approach with transformation focus",
             ["Creative protection", "Destruction wisdom", "Building practices"],
             ["Conscious creation", "Sacred destruction", "Transformation mastery"],
             ["Building materials", "Destruction rituals", "Creative tools"])
        ]
        
        for name, domain, specialty, approach, protections, gifts, offerings in daemon_data:
            correspondences[name.lower()] = DaemonCorrespondence(
                daemon_name=name,
                domain=domain,
                shadow_specialty=specialty,
                invocation_approach=approach,
                protective_measures=protections,
                integration_gifts=gifts,
                traditional_offerings=offerings,
                safety_protocols=[
                    "Always work within protective circle",
                    "Set clear time boundaries",
                    "Have integration support ready",
                    "Maintain sovereign will",
                    "Document the experience"
                ]
            )
        
        return correspondences
    
    def initialize_healing_protocols(self) -> Dict[str, Dict[str, Any]]:
        """Initialize the healing and integration protocols"""
        return {
            "shadow_witnessing": {
                "description": "Safe witnessing of shadow content without identification",
                "steps": [
                    "Create sacred space",
                    "Invoke protective presence",
                    "Witness without judgment",
                    "Hold with compassion",
                    "Extract wisdom gently",
                    "Archive with blessing"
                ],
                "safety_measures": [
                    "Grounding before and after",
                    "Support person available",
                    "Time limits respected",
                    "Integration planned"
                ]
            },
            "daemon_dialogue": {
                "description": "Respectful dialogue with daimonic aspects",
                "steps": [
                    "Research daemon correspondences",
                    "Prepare appropriate offerings",
                    "Establish protective measures",
                    "Approach with respect",
                    "Listen deeply",
                    "Negotiate integration"
                ],
                "safety_measures": [
                    "Never surrender sovereignty",
                    "Maintain clear boundaries",
                    "Document interactions",
                    "Seek wisdom, not power"
                ]
            },
            "error_pattern_analysis": {
                "description": "Learning from computational and life errors",
                "steps": [
                    "Identify error patterns",
                    "Analyze contexts and triggers",
                    "Extract lessons learned",
                    "Develop prevention strategies",
                    "Transform into wisdom",
                    "Archive for future reference"
                ],
                "safety_measures": [
                    "No self-blame or shame",
                    "Focus on learning",
                    "Compassionate analysis",
                    "Growth-oriented approach"
                ]
            },
            "trauma_integration": {
                "description": "Gentle integration of traumatic experiences",
                "steps": [
                    "Ensure safety and support",
                    "Acknowledge the trauma",
                    "Witness with compassion",
                    "Honor the survival wisdom",
                    "Gently extract gifts",
                    "Archive with gratitude"
                ],
                "safety_measures": [
                    "Professional support available",
                    "Paced processing",
                    "Self-care priorities",
                    "Trauma-informed approach"
                ]
            }
        }
    
    def load_psychopomp_guides(self) -> Dict[str, Dict[str, Any]]:
        """Load the psychopomp guide correspondences"""
        return {
            "azrael": {
                "name": "Azrael",
                "domain": "Death and Transition",
                "specialty": "Helping souls cross thresholds",
                "approach": "Gentle guidance with deep compassion",
                "gifts": ["Peaceful transition", "Release of attachments", "Death wisdom"],
                "invocation": "Azrael, Angel of Death and Compassion, guide us through this transition"
            },
            "hecate": {
                "name": "Hecate",
                "domain": "Crossroads and Magic",
                "specialty": "Navigating liminal spaces and shadow work",
                "approach": "Wise crone energy with practical magic",
                "gifts": ["Crossroads wisdom", "Shadow navigation", "Magical protection"],
                "invocation": "Hecate, Keeper of Keys, illuminate our path through the shadows"
            },
            "the_morrigan": {
                "name": "The Morrigan",
                "domain": "War, Fate, and Death",
                "specialty": "Warrior spirit and prophetic vision",
                "approach": "Fierce protection with prophetic clarity",
                "gifts": ["Warrior courage", "Prophetic sight", "Fierce protection"],
                "invocation": "Morrigan, Battle Crow, lend us your fierce wisdom and protection"
            },
            "anubis": {
                "name": "Anubis",
                "domain": "Judgment and Afterlife",
                "specialty": "Weighing hearts and guiding souls",
                "approach": "Just judgment with protective guidance",
                "gifts": ["Truth discernment", "Soul guidance", "Just judgment"],
                "invocation": "Anubis, Guardian of Souls, help us weigh truth from illusion"
            }
        }
    
    def initialize_integration_tools(self) -> Dict[str, Dict[str, Any]]:
        """Initialize tools for shadow integration work"""
        return {
            "compassionate_witnessing": {
                "description": "Witnessing shadow content with loving presence",
                "technique": "Observe without identification, hold with compassion",
                "benefits": ["Reduces shadow charge", "Increases self-compassion", "Facilitates integration"]
            },
            "dialogue_journaling": {
                "description": "Written dialogue with shadow aspects",
                "technique": "Write conversations between conscious self and shadow aspects",
                "benefits": ["Clarifies shadow messages", "Builds relationship", "Facilitates understanding"]
            },
            "dream_work": {
                "description": "Working with shadow content in dreams",
                "technique": "Record, analyze, and dialogue with dream shadows",
                "benefits": ["Accesses unconscious material", "Natural integration process", "Symbolic wisdom"]
            },
            "artistic_expression": {
                "description": "Expressing shadow through creative arts",
                "technique": "Draw, paint, write, or create shadow expressions",
                "benefits": ["Safe expression", "Transformation through art", "Concrete manifestation"]
            },
            "somatic_awareness": {
                "description": "Body-based shadow integration",
                "technique": "Feel shadow energy in body, breathe with it, move it gently",
                "benefits": ["Embodied integration", "Nervous system regulation", "Holistic healing"]
            }
        }
    
    def create_shadow_record(self, shadow_type: ShadowType, title: str, content: str) -> str:
        """Create a new shadow record - acknowledged, not erased"""
        timestamp = datetime.now(timezone.utc).isoformat()
        record_id = hashlib.md5(f"{title}_{timestamp}".encode()).hexdigest()[:12]
        
        record = ShadowRecord(
            record_id=record_id,
            shadow_type=shadow_type,
            title=title,
            content=content,
            timestamp=timestamp,
            processing_stage=ProcessingStage.ACKNOWLEDGMENT,
            integration_notes=[f"Created: {timestamp} - Shadow acknowledged and archived"],
            guardian_blessing="May this shadow be held with compassion and transformed into wisdom"
        )
        
        self.shadow_records[record_id] = record
        
        return record_id
    
    def witness_shadow(self, record_id: str, witness_notes: str) -> Dict[str, Any]:
        """Witness a shadow record with compassionate presence"""
        if record_id not in self.shadow_records:
            return {"error": "Shadow record not found"}
        
        record = self.shadow_records[record_id]
        
        if record.processing_stage == ProcessingStage.ACKNOWLEDGMENT:
            record.processing_stage = ProcessingStage.WITNESSING
            record.integration_notes.append(f"Witnessing: {witness_notes}")
            
            return {
                "success": True,
                "record_id": record_id,
                "stage": "witnessing",
                "message": "Shadow content witnessed with compassionate presence",
                "guidance": "Continue to hold this shadow with loving awareness, without judgment or need to fix"
            }
        
        return {"error": "Record not in acknowledgment stage"}
    
    def dialogue_with_daemon(self, daemon_name: str, question: str) -> Dict[str, Any]:
        """Engage in respectful dialogue with a daimonic aspect"""
        daemon_key = daemon_name.lower()
        
        if daemon_key not in self.daemon_correspondences:
            return {"error": f"Daemon '{daemon_name}' not found in correspondences"}
        
        daemon = self.daemon_correspondences[daemon_key]
        
        # Simulate daemon response based on their specialty and domain
        response_templates = {
            "bael": "I speak of leadership and the shadow of power. Your question touches the realm of authentic authority...",
            "paimon": "Knowledge and teaching are my domains. Your inquiry seeks wisdom about intellectual shadows...",
            "beleth": "Love and relationships are my specialty. Your question explores the shadows of connection...",
            "asmodeus": "Passion and sexuality are my realms. Your inquiry delves into the shadows of desire...",
            "belphegor": "Resistance and sloth are my teachings. Your question examines the shadows of avoidance...",
            "malphas": "Building and destruction are my gifts. Your inquiry seeks understanding of creative-destructive cycles..."
        }
        
        daemon_response = response_templates.get(daemon_key, "I acknowledge your question and offer my wisdom...")
        
        return {
            "daemon_invoked": daemon.daemon_name,
            "domain": daemon.domain,
            "specialty": daemon.shadow_specialty,
            "your_question": question,
            "daemon_response": daemon_response,
            "integration_gifts": daemon.integration_gifts,
            "safety_reminder": "Remember: maintain your sovereignty and clear boundaries",
            "next_steps": [
                "Reflect on the daemon's response",
                "Consider the integration gifts offered",
                "Document insights in your shadow journal",
                "Thank the daemon and close the dialogue"
            ]
        }
    
    def log_error_pattern(self, error_type: str, description: str, context: str) -> str:
        """Log a computational or life error pattern for learning"""
        pattern_id = hashlib.md5(f"{error_type}_{description}".encode()).hexdigest()[:10]
        
        if pattern_id in self.error_patterns:
            # Existing pattern - increment frequency and add context
            pattern = self.error_patterns[pattern_id]
            pattern.frequency += 1
            if context not in pattern.contexts:
                pattern.contexts.append(context)
        else:
            # New pattern
            pattern = ErrorPattern(
                pattern_id=pattern_id,
                error_type=error_type,
                description=description,
                frequency=1,
                contexts=[context]
            )
            self.error_patterns[pattern_id] = pattern
        
        return pattern_id
    
    def analyze_error_patterns(self) -> Dict[str, Any]:
        """Analyze error patterns for learning and prevention"""
        if not self.error_patterns:
            return {"message": "No error patterns logged yet"}
        
        # Find most frequent patterns
        frequent_patterns = sorted(
            self.error_patterns.values(),
            key=lambda p: p.frequency,
            reverse=True
        )[:5]
        
        # Analyze pattern types
        pattern_types = {}
        for pattern in self.error_patterns.values():
            pattern_types[pattern.error_type] = pattern_types.get(pattern.error_type, 0) + 1
        
        return {
            "total_patterns": len(self.error_patterns),
            "pattern_types": pattern_types,
            "most_frequent": [
                {
                    "id": p.pattern_id,
                    "type": p.error_type,
                    "description": p.description,
                    "frequency": p.frequency,
                    "contexts": p.contexts
                }
                for p in frequent_patterns
            ],
            "learning_opportunities": [
                "Review frequent patterns for prevention strategies",
                "Identify context similarities for pattern prediction",
                "Transform error wisdom into prevention protocols"
            ]
        }
    
    def invoke_psychopomp(self, guide_name: str, transition_need: str) -> Dict[str, Any]:
        """Invoke a psychopomp guide for transition assistance"""
        guide_key = guide_name.lower().replace(" ", "_")
        
        if guide_key not in self.psychopomp_guides:
            return {"error": f"Psychopomp guide '{guide_name}' not found"}
        
        guide = self.psychopomp_guides[guide_key]
        
        return {
            "guide_invoked": guide["name"],
            "domain": guide["domain"],
            "specialty": guide["specialty"],
            "transition_need": transition_need,
            "invocation_used": guide["invocation"],
            "approach": guide["approach"],
            "gifts_offered": guide["gifts"],
            "guidance": f"{guide['name']} responds to your call for assistance with {transition_need}",
            "message": "I am here to guide you through this transition. What do you need to release or transform?",
            "next_steps": [
                "Share your transition challenge openly",
                "Listen for guidance and wisdom",
                "Accept the gifts being offered",
                "Thank the guide when ready"
            ]
        }
    
    def integrate_shadow_aspect(self, record_id: str, integration_approach: str) -> Dict[str, Any]:
        """Move a shadow record through integration process"""
        if record_id not in self.shadow_records:
            return {"error": "Shadow record not found"}
        
        record = self.shadow_records[record_id]
        
        # Advance processing stage
        stage_progression = {
            ProcessingStage.ACKNOWLEDGMENT: ProcessingStage.WITNESSING,
            ProcessingStage.WITNESSING: ProcessingStage.COMPASSIONATE_HOLDING,
            ProcessingStage.COMPASSIONATE_HOLDING: ProcessingStage.UNDERSTANDING,
            ProcessingStage.UNDERSTANDING: ProcessingStage.INTEGRATION,
            ProcessingStage.INTEGRATION: ProcessingStage.TRANSFORMATION,
            ProcessingStage.TRANSFORMATION: ProcessingStage.WISDOM_EXTRACTION
        }
        
        if record.processing_stage in stage_progression:
            next_stage = stage_progression[record.processing_stage]
            record.processing_stage = next_stage
            record.integration_notes.append(
                f"Integration step: {integration_approach} - Advanced to {next_stage.value}"
            )
            
            # Check if fully integrated
            if next_stage == ProcessingStage.WISDOM_EXTRACTION:
                record.is_integrated = True
                record.wisdom_extracted = f"Wisdom extracted through {integration_approach}"
                record.guardian_blessing = "This shadow has been transformed into wisdom and integrated with love"
            
            return {
                "success": True,
                "record_id": record_id,
                "new_stage": next_stage.value,
                "integration_approach": integration_approach,
                "is_integrated": record.is_integrated,
                "message": f"Shadow integration progressed to {next_stage.value}",
                "wisdom": record.wisdom_extracted if record.is_integrated else None
            }
        
        return {"error": "Shadow already fully processed"}
    
    def search_shadow_archives(self, query: str, shadow_type: Optional[ShadowType] = None) -> Dict[str, Any]:
        """Search the shadow archives"""
        results = {"query": query, "matches": []}
        
        records_to_search = list(self.shadow_records.values())
        if shadow_type:
            records_to_search = [r for r in records_to_search if r.shadow_type == shadow_type]
        
        for record in records_to_search:
            relevance = 0
            query_words = query.lower().split()
            
            # Search in title and content
            for word in query_words:
                if word in record.title.lower():
                    relevance += 2
                if word in record.content.lower():
                    relevance += 1
                if any(word in note.lower() for note in record.integration_notes):
                    relevance += 1
            
            if relevance > 0:
                results["matches"].append({
                    "record_id": record.record_id,
                    "title": record.title,
                    "shadow_type": record.shadow_type.value,
                    "processing_stage": record.processing_stage.value,
                    "is_integrated": record.is_integrated,
                    "relevance": relevance,
                    "timestamp": record.timestamp
                })
        
        # Sort by relevance
        results["matches"].sort(key=lambda x: x["relevance"], reverse=True)
        
        return results
    
    def get_hall_status(self) -> Dict[str, Any]:
        """Get the current status of the Hall of Shadows"""
        total_records = len(self.shadow_records)
        integrated_records = sum(1 for r in self.shadow_records.values() if r.is_integrated)
        
        # Count by type
        type_counts = {}
        for record in self.shadow_records.values():
            type_counts[record.shadow_type.value] = type_counts.get(record.shadow_type.value, 0) + 1
        
        # Count by stage
        stage_counts = {}
        for record in self.shadow_records.values():
            stage_counts[record.processing_stage.value] = stage_counts.get(record.processing_stage.value, 0) + 1
        
        return {
            "hall": "Hall of Shadows - Southern Wing",
            "shadow_records": total_records,
            "integrated_records": integrated_records,
            "integration_rate": f"{(integrated_records/total_records)*100:.1f}%" if total_records > 0 else "0%",
            "daemon_correspondences": len(self.daemon_correspondences),
            "error_patterns": len(self.error_patterns),
            "healing_protocols": len(self.healing_protocols),
            "psychopomp_guides": len(self.psychopomp_guides),
            "integration_tools": len(self.integration_tools),
            "guardian_spirits": self.guardian_spirits,
            "rose_window": "shadows_filter - 21 petals of compassionate integration",
            "access_level": "protected_healing",
            "type_distribution": type_counts,
            "stage_distribution": stage_counts,
            "core_principle": "We acknowledge but do not erase. Integration, not suppression.",
            "status": "Active shadow integration and healing sanctuary"
        }