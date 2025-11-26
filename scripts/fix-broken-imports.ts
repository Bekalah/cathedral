#!/usr/bin/env node
/**
 * Fix Broken Imports
 * 
 * Automatically fixes common import issues:
 * - Converts relative imports to workspace imports where appropriate
 * - Fixes missing file extensions
 * - Updates incorrect paths
 */

import * as fs from 'fs';
import * as path from 'path';

interface ImportFix {
  file: string;
  oldImport: string;
  newImport: string;
  reason: string;
}

const FIXES: ImportFix[] = [];

/**
 * Fix imports in a file
 */
function fixImportsInFile(filePath: string): void {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern 1: Relative imports that should be workspace imports
    const relativeToWorkspacePattern = /import\s+.*?\s+from\s+['"]\.\.\/packages\/([^'"]+)['"]/g;
    let match;
    
    while ((match = relativeToWorkspacePattern.exec(content)) !== null) {
      const packageName = match[1].split('/')[0];
      const newImport = `@cathedral/${packageName}`;
      
      FIXES.push({
        file: filePath,
        oldImport: match[0],
        newImport: `from '${newImport}'`,
        reason: 'Convert relative to workspace import'
      });
      
      content = content.replace(match[0], match[0].replace(match[1], newImport));
      modified = true;
    }
    
    // Pattern 2: Missing file extensions in relative imports
    const missingExtensionPattern = /import\s+.*?\s+from\s+['"](\.\/[^'"]+)(?<!\.(ts|tsx|js|jsx))['"]/g;
    
    while ((match = missingExtensionPattern.exec(content)) !== null) {
      const importPath = match[1];
      const dir = path.dirname(filePath);
      const resolvedPath = path.resolve(dir, importPath);
      
      // Check if file exists with extension
      const extensions = ['.ts', '.tsx', '.js', '.jsx'];
      for (const ext of extensions) {
        if (fs.existsSync(resolvedPath + ext)) {
          const newImport = importPath + ext;
          FIXES.push({
            file: filePath,
            oldImport: match[0],
            newImport: `from '${newImport}'`,
            reason: 'Add missing file extension'
          });
          
          content = content.replace(match[0], match[0].replace(importPath, newImport));
          modified = true;
          break;
        }
      }
    }
    
    // Pattern 3: Incorrect workspace package names
    const workspacePattern = /import\s+.*?\s+from\s+['"]@cathedral\/([^'"]+)['"]/g;
    
    while ((match = workspacePattern.exec(content)) !== null) {
      const packageName = match[1];
      const packagePath = path.join(process.cwd(), 'packages', packageName);
      
      if (!fs.existsSync(packagePath)) {
        // Try to find correct package name
        const packagesDir = path.join(process.cwd(), 'packages');
        if (fs.existsSync(packagesDir)) {
          const packages = fs.readdirSync(packagesDir, { withFileTypes: true });
          const found = packages.find(p => 
            p.isDirectory() && 
            (p.name === packageName || p.name.replace(/-/g, '') === packageName.replace(/-/g, ''))
          );
          
          if (found) {
            const correctName = found.name;
            const newImport = `@cathedral/${correctName}`;
            
            FIXES.push({
              file: filePath,
              oldImport: match[0],
              newImport: `from '${newImport}'`,
              reason: `Fix incorrect package name: ${packageName} -> ${correctName}`
            });
            
            content = content.replace(match[0], match[0].replace(`@cathedral/${packageName}`, newImport));
            modified = true;
          }
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    // Skip files that can't be read
  }
}

/**
 * Main fix process
 */
function main() {
  console.log('🔧 Fixing broken imports...\n');
  
  const rootDir = process.cwd();
  
  // Find all source files
  function findFiles(dir: string, files: string[] = []): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', 'build', '.turbo'].includes(entry.name)) {
          continue;
        }
        findFiles(fullPath, files);
        continue;
      }
      
      if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  const sourceFiles = findFiles(path.join(rootDir, 'packages'));
  sourceFiles.push(...findFiles(path.join(rootDir, 'apps')));
  
  console.log(`Found ${sourceFiles.length} source files\n`);
  console.log('Fixing imports...\n');
  
  sourceFiles.forEach(file => fixImportsInFile(file));
  
  // Report
  if (FIXES.length > 0) {
    console.log(`✅ Fixed ${FIXES.length} import issues:\n`);
    FIXES.forEach(fix => {
      console.log(`  ${fix.file}`);
      console.log(`    ${fix.reason}`);
      console.log(`    ${fix.oldImport} -> ${fix.newImport}\n`);
    });
    
    // Write report
    const reportPath = path.join(rootDir, 'IMPORT_FIXES_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(FIXES, null, 2));
    console.log(`📄 Full report written to: ${reportPath}`);
  } else {
    console.log('✅ No import issues found!');
  }
}

main();

