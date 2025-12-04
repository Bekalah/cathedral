"use strict";
/**
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFusionToPatchModifiers = mapFusionToPatchModifiers;
// integration.ts - future hooks bridging crystals & archetypes to synth parameters
var patchLibrary_1 = require("./patchLibrary");
function mapFusionToPatchModifiers(fusionId, helpers) {
    var fusion = helpers.listFusionSets().find(function (f) { return f.id === fusionId; });
    if (!fusion)
        return null;
    var resonance = helpers.computeFusionResonance(fusionId);
    if (!resonance)
        return null;
    // Map phiScore & stability into modulation shaping suggestions
    return {
        suggestedLfoRate: Number((resonance.phiScore * 2 + 0.5).toFixed(3)),
        suggestedReverbMix: Math.min(0.85, 0.2 + resonance.stability * 0.6),
        colorField: resonance.colorField,
        patchCandidates: patchLibrary_1.patchLibrary.slice(0, 3).map(function (p) { return p.id; })
    };
}
