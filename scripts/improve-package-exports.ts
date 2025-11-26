#!/usr/bin/env node
/**
 * Improve Package Exports
 * 
 * Ensures all packages have proper index.ts files with correct exports
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
  hasIndex: boolean;
  hasSrc: boolean;
  exports: string[];
  needsMasterArt: boolean;
}

/**
 * Find all packages
 */
function findPackages(): PackageInfo[] {
  const packages: PackageInfo[] = [];
  
  if (!fs.existsSync(PACKAGES_DIR)) {
    return packages;
  }
  
  const entries = fs.readdirSync(PACKAGES_DIR, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const pkgPath = path.join(PACKAGES_DIR, entry.name);
    const packageJsonPath = path.join(pkgPath, 'package.json');
    const srcPath = path.join(pkgPath, 'src');
    const indexTs = path.join(srcPath, 'index.ts');
    const indexJs = path.join(srcPath, 'index.js');
    
    if (!fs.existsSync(packageJsonPath)) continue;
    
    const hasIndex = fs.existsSync(indexTs) || fs.existsSync(indexJs);
    const hasSrc = fs.existsSync(srcPath);
    
    // Read package.json to check dependencies
    let needsMasterArt = false;
    try {
      const pkgJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      needsMasterArt = !deps['@cathedral/master-art-principles'] && 
                       (entry.name.includes('design') || 
                        entry.name.includes('3d') || 
                        entry.name.includes('stone') ||
                        entry.name.includes('japanese'));
    } catch (e) {
      // Ignore JSON parse errors
    }
    
    // Find exports if index exists
    const exports: string[] = [];
    if (hasIndex) {
      try {
        const indexContent = fs.readFileSync(
          fs.existsSync(indexTs) ? indexTs : indexJs,
          'utf8'
        );
        const exportMatches = indexContent.match(/export\s+(.*?)(?:;|$)/g);
        if (exportMatches) {
          exports.push(...exportMatches.map(m => m.trim()));
        }
      } catch (e) {
        // Ignore read errors
      }
    }
    
    packages.push({
      name: entry.name,
      path: pkgPath,
      hasIndex,
      hasSrc,
      exports,
      needsMasterArt,
    });
  }
  
  return packages;
}

/**
 * Create missing index.ts files
 */
function createMissingIndex(pkg: PackageInfo): void {
  if (pkg.hasIndex) return;
  
  const srcDir = path.join(pkg.path, 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  
  const indexPath = path.join(srcDir, 'index.ts');
  
  // Find source files
  const sourceFiles: string[] = [];
  if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      if (file.match(/\.(ts|tsx)$/) && file !== 'index.ts') {
        const baseName = path.basename(file, path.extname(file));
        sourceFiles.push(baseName);
      }
    }
  }
  
  // Generate index.ts
  let content = `/**
 * ${pkg.name}
 * 
 * Package exports
 */\n\n`;
  
  // Add master art principles if needed
  if (pkg.needsMasterArt && sourceFiles.length > 0) {
    content += `// Master art principles integration\n`;
    content += `// import { SACRED_MATH } from '@cathedral/master-art-principles';\n\n`;
  }
  
  // Export all source files
  for (const file of sourceFiles) {
    content += `export * from './${file}';\n`;
  }
  
  if (sourceFiles.length === 0) {
    content += `// Add exports here\n`;
  }
  
  fs.writeFileSync(indexPath, content);
  console.log(`  ✅ Created: ${pkg.name}/src/index.ts`);
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔍 Improving Package Exports...\n');
  
  const packages = findPackages();
  let created = 0;
  let needsMasterArt = 0;
  
  for (const pkg of packages) {
    if (!pkg.hasIndex && pkg.hasSrc) {
      createMissingIndex(pkg);
      created++;
    }
    
    if (pkg.needsMasterArt) {
      console.log(`  📝 Consider adding @cathedral/master-art-principles to ${pkg.name}`);
      needsMasterArt++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Created ${created} index.ts files`);
  console.log(`  📝 ${needsMasterArt} packages could use master-art-principles`);
  console.log(`  📦 Total packages: ${packages.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { findPackages, createMissingIndex };

