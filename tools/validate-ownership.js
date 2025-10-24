#!/usr/bin/env node

/**
 * Component Ownership Validator
 *
 * Validates that files are being modified by their correct owners
 * Prevents accidental overwrites and conflicts between components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, '../COMPONENT_OWNERSHIP_REGISTRY.json');

function loadOwnershipRegistry() {
  try {
    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf8');
    return JSON.parse(registryContent);
  } catch (error) {
    console.error('❌ Error loading ownership registry:', error.message);
    return null;
  }
}

function getFileOwner(filePath, registry) {
  const relativePath = path.relative(process.cwd(), filePath);

  for (const [componentId, component] of Object.entries(registry.components)) {
    for (const pattern of component.files) {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      if (regex.test(relativePath)) {
        return componentId;
      }
    }
  }

  return null;
}

function validateFileOwnership(filePath, registry) {
  const owner = getFileOwner(filePath, registry);

  if (!owner) {
    console.warn(`⚠️  WARNING: No owner found for ${filePath}`);
    console.warn(`   Consider adding this file to a component's ownership registry`);
    return { valid: false, owner: null, warning: true };
  }

  return { valid: true, owner, warning: false };
}

function checkStagedFiles(registry) {
  const { execSync } = require('child_process');

  try {
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(file => file.length > 0);

    if (stagedFiles.length === 0) {
      console.log('✅ No files staged for commit');
      return true;
    }

    console.log(`🔍 Validating ownership for ${stagedFiles.length} staged files...`);

    let allValid = true;

    for (const file of stagedFiles) {
      const result = validateFileOwnership(file, registry);

      if (result.warning) {
        allValid = false;
      } else {
        console.log(`✅ ${file} - Owned by: ${result.owner}`);
      }
    }

    return allValid;

  } catch (error) {
    console.error('❌ Error checking staged files:', error.message);
    return false;
  }
}

function main() {
  console.log('🏰 Cathedral Component Ownership Validator');
  console.log('=========================================');

  const registry = loadOwnershipRegistry();

  if (!registry) {
    console.error('❌ Could not load ownership registry');
    process.exit(1);
  }

  const allValid = checkStagedFiles(registry);

  if (allValid) {
    console.log('\n🎉 All files have valid ownership!');
    console.log('✅ Safe to proceed with commit');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some files have ownership issues');
    console.log('Please review and fix before committing');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateFileOwnership, loadOwnershipRegistry, checkStagedFiles };
