import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const livingBlock = JSON.parse(fs.readFileSync(path.join(root, 'config', 'living-artists.blocklist.json'), 'utf8'));

const clone = value => (typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value)));

function sha(object) {
  return crypto.createHash('sha1').update(JSON.stringify(object)).digest('hex');
}

function timestamp(value) {
  const parsed = value && !Number.isNaN(Date.parse(value)) ? Date.parse(value) : 0;
  return parsed;
}

export function mergeRecords(records) {
  const byId = new Map();
  const log = { conflicts: [], skipped: [], info: [] };

  for (const record of records) {
    const bucket = byId.get(record.id) || [];
    bucket.push(record);
    byId.set(record.id, bucket);
  }

  const master = [];
  const index = [];
  const safety = { autoplay: [], motion: [], contrast: [], livingArtistHits: [] };

  for (const [id, bucket] of byId.entries()) {
    const pick = bucket.slice().sort((a, b) => {
      const versionA = versionValue(a.data.version);
      const versionB = versionValue(b.data.version);
      if (versionA !== versionB) return versionB - versionA;
      const timeA = timestamp(a.data.updated);
      const timeB = timestamp(b.data.updated);
      if (timeA !== timeB) return timeB - timeA;
      return a.source.repo.localeCompare(b.source.repo);
    })[0];

    const merged = clone(pick.data);
    const overlays = new Set();
    const lineages = new Set();

    for (const variant of bucket) {
      if (Array.isArray(variant.data.tarot_overlays)) {
        variant.data.tarot_overlays.forEach(value => overlays.add(value));
      }
      const lineage = variant.data.annex && variant.data.annex.lineage;
      if (lineage) {
        const entries = Array.isArray(lineage) ? lineage : [lineage];
        entries.forEach(value => lineages.add(value));
      }
    }

    if (overlays.size) merged.tarot_overlays = Array.from(overlays);
    if (!merged.annex) merged.annex = {};
    if (lineages.size) merged.annex.lineage = Array.from(lineages);

    const safetyInfo = merged.safety || {};
    if (safetyInfo.autoplay === true) safety.autoplay.push(id);
    if (String(safetyInfo.motion || '').toLowerCase() === 'intense') safety.motion.push(id);

    const text = JSON.stringify({ title: merged.title, notes: merged.notes, annex: merged.annex });
    if (livingBlock.names.some(pattern => new RegExp(pattern).test(text))) {
      safety.livingArtistHits.push(id);
    }

    master.push(merged);
    index.push({
      id,
      type: guessType(bucket),
      title: merged.title || id,
      source: bucket.map(item => `${item.source.repo}:${item.source.path}`),
      checksum: sha(merged)
    });

    if (bucket.length > 1) {
      const checksums = bucket.map(item => sha(item.data));
      const unique = new Set(checksums);
      if (unique.size > 1) {
        log.conflicts.push({
          id,
          variants: bucket.map(item => ({
            repo: item.source.repo,
            path: item.source.path,
            sha: sha(item.data),
            version: item.data.version || null,
            updated: item.data.updated || null
          }))
        });
      }
    }
  }

  return { master, index, safety, log };
}

function versionValue(version) {
  if (!version) return 0;
  const match = String(version).match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!match) return 0;
  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);
  return major * 1e6 + minor * 1e3 + patch;
}

function guessType(bucket) {
  return bucket.some(entry => entry.source.path.includes('/cards/major/')) ? 'tarot' : 'node';
}
