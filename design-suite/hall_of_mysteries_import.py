"""
Dynamic import helper to access Frater Achad system from the non-package folder
`hall-of-mysteries/` without renaming the directory.

Exposes: FraterAchadSystem, TrueWillPathway
"""
from __future__ import annotations

import importlib.util
from pathlib import Path
from typing import Any, Tuple

_MODULE_CACHE: Tuple[Any, Any] | None = None


def _load_module():
    global _MODULE_CACHE
    if _MODULE_CACHE is not None:
        return _MODULE_CACHE

    # Resolve repo root from this file: design-suite/hall_of_mysteries_import.py
    repo_root = Path(__file__).resolve().parents[1]
    achad_path = repo_root / "hall-of-mysteries" / "frater_achad_system.py"

    if not achad_path.exists():
        raise FileNotFoundError(f"Cannot find frater_achad_system.py at: {achad_path}")

    spec = importlib.util.spec_from_file_location("frater_achad_system", str(achad_path))
    if spec is None or spec.loader is None:
        raise ImportError("Could not create import spec for frater_achad_system")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)  # type: ignore[assignment]

    FraterAchadSystem = getattr(module, "FraterAchadSystem")
    TrueWillPathway = getattr(module, "TrueWillPathway")

    _MODULE_CACHE = (FraterAchadSystem, TrueWillPathway)
    return _MODULE_CACHE


def __getattr__(name: str) -> Any:
    FraterAchadSystem, TrueWillPathway = _load_module()
    if name == "FraterAchadSystem":
        return FraterAchadSystem
    if name == "TrueWillPathway":
        return TrueWillPathway
    raise AttributeError(name)
