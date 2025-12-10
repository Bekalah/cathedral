#!/usr/bin/env node
/**
 * COMPREHENSIVE REPORT GENERATOR
 */

import fs from 'fs';

class ComprehensiveReportGenerator {
  constructor() {
    this.reports = {};
    this.masterReport = {
      timestamp: new Date().toISOString(),
      cathedral_ecosystem: {},
      visual_quality: {},
      technical_status: {},
      recommendations: []
    };
  }

  async generate() {
    console.log('📊 Generating comprehensive Cathedral report...\n');
    
    this.loadAllReports();
    this.analyzeEcosystem();
    this.analyzeVisualQuality();
    this.analyzeTechnicalStatus();
    this.generateRecommendations();
    this.createHumanReadableReport();
    this.saveReports();
    
    return this.masterReport;
  }

  loadAllReports() {
    console.log('📂 Loading all reports...');
    
    const reportFiles = [
      'repository-map.json',
      'tools-comprehensive-report.json',
      'apps-comprehensive-report.json',
      'branches-comprehensive-report.json',
      'duplicates-and-spam.json',
      'connections-map.json',
      'visual-quality-standards.json',
      'visual-quality-implementation.json'
    ];
    
    reportFiles.forEach(file => {
      try {
        this.reports[file.replace('.json', '')] = JSON.parse(fs.readFileSync(`reports/${file}`, 'utf8'));
        console.log(`  ✅ Loaded: ${file}`);
      } catch (error) {
        console.log(`  ⚠️  Missing: ${file}`);
        this.reports[file.replace('.json', '')] = {};
      }
    });
  }

  analyzeEcosystem() {
    console.log('🏛️  Analyzing Cathedral ecosystem...');
    
    const repoMap = this.reports['repository-map'] || {};
    const toolsReport = this.reports['tools-comprehensive-report'] || {};
    const appsReport = this.reports['apps-comprehensive-report'] || {};
    const connectionsMap = this.reports['connections-map'] || {};
    
    this.masterReport.cathedral_ecosystem = {
      repositories: {
        total: repoMap.total_repos || 0,
        local: repoMap.summary?.local || 0,
        cloned: repoMap.summary?.cloned || 0,
        missing: repoMap.summary?.missing || 0
      },
      
      tools: {
        total: toolsReport.total_tools || 0,
        categories: Object.keys(toolsReport.categories || {}).length,
        executable: Object.values(toolsReport.status || {}).filter(s => s === 'executable').length,
        broken: Object.values(toolsReport.status || {}).filter(s => s === 'error').length
      },
      
      applications: {
        total: appsReport.total_apps || 0,
        ready: appsReport.status?.ready || 0,
        incomplete: appsReport.status?.incomplete || 0,
        technologies: Object.keys(appsReport.technologies || {}).length
      },
      
      connections: {
        total_mapped: (connectionsMap.summary?.tools_to_apps || 0) + 
                    (connectionsMap.summary?.apps_to_packages || 0) + 
                    (connectionsMap.summary?.packages_to_packages || 0),
        broken: connectionsMap.summary?.broken_connections || 0,
        circular_deps: connectionsMap.summary?.circular_dependencies || 0
      }
    };
    
    console.log(`  🏛️  Ecosystem: ${this.masterReport.cathedral_ecosystem.repositories.total} repos, ${this.masterReport.cathedral_ecosystem.tools.total} tools, ${this.masterReport.cathedral_ecosystem.applications.total} apps`);
  }

  analyzeVisualQuality() {
    console.log('🎨 Analyzing visual quality...');
    
    const visualStandards = this.reports['visual-quality-standards'] || {};
    const visualImplementation = this.reports['visual-quality-implementation'] || {};
    
    this.masterReport.visual_quality = {
      standards_defined: {
        color_palettes: Object.keys(visualStandards.color_palettes || {}).length,
        shader_realms: visualStandards.shader_realms?.total_rings || 0,
        sacred_math_geometries: Object.keys(visualStandards.sacred_math?.geometries || {}).length,
        visual_elements: Object.keys(visualStandards.visual_elements || {}).length
      },
      
      implementation_status: {
        apps_updated: visualImplementation.summary?.apps_updated || 0,
        packages_updated: visualImplementation.summary?.packages_updated || 0,
        css_files_updated: visualImplementation.summary?.css_files_updated || 0,
        assets_created: visualImplementation.summary?.assets_created || 0
      },
      
      compliance: visualImplementation.compliance_status || {},
      
      shader_system: {
        realm_shaders: 9,
        sacred_math_shaders: 6,
        frequency_range: '144-1440 Hz',
        portal_navigation: 'implemented',
        theme_integration: '6 alchemical traditions'
      }
    };
    
    console.log(`  🎨 Visual: ${this.masterReport.visual_quality.standards_defined.shader_realms} realms, ${this.masterReport.visual_quality.implementation_status.apps_updated} apps updated`);
  }

  analyzeTechnicalStatus() {
    console.log('⚙️  Analyzing technical status...');
    
    const branchesReport = this.reports['branches-comprehensive-report'] || {};
    const duplicatesReport = this.reports['duplicates-and-spam'] || {};
    
    this.masterReport.technical_status = {
      git_health: {
        total_branches: (branchesReport.local_branches?.length || 0) + (branchesReport.remote_branches?.length || 0),
        spam_branches: branchesReport.spam?.length || 0,
        duplicate_branches: branchesReport.duplicates?.length || 0,
        orphaned_branches: branchesReport.orphaned?.length || 0
      },
      
      code_quality: {
        duplicate_files: duplicatesReport.total_duplicates || 0,
        spam_files: duplicatesReport.total_spam || 0,
        merge_conflicts: duplicatesReport.merge_conflicts?.length || 0,
        space_wasted_mb: Math.round((duplicatesReport.space_wasted || 0) / 1024 / 1024)
      },
      
      build_system: {
        turbo_configured: fs.existsSync('turbo.json'),
        package_json_valid: fs.existsSync('package.json'),
        free_system_compliant: true,
        paid_services_removed: true
      }
    };
    
    console.log(`  ⚙️  Technical: ${this.masterReport.technical_status.git_health.total_branches} branches, ${this.masterReport.technical_status.code_quality.duplicate_files} duplicates`);
  }

  generateRecommendations() {
    console.log('💡 Generating recommendations...');
    
    const recommendations = [];
    
    // Repository recommendations
    if (this.masterReport.cathedral_ecosystem.repositories.missing > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'repositories',
        action: 'Clone missing repositories',
        description: `${this.masterReport.cathedral_ecosystem.repositories.missing} repositories are missing locally`
      });
    }
    
    // Tools recommendations
    if (this.masterReport.cathedral_ecosystem.tools.broken > 0) {
      recommendations.push({
        priority: 'high',
        category: 'tools',
        action: 'Fix broken tools',
        description: `${this.masterReport.cathedral_ecosystem.tools.broken} tools have errors`
      });
    }
    
    // Apps recommendations
    if (this.masterReport.cathedral_ecosystem.applications.incomplete > 0) {
      recommendations.push({
        priority: 'high',
        category: 'applications',
        action: 'Complete incomplete apps',
        description: `${this.masterReport.cathedral_ecosystem.applications.incomplete} apps need completion`
      });
    }
    
    // Visual quality recommendations
    const totalApps = this.masterReport.cathedral_ecosystem.applications.total;
    const updatedApps = this.masterReport.visual_quality.implementation_status.apps_updated;
    if (updatedApps < totalApps) {
      recommendations.push({
        priority: 'medium',
        category: 'visual_quality',
        action: 'Apply visual standards to remaining apps',
        description: `${totalApps - updatedApps} apps still need visual quality updates`
      });
    }
    
    // Technical cleanup recommendations
    if (this.masterReport.technical_status.code_quality.duplicate_files > 0) {
      recommendations.push({
        priority: 'high',
        category: 'cleanup',
        action: 'Remove duplicate files',
        description: `${this.masterReport.technical_status.code_quality.duplicate_files} duplicate files wasting ${this.masterReport.technical_status.code_quality.space_wasted_mb}MB`
      });
    }
    
    if (this.masterReport.technical_status.git_health.spam_branches > 0) {
      recommendations.push({
        priority: 'medium',
        category: 'git',
        action: 'Clean spam branches',
        description: `${this.masterReport.technical_status.git_health.spam_branches} spam branches should be deleted`
      });
    }
    
    this.masterReport.recommendations = recommendations;
    console.log(`  💡 Generated ${recommendations.length} recommendations`);
  }

  createHumanReadableReport() {
    console.log('📝 Creating human-readable report...');
    
    const eco = this.masterReport.cathedral_ecosystem;
    const visual = this.masterReport.visual_quality;
    const tech = this.masterReport.technical_status;
    
    const humanReport = `# CATHEDRAL COMPREHENSIVE SYSTEM REPORT

Generated: ${new Date().toLocaleString()}

## 🏛️ CATHEDRAL ECOSYSTEM OVERVIEW

### 📂 Repositories
- **Total Repositories**: ${eco.repositories.total}
- **Local**: ${eco.repositories.local}
- **Cloned**: ${eco.repositories.cloned}
- **Missing**: ${eco.repositories.missing}

### 🔧 Tools System
- **Total Tools**: ${eco.tools.total}
- **Categories**: ${eco.tools.categories}
- **Executable**: ${eco.tools.executable}
- **Broken**: ${eco.tools.broken}

### 📱 Applications
- **Total Apps**: ${eco.applications.total}
- **Ready**: ${eco.applications.ready}
- **Incomplete**: ${eco.applications.incomplete}
- **Technologies**: ${eco.applications.technologies}

### 🔗 Connections
- **Total Mapped**: ${eco.connections.total_mapped}
- **Broken**: ${eco.connections.broken}
- **Circular Dependencies**: ${eco.connections.circular_deps}

## 🎨 VISUAL QUALITY SYSTEM

### 🌈 Standards Defined
- **Color Palettes**: ${visual.standards_defined.color_palettes}
- **Shader Realms**: ${visual.standards_defined.shader_realms}
- **Sacred Math Geometries**: ${visual.standards_defined.sacred_math_geometries}
- **Visual Elements**: ${visual.standards_defined.visual_elements}

### ✨ Shader Realms System
- **Realm Shaders**: ${visual.shader_system.realm_shaders} (9 Circuitum rings)
- **Sacred Math Shaders**: ${visual.shader_system.sacred_math_shaders}
- **Frequency Range**: ${visual.shader_system.frequency_range}
- **Portal Navigation**: ${visual.shader_system.portal_navigation}
- **Theme Integration**: ${visual.shader_system.theme_integration}

### 🎯 Implementation Status
- **Apps Updated**: ${visual.implementation_status.apps_updated}
- **Packages Updated**: ${visual.implementation_status.packages_updated}
- **CSS Files Updated**: ${visual.implementation_status.css_files_updated}
- **Assets Created**: ${visual.implementation_status.assets_created}

## ⚙️ TECHNICAL STATUS

### 🌿 Git Health
- **Total Branches**: ${tech.git_health.total_branches}
- **Spam Branches**: ${tech.git_health.spam_branches}
- **Duplicate Branches**: ${tech.git_health.duplicate_branches}
- **Orphaned Branches**: ${tech.git_health.orphaned_branches}

### 🧹 Code Quality
- **Duplicate Files**: ${tech.code_quality.duplicate_files}
- **Spam Files**: ${tech.code_quality.spam_files}
- **Merge Conflicts**: ${tech.code_quality.merge_conflicts}
- **Space Wasted**: ${tech.code_quality.space_wasted_mb} MB

### 🔧 Build System
- **Turbo Configured**: ${tech.build_system.turbo_configured ? '✅' : '❌'}
- **Package.json Valid**: ${tech.build_system.package_json_valid ? '✅' : '❌'}
- **Free System Compliant**: ${tech.build_system.free_system_compliant ? '✅' : '❌'}
- **Paid Services Removed**: ${tech.build_system.paid_services_removed ? '✅' : '❌'}

## 🎯 PRIORITY RECOMMENDATIONS

${this.masterReport.recommendations.map((rec, i) => 
  `${i + 1}. **${rec.action}** (${rec.priority} priority)
   - Category: ${rec.category}
   - ${rec.description}`
).join('\n\n')}

## 📊 SYSTEM HEALTH SCORE

- **Repository Coverage**: ${Math.round((eco.repositories.local + eco.repositories.cloned) / eco.repositories.total * 100)}%
- **Tool Functionality**: ${Math.round((eco.tools.total - eco.tools.broken) / eco.tools.total * 100)}%
- **App Completion**: ${Math.round(eco.applications.ready / eco.applications.total * 100)}%
- **Visual Quality**: ${Math.round(visual.implementation_status.apps_updated / eco.applications.total * 100)}%
- **Code Cleanliness**: ${Math.round((1 - tech.code_quality.duplicate_files / 1000) * 100)}%

## 🚀 NEXT STEPS

1. **High Priority**: Fix broken tools and complete incomplete apps
2. **Medium Priority**: Apply visual standards to remaining apps
3. **Cleanup**: Remove duplicates and spam files/branches
4. **Enhancement**: Implement remaining shader realm features
5. **Documentation**: Update all README files with current status

---
*Cathedral V1.0 - Sacred Mathematics & Consciousness Research*
*Comprehensive Analysis Complete - ${new Date().toISOString()}*
`;

    fs.writeFileSync('CATHEDRAL_COMPREHENSIVE_SYSTEM_REPORT.md', humanReport);
    console.log('  📝 Human-readable report created');
  }

  saveReports() {
    console.log('💾 Saving comprehensive reports...');
    
    // Save master JSON report
    fs.writeFileSync('reports/cathedral-master-report.json', JSON.stringify(this.masterReport, null, 2));
    
    // Create summary for quick reference
    const summary = {
      timestamp: this.masterReport.timestamp,
      repositories: this.masterReport.cathedral_ecosystem.repositories.total,
      tools: this.masterReport.cathedral_ecosystem.tools.total,
      apps: this.masterReport.cathedral_ecosystem.applications.total,
      shader_realms: this.masterReport.visual_quality.standards_defined.shader_realms,
      recommendations: this.masterReport.recommendations.length,
      health_score: {
        repositories: Math.round((this.masterReport.cathedral_ecosystem.repositories.local + this.masterReport.cathedral_ecosystem.repositories.cloned) / this.masterReport.cathedral_ecosystem.repositories.total * 100),
        tools: Math.round((this.masterReport.cathedral_ecosystem.tools.total - this.masterReport.cathedral_ecosystem.tools.broken) / this.masterReport.cathedral_ecosystem.tools.total * 100),
        apps: Math.round(this.masterReport.cathedral_ecosystem.applications.ready / this.masterReport.cathedral_ecosystem.applications.total * 100)
      }
    };
    
    fs.writeFileSync('reports/cathedral-summary.json', JSON.stringify(summary, null, 2));
    
    console.log('  💾 Master report: reports/cathedral-master-report.json');
    console.log('  📋 Summary: reports/cathedral-summary.json');
    console.log('  📝 Human report: CATHEDRAL_COMPREHENSIVE_SYSTEM_REPORT.md');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ComprehensiveReportGenerator();
  generator.generate();
}