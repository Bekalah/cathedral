// resonance.ts - computation utilities
import { baseCrystals } from './data/baseCrystals';
import { fusionSets } from './data/fusionSets';
import * as dotenv from 'dotenv';
dotenv.config();
function mean(nums) { return nums.reduce((a, b) => a + b, 0) / Math.max(1, nums.length); }
export async function computeFusionResonance(fusionId) {
    const fusion = fusionSets.find((f) => f.id === fusionId);
    if (!fusion)
        return null;
    const members = fusion.members
        .map((id) => baseCrystals.find((c) => c.id === id))
        .filter((c) => Boolean(c));
    const freqStack = [];
    members.forEach((c) => c.baseFrequenciesHz?.forEach((f) => freqStack.push(f)));
    const colorField = [];
    members.forEach((c) => c.colorSpectrum.forEach((col) => { if (!colorField.includes(col))
        colorField.push(col); }));
    // crude phi score: how many ratios approximate phi within tolerance
    let phiHits = 0;
    let comparisons = 0;
    for (let i = 0; i < freqStack.length; i++) {
        for (let j = i + 1; j < freqStack.length; j++) {
            const ratio = freqStack[j] > freqStack[i] ? freqStack[j] / freqStack[i] : freqStack[i] / freqStack[j];
            comparisons++;
            if (Math.abs(ratio - 1.618) < 0.05)
                phiHits++;
        }
    }
    const phiScore = comparisons ? phiHits / comparisons : 0;
    // stability heuristic: coherence * frequency regularity factor
    const intervals = [];
    const sorted = [...freqStack].sort((a, b) => a - b);
    for (let i = 0; i < sorted.length - 1; i++)
        intervals.push(sorted[i + 1] - sorted[i]);
    const avg = mean(intervals);
    const variance = mean(intervals.map(v => Math.pow(v - avg, 2)));
    const regularity = 1 / (1 + variance / 10000);
    const baseResult = {
        compositeFrequency: freqStack,
        colorField,
        phiScore: Number(phiScore.toFixed(3)),
        stability: Number((fusion.synergyModel.coherence * regularity).toFixed(3))
    };
    return {
        ...baseResult,
        aiLore: 'Pure algorithmic resonance computation - no AI involvement.'
    };
}
export function listCrystalIds() { return baseCrystals.map(c => c.id); }
export function listFusionSets() { return fusionSets.map(f => ({ id: f.id, name: f.name })); }
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */ ;
}
catch (e) {
// console.error(e);
} }
; /* istanbul ignore next */
function console.log(i, ...v) { try {
}
catch (e) { } return v; }
;
}
catch (e) { } return v; }
;
function console.log(i, ...v) { try {
}
catch (e) { } return v; }
;
function oo_ts(v) { try {
}
catch (e) { } return v; }
;
oo_ts; /* istanbul ignore next */
function oo_te(v, i) { try {
}
catch (e) { } return v; }
;
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/
