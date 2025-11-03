// Connect to real TarotCreatureSystem archetype data for 'The Tower'
const path = require('path');
const tarotSystem = require(path.resolve(__dirname, '../../src/TarotCreatureSystem.js'));

module.exports = {
  buildTower: (config) => {
    // Use real archetype data for 'The Tower'
    const towerData = tarotSystem.prototype.transformationRules.archetype_enhancements["The Tower"];
    return {
      config,
      mystical_focus: towerData.mystical_focus,
      visual_manifestation: towerData.visual_manifestation,
      special_abilities: towerData.special_abilities
    };
  }
};