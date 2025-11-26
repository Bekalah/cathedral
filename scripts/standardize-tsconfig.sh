#!/bin/bash
# Standardize all tsconfig.json files to best quality
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }

cd "$ROOT_DIR"

# Best quality tsconfig template
cat > /tmp/best-tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@cathedral/core": ["../../packages/core/src"],
      "@cathedral/shared": ["../../packages/shared/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build", ".turbo"]
}
EOF

log "Standardizing tsconfig.json files..."

find packages apps -name "tsconfig.json" -not -path "*/node_modules/*" | while read tsconfig_file; do
    log "  Checking $tsconfig_file"
    
    # Check if it needs updating (simplified check)
    if ! grep -q '"target": "ES2022"' "$tsconfig_file" 2>/dev/null; then
        warn "  $tsconfig_file may need updating (manual review recommended)"
    fi
done

log "✓ Tsconfig files checked"

