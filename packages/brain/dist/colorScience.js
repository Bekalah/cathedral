"use strict";
/**
 * @license CC0-1.0 - Public Domain
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorScience = void 0;
var ColorScience = /** @class */ (function () {
    function ColorScience() {
        console.log("ColorScience initialized with pure algorithmic color generation.");
    }
    ColorScience.prototype.wavelengthToRGB = function (wavelength) {
        var R = 0, G = 0, B = 0;
        if (wavelength >= 380 && wavelength < 440) {
            R = -(wavelength - 440) / (440 - 380);
            G = 0.0;
            B = 1.0;
        }
        else if (wavelength >= 440 && wavelength < 490) {
            R = 0.0;
            G = (wavelength - 440) / (490 - 440);
            B = 1.0;
        }
        else if (wavelength >= 490 && wavelength < 510) {
            R = 0.0;
            G = 1.0;
            B = -(wavelength - 510) / (510 - 490);
        }
        // ...continue for full spectrum
        var gamma = 0.8;
        R = Math.pow(R, gamma);
        G = Math.pow(G, gamma);
        B = Math.pow(B, gamma);
        return { r: R * 255, g: G * 255, b: B * 255 };
    };
    ColorScience.prototype.expandToTetrachromat = function (rgb) {
        var uv = (rgb.b * 0.5 + rgb.r * 0.3) * 0.8;
        return __assign(__assign({}, rgb), { uv: uv });
    };
    ColorScience.prototype.harmonicColors = function (baseWavelength) {
        return {
            fundamental: baseWavelength,
            octave: baseWavelength * 2,
            fifth: baseWavelength * 1.5,
            fourth: baseWavelength * 1.333,
            majorThird: baseWavelength * 1.25,
        };
    };
    ColorScience.prototype.generateVisionaryColorPalette = function (theme_1) {
        return __awaiter(this, arguments, void 0, function (theme, count) {
            if (count === void 0) { count = 5; }
            return __generator(this, function (_a) {
                // Pure algorithmic color generation based on theme hash and harmonic colors
                console.log("Using pure algorithmic color palette generation for theme:", theme);
                return [2 /*return*/, this.algorithmicColorPalette(theme, count)];
            });
        });
    };
    ColorScience.prototype.algorithmicColorPalette = function (theme, count) {
        // Generate colors based on theme string hash and harmonic relationships
        var hash = theme.split("").reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
        var colors = [];
        for (var i = 0; i < count; i++) {
            var hue = (hash + i * 137.5) % 360; // Golden angle for harmonic distribution
            var saturation = 70 + ((i * 10) % 30);
            var lightness = 50 + ((i * 15) % 30);
            colors.push("hsl(".concat(hue, ", ").concat(saturation, "%, ").concat(lightness, "%)"));
        }
        return colors;
    };
    // Keeping fallback method for future use
    // @ts-ignore - unused but intentionally preserved
    ColorScience.prototype.fallbackColorPalette = function (_count) {
        var fallbackColors = [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
        ];
        return fallbackColors.slice(0, _count);
    };
    return ColorScience;
}());
exports.ColorScience = ColorScience;
