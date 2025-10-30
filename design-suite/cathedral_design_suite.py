# 🎨 Cathedral Creative Design Suite
# Professional design tools with sacred geometry, fractals, and magical integration
# Anti-flat, precision-focused creative instruments for highly creative minds
#
# NOTE: This file is now a thin wrapper around the modular design_suite package.
# For the full implementation, see design_suite/ subdirectory.

from design_suite import CathedralDesignSuite, SacredGeometry, FractalPattern, DesignTemplate

# Re-export for backward compatibility
__all__ = ["CathedralDesignSuite", "SacredGeometry", "FractalPattern", "DesignTemplate"]


# Command Line Interface
if __name__ == "__main__":
    print("🎨 CATHEDRAL CREATIVE DESIGN SUITE")
    print("=" * 60)

    suite = CathedralDesignSuite()

    print("✨ Professional design suite initialized:")
    print(f"   • {len(suite.sacred_geometries)} Sacred geometry patterns")
    print(f"   • {len(suite.fractal_patterns)} Fractal algorithms")
    print(f"   • {len(suite.color_palettes)} Professional color palettes")
    print(f"   • {len(suite.design_templates)} Design templates")
    print("   • Precision brush set with 6 specialized tools")
    print("   • Witch Eye logo integration")
    print()

    # Generate sample sacred geometry
    print("🔮 Generating sample sacred geometry: Flower of Life...")
    flower_image = suite.generate_sacred_geometry("flower_of_life")
    print(f"   Generated {flower_image.shape[0]}x{flower_image.shape[1]} image")

    # Generate sample fractal
    print("🌀 Generating sample fractal: Cathedral Mandelbrot...")
    mandelbrot_image = suite.generate_fractal("mandelbrot_cathedral")
    print(f"   Generated {mandelbrot_image.shape[0]}x{mandelbrot_image.shape[1]} fractal")

    # Create sample design
    print("🎯 Creating sample design: Magical Business Card...")
    business_card = suite.create_design_from_template(
        "business_card_magical",
        {
            "company_name": "Cathedral Circuits",
            "tagline": "Where Art Meets Sacred Science",
            "contact_info": "rebecca@cathedral-circuits.com",
        },
    )
    print(f"   Design created: {business_card['template_name']}")
    print(f"   Dimensions: {business_card['dimensions_inches']} inches")
    print(f"   Layers: {len(business_card['layers'])}")

    print("\n🏛️ Cathedral Design Suite operational!")
    print("✨ Anti-flat, precision-focused tools ready for highly creative minds!")
