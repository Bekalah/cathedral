"use strict";
/**
 * Sacred Frequency Weaver
 *
 * Created from doubt: "The audio effects need more depth and healing quality"
 * Improvement: Create fractal-based sound frequencies that actually help
 *
 * This is how visionary art is created - from doubt comes beauty.
 *
 * @package @cathedral/synth
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sacredFrequencyWeaver = exports.SacredFrequencyWeaver = exports.SACRED_FREQUENCIES = void 0;
exports.SACRED_FREQUENCIES = [
    {
        id: 'liberation',
        name: 'Liberation Frequency',
        frequency: 396,
        solfeggio: true,
        healing: 'Releases fear, guilt, trauma',
        fractal: {
            depth: 3,
            harmonics: 2,
            pattern: 'fractal'
        }
    },
    {
        id: 'transformation',
        name: 'Transformation Frequency',
        frequency: 417,
        solfeggio: true,
        healing: 'Facilitates change, undoes situations',
        fractal: {
            depth: 4,
            harmonics: 3,
            pattern: 'fractal'
        }
    },
    {
        id: 'manifestation',
        name: 'Manifestation Frequency',
        frequency: 528,
        solfeggio: true,
        healing: 'Love, DNA repair, transformation',
        fractal: {
            depth: 5,
            harmonics: 4,
            pattern: 'fractal'
        }
    },
    {
        id: 'connection',
        name: 'Connection Frequency',
        frequency: 639,
        solfeggio: true,
        healing: 'Relationships, connection, harmony',
        fractal: {
            depth: 4,
            harmonics: 3,
            pattern: 'fractal'
        }
    },
    {
        id: 'expression',
        name: 'Expression Frequency',
        frequency: 741,
        solfeggio: true,
        healing: 'Expression, solutions, creativity',
        fractal: {
            depth: 5,
            harmonics: 4,
            pattern: 'fractal'
        }
    },
    {
        id: 'intuition',
        name: 'Intuition Frequency',
        frequency: 852,
        solfeggio: true,
        healing: 'Intuition, spiritual order',
        fractal: {
            depth: 6,
            harmonics: 5,
            pattern: 'fractal'
        }
    }
];
/**
 * Sacred Frequency Weaver
 *
 * Creates fractal-based sound frequencies for healing and focus
 */
var SacredFrequencyWeaver = /** @class */ (function () {
    function SacredFrequencyWeaver() {
        this.context = null;
        if (typeof window !== 'undefined' && window.AudioContext) {
            this.context = new AudioContext();
        }
    }
    /**
     * Play a sacred frequency
     */
    SacredFrequencyWeaver.prototype.playFrequency = function (frequencyId_1) {
        return __awaiter(this, arguments, void 0, function (frequencyId, duration) {
            var freq, oscillator, gainNode, fractalGain, i, harmonic, harmonicGain;
            if (duration === void 0) { duration = 300; }
            return __generator(this, function (_a) {
                if (!this.context) {
                    throw new Error('AudioContext not available');
                }
                freq = exports.SACRED_FREQUENCIES.find(function (f) { return f.id === frequencyId; });
                if (!freq) {
                    throw new Error("Frequency ".concat(frequencyId, " not found"));
                }
                oscillator = this.context.createOscillator();
                gainNode = this.context.createGain();
                fractalGain = this.context.createGain();
                // Base frequency
                oscillator.frequency.value = freq.frequency;
                oscillator.type = 'sine';
                // Add fractal harmonics
                for (i = 1; i <= freq.fractal.harmonics; i++) {
                    harmonic = this.context.createOscillator();
                    harmonicGain = this.context.createGain();
                    harmonic.frequency.value = freq.frequency * (i + 1);
                    harmonic.type = 'sine';
                    harmonicGain.gain.value = 1 / (i + 1) * 0.3; // Decreasing volume
                    harmonic.connect(harmonicGain);
                    harmonicGain.connect(gainNode);
                    harmonic.start(this.context.currentTime);
                    harmonic.stop(this.context.currentTime + duration);
                }
                // Envelope
                gainNode.gain.setValueAtTime(0, this.context.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.5);
                gainNode.gain.linearRampToValueAtTime(0.3, this.context.currentTime + duration - 0.5);
                gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);
                oscillator.connect(gainNode);
                gainNode.connect(this.context.destination);
                oscillator.start(this.context.currentTime);
                oscillator.stop(this.context.currentTime + duration);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Create fractal soundscape
     */
    SacredFrequencyWeaver.prototype.createFractalSoundscape = function (frequencies_1) {
        return __awaiter(this, arguments, void 0, function (frequencies, duration) {
            var _this = this;
            if (duration === void 0) { duration = 600; }
            return __generator(this, function (_a) {
                // Play multiple frequencies in harmony
                frequencies.forEach(function (freqId, index) {
                    setTimeout(function () {
                        _this.playFrequency(freqId, duration);
                    }, index * 100);
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get frequency by healing property
     */
    SacredFrequencyWeaver.prototype.getFrequencyForHealing = function (healing) {
        return exports.SACRED_FREQUENCIES.find(function (f) {
            return f.healing.toLowerCase().includes(healing.toLowerCase());
        });
    };
    /**
     * Get all frequencies
     */
    SacredFrequencyWeaver.prototype.getAllFrequencies = function () {
        return __spreadArray([], exports.SACRED_FREQUENCIES, true);
    };
    return SacredFrequencyWeaver;
}());
exports.SacredFrequencyWeaver = SacredFrequencyWeaver;
// Export singleton
exports.sacredFrequencyWeaver = new SacredFrequencyWeaver();
// Export for easy use
exports.default = exports.sacredFrequencyWeaver;
