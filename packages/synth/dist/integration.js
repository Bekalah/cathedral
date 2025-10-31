// integration.ts - future hooks bridging crystals & archetypes to synth parameters
import { patchLibrary } from './patchLibrary';
export function mapFusionToPatchModifiers(fusionId, helpers) {
    const fusion = helpers.listFusionSets().find(f => f.id === fusionId);
    if (!fusion)
        return null;
    const resonance = helpers.computeFusionResonance(fusionId);
    if (!resonance)
        return null;
    // Map phiScore & stability into modulation shaping suggestions
    return {
        suggestedLfoRate: Number((resonance.phiScore * 2 + 0.5).toFixed(3)),
        suggestedReverbMix: Math.min(0.85, 0.2 + resonance.stability * 0.6),
        colorField: resonance.colorField,
        patchCandidates: patchLibrary.slice(0, 3).map(p => p.id)
    };
}
//# sourceMappingURL=integration.js.map