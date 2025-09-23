// codex-engines/server.js
// Lightweight HTTP API that bridges the blessed build into accessible routes.
// No external frameworks: keeps the service portable for offline-first use.

import http from 'node:http';
import { URL } from 'node:url';

import {
  blessedBuild,
  readOverlay,
  readProvenance
} from '../engines/blessed-build.js';

const PORT = Number(process.env.PORT || 3000);
let lastBuild = null;

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(payload);
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

async function runBlessedBuild() {
  lastBuild = await blessedBuild();
  return lastBuild;
}

async function ensureBuild() {
  if (!lastBuild) {
    lastBuild = await blessedBuild();
  }
  return lastBuild;
}

async function handleOverlay(res, id) {
  try {
    const build = await ensureBuild();
    const svg = await readOverlay(id);
    const overlayMeta = build.overlays.find((item) => item.id === id);
    const headers = {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-store'
    };
    if (overlayMeta) {
      headers['X-Clearspace-Px'] = String(overlayMeta.clearspace_px);
    }
    res.writeHead(200, headers);
    res.end(svg);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      sendError(res, 404, `Overlay ${id} not found.`);
    } else {
      console.error('Overlay delivery failed:', error);
      sendError(res, 500, 'Overlay delivery failed.');
    }
  }
}

async function handleRequest(req, res) {
  const method = req.method || 'GET';
  const url = new URL(req.url || '/', 'http://localhost');
  if (method !== 'GET') {
    sendError(res, 405, 'Only GET is supported.');
    return;
  }

  if (url.pathname === '/v1/codex/ping') {
    sendJson(res, 200, { ok: true, engine: 'codex', timestamp: new Date().toISOString() });
    return;
  }

  if (url.pathname === '/v1/codex/bless') {
    const build = await runBlessedBuild();
    sendJson(res, 200, {
      muses: build.muses,
      overlays: build.overlays,
      blessing: build.blessing
    });
    return;
  }

  if (url.pathname === '/v1/codex/build') {
    const build = await runBlessedBuild();
    sendJson(res, 200, build.manifest);
    return;
  }

  if (url.pathname === '/v1/codex/provenance') {
    try {
      await ensureBuild();
      const provenance = await readProvenance();
      sendJson(res, 200, provenance);
    } catch (error) {
      console.error('Provenance lookup failed:', error);
      sendError(res, 500, 'Failed to read provenance.');
    }
    return;
  }

  const overlayMatch = url.pathname.match(/^\/v1\/codex\/overlay\/([A-Za-z0-9_-]+)$/);
  if (overlayMatch) {
    const overlayId = overlayMatch[1];
    await handleOverlay(res, overlayId);
    return;
  }

  sendError(res, 404, 'Route not found.');
}

export function createCodexServer() {
  return http.createServer((req, res) => {
    handleRequest(req, res).catch((error) => {
      console.error('Unhandled request error:', error);
      sendError(res, 500, 'Unhandled error.');
    });
  });
}

if (process.argv[1] && import.meta.url === new URL(process.argv[1], 'file://').href) {
  const server = createCodexServer();
  server.listen(PORT, () => {
    console.log(`Codex engine listening on port ${PORT}`);
  });
}
