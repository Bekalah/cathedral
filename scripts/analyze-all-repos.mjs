#!/usr/bin/env node
/**
 * ANALYZE ALL REPOSITORIES
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class AllReposAnalyzer {
  constructor() {
    this.repos = [];
    this.workspacePaths = [
      '/Users/rebeccalemke/Documents/cathedral',
      '/Users/rebeccalemke/Documents/cathedral-backup-20251115',
      '/Users/rebeccalemke/Documents/Developer/cathedral-research',
      '/Users/rebeccalemke/Documents/Library/Mobile Documents/com~apple~CloudDocs/CATHEDRAL-SORT THROUGH',
      '/Users/rebeccalemke/Documents/cathedral-real.worktrees/main'
    ];
    
    this.report = {
      timestamp: new Date().toISOString(),
      total_repos: 0,
      repositories: {},
      connections: [],
      duplicates: [],
      status_summary: {}
    };
  }

  async analyze() {
    console.log('🔍 Analyzing all Cathedral repositories...\n');
    
    this.scanAllRepos();
    this.analyzeConnections();
    this.detectCrossRepoDuplicates();
    this.generateReport();
    
    return this.report;
  }

  scanAllRepos() {
    console.log('📁 Scanning workspace paths...');
    
    this.workspacePaths.forEach(workspacePath => {
      if (fs.existsSync(workspacePath)) {
        console.log(`\n📂 Analyzing: ${workspacePath}`);
        const repoInfo = this.analyzeRepository(workspacePath);
        this.repos.push(repoInfo);
        this.report.repositories[path.basename(workspacePath)] = repoInfo;
      } else {
        console.log(`⚠️  Path not found: ${workspacePath}`);
      }
    });
    
    // Scan for nested repos
    this.scanNestedRepos('/Users/rebeccalemke/Documents/cathedral');
    
    this.report.total_repos = this.repos.length;
  }

  analyzeRepository(repoPath) {
    const repoInfo = {
      name: path.basename(repoPath),
      path: repoPath,
      type: 'unknown',
      git_status: 'unknown',
      branches: [],
      remotes: [],
      size: 0,
      files: 0,
      packages: [],
      apps: [],
      tools: [],
      issues: []
    };

    try {
      // Check if it's a git repo
      if (fs.existsSync(path.join(repoPath, '.git'))) {
        repoInfo.type = 'git_repository';
        repoInfo.git_status = this.getGitStatus(repoPath);
        repoInfo.branches = this.getGitBranches(repoPath);
        repoInfo.remotes = this.getGitRemotes(repoPath);
      } else {
        repoInfo.type = 'directory';
      }

      // Analyze structure
      const stats = this.getDirectoryStats(repoPath);
      repoInfo.size = stats.size;
      repoInfo.files = stats.files;

      // Find packages
      repoInfo.packages = this.findPackages(repoPath);
      
      // Find apps
      repoInfo.apps = this.findApps(repoPath);
      
      // Find tools
      repoInfo.tools = this.findTools(repoPath);

      console.log(`  📊 ${repoInfo.name}: ${repoInfo.type}, ${repoInfo.files} files, ${this.formatSize(repoInfo.size)}`);
      
    } catch (error) {
      repoInfo.issues.push(`Analysis error: ${error.message}`);
      console.log(`  ❌ Error analyzing ${repoInfo.name}: ${error.message}`);
    }

    return repoInfo;
  }

  scanNestedRepos(basePath) {
    console.log('\n🔍 Scanning for nested repositories...');
    
    const nestedRepoDirs = [
      'cosmogenesis-learning-engine',
      'stone-grimoire', 
      'liber-arcanae',
      'external-repos'
    ];

    nestedRepoDirs.forEach(dir => {
      const nestedPath = path.join(basePath, dir);
      if (fs.existsSync(nestedPath) && fs.existsSync(path.join(nestedPath, '.git'))) {
        console.log(`  📂 Found nested repo: ${dir}`);
        const repoInfo = this.analyzeRepository(nestedPath);
        repoInfo.type = 'nested_repository';
        this.repos.push(repoInfo);
        this.report.repositories[dir] = repoInfo;
      }
    });
  }

  getGitStatus(repoPath) {
    try {
      const status = execSync('git status --porcelain', { 
        cwd: repoPath, 
        encoding: 'utf8' 
      });
      
      if (status.trim() === '') return 'clean';
      
      const lines = status.split('\n').filter(l => l.trim());
      const modified = lines.filter(l => l.startsWith(' M')).length;
      const untracked = lines.filter(l => l.startsWith('??')).length;
      
      return `${modified} modified, ${untracked} untracked`;
    } catch (error) {
      return 'error';
    }
  }

  getGitBranches(repoPath) {
    try {
      const branches = execSync('git branch -a', { 
        cwd: repoPath, 
        encoding: 'utf8' 
      }).split('\n')
        .map(b => b.trim().replace(/^\*\s*/, ''))
        .filter(b => b);
      
      return branches;
    } catch (error) {
      return [];
    }
  }

  getGitRemotes(repoPath) {
    try {
      const remotes = execSync('git remote -v', { 
        cwd: repoPath, 
        encoding: 'utf8' 
      }).split('\n')
        .filter(l => l.trim())
        .map(l => {
          const [name, url] = l.split('\t');
          return { name, url: url.split(' ')[0] };
        });
      
      return remotes;
    } catch (error) {
      return [];
    }
  }

  getDirectoryStats(dirPath) {
    let totalSize = 0;
    let totalFiles = 0;

    const scan = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          if (item.startsWith('.') && !['gitignore', '.env.example'].includes(item)) return;
          if (['node_modules', 'dist', 'build'].includes(item)) return;
          
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else {
            totalSize += stat.size;
            totalFiles++;
          }
        });
      } catch (error) {
        // Skip unreadable directories
      }
    };

    scan(dirPath);
    return { size: totalSize, files: totalFiles };
  }

  findPackages(repoPath) {
    const packages = [];
    const packagesDir = path.join(repoPath, 'packages');
    
    if (fs.existsSync(packagesDir)) {
      try {
        const items = fs.readdirSync(packagesDir);
        items.forEach(item => {
          const packagePath = path.join(packagesDir, item);
          if (fs.statSync(packagePath).isDirectory()) {
            packages.push({
              name: item,
              path: packagePath,
              has_package_json: fs.existsSync(path.join(packagePath, 'package.json'))
            });
          }
        });
      } catch (error) {
        // Skip
      }
    }
    
    return packages;
  }

  findApps(repoPath) {
    const apps = [];
    const appsDirs = ['apps', 'apps-clean'];
    
    appsDirs.forEach(appsDir => {
      const appsPath = path.join(repoPath, appsDir);
      if (fs.existsSync(appsPath)) {
        try {
          const items = fs.readdirSync(appsPath);
          items.forEach(item => {
            const appPath = path.join(appsPath, item);
            if (fs.statSync(appPath).isDirectory()) {
              apps.push({
                name: item,
                path: appPath,
                directory: appsDir,
                has_index: fs.existsSync(path.join(appPath, 'index.html')) || 
                          fs.existsSync(path.join(appPath, 'index.js'))
              });
            }
          });
        } catch (error) {
          // Skip
        }
      }
    });
    
    return apps;
  }

  findTools(repoPath) {
    const tools = [];
    const toolsPath = path.join(repoPath, 'tools');
    
    if (fs.existsSync(toolsPath)) {
      try {
        const scan = (dir, category = '') => {
          const items = fs.readdirSync(dir);
          items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
              scan(fullPath, item);
            } else {
              tools.push({
                name: item,
                path: fullPath,
                category: category,
                executable: (stat.mode & parseInt('111', 8)) !== 0
              });
            }
          });
        };
        
        scan(toolsPath);
      } catch (error) {
        // Skip
      }
    }
    
    return tools;
  }

  analyzeConnections() {
    console.log('\n🔗 Analyzing repository connections...');
    
    this.repos.forEach(repo => {
      repo.remotes.forEach(remote => {
        // Check if remote points to another repo in our workspace
        const connection = this.findConnection(remote.url);
        if (connection) {
          this.report.connections.push({
            from: repo.name,
            to: connection,
            type: 'git_remote',
            url: remote.url
          });
          console.log(`  🔗 ${repo.name} -> ${connection}`);
        }
      });
    });
  }

  findConnection(url) {
    const repoNames = [
      'cathedral', 'cosmogenesis-learning-engine', 'circuitum99',
      'stone-cathedral', 'liber-arcanae', 'codex-144-99', 'cathedral-research'
    ];
    
    return repoNames.find(name => url.includes(name));
  }

  detectCrossRepoDuplicates() {
    console.log('\n🔄 Detecting cross-repository duplicates...');
    
    const filesByName = new Map();
    
    this.repos.forEach(repo => {
      // Check for common duplicate files
      const commonFiles = [
        'package.json', 'tsconfig.json', 'README.md', 
        'LICENSE', '.gitignore', 'turbo.json'
      ];
      
      commonFiles.forEach(fileName => {
        const filePath = path.join(repo.path, fileName);
        if (fs.existsSync(filePath)) {
          if (!filesByName.has(fileName)) {
            filesByName.set(fileName, []);
          }
          filesByName.get(fileName).push({
            repo: repo.name,
            path: filePath
          });
        }
      });
    });
    
    filesByName.forEach((locations, fileName) => {
      if (locations.length > 1) {
        this.report.duplicates.push({
          file: fileName,
          locations: locations,
          count: locations.length
        });
        console.log(`  🔄 ${fileName} found in ${locations.length} repos`);
      }
    });
  }

  formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  generateReport() {
    console.log('\n📊 Generating all repositories report...');
    
    // Status summary
    const statusCounts = {};
    this.repos.forEach(repo => {
      statusCounts[repo.type] = (statusCounts[repo.type] || 0) + 1;
    });
    
    this.report.status_summary = statusCounts;
    
    console.log(`\n📊 Repository Summary:`);
    console.log(`  Total repositories: ${this.report.total_repos}`);
    Object.entries(statusCounts).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    console.log(`  Connections found: ${this.report.connections.length}`);
    console.log(`  Cross-repo duplicates: ${this.report.duplicates.length}`);
    
    // Save report
    fs.writeFileSync('reports/all-repositories-report.json', JSON.stringify(this.report, null, 2));
    console.log('\n💾 Report saved to: reports/all-repositories-report.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new AllReposAnalyzer();
  analyzer.analyze();
}