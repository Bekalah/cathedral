#!/usr/bin/env node
/**
 * COMPREHENSIVE TOOLS ANALYSIS
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class ToolsAnalyzer {
  constructor() {
    this.tools = [];
    this.toolsDir = 'tools';
    this.report = {
      timestamp: new Date().toISOString(),
      total_tools: 0,
      categories: {},
      status: {},
      dependencies: [],
      issues: []
    };
  }

  async analyze() {
    console.log('🔧 Analyzing all tools...\n');
    
    this.scanToolsDirectory();
    this.analyzeToolDependencies();
    this.checkToolStatus();
    this.generateReport();
    
    return this.report;
  }

  scanToolsDirectory() {
    console.log('📁 Scanning tools directory...');
    
    if (!fs.existsSync(this.toolsDir)) {
      console.log('  ⚠️  Tools directory not found');
      return;
    }

    const categories = fs.readdirSync(this.toolsDir);
    
    categories.forEach(category => {
      const categoryPath = path.join(this.toolsDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) return;
      
      console.log(`  📂 Category: ${category}`);
      this.report.categories[category] = [];
      
      const tools = fs.readdirSync(categoryPath);
      
      tools.forEach(tool => {
        const toolPath = path.join(categoryPath, tool);
        const toolInfo = this.analyzeToolFile(toolPath, category, tool);
        
        if (toolInfo) {
          this.tools.push(toolInfo);
          this.report.categories[category].push(toolInfo);
          console.log(`    🔧 ${tool}: ${toolInfo.status}`);
        }
      });
    });
    
    this.report.total_tools = this.tools.length;
  }

  analyzeToolFile(toolPath, category, filename) {
    try {
      const stat = fs.statSync(toolPath);
      if (!stat.isFile()) return null;
      
      const content = fs.readFileSync(toolPath, 'utf8');
      const ext = path.extname(filename);
      
      return {
        name: filename,
        category: category,
        path: toolPath,
        extension: ext,
        size: stat.size,
        executable: (stat.mode & parseInt('111', 8)) !== 0,
        language: this.detectLanguage(ext, content),
        dependencies: this.extractDependencies(content),
        description: this.extractDescription(content),
        status: this.checkToolStatus(toolPath, content),
        last_modified: stat.mtime.toISOString()
      };
    } catch (error) {
      return {
        name: filename,
        category: category,
        path: toolPath,
        status: 'error',
        error: error.message
      };
    }
  }

  detectLanguage(ext, content) {
    const langMap = {
      '.js': 'JavaScript',
      '.mjs': 'JavaScript (ES Module)',
      '.cjs': 'JavaScript (CommonJS)',
      '.ts': 'TypeScript',
      '.py': 'Python',
      '.sh': 'Shell Script',
      '.bash': 'Bash Script'
    };
    
    if (langMap[ext]) return langMap[ext];
    
    if (content.includes('#!/usr/bin/env node')) return 'Node.js';
    if (content.includes('#!/bin/bash')) return 'Bash';
    if (content.includes('#!/usr/bin/env python')) return 'Python';
    
    return 'Unknown';
  }

  extractDependencies(content) {
    const deps = [];
    
    // Node.js imports
    const requireMatches = content.match(/require\(['"`]([^'"`]+)['"`]\)/g) || [];
    const importMatches = content.match(/import.*from ['"`]([^'"`]+)['"`]/g) || [];
    
    requireMatches.forEach(match => {
      const dep = match.match(/require\(['"`]([^'"`]+)['"`]\)/)[1];
      if (!dep.startsWith('.')) deps.push(dep);
    });
    
    importMatches.forEach(match => {
      const dep = match.match(/from ['"`]([^'"`]+)['"`]/)[1];
      if (!dep.startsWith('.')) deps.push(dep);
    });
    
    return [...new Set(deps)];
  }

  extractDescription(content) {
    const lines = content.split('\n');
    
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      const line = lines[i].trim();
      if (line.startsWith('*') && line.includes('TOOL')) {
        return line.replace(/^\*\s*/, '').replace(/\*$/, '').trim();
      }
      if (line.startsWith('//') && line.toLowerCase().includes('tool')) {
        return line.replace(/^\/\/\s*/, '').trim();
      }
    }
    
    return 'No description found';
  }

  checkToolStatus(toolPath, content) {
    try {
      // Check if executable
      const stat = fs.statSync(toolPath);
      if (!(stat.mode & parseInt('111', 8))) {
        return 'not_executable';
      }
      
      // Check for syntax errors (basic)
      if (content.includes('SyntaxError') || content.includes('ReferenceError')) {
        return 'syntax_error';
      }
      
      // Check if it has main execution
      if (content.includes('if (require.main === module)') || 
          content.includes('if (import.meta.url === `file://${process.argv[1]}`')) {
        return 'executable';
      }
      
      return 'library';
    } catch (error) {
      return 'error';
    }
  }

  analyzeToolDependencies() {
    console.log('\n🔗 Analyzing tool dependencies...');
    
    const allDeps = new Set();
    const depGraph = {};
    
    this.tools.forEach(tool => {
      if (tool.dependencies) {
        tool.dependencies.forEach(dep => {
          allDeps.add(dep);
          
          if (!depGraph[tool.name]) depGraph[tool.name] = [];
          depGraph[tool.name].push(dep);
        });
      }
    });
    
    this.report.dependencies = {
      unique_dependencies: Array.from(allDeps),
      dependency_graph: depGraph,
      most_used: this.getMostUsedDependencies(allDeps)
    };
    
    console.log(`  📦 Found ${allDeps.size} unique dependencies`);
  }

  getMostUsedDependencies(deps) {
    const usage = {};
    
    this.tools.forEach(tool => {
      if (tool.dependencies) {
        tool.dependencies.forEach(dep => {
          usage[dep] = (usage[dep] || 0) + 1;
        });
      }
    });
    
    return Object.entries(usage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([dep, count]) => ({ dependency: dep, usage_count: count }));
  }

  generateReport() {
    console.log('\n📊 Generating tools report...');
    
    // Status summary
    const statusCounts = {};
    this.tools.forEach(tool => {
      statusCounts[tool.status] = (statusCounts[tool.status] || 0) + 1;
    });
    
    this.report.status = statusCounts;
    
    // Category summary
    Object.keys(this.report.categories).forEach(category => {
      console.log(`  📂 ${category}: ${this.report.categories[category].length} tools`);
    });
    
    // Save report
    fs.writeFileSync('reports/tools-comprehensive-report.json', JSON.stringify(this.report, null, 2));
    console.log('\n💾 Report saved to: reports/tools-comprehensive-report.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new ToolsAnalyzer();
  analyzer.analyze();
}