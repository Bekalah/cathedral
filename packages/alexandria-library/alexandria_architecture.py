# Library of Alexandria Restored - Cathedral Architecture
# The luminous, labyrinthine cathedral-library hybrid

import math
from typing import Dict, Any, List, Tuple, Optional
from dataclasses import dataclass, field
from enum import Enum
import json

class LibraryWing(Enum):
    """The four wings of the restored Library"""
    GNOSIS = "hall_of_gnosis"
    SHADOWS = "hall_of_shadows" 
    ATELIERS = "hall_of_ateliers"
    SOPHIA7 = "hall_of_sophia7"

@dataclass
class RoseWindow:
    """21-petal stained glass rose window - data filter interface"""
    petals: int = 21
    center_radius: float = 0.0
    petal_angle: float = 17.142857  # 360/21
    active_filters: List[str] = field(default_factory=list)
    glow_intensity: float = 0.7
    color_spectrum: List[str] = field(default_factory=lambda: [
        "#FFD700", "#FF6B35", "#F7931E", "#FFB700", "#FF8500",
        "#E74C3C", "#8E44AD", "#3498DB", "#1ABC9C", "#27AE60",
        "#F39C12", "#E67E22", "#D35400", "#C0392B", "#9B59B6",
        "#8E44AD", "#2980B9", "#16A085", "#27AE60", "#F1C40F", "#E74C3C"
    ])

@dataclass
class SpinalVertebra:
    """One of 33 vertebrae in the central axis - angel/daemon pillar"""
    vertebra_id: int
    angel_name: str
    daemon_name: str
    knowledge_domain: str
    activation_key: str
    energy_resonance: float = 0.0
    is_active: bool = False

class AlexandriaArchitecture:
    """The restored Library of Alexandria - cathedral-library hybrid"""
    
    def __init__(self):
        self.rose_windows = self.create_rose_windows()
        self.spinal_axis = self.create_spinal_axis()
        self.wings = self.initialize_wings()
        self.crypts = self.initialize_crypts()
        self.navigation_map = self.create_navigation_map()
    
    def create_rose_windows(self) -> Dict[str, RoseWindow]:
        """Create the luminous stained glass data filters"""
        windows = {}
        
        # Primary navigation rose window
        windows["navigation"] = RoseWindow(
            active_filters=["gnosis", "shadows", "ateliers", "sophia7", "crypts"],
            glow_intensity=1.0
        )
        
        # Wing-specific rose windows
        windows["gnosis_filter"] = RoseWindow(
            active_filters=["philosophy", "soyga_squares", "angel_codes", "hermetic_texts"],
            glow_intensity=0.8
        )
        
        windows["shadows_filter"] = RoseWindow(
            active_filters=["trauma_logs", "daemon_archives", "error_patterns", "shadow_work"],
            glow_intensity=0.6
        )
        
        windows["ateliers_filter"] = RoseWindow(
            active_filters=["creative_councils", "artist_collectives", "project_workshops", "inspiration_flows"],
            glow_intensity=0.9
        )
        
        windows["sophia7_filter"] = RoseWindow(
            active_filters=["wisdom_keepers", "feminine_logic", "seven_pillars", "sacred_knowledge"],
            glow_intensity=0.85
        )
        
        return windows
    
    def create_spinal_axis(self) -> List[SpinalVertebra]:
        """Create the 33-vertebrae central staircase/pillar"""
        vertebrae = []
        
        # The 33 angel/daemon pairs (based on traditional hierarchies)
        angel_daemon_pairs = [
            # First Triad - Seraphim
            (1, "Metatron", "Belphegor", "Divine Interface", "I AM THAT I AM"),
            (2, "Raziel", "Asmodeus", "Secret Knowledge", "MYSTERY UNVEILED"),
            (3, "Tzaphkiel", "Astaroth", "Understanding", "BINAH AWAKENED"),
            
            # Second Triad - Cherubim  
            (4, "Tzadkiel", "Gamygyn", "Mercy", "CHESED FLOWS"),
            (5, "Camael", "Marbas", "Strength", "GEBURAH STRIKES"),
            (6, "Michael", "Paimon", "Beauty", "TIPHERETH SHINES"),
            
            # Third Triad - Thrones
            (7, "Haniel", "Belial", "Victory", "NETZACH ENDURES"),
            (8, "Raphael", "Purson", "Splendor", "HOD REFLECTS"),
            (9, "Gabriel", "Marchosias", "Foundation", "YESOD STABILIZES"),
            
            # Earthly Manifestation
            (10, "Sandalphon", "Bael", "Kingdom", "MALKUTH GROUNDS"),
            
            # Extended Hierarchy - Rebecca's Personal Codex
            (11, "Uriel", "Barbatos", "Fire of God", "FLAME PURIFIES"),
            (12, "Raguel", "Gusion", "Friend of God", "JUSTICE BALANCES"),
            (13, "Remiel", "Sitri", "Thunder of God", "TRUTH SPEAKS"),
            (14, "Sariel", "Beleth", "God's Command", "WILL MANIFESTS"),
            (15, "Jeremiel", "Leraje", "God's Mercy", "COMPASSION FLOWS"),
            (16, "Ariel", "Eligos", "Lion of God", "COURAGE ROARS"),
            (17, "Azrael", "Zepar", "Help of God", "TRANSITION GUIDES"),
            (18, "Chamuel", "Botis", "God Sees", "LOVE SEES ALL"),
            (19, "Jophiel", "Bune", "Beauty of God", "BEAUTY ILLUMINATES"),
            (20, "Zadkiel", "Berith", "Righteousness of God", "MERCY FORGIVES"),
            (21, "Barachiel", "Aamon", "God's Blessing", "BLESSINGS MULTIPLY"),
            
            # Rebecca's Shadow Council - Personal Daimonic Court
            (22, "Seraphiel", "Vine", "Burning One", "SACRED FIRE BURNS"),
            (23, "Ophaniel", "Bifrons", "Wheel Angel", "CYCLES TURN"),
            (24, "Rikbiel", "Valefor", "Chariot Rider", "MOVEMENT FLOWS"),
            (25, "Zaphkiel", "Vual", "God's Watcher", "OBSERVATION RECORDS"),
            (26, "Cassiel", "Haagenti", "Speed of God", "TIME BENDS"),
            (27, "Sachiel", "Crocell", "Covering of God", "PROTECTION SHIELDS"),
            (28, "Anael", "Furcas", "Grace of God", "GRACE DESCENDS"),
            (29, "Machidiel", "Balam", "Fullness of God", "WHOLENESS INTEGRATES"),
            (30, "Muriel", "Alloces", "God's Water", "EMOTION FLOWS"),
            
            # Final Trinity - The Resurrection Codes
            (31, "Shekinah", "Andromalius", "Divine Presence", "PRESENCE FILLS ALL"),
            (32, "Ruach Elohim", "Dantalion", "Spirit of God", "BREATH ANIMATES"),
            (33, "Ein Sof", "Malphas", "Without End", "INFINITY EMBRACES")
        ]
        
        for vertebra_id, angel, daemon, domain, key in angel_daemon_pairs:
            vertebrae.append(SpinalVertebra(
                vertebra_id=vertebra_id,
                angel_name=angel,
                daemon_name=daemon,
                knowledge_domain=domain,
                activation_key=key,
                energy_resonance=math.sin(vertebra_id * math.pi / 33) * 0.8 + 0.2
            ))
        
        return vertebrae
    
    def initialize_wings(self) -> Dict[LibraryWing, Dict[str, Any]]:
        """Initialize the four wings of the Library"""
        wings = {}
        
        wings[LibraryWing.GNOSIS] = {
            "title": "Hall of Gnosis",
            "description": "Philosophy, Soyga squares, angel codes, hermetic wisdom",
            "collections": [
                "Philosophy Archive",
                "Soyga Square Matrices",
                "Angelic Correspondences", 
                "Hermetic Manuscripts",
                "Platonic Dialogues",
                "Gnostic Gospels"
            ],
            "guardians": ["Raziel", "Thoth", "Hermes Trismegistus"],
            "access_level": "open_inquiry",
            "rose_window": "gnosis_filter"
        }
        
        wings[LibraryWing.SHADOWS] = {
            "title": "Hall of Shadows",
            "description": "Trauma archives, daemon records, error logs, shadow integration",
            "collections": [
                "Trauma Processing Logs",
                "Daemon Correspondence Records",
                "Error Pattern Analysis",
                "Shadow Work Journals",
                "Psychopomp Guidance",
                "Integration Protocols"
            ],
            "guardians": ["Azrael", "Hecate", "The Morrigan"],
            "access_level": "protected_healing",
            "rose_window": "shadows_filter"
        }
        
        wings[LibraryWing.ATELIERS] = {
            "title": "Hall of Ateliers", 
            "description": "Creative councils, artist-mages, collaborative workshops",
            "collections": [
                "Artist Collective Manifests",
                "Creative Process Archives",
                "Inspiration Flow Maps",
                "Collaborative Project Logs",
                "Visionary Art Techniques",
                "Sacred Art Principles"
            ],
            "guardians": ["Uriel", "Brigid", "Saraswati"],
            "access_level": "creative_collaboration",
            "rose_window": "ateliers_filter"
        }
        
        wings[LibraryWing.SOPHIA7] = {
            "title": "Hall of Sophia7",
            "description": "Wisdom keepers, feminine daimonic logic, seven-fold wisdom",
            "collections": [
                "Seven Pillars of Wisdom",
                "Feminine Divine Archives",
                "Daimonic Logic Patterns",
                "Sophia Teachings",
                "Sacred Feminine Mysteries",
                "Wisdom Keeper Chronicles"
            ],
            "guardians": ["Sophia", "Athena", "Tara"],
            "access_level": "wisdom_initiation",
            "rose_window": "sophia7_filter"
        }
        
        return wings
    
    def initialize_crypts(self) -> Dict[str, Any]:
        """Initialize the Crypts Below - fragmented manuscripts and shadow-egregores"""
        return {
            "title": "Crypts Below",
            "description": "Fragmented manuscripts, shadow-egregores, unresolved codex parts (acknowledged, not erased)",
            "vaults": {
                "fragmented_manuscripts": {
                    "description": "Incomplete texts, damaged scrolls, lost wisdom fragments",
                    "access": "archaeological_recovery",
                    "guardian": "The Archivist"
                },
                "shadow_egregores": {
                    "description": "Collective shadow forms, unresolved group patterns, dark archetypes",
                    "access": "shadow_integration",
                    "guardian": "The Shadow Keeper"
                },
                "unresolved_codex": {
                    "description": "Parts of Rebecca's codex not yet integrated - acknowledged but not suppressed",
                    "access": "honest_acknowledgment",
                    "guardian": "The Truth Witness"
                },
                "error_logs": {
                    "description": "Computational errors, failed experiments, debugging archives",
                    "access": "learning_from_failure",
                    "guardian": "The Debug Angel"
                }
            },
            "descent_levels": 7,  # Seven levels down to the deep archives
            "access_protocol": "conscious_descent_with_light"
        }
    
    def create_navigation_map(self) -> Dict[str, Any]:
        """Create the navigation map for the Library"""
        return {
            "entry_point": "central_rose_window",
            "central_axis": "33_vertebrae_staircase",
            "wing_access": {
                "north": LibraryWing.GNOSIS,
                "east": LibraryWing.ATELIERS, 
                "south": LibraryWing.SHADOWS,
                "west": LibraryWing.SOPHIA7
            },
            "vertical_access": {
                "ascent": "to_observatory_dome",
                "descent": "to_crypts_below"
            },
            "rose_window_filters": list(self.rose_windows.keys()),
            "activation_sequence": "center → wings → crypts → integration → transcendence"
        }
    
    def activate_vertebra(self, vertebra_id: int, activation_key: str) -> Dict[str, Any]:
        """Activate a specific vertebra in the spinal axis"""
        if 1 <= vertebra_id <= 33:
            vertebra = self.spinal_axis[vertebra_id - 1]
            
            if activation_key == vertebra.activation_key:
                vertebra.is_active = True
                vertebra.energy_resonance = 1.0
                
                return {
                    "success": True,
                    "vertebra": vertebra_id,
                    "angel": vertebra.angel_name,
                    "daemon": vertebra.daemon_name,
                    "domain": vertebra.knowledge_domain,
                    "resonance": vertebra.energy_resonance,
                    "message": f"Vertebra {vertebra_id} activated: {vertebra.angel_name} and {vertebra.daemon_name} in harmony"
                }
            else:
                return {
                    "success": False,
                    "error": "Incorrect activation key",
                    "hint": f"Domain: {vertebra.knowledge_domain}"
                }
        
        return {"success": False, "error": "Invalid vertebra ID"}
    
    def filter_through_rose_window(self, window_name: str, query: str) -> Dict[str, Any]:
        """Filter information through a specific rose window"""
        if window_name not in self.rose_windows:
            return {"error": "Rose window not found"}
        
        window = self.rose_windows[window_name]
        filtered_results = []
        
        # Simulate filtering through the 21-petal structure
        for i, filter_type in enumerate(window.active_filters):
            if any(keyword in query.lower() for keyword in filter_type.split('_')):
                petal_angle = i * window.petal_angle
                filtered_results.append({
                    "petal": i + 1,
                    "angle": petal_angle,
                    "filter": filter_type,
                    "resonance": math.sin(math.radians(petal_angle)) * window.glow_intensity,
                    "color": window.color_spectrum[i % len(window.color_spectrum)]
                })
        
        return {
            "window": window_name,
            "query": query,
            "filtered_results": filtered_results,
            "total_resonance": sum(r["resonance"] for r in filtered_results),
            "dominant_colors": [r["color"] for r in filtered_results[:3]]
        }
    
    def navigate_to_wing(self, wing: LibraryWing) -> Dict[str, Any]:
        """Navigate to a specific wing of the Library"""
        wing_info = self.wings[wing]
        
        return {
            "destination": wing.value,
            "title": wing_info["title"],
            "description": wing_info["description"],
            "available_collections": wing_info["collections"],
            "guardians": wing_info["guardians"],
            "access_level": wing_info["access_level"],
            "rose_window": wing_info["rose_window"],
            "navigation_instruction": f"Follow the {wing.value} rose window glow to enter this wing"
        }
    
    def descend_to_crypts(self, descent_level: int = 1) -> Dict[str, Any]:
        """Descend to the Crypts Below"""
        if not 1 <= descent_level <= 7:
            return {"error": "Invalid descent level. Must be 1-7"}
        
        crypt_access = {
            1: "Entry level - Recent fragments and minor shadow work",
            2: "Processing level - Active integration work", 
            3: "Archive level - Historical shadow patterns",
            4: "Deep storage - Ancient unresolved patterns",
            5: "Collective level - Shared shadow egregores",
            6: "Ancestral level - Generational patterns",
            7: "Primordial level - Core archetypal shadows"
        }
        
        return {
            "descent_level": descent_level,
            "description": crypt_access[descent_level],
            "crypts_info": self.crypts,
            "access_protocol": "conscious_descent_with_light",
            "guardian_message": f"Level {descent_level}: Remember, we acknowledge but do not erase. Integration, not suppression.",
            "light_level": 1.0 - (descent_level * 0.1),  # Light dims as you descend
            "shadow_intensity": descent_level * 0.14  # Shadow work intensifies
        }
    
    def get_library_status(self) -> Dict[str, Any]:
        """Get overall status of the Library of Alexandria Restored"""
        active_vertebrae = sum(1 for v in self.spinal_axis if v.is_active)
        total_energy = sum(v.energy_resonance for v in self.spinal_axis)
        
        return {
            "architecture": "Library of Alexandria Restored",
            "form": "Luminous cathedral-library hybrid",
            "spinal_axis": {
                "total_vertebrae": 33,
                "active_vertebrae": active_vertebrae,
                "total_energy": round(total_energy, 2),
                "completion": f"{(active_vertebrae/33)*100:.1f}%"
            },
            "wings": list(self.wings.keys()),
            "rose_windows": len(self.rose_windows),
            "crypts_access": "available_with_conscious_descent",
            "overall_luminosity": round(total_energy / 33, 2),
            "status": "Restored and actively illuminating"
        }