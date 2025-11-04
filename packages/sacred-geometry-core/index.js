// Sacred Geometry Core - Fractal settings and geometry nodes for Codex 144:99

const codexNodes = require('../codex-144-99/nodes.json');

function getFractalSettingsForNode(nodeId) {
  // Example: return fractal settings for a given node from Codex 144:99
  const node = codexNodes[nodeId];
  if (!node) return null;
  return node.fractalSettings || {};
}

module.exports = {
  getFractalSettingsForNode,
};
