#!/usr/bin/env node

/**
 * Cathedral CLI - Universal Access Tool
 * Simple, direct access to all sacred systems without any hoop jumping
 */

const fs = require('fs');
const path = require('path');

// Simple, standalone implementations of core systems
class SimpleCodexLibrary {
  constructor() {
    this.nodes = this.loadNodes();
  }

  loadNodes() {
    try {
      const dataPath = path.join(__dirname, '../data/codex-144-expanded.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return data.nodes.reduce((map, node) => {
        map[node.id] = node;
        return map;
      }, {});
    } catch (error) {
      console.error('Error loading Codex nodes:', error.message);
      return {};
    }
  }

  getNode(id) {
    return this.nodes[id];
  }

  getAllNodes() {
    return Object.values(this.nodes);
  }

  searchNodes(query) {
    const nodes = Object.values(this.nodes);
    return nodes.filter(node =>
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      node.element.toLowerCase().includes(query.toLowerCase()) ||
      node.narrative.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

class SimpleLiberArcanae {
  constructor() {
    this.cards = this.loadCards();
  }

  loadCards() {
    try {
      const dataPath = path.join(__dirname, '../data/complete-arcana-profiles.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      return Object.entries(data.arcana_faculty_profiles.major_arcana).reduce((map, [key, card]) => {
        map[key] = card;
        return map;
      }, {});
    } catch (error) {
      console.error('Error loading Arcana cards:', error.message);
      return {};
    }
  }

  getCard(id) {
    return this.cards[id];
  }

  getAllCards() {
    return Object.values(this.cards);
  }

  searchCards(query) {
    const cards = Object.values(this.cards);
    return cards.filter(card =>
      card.name.toLowerCase().includes(query.toLowerCase()) ||
      card.element.toLowerCase().includes(query.toLowerCase())
    );
  }
}

class SimpleFusionEngine {
  createSession(cardIds, type) {
    return {
      id: `fusion_${Date.now()}`,
      participants: cardIds,
      type,
      intensity: 5,
      safety: 'trauma-informed',
      consent: true,
      transformation: 'sacred-union',
      duration: 60
    };
  }

  validateSafety(cards, intensity) {
    return {
      isSafe: true,
      warnings: [],
      recommendations: ['Take your time', 'Trust your intuition', 'Ground afterward']
    };
  }
}

// Main CLI class
class CathedralCLI {
  constructor() {
    this.codex = new SimpleCodexLibrary();
    this.arcanae = new SimpleLiberArcanae();
    this.fusion = new SimpleFusionEngine();
  }

  showHelp() {
    console.log(`
🌟 Cathedral CLI - Universal Sacred Technology Access

Usage: cathedral <command> [options]

Commands:
  codex <id>           Show Codex 144:99 node details
  codex search <query>  Search Codex nodes
  arcanae <id>         Show Liber Arcanae card details
  arcanae search <query> Search Arcana cards
  fusion <cards>       Create fusion session
  design               Open design studio (if available)
  tarot                Open tarot readings (if available)
  help                 Show this help

Examples:
  cathedral codex 1
  cathedral codex search fire
  cathedral arcanae 0_fool
  cathedral arcanae search transformation
  cathedral fusion "0_fool,1_magician"
  cathedral design
  cathedral tarot

✨ Zero external dependencies - works immediately!
🔒 No hoop jumping - direct access to all functionality!
🎯 ND-friendly - designed for neurodivergent thinking!

For more information, visit: https://github.com/Bekalah/cathedral
    `);
  }

  async run() {
    const command = process.argv[2];

    switch (command) {
      case 'codex':
        await this.handleCodex();
        break;
      case 'arcanae':
        await this.handleArcanae();
        break;
      case 'fusion':
        this.handleFusion();
        break;
      case 'design':
        this.handleDesign();
        break;
      case 'tarot':
        this.handleTarot();
        break;
      default:
        this.showHelp();
        break;
    }
  }

  async handleCodex() {
    const subcommand = process.argv[3];

    if (subcommand === 'search') {
      const query = process.argv[4];
      if (!query) {
        console.log('❌ Please provide a search query');
        return;
      }

      console.log(`🔍 Searching Codex for: "${query}"`);
      const results = this.codex.searchNodes(query);

      if (results.length === 0) {
        console.log('❌ No nodes found');
        return;
      }

      results.forEach(node => {
        console.log(`\n📍 Node ${node.id}: ${node.name}`);
        console.log(`   Element: ${node.element} (${node.planet})`);
        console.log(`   Chakra: ${node.chakra}`);
        console.log(`   Theme: ${node.narrative.theme}`);
        console.log(`   Keywords: ${node.narrative.keywords.join(', ')}`);
      });

    } else {
      const nodeId = parseInt(subcommand);
      if (!nodeId || nodeId < 1 || nodeId > 144) {
        console.log('❌ Please provide a valid node ID (1-144)');
        return;
      }

      const node = this.codex.getNode(nodeId);
      if (!node) {
        console.log(`❌ Node ${nodeId} not found`);
        return;
      }

      console.log(`\n📍 Codex Node ${node.id}: ${node.name}`);
      console.log(`   Element: ${node.element} (${node.planet} - ${node.zodiac})`);
      console.log(`   Chakra: ${node.chakra}`);
      console.log(`   Solfeggio: ${node.solfeggio}Hz`);
      console.log(`   Color: ${node.color}`);
      console.log(`   Geometry: ${node.geometry}`);
      console.log(`   Angel: ${node.shem}`);
      console.log(`   Demon: ${node.goetia}`);
      console.log(`   Theme: ${node.narrative.theme}`);
      console.log(`   Archetype: ${node.narrative.archetype}`);
      console.log(`   Keywords: ${node.narrative.keywords.join(', ')}`);
    }
  }

  async handleArcanae() {
    const subcommand = process.argv[3];

    if (subcommand === 'search') {
      const query = process.argv[4];
      if (!query) {
        console.log('❌ Please provide a search query');
        return;
      }

      console.log(`🔍 Searching Arcanae for: "${query}"`);
      const results = this.arcanae.searchCards(query);

      if (results.length === 0) {
        console.log('❌ No cards found');
        return;
      }

      results.forEach(card => {
        console.log(`\n🃏 ${card.name} (${card.number})`);
        console.log(`   Element: ${card.element}`);
        console.log(`   Specializations: ${card.specializations.join(', ')}`);
        console.log(`   Status: ${card.faculty_status}`);
      });

    } else {
      const cardId = subcommand;
      if (!cardId) {
        console.log('❌ Please provide a card ID');
        return;
      }

      const card = this.arcanae.getCard(cardId);
      if (!card) {
        console.log(`❌ Card ${cardId} not found`);
        return;
      }

      console.log(`\n🃏 ${card.name} (${card.number})`);
      console.log(`   Title: ${card.title}`);
      console.log(`   Element: ${card.element}`);
      console.log(`   Status: ${card.faculty_status}`);
      console.log(`   Department: ${card.department}`);
      console.log(`   Specializations: ${card.specializations.join(', ')}`);
      console.log(`   Teaching Focus: ${card.powers.teaching_focus}`);
    }
  }

  handleFusion() {
    const cardIds = process.argv[3]?.split(',') || [];
    if (cardIds.length < 2) {
      console.log('❌ Please provide at least 2 card IDs for fusion');
      console.log('Example: cathedral fusion "0_fool,1_magician"');
      return;
    }

    console.log(`⚗️ Creating fusion session with: ${cardIds.join(', ')}`);
    const session = this.fusion.createSession(cardIds, 'sacred_union');

    console.log(`\n✅ Fusion Session Created:`);
    console.log(`   ID: ${session.id}`);
    console.log(`   Type: ${session.type}`);
    console.log(`   Intensity: ${session.intensity}/10`);
    console.log(`   Duration: ${session.duration} minutes`);
    console.log(`   Safety: ${session.safety}`);
    console.log(`   Consent: ${session.consent ? 'Required' : 'Not required'}`);
    console.log(`   Transformation: ${session.transformation}`);
  }

  handleDesign() {
    console.log('🎨 Cathedral Design Studio');
    console.log('Opening design interface...');
    console.log('\nTo use the visual design studio:');
    console.log('1. Open: apps/cathedral-design-studio/index.html');
    console.log('2. Use sacred geometry tools');
    console.log('3. Apply 144:99 mathematics');
    console.log('4. Create with your authentic vision');
  }

  handleTarot() {
    console.log('🃏 Liber Arcanae Tarot Readings');
    console.log('Opening tarot interface...');
    console.log('\nTo use the tarot reading app:');
    console.log('1. Open: apps/liber-arcanae-tarot/index.html');
    console.log('2. Choose your sacred spread');
    console.log('3. Experience real readings with alchemy themes');
    console.log('4. Explore symbol meanings and fusion mechanics');
  }
}

// Run the CLI
if (require.main === module) {
  const cli = new CathedralCLI();
  cli.run().catch(console.error);
}

module.exports = CathedralCLI;