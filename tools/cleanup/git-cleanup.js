#!/usr/bin/env node
/**
 * GIT CLEANUP TOOL
 * Cleans branches, removes spam, organizes repository
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitCleanup {
  constructor() {
    this.spamPatterns = [
      /\s2\.md$/, /\s2$/, /duplicate/, /copy/, /backup-\d+/,
      /temp/, /tmp/, /test-/, /debug/, /spam/
    ];
    
    this.keepBranches = ['main', 'develop', 'clean-main'];
    
    this.junkFiles = [
      'pnpm-lock.yaml',
      '**/node_modules',
      '**/.DS_Store',
      '**/Thumbs.db',
      '**/*.log',
      '**/dist',
      '**/build'
    ];
  }

  cleanup() {
    console.log('🧹 Starting Git cleanup...\n');
    
    this.cleanBranches();
    this.removeJunkFiles();
    this.consolidateCommits();
    this.updateGitignore();
    
    console.log('\n✅ Git cleanup complete');
  }

  cleanBranches() {
    console.log('🌿 Cleaning Git branches...');
    
    try {
      // Get all branches
      const branches = execSync('git branch -a', { encoding: 'utf8' })
        .split('\n')
        .map(b => b.trim().replace(/^\*\s*/, ''))
        .filter(b => b && !b.startsWith('remotes/'));
      
      branches.forEach(branch => {
        if (!this.keepBranches.includes(branch) && this.isSpamBranch(branch)) {
          try {
            execSync(`git branch -D ${branch}`, { stdio: 'ignore' });
            console.log(`  ❌ Deleted branch: ${branch}`);
          } catch (error) {
            console.log(`  ⚠️  Could not delete: ${branch}`);
          }
        }
      });
      
      // Clean remote tracking branches
      execSync('git remote prune origin', { stdio: 'ignore' });
      console.log('  ✅ Pruned remote tracking branches');
      
    } catch (error) {
      console.log('  ⚠️  Branch cleanup failed');
    }
  }

  removeJunkFiles() {
    console.log('🗑️  Removing junk files...');
    
    // Remove duplicate markdown files
    const duplicateFiles = this.findDuplicateFiles();
    duplicateFiles.forEach(file => {
      try {
        fs.unlinkSync(file);
        console.log(`  ❌ Removed: ${file}`);
      } catch (error) {
        console.log(`  ⚠️  Could not remove: ${file}`);
      }
    });
    
    // Clean up specific junk
    this.junkFiles.forEach(pattern => {
      try {
        if (pattern.includes('*')) {
          // Use find for glob patterns
          const files = execSync(`find . -name "${pattern}" -type f`, { encoding: 'utf8' })
            .split('\n')
            .filter(f => f.trim());
          
          files.forEach(file => {
            try {
              fs.unlinkSync(file.trim());
              console.log(`  ❌ Removed: ${file.trim()}`);
            } catch (error) {
              // Skip
            }
          });
        } else if (fs.existsSync(pattern)) {
          fs.unlinkSync(pattern);
          console.log(`  ❌ Removed: ${pattern}`);
        }
      } catch (error) {
        // Skip
      }
    });
  }

  findDuplicateFiles() {
    const duplicates = [];
    
    const search = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !['node_modules', '.git'].includes(item)) {
            search(fullPath);
          } else if (stat.isFile() && this.isSpamFile(item)) {
            duplicates.push(fullPath);
          }
        });
      } catch (error) {
        // Skip
      }
    };
    
    search('.');
    return duplicates;
  }

  consolidateCommits() {
    console.log('📝 Consolidating commits...');
    
    try {
      // Add all changes
      execSync('git add .', { stdio: 'ignore' });
      
      // Commit cleanup
      execSync('git commit -m "🧹 Cathedral V1 cleanup: removed paid services, spam files, and junk branches"', { stdio: 'ignore' });
      
      console.log('  ✅ Committed cleanup changes');
    } catch (error) {
      console.log('  ℹ️  No changes to commit');
    }
  }

  updateGitignore() {
    console.log('📋 Updating .gitignore...');
    
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

# Spam patterns
**/duplicate*
**/copy*
**/backup-*
**/*\\ 2.*
**/*\\ 2
**/temp*
**/tmp*
**/test-*
**/debug*
**/spam*
`;

    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('  ✅ Updated .gitignore with free system rules');
  }

  isSpamBranch(branch) {
    return this.spamPatterns.some(pattern => pattern.test(branch));
  }

  isSpamFile(filename) {
    return this.spamPatterns.some(pattern => pattern.test(filename));
  }

  getRepoStatus() {
    console.log('📊 Repository Status:');
    
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      const lines = status.split('\n').filter(l => l.trim());
      
      console.log(`  Modified files: ${lines.filter(l => l.startsWith(' M')).length}`);
      console.log(`  New files: ${lines.filter(l => l.startsWith('??')).length}`);
      console.log(`  Deleted files: ${lines.filter(l => l.startsWith(' D')).length}`);
      
      const branches = execSync('git branch', { encoding: 'utf8' })
        .split('\n')
        .filter(b => b.trim())
        .length;
      
      console.log(`  Total branches: ${branches}`);
      
    } catch (error) {
      console.log('  ⚠️  Could not get repo status');
    }
  }
}

if (require.main === module) {
  const cleanup = new GitCleanup();
  cleanup.getRepoStatus();
  cleanup.cleanup();
  cleanup.getRepoStatus();
}