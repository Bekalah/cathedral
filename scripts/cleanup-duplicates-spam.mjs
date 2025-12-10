#!/usr/bin/env node
/**
 * CLEANUP DUPLICATES AND SPAM
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class CleanupManager {
  constructor() {
    this.reports = this.loadReports();
    this.cleaned = {
      duplicates: 0,
      spam: 0,
      branches: 0,
      conflicts: 0,
      space_saved: 0
    };
  }

  loadReports() {
    const reports = {};
    
    try {
      reports.duplicates = JSON.parse(fs.readFileSync('reports/duplicates-and-spam.json', 'utf8'));
      reports.branches = JSON.parse(fs.readFileSync('reports/branches-comprehensive-report.json', 'utf8'));
    } catch (error) {
      console.error('❌ Could not load reports. Run analysis first.');
      process.exit(1);
    }
    
    return reports;
  }

  async cleanup() {
    console.log('🧹 CATHEDRAL CLEANUP STARTING\n');
    console.log('=' .repeat(50));
    
    await this.cleanupDuplicateFiles();
    await this.cleanupSpamFiles();
    await this.cleanupSpamBranches();
    await this.fixMergeConflicts();
    await this.updateGitignore();
    
    this.generateCleanupReport();
    
    console.log('\n🎉 Cleanup complete!');
    console.log(`💾 Space saved: ${this.formatSize(this.cleaned.space_saved)}`);
  }

  async cleanupDuplicateFiles() {
    console.log('🔄 Cleaning duplicate files...\n');
    
    const duplicates = this.reports.duplicates.duplicate_files || [];
    
    for (const duplicate of duplicates) {
      console.log(`\n📁 Processing: ${duplicate.files[0]}`);
      console.log(`   Duplicates: ${duplicate.count}`);
      console.log(`   Space to save: ${this.formatSize(duplicate.wasted_space)}`);
      
      // Keep the first file, remove the rest
      const filesToRemove = duplicate.files.slice(1);
      
      for (const file of filesToRemove) {
        try {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`   ❌ Removed: ${file}`);
            this.cleaned.duplicates++;
            this.cleaned.space_saved += Math.floor(duplicate.size_each);
          }
        } catch (error) {
          console.log(`   ⚠️  Could not remove: ${file}`);
        }
      }
    }
    
    console.log(`\n✅ Removed ${this.cleaned.duplicates} duplicate files`);
  }

  async cleanupSpamFiles() {
    console.log('\n🗑️  Cleaning spam files...\n');
    
    const spamFiles = this.reports.duplicates.spam_files || [];
    
    for (const spam of spamFiles) {
      try {
        if (fs.existsSync(spam.path)) {
          fs.unlinkSync(spam.path);
          console.log(`❌ Removed spam: ${spam.path} (${spam.reason})`);
          this.cleaned.spam++;
          this.cleaned.space_saved += spam.size;
        }
      } catch (error) {
        console.log(`⚠️  Could not remove: ${spam.path}`);
      }
    }
    
    console.log(`\n✅ Removed ${this.cleaned.spam} spam files`);
  }

  async cleanupSpamBranches() {
    console.log('\n🌿 Cleaning spam branches...\n');
    
    const spamBranches = this.reports.branches.spam || [];
    const recommendations = this.reports.branches.recommendations || [];
    
    // Delete spam branches
    for (const spam of spamBranches) {
      if (spam.type === 'local') {
        try {
          execSync(`git branch -D "${spam.name}"`, { stdio: 'ignore' });
          console.log(`❌ Deleted spam branch: ${spam.name}`);
          this.cleaned.branches++;
        } catch (error) {
          console.log(`⚠️  Could not delete branch: ${spam.name}`);
        }
      }
    }
    
    // Process recommendations
    for (const rec of recommendations) {
      if (rec.action === 'delete_stale' || rec.action === 'delete_merged') {
        for (const branch of rec.branches) {
          if (branch !== 'main' && branch !== 'develop') {
            try {
              execSync(`git branch -D "${branch}"`, { stdio: 'ignore' });
              console.log(`❌ Deleted ${rec.action.replace('delete_', '')} branch: ${branch}`);
              this.cleaned.branches++;
            } catch (error) {
              console.log(`⚠️  Could not delete branch: ${branch}`);
            }
          }
        }
      }
    }
    
    console.log(`\n✅ Cleaned ${this.cleaned.branches} branches`);
  }

  async fixMergeConflicts() {
    console.log('\n⚔️  Fixing merge conflicts...\n');
    
    const conflicts = this.reports.duplicates.merge_conflicts || [];
    
    for (const conflict of conflicts) {
      try {
        if (fs.existsSync(conflict.path)) {
          let content = fs.readFileSync(conflict.path, 'utf8');
          
          // Remove conflict markers
          content = content
            .replace(/<<<<<<< .*\n/g, '')
            .replace(/======= .*\n/g, '')
            .replace(/>>>>>>> .*\n/g, '');
          
          fs.writeFileSync(conflict.path, content);
          console.log(`✅ Fixed merge conflict: ${conflict.path}`);
          this.cleaned.conflicts++;
        }
      } catch (error) {
        console.log(`⚠️  Could not fix conflict: ${conflict.path}`);
      }
    }
    
    console.log(`\n✅ Fixed ${this.cleaned.conflicts} merge conflicts`);
  }

  async updateGitignore() {
    console.log('\n📋 Updating .gitignore...\n');
    
    const gitignoreContent = `# Cathedral V1 - Free System Only
# Dependencies
node_modules/
pnpm-lock.yaml
package-lock.json
yarn.lock

# Build outputs
dist/
build/
.next/
.turbo/

# Environment
.env
.env.local
.env.production

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Temporary
tmp/
temp/
*.tmp

# Paid services (blocked)
vercel.json
netlify.toml
Dockerfile
docker-compose.yml
azure-pipelines.yml
cloudflare.json
.vercelignore

# AI contamination quarantine
quarantine/

# Spam patterns (auto-removed)
**/*\\ 2.*
**/*\\ 2
**/duplicate*
**/copy*
**/backup-*
**/temp*
**/tmp*
**/test-*
**/debug*
**/spam*
**/old*
**/archive*
*.bak
*~

# Large files (use Git LFS)
*.png
*.jpg
*.jpeg
*.gif
*.mp4
*.mov
*.zip
*.tar.gz

# Python cache
__pycache__/
*.pyc
*.pyo

# VS Code extensions
*.vsix
`;

    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ Updated .gitignore with comprehensive rules');
  }

  generateCleanupReport() {
    console.log('\n📊 CLEANUP SUMMARY');
    console.log('=' .repeat(30));
    console.log(`🔄 Duplicate files removed: ${this.cleaned.duplicates}`);
    console.log(`🗑️  Spam files removed: ${this.cleaned.spam}`);
    console.log(`🌿 Branches cleaned: ${this.cleaned.branches}`);
    console.log(`⚔️  Merge conflicts fixed: ${this.cleaned.conflicts}`);
    console.log(`💾 Total space saved: ${this.formatSize(this.cleaned.space_saved)}`);
    
    const cleanupReport = {
      timestamp: new Date().toISOString(),
      cleaned: this.cleaned,
      actions_taken: [
        'Removed duplicate files (kept first occurrence)',
        'Deleted spam files matching patterns',
        'Cleaned stale and spam git branches',
        'Fixed merge conflict markers',
        'Updated .gitignore with comprehensive rules'
      ],
      recommendations: [
        'Commit cleanup changes',
        'Run git gc to reclaim space',
        'Push cleaned branches to remote',
        'Review remaining large files for Git LFS'
      ]
    };
    
    fs.writeFileSync('reports/cleanup-report.json', JSON.stringify(cleanupReport, null, 2));
    console.log('\n💾 Cleanup report saved to: reports/cleanup-report.json');
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
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cleanup = new CleanupManager();
  
  console.log('⚠️  WARNING: This will permanently delete files and branches!');
  console.log('📋 Review reports first: reports/duplicates-and-spam.json');
  console.log('🔄 Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  setTimeout(() => {
    cleanup.cleanup();
  }, 5000);
}