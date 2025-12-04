"use strict";
/**
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.archetypes = void 0;
exports.archetypeInterference = archetypeInterference;
// Archetype frequency signatures and interference
exports.archetypes = {
    creator: {
        colorWavelength: 450,
        soundFrequency: 528,
        harmonics: [1, 3, 5],
        element: 'water'
    },
    transformer: {
        colorWavelength: 590,
        soundFrequency: 417,
        harmonics: [1, 2, 4],
        element: 'fire'
    },
    preserver: {
        colorWavelength: 520,
        soundFrequency: 639,
        harmonics: [1, 2, 3],
        element: 'earth'
    }
};
function archetypeInterference(arch1, arch2, time) {
    var wave1 = Math.sin(2 * Math.PI * arch1.soundFrequency * time);
    var wave2 = Math.sin(2 * Math.PI * arch2.soundFrequency * time);
    return {
        constructive: wave1 + wave2,
        destructive: wave1 - wave2,
        beat: 2 * Math.cos(Math.PI * (arch1.soundFrequency - arch2.soundFrequency) * time)
    };
}
