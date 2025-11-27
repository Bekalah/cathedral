#!/bin/bash
# Fix workspace conflicts (duplicate packages in apps/ and packages/)

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
cd "$MONOREPO_ROOT"

echo "🔧 FIXING WORKSPACE CONFLICTS"
echo "============================="
echo ""

# Fix professional-design-suite conflict
if [ -d "apps/cathedral-professional-design-suite" ] && [ -d "packages/professional-design-suite" ]; then
  echo "1. Fixing professional-design-suite conflict..."
  # Rename the app version to avoid conflict
  if [ -f "apps/cathedral-professional-design-suite/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'apps/cathedral-professional-design-suite/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/cathedral-professional-design-suite';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed app package name"
  fi
fi

# Fix cosmogenesis-learning-engine conflict
if [ -d "packages/cosmogenesis-learning-engine" ] && [ -d "apps/cosmogenesis-engine" ]; then
  echo "2. Fixing cosmogenesis-learning-engine conflict..."
  # Rename the app version to avoid conflict
  if [ -f "apps/cosmogenesis-engine/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'apps/cosmogenesis-engine/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/cosmogenesis-engine-app';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed app package name"
  fi
fi

# Fix circuitum99 conflict if exists
if [ -d "packages/circuitum99" ] && [ -d "apps/circuitum99" ]; then
  echo "3. Fixing circuitum99 conflict..."
  if [ -f "apps/circuitum99/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'apps/circuitum99/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/circuitum99-app';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed app package name"
  fi
fi

# Fix magical-mystery-house conflict
if [ -d "packages/magical-mystery-house" ] && [ -d "apps/magical-mystery-house" ]; then
  echo "4. Fixing magical-mystery-house conflict..."
  if [ -f "apps/magical-mystery-house/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'apps/magical-mystery-house/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/magical-mystery-house-app';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed app package name"
  fi
fi

# Fix liber-arcanae conflict
if [ -d "packages/liber-arcanae" ] && [ -d "apps/liber-arcanae" ]; then
  echo "5. Fixing liber-arcanae conflict..."
  if [ -f "apps/liber-arcanae/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'apps/liber-arcanae/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/liber-arcanae-app';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed app package name"
  fi
fi

# Fix liber-arcanae-app in packages
if [ -d "packages/liber-arcanae-app" ] && [ -d "apps/liber-arcanae" ]; then
  echo "6. Fixing liber-arcanae-app in packages conflict..."
  if [ -f "packages/liber-arcanae-app/package.json" ]; then
    node << 'EOF'
const fs = require('fs');
const file = 'packages/liber-arcanae-app/package.json';
const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
pkg.name = '@cathedral/liber-arcanae-package';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Renamed package name"
  fi
fi

echo ""
echo "✅ WORKSPACE CONFLICTS FIXED"
echo "============================="

