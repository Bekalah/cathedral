#!/bin/bash
# Ensure "Rebecca Respawn" consistency across all repos
# Updates author/creator fields to use consistent creative name

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
CREATOR="Rebecca Respawn"
AUTHOR_EMAIL="bekalah"

echo "🔄 Ensuring Rebecca Respawn consistency across all repos..."
echo ""

# Fix all package.json files
find "$MONOREPO_ROOT" -name "package.json" -type f | while read pkg_file; do
  if [ -f "$pkg_file" ]; then
    node << EOF
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('$pkg_file', 'utf8'));
      
      // Update author
      if (!pkg.author || typeof pkg.author === 'string') {
        pkg.author = '$CREATOR <$AUTHOR_EMAIL>';
      } else if (pkg.author && typeof pkg.author === 'object') {
        pkg.author.name = '$CREATOR';
        pkg.author.email = '$AUTHOR_EMAIL';
      }
      
      // Update contributors if exists
      if (pkg.contributors) {
        pkg.contributors = ['$CREATOR <$AUTHOR_EMAIL>'];
      }
      
      // Update maintainers if exists
      if (pkg.maintainers) {
        pkg.maintainers = ['$CREATOR <$AUTHOR_EMAIL>'];
      }
      
      fs.writeFileSync('$pkg_file', JSON.stringify(pkg, null, 2) + '\n');
EOF
    echo "  ✅ Fixed: $(basename $(dirname $pkg_file))"
  fi
done

# Fix README files
find "$MONOREPO_ROOT" -name "README.md" -type f | while read readme; do
  if grep -q "bekalah\|Bekalah" "$readme" && ! grep -q "Rebecca Respawn" "$readme"; then
    sed -i '' "s/bekalah/Rebecca Respawn/g" "$readme" 2>/dev/null || true
    sed -i '' "s/Bekalah/Rebecca Respawn/g" "$readme" 2>/dev/null || true
    echo "  ✅ Updated README: $(basename $(dirname $readme))"
  fi
done

# Fix LICENSE files
if [ -f "$MONOREPO_ROOT/LICENSE" ]; then
  if ! grep -q "Rebecca Respawn" "$MONOREPO_ROOT/LICENSE"; then
    sed -i '' "s/Copyright.*bekalah/Copyright (c) Rebecca Respawn/g" "$MONOREPO_ROOT/LICENSE" 2>/dev/null || true
    echo "  ✅ Updated LICENSE"
  fi
fi

echo ""
echo "✅ All repos now consistently use: $CREATOR"
echo ""

