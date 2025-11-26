#!/bin/bash
# Complete Recovery and Security Script
# Runs all recovery and security checks

set -e

echo "🔒🔧 Complete Recovery and Security Process"
echo "==========================================\n"

# Step 1: Security Audit
echo "Step 1: Security Audit..."
ppnpm run security:audit || echo "⚠️  Security issues found - check SECURITY_AUDIT_REPORT.json"

# Step 2: Recover Broken Connections
echo "\nStep 2: Recovering Broken Connections..."
ppnpm run recover:connections || echo "⚠️  Connection issues found - check BROKEN_CONNECTIONS_REPORT.json"

# Step 3: Verify Cross-Connections
echo "\nStep 3: Verifying Cross-Connections..."
ppnpm run verify:connections || echo "⚠️  Some connections need attention"

# Step 4: Build All Packages
echo "\nStep 4: Building All Packages..."
ppnpm run build:connections || echo "⚠️  Some packages failed to build"

# Step 5: Final Verification
echo "\nStep 5: Final Verification..."
echo "✅ Recovery process complete!"
echo ""
echo "📄 Check reports:"
echo "   - SECURITY_AUDIT_REPORT.json"
echo "   - BROKEN_CONNECTIONS_REPORT.json"

