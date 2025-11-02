// cymatics-bridge.js
// Bridge module for consolidated cymatics engine integration
// Ensures import paths are correct for live deployment

// ✦ Cymatics Bridge — Web Audio API interface for sound visualization
// Provides spectrum analysis for the Cymatics engine

export async function createCymaticsBridge() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  let source = null;
  let audioElement = null;
  let frameCallback = null;
  let animationId = null;

  // Load audio track
  async function loadTrack(url) {
    audioElement = new Audio(url);
    audioElement.crossOrigin = "anonymous";

    // Create source node
    source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    return new Promise((resolve, reject) => {
      audioElement.addEventListener("canplaythrough", resolve, { once: true });
      audioElement.addEventListener("error", reject, { once: true });
      audioElement.load();
    });
  }

  // Play audio
  async function play() {
    if (audioElement) {
      await audioElement.play();
    }
  }

  // Pause audio
  function pause() {
    if (audioElement) {
      audioElement.pause();
    }
  }

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

  // Stop analysis loop
  function stop() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Register frame callback
  function onFrame(callback) {
    frameCallback = callback;
  }

  // Cleanup
  function destroy() {
    stop();
    if (audioElement) {
      audioElement.pause();
      audioElement.src = "";
    }
    if (source) {
      source.disconnect();
    }
    if (audioContext.state !== "closed") {
      audioContext.close();
    }
  }

  return {
    loadTrack,
    play,
    pause,
    start,
    stop,
    onFrame,
    destroy,
    get audioContext() {
      return audioContext;
    },
    get analyser() {
      return analyser;
    },
    get audioElement() {
      return audioElement;
    },
  };
}
