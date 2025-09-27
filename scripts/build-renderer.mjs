#!/usr/bin/env node
/*
  build-renderer.mjs
  Offline-friendly bundler that prepares the Cosmic Helix renderer for container builds.

  Prime Law observance:
  - No network I/O; only local filesystem work.
  - Small, pure helpers with explicit inputs keep edits safe offline.
  - Comments explain ND-safe intent (no motion, calm fallbacks).
*/

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD_DIR = join(PROJECT_ROOT, 'build');
const DIST_DIR = join(PROJECT_ROOT, 'dist');

const SOURCE_FILES = Object.freeze([
  'index.html',
  'js/helix-renderer.mjs',
  'apps/web/public/registry/palette.json',
  'README_RENDERER.md'
]);

const PLACEHOLDERS = Object.freeze([
  { key: 'stone-grimoire', title: 'Stone Grimoire', body: 'Static grimoire shell - content supplied in offline rituals.' },
  { key: 'circuitum99', title: 'Circuitum 99', body: 'Circuit map placeholder - keeps routes alive without motion.' }
]);

const ENCODING = 'utf8';

async function main(argv) {
  const phase = readPhase(argv);
  if (phase === 'build') {
    await writeManifest();
  } else if (phase === 'bundle') {
    await bundleStatic();
  } else {
    throw new Error('Unknown phase for build-renderer.mjs');
  }
}

function readPhase(argv) {
  const candidate = argv[2];
  if (candidate === 'build' || candidate === 'bundle') {
    return candidate;
  }
  // Default to bundle so manual runs hydrate dist/ for local preview.
  return 'bundle';
}

async function writeManifest() {
  const entries = [];
  for (const relativePath of SOURCE_FILES) {
    const absolutePath = join(PROJECT_ROOT, relativePath);
    const stats = await fs.stat(absolutePath);
    const hash = await hashFile(absolutePath);
    entries.push({
      path: relativePath,
      bytes: stats.size,
      sha256: hash
    });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    rationale: 'Manifest documents renderer inputs so edits remain auditable offline.',
    files: entries
  };

  await ensureDir(BUILD_DIR);
  await fs.writeFile(join(BUILD_DIR, 'renderer-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', ENCODING);
}

async function bundleStatic() {
  await resetDir(DIST_DIR);
  await copyRendererBundle('cosmogenesis');
  for (const placeholder of PLACEHOLDERS) {
    await ensurePlaceholder(placeholder);
  }
  await fs.writeFile(join(DIST_DIR, 'README.txt'), buildDistReadme(), ENCODING);
}

async function copyRendererBundle(targetKey) {
  const targetDir = join(DIST_DIR, targetKey);
  await ensureDir(targetDir);
  await copyFile('index.html', join(targetDir, 'index.html'));
  await copyDir('js', join(targetDir, 'js'));
  await copyDir('apps/web/public/registry', join(targetDir, 'apps/web/public/registry'));
  await copyFile('README_RENDERER.md', join(targetDir, 'README_RENDERER.md'));
}

async function ensurePlaceholder(spec) {
  const targetDir = join(DIST_DIR, spec.key);
  await ensureDir(targetDir);
  const html = buildPlaceholderHtml(spec);
  await fs.writeFile(join(targetDir, 'index.html'), html, ENCODING);
}

function buildPlaceholderHtml(spec) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <title>' + spec.title + ' (Offline Placeholder)</title>',
    '  <meta name="viewport" content="width=device-width,initial-scale=1">',
    '  <meta name="color-scheme" content="light dark">',
    '  <style>',
    '    :root { --bg:#0b0b12; --ink:#e8e8f0; --muted:#a6a6c1; }',
    '    html,body { margin:0; padding:0; background:var(--bg); color:var(--ink); font:16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }',
    '    main { max-width:640px; margin:15vh auto; padding:24px; border:1px solid #1d1d2a; background:rgba(13,13,20,0.92); }',
    '    h1 { margin-top:0; font-size:1.8rem; }',
    '    p { color:var(--muted); }',
    '    a { color:var(--ink); }',
    '  </style>',
    '</head>',
    '<body>',
    '  <main>',
    '    <h1>' + spec.title + '</h1>',
    '    <p>' + spec.body + '</p>',
    '    <p><a href="/cosmogenesis/">Return to Cosmogenesis renderer</a></p>',
    '  </main>',
    '</body>',
    '</html>',
    ''
  ].join('\n');
}

async function copyFile(relativeSource, absoluteTarget) {
  const absoluteSource = join(PROJECT_ROOT, relativeSource);
  await ensureDir(dirname(absoluteTarget));
  await fs.copyFile(absoluteSource, absoluteTarget);
}

async function copyDir(relativeSource, absoluteTarget) {
  const absoluteSource = join(PROJECT_ROOT, relativeSource);
  await ensureDir(dirname(absoluteTarget));
  await fs.cp(absoluteSource, absoluteTarget, { recursive: true });
}

async function ensureDir(path) {
  await fs.mkdir(path, { recursive: true });
}

async function resetDir(path) {
  await fs.rm(path, { recursive: true, force: true });
  await ensureDir(path);
}

async function hashFile(path) {
  const data = await fs.readFile(path);
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

function buildDistReadme() {
  return [
    'Cosmic Helix dist bundle (offline)',
    '',
    'Generated by scripts/build-renderer.mjs.',
    'Routes:',
    '  /cosmogenesis/  -> full renderer with layered geometry.',
    '  /stone-grimoire/ -> placeholder shell kept static for ND-safe calm.',
    '  /circuitum99/   -> placeholder shell so Fly routes do not 404.',
    '',
    'All assets stay offline. Update apps/web/public/registry/palette.json then rerun npm run bundle:static.',
    ''
  ].join('\n');
}

await main(process.argv);
