#!/usr/bin/env node
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MiniSearch from "../shared/lib/minisearch-lite.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const paths = {
  works: path.join(rootDir, "shared", "corpus", "works.json"),
  symbols: path.join(rootDir, "shared", "corpus", "symbols", "symbols.json"),
  nodePacks: path.join(rootDir, "shared", "packs", "node"),
  index: path.join(rootDir, "shared", "corpus", "index", "corpusIndex.json")
};

async function readJSON(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function loadText(relativePath) {
  if (!relativePath) {
    return "";
  }
  const target = path.join(rootDir, relativePath);
  try {
    return await fs.readFile(target, "utf8");
  } catch (error) {
    console.warn(`[warn] missing text file: ${relativePath}`);
    return "";
  }
}

function toSummary(body, fallback = "") {
  if (!body) {
    return fallback;
  }
  const clean = body.replace(/[#>*_`\[\]]+/g, " ").replace(/\s+/g, " ").trim();
  return clean.slice(0, 180);
}

function flattenCorrespondences(map = {}) {
  return Object.entries(map)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(item => `${key}:${item}`);
      }
      return `${key}:${value}`;
    })
    .join(" ");
}

async function loadNodePacks(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const packs = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    const data = await readJSON(fullPath);
    const quoteText = (data.excerpts || [])
      .map(item => item.quote || "")
      .join(" ");
    const plateText = (data.plates || [])
      .map(item => item.caption || "")
      .join(" ");
    packs.push({
      file: path.relative(rootDir, fullPath),
      node: data.node,
      title: data.title,
      excerpts: data.excerpts || [],
      plates: data.plates || [],
      body: `${quoteText} ${plateText}`.trim()
    });
  }
  return packs;
}

async function buildDocuments() {
  const worksData = await readJSON(paths.works);
  const symbolsData = await readJSON(paths.symbols);
  const nodePacks = await loadNodePacks(paths.nodePacks);

  const documents = [];

  for (const work of worksData.works) {
    const body = await loadText(work.file);
    documents.push({
      id: work.id,
      type: "work",
      title: work.title,
      author: work.author,
      year: work.year,
      tags: [...(work.traditions || []), ...(work.canonical_tags || [])],
      body,
      summary: toSummary(body, `${work.title} by ${work.author}`),
      license: work.license,
      file: work.file
    });
  }

  for (const symbol of symbolsData.symbols) {
    const correspondences = flattenCorrespondences(symbol.corresponds);
    const summaryParts = Object.entries(symbol.corresponds || {})
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`);
    documents.push({
      id: symbol.id,
      type: "symbol",
      title: symbol.label,
      work: symbol.work_id,
      tags: [symbol.type],
      body: correspondences,
      summary: summaryParts.join(" | "),
      symbolPath: symbol.svg
    });
  }

  for (const pack of nodePacks) {
    const works = pack.excerpts.map(item => item.work_id).join(" ");
    const summary = pack.excerpts.length > 0 ? pack.excerpts[0].quote : pack.title;
    documents.push({
      id: `pack-${pack.node}`,
      type: "node_pack",
      title: pack.title,
      node: pack.node,
      tags: ["node", "pack"],
      body: pack.body,
      summary,
      file: pack.file,
      works
    });
  }

  return documents;
}

async function main() {
  const documents = await buildDocuments();

  const mini = new MiniSearch({
    fields: ["title", "author", "body", "tags", "summary", "works"],
    storeFields: ["id", "type", "title", "author", "year", "summary", "symbolPath", "node", "file", "work", "license"],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2
    }
  });

  mini.addAll(documents);

  await fs.writeFile(paths.index, JSON.stringify(mini.toJSON()), "utf8");
  console.log(`[ok] wrote index with ${documents.length} documents to ${paths.index}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
