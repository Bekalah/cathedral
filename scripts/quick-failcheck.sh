#!/bin/bash

# 🏛️ Cathedral Quick Failcheck
# One-command validation of all mystical datasets

echo "🏛️ CATHEDRAL DATASET FAILCHECK"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "data" ] || [ ! -d "integration" ]; then
    echo "❌ Error: Not in cathedral root directory"
    echo "   Please run this script from the cathedral-research directory"
    exit 1
fi

echo "🔮 Checking sacred mathematics (144:99)..."
pnpm run sacred-math-check

echo ""
echo "📊 Running comprehensive dataset validation..."
pnpm run validate-datasets

echo ""
echo "🎉 FAILCHECK COMPLETE!"
echo ""
echo "💡 Quick commands for monitoring:"
echo "   pnpm run dataset-dashboard    # Visual dashboard"
echo "   pnpm run ecosystem-health     # Full health check"
echo "   pnpm run check-integrity      # Quick validation"
echo ""
echo "🔍 Your Cathedral mystical system is ready!"
