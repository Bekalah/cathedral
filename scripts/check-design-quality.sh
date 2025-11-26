#!/bin/bash
# =====================================================
# DESIGN QUALITY BOUNDARY ENFORCEMENT
# 
# This script MUST run on every commit.
# If violations are found, the commit is BLOCKED.
# =====================================================

set -e

echo "🔍 Checking design quality boundary..."

VIOLATIONS=0

# Check for emoji in UI components
echo "  Checking for emoji in UI..."
if grep -rn "🎮\|⚗️\|🃏\|🎵\|🎨\|📊\|🛡️\|✨\|🚨\|❤️\|🌟\|🥚\|🔷" \
  --include="*.tsx" --include="*.jsx" \
  apps/ packages/ 2>/dev/null | grep -v "\.md\|comment\|console" | head -5; then
  echo "  ❌ VIOLATION: Emoji found in UI components"
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "  ✅ No emoji violations"
fi

# Check for pill buttons (border-radius > 15px on buttons)
echo "  Checking for pill buttons..."
if grep -rn "border-radius:\s*\(2[0-9]\|3[0-9]\|4[0-9]\)px" \
  --include="*.css" --include="*.scss" \
  apps/ packages/ 2>/dev/null | head -5; then
  echo "  ⚠️ WARNING: Large border-radius found (possible pill buttons)"
fi

# Check for cartoon gradients (multi-color)
echo "  Checking for cartoon gradients..."
if grep -rn "linear-gradient.*#[A-Fa-f0-9]\{6\}.*#[A-Fa-f0-9]\{6\}" \
  --include="*.css" --include="*.scss" \
  apps/ packages/ 2>/dev/null | grep -v "rgba\|var(" | head -5; then
  echo "  ⚠️ WARNING: Multi-color gradients found (possible cartoon style)"
fi

# Check for ALL CAPS text transforms
echo "  Checking for screaming text..."
CAPS_COUNT=$(grep -rn "text-transform:\s*uppercase" \
  --include="*.css" --include="*.scss" \
  apps/ packages/ 2>/dev/null | wc -l)
if [ "$CAPS_COUNT" -gt 5 ]; then
  echo "  ⚠️ WARNING: Many uppercase transforms found ($CAPS_COUNT instances)"
fi

# Check for console injection
echo "  Checking for console injection spam..."
if grep -rn "console\.log\.\.\.\|oo_cm\|oo_tr\|2184609590" \
  --include="*.ts" --include="*.tsx" --include="*.js" \
  apps/ packages/ 2>/dev/null | head -5; then
  echo "  ❌ VIOLATION: Console injection spam found"
  VIOLATIONS=$((VIOLATIONS + 1))
fi

# Check for generic game UI patterns
echo "  Checking for generic game UI patterns..."
if grep -rn "primary-button\|secondary-button\|accent-button" \
  --include="*.tsx" --include="*.jsx" \
  apps/web/src/components/ 2>/dev/null | grep -v "CathedralRPG\|CathedralExperience" | head -5; then
  echo "  ⚠️ WARNING: Generic button patterns found"
fi

echo ""
if [ $VIOLATIONS -gt 0 ]; then
  echo "❌ DESIGN QUALITY BOUNDARY VIOLATED ($VIOLATIONS critical violations)"
  echo ""
  echo "Read openspec/DESIGN_QUALITY_BOUNDARY.md before continuing."
  echo "This commit would be BLOCKED in CI."
  exit 1
else
  echo "✅ Design quality boundary maintained"
  echo "   The cathedral remains beautiful."
fi

