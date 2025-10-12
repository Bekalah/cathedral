#!/bin/bash
# 🦂 Scorpio File Organization Ritual
# Transform raw materials using Jeffrey Wolf Green's Evolutionary Astrology Codex

echo "🦂 Beginning Scorpio File Organization Ritual..."
echo "♇ Transforming raw materials into soul-centered wisdom..."

# Define the occult source directory
OCCULT_DIR="/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS"

# Create organized structure in cathedral
mkdir -p "SERPENT_source_materials"
mkdir -p "PHOENIX_transformed_content"  
mkdir -p "EAGLE_integrated_wisdom"
mkdir -p "SCORPIO_active_work"

echo "🌑 Analyzing current occult collection..."

# Function to categorize and rename files
organize_file() {
    local file="$1"
    local basename=$(basename "$file")
    local extension="${basename##*.}"
    local name="${basename%.*}"
    
    # Determine evolutionary stage based on content
    if [[ "$name" =~ [Gg]olden.*[Dd]awn ]]; then
        new_name="SERPENT_golden_dawn_complete_system_INSTINCT.${extension}"
        category="Golden Dawn - Core magical system"
    elif [[ "$name" =~ [Cc]rowley ]]; then
        new_name="SERPENT_crowley_collected_works_DESIRE.${extension}"
        category="Aleister Crowley - Will and desire teachings"
    elif [[ "$name" =~ [Rr]egardie ]]; then
        new_name="SERPENT_regardie_practical_kabbalah_TRANSCEND.${extension}"
        category="Israel Regardie - Practical wisdom"
    elif [[ "$name" =~ [Ss]kinner ]]; then
        new_name="SERPENT_skinner_historical_research_LIBERATE.${extension}"
        category="Stephen Skinner - Academic foundation"
    elif [[ "$name" =~ [Hh]yatt ]]; then
        new_name="SERPENT_hyatt_psychological_approach_CRISIS.${extension}"
        category="Christopher Hyatt - Psychological integration"
    elif [[ "$name" =~ occult.*grab.*bag ]]; then
        new_name="SERPENT_occult_collection_misc_INSTINCT.${extension}"
        category="Mixed occult materials - Raw source"
    else
        new_name="SERPENT_${name// /_}_INSTINCT.${extension}"
        category="Unclassified source material"
    fi
    
    echo "🔮 $category"
    echo "   Source: $basename"
    echo "   Codex:  $new_name"
    echo ""
}

echo "📚 Current Collection Analysis:"
echo "================================"

# Analyze Golden Dawn
if [ -f "$OCCULT_DIR/Complete_Golden_Dawn_System_Of_Magic.pdf" ]; then
    organize_file "$OCCULT_DIR/Complete_Golden_Dawn_System_Of_Magic.pdf"
fi

# Analyze Crowley collection
if [ -d "$OCCULT_DIR/CollectedPdfsByAleisterCrowley" ]; then
    echo "🌟 Found Crowley collection directory"
    organize_file "$OCCULT_DIR/CollectedPdfsByAleisterCrowley"
fi

# Analyze Regardie collection  
if [ -d "$OCCULT_DIR/israel-regardie-book-collection" ]; then
    echo "💎 Found Regardie collection directory"
    organize_file "$OCCULT_DIR/israel-regardie-book-collection"
fi

# Analyze Skinner collection
if [ -d "$OCCULT_DIR/stephen-skinner-book-collection" ]; then
    echo "📖 Found Skinner collection directory"
    organize_file "$OCCULT_DIR/stephen-skinner-book-collection"
fi

# Analyze occult grab bag
if [ -d "$OCCULT_DIR/occult-grab-bag-7_202304" ]; then
    echo "🎒 Found miscellaneous occult collection"
    organize_file "$OCCULT_DIR/occult-grab-bag-7_202304"
fi

echo "♇ EVOLUTIONARY ASTROLOGY FILE CODEX READY"
echo "==========================================="
echo ""
echo "🌑 SERPENT Phase (Raw Source Materials):"
echo "   - All original texts preserved with soul evolution markers"
echo "   - _INSTINCT: Pure creative source materials"
echo "   - _DESIRE: Emotional/will-based teachings" 
echo "   - _CRISIS: Challenge/breakthrough content"
echo "   - _TRANSCEND: Integrated wisdom materials"
echo "   - _LIBERATE: Teaching/sharing ready content"
echo ""
echo "🌒 Next Phases:"
echo "   SCORPIO_ - Active transformation (your current work)"
echo "   PHOENIX_ - Regenerated content (transformed materials)"  
echo "   EAGLE_ - Transcendent integration (synthesized wisdom)"
echo "   PLUTON_ - Core system files (foundational architecture)"
echo ""
echo "🔥 To actually rename files, uncomment the mv commands in this script"
echo "⚠️  Always backup before mass renaming!"
echo ""
echo "♇ Your soul's library is ready for evolutionary organization"