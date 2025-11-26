#!/bin/bash
# Publish a single package to npm
# Usage: ./scripts/publish-package.sh <package-name> [version-bump]

set -e

PACKAGE_NAME=$1
VERSION_BUMP=${2:-patch}

if [ -z "$PACKAGE_NAME" ]; then
  echo "❌ Error: Package name required"
  echo "Usage: ./scripts/publish-package.sh <package-name> [version-bump]"
  exit 1
fi

PACKAGE_DIR="packages/$PACKAGE_NAME"

if [ ! -d "$PACKAGE_DIR" ]; then
  echo "❌ Error: Package directory not found: $PACKAGE_DIR"
  exit 1
fi

echo "📦 Publishing package: $PACKAGE_NAME"
echo "Version bump: $VERSION_BUMP"
echo ""

cd "$PACKAGE_DIR"

# Check if package is private
PRIVATE=$(node -p "require('./package.json').private")
if [ "$PRIVATE" == "true" ]; then
  echo "⚠️  Package is private, skipping npm publish"
  exit 0
fi

# Build package
echo "🔨 Building package..."
pnpm build || echo "⚠️  Build failed, continuing..."

# Bump version
echo "📈 Bumping version..."
pnpm version $VERSION_BUMP --no-git-tag-version

# Publish
echo "🚀 Publishing to npm..."
pnpm publish --access public --no-git-checks

echo "✅ Package published successfully!"
