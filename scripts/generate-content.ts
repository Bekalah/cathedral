#!/usr/bin/env node
/**
 * Content Generation Tool
 * 
 * Generates content using Cathedral systems:
 * - Art descriptions from Codex 144:99
 * - Tarot readings
 * - Fusion combinations
 * - Sacred geometry patterns
 */

import { CodexLibrary } from '../packages/codex-144-99/src/index.js';
import { LiberArcanae } from '../packages/liber-arcanae/src/index.js';
import { calculateFusion, generateSacredGeometry } from '../packages/cathedral-tools/src/index.js';

async function generateArtDescription(nodeId: number): Promise<string> {
  const codex = new CodexLibrary();
  const node = codex.getNode(nodeId);
  
  if (!node) {
    throw new Error(`Node ${nodeId} not found`);
  }

  const description = `
🎨 Art Description: ${node.name}

Element: ${node.element}
Color: ${node.color}
Geometry: ${node.geometry}
Pigment: ${node.pigment}

Theme: ${node.narrative?.theme || 'N/A'}
Archetype: ${node.narrative?.archetype || 'N/A'}

Story Beats:
${node.narrative?.storyBeats?.map(beat => `  • ${beat}`).join('\n') || 'N/A'}

Architecture:
  Spatial Quality: ${node.architecture?.spatialQuality || 'N/A'}
  Room Type: ${node.architecture?.roomType || 'N/A'}
  Lighting: ${node.architecture?.lighting || 'N/A'}
  Materials: ${node.architecture?.materials?.join(', ') || 'N/A'}

Symbolism:
  Primary Symbol: ${node.symbolism?.primarySymbol || 'N/A'}
  Pattern: ${node.symbolism?.geometricPattern || 'N/A'}
`;

  return description;
}

async function generateTarotReading(spread: 'single' | 'three' | 'celtic' = 'three'): Promise<string> {
  const liber = new LiberArcanae();
  const cards = liber.drawCards(spread === 'single' ? 1 : spread === 'celtic' ? 10 : 3);
  
  let reading = `🔮 ${spread.charAt(0).toUpperCase() + spread.slice(1)} Card Reading\n\n`;
  
  cards.forEach((card, index) => {
    reading += `${index + 1}. ${card.name}\n`;
    reading += `   ${card.meaning || 'No meaning available'}\n\n`;
  });
  
  return reading;
}

async function generateFusionCombination(nodeA: number, nodeB: number): Promise<string> {
  const fusion = calculateFusion(nodeA, nodeB);
  
  return `
🌌 Fusion Kink: ${fusion.result}

Sacred Ratio: ${fusion.ratio.toFixed(6)}
Harmony: ${(fusion.harmony * 100).toFixed(0)}%

${fusion.description}
`;
}

async function generateSacredGeometryPattern(type: 'flower' | 'star' | 'spiral' | 'lattice'): Promise<string> {
  const pattern = generateSacredGeometry(type);
  
  return `
✨ Sacred Geometry: ${type}

Points: ${pattern.length}
Pattern Data:
${JSON.stringify(pattern.slice(0, 10), null, 2)}${pattern.length > 10 ? '\n...' : ''}
`;
}

// CLI interface
const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  try {
    switch (command) {
      case 'art':
        const nodeId = parseInt(args[0] || '1');
        console.log(await generateArtDescription(nodeId));
        break;
        
      case 'tarot':
        const spread = (args[0] as 'single' | 'three' | 'celtic') || 'three';
        console.log(await generateTarotReading(spread));
        break;
        
      case 'fusion':
        const nodeA = parseInt(args[0] || '1');
        const nodeB = parseInt(args[1] || '2');
        console.log(await generateFusionCombination(nodeA, nodeB));
        break;
        
      case 'geometry':
        const type = (args[0] as 'flower' | 'star' | 'spiral' | 'lattice') || 'spiral';
        console.log(await generateSacredGeometryPattern(type));
        break;
        
      default:
        console.log(`
🏛️  Cathedral Content Generator

Usage:
  node generate-content.ts art [nodeId]          Generate art description
  node generate-content.ts tarot [spread]       Generate tarot reading
  node generate-content.ts fusion [nodeA] [nodeB] Generate fusion
  node generate-content.ts geometry [type]      Generate sacred geometry
        `);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

