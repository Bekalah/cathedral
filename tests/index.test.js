import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const projectRoot = path.resolve('.');
const htmlPath = path.join(projectRoot, 'index.html');
const htmlContent = readFileSync(htmlPath, 'utf8');

function extractBetween(source, startToken, endToken) {
  const startIndex = source.indexOf(startToken);
  assert.notStrictEqual(startIndex, -1, `Missing start token: ${startToken}`);
  const sliceStart = startIndex + startToken.length;
  const endIndex = source.indexOf(endToken, sliceStart);
  assert.notStrictEqual(endIndex, -1, `Missing end token: ${endToken}`);
  return source.slice(sliceStart, endIndex);
}

test('HTML structure includes required ND-safe metadata and canvas element', () => {
  assert.match(htmlContent, /<meta name="color-scheme" content="light dark">/);
  assert.match(htmlContent, /<canvas id="stage" width="1440" height="900" aria-label="Layered sacred geometry canvas"><\/canvas>/);
  assert.match(htmlContent, /<div class="status" id="status">Loading palette...\<\/div>/);
});

test('FALLBACK_PALETTE definition uses Object.freeze and contains expected keys and layers', () => {
  assert.match(htmlContent, /const FALLBACK_PALETTE = Object\.freeze\(\{/);
  const paletteObjectText = extractBetween(
    htmlContent,
    'const FALLBACK_PALETTE = Object.freeze({',
    '});'
  );
  assert.match(paletteObjectText, /\bbg:\s*"#0b0b12"/);
  assert.match(paletteObjectText, /\bink:\s*"#e8e8f0"/);
  assert.match(
    paletteObjectText,
    /\blayers:\s*\[\s*"#b1c7ff",\s*"#89f7fe",\s*"#a0ffa1",\s*"#ffd27f",\s*"#f5a3ff",\s*"#d0d0e6"\s*]/
  );
});

test('NUM constant includes all sacred geometry values and is frozen', () => {
  assert.match(htmlContent, /const NUM = Object\.freeze\(\{/);
  const numObjectText = extractBetween(
    htmlContent,
    'const NUM = Object.freeze({',
    '});'
  );
  [
    ['THREE', 3],
    ['SEVEN', 7],
    ['NINE', 9],
    ['ELEVEN', 11],
    ['TWENTYTWO', 22],
    ['THIRTYTHREE', 33],
    ['NINETYNINE', 99],
    ['ONEFORTYFOUR', 144]
  ].forEach(([key, value]) => {
    assert.match(numObjectText, new RegExp(`\\b${key}:\\s*${value}\\b`), `Missing NUM constant ${key}`);
  });
});

test('loadPalette resolves with JSON data on successful fetch', async () => {
  const functionBody = extractBetween(
    htmlContent,
    'async function loadPalette(path) {',
    '}\n\n      const NUM ='
  );
  const loadPalette = vm.runInNewContext(
    `(async function loadPalette(path) {${functionBody}});`,
    {},
    { filename: 'loadPalette.js' }
  );

  const fakeJson = { bg: '#000000', ink: '#ffffff' };
  const fetchCalls = [];
  const result = await loadPalette('./palette.json', async (url, options) => {
    fetchCalls.push({ url, options });
    return {
      ok: true,
      status: 200,
      async json() {
        return fakeJson;
      }
    };
  });

  assert.deepEqual(fetchCalls[0], {
    url: './palette.json',
    options: { cache: 'no-store' }
  });
  assert.deepEqual(result, fakeJson);
});

test('loadPalette returns null when fetch yields non-OK status', async () => {
  const functionBody = extractBetween(
    htmlContent,
    'async function loadPalette(path) {',
    '}\n\n      const NUM ='
  );
  const loadPalette = vm.runInNewContext(
    `(async function loadPalette(path, fetchImpl) {
      const fetch = fetchImpl ?? globalThis.fetch;
      ${functionBody}
    });`,
    {},
    { filename: 'loadPalette.js' }
  );

  const result = await loadPalette('./palette.json', async () => ({
    ok: false,
    status: 404,
    async json() {
      return {};
    }
  }));

  assert.equal(result, null);
});

test('loadPalette gracefully handles fetch throwing errors', async () => {
  const functionBody = extractBetween(
    htmlContent,
    'async function loadPalette(path) {',
    '}\n\n      const NUM ='
  );
  const loadPalette = vm.runInNewContext(
    `(async function loadPalette(path, fetchImpl) {
      const fetch = fetchImpl ?? globalThis.fetch;
      ${functionBody}
    });`,
    {},
    { filename: 'loadPalette.js' }
  );

  const result = await loadPalette('./palette.json', async () => {
    throw new Error('network');
  });

  assert.equal(result, null);
});

test('status message copy references fallback scenario', () => {
  assert.match(htmlContent, /statusEl\.textContent = palette \? "Palette loaded\." : "Palette missing; using safe fallback.";?/);
});