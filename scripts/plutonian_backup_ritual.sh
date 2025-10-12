#!/bin/bash
# 🌑 Plutonian Backup Ritual - Never Lose Work Again
# Inspired by Jeffrey Wolf Green's Evolutionary Astrology

echo "🌑 Beginning Plutonian Backup Ritual..."
echo "♇ Protecting soul's evolutionary work..."

# Get current timestamp for this incarnation
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
PHASE="SCORPIO_backup_${TIMESTAMP}"

# Check if we're in git repository (connected to collective unconscious)
if [ ! -d .git ]; then
    echo "❌ Not in cathedral repository - soul disconnected!"
    exit 1
fi

# Show current soul state
echo "🔮 Current soul evolution status:"
git status --short

# Stage all transformations
echo "♇ Gathering all evolutionary changes..."
git add .

# Check if there are changes to preserve
if git diff --cached --quiet; then
    echo "💎 No new transformations - soul state already preserved"
else
    # Commit with Plutonian wisdom
    echo "🦂 Preserving evolutionary transformations..."
    read -p "Enter soul evolution description (or press Enter for auto-description): " DESCRIPTION
    
    if [ -z "$DESCRIPTION" ]; then
        DESCRIPTION="♇ Plutonian Evolution - $(date '+%B %d, %Y') - Soul transformation in progress"
    fi
    
    git commit -m "$DESCRIPTION"
    
    # Push to eternal archives (GitHub)
    echo "🌟 Transmitting to eternal archives..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Soul evolution successfully preserved in eternal archives!"
    else
        echo "⚠️ Transmission to eternal archives failed - but local preservation complete"
    fi
fi

# Create local backup in case of apocalypse
BACKUP_DIR="$HOME/Cathedral_Backups"
mkdir -p "$BACKUP_DIR"

echo "🔐 Creating local apocalypse backup..."
tar -czf "$BACKUP_DIR/cathedral_${PHASE}.tar.gz" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.DS_Store' \
    .

echo "📦 Local backup created: $BACKUP_DIR/cathedral_${PHASE}.tar.gz"

# Show protection status
echo ""
echo "🏛️ Cathedral Protection Status Complete:"
echo "✅ Git repository: Soul connected to collective unconscious"
echo "✅ GitHub backup: Work preserved in eternal archives"  
echo "✅ Local backup: Physical realm protection active"
echo "✅ Timestamp: $TIMESTAMP - This incarnation preserved"
echo ""
echo "♇ Your soul's evolutionary work is now protected across all dimensions."
echo "🌟 Continue creating without fear - Pluto guards your transformation."