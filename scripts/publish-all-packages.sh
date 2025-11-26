#!/bin/bash
# Publish all changed packages
# Usage: ./scripts/publish-all-packages.sh [version-bump]

set -e

VERSION_BUMP=${1:-patch}

echo "📦 Publishing All Changed Packages"
echo "Version bump: $VERSION_BUMP"
echo ""

# Get list of packages
PACKAGES=$(find packages -name "package.json" -type f | grep -v node_modules | xargs dirname | xargs -n1 basename)

for pkg in $PACKAGES; do
  pkg_file="packages/$pkg/package.json"
  
  if [ -f "$pkg_file" ]; then
    PRIVATE=$(node -p "require('./$pkg_file').private")
    
    if [ "$PRIVATE" != "true" ]; then
      echo "📦 Publishing: $pkg"
      bash scripts/publish-package.sh "$pkg" "$VERSION_BUMP" || echo "⚠️  Failed to publish $pkg, continuing..."
    else
      echo "⏭️  Skipping private package: $pkg"
    fi
  fi
done

echo ""
echo "✅ All packages processed!"
