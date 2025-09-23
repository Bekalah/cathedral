/*
  correspondence.js
  Combines node data with correspondence tables to build ritual packets.
  ND-safe: pure functions only.
*/

export function compileRitual(node = {}, correspondences = {}, symbols = []) {
  const planet = node.planet || findPlanetForSephira(node.sephira, correspondences);
  const sephira = node.sephira || (planet ? correspondences.planet_to_sephira?.[planet] : null);
  const tarot = sephira ? correspondences.sephira_to_tarot?.[sephira] || [] : [];
  const angels = sephira ? correspondences.angel_pairs?.[sephira] || [] : [];
  const demons = sephira ? correspondences.demon_pairs?.[sephira] || [] : [];
  const seals = symbols
    .filter(symbol => symbol.corresponds?.sephira === sephira)
    .map(symbol => symbol.id);

  return {
    id: node.id || null,
    title: node.title || null,
    sephira,
    planet,
    tarot,
    angels,
    demons,
    seals
  };
}

function findPlanetForSephira(sephira, correspondences) {
  if (!sephira || !correspondences.planet_to_sephira) {
    return null;
  }
  return Object.entries(correspondences.planet_to_sephira)
    .find(([, value]) => value === sephira)?.[0] || null;
}
