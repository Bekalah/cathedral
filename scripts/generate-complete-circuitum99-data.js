#!/usr/bin/env node
/**
 * 🏛️ COMPLETE CIRCUITUM99 DATA GENERATOR
 * Generates all 78 tarot cards as mystical nodes with proper fusion mechanics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Circuitum99DataGenerator {
  constructor() {
    this.basePath = path.join(__dirname, '..');
    this.tarotData = null;
    this.shemData = null;
    this.codexData = null;
  }

  /**
   * Load all mystical datasets
   */
  async loadMysticalData() {
    console.log('🔮 Loading mystical datasets...');

    // Load Tarot data
    try {
      const tarotContent = fs.readFileSync(path.join(this.basePath, 'TAROT_MASTER_DATASET.json'), 'utf8');
      this.tarotData = JSON.parse(tarotContent);
      console.log(`✅ Loaded Tarot: ${this.tarotData.tarot_master_dataset.major_arcana.length} Major + ${this.tarotData.tarot_master_dataset.minor_arcana.suits.length} suits`);
    } catch (error) {
      console.error('❌ Failed to load Tarot data:', error.message);
    }

    // Load Shem data
    try {
      const shemContent = fs.readFileSync(path.join(this.basePath, 'data/codex_shem_72.json'), 'utf8');
      this.shemData = JSON.parse(shemContent);
      console.log(`✅ Loaded Shem: ${this.shemData.shem_angels.length} angels`);
    } catch (error) {
      console.error('❌ Failed to load Shem data:', error.message);
    }

    // Load Codex data
    try {
      const codexContent = fs.readFileSync(path.join(this.basePath, 'data/codex_nodes_99.json'), 'utf8');
      this.codexData = JSON.parse(codexContent);
      console.log(`✅ Loaded Codex: ${this.codexData.length} nodes`);
    } catch (error) {
      console.error('❌ Failed to load Codex data:', error.message);
    }
  }

  /**
   * Generate complete mystical node for a tarot card
   */
  generateMysticalNode(cardData, index) {
    const majorArcana = this.tarotData.tarot_master_dataset.major_arcana;
    const isMajor = index < 22;

    let card;
    if (isMajor) {
      card = majorArcana[index];
    } else {
      // Generate minor arcana data
      const suitIndex = Math.floor((index - 22) / 14);
      const cardInSuit = (index - 22) % 14;
      const suits = this.tarotData.tarot_master_dataset.minor_arcana.suits;
      card = this.generateMinorArcanaData(suits[suitIndex], cardInSuit + 1);
    }

    // Calculate sacred geometry position
    const position = this.calculateSacredPosition(index);

    // Generate fusion connections
    const connections = this.generateFusionConnections(index);

    // Get corresponding Shem angel
    const shemAngel = this.getCorrespondingShemAngel(card);

    return {
      id: `MA:${String(card.number || index).padStart(2, '0')}-${card.name.replace(/\s+/g, '')}`,
      name: card.name,
      type: isMajor ? 'major' : 'minor',
      cardData: card,
      position: position,
      energy: this.calculateInitialEnergy(card),
      frequency: card.frequency_hz || this.generateFrequency(card),
      color: card.color,
      element: card.element,
      sphere: this.getCorrespondingSphere(card),
      shemConnection: shemAngel,
      codexConnections: this.getCodexConnections(card),
      fusion: {
        canFuseWith: connections,
        fusionEnergy: this.calculateFusionEnergy(card),
        researchValue: this.calculateResearchValue(card)
      },
      gaming: {
        experience: 0,
        level: 1,
        achievements: [],
        unlockedPowers: [card.powers?.[0] || 'Basic Energy Manipulation']
      },
      sound: {
        frequencies: [card.frequency_hz || 432],
        binauralBeat: this.generateBinauralBeat(card),
        chant: this.generateChant(card)
      },
      research: {
        experiments: [],
        successRate: 0,
        totalAttempts: 0,
        insights: []
      }
    };
  }

  /**
   * Calculate sacred geometry position for node
   */
  calculateSacredPosition(index) {
    const isMajor = index < 22;
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    if (isMajor) {
      // Major Arcana on Tree of Life positions
      const treePositions = [
        [0, 0, 0],     // 0: The Fool
        [2, 3, 0],     // 1: The Magician
        [2, 1, 0],     // 2: High Priestess
        [1, 2, 0],     // 3: The Empress
        [3, 2, 0],     // 4: The Emperor
        [2, 0, 0],     // 5: The Hierophant
        [1, 1, 0],     // 6: The Lovers
        [3, 1, 0],     // 7: The Chariot
        [0, 1, 0],     // 8: Strength
        [4, 1, 0],     // 9: The Hermit
        [2, -1, 0],    // 10: Wheel of Fortune
        [1, 0, 0],     // 11: Justice
        [3, 0, 0],     // 12: The Hanged Man
        [2, -2, 0],    // 13: Death
        [1, -1, 0],    // 14: Temperance
        [3, -1, 0],    // 15: The Devil
        [2, -3, 0],    // 16: The Tower
        [0, -1, 0],    // 17: The Star
        [4, -1, 0],    // 18: The Moon
        [1, -2, 0],    // 19: The Sun
        [3, -2, 0],    // 20: Judgement
        [2, -4, 0]     // 21: The World
      ];
      return treePositions[index] || [0, 0, 0];
    } else {
      // Minor Arcana in elemental quadrants
      const minorIndex = index - 22;
      const suit = Math.floor(minorIndex / 14);
      const cardInSuit = minorIndex % 14;

      const quadrants = {
        0: [-5, 5, 0],   // Wands (Fire) - South
        1: [5, 5, 0],    // Cups (Water) - West
        2: [5, -5, 0],   // Swords (Air) - East
        3: [-5, -5, 0]   // Pentacles (Earth) - North
      };

      const base = quadrants[suit] || [0, 0, 0];
      const spread = 2;
      return [
        base[0] + (Math.random() - 0.5) * spread,
        base[1] + (Math.random() - 0.5) * spread,
        base[2]
      ];
    }
  }

  /**
   * Generate fusion connections for a card
   */
  generateFusionConnections(index) {
    const connections = [];
    const isMajor = index < 22;

    if (isMajor) {
      // Major arcana can fuse with adjacent cards and elementally compatible cards
      const majorArcana = this.tarotData.tarot_master_dataset.major_arcana;

      // Adjacent connections (numerical sequence)
      if (index > 0) connections.push(`MA:${String(index - 1).padStart(2, '0')}-${majorArcana[index - 1].name.replace(/\s+/g, '')}`);
      if (index < 21) connections.push(`MA:${String(index + 1).padStart(2, '0')}-${majorArcana[index + 1].name.replace(/\s+/g, '')}`);

      // Elemental connections
      const card = majorArcana[index];
      const compatibleCards = majorArcana.filter(c =>
        c.element === card.element && c.number !== card.number
      );

      compatibleCards.forEach(c => {
        connections.push(`MA:${String(c.number).padStart(2, '0')}-${c.name.replace(/\s+/g, '')}`);
      });
    } else {
      // Minor arcana connections within suit and with major arcana
      const minorIndex = index - 22;
      const suit = Math.floor(minorIndex / 14);
      const cardInSuit = minorIndex % 14;

      // Same suit connections
      for (let i = 0; i < 14; i++) {
        if (i !== cardInSuit) {
          const targetIndex = 22 + (suit * 14) + i;
          if (targetIndex < 78) {
            connections.push(`MI:${String(targetIndex).padStart(2, '0')}-Suit${suit}Card${i}`);
          }
        }
      }
    }

    return connections.slice(0, 8); // Limit connections for performance
  }

  /**
   * Generate minor arcana data for cards not in the dataset
   */
  generateMinorArcanaData(suit, number) {
    const suitNames = {
      0: 'Wands',
      1: 'Cups',
      2: 'Swords',
      3: 'Pentacles'
    };

    const suitData = suitNames[suit];
    const elements = ['Fire', 'Water', 'Air', 'Earth'];
    const element = elements[suit];

    return {
      number: number,
      name: `${number} of ${suitData}`,
      element: element,
      suit: suitData.toLowerCase(),
      keywords: this.generateKeywords(element, number),
      powers: this.generatePowers(element, number),
      frequency_hz: this.generateFrequencyByElement(element, number),
      color: this.getElementColor(element),
      archetype: `${suitData} Energy`
    };
  }

  /**
   * Generate keywords for minor arcana
   */
  generateKeywords(element, number) {
    const keywords = {
      'Fire': ['action', 'passion', 'creativity', 'willpower', 'inspiration', 'leadership', 'courage', 'motivation', 'drive', 'ambition'],
      'Water': ['emotion', 'intuition', 'relationships', 'compassion', 'healing', 'forgiveness', 'understanding', 'empathy', 'love', 'peace'],
      'Air': ['intellect', 'communication', 'clarity', 'truth', 'logic', 'reasoning', 'learning', 'teaching', 'ideas', 'expression'],
      'Earth': ['material', 'practicality', 'security', 'stability', 'work', 'money', 'health', 'home', 'tradition', 'patience']
    };

    const elementKeywords = keywords[element] || [];
    return elementKeywords.slice(0, 3);
  }

  /**
   * Generate powers for minor arcana
   */
  generatePowers(element, number) {
    const powers = {
      'Fire': ['Energy Activation', 'Creative Spark', 'Motivational Force', 'Leadership Aura'],
      'Water': ['Emotional Healing', 'Intuitive Guidance', 'Compassionate Action', 'Peaceful Resolution'],
      'Air': ['Clear Communication', 'Mental Clarity', 'Truth Revelation', 'Learning Enhancement'],
      'Earth': ['Material Manifestation', 'Physical Healing', 'Financial Stability', 'Grounding Energy']
    };

    return powers[element] || ['Basic Energy Manipulation'];
  }

  /**
   * Generate frequency based on element and number
   */
  generateFrequencyByElement(element, number) {
    const baseFrequencies = {
      'Fire': 432,
      'Water': 528,
      'Air': 639,
      'Earth': 741
    };

    const base = baseFrequencies[element] || 432;
    return base + (number * 10);
  }

  /**
   * Get color for element
   */
  getElementColor(element) {
    const colors = {
      'Fire': '#FF6B35',
      'Water': '#4ECDC4',
      'Air': '#45B7D1',
      'Earth': '#96CEB4'
    };

    return colors[element] || '#8B5CF6';
  }

  /**
   * Get corresponding Shem angel for a card
   */
  getCorrespondingShemAngel(card) {
    if (!this.shemData?.shem_angels) return null;

    // Find angel by frequency match or elemental correspondence
    const cardFreq = card.frequency_hz;
    const cardElement = card.element;

    let bestMatch = this.shemData.shem_angels[0];

    for (const angel of this.shemData.shem_angels) {
      // Match by frequency if available
      if (cardFreq && angel.frequency) {
        const freqDiff = Math.abs(cardFreq - angel.frequency);
        const bestFreqDiff = Math.abs(cardFreq - bestMatch.frequency);
        if (freqDiff < bestFreqDiff) {
          bestMatch = angel;
        }
      }

      // Match by element
      if (angel.element === cardElement) {
        bestMatch = angel;
        break;
      }
    }

    return bestMatch;
  }

  /**
   * Get Codex connections for a card
   */
  getCodexConnections(card) {
    if (!this.codexData) return [];

    // Find codex nodes that correspond to this card's energy or frequency
    return this.codexData
      .filter(node => {
        if (node.energy && card.frequency_hz) {
          const energyMatch = Math.abs(node.energy - (card.frequency_hz / 1000)) < 0.1;
          return energyMatch;
        }
        return false;
      })
      .slice(0, 3)
      .map(node => node.id);
  }

  /**
   * Calculate initial energy for a card
   */
  calculateInitialEnergy(card) {
    if (card.frequency_hz) {
      return Math.min(card.frequency_hz / 1000, 1.0);
    }
    return 0.5 + (Math.random() * 0.3); // 0.5-0.8 range
  }

  /**
   * Generate frequency for cards without one
   */
  generateFrequency(card) {
    const baseFreq = 432; // A4 note
    const elementMultiplier = { 'Fire': 1.0, 'Water': 1.22, 'Air': 1.5, 'Earth': 1.78 };
    const multiplier = elementMultiplier[card.element] || 1.0;

    return Math.round(baseFreq * multiplier);
  }

  /**
   * Get corresponding sphere for Tree of Life
   */
  getCorrespondingSphere(card) {
    const sphereMap = {
      0: 'Keter', 1: 'Chokmah', 2: 'Binah', 3: 'Chesed', 4: 'Geburah',
      5: 'Tiphereth', 6: 'Netzach', 7: 'Hod', 8: 'Yesod', 9: 'Malkuth'
    };

    return sphereMap[card.number] || 'Daath';
  }

  /**
   * Calculate fusion energy potential
   */
  calculateFusionEnergy(card) {
    const baseEnergy = card.frequency_hz ? card.frequency_hz / 1000 : 0.5;
    const elementBonus = { 'Fire': 0.2, 'Water': 0.15, 'Air': 0.1, 'Earth': 0.05 };
    return Math.min(baseEnergy + (elementBonus[card.element] || 0), 1.0);
  }

  /**
   * Calculate research value for experimentation
   */
  calculateResearchValue(card) {
    const rarity = card.number === 0 || card.number === 21 ? 1.0 : 0.5;
    const powerCount = card.powers?.length || 1;
    const frequency = card.frequency_hz ? card.frequency_hz / 1000 : 0.5;

    return (rarity + (powerCount * 0.1) + frequency) / 3;
  }

  /**
   * Generate binaural beat frequencies for meditation
   */
  generateBinauralBeat(card) {
    const baseFreq = card.frequency_hz || 432;
    const carrierFreq = baseFreq;
    const offsetFreq = 7.83; // Schumann resonance

    return {
      carrier: carrierFreq,
      offset: offsetFreq,
      beat: carrierFreq - offsetFreq
    };
  }

  /**
   * Generate mystical chant for the card
   */
  generateChant(card) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const consonants = ['M', 'N', 'L', 'R', 'S', 'H'];

    let chant = '';
    for (let i = 0; i < 4; i++) {
      chant += consonants[Math.floor(Math.random() * consonants.length)];
      chant += vowels[Math.floor(Math.random() * vowels.length)];
    }

    return chant.toLowerCase();
  }

  /**
   * Generate all 78 mystical nodes
   */
  async generateCompleteDataset() {
    console.log('🔮 Generating complete Circuitum99 dataset...');

    await this.loadMysticalData();

    const nodes = [];

    for (let i = 0; i < 78; i++) {
      const node = this.generateMysticalNode(null, i);
      nodes.push(node);

      if ((i + 1) % 10 === 0) {
        console.log(`✅ Generated ${i + 1}/78 mystical nodes`);
      }
    }

    return {
      metadata: {
        totalNodes: 78,
        majorArcana: 22,
        minorArcana: 56,
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        sacredRatio: 144/99
      },
      nodes: nodes,
      fusionRules: this.generateFusionRules(),
      researchProtocols: this.generateResearchProtocols()
    };
  }

  /**
   * Generate fusion rules for the system
   */
  generateFusionRules() {
    return {
      elementCompatibility: {
        'Fire': ['Fire', 'Air'],
        'Water': ['Water', 'Earth'],
        'Air': ['Air', 'Fire'],
        'Earth': ['Earth', 'Water']
      },
      successRates: {
        sameElement: 0.8,
        compatibleElement: 0.6,
        oppositeElement: 0.2,
        neutral: 0.4
      },
      energyRequirements: {
        minor: 0.3,
        major: 0.7,
        fusion: 0.9
      }
    };
  }

  /**
   * Generate research protocols
   */
  generateResearchProtocols() {
    return {
      basicFusion: {
        name: 'Basic Card Fusion',
        description: 'Combine two compatible cards to create new energy patterns',
        steps: [
          'Select two compatible cards',
          'Focus intention on fusion outcome',
          'Channel energy between cards',
          'Observe and record results'
        ],
        successCriteria: 'New energy pattern emerges',
        safetyNotes: 'Start with small energy levels'
      },
      elementalMeditation: {
        name: 'Elemental Attunement',
        description: 'Meditate with a single card to attune to its element',
        steps: [
          'Select card of desired element',
          'Play associated binaural beats',
          'Visualize card energy flowing through body',
          'Record insights and sensations'
        ],
        duration: '15-30 minutes',
        safetyNotes: 'Ground thoroughly after session'
      },
      crossElementExperiment: {
        name: 'Cross-Elemental Research',
        description: 'Study interactions between different elemental cards',
        steps: [
          'Select cards from two different elements',
          'Document initial energy states',
          'Initiate controlled interaction',
          'Monitor and record all changes'
        ],
        hypothesis: 'Compatible elements enhance each other',
        safetyNotes: 'Have grounding crystals available'
      }
    };
  }

  /**
   * Save complete dataset
   */
  async saveCompleteDataset() {
    const dataset = await this.generateCompleteDataset();

    const outputPath = path.join(this.basePath, 'data/complete-circuitum99-dataset.json');

    try {
      fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
      console.log(`✅ Complete Circuitum99 dataset saved: ${outputPath}`);
      console.log(`📊 Generated ${dataset.nodes.length} mystical nodes`);
      console.log(`🔗 ${dataset.fusionRules.elementCompatibility.Fire.length} elemental compatibilities`);
      console.log(`🔬 ${Object.keys(dataset.researchProtocols).length} research protocols`);

      return dataset;
    } catch (error) {
      console.error('❌ Failed to save dataset:', error.message);
      throw error;
    }
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new Circuitum99DataGenerator();
  generator.saveCompleteDataset().catch(console.error);
}

export default Circuitum99DataGenerator;
