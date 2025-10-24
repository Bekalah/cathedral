/**
 * Complete Integration Example
 * Shows how to use Codex 144:99, Liber Arcanae, and Fusion Kink together
 */

import { PluginManager } from '../src/PluginManager.js';

async function demonstrateCompleteIntegration() {
  console.log('🌟 Starting Complete Cathedral Integration Demo\n');

  // Initialize the unified system
  const manager = new PluginManager();
  const system = manager.getModularSystem();

  // 1. Explore Codex 144:99 independently
  console.log('📚 1. Codex 144:99 Sacred Mathematics');
  const fireNode = system.codex144.getNode(1);
  console.log(`Found node: ${fireNode?.name} (${fireNode?.element})`);

  const research = await system.codex144.searchNodes({
    keywords: ['sacred geometry', 'fire']
  });
  console.log(`Found ${research.length} research sources\n`);

  // 2. Explore Liber Arcanae independently
  console.log('🃏 2. Liber Arcanae Tarot System');
  const foolCard = system.liberArcanae.getCard('0_fool');
  console.log(`Found card: ${foolCard?.name} (${foolCard?.element})`);

  const cards = await system.liberArcanae.searchCards({
    keywords: ['fire', 'transformation']
  });
  console.log(`Found ${cards.length} related cards\n`);

  // 3. Create fusion kink session
  console.log('⚗️ 3. Fusion Kink Integration');
  const fusionSession = system.liberArcanae.createFusionSession(
    ['0_fool', '1_magician'],
    'divine_alchemical'
  );
  console.log(`Created fusion session: ${fusionSession.id}`);
  console.log(`Duration: ${fusionSession.duration} minutes`);
  console.log(`Intensity: ${fusionSession.intensity}/10\n`);

  // 4. Cross-reference between systems
  console.log('🔗 4. Cross-System Integration');
  const arcanaForFire = system.crossReference.findArcanaForCodexNode(1);
  console.log(`Found ${arcanaForFire.length} Arcana for Fire node`);

  const nodesForFool = system.crossReference.findCodexNodesForArcana('0_fool');
  console.log(`Found ${nodesForFool.length} Codex nodes for The Fool\n`);

  // 5. Generate comprehensive reports
  console.log('📊 5. System Reports');
  const codexReport = system.codex144.generateReport();
  const arcanaeReport = system.liberArcanae.getAnalytics();

  console.log('Codex 144:99 Summary:');
  console.log(`- Total Nodes: ${system.codex144.getAllNodes().length}`);
  console.log(`- Sacred Ratio: 144:99 (${(144/99).toFixed(3)})`);

  console.log('\nLiber Arcanae Summary:');
  console.log(`- Total Cards: ${arcanaeReport.totalCards}`);
  console.log(`- Major Arcana: ${arcanaeReport.majorArcana}`);
  console.log(`- Minor Arcana: ${arcanaeReport.minorArcana}\n`);

  // 6. Demonstrate game world building
  console.log('🎮 6. Game World Integration');
  const worldElements = await buildGameWorld(system);
  console.log(`Generated world with ${worldElements.nodes.length} foundation nodes`);
  console.log(`Created ${worldElements.mechanics.length} fusion mechanics\n`);

  // 7. Demonstrate art generation
  console.log('🎨 7. Art Generation Integration');
  const artElements = await generateSacredArt(system, 'divine consciousness');
  console.log(`Generated art inspiration with ${artElements.colors.length} colors`);
  console.log(`Found ${artElements.symbols.length} sacred symbols\n`);

  // 8. Demonstrate research platform
  console.log('🔬 8. Research Platform Integration');
  const researchResults = await researchTopic(system, 'sacred geometry');
  console.log(`Conducted research on "${'sacred geometry'}"`);
  console.log(`Found ${researchResults.codexResults.length} Codex sources`);
  console.log(`Found ${researchResults.arcanaResults.length} Arcana sources\n`);

  console.log('✅ Complete integration demonstration finished!');
  console.log('\nThis shows how all three systems work together to create');
  console.log('a rich, interconnected ecosystem for sacred technology.');
}

/**
 * Build a game world using all three systems
 */
async function buildGameWorld(system: any) {
  // Get foundation from Codex
  const nodes = system.codex144.getAllNodes();

  // Get characters from Arcana
  const characters = system.liberArcanae.getAllCards();

  // Create fusion mechanics for world interactions
  const mechanics = [];

  for (const node of nodes.slice(0, 3)) { // Just first 3 for demo
    const arcana = system.crossReference.findArcanaForCodexNode(node.id);
    if (arcana.length > 0) {
      const fusion = system.fusionKink.createSession([arcana[0].id], 'world_mechanic');
      mechanics.push({ node, arcana, fusion });
    }
  }

  return { nodes, characters, mechanics };
}

/**
 * Generate sacred art using all systems
 */
async function generateSacredArt(system: any, theme: string) {
  // Get mathematical foundation from Codex
  const node = system.codex144.getNode(1);

  // Get symbolic elements from Arcana
  const card = system.liberArcanae.getCard('0_fool');

  // Create fusion for enhanced creativity
  const fusion = system.fusionKink.createSession([card.id], 'creative_fusion');

  return {
    geometry: node.geometry,
    colors: [node.color, card.color],
    symbols: [card.symbolism.primarySymbol],
    harmonics: node.harmonics,
    fusion: fusion.id,
    theme
  };
}

/**
 * Research a topic using all systems
 */
async function researchTopic(system: any, topic: string) {
  // Multi-system research approach
  const [codexResults, arcanaResults] = await Promise.all([
    system.codex144.searchNodes({ keywords: [topic] }),
    system.liberArcanae.searchCards({ keywords: [topic] })
  ]);

  // Create fusion for deeper understanding
  if (arcanaResults.length > 0) {
    const fusion = system.fusionKink.createSession([arcanaResults[0].id], 'research_fusion');
  }

  return { codexResults, arcanaResults };
}

// Export for use in other files
export { demonstrateCompleteIntegration };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateCompleteIntegration().catch(console.error);
}