#!/usr/bin/env node

/**
 * Liber Arcanae CLI - Clean Version
 * Command-line interface for the 78-card tarot system
 */

import { LiberArcanae } from './LiberArcanae.js';

const system = new LiberArcanae();

function showHelp() {
  console.log(`
🃏 Liber Arcanae Codex Abyssiae CLI

Usage: liber-arcanae <command> [options]

Commands:
  cards             List all cards
  major             Show Major Arcana
  minor             Show Minor Arcana
  card <id>         Show specific card details
  search <query>    Search cards
  fusion <cards>    Create fusion session
  report            Generate system report
  help              Show this help

Examples:
  liber-arcanae cards
  liber-arcanae card 0_fool
  liber-arcanae search "fire"
  liber-arcanae fusion "0_fool,1_magician"
  liber-arcanae report

For more information, visit: https://github.com/Bekalah/cathedral
  `);
}

async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'cards':
      console.log('🃏 All Arcana Cards:\n');
      const cards = system.getAllCards();
      cards.forEach(card => {
        console.log(`${card.id}: ${card.name}`);
        console.log(`   ${card.element} - ${card.type} - ${card.narrative.archetype}`);
        console.log('');
      });
      break;

    case 'major':
      console.log('🎭 Major Arcana:\n');
      const majorCards = system.getMajorArcana();
      majorCards.forEach(card => {
        console.log(`${card.number}: ${card.name} (${card.element})`);
        console.log(`   "${card.narrative.theme}"`);
        console.log('');
      });
      break;

    case 'minor':
      console.log('🗂️ Minor Arcana:\n');
      const minorCards = system.getMinorArcana();
      minorCards.forEach(card => {
        console.log(`${card.name} (${card.element})`);
        console.log(`   ${card.narrative.archetype}`);
        console.log('');
      });
      break;

    case 'card':
      const cardId = process.argv[3];
      if (!cardId) {
        console.log('❌ Please provide a card ID');
        process.exit(1);
      }

      const card = system.getCard(cardId);
      if (card) {
        console.log(`🃏 ${card.name} (${card.id})`);
        console.log(`Type: ${card.type}`);
        console.log(`Element: ${card.element}`);
        console.log(`Planet: ${card.planet}`);
        console.log(`Chakra: ${card.chakra}`);
        console.log(`Theme: ${card.narrative.theme}`);
        console.log(`Archetype: ${card.narrative.archetype}`);
        console.log(`Keywords: ${card.narrative.keywords.join(', ')}`);
        console.log(`Game Style: ${card.gameDesign.gameplayStyle}`);
        console.log(`Mirrored Codex Nodes: ${card.mirroredCodexNodes.join(', ')}`);
      } else {
        console.log(`❌ Card ${cardId} not found`);
      }
      break;

    case 'search':
      const query = process.argv[3];
      if (!query) {
        console.log('❌ Please provide a search query');
        process.exit(1);
      }

      console.log(`🔍 Searching for: "${query}"`);
      const results = await system.searchCards({
        keywords: [query],
        limit: 10
      });

      console.log(`\nFound ${results.cards.length} cards:\n`);
      results.cards.forEach(card => {
        console.log(`${card.id}: ${card.name}`);
        console.log(`   ${card.element} - ${card.narrative.archetype}`);
        console.log('');
      });
      break;

    case 'fusion':
      const cardIds = process.argv[3]?.split(',') || [];
      if (cardIds.length < 2) {
        console.log('❌ Please provide at least 2 card IDs for fusion');
        process.exit(1);
      }

      console.log(`⚗️ Creating fusion session with: ${cardIds.join(', ')}`);
      const session = system.createFusionSession(cardIds, 'elemental_fusion');
      console.log(`✅ Created session: ${session.id}`);
      console.log(`Duration: ${session.duration} minutes`);
      console.log(`Intensity: ${session.intensity}/10`);
      break;

    case 'report':
      console.log('📊 Generating Liber Arcanae report...');
      const report = system.generateReport();
      console.log(report);
      break;

    default:
      showHelp();
      break;
  }
}

if (process.argv.length < 3) {
  showHelp();
} else {
  main().catch(console.error);
}