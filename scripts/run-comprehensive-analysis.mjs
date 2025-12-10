#!/usr/bin/env node
/**
 * COMPREHENSIVE CATHEDRAL ANALYSIS RUNNER
 */

import fs from 'fs';
import { execSync } from 'child_process';

class ComprehensiveAnalyzer {
  constructor() {
    this.scripts = [
      { name: 'Tools Analysis', script: 'analyze-all-tools.mjs' },
      { name: 'Apps Analysis', script: 'analyze-all-apps.mjs' },
      { name: 'Branch Analysis', script: 'analyze-branches.mjs' },
      { name: 'Spam/Duplicate Detection', script: 'detect-spam-duplicates.mjs' }
    ];
    
    this.masterReport = {
      timestamp: new Date().toISOString(),
      analysis_results: {},
      summary: {},
      recommendations: []
    };
  }

  async runAll() {
    console.log('🏛️  CATHEDRAL COMPREHENSIVE ANALYSIS\n');
    console.log('=' .repeat(50));
    
    for (const { name, script } of this.scripts) {
      console.log(`\n🔍 Running ${name}...`);
      console.log('-'.repeat(30));
      
      try {
        const result = await this.runScript(script);
        this.masterReport.analysis_results[script] = {
          status: 'completed',
          timestamp: new Date().toISOString()
        };
        console.log(`✅ ${name} completed`);
      } catch (error) {
        console.error(`❌ ${name} failed:`, error.message);
        this.masterReport.analysis_results[script] = {
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    }
    
    this.generateMasterReport();
    this.generateHumanReadableReport();
    
    console.log('\n🎉 Comprehensive analysis complete!');
    console.log('📊 Check reports/ directory for detailed results');
  }

  async runScript(scriptName) {
    const scriptPath = `scripts/${scriptName}`;
    
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Script not found: ${scriptPath}`);
    }
    
    try {
      execSync(`node ${scriptPath}`, { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
    } catch (error) {
      throw new Error(`Script execution failed: ${error.message}`);
    }
  }

  generateMasterReport() {
    console.log('\n📊 Generating master report...');
    
    // Load individual reports
    const reportFiles = [
      'tools-comprehensive-report.json',
      'apps-comprehensive-report.json', 
      'branches-comprehensive-report.json',
      'duplicates-and-spam.json'
    ];
    
    reportFiles.forEach(reportFile => {
      const reportPath = `reports/${reportFile}`;
      if (fs.existsSync(reportPath)) {
        try {
          const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
          this.masterReport.analysis_results[reportFile] = report;
        } catch (error) {
          console.warn(`  ⚠️  Could not load ${reportFile}`);
        }
      }
    });
    
    // Generate summary
    this.generateSummary();
    
    // Generate recommendations
    this.generateRecommendations();
    
    // Save master report
    fs.writeFileSync('reports/MASTER_COMPREHENSIVE_REPORT.json', JSON.stringify(this.masterReport, null, 2));
    console.log('  💾 Master report saved');
  }

  generateSummary() {
    const toolsReport = this.masterReport.analysis_results['tools-comprehensive-report.json'];
    const appsReport = this.masterReport.analysis_results['apps-comprehensive-report.json'];
    const branchesReport = this.masterReport.analysis_results['branches-comprehensive-report.json'];
    const spamReport = this.masterReport.analysis_results['duplicates-and-spam.json'];
    
    this.masterReport.summary = {
      tools: {
        total: toolsReport?.total_tools || 0,
        categories: Object.keys(toolsReport?.categories || {}).length,
        executable: Object.values(toolsReport?.status || {}).reduce((sum, count) => sum + (count || 0), 0)
      },
      apps: {
        total: appsReport?.total_apps || 0,
        ready: appsReport?.status?.ready || 0,
        technologies: Object.keys(appsReport?.technologies || {}).length,
        total_size_mb: Math.round((appsReport?.total_size || 0) / 1024 / 1024)
      },
      branches: {
        local: branchesReport?.local_branches?.length || 0,
        remote: branchesReport?.remote_branches?.length || 0,
        duplicates: branchesReport?.duplicates?.length || 0,
        spam: branchesReport?.spam?.length || 0
      },
      cleanup: {
        duplicate_files: spamReport?.total_duplicates || 0,
        spam_files: spamReport?.total_spam || 0,
        space_wasted_mb: Math.round((spamReport?.space_wasted || 0) / 1024 / 1024),
        merge_conflicts: spamReport?.merge_conflicts?.length || 0
      }
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Tools recommendations
    const toolsReport = this.masterReport.analysis_results['tools-comprehensive-report.json'];
    if (toolsReport?.status?.error > 0) {
      recommendations.push({
        priority: 'high',
        category: 'tools',
        action: 'Fix broken tools',
        description: `${toolsReport.status.error} tools have errors and need fixing`
      });
    }
    
    // Apps recommendations
    const appsReport = this.masterReport.analysis_results['apps-comprehensive-report.json'];
    if (appsReport?.status?.incomplete > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'apps',
        action: 'Complete incomplete apps',
        description: `${appsReport.status.incomplete} apps are missing entry points`
      });
    }
    
    // Branch cleanup recommendations
    const branchesReport = this.masterReport.analysis_results['branches-comprehensive-report.json'];
    if (branchesReport?.spam?.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'git',
        action: 'Delete spam branches',
        description: `${branchesReport.spam.length} spam branches should be deleted`
      });
    }
    
    // File cleanup recommendations
    const spamReport = this.masterReport.analysis_results['duplicates-and-spam.json'];
    if (spamReport?.total_duplicates > 0) {
      recommendations.push({
        priority: 'high',
        category: 'cleanup',
        action: 'Remove duplicate files',
        description: `${spamReport.total_duplicates} duplicate files wasting ${Math.round(spamReport.space_wasted / 1024 / 1024)}MB`
      });
    }
    
    this.masterReport.recommendations = recommendations;
  }

  generateHumanReadableReport() {
    console.log('\n📝 Generating human-readable report...');
    
    const summary = this.masterReport.summary;
    
    const humanReport = `# CATHEDRAL COMPREHENSIVE ANALYSIS REPORT

Generated: ${new Date().toLocaleString()}

## 📊 SYSTEM OVERVIEW

### 🔧 Tools
- **Total Tools**: ${summary.tools.total}
- **Categories**: ${summary.tools.categories}
- **Status**: ${summary.tools.executable} functional tools

### 📱 Applications  
- **Total Apps**: ${summary.apps.total}
- **Ready Apps**: ${summary.apps.ready}
- **Technologies**: ${summary.apps.technologies}
- **Total Size**: ${summary.apps.total_size_mb} MB

### 🌿 Git Branches
- **Local Branches**: ${summary.branches.local}
- **Remote Branches**: ${summary.branches.remote}
- **Duplicate Branches**: ${summary.branches.duplicates}
- **Spam Branches**: ${summary.branches.spam}

### 🧹 Cleanup Needed
- **Duplicate Files**: ${summary.cleanup.duplicate_files}
- **Spam Files**: ${summary.cleanup.spam_files}
- **Space Wasted**: ${summary.cleanup.space_wasted_mb} MB
- **Merge Conflicts**: ${summary.cleanup.merge_conflicts}

## 🎯 PRIORITY RECOMMENDATIONS

${this.masterReport.recommendations.map((rec, i) => 
  `${i + 1}. **${rec.action}** (${rec.priority} priority)
   - Category: ${rec.category}
   - ${rec.description}`
).join('\n\n')}

## 📁 DETAILED REPORTS

Individual detailed reports available in reports/ directory:
- \`tools-comprehensive-report.json\` - Complete tools analysis
- \`apps-comprehensive-report.json\` - Complete apps analysis  
- \`branches-comprehensive-report.json\` - Git branches analysis
- \`duplicates-and-spam.json\` - Cleanup recommendations

## 🚀 NEXT STEPS

1. Review priority recommendations above
2. Run cleanup scripts for high-priority items
3. Fix broken tools and incomplete apps
4. Clean up git branches and duplicate files
5. Implement visual quality standards

---
*Cathedral V1.0 - Sacred Mathematics & Consciousness Research*
`;

    fs.writeFileSync('TOOLS_AND_APPS_COMPREHENSIVE_REPORT.md', humanReport);
    console.log('  📝 Human-readable report saved');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new ComprehensiveAnalyzer();
  analyzer.runAll();
}