/*
  iiif.js
  Minimal helper to derive static image URLs from IIIF manifests.
  ND-safe: returns string only; caller decides how to render imagery.
*/

export function iiifImage(manifestJson, maxW = 800) {
  if (!manifestJson) {
    return null;
  }
  const sequences = manifestJson.sequences || manifestJson.items || [];
  const firstSequence = Array.isArray(sequences) ? sequences[0] : sequences;
  if (!firstSequence) {
    return null;
  }
  const canvases = firstSequence.canvases || firstSequence.items || [];
  const firstCanvas = Array.isArray(canvases) ? canvases[0] : canvases;
  if (!firstCanvas) {
    return null;
  }
  const images = firstCanvas.images || firstCanvas.items || [];
  const firstImage = Array.isArray(images) ? images[0] : images;
  if (!firstImage) {
    return null;
  }
  const resource = firstImage.resource || firstImage.body || {};
  const service = resource.service || resource.serviceEndpoint || {};
  const serviceId = service["@id"] || service.id;
  if (!serviceId) {
    return null;
  }
  const base = serviceId.replace(/\/$/, "");
  return `${base}/full/${maxW},/0/default.jpg`;
}
