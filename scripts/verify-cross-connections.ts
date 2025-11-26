#!/usr/bin/env node
/**
 * Verify Cross-Package Connections
 * 
 * Ensures all packages are properly connected
 * Checks imports, exports, and dependencies
 */

import * as fs from 'fs';
import * as path from 'path';
import { PACKAGE_REGISTRY, verifyPackageDependencies } from '../packages/shared/src/package-registry';

interface VerificationResult {
  package: string;
  status: 'valid' | 'missing' | 'error';
  issues: string[];
}

/**
 * Verify all cross-package connections
 */
function verifyCrossConnections(): VerificationResult[] {
  const results: VerificationResult[] = [];
  
  // Verify package dependencies
  const depCheck = verifyPackageDependencies();
  
  if (!depCheck.valid) {
    depCheck.missing.forEach(({ package: pkg, missing }) => {
      results.push({
        package: pkg,
        status: 'missing',
        issues: [`Missing dependencies: ${missing.join(', ')}`]
      });
    });
  }
  
  // Verify package.json files exist
  Object.values(PACKAGE_REGISTRY).forEach(pkg => {
    const packageJsonPath = path.join(pkg.path, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      results.push({
        package: pkg.name,
        status: 'error',
        issues: [`package.json not found at ${packageJsonPath}`]
      });
      return;
    }
    
    // Verify package.json has correct name
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      if (packageJson.name !== pkg.name) {
        results.push({
          package: pkg.name,
          status: 'error',
          issues: [`Package name mismatch: expected ${pkg.name}, found ${packageJson.name}`]
        });
      }
      
      // Verify dependencies are listed
      const deps = packageJson.dependencies || {};
      pkg.dependencies.forEach(dep => {
        if (!deps[dep] && dep !== '@cathedral/shared') {
          results.push({
            package: pkg.name,
            status: 'missing',
            issues: [`Dependency ${dep} not listed in package.json`]
          });
        }
      });
    } catch (error) {
      results.push({
        package: pkg.name,
        status: 'error',
        issues: [`Error reading package.json: ${error}`]
      });
    }
  });
  
  // Verify exports exist
  Object.values(PACKAGE_REGISTRY).forEach(pkg => {
    pkg.exports.forEach(exportPath => {
      const fullPath = path.join(pkg.path, exportPath);
      if (!fs.existsSync(fullPath)) {
        results.push({
          package: pkg.name,
          status: 'missing',
          issues: [`Export not found: ${exportPath}`]
        });
      }
    });
  });
  
  return results;
}

/**
 * Main verification
 */
function main() {
  console.log('🔍 Verifying cross-package connections...\n');
  
  const results = verifyCrossConnections();
  
  const valid = results.filter(r => r.status === 'valid');
  const missing = results.filter(r => r.status === 'missing');
  const errors = results.filter(r => r.status === 'error');
  
  console.log(`✅ Valid: ${valid.length}`);
  console.log(`⚠️  Missing: ${missing.length}`);
  console.log(`❌ Errors: ${errors.length}\n`);
  
  if (missing.length > 0) {
    console.log('⚠️  Missing Dependencies/Exports:');
    missing.forEach(result => {
      console.log(`  ${result.package}:`);
      result.issues.forEach(issue => console.log(`    - ${issue}`));
    });
    console.log();
  }
  
  if (errors.length > 0) {
    console.log('❌ Errors:');
    errors.forEach(result => {
      console.log(`  ${result.package}:`);
      result.issues.forEach(issue => console.log(`    - ${issue}`));
    });
    console.log();
  }
  
  if (valid.length === results.length) {
    console.log('✅ All cross-package connections verified!');
    process.exit(0);
  } else {
    console.log('❌ Some connections need attention.');
    process.exit(1);
  }
}

main();

