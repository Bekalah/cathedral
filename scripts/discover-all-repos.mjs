#!/usr/bin/env node
/**
 * REPOSITORY DISCOVERY AND MAPPING
 */

import fs from 'fs';
import { execSync } from 'child_process';

class RepoDiscovery {
  constructor() {
    this.targetRepos = [
      'cathedral', 'cathedral-archive', 'cathedral-connection-map',
      'cathedral-integration-workspace', 'cathedral-master', 'cathedral-minimal',
      'cathedral-research', 'circuitum99', 'codex-14499', 'cosmogenesis-learning-engine',
      'stone-grimoire', 'liber-arcanae', 'magical-mystery-house', 'tesseract-bridge',
      'master-catalog-browser'
    ];
    
    this.discovered = {
      local: [],
      remote: [],
      missing: [],
      cloned: []
    };
  }

  async discover() {
    console.log('🔍 Discovering Cathedral repositories...\n');
    
    this.checkLocalRepos();
    this.checkRemoteRepos();
    this.cloneMissingRepos();
    this.generateRepoMap();
    
    return this.discovered;
  }

  checkLocalRepos() {
    console.log('📁 Checking local repositories...');
    
    const basePaths = [
      '/Users/rebeccalemke/Documents',
      '/Users/rebeccalemke/Documents/cathedral/external-repos',
      '/Users/rebeccalemke/Documents/Developer'
    ];
    
    basePaths.forEach(basePath => {
      if (fs.existsSync(basePath)) {
        const items = fs.readdirSync(basePath);
        
        items.forEach(item => {
          if (this.targetRepos.includes(item)) {
            const fullPath = `${basePath}/${item}`;
            if (fs.existsSync(`${fullPath}/.git`)) {
              this.discovered.local.push({
                name: item,
                path: fullPath,
                status: 'found'
              });
              console.log(`  ✅ Found: ${item} at ${fullPath}`);
            }
          }
        });
      }
    });
  }

  checkRemoteRepos() {
    console.log('\n🌐 Checking remote repositories...');
    
    try {
      const remotes = execSync('git remote -v', { encoding: 'utf8' });
      console.log('  Current remotes:', remotes.split('\n').filter(l => l.trim()));
    } catch (error) {
      console.log('  ⚠️  No git remotes found');
    }
    
    // Check GitHub for each target repo
    this.targetRepos.forEach(repo => {
      const githubUrl = `https://github.com/Bekalah/${repo}`;
      
      try {
        execSync(`curl -s -o /dev/null -w "%{http_code}" ${githubUrl}`, { 
          encoding: 'utf8',
          timeout: 5000
        });
        
        this.discovered.remote.push({
          name: repo,
          url: `${githubUrl}.git`,
          status: 'exists'
        });
        console.log(`  🌐 Remote exists: ${repo}`);
      } catch (error) {
        console.log(`  ❌ Remote not found: ${repo}`);
      }
    });
  }

  cloneMissingRepos() {
    console.log('\n📥 Cloning missing repositories...');
    
    const localNames = this.discovered.local.map(r => r.name);
    const remoteNames = this.discovered.remote.map(r => r.name);
    
    const missing = remoteNames.filter(name => !localNames.includes(name));
    
    if (missing.length === 0) {
      console.log('  ✅ All repositories are local');
      return;
    }
    
    const cloneDir = '/Users/rebeccalemke/Documents/cathedral/external-repos';
    if (!fs.existsSync(cloneDir)) {
      fs.mkdirSync(cloneDir, { recursive: true });
    }
    
    missing.forEach(repoName => {
      const remote = this.discovered.remote.find(r => r.name === repoName);
      if (remote) {
        try {
          console.log(`  📥 Cloning ${repoName}...`);
          execSync(`git clone ${remote.url}`, { 
            cwd: cloneDir,
            stdio: 'inherit'
          });
          
          this.discovered.cloned.push({
            name: repoName,
            path: `${cloneDir}/${repoName}`,
            url: remote.url
          });
          
          console.log(`  ✅ Cloned: ${repoName}`);
        } catch (error) {
          console.log(`  ❌ Failed to clone ${repoName}: ${error.message}`);
          this.discovered.missing.push(repoName);
        }
      }
    });
  }

  generateRepoMap() {
    console.log('\n📊 Generating repository map...');
    
    const allRepos = [
      ...this.discovered.local,
      ...this.discovered.cloned
    ];
    
    const repoMap = {
      timestamp: new Date().toISOString(),
      total_repos: allRepos.length,
      repositories: {},
      missing: this.discovered.missing,
      summary: {
        local: this.discovered.local.length,
        cloned: this.discovered.cloned.length,
        missing: this.discovered.missing.length
      }
    };
    
    allRepos.forEach(repo => {
      repoMap.repositories[repo.name] = {
        name: repo.name,
        path: repo.path,
        github_url: `https://github.com/Bekalah/${repo.name}`,
        status: repo.status || 'cloned'
      };
    });
    
    fs.writeFileSync('reports/repository-map.json', JSON.stringify(repoMap, null, 2));
    
    console.log(`\n📊 Repository Summary:`);
    console.log(`  Found locally: ${this.discovered.local.length}`);
    console.log(`  Cloned: ${this.discovered.cloned.length}`);
    console.log(`  Missing: ${this.discovered.missing.length}`);
    console.log(`  Total available: ${allRepos.length}`);
    
    console.log('\n💾 Repository map saved to: reports/repository-map.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const discovery = new RepoDiscovery();
  discovery.discover();
}