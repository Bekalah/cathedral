#!/usr/bin/env node
/**
 * REMOVE PAID SERVICES CLEANUP TOOL
 */

const fs = require('fs');
const path = require('path');

class PaidServiceRemover {
  constructor() {
    this.paidServices = [
      'azure', 'vercel', 'cloudflare', 'docker', 'aws', 'gcp', 'heroku',
      'netlify', 'firebase', 'supabase', 'planetscale', 'railway'
    ];
    
    this.paidPackages = [
      '@azure/', '@vercel/', '@cloudflare/', 'docker', 'aws-sdk',
      '@aws-sdk/', '@google-cloud/', 'firebase', 'supabase'
    ];
  }

  cleanup() {
    console.log('🧹 Removing paid service dependencies...\n');
    
    this.cleanPackageFiles();
    this.cleanConfigFiles();
    this.cleanAgentResponses();
    this.updateToFreeAlternatives();
    
    console.log('\n✅ Paid service cleanup complete');
  }

  cleanPackageFiles() {
    console.log('📦 Cleaning package.json files...');
    
    const packageFiles = this.findFiles('package.json');
    
    packageFiles.forEach(file => {
      try {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        let modified = false;
        
        ['dependencies', 'devDependencies'].forEach(depType => {
          if (content[depType]) {
            Object.keys(content[depType]).forEach(pkg => {
              if (this.isPaidPackage(pkg)) {
                delete content[depType][pkg];
                modified = true;
                console.log(`  ❌ Removed ${pkg} from ${file}`);
              }
            });
          }
        });
        
        if (modified) {
          fs.writeFileSync(file, JSON.stringify(content, null, 2));
        }
      } catch (error) {
        console.warn(`  ⚠️  Could not process ${file}`);
      }
    });
  }

  cleanConfigFiles() {
    console.log('⚙️  Cleaning configuration files...');
    
    const configFiles = [
      'vercel.json', 'netlify.toml', 'Dockerfile', 'docker-compose.yml',
      'azure-pipelines.yml', 'cloudflare.json', '.vercelignore'
    ];
    
    configFiles.forEach(pattern => {
      const files = this.findFiles(pattern);
      files.forEach(file => {
        fs.unlinkSync(file);
        console.log(`  ❌ Removed ${file}`);
      });
    });
  }

  cleanAgentResponses() {
    console.log('🤖 Cleaning agent response files...');
    
    const agentDir = path.join(process.cwd(), 'agent_responses');
    if (fs.existsSync(agentDir)) {
      fs.rmSync(agentDir, { recursive: true, force: true });
      console.log('  ❌ Removed agent_responses directory');
    }
  }

  updateToFreeAlternatives() {
    console.log('🆓 Updating to free alternatives...');
    
    const deployConfig = {
      name: 'Cathedral Free Deployment',
      platform: 'GitHub Pages',
      build: { command: 'npm run build', output: 'dist' },
      hosting: { provider: 'GitHub Pages', domain: 'bekalah.github.io/cathedral-master' },
      database: { type: 'SQLite', file: 'data/cathedral.db' }
    };
    
    fs.writeFileSync('deploy-config.json', JSON.stringify(deployConfig, null, 2));
    console.log('  ✅ Created free deployment config');
  }

  findFiles(pattern) {
    const files = [];
    
    const search = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !['node_modules', '.git', 'dist'].includes(item)) {
            search(fullPath);
          } else if (stat.isFile() && item === pattern) {
            files.push(fullPath);
          }
        });
      } catch (error) {
        // Skip
      }
    };
    
    search(process.cwd());
    return files;
  }

  isPaidPackage(pkg) {
    return this.paidPackages.some(paid => pkg.startsWith(paid));
  }
}

if (require.main === module) {
  const remover = new PaidServiceRemover();
  remover.cleanup();
}