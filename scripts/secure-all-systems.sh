#!/bin/bash
# Secure All Systems
# Comprehensive security improvements

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔒 Securing All Systems"
echo "======================\n"

# 1. Remove all console injection
echo "1. Removing console injection..."
find packages apps -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" 2>/dev/null | while read -r file; do
  if grep -q "oo_oo\|oo_tx\|console-ninja" "$file" 2>/dev/null; then
    echo "  🔧 Fixing: $file"
    sed -i '' 's/oo_oo([^)]*)//g' "$file" 2>/dev/null || true
    sed -i '' 's/oo_tx([^)]*)//g' "$file" 2>/dev/null || true
    sed -i '' 's/console-ninja//g' "$file" 2>/dev/null || true
  fi
done

# 2. Secure .env files
echo "\n2. Securing environment files..."
find . -name ".env*" ! -name ".env.example" -type f | while read -r env_file; do
  if ! grep -q "^# SECURE" "$env_file" 2>/dev/null; then
    echo "  🔒 Securing: $env_file"
    # Add security header
    echo "# SECURE - Do not commit secrets" > "${env_file}.tmp"
    cat "$env_file" >> "${env_file}.tmp"
    mv "${env_file}.tmp" "$env_file"
  fi
done

# 3. Verify .gitignore
echo "\n3. Verifying .gitignore..."
GITIGNORE_ENTRIES=(
  ".env.local"
  ".env.development.local"
  ".env.test.local"
  ".env.production.local"
  "node_modules"
  "dist"
  "build"
  ".turbo"
)

for entry in "${GITIGNORE_ENTRIES[@]}"; do
  if ! grep -q "^${entry}" .gitignore 2>/dev/null; then
    echo "  📝 Adding: $entry to .gitignore"
    echo "$entry" >> .gitignore
  fi
done

# 4. Check for hardcoded secrets
echo "\n4. Checking for hardcoded secrets..."
if grep -r "api[_-]key.*=" --include="*.ts" --include="*.js" packages/ 2>/dev/null | grep -v "//" | head -3; then
  echo "  ⚠️  Potential API keys found - review manually"
else
  echo "  ✅ No obvious API keys found"
fi

echo "\n✅ Security improvements complete!"

