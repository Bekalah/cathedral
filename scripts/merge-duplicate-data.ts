#!/usr/bin/env node
/**
 * Merge Duplicate Data
 * 
 * Intelligently merges duplicate data files, preserving the most complete version
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

interface DataFile {
  path: string;
  size: number;
  mtime: Date;
  content: any;
}

/**
 * Find all instances of a data file
 */
function findDataFileInstances(filename: string): DataFile[] {
  const instances: DataFile[] = [];
  const searchPaths = [
    path.join(ROOT_DIR, 'data'),
    path.join(ROOT_DIR, 'packages', 'codex-144-99', 'data'),
    path.join(ROOT_DIR, 'packages', 'liber-arcanae', 'data'),
    path.join(ROOT_DIR, 'packages', 'circuitum99', 'data'),
    path.join(ROOT_DIR, 'packages', 'stone-grimoire', 'data'),
  ];
  
  for (const searchPath of searchPaths) {
    const filePath = path.join(searchPath, filename);
    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        instances.push({
          path: filePath,
          size: stats.size,
          mtime: stats.mtime,
          content,
        });
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
  
  return instances;
}

/**
 * Merge JSON objects deeply
 */
function deepMerge(target: any, source: any): any {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Find the best version of a data file
 */
function findBestVersion(instances: DataFile[]): DataFile | null {
  if (instances.length === 0) return null;
  if (instances.length === 1) return instances[0];
  
  // Prefer largest file (most complete)
  let best = instances[0];
  for (const instance of instances) {
    if (instance.size > best.size) {
      best = instance;
    }
  }
  
  return best;
}

/**
 * Merge all instances to the best version
 */
function mergeDataFile(filename: string): void {
  const instances = findDataFileInstances(filename);
  
  if (instances.length === 0) {
    console.log(`  ⚠️  No instances found: ${filename}`);
    return;
  }
  
  if (instances.length === 1) {
    console.log(`  ✓ Single instance: ${filename}`);
    return;
  }
  
  console.log(`  🔄 Merging ${instances.length} instances of ${filename}`);
  
  // Find best version
  const best = findBestVersion(instances);
  if (!best) return;
  
  // Merge all into best
  let merged = best.content;
  for (const instance of instances) {
    if (instance.path !== best.path) {
      merged = deepMerge(merged, instance.content);
    }
  }
  
  // Write merged version to all locations
  for (const instance of instances) {
    fs.writeFileSync(
      instance.path,
      JSON.stringify(merged, null, 2),
      'utf8'
    );
  }
  
  console.log(`    ✅ Merged to ${instances.length} locations`);
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔄 Merging Duplicate Data...\n');
  
  const dataFiles = [
    'codex-144-expanded.json',
    'complete-arcana-profiles.json',
    'complete-rebecca-arcanae-influences.json',
    'mcp-permanent-dataset.json',
  ];
  
  for (const filename of dataFiles) {
    mergeDataFile(filename);
  }
  
  console.log('\n✅ Data merging complete!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { mergeDataFile, findBestVersion, deepMerge };

