#!/usr/bin/env node
/**
 * FREE SYSTEM VALIDATOR
 * Ensures only free/open source dependencies
 */

const fs = require('fs');
const path = require('path');

class FreeSystemValidator {
  constructor() {
    this.approvedFree = [
      // Core web technologies
      'html', 'css', 'javascript', 'typescript',
      
      // Free build tools
      'turbo', 'vite', 'rollup', 'webpack', 'parcel',
      
      // Free hosting
      'github-pages', 'gh-pages', 'surge', 'netlify-cli',
      
      // Free databases
      'sqlite', 'sqlite3', 'better-sqlite3',
      
      // Free utilities
      'lodash', 'moment', 'dayjs', 'axios', 'fetch',
      
      // Free development
      'nodemon', 'concurrently', 'cross-env', 'rimraf',
      
      // Free testing
      'jest', 'vitest', 'mocha', 'chai', 'cypress',
      
      // Free linting
      'eslint', 'prettier', 'stylelint'
    ];
    
    this.bannedPaid = [
      '@azure', '@vercel', '@cloudflare', 'docker', '@aws-sdk',
      '@google-cloud', 'firebase', '@supabase', '@planetscale',
      '@railway', '@heroku', 'mongodb-atlas', 'prisma-cloud'
    ];
    
    this.freeAlternatives = {
      'vercel': 'GitHub Pages + gh-pages',
      'netlify': 'GitHub Pages + gh-pages', 
      'cloudflare': 'GitHub Pages',
      'docker': 'Native Node.js',
      'firebase': 'SQLite + JSON files',
      'supabase': 'SQLite',
      'mongodb': 'SQLite',
      'prisma': 'better-sqlite3',
      'aws-sdk': 'Local file system',
      'azure': 'Local development'
    };
  }

  validate() {
    console.log('🆓 Validating free system compliance...\n');
    
    const results = {
      valid: true,
      violations: [],
      recommendations: []
    };
    
    this.validatePackageFiles(results);
    this.validateConfigFiles(results);
    this.validateDocumentation(results);
    this.generateReport(results);
    
    return results.valid;
  }

  validatePackageFiles(results) {
    console.log('📦 Validating package dependencies...');
    
    const packageFiles = this.findFiles('package.json');
    
    packageFiles.forEach(file => {
      try {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        
        ['dependencies', 'devDependencies'].forEach(depType => {
          if (content[depType]) {
            Object.keys(content[depType]).forEach(pkg => {
              if (this.isPaidService(pkg)) {
                results.valid = false;
                results.violations.push({
                  type: 'paid_dependency',
                  file: file,
                  package: pkg,
                  alternative: this.freeAlternatives[pkg] || 'Remove or find free alternative'
                });
                console.log(`  ❌ Paid dependency: ${pkg} in ${file}`);
              } else if (this.isApprovedFree(pkg)) {
                console.log(`  ✅ Free dependency: ${pkg}`);
              }
            });
          }
        });
        
        // Check scripts for paid services
        if (content.scripts) {
          Object.entries(content.scripts).forEach(([name, script]) => {
            if (this.containsPaidService(script)) {
              results.violations.push({
                type: 'paid_script',
                file: file,
                script: name,
                command: script
              });
              console.log(`  ❌ Paid service in script: ${name}`);
            }
          });
        }
        
      } catch (error) {
        console.warn(`  ⚠️  Could not validate ${file}`);
      }
    });
  }

  validateConfigFiles(results) {
    console.log('⚙️  Validating configuration files...');
    
    const paidConfigs = [
      'vercel.json', 'netlify.toml', 'Dockerfile', 'docker-compose.yml',
      'azure-pipelines.yml', 'firebase.json', 'supabase.json'
    ];
    
    paidConfigs.forEach(config => {
      const files = this.findFiles(config);
      files.forEach(file => {
        results.valid = false;
        results.violations.push({
          type: 'paid_config',
          file: file,
          service: config.split('.')[0]
        });
        console.log(`  ❌ Paid service config: ${file}`);
      });
    });
    
    // Check for free alternatives
    const freeConfigs = ['deploy-config.json', '.github/workflows/deploy.yml'];
    freeConfigs.forEach(config => {
      if (fs.existsSync(config)) {
        console.log(`  ✅ Free deployment config: ${config}`);
      }
    });
  }

  validateDocumentation(results) {
    console.log('📚 Validating documentation...');
    
    const docFiles = this.findFiles('*.md');
    
    docFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        this.bannedPaid.forEach(service => {
          if (content.toLowerCase().includes(service.toLowerCase())) {
            results.violations.push({
              type: 'paid_reference',
              file: file,
              service: service
            });
            console.log(`  ⚠️  Paid service reference in ${file}: ${service}`);
          }
        });
        
      } catch (error) {
        // Skip binary files
      }
    });
  }

  generateReport(results) {
    console.log('\n📊 Free System Validation Report:');
    
    if (results.valid) {
      console.log('✅ PASSED - System uses only free/open source tools');
    } else {
      console.log('❌ FAILED - Paid service violations detected');
      
      console.log('\n🚨 Violations:');
      results.violations.forEach((violation, index) => {
        console.log(`  ${index + 1}. ${violation.type}: ${violation.file}`);
        if (violation.package) {
          console.log(`     Package: ${violation.package}`);
          console.log(`     Alternative: ${violation.alternative}`);
        }
      });
      
      console.log('\n💡 Recommendations:');
      console.log('  1. Run: node tools/cleanup/remove-paid-services.js');
      console.log('  2. Use GitHub Pages for hosting');
      console.log('  3. Use SQLite for database');
      console.log('  4. Use local development server');
      console.log('  5. Remove all paid service configs');
    }
    
    // Generate compliance report
    const report = {
      timestamp: new Date().toISOString(),
      valid: results.valid,
      violations: results.violations,
      free_alternatives: this.freeAlternatives,
      approved_tools: this.approvedFree
    };
    
    fs.writeFileSync('free-system-report.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Report saved to: free-system-report.json');
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
          } else if (stat.isFile()) {
            if (pattern.includes('*')) {
              const regex = new RegExp(pattern.replace('*', '.*'));
              if (regex.test(item)) {
                files.push(fullPath);
              }
            } else if (item === pattern) {
              files.push(fullPath);
            }
          }
        });
      } catch (error) {
        // Skip
      }
    };
    
    search('.');
    return files;
  }

  isPaidService(pkg) {
    return this.bannedPaid.some(banned => pkg.startsWith(banned));
  }

  isApprovedFree(pkg) {
    return this.approvedFree.some(free => pkg.includes(free));
  }

  containsPaidService(text) {
    return this.bannedPaid.some(service => 
      text.toLowerCase().includes(service.toLowerCase())
    );
  }
}

if (require.main === module) {
  const validator = new FreeSystemValidator();
  const isValid = validator.validate();
  
  if (!isValid) {
    console.log('\n🔧 To fix violations, run:');
    console.log('  node tools/cleanup/remove-paid-services.js');
    process.exit(1);
  }
}