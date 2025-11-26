#!/usr/bin/env node
/**
 * Recover Real Data
 * 
 * Safely recovers real data files from all cathedral repositories
 * Ensures no data loss, preserves all existing work
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DataFile {
  source: string;
  destination: string;
  type: 'codex' | 'arcana' | 'circuitum' | 'stone-grimoire' | 'other';
  status: 'missing' | 'exists' | 'recovered';
  size?: number;
}

const DATA_SOURCES = [
  '/Users/rebeccalemke/cathedral-real/data',
  '/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master/data',
  '/Users/rebeccalemke/cathedral-fixed-clean/packages/data',
  '/Users/rebeccalemke/cathedral-fixed-clean/packages/codex-144-99/data',
  '/Users/rebeccalemke/cathedral-fixed-clean/packages/liber-arcanae/data',
];

const DATA_MAPPINGS: Array<{
  sourceFile: string;
  destFile: string;
  type: DataFile['type'];
  priority: 'critical' | 'important' | 'standard';
}> = [
  // Critical Codex data
  {
    sourceFile: 'codex-144-expanded.json',
    destFile: 'packages/codex-144-99/data/codex-144-expanded.json',
    type: 'codex',
    priority: 'critical',
  },
  {
    sourceFile: 'codex-144-expanded.json',
    destFile: 'data/codex-144-expanded.json',
    type: 'codex',
    priority: 'critical',
  },
  
  // Critical Arcana data
  {
    sourceFile: 'complete-arcana-profiles.json',
    destFile: 'packages/liber-arcanae/data/complete-arcana-profiles.json',
    type: 'arcana',
    priority: 'critical',
  },
  {
    sourceFile: 'complete-arcana-profiles.json',
    destFile: 'data/complete-arcana-profiles.json',
    type: 'arcana',
    priority: 'critical',
  },
  {
    sourceFile: 'complete-rebecca-arcanae-influences.json',
    destFile: 'packages/liber-arcanae/data/complete-rebecca-arcanae-influences.json',
    type: 'arcana',
    priority: 'critical',
  },
  
  // Important datasets
  {
    sourceFile: 'mcp-permanent-dataset.json',
    destFile: 'data/mcp-permanent-dataset.json',
    type: 'other',
    priority: 'important',
  },
  {
    sourceFile: 'research-sources.json',
    destFile: 'data/research-sources.json',
    type: 'other',
    priority: 'important',
  },
  {
    sourceFile: 'trinity-architecture.json',
    destFile: 'data/trinity-architecture.json',
    type: 'other',
    priority: 'important',
  },
  {
    sourceFile: 'pigments-database.json',
    destFile: 'data/pigments-database.json',
    type: 'other',
    priority: 'standard',
  },
  {
    sourceFile: 'sacred-geometry-generated.json',
    destFile: 'data/sacred-geometry-generated.json',
    type: 'other',
    priority: 'standard',
  },
];

const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Find data file in source directories
 */
function findDataFile(filename: string): string | null {
  for (const sourceDir of DATA_SOURCES) {
    const filePath = path.join(sourceDir, filename);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

/**
 * Safely copy file (preserves existing if newer)
 */
function safeCopyFile(source: string, dest: string): boolean {
  try {
    // Check if destination exists
    if (fs.existsSync(dest)) {
      const sourceStats = fs.statSync(source);
      const destStats = fs.statSync(dest);
      
      // Only copy if source is newer or larger
      if (sourceStats.mtime > destStats.mtime || sourceStats.size > destStats.size) {
        console.log(`  📄 Updating: ${path.basename(dest)} (source is newer)`);
        fs.copyFileSync(source, dest);
        return true;
      } else {
        console.log(`  ✓ Preserved: ${path.basename(dest)} (destination is current)`);
        return false;
      }
    } else {
      // Destination doesn't exist, create directory and copy
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      console.log(`  📥 Recovered: ${path.basename(dest)}`);
      fs.copyFileSync(source, dest);
      return true;
    }
  } catch (error) {
    console.error(`  ❌ Error copying ${source} to ${dest}:`, error);
    return false;
  }
}

/**
 * Recover all data files
 */
function recoverData(): void {
  console.log('🔍 Recovering Real Data Files...\n');
  
  const results: DataFile[] = [];
  let recovered = 0;
  let preserved = 0;
  let missing = 0;
  
  for (const mapping of DATA_MAPPINGS) {
    const sourcePath = findDataFile(mapping.sourceFile);
    const destPath = path.join(ROOT_DIR, mapping.destFile);
    
    if (!sourcePath) {
      console.log(`⚠️  Missing: ${mapping.sourceFile} (not found in any source)`);
      results.push({
        source: 'not found',
        destination: mapping.destFile,
        type: mapping.type,
        status: 'missing',
      });
      missing++;
      continue;
    }
    
    const sourceStats = fs.statSync(sourcePath);
    const wasRecovered = safeCopyFile(sourcePath, destPath);
    
    results.push({
      source: sourcePath,
      destination: mapping.destFile,
      type: mapping.type,
      status: wasRecovered ? 'recovered' : 'exists',
      size: sourceStats.size,
    });
    
    if (wasRecovered) {
      recovered++;
    } else {
      preserved++;
    }
  }
  
  // Summary
  console.log('\n📊 Recovery Summary:');
  console.log(`  ✅ Recovered: ${recovered} files`);
  console.log(`  ✓ Preserved: ${preserved} files`);
  console.log(`  ⚠️  Missing: ${missing} files`);
  
  // Save report
  const reportPath = path.join(ROOT_DIR, 'DATA_RECOVERY_REPORT.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        recovered,
        preserved,
        missing,
        total: results.length,
      },
      results,
    }, null, 2)
  );
  
  console.log(`\n📄 Report saved: DATA_RECOVERY_REPORT.json`);
}

/**
 * Verify data integrity
 */
function verifyData(): void {
  console.log('\n🔍 Verifying Data Integrity...\n');
  
  const criticalFiles = DATA_MAPPINGS.filter(m => m.priority === 'critical');
  let allGood = true;
  
  for (const mapping of criticalFiles) {
    const destPath = path.join(ROOT_DIR, mapping.destFile);
    
    if (!fs.existsSync(destPath)) {
      console.log(`  ❌ Missing: ${mapping.destFile}`);
      allGood = false;
      continue;
    }
    
    try {
      const content = fs.readFileSync(destPath, 'utf8');
      JSON.parse(content); // Validate JSON
      const stats = fs.statSync(destPath);
      console.log(`  ✅ Valid: ${mapping.destFile} (${(stats.size / 1024).toFixed(2)} KB)`);
    } catch (error) {
      console.log(`  ❌ Invalid JSON: ${mapping.destFile}`);
      allGood = false;
    }
  }
  
  if (allGood) {
    console.log('\n✅ All critical data files verified!');
  } else {
    console.log('\n⚠️  Some data files need attention');
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  recoverData();
  verifyData();
}

export { recoverData, verifyData, findDataFile };

