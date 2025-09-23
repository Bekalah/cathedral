// engines/blessed-build.js
// Blessed build pipeline that orchestrates muse overlays and provenance files.
// The functions stay pure where possible and respect the clearspace law.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { randomUUID } from 'node:crypto';

import { generateMuseOverlays, buildSafeFrame, computeClearspace } from '../assets/overlays/muse/generator.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const BUILD_DIR = path.join(ROOT, 'build');
const OVERLAY_DIR = path.join(BUILD_DIR, 'overlays');
const MANIFEST_PATH = path.join(BUILD_DIR, 'manifest.json');
const PROVENANCE_PATH = path.join(BUILD_DIR, 'provenance.json');

const PADDING_LAW_VERSION = 'v1.0';

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function createBlessing({ timestamp }) {
  return {
    id: `blessing-${timestamp.replace(/[^0-9]/g, '')}-${randomUUID().slice(0, 8)}`,
    generated_at: timestamp,
    engine: 'muse-blessed-build',
    policy_version: PADDING_LAW_VERSION
  };
}

function createManifest({ overlays, timestamp }) {
  return {
    generated_at: timestamp,
    overlays: overlays.map((overlay) => ({
      id: overlay.id,
      label: overlay.label,
      file: `overlays/${overlay.id}.svg`,
      clearspace_px: overlay.clearspace_px
    })),
    muses: overlays.map((overlay) => ({
      id: overlay.muse.id,
      title: overlay.muse.title,
      inspiration: overlay.muse.inspiration,
      numerology: overlay.muse.numerology,
      overlay: overlay.id
    }))
  };
}

function createProvenance({ overlays, blessing }) {
  const baseSafeFrame = overlays[0]?.safe_frame ?? buildSafeFrame({
    width: 1000,
    height: 1000,
    clearspacePx: computeClearspace(1000)
  });

  return {
    render: {
      clearspace_px: baseSafeFrame.padding_px,
      safe_frame: baseSafeFrame
    },
    policy: {
      padding_law: PADDING_LAW_VERSION
    },
    muses: overlays.map((overlay) => ({
      id: overlay.muse.id,
      title: overlay.muse.title,
      inspiration: overlay.muse.inspiration,
      numerology: overlay.muse.numerology,
      overlay: `overlays/${overlay.id}.svg`
    })),
    blessing
  };
}

async function writeJson(targetPath, data) {
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(targetPath, payload, 'utf8');
}

async function writeOverlays(overlays) {
  await ensureDir(OVERLAY_DIR);
  const tasks = overlays.map((overlay) => {
    const filePath = path.join(OVERLAY_DIR, `${overlay.id}.svg`);
    return fs.writeFile(filePath, overlay.svg, 'utf8');
  });
  await Promise.all(tasks);
}

/**
 * Run the blessed build, persist manifest/provenance, and return the data payload.
 */
export async function blessedBuild() {
  await ensureDir(BUILD_DIR);
  const overlays = generateMuseOverlays();
  const timestamp = new Date().toISOString();
  const blessing = createBlessing({ timestamp });
  const manifest = createManifest({ overlays, timestamp });
  const provenance = createProvenance({ overlays, blessing });

  await writeOverlays(overlays);
  await writeJson(MANIFEST_PATH, manifest);
  await writeJson(PROVENANCE_PATH, provenance);

  return {
    overlays: overlays.map((overlay) => ({
      id: overlay.id,
      label: overlay.label,
      clearspace_px: overlay.clearspace_px,
      safe_frame: overlay.safe_frame,
      svg: overlay.svg
    })),
    muses: manifest.muses,
    manifest,
    provenance,
    blessing
  };
}

export async function readOverlay(id) {
  const filePath = path.join(OVERLAY_DIR, `${id}.svg`);
  return fs.readFile(filePath, 'utf8');
}

export async function readManifest() {
  const content = await fs.readFile(MANIFEST_PATH, 'utf8');
  return JSON.parse(content);
}

export async function readProvenance() {
  const content = await fs.readFile(PROVENANCE_PATH, 'utf8');
  return JSON.parse(content);
}

export const paths = {
  buildDir: BUILD_DIR,
  overlayDir: OVERLAY_DIR,
  manifest: MANIFEST_PATH,
  provenance: PROVENANCE_PATH
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  blessedBuild()
    .then((result) => {
      console.log(`Blessed build completed with ${result.overlays.length} overlays.`);
      console.log(`Manifest stored at ${MANIFEST_PATH}`);
      console.log(`Provenance stored at ${PROVENANCE_PATH}`);
    })
    .catch((error) => {
      console.error('Blessed build failed:', error);
      process.exitCode = 1;
    });
}
