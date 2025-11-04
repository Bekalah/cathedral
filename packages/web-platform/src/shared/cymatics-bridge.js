<<<<<<< HEAD
// cymatics-bridge.js
// Bridge module for consolidated cymatics engine integration
// Ensures import paths are correct for live deployment

=======
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
// ✦ Cymatics Bridge — Web Audio API interface for sound visualization
// Provides spectrum analysis for the Cymatics engine

export async function createCymaticsBridge() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
<<<<<<< HEAD

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

=======
  
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  let source = null;
  let audioElement = null;
  let frameCallback = null;
  let animationId = null;
<<<<<<< HEAD

  // Load audio track
  async function loadTrack(url) {
    audioElement = new Audio(url);
    audioElement.crossOrigin = "anonymous";

=======
  
  // Load audio track
  async function loadTrack(url) {
    audioElement = new Audio(url);
    audioElement.crossOrigin = 'anonymous';
    
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
    // Create source node
    source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
<<<<<<< HEAD

    return new Promise((resolve, reject) => {
      audioElement.addEventListener("canplaythrough", resolve, { once: true });
      audioElement.addEventListener("error", reject, { once: true });
      audioElement.load();
    });
  }

=======
    
    return new Promise((resolve, reject) => {
      audioElement.addEventListener('canplaythrough', resolve, { once: true });
      audioElement.addEventListener('error', reject, { once: true });
      audioElement.load();
    });
  }
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  // Play audio
  async function play() {
    if (audioElement) {
      await audioElement.play();
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  // Pause audio
  function pause() {
    if (audioElement) {
      audioElement.pause();
    }
  }
<<<<<<< HEAD

  // Start analysis loop
  function start() {
    if (animationId) return; // Already running

    function analyze() {
      analyser.getByteFrequencyData(dataArray);

      // Normalize spectrum data (0-1 range)
      const spectrum = Array.from(dataArray).map((v) => v / 255);

      if (frameCallback) {
        frameCallback({ spectrum, dataArray });
      }

      animationId = requestAnimationFrame(analyze);
    }

    analyze();
  }

=======
  
  // Start analysis loop
  function start() {
    if (animationId) return; // Already running
    
    function analyze() {
      analyser.getByteFrequencyData(dataArray);
      
      // Normalize spectrum data (0-1 range)
      const spectrum = Array.from(dataArray).map(v => v / 255);
      
      if (frameCallback) {
        frameCallback({ spectrum, dataArray });
      }
      
      animationId = requestAnimationFrame(analyze);
    }
    
    analyze();
  }
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  // Stop analysis loop
  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  // Register frame callback
  function onFrame(callback) {
    frameCallback = callback;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  // Cleanup
  function destroy() {
    stop();
    if (audioElement) {
      audioElement.pause();
<<<<<<< HEAD
      audioElement.src = "";
=======
      audioElement.src = '';
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
    }
    if (source) {
      source.disconnect();
    }
<<<<<<< HEAD
    if (audioContext.state !== "closed") {
      audioContext.close();
    }
  }

=======
    if (audioContext.state !== 'closed') {
      audioContext.close();
    }
  }
  
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  return {
    loadTrack,
    play,
    pause,
    start,
    stop,
    onFrame,
    destroy,
<<<<<<< HEAD
    get audioContext() {
      return audioContext;
    },
    get analyser() {
      return analyser;
    },
    get audioElement() {
      return audioElement;
    },
=======
    get audioContext() { return audioContext; },
    get analyser() { return analyser; },
    get audioElement() { return audioElement; }
>>>>>>> 745d447282540bff8edd78e5c5bb2b966c93dce2
  };
}
