"use strict";
/**
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynthEngine = void 0;
var patchLibrary_1 = require("./patchLibrary");
var SynthEngine = /** @class */ (function () {
    function SynthEngine(seedPatches) {
        if (seedPatches === void 0) { seedPatches = patchLibrary_1.patchLibrary; }
        var _this = this;
        this.patches = new Map();
        seedPatches.forEach(function (p) { return _this.patches.set(p.id, p); });
    }
    SynthEngine.prototype.listPatches = function () { return Array.from(this.patches.values()).map(function (p) { return ({ id: p.id, name: p.name }); }); };
    SynthEngine.prototype.getPatch = function (id) { return this.patches.get(id) || null; };
    SynthEngine.prototype.planGraph = function (patchId) {
        var p = this.getPatch(patchId);
        if (!p)
            return null;
        // future: topological sort / validation
        return p.graph;
    };
    SynthEngine.prototype.render = function (req) {
        var graph = this.planGraph(req.patchId);
        if (!graph)
            return { ok: false, error: 'PATCH_NOT_FOUND' };
        // Placeholder: would instantiate Web Audio nodes, connect, schedule envelopes.
        return {
            ok: true,
            patchId: req.patchId,
            nodes: graph.length,
            duration: req.durationSeconds,
            estimatedVoices: graph.filter(function (n) { return n.kind === 'osc'; }).length,
            note: 'Audio rendering not yet implemented—graph plan returned.'
        };
    };
    return SynthEngine;
}());
exports.SynthEngine = SynthEngine;
