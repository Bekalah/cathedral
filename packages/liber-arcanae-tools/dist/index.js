"use strict";
/**
 * Liber Arcanae Tools - Professional Creative Canvas
 *
 * A hybrid art-game and creative platform built on Trinity Architecture.
 * "Art = Spell" - every act of creation changes the world.
 * Figma replacement with consciousness evolution integration.
 *
 * @author Rebecca Respawn (Leonora Carrington)
 * @version 1.0.0
 * @project Circuitum 99 / Liber Arcanae
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIBER_ARCANAE_CONFIG = exports.ArchetypeMentor = exports.CodexLoggingSystem = exports.TraumaSafeCreativeTools = exports.LowStimUIMode = exports.ArchetypeSymbolLibrary = exports.AlchemicalIconSystem = exports.SacredGeometryLibrary = exports.CRDTManager = exports.CollaborativeEngine = exports.FrequencyVisualizer = exports.ColorSoundCorrespondences = exports.SoundLoom = exports.JSONExporter = exports.TSCNGenerator = exports.GodotImporter = exports.ArchetypeIntegration = exports.MetadataSystem = exports.VectorDrawingEngine = exports.LiberArcanaeCanvas = void 0;
exports.createLiberArcanaeTools = createLiberArcanaeTools;
// Core Liber Arcanae Components
var liber_arcanae_canvas_1 = require("./canvas/liber-arcanae-canvas");
Object.defineProperty(exports, "LiberArcanaeCanvas", { enumerable: true, get: function () { return liber_arcanae_canvas_1.LiberArcanaeCanvas; } });
var vector_drawing_engine_1 = require("./canvas/vector-drawing-engine");
Object.defineProperty(exports, "VectorDrawingEngine", { enumerable: true, get: function () { return vector_drawing_engine_1.VectorDrawingEngine; } });
var metadata_system_1 = require("./canvas/metadata-system");
Object.defineProperty(exports, "MetadataSystem", { enumerable: true, get: function () { return metadata_system_1.MetadataSystem; } });
var archetype_integration_1 = require("./canvas/archetype-integration");
Object.defineProperty(exports, "ArchetypeIntegration", { enumerable: true, get: function () { return archetype_integration_1.ArchetypeIntegration; } });
// Godot Integration
var godot_importer_1 = require("./godot/godot-importer");
Object.defineProperty(exports, "GodotImporter", { enumerable: true, get: function () { return godot_importer_1.GodotImporter; } });
var tscn_generator_1 = require("./godot/tscn-generator");
Object.defineProperty(exports, "TSCNGenerator", { enumerable: true, get: function () { return tscn_generator_1.TSCNGenerator; } });
var json_exporter_1 = require("./godot/json-exporter");
Object.defineProperty(exports, "JSONExporter", { enumerable: true, get: function () { return json_exporter_1.JSONExporter; } });
// Sound & Frequency Systems
var sound_loom_1 = require("./sound/sound-loom");
Object.defineProperty(exports, "SoundLoom", { enumerable: true, get: function () { return sound_loom_1.SoundLoom; } });
var color_sound_system_1 = require("./sound/color-sound-system");
Object.defineProperty(exports, "ColorSoundCorrespondences", { enumerable: true, get: function () { return color_sound_system_1.ColorSoundCorrespondences; } });
var frequency_visualizer_1 = require("./sound/frequency-visualizer");
Object.defineProperty(exports, "FrequencyVisualizer", { enumerable: true, get: function () { return frequency_visualizer_1.FrequencyVisualizer; } });
// Real-time Collaboration
var collaborative_engine_1 = require("./collaboration/collaborative-engine");
Object.defineProperty(exports, "CollaborativeEngine", { enumerable: true, get: function () { return collaborative_engine_1.CollaborativeEngine; } });
var crdt_manager_1 = require("./collaboration/crdt-manager");
Object.defineProperty(exports, "CRDTManager", { enumerable: true, get: function () { return crdt_manager_1.CRDTManager; } });
// Symbol Library
var sacred_geometry_library_1 = require("./symbols/sacred-geometry-library");
Object.defineProperty(exports, "SacredGeometryLibrary", { enumerable: true, get: function () { return sacred_geometry_library_1.SacredGeometryLibrary; } });
var alchemical_icon_system_1 = require("./symbols/alchemical-icon-system");
Object.defineProperty(exports, "AlchemicalIconSystem", { enumerable: true, get: function () { return alchemical_icon_system_1.AlchemicalIconSystem; } });
var archetype_symbol_library_1 = require("./symbols/archetype-symbol-library");
Object.defineProperty(exports, "ArchetypeSymbolLibrary", { enumerable: true, get: function () { return archetype_symbol_library_1.ArchetypeSymbolLibrary; } });
// Accessibility & Trauma-Safety
var low_stim_ui_1 = require("./accessibility/low-stim-ui");
Object.defineProperty(exports, "LowStimUIMode", { enumerable: true, get: function () { return low_stim_ui_1.LowStimUIMode; } });
var trauma_safe_tools_1 = require("./accessibility/trauma-safe-tools");
Object.defineProperty(exports, "TraumaSafeCreativeTools", { enumerable: true, get: function () { return trauma_safe_tools_1.TraumaSafeCreativeTools; } });
// Codex Integration
var codex_logging_1 = require("./codex/codex-logging");
Object.defineProperty(exports, "CodexLoggingSystem", { enumerable: true, get: function () { return codex_logging_1.CodexLoggingSystem; } });
var archetype_mentor_1 = require("./codex/archetype-mentor");
Object.defineProperty(exports, "ArchetypeMentor", { enumerable: true, get: function () { return archetype_mentor_1.ArchetypeMentor; } });
// Main Factory
var liber_arcanae_canvas_2 = require("./canvas/liber-arcanae-canvas");
/**
 * Create a complete Liber Arcanae Creative Platform
 */
function createLiberArcanaeTools(traumaConfig) {
    var config = __assign({ level: 5, escExitAvailable: true, motionControl: true, screenReaderSupport: true, processingTimeAllowance: 3000, gentleDefaults: true, neurodivergentFriendly: true, lowStimMode: true, colorBlindnessSupport: true, soundLevelControl: true }, traumaConfig);
    return new liber_arcanae_canvas_2.LiberArcanaeCanvas(config);
}
/**
 * Export default configuration for Circuitum 99 / Liber Arcanae
 */
exports.LIBER_ARCANAE_CONFIG = {
    name: "Circuitum 99 / Liber Arcanae",
    version: "1.0.0",
    philosophy: {
        art_as_spell: true,
        play_as_learning: true,
        thelema_backbone: true,
        accessibility: true
    },
    world: {
        setting: "Codex Abyssiae",
        protagonist: "Rebecca Respawn (Leonora Carrington)",
        archetype_system: "22 Major Arcana"
    },
    technology: {
        canvas_resolution: "4096x4096",
        color_depth: "16-bit",
        real_time_collaboration: true,
        godot_integration: true,
        frequency_sound_mapping: true
    },
    accessibility: {
        trauma_sensitive: true,
        low_stim_mode: true,
        screen_reader_support: true,
        gentle_defaults: true,
        esc_exit_available: true
    }
};
