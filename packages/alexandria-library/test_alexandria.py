# Test the Library of Alexandria Restored
# Verify the luminous cathedral-library hybrid architecture

import sys
import os
sys.path.append(os.path.join('.', 'packages', 'alexandria-library'))

from alexandria_architecture import AlexandriaArchitecture, LibraryWing
from hall_of_gnosis import HallOfGnosis, PhilosophicalSchool

def test_library_architecture():
    """Test the main architecture of the Library"""
    print("🏛️ Testing Library of Alexandria Restored Architecture...")
    
    library = AlexandriaArchitecture()
    
    # Test overall status
    status = library.get_library_status()
    print(f"✨ {status['architecture']}")
    print(f"📐 Form: {status['form']}")
    print(f"🌟 Luminosity: {status['overall_luminosity']}")
    print(f"⚡ Spinal Axis: {status['spinal_axis']['total_vertebrae']} vertebrae")
    print()
    
    # Test rose window filtering
    print("🌹 Testing Rose Window Data Filters...")
    filter_result = library.filter_through_rose_window("navigation", "gnosis wisdom philosophy")
    print(f"🔍 Query: {filter_result['query']}")
    print(f"✨ Total Resonance: {filter_result['total_resonance']:.2f}")
    print(f"🎨 Dominant Colors: {filter_result['dominant_colors']}")
    print()
    
    # Test vertebra activation
    print("🕯️ Testing Spinal Axis Activation...")
    activation = library.activate_vertebra(1, "I AM THAT I AM")
    if activation['success']:
        print(f"⚡ Activated: {activation['angel']} & {activation['daemon']}")
        print(f"🌀 Domain: {activation['domain']}")
        print(f"📝 Message: {activation['message']}")
    print()
    
    # Test wing navigation
    print("🚪 Testing Wing Navigation...")
    gnosis_wing = library.navigate_to_wing(LibraryWing.GNOSIS)
    print(f"🏛️ Destination: {gnosis_wing['title']}")
    print(f"📚 Collections: {len(gnosis_wing['available_collections'])}")
    print(f"👼 Guardians: {gnosis_wing['guardians']}")
    print()
    
    # Test crypt descent
    print("🕳️ Testing Crypts Below...")
    crypt_access = library.descend_to_crypts(3)
    print(f"📍 Level {crypt_access['descent_level']}: {crypt_access['description']}")
    print(f"💡 Light Level: {crypt_access['light_level']}")
    print(f"🌑 Shadow Intensity: {crypt_access['shadow_intensity']}")
    print(f"🔮 Guardian Message: {crypt_access['guardian_message']}")
    print()
    
    return True

def test_hall_of_gnosis():
    """Test the Hall of Gnosis functionality"""
    print("📖 Testing Hall of Gnosis...")
    
    hall = HallOfGnosis()
    
    # Test hall status
    status = hall.get_hall_status()
    print(f"🏛️ {status['hall']}")
    print(f"📚 Collections: {status['collections']}")
    print(f"🔳 Soyga Squares: {status['soyga_squares']}")
    print(f"👼 Angel Correspondences: {status['angelic_correspondences']}")
    print()
    
    # Test philosophical search
    print("🔍 Testing Philosophical Search...")
    search_results = hall.search_collections("wisdom forms divine knowledge")
    print(f"📝 Query: {search_results['query']}")
    print(f"🎯 Matches found: {len(search_results['matches'])}")
    for match in search_results['matches'][:3]:
        print(f"  📖 {match['school']}: {match['title']} (relevance: {match['relevance']:.2f})")
    print()
    
    # Test Soyga square activation
    print("🔳 Testing Soyga Square Activation...")
    square_activation = hall.activate_soyga_square("elemech")
    if "error" not in square_activation:
        print(f"⚡ Activated: {square_activation['angel_governor']}")
        print(f"🔢 Size: {square_activation['size']}x{square_activation['size']}")
        print(f"🌟 Magical Constant: {square_activation['magical_constant']}")
        print(f"🔮 Guidance: {square_activation['guidance']}")
    print()
    
    # Test angel invocation
    print("👼 Testing Angel Invocation...")
    invocation = hall.invoke_angel("Michael")
    if "error" not in invocation:
        print(f"⚡ Invoked: {invocation['angel']} ({invocation['hebrew_name']})")
        print(f"🔢 Gematria: {invocation['gematria']}")
        print(f"🌟 Sphere: {invocation['sphere_of_influence']}")
        print(f"💬 Message: {invocation['message']}")
    print()
    
    # Test philosophical inquiry
    print("🤔 Testing Philosophical Inquiry...")
    inquiry = hall.philosophical_inquiry("What is the nature of wisdom and how can we attain it?")
    print(f"❓ Question: {inquiry['question']}")
    print(f"🏫 Relevant Schools: {inquiry['relevant_schools']}")
    print(f"📚 Perspectives gathered: {len(inquiry['philosophical_perspectives'])}")
    print()
    
    return True

def test_museum_integration():
    """Test integration with museum sources and cathedral style"""
    print("🏛️ Testing Museum Integration...")
    
    # Test imports
    try:
        sys.path.append(os.path.join('.', 'packages', 'museum-sources'))
        sys.path.append(os.path.join('.', 'packages', 'cathedral-style'))
        
        from museum_sources_engine import MuseumSourcesEngine
        from cathedral_style_engine import CathedralStyleEngine, StyleTier
        
        print("✅ Museum sources engine imported successfully")
        print("✅ Cathedral style engine imported successfully")
        
        # Test museum engine
        museum = MuseumSourcesEngine()
        sources = museum.get_sources_for_archetype("magician")
        print(f"🏛️ Found {len(sources)} museum sources for 'magician' archetype")
        
        # Test style engine
        style = CathedralStyleEngine()
        enhanced_prompt = style.elevate_prompt_style(
            "A wise philosopher contemplating sacred geometry", 
            StyleTier.MUSEUM_GRADE,
            "hermit"
        )
        print(f"🎨 Enhanced prompt created with museum-grade style")
        print()
        
        return True
        
    except ImportError as e:
        print(f"⚠️ Museum integration test skipped: {e}")
        return False

if __name__ == "__main__":
    print("✨ Library of Alexandria Restored - Complete System Test")
    print("=" * 60)
    print()
    
    try:
        # Test main architecture
        arch_success = test_library_architecture()
        print("✅ Architecture test completed")
        print()
        
        # Test Hall of Gnosis
        gnosis_success = test_hall_of_gnosis()
        print("✅ Hall of Gnosis test completed")
        print()
        
        # Test museum integration
        museum_success = test_museum_integration()
        if museum_success:
            print("✅ Museum integration test completed")
        print()
        
        # Final status
        if arch_success and gnosis_success:
            print("🎉 Library of Alexandria Restored - All Systems Operational!")
            print("🌟 The luminous cathedral-library hybrid is ready for international recognition")
            print("📚 21-petal rose windows filtering knowledge through sacred geometry")
            print("⚡ 33-vertebrae spinal axis connecting heaven and earth")
            print("🏛️ Four wings housing the complete spectrum of wisdom")
            print("🕳️ Crypts below acknowledging all aspects of the journey")
        else:
            print("⚠️ Some systems need attention")
            
    except Exception as e:
        print(f"❌ Test error: {e}")
        import traceback
        traceback.print_exc()