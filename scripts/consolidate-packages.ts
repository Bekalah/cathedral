#!/usr/bin/env node
/**
 * Consolidate Packages
 * 
 * Merges duplicate functionality, consolidates exports, improves structure
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');

interface PackageInfo {
  name: string;
  path: string;
  exports: string[];
  dependencies: string[];
  description: string;
}

/**
 * Get package info
 */
function getPackageInfo(pkgPath: string): PackageInfo | null {
  const packageJsonPath = path.join(pkgPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;
  
  try {
    const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const srcPath = path.join(pkgPath, 'src');
    
    const exports: string[] = [];
    if (fs.existsSync(srcPath)) {
      const indexFile = [path.join(srcPath, 'index.ts'), path.join(srcPath, 'index.js')]
        .find(f => fs.existsSync(f));
      
      if (indexFile) {
        const content = fs.readFileSync(indexFile, 'utf8');
        const exportMatches = content.match(/export\s+(.*?)(?:;|$)/g);
        if (exportMatches) {
          exports.push(...exportMatches.map(m => m.trim()));
        }
      }
    }
    
    const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    const dependencies = Object.keys(deps).filter(d => d.startsWith('@cathedral/'));
    
    return {
      name: pkgJson.name || path.basename(pkgPath),
      path: pkgPath,
      exports,
      dependencies,
      description: pkgJson.description || '',
    };
  } catch (e) {
    return null;
  }
}

/**
 * Find all packages
 */
function findAllPackages(): PackageInfo[] {
  const packages: PackageInfo[] = [];
  
  if (!fs.existsSync(PACKAGES_DIR)) return packages;
  
  const entries = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const pkgPath = path.join(PACKAGES_DIR, entry.name);
    const info = getPackageInfo(pkgPath);
    if (info) {
      packages.push(info);
    }
  }
  
  return packages;
}

/**
 * Find duplicate functionality
 */
function findDuplicates(packages: PackageInfo[]): Map<string, PackageInfo[]> {
  const duplicates = new Map<string, PackageInfo[]>();
  
  // Group by description similarity
  for (const pkg of packages) {
    const key = pkg.description.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!duplicates.has(key)) {
      duplicates.set(key, []);
    }
    duplicates.get(key)!.push(pkg);
  }
  
  // Filter to only actual duplicates
  const result = new Map<string, PackageInfo[]>();
  for (const [key, pkgs] of duplicates.entries()) {
    if (pkgs.length > 1 && key.length > 10) {
      result.set(key, pkgs);
    }
  }
  
  return result;
}

/**
 * Consolidate exports
 */
function consolidateExports(pkg: PackageInfo): void {
  const indexPath = [path.join(pkg.path, 'src', 'index.ts'), path.join(pkg.path, 'src', 'index.js')]
    .find(f => fs.existsSync(f));
  
  if (!indexPath) return;
  
  // Find all source files
  const srcDir = path.join(pkg.path, 'src');
  if (!fs.existsSync(srcDir)) return;
  
  const sourceFiles = fs.readdirSync(srcDir)
    .filter(f => f.match(/\.(ts|tsx|js|jsx)$/) && !f.match(/^index\./))
    .map(f => path.basename(f, path.extname(f)));
  
  // Read current index
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Add missing exports
  for (const file of sourceFiles) {
    if (!content.includes(`from './${file}'`) && !content.includes(`from "./${file}"`)) {
      content += `\nexport * from './${file}';`;
    }
  }
  
  fs.writeFileSync(indexPath, content, 'utf8');
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔄 Consolidating Packages...\n');
  
  const packages = findAllPackages();
  console.log(`📦 Found ${packages.length} packages\n`);
  
  // Find duplicates
  const duplicates = findDuplicates(packages);
  if (duplicates.size > 0) {
    console.log('⚠️  Potential duplicate packages:');
    for (const [key, pkgs] of duplicates.entries()) {
      console.log(`  ${pkgs.map(p => p.name).join(', ')}`);
    }
    console.log('');
  }
  
  // Consolidate exports
  console.log('📝 Consolidating exports...');
  let consolidated = 0;
  for (const pkg of packages) {
    const before = pkg.exports.length;
    consolidateExports(pkg);
    const after = getPackageInfo(pkg.path)?.exports.length || 0;
    if (after > before) {
      consolidated++;
      console.log(`  ✅ ${pkg.name}: ${before} → ${after} exports`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  📦 Packages: ${packages.length}`);
  console.log(`  ⚠️  Duplicates: ${duplicates.size}`);
  console.log(`  ✅ Consolidated: ${consolidated} packages`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { findAllPackages, consolidateExports, findDuplicates };

