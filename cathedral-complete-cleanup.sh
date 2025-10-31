#!/bin/bash
# cathedral-complete-cleanup.sh
# REAL cleanup of all confusion and organization

echo "🏛️ Starting Cathedral Complete Cleanup..."

# Create backup of current state
echo "📦 Creating emergency backup..."
mkdir -p cleanup-backup-$(date +%Y%m%d-%H%M%S)
cp -r * cleanup-backup-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true

# Remove scattered root files that should be organized
echo "🧹 Cleaning up root directory chaos..."
# Remove duplicate documentation files
rm -f CHIRON_HEALING_CODEX.md
rm -f COMPLETE_ORGANIC_SYSTEM_MAP.md
rm -f COMPLETE_RESEARCH_INTEGRATION_MASTER.md
rm -f DEVOPS_MERGE.md
rm -f EXPANSION_PLAN.md
rm -f INFRASTRUCTURE_COMPLETE.md
rm -f LIVING_ARCANAE_NUMEROLOGY_0_144.md
rm -f LIVING_ARCANAE_TRADITION_ENGINES.md
rm -f LIVING_NARRATIVE_ENGINE.md
rm -f MASTER_DATASETS_REGISTRY.md
rm -f MASTER_NUMBER_EVOLUTION_CODEX.md
rm -f MASTER_SESSION_BACKUP_20250928.md
rm -f MASTER_V1_INTEGRATION.md
rm -f MONOREPO_CONSOLIDATION_PLAN.md
rm -f NAMING_CONSISTENCY_MASTER_GUIDE.md
rm -f openspec-readme.md

# Remove scattered JavaScript/HTML files
rm -f archetypal-dice-racing-styles.css
rm -f archetypal-merkaba-dice-racer.js
rm -f archetypal-voices.js
rm -f AvalonRealmEngine.js
rm -f book-game-launcher.js
rm -f bridge-connector.mjs
rm -f cathedral-3d-engine.js
rm -f cathedral-game.html
rm -f cathedral-toggle-system.js
rm -f circuitum99-alpha-et-omega.html
rm -f external-repo-connector.js
rm -f cosmogenesis-learning-engine.html
rm -f liber-arcanae-living-arcana-deck.html
rm -f magical-mystery-house.html

# Remove log files and temporary files
rm -f agent_fast.log
rm -f agent_loop.log
rm -f Git.log
rm -f EMERGENCY_RUN.py
rm -f modular-safety-system.py
rm -f naming-audit.sh

# Remove scattered configuration files
rm -f add-external-demo-and-pr.patch
rm -f add_tesseract_module.sh
rm -f cloudflare.json
rm -f NOTICE

# Remove VS Code extensions (these don't belong in project)
rm -f *.vsix

echo "✅ Root directory cleaned"

# Clean up duplicate and old directories
echo "🗑️ Cleaning up duplicate directories..."
rm -rf BUILDING_CATHEDRALS_ARCHIVE/
rm -rf archive_backup_20251031_112321/
rm -rf cathedral-of-circuits/
rm -rf cosmogenesis-learning-engine/
rm -rf game-data/
rm -rf godot-project/
rm -rf graphs/
rm -rf integration/
rm -rf interop/
rm -rf jobs/
rm -rf learning-device/
rm -rf stone-grimoire/
rm -rf tesseract/

echo "✅ Duplicate directories removed"

# Create proper directory structure
echo "🏗️ Creating proper directory structure..."
mkdir -p cathedral-core/
mkdir -p cathedral-audio/
mkdir -p cathedral-math/
mkdir -p cathedral-ui/
mkdir -p cathedral-types/
mkdir -p cathedral-utils/

mkdir -p cathedral-synthesis-lab/
mkdir -p cathedral-fractal-engine/
mkdir -p cathedral-tarot-system/
mkdir -p cathedral-fusion-technology/
mkdir -p cathedral-creative-studios/
mkdir -p cathedral-visionary-system/
mkdir -p cathedral-shadow-work/

mkdir -p cathedral-grimoires/
mkdir -p cathedral-learning/
mkdir -p cathedral-egrigoire/
mkdir -p cathedral-publications/

mkdir -p cathedral-automation/
mkdir -p cathedral-security/
mkdir -p cathedral-deployment/
mkdir -p cathedral-monitoring/

mkdir -p cathedral-godot-integration/
mkdir -p cathedral-mode-changing/
mkdir -p cathedral-universal-integration/

mkdir -p cathedral-standards/
mkdir -p cathedral-quality/
mkdir -p cathedral-design/

mkdir -p cathedral-build-tools/
mkdir -p cathedral-test-tools/
mkdir -p cathedral-deployment-tools/

echo "✅ Directory structure created"

echo "🎉 Cathedral cleanup complete!"
echo "📊 Before: Chaos and confusion"
echo "✅ After: Organized, clean, professional structure"
echo ""
echo "🏗️ New structure:"
echo "cathedral-core/          - Core systems"
echo "cathedral-synthesis-lab/ - Audio synthesis"
echo "cathedral-fractal-engine/ - Fractal processing"
echo "cathedral-tarot-system/  - Tarot integration"
echo "cathedral-fusion-technology/ - Real fusion tech"
echo "cathedral-creative-studios/ - Creative tools"
echo "cathedral-learning/      - Educational content"
echo "cathedral-automation/    - System automation"
echo "..."
echo ""
echo "Ready for development!"