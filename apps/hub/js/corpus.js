/*
  corpus.js
  Offline-first corpus search helper using the shared minisearch-lite implementation.
  ND-safe: no motion, pure data transformations, ASCII only.
*/

import MiniSearch from "../../shared/lib/minisearch-lite.mjs";

let mini = null;

function resolveElement(target) {
  if (typeof target === "string") {
    return document.querySelector(target);
  }
  return target || null;
}

async function fetchJSON(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return await response.json();
}

export async function initCorpus(indexPath = "../shared/corpus/index/corpusIndex.json") {
  const data = await fetchJSON(indexPath).catch(() => null);
  if (!data) {
    mini = null;
    return null;
  }
  mini = MiniSearch.loadJSON(data);
  return mini;
}

export function corpusSearch(query, options = {}) {
  if (!mini) {
    return [];
  }
  const trimmed = (query || "").trim();
  if (trimmed.length === 0) {
    return [];
  }
  return mini.search(trimmed, options);
}

export function attachCorpusSearch({ input, results, minLength = 2, renderResult }) {
  const inputEl = resolveElement(input);
  const resultsEl = resolveElement(results);

  if (!inputEl || !resultsEl) {
    return () => {};
  }

  const renderer = renderResult || ((item) => {
    const typeLabel = item.type ? item.type.replace(/_/g, " ") : "result";
    return `<li><strong>${item.title || item.id}</strong> <em>${typeLabel}</em><br><small>${item.summary || ""}</small></li>`;
  });

  function handleInput(event) {
    const value = event.target.value.trim();
    if (value.length < minLength) {
      resultsEl.innerHTML = "";
      return;
    }
    const matches = corpusSearch(value);
    if (!matches.length) {
      resultsEl.innerHTML = `<li>No matches for <code>${value}</code></li>`;
      return;
    }
    resultsEl.innerHTML = matches.map(renderer).join("");
  }

  inputEl.addEventListener("input", handleInput);
  return () => inputEl.removeEventListener("input", handleInput);
}

export async function loadCorpusMetadata() {
  const [works, symbols, correspondences] = await Promise.all([
    fetchJSON("../shared/corpus/works.json").catch(() => ({ works: [] })),
    fetchJSON("../shared/corpus/symbols/symbols.json").catch(() => ({ symbols: [] })),
    fetchJSON("../shared/graph/correspondences.json").catch(() => ({}))
  ]);
  return { works, symbols, correspondences };
}
