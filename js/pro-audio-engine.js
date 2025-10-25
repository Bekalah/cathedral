/**
 * Professional Audio Engine - Studio quality synthesis
 */

class ProAudioEngine {
    constructor() {
        this.audioCtx = null;
        this.masterChain = null;
        this.convolver = null;
        this.analyzer = null;
        this.compressor = null;
        this.isInitialized = false;
    }
    
    init() {
        if (!this.isInitialized) {
            try {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                this.buildMasterChain();
                this.isInitialized = true;
                console.log('✅ Pro Audio Engine initialized');
            } catch (error) {
                console.warn('Audio initialization failed:', error);
            }
        }
        
        // Resume context if suspended (Chrome policy)
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }
    
    buildMasterChain() {
        // Professional mastering chain
        const ctx = this.audioCtx;
        
        // 1. Analyzer (for visualization)
        this.analyzer = ctx.createAnalyser();
        this.analyzer.fftSize = 4096;
        this.analyzer.smoothingTimeConstant = 0.8;
        
        // 2. Convolution reverb (impulse response)
        this.convolver = ctx.createConvolver();
        this.convolver.buffer = this.createImpulseResponse(2, 2, false);
        
        const reverbGain = ctx.createGain();
        reverbGain.gain.value = 0.3;
        
        // 3. EQ (3-band)
        const lowShelf = ctx.createBiquadFilter();
        lowShelf.type = 'lowshelf';
        lowShelf.frequency.value = 200;
        lowShelf.gain.value = 2;
        
        const midPeak = ctx.createBiquadFilter();
        midPeak.type = 'peaking';
        midPeak.frequency.value = 1000;
        midPeak.Q.value = 0.5;
        midPeak.gain.value = 1;
        
        const highShelf = ctx.createBiquadFilter();
        highShelf.type = 'highshelf';
        highShelf.frequency.value = 5000;
        highShelf.gain.value = 3;
        
        // 4. Compressor (mastering)
        this.compressor = ctx.createDynamicsCompressor();
        this.compressor.threshold.value = -24;
        this.compressor.knee.value = 30;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0.003;
        this.compressor.release.value = 0.25;
        
        // 5. Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.3; // Conservative level
        
        // Chain: source → analyzer → reverb → EQ → compressor → master → output
        this.masterChain = {
            analyzer: this.analyzer,
            convolver: this.convolver,
            reverbGain: reverbGain,
            lowShelf: lowShelf,
            midPeak: midPeak,
            highShelf: highShelf,
            compressor: this.compressor,
            master: masterGain
        };
        
        // Connect master chain
        this.analyzer.connect(lowShelf);
        lowShelf.connect(midPeak);
        midPeak.connect(highShelf);
        highShelf.connect(this.compressor);
        this.compressor.connect(masterGain);
        masterGain.connect(ctx.destination);
        
        // Reverb send
        this.analyzer.connect(this.convolver);
        this.convolver.connect(reverbGain);
        reverbGain.connect(this.compressor);
    }
    
    // Create realistic reverb impulse
    createImpulseResponse(duration, decay, reverse) {
        const ctx = this.audioCtx;
        const sampleRate = ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = ctx.createBuffer(2, length, sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const n = reverse ? length - i : i;
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
            }
        }
        
        return impulse;
    }
    
    // Advanced synthesis with harmonic series
    createVoice(node) {
        this.init();
        
        if (!this.isInitialized) {
            console.warn('Audio not initialized');
            return null;
        }
        
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const freq = this.getFrequencyForNode(node);
        
        // Additive synthesis with harmonic series
        const harmonics = [1, 2, 3, 4, 5, 6, 7, 8]; // Overtones
        const amplitudes = [1, 0.5, 0.3, 0.2, 0.15, 0.1, 0.05, 0.03];
        
        const voices = harmonics.map((harmonic, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.frequency.value = freq * harmonic;
            osc.type = 'sine';
            
            // ADSR envelope per harmonic
            const amp = amplitudes[i] * 0.05; // Lower volume
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(amp, now + 0.05);
            gain.gain.linearRampToValueAtTime(amp * 0.7, now + 0.3);
            gain.gain.setValueAtTime(amp * 0.7, now + 2);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
            
            osc.connect(gain);
            gain.connect(this.analyzer);
            
            return { osc, gain };
        });
        
        // Add subtle vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 5; // 5 Hz vibrato
        lfoGain.gain.value = 3; // ±3 Hz depth
        
        lfo.connect(lfoGain);
        voices.forEach(v => lfoGain.connect(v.osc.frequency));
        
        // Start all
        voices.forEach(v => {
            v.osc.start(now);
            v.osc.stop(now + 3);
        });
        lfo.start(now);
        lfo.stop(now + 3);
        
        return { voices, lfo };
    }
    
    // Get frequency for node (based on solfeggio or element)
    getFrequencyForNode(node) {
        if (node.solfeggio) {
            return node.solfeggio;
        }
        
        // Element-based frequencies
        const elementFreqs = {
            'Fire': 528,
            'Water': 396,
            'Earth': 417,
            'Air': 741,
            'Aether': 852,
            'Spirit': 963
        };
        
        return elementFreqs[node.element] || 440;
    }
    
    // Simple tone for immediate feedback
    playTone(frequency = 440, duration = 0.5) {
        this.init();
        
        if (!this.isInitialized) return;
        
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.frequency.value = frequency;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        
        osc.connect(gain);
        gain.connect(this.analyzer);
        
        osc.start(now);
        osc.stop(now + duration);
        
        return { osc, gain };
    }
    
    // Granular synthesis for texture
    createGranularTexture(buffer, node) {
        this.init();
        
        if (!this.isInitialized || !buffer) return;
        
        const ctx = this.audioCtx;
        const now = ctx.currentTime;
        const grainCount = 50;
        const duration = 3;
        const freq = this.getFrequencyForNode(node);
        
        for (let i = 0; i < grainCount; i++) {
            const source = ctx.createBufferSource();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            
            source.buffer = buffer;
            source.playbackRate.value = 0.5 + Math.random();
            
            filter.type = 'bandpass';
            filter.frequency.value = freq * (0.5 + Math.random());
            filter.Q.value = 10;
            
            const startTime = now + (i / grainCount) * duration;
            const grainDuration = 0.1 + Math.random() * 0.1;
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.05, startTime + grainDuration * 0.3);
            gain.gain.linearRampToValueAtTime(0, startTime + grainDuration);
            
            source.connect(filter);
            filter.connect(gain);
            gain.connect(this.analyzer);
            
            source.start(startTime, Math.random() * 0.5, grainDuration);
        }
    }
    
    // Get spectrum data for visualization
    getSpectrumData() {
        if (!this.analyzer) return null;
        
        const dataArray = new Uint8Array(this.analyzer.frequencyBinCount);
        this.analyzer.getByteFrequencyData(dataArray);
        return dataArray;
    }
    
    // Get waveform data
    getWaveformData() {
        if (!this.analyzer) return null;
        
        const dataArray = new Uint8Array(this.analyzer.fftSize);
        this.analyzer.getByteTimeDomainData(dataArray);
        return dataArray;
    }
    
    // Create noise buffer for granular synthesis
    createNoiseBuffer(duration = 1) {
        if (!this.audioCtx) return null;
        
        const ctx = this.audioCtx;
        const sampleRate = ctx.sampleRate;
        const length = sampleRate * duration;
        const buffer = ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Pink noise generation
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < length; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
            b6 = white * 0.115926;
        }
        
        return buffer;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.ProAudioEngine = ProAudioEngine;
} else if (typeof module !== 'undefined') {
    module.exports = ProAudioEngine;
}