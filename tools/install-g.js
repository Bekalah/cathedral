#!/usr/bin/env node
/**
 * Install g helper into local PATH
 * Creates symlink in .local/bin/g and updates .local/.env
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const src = path.join(ROOT, 'tools', 'g');
const destDir = path.join(ROOT, '.local', 'bin');
const dest = path.join(destDir, 'g');

console.log('🔧 Installing g helper...');

try {
  // Create .local/bin directory
  fs.mkdirSync(destDir, { recursive: true });

  // Remove existing symlink if it exists
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }

  // Create symlink
  fs.symlinkSync(src, dest);
  console.log('✅ Created symlink: .local/bin/g -> tools/g');

  // Create .local/.env file
  const shellEnv = path.join(ROOT, '.local', '.env');
  const envContent = `export PATH="$PATH:${destDir}"\n`;

  fs.writeFileSync(shellEnv, envContent, { flag: 'a' });
  console.log('✅ Updated .local/.env');

  console.log('\n🚀 To use g helper:');
  console.log('   source .local/.env    # Add to current shell');
  console.log('   # OR add to your shell rc file:');
  console.log('   echo "source .local/.env" >> ~/.bashrc');
  console.log('   # OR add to your shell rc file:');
  console.log('   echo "source .local/.env" >> ~/.zshrc');

  console.log('\n💡 Now you can use:');
  console.log('   g develop    # Start development environment');
  console.log('   g status     # Check git status');
  console.log('   g build      # Build all packages');
  console.log('   g pr         # Create feature branch');

} catch (error) {
  console.error('❌ Installation failed:', error.message);
  process.exit(1);
}
