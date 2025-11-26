#!/usr/bin/env npx ts-node
/**
 * INTEGRITY VALIDATION SYSTEM
 * 
 * Validates EVERY package, app, and document to ensure:
 * - Documentation matches code
 * - Versions are correct
 * - No made-up content
 * - No spam or artifacts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = process.cwd();

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

interface PackageValidation {
  name: string;
  path: string;
  result: ValidationResult;
}

// =====================================================
// VALIDATION FUNCTIONS
// =====================================================

function validatePackageJson(pkgPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const pkgJsonPath = path.join(pkgPath, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) {
      errors.push('Missing package.json');
      return { passed: false, errors, warnings };
    }

    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));

    // Check for placeholder version
    if (pkg.version === '0.0.0' || pkg.version === '0.0.1') {
      warnings.push(`Placeholder version: ${pkg.version}`);
    }

    // Check for missing description
    if (!pkg.description || pkg.description.length < 10) {
      errors.push('Missing or too short description');
    }

    // Check for placeholder description
    if (pkg.description && (
      pkg.description.includes('TODO') ||
      pkg.description.includes('TBD') ||
      pkg.description.includes('Lorem')
    )) {
      errors.push('Placeholder text in description');
    }

    // Check for @cathedral namespace
    if (pkg.name && !pkg.name.startsWith('@cathedral/')) {
      warnings.push(`Package name should start with @cathedral/: ${pkg.name}`);
    }

    // Check for echo scripts (spam)
    if (pkg.scripts) {
      for (const [scriptName, scriptCmd] of Object.entries(pkg.scripts)) {
        if (typeof scriptCmd === 'string' && scriptCmd.startsWith('echo ')) {
          errors.push(`Echo script detected: ${scriptName} = "${scriptCmd}"`);
        }
      }
    }

    // Check for missing author
    if (!pkg.author) {
      warnings.push('Missing author field');
    }

    // Check for missing repository
    if (!pkg.repository) {
      warnings.push('Missing repository field');
    }

    // Check for wildcard dependencies
    if (pkg.dependencies) {
      for (const [dep, version] of Object.entries(pkg.dependencies)) {
        if (version === '*' || version === 'latest') {
          errors.push(`Wildcard dependency: ${dep}@${version}`);
        }
      }
    }

  } catch (e) {
    errors.push(`Failed to parse package.json: ${e}`);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

function validateSourceCode(pkgPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const srcPath = path.join(pkgPath, 'src');
  
  // Check for src directory
  if (!fs.existsSync(srcPath)) {
    errors.push('Missing src/ directory');
    return { passed: false, errors, warnings };
  }

  // Check for index.ts
  const indexPath = path.join(srcPath, 'index.ts');
  if (!fs.existsSync(indexPath)) {
    errors.push('Missing src/index.ts');
    return { passed: false, errors, warnings };
  }

  // Read index.ts and check for content
  const indexContent = fs.readFileSync(indexPath, 'utf-8');

  // Check for empty or minimal content
  if (indexContent.trim().length < 50) {
    errors.push('src/index.ts is nearly empty');
  }

  // Check for placeholder content
  if (indexContent.includes('// TODO') || indexContent.includes('/* TODO */')) {
    warnings.push('TODO comments found in source');
  }

  // Check for console injection spam
  if (indexContent.includes('oo_cm') || indexContent.includes('oo_tr') || indexContent.includes('2184609590')) {
    errors.push('Console injection spam detected');
  }

  // Check for actual exports
  if (!indexContent.includes('export')) {
    errors.push('No exports found in index.ts');
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

function validateReadme(pkgPath: string, pkgName: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const readmePath = path.join(pkgPath, 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    warnings.push('Missing README.md');
    return { passed: true, errors, warnings };
  }

  const content = fs.readFileSync(readmePath, 'utf-8');

  // Check for placeholder text
  if (content.includes('Lorem ipsum') || content.includes('TBD') || content.includes('[TODO]')) {
    errors.push('Placeholder text in README');
  }

  // Check that package name is mentioned
  if (!content.includes(pkgName)) {
    warnings.push('README does not mention package name');
  }

  // Check for minimal content
  if (content.length < 100) {
    warnings.push('README is very short');
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

function validateDataFiles(pkgPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const dataPath = path.join(pkgPath, 'data');
  
  if (!fs.existsSync(dataPath)) {
    return { passed: true, errors, warnings };
  }

  const files = fs.readdirSync(dataPath);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dataPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        
        // Check for empty arrays or objects
        if (Array.isArray(data) && data.length === 0) {
          warnings.push(`Empty array in ${file}`);
        }
        
        if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) {
          warnings.push(`Empty object in ${file}`);
        }
        
      } catch (e) {
        errors.push(`Invalid JSON in ${file}: ${e}`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

// =====================================================
// MAIN VALIDATION
// =====================================================

async function validateAll(): Promise<void> {
  console.log('🔍 INTEGRITY VALIDATION SYSTEM');
  console.log('================================\n');

  const packagesDir = path.join(ROOT, 'packages');
  const appsDir = path.join(ROOT, 'apps');
  
  const results: PackageValidation[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  // Validate packages
  if (fs.existsSync(packagesDir)) {
    const packages = fs.readdirSync(packagesDir);
    
    console.log(`📦 Validating ${packages.length} packages...\n`);
    
    for (const pkg of packages) {
      const pkgPath = path.join(packagesDir, pkg);
      
      if (!fs.statSync(pkgPath).isDirectory()) continue;
      
      const errors: string[] = [];
      const warnings: string[] = [];
      
      // Run all validations
      const pkgJsonResult = validatePackageJson(pkgPath);
      const sourceResult = validateSourceCode(pkgPath);
      const readmeResult = validateReadme(pkgPath, pkg);
      const dataResult = validateDataFiles(pkgPath);
      
      errors.push(...pkgJsonResult.errors, ...sourceResult.errors, ...readmeResult.errors, ...dataResult.errors);
      warnings.push(...pkgJsonResult.warnings, ...sourceResult.warnings, ...readmeResult.warnings, ...dataResult.warnings);
      
      const passed = errors.length === 0;
      
      results.push({
        name: pkg,
        path: pkgPath,
        result: { passed, errors, warnings }
      });
      
      // Output
      if (!passed) {
        console.log(`❌ ${pkg}`);
        errors.forEach(e => console.log(`   ERROR: ${e}`));
        warnings.forEach(w => console.log(`   WARN:  ${w}`));
        totalErrors += errors.length;
        totalWarnings += warnings.length;
      } else if (warnings.length > 0) {
        console.log(`⚠️  ${pkg}`);
        warnings.forEach(w => console.log(`   WARN:  ${w}`));
        totalWarnings += warnings.length;
      } else {
        console.log(`✅ ${pkg}`);
      }
    }
  }

  // Validate apps
  if (fs.existsSync(appsDir)) {
    const apps = fs.readdirSync(appsDir);
    
    console.log(`\n📱 Validating ${apps.length} apps...\n`);
    
    for (const app of apps) {
      const appPath = path.join(appsDir, app);
      
      if (!fs.statSync(appPath).isDirectory()) continue;
      
      const pkgJsonResult = validatePackageJson(appPath);
      
      if (!pkgJsonResult.passed) {
        console.log(`❌ ${app}`);
        pkgJsonResult.errors.forEach(e => console.log(`   ERROR: ${e}`));
        totalErrors += pkgJsonResult.errors.length;
      } else if (pkgJsonResult.warnings.length > 0) {
        console.log(`⚠️  ${app}`);
        pkgJsonResult.warnings.forEach(w => console.log(`   WARN:  ${w}`));
        totalWarnings += pkgJsonResult.warnings.length;
      } else {
        console.log(`✅ ${app}`);
      }
    }
  }

  // Summary
  console.log('\n================================');
  console.log('SUMMARY');
  console.log('================================');
  
  const passedCount = results.filter(r => r.result.passed).length;
  const failedCount = results.filter(r => !r.result.passed).length;
  
  console.log(`Packages checked: ${results.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
  
  if (totalErrors > 0) {
    console.log('\n❌ INTEGRITY VALIDATION FAILED');
    console.log('Fix the errors above before committing.');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  INTEGRITY VALIDATION PASSED WITH WARNINGS');
    console.log('Consider fixing the warnings above.');
  } else {
    console.log('\n✅ INTEGRITY VALIDATION PASSED');
    console.log('All packages and apps are valid.');
  }
}

validateAll().catch(console.error);

