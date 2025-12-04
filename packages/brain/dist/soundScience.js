"use strict";
/**
 * @license CC0-1.0 - Public Domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundScience = void 0;
// SoundScience: harmonic series, binaural beats, pythagorean intervals
var SoundScience = /** @class */ (function () {
    function SoundScience() {
    }
    SoundScience.prototype.harmonicSeries = function (fundamental, numHarmonics) {
        if (numHarmonics === void 0) { numHarmonics = 8; }
        return Array.from({ length: numHarmonics }, function (_, i) { return ({
            frequency: fundamental * (i + 1),
            amplitude: 1 / (i + 1),
            phase: 0
        }); });
    };
    SoundScience.prototype.binauralBeat = function (carrierFreq, beatFreq) {
        return {
            left: carrierFreq,
            right: carrierFreq + beatFreq
        };
    };
    SoundScience.prototype.pythagoreanIntervals = function () {
        return {
            unison: 1 / 1,
            minorSecond: 256 / 243,
            majorSecond: 9 / 8,
            minorThird: 32 / 27,
            majorThird: 81 / 64,
            perfectFourth: 4 / 3,
            tritone: 729 / 512,
            perfectFifth: 3 / 2,
            minorSixth: 128 / 81,
            majorSixth: 27 / 16,
            minorSeventh: 16 / 9,
            majorSeventh: 243 / 128,
            octave: 2 / 1
        };
    };
    return SoundScience;
}());
exports.SoundScience = SoundScience;
