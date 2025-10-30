#!/bin/bash
# Cathedral Art Generation - Use Azure AI agents for art prompts
# Then generate with DALL-E 3

set -e

echo "🎨 GENERATING ART PROMPTS FOR 22 ARCANA"
echo "========================================"
echo ""

# Check if we have Azure AI CLI or Python SDK
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Install: brew install azure-cli"
    exit 1
fi

# Login check
az account show &> /dev/null || {
    echo "❌ Not logged into Azure. Run: az login"
    exit 1
}

SUBSCRIPTION="88235353-b821-4046-9457-89f70c3d8e9e"
ENDPOINT="https://cathedral-resource.services.ai.azure.com"
AGENT_KAOZ="asst_72uzK1Yt2hsu2qVyt22NkMiO"

echo "Using Agent of KAOZ for art prompt generation..."
echo ""

# Create art prompts directory
mkdir -p generated-art/prompts
mkdir -p generated-art/images

# 22 Arcana list
ARCANA=(
    "The Fool (Rebecca Respawn)"
    "The Magician (Virelai Ezra Lux)"
    "The High Priestess"
    "The Empress"
    "The Emperor"
    "The Hierophant"
    "The Lovers"
    "The Chariot"
    "Strength"
    "The Hermit"
    "Wheel of Fortune"
    "Justice"
    "The Hanged Man"
    "Death"
    "Temperance"
    "The Devil"
    "The Tower"
    "The Star"
    "The Moon"
    "The Sun"
    "Judgement"
    "The World"
)

# Generate prompts for each Arcana
for i in "${!ARCANA[@]}"; do
    CARD="${ARCANA[$i]}"
    NUMBER=$((i))
    
    echo "[$((i+1))/22] Generating prompt for: $CARD"
    
    # Create prompt request
    PROMPT="Generate museum-quality art prompt for Tarot card: $CARD

Requirements:
- Divine aspect (angelic/celestial figure)
- Infernal aspect (elegant demon/shadow figure)  
- Golden heart sacred geometry connecting them
- Renaissance/baroque painting style
- Chiaroscuro lighting mastery
- Perfect bilateral symmetry
- Vesica piscis and golden ratio
- Art Nouveau ornamental elements
- Oil painting texture
- Warm gold to dark gradient background

Format as: [Divine description] | [Infernal description] | [Center geometry] | [Style notes]"

    # Save prompt for manual review
    FILENAME="generated-art/prompts/$(printf "%02d" $NUMBER)-${CARD// /-}.txt"
    echo "$PROMPT" > "$FILENAME"
    
    echo "  ✓ Prompt saved: $FILENAME"
done

echo ""
echo "✅ All 22 art prompts generated!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Review prompts in: generated-art/prompts/"
echo "2. Use Agent of KAOZ to refine prompts"
echo "3. Generate images with DALL-E 3:"
echo "   az cognitiveservices account show --name [your-dalle-resource]"
echo ""
echo "💡 TIP: Use remaining \$200 credits to generate all images"
echo ""
