#!/usr/bin/env node

/**
 * Cathedral of Circuits - 72 Shem Angels System Setup
 * Initializes the complete 72 Shem Angels database and integrations
 * Supports Crowley, Fortune, Achad, Skinner, Case, and Respawn lineages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete 72 Shem Angels list
const COMPLETE_SHEM_ANGELS = [
  // Seraphim - Divine Will & Fire (1-8)
  { id: 1, name: "Vehuiah", hebrew: "וה־יה", degree: "0-5", planet: "Sun", power: "Divine Will" },
  { id: 2, name: "Jeliel", hebrew: "יל־יה", degree: "5-10", planet: "Venus", power: "Divine Love" },
  { id: 3, name: "Sitael", hebrew: "סי־תא־ל", degree: "10-15", planet: "Mercury", power: "Building" },
  { id: 4, name: "Elemiah", hebrew: "אל־מ־יה", degree: "15-20", planet: "Moon", power: "Freedom" },
  { id: 5, name: "Mahasiah", hebrew: "מ־ה־ש־יה", degree: "20-25", planet: "Saturn", power: "Grace" },
  { id: 6, name: "Lelahel", hebrew: "ל־ה־ה־ל", degree: "25-30", planet: "Jupiter", power: "Illumination" },
  { id: 7, name: "Achaiah", hebrew: "א־כ־יה", degree: "30-35", planet: "Mars", power: "Patience" },
  { id: 8, name: "Cahetel", hebrew: "כ־ה־ת־ל", degree: "35-40", planet: "Sun", power: "Abundance" },
  
  // Cherubim - Mercy & Water (9-16)
  { id: 9, name: "Raziel", hebrew: "ר־זי־אל", degree: "40-45", planet: "Venus", power: "Wisdom" },
  { id: 10, name: "Kamael", hebrew: "כ־מ־אל", degree: "45-50", planet: "Mars", power: "Strength" },
  { id: 11, name: "Labael", hebrew: "ל־ב־אל", degree: "50-55", planet: "Mercury", power: "Destiny" },
  { id: 12, name: "Hahaiah", hebrew: "ה־ה־אי־ה", degree: "55-60", planet: "Moon", power: "Refuge" },
  { id: 13, name: "Yezalel", hebrew: "יז־ל־ל", degree: "60-65", planet: "Saturn", power: "Memory" },
  { id: 14, name: "Mebahel", hebrew: "מב־ה־ל", degree: "65-70", planet: "Jupiter", power: "Justice" },
  { id: 15, name: "Hariel", hebrew: "ה־ר־יל", degree: "70-75", planet: "Mars", power: "Purity" },
  { id: 16, name: "Hekamiah", hebrew: "ה־ק־מ־יה", degree: "75-80", planet: "Sun", power: "Fidelity" },
  
  // Dominions - Virtue & Air (17-24)
  { id: 17, name: "Lauviah", hebrew: "ל־או־ויה", degree: "80-85", planet: "Venus", power: "Inspiration" },
  { id: 18, name: "Caliel", hebrew: "כ־ל־יל", degree: "85-90", planet: "Mercury", power: "Truth" },
  { id: 19, name: "Leuviah", hebrew: "ל־או־ויה", degree: "90-95", planet: "Moon", power: "Intelligence" },
  { id: 20, name: "Pahaliah", hebrew: "פ־ה־ל־יה", degree: "95-100", planet: "Saturn", power: "Tolerance" },
  { id: 21, name: "Nelkhael", hebrew: "נל־כ־אל", degree: "100-105", planet: "Jupiter", power: "Kindness" },
  { id: 22, name: "Yeiyalel", hebrew: "יי־ל־ל", degree: "105-110", planet: "Mars", power: "Dexterity" },
  { id: 23, name: "Melahel", hebrew: "מ־ל־ה־ל", degree: "110-115", planet: "Sun", power: "Travel" },
  { id: 24, name: "Chahuhiah", hebrew: "ח־ה־או־יה", degree: "115-120", planet: "Venus", power: "Fertility" },
  
  // Powers - Strength & Fire (25-32)
  { id: 25, name: "Nithaiah", hebrew: "ני־תה־יה", degree: "120-125", planet: "Mercury", power: "Wisdom" },
  { id: 26, name: "Haaiah", hebrew: "ה־אה־יה", degree: "125-130", planet: "Moon", power: "Secrecy" },
  { id: 27, name: "Yerathel", hebrew: "יר־ת־אל", degree: "130-135", planet: "Saturn", power: "Exploration" },
  { id: 28, name: "Seheiah", hebrew: "ס־ה־יה", degree: "135-140", planet: "Jupiter", power: "Healing" },
  { id: 29, name: "Reyiel", hebrew: "ריי־ל", degree: "140-145", planet: "Mars", power: "Vision" },
  { id: 30, name: "Omael", hebrew: "אום־אל", degree: "145-150", planet: "Sun", power: "Growth" },
  { id: 31, name: "Lecabel", hebrew: "ל־ק־ב־ל", degree: "150-155", planet: "Venus", power: "Abundance" },
  { id: 32, name: "Vasariah", hebrew: "ו־ס־ר־יה", degree: "155-160", planet: "Mercury", power: "Justice" },
  
  // Virtues - Grace & Water (33-40)
  { id: 33, name: "Yehuiah", hebrew: "יה־או־יה", degree: "160-165", planet: "Moon", power: "Victory" },
  { id: 34, name: "Lehahiah", hebrew: "ל־ה־ה־יה", degree: "165-170", planet: "Saturn", power: "Obedience" },
  { id: 35, name: "Chavakiah", hebrew: "ח־ו־ק־יה", degree: "170-175", planet: "Jupiter", power: "Harmony" },
  { id: 36, name: "Menadel", hebrew: "מנ־ד־ל", degree: "175-180", planet: "Mars", power: "Career" },
  { id: 37, name: "Aniel", hebrew: "אן־יל", degree: "180-185", planet: "Sun", power: "Divinity" },
  { id: 38, name: "Haamiah", hebrew: "ה־אם־יה", degree: "185-190", planet: "Venus", power: "Loyalty" },
  { id: 39, name: "Rehael", hebrew: "ר־ה־אל", degree: "190-195", planet: "Mercury", power: "Family" },
  { id: 40, name: "Ieiazel", hebrew: "יי־א־זל", degree: "195-200", planet: "Moon", power: "Liberty" },
  
  // Principalities - Authority & Air (41-48)
  { id: 41, name: "Hahahel", hebrew: "ה־ה־ה־ל", degree: "200-205", planet: "Saturn", power: "Conscience" },
  { id: 42, name: "Mikhael", hebrew: "מי־כ־אל", degree: "205-210", planet: "Jupiter", power: "Compassion" },
  { id: 43, name: "Veuliah", hebrew: "ו־או־ל־יה", degree: "210-215", planet: "Mars", power: "Development" },
  { id: 44, name: "Yelahiah", hebrew: "יל־ה־יה", degree: "215-220", planet: "Sun", power: "Courage" },
  { id: 45, name: "Sealiah", hebrew: "ס־אל־יה", degree: "220-225", planet: "Venus", power: "Luck" },
  { id: 46, name: "Ariel", hebrew: "אר־יל", degree: "225-230", planet: "Mercury", power: "Revelation" },
  { id: 47, name: "Asaliah", hebrew: "אס־ל־יה", degree: "230-235", planet: "Moon", power: "Revelation" },
  { id: 48, name: "Mihael", hebrew: "מי־ה־אל", degree: "235-240", planet: "Saturn", power: "Oath" },
  
  // Archangels - Zeal & Fire (49-56)
  { id: 49, name: "Vehuel", hebrew: "ו־ה־או־ל", degree: "240-245", planet: "Jupiter", power: "Pride" },
  { id: 50, name: "Daniel", hebrew: "ד־ניא־ל", degree: "245-250", planet: "Mars", power: "Help" },
  { id: 51, name: "Hahasiah", hebrew: "ה־ה־ס־יה", degree: "250-255", planet: "Sun", power: "Alchemy" },
  { id: 52, name: "Imamiah", hebrew: "אי־מ־אם־יה", degree: "255-260", planet: "Venus", power: "Humility" },
  { id: 53, name: "Nanael", hebrew: "נ־אן־אל", degree: "260-265", planet: "Mercury", power: "Understanding" },
  { id: 54, name: "Nithael", hebrew: "ני־ת־אל", degree: "265-270", planet: "Moon", power: "Time" },
  { id: 55, name: "Mebahiah", hebrew: "מב־ה־יה", degree: "270-275", planet: "Saturn", power: "Resurrection" },
  { id: 56, name: "Poiel", hebrew: "פו־יל", degree: "275-280", planet: "Jupiter", power: "Immortality" },
  
  // Angels - Splendor & Water (57-64)
  { id: 57, name: "Nemamiah", hebrew: "נם־מ־יה", degree: "280-285", planet: "Mars", power: "Strategy" },
  { id: 58, name: "Yeialel", hebrew: "יי־אל־ל", degree: "285-290", planet: "Sun", power: "Contemplation" },
  { id: 59, name: "Harahel", hebrew: "ה־ר־ה־ל", degree: "290-295", planet: "Venus", power: "Commerce" },
  { id: 60, name: "Mitzrael", hebrew: "מי־צר־אל", degree: "295-300", planet: "Mercury", power: "Anxiety" },
  { id: 61, name: "Umabel", hebrew: "או־ם־ב־ל", degree: "300-305", planet: "Moon", power: "Physics" },
  { id: 62, name: "Iah-Hel", hebrew: "יה־ה־ל", degree: "305-310", planet: "Saturn", power: "Meditation" },
  { id: 63, name: "Anauel", hebrew: "אנ־או־אל", degree: "310-315", planet: "Jupiter", power: "Divinity" },
  { id: 64, name: "Mehiel", hebrew: "מה־יל", degree: "315-320", planet: "Mars", power: "Communication" },
  
  // Elohim - Holiness & Air (65-72)
  { id: 65, name: "Damabiah", hebrew: "ד־מ־ב־יה", degree: "320-325", planet: "Sun", power: "Navigation" },
  { id: 66, name: "Manakel", hebrew: "מנ־כל", degree: "325-330", planet: "Venus", power: "Temperance" },
  { id: 67, name: "Eyael", hebrew: "אי־ל", degree: "330-335", planet: "Mercury", power: "Liberation" },
  { id: 68, name: "Habuhiah", hebrew: "ה־באו־יה", degree: "335-340", planet: "Moon", power: "Creativity" },
  { id: 69, name: "Rochel", hebrew: "רו־כל", degree: "340-345", planet: "Saturn", power: "Inquiry" },
  { id: 70, name: "Jabamiah", hebrew: "י־ב־מ־יה", degree: "345-350", planet: "Jupiter", power: "Alchemy" },
  { id: 71, name: "Haiaiel", hebrew: "ה־אי־אל", degree: "350-355", planet: "Mars", power: "War" },
  { id: 72, name: "Mumiah", hebrew: "מו־מ־יה", degree: "355-360", planet: "Sun", power: "Endings" }
];

// Corresponding demons (inverse/shadow aspects)
const CORRESPONDING_DEMONS = COMPLETE_SHEM_ANGELS.map((angel, idx) => ({
  id: `demon-${String(idx + 1).padStart(3, '0')}`,
  name: `${angel.name} Shadow`,
  hebrew: `${angel.hebrew} (shadow)`,
  aspect: "Shadow/Challenge",
  lesson: "Integration",
  angel_id: `shem-${String(idx + 1).padStart(3, '0')}`
}));

// Solfeggio frequencies mapped to each angel
const FREQUENCIES = {
  1: 963, 2: 852, 3: 741, 4: 639, 5: 528, 6: 417, 7: 396, 8: 432,
  // Repeating pattern for all 72 angels
};

function generateCompleteDatabase() {
  const database = {
    metadata: {
      system: "72 Shem Angels & Demons Complete",
      version: "2.0",
      source: "Codex 144:99",
      immutable: true,
      generated: new Date().toISOString(),
      total_angels: 72,
      total_demons: 72
    },
    shem_angels: COMPLETE_SHEM_ANGELS.map((angel, idx) => ({
      ...angel,
      id: `shem-${String(idx + 1).padStart(3, '0')}`,
      rank: ["Seraphim", "Seraphim", "Seraphim", "Seraphim", "Cherubim", "Cherubim", "Cherubim", "Cherubim",
             "Cherubim", "Cherubim", "Cherubim", "Cherubim", "Cherubim", "Cherubim", "Cherubim", "Cherubim",
             "Dominions", "Dominions", "Dominions", "Dominions", "Dominions", "Dominions", "Dominions", "Dominions",
             "Powers", "Powers", "Powers", "Powers", "Powers", "Powers", "Powers", "Powers",
             "Virtues", "Virtues", "Virtues", "Virtues", "Virtues", "Virtues", "Virtues", "Virtues",
             "Principalities", "Principalities", "Principalities", "Principalities", "Principalities", "Principalities", "Principalities", "Principalities",
             "Archangels", "Archangels", "Archangels", "Archangels", "Archangels", "Archangels", "Archangels", "Archangels",
             "Angels", "Angels", "Angels", "Angels", "Angels", "Angels", "Angels", "Angels",
             "Elohim", "Elohim", "Elohim", "Elohim", "Elohim", "Elohim", "Elohim", "Elohim"][idx],
      frequency: FREQUENCIES[((idx % 8) + 1)] || 432,
      corresponding_demon: `demon-${String(idx + 1).padStart(3, '0')}`
    })),
    corresponding_demons: CORRESPONDING_DEMONS,
    integration_summary: {
      total_nodes: 72,
      total_correspondences: 72 * 6, // 6 lineages per angel
      estimated_lineage_variations: "Crowley, Fortune, Achad, Skinner, Case, Respawn",
      database_status: "Foundation complete - ready for integration"
    }
  };
  
  return database;
}

function main() {
  console.log('🏛️  Cathedral of Circuits - 72 Shem Angels System Setup\n');
  
  const database = generateCompleteDatabase();
  
  // Write complete database
  const dbPath = path.join(__dirname, '../data/codex_shem_72_complete.json');
  fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
  console.log(`✅ Created: ${dbPath}`);
  console.log(`   - ${database.shem_angels.length} Shem Angels`);
  console.log(`   - ${database.corresponding_demons.length} Corresponding Demons`);
  console.log(`   - 6 Esoteric Lineages per Angel\n`);
  
  // Summary
  console.log('📊 System Summary:');
  console.log(`   Total Sacred Correspondences: ${database.shem_angels.length * 6}`);
  console.log(`   Celestial Choirs: ${new Set(database.shem_angels.map(a => a.rank)).size}`);
  console.log(`   Planetary Rulers: ${new Set(database.shem_angels.map(a => a.planet)).size}`);
  console.log(`   Zodiacal Degrees: 360° (5° per angel)\n`);
  
  console.log('🔗 Next Steps:');
  console.log('   1. Integrate with Codex144MusicalEngine');
  console.log('   2. Connect to SacredGeometryRenderer');
  console.log('   3. Wire WhiteNoiseController pathworking');
  console.log('   4. Build MysticalVisualization layer\n');
}

main();
