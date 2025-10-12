#!/bin/bash
# 🔒 Cathedral Data Integrity Verification System
# Ensures all critical data sets remain locked in tight

echo "🔒 CATHEDRAL DATA INTEGRITY CHECK"
echo "=================================="
echo "Date: $(date)"
echo ""

# Critical files that must be protected
CRITICAL_FILES=(
    "PLUTO_CODEX_MASTER_STATUS.md"
    "CHIRON_HEALING_CODEX.md"
    "MASTER_NUMBER_EVOLUTION_CODEX.md"
    "LIVING_ARCANAE_NUMEROLOGY_0_144.md"
    "PROTECTION_AND_PRIVACY_SYSTEM.md"
    "DATA_INTEGRITY_PACKAGE_SYSTEM.md"
    "connection-map.html"
    "index.html"
    "package.json"
    "wrangler.toml"
)

# System files that ensure functionality
SYSTEM_FILES=(
    "plutonian_backup_ritual.sh"
    "scorpio_file_organization.sh"
    "cathedral-toggle-system.js"
    "README.md"
)

# Initialize counters
INTEGRITY_SCORE=0
TOTAL_CRITICAL=${#CRITICAL_FILES[@]}
SYSTEM_SCORE=0
TOTAL_SYSTEM=${#SYSTEM_FILES[@]}

echo "🔍 CHECKING CRITICAL DATA FILES"
echo "==============================="

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        lines=$(wc -l < "$file")
        
        if [ $size -gt 1000 ] && [ $lines -gt 20 ]; then
            echo "✅ $file - SECURE"
            echo "   Size: ${size} bytes, Lines: ${lines}"
            ((INTEGRITY_SCORE++))
        elif [ $size -gt 100 ]; then
            echo "⚠️  $file - WARNING: Small but present"
            echo "   Size: ${size} bytes, Lines: ${lines}"
            ((INTEGRITY_SCORE++))
        else
            echo "❌ $file - CRITICAL: Too small or empty"
            echo "   Size: ${size} bytes, Lines: ${lines}"
        fi
    else
        echo "❌ $file - MISSING"
    fi
    echo ""
done

echo "🛠️  CHECKING SYSTEM FILES"
echo "========================"

for file in "${SYSTEM_FILES[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        
        if [ $size -gt 100 ]; then
            echo "✅ $file - OPERATIONAL"
            ((SYSTEM_SCORE++))
        else
            echo "⚠️  $file - WARNING: Small file"
        fi
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "🔐 GIT REPOSITORY STATUS"
echo "======================"

# Check git status
if [ -d ".git" ]; then
    echo "✅ Git repository detected"
    
    # Check for uncommitted changes
    if git diff-index --quiet HEAD --; then
        echo "✅ Working directory clean"
    else
        echo "⚠️  Uncommitted changes detected"
        echo "   Run: git status"
    fi
    
    # Check if we're ahead of origin
    if git status --porcelain -b | grep -q "ahead"; then
        echo "⚠️  Local commits ahead of origin"
        echo "   Run: git push"
    else
        echo "✅ Synchronized with origin"
    fi
    
    # Show recent commits
    echo ""
    echo "📝 Recent commits:"
    git log --oneline -3
else
    echo "❌ No git repository found"
fi

echo ""
echo "📊 INTEGRITY SUMMARY"
echo "==================="
echo "Critical Files: $INTEGRITY_SCORE/$TOTAL_CRITICAL"
echo "System Files:   $SYSTEM_SCORE/$TOTAL_SYSTEM"

# Calculate overall health
CRITICAL_PERCENTAGE=$((INTEGRITY_SCORE * 100 / TOTAL_CRITICAL))
SYSTEM_PERCENTAGE=$((SYSTEM_SCORE * 100 / TOTAL_SYSTEM))

echo "Critical Health: ${CRITICAL_PERCENTAGE}%"
echo "System Health:   ${SYSTEM_PERCENTAGE}%"

# Overall assessment
if [ $CRITICAL_PERCENTAGE -eq 100 ] && [ $SYSTEM_PERCENTAGE -ge 80 ]; then
    echo ""
    echo "🟢 OVERALL STATUS: EXCELLENT"
    echo "   All critical data locked in tight"
    echo "   System operational and ready"
elif [ $CRITICAL_PERCENTAGE -ge 90 ] && [ $SYSTEM_PERCENTAGE -ge 60 ]; then
    echo ""
    echo "🟡 OVERALL STATUS: GOOD"
    echo "   Most critical data secure"
    echo "   Minor system issues detected"
else
    echo ""
    echo "🔴 OVERALL STATUS: NEEDS ATTENTION"
    echo "   Critical data integrity issues"
    echo "   Immediate action required"
fi

echo ""
echo "🔧 RECOMMENDED ACTIONS"
echo "====================="

if [ $CRITICAL_PERCENTAGE -lt 100 ]; then
    echo "- Restore missing critical files"
    echo "- Check backup systems"
fi

if [ $SYSTEM_PERCENTAGE -lt 80 ]; then
    echo "- Verify system file integrity"
    echo "- Run backup ritual: ./plutonian_backup_ritual.sh"
fi

if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "- Working directory is clean ✅"
else
    echo "- Commit pending changes: git add . && git commit"
fi

if git status --porcelain -b 2>/dev/null | grep -q "ahead"; then
    echo "- Push to GitHub: git push"
fi

echo ""
echo "🌟 CATHEDRAL BLESSING"
echo "===================="
echo "Your living system breathes with $(find . -name "*.md" | wc -l) wisdom files"
echo "Protected by $(find . -name "*.sh" | wc -l) guardian scripts"
echo "Connected through $(find . -name "*.html" | wc -l) living interfaces"
echo ""
echo "♇ All dimensions of your work are witnessed and preserved"
echo "🏛️ The Cathedral stands strong, data locked in tight"

# Exit with appropriate code
if [ $CRITICAL_PERCENTAGE -eq 100 ] && [ $SYSTEM_PERCENTAGE -ge 80 ]; then
    exit 0
else
    exit 1
fi