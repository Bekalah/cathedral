# Hall of Gnosis - Philosophy, Soyga Squares, Angel Codes
# The northern wing of the Library of Alexandria Restored

import re
import json
import math
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum

class PhilosophicalSchool(Enum):
    """Major philosophical traditions housed in the Hall"""
    PLATONIC = "platonic"
    HERMETIC = "hermetic" 
    GNOSTIC = "gnostic"
    NEOPLATONIC = "neoplatonic"
    PYTHAGOREAN = "pythagorean"
    QABALISTIC = "qabalistic"
    ALCHEMICAL = "alchemical"

@dataclass
class SoygarSquare:
    """A magical square from John Dee's Book of Soyga"""
    size: int  # 36x36 typical for Soyga
    name: str
    angel_governor: str
    numerical_matrix: List[List[int]] = field(default_factory=list)
    textual_matrix: List[List[str]] = field(default_factory=list)
    magical_constant: int = 0
    activation_sequence: List[str] = field(default_factory=list)

@dataclass
class AngelicCorrespondence:
    """Angel codes and correspondences"""
    angel_name: str
    hebrew_name: str
    gematria_value: int
    sphere_of_influence: str
    invocation_formula: str
    correspondence_table: Dict[str, Any] = field(default_factory=dict)
    soyga_references: List[str] = field(default_factory=list)

class HallOfGnosis:
    """The philosophy wing - northern hall of the Library"""
    
    def __init__(self):
        self.philosophical_collections = self.initialize_collections()
        self.soyga_squares = self.create_soyga_squares()
        self.angelic_correspondences = self.load_angelic_codes()
        self.hermetic_principles = self.load_hermetic_wisdom()
        self.active_inquiries = []
        
    def initialize_collections(self) -> Dict[PhilosophicalSchool, Dict[str, Any]]:
        """Initialize the philosophical manuscript collections"""
        collections = {}
        
        collections[PhilosophicalSchool.PLATONIC] = {
            "core_texts": [
                "The Republic - Cave Allegory and Philosopher Kings",
                "Timaeus - Cosmic Geometry and Sacred Mathematics", 
                "Phaedrus - Soul Chariot and Divine Madness",
                "Symposium - Ladder of Love and Beauty",
                "Phaedo - Soul Immortality and Forms"
            ],
            "key_concepts": ["Forms", "Cave Allegory", "Philosopher King", "Tripartite Soul"],
            "manuscripts": "Greek originals with medieval commentaries",
            "guardian_spirit": "Plato's Daimonion"
        }
        
        collections[PhilosophicalSchool.HERMETIC] = {
            "core_texts": [
                "Corpus Hermeticum - As Above So Below",
                "Emerald Tablet - Alchemical Formula",
                "Asclepius - Divine Mind and Matter",
                "Poimandres - Shepherd of Men Vision",
                "Pymander - Creation Mythology"
            ],
            "key_concepts": ["As Above So Below", "Nous", "Gnosis", "Sacred Marriage"],
            "manuscripts": "Greek and Latin with Arabic commentaries",
            "guardian_spirit": "Hermes Trismegistus"
        }
        
        collections[PhilosophicalSchool.GNOSTIC] = {
            "core_texts": [
                "Gospel of Thomas - Hidden Sayings",
                "Gospel of Philip - Sacred Marriage Mysteries",
                "Pistis Sophia - Wisdom's Journey",
                "The Thunder Perfect Mind - Divine Feminine",
                "Gospel of Truth - Valentinian Gnosis"
            ],
            "key_concepts": ["Gnosis", "Pleroma", "Demiurge", "Sophia", "Archons"],
            "manuscripts": "Nag Hammadi Coptic with reconstructed Greek",
            "guardian_spirit": "Sophia-Achamoth"
        }
        
        collections[PhilosophicalSchool.QABALISTIC] = {
            "core_texts": [
                "Sefer Yetzirah - Book of Creation",
                "Zohar - Book of Splendor", 
                "Sefer HaBahir - Book of Brightness",
                "Tree of Life Diagrams - Sephirotic Maps",
                "Gematria Tables - Number-Letter Correspondences"
            ],
            "key_concepts": ["Sephirot", "Ein Sof", "Tzimtzum", "Gematria", "Four Worlds"],
            "manuscripts": "Hebrew with Aramaic and Latin commentaries", 
            "guardian_spirit": "Metatron"
        }
        
        collections[PhilosophicalSchool.PYTHAGOREAN] = {
            "core_texts": [
                "Sacred Geometry Proofs - Mathematical Mysticism",
                "Harmony of Spheres - Musical Mathematics",
                "Number Symbolism - Numerical Philosophy",
                "Golden Ratio Studies - Phi Proportions",
                "Tetractys Meditations - Sacred Ten"
            ],
            "key_concepts": ["All is Number", "Tetractys", "Music of Spheres", "Sacred Geometry"],
            "manuscripts": "Greek mathematical papyri with geometric diagrams",
            "guardian_spirit": "Pythagoras"
        }
        
        return collections
    
    def create_soyga_squares(self) -> Dict[str, SoygarSquare]:
        """Create the magical squares from John Dee's Book of Soyga"""
        squares = {}
        
        # The 36x36 squares governed by angels
        angel_squares = [
            ("Elemech", "First Square - Foundation"),
            ("Emoii", "Second Square - Ascension"), 
            ("Emoiiio", "Third Square - Manifestation"),
            ("Emoimoi", "Fourth Square - Transformation"),
            ("Asmaiel", "Fifth Square - Divine Names"),
            ("Madriel", "Sixth Square - Planetary Forces"),
            ("Vadali", "Seventh Square - Elemental Powers")
        ]
        
        for angel, description in angel_squares:
            # Generate a simplified 6x6 version for demonstration
            # (Real Soyga squares are 36x36 and incredibly complex)
            matrix = self.generate_soyga_matrix(6, angel)
            
            squares[angel.lower()] = SoygarSquare(
                size=6,  # Simplified for demonstration
                name=description,
                angel_governor=angel,
                numerical_matrix=matrix["numbers"],
                textual_matrix=matrix["letters"],
                magical_constant=matrix["constant"],
                activation_sequence=self.generate_activation_sequence(angel)
            )
        
        return squares
    
    def generate_soyga_matrix(self, size: int, angel_name: str) -> Dict[str, Any]:
        """Generate a simplified Soyga-style magical square"""
        # This is a simplified version - real Soyga squares are vastly more complex
        
        # Create numerical matrix using angel name's gematria
        gematria_seed = sum(ord(c) for c in angel_name)
        numbers = []
        letters = []
        
        for i in range(size):
            num_row = []
            let_row = []
            for j in range(size):
                # Generate numbers based on position and angel's gematria
                num = ((i + 1) * (j + 1) + gematria_seed) % 100 + 1
                num_row.append(num)
                
                # Generate corresponding letters
                letter_index = (num - 1) % 26
                let_row.append(chr(ord('A') + letter_index))
            
            numbers.append(num_row)
            letters.append(let_row)
        
        # Calculate magical constant (simplified)
        magical_constant = sum(numbers[0])
        
        return {
            "numbers": numbers,
            "letters": letters,
            "constant": magical_constant
        }
    
    def generate_activation_sequence(self, angel_name: str) -> List[str]:
        """Generate activation sequence for a Soyga square"""
        # Based on traditional angel invocation patterns
        return [
            f"AGLA - {angel_name} - ADONAI",
            f"By the power of the Sacred Names",
            f"I invoke thee, {angel_name}",
            f"Governor of this Sacred Square",
            f"Reveal thy wisdom through number and letter",
            f"As above in Heaven, so below on Earth",
            f"Let the square be activated in Light"
        ]
    
    def load_angelic_codes(self) -> Dict[str, AngelicCorrespondence]:
        """Load the angelic correspondences and codes"""
        correspondences = {}
        
        # Key angels from various traditions
        angels_data = [
            ("Michael", "מיכאל", 101, "Protection & Solar Power", "MICHAEL GABRI EL RAFA EL URI EL"),
            ("Gabriel", "גבריאל", 246, "Messages & Lunar Mysteries", "GABRI EL MICHAEL RAFA EL URI EL"),
            ("Raphael", "רפאל", 311, "Healing & Mercury Wisdom", "RAFA EL MICHAEL GABRI EL URI EL"),
            ("Uriel", "אוריאל", 248, "Fire of God & Earth Power", "URI EL MICHAEL GABRI EL RAFA EL"),
            ("Metatron", "מטטרון", 314, "Divine Scribe & Geometry", "META TRON EHYEH ASHER EHYEH"),
            ("Sandalphon", "סנדלפון", 280, "Prayer Conductor & Earth Bridge", "SANDAL PHON ADONAI ELOHIM"),
            ("Raziel", "רזיאל", 248, "Secrets of God & Hidden Knowledge", "RAZI EL SEFER RAZIEL"),
        ]
        
        for name, hebrew, gematria, sphere, formula in angels_data:
            correspondences[name.lower()] = AngelicCorrespondence(
                angel_name=name,
                hebrew_name=hebrew,
                gematria_value=gematria,
                sphere_of_influence=sphere,
                invocation_formula=formula,
                correspondence_table={
                    "element": self.get_angel_element(name),
                    "planet": self.get_angel_planet(name),
                    "sephirah": self.get_angel_sephirah(name),
                    "color": self.get_angel_color(name),
                    "number": gematria % 10
                },
                soyga_references=self.get_soyga_references(name)
            )
        
        return correspondences
    
    def get_angel_element(self, angel_name: str) -> str:
        """Get elemental correspondence for angel"""
        elements = {
            "Michael": "Fire", "Gabriel": "Water", 
            "Raphael": "Air", "Uriel": "Earth",
            "Metatron": "Spirit", "Sandalphon": "Earth",
            "Raziel": "Water"
        }
        return elements.get(angel_name, "Spirit")
    
    def get_angel_planet(self, angel_name: str) -> str:
        """Get planetary correspondence for angel"""
        planets = {
            "Michael": "Sun", "Gabriel": "Moon",
            "Raphael": "Mercury", "Uriel": "Saturn", 
            "Metatron": "Kether", "Sandalphon": "Malkuth",
            "Raziel": "Neptune"
        }
        return planets.get(angel_name, "Uranus")
    
    def get_angel_sephirah(self, angel_name: str) -> str:
        """Get Tree of Life correspondence for angel"""
        sephirot = {
            "Michael": "Tiphereth", "Gabriel": "Yesod",
            "Raphael": "Hod", "Uriel": "Malkuth",
            "Metatron": "Kether", "Sandalphon": "Malkuth",
            "Raziel": "Chokmah"
        }
        return sephirot.get(angel_name, "Da'at")
    
    def get_angel_color(self, angel_name: str) -> str:
        """Get color correspondence for angel"""
        colors = {
            "Michael": "Gold", "Gabriel": "Silver",
            "Raphael": "Orange", "Uriel": "Green",
            "Metatron": "White", "Sandalphon": "Brown",
            "Raziel": "Deep Blue"
        }
        return colors.get(angel_name, "Violet")
    
    def get_soyga_references(self, angel_name: str) -> List[str]:
        """Get Soyga square references for angel"""
        # Simplified references - real Soyga would have complex cross-references
        return [f"{angel_name} Square Reference", f"Table of {angel_name}", f"{angel_name} Invocation"]
    
    def load_hermetic_wisdom(self) -> Dict[str, Any]:
        """Load the core Hermetic principles and wisdom"""
        return {
            "seven_principles": {
                1: "Mentalism - All is Mind",
                2: "Correspondence - As Above, So Below", 
                3: "Vibration - All is in Motion",
                4: "Polarity - Everything has Opposites",
                5: "Rhythm - Everything Flows",
                6: "Cause and Effect - Every Effect has a Cause",
                7: "Gender - Everything has Masculine and Feminine"
            },
            "emerald_tablet": {
                "latin": "Quod est inferius est sicut quod est superius",
                "english": "That which is below is like that which is above",
                "full_text": "What is below is like what is above, and what is above is like what is below, to accomplish the miracles of the one thing."
            },
            "alchemical_operations": [
                "Calcination", "Dissolution", "Separation", "Conjunction",
                "Fermentation", "Distillation", "Coagulation"
            ],
            "divine_names": {
                "YHVH": "Tetragrammaton - The Unpronounceable Name",
                "AGLA": "Atah Gibor Le-Olam Adonai - Thou art mighty forever, O Lord",
                "EHYEH": "I Am That I Am - Divine Being",
                "ADONAI": "My Lord - Divine Authority"
            }
        }
    
    def search_collections(self, query: str, school: Optional[PhilosophicalSchool] = None) -> Dict[str, Any]:
        """Search the philosophical collections"""
        results = {"query": query, "matches": []}
        
        collections_to_search = [school] if school else list(PhilosophicalSchool)
        
        for school_enum in collections_to_search:
            if school_enum not in self.philosophical_collections:
                continue
                
            collection = self.philosophical_collections[school_enum]
            
            # Search in core texts
            for text in collection["core_texts"]:
                if any(word.lower() in text.lower() for word in query.split()):
                    results["matches"].append({
                        "school": school_enum.value,
                        "type": "core_text",
                        "title": text,
                        "relevance": self.calculate_relevance(query, text)
                    })
            
            # Search in key concepts
            for concept in collection["key_concepts"]:
                if any(word.lower() in concept.lower() for word in query.split()):
                    results["matches"].append({
                        "school": school_enum.value,
                        "type": "concept",
                        "title": concept,
                        "relevance": self.calculate_relevance(query, concept)
                    })
        
        # Sort by relevance
        results["matches"].sort(key=lambda x: x["relevance"], reverse=True)
        
        return results
    
    def calculate_relevance(self, query: str, text: str) -> float:
        """Calculate relevance score for search results"""
        query_words = query.lower().split()
        text_lower = text.lower()
        
        score = 0
        for word in query_words:
            if word in text_lower:
                score += 1
                # Bonus for exact word boundaries
                if f" {word} " in f" {text_lower} ":
                    score += 0.5
        
        return score / len(query_words)
    
    def activate_soyga_square(self, square_name: str) -> Dict[str, Any]:
        """Activate a Soyga square for divination or operation"""
        if square_name not in self.soyga_squares:
            return {"error": f"Soyga square '{square_name}' not found"}
        
        square = self.soyga_squares[square_name]
        
        return {
            "square_activated": square_name,
            "angel_governor": square.angel_governor,
            "size": square.size,
            "magical_constant": square.magical_constant,
            "activation_sequence": square.activation_sequence,
            "matrix_preview": square.numerical_matrix[:3],  # Show first 3 rows
            "guidance": f"Square of {square.angel_governor} is now active for consultation",
            "recommended_operation": "Pose your question and meditate on the numerical patterns"
        }
    
    def invoke_angel(self, angel_name: str) -> Dict[str, Any]:
        """Invoke an angel for guidance and correspondence"""
        angel_key = angel_name.lower()
        
        if angel_key not in self.angelic_correspondences:
            return {"error": f"Angel '{angel_name}' not found in correspondence tables"}
        
        angel = self.angelic_correspondences[angel_key]
        
        return {
            "invocation_complete": True,
            "angel": angel.angel_name,
            "hebrew_name": angel.hebrew_name,
            "gematria": angel.gematria_value,
            "sphere_of_influence": angel.sphere_of_influence,
            "invocation_formula": angel.invocation_formula,
            "correspondences": angel.correspondence_table,
            "presence_confirmed": True,
            "guidance": f"{angel.angel_name} responds to your invocation",
            "message": f"I am here to assist with matters of {angel.sphere_of_influence.lower()}"
        }
    
    def philosophical_inquiry(self, question: str, preferred_school: Optional[PhilosophicalSchool] = None) -> Dict[str, Any]:
        """Conduct a philosophical inquiry using the Hall's resources"""
        inquiry_id = len(self.active_inquiries) + 1
        
        # Determine relevant schools based on question content
        relevant_schools = self.analyze_question_for_schools(question)
        
        if preferred_school and preferred_school not in relevant_schools:
            relevant_schools.append(preferred_school)
        
        # Generate philosophical response
        response = {
            "inquiry_id": inquiry_id,
            "question": question,
            "relevant_schools": [school.value for school in relevant_schools],
            "philosophical_perspectives": {},
            "synthesis": "",
            "recommended_texts": [],
            "angel_consultation": None
        }
        
        # Get perspectives from each relevant school
        for school in relevant_schools[:3]:  # Limit to top 3 schools
            response["philosophical_perspectives"][school.value] = self.get_school_perspective(question, school)
        
        # Add to active inquiries
        self.active_inquiries.append({
            "id": inquiry_id,
            "question": question,
            "timestamp": "current_session",
            "status": "open_inquiry"
        })
        
        return response
    
    def analyze_question_for_schools(self, question: str) -> List[PhilosophicalSchool]:
        """Analyze question to determine relevant philosophical schools"""
        question_lower = question.lower()
        relevant_schools = []
        
        # Keyword mapping to schools
        school_keywords = {
            PhilosophicalSchool.PLATONIC: ["forms", "ideal", "cave", "philosopher", "republic", "justice"],
            PhilosophicalSchool.HERMETIC: ["above", "below", "correspondence", "alchemy", "emerald", "hermetic"],
            PhilosophicalSchool.GNOSTIC: ["gnosis", "knowledge", "sophia", "wisdom", "hidden", "secret"],
            PhilosophicalSchool.QABALISTIC: ["tree", "life", "sephirot", "gematria", "hebrew", "kabbalah"],
            PhilosophicalSchool.PYTHAGOREAN: ["number", "geometry", "mathematics", "harmony", "music", "proportion"],
            PhilosophicalSchool.NEOPLATONIC: ["emanation", "one", "plotinus", "unity", "divine"],
            PhilosophicalSchool.ALCHEMICAL: ["transform", "gold", "stone", "opus", "solve", "coagula"]
        }
        
        for school, keywords in school_keywords.items():
            if any(keyword in question_lower for keyword in keywords):
                relevant_schools.append(school)
        
        # Default to Hermetic if no specific matches
        if not relevant_schools:
            relevant_schools.append(PhilosophicalSchool.HERMETIC)
        
        return relevant_schools
    
    def get_school_perspective(self, question: str, school: PhilosophicalSchool) -> str:
        """Get a specific school's perspective on a question"""
        perspectives = {
            PhilosophicalSchool.PLATONIC: f"From the Platonic view, this question touches upon the eternal Forms and the journey from the cave of ignorance to the light of truth...",
            PhilosophicalSchool.HERMETIC: f"The Hermetic tradition teaches 'As Above, So Below' - this question reflects the correspondence between different levels of reality...",
            PhilosophicalSchool.GNOSTIC: f"Gnostic wisdom seeks the divine spark within. This inquiry calls for gnosis - direct experiential knowledge...",
            PhilosophicalSchool.QABALISTIC: f"Through the lens of Qabalah, we examine this question via the Tree of Life and the pathways of divine emanation...",
            PhilosophicalSchool.PYTHAGOREAN: f"Pythagoras taught that 'All is Number.' This question can be understood through sacred geometry and mathematical harmony...",
            PhilosophicalSchool.NEOPLATONIC: f"The Neoplatonic perspective views this as emanation from the One, through Mind and Soul to the material realm...",
            PhilosophicalSchool.ALCHEMICAL: f"Alchemical wisdom approaches this as a transformative process - solve et coagula, dissolve and coagulate..."
        }
        
        return perspectives.get(school, "This school offers profound wisdom for contemplating your question...")
    
    def get_hall_status(self) -> Dict[str, Any]:
        """Get the current status of the Hall of Gnosis"""
        return {
            "hall": "Hall of Gnosis - Northern Wing",
            "collections": len(self.philosophical_collections),
            "soyga_squares": len(self.soyga_squares),
            "angelic_correspondences": len(self.angelic_correspondences),
            "active_inquiries": len(self.active_inquiries),
            "guardian_spirits": ["Raziel", "Thoth", "Hermes Trismegistus"],
            "rose_window": "gnosis_filter - 21 petals of philosophical illumination",
            "access_level": "open_inquiry",
            "current_focus": "Philosophy, angel codes, Soyga squares, hermetic wisdom",
            "status": "Fully illuminated and accessible for philosophical inquiry"
        }