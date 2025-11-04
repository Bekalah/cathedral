#!/usr/bin/env node

/**
 * CATHEDRAL BOOK GAME LAUNCHER
 * Unified entry point for the complete book game system
 */

import { MagicalMysteryHouse } from './packages/magical-mystery-house/index.js';
import { Circuitum99AlphaOmega } from './packages/circuitum99/index.js';

class CathedralBookGameLauncher {
    constructor() {
        this.mysteryHouse = new MagicalMysteryHouse();
        this.circuitum99 = new Circuitum99AlphaOmega();
        
        console.log('🏛️✨ CATHEDRAL BOOK GAME SYSTEM INITIALIZED ✨🏛️');
        console.log('');
    }
    
    // Main game menu
    showMainMenu() {
        console.log('🎮 === CATHEDRAL BOOK GAME === 🎮');
        console.log('');
        console.log('🏠 MAGICAL MYSTERY HOUSE - Navigate all Cathedral systems');
        console.log('   • Soul Library: Circuitum99 Alpha et Omega book game');
        console.log('   • Body Archive: Stone-Grimoire chapel navigation');
        console.log('   • Spirit Observatory: Cosmogenesis Learning Engine');
        console.log('   • Fusion Chamber: 144:99 Kink Heaven (consent required)');
        console.log('   • Plus 4 more mystery rooms...');
        console.log('');
        console.log('📚 CIRCUITUM99 ALPHA ET OMEGA - The Sacred Book Game');
        console.log('   • 99 Gates: Alpha (1-33), Mystery (34-66), Omega (67-99)');
        console.log('   • 144 Sacred Lattice: 12×12 constellation grid');
        console.log('   • HTML Visualization: Sacred geometry animations');
        console.log('   • Trauma-informed wisdom navigation');
        console.log('');
        console.log('🌟 QUICK START OPTIONS:');
        console.log('   1. Enter Mystery House (full navigation)');
        console.log('   2. Start Circuitum99 Book Game (99 gates journey)');
        console.log('   3. Open Alpha et Omega Visualization');
        console.log('   4. Random sacred entry point');
        console.log('');
    }
    
    // Launch Mystery House navigation
    async launchMysteryHouse() {
        console.log('🏠 ENTERING MAGICAL MYSTERY HOUSE...');
        console.log('');
        
        const status = this.mysteryHouse.getSystemStatus();
        console.log('System Status:', JSON.stringify(status, null, 2));
        console.log('');
        
        console.log('🚪 AVAILABLE ROOMS:');
        const rooms = Object.keys(this.mysteryHouse.mysteryRooms);
        rooms.forEach(room => {
            console.log(`   • ${room}: ${this.mysteryHouse.mysteryRooms[room]}`);
        });
        console.log('');
        
        // Example room access
        const soulLibrary = this.mysteryHouse.accessRoom('SOUL_LIBRARY');
        console.log('📚 SOUL LIBRARY CONNECTION:');
        console.log(JSON.stringify(soulLibrary, null, 2));
        console.log('');
    }
    
    // Launch Circuitum99 book game
    async launchCircuitum99() {
        console.log('📚 STARTING CIRCUITUM99 ALPHA ET OMEGA BOOK GAME...');
        console.log('');
        
        const gameStart = this.circuitum99.startBookGame();
        console.log('🎮 BOOK GAME MECHANICS:');
        console.log(JSON.stringify(gameStart, null, 2));
        console.log('');
        
        // Example gate entry
        const gate1 = this.circuitum99.enterGate(1);
        console.log('🚪 ENTERING GATE 1 (Alpha - New Beginning):');
        console.log(JSON.stringify(gate1, null, 2));
        console.log('');
        
        // Example lattice navigation  
        const lattice = this.circuitum99.navigateLattice(1, 1);
        console.log('🔮 LATTICE POINT [1,1] NAVIGATION:');
        console.log(JSON.stringify(lattice, null, 2));
        console.log('');
    }
    
    // Open HTML visualization
    async openVisualization() {
        console.log('🎨 OPENING ALPHA ET OMEGA VISUALIZATION...');
        console.log('');
        console.log('HTML Portal: ./circuitum99-alpha-et-omega.html');
        console.log('Features:');
        console.log('   • Sacred geometry animations');
        console.log('   • Interactive 99 gates navigation');
        console.log('   • 144 lattice constellation mapping');
        console.log('   • Theosophical and Avalon current visualizations');
        console.log('   • Trauma-safe color palettes');
        console.log('');
        console.log('🌐 Open in browser: file://' + process.cwd() + '/circuitum99-alpha-et-omega.html');
        console.log('');
    }
    
    // Random entry point
    async randomEntry() {
        console.log('🎲 GENERATING RANDOM SACRED ENTRY POINT...');
        console.log('');
        
        const randomGate = Math.floor(Math.random() * 99) + 1;
        const randomRow = Math.floor(Math.random() * 12) + 1;
        const randomCol = Math.floor(Math.random() * 12) + 1;
        
        console.log(`🚪 Random Gate: ${randomGate}`);
        const gateInfo = this.circuitum99.enterGate(randomGate);
        console.log(JSON.stringify(gateInfo, null, 2));
        console.log('');
        
        console.log(`🔮 Random Lattice: [${randomRow}, ${randomCol}]`);
        const latticeInfo = this.circuitum99.navigateLattice(randomRow, randomCol);
        console.log(JSON.stringify(latticeInfo, null, 2));
        console.log('');
    }
    
    // Integration status
    async showIntegrationStatus() {
        console.log('🔗 SYSTEM INTEGRATION STATUS:');
        console.log('');
        
        const mysteryStatus = this.mysteryHouse.getSystemStatus();
        const circuitumStatus = this.circuitum99.getSystemStatus();
        const connection = this.circuitum99.connectToMysteryHouse();
        
        console.log('Mystery House:', JSON.stringify(mysteryStatus, null, 2));
        console.log('');
        console.log('Circuitum99:', JSON.stringify(circuitumStatus, null, 2));
        console.log('');
        console.log('Integration:', JSON.stringify(connection, null, 2));
        console.log('');
    }
    
    // Main launcher
    async run() {
        this.showMainMenu();
        
        console.log('🚀 RUNNING DEMONSTRATION...');
        console.log('');
        
        await this.showIntegrationStatus();
        await this.launchMysteryHouse();
        await this.launchCircuitum99();
        await this.openVisualization();
        await this.randomEntry();
        
        console.log('✨ CATHEDRAL BOOK GAME SYSTEM READY FOR EXPLORATION ✨');
        console.log('🛡️ All systems trauma-informed with consent protocols active 🛡️');
        console.log('');
    }
}

// Launch if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const launcher = new CathedralBookGameLauncher();
    launcher.run().catch(console.error);
}

export { CathedralBookGameLauncher };