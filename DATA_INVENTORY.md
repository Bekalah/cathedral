# 📦 Cathedral Data Inventory

**This is the SINGLE SOURCE OF TRUTH for all data files.**

Consolidated from:
- `cathedral-real` (4.2GB, largest source)
- `cathedral-v1-consolidated` (2.1GB)
- `restore_temp`

---

## Data Structure

```
data/
├── codex/           # Codex 144:99 core data
├── arcana/          # Tarot and Liber Arcanae data
├── research/        # Academic and esoteric research
├── design/          # Design system and art data
└── esoteric/        # Angels, correspondences, etc.

config/              # Configuration files
REGISTRY/            # Package and palette registry
```

---

## 1. CODEX DATA (`data/codex/`)

| File | Size | Description |
|------|------|-------------|
| `codex-144-expanded.json` | 24KB | All 144 nodes with full metadata |
| `codex-arcanae-mirror.json` | 16KB | Codex-to-Arcana mappings |
| `codex_nodes.json` | 99KB | Complete node definitions |
| `codex_14499.json` | 8KB | Core 144:99 ratios |
| `node-registry-complete.json` | 11KB | Node registry with connections |

**Total: 159KB of Codex data**

---

## 2. ARCANA/TAROT DATA (`data/arcana/`)

| File | Size | Description |
|------|------|-------------|
| `TAROT_MASTER_DATASET.json` | 22KB | Complete 78-card tarot data |
| `complete-arcana-profiles.json` | 14KB | All arcana with meanings |
| `majors.json` | 18KB | 22 Major Arcana |
| `majors-complete.json` | 28KB | Complete Major Arcana with traditions |

**Total: 82KB of Arcana data**

---

## 3. RESEARCH DATA (`data/research/`)

| File | Size | Description |
|------|------|-------------|
| `research-sources.json` | 12KB | Academic sources |
| `mcp-permanent-dataset.json` | 57KB | Permanent reference data |
| `quality-guardian-registry.json` | 12KB | Quality standards |
| `complete-rebecca-arcanae-influences.json` | 20KB | Personal influences and research |

**Total: 101KB of Research data**

---

## 4. DESIGN DATA (`data/design/`)

| File | Size | Description |
|------|------|-------------|
| `pigments-database.json` | 6KB | Rare pigments and colors |
| `grimoire_concepts.json` | 7KB | Grimoire design concepts |
| `design-suite/*.json` | ~50KB | Design suite exports |

**Total: ~63KB of Design data**

---

## 5. ESOTERIC DATA (`data/esoteric/`)

| File | Size | Description |
|------|------|-------------|
| `angels72.json` | ~20KB | 72 Shem Angels |
| `codex_of_abyssiae.json` | ~15KB | Abyss correspondences |

**Total: ~35KB of Esoteric data**

---

## 6. CONFIG FILES (`config/`)

| File | Size | Description |
|------|------|-------------|
| `CATHEDRAL_INTEGRATION_MAP.json` | 16KB | System integration map |

---

## 7. REGISTRY (`REGISTRY/`)

| Folder | Description |
|--------|-------------|
| `nodes/` | Individual node definitions |
| `palettes/` | Color palette catalogs |
| `styles/` | Style pack definitions |

---

## Data Sources Hierarchy

When data exists in multiple sources, we use this priority:

1. **cathedral-real** (primary) - most recent, largest
2. **cathedral-v1-consolidated** (backup) - older but verified
3. **restore_temp** (emergency backup)

Always use the **LARGEST** file as it's most complete.

---

## Verification Commands

```bash
# Verify all JSON files are valid
find data -name "*.json" -exec python3 -c "import json; json.load(open('{}'))" \; -print

# Count total data
du -sh data/

# List all files with sizes
find data -name "*.json" -exec ls -lh {} \;
```

---

## Data Integrity Rules

1. **No empty files** - Every JSON must have content
2. **Valid JSON** - Must parse without errors
3. **No duplicates** - Single source of truth
4. **Consistent naming** - kebab-case for files
5. **Size preserved** - Always keep largest version

---

## What NOT To Include

These are NOT real data (spam/artifacts):
- `node_modules/` JSON files (npm packages)
- `*.lock.json` files (dependency locks)
- `dist/` JSON files (build outputs)
- Timestamped duplicates (`*_1761993929572.json`)

---

## Recovery

If data is lost, run:
```bash
pnpm run consolidate:data
```

This re-runs the consolidation from backup sources.

---

*Last consolidated: November 26, 2024*
*Total data: ~440KB of real, verified data*

