#!/bin/bash
# Security Audit - Check for exposed secrets

echo "🔍 Security Audit"
echo "================="

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
if grep -r "password.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.log" | grep -v "example\|test\|TODO"; then
  echo "⚠️  Potential hardcoded passwords found"
fi

# Check for API keys
if grep -r "api[_-]key.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.log" | grep -v "example\|test\|TODO\|NEXT_PUBLIC"; then
  echo "⚠️  Potential API keys found"
fi

# Check for .env files in git
if git ls-files | grep -E "\.env$|\.env\." | grep -v ".example"; then
  echo "❌ .env files found in git (should be gitignored)"
else
  echo "✅ No .env files in git"
fi

# Check for exposed tokens
if grep -r "token.*=" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.log" | grep -v "example\|test\|TODO\|NEXT_PUBLIC"; then
  echo "⚠️  Potential tokens found"
fi

echo "✅ Security audit complete"
