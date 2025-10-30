#!/usr/bin/env python3
"""Quick smoke test for the modular Cathedral Design Suite"""

import sys
from pathlib import Path

# Ensure repo root on path when running directly
repo_root = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(repo_root / "design-suite"))

from design_suite import CathedralDesignSuite  # noqa: E402


def run():
    suite = CathedralDesignSuite()
    img1 = suite.generate_sacred_geometry("flower_of_life", (320, 320))
    assert img1.shape == (320, 320, 3)
    img2 = suite.generate_fractal("mandelbrot_cathedral", (200, 150))
    assert img2.shape == (150, 200, 3)
    doc = suite.export_complete_suite()
    assert "suite_info" in doc and "sacred_geometries" in doc
    print("OK: geometry, fractal, and export all working.")


if __name__ == "__main__":
    run()
