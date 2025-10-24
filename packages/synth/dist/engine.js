import { patchLibrary } from './patchLibrary';
export class SynthEngine {
    patches = new Map();
    constructor(seedPatches = patchLibrary) {
        seedPatches.forEach(p => this.patches.set(p.id, p));
    }
    listPatches() { return Array.from(this.patches.values()).map(p => ({ id: p.id, name: p.name })); }
    getPatch(id) { return this.patches.get(id) || null; }
    planGraph(patchId) {
        const p = this.getPatch(patchId);
        if (!p)
            return null;
        // future: topological sort / validation
        return p.graph;
    }
    render(req) {
        const graph = this.planGraph(req.patchId);
        if (!graph)
            return { ok: false, error: 'PATCH_NOT_FOUND' };
        // Placeholder: would instantiate Web Audio nodes, connect, schedule envelopes.
        return {
            ok: true,
            patchId: req.patchId,
            nodes: graph.length,
            duration: req.durationSeconds,
            estimatedVoices: graph.filter(n => n.kind === 'osc').length,
            note: 'Audio rendering not yet implemented—graph plan returned.'
        };
    }
}
