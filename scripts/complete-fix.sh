#!/bin/bash
# Complete Fix Script
# Runs all fixes in order

set -e

echo "🔧🔒 Complete Fix Process"
echo "=======================\n"

# Step 1: Remove console injection
echo "Step 1: Removing console injection code..."
bash scripts/remove-console-injection.sh || echo "⚠️  Some files may need manual review"

# Step 2: Fix broken imports
echo "\nStep 2: Fixing broken imports..."
ppnpm run fix:imports || echo "⚠️  Some imports may need manual review"

# Step 3: Security audit
echo "\nStep 3: Running security audit..."
ppnpm run security:audit || echo "⚠️  Security issues found - check SECURITY_AUDIT_REPORT.json"

# Step 4: Recover connections
echo "\nStep 4: Recovering broken connections..."
ppnpm run recover:connections || echo "⚠️  Connection issues found - check BROKEN_CONNECTIONS_REPORT.json"

# Step 5: Verify connections
echo "\nStep 5: Verifying cross-connections..."
ppnpm run verify:connections || echo "⚠️  Some connections need attention"

# Step 6: Build all packages
echo "\nStep 6: Building all packages..."
ppnpm run build:connections || echo "⚠️  Some packages failed to build"

echo "\n✅ Complete fix process finished!"
echo ""
echo "📄 Check reports:"
echo "   - SECURITY_AUDIT_REPORT.json"
echo "   - BROKEN_CONNECTIONS_REPORT.json"
echo "   - IMPORT_FIXES_REPORT.json"

