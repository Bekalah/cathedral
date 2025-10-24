/**
 * Cathedral Integration Example
 * Clean, working example of using all three systems together
 */

import { PluginManager } from '../src/PluginManager.js';

async function demonstrateIntegration() {
  console.log('🌟 Cathedral Integration Demo\n');

  // Initialize the plugin system
  const manager = new PluginManager();
  const system = manager.getModularSystem();

  try {
    // 1. Get a Codex node
    console.log('📚 1. Codex 144:99 - Sacred Mathematics');
    const fireNode = system.codex144.getNode(1);
    if (fireNode) {
      console.log(`Found: ${fireNode.name} (${fireNode.element})`);
      console.log(`Solfeggio: ${fireNode.solfeggio}Hz`);
      console.log(`Geometry: ${fireNode.geometry}`);
    }

    // 2. Get a Liber Arcanae card
    console.log('\n🃏 2. Liber Arcanae - Tarot System');
    const foolCard = system.liberArcanae.getCard('0_fool');
    if (foolCard) {
      console.log(`Found: ${foolCard.name} (${foolCard.element})`);
      console.log(`Archetype: ${foolCard.narrative.archetype}`);
      console.log(`Theme: ${foolCard.narrative.theme}`);
    }

    // 3. Create fusion session
    console.log('\n⚗️ 3. Fusion Kink - Sacred Union');
    const fusionSession = system.liberArcanae.createFusionSession(
      ['0_fool', '1_magician'],
      'divine_alchemical'
    );
    console.log(`Created fusion session: ${fusionSession.id}`);
    console.log(`Duration: ${fusionSession.duration} minutes`);
    console.log(`Intensity: ${fusionSession.intensity}/10`);

    // 4. Cross-reference systems
    console.log('\n🔗 4. Cross-System Integration');
    const arcanaForNode = system.crossReference.findArcanaForCodexNode(1);
    console.log(`Found ${arcanaForNode.length} Arcana for Fire node`);

    const nodesForCard = system.crossReference.findCodexNodesForArcana('0_fool');
    console.log(`Found ${nodesForCard.length} Codex nodes for The Fool`);

    // 5. Generate reports
    console.log('\n📊 5. System Reports');
    const codexReport = system.codex144.generateReport();
    const arcanaeAnalytics = system.liberArcanae.getAnalytics();

    console.log('System Status:');
    console.log(`- Codex Nodes: ${system.codex144.getAllNodes().length}`);
    console.log(`- Arcana Cards: ${system.liberArcanae.getAllCards().length}`);
    console.log(`- Fusion Sessions: ${system.liberArcanae.getAllFusionSessions().length}`);

    console.log('\n✅ Integration demonstration complete!');
    console.log('All three systems are working together harmoniously.');

  } catch (error) {
    console.error('❌ Error during integration demo:', error);
  }
}

// Export for use in other files
export { demonstrateIntegration };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateIntegration().catch(console.error);
}