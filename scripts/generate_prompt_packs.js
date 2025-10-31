#!/usr/bin/env node

/**
 * Generate Prompt Packs for 99-Node System
 * Creates deterministic prompt JSON files for AI art generation
 */

const fs = require('fs');
const path = require('path');

function generatePromptPack(nodeData) {
  const basePrompt = `Atelier-level symmetric mandala/portal of ${nodeData.name} (${nodeData.card}), no words. Palette: ${nodeData.palette.join(',')}. Symmetry: rotational ${nodeData.symmetry}. Numerology core: ${nodeData.numerology.core}. Vintage gem ornaments: ${nodeData.gem_style.ornament}, density ${nodeData.gem_style.density}, metal setting ${nodeData.gem_style.metal_setting}, subtle wear ${nodeData.gem_style.wear}. Opalescent iridescence: microfacet ${nodeData.opal_params.microfacet_scale}, sheen shift ${nodeData.opal_params.sheen_color_shift}, strength ${nodeData.opal_params.iridescence_strength}. Style: Hilma af Klint × Andrew Gonzalez, visionary painterly brushwork, fractal overlays, fine film grain, ultra-detail. Seed:${nodeData.seed}. Size:1024x1024`;

  return {
    id: `pack-${nodeData.gate_index.toString().padStart(3, '0')}`,
    title: `${nodeData.name} — ${nodeData.card}`,
    node_id: nodeData.id,
    gate_index: nodeData.gate_index,
    mode: nodeData.family === 'building' ? 'tilepack' : 'image',
    seed: nodeData.seed,
    width: 1024,
    height: 1024,
    steps: 28,
    palette: nodeData.palette,
    symmetry: nodeData.symmetry,
    numerology: nodeData.numerology,
    gem_style: nodeData.gem_style,
    opal_params: nodeData.opal_params,
    style_lora: nodeData.style.lora,
    prompt: basePrompt
  };
}

function generateTilepackPrompt(nodeData) {
  const basePrompt = `Tilepack mode, no words. Radial modular tiles for ${nodeData.name} (${nodeData.card}), palette: ${nodeData.palette.join(',')}. Symmetry: ${nodeData.symmetry}. Numerology core: ${nodeData.numerology.core}. Surface details: etched sigils, opalescent inlays, vintage gem insets ${nodeData.gem_style.ornament} density ${nodeData.gem_style.density}, metal trims ${nodeData.gem_style.metal_setting}. Return: tiles array + assembly_plan + segmentation_masks + dominant_colors. Seed:${nodeData.seed}`;

  return {
    id: `pack-${nodeData.gate_index.toString().padStart(3, '0')}`,
    title: `${nodeData.name} — ${nodeData.card} Tilepack`,
    node_id: nodeData.id,
    gate_index: nodeData.gate_index,
    mode: 'tilepack',
    seed: nodeData.seed,
    tile_size: 256,
    grid: 4,
    steps: 26,
    palette: nodeData.palette,
    symmetry: nodeData.symmetry,
    numerology: nodeData.numerology,
    gem_style: nodeData.gem_style,
    opal_params: nodeData.opal_params,
    style_lora: nodeData.style.lora,
    prompt: basePrompt
  };
}

function generateFusionPrompt(nodeA, nodeB, timestamp) {
  // Use deterministic merge rules
  const seedA = nodeA.seed;
  const seedB = nodeB.seed;
  const seed = parseInt(`${seedA}${seedB}`.slice(-8));

  const palette = nodeA.palette.slice(0, 2).concat(nodeB.palette.slice(0, 2));
  const symmetry = Math.max(nodeA.symmetry, nodeB.symmetry);
  const core = ((nodeA.numerology.core + nodeB.numerology.core) % 9) || 9;

  const basePrompt = `Tilepack mode, no words. Fusion of ${nodeA.name} + ${nodeB.name}: hybrid radial tile set, palette blended, symmetry ${symmetry}, numerology core ${core}; opalescent vintage-cut-opal insets, antique gold trims, fractal overlay. Return tiles + assembly_plan. Seed:${seed}`;

  return {
    id: `fusion-${seedA}${seedB}`,
    title: `Fusion: ${nodeA.card} + ${nodeB.card}`,
    node_id: `fusion-${nodeA.id}-${nodeB.id}`,
    mode: 'tilepack',
    seed: seed,
    tile_size: 256,
    grid: 4,
    steps: 30,
    palette: palette,
    symmetry: symmetry,
    numerology: { core: core, path: ((nodeA.numerology.path + nodeB.numerology.path) % 9) || 9 },
    gem_style: {
      ornament: "vintage-cut-opal",
      density: (nodeA.gem_style.density + nodeB.gem_style.density) / 2,
      metal_setting: "antique_gold",
      palette_bias: ["#E6F7FF", "#D8C8FF"],
      wear: (nodeA.gem_style.wear + nodeB.gem_style.wear) / 2
    },
    opal_params: {
      iridescence_strength: (nodeA.opal_params.iridescence_strength + nodeB.opal_params.iridescence_strength) / 2,
      microfacet_scale: (nodeA.opal_params.microfacet_scale + nodeB.opal_params.microfacet_scale) / 2,
      sheen_color_shift: (nodeA.opal_params.sheen_color_shift + nodeB.opal_params.sheen_color_shift) / 2
    },
    style_lora: "luxcrux_atelier_v1",
    prompt: basePrompt
  };
}

function main() {
  try {
    // Load the 99 nodes data
    const nodesData = JSON.parse(fs.readFileSync('data/codex_nodes_99.json', 'utf8'));

    // Create prompts directory
    const promptsDir = 'prompt_packs';
    if (!fs.existsSync(promptsDir)) {
      fs.mkdirSync(promptsDir, { recursive: true });
    }

    console.log(`🏛️ Generating prompt packs for ${nodesData.length} nodes...`);

    // Generate individual node prompts
    nodesData.forEach(node => {
      let promptPack;

      if (node.family === 'building') {
        promptPack = generateTilepackPrompt(node);
      } else {
        promptPack = generatePromptPack(node);
      }

      const filename = `${promptPack.id}.json`;
      fs.writeFileSync(
        path.join(promptsDir, filename),
        JSON.stringify(promptPack, null, 2)
      );

      console.log(`Generated: ${filename}`);
    });

    // Generate fusion examples
    const fusionsDir = path.join(promptsDir, 'fusions');
    if (!fs.existsSync(fusionsDir)) {
      fs.mkdirSync(fusionsDir, { recursive: true });
    }

    // Create some fusion examples
    const fusionExamples = [
      [nodesData[0], nodesData[6]], // gate-001 + gate-007
      [nodesData[3], nodesData[4]], // gate-004 + gate-005
      [nodesData[12], nodesData[18]] // gate-013 + gate-019
    ];

    fusionExamples.forEach(([nodeA, nodeB], index) => {
      const fusionPrompt = generateFusionPrompt(nodeA, nodeB, new Date().toISOString());

      const filename = `fusion-${index + 1}.json`;
      fs.writeFileSync(
        path.join(fusionsDir, filename),
        JSON.stringify(fusionPrompt, null, 2)
      );

      console.log(`Generated fusion: ${filename}`);
    });

    console.log(`✨ Generated ${nodesData.length} node prompts + ${fusionExamples.length} fusion examples`);
    console.log(`📁 Prompt packs saved to: ${promptsDir}/`);
    console.log(`🔗 Ready for: Ellyn3, AUTOMATIC1111, web-SD, or local microservice`);

  } catch (error) {
    console.error('Error generating prompt packs:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generatePromptPack,
  generateTilepackPrompt,
  generateFusionPrompt
};
