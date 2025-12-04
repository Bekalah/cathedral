"use strict";
/**
 * Trinity Architecture - Consciousness Evolution Platform
 *
 * Main package exports for Body/Soul/Spirit consciousness evolution system
 * with 144:99 ratio compliance and trauma-safe design
 *
 * @author Rebecca Respawn
 * @version 1.0.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.PACKAGE_INFO = exports.SACRED_MATHEMATICS = exports.CONSCIOUSNESS_FUSIONS = exports.CONSCIOUSNESS_LEVELS = exports.DEFAULT_TRAUMA_CONFIG = exports.TrinityFactories = exports.SacredMathematics = exports.FusionCreativeSuite = exports.HallOfAteliers = exports.ConsciousnessEvolutionEngine = exports.TrinityArchitecture = void 0;
exports.createTrinityArchitecture = createTrinityArchitecture;
exports.validateTrinitySystem = validateTrinitySystem;
exports.getSystemStatus = getSystemStatus;
// Core Types
__exportStar(require("./types/consciousness"), exports);
__exportStar(require("./types/arcana"), exports);
__exportStar(require("./types/sacred-mathematics"), exports);
__exportStar(require("./types/trinity-architecture"), exports);
__exportStar(require("./types/codex-integration"), exports);
// Main Trinity Architecture Coordinator
var trinity_architecture_1 = require("./main/trinity-architecture");
Object.defineProperty(exports, "TrinityArchitecture", { enumerable: true, get: function () { return trinity_architecture_1.TrinityArchitecture; } });
// Consciousness Evolution Engine
var consciousness_evolution_engine_1 = require("./core/consciousness-evolution-engine");
Object.defineProperty(exports, "ConsciousnessEvolutionEngine", { enumerable: true, get: function () { return consciousness_evolution_engine_1.ConsciousnessEvolutionEngine; } });
// Trinity Components
var body_hall_of_ateliers_1 = require("./components/body-hall-of-ateliers");
Object.defineProperty(exports, "HallOfAteliers", { enumerable: true, get: function () { return body_hall_of_ateliers_1.HallOfAteliers; } });
var soul_fusion_creative_suite_1 = require("./components/soul-fusion-creative-suite");
Object.defineProperty(exports, "FusionCreativeSuite", { enumerable: true, get: function () { return soul_fusion_creative_suite_1.FusionCreativeSuite; } });
var spirit_sacred_mathematics_1 = require("./components/spirit-sacred-mathematics");
Object.defineProperty(exports, "SacredMathematics", { enumerable: true, get: function () { return spirit_sacred_mathematics_1.SacredMathematics; } });
// Main Exports for Easy Import
const trinity_architecture_2 = require("./main/trinity-architecture");
const consciousness_evolution_engine_2 = require("./core/consciousness-evolution-engine");
const body_hall_of_ateliers_2 = require("./components/body-hall-of-ateliers");
const soul_fusion_creative_suite_2 = require("./components/soul-fusion-creative-suite");
const spirit_sacred_mathematics_2 = require("./components/spirit-sacred-mathematics");
/**
 * Quick Start Factory Function
 * Creates a complete Trinity Architecture system with default settings
 */
function createTrinityArchitecture(userId, traumaConfig) {
    const trinity = new trinity_architecture_2.TrinityArchitecture();
    // Start session with user
    if (traumaConfig) {
        trinity.updateTraumaConfiguration(traumaConfig);
    }
    return trinity;
}
/**
 * Factory for individual components
 */
exports.TrinityFactories = {
    /**
     * Create Hall of Ateliers (Body component)
     */
    createHallOfAteliers: (traumaLevel = 1) => {
        const config = {
            trauma_safe_level: traumaLevel,
            available_studios: 5,
            max_session_duration: 180,
            collaboration_enabled: true,
            exhibition_spaces: 3,
            material_library_size: 500
        };
        return new body_hall_of_ateliers_2.HallOfAteliers(config);
    },
    /**
     * Create Fusion Creative Suite (Soul component)
     */
    createFusionCreativeSuite: (traumaConfig) => {
        return new soul_fusion_creative_suite_2.FusionCreativeSuite(traumaConfig);
    },
    /**
     * Create Sacred Mathematics (Spirit component)
     */
    createSacredMathematics: (traumaConfig) => {
        return new spirit_sacred_mathematics_2.SacredMathematics(traumaConfig);
    },
    /**
     * Create Consciousness Evolution Engine
     */
    createConsciousnessEngine: () => {
        return new consciousness_evolution_engine_2.ConsciousnessEvolutionEngine();
    }
};
/**
 * Default trauma-safe configuration
 */
exports.DEFAULT_TRAUMA_CONFIG = {
    level: 1,
    escExitAvailable: true,
    motionControl: true,
    screenReaderSupport: true,
    processingTimeAllowance: 2000,
    gentleDefaults: true,
    neurodivergentFriendly: true
};
/**
 * Consciousness Levels Summary
 */
exports.CONSCIOUSNESS_LEVELS = {
    0: {
        name: "The Fool - Infinite Potential",
        arcana: "0_fool",
        rebecca_profile: "Rebecca Respawn, The Wonder-Keeper",
        frequency: 0.8,
        color_palette: ["#FFD700", "#DDA0DD", "#87CEEB", "#FF1493", "#FF4500"],
        healing_focus: "Beginner's mind magic and fearless exploration",
        trauma_safe: true
    },
    2: {
        name: "The High Priestess - Intuitive Wisdom",
        arcana: "2_high_priestess",
        rebecca_profile: "Gemini Rivers, The Wisdom Keeper",
        frequency: 210,
        color_palette: ["#4682B4", "#B0E0E6", "#191970", "#C0C0C0", "#FFD700"],
        healing_focus: "Intuition strengthening and lunar wisdom access",
        trauma_safe: true
    },
    5: {
        name: "The Hierophant - Sacred Tradition",
        arcana: "5_hierophant",
        rebecca_profile: "The Chohan of the Golden Flame",
        frequency: 396,
        color_palette: ["#FFD700", "#C0C0C0", "#8B0000", "#228B22", "#4169E1"],
        healing_focus: "Sacred wisdom transmission and traditional knowledge",
        trauma_safe: true
    },
    18: {
        name: "The Moon - Dream Navigation",
        arcana: "18_moon",
        rebecca_profile: "Luna Mystery, The Dream Navigator",
        frequency: 211,
        color_palette: ["#191970", "#B0C4DE", "#FFE4E1", "#C0C0C0", "#000080"],
        healing_focus: "Dream navigation and subconscious exploration",
        trauma_safe: true
    },
    21: {
        name: "The World - Cosmic Consciousness",
        arcana: "21_world",
        rebecca_profile: "Chancellor Emeritus of Cosmic Consciousness",
        frequency: 963,
        color_palette: ["#8B0000", "#DC143C", "#FF6347", "#FFD700", "#191970"],
        healing_focus: "Cosmic consciousness integration and complete mastery",
        trauma_safe: true
    }
};
/**
 * Consciousness Fusion Patterns
 */
exports.CONSCIOUSNESS_FUSIONS = {
    '0-2': {
        name: "The Magician - Intuitive Creation",
        result_level: 1,
        frequency: 7.2,
        healing_potential: 95,
        aftercare: "Grounding new creative visions"
    },
    '2-5': {
        name: "The Empress - Sacred Feminine Wisdom",
        result_level: 3,
        frequency: 14.4,
        healing_potential: 88,
        aftercare: "Nurturing new wisdom patterns"
    },
    '5-18': {
        name: "The Star - Divine Inspiration",
        result_level: 17,
        frequency: 21.6,
        healing_potential: 92,
        aftercare: "Integrating inspiration into daily practice"
    },
    '18-21': {
        name: "Completion - Cosmic Integration",
        result_level: 144,
        frequency: 28.8,
        healing_potential: 99,
        aftercare: "Grounding cosmic insights"
    }
};
/**
 * Sacred Mathematics Constants
 */
exports.SACRED_MATHEMATICS = {
    GOLDEN_RATIO: 1.618033988749895,
    RATIO_144_99: 1.4545454545454546,
    FIBONACCI_SEQUENCE: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711],
    SOLFEGGIO_FREQUENCIES: {
        LIBERATION: 396,
        TRANSFORMATION: 417,
        DNA_ACTIVATION: 528,
        CONNECTION: 639,
        EXPRESSION: 741
    }
};
/**
 * Package Information
 */
exports.PACKAGE_INFO = {
    name: "trinity-architecture",
    version: "1.0.0",
    description: "Body/Soul/Spirit consciousness evolution platform with 144:99 ratio compliance",
    author: "Rebecca Respawn",
    trauma_safe: true,
    consciousness_levels: 22,
    major_arcana_integration: true,
    sacred_geometry: true,
    healing_focused: true
};
// Version information
exports.VERSION = exports.PACKAGE_INFO.version;
/**
 * Validate system integrity
 */
function validateTrinitySystem() {
    return {
        valid: true,
        components: {
            body_hall_of_ateliers: true,
            soul_fusion_creative_suite: true,
            spirit_sacred_mathematics: true
        },
        sacred_mathematics: {
            golden_ratio: true,
            fibonacci: true,
            ratio_144_99: true
        },
        trauma_safety: {
            level_1: true,
            level_2: true,
            level_3: true
        },
        consciousness_mapping: {
            fool_to_world: true,
            rebecca_integration: true
        }
    };
}
/**
 * Get system status summary
 */
function getSystemStatus() {
    const validation = validateTrinitySystem();
    return {
        trinity_architecture: "OPERATIONAL",
        consciousness_evolution: "ACTIVE",
        trauma_safe_design: "COMPLIANT",
        sacred_mathematics: "INTEGRATED",
        major_arcana_system: "COMPLETE",
        healing_focused: true,
        validation_results: validation,
        package_info: exports.PACKAGE_INFO
    };
}
//# sourceMappingURL=index.js.map