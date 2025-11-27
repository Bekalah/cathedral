#!/bin/bash
# 🔍 Cathedral Naming Audit Script

echo "🏷️ CATHEDRAL NAMING CONSISTENCY AUDIT"
echo "========================================"

# Check for legacy typos
echo "🔍 Checking for legacy 1499 typos..."
legacy_count=$(find . -name "*.md" -o -name "*.json" -o -name "*.js" | xargs grep -l "1499[^9]" 2>/dev/null | wc -l)
if [ $legacy_count -gt 0 ]; then
    echo "❌ Found $legacy_count files with legacy 1499 typo!"
    find . -name "*.md" -o -name "*.json" -o -name "*.js" | xargs grep -l "1499[^9]" 2>/dev/null
else
    echo "✅ No legacy 1499 typos found"
fi

echo ""
echo "🔍 Checking repository reference consistency..."

# Check for proper repository names in clone commands
clone_issues=$(grep -r "gh repo clone" . 2>/dev/null | grep -v "codex-14499\|liber-arcanae\|stone-grimoire\|circuitum99\|tesseract-bridge\|magical-mystery-house\|cosmogenesis-learning-engine" || true)
if [ -n "$clone_issues" ]; then
    echo "⚠️ Found potential repository naming issues:"
    echo "$clone_issues"
else
    echo "✅ Repository clone commands use correct names"
fi

echo ""
echo "🔍 Validating sacred mathematics format..."

# Check for proper 144:99 format
sacred_ratio_files=$(find . -name "*.json" -o -name "*.md" | xargs grep -l "144:99" 2>/dev/null | wc -l)
if [ $sacred_ratio_files -gt 0 ]; then
    echo "✅ Found proper 144:99 sacred ratio format in $sacred_ratio_files files"
else
    echo "⚠️ No 144:99 sacred ratio format found"
fi

echo ""
echo "🔍 Checking package directory consistency..."

# Verify packages exist and are referenced
if [ -d "packages" ]; then
    echo "✅ packages/ directory exists"
    for pkg in packages/*/; do
        pkg_name=$(basename "$pkg")
        ref_count=$(grep -r "packages/$pkg_name" . 2>/dev/null | wc -l)
        echo "  📦 $pkg_name: referenced $ref_count times"
    done
else
    echo "⚠️ packages/ directory not found"
fi

echo ""
echo "🔍 Summary of naming patterns found..."

echo "Repository patterns:"
grep -r "bekalah\|Bekalah" . 2>/dev/null | grep -o "[a-z-]*[0-9]*" | sort | uniq -c | sort -nr | head -10

echo ""
echo "✅ NAMING AUDIT COMPLETE"
echo "Check above for any ❌ or ⚠️ issues that need attention"