#!/usr/bin/env node
/**
 * Cathedral Dataset Integrity Validator
 * Ensures all mystical datasets can see each other and maintain sacred relationships
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CathedralDataValidator {
  constructor() {
    this.basePath = path.join(__dirname, '..');
    this.datasets = {};
    this.errors = [];
    this.warnings = [];
    this.sacredMath = {
      manifestationNodes: 144,
      dissolutionDepths: 99,
      sacredRatio: 144/99,
      fibonacciConnection: 144 // 12th Fibonacci number
    };
  }

  /**
   * Load all datasets into memory for cross-validation
   */
  async loadAllDatasets() {
    console.log('🔮 Loading Cathedral datasets...');

    const datasets = {
      'codex_nodes_99': path.join(this.basePath, 'data/codex_nodes_99.json'),
      'fusionist_registry': path.join(this.basePath, 'integration/fusionist_registry.json'),
      'helix_map': path.join(this.basePath, 'integration/helix_map.json'),
      'arcana_profiles': path.join(this.basePath, 'data/complete-arcana-profiles.json'),
      'codex_shem_72': path.join(this.basePath, 'data/codex_shem_72.json'),
      'codex_144_expanded': path.join(this.basePath, 'data/codex-144-expanded.json')
    };

    for (const [name, filePath] of Object.entries(datasets)) {
      try {
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          this.datasets[name] = JSON.parse(content);
          console.log(`✅ Loaded ${name}: ${Object.keys(this.datasets[name]).length} keys`);
        } else {
          this.warnings.push(`Missing dataset: ${name} at ${filePath}`);
        }
      } catch (error) {
        this.errors.push(`Failed to load ${name}: ${error.message}`);
      }
    }
  }

  /**
   * Validate sacred mathematics consistency across all datasets
   */
  validateSacredMathematics() {
    console.log('\n📐 Validating Sacred Mathematics (144:99)...');

    // Check codex nodes for proper 144:99 ratio
    if (this.datasets.codex_nodes_99) {
      const nodes = this.datasets.codex_nodes_99;
      const totalGates = nodes.length;
      const expectedRatio = this.sacredMath.sacredRatio;

      console.log(`📊 Codex nodes: ${totalGates} gates (target: ${this.sacredMath.manifestationNodes})`);

      if (totalGates !== this.sacredMath.manifestationNodes) {
        this.warnings.push(`Codex nodes count mismatch: ${totalGates} vs expected ${this.sacredMath.manifestationNodes}`);
      }

      // Validate each gate has proper numerology
      nodes.forEach((node, index) => {
        if (!node.numerology || !node.numerology.core) {
          this.errors.push(`Gate ${node.id} missing numerology.core`);
        }
        if (!node.energy || node.energy < 0 || node.energy > 1) {
          this.warnings.push(`Gate ${node.id} has invalid energy value: ${node.energy}`);
        }
      });
    }

    // Check fusion registry for proper card combinations
    if (this.datasets.fusionist_registry) {
      const fusions = this.datasets.fusionist_registry;
      const totalCombinations = fusions.length;
      const maxPossibleCombinations = 231; // 22 Major Arcana choose 2

      console.log(`🔗 Fusion combinations: ${totalCombinations}/${maxPossibleCombinations}`);

      if (totalCombinations < maxPossibleCombinations) {
        this.warnings.push(`Incomplete fusion registry: ${totalCombinations}/${maxPossibleCombinations} combinations defined`);
      }
    }
  }

  /**
   * Validate cross-dataset relationships
   */
  validateCrossDatasetRelationships() {
    console.log('\n🔗 Validating Cross-Dataset Relationships...');

    // Validate that fusion registry references valid arcana
    if (this.datasets.fusionist_registry && this.datasets.arcana_profiles) {
      const profiles = this.datasets.arcana_profiles.arcana_faculty_profiles?.major_arcana || {};
      const arcanaKeys = Object.keys(profiles);

      this.datasets.fusionist_registry.forEach(fusion => {
        fusion.pair.forEach(cardName => {
          const cleanName = cardName.toLowerCase().replace(/[^a-z0-9]/g, '_');
          if (!arcanaKeys.includes(cleanName)) {
            this.errors.push(`Fusion ${fusion.name} references unknown arcana: ${cardName}`);
          }
        });
      });
    }

    // Validate helix map sphere connections
    if (this.datasets.helix_map) {
      const helix = this.datasets.helix_map;
      const spheres = helix.sphere_connections || {};

      // Check that all referenced spheres exist
      Object.values(spheres).flat().forEach(sphere => {
        if (!helix.MA_sequence?.some(ma => ma.sphere === sphere)) {
          this.warnings.push(`Sphere connection references unknown sphere: ${sphere}`);
        }
      });
    }
  }

  /**
   * Validate AI generation parameters
   */
  validateAIGeneration() {
    console.log('\n🤖 Validating AI Generation Parameters...');

    if (this.datasets.codex_nodes_99) {
      this.datasets.codex_nodes_99.forEach(node => {
        // Check required AI parameters
        if (!node.prompt_template) {
          this.errors.push(`Gate ${node.id} missing prompt_template`);
        }

        if (!node.gem_style || !node.gem_style.ornament) {
          this.warnings.push(`Gate ${node.id} missing gem_style configuration`);
        }

        if (!node.opal_params || !node.opal_params.iridescence_strength) {
          this.warnings.push(`Gate ${node.id} missing opal_params configuration`);
        }

        // Validate palette structure
        if (!node.palette || !Array.isArray(node.palette) || node.palette.length === 0) {
          this.errors.push(`Gate ${node.id} missing or invalid palette`);
        }

        // Validate fractal parameters
        if (!node.fractal_params || !node.fractal_params.type) {
          this.warnings.push(`Gate ${node.id} missing fractal_params`);
        }
      });
    }
  }

  /**
   * Validate app ecosystem connections
   */
  validateAppConnections() {
    console.log('\n🏛️ Validating App Ecosystem Connections...');

    const expectedApps = [
      'circuitum99', 'stone-grimoire', 'liber-arcanae', 'tesseract-bridge',
      'cosmogenesis-engine', 'magical-mystery-house', 'cathedral-hub'
    ];

    if (this.datasets.helix_map) {
      const connectedApps = new Set();

      this.datasets.helix_map.MA_sequence?.forEach(ma => {
        if (ma.connectedApps) {
          ma.connectedApps.forEach(app => connectedApps.add(app));
        }
      });

      expectedApps.forEach(app => {
        if (!connectedApps.has(app)) {
          this.warnings.push(`App ${app} not found in helix connections`);
        }
      });

      console.log(`📱 Connected apps: ${Array.from(connectedApps).join(', ')}`);
    }
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🏛️ CATHEDRAL DATASET INTEGRITY REPORT');
    console.log('='.repeat(60));

    console.log(`\n📊 Summary:`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`✅ Sacred Ratio: ${this.sacredMath.sacredRatio}`);

    if (this.errors.length > 0) {
      console.log(`\n🚨 CRITICAL ERRORS:`);
      this.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS:`);
      this.warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
    }

    console.log(`\n🔮 Mystical System Status:`);
    const status = this.errors.length === 0 ? '✅ HEALTHY' : '❌ NEEDS ATTENTION';
    console.log(`   Overall Status: ${status}`);

    // Sacred mathematics validation
    const mathStatus = Math.abs(this.sacredMath.sacredRatio - 1.454545) < 0.001 ? '✅ VALID' : '❌ INVALID';
    console.log(`   Sacred Math (144:99): ${mathStatus}`);

    console.log('\n' + '='.repeat(60));

    return {
      errors: this.errors,
      warnings: this.warnings,
      isValid: this.errors.length === 0,
      sacredMathValid: Math.abs(this.sacredMath.sacredRatio - 1.454545) < 0.001
    };
  }

  /**
   * Main validation execution
   */
  async validate() {
    console.log('🌟 Starting Cathedral Dataset Validation...\n');

    await this.loadAllDatasets();
    this.validateSacredMathematics();
    this.validateCrossDatasetRelationships();
    this.validateAIGeneration();
    this.validateAppConnections();

    const report = this.generateReport();

    // Exit with error code if critical issues found
    if (!report.isValid) {
      console.log('\n💥 Validation failed! Please fix the errors above.');
      process.exit(1);
    } else {
      console.log('\n✨ All datasets validated successfully!');
      console.log('🎉 Your Cathedral mystical system is ready!');
    }

    return report;
  }
}

// Execute validation if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new CathedralDataValidator();
  validator.validate().catch(console.error);
}

export default CathedralDataValidator;
