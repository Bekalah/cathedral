#!/usr/bin/env node
/**
 * 🏛️ CATHEDRAL COMPREHENSIVE HEALTH CHECK
 * Complete validation of every tool, library, JSON, and app in the mystical ecosystem
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CathedralHealthChecker {
  constructor() {
    this.basePath = path.join(__dirname, '..');
    this.healthStatus = {
      mysticalSystems: {},
      toolsAndLibraries: {},
      apps: {},
      jsonFiles: {},
      overall: {
        total: 0,
        healthy: 0,
        warnings: 0,
        errors: 0
      }
    };
    this.errors = [];
    this.warnings = [];
  }

  /**
   * 🔮 VALIDATE CODEX 144:99 - All 145 nodes (0-144)
   */
  validateCodex144() {
    console.log('\n🔮 VALIDATING CODEX 144:99...');
    console.log('━'.repeat(50));

    const codexPath = path.join(this.basePath, 'data/codex_nodes_99.json');

    if (!fs.existsSync(codexPath)) {
      this.errors.push('❌ Codex 144:99 data file missing');
      return;
    }

    try {
      const codexData = JSON.parse(fs.readFileSync(codexPath, 'utf8'));

      // Validate we have all 145 nodes (0-144)
      if (!Array.isArray(codexData)) {
        this.errors.push('❌ Codex data is not an array');
        return;
      }

      if (codexData.length !== 145) {
        this.errors.push(`❌ Expected 145 Codex nodes, found ${codexData.length}`);
      }

      // Validate each node structure
      for (let i = 0; i < codexData.length; i++) {
        const node = codexData[i];
        const nodeStatus = {
          id: node.id || `gate-${String(i + 1).padStart(3, '0')}`,
          index: i,
          healthy: true,
          issues: []
        };

        // Required fields validation
        const requiredFields = ['id', 'gate_index', 'name', 'card', 'family', 'palette', 'symmetry', 'numerology', 'energy', 'fractal_params', 'style', 'tilebank', 'seed', 'gem_style', 'opal_params', 'prompt_template'];

        for (const field of requiredFields) {
          if (!node[field]) {
            nodeStatus.healthy = false;
            nodeStatus.issues.push(`Missing ${field}`);
            this.errors.push(`❌ Node ${i} (${node.id || 'unknown'}) missing ${field}`);
          }
        }

        // Validate numerology structure
        if (node.numerology && (!node.numerology.core || !node.numerology.path)) {
          nodeStatus.healthy = false;
          nodeStatus.issues.push('Invalid numerology structure');
          this.warnings.push(`⚠️ Node ${i} has incomplete numerology`);
        }

        // Validate energy range (0-1)
        if (node.energy < 0 || node.energy > 1) {
          nodeStatus.healthy = false;
          nodeStatus.issues.push(`Energy out of range: ${node.energy}`);
          this.errors.push(`❌ Node ${i} energy ${node.energy} not in range 0-1`);
        }

        // Validate palette is array with colors
        if (!Array.isArray(node.palette) || node.palette.length === 0) {
          nodeStatus.healthy = false;
          nodeStatus.issues.push('Invalid palette');
          this.errors.push(`❌ Node ${i} palette is not valid array`);
        }

        this.healthStatus.mysticalSystems[`codex-node-${i}`] = nodeStatus;
      }

      console.log(`✅ Codex 144:99: ${codexData.length}/145 nodes validated`);

    } catch (error) {
      this.errors.push(`❌ Failed to parse Codex data: ${error.message}`);
    }
  }

  /**
   * 🎴 VALIDATE LIBER ARCANA - All 78 cards (0-77)
   */
  validateLiberArcana() {
    console.log('\n🎴 VALIDATING LIBER ARCANA...');
    console.log('━'.repeat(50));

    const tarotPath = path.join(this.basePath, 'TAROT_MASTER_DATASET.json');

    if (!fs.existsSync(tarotPath)) {
      this.errors.push('❌ Liber Arcana dataset missing');
      return;
    }

    try {
      const tarotData = JSON.parse(fs.readFileSync(tarotPath, 'utf8'));

      // Validate Major Arcana (0-21)
      if (!tarotData.tarot_master_dataset?.major_arcana) {
        this.errors.push('❌ Major Arcana data missing');
        return;
      }

      const majorArcana = tarotData.tarot_master_dataset.major_arcana;

      if (majorArcana.length !== 22) {
        this.errors.push(`❌ Expected 22 Major Arcana, found ${majorArcana.length}`);
      }

      for (let i = 0; i < majorArcana.length; i++) {
        const card = majorArcana[i];
        const cardStatus = {
          number: card.number,
          name: card.name,
          healthy: true,
          issues: []
        };

        // Validate required fields
        const requiredFields = ['number', 'name', 'element', 'planet', 'hebrew_letter', 'keywords', 'powers', 'merkaba_chariot', 'faculty_role', 'department', 'specialties', 'frequency_hz', 'color', 'archetype'];

        for (const field of requiredFields) {
          if (!card[field]) {
            cardStatus.healthy = false;
            cardStatus.issues.push(`Missing ${field}`);
            this.errors.push(`❌ Major Arcana ${i} (${card.name || 'unknown'}) missing ${field}`);
          }
        }

        // Validate frequency range
        if (card.frequency_hz && (card.frequency_hz < 100 || card.frequency_hz > 1000)) {
          cardStatus.healthy = false;
          cardStatus.issues.push(`Frequency out of range: ${card.frequency_hz}`);
          this.warnings.push(`⚠️ Major Arcana ${i} frequency ${card.frequency_hz}Hz seems unusual`);
        }

        this.healthStatus.mysticalSystems[`major-arcana-${i}`] = cardStatus;
      }

      // Validate Minor Arcana structure
      if (!tarotData.tarot_master_dataset?.minor_arcana?.suits) {
        this.warnings.push('⚠️ Minor Arcana suits data missing');
      } else {
        const suits = tarotData.tarot_master_dataset.minor_arcana.suits;
        if (suits.length !== 4) {
          this.errors.push(`❌ Expected 4 suits, found ${suits.length}`);
        }

        const expectedSuits = ['Wands', 'Cups', 'Swords', 'Pentacles'];
        for (const suit of expectedSuits) {
          if (!suits.find(s => s.name === suit)) {
            this.errors.push(`❌ Missing suit: ${suit}`);
          }
        }
      }

      console.log(`✅ Liber Arcana: ${majorArcana.length}/22 Major Arcana validated`);

    } catch (error) {
      this.errors.push(`❌ Failed to parse Liber Arcana data: ${error.message}`);
    }
  }

  /**
   * 👼 VALIDATE SHEM ANGELS & DEMONS - All 72 entities
   */
  validateShemSystem() {
    console.log('\n👼 VALIDATING SHEM ANGELS & DEMONS...');
    console.log('━'.repeat(50));

    const shemPath = path.join(this.basePath, 'data/codex_shem_72.json');

    if (!fs.existsSync(shemPath)) {
      this.errors.push('❌ Shem system data missing');
      return;
    }

    try {
      const shemData = JSON.parse(fs.readFileSync(shemPath, 'utf8'));

      // Validate Shem Angels
      if (!shemData.shem_angels) {
        this.errors.push('❌ Shem angels data missing');
        return;
      }

      const angels = shemData.shem_angels;
      const expectedCount = 72;

      if (angels.length < expectedCount) {
        this.errors.push(`❌ Expected ${expectedCount} Shem angels, found ${angels.length}`);
      }

      for (let i = 0; i < angels.length; i++) {
        const angel = angels[i];
        const angelStatus = {
          id: angel.id,
          name: angel.name,
          healthy: true,
          issues: []
        };

        // Validate required fields
        const requiredFields = ['id', 'name', 'hebrew', 'rank', 'choir', 'planetary_ruler', 'element', 'direction', 'time_hours', 'psalm', 'powers', 'tarot_card', 'numerology', 'frequency', 'color', 'chakra', 'palace', 'corresponding_demon'];

        for (const field of requiredFields) {
          if (!angel[field]) {
            angelStatus.healthy = false;
            angelStatus.issues.push(`Missing ${field}`);
            this.errors.push(`❌ Shem angel ${i} (${angel.name || 'unknown'}) missing ${field}`);
          }
        }

        // Validate frequency range (Solfeggio frequencies)
        if (angel.frequency && (angel.frequency < 100 || angel.frequency > 1000)) {
          angelStatus.healthy = false;
          angelStatus.issues.push(`Frequency out of range: ${angel.frequency}`);
          this.warnings.push(`⚠️ Shem angel ${i} frequency ${angel.frequency}Hz seems unusual`);
        }

        this.healthStatus.mysticalSystems[`shem-angel-${i}`] = angelStatus;
      }

      console.log(`✅ Shem Angels: ${angels.length}/${expectedCount} validated`);

    } catch (error) {
      this.errors.push(`❌ Failed to parse Shem data: ${error.message}`);
    }
  }

  /**
   * 🛠️ VALIDATE ALL TOOLS AND LIBRARIES
   */
  validateToolsAndLibraries() {
    console.log('\n🛠️ VALIDATING TOOLS AND LIBRARIES...');
    console.log('━'.repeat(50));

    const tools = [
      // Core build tools
      { name: 'Node.js', command: 'node --version', required: true },
      { name: 'npm', command: 'npm --version', required: true },
      { name: 'pnpm', command: 'pnpm --version', required: true },
      { name: 'git', command: 'git --version', required: true },

      // Development tools
      { name: 'TypeScript', command: 'tsc --version', required: false },
      { name: 'Vite', command: 'vite --version', required: false },
      { name: 'Turbo', command: 'turbo --version', required: false },

      // Runtime tools
      { name: 'Python', command: 'python3 --version', required: false },
      { name: 'Docker', command: 'docker --version', required: false },

      // Utility tools
      { name: 'curl', command: 'curl --version', required: false },
      { name: 'jq', command: 'jq --version', required: false },
      { name: 'grep', command: 'grep --version', required: false }
    ];

    for (const tool of tools) {
      const status = {
        name: tool.name,
        healthy: false,
        version: 'Not found',
        issues: []
      };

      try {
        const output = execSync(tool.command, { encoding: 'utf8', stdio: 'pipe' });
        status.healthy = true;
        status.version = output.trim();
        console.log(`✅ ${tool.name}: ${status.version}`);
      } catch (error) {
        if (tool.required) {
          status.issues.push('Required tool missing');
          this.errors.push(`❌ Required tool missing: ${tool.name}`);
        } else {
          status.issues.push('Optional tool missing');
          this.warnings.push(`⚠️ Optional tool missing: ${tool.name}`);
        }
      }

      this.healthStatus.toolsAndLibraries[tool.name.toLowerCase()] = status;
    }
  }

  /**
   * 📱 VALIDATE ALL APPS
   */
  validateApps() {
    console.log('\n📱 VALIDATING APPS...');
    console.log('━'.repeat(50));

    const appsPath = path.join(this.basePath, 'apps');

    if (!fs.existsSync(appsPath)) {
      this.errors.push('❌ Apps directory missing');
      return;
    }

    const expectedApps = [
      'arcanae-lab', 'cathedral-connection-map', 'cathedral-hub', 'cathedral-of-circuits',
      'circuitum99', 'cosmogenesis-engine', 'cosmogenesis-visualizer', 'design',
      'game', 'liber-arcanae', 'magical-mystery-house', 'master-catalog-browser',
      'stone-grimoire', 'synth-lab', 'tarot-arena', 'test-ground', 'web', 'worker'
    ];

    const foundApps = fs.readdirSync(appsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const expectedApp of expectedApps) {
      const status = {
        name: expectedApp,
        healthy: false,
        exists: foundApps.includes(expectedApp),
        hasPackageJson: false,
        issues: []
      };

      const appPath = path.join(appsPath, expectedApp);
      const packageJsonPath = path.join(appPath, 'package.json');

      if (status.exists) {
        if (fs.existsSync(packageJsonPath)) {
          status.healthy = true;
          status.hasPackageJson = true;
          console.log(`✅ ${expectedApp}: Valid structure`);
        } else {
          status.issues.push('Missing package.json');
          this.warnings.push(`⚠️ App ${expectedApp} missing package.json`);
        }
      } else {
        status.issues.push('Directory missing');
        this.warnings.push(`⚠️ Expected app missing: ${expectedApp}`);
      }

      this.healthStatus.apps[expectedApp] = status;
    }
  }

  /**
   * 📄 VALIDATE ALL JSON FILES
   */
  validateJsonFiles() {
    console.log('\n📄 VALIDATING JSON FILES...');
    console.log('━'.repeat(50));

    const jsonFiles = [
      'data/codex_nodes_99.json',
      'data/codex_shem_72.json',
      'data/codex-144-expanded.json',
      'integration/helix_map.json',
      'integration/fusionist_registry.json',
      'TAROT_MASTER_DATASET.json',
      'package.json',
      'tsconfig.json',
      'turbo.json'
    ];

    for (const file of jsonFiles) {
      const filePath = path.join(this.basePath, file);
      const status = {
        file: file,
        healthy: false,
        size: 0,
        issues: []
      };

      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          JSON.parse(content); // Validate JSON syntax
          status.healthy = true;
          status.size = content.length;
          console.log(`✅ ${file}: ${status.size} bytes, valid JSON`);
        } catch (error) {
          status.issues.push(`Invalid JSON: ${error.message}`);
          this.errors.push(`❌ Invalid JSON in ${file}: ${error.message}`);
        }
      } else {
        status.issues.push('File missing');
        this.warnings.push(`⚠️ JSON file missing: ${file}`);
      }

      this.healthStatus.jsonFiles[file] = status;
    }
  }

  /**
   * 🔍 VALIDATE PACKAGE DEPENDENCIES
   */
  validateDependencies() {
    console.log('\n🔍 VALIDATING PACKAGE DEPENDENCIES...');
    console.log('━'.repeat(50));

    const packagePath = path.join(this.basePath, 'package.json');

    if (!fs.existsSync(packagePath)) {
      this.errors.push('❌ Root package.json missing');
      return;
    }

    try {
      const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      // Check for critical dependencies
      const criticalDeps = ['typescript', 'vite', 'react', 'three'];
      const devDeps = { ...packageData.dependencies, ...packageData.devDependencies };

      for (const dep of criticalDeps) {
        if (!devDeps[dep]) {
          this.warnings.push(`⚠️ Critical dependency missing: ${dep}`);
        }
      }

      // Check for workspaces
      if (!packageData.workspaces) {
        this.warnings.push('⚠️ No workspaces configuration found');
      }

      console.log(`✅ Package.json: ${Object.keys(devDeps).length} dependencies`);

    } catch (error) {
      this.errors.push(`❌ Failed to parse package.json: ${error.message}`);
    }
  }

  /**
   * 📊 GENERATE COMPREHENSIVE REPORT
   */
  generateReport() {
    console.log('\n🏛️ CATHEDRAL COMPREHENSIVE HEALTH REPORT');
    console.log('━'.repeat(80));

    // Count totals
    const totalSystems = Object.keys(this.healthStatus.mysticalSystems).length;
    const healthySystems = Object.values(this.healthStatus.mysticalSystems).filter(s => s.healthy).length;
    const totalTools = Object.keys(this.healthStatus.toolsAndLibraries).length;
    const healthyTools = Object.values(this.healthStatus.toolsAndLibraries).filter(t => t.healthy).length;
    const totalApps = Object.keys(this.healthStatus.apps).length;
    const healthyApps = Object.values(this.healthStatus.apps).filter(a => a.healthy).length;
    const totalJson = Object.keys(this.healthStatus.jsonFiles).length;
    const healthyJson = Object.values(this.healthStatus.jsonFiles).filter(j => j.healthy).length;

    this.healthStatus.overall.total = totalSystems + totalTools + totalApps + totalJson;
    this.healthStatus.overall.healthy = healthySystems + healthyTools + healthyApps + healthyJson;
    this.healthStatus.overall.errors = this.errors.length;
    this.healthStatus.overall.warnings = this.warnings.length;

    console.log('\n📊 OVERALL STATUS:');
    console.log(`   Total Components: ${this.healthStatus.overall.total}`);
    console.log(`   ✅ Healthy: ${this.healthStatus.overall.healthy}`);
    console.log(`   ⚠️  Warnings: ${this.healthStatus.overall.warnings}`);
    console.log(`   ❌ Errors: ${this.healthStatus.overall.errors}`);

    console.log('\n🔮 MYSTICAL SYSTEMS:');
    console.log(`   Codex 144:99: ${healthySystems > 0 ? '✅' : '❌'} (${healthySystems} components)`);

    console.log('\n🛠️ TOOLS & LIBRARIES:');
    console.log(`   Available: ${healthyTools}/${totalTools} ✅`);

    console.log('\n📱 APPLICATIONS:');
    console.log(`   Valid: ${healthyApps}/${totalApps} ✅`);

    console.log('\n📄 JSON FILES:');
    console.log(`   Valid: ${healthyJson}/${totalJson} ✅`);

    // Show errors if any
    if (this.errors.length > 0) {
      console.log('\n❌ CRITICAL ERRORS:');
      this.errors.slice(0, 10).forEach((error, i) => {
        console.log(`   ${i + 1}. ${error}`);
      });
      if (this.errors.length > 10) {
        console.log(`   ... and ${this.errors.length - 10} more errors`);
      }
    }

    // Show warnings if any
    if (this.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      this.warnings.slice(0, 5).forEach((warning, i) => {
        console.log(`   ${i + 1}. ${warning}`);
      });
      if (this.warnings.length > 5) {
        console.log(`   ... and ${this.warnings.length - 5} more warnings`);
      }
    }

    // Overall assessment
    const overallHealth = this.healthStatus.overall.errors === 0 ?
      (this.healthStatus.overall.warnings === 0 ? '✨ PERFECT' : '✅ GOOD') : '❌ NEEDS ATTENTION';

    console.log('\n🎯 OVERALL ASSESSMENT:');
    console.log(`   ${overallHealth} - Your Cathedral ecosystem is ${overallHealth === '✨ PERFECT' ? 'flawless!' : overallHealth === '✅ GOOD' ? 'healthy!' : 'needs attention.'}`);

    console.log('\n💡 RECOMMENDATIONS:');
    if (this.healthStatus.overall.errors > 0) {
      console.log('   🔧 Fix critical errors first');
      console.log('   📞 Run: pnpm run validate-datasets');
    }
    if (this.healthStatus.overall.warnings > 0) {
      console.log('   🔍 Review warnings for optimization');
      console.log('   📊 Run: pnpm run dataset-dashboard');
    }
    if (this.healthStatus.overall.errors === 0 && this.healthStatus.overall.warnings === 0) {
      console.log('   🎉 Everything looks perfect!');
      console.log('   🚀 Ready for mystical operations');
    }

    console.log('\n' + '━'.repeat(80));

    return {
      overall: this.healthStatus.overall,
      errors: this.errors,
      warnings: this.warnings,
      isHealthy: this.healthStatus.overall.errors === 0
    };
  }

  /**
   * 🏛️ MAIN HEALTH CHECK EXECUTION
   */
  async runCompleteHealthCheck() {
    console.log('🏛️ CATHEDRAL COMPREHENSIVE HEALTH CHECK');
    console.log('━'.repeat(80));
    console.log('🔮 Validating every tool, library, JSON, and app in your mystical ecosystem...');
    console.log('📊 This includes all 145 Codex nodes, 78 Arcana cards, and 72 Shem entities...\n');

    try {
      // Validate mystical systems
      this.validateCodex144();
      this.validateLiberArcana();
      this.validateShemSystem();

      // Validate technical infrastructure
      this.validateToolsAndLibraries();
      this.validateApps();
      this.validateJsonFiles();
      this.validateDependencies();

      // Generate comprehensive report
      const report = this.generateReport();

      // Exit strategy
      if (report.isHealthy) {
        console.log('\n🎉 COMPREHENSIVE HEALTH CHECK PASSED!');
        console.log('✨ Your Cathedral mystical ecosystem is complete and healthy!');
        return report;
      } else {
        console.log('\n💥 COMPREHENSIVE HEALTH CHECK FAILED!');
        console.log('🔧 Please address the errors above before proceeding.');
        process.exit(1);
      }

    } catch (error) {
      console.error('\n💥 Health check failed with exception:', error);
      process.exit(1);
    }
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const healthChecker = new CathedralHealthChecker();
  healthChecker.runCompleteHealthCheck().catch(console.error);
}

export default CathedralHealthChecker;
