from dataclasses import dataclass, field
from typing import Dict, Any, List, Tuple
try:
    import numpy as np
except ImportError as exc:
    raise ImportError(
        "NumPy is required for design_suite/fractals.py. "
        "Install it with: python -m pip install numpy, then select the same interpreter in VS Code."
    ) from exc


@dataclass
class FractalPattern:
    name: str
    algorithm: str
    iterations: int
    complexity: float
    color_scheme: List[str]
    magical_properties: Dict[str, Any] = field(default_factory=dict)


def iterations_to_rgb(iterations: np.ndarray, color_scheme: List[str]) -> np.ndarray:
    max_iter = int(np.max(iterations))
    normalized = iterations / max_iter if max_iter > 0 else iterations
    h, w = iterations.shape
    rgb = np.zeros((h, w, 3), dtype=np.uint8)
    for i, color_hex in enumerate(color_scheme):
        r = int(color_hex[1:3], 16)
        g = int(color_hex[3:5], 16)
        b = int(color_hex[5:7], 16)
        lower = i / len(color_scheme)
        upper = (i + 1) / len(color_scheme)
        mask = (normalized >= lower) & (normalized < upper)
        rgb[mask] = [r, g, b]
    return rgb


def generate_mandelbrot(pattern: FractalPattern, size: Tuple[int, int]) -> np.ndarray:
    width, height = size
    x = np.linspace(-2.5, 1.5, width)
    y = np.linspace(-2.0, 2.0, height)
    X, Y = np.meshgrid(x, y)
    C = X + 1j * Y
    Z = np.zeros_like(C)
    iterations = np.zeros(C.shape, dtype=int)
    for i in range(pattern.iterations):
        mask = np.abs(Z) <= 2
        Z[mask] = Z[mask] ** 2 + C[mask]
        iterations[mask] = i
    return iterations_to_rgb(iterations, pattern.color_scheme)


def generate_julia(pattern: FractalPattern, size: Tuple[int, int]) -> np.ndarray:
    width, height = size
    c = -0.7 + 0.27015j
    x = np.linspace(-2.0, 2.0, width)
    y = np.linspace(-2.0, 2.0, height)
    X, Y = np.meshgrid(x, y)
    Z = X + 1j * Y
    iterations = np.zeros(Z.shape, dtype=int)
    for i in range(pattern.iterations):
        mask = np.abs(Z) <= 2
        Z[mask] = Z[mask] ** 2 + c
        iterations[mask] = i
    return iterations_to_rgb(iterations, pattern.color_scheme)


def generate_dragon_curve(pattern: FractalPattern, size: Tuple[int, int]) -> np.ndarray:
    # Lightweight placeholder image: gradient using first color
    width, height = size
    base_color = pattern.color_scheme[0]
    r = int(base_color[1:3], 16)
    g = int(base_color[3:5], 16)
    b = int(base_color[5:7], 16)
    x = np.linspace(0, 1, width)
    y = np.linspace(0, 1, height)
    X, Y = np.meshgrid(x, y)
    img = np.stack([
        (r * X).astype(np.uint8),
        (g * Y).astype(np.uint8),
        (b * (1 - X * Y)).astype(np.uint8),
    ], axis=-1)
    return img


def get_fractal_patterns() -> Dict[str, FractalPattern]:
    return {
        "mandelbrot_cathedral": FractalPattern(
            name="Cathedral Mandelbrot",
            algorithm="mandelbrot",
            iterations=100,
            complexity=0.8,
            color_scheme=["#2c1810", "#8b4513", "#daa520", "#ffd700", "#ffffff"],
            magical_properties={
                "infinite_depth": True,
                "self_similarity": True,
                "chaos_order_balance": True,
                "meditation_focus": "infinity_contemplation",
            },
        ),
        "julia_mystical": FractalPattern(
            name="Mystical Julia Set",
            algorithm="julia",
            iterations=80,
            complexity=0.7,
            color_scheme=["#1a0033", "#4b0082", "#9932cc", "#dda0dd", "#f0e68c"],
            magical_properties={
                "transformation": True,
                "boundary_dissolution": True,
                "consciousness_expansion": True,
                "meditation_focus": "inner_transformation",
            },
        ),
        "dragon_curve_wisdom": FractalPattern(
            name="Dragon Curve Wisdom",
            algorithm="dragon_curve",
            iterations=15,
            complexity=0.9,
            color_scheme=["#8b0000", "#dc143c", "#ff4500", "#ffd700"],
            magical_properties={
                "serpent_wisdom": True,
                "kundalini_activation": True,
                "ancient_knowledge": True,
                "meditation_focus": "serpent_power",
            },
        ),
        "abyss_crossing": FractalPattern(
            name="Abyss Crossing Fractal",
            algorithm="mandelbrot",
            iterations=333,
            complexity=0.93,
            color_scheme=["#000000", "#1a0033", "#330066", "#4b0082", "#8b00ff"],
            magical_properties={
                "oath_of_abyss": True,
                "ego_dissolution": True,
                "choronzon_confrontation": True,
                "babalon_gateway": True,
                "meditation_focus": "crossing_the_abyss",
                "invocation": "I will interpret every phenomenon as a particular dealing of God with my soul",
            },
        ),
        "achad_reversal": FractalPattern(
            name="Achad's Reversal Pattern",
            algorithm="julia",
            iterations=418,  # ABRAHADABRA
            complexity=0.88,
            color_scheme=["#4b0082", "#8b00ff", "#da70d6", "#ee82ee", "#dda0dd"],
            magical_properties={
                "aeon_of_maat": True,
                "tree_reversal": True,
                "daughter_formula": True,
                "magical_child": True,
                "meditation_focus": "the_great_reversal",
                "formula": "MAAT = 451, the completion of Thelema",
            },
        ),
    }


def generate_fractal(patterns: Dict[str, FractalPattern], name: str, size: Tuple[int, int]) -> np.ndarray:
    if name not in patterns:
        raise ValueError(f"Fractal pattern '{name}' not found")
    pattern = patterns[name]
    if pattern.algorithm == "mandelbrot":
        return generate_mandelbrot(pattern, size)
    if pattern.algorithm == "julia":
        return generate_julia(pattern, size)
    if pattern.algorithm == "dragon_curve":
        return generate_dragon_curve(pattern, size)
    # Default fallback
    return generate_mandelbrot(pattern, size)
