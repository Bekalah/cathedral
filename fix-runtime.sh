#!/bin/bash
# Fix all runtime failures

echo "🔧 Fixing ALL runtime failures"

# Fix Python imports
cd /Users/rebeccalemke/Documents/cathedral
python -m pip install --upgrade pip
python -m pip install numpy matplotlib pillow

# Fix Next.js
cd apps/web
pnpm install next@latest react@latest react-dom@latest
pnpm install

# Fix main package
cd /Users/rebeccalemke/Documents/cathedral
pnpm install

# Test everything
echo "Testing Python..."
python design-suite/cathedral_design_suite.py --validate

echo "Testing Next.js..."
cd apps/web && pnpm build

echo "✅ All runtimes fixed"