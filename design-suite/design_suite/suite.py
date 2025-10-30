import math
from typing import Any, Dict, List, Optional, Tuple
import numpy as np

from .geometry import SacredGeometry, get_sacred_geometries
from .fractals import FractalPattern, get_fractal_patterns, generate_fractal
from .palettes import get_color_palettes
from .templates import DesignTemplate, get_design_templates
from .logo import generate_witch_eye_logo
from .render import generate_sacred_geometry as render_geometry


class CathedralDesignSuite:
    """Modular Cathedral Creative Design Suite"""

    def __init__(self) -> None:
        self.golden_ratio = (1 + math.sqrt(5)) / 2
        self.sacred_geometries: Dict[str, SacredGeometry] = get_sacred_geometries()
        self.fractal_patterns: Dict[str, FractalPattern] = get_fractal_patterns()
        self.color_palettes: Dict[str, List[str]] = get_color_palettes()
        self.design_templates: Dict[str, DesignTemplate] = get_design_templates(
            self.color_palettes, self.sacred_geometries, self.fractal_patterns
        )
        self.witch_eye_logo: Dict[str, Any] = generate_witch_eye_logo()

    # Rendering / generation API
    def generate_sacred_geometry(self, geometry_name: str, size: Tuple[int, int] = (800, 800)) -> np.ndarray:
        return render_geometry(self.sacred_geometries, geometry_name, size)

    def generate_fractal(self, pattern_name: str, size: Tuple[int, int] = (800, 800)) -> np.ndarray:
        return generate_fractal(self.fractal_patterns, pattern_name, size)

    # Design composition
    def create_design_from_template(
        self, template_name: str, content: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        if template_name not in self.design_templates:
            raise ValueError(f"Template '{template_name}' not found")
        template = self.design_templates[template_name]
        width_px = int(template.dimensions[0] * template.dpi)
        height_px = int(template.dimensions[1] * template.dpi)
        design: Dict[str, Any] = {
            "template_name": template.name,
            "category": template.category,
            "dimensions_inches": template.dimensions,
            "dimensions_pixels": (width_px, height_px),
            "dpi": template.dpi,
            "color_palette": template.color_palette,
            "layers": [],
        }
        if template.sacred_geometry:
            # resolve key by value
            geom_key = next(k for k, v in self.sacred_geometries.items() if v is template.sacred_geometry)
            geom_img = self.generate_sacred_geometry(geom_key, (width_px, height_px))
            design["layers"].append(
                {
                    "type": "sacred_geometry",
                    "name": template.sacred_geometry.name,
                    "image_data": geom_img.tolist(),
                    "opacity": 0.3,
                    "blend_mode": "overlay",
                }
            )
        if template.fractal_overlay:
            frac_key = next(k for k, v in self.fractal_patterns.items() if v is template.fractal_overlay)
            fractal_img = self.generate_fractal(frac_key, (width_px, height_px))
            design["layers"].append(
                {
                    "type": "fractal_pattern",
                    "name": template.fractal_overlay.name,
                    "image_data": fractal_img.tolist(),
                    "opacity": 0.2,
                    "blend_mode": "multiply",
                }
            )
        design["layers"].append(
            {
                "type": "witch_eye_logo",
                "position": template.witch_eye_placement,
                "size": min(width_px, height_px) * 0.1,
                "logo_data": self.witch_eye_logo,
            }
        )
        if content:
            design["content"] = content
            design["layers"].append({"type": "content", "data": content})
        return design

    # Tools / brushes
    def generate_precision_brush_set(self) -> Dict[str, Any]:
        return {
            "name": "Cathedral Precision Brushes",
            "description": "Anti-flat precision tools for highly creative minds",
            "brushes": {
                "sacred_geometry_pen": {
                    "type": "geometric",
                    "precision": "perfect",
                    "snap_to_grid": True,
                    "golden_ratio_guides": True,
                    "properties": ["pressure_sensitive", "angle_responsive", "sacred_proportions"],
                },
                "fractal_detail_brush": {
                    "type": "pattern",
                    "precision": "infinite",
                    "recursive_depth": 10,
                    "chaos_factor": 0.1,
                    "properties": ["self_similar", "infinite_zoom", "mathematical_precision"],
                },
                "color_harmony_mixer": {
                    "type": "color",
                    "precision": "spectral",
                    "color_theory": "advanced",
                    "harmony_modes": ["triadic", "complementary", "split_complementary", "tetradic"],
                    "properties": ["frequency_aware", "chakra_aligned", "psychologically_balanced"],
                },
                "texture_alchemist": {
                    "type": "texture",
                    "precision": "molecular",
                    "material_simulation": True,
                    "surface_types": ["metal", "crystal", "organic", "ethereal", "plasma"],
                    "properties": ["physically_accurate", "light_responsive", "depth_aware"],
                },
                "light_sculptor": {
                    "type": "lighting",
                    "precision": "photonic",
                    "light_physics": True,
                    "shadow_calculation": "ray_traced",
                    "properties": ["volumetric", "caustic_aware", "color_temperature_accurate"],
                },
                "dimension_shifter": {
                    "type": "perspective",
                    "precision": "mathematical",
                    "perspective_modes": ["one_point", "two_point", "three_point", "curvilinear", "impossible"],
                    "properties": ["vanishing_point_aware", "foreshortening_accurate", "spatial_depth"],
                },
            },
        }

    # Export
    def export_complete_suite(self) -> Dict[str, Any]:
        return {
            "suite_info": {
                "name": "Cathedral Creative Design Suite",
                "version": "1.0.0",
                "description": "Professional design tools with sacred geometry and magical integration",
                "anti_flat_guarantee": True,
                "precision_focused": True,
                "highly_creative_optimized": True,
            },
            "sacred_geometries": {
                name: {
                    "name": geo.name,
                    "type": geo.type,
                    "parameters": geo.parameters,
                    "frequency_resonance": geo.frequency_resonance,
                    "symbolic_meaning": geo.symbolic_meaning,
                }
                for name, geo in self.sacred_geometries.items()
            },
            "fractal_patterns": {
                name: {
                    "name": pattern.name,
                    "algorithm": pattern.algorithm,
                    "iterations": pattern.iterations,
                    "complexity": pattern.complexity,
                    "color_scheme": pattern.color_scheme,
                    "magical_properties": pattern.magical_properties,
                }
                for name, pattern in self.fractal_patterns.items()
            },
            "color_palettes": self.color_palettes,
            "design_templates": {
                name: {
                    "name": t.name,
                    "category": t.category,
                    "dimensions": t.dimensions,
                    "dpi": t.dpi,
                    "color_palette": t.color_palette,
                    "witch_eye_placement": t.witch_eye_placement,
                }
                for name, t in self.design_templates.items()
            },
            "witch_eye_logo": self.witch_eye_logo,
            "precision_brushes": self.generate_precision_brush_set(),
            "integration_apis": {
                "generate_sacred_geometry": "Available",
                "generate_fractal": "Available",
                "create_design_from_template": "Available",
                "custom_color_palette_generator": "Available",
                "precision_measurement_tools": "Available",
            },
        }
