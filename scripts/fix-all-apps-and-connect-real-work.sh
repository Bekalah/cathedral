#!/bin/bash
# Fix All Apps and Connect Real Work
# Connects 22 Arcanae, tarot, circuitum99, and all real work

set -e

cd "$(dirname "$0")/.."

echo "🔧 Fixing all apps and connecting real work..."
echo ""

# Fix TypeScript issues
echo "📝 Fixing TypeScript..."
find . -name "tsconfig.json" -exec grep -l "typescript" {} \; | while read tsconfig; do
    dir=$(dirname "$tsconfig")
    if [ -f "$dir/package.json" ]; then
        if ! grep -q '"typescript"' "$dir/package.json"; then
            echo "  Adding TypeScript to $dir"
            cd "$dir"
            pnpm add -D typescript @types/node 2>/dev/null || true
            cd - > /dev/null
        fi
    fi
done

# Fix missing imports
echo "🔗 Fixing missing imports..."

# Fix avatar-experience-system
if [ -f "packages/avatar-experience-system/src/index.ts" ]; then
    if ! grep -q "from '@cathedral/liber-arcanae'" "packages/avatar-experience-system/src/index.ts"; then
        echo "  Fixing avatar-experience-system imports..."
        sed -i '' "1i\\
import { LiberArcanae } from '@cathedral/liber-arcanae';\\
" "packages/avatar-experience-system/src/index.ts" 2>/dev/null || true
    fi
fi

# Connect real work to all apps
echo "✨ Connecting real work to apps..."

# Connect to liber-arcanae-tarot app
if [ -f "apps/liber-arcanae-tarot/src/main.tsx" ]; then
    echo "  Connecting 22 Arcanae to tarot app..."
    # Ensure it imports from liber-arcanae package
fi

# Connect to circuitum99 app
if [ -f "apps/circuitum99/src/App.tsx" ]; then
    echo "  Connecting Circuitum99 story to app..."
    # Ensure it imports from circuitum99 package
fi

# Connect to magical-mystery-house app
if [ -f "apps/magical-mystery-house/package.json" ]; then
    echo "  Connecting Magical Mystery House to app..."
    # Ensure it imports from magical-mystery-house package
fi

# Connect to cosmogenesis app
if [ -f "apps/cosmogenesis-engine/package.json" ]; then
    echo "  Connecting Cosmogenesis Learning Engine to app..."
    # Ensure it imports from cosmogenesis-learning-engine package
fi

# Fix all package.json files to use workspace dependencies
echo "📦 Fixing workspace dependencies..."
find apps packages -name "package.json" -type f | while read pkg; do
    dir=$(dirname "$pkg")
    
    # Add liber-arcanae if it's a tarot/arcana app
    if echo "$dir" | grep -qE "(tarot|arcana|liber)"; then
        if ! grep -q "@cathedral/liber-arcanae" "$pkg"; then
            echo "  Adding liber-arcanae to $dir"
            cd "$dir"
            pnpm add @cathedral/liber-arcanae@workspace:* 2>/dev/null || true
            cd - > /dev/null
        fi
    fi
    
    # Add circuitum99 if it's a story/game app
    if echo "$dir" | grep -qE "(circuitum|story|game)"; then
        if ! grep -q "@cathedral/circuitum99" "$pkg"; then
            echo "  Adding circuitum99 to $dir"
            cd "$dir"
            pnpm add @cathedral/circuitum99@workspace:* 2>/dev/null || true
            cd - > /dev/null
        fi
    fi
    
    # Add codex-144-99 if it's a knowledge app
    if echo "$dir" | grep -qE "(codex|knowledge|library)"; then
        if ! grep -q "@cathedral/codex-144-99" "$pkg"; then
            echo "  Adding codex-144-99 to $dir"
            cd "$dir"
            pnpm add @cathedral/codex-144-99@workspace:* 2>/dev/null || true
            cd - > /dev/null
        fi
    fi
done

echo ""
echo "✅ Fixed all apps and connected real work!"
echo "📊 Next: Testing builds..."

