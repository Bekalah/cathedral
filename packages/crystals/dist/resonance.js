"use strict";
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
exports.computeFusionResonance = computeFusionResonance;
exports.listCrystalIds = listCrystalIds;
exports.listFusionSets = listFusionSets;
/**
 * resonance
 *
 * @package @cathedral/crystals
 */
// resonance.ts - computation utilities
var baseCrystals_1 = require("./data/baseCrystals");
var fusionSets_1 = require("./data/fusionSets");
var dotenv = require("dotenv");
dotenv.config();
function mean(nums) { return nums.reduce(function (a, b) { return a + b; }, 0) / Math.max(1, nums.length); }
function computeFusionResonance(fusionId) {
    return __awaiter(this, void 0, void 0, function () {
        var fusion, members, freqStack, colorField, phiHits, comparisons, i, j, ratio, phiScore, intervals, sorted, i, avg, variance, regularity, baseResult;
        return __generator(this, function (_a) {
            fusion = fusionSets_1.fusionSets.find(function (f) { return f.id === fusionId; });
            if (!fusion)
                return [2 /*return*/, null];
            members = fusion.members
                .map(function (id) { return baseCrystals_1.baseCrystals.find(function (c) { return c.id === id; }); })
                .filter(function (c) { return Boolean(c); });
            freqStack = [];
            members.forEach(function (c) { var _a; return (_a = c.baseFrequenciesHz) === null || _a === void 0 ? void 0 : _a.forEach(function (f) { return freqStack.push(f); }); });
            colorField = [];
            members.forEach(function (c) { return c.colorSpectrum.forEach(function (col) { if (!colorField.includes(col))
                colorField.push(col); }); });
            phiHits = 0;
            comparisons = 0;
            for (i = 0; i < freqStack.length; i++) {
                for (j = i + 1; j < freqStack.length; j++) {
                    ratio = freqStack[j] > freqStack[i] ? freqStack[j] / freqStack[i] : freqStack[i] / freqStack[j];
                    comparisons++;
                    if (Math.abs(ratio - 1.618) < 0.05)
                        phiHits++;
                }
            }
            phiScore = comparisons ? phiHits / comparisons : 0;
            intervals = [];
            sorted = __spreadArray([], freqStack, true).sort(function (a, b) { return a - b; });
            for (i = 0; i < sorted.length - 1; i++)
                intervals.push(sorted[i + 1] - sorted[i]);
            avg = mean(intervals);
            variance = mean(intervals.map(function (v) { return Math.pow(v - avg, 2); }));
            regularity = 1 / (1 + variance / 10000);
            baseResult = {
                compositeFrequency: freqStack,
                colorField: colorField,
                phiScore: Number(phiScore.toFixed(3)),
                stability: Number((fusion.synergyModel.coherence * regularity).toFixed(3))
            };
            return [2 /*return*/, __assign(__assign({}, baseResult), { aiLore: 'Pure algorithmic resonance computation - no AI involvement.' })];
        });
    });
}
function listCrystalIds() { return baseCrystals_1.baseCrystals.map(function (c) { return c.id; }); }
function listFusionSets() { return fusionSets_1.fusionSets.map(function (f) { return ({ id: f.id, name: f.name }); }); }
