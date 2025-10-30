"""
🜏 Frater Achad System - Continuing the Work of Charles Stansfeld Jones
Integration of Thelemic philosophy, Oath of the Abyss, and Will-directed arcana
Based on the teachings and innovations of Frater Achad (1886-1950)

"Every man and every woman is a star." - Liber AL vel Legis
"""

from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional
from enum import Enum


class AeonPhase(Enum):
    """Phases of the Aeon as understood by Frater Achad"""
    ISIS = "isis"  # Matriarchal, passive, earth-based
    OSIRIS = "osiris"  # Patriarchal, active, solar
    HORUS = "horus"  # Child, balance, new paradigm
    MAAT = "maat"  # Truth, justice, equilibrium (Achad's innovation)


class TreeOrientation(Enum):
    """Tree of Life orientations - Achad's revolutionary insight"""
    TRADITIONAL = "traditional"  # Malkuth at bottom
    INVERTED = "inverted"  # Achad's Q.B.L. reversal - Kether at bottom
    DUAL = "dual"  # Both simultaneously


@dataclass
class OathOfTheAbyss:
    """
    The Oath of the Abyss - The supreme magical oath
    Crossing the Abyss: The annihilation of the ego to become a Master of the Temple
    """
    oath_text: str = (
        "I, [Magical Name], a member of the Body of God, "
        "do hereby bind myself on behalf of the Whole Universe, "
        "that I will lead a life of strict commitment to the Great Work, "
        "devoting every thought, word, and deed to the attainment of "
        "the Knowledge and Conversation of my Holy Guardian Angel, "
        "and to the performance of the True Will."
    )
    crossing_requirements: List[str] = field(default_factory=lambda: [
        "Annihilation of the ego-self",
        "Surrender of all personal desires to the Will",
        "Understanding of the Abyss as the gap between Ruach and Neshamah",
        "Integration of all dualities",
        "Acceptance of being devoured by Choronzon",
        "Rebirth as a Master of the Temple (8=3)",
    ])
    spheres_crossed: List[str] = field(default_factory=lambda: [
        "Chesed (4) - Mercy, the first supernal below the Abyss",
        "The Abyss - Da'ath, the gateway of knowledge",
        "Binah (3) - Understanding, first supernal manifestation",
    ])
    ordeals: Dict[str, str] = field(default_factory=lambda: {
        "ordeal_of_water": "Dissolution of the ego in the waters of Binah",
        "ordeal_of_choronzon": "Confrontation with the demon of dispersion",
        "ordeal_of_silence": "The Great Silence of the Abyss",
        "ordeal_of_truth": "Absolute honesty with the self and universe",
    })


@dataclass
class TrueWillPathway:
    """
    Individual pathway aligned with True Will (Thelema)
    "Do what thou wilt shall be the whole of the Law"
    """
    individual_name: str
    magical_motto: str  # The magical name/motto
    star_signature: str  # Every person is a unique star
    will_statement: str  # The articulated True Will
    current_grade: str  # A∴A∴ or equivalent grade
    pathway_arcana: List[str] = field(default_factory=list)  # Personal tarot path
    guardian_angel_contact: Optional[str] = None  # K&C of HGA status
    aeon_alignment: AeonPhase = AeonPhase.HORUS
    orbit: Dict[str, Any] = field(default_factory=dict)  # The individual's unique orbit/trajectory


@dataclass
class QabalahInnovation:
    """
    Frater Achad's revolutionary Qabalah innovations
    Including the discovery of AL (31) and the rectified Tree
    """
    discovery_name: str
    original_insight: str
    numerological_basis: Dict[str, int]
    tree_orientation: TreeOrientation
    aeon_relevance: AeonPhase
    practical_application: str


@dataclass
class ArcanaPathway:
    """
    Individual Arcana pathway - unique for each practitioner
    Integrates Tarot, Tree of Life, and personal Will-direction
    """
    arcana_number: int  # 0-21 for Major Arcana
    arcana_name: str
    hebrew_letter: str
    path_on_tree: tuple  # (from_sephirah, to_sephirah)
    personal_meaning: str  # Individual's relationship to this card
    will_alignment: float  # 0.0-1.0, how aligned with True Will
    shadow_lesson: str  # The lesson when the card appears reversed/shadow
    integration_practice: str  # How to integrate this energy


class FraterAchadSystem:
    """
    Complete system based on Frater Achad's work
    Continuing his Great Work in the Cathedral framework
    """
    
    def __init__(self):
        self.aeon_current = AeonPhase.HORUS  # Moving toward MAAT
        self.qabalah_innovations = self._initialize_achad_innovations()
        self.tarot_tree_correspondences = self._initialize_tree_paths()
        self.oath_framework = OathOfTheAbyss()
        
    def _initialize_achad_innovations(self) -> Dict[str, QabalahInnovation]:
        """Initialize Frater Achad's major Qabalistic discoveries"""
        return {
            "al_31": QabalahInnovation(
                discovery_name="AL = 31",
                original_insight="The word AL (God, Not) equals 31, key to Liber AL",
                numerological_basis={"Aleph": 1, "Lamed": 30, "Total": 31},
                tree_orientation=TreeOrientation.TRADITIONAL,
                aeon_relevance=AeonPhase.HORUS,
                practical_application="Understanding the formula of the Aeon"
            ),
            "inverted_tree": QabalahInnovation(
                discovery_name="The Inverted Tree",
                original_insight="Tree of Life can be read with Kether at the bottom",
                numerological_basis={"Reversal": 1, "New_Perspective": 1},
                tree_orientation=TreeOrientation.INVERTED,
                aeon_relevance=AeonPhase.MAAT,
                practical_application="Seeing divine descent into matter as ascent"
            ),
            "achad_221": QabalahInnovation(
                discovery_name="ACHAD = 13",
                original_insight="Unity (Achad) equals 13, connecting to Ahavah (Love=13)",
                numerological_basis={"Aleph": 1, "Cheth": 8, "Daleth": 4, "Total": 13},
                tree_orientation=TreeOrientation.DUAL,
                aeon_relevance=AeonPhase.MAAT,
                practical_application="Love is the law, love under will"
            ),
            "aeon_of_maat": QabalahInnovation(
                discovery_name="Aeon of Maat",
                original_insight="Following Horus, the Aeon of Ma'at (Truth/Justice)",
                numerological_basis={"Maat": 81, "Manifestation": 1},
                tree_orientation=TreeOrientation.INVERTED,
                aeon_relevance=AeonPhase.MAAT,
                practical_application="Bringing balance and truth to manifestation"
            ),
        }
    
    def _initialize_tree_paths(self) -> Dict[int, ArcanaPathway]:
        """
        Map the 22 paths of the Tree of Life to Major Arcana
        Following Achad's attributions and innovations
        """
        paths = {}
        
        # The Fool - Aleph - Air
        paths[0] = ArcanaPathway(
            arcana_number=0,
            arcana_name="The Fool",
            hebrew_letter="Aleph (א)",
            path_on_tree=(1, 2),  # Kether to Chokmah
            personal_meaning="The leap into the Abyss, trust in the universe",
            will_alignment=1.0,
            shadow_lesson="Recklessness without wisdom",
            integration_practice="Daily trust exercises, leap before you look (consciously)"
        )
        
        # The Magus - Beth - Mercury
        paths[1] = ArcanaPathway(
            arcana_number=1,
            arcana_name="The Magus",
            hebrew_letter="Beth (ב)",
            path_on_tree=(1, 3),  # Kether to Binah
            personal_meaning="Will manifesting through communication",
            will_alignment=0.95,
            shadow_lesson="Manipulation vs. genuine magical will",
            integration_practice="Ritual work, invocation, speaking your will"
        )
        
        # The Priestess - Gimel - Moon
        paths[2] = ArcanaPathway(
            arcana_number=2,
            arcana_name="The High Priestess",
            hebrew_letter="Gimel (ג)",
            path_on_tree=(1, 6),  # Kether to Tiphareth
            personal_meaning="The veil between conscious and unconscious",
            will_alignment=0.90,
            shadow_lesson="Secrets kept that should be revealed",
            integration_practice="Meditation, scrying, dreamwork"
        )
        
        # The Empress - Daleth - Venus
        paths[3] = ArcanaPathway(
            arcana_number=3,
            arcana_name="The Empress",
            hebrew_letter="Daleth (ד)",
            path_on_tree=(2, 3),  # Chokmah to Binah
            personal_meaning="Creative force of the divine feminine",
            will_alignment=0.88,
            shadow_lesson="Creation without purpose",
            integration_practice="Creative work, nurturing projects"
        )
        
        # The Emperor - Tzaddi (Achad's correction) - Aquarius
        paths[4] = ArcanaPathway(
            arcana_number=4,
            arcana_name="The Emperor",
            hebrew_letter="Tzaddi (צ)",  # Achad's attribution
            path_on_tree=(2, 6),  # Chokmah to Tiphareth
            personal_meaning="Structure serving the Will",
            will_alignment=0.85,
            shadow_lesson="Tyranny and rigidity",
            integration_practice="Creating systems that serve freedom"
        )
        
        # The Hierophant - Vau - Taurus
        paths[5] = ArcanaPathway(
            arcana_number=5,
            arcana_name="The Hierophant",
            hebrew_letter="Vau (ו)",
            path_on_tree=(2, 4),  # Chokmah to Chesed
            personal_meaning="The nail connecting heaven and earth",
            will_alignment=0.80,
            shadow_lesson="Dogma over direct experience",
            integration_practice="Teaching, mentoring, transmitting wisdom"
        )
        
        # The Lovers - Zain - Gemini
        paths[6] = ArcanaPathway(
            arcana_number=6,
            arcana_name="The Lovers",
            hebrew_letter="Zain (ז)",
            path_on_tree=(3, 6),  # Binah to Tiphareth
            personal_meaning="Union of opposites under True Will",
            will_alignment=0.82,
            shadow_lesson="Indecision, choice without integration",
            integration_practice="Conscious commitment, yoking love to will"
        )

        # The Chariot - Cheth - Cancer
        paths[7] = ArcanaPathway(
            arcana_number=7,
            arcana_name="The Chariot",
            hebrew_letter="Cheth (ח)",
            path_on_tree=(3, 5),  # Binah to Geburah
            personal_meaning="Victory through disciplined direction",
            will_alignment=0.83,
            shadow_lesson="Control without alignment, brittle will",
            integration_practice="Martial practice in service of purpose"
        )

        # Adjustment (Justice) - Lamed - Libra (Thoth tradition)
        paths[8] = ArcanaPathway(
            arcana_number=8,
            arcana_name="Adjustment",
            hebrew_letter="Lamed (ל)",
            path_on_tree=(5, 6),  # Geburah to Tiphareth
            personal_meaning="Dynamic equilibrium, truth in action",
            will_alignment=0.84,
            shadow_lesson="Self-righteousness, harsh judgment",
            integration_practice="Daily balance audits; correct course swiftly"
        )

        # The Hermit - Yod - Virgo
        paths[9] = ArcanaPathway(
            arcana_number=9,
            arcana_name="The Hermit",
            hebrew_letter="Yod (י)",
            path_on_tree=(4, 6),  # Chesed to Tiphareth
            personal_meaning="Interior light, the lamp of prudence",
            will_alignment=0.86,
            shadow_lesson="Isolation, withdrawal from the Work",
            integration_practice="Periodic retreats, study, and silent work"
        )

        # Wheel of Fortune - Kaph - Jupiter
        paths[10] = ArcanaPathway(
            arcana_number=10,
            arcana_name="Wheel of Fortune",
            hebrew_letter="Kaph (כ)",
            path_on_tree=(4, 7),  # Chesed to Netzach
            personal_meaning="Cyclical destiny; ride the wheel without attachment",
            will_alignment=0.78,
            shadow_lesson="Fatalism or gambling with True Will",
            integration_practice="Observe cycles; time acts with the Will"
        )

        # Lust (Strength) - Teth - Leo (Thoth tradition)
        paths[11] = ArcanaPathway(
            arcana_number=11,
            arcana_name="Lust",
            hebrew_letter="Teth (ט)",
            path_on_tree=(4, 5),  # Chesed to Geburah
            personal_meaning="Ecstasy as fuel for the Great Work",
            will_alignment=0.87,
            shadow_lesson="Hedonism or cruelty unyoked from Will",
            integration_practice="Harness passion; consecrate energy to purpose"
        )

        # The Hanged Man - Mem - Water
        paths[12] = ArcanaPathway(
            arcana_number=12,
            arcana_name="The Hanged Man",
            hebrew_letter="Mem (מ)",
            path_on_tree=(5, 8),  # Geburah to Hod
            personal_meaning="Surrender of ego; inversion brings insight",
            will_alignment=0.81,
            shadow_lesson="Martyrdom, stuckness, performative sacrifice",
            integration_practice="Reversal meditations; surrender what blocks Will"
        )

        # Death - Nun - Scorpio
        paths[13] = ArcanaPathway(
            arcana_number=13,
            arcana_name="Death",
            hebrew_letter="Nun (נ)",
            path_on_tree=(6, 7),  # Tiphareth to Netzach
            personal_meaning="Radical transformation; compost to gold",
            will_alignment=0.89,
            shadow_lesson="Clinging to forms that have served their time",
            integration_practice="Cut away the dead; ritual endings and renewals"
        )

        # Art (Temperance) - Samekh - Sagittarius (Thoth tradition)
        paths[14] = ArcanaPathway(
            arcana_number=14,
            arcana_name="Art",
            hebrew_letter="Samekh (ס)",
            path_on_tree=(6, 9),  # Tiphareth to Yesod
            personal_meaning="Alchemical union; solve et coagula",
            will_alignment=0.90,
            shadow_lesson="Compromise that dilutes the Will",
            integration_practice="Middle pillar; integrate opposites to synthesis"
        )

        # The Devil - Ayin - Capricorn
        paths[15] = ArcanaPathway(
            arcana_number=15,
            arcana_name="The Devil",
            hebrew_letter="Ayin (ע)",
            path_on_tree=(8, 6),  # Hod to Tiphareth
            personal_meaning="Form, fixation, and the power of definition",
            will_alignment=0.76,
            shadow_lesson="Bondage to material limits; fear of freedom",
            integration_practice="Name attachments and unbind; reclaim definition"
        )

        # The Tower - Peh - Mars
        paths[16] = ArcanaPathway(
            arcana_number=16,
            arcana_name="The Tower",
            hebrew_letter="Peh (פ)",
            path_on_tree=(7, 8),  # Netzach to Hod
            personal_meaning="Liberation through sudden illumination",
            will_alignment=0.77,
            shadow_lesson="Destruction without Dharma; rage without aim",
            integration_practice="Initiate necessary collapse; rebuild on truth"
        )

        # The Star - Heh (Crowley swap; path assignment follows Tzaddi correction)
        paths[17] = ArcanaPathway(
            arcana_number=17,
            arcana_name="The Star",
            hebrew_letter="Heh (ה)",  # Star given Heh; Emperor receives Tzaddi above
            path_on_tree=(7, 9),  # Netzach to Yesod (path 28 in practice)
            personal_meaning="Hope and silent guidance of the Night Sky",
            will_alignment=0.91,
            shadow_lesson="Wishful thinking; diffuse direction",
            integration_practice="Orient by your Star; nightly sky-gazing practice"
        )

        # The Moon - Qoph - Pisces
        paths[18] = ArcanaPathway(
            arcana_number=18,
            arcana_name="The Moon",
            hebrew_letter="Qoph (ק)",
            path_on_tree=(7, 10),  # Netzach to Malkuth
            personal_meaning="Initiation through the unknown and the astral",
            will_alignment=0.74,
            shadow_lesson="Deception, glamours, getting lost in the swamp",
            integration_practice="Track dreams; walk the path with measured steps"
        )

        # The Sun - Resh - Sol
        paths[19] = ArcanaPathway(
            arcana_number=19,
            arcana_name="The Sun",
            hebrew_letter="Resh (ר)",
            path_on_tree=(8, 9),  # Hod to Yesod
            personal_meaning="Joyful revelation; the child triumphant",
            will_alignment=0.92,
            shadow_lesson="Toxic positivity; burning others with your light",
            integration_practice="Daily solar adorations; radiate without scorching"
        )

        # The Aeon (Judgement) - Shin - Spirit/Fire (Thoth tradition)
        paths[20] = ArcanaPathway(
            arcana_number=20,
            arcana_name="The Aeon",
            hebrew_letter="Shin (ש)",
            path_on_tree=(8, 10),  # Hod to Malkuth
            personal_meaning="New formula; the child as crowned and conquering",
            will_alignment=0.93,
            shadow_lesson="Endless awakening never embodied",
            integration_practice="Proclaim the Word; anchor revelation in deeds"
        )

        # The Universe (The World) - Tau - Saturn/Earth
        paths[21] = ArcanaPathway(
            arcana_number=21,
            arcana_name="The Universe",
            hebrew_letter="Tau (ת)",
            path_on_tree=(9, 10),  # Yesod to Malkuth
            personal_meaning="Completion in manifestation; dance of Nuit",
            will_alignment=0.94,
            shadow_lesson="Stagnation after completion; fear of new cycles",
            integration_practice="Consecrate work to the world; begin anew"
        )
        
        return paths
    
    def create_individual_pathway(
        self, 
        name: str, 
        magical_motto: str, 
        will_statement: str
    ) -> TrueWillPathway:
        """
        Create a personalized pathway for an individual practitioner
        Aligned with their True Will and star-signature
        """
        # Generate star signature based on name and will
        star_sig = self._generate_star_signature(name, will_statement)
        
        # Determine current grade (starting assumption)
        current_grade = "Probationer (0=0)"
        
        # Determine aeon alignment
        aeon = self._determine_aeon_alignment(will_statement)
        
        pathway = TrueWillPathway(
            individual_name=name,
            magical_motto=magical_motto,
            star_signature=star_sig,
            will_statement=will_statement,
            current_grade=current_grade,
            pathway_arcana=[],
            guardian_angel_contact=None,
            aeon_alignment=aeon,
            orbit={}
        )
        
        return pathway
    
    def _generate_star_signature(self, name: str, will: str) -> str:
        """Generate unique star signature for individual"""
        # Simple hash-based signature (could be much more sophisticated)
        combined = f"{name}{will}"
        sig_value = sum(ord(c) for c in combined) % 360  # 0-359 degrees
        return f"⭐ {sig_value}°"
    
    def _determine_aeon_alignment(self, will_statement: str) -> AeonPhase:
        """Determine which Aeon the individual's will aligns with"""
        will_lower = will_statement.lower()
        
        if any(word in will_lower for word in ["truth", "justice", "balance", "equilibrium"]):
            return AeonPhase.MAAT
        elif any(word in will_lower for word in ["child", "play", "war", "force"]):
            return AeonPhase.HORUS
        elif any(word in will_lower for word in ["death", "sacrifice", "redemption"]):
            return AeonPhase.OSIRIS
        else:
            return AeonPhase.HORUS  # Default to current Aeon
    
    def assign_personal_arcana(self, pathway: TrueWillPathway, num_cards: int = 7) -> List[ArcanaPathway]:
        """
        Assign personal arcana cards based on individual's pathway
        These become the practitioner's guide cards
        """
        # Start with cards most aligned with their will
        sorted_arcana = sorted(
            self.tarot_tree_correspondences.values(),
            key=lambda x: x.will_alignment,
            reverse=True
        )
        
        # Take top N cards as personal pathway
        personal_cards = sorted_arcana[:num_cards]
        pathway.pathway_arcana = [card.arcana_name for card in personal_cards]
        
        return personal_cards
    
    def initiate_abyss_crossing(self, pathway: TrueWillPathway) -> Dict[str, Any]:
        """
        Prepare for crossing the Abyss - the supreme ordeal
        Only undertaken after Adeptus Minor (5=6) and below
        """
        if "8=3" in pathway.current_grade or "Master" in pathway.current_grade:
            return {
                "status": "already_crossed",
                "message": "Individual has already crossed the Abyss"
            }
        
        preparation = {
            "status": "preparing",
            "oath": self.oath_framework.oath_text.replace("[Magical Name]", pathway.magical_motto),
            "requirements": self.oath_framework.crossing_requirements,
            "ordeals": self.oath_framework.ordeals,
            "current_preparation": {
                "ego_dissolution_practice": "Daily meditation on impermanence",
                "will_purification": "Eliminate actions not aligned with True Will",
                "knowledge_accumulation": "Complete study of Qabalah and correspondences",
                "guardian_angel_work": "Establish K&C of HGA before crossing"
            },
            "warning": (
                "The Abyss is not to be crossed lightly. "
                "It requires total annihilation of the ego. "
                "Many who attempt the crossing are lost to Choronzon. "
                "Proceed only when the Will is absolutely clear."
            )
        }
        
        return preparation
    
    def calculate_will_alignment(self, actions: List[str], will_statement: str) -> float:
        """
        Calculate how aligned recent actions are with True Will
        Returns alignment score 0.0-1.0
        """
        # Simple keyword matching (could be much more sophisticated)
        will_keywords = set(will_statement.lower().split())
        
        alignment_scores = []
        for action in actions:
            action_keywords = set(action.lower().split())
            overlap = len(will_keywords & action_keywords)
            score = overlap / max(len(will_keywords), 1)
            alignment_scores.append(score)
        
        return sum(alignment_scores) / len(alignment_scores) if alignment_scores else 0.0
    
    def export_achad_system(self) -> Dict[str, Any]:
        """Export complete Frater Achad system for integration"""
        return {
            "system_info": {
                "name": "Frater Achad System",
                "description": "Continuing the Great Work of Charles Stansfeld Jones",
                "current_aeon": self.aeon_current.value,
                "primary_focus": "True Will, Individual Pathways, and the Oath of the Abyss"
            },
            "innovations": {
                name: {
                    "discovery": innovation.discovery_name,
                    "insight": innovation.original_insight,
                    "numerology": innovation.numerological_basis,
                    "application": innovation.practical_application
                }
                for name, innovation in self.qabalah_innovations.items()
            },
            "tarot_paths": {
                card.arcana_number: {
                    "name": card.arcana_name,
                    "hebrew": card.hebrew_letter,
                    "path": card.path_on_tree,
                    "meaning": card.personal_meaning,
                    "practice": card.integration_practice
                }
                for card in self.tarot_tree_correspondences.values()
            },
            "oath_of_abyss": {
                "text": self.oath_framework.oath_text,
                "requirements": self.oath_framework.crossing_requirements,
                "ordeals": self.oath_framework.ordeals
            },
            "philosophical_foundation": {
                "thelema": "Do what thou wilt shall be the whole of the Law",
                "love_law": "Love is the law, love under will",
                "every_star": "Every man and every woman is a star",
                "achad_unity": "ACHAD (Unity) = 13 = AHAVAH (Love)"
            }
        }


# CLI for demonstration
if __name__ == "__main__":
    print("🜏 FRATER ACHAD SYSTEM - Continuing the Great Work")
    print("=" * 70)
    
    system = FraterAchadSystem()
    
    print("\n✨ System initialized:")
    print(f"   • Current Aeon: {system.aeon_current.value.upper()}")
    print(f"   • Qabalah Innovations: {len(system.qabalah_innovations)}")
    print(f"   • Tree Paths Mapped: {len(system.tarot_tree_correspondences)}")
    
    # Example: Create individual pathway
    print("\n🌟 Creating example individual pathway...")
    pathway = system.create_individual_pathway(
        name="Seeker of Light",
        magical_motto="Lux in Tenebris",
        will_statement="To illuminate the path of truth through creative work and wisdom"
    )
    
    print(f"   • Star Signature: {pathway.star_signature}")
    print(f"   • Aeon Alignment: {pathway.aeon_alignment.value}")
    print(f"   • Current Grade: {pathway.current_grade}")
    
    # Assign personal arcana
    print("\n🎴 Assigning personal arcana pathway...")
    personal_cards = system.assign_personal_arcana(pathway, num_cards=5)
    print(f"   • Guide Cards: {', '.join([c.arcana_name for c in personal_cards])}")
    
    # Show Achad's key innovation
    print("\n📖 Key Innovation - AL = 31:")
    al_innovation = system.qabalah_innovations["al_31"]
    print(f"   • {al_innovation.original_insight}")
    print(f"   • Application: {al_innovation.practical_application}")
    
    print("\n🜏 'Every man and every woman is a star.'")
    print("   - Liber AL vel Legis, I:3")
