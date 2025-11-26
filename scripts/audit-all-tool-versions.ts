#!/usr/bin/env node
/**
 * Audit All Tool Versions
 * 
 * Comprehensive audit of all tools, versions, and custom tools
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

interface ToolVersion {
  name: string;
  current: string;
  expected: string;
  status: 'ok' | 'outdated' | 'missing';
  location: string;
}

interface CustomTool {
  name: string;
  path: string;
  version: string;
  type: 'package' | 'script' | 'rust' | 'other';
  description: string;
}

const STANDARD_VERSIONS = {
  node: '20.18.0',
  pnpm: '8.15.0',
  turbo: '2.0.0',
  typescript: '5.6.0',
  rust: 'stable',
};

const TOOLS: ToolVersion[] = [];
const CUSTOM_TOOLS: CustomTool[] = [];

/**
 * Find all package.json files
 */
function findPackageJsonFiles(): string[] {
  const files: string[] = [];
  
  const searchDirs = ['packages', 'apps', 'rust-engines'];
  
  for (const dir of searchDirs) {
    const dirPath = path.join(ROOT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    
    function search(currentDir: string): void {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory()) {
          if (['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
            continue;
          }
          search(fullPath);
        } else if (entry.name === 'package.json') {
          files.push(fullPath);
        }
      }
    }
    
    search(dirPath);
  }
  
  return files;
}

/**
 * Audit package.json
 */
function auditPackageJson(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pkg = JSON.parse(content);
    const relPath = path.relative(ROOT_DIR, filePath);
    
    // Check packageManager
    if (pkg.packageManager) {
      if (!pkg.packageManager.includes('pnpm')) {
        TOOLS.push({
          name: 'packageManager',
          current: pkg.packageManager,
          expected: `pnpm@${STANDARD_VERSIONS.pnpm}`,
          status: 'outdated',
          location: relPath,
        });
      }
    } else {
      TOOLS.push({
        name: 'packageManager',
        current: 'missing',
        expected: `pnpm@${STANDARD_VERSIONS.pnpm}`,
        status: 'missing',
        location: relPath,
      });
    }
    
    // Check engines
    if (pkg.engines) {
      if (pkg.engines.node && !pkg.engines.node.includes('20')) {
        TOOLS.push({
          name: 'node',
          current: pkg.engines.node,
          expected: `>=${STANDARD_VERSIONS.node}`,
          status: 'outdated',
          location: relPath,
        });
      }
      if (pkg.engines.pnpm && !pkg.engines.pnpm.includes('8')) {
        TOOLS.push({
          name: 'pnpm',
          current: pkg.engines.pnpm,
          expected: `>=${STANDARD_VERSIONS.pnpm}`,
          status: 'outdated',
          location: relPath,
        });
      }
    }
    
    // Check TypeScript
    if (pkg.devDependencies?.typescript) {
      const tsVersion = pkg.devDependencies.typescript.replace(/[\^~]/, '');
      if (!tsVersion.startsWith('5.')) {
        TOOLS.push({
          name: 'typescript',
          current: pkg.devDependencies.typescript,
          expected: STANDARD_VERSIONS.typescript,
          status: 'outdated',
          location: relPath,
        });
      }
    }
    
    // Check for npm
    if (pkg.dependencies?.npm || pkg.devDependencies?.npm) {
      TOOLS.push({
        name: 'npm (FORBIDDEN)',
        current: 'present',
        expected: 'removed',
        status: 'outdated',
        location: relPath,
      });
    }
    
    // Identify custom tools
    if (pkg.name && (pkg.name.includes('cathedral') || pkg.name.includes('cli') || pkg.name.includes('tool'))) {
      CUSTOM_TOOLS.push({
        name: pkg.name,
        path: relPath,
        version: pkg.version || 'unknown',
        type: 'package',
        description: pkg.description || 'No description',
      });
    }
  } catch (e) {
    // Skip invalid JSON
  }
}

/**
 * Find custom scripts/tools
 */
function findCustomScripts(): void {
  const scriptsDir = path.join(ROOT_DIR, 'scripts');
  if (!fs.existsSync(scriptsDir)) return;
  
  const files = fs.readdirSync(scriptsDir, { withFileTypes: true });
  
  for (const file of files) {
    if (file.isFile() && (file.name.endsWith('.sh') || file.name.endsWith('.ts') || file.name.endsWith('.js'))) {
      CUSTOM_TOOLS.push({
        name: file.name,
        path: `scripts/${file.name}`,
        version: '1.0.0',
        type: 'script',
        description: `Custom script: ${file.name}`,
      });
    }
  }
}

/**
 * Find Rust tools
 */
function findRustTools(): void {
  const rustDir = path.join(ROOT_DIR, 'rust-engines');
  if (!fs.existsSync(rustDir)) return;
  
  const cargoToml = path.join(rustDir, 'Cargo.toml');
  if (fs.existsSync(cargoToml)) {
    try {
      const content = fs.readFileSync(cargoToml, 'utf8');
      // Extract workspace members
      const memberMatch = content.match(/members\s*=\s*\[(.*?)\]/s);
      if (memberMatch) {
        const members = memberMatch[1]
          .split(',')
          .map(m => m.trim().replace(/['"]/g, ''))
          .filter(m => m);
        
        for (const member of members) {
          const memberPath = path.join(rustDir, member);
          if (fs.existsSync(memberPath)) {
            CUSTOM_TOOLS.push({
              name: member,
              path: `rust-engines/${member}`,
              version: '0.1.0',
              type: 'rust',
              description: `Rust package: ${member}`,
            });
          }
        }
      }
    } catch (e) {
      // Skip if can't parse
    }
  }
}

/**
 * Main execution
 */
function main(): void {
  console.log('🔍 Auditing All Tool Versions...\n');
  
  // Audit all package.json files
  const packageFiles = findPackageJsonFiles();
  console.log(`📦 Found ${packageFiles.length} package.json files\n`);
  
  for (const file of packageFiles) {
    auditPackageJson(file);
  }
  
  // Find custom tools
  findCustomScripts();
  findRustTools();
  
  // Report
  console.log('📊 Tool Version Audit Results:\n');
  
  const outdated = TOOLS.filter(t => t.status === 'outdated');
  const missing = TOOLS.filter(t => t.status === 'missing');
  
  if (outdated.length > 0) {
    console.log('⚠️  Outdated Versions:');
    outdated.forEach(tool => {
      console.log(`  ${tool.name} in ${tool.location}`);
      console.log(`    Current: ${tool.current}`);
      console.log(`    Expected: ${tool.expected}`);
    });
    console.log('');
  }
  
  if (missing.length > 0) {
    console.log('❌ Missing Versions:');
    missing.forEach(tool => {
      console.log(`  ${tool.name} in ${tool.location}`);
      console.log(`    Expected: ${tool.expected}`);
    });
    console.log('');
  }
  
  if (outdated.length === 0 && missing.length === 0) {
    console.log('✅ All tool versions are standardized!\n');
  }
  
  // Custom tools report
  console.log(`🛠️  Custom Tools Found: ${CUSTOM_TOOLS.length}\n`);
  
  const byType = CUSTOM_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.type]) acc[tool.type] = [];
    acc[tool.type].push(tool);
    return acc;
  }, {} as Record<string, CustomTool[]>);
  
  for (const [type, tools] of Object.entries(byType)) {
    console.log(`  ${type}:`);
    tools.forEach(tool => {
      console.log(`    ${tool.name} (v${tool.version}) - ${tool.path}`);
    });
    console.log('');
  }
  
  // Save report
  const reportPath = path.join(ROOT_DIR, 'TOOLS_VERSION_AUDIT.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      standardVersions: STANDARD_VERSIONS,
      tools: TOOLS,
      customTools: CUSTOM_TOOLS,
      summary: {
        totalPackages: packageFiles.length,
        outdated: outdated.length,
        missing: missing.length,
        customToolsCount: CUSTOM_TOOLS.length,
      },
    }, null, 2)
  );
  
  console.log(`📄 Full report saved: TOOLS_VERSION_AUDIT.json`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { auditPackageJson, findCustomScripts, findRustTools };

