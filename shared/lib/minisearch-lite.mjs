/*
  minisearch-lite.mjs
  Minimal offline search helper that mimics the MiniSearch API we need.
  It keeps the API surface (addAll, toJSON, loadJSON, search) but uses
  straightforward token matching so we do not rely on external packages.
*/

const defaultOptions = {
  fields: [],
  storeFields: [],
  searchOptions: {
    prefix: true,
    fuzzy: 0
  }
};

function normalizeValue(value) {
  if (value === undefined || value === null) {
    return "";
  }
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(text) {
  return normalizeValue(text)
    .split(/[^a-z0-9]+/)
    .filter(token => token.length > 0);
}

export default class MiniSearchLite {
  constructor(options = {}) {
    const merged = {
      ...defaultOptions,
      ...options,
      searchOptions: {
        ...defaultOptions.searchOptions,
        ...(options.searchOptions || {})
      }
    };
    this.options = merged;
    this.docs = [];
  }

  addAll(documents) {
    for (const doc of documents) {
      this._addDocument(doc);
    }
  }

  _addDocument(doc) {
    const textParts = [];
    for (const field of this.options.fields) {
      if (doc[field]) {
        textParts.push(doc[field]);
      }
    }
    const fullText = textParts.join(" ");
    const tokens = tokenize(fullText);
    const stored = {};
    for (const field of this.options.storeFields) {
      if (doc[field] !== undefined) {
        stored[field] = doc[field];
      }
    }
    this.docs.push({ stored, tokens, text: fullText });
  }

  search(query, overrides = {}) {
    const opts = {
      ...this.options.searchOptions,
      ...overrides
    };
    const tokens = tokenize(query);
    if (tokens.length === 0) {
      return [];
    }

    const results = [];
    for (const doc of this.docs) {
      let score = 0;
      let matchedAll = true;
      for (const term of tokens) {
        const hasMatch = doc.tokens.some(token => {
          if (token === term) {
            score += 3;
            return true;
          }
          if (opts.prefix && token.startsWith(term)) {
            score += 2;
            return true;
          }
          if (opts.fuzzy && Math.abs(token.length - term.length) === 1 && token.includes(term)) {
            score += 1;
            return true;
          }
          return false;
        });
        if (!hasMatch) {
          matchedAll = false;
          break;
        }
      }
      if (matchedAll) {
        results.push({ ...doc.stored, score });
      }
    }

    results.sort((a, b) => b.score - a.score || String(a.title || "").localeCompare(String(b.title || "")));
    return results;
  }

  toJSON() {
    return {
      options: this.options,
      docs: this.docs.map(doc => ({ stored: doc.stored, text: doc.text }))
    };
  }

  static loadJSON(serialized) {
    const instance = new MiniSearchLite(serialized.options);
    instance.docs = serialized.docs.map(doc => ({
      stored: doc.stored,
      text: doc.text,
      tokens: tokenize(doc.text)
    }));
    return instance;
  }
}
