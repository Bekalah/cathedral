#!/bin/bash
# Add tsconfig extends to all packages
# Ensures all packages extend root tsconfig

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "📝 Adding tsconfig extends to packages...\n"

for pkg_dir in packages/*/; do
  tsconfig_path="$pkg_dir/tsconfig.json"
  
  if [ ! -f "$tsconfig_path" ]; then
    continue
  fi
  
  # Check if already has extends
  if grep -q '"extends"' "$tsconfig_path" 2>/dev/null; then
    continue
  fi
  
  # Read current config
  current=$(cat "$tsconfig_path")
  
  # Add extends after compilerOptions or at start
  if echo "$current" | grep -q '"compilerOptions"'; then
    # Insert extends after compilerOptions opening
    new_config=$(echo "$current" | sed '/"compilerOptions":/a\
  "extends": "../tsconfig.json",')
  else
    # Add at the start
    new_config=$(echo "$current" | sed '1a\
  "extends": "../tsconfig.json",')
  fi
  
  # Write back
  echo "$new_config" > "$tsconfig_path"
  echo "  ✅ Added extends to $(basename "$pkg_dir")"
done

echo "\n✅ tsconfig extends added!"

