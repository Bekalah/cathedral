// Placeholder for @cathedral/mystical-data-unified
// TODO: Replace with real implementation
// Connect to real TarotCreatureSystem mystical data
const path = require('path');
const tarotSystem = require(path.resolve(__dirname, '../../src/TarotCreatureSystem.js'));

module.exports = {
  getData: () => {
    // Return real mystical archetype enhancements
    if (tarotSystem && tarotSystem.prototype && tarotSystem.prototype.transformationRules) {
      return tarotSystem.prototype.transformationRules.archetype_enhancements;
    }
    return {};
  }
};