#!/usr/bin/env node
/**
 * COMPLETE CATHEDRAL ANALYSIS RUNNER
 */

import { execSync } from 'child_process';
import fs from 'fs';

class CompleteAnalysisRunner {
  constructor() {
    this.scripts = [
      { name: 'Repository Discovery', script: 'discover-all-repos.mjs', required: true },
      { name: 'Visual Standards Extraction', script: 'extract-visual-standards.mjs', required: true },
      { name: 'Tools Analysis', script: 'analyze-all-tools.mjs', required: false },
      { name: 'Apps Analysis', script: 'analyze-all-apps.mjs', required: false },
      { name: 'Branch Analysis', script: 'analyze-branches.mjs', required: false },
      { name: 'Connection Mapping', script: 'map-connections.mjs', required: true },
      { name: 'Spam/Duplicate Detection', script: 'detect-spam-duplicates.mjs', required: false },
      { name: 'Visual Quality Application', script: 'apply-visual-quality.mjs', required: true },
      { name: 'Comprehensive Report Generation', script: 'generate-comprehensive-report.mjs', required: true }
    ];
    
    this.results = {
      timestamp: new Date().toISOString(),
      completed: [],
      failed: [],
      skipped: []
    };
  }

  async runComplete() {
    console.log('🏛️  CATHEDRAL COMPLETE ANALYSIS SYSTEM\n');
    console.log('=' .repeat(60));
    console.log('Comprehensive Tools, Apps, Branches Analysis with Visual Quality Standards');
    console.log('=' .repeat(60));
    
    // Ensure reports directory exists
    if (!fs.existsSync('reports')) {
      fs.mkdirSync('reports', { recursive: true });
    }
    
    // Run all analysis scripts in sequence
    for (const { name, script, required } of this.scripts) {
      console.log(`\n🔍 Running: ${name}`);
      console.log('-'.repeat(40));
      
      try {
        await this.runScript(script);
        this.results.completed.push({ name, script, timestamp: new Date().toISOString() });
        console.log(`✅ ${name} completed successfully`);
      } catch (error) {
        console.error(`❌ ${name} failed: ${error.message}`);
        this.results.failed.push({ name, script, error: error.message });
        
        if (required) {
          console.error(`🚨 Required script failed, continuing with remaining scripts...`);
        }
      }
    }
    
    // Generate final summary
    this.generateFinalSummary();
    
    console.log('\n🎉 COMPLETE ANALYSIS FINISHED!');
    console.log('📊 Check CATHEDRAL_COMPREHENSIVE_SYSTEM_REPORT.md for full results');
  }

  async runScript(scriptName) {
    const scriptPath = `scripts/${scriptName}`;
    
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Script not found: ${scriptPath}`);
    }
    
    return new Promise((resolve, reject) => {
      try {
        execSync(`node ${scriptPath}`, { 
          stdio: 'inherit',
          cwd: process.cwd(),
          timeout: 300000 // 5 minute timeout
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  generateFinalSummary() {
    console.log('\n📊 FINAL ANALYSIS SUMMARY');
    console.log('=' .repeat(40));
    
    console.log(`✅ Completed: ${this.results.completed.length} scripts`);
    console.log(`❌ Failed: ${this.results.failed.length} scripts`);
    console.log(`⏭️  Skipped: ${this.results.skipped.length} scripts`);
    
    if (this.results.failed.length > 0) {
      console.log('\n❌ Failed Scripts:');
      this.results.failed.forEach(failure => {
        console.log(`  - ${failure.name}: ${failure.error}`);
      });
    }
    
    // Save execution results
    fs.writeFileSync('reports/analysis-execution-log.json', JSON.stringify(this.results, null, 2));
    
    // Display key achievements
    console.log('\n🏆 KEY ACHIEVEMENTS:');
    
    if (fs.existsSync('reports/repository-map.json')) {
      const repoMap = JSON.parse(fs.readFileSync('reports/repository-map.json', 'utf8'));
      console.log(`  📂 Discovered ${repoMap.total_repos || 0} repositories`);
    }
    
    if (fs.existsSync('reports/visual-quality-standards.json')) {
      const visualStandards = JSON.parse(fs.readFileSync('reports/visual-quality-standards.json', 'utf8'));
      console.log(`  🎨 Extracted ${visualStandards.shader_realms?.total_rings || 0} shader realms`);
    }
    
    if (fs.existsSync('reports/tools-comprehensive-report.json')) {
      const toolsReport = JSON.parse(fs.readFileSync('reports/tools-comprehensive-report.json', 'utf8'));
      console.log(`  🔧 Analyzed ${toolsReport.total_tools || 0} tools`);
    }
    
    if (fs.existsSync('reports/apps-comprehensive-report.json')) {
      const appsReport = JSON.parse(fs.readFileSync('reports/apps-comprehensive-report.json', 'utf8'));
      console.log(`  📱 Analyzed ${appsReport.total_apps || 0} applications`);
    }
    
    if (fs.existsSync('reports/connections-map.json')) {
      const connectionsMap = JSON.parse(fs.readFileSync('reports/connections-map.json', 'utf8'));
      const totalConnections = (connectionsMap.summary?.tools_to_apps || 0) + 
                              (connectionsMap.summary?.apps_to_packages || 0) + 
                              (connectionsMap.summary?.packages_to_packages || 0);
      console.log(`  🔗 Mapped ${totalConnections} connections`);
    }
    
    if (fs.existsSync('reports/visual-quality-implementation.json')) {
      const visualImpl = JSON.parse(fs.readFileSync('reports/visual-quality-implementation.json', 'utf8'));
      console.log(`  ✨ Applied visual standards to ${visualImpl.summary?.apps_updated || 0} apps`);
    }
    
    console.log('\n📋 NEXT STEPS:');
    console.log('  1. Review CATHEDRAL_COMPREHENSIVE_SYSTEM_REPORT.md');
    console.log('  2. Address high-priority recommendations');
    console.log('  3. Run cleanup scripts for duplicates/spam');
    console.log('  4. Complete incomplete applications');
    console.log('  5. Deploy updated system to GitHub Pages');
    
    console.log('\n🏛️  Cathedral V1.0 Analysis Complete');
    console.log(`   Sacred Mathematics & Consciousness Research Platform`);
    console.log(`   Analysis completed: ${new Date().toLocaleString()}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new CompleteAnalysisRunner();
  runner.runComplete().catch(error => {
    console.error('🚨 Analysis runner failed:', error);
    process.exit(1);
  });
}