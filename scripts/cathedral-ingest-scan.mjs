#!/usr/bin/env node
/**
 * cathedral-ingest-scan.mjs
 * Scans the repository (or a supplied directory) and classifies files into:
 * - application entrypoints (apps)
 * - domain packages (packages)
 * - raw html prototypes
 * - markdown codices (MASTER/COMPLETE/etc)
 * - scripts / automation
 * - orphan assets (candidates for migration)
 * Outputs a JSON report to data/ingest/scan-report.json
 */

import { readdir, stat, writeFile } from 'fs/promises';
import path from 'path';

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

const htmlPrototypes = [];
const mdCodices = [];
const appEntries = [];
const packageDirs = [];
const scripts = [];
const orphanFiles = [];

const CODex_MATCH = /\b(MASTER_|COMPLETE_|LIVING_|CATHEDRAL_|CODEX_144_99|PROVENANCE|ARCHETYPE|SYSTEM|ENGINE)/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.git')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // classify high-level
      if (dir === ROOT && e.name === 'apps') {
        const sub = await readdir(full, { withFileTypes: true });
        sub.filter(s => s.isDirectory()).forEach(s => appEntries.push(path.join('apps', s.name)));
      } else if (dir === ROOT && e.name === 'packages') {
        const sub = await readdir(full, { withFileTypes: true });
        sub.filter(s => s.isDirectory()).forEach(s => packageDirs.push(path.join('packages', s.name)));
      }
      await walk(full);
    } else {
      const rel = path.relative(ROOT, full);
      if (e.name.endsWith('.html')) {
        if (!rel.startsWith('apps/')) htmlPrototypes.push(rel);
      } else if (e.name.endsWith('.md')) {
        if (CODex_MATCH.test(e.name)) mdCodices.push(rel);
      } else if (/\.(js|mjs|ts)$/.test(e.name) && rel.startsWith('scripts/')) {
        scripts.push(rel);
      } else if (/\.(js|ts)$/.test(e.name) && !rel.startsWith('apps/') && !rel.startsWith('packages/')) {
        orphanFiles.push(rel);
      }
    }
  }
}

(async () => {
  await walk(ROOT);
  const report = {
    generatedAt: new Date().toISOString(),
    root: ROOT,
    summary: {
      apps: appEntries.length,
      packages: packageDirs.length,
      htmlPrototypes: htmlPrototypes.length,
      mdCodices: mdCodices.length,
      orphanFiles: orphanFiles.length
    },
    apps: appEntries.sort(),
    packages: packageDirs.sort(),
    htmlPrototypes: htmlPrototypes.sort(),
    mdCodices: mdCodices.sort(),
    orphanFiles: orphanFiles.sort(),
    scripts
  };
  const outPath = path.join(ROOT, 'data/ingest/scan-report.json');
  await writeFile(outPath, JSON.stringify(report, null, 2));
  console.log('Ingest scan written ->', outPath);
})();
