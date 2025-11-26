#!/bin/bash
# MASTER V1 MERGE SCRIPT
# Merges all cathedral repos into cathedral-fixed-clean

set -e

TARGET="/Users/rebeccalemke/cathedral-fixed-clean"
REAL="/Users/rebeccalemke/cathedral-real"
CONSOLIDATED="/Users/rebeccalemke/cathedral-v1-consolidated/cathedral-master"

echo "🏛️ MASTER V1 MERGE - Consolidating All Repos"
echo "=============================================="
echo ""

# 1. Copy pnpm-lock.yaml from cathedral-real
echo "📦 Step 1: Copying pnpm-lock.yaml..."
if [ -f "$REAL/pnpm-lock.yaml" ]; then
    cp "$REAL/pnpm-lock.yaml" "$TARGET/"
    echo "   ✅ Copied pnpm-lock.yaml"
fi

# 2. Copy missing packages from cathedral-real (excluding node_modules)
echo ""
echo "📦 Step 2: Copying missing packages from cathedral-real..."
MISSING_PACKAGES=$(comm -23 <(ls "$REAL/packages/" | sort) <(ls "$TARGET/packages/" | sort))
COUNT=0
for pkg in $MISSING_PACKAGES; do
    if [ -d "$REAL/packages/$pkg" ]; then
        echo "   Copying: $pkg"
        mkdir -p "$TARGET/packages/$pkg"
        # Copy everything except node_modules
        rsync -a --exclude='node_modules' --exclude='.turbo' "$REAL/packages/$pkg/" "$TARGET/packages/$pkg/" 2>/dev/null || \
        find "$REAL/packages/$pkg" -maxdepth 1 -not -name "node_modules" -not -name ".turbo" -exec cp -r {} "$TARGET/packages/$pkg/" \; 2>/dev/null || true
        COUNT=$((COUNT + 1))
    fi
done
echo "   ✅ Copied $COUNT packages"

# 3. Copy missing apps from cathedral-real (excluding node_modules)
echo ""
echo "📱 Step 3: Copying missing apps from cathedral-real..."
MISSING_APPS=$(comm -23 <(ls "$REAL/apps/" 2>/dev/null | grep -v node_modules | grep -v dist | sort) <(ls "$TARGET/apps/" 2>/dev/null | sort) 2>/dev/null || echo "")
COUNT=0
for app in $MISSING_APPS; do
    if [ -d "$REAL/apps/$app" ] && [ "$app" != "node_modules" ] && [ "$app" != "dist" ]; then
        echo "   Copying: $app"
        mkdir -p "$TARGET/apps/$app"
        rsync -a --exclude='node_modules' --exclude='.turbo' --exclude='dist' "$REAL/apps/$app/" "$TARGET/apps/$app/" 2>/dev/null || true
        COUNT=$((COUNT + 1))
    fi
done
echo "   ✅ Copied $COUNT apps"

# 4. Merge data from cathedral-v1-consolidated
echo ""
echo "📊 Step 4: Merging data from cathedral-v1-consolidated..."
if [ -d "$CONSOLIDATED/data" ]; then
    mkdir -p "$TARGET/data"
    # Only copy files that don't exist or are larger
    for file in "$CONSOLIDATED/data"/*.json; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            target_file="$TARGET/data/$filename"
            if [ ! -f "$target_file" ]; then
                cp "$file" "$target_file"
                echo "   New: $filename"
            elif [ $(stat -f%z "$file") -gt $(stat -f%z "$target_file" 2>/dev/null || echo 0) ]; then
                cp "$file" "$target_file"
                echo "   Updated (larger): $filename"
            fi
        fi
    done
fi

# 5. Copy codex-144 data folder
echo ""
echo "📊 Step 5: Copying codex-144 data..."
if [ -d "$CONSOLIDATED/data/codex-144" ]; then
    mkdir -p "$TARGET/data/codex-144"
    cp -r "$CONSOLIDATED/data/codex-144"/* "$TARGET/data/codex-144/" 2>/dev/null || true
    echo "   ✅ Copied codex-144 data"
fi

# 6. Copy palettes data
echo ""
echo "🎨 Step 6: Copying palettes data..."
if [ -d "$CONSOLIDATED/data/palettes" ]; then
    mkdir -p "$TARGET/data/palettes"
    cp -r "$CONSOLIDATED/data/palettes"/* "$TARGET/data/palettes/" 2>/dev/null || true
    echo "   ✅ Copied palettes"
fi

# 7. Copy ingest data
echo ""
echo "📥 Step 7: Copying ingest data..."
if [ -d "$CONSOLIDATED/data/ingest" ]; then
    mkdir -p "$TARGET/data/ingest"
    cp -r "$CONSOLIDATED/data/ingest"/* "$TARGET/data/ingest/" 2>/dev/null || true
    echo "   ✅ Copied ingest data"
fi

# 8. Update pnpm-workspace.yaml to include all packages
echo ""
echo "⚙️ Step 8: Updating pnpm-workspace.yaml..."
cat > "$TARGET/pnpm-workspace.yaml" << 'EOF'
packages:
  - 'packages/*'
  - 'apps/*'
  - 'rust-engines/*'
EOF
echo "   ✅ Updated workspace config"

# 9. Summary
echo ""
echo "=============================================="
echo "🏛️ MERGE COMPLETE!"
echo ""
echo "Packages: $(ls -d "$TARGET/packages"/*/ 2>/dev/null | wc -l | tr -d ' ')"
echo "Apps: $(ls -d "$TARGET/apps"/*/ 2>/dev/null | wc -l | tr -d ' ')"
echo "Data files: $(find "$TARGET/data" -name "*.json" 2>/dev/null | wc -l | tr -d ' ')"
echo ""
echo "Next: Run 'pnpm install' to install dependencies"
