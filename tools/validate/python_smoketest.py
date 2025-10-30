#!/usr/bin/env python3
"""
Lightweight import smoke test for Cathedral Python modules.
Run inside your .venv:
    python tools/validate/python_smoketest.py
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

errors = []

# 1) Hall of Shadows
try:
    from hall_of_shadows.cathedral_hall_of_shadows import CathedralHallOfShadows
    hall = CathedralHallOfShadows()
    _ = hall.export_hall_of_shadows()
except Exception as e:
    errors.append(("hall_of_shadows", repr(e)))

# 2) Fusion Creative Suite
try:
    from hall_of_ateliers.cathedral_fusion_creative_suite import CathedralFusionCreativeSuite, ArcanaType
    suite = CathedralFusionCreativeSuite()
    suite.initialize_arcana_character(ArcanaType.THEMELA_FOOL, "Themela")
    _ = suite.create_custom_character_art()
except Exception as e:
    errors.append(("fusion_creative_suite", repr(e)))

if errors:
    print("❌ Smoke test failed:")
    for name, err in errors:
        print(f"  - {name}: {err}")
    sys.exit(1)

print("✅ Python smoke test passed: core modules import and minimal flows run.")
