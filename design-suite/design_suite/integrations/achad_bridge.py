from typing import Dict, Any, List

from ..suite import CathedralDesignSuite
from ..hall_of_mysteries_import import FraterAchadSystem, TrueWillPathway


def _palette_for_aeon(aeon: str) -> str:
    mapping = {
        "maat": "crystal_clarity",
        "horus": "alchemical_gold",
        "osiris": "earth_grounding",
        "isis": "forest_wisdom",
    }
    return mapping.get(aeon.lower(), "aurora_magic")


def _geometry_candidates_from_arcana(arcana: List[str]) -> List[str]:
    picks: List[str] = []
    names = [a.lower() for a in arcana]
    if any("star" in n for n in names):
        picks.append("golden_spiral")
    if any(n in names for n in ["lust", "strength", "the chariot", "chariot"]):
        picks.append("merkaba")
    if any(n in names for n in ["the hermit", "hermit", "the priestess", "high priestess"]):
        picks.append("vesica_piscis")
    if any(n in names for n in ["the aeon", "judgement", "the universe", "world"]):
        picks.append("tree_of_life")
    # Always include core signatures
    for core in ["flower_of_life", "achad_tree"]:
        if core not in picks:
            picks.append(core)
    return picks[:3]


def _fractal_for_aeon(aeon: str) -> str:
    if aeon.lower() == "maat":
        return "achad_reversal"
    if aeon.lower() == "horus":
        return "mandelbrot_cathedral"
    if aeon.lower() == "osiris":
        return "julia_mystical"
    return "abyss_crossing"


def build_integration_spec(
    pathway: TrueWillPathway,
    system: FraterAchadSystem,
    suite: CathedralDesignSuite,
) -> Dict[str, Any]:
    """Create a portable spec connecting a True Will pathway to concrete design decisions."""
    aeon = pathway.aeon_alignment.value
    palette_name = _palette_for_aeon(aeon)
    geometry_keys = _geometry_candidates_from_arcana(pathway.pathway_arcana)
    fractal_key = _fractal_for_aeon(aeon)

    template_key = "tarot_card_template" if pathway.pathway_arcana else "poster_sacred"

    return {
        "individual": {
            "name": pathway.individual_name,
            "motto": pathway.magical_motto,
            "star": pathway.star_signature,
            "aeon": aeon,
            "will": pathway.will_statement,
            "grade": pathway.current_grade,
        },
        "design": {
            "palette": palette_name,
            "geometries": geometry_keys,
            "fractal": fractal_key,
            "template": template_key,
        },
        "oath": {
            "available": True,
            "ordeals": list(system.oath_framework.ordeals.keys()),
        },
    }


def render_integration_preview(
    suite: CathedralDesignSuite,
    spec: Dict[str, Any],
    size: int = 512,
) -> Dict[str, Any]:
    """Render a lightweight preview for the first geometry and the fractal."""
    geo_key = spec["design"]["geometries"][0]
    fractal_key = spec["design"]["fractal"]

    geo_img = suite.generate_sacred_geometry(geo_key, size=(size, size))
    fractal_img = suite.generate_fractal(fractal_key, size=(size, size))

    return {
        "geometry": {"key": geo_key, "shape": tuple(geo_img.shape)},
        "fractal": {"key": fractal_key, "shape": tuple(fractal_img.shape)},
    }
