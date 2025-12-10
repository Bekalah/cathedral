#!/usr/bin/env node
/**
 * COMPREHENSIVE APPS ANALYSIS
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class AppsAnalyzer {
  constructor() {
    this.apps = [];
    this.appsDir = 'apps-clean';
    this.report = {
      timestamp: new Date().toISOString(),
      total_apps: 0,
      apps: {},
      technologies: {},
      status: {},
      dependencies: [],
      issues: []
    };
  }

  async analyze() {
    console.log('📱 Analyzing all apps...\n');
    
    this.scanAppsDirectory();
    this.analyzeAppTechnologies();
    this.checkAppStatus();
    this.generateReport();
    
    return this.report;
  }

  scanAppsDirectory() {
    console.log('📁 Scanning apps directory...');
    
    if (!fs.existsSync(this.appsDir)) {
      console.log('  ⚠️  Apps directory not found');
      return;
    }

    const apps = fs.readdirSync(this.appsDir);
    
    apps.forEach(appName => {
      const appPath = path.join(this.appsDir, appName);
      if (!fs.statSync(appPath).isDirectory()) return;
      
      console.log(`  📱 App: ${appName}`);
      const appInfo = this.analyzeApp(appPath, appName);
      
      this.apps.push(appInfo);
      this.report.apps[appName] = appInfo;
      console.log(`    Status: ${appInfo.status}`);
    });
    
    this.report.total_apps = this.apps.length;
  }

  analyzeApp(appPath, appName) {
    const appInfo = {
      name: appName,
      path: appPath,
      type: 'unknown',
      technologies: [],
      files: [],
      dependencies: [],
      status: 'unknown',
      size: 0,
      entry_points: [],
      assets: [],
      issues: []
    };

    try {
      // Scan app files
      const files = this.scanAppFiles(appPath);
      appInfo.files = files;
      appInfo.size = files.reduce((sum, file) => sum + file.size, 0);
      
      // Detect app type and technologies
      appInfo.type = this.detectAppType(files);
      appInfo.technologies = this.detectTechnologies(files);
      
      // Find entry points
      appInfo.entry_points = this.findEntryPoints(files);
      
      // Find assets
      appInfo.assets = this.findAssets(files);
      
      // Check package.json if exists
      const packagePath = path.join(appPath, 'package.json');
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        appInfo.dependencies = Object.keys(pkg.dependencies || {});
        appInfo.scripts = pkg.scripts || {};
      }
      
      // Determine status
      appInfo.status = this.determineAppStatus(appInfo);
      
    } catch (error) {
      appInfo.status = 'error';
      appInfo.issues.push(`Analysis error: ${error.message}`);
    }

    return appInfo;
  }

  scanAppFiles(appPath) {
    const files = [];
    
    const scan = (dir, relativePath = '') => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          if (item.startsWith('.') || item === 'node_modules') return;
          
          const fullPath = path.join(dir, item);
          const relPath = path.join(relativePath, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath, relPath);
          } else {
            files.push({
              name: item,
              path: relPath,
              fullPath: fullPath,
              extension: path.extname(item),
              size: stat.size,
              modified: stat.mtime.toISOString()
            });
          }
        });
      } catch (error) {
        // Skip unreadable directories
      }
    };
    
    scan(appPath);
    return files;
  }

  detectAppType(files) {
    const hasFile = (name) => files.some(f => f.name === name);
    const hasExt = (ext) => files.some(f => f.extension === ext);
    
    if (hasFile('index.html')) return 'web_app';
    if (hasFile('package.json') && hasExt('.js')) return 'node_app';
    if (hasFile('package.json') && hasExt('.ts')) return 'typescript_app';
    if (hasExt('.py')) return 'python_app';
    if (hasFile('project.godot')) return 'godot_app';
    if (hasExt('.cs')) return 'csharp_app';
    
    return 'static_files';
  }

  detectTechnologies(files) {
    const technologies = new Set();
    
    files.forEach(file => {
      const content = this.readFileContent(file.fullPath);
      if (!content) return;
      
      // Web technologies
      if (content.includes('React')) technologies.add('React');
      if (content.includes('Vue')) technologies.add('Vue');
      if (content.includes('Angular')) technologies.add('Angular');
      if (content.includes('Three.js') || content.includes('THREE.')) technologies.add('Three.js');
      if (content.includes('WebGL')) technologies.add('WebGL');
      if (content.includes('Canvas')) technologies.add('Canvas');
      
      // CSS frameworks
      if (content.includes('bootstrap')) technologies.add('Bootstrap');
      if (content.includes('tailwind')) technologies.add('Tailwind');
      
      // Cathedral specific
      if (content.includes('cathedral')) technologies.add('Cathedral');
      if (content.includes('arcana')) technologies.add('Tarot System');
      if (content.includes('shader')) technologies.add('Shaders');
      if (content.includes('frequency')) technologies.add('Audio Processing');
      
      // File type technologies
      if (file.extension === '.ts') technologies.add('TypeScript');
      if (file.extension === '.js') technologies.add('JavaScript');
      if (file.extension === '.py') technologies.add('Python');
      if (file.extension === '.cs') technologies.add('C#');
      if (file.extension === '.html') technologies.add('HTML');
      if (file.extension === '.css') technologies.add('CSS');
    });
    
    return Array.from(technologies);
  }

  findEntryPoints(files) {
    const entryPoints = [];
    
    files.forEach(file => {
      if (file.name === 'index.html' || 
          file.name === 'main.js' || 
          file.name === 'app.js' ||
          file.name === 'index.js' ||
          file.name === 'main.py') {
        entryPoints.push(file.path);
      }
    });
    
    return entryPoints;
  }

  findAssets(files) {
    const assetExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', 
                      '.mp3', '.wav', '.ogg', '.mp4', '.webm',
                      '.woff', '.woff2', '.ttf', '.otf'];
    
    return files
      .filter(file => assetExts.includes(file.extension))
      .map(file => ({
        path: file.path,
        type: this.getAssetType(file.extension),
        size: file.size
      }));
  }

  getAssetType(ext) {
    const typeMap = {
      '.png': 'image', '.jpg': 'image', '.jpeg': 'image', '.gif': 'image', '.svg': 'image', '.ico': 'image',
      '.mp3': 'audio', '.wav': 'audio', '.ogg': 'audio',
      '.mp4': 'video', '.webm': 'video',
      '.woff': 'font', '.woff2': 'font', '.ttf': 'font', '.otf': 'font'
    };
    return typeMap[ext] || 'unknown';
  }

  readFileContent(filePath) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > 100000) return null; // Skip large files
      
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return null;
    }
  }

  determineAppStatus(appInfo) {
    if (appInfo.issues.length > 0) return 'error';
    if (appInfo.entry_points.length === 0) return 'incomplete';
    if (appInfo.type === 'unknown') return 'unknown';
    if (appInfo.files.length === 0) return 'empty';
    
    return 'ready';
  }

  analyzeAppTechnologies() {
    console.log('\n🔧 Analyzing app technologies...');
    
    const techUsage = {};
    
    this.apps.forEach(app => {
      app.technologies.forEach(tech => {
        if (!techUsage[tech]) techUsage[tech] = [];
        techUsage[tech].push(app.name);
      });
    });
    
    this.report.technologies = Object.entries(techUsage)
      .sort(([,a], [,b]) => b.length - a.length)
      .reduce((obj, [tech, apps]) => {
        obj[tech] = { usage_count: apps.length, apps: apps };
        return obj;
      }, {});
    
    console.log(`  🔧 Found ${Object.keys(techUsage).length} technologies`);
  }

  checkAppStatus() {
    console.log('\n📊 Checking app status...');
    
    const statusCounts = {};
    this.apps.forEach(app => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });
    
    this.report.status = statusCounts;
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} apps`);
    });
  }

  generateReport() {
    console.log('\n📊 Generating apps report...');
    
    // Calculate total size
    const totalSize = this.apps.reduce((sum, app) => sum + app.size, 0);
    this.report.total_size = totalSize;
    
    console.log(`  📱 Total apps: ${this.report.total_apps}`);
    console.log(`  💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Save report
    fs.writeFileSync('reports/apps-comprehensive-report.json', JSON.stringify(this.report, null, 2));
    console.log('\n💾 Report saved to: reports/apps-comprehensive-report.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new AppsAnalyzer();
  analyzer.analyze();
}