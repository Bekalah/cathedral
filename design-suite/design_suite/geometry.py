from dataclasses import dataclass
from typing import Dict, Any, Optional


@dataclass
class SacredGeometry:
    name: str
    type: str
    parameters: Dict[str, Any]
    golden_ratio: bool = True
    frequency_resonance: Optional[int] = None
    symbolic_meaning: str = ""


def get_sacred_geometries() -> Dict[str, SacredGeometry]:
    return {
        "flower_of_life": SacredGeometry(
            name="Flower of Life",
            type="circle_pattern",
            parameters={"circles": 19, "radius": 1.0, "overlap": 0.5},
            frequency_resonance=528,
            symbolic_meaning="Unity of all creation, sacred blueprint of existence",
        ),
        "metatrons_cube": SacredGeometry(
            name="Metatron's Cube",
            type="polyhedric_pattern",
            parameters={"vertices": 13, "platonic_solids": 5},
            frequency_resonance=741,
            symbolic_meaning="Archangel Metatron's divine blueprint, container of all forms",
        ),
        "golden_spiral": SacredGeometry(
            name="Golden Spiral",
            type="spiral_pattern",
            parameters={"ratio": 1.618, "turns": 5, "growth_factor": 1.618},
            frequency_resonance=639,
            symbolic_meaning="Natural growth pattern, divine proportion in nature",
        ),
        "sri_yantra": SacredGeometry(
            name="Sri Yantra",
            type="triangular_mandala",
            parameters={"triangles": 9, "upward": 4, "downward": 5},
            frequency_resonance=852,
            symbolic_meaning="Cosmic union of masculine and feminine principles",
        ),
        "merkaba": SacredGeometry(
            name="Merkaba",
            type="tetrahedron_star",
            parameters={"tetrahedrons": 2, "rotation": 60, "scale": 1.0},
            frequency_resonance=963,
            symbolic_meaning="Light-spirit-body vehicle, divine chariot of ascension",
        ),
        "vesica_piscis": SacredGeometry(
            name="Vesica Piscis",
            type="lens_pattern",
            parameters={"circles": 2, "overlap_ratio": 1.0, "orientation": 0},
            frequency_resonance=396,
            symbolic_meaning="Birth portal, intersection of matter and spirit",
        ),
        "seed_of_life": SacredGeometry(
            name="Seed of Life",
            type="circle_pattern",
            parameters={"circles": 7, "radius": 1.0, "central": True},
            frequency_resonance=417,
            symbolic_meaning="Genesis pattern, foundation of creation",
        ),
        "tree_of_life": SacredGeometry(
            name="Tree of Life",
            type="spherical_network",
            parameters={"sephiroth": 10, "paths": 22, "structure": "qabalistic"},
            frequency_resonance=741,
            symbolic_meaning="Map of consciousness, divine emanation structure",
        ),
        "achad_tree": SacredGeometry(
            name="Frater Achad's Tree",
            type="reversed_tree",
            parameters={
                "sephiroth": 10,
                "paths": 22,
                "malkuth_above": True,
                "kether_below": True,
                "aeon_of_maat": True,
            },
            frequency_resonance=418,  # ABRAHADABRA
            symbolic_meaning="The reversed tree of the Aeon of Maat, Achad's great revelation",
        ),
        "oath_abyss_sigil": SacredGeometry(
            name="Oath of the Abyss",
            type="abyss_crossing",
            parameters={
                "daath_position": "central",
                "choronzon_seal": True,
                "babalon_gate": True,
                "crossing_method": "dissolution",
            },
            frequency_resonance=333,  # Choronzon number
            symbolic_meaning="I will interpret every phenomenon as a particular dealing of God with my soul",
        ),
        "qblh_cube": SacredGeometry(
            name="QBLH Cube of Space",
            type="cubic_letters",
            parameters={
                "letters": 22,
                "mother_letters": 3,
                "double_letters": 7,
                "single_letters": 12,
                "achad_arrangement": True,
            },
            frequency_resonance=777,
            symbolic_meaning="Achad's arrangement of the 22 Hebrew letters in cosmic space",
        ),
    }
