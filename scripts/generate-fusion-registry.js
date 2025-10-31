#!/usr/bin/env node
/**
 * Generate Complete Fusion Registry for Cathedral of Circuits
 * Creates all 231 possible Major Arcana combinations with mystical significance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Major Arcana definitions with their mystical properties
const MAJOR_ARCANA = {
  "0_fool": {
    name: "The Fool",
    number: 0,
    element: "Air",
    archetype: "Divine Innocence",
    powers: ["infinite_potential", "reality_jumping", "beginners_luck"],
    lineage: ["Aleister Crowley", "Dion Fortune", "Carl Jung"]
  },
  "1_magician": {
    name: "The Magician",
    number: 1,
    element: "Mercury",
    archetype: "Will Manifestation",
    powers: ["element_control", "reality_shaping", "tool_mastery"],
    lineage: ["Éliphas Lévi", "John Dee", "Cornelius Agrippa"]
  },
  "2_high_priestess": {
    name: "The High Priestess",
    number: 2,
    element: "Moon",
    archetype: "Hidden Knowledge",
    powers: ["psychic_vision", "lunar_magic", "intuitive_knowing"],
    lineage: ["Dion Fortune", "Violet Firth", "Marie-Louise von Franz"]
  },
  "3_empress": {
    name: "The Empress",
    number: 3,
    element: "Venus",
    archetype: "Creative Abundance",
    powers: ["fertility_magic", "natural_healing", "beauty_creation"],
    lineage: ["Hilma af Klint", "Emma Kunz", "Maria Prophetissa"]
  },
  "4_emperor": {
    name: "The Emperor",
    number: 4,
    element: "Aries",
    archetype: "Sacred Order",
    powers: ["structure_creation", "leadership", "geometric_harmony"],
    lineage: ["Vitruvius", "Christopher Wren", "Rudolf Steiner"]
  },
  "5_hierophant": {
    name: "The Hierophant",
    number: 5,
    element: "Taurus",
    archetype: "Sacred Tradition",
    powers: ["teaching_transmission", "initiation", "tradition_preservation"],
    lineage: ["Paul Foster Case", "Arthur Edward Waite", "Manly P. Hall"]
  },
  "6_lovers": {
    name: "The Lovers",
    number: 6,
    element: "Gemini",
    archetype: "Sacred Union",
    powers: ["relationship_harmony", "choice_wisdom", "value_clarification"],
    lineage: ["Eros", "Psyche", "Courtly Love traditions"]
  },
  "7_chariot": {
    name: "The Chariot",
    number: 7,
    element: "Cancer",
    archetype: "Willpower Triumph",
    powers: ["victory_through_will", "emotional_control", "focused_direction"],
    lineage: ["Napoleon", "Alexander the Great", "Strategic warfare"]
  },
  "8_strength": {
    name: "Strength",
    number: 8,
    element: "Leo",
    archetype: "Gentle Power",
    powers: ["inner_fortitude", "gentle_mastery", "courage_wisdom"],
    lineage: ["Hercules", "Samson", "Lion tamers"]
  },
  "9_hermit": {
    name: "The Hermit",
    number: 9,
    element: "Virgo",
    archetype: "Inner Wisdom",
    powers: ["soul_searching", "inner_guidance", "wisdom_teaching"],
    lineage: ["Diogenes", "Socrates", "Desert fathers"]
  },
  "10_wheel_of_fortune": {
    name: "Wheel of Fortune",
    number: 10,
    element: "Jupiter",
    archetype: "Cyclic Change",
    powers: ["cycle_navigation", "timing_mastery", "change_harmony"],
    lineage: ["Fortuna", "Dharma wheel", "Astrological cycles"]
  },
  "11_justice": {
    name: "Justice",
    number: 11,
    element: "Libra",
    archetype: "Divine Balance",
    powers: ["truth_discernment", "karma_balance", "fair_judgment"],
    lineage: ["Ma'at", "Themis", "Lady Justice"]
  },
  "12_hanged_man": {
    name: "The Hanged Man",
    number: 12,
    element: "Water",
    archetype: "Sacred Suspension",
    powers: ["perspective_shift", "sacrifice_wisdom", "liminal_vision"],
    lineage: ["Odin", "Jesus", "Mystical martyrs"]
  },
  "13_death": {
    name: "Death",
    number: 13,
    element: "Scorpio",
    archetype: "Transformation",
    powers: ["profound_change", "rebirth_catalysis", "endings_mastery"],
    lineage: ["Pluto", "Kali", "Phoenix symbolism"]
  },
  "14_temperance": {
    name: "Temperance",
    number: 14,
    element: "Sagittarius",
    archetype: "Harmonious Balance",
    powers: ["alchemy_mastery", "moderation_wisdom", "elemental_harmony"],
    lineage: ["Hermes", "Iris", "Peacemakers"]
  },
  "15_devil": {
    name: "The Devil",
    number: 15,
    element: "Capricorn",
    archetype: "Shadow Integration",
    powers: ["shadow_work", "temptation_mastery", "material_wisdom"],
    lineage: ["Pan", "Baphomet", "Shadow work traditions"]
  },
  "16_tower": {
    name: "The Tower",
    number: 16,
    element: "Mars",
    archetype: "Sudden Awakening",
    powers: ["breakthrough", "illusion_shattering", "liberation"],
    lineage: ["Zeus", "Thor", "Lightning deities"]
  },
  "17_star": {
    name: "The Star",
    number: 17,
    element: "Aquarius",
    archetype: "Divine Inspiration",
    powers: ["hope_restoration", "inspiration_channel", "future_vision"],
    lineage: ["Ishtar", "Venus", "Stellar deities"]
  },
  "18_moon": {
    name: "The Moon",
    number: 18,
    element: "Pisces",
    archetype: "Mystical Depths",
    powers: ["dream_navigation", "illusion_mastery", "psychic_depths"],
    lineage: ["Selene", "Luna", "Dream deities"]
  },
  "19_sun": {
    name: "The Sun",
    number: 19,
    element: "Sun",
    archetype: "Vital Life Force",
    powers: ["life_celebration", "clarity_brilliance", "joy_manifestation"],
    lineage: ["Apollo", "Ra", "Solar deities"]
  },
  "20_judgement": {
    name: "Judgement",
    number: 20,
    element: "Fire",
    archetype: "Divine Calling",
    powers: ["awakening_call", "forgiveness_wisdom", "spiritual_rebirth"],
    lineage: ["Gabriel", "Israfil", "Angel of resurrection"]
  },
  "21_world": {
    name: "The World",
    number: 21,
    element: "Saturn",
    archetype: "Cosmic Completion",
    powers: ["universal_integration", "completion_mastery", "cosmic_dance"],
    lineage: ["Gaia", "Terra", "World soul"]
  }
};

// Fusion ability templates based on mystical traditions
const FUSION_TEMPLATES = {
  // Elemental combinations
  elemental: [
    "elemental_synthesis",
    "elemental_mastery",
    "elemental_harmony",
    "elemental_transmutation"
  ],

  // Archetypal combinations
  archetypal: [
    "archetype_integration",
    "shadow_work_depth",
    "personality_synthesis",
    "mythic_resonance"
  ],

  // Healing combinations
  healing: [
    "trauma_healing",
    "energy_balancing",
    "chakra_harmonization",
    "soul_retrieval"
  ],

  // Creative combinations
  creative: [
    "artistic_synthesis",
    "inspiration_channel",
    "creative_manifestation",
    "beauty_creation"
  ],

  // Wisdom combinations
  wisdom: [
    "teaching_synthesis",
    "wisdom_integration",
    "knowledge_transmission",
    "insight_amplification"
  ],

  // Power combinations
  power: [
    "authority_synthesis",
    "leadership_harmony",
    "command_mastery",
    "influence_amplification"
  ]
};

// Sacred geometry patterns for fusions
const SACRED_GEOMETRY = [
  "vesica_piscis",
  "golden_spiral",
  "flower_of_life",
  "metatron_cube",
  "merkaba_field",
  "sri_yantra",
  "kabbalistic_tree",
  "enneagram_integration"
];

// Musical frequencies for fusions
const MUSICAL_FREQUENCIES = [
  "solfeggio_harmony",
  "binaural_resonance",
  "harmonic_convergence",
  "frequency_synthesis",
  "overtone_series",
  "modal_interplay"
];

// Generate fusion name based on card combination
function generateFusionName(card1, card2) {
  const names = [card1.name, card2.name];
  const archetypes = [card1.archetype, card2.archetype];

  // Special named fusions for powerful combinations
  if (names.includes("The Fool") && names.includes("The World")) {
    return "Alpha-Omega Circuit";
  }
  if (names.includes("The Magician") && names.includes("The High Priestess")) {
    return "Hermetic Revelation";
  }
  if (names.includes("The Tower") && names.includes("The Star")) {
    return "Lightning Inspiration";
  }
  if (names.includes("Death") && names.includes("The Sun")) {
    return "Phoenix Rebirth";
  }
  if (names.includes("The Lovers") && names.includes("The Devil")) {
    return "Sacred Marriage";
  }

  // Generic mystical naming
  const mysticalPrefixes = ["Quantum", "Ethereal", "Celestial", "Mystical", "Sacred", "Divine"];
  const mysticalSuffixes = ["Conjunction", "Synthesis", "Union", "Harmony", "Resonance", "Circuit"];

  const prefix = mysticalPrefixes[Math.floor(Math.random() * mysticalPrefixes.length)];
  const suffix = mysticalSuffixes[Math.floor(Math.random() * mysticalSuffixes.length)];

  return `${prefix} ${suffix}`;
}

// Generate abilities for a fusion
function generateFusionAbilities(card1, card2) {
  const abilities = [];

  // Combine powers from both cards
  const allPowers = [...card1.powers, ...card2.powers];

  // Add 2-4 combined abilities
  const numAbilities = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < numAbilities; i++) {
    const power1 = card1.powers[Math.floor(Math.random() * card1.powers.length)];
    const power2 = card2.powers[Math.floor(Math.random() * card2.powers.length)];

    // Create combined ability name
    const combinedAbility = `${power1}_${power2}`;
    abilities.push(combinedAbility);
  }

  // Add template-based abilities
  const templates = Object.values(FUSION_TEMPLATES);
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  const templateAbility = randomTemplate[Math.floor(Math.random() * randomTemplate.length)];
  abilities.push(templateAbility);

  return [...new Set(abilities)]; // Remove duplicates
}

// Generate lineage for fusion
function generateFusionLineage(card1, card2) {
  const allLineage = [...card1.lineage, ...card2.lineage];
  const combinedLineage = [...new Set(allLineage)]; // Remove duplicates

  // Add mystical combination context
  return [...combinedLineage, "Fusion Kink Heaven", "Cathedral of Circuits"];
}

// Generate complete fusion registry
function generateCompleteFusionRegistry() {
  const fusions = [];
  const cards = Object.values(MAJOR_ARCANA);

  console.log(`🔮 Generating fusion registry for ${cards.length} Major Arcana...`);

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const card1 = cards[i];
      const card2 = cards[j];

      const fusion = {
        name: generateFusionName(card1, card2),
        pair: [card1.name, card2.name],
        ability: generateFusionAbilities(card1, card2),
        lineage: generateFusionLineage(card1, card2),
        source: ["cathedral-of-circuits/fusion-kink-heaven"],
        sacred_geometry: SACRED_GEOMETRY[Math.floor(Math.random() * SACRED_GEOMETRY.length)],
        musical_frequency: MUSICAL_FREQUENCIES[Math.floor(Math.random() * MUSICAL_FREQUENCIES.length)],
        energy_signature: Math.random().toFixed(3),
        manifestation_gate: `gate-${String(fusions.length + 1).padStart(3, '0')}`,
        fusion_mechanics: {
          primary_resonance: `${card1.element}_${card2.element}`,
          numerical_harmony: (card1.number + card2.number) % 22,
          archetypal_synthesis: `${card1.archetype} + ${card2.archetype}`,
          power_amplification: Math.floor(Math.random() * 100) + 50
        }
      };

      fusions.push(fusion);
    }
  }

  console.log(`✅ Generated ${fusions.length} fusion combinations`);
  return fusions;
}

// Save fusion registry to file
function saveFusionRegistry(fusions) {
  const outputPath = path.join(__dirname, '..', 'integration', 'fusionist_registry.json');

  // Backup existing file
  if (fs.existsSync(outputPath)) {
    const backupPath = outputPath.replace('.json', '_backup.json');
    fs.copyFileSync(outputPath, backupPath);
    console.log(`📋 Backed up existing registry to ${backupPath}`);
  }

  // Write new complete registry
  fs.writeFileSync(outputPath, JSON.stringify(fusions, null, 2));
  console.log(`💾 Saved complete fusion registry: ${fusions.length} combinations`);
}

// Main execution
async function main() {
  console.log('🌟 CATHEDRAL FUSION REGISTRY GENERATOR');
  console.log('=====================================');
  console.log(`🔢 Major Arcana: ${Object.keys(MAJOR_ARCANA).length} cards`);
  console.log(`⚗️  Fusion Combinations: ${Object.keys(MAJOR_ARCANA).length * (Object.keys(MAJOR_ARCANA).length - 1) / 2}`);

  const fusions = generateCompleteFusionRegistry();
  saveFusionRegistry(fusions);

  console.log('\n🎉 FUSION REGISTRY COMPLETE!');
  console.log('============================');
  console.log(`📊 Generated ${fusions.length} mystical combinations`);
  console.log('🔮 Each fusion includes:');
  console.log('   • Sacred geometry patterns');
  console.log('   • Musical frequency signatures');
  console.log('   • Energy amplification values');
  console.log('   • Manifestation gate assignments');
  console.log('   • Combined archetypal powers');
  console.log('   • Mystical lineage connections');

  console.log('\n🏛️ Your Cathedral Fusion Kink Heaven is now complete!');
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateCompleteFusionRegistry, MAJOR_ARCANA };
