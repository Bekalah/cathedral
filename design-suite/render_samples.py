#!/usr/bin/env python3
"""
Render sample outputs from CathedralDesignSuite to PNG files.
Uses the Agg backend to avoid GUI requirements.
"""
import os
os.environ.setdefault("MPLBACKEND", "Agg")

from pathlib import Path
import numpy as np
from PIL import Image

from cathedral_design_suite import CathedralDesignSuite


def save_image(array: np.ndarray, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(array).save(path)


def main() -> None:
    root = Path(__file__).resolve().parent
    out_dir = root / "outputs"
    out_dir.mkdir(parents=True, exist_ok=True)

    suite = CathedralDesignSuite()

    # Sacred geometry sample
    flower = suite.generate_sacred_geometry("flower_of_life")
    save_image(flower, out_dir / "flower_of_life.png")

    # Fractal sample
    mandelbrot = suite.generate_fractal("mandelbrot_cathedral")
    save_image(mandelbrot, out_dir / "mandelbrot_cathedral.png")

    # Sample design JSON (no image saving for the full design here)
    design = suite.create_design_from_template(
        "business_card_magical",
        {"company_name": "Cathedral Circuits", "tagline": "Art x Sacred Science"},
    )
    (out_dir / "business_card_magical.json").write_text(
        __import__("json").dumps(design, indent=2)[:200000], encoding="utf-8"
    )

    print("Saved:")
    print(" -", out_dir / "flower_of_life.png")
    print(" -", out_dir / "mandelbrot_cathedral.png")
    print(" -", out_dir / "business_card_magical.json")


if __name__ == "__main__":
    main()
