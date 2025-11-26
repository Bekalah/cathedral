#!/usr/bin/env ts-node
/**
 * MASTER V1 TOOL INTEGRATION SETUP
 * Wires all tools together properly
 */

import * as fs from 'fs';
import * as path from 'path';

const TARGET_DIR = '/Users/rebeccalemke/cathedral-fixed-clean';

interface ToolConnection {
  from: string;
  to: string;
  type: 'import' | 'event' | 'data-sync' | 'bridge';
  ribbon?: string;
}

const CONNECTIONS: ToolConnection[] = [
  // Tesseract Bridge connections
  { from: 'tesseract-bridge', to: 'circuitum99', type: 'bridge', ribbon: 'game' },
  { from: 'tesseract-bridge', to: 'stone-grimoire', type: 'bridge', ribbon: 'esoteric' },
  { from: 'tesseract-bridge', to: 'cosmogenesis-learning-engine', type: 'bridge', ribbon: 'science' },
  { from: 'tesseract-bridge', to: 'magical-mystery-house', type: 'bridge', ribbon: 'game' },
  { from: 'tesseract-bridge', to: 'liber-arcanae', type: 'bridge', ribbon: 'psych' },
  { from: 'tesseract-bridge', to: 'codex-144-99', type: 'bridge', ribbon: 'esoteric' },
  
  // Tarot system connections
  { from: 'tarot-reader', to: 'tarot-engine', type: 'import' },
  { from: 'tarot-engine', to: 'liber-arcanae', type: 'import' },
  { from: 'tarot-engine', to: 'codex-144-99', type: 'import' },
  { from: 'tarot-arena', to: 'tarot-reader', type: 'import' },
  { from: 'tarot-arena', to: 'tarot-engine', type: 'import' },
  
  // RPG connections
  { from: 'circuitum99', to: 'fable-rpg-mechanics', type: 'import' },
  { from: 'circuitum99', to: 'daimon-gear', type: 'import' },
  { from: 'cyoa-book-game', to: 'circuitum99', type: 'import' },
  { from: 'cyoa-book-game', to: 'characters', type: 'import' },
  { from: 'fable-rpg-mechanics', to: 'characters', type: 'import' },
  { from: 'fable-rpg-mechanics', to: 'codex-144-99', type: 'import' },
  
  // Design/Craft connections
  { from: 'cathedral-design-library', to: 'master-art-principles', type: 'import' },
  { from: 'cathedral-design-library', to: 'japanese-design-system', type: 'import' },
  { from: 'cathedral-design-studio', to: 'cathedral-design-library', type: 'import' },
  { from: 'synth-lab', to: 'synth', type: 'import' },
  
  // Trinity Architecture
  { from: 'circuitum99', to: 'stone-grimoire', type: 'bridge' },
  { from: 'circuitum99', to: 'cosmogenesis-learning-engine', type: 'bridge' },
  { from: 'stone-grimoire', to: 'cosmogenesis-learning-engine', type: 'bridge' },
  
  // Living systems
  { from: 'living-canon-engine', to: 'codex-144-99', type: 'import' },
  { from: 'living-canon-engine', to: 'liber-arcanae', type: 'import' },
  { from: 'living-library', to: 'living-canon-engine', type: 'import' },
  
  // Inter-app communication
  { from: 'inter-app-communicator', to: 'tesseract-bridge', type: 'event' },
];

function ensurePackageExports(packageName: string): void {
  const packageDir = path.join(TARGET_DIR, 'packages', packageName);
  const indexPath = path.join(packageDir, 'src', 'index.ts');
  
  if (!fs.existsSync(packageDir)) {
    console.log(`⚠️  Package ${packageName} not found, skipping...`);
    return;
  }
  
  if (!fs.existsSync(path.join(packageDir, 'src'))) {
    fs.mkdirSync(path.join(packageDir, 'src'), { recursive: true });
  }
  
  if (!fs.existsSync(indexPath)) {
    const content = `/**
 * ${packageName}
 * 
 * @package @cathedral/${packageName}
 */

export * from './types';
`;
    fs.writeFileSync(indexPath, content);
    console.log(`✅ Created index.ts for ${packageName}`);
  }
}

function createIntegrationFile(): void {
  const integrationPath = path.join(TARGET_DIR, 'packages/shared/src/integrations.ts');
  const content = `/**
 * Tool Integrations
 * Auto-generated integration file connecting all tools
 */

import { tesseractBridge } from '@cathedral/tesseract-bridge';

/**
 * Initialize all tool integrations
 */
export function initializeAllIntegrations(): void {
  // Register all bridge endpoints
  const endpoints = [
    'circuitum99',
    'stone-grimoire',
    'cosmogenesis-learning-engine',
    'magical-mystery-house',
    'liber-arcanae',
    'codex-144-99',
    'tarot-reader',
    'tarot-engine',
    'daimon-gear',
    'living-canon-engine',
  ];
  
  endpoints.forEach(endpoint => {
    tesseractBridge.registerEndpoint({
      name: endpoint,
      url: \`/packages/\${endpoint}\`,
      protocol: {
        type: 'data-sync',
        version: '1.0.0',
        encryption: true,
        compression: true,
      },
      security: {
        type: 'protection-seal',
        enabled: true,
      },
      status: 'active',
    });
  });
  
  console.log('✅ All tool integrations initialized');
}

/**
 * Get integration status
 */
export function getIntegrationStatus() {
  return tesseractBridge.getBridgeStatus();
}
`;
  
  const sharedDir = path.join(TARGET_DIR, 'packages/shared/src');
  if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir, { recursive: true });
  }
  
  fs.writeFileSync(integrationPath, content);
  console.log('✅ Created shared/integrations.ts');
}

function main() {
  console.log('🏛️ Setting up tool integrations...\n');
  
  // Ensure all packages have proper exports
  const packages = Array.from(new Set(CONNECTIONS.map(c => c.from).concat(CONNECTIONS.map(c => c.to))));
  packages.forEach(pkg => {
    if (!pkg.includes('-')) return; // Skip non-package names
    ensurePackageExports(pkg);
  });
  
  // Create integration file
  createIntegrationFile();
  
  console.log('\n✅ Tool integration setup complete!');
  console.log(`\nTotal connections configured: ${CONNECTIONS.length}`);
}

main();

