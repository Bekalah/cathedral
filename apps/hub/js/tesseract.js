/*
  tesseract.js
  Bridges corpus correspondences into gameplay modes.
  ND-safe: no motion, pure calculations, calm data flow.
*/

import { loadCorpusMetadata } from "./corpus.js";
import { compileRitual } from "./correspondence.js";

export async function loadRitualData() {
  const { symbols, correspondences } = await loadCorpusMetadata();
  return {
    correspondences,
    symbols: symbols.symbols || []
  };
}

export function createRitualBridge({ correspondences, symbols, onPacket } = {}) {
  const state = {
    correspondences: correspondences || {},
    symbols: symbols || [],
    node: null,
    mode: "study",
    listeners: []
  };

  function emit() {
    if (!state.node) {
      return null;
    }
    const packet = compileRitual(state.node, state.correspondences, state.symbols);
    if (typeof onPacket === "function") {
      onPacket(packet, state.mode);
    }
    state.listeners.forEach(listener => listener(packet, state.mode));
    return packet;
  }

  return {
    setNode(node) {
      state.node = node;
      return emit();
    },
    setMode(mode) {
      state.mode = mode;
      return emit();
    },
    onPacket(listener) {
      if (typeof listener !== "function") {
        return () => {};
      }
      state.listeners.push(listener);
      return () => {
        state.listeners = state.listeners.filter(item => item !== listener);
      };
    },
    getState() {
      return { node: state.node, mode: state.mode };
    }
  };
}
