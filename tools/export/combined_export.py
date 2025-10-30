"""Export combined JSON artifacts for Design Suite and Frater Achad system.

Writes JSON files under design-suite/outputs/:
- suite_export.json          (CathedralDesignSuite.export_complete_suite)
- achad_export.json          (FraterAchadSystem.export_achad_system)
- integration_spec.json      (Bridge spec mapping a sample pathway)
- combined_export.json       (Aggregated bundle)
"""
from __future__ import annotations

import json
from pathlib import Path
import sys

try:
    from .png_export import export_to_png
    HAS_PNG = True
except ImportError:
    HAS_PNG = False


REPO_ROOT = Path(__file__).resolve().parents[2]
DESIGN_SUITE_DIR = REPO_ROOT / "design-suite"
OUTPUT_DIR = DESIGN_SUITE_DIR / "outputs"

if str(DESIGN_SUITE_DIR) not in sys.path:
    sys.path.insert(0, str(DESIGN_SUITE_DIR))

from design_suite import (  # noqa: E402
    CathedralDesignSuite,
    build_integration_spec,
)
from design_suite.hall_of_mysteries_import import FraterAchadSystem  # noqa: E402


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    suite = CathedralDesignSuite()
    system = FraterAchadSystem()

    # Export base suite
    suite_doc = suite.export_complete_suite()

    # Build a representative individual and bridge
    pathway = system.create_individual_pathway(
        name="Export Star",
        magical_motto="Ordo in Anima",
        will_statement="To bring balanced truth and beauty into form",
    )
    system.assign_personal_arcana(pathway, num_cards=7)
    spec = build_integration_spec(pathway, system, suite)

    # Export Achad system
    achad_doc = system.export_achad_system()

    combined = {
        "suite": suite_doc,
        "achad": achad_doc,
        "integration": spec,
    }

    def write(name: str, obj):
        path = OUTPUT_DIR / name
        with path.open("w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=2)
        return path

    p1 = write("suite_export.json", suite_doc)
    p2 = write("achad_export.json", achad_doc)
    p3 = write("integration_spec.json", spec)
    p4 = write("combined_export.json", combined)

    print("Export complete:")
    for p in [p1, p2, p3, p4]:
        print(f"  • {p.relative_to(REPO_ROOT)}")

    # PNG export capability available but disabled by default (keeps repo lightweight)
    # Uncomment below to generate sample PNGs on-demand for local testing
    # Note: PNG files are already in .gitignore under design-suite/outputs/
    """
    if HAS_PNG:
        print("\nRendering sample PNGs...")
        png_keys = ["flower_of_life", "achad_tree", "oath_abyss_sigil", "qblh_cube", "merkaba"]
        for key in png_keys:
            try:
                img = suite.generate_sacred_geometry(key, size=(512, 512))
                png_path = OUTPUT_DIR / f"{key}.png"
                export_to_png(img, png_path, title=key)
                print(f"  • {png_path.relative_to(REPO_ROOT)}")
            except Exception as e:
                print(f"  ⚠ {key}: {e}")
    else:
        print("\n💡 PNG export available (install pillow and uncomment PNG section)")
    """

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
