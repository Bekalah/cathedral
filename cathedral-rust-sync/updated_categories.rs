// Updated categories list for Rebecca's Cathedral System
use std::process::Command;

pub fn get_cathedral_categories() -> Vec<&'static str> {
    vec![
        // Original mystical/business categories
        "tarot-system/72-degrees-hermann-haindl",
        "circuitum99/33-living-chapters", 
        "audio-system/vst3-strudel-integration",
        "mystical-system/alpha-omega-arcanae",
        "business-system/rebecca-professional-work",
        "game-system/fool-respawn-gate",
        "session-system/replit-connection",
        
        // NEW: Affinity Designer 2 Integration
        "design-system/affinity-designer-2/tarot-designs",
        "design-system/affinity-designer-2/business-designs", 
        "design-system/affinity-designer-2/mystical-business",
        "design-system/affinity-designer-2/game-designs",
    ]
}

pub fn print_cathedral_system_overview() {
    println!("🏛️ CATHEDRAL UNIFIED SYSTEM - Rebecca's Complete Work");
    println!("===================================================");
    println!();
    println!("📚 WORK CATEGORIES:");
    println!("   🎴 Tarot: Hermann Haindl 72-degree ceremonial system");
    println!("   🔄 Circuitum99: 33 living chapters - Alpha Et Omega");  
    println!("   🎵 Audio: VST3 & Strudel integration for mystical sound");
    println!("   ⚡ Mystical: Alpha Omega arcanae and hierophant ceremonies");
    println!("   💼 Business: Rebecca's professional writing and consulting");
    println!("   🎮 Game: The Fool card game and respawn gate mechanics");
    println!("   🔗 Session: Replit connection and development workflow");
    println!();
    println!("🎨 NEW: AFFINITY DESIGNER 2 INTEGRATION");
    println!("   🃏 Tarot Designs: Sacred geometry layouts for ceremonial work");
    println!("   💼 Business Designs: Professional brand materials and presentations");
    println!("   🏛️ Mystical Business: Ceremonial layouts with alpha omega duality");
    println!("   🎮 Game Designs: Visual assets for The Fool and respawn systems");
    println!();
    println!("🌐 Master Repository: https://github.com/bekalah/cathedral");
    println!("✨ All unified and flowing - ready for push/fetch operations");
}
