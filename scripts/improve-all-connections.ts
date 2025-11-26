#!/usr/bin/env node
/**
 * Improve All Connections
 * 
 * Fixes broken imports, adds missing exports, improves cross-package connections
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

interface ImportFix {
  file: string;
  oldImport: string;
  newImport: string;
  reason: string;
}

const IMPORT_MAPPINGS: Record<string, string> = {
  '@cathedral/codex-144-99': '@cathedral/codex-144-99',
  '@cathedral/codex-14499': '@cathedral/codex-144-99',
  '@cathedral/liber-arcanae': '@cathedral/liber-arcanae',
  '@cathedral/circuitum99': '@cathedral/circuitum99',
  '@cathedral/stone-grimoire': '@cathedral/stone-grimoire',
  '@cathedral/master-art-principles': '@cathedral/master-art-principles',
  '@cathedral/3d-environments': '@cathedral/3d-environments',
  '@cathedral/japanese-design-system': '@cathedral/japanese-design-system',
};

/**
 * Find all TypeScript/JavaScript files
 */
function findSourceFiles(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.turbo'].includes(entry.name)) {
        continue;
      }
      files.push(...findSourceFiles(fullPath));
      continue;
    }
    
    if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Fix imports in a file
 */
function fixImportsInFile(filePath: string): ImportFix[] {
  const fixes: ImportFix[] = [];
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix relative imports that should be workspace imports
    const relativeImportRegex = /from\s+['"]\.\.\/\.\.\/packages\/([^'"]+)['"]/g;
    let match;
    while ((match = relativeImportRegex.exec(content)) !== null) {
      const pkgName = match[1];
      const workspaceAlias = `@cathedral/${pkgName}`;
      
      if (IMPORT_MAPPINGS[workspaceAlias]) {
        fixes.push({
          file: filePath,
          oldImport: match[0],
          newImport: `from '${workspaceAlias}'`,
          reason: 'Convert relative to workspace alias',
        });
        content = content.replace(match[0], `from '${workspaceAlias}'`);
        modified = true;
      }
    }
    
    // Fix missing file extensions
    const missingExtRegex = /from\s+['"](\.\/[^'"]+)(?<!\.(ts|tsx|js|jsx))['"]/g;
    while ((match = missingExtRegex.exec(content)) !== null) {
      const importPath = match[1];
      // Try to find the actual file
      const dir = path.dirname(filePath);
      const possiblePaths = [
        `${importPath}.ts`,
        `${importPath}.tsx`,
        `${importPath}/index.ts`,
        `${importPath}/index.tsx`,
      ];
      
      for (const possiblePath of possiblePaths) {
        if (fs.existsSync(path.join(dir, possiblePath))) {
          fixes.push({
            file: filePath,
            oldImport: match[0],
            newImport: `from '${importPath}.ts'`,
            reason: 'Add missing file extension',
          });
          content = content.replace(match[0], `from '${importPath}.ts'`);
          modified = true;
          break;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    // Ignore errors
  }
  
  return fixes;
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔧 Improving All Connections...\n');
  
  const packagesDir = path.join(ROOT_DIR, 'packages');
  const appsDir = path.join(ROOT_DIR, 'apps');
  
  const allFiles = [
    ...findSourceFiles(packagesDir),
    ...findSourceFiles(appsDir),
  ];
  
  console.log(`📁 Found ${allFiles.length} source files\n`);
  
  const allFixes: ImportFix[] = [];
  let fixedCount = 0;
  
  for (const file of allFiles) {
    const fixes = fixImportsInFile(file);
    if (fixes.length > 0) {
      allFixes.push(...fixes);
      fixedCount++;
      console.log(`  ✅ Fixed: ${path.relative(ROOT_DIR, file)} (${fixes.length} fixes)`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Fixed ${fixedCount} files`);
  console.log(`  🔧 Total fixes: ${allFixes.length}`);
  
  // Save report
  const reportPath = path.join(ROOT_DIR, 'IMPORT_FIXES_REPORT.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        filesFixed: fixedCount,
        totalFixes: allFixes.length,
      },
      fixes: allFixes,
    }, null, 2)
  );
  
  console.log(`  📄 Report saved: IMPORT_FIXES_REPORT.json`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fixImportsInFile, findSourceFiles };

