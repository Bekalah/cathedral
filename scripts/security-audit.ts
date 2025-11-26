#!/usr/bin/env node
/**
 * Security Audit Script
 * 
 * Scans for security issues:
 * - Exposed secrets/keys
 * - Console injection code
 * - Insecure dependencies
 * - Missing security headers
 */

import * as fs from 'fs';
import * as path from 'path';

interface SecurityIssue {
  file: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  description: string;
  line?: number;
}

const SECURITY_ISSUES: SecurityIssue[] = [];

/**
 * Scan for exposed secrets
 */
function scanForSecrets(dir: string): void {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      // Skip node_modules, .git, dist, build
      if (['node_modules', '.git', 'dist', 'build', '.turbo'].includes(file.name)) {
        continue;
      }
      scanForSecrets(fullPath);
      continue;
    }
    
    // Check for sensitive file patterns
    if (file.name.match(/\.(env|key|secret|pem|p12|pfx)$/i)) {
      SECURITY_ISSUES.push({
        file: fullPath,
        severity: 'critical',
        type: 'sensitive_file',
        description: `Sensitive file found: ${file.name}`
      });
      continue;
    }
    
    // Skip binary files
    if (!file.name.match(/\.(ts|js|tsx|jsx|json|md|txt)$/)) {
      continue;
    }
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for hardcoded secrets
      const secretPatterns = [
        /(api[_-]?key|apikey)\s*[:=]\s*['"]([^'"]{10,})['"]/gi,
        /(secret|password|token)\s*[:=]\s*['"]([^'"]{8,})['"]/gi,
        /(aws[_-]?access[_-]?key|aws[_-]?secret)/gi,
        /(github[_-]?token|gh[_-]?token)/gi,
        /(azure[_-]?key|azure[_-]?secret)/gi,
        /(openai[_-]?api[_-]?key)/gi
      ];
      
      secretPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const lines = content.substring(0, content.indexOf(match)).split('\n');
            SECURITY_ISSUES.push({
              file: fullPath,
              severity: 'critical',
              type: 'hardcoded_secret',
              description: `Hardcoded secret found: ${match.substring(0, 50)}...`,
              line: lines.length
            });
          });
        }
      });
      
      // Check for console injection
        SECURITY_ISSUES.push({
          file: fullPath,
          severity: 'high',
          type: 'console_injection',
          description: 'Console injection code detected'
        });
      }
      
      // Check for eval/Function constructor
      if (content.match(/\beval\s*\(/) || content.match(/new\s+Function\s*\(/)) {
        SECURITY_ISSUES.push({
          file: fullPath,
          severity: 'high',
          type: 'code_injection',
          description: 'Potentially unsafe eval/Function usage'
        });
      }
      
    } catch (error) {
      // Skip files that can't be read
    }
  }
}

/**
 * Scan for insecure dependencies
 */
function scanDependencies(): void {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };
    
    // Check for known insecure packages
    const insecurePackages = [
      'axios@<1.0.0',
      'lodash@<4.17.21',
      'minimist@<1.2.6'
    ];
    
    Object.entries(allDeps).forEach(([name, version]) => {
      // Check version vulnerabilities
      insecurePackages.forEach(insecure => {
        if (name === insecure.split('@')[0]) {
          SECURITY_ISSUES.push({
            file: packageJsonPath,
            severity: 'medium',
            type: 'insecure_dependency',
            description: `Potentially insecure package: ${name}@${version}`
          });
        }
      });
    });
  } catch (error) {
    // Skip if can't read
  }
}

/**
 * Main audit
 */
function main() {
  console.log('🔒 Running security audit...\n');
  
  const rootDir = process.cwd();
  
  // Scan for secrets
  console.log('🔍 Scanning for exposed secrets...');
  scanForSecrets(rootDir);
  
  // Scan dependencies
  console.log('📦 Scanning dependencies...');
  scanDependencies();
  
  // Report
  const critical = SECURITY_ISSUES.filter(i => i.severity === 'critical');
  const high = SECURITY_ISSUES.filter(i => i.severity === 'high');
  const medium = SECURITY_ISSUES.filter(i => i.severity === 'medium');
  const low = SECURITY_ISSUES.filter(i => i.severity === 'low');
  
  console.log(`\n📊 Security Audit Results:\n`);
  console.log(`🔴 Critical: ${critical.length}`);
  console.log(`🟠 High: ${high.length}`);
  console.log(`🟡 Medium: ${medium.length}`);
  console.log(`🟢 Low: ${low.length}\n`);
  
  if (critical.length > 0) {
    console.log('🔴 CRITICAL ISSUES:');
    critical.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line || ''}`);
      console.log(`    ${issue.description}\n`);
    });
  }
  
  if (high.length > 0) {
    console.log('🟠 HIGH PRIORITY ISSUES:');
    high.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line || ''}`);
      console.log(`    ${issue.description}\n`);
    });
  }
  
  if (medium.length > 0) {
    console.log('🟡 MEDIUM PRIORITY ISSUES:');
    medium.forEach(issue => {
      console.log(`  ${issue.file}`);
      console.log(`    ${issue.description}\n`);
    });
  }
  
  // Write report
  const reportPath = path.join(rootDir, 'SECURITY_AUDIT_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(SECURITY_ISSUES, null, 2));
  console.log(`📄 Full report written to: ${reportPath}`);
  
  if (critical.length > 0 || high.length > 0) {
    console.log('\n❌ Security audit failed. Please fix critical and high priority issues.');
    process.exit(1);
  } else {
    console.log('\n✅ Security audit passed!');
    process.exit(0);
  }
}

main();

