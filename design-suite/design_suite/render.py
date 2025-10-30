import matplotlib
# Use headless backend for non-GUI environments
matplotlib.use("Agg")

import numpy as np
import math
from matplotlib.patches import Polygon, Circle, FancyBboxPatch
import matplotlib.pyplot as plt
from typing import Dict, Tuple
from .geometry import SacredGeometry


def _create_triangle(x: float, y: float, scale: float, direction: str = "up") -> Polygon:
    height = scale * math.sqrt(3) / 2
    if direction == "up":
        points = [
            [x, y + height * 2 / 3],
            [x - scale / 2, y - height * 1 / 3],
            [x + scale / 2, y - height * 1 / 3],
        ]
    else:
        points = [
            [x, y - height * 2 / 3],
            [x - scale / 2, y + height * 1 / 3],
            [x + scale / 2, y + height * 1 / 3],
        ]
    return Polygon(points, closed=True)


def _draw_circle_pattern(ax, geometry: SacredGeometry):
    params = geometry.parameters
    if geometry.name == "Flower of Life":
        ax.add_patch(Circle((0, 0), params["radius"], fill=False, edgecolor="gold", linewidth=2))
        for i in range(6):
            angle = i * math.pi / 3
            x = params["radius"] * math.cos(angle)
            y = params["radius"] * math.sin(angle)
            ax.add_patch(Circle((x, y), params["radius"], fill=False, edgecolor="gold", linewidth=2))
        for i in range(12):
            angle = i * math.pi / 6
            x = 2 * params["radius"] * math.cos(angle)
            y = 2 * params["radius"] * math.sin(angle)
            ax.add_patch(Circle((x, y), params["radius"], fill=False, edgecolor="gold", linewidth=1.5))
    elif geometry.name == "Seed of Life":
        ax.add_patch(Circle((0, 0), params["radius"], fill=False, edgecolor="gold", linewidth=2))
        for i in range(6):
            angle = i * math.pi / 3
            x = params["radius"] * math.cos(angle)
            y = params["radius"] * math.sin(angle)
            ax.add_patch(Circle((x, y), params["radius"], fill=False, edgecolor="gold", linewidth=2))


def _draw_golden_spiral(ax, geometry: SacredGeometry):
    params = geometry.parameters
    ratio = params["ratio"]
    turns = params["turns"]
    theta = np.linspace(0, turns * 2 * math.pi, 1000)
    r = np.exp(theta / (2 * math.pi) * math.log(ratio))
    x = r * np.cos(theta)
    y = r * np.sin(theta)
    max_r = np.max(r)
    x = x / max_r * 1.8
    y = y / max_r * 1.8
    ax.plot(x, y, color="gold", linewidth=3)
    for i in range(5):
        scale = ratio ** i
        width = 1.0 / scale
        height = width / ratio
        rect = FancyBboxPatch((-width / 2, -height / 2), width, height, fill=False, edgecolor="gold", linewidth=1, alpha=0.7)
        ax.add_patch(rect)


def _draw_sri_yantra(ax, geometry: SacredGeometry):
    ax.add_patch(FancyBboxPatch((-1.8, -1.8), 3.6, 3.6, fill=False, edgecolor="gold", linewidth=2))
    for radius in [1.6, 1.4, 1.2]:
        ax.add_patch(Circle((0, 0), radius, fill=False, edgecolor="gold", linewidth=1, alpha=0.7))
    for i in range(4):
        scale = 1.0 - i * 0.2
        tri = _create_triangle(0, 0, scale, "up")
        tri.set_edgecolor("gold"); tri.set_facecolor("none"); tri.set_linewidth(2)
        ax.add_patch(tri)
    for i in range(5):
        scale = 1.1 - i * 0.18
        tri = _create_triangle(0, 0, scale, "down")
        tri.set_edgecolor("silver"); tri.set_facecolor("none"); tri.set_linewidth(2)
        ax.add_patch(tri)


def _draw_merkaba(ax, geometry: SacredGeometry):
    tri1 = _create_triangle(0, 0, 1.5, "up")
    tri1.set_edgecolor("gold"); tri1.set_facecolor("gold"); tri1.set_alpha(0.3); tri1.set_linewidth(3)
    ax.add_patch(tri1)
    tri2 = _create_triangle(0, 0, 1.5, "down")
    tri2.set_edgecolor("silver"); tri2.set_facecolor("silver"); tri2.set_alpha(0.3); tri2.set_linewidth(3)
    ax.add_patch(tri2)
    ax.add_patch(Circle((0, 0), 0.1, color="white", zorder=10))


def _draw_vesica_piscis(ax, geometry: SacredGeometry):
    ax.add_patch(Circle((-0.5, 0), 1.0, fill=False, edgecolor="gold", linewidth=3))
    ax.add_patch(Circle((0.5, 0), 1.0, fill=False, edgecolor="gold", linewidth=3))
    lens_x = np.linspace(-0.5, 0.5, 100)
    upper_y = np.sqrt(1 - (lens_x + 0.5) ** 2)
    lower_y = -np.sqrt(1 - (lens_x + 0.5) ** 2)
    ax.fill_between(lens_x, upper_y, lower_y, alpha=0.3, color="gold")


def _draw_achad_tree(ax, geometry: SacredGeometry):
    """Achad's reversed Tree: Malkuth above, Kether below - the descent as ascent."""
    # Sephiroth positions (inverted Y coordinates)
    sephiroth_coords = {
        10: (0, 1.8),      # Malkuth (Kingdom) - now at top
        9: (0, 1.2),       # Yesod (Foundation)
        8: (-0.6, 0.6),    # Hod (Splendor)
        7: (0.6, 0.6),     # Netzach (Victory)
        6: (0, 0.3),       # Tiphareth (Beauty) - central
        5: (-0.6, -0.3),   # Geburah (Severity)
        4: (0.6, -0.3),    # Chesed (Mercy)
        3: (-0.6, -1.0),   # Binah (Understanding)
        2: (0.6, -1.0),    # Chokmah (Wisdom)
        1: (0, -1.6),      # Kether (Crown) - now at bottom
    }
    
    # Draw 22 paths connecting sephiroth
    paths_map = [
        (1, 2), (1, 3), (1, 6),  # Kether connections
        (2, 3), (2, 4), (2, 6),  # Chokmah
        (3, 5), (3, 6),          # Binah
        (4, 5), (4, 6), (4, 7),  # Chesed
        (5, 6), (5, 8),          # Geburah
        (6, 7), (6, 8), (6, 9),  # Tiphareth
        (7, 8), (7, 9), (7, 10), # Netzach
        (8, 9), (8, 10),         # Hod
        (9, 10),                 # Yesod-Malkuth
    ]
    
    for s1, s2 in paths_map:
        x1, y1 = sephiroth_coords[s1]
        x2, y2 = sephiroth_coords[s2]
        ax.plot([x1, x2], [y1, y2], color="silver", linewidth=1, alpha=0.6)
    
    # Draw sephiroth as circles
    for num, (x, y) in sephiroth_coords.items():
        color = "gold" if num == 1 else "silver"  # Kether gold even at bottom
        size = 0.15 if num == 6 else 0.12  # Tiphareth slightly larger
        ax.add_patch(Circle((x, y), size, fill=True, facecolor=color, edgecolor="white", linewidth=2, alpha=0.8))
        ax.text(x, y, str(num), ha="center", va="center", color="black", fontsize=8, weight="bold")
    
    # Mark the reversal with directional arrows
    ax.annotate("", xy=(0, -1.8), xytext=(0, 2.0), 
                arrowprops=dict(arrowstyle="->", color="purple", lw=2, alpha=0.5))
    ax.text(0.3, -1.9, "Maat", color="purple", fontsize=9, style="italic")


def _draw_oath_abyss_sigil(ax, geometry: SacredGeometry):
    """Oath of the Abyss sigil: Daath central, Choronzon seal, Babalon gate."""
    # Central Daath (the invisible sephirah in the Abyss)
    ax.add_patch(Circle((0, 0), 0.3, fill=True, facecolor="black", edgecolor="red", linewidth=3))
    ax.text(0, 0, "∴", ha="center", va="center", color="red", fontsize=18, weight="bold")
    
    # Choronzon seal (333) - dispersive triangular pattern
    for i in range(3):
        angle = i * 2 * math.pi / 3
        x = 0.8 * math.cos(angle)
        y = 0.8 * math.sin(angle)
        tri = _create_triangle(x, y, 0.4, "down" if i % 2 == 0 else "up")
        tri.set_edgecolor("red")
        tri.set_facecolor("none")
        tri.set_linewidth(2)
        tri.set_alpha(0.7)
        ax.add_patch(tri)
    
    # Babalon gate (outer circle with seven points)
    ax.add_patch(Circle((0, 0), 1.5, fill=False, edgecolor="crimson", linewidth=3, linestyle="--"))
    for i in range(7):
        angle = i * 2 * math.pi / 7
        x = 1.5 * math.cos(angle)
        y = 1.5 * math.sin(angle)
        ax.plot([0, x], [0, y], color="crimson", linewidth=1, alpha=0.4)
        ax.add_patch(Circle((x, y), 0.08, fill=True, color="crimson", alpha=0.8))
    
    # The crossing formula text
    ax.text(0, -1.85, "Oath of the Abyss", ha="center", color="red", fontsize=8, weight="bold")


def _draw_qblh_cube(ax, geometry: SacredGeometry):
    """QBLH Cube of Space: 22 Hebrew letters arranged in cosmic cubic structure."""
    # Cube vertices in 2D projection (isometric-ish)
    cube_scale = 1.2
    front = [
        (-cube_scale, -cube_scale),  # bottom-left
        (cube_scale, -cube_scale),   # bottom-right
        (cube_scale, cube_scale),    # top-right
        (-cube_scale, cube_scale),   # top-left
    ]
    back = [
        (-cube_scale * 0.5, -cube_scale * 0.5 + 0.6),
        (cube_scale * 0.5, -cube_scale * 0.5 + 0.6),
        (cube_scale * 0.5, cube_scale * 0.5 + 0.6),
        (-cube_scale * 0.5, cube_scale * 0.5 + 0.6),
    ]
    
    # Draw cube edges
    for i in range(4):
        j = (i + 1) % 4
        ax.plot([front[i][0], front[j][0]], [front[i][1], front[j][1]], color="silver", linewidth=2)
        ax.plot([back[i][0], back[j][0]], [back[i][1], back[j][1]], color="silver", linewidth=1.5, alpha=0.7)
        ax.plot([front[i][0], back[i][0]], [front[i][1], back[i][1]], color="silver", linewidth=1.5, alpha=0.7)
    
    # 3 Mother letters (axes: Aleph, Mem, Shin)
    ax.text(0, 0, "א", ha="center", va="center", color="gold", fontsize=16, weight="bold")  # Aleph (Air)
    ax.text(0, -cube_scale - 0.3, "מ", ha="center", va="center", color="blue", fontsize=14, weight="bold")  # Mem (Water)
    ax.text(cube_scale + 0.3, 0, "ש", ha="center", va="center", color="red", fontsize=14, weight="bold")  # Shin (Fire)
    
    # 7 Double letters on faces (simplified placement)
    double_positions = [
        (0, cube_scale * 0.7, "ב"),
        (0, -cube_scale * 0.7, "ג"),
        (cube_scale * 0.7, 0, "ד"),
        (-cube_scale * 0.7, 0, "כ"),
        (0.5, 0.5, "פ"),
        (-0.5, 0.5, "ר"),
        (0, 0.3, "ת"),
    ]
    for x, y, letter in double_positions:
        ax.text(x, y, letter, ha="center", va="center", color="silver", fontsize=10, alpha=0.8)
    
    # 12 Simple letters on edges (sample placement)
    simple_letters = "הוזחטילנסעצק"
    edge_positions = [
        front[0], front[1], front[2], front[3],
        back[0], back[1], back[2], back[3],
        ((front[0][0] + back[0][0]) / 2, (front[0][1] + back[0][1]) / 2),
        ((front[1][0] + back[1][0]) / 2, (front[1][1] + back[1][1]) / 2),
        ((front[2][0] + back[2][0]) / 2, (front[2][1] + back[2][1]) / 2),
        ((front[3][0] + back[3][0]) / 2, (front[3][1] + back[3][1]) / 2),
    ]
    for i, (x, y) in enumerate(edge_positions):
        if i < len(simple_letters):
            ax.text(x, y, simple_letters[i], ha="center", va="center", color="white", fontsize=7, alpha=0.7)
    
    ax.text(0, -1.85, "QBLH Cube (Achad)", ha="center", color="gold", fontsize=8, weight="bold")



def generate_sacred_geometry(geometries: Dict[str, SacredGeometry], geometry_name: str, size: Tuple[int, int]) -> np.ndarray:
    if geometry_name not in geometries:
        raise ValueError(f"Geometry '{geometry_name}' not found")
    geometry = geometries[geometry_name]
    fig, ax = plt.subplots(figsize=(size[0] / 100, size[1] / 100), dpi=100)
    ax.set_xlim(-2, 2); ax.set_ylim(-2, 2); ax.set_aspect('equal'); ax.axis('off')
    if geometry.type == "circle_pattern":
        _draw_circle_pattern(ax, geometry)
    elif geometry.type == "spiral_pattern":
        _draw_golden_spiral(ax, geometry)
    elif geometry.type == "triangular_mandala":
        _draw_sri_yantra(ax, geometry)
    elif geometry.type == "tetrahedron_star":
        _draw_merkaba(ax, geometry)
    elif geometry.type == "lens_pattern":
        _draw_vesica_piscis(ax, geometry)
    elif geometry.type == "reversed_tree":
        _draw_achad_tree(ax, geometry)
    elif geometry.type == "abyss_crossing":
        _draw_oath_abyss_sigil(ax, geometry)
    elif geometry.type == "cubic_letters":
        _draw_qblh_cube(ax, geometry)
    fig.canvas.draw()
    rgba = np.frombuffer(fig.canvas.buffer_rgba(), dtype=np.uint8)
    rgba = rgba.reshape(fig.canvas.get_width_height()[::-1] + (4,))
    buf = rgba[:, :, :3]
    plt.close(fig)
    return buf
