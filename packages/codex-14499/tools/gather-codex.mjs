#!/usr/bin/env node
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadLocalFiles, loadGithubFiles } from './loaders.mjs';
import { validateNode, validateTarot, validateLineage } from './validators.mjs';
import { mergeRecords } from './merge-strategy.mjs';
import { writeReport } from './report.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const argPairs = process.argv.slice(2).map(entry => {
  const [key, value] = entry.split('=');
  return [key.replace(/^--/, '').trim(), (value || '').trim()];
});
const args = new Map(argPairs);

const configInput = args.get('config') || path.join(root, 'config', 'sources.local.json');
const outInput = args.get('out') || path.join(root, 'dist');
const configPath = path.isAbsolute(configInput) ? configInput : path.resolve(process.cwd(), configInput);
const outDir = path.isAbsolute(outInput) ? outInput : path.resolve(process.cwd(), outInput);
await fsp.mkdir(outDir, { recursive: true });

const cfg = JSON.parse(await fsp.readFile(configPath, 'utf8'));
const configDir = path.dirname(configPath);

let files = [];
if (cfg.mode === 'local') {
  const roots = (cfg.roots || []).map(rootPath => path.resolve(configDir, rootPath));
  files = await loadLocalFiles(roots, cfg.globs || []);
} else if (cfg.mode === 'github') {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('GITHUB_TOKEN missing for github mode');
    process.exit(2);
  }
  files = await loadGithubFiles(cfg.org, cfg.repos || [], cfg.globs || [], token);
} else {
  console.error('Unknown mode in config');
  process.exit(2);
}

const records = [];
const errors = [];
const classify = filePath => (
  filePath.includes('/cards/major/') ? 'tarot' :
  filePath.includes('/lineages/') ? 'lineage' :
  'node'
);

for (const file of files) {
  try {
    const data = JSON.parse(file.content);
    const type = classify(file.path);
    if (type === 'node' && !validateNode(data)) throw new Error('node schema fail');
    if (type === 'tarot' && !validateTarot(data)) throw new Error('tarot schema fail');
    if (type === 'lineage' && !validateLineage(data)) throw new Error('lineage schema fail');

    const id = data.id || data.name || path.basename(file.path, '.json');
    const title = data.title || data.name || id;
    records.push({
      id,
      type,
      title,
      data,
      source: { repo: file.repo, path: file.path, sha: file.sha || null }
    });
  } catch (error) {
    errors.push({ file: file.path, repo: file.repo, err: String(error) });
  }
}

const { master, index, safety, log } = mergeRecords(records);

await fsp.writeFile(path.join(outDir, 'codex.master.json'), `${JSON.stringify(master, null, 2)}\n`);
await fsp.writeFile(path.join(outDir, 'codex.index.json'), `${JSON.stringify(index, null, 2)}\n`);
await fsp.writeFile(path.join(outDir, 'codex.safety.json'), `${JSON.stringify(safety, null, 2)}\n`);
await fsp.writeFile(path.join(outDir, 'codex.report.md'), `${writeReport({ records, errors, log, master, safety })}\n`);

console.log(`OK • ${records.length} items → ${path.relative(process.cwd(), outDir) || '.'}`);
