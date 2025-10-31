#!/usr/bin/env node

/**
 * Turbo Configuration Validator
 *
 * Validates that turbo.json files use the correct format with "pipeline" instead of "tasks"
 * This prevents the "Property pipeline is not allowed" error in future builds.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TURBO_CONFIGS = [
  'turbo.json',
  'config/turbo.json'
];

function validateTurboConfig(filePath) {
  console.log(`🔍 Validating ${filePath}...`);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} not found, skipping...`);
    return true;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const config = JSON.parse(content);

  // Check for deprecated "tasks" key
  if (config.tasks) {
    console.error(`❌ ERROR: Found deprecated "tasks" key in ${filePath}`);
    console.error(`   Please change "tasks" to "pipeline" to fix this issue.`);
    console.error(`   See: https://turbo.build/repo/docs/reference/configuration`);
    return false;
  }

  // Check for correct "pipeline" key
  if (!config.pipeline) {
    console.error(`❌ ERROR: Missing required "pipeline" key in ${filePath}`);
    return false;
  }

  // Validate pipeline structure
  const pipeline = config.pipeline;
  if (typeof pipeline !== 'object') {
    console.error(`❌ ERROR: "pipeline" must be an object in ${filePath}`);
    return false;
  }

  // Check for common pipeline tasks
  const requiredTasks = ['build', 'dev', 'lint'];
  const missingTasks = requiredTasks.filter(task => !pipeline[task]);

  if (missingTasks.length > 0) {
    console.warn(`⚠️  WARNING: Missing common pipeline tasks in ${filePath}: ${missingTasks.join(', ')}`);
  }

  console.log(`✅ ${filePath} is valid!`);
  return true;
}

function main() {
  console.log('🚀 Turbo Configuration Validator');
  console.log('================================');

  let allValid = true;

  TURBO_CONFIGS.forEach(configPath => {
    const fullPath = path.resolve(configPath);
    const isValid = validateTurboConfig(fullPath);
    if (!isValid) {
      allValid = false;
    }
  });

  if (allValid) {
    console.log('\n🎉 All turbo.json configurations are valid!');
    process.exit(0);
  } else {
    console.log('\n💥 Some turbo.json configurations have issues. Please fix them before building.');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateTurboConfig };
