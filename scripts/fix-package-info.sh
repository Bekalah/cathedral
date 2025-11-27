#!/bin/bash
# Fix all package.json files with correct GitHub info

set -e

REPO_URL="https://github.com/Bekalah/cathedral"
HOMEPAGE_URL="https://bekalah.github.io/cathedral"
AUTHOR="Rebecca Respawn"
LICENSE="CC0-1.0"

echo "🔧 Fixing package.json files with correct GitHub info..."

# Find all package.json files
find packages apps -name "package.json" -type f | while read pkg_file; do
  echo "📦 Processing: $pkg_file"
  
  # Get directory name for package name
  dir_name=$(dirname "$pkg_file")
  pkg_name=$(basename "$dir_name")
  
  # Determine if it's an app or package
  if [[ "$pkg_file" == apps/* ]]; then
    pkg_type="app"
    homepage_path="$HOMEPAGE_URL/apps/$pkg_name"
  else
    pkg_type="package"
    homepage_path="$HOMEPAGE_URL/packages/$pkg_name"
  fi
  
  # Use jq to update package.json (if available) or use node
  if command -v jq &> /dev/null; then
    # Update with jq
    jq \
      --arg repo "$REPO_URL" \
      --arg homepage "$homepage_path" \
      --arg author "$AUTHOR" \
      --arg license "$LICENSE" \
      --arg directory "$dir_name" \
      '.repository = {
        type: "git",
        url: $repo,
        directory: $directory
      } | .homepage = $homepage | .author = $author | .license = $license' \
      "$pkg_file" > "${pkg_file}.tmp" && mv "${pkg_file}.tmp" "$pkg_file"
  else
    # Use node to update
    node -e "
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('$pkg_file', 'utf8'));
      pkg.repository = {
        type: 'git',
        url: '$REPO_URL',
        directory: '$dir_name'
      };
      pkg.homepage = '$homepage_path';
      pkg.author = '$AUTHOR';
      pkg.license = '$LICENSE';
      fs.writeFileSync('$pkg_file', JSON.stringify(pkg, null, 2) + '\n');
    "
  fi
  
  echo "✅ Updated: $pkg_file"
done

echo "✅ All package.json files updated!"

