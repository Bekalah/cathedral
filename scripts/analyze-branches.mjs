#!/usr/bin/env node
/**
 * COMPREHENSIVE BRANCH ANALYSIS
 */

import fs from 'fs';
import { execSync } from 'child_process';

class BranchAnalyzer {
  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      local_branches: [],
      remote_branches: [],
      branch_status: {},
      duplicates: [],
      orphaned: [],
      spam: [],
      recommendations: []
    };
  }

  async analyze() {
    console.log('🌿 Analyzing Git branches...\n');
    
    this.analyzeBranches();
    this.detectDuplicates();
    this.findOrphaned();
    this.detectSpam();
    this.generateRecommendations();
    this.generateReport();
    
    return this.report;
  }

  analyzeBranches() {
    console.log('📊 Analyzing branch structure...');
    
    try {
      // Get all branches
      const allBranches = execSync('git branch -a', { encoding: 'utf8' })
        .split('\n')
        .map(b => b.trim().replace(/^\*\s*/, ''))
        .filter(b => b);
      
      allBranches.forEach(branch => {
        if (branch.startsWith('remotes/')) {
          this.analyzeRemoteBranch(branch);
        } else {
          this.analyzeLocalBranch(branch);
        }
      });
      
      console.log(`  🌿 Local branches: ${this.report.local_branches.length}`);
      console.log(`  🌐 Remote branches: ${this.report.remote_branches.length}`);
      
    } catch (error) {
      console.error('  ❌ Failed to analyze branches:', error.message);
    }
  }

  analyzeLocalBranch(branchName) {
    try {
      const branchInfo = {
        name: branchName,
        type: 'local',
        current: branchName.startsWith('*'),
        last_commit: this.getLastCommit(branchName),
        commit_count: this.getCommitCount(branchName),
        status: this.getBranchStatus(branchName),
        size: this.getBranchSize(branchName)
      };
      
      this.report.local_branches.push(branchInfo);
      
    } catch (error) {
      this.report.local_branches.push({
        name: branchName,
        type: 'local',
        status: 'error',
        error: error.message
      });
    }
  }

  analyzeRemoteBranch(branchName) {
    const cleanName = branchName.replace('remotes/', '');
    const [remote, ...nameParts] = cleanName.split('/');
    const actualName = nameParts.join('/');
    
    try {
      const branchInfo = {
        name: actualName,
        full_name: branchName,
        type: 'remote',
        remote: remote,
        last_commit: this.getLastCommit(branchName),
        status: 'remote'
      };
      
      this.report.remote_branches.push(branchInfo);
      
    } catch (error) {
      this.report.remote_branches.push({
        name: actualName,
        full_name: branchName,
        type: 'remote',
        remote: remote,
        status: 'error',
        error: error.message
      });
    }
  }

  getLastCommit(branchName) {
    try {
      const commit = execSync(`git log -1 --format="%H|%s|%an|%ad" ${branchName}`, { encoding: 'utf8' }).trim();
      const [hash, subject, author, date] = commit.split('|');
      
      return {
        hash: hash,
        subject: subject,
        author: author,
        date: date
      };
    } catch (error) {
      return null;
    }
  }

  getCommitCount(branchName) {
    try {
      return parseInt(execSync(`git rev-list --count ${branchName}`, { encoding: 'utf8' }).trim());
    } catch (error) {
      return 0;
    }
  }

  getBranchStatus(branchName) {
    try {
      // Check if merged
      const merged = execSync('git branch --merged', { encoding: 'utf8' })
        .split('\n')
        .some(b => b.trim().replace(/^\*\s*/, '') === branchName);
      
      if (merged) return 'merged';
      
      // Check if stale (no commits in 30 days)
      const lastCommitDate = execSync(`git log -1 --format="%at" ${branchName}`, { encoding: 'utf8' }).trim();
      const daysSinceLastCommit = (Date.now() / 1000 - parseInt(lastCommitDate)) / (24 * 60 * 60);
      
      if (daysSinceLastCommit > 30) return 'stale';
      if (daysSinceLastCommit > 7) return 'inactive';
      
      return 'active';
    } catch (error) {
      return 'unknown';
    }
  }

  getBranchSize(branchName) {
    try {
      const output = execSync(`git ls-tree -r -l ${branchName}`, { encoding: 'utf8' });
      const totalSize = output.split('\n')
        .filter(line => line.trim())
        .reduce((sum, line) => {
          const parts = line.split(/\s+/);
          const size = parseInt(parts[3]) || 0;
          return sum + size;
        }, 0);
      
      return totalSize;
    } catch (error) {
      return 0;
    }
  }

  detectDuplicates() {
    console.log('🔍 Detecting duplicate branches...');
    
    const branchContents = new Map();
    
    [...this.report.local_branches, ...this.report.remote_branches].forEach(branch => {
      if (branch.last_commit && branch.last_commit.hash) {
        const hash = branch.last_commit.hash;
        
        if (!branchContents.has(hash)) {
          branchContents.set(hash, []);
        }
        branchContents.get(hash).push(branch.name);
      }
    });
    
    branchContents.forEach((branches, hash) => {
      if (branches.length > 1) {
        this.report.duplicates.push({
          commit_hash: hash,
          branches: branches,
          count: branches.length
        });
        console.log(`  🔄 Duplicate: ${branches.join(', ')} (${hash.substring(0, 8)})`);
      }
    });
  }

  findOrphaned() {
    console.log('🔍 Finding orphaned branches...');
    
    this.report.local_branches.forEach(branch => {
      // Check if has remote tracking
      const hasRemote = this.report.remote_branches.some(remote => 
        remote.name === branch.name || remote.name.endsWith(`/${branch.name}`)
      );
      
      if (!hasRemote && branch.status === 'stale') {
        this.report.orphaned.push({
          name: branch.name,
          reason: 'No remote tracking and stale',
          last_commit: branch.last_commit
        });
        console.log(`  🏝️  Orphaned: ${branch.name}`);
      }
    });
  }

  detectSpam() {
    console.log('🔍 Detecting spam branches...');
    
    const spamPatterns = [
      /backup-\d+/, /temp/, /tmp/, /test-/, /debug/, /spam/,
      /\s2$/, /copy/, /duplicate/, /old/, /archive/
    ];
    
    [...this.report.local_branches, ...this.report.remote_branches].forEach(branch => {
      if (spamPatterns.some(pattern => pattern.test(branch.name))) {
        this.report.spam.push({
          name: branch.name,
          type: branch.type,
          reason: 'Matches spam pattern'
        });
        console.log(`  🗑️  Spam: ${branch.name}`);
      }
    });
  }

  generateRecommendations() {
    console.log('💡 Generating recommendations...');
    
    // Recommend deleting merged branches
    const mergedBranches = this.report.local_branches.filter(b => b.status === 'merged' && b.name !== 'main');
    if (mergedBranches.length > 0) {
      this.report.recommendations.push({
        action: 'delete_merged',
        branches: mergedBranches.map(b => b.name),
        reason: 'Already merged into main'
      });
    }
    
    // Recommend deleting stale branches
    const staleBranches = this.report.local_branches.filter(b => b.status === 'stale');
    if (staleBranches.length > 0) {
      this.report.recommendations.push({
        action: 'delete_stale',
        branches: staleBranches.map(b => b.name),
        reason: 'No activity for 30+ days'
      });
    }
    
    // Recommend deleting spam branches
    if (this.report.spam.length > 0) {
      this.report.recommendations.push({
        action: 'delete_spam',
        branches: this.report.spam.map(b => b.name),
        reason: 'Matches spam patterns'
      });
    }
    
    console.log(`  💡 Generated ${this.report.recommendations.length} recommendations`);
  }

  generateReport() {
    console.log('\n📊 Generating branch report...');
    
    // Status summary
    const statusCounts = {};
    this.report.local_branches.forEach(branch => {
      statusCounts[branch.status] = (statusCounts[branch.status] || 0) + 1;
    });
    
    this.report.branch_status = statusCounts;
    
    console.log('  📊 Branch Status:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`    ${status}: ${count}`);
    });
    
    // Save report
    fs.writeFileSync('reports/branches-comprehensive-report.json', JSON.stringify(this.report, null, 2));
    console.log('\n💾 Report saved to: reports/branches-comprehensive-report.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new BranchAnalyzer();
  analyzer.analyze();
}