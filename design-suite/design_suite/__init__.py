"""Cathedral Design Suite - modular package"""

try:
    from suite import CathedralDesignSuite
    from geometry import SacredGeometry
    from fractals import FractalPattern
    from templates import DesignTemplate
    from integrations import build_integration_spec, render_integration_preview
except ImportError:
    # Fallback minimal implementations
    class CathedralDesignSuite:
        def __init__(self):
            print("🏛️ Cathedral Design Suite (minimal mode)")
        def export_complete_suite(self):
            return {"status": "minimal", "version": "1.0.0"}
    
    class SacredGeometry:
        pass
    
    class FractalPattern:
        pass
    
    class DesignTemplate:
        pass
    
    def build_integration_spec():
        return {}
    
    def render_integration_preview():
        return {}

__all__ = [
    "CathedralDesignSuite",
    "SacredGeometry", 
    "FractalPattern",
    "DesignTemplate",
    "build_integration_spec",
    "render_integration_preview",
]