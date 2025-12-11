#!/bin/bash
# Update Next.js and security dependencies

echo "🔒 Updating Next.js and Security"

BASE_DIR="/Users/rebeccalemke/Documents/cathedral"

# Update Next.js apps
NEXTJS_APPS=(
    "apps/web"
    "external-repos/cathedral-master/apps/web"
)

for app in "${NEXTJS_APPS[@]}"; do
    if [ -d "$BASE_DIR/$app" ]; then
        echo "Updating $app"
        cd "$BASE_DIR/$app"
        
        # Update Next.js to latest
        pnpm add next@latest react@latest react-dom@latest
        pnpm add -D @types/react@latest @types/react-dom@latest
        
        # Security updates
        pnpm add helmet@latest
        pnpm add @next/bundle-analyzer@latest
        pnpm add eslint-config-next@latest
        
        # Update TypeScript
        pnpm add -D typescript@latest
        
        echo "✅ $app updated"
    fi
done

# Update security configurations
cd "$BASE_DIR"