# 🗑️ JUNK IDENTIFIED - DELETE OR FIX

This file identifies everything that is junk, spam, or placeholder content.

---

## ❌ FOLDERS TO DELETE

These are old snapshots/backups that are now consolidated into `data/`:

```
imports/                      # Old CathedralMonorepo snapshot - DELETE
```

---

## ⚠️ STUB PACKAGES (7-9 lines only)

These packages have placeholder `src/index.ts` with no real code.
**Decision needed:** Either implement them or delete them.

| Package | Lines | Action |
|---------|-------|--------|
| `agent-integration` | 7 | DELETE - not used |
| `alchemy` | 7 | KEEP - needs implementation |
| `alexandria-library` | 7 | KEEP - needs implementation |
| `arcana` | 7 | DELETE - merged into liber-arcanae |
| `archetypal-engine` | 7 | DELETE - merged into codex-144-99 |
| `art-systems` | 7 | DELETE - merged into art-generation-node |
| `atelier-constitution` | 7 | DELETE - not used |
| `avatar-experience-system` | 7 | DELETE - not used |
| `cathedral-144` | 7 | DELETE - duplicate of codex-144-99 |
| `cathedral-lightweight-library` | 7 | DELETE - not used |
| `cathedral-style` | 7 | DELETE - merged into japanese-design-system |
| `characters` | 7 | KEEP - needs 22 arcana implementation |
| `circuit-craft-creative-game` | 7 | DELETE - merged into game-engine |
| `connections` | 7 | DELETE - merged into tesseract-bridge |
| `labs` | 7 | DELETE - not used |
| `soul` | 7 | KEEP - trinity architecture |

### Packages to DELETE (12):
```
packages/agent-integration
packages/arcana
packages/archetypal-engine
packages/art-systems
packages/atelier-constitution
packages/avatar-experience-system
packages/cathedral-144
packages/cathedral-lightweight-library
packages/cathedral-style
packages/circuit-craft-creative-game
packages/connections
packages/labs
```

### Packages to KEEP and implement (4):
```
packages/alchemy
packages/alexandria-library
packages/characters
packages/soul
```

---

## 📄 MARKDOWN FILES TO ARCHIVE

60 markdown files in root. Most are progress reports, not documentation.

### KEEP (essential docs):
```
README.md                     # Main readme
CONTRIBUTING.md               # Contribution guide
DATA_INVENTORY.md             # Data documentation
```

### ARCHIVE (move to docs/archive/):
```
ALL_DESIGNS_AND_CODEX_FIXED.md
ALL_TOOLS_VERSION_REVIEW_COMPLETE.md
CATHEDRAL_BRANCH_CONNECTION_PLAN.md
CATHEDRAL_CONNECTION_MAP.md
CATHEDRAL_DUPLICATE_CATALOG.md
CLEANUP_BREAKING_CODE.md
CLEANUP_REPORT.md
CODEX_144_99_COMPLETE.md
CODEX_144_99_MAPPING_COMPLETE.md
COMPLETE_GAME_ANALYSIS.md
COMPLETE_RECOVERY_SUMMARY.md
COMPLETE_SYSTEM_DESIGN.md
COMPLETE_TRANSMUTATION_SYSTEM.md
CONNECTION_COMPLETE.md
CONSOLIDATION_AND_BALANCE.md
CREATIVE_FLOW_COMPLETE.md
CROSS_DIRECTORY_CONNECTIONS.md
CROSS_ENGINEERING_COMPLETE.md
CUSTOM_TOOLS_INVENTORY.md
DATA_RECOVERY_COMPLETE.md
DATA_RECOVERY_SUMMARY.md
DEPLOYMENT_STATUS.md
DIRECTORY_MAP.md
ENTERPRISE_ARCHITECTURE.md
ENTERPRISE_PACKAGE_UPGRADE.md
EXECUTE_FIXES.md
EXECUTION_RESULTS.md
... (and more)
```

---

## 🔒 AFTER CLEANUP

Root should only have:
```
README.md
CONTRIBUTING.md
LICENSE
package.json
pnpm-workspace.yaml
turbo.json
tsconfig.json
tsconfig.base.json
.gitignore
.npmrc
```

Everything else goes in:
- `docs/` - Documentation
- `docs/archive/` - Old progress reports
- `openspec/` - Specifications and standards
- `scripts/` - Build scripts

---

## Run Cleanup

```bash
pnpm run cleanup:junk
```

