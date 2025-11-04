"""Quick test for Achad-specific geometry rendering."""
from pathlib import Path
import sys

REPO_ROOT = Path(__file__).resolve().parents[2]
DESIGN_SUITE_DIR = REPO_ROOT / "design-suite"
if str(DESIGN_SUITE_DIR) not in sys.path:
    sys.path.insert(0, str(DESIGN_SUITE_DIR))

from design_suite import CathedralDesignSuite  # noqa: E402


def main() -> int:
    suite = CathedralDesignSuite()
    
    # Test three Achad geometries
    achad_tree = suite.generate_sacred_geometry("achad_tree", size=(400, 400))
    assert achad_tree.shape == (400, 400, 3), f"achad_tree shape mismatch: {achad_tree.shape}"
    
    oath_abyss = suite.generate_sacred_geometry("oath_abyss_sigil", size=(400, 400))
    assert oath_abyss.shape == (400, 400, 3), f"oath_abyss_sigil shape mismatch: {oath_abyss.shape}"
    
    qblh_cube = suite.generate_sacred_geometry("qblh_cube", size=(400, 400))
    assert qblh_cube.shape == (400, 400, 3), f"qblh_cube shape mismatch: {qblh_cube.shape}"
    
    print("OK: Achad geometries render successfully")
    print(f"   • achad_tree: {achad_tree.shape}")
    print(f"   • oath_abyss_sigil: {oath_abyss.shape}")
    print(f"   • qblh_cube: {qblh_cube.shape}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
