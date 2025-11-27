#!/bin/bash
# Build Cross-Connections
# Ensures all packages are properly built and connected

set -e

echo "🔗 Building cross-connections..."

# Build all packages in dependency order
echo "📦 Building packages..."

# First, build shared (no dependencies)
echo "  → Building @cathedral/shared..."
cd packages/shared && ppnpm run build && cd ../..

# Build core packages
echo "  → Building core packages..."
cd packages/codex-144-99 && ppnpm run build && cd ../..
cd packages/brain && ppnpm run build && cd ../..
cd packages/synth && ppnpm run build && cd ../..

# Build Trinity
echo "  → Building Trinity packages..."
cd packages/circuitum99 && ppnpm run build && cd ../..
cd packages/stone-grimoire && ppnpm run build && cd ../..
cd packages/cosmogenesis-learning-engine && ppnpm run build && cd ../..

# Build Sacred Knowledge
echo "  → Building Sacred Knowledge packages..."
cd packages/liber-arcanae && ppnpm run build && cd ../..
cd packages/tesseract-bridge && ppnpm run build && cd ../..

# Build Creative Systems
echo "  → Building Creative Systems packages..."
cd packages/violet-flame-transmutation && ppnpm run build && cd ../..
cd packages/game-music-integration && ppnpm run build && cd ../..
cd packages/fractal-sound-game-bridge && ppnpm run build && cd ../..

# Build Visionary Art
echo "  → Building Visionary Art packages..."
cd packages/visionary-art-colors && ppnpm run build && cd ../..
cd packages/visionary-art-textures && ppnpm run build && cd ../..
cd packages/fusionkink-design-system && ppnpm run build && cd ../..

# Build Professional Design Suite (depends on art packages)
echo "  → Building Professional Design Suite..."
cd packages/professional-design-suite && ppnpm run build && cd ../..

# Build RPG & Game
echo "  → Building RPG & Game packages..."
cd packages/fable-rpg-mechanics && ppnpm run build && cd ../..
cd packages/unified-canon-system && ppnpm run build && cd ../..

# Build Navigation
echo "  → Building Navigation packages..."
cd packages/magical-mystery-house && ppnpm run build && cd ../..

# Build Tools
echo "  → Building Tools packages..."
cd packages/cathedral-cli && ppnpm run build && cd ../..
cd packages/cathedral-tools && ppnpm run build && cd ../..
cd packages/cathedral-analytics && ppnpm run build && cd ../..

# Build Art Generation (depends on art packages)
echo "  → Building Art Generation..."
cd packages/art-generation-node && ppnpm run build && cd ../..

echo "✅ All packages built!"
echo ""
echo "🔍 Verifying connections..."
ppnpm run verify:connections || echo "⚠️  Some connections need attention"

echo ""
echo "✅ Cross-connections build complete!"

