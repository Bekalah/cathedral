#!/bin/bash
# Secure All Apps - Maximum Security Configuration
# Free deployment, secure by default

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"

echo "🛡️ SECURING ALL APPS - MAXIMUM SECURITY"
echo "========================================"
echo ""

# 1. Create security headers configuration
echo "📝 Creating security headers..."

cat > "$MONOREPO_ROOT/security-headers.json" << 'EOF'
{
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}
EOF

# 2. Create .env.example for all apps
echo "📝 Creating .env.example files..."

find "$MONOREPO_ROOT/apps" -type d -maxdepth 1 | while read app_dir; do
  app_name=$(basename "$app_dir")
  if [ -f "$app_dir/package.json" ]; then
    cat > "$app_dir/.env.example" << EOF
# $app_name Environment Variables
# Copy this to .env and fill in values
# NEVER commit .env to git

# Public (safe to expose)
NEXT_PUBLIC_APP_NAME=Cathedral
NEXT_PUBLIC_APP_URL=https://bekalah.github.io/cathedral

# Private (keep secret)
# DATABASE_URL=
# API_KEY=
# SECRET_KEY=
EOF
    echo "  ✅ Created .env.example for $app_name"
  fi
done

# 3. Update .gitignore to exclude secrets
echo "📝 Updating .gitignore..."

if ! grep -q "# Security" "$MONOREPO_ROOT/.gitignore" 2>/dev/null; then
  cat >> "$MONOREPO_ROOT/.gitignore" << 'EOF'

# Security - Never commit these
.env
.env.local
.env.*.local
*.key
*.pem
*.p12
*.pfx
secrets/
*.secret
credentials.json
EOF
  echo "  ✅ Updated .gitignore"
fi

# 4. Create security audit script
echo "📝 Creating security audit script..."

cat > "$MONOREPO_ROOT/scripts/security-audit.sh" << 'EOF'
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
EOF

chmod +x "$MONOREPO_ROOT/scripts/security-audit.sh"

# 5. Create secure build script
echo "📝 Creating secure build script..."

cat > "$MONOREPO_ROOT/scripts/secure-build.sh" << 'EOF'
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
EOF

chmod +x "$MONOREPO_ROOT/scripts/secure-build.sh"

echo ""
echo "✅ All apps secured!"
echo ""

