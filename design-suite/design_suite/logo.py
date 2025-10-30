from typing import Any, Dict


def generate_witch_eye_logo() -> Dict[str, Any]:
    return {
        "name": "Witch Eye Seal",
        "elements": {
            "outer_circle": {"radius": 1.0, "color": "#2c1810"},
            "crescent_moon": {"position": "top", "color": "#c0c0c0"},
            "triangle": {"type": "equilateral", "orientation": "up", "color": "#8b4513"},
            "eye": {"position": "center", "iris_color": "#4169e1", "pupil_color": "#000000"},
            "inner_glow": {"color": "#ffd700", "opacity": 0.3},
        },
        "sacred_meaning": "Protection, wisdom, and divine sight",
        "business_integration": "Lower left corner placement for branding",
    }
