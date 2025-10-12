// tools/install-g.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const src = path.join(ROOT, 'tools', 'g');
const destDir = path.join(ROOT, '.local', 'bin');
const dest = path.join(destDir, 'g');

fs.mkdirSync(destDir, { recursive: true });
try {
  if (fs.existsSync(dest)) fs.unlinkSync(dest);
  fs.symlinkSync(src, dest);
  console.log('Installed .local/bin/g -> tools/g');
  const shellEnv = path.join(ROOT, '.local', '.env');
  fs.writeFileSync(shellEnv, `export PATH="$PATH:${destDir}"\n`, { flag: 'a' });
  console.log('Wrote .local/.env (add it to your shell rc to persist)');
} catch (e) {
  console.error('Install failed', e);
  process.exit(1);
}
