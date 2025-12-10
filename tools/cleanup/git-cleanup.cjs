#!/usr/bin/env node
/**
 * GIT CLEANUP TOOL
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
      'pnpm-lock.yaml'
    ];
  }

  cleanup() {
    console.log('🧹 Starting Git cleanup...\n');
    
    this.removeJunkFiles();
    this.updateGitignore();
    this.consolidateCommits();
    
    console.log('\n✅ Git cleanup complete');
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
    this.junkFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`  ❌ Removed: ${file}`);
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
      execSync('git commit -m "🧹 Cathedral V1 cleanup: removed paid services, spam files, and junk"', { stdio: 'ignore' });
      
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

  isSpamFile(filename) {
    return this.spamPatterns.some(pattern => pattern.test(filename));
  }
}

if (require.main === module) {
  const cleanup = new GitCleanup();
  cleanup.cleanup();
}