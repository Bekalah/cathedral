#!/bin/bash
# Remove Console Injection Code
# Removes all console-ninja and related injection code

set -e

echo "🧹 Removing console injection code..."

# Find all files with console-ninja
FILES=$(grep -r "console-ninja\|console\.ninja\|oo_oo\|oo_tx" packages/ apps/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" -l 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "✅ No console injection code found!"
  exit 0
fi

echo "Found console injection in ${#FILES[@]} files"

for file in $FILES; do
  echo "  Cleaning: $file"
  
  # Remove console-ninja imports
  sed -i '' '/console-ninja/d' "$file" 2>/dev/null || sed -i '/console-ninja/d' "$file" 2>/dev/null || true
  
  # Remove console.ninja references
  sed -i '' '/console\.ninja/d' "$file" 2>/dev/null || sed -i '/console\.ninja/d' "$file" 2>/dev/null || true
  
  # Remove oo_oo and oo_tx function calls
  # Replace oo_oo(...) with console.log(...)
  sed -i '' 's/oo_oo(/console.log(/g' "$file" 2>/dev/null || sed -i 's/oo_oo(/console.log(/g' "$file" 2>/dev/null || true
  sed -i '' 's/oo_tx(/console.log(/g' "$file" 2>/dev/null || sed -i 's/oo_tx(/console.log(/g' "$file" 2>/dev/null || true
  
  # Remove eslint-disable comments for console-ninja
  sed -i '' '/eslint-disable.*console-ninja/d' "$file" 2>/dev/null || sed -i '/eslint-disable.*console-ninja/d' "$file" 2>/dev/null || true
done

echo "✅ Console injection code removed!"

