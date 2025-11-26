#!/usr/bin/env node
/**
 * Deep Quality Analysis
 * 
 * Comprehensive quality analysis with 1000x standards
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

interface QualityIssue {
  file: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  fix?: string;
}

const ISSUES: QualityIssue[] = [];

/**
 * Analyze file quality
 */
function analyzeFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath);
  const relPath = path.relative(ROOT_DIR, filePath);
  
  // TypeScript/JavaScript quality checks
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    // Check for console statements in production code
    if (content.includes('console.log') && !filePath.includes('test') && !filePath.includes('spec')) {
      ISSUES.push({
        file: relPath,
        severity: 'warning',
        message: 'console.log found in production code',
        fix: 'Remove or comment out console.log statements',
      });
    }
    
    // Check for TODO/FIXME comments
    const todoMatches = content.match(/(TODO|FIXME|XXX|HACK):\s*(.+)/gi);
    if (todoMatches) {
      for (const match of todoMatches) {
        ISSUES.push({
          file: relPath,
          severity: 'info',
          message: `TODO comment: ${match}`,
        });
      }
    }
    
    // Check for proper exports
    if (filePath.includes('index.ts') || filePath.includes('index.js')) {
      if (!content.includes('export')) {
        ISSUES.push({
          file: relPath,
          severity: 'warning',
          message: 'Index file has no exports',
          fix: 'Add exports to index file',
        });
      }
    }
    
    // Check for type safety
    if (ext === '.ts' || ext === '.tsx') {
      if (content.includes('any') && !content.includes('// eslint-disable')) {
        ISSUES.push({
          file: relPath,
          severity: 'warning',
          message: 'Uses "any" type (reduces type safety)',
          fix: 'Replace "any" with proper types',
        });
      }
    }
  }
  
  // JSON quality checks
  if (ext === '.json') {
    try {
      JSON.parse(content);
    } catch (e) {
      ISSUES.push({
        file: relPath,
        severity: 'error',
        message: `Invalid JSON: ${e}`,
        fix: 'Fix JSON syntax errors',
      });
    }
  }
  
  // Package.json specific checks
  if (path.basename(filePath) === 'package.json') {
    try {
      const pkg = JSON.parse(content);
      
      if (!pkg.name) {
        ISSUES.push({
          file: relPath,
          severity: 'error',
          message: 'Missing "name" field',
          fix: 'Add "name" field to package.json',
        });
      }
      
      if (!pkg.version) {
        ISSUES.push({
          file: relPath,
          severity: 'warning',
          message: 'Missing "version" field',
          fix: 'Add "version" field to package.json',
        });
      }
      
      if (!pkg.main && !pkg.exports) {
        ISSUES.push({
          file: relPath,
          severity: 'warning',
          message: 'Missing "main" or "exports" field',
          fix: 'Add entry point to package.json',
        });
      }
    } catch (e) {
      // Already caught as JSON error
    }
  }
}

/**
 * Analyze directory
 */
function analyzeDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip certain directories
    if (['node_modules', '.git', 'dist', 'build', '.turbo', 'coverage'].includes(entry.name)) {
      continue;
    }
    
    if (entry.isDirectory()) {
      analyzeDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.ts', '.tsx', '.js', '.jsx', '.json'].includes(ext)) {
        try {
          analyzeFile(fullPath);
        } catch (e) {
          // Skip files that can't be analyzed
        }
      }
    }
  }
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔍 Deep Quality Analysis (1000x Standards)...\n');
  
  // Analyze packages
  analyzeDirectory(path.join(ROOT_DIR, 'packages'));
  
  // Analyze apps
  analyzeDirectory(path.join(ROOT_DIR, 'apps'));
  
  // Analyze data
  analyzeDirectory(path.join(ROOT_DIR, 'data'));
  
  // Report
  const errors = ISSUES.filter(i => i.severity === 'error');
  const warnings = ISSUES.filter(i => i.severity === 'warning');
  const infos = ISSUES.filter(i => i.severity === 'info');
  
  console.log('📊 Quality Analysis Results:');
  console.log(`  ❌ Errors: ${errors.length}`);
  console.log(`  ⚠️  Warnings: ${warnings.length}`);
  console.log(`  ℹ️  Info: ${infos.length}`);
  console.log(`  📝 Total Issues: ${ISSUES.length}\n`);
  
  if (errors.length > 0) {
    console.log('❌ Errors:');
    errors.slice(0, 10).forEach(issue => {
      console.log(`  ${issue.file}: ${issue.message}`);
      if (issue.fix) {
        console.log(`    Fix: ${issue.fix}`);
      }
    });
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more errors`);
    }
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:');
    warnings.slice(0, 10).forEach(issue => {
      console.log(`  ${issue.file}: ${issue.message}`);
    });
    if (warnings.length > 10) {
      console.log(`  ... and ${warnings.length - 10} more warnings`);
    }
    console.log('');
  }
  
  // Save report
  const reportPath = path.join(ROOT_DIR, 'QUALITY_ANALYSIS_REPORT.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        total: ISSUES.length,
        errors: errors.length,
        warnings: warnings.length,
        infos: infos.length,
      },
      issues: ISSUES,
    }, null, 2)
  );
  
  console.log(`📄 Full report saved: QUALITY_ANALYSIS_REPORT.json`);
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ Perfect quality! No issues found.');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzeFile, analyzeDirectory };

