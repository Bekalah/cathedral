# 🃏 Cathedral Tarot System - Complete Alchemical Deck
# 22 Major Arcana + Extended Pantheon (21 Taras, Quan Yin, Elemental Correspondences)
# Choose Your Own Adventure stories with interconnected paths

import json
import random
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional, Tuple
from pathlib import Path
from enum import Enum

class WritingStyle(Enum):
    MOORE_MYSTICAL = "moore_mystical"  # Alan Moore meets mystical traditions
    LEARY_PSYCHEDELIC = "leary_psychedelic"  # Psychedelic consciousness expansion
    THOMPSON_GONZO = "thompson_gonzo"  # Gonzo journalism style
    JUNG_ANALYTICAL = "jung_analytical"  # Jungian psychological depth
    FORTUNE_HERMETIC = "fortune_hermetic"  # Dion Fortune hermetic wisdom

@dataclass
class TarotCard:
    """Complete tarot card with alchemical correspondences and story paths"""
    number: int
    name: str
    archetype: str
    element: str
    planet: str
    hebrew_letter: str
    tree_path: int
    keywords: List[str]
    upright_meaning: str
    reversed_meaning: str
    alchemical_symbol: str
    color_palette: List[str]
    solfeggio_frequency: int
    sacred_geometry: str
    crystal_correspondence: str
    writing_style: WritingStyle
    story_branches: List[Dict[str, Any]] = field(default_factory=list)
    character_voice: str = ""
    psychological_profile: str = ""

@dataclass
class ExtendedPantheon:
    """Extended pantheon cards (21 Taras, Quan Yin, etc.)"""
    name: str
    tradition: str
    element: str
    color: str
    mantra: str
    power: str
    sacred_geometry: str
    story_connection: str

class CathedralTarotSystem:
    """Complete cathedral tarot system with CYOA stories"""
    
    def __init__(self):
        self.major_arcana = self._initialize_major_arcana()
        self.extended_pantheon = self._initialize_extended_pantheon()
        self.story_paths = self._initialize_story_paths()
        self.active_stories = {}
        
    def _initialize_major_arcana(self) -> Dict[int, TarotCard]:
        """Initialize complete 22 Major Arcana with alchemical correspondences"""
        
        cards = {
            0: TarotCard(
                number=0,
                name="The Fool",
                archetype="The Innocent Wanderer",
                element="Air",
                planet="Uranus",
                hebrew_letter="Aleph",
                tree_path=11,
                keywords=["beginnings", "innocence", "spontaneity", "free_spirit"],
                upright_meaning="New beginnings, innocence, spontaneity, free spirit",
                reversed_meaning="Holding back, recklessness, risk-taking",
                alchemical_symbol="Prima Materia",
                color_palette=["#ffff99", "#87ceeb", "#ffffff"],
                solfeggio_frequency=396,
                sacred_geometry="circle",
                crystal_correspondence="clear_quartz",
                writing_style=WritingStyle.THOMPSON_GONZO,
                character_voice="Wild-eyed and fearless, speaking in stream-of-consciousness bursts about the cosmic joke and the beautiful terror of infinite possibility",
                psychological_profile="Represents the pure potential of consciousness before conditioning. The eternal child who sees wonder everywhere."
            ),
            
            1: TarotCard(
                number=1,
                name="The Magician",
                archetype="The Manifestor",
                element="Air",
                planet="Mercury",
                hebrew_letter="Beth",
                tree_path=12,
                keywords=["manifestation", "resourcefulness", "power", "inspired_action"],
                upright_meaning="Manifestation, resourcefulness, power, inspired action",
                reversed_meaning="Manipulation, poor planning, untapped talents",
                alchemical_symbol="Sulfur",
                color_palette=["#ff6600", "#ffff00", "#9932cc"],
                solfeggio_frequency=528,
                sacred_geometry="pentagram",
                crystal_correspondence="citrine",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Speaks with quiet authority about the fundamental interconnectedness of will, word, and world. Every sentence contains layers of meaning.",
                psychological_profile="The ego-consciousness that has learned to work with cosmic forces. Master of the four elements of manifestation."
            ),
            
            2: TarotCard(
                number=2,
                name="The High Priestess",
                archetype="The Intuitive Mystic",
                element="Water",
                planet="Moon",
                hebrew_letter="Gimel",
                tree_path=13,
                keywords=["intuition", "sacred_knowledge", "divine_feminine", "subconscious"],
                upright_meaning="Intuition, sacred knowledge, divine feminine, subconscious mind",
                reversed_meaning="Secrets, disconnected from intuition, withdrawal",
                alchemical_symbol="Mercury",
                color_palette=["#4169e1", "#c0c0c0", "#000000"],
                solfeggio_frequency=741,
                sacred_geometry="vesica_piscis",
                crystal_correspondence="moonstone",
                writing_style=WritingStyle.FORTUNE_HERMETIC,
                character_voice="Speaks in riddles and symbols, her words carrying the weight of ancient mysteries. Every utterance is a key to hidden knowledge.",
                psychological_profile="The anima, the receptive feminine principle that connects to the collective unconscious and archetypal wisdom."
            ),
            
            3: TarotCard(
                number=3,
                name="The Empress",
                archetype="The Creative Mother",
                element="Earth",
                planet="Venus",
                hebrew_letter="Daleth",
                tree_path=14,
                keywords=["fertility", "femininity", "beauty", "nature", "abundance"],
                upright_meaning="Fertility, femininity, beauty, nature, abundance",
                reversed_meaning="Creative block, dependence on others, smothering",
                alchemical_symbol="Copper",
                color_palette=["#228b22", "#ffd700", "#ff69b4"],
                solfeggio_frequency=639,
                sacred_geometry="hexagon",
                crystal_correspondence="rose_quartz",
                writing_style=WritingStyle.JUNG_ANALYTICAL,
                character_voice="Maternal and nurturing, yet speaking with the deep wisdom of nature's cycles. Her words bloom with life-giving power.",
                psychological_profile="The great mother archetype, representing the creative force that brings forth all life and beauty."
            ),
            
            4: TarotCard(
                number=4,
                name="The Emperor",
                archetype="The Wise Leader",
                element="Fire",
                planet="Aries",
                hebrew_letter="Heh",
                tree_path=15,
                keywords=["authority", "father_figure", "structure", "control"],
                upright_meaning="Authority, father-figure, structure, control",
                reversed_meaning="Tyranny, rigidity, coldness",
                alchemical_symbol="Iron",
                color_palette=["#dc143c", "#ffd700", "#8b0000"],
                solfeggio_frequency=417,
                sacred_geometry="square",
                crystal_correspondence="hematite",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Commands with the authority of natural law. His words carry the weight of cosmic order and responsibility.",
                psychological_profile="The animus, the masculine principle of order, structure, and conscious will directed toward manifestation."
            ),
            
            5: TarotCard(
                number=5,
                name="The Hierophant",
                archetype="The Spiritual Teacher",
                element="Earth",
                planet="Taurus",
                hebrew_letter="Vav",
                tree_path=16,
                keywords=["spiritual_wisdom", "religious_beliefs", "conformity", "tradition"],
                upright_meaning="Spiritual wisdom, religious beliefs, conformity, tradition",
                reversed_meaning="Personal beliefs, freedom, challenging the status quo",
                alchemical_symbol="Gold",
                color_palette=["#8b4513", "#ffd700", "#ffffff"],
                solfeggio_frequency=852,
                sacred_geometry="pentagram",
                crystal_correspondence="lapis_lazuli",
                writing_style=WritingStyle.FORTUNE_HERMETIC,
                character_voice="Speaks with the authority of tradition, yet hints at deeper mysteries beyond dogma. Every teaching is a key to liberation.",
                psychological_profile="The wise old man archetype, representing connection to collective wisdom and spiritual tradition."
            ),
            
            6: TarotCard(
                number=6,
                name="The Lovers",
                archetype="The Sacred Union",
                element="Air",
                planet="Gemini",
                hebrew_letter="Zayin",
                tree_path=17,
                keywords=["love", "harmony", "relationships", "values_alignment"],
                upright_meaning="Love, harmony, relationships, values alignment",
                reversed_meaning="Self-love, disharmony, imbalance, misalignment of values",
                alchemical_symbol="Chemical Wedding",
                color_palette=["#ff69b4", "#87ceeb", "#ffd700"],
                solfeggio_frequency=639,
                sacred_geometry="hexagram",
                crystal_correspondence="emerald",
                writing_style=WritingStyle.JUNG_ANALYTICAL,
                character_voice="Speaks of the sacred marriage of opposites, the union that creates wholeness. Words dance between heart and mind.",
                psychological_profile="The syzygy, the union of masculine and feminine within the psyche, creating integration and wholeness."
            ),
            
            7: TarotCard(
                number=7,
                name="The Chariot",
                archetype="The Determined Warrior",
                element="Water",
                planet="Cancer",
                hebrew_letter="Cheth",
                tree_path=18,
                keywords=["control", "willpower", "success", "determination"],
                upright_meaning="Control, willpower, success, determination",
                reversed_meaning="Self-discipline, hard control, lack of direction",
                alchemical_symbol="Antimony",
                color_palette=["#4682b4", "#c0c0c0", "#000000"],
                solfeggio_frequency=528,
                sacred_geometry="chariot_wheels",
                crystal_correspondence="carnelian",
                writing_style=WritingStyle.THOMPSON_GONZO,
                character_voice="Driven and intense, speaking of conquest through controlled fury. Every word is a battle cry for conscious evolution.",
                psychological_profile="The ego in service to the Self, learning to harness opposing forces through will and determination."
            ),
            
            8: TarotCard(
                number=8,
                name="Strength",
                archetype="The Gentle Power",
                element="Fire",
                planet="Leo",
                hebrew_letter="Teth",
                tree_path=19,
                keywords=["strength", "courage", "persuasion", "influence", "compassion"],
                upright_meaning="Strength, courage, persuasion, influence, compassion",
                reversed_meaning="Self-doubt, lack of confidence, raw emotion",
                alchemical_symbol="Lion",
                color_palette=["#ffd700", "#ff6347", "#32cd32"],
                solfeggio_frequency=741,
                sacred_geometry="infinity",
                crystal_correspondence="tiger_eye",
                writing_style=WritingStyle.JUNG_ANALYTICAL,
                character_voice="Speaks with quiet power about the strength that comes from gentleness. Every word tames the inner beast through love.",
                psychological_profile="The integration of instinctual energy with conscious awareness, transforming raw power into spiritual strength."
            ),
            
            9: TarotCard(
                number=9,
                name="The Hermit",
                archetype="The Wise Seeker",
                element="Earth",
                planet="Virgo",
                hebrew_letter="Yod",
                tree_path=20,
                keywords=["soul_searching", "seeking_inner_guidance", "introspection"],
                upright_meaning="Soul searching, seeking inner guidance, introspection",
                reversed_meaning="Isolation, loneliness, withdrawal",
                alchemical_symbol="Lamp",
                color_palette=["#9932cc", "#ffd700", "#696969"],
                solfeggio_frequency=852,
                sacred_geometry="spiral",
                crystal_correspondence="amethyst",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Speaks from the depths of solitary wisdom, each word illuminating the path inward. Ancient knowledge flows through simple truths.",
                psychological_profile="The wise old man who has found the light within and shares it to guide others on their journey."
            ),
            
            10: TarotCard(
                number=10,
                name="Wheel of Fortune",
                archetype="The Cosmic Cycles",
                element="Fire",
                planet="Jupiter",
                hebrew_letter="Kaph",
                tree_path=21,
                keywords=["good_luck", "karma", "life_cycles", "destiny", "turning_point"],
                upright_meaning="Good luck, karma, life cycles, destiny, turning point",
                reversed_meaning="Bad luck, lack of control, clinging to control, bad timing",
                alchemical_symbol="Ouroboros",
                color_palette=["#ffd700", "#4169e1", "#dc143c", "#32cd32"],
                solfeggio_frequency=528,
                sacred_geometry="wheel",
                crystal_correspondence="aventurine",
                writing_style=WritingStyle.LEARY_PSYCHEDELIC,
                character_voice="Speaks of the cosmic dance of fate and chance, the eternal cycles that govern all existence. Words spin like the wheel itself.",
                psychological_profile="The Self as it manifests through time and change, the eternal principle underlying all temporal experience."
            ),
            
            11: TarotCard(
                number=11,
                name="Justice",
                archetype="The Cosmic Balance",
                element="Air",
                planet="Libra",
                hebrew_letter="Lamed",
                tree_path=22,
                keywords=["justice", "fairness", "truth", "cause_and_effect", "law"],
                upright_meaning="Justice, fairness, truth, cause and effect, law",
                reversed_meaning="Unfairness, lack of accountability, dishonesty",
                alchemical_symbol="Scales",
                color_palette=["#4169e1", "#ffd700", "#ffffff"],
                solfeggio_frequency=741,
                sacred_geometry="balance",
                crystal_correspondence="sapphire",
                writing_style=WritingStyle.FORTUNE_HERMETIC,
                character_voice="Speaks with the impartial clarity of cosmic law, weighing each word with perfect precision. Truth flows through balanced judgment.",
                psychological_profile="The principle of equilibrium in the psyche, ensuring all parts receive their due measure."
            ),
            
            12: TarotCard(
                number=12,
                name="The Hanged Man",
                archetype="The Sacred Sacrifice",
                element="Water",
                planet="Neptune",
                hebrew_letter="Mem",
                tree_path=23,
                keywords=["suspension", "restriction", "letting_go", "sacrifice"],
                upright_meaning="Suspension, restriction, letting go, sacrifice",
                reversed_meaning="Delays, resistance, stalling, indecision",
                alchemical_symbol="Inversion",
                color_palette=["#4682b4", "#32cd32", "#ffd700"],
                solfeggio_frequency=639,
                sacred_geometry="inverted_triangle",
                crystal_correspondence="aquamarine",
                writing_style=WritingStyle.JUNG_ANALYTICAL,
                character_voice="Speaks from the wisdom of surrender, finding enlightenment in letting go. Words flow upward from depths of sacrifice.",
                psychological_profile="The ego's necessary death and rebirth, the sacrifice that leads to higher consciousness."
            ),
            
            13: TarotCard(
                number=13,
                name="Death",
                archetype="The Great Transformer",
                element="Water",
                planet="Scorpio",
                hebrew_letter="Nun",
                tree_path=24,
                keywords=["endings", "beginnings", "change", "transformation"],
                upright_meaning="Endings, beginnings, change, transformation",
                reversed_meaning="Resistance to change, personal transformation, inner purging",
                alchemical_symbol="Putrefaction",
                color_palette=["#000000", "#8b0000", "#ffd700"],
                solfeggio_frequency=417,
                sacred_geometry="scythe",
                crystal_correspondence="obsidian",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Speaks with the authority of inevitable transformation, cutting through illusion with surgical precision. Each word dissolves the unnecessary.",
                psychological_profile="The transformative force that destroys the old to make way for the new, the death that precedes rebirth."
            ),
            
            14: TarotCard(
                number=14,
                name="Temperance",
                archetype="The Divine Alchemist",
                element="Fire",
                planet="Sagittarius",
                hebrew_letter="Samekh",
                tree_path=25,
                keywords=["balance", "moderation", "patience", "purpose"],
                upright_meaning="Balance, moderation, patience, purpose",
                reversed_meaning="Imbalance, excess, self-healing, re-alignment",
                alchemical_symbol="Distillation",
                color_palette=["#4169e1", "#ffd700", "#32cd32"],
                solfeggio_frequency=741,
                sacred_geometry="triangle_in_square",
                crystal_correspondence="fluorite",
                writing_style=WritingStyle.FORTUNE_HERMETIC,
                character_voice="Speaks of the great work of balancing opposites, mixing fire and water to create the philosopher's stone. Wisdom flows like liquid light.",
                psychological_profile="The transcendent function that unites opposites within the psyche, creating new levels of integration."
            ),
            
            15: TarotCard(
                number=15,
                name="The Devil",
                archetype="The Shadow Revealer",
                element="Earth",
                planet="Capricorn",
                hebrew_letter="Ayin",
                tree_path=26,
                keywords=["shadow_self", "attachment", "addiction", "restriction", "sexuality"],
                upright_meaning="Shadow self, attachment, addiction, restriction, sexuality",
                reversed_meaning="Releasing limiting beliefs, exploring dark thoughts, detachment",
                alchemical_symbol="Baphomet",
                color_palette=["#8b0000", "#000000", "#ffd700"],
                solfeggio_frequency=396,
                sacred_geometry="inverted_pentagram",
                crystal_correspondence="garnet",
                writing_style=WritingStyle.THOMPSON_GONZO,
                character_voice="Laughs with dark humor about the chains we forge for ourselves. Speaks of liberation through embracing the shadow, not fleeing it.",
                psychological_profile="The shadow aspect of personality that must be integrated for wholeness, the dark teacher that shows us our chains."
            ),
            
            16: TarotCard(
                number=16,
                name="The Tower",
                archetype="The Divine Lightning",
                element="Fire",
                planet="Mars",
                hebrew_letter="Peh",
                tree_path=27,
                keywords=["sudden_change", "upheaval", "chaos", "revelation", "awakening"],
                upright_meaning="Sudden change, upheaval, chaos, revelation, awakening",
                reversed_meaning="Personal transformation, fear of change, averting disaster",
                alchemical_symbol="Lightning",
                color_palette=["#ff0000", "#ffff00", "#000000"],
                solfeggio_frequency=963,
                sacred_geometry="lightning_bolt",
                crystal_correspondence="ruby",
                writing_style=WritingStyle.LEARY_PSYCHEDELIC,
                character_voice="Speaks in explosive bursts about the necessary destruction of false structures. Words crackle with revolutionary energy.",
                psychological_profile="The sudden breakthrough that destroys ego-structures to allow authentic self to emerge."
            ),
            
            17: TarotCard(
                number=17,
                name="The Star",
                archetype="The Cosmic Hope",
                element="Air",
                planet="Aquarius",
                hebrew_letter="Tzaddi",
                tree_path=28,
                keywords=["hope", "faith", "purpose", "renewal", "spirituality"],
                upright_meaning="Hope, faith, purpose, renewal, spirituality",
                reversed_meaning="Lack of faith, despair, self-trust, disconnection",
                alchemical_symbol="Aquarius",
                color_palette=["#4169e1", "#87ceeb", "#ffd700"],
                solfeggio_frequency=852,
                sacred_geometry="eight_pointed_star",
                crystal_correspondence="aquamarine",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Speaks with the gentle certainty of starlight, offering guidance through the darkest nights. Words shimmer with cosmic hope.",
                psychological_profile="The transcendent Self that connects individual consciousness to universal wisdom and purpose."
            ),
            
            18: TarotCard(
                number=18,
                name="The Moon",
                archetype="The Illusion Walker",
                element="Water",
                planet="Pisces",
                hebrew_letter="Qoph",
                tree_path=29,
                keywords=["illusion", "fear", "anxiety", "subconscious", "intuition"],
                upright_meaning="Illusion, fear, anxiety, subconscious, intuition",
                reversed_meaning="Release of fear, repressed emotion, inner confusion",
                alchemical_symbol="Silver",
                color_palette=["#c0c0c0", "#4682b4", "#9932cc"],
                solfeggio_frequency=528,
                sacred_geometry="crescent",
                crystal_correspondence="moonstone",
                writing_style=WritingStyle.JUNG_ANALYTICAL,
                character_voice="Speaks in the language of dreams and symbols, revealing the twilight realm between conscious and unconscious. Words shimmer with mystery.",
                psychological_profile="The realm of the unconscious with its fears, dreams, and hidden wisdom that must be navigated with courage."
            ),
            
            19: TarotCard(
                number=19,
                name="The Sun",
                archetype="The Radiant Joy",
                element="Fire",
                planet="Sun",
                hebrew_letter="Resh",
                tree_path=30,
                keywords=["positivity", "fun", "warmth", "success", "vitality"],
                upright_meaning="Positivity, fun, warmth, success, vitality",
                reversed_meaning="Inner child, feeling down, overly optimistic",
                alchemical_symbol="Solar Gold",
                color_palette=["#ffd700", "#ff6347", "#ffff00"],
                solfeggio_frequency=741,
                sacred_geometry="solar_cross",
                crystal_correspondence="citrine",
                writing_style=WritingStyle.LEARY_PSYCHEDELIC,
                character_voice="Radiates pure joy and cosmic laughter. Words dance with the vitality of life itself, celebrating existence in all its glory.",
                psychological_profile="The realized Self in its full glory, consciousness united with its divine source, radiating joy and vitality."
            ),
            
            20: TarotCard(
                number=20,
                name="Judgement",
                archetype="The Cosmic Awakening",
                element="Fire",
                planet="Pluto",
                hebrew_letter="Shin",
                tree_path=31,
                keywords=["judgement", "rebirth", "inner_calling", "absolution"],
                upright_meaning="Judgement, rebirth, inner calling, absolution",
                reversed_meaning="Self-doubt, inner critic, ignoring the call, self-loathing",
                alchemical_symbol="Phoenix",
                color_palette=["#ff0000", "#ffd700", "#ffffff"],
                solfeggio_frequency=963,
                sacred_geometry="trumpet",
                crystal_correspondence="diamond",
                writing_style=WritingStyle.MOORE_MYSTICAL,
                character_voice="Speaks with the authority of final awakening, the voice that calls souls to their highest destiny. Words ring with cosmic truth.",
                psychological_profile="The higher Self that judges not with condemnation but with love, calling the personality to its ultimate awakening."
            ),
            
            21: TarotCard(
                number=21,
                name="The World",
                archetype="The Cosmic Completion",
                element="Earth",
                planet="Saturn",
                hebrew_letter="Tav",
                tree_path=32,
                keywords=["completion", "integration", "accomplishment", "travel"],
                upright_meaning="Completion, integration, accomplishment, travel",
                reversed_meaning="Seeking personal closure, short-cut to success, stagnation",
                alchemical_symbol="Philosopher's Stone",
                color_palette=["#9932cc", "#ffd700", "#32cd32", "#ff0000"],
                solfeggio_frequency=528,
                sacred_geometry="mandala",
                crystal_correspondence="diamond",
                writing_style=WritingStyle.FORTUNE_HERMETIC,
                character_voice="Speaks from the center of completion, where all opposites are reconciled. Words contain the wisdom of the entire journey.",
                psychological_profile="The fully individuated Self, containing all aspects in perfect balance, the completion of the hero's journey."
            )
        }
        
        return cards
    
    def _initialize_extended_pantheon(self) -> Dict[str, ExtendedPantheon]:
        """Initialize extended pantheon (21 Taras, Quan Yin, elemental beings)"""
        
        pantheon = {}
        
        # 21 Taras (Tibetan Buddhist goddesses)
        taras = [
            ("Green Tara", "swift_liberation", "earth", "#32cd32", "Om Tare Tuttare Ture Soha"),
            ("White Tara", "compassion_longevity", "water", "#ffffff", "Om Tare Tuttare Ture Mama Ayuh Punya Jnana Pustim Kuru Soha"),
            ("Red Tara", "magnetizing_power", "fire", "#ff0000", "Om Tare Tuttare Ture Hrih Soha"),
            ("Blue Tara", "fierce_protection", "air", "#4169e1", "Om Tare Tuttare Ture Hum Phat Soha"),
            ("Yellow Tara", "wealth_prosperity", "earth", "#ffd700", "Om Tare Tuttare Ture Ratnasambhave Soha"),
            ("Black Tara", "wrathful_protection", "space", "#000000", "Om Tare Tuttare Ture Kali Soha"),
            ("Orange Tara", "subjugating_obstacles", "fire", "#ff8c00", "Om Tare Tuttare Ture Vasam Soha"),
            ("Peaceful Tara", "calm_serenity", "water", "#87ceeb", "Om Tare Tuttare Ture Shanti Soha"),
            ("Wrathful Tara", "destroying_negativity", "fire", "#8b0000", "Om Tare Tuttare Ture Krodhani Soha"),
            ("Golden Tara", "supreme_wisdom", "light", "#ffd700", "Om Tare Tuttare Ture Jnana Soha"),
            ("Silver Tara", "lunar_mysteries", "water", "#c0c0c0", "Om Tare Tuttare Ture Chandra Soha"),
            ("Copper Tara", "healing_medicine", "earth", "#b87333", "Om Tare Tuttare Ture Bhaisajye Soha"),
            ("Crystal Tara", "clarity_purification", "space", "#ffffff", "Om Tare Tuttare Ture Suddhi Soha"),
            ("Rainbow Tara", "unity_diversity", "all", "#ff69b4", "Om Tare Tuttare Ture Sarvarupa Soha"),
            ("Jewel Tara", "precious_teachings", "earth", "#9932cc", "Om Tare Tuttare Ture Ratna Soha"),
            ("Lotus Tara", "pure_compassion", "water", "#ff69b4", "Om Tare Tuttare Ture Padma Soha"),
            ("Sword Tara", "cutting_ignorance", "air", "#c0c0c0", "Om Tare Tuttare Ture Khadga Soha"),
            ("Mirror Tara", "reflecting_truth", "space", "#e6e6fa", "Om Tare Tuttare Ture Adarsha Soha"),
            ("Dancing Tara", "joyful_liberation", "fire", "#ff1493", "Om Tare Tuttare Ture Nartana Soha"),
            ("Singing Tara", "melodious_dharma", "air", "#9370db", "Om Tare Tuttare Ture Gita Soha"),
            ("Silent Tara", "profound_stillness", "space", "#2f4f4f", "Om Tare Tuttare Ture Mauna Soha")
        ]
        
        for i, (name, power, element, color, mantra) in enumerate(taras):
            pantheon[f"tara_{i+1:02d}"] = ExtendedPantheon(
                name=name,
                tradition="Tibetan Buddhist",
                element=element,
                color=color,
                mantra=mantra,
                power=power,
                sacred_geometry="lotus_mandala",
                story_connection=f"Appears in stories requiring {power.replace('_', ' ')}"
            )
        
        # Quan Yin
        pantheon["quan_yin"] = ExtendedPantheon(
            name="Quan Yin",
            tradition="Chinese Buddhist",
            element="water",
            color="#87ceeb",
            mantra="Om Mani Padme Hum",
            power="infinite_compassion",
            sacred_geometry="thousand_petaled_lotus",
            story_connection="The supreme compassionate guide who appears in moments of deepest need"
        )
        
        # Elemental Correspondences
        elementals = [
            ("Salamander", "Fire Elemental", "fire", "#ff4500", "Ignis Natura Renovatur Integra"),
            ("Undine", "Water Elemental", "water", "#4169e1", "Aqua Vitae Semper Fluens"),
            ("Sylph", "Air Elemental", "air", "#87ceeb", "Ventus Spiritus Libertas"),
            ("Gnome", "Earth Elemental", "earth", "#8b4513", "Terra Stabilis Fundamentum")
        ]
        
        for name, tradition, element, color, mantra in elementals:
            pantheon[name.lower()] = ExtendedPantheon(
                name=name,
                tradition="Western Hermetic",
                element=element,
                color=color,
                mantra=mantra,
                power=f"{element}_mastery",
                sacred_geometry=f"{element}_platonic_solid",
                story_connection=f"Guardian of {element} realm stories"
            )
        
        return pantheon
    
    def _initialize_story_paths(self) -> Dict[str, Any]:
        """Initialize the 22 master CYOA stories with interconnected paths"""
        
        return {
            "fool_journey": {
                "title": "The Fool's Cosmic Leap",
                "starting_card": 0,
                "style": WritingStyle.THOMPSON_GONZO,
                "opening": "You wake up on the edge of a cliff with no memory and a strange urge to jump...",
                "branches": [
                    {
                        "choice": "Take the leap into the abyss",
                        "leads_to": "magician_manifestation",
                        "consequence": "reality_shift",
                        "narrative": "The fall becomes flight as you discover the secret of conscious falling..."
                    },
                    {
                        "choice": "Turn back toward the familiar",
                        "leads_to": "world_completion",
                        "consequence": "missed_opportunity",
                        "narrative": "Sometimes the greatest journey is the one not taken..."
                    },
                    {
                        "choice": "Stand at the edge and observe",
                        "leads_to": "hermit_wisdom",
                        "consequence": "inner_revelation",
                        "narrative": "In stillness, the cliff reveals itself as an illusion..."
                    }
                ]
            },
            
            "magician_manifestation": {
                "title": "The Magician's Laboratory",
                "starting_card": 1,
                "style": WritingStyle.MOORE_MYSTICAL,
                "opening": "You materialize in a laboratory where reality bends to will and every thought becomes form...",
                "branches": [
                    {
                        "choice": "Attempt to manifest your deepest desire",
                        "leads_to": "empress_creation",
                        "consequence": "creative_overflow",
                        "narrative": "Power without wisdom births monsters beautiful and terrible..."
                    },
                    {
                        "choice": "Study the tools and their correspondences", 
                        "leads_to": "hierophant_teaching",
                        "consequence": "knowledge_gained",
                        "narrative": "Each symbol contains universes, each tool a doorway to mastery..."
                    },
                    {
                        "choice": "Seek to understand the source of power",
                        "leads_to": "high_priestess_mystery",
                        "consequence": "deeper_mystery",
                        "narrative": "Behind every manifestation lies an even greater mystery..."
                    }
                ]
            },
            
            "high_priestess_mystery": {
                "title": "The High Priestess' Veil",
                "starting_card": 2,
                "style": WritingStyle.FORTUNE_HERMETIC,
                "opening": "You find yourself before a vast temple where the veils between worlds grow thin...",
                "branches": [
                    {
                        "choice": "Part the veil and step through",
                        "leads_to": "moon_illusion",
                        "consequence": "lost_in_illusion",
                        "narrative": "Beyond the veil lies a labyrinth of mirrors and shadows..."
                    },
                    {
                        "choice": "Sit in meditation before the mystery",
                        "leads_to": "hermit_wisdom",
                        "consequence": "inner_illumination",
                        "narrative": "The greatest mysteries reveal themselves to patient observation..."
                    },
                    {
                        "choice": "Ask the priestess for guidance",
                        "leads_to": "lovers_choice",
                        "consequence": "sacred_relationship",
                        "narrative": "She speaks only in questions that lead to deeper questions..."
                    }
                ]
            }
            # Additional story paths would continue for all 22 cards...
        }
    
    def draw_card(self, question: str = "") -> Tuple[TarotCard, bool]:
        """Draw a card from the deck (upright or reversed)"""
        card_number = random.randint(0, 21)
        is_reversed = random.choice([True, False])
        
        return self.major_arcana[card_number], is_reversed
    
    def begin_story(self, card_number: int, user_name: str = "Seeker") -> Dict[str, Any]:
        """Begin a CYOA story based on a specific card"""
        if card_number not in self.major_arcana:
            return {"error": "Card not found"}
        
        card = self.major_arcana[card_number]
        story_key = None
        
        # Find corresponding story
        for key, story in self.story_paths.items():
            if story["starting_card"] == card_number:
                story_key = key
                break
        
        if not story_key:
            return {"error": "Story not found for this card"}
        
        story = self.story_paths[story_key]
        session_id = f"{user_name}_{story_key}_{random.randint(1000, 9999)}"
        
        # Initialize story session
        self.active_stories[session_id] = {
            "user_name": user_name,
            "current_card": card,
            "story_key": story_key,
            "choices_made": [],
            "current_branch": 0,
            "style": story["style"],
            "companions": [],  # Extended pantheon characters that join
            "artifacts": [],   # Magical items gained
            "karma": 0        # Cumulative effect of choices
        }
        
        return {
            "session_id": session_id,
            "card": {
                "name": card.name,
                "archetype": card.archetype,
                "keywords": card.keywords,
                "character_voice": card.character_voice
            },
            "story": {
                "title": story["title"],
                "opening": story["opening"],
                "style": story["style"].value,
                "branches": story["branches"]
            },
            "extended_pantheon_available": list(self.extended_pantheon.keys())[:5]  # Show first 5
        }
    
    def make_choice(self, session_id: str, choice_index: int) -> Dict[str, Any]:
        """Make a choice in an active story"""
        if session_id not in self.active_stories:
            return {"error": "Story session not found"}
        
        session = self.active_stories[session_id]
        story = self.story_paths[session["story_key"]]
        
        if choice_index >= len(story["branches"]):
            return {"error": "Invalid choice"}
        
        chosen_branch = story["branches"][choice_index]
        session["choices_made"].append(chosen_branch)
        
        # Update karma based on choice
        if chosen_branch["consequence"] == "reality_shift":
            session["karma"] += 10
        elif chosen_branch["consequence"] == "missed_opportunity":
            session["karma"] -= 5
        elif chosen_branch["consequence"] == "inner_revelation":
            session["karma"] += 15
        
        # Check if choice leads to new story
        next_story_key = chosen_branch.get("leads_to")
        if next_story_key and next_story_key in self.story_paths:
            next_story = self.story_paths[next_story_key]
            session["story_key"] = next_story_key
            
            return {
                "narrative": chosen_branch["narrative"],
                "consequence": chosen_branch["consequence"],
                "karma_change": session["karma"],
                "new_story": {
                    "title": next_story["title"],
                    "opening": next_story["opening"],
                    "branches": next_story["branches"]
                },
                "continue": True
            }
        else:
            return {
                "narrative": chosen_branch["narrative"],
                "consequence": chosen_branch["consequence"],
                "karma_change": session["karma"],
                "story_complete": True,
                "final_message": "Your journey through this path is complete. The cards shuffle, ready for a new tale..."
            }
    
    def get_full_deck_download(self) -> Dict[str, Any]:
        """Generate complete tarot deck data for download"""
        full_deck = {
            "metadata": {
                "title": "Cathedral Alchemical Tarot",
                "version": "1.0.0",
                "description": "Complete 22 Major Arcana with alchemical correspondences and extended pantheon",
                "total_cards": 22,
                "extended_pantheon": len(self.extended_pantheon),
                "story_paths": len(self.story_paths),
                "open_source": True,
                "license": "Creative Commons Attribution-ShareAlike 4.0"
            },
            "major_arcana": {},
            "extended_pantheon": self.extended_pantheon,
            "correspondence_tables": {
                "elements": ["Fire", "Water", "Air", "Earth", "Spirit"],
                "planets": ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
                "hebrew_letters": ["Aleph", "Beth", "Gimel", "Daleth", "Heh", "Vav", "Zayin", "Cheth", "Teth", "Yod", "Kaph", "Lamed", "Mem", "Nun", "Samekh", "Ayin", "Peh", "Tzaddi", "Qoph", "Resh", "Shin", "Tav"],
                "tree_of_life_paths": list(range(11, 33)),
                "solfeggio_frequencies": [174, 285, 396, 417, 528, 639, 741, 852, 963],
                "sacred_geometry": ["circle", "vesica_piscis", "triangle", "square", "pentagon", "hexagon", "heptagon", "octagon", "spiral", "infinity"]
            },
            "story_system": self.story_paths
        }
        
        # Add detailed card information
        for number, card in self.major_arcana.items():
            full_deck["major_arcana"][number] = {
                "number": card.number,
                "name": card.name,
                "archetype": card.archetype,
                "element": card.element,
                "planet": card.planet,
                "hebrew_letter": card.hebrew_letter,
                "tree_path": card.tree_path,
                "keywords": card.keywords,
                "upright_meaning": card.upright_meaning,
                "reversed_meaning": card.reversed_meaning,
                "alchemical_symbol": card.alchemical_symbol,
                "color_palette": card.color_palette,
                "solfeggio_frequency": card.solfeggio_frequency,
                "sacred_geometry": card.sacred_geometry,
                "crystal_correspondence": card.crystal_correspondence,
                "writing_style": card.writing_style.value,
                "character_voice": card.character_voice,
                "psychological_profile": card.psychological_profile,
                "story_branches": card.story_branches
            }
        
        return full_deck


# Command Line Interface
if __name__ == "__main__":
    print("🃏 CATHEDRAL ALCHEMICAL TAROT SYSTEM")
    print("=" * 60)
    
    tarot = CathedralTarotSystem()
    
    print("✨ System initialized with:")
    print(f"   • 22 Major Arcana cards with full correspondences")
    print(f"   • {len(tarot.extended_pantheon)} Extended pantheon beings")
    print(f"   • {len(tarot.story_paths)} Master CYOA story paths")
    print()
    
    # Draw a sample card
    print("🎴 Drawing a sample card...")
    card, is_reversed = tarot.draw_card("What guidance do I need?")
    print(f"   Card: {card.name} {'(Reversed)' if is_reversed else '(Upright)'}")
    print(f"   Archetype: {card.archetype}")
    print(f"   Element: {card.element} | Planet: {card.planet}")
    print(f"   Frequency: {card.solfeggio_frequency} Hz")
    print(f"   Meaning: {card.reversed_meaning if is_reversed else card.upright_meaning}")
    print()
    
    # Show extended pantheon sample
    print("🌟 Extended Pantheon (sample):")
    for i, (key, being) in enumerate(list(tarot.extended_pantheon.items())[:3]):
        print(f"   {being.name} ({being.tradition})")
        print(f"   Power: {being.power.replace('_', ' ').title()}")
        print(f"   Mantra: {being.mantra}")
        print()
    
    # Start a sample story
    print("📖 Starting sample story...")
    story_session = tarot.begin_story(0, "Sample_User")  # The Fool's journey
    print(f"   Story: {story_session['story']['title']}")
    print(f"   Style: {story_session['story']['style']}")
    print(f"   Opening: {story_session['story']['opening'][:100]}...")
    print(f"   Choices available: {len(story_session['story']['branches'])}")
    print()
    
    print("🔮 Cathedral Tarot System ready for download and gameplay!")
    print("📋 Full deck export available with get_full_deck_download()")