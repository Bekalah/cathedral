#!/usr/bin/env node

/**
 * Rename all packages to @cathedral scope
 * This script updates package.json files and pnpm-workspace.yaml
 */

const fs = require('fs');
const path = require('path');

// Use process.cwd() to get the repository root
const REPO_ROOT = process.cwd();
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages');
const WORKSPACE_FILE = path.join(REPO_ROOT, 'pnpm-workspace.yaml');

// Get all package directories
const packages = fs
  .readdirSync(PACKAGES_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${packages.length} packages to rename\n`);

let renamedCount = 0;
let skippedCount = 0;

// Process each package
packages.forEach(pkgName => {
  const pkgPath = path.join(PACKAGES_DIR, pkgName);
  const packageJsonPath = path.join(pkgPath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.log(`⚠️  Skipping ${pkgName} - no package.json`);
    skippedCount++;
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldName = packageJson.name;

    // Check if already scoped correctly
    if (oldName && oldName.startsWith('@cathedral/')) {
      console.log(`✓  ${oldName} - already scoped`);
      skippedCount++;
      return;
    }

    // Determine new name
    const baseName = oldName || pkgName;
    const newName = baseName.startsWith('@')
      ? `@cathedral/${baseName.split('/')[1]}`
      : `@cathedral/${baseName}`;

    packageJson.name = newName;

    // Write back
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

    console.log(`✅ Renamed: ${oldName || pkgName} → ${newName}`);
    renamedCount++;
  } catch (error) {
    console.error(`❌ Error processing ${pkgName}:`, error.message);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Renamed: ${renamedCount}`);
console.log(`   Skipped: ${skippedCount}`);
console.log(`   Total: ${packages.length}`);

// Update pnpm-workspace.yaml to use simplified glob
console.log(`\n📝 Updating pnpm-workspace.yaml...`);
const workspaceConfig = `packages:
  - "packages/*"
  - "apps/*"
`;

fs.writeFileSync(WORKSPACE_FILE, workspaceConfig, 'utf8');
console.log(`✅ Updated pnpm-workspace.yaml\n`);

console.log(`🎉 Package renaming complete!`);
console.log(`\nNext steps:`);
console.log(`1. Run: pnpm install`);
console.log(`2. Review changes: git status`);
console.log(
  `3. Commit: git add -A && git commit -m "feat: Rename all packages to @cathedral scope"`
);
