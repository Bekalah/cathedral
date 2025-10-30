from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional, Tuple
from .geometry import SacredGeometry
from .fractals import FractalPattern


@dataclass
class DesignTemplate:
    name: str
    category: str
    dimensions: Tuple[int, int]
    dpi: int = 300
    color_palette: List[str] = field(default_factory=list)
    sacred_geometry: Optional[SacredGeometry] = None
    fractal_overlay: Optional[FractalPattern] = None
    witch_eye_placement: str = "lower_left"


def get_design_templates(
    color_palettes: Dict[str, List[str]],
    sacred_geometries: Dict[str, SacredGeometry],
    fractal_patterns: Dict[str, FractalPattern],
) -> Dict[str, "DesignTemplate"]:
    return {
        "business_card_magical": DesignTemplate(
            name="Magical Business Card",
            category="business",
            dimensions=(3.5, 2.0),
            dpi=300,
            color_palette=color_palettes["cathedral_gothic"],
            sacred_geometry=sacred_geometries["vesica_piscis"],
            witch_eye_placement="lower_left",
        ),
        "poster_sacred": DesignTemplate(
            name="Sacred Geometry Poster",
            category="marketing",
            dimensions=(24, 36),
            dpi=150,
            color_palette=color_palettes["mystical_night"],
            sacred_geometry=sacred_geometries["flower_of_life"],
            fractal_overlay=fractal_patterns["mandelbrot_cathedral"],
        ),
        "logo_mystical": DesignTemplate(
            name="Mystical Logo Design",
            category="branding",
            dimensions=(6, 6),
            dpi=300,
            color_palette=color_palettes["alchemical_gold"],
            sacred_geometry=sacred_geometries["merkaba"],
        ),
        "book_cover_arcane": DesignTemplate(
            name="Arcane Book Cover",
            category="publishing",
            dimensions=(6, 9),
            dpi=300,
            color_palette=color_palettes["royal_purple"],
            sacred_geometry=sacred_geometries["tree_of_life"],
            fractal_overlay=fractal_patterns["julia_mystical"],
        ),
        "web_header_cosmic": DesignTemplate(
            name="Cosmic Web Header",
            category="digital",
            dimensions=(12, 3),
            dpi=72,
            color_palette=color_palettes["aurora_magic"],
            sacred_geometry=sacred_geometries["sri_yantra"],
        ),
        "tarot_card_template": DesignTemplate(
            name="Tarot Card Design",
            category="divination",
            dimensions=(2.75, 4.75),
            dpi=300,
            color_palette=color_palettes["mystical_night"],
            sacred_geometry=sacred_geometries["golden_spiral"],
        ),
    }
