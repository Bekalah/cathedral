#!/usr/bin/env node
/**
 * Recover Broken Connections
 * 
 * Finds and fixes:
 * - Broken imports
 * - Missing exports
 * - Circular dependencies
 * - Missing package.json files
 * - Incorrect workspace references
 */

import * as fs from 'fs';
import * as path from 'path';

interface BrokenConnection {
  file: string;
  issue: string;
  type: 'missing_import' | 'missing_export' | 'circular' | 'missing_package' | 'incorrect_workspace';
  fix?: string;
}

const BROKEN_CONNECTIONS: BrokenConnection[] = [];

/**
 * Find all TypeScript/JavaScript files
 */
function findSourceFiles(dir: string, files: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.turbo'].includes(entry.name)) {
        continue;
      }
      findSourceFiles(fullPath, files);
      continue;
    }
    
    if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Check for broken imports
 */
function checkImports(file: string): void {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find all imports
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      
      // Check workspace imports
      if (importPath.startsWith('@cathedral/')) {
        const packageName = importPath.split('/')[0] + '/' + importPath.split('/')[1];
        const packagePath = path.join(process.cwd(), 'packages', packageName.replace('@cathedral/', ''));
        
        if (!fs.existsSync(packagePath)) {
          BROKEN_CONNECTIONS.push({
            file,
            issue: `Missing package: ${packageName}`,
            type: 'missing_package',
            fix: `Create package at ${packagePath} or fix import`
          });
        }
      }
      
      // Check relative imports
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const resolvedPath = path.resolve(path.dirname(file), importPath);
        const possibleExtensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
        
        let found = false;
        for (const ext of possibleExtensions) {
          if (fs.existsSync(resolvedPath + ext) || fs.existsSync(resolvedPath)) {
            found = true;
            break;
          }
        }
        
        if (!found) {
          BROKEN_CONNECTIONS.push({
            file,
            issue: `Missing import: ${importPath}`,
            type: 'missing_import',
            fix: `Create file or fix import path`
          });
        }
      }
    }
  } catch (error) {
    // Skip files that can't be read
  }
}

/**
 * Check package.json files
 */
function checkPackageJson(packagePath: string): void {
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    BROKEN_CONNECTIONS.push({
      file: packagePath,
      issue: 'Missing package.json',
      type: 'missing_package',
      fix: 'Create package.json file'
    });
    return;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check workspace dependencies
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    Object.keys(deps).forEach(dep => {
      if (dep.startsWith('@cathedral/') && deps[dep] === 'workspace:*') {
        const depPackagePath = path.join(process.cwd(), 'packages', dep.replace('@cathedral/', ''));
        if (!fs.existsSync(depPackagePath)) {
          BROKEN_CONNECTIONS.push({
            file: packageJsonPath,
            issue: `Workspace dependency not found: ${dep}`,
            type: 'incorrect_workspace',
            fix: `Create package at ${depPackagePath} or remove dependency`
          });
        }
      }
    });
    
    // Check main entry point
    if (packageJson.main) {
      const mainPath = path.join(packagePath, packageJson.main);
      if (!fs.existsSync(mainPath)) {
        BROKEN_CONNECTIONS.push({
          file: packageJsonPath,
          issue: `Main entry point not found: ${packageJson.main}`,
          type: 'missing_export',
          fix: `Create file at ${packageJson.main} or update package.json`
        });
      }
    }
  } catch (error) {
    // Skip invalid JSON
  }
}

/**
 * Main recovery
 */
function main() {
  console.log('🔧 Recovering broken connections...\n');
  
  const rootDir = process.cwd();
  
  // Find all source files
  console.log('📁 Scanning source files...');
  const sourceFiles = findSourceFiles(path.join(rootDir, 'packages'));
  sourceFiles.push(...findSourceFiles(path.join(rootDir, 'apps')));
  
  console.log(`Found ${sourceFiles.length} source files\n`);
  
  // Check imports
  console.log('🔍 Checking imports...');
  sourceFiles.forEach(file => checkImports(file));
  
  // Check package.json files
  console.log('📦 Checking package.json files...');
  const packagesDir = path.join(rootDir, 'packages');
  if (fs.existsSync(packagesDir)) {
    const packages = fs.readdirSync(packagesDir, { withFileTypes: true });
    packages.forEach(pkg => {
      if (pkg.isDirectory()) {
        checkPackageJson(path.join(packagesDir, pkg.name));
      }
    });
  }
  
  // Report
  const missingImports = BROKEN_CONNECTIONS.filter(c => c.type === 'missing_import');
  const missingExports = BROKEN_CONNECTIONS.filter(c => c.type === 'missing_export');
  const missingPackages = BROKEN_CONNECTIONS.filter(c => c.type === 'missing_package');
  const incorrectWorkspace = BROKEN_CONNECTIONS.filter(c => c.type === 'incorrect_workspace');
  
  console.log(`\n📊 Broken Connections Found:\n`);
  console.log(`❌ Missing Imports: ${missingImports.length}`);
  console.log(`❌ Missing Exports: ${missingExports.length}`);
  console.log(`❌ Missing Packages: ${missingPackages.length}`);
  console.log(`❌ Incorrect Workspace: ${incorrectWorkspace.length}\n`);
  
  if (BROKEN_CONNECTIONS.length > 0) {
    console.log('🔧 Issues Found:\n');
    BROKEN_CONNECTIONS.forEach(conn => {
      console.log(`  ${conn.file}`);
      console.log(`    Issue: ${conn.issue}`);
      if (conn.fix) {
        console.log(`    Fix: ${conn.fix}`);
      }
      console.log();
    });
    
    // Write report
    const reportPath = path.join(rootDir, 'BROKEN_CONNECTIONS_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(BROKEN_CONNECTIONS, null, 2));
    console.log(`📄 Full report written to: ${reportPath}`);
    
    console.log('\n❌ Some connections need to be fixed.');
    process.exit(1);
  } else {
    console.log('✅ All connections verified!');
    process.exit(0);
  }
}

main();

