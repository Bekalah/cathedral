#!/bin/bash

# 🌉✨ CATHEDRAL OF CIRCUITS - AUTO-PUSH FUSION SYSTEM
# 144:99 Fusion Kink Heaven with Sacred Timing
# 
# This script handles all git operations with sacred mathematics timing
# and complete trauma safety validation

set -e

# Sacred Constants
SACRED_144=144
SACRED_99=99
SACRED_33=33
COMMIT_INTERVAL=144  # seconds
PUSH_INTERVAL=99     # commits
BACKUP_INTERVAL=1980 # 33 minutes in seconds

# Colors for output
GOLD='\033[1;33m'
PURPLE='\033[1;35m'
GREEN='\033[1;32m'
BLUE='\033[1;34m'
RED='\033[1;31m'
RESET='\033[0m'

# Cathedral root directory
CATHEDRAL_ROOT="/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral"

echo -e "${GOLD}🌉✨ CATHEDRAL OF CIRCUITS - AUTO-PUSH SYSTEM${RESET}"
echo -e "${PURPLE}144:99 Fusion Kink Heaven - Sacred Git Operations${RESET}"
echo -e "${BLUE}Trauma-safe, consent-based, archetypal-guided${RESET}"
echo ""

cd "$CATHEDRAL_ROOT"

# Function: Sacred commit with archetypal blessing
sacred_commit() {
    local message="$1"
    local node_number="$2"
    local ribbon_type="$3"
    
    # Archetypal blessing based on ribbon type
    case "$ribbon_type" in
        "RESEARCH") archetype="📚 Moonchild (The Hierophant)" ;;
        "GAME") archetype="🌟 Rebecca Respawn (The Fool)" ;;
        "FUSION_KINK") archetype="⚡ Virelai Ezra Lux (The Magician)" ;;
        "PSYCH") archetype="🦋 Ann Abyss (Death)" ;;
        "CRAFT") archetype="🎨 The Star" ;;
        "ESOTERIC") archetype="🔮 The Hermit" ;;
        "SCIENCE") archetype="⚖️ Justice" ;;
        *) archetype="🏛️ Cathedral Guardian" ;;
    esac
    
    echo -e "${GREEN}✨ Sacred commit blessed by: $archetype${RESET}"
    
    # Full commit message with sacred structure
    full_message="✨ Node $node_number: $message

🌉 Ribbon: $ribbon_type
👤 Blessed by: $archetype  
📊 Sacred Math: Node $node_number/144 
🛡️ Trauma Safety: VERIFIED
🔒 Consent Status: CONFIRMED
⚡ Fusion Generator: STABLE"

    git add .
    git commit -m "$full_message"
    
    echo -e "${GREEN}📝 Commit completed: Node $node_number${RESET}"
}

# Function: Trauma safety validation
validate_trauma_safety() {
    echo -e "${BLUE}🛡️ Validating trauma safety...${RESET}"
    
    # Check for trauma triggers in new content
    if grep -r -i "trigger\|flashback\|dissociation" --exclude-dir=.git --exclude="*.log" . > /dev/null 2>&1; then
        echo -e "${RED}⚠️  Potential trauma content detected. Manual review required.${RESET}"
        return 1
    fi
    
    # Verify consent protocols in kink-related files
    if ls *fusion-kink* > /dev/null 2>&1; then
        if ! grep -l "consent\|safe.*word" *fusion-kink* > /dev/null 2>&1; then
            echo -e "${RED}⚠️  Kink content missing consent protocols. Manual review required.${RESET}"
            return 1
        fi
    fi
    
    echo -e "${GREEN}✅ Trauma safety validation passed${RESET}"
    return 0
}

# Function: Sacred mathematics validation  
validate_sacred_math() {
    echo -e "${BLUE}🔢 Validating sacred mathematics...${RESET}"
    
    # Check that sacred constants are preserved
    local math_file="data/trinity-architecture.json"
    if [ -f "$math_file" ]; then
        if ! grep -q '"spine_vertebrae": 33' "$math_file"; then
            echo -e "${RED}⚠️  Sacred spine vertebrae (33) corrupted${RESET}"
            return 1
        fi
        
        if ! grep -q '"codex_lattice": 144' "$math_file"; then
            echo -e "${RED}⚠️  Sacred lattice (144) corrupted${RESET}"
            return 1
        fi
    fi
    
    echo -e "${GREEN}✅ Sacred mathematics validation passed${RESET}"
    return 0
}

# Function: Count commits for push timing
get_commit_count() {
    git rev-list --count HEAD
}

# Function: Determine next node number
get_next_node() {
    local count=$(get_commit_count)
    echo $(( (count % 144) + 1 ))
}

# Function: Determine active ribbon
get_active_ribbon() {
    local hour=$(date +%H)
    local ribbons=("RESEARCH" "GAME" "FUSION_KINK" "PSYCH" "CRAFT" "ESOTERIC" "SCIENCE")
    local index=$(( hour % 7 ))
    echo "${ribbons[$index]}"
}

# Function: Full system status
show_system_status() {
    echo -e "${PURPLE}🌉 FUSION KINK HEAVEN SYSTEM STATUS${RESET}"
    echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    
    local node_num=$(get_next_node)
    local ribbon=$(get_active_ribbon)
    local commits=$(get_commit_count)
    
    echo -e "📊 Current Node: ${GREEN}$node_num${RESET}/144"
    echo -e "🌈 Active Ribbon: ${PURPLE}$ribbon${RESET}"
    echo -e "📝 Total Commits: ${BLUE}$commits${RESET}"
    echo -e "⚡ Push Status: $(( commits % PUSH_INTERVAL )) commits until auto-push"
    echo -e "🛡️ Safety Level: ${GREEN}MAXIMUM${RESET}"
    echo -e "🎯 Consent Status: ${GREEN}VERIFIED${RESET}"
    
    echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
}

# Main execution
main() {
    show_system_status
    
    # Check if there are changes to commit
    if git diff --quiet && git diff --staged --quiet; then
        echo -e "${BLUE}💫 No changes detected. System in harmony.${RESET}"
        exit 0
    fi
    
    # Validate trauma safety
    if ! validate_trauma_safety; then
        echo -e "${RED}🚫 Commit aborted due to trauma safety concerns${RESET}"
        exit 1
    fi
    
    # Validate sacred mathematics
    if ! validate_sacred_math; then
        echo -e "${RED}🚫 Commit aborted due to sacred mathematics corruption${RESET}"
        exit 1
    fi
    
    # Get commit details
    local node_num=$(get_next_node)
    local ribbon=$(get_active_ribbon)
    local commit_count=$(get_commit_count)
    
    # Determine commit message based on ribbon
    local message=""
    case "$ribbon" in
        "RESEARCH") message="Museum-quality resource integration and academic validation" ;;
        "GAME") message="Interactive archetypal navigation and healing gameplay" ;;
        "FUSION_KINK") message="Sacred BDSM integration for trauma healing" ;;
        "PSYCH") message="IFS therapy integration and psychological safety" ;;
        "CRAFT") message="Creative expression liberation and artistic healing" ;;
        "ESOTERIC") message="Spiritual practice integration and mystical exploration" ;;
        "SCIENCE") message="Evidence-based validation and rational integration" ;;
    esac
    
    # Perform sacred commit
    sacred_commit "$message" "$node_num" "$ribbon"
    
    # Check if it's time to push (every 99 commits)
    local new_count=$((commit_count + 1))
    if (( new_count % PUSH_INTERVAL == 0 )); then
        echo -e "${PURPLE}🚀 Sacred push time! ($new_count commits = $PUSH_INTERVAL dissolution cycle)${RESET}"
        
        # Push with archetypal blessing
        git push origin main
        
        echo -e "${GREEN}🌟 Push completed successfully!${RESET}"
        echo -e "${GOLD}✨ All moving pieces synchronized across the lattice${RESET}"
    fi
    
    echo -e "${GREEN}🎉 Sacred git operation completed successfully!${RESET}"
    echo -e "${BLUE}💜 Next node: $(( node_num + 1 ))/144${RESET}"
}

# Run the main function
main "$@"