#!/bin/bash
# Secure Build - No secrets in build output

set -e

echo "🔒 Secure Build"
echo "==============="

# Remove any .env files from build
find . -name ".env" -not -name ".env.example" -delete 2>/dev/null || true

# Build with no secrets
NODE_ENV=production pnpm build

# Verify no secrets in build output
echo "Verifying build security..."
if grep -r "password\|api[_-]key\|secret\|token" apps/*/dist --exclude="*.map" 2>/dev/null | grep -v "example\|test"; then
  echo "⚠️  Potential secrets in build output"
else
  echo "✅ Build output is secure"
fi
