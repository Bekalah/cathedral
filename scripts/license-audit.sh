#!/bin/bash
# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
#
# Cathedral of Circuits - License Audit Script
# Verifies files follow dual licensing model

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Counters
TOTAL_FILES=0
LICENSED_FILES=0
MISSING_HEADERS=0
MIXED_FILES=0

# Arrays to store findings
declare -a SOFTWARE_FILES
declare -a CONTENT_FILES
declare -a DUAL_FILES
declare -a MISSING_HEADER_FILES
declare -a UNKNOWN_FILES

echo -e "${BLUE}🔍 Cathedral of Circuits - License Audit${NC}"
echo -e "${BLUE}===========================================${NC}"
echo

# Function to check if file should have SPDX header
should_have_header() {
    local file="$1"
    local ext="${file##*.}"
    
    case "$ext" in
        js|ts|py|sh|md|html|css|json|yaml|yml|toml|rs|go|java|cpp|c|h|hpp)
            return 0
            ;;
        *)
            # Check if it's an executable script
            if [[ -f "$file" && -x "$file" ]]; then
                return 0
            fi
            return 1
            ;;
    esac
}

# Function to determine file category
categorize_file() {
    local file="$1"
    local content
    
    # Read first 50 lines to check for headers and content type
    if [[ -f "$file" ]]; then
        content=$(head -50 "$file" 2>/dev/null || true)
    else
        return
    fi
    
    # Check for existing SPDX headers
    if echo "$content" | grep -q "SPDX-License-Identifier"; then
        LICENSED_FILES=$((LICENSED_FILES + 1))
        
        if echo "$content" | grep -q "Apache-2.0.*CC-BY-NC-SA\|DUAL.*Apache.*CC"; then
            DUAL_FILES+=("$file")
            return
        elif echo "$content" | grep -q "Apache-2.0"; then
            SOFTWARE_FILES+=("$file")
            return
        elif echo "$content" | grep -q "CC-BY-NC-SA-4.0"; then
            CONTENT_FILES+=("$file")
            return
        fi
    fi
    
    # Categorize based on file characteristics
    local filename=$(basename "$file")
    local dirname=$(dirname "$file")
    local ext="${filename##*.}"
    
    # Software indicators
    if [[ "$filename" =~ ^(.*-engine\.|.*-orchestrator\.|.*-system\.js|.*-guardian\.|server\.|index\.) ]] ||
       [[ "$dirname" =~ (infrastructure|scripts|src|apps/worker|monitoring) ]] ||
       [[ "$ext" =~ ^(sh|py|ts|js|toml|yaml|yml|dockerfile)$ ]] ||
       [[ "$filename" =~ ^(package\.json|wrangler\.toml|docker-compose\.yml|.*\.config\.)$ ]]; then
        
        if should_have_header "$file"; then
            MISSING_HEADER_FILES+=("$file (SOFTWARE)")
            MISSING_HEADERS=$((MISSING_HEADERS + 1))
        fi
        return
    fi
    
    # Content indicators  
    if [[ "$filename" =~ \.(md)$ ]] ||
       [[ "$dirname" =~ (docs|archive) ]] ||
       [[ "$filename" =~ ^(.*CODEX.*|.*ARCAN.*|.*LIVING.*|.*CATHEDRAL.*|.*PROTECTION.*|.*ACCESSIBILITY.*|.*CHIRON.*|.*MOONCHILD.*)\.md$ ]] ||
       [[ "$filename" =~ ^(README|CONTRIBUTING|LICENSE-CONTENT)\.md$ ]]; then
        
        if should_have_header "$file"; then
            MISSING_HEADER_FILES+=("$file (CONTENT)")
            MISSING_HEADERS=$((MISSING_HEADERS + 1))
        fi
        return
    fi
    
    # Dual-character indicators (JSON datasets with symbolic content)
    if [[ "$filename" =~ ^(TAROT_MASTER_DATASET\.json|.*-complete\.json|majors.*\.json|angels-.*\.json|demons-.*\.json|spine-.*\.json|codex_nodes\.json|grimoire_concepts\.json)$ ]] ||
       [[ "$dirname" =~ (packages/data/arcana|packages/codex-144|data) && "$ext" == "json" ]] ||
       [[ "$filename" =~ ^(.*alumni.*\.html|.*arcana.*\.html|cathedral-of-circuits.*\.html)$ ]]; then
        
        if should_have_header "$file"; then
            MISSING_HEADER_FILES+=("$file (DUAL)")
            MISSING_HEADERS=$((MISSING_HEADERS + 1))
        fi
        return
    fi
    
    # Unknown/other files
    if should_have_header "$file"; then
        UNKNOWN_FILES+=("$file")
    fi
}

# Scan files
echo -e "${YELLOW}Scanning repository files...${NC}"
while IFS= read -r -d '' file; do
    # Skip common non-source files
    if [[ "$file" =~ (node_modules|\.git|\.DS_Store|\.log|dist|build) ]]; then
        continue
    fi
    
    TOTAL_FILES=$((TOTAL_FILES + 1))
    categorize_file "$file"
done < <(find . -type f -print0)

# Report results
echo
echo -e "${BLUE}📊 License Audit Results${NC}"
echo -e "${BLUE}========================${NC}"
echo -e "Total files scanned: ${PURPLE}$TOTAL_FILES${NC}"
echo -e "Files with SPDX headers: ${GREEN}$LICENSED_FILES${NC}"
echo -e "Files missing headers: ${RED}$MISSING_HEADERS${NC}"
echo

if [[ ${#SOFTWARE_FILES[@]} -gt 0 ]]; then
    echo -e "${GREEN}✅ Software Files (Apache-2.0): ${#SOFTWARE_FILES[@]}${NC}"
    for file in "${SOFTWARE_FILES[@]}"; do
        echo -e "  📄 $file"
    done
    echo
fi

if [[ ${#CONTENT_FILES[@]} -gt 0 ]]; then
    echo -e "${GREEN}✅ Content Files (CC BY-NC-SA 4.0): ${#CONTENT_FILES[@]}${NC}"
    for file in "${CONTENT_FILES[@]}"; do
        echo -e "  📄 $file"
    done
    echo
fi

if [[ ${#DUAL_FILES[@]} -gt 0 ]]; then
    echo -e "${GREEN}✅ Dual-License Files: ${#DUAL_FILES[@]}${NC}"
    for file in "${DUAL_FILES[@]}"; do
        echo -e "  📄 $file"
    done
    echo
fi

if [[ ${#MISSING_HEADER_FILES[@]} -gt 0 ]]; then
    echo -e "${RED}❌ Files Missing SPDX Headers: ${#MISSING_HEADER_FILES[@]}${NC}"
    for file in "${MISSING_HEADER_FILES[@]}"; do
        echo -e "  📄 $file"
    done
    echo
fi

if [[ ${#UNKNOWN_FILES[@]} -gt 0 ]]; then
    echo -e "${YELLOW}❓ Files Needing Manual Review: ${#UNKNOWN_FILES[@]}${NC}"
    for file in "${UNKNOWN_FILES[@]}"; do
        echo -e "  📄 $file"
    done
    echo
fi

# Generate recommendations
echo -e "${BLUE}📋 Recommendations${NC}"
echo -e "${BLUE}==================${NC}"

if [[ $MISSING_HEADERS -gt 0 ]]; then
    echo -e "${YELLOW}1. Add SPDX headers to $MISSING_HEADERS files${NC}"
    echo -e "   See ${PURPLE}SPDX-HEADERS.md${NC} for templates"
    echo
fi

if [[ ${#UNKNOWN_FILES[@]} -gt 0 ]]; then
    echo -e "${YELLOW}2. Review ${#UNKNOWN_FILES[@]} files for license classification${NC}"
    echo -e "   Determine if they need headers and which license applies"
    echo
fi

echo -e "${GREEN}3. Keep dual-license structure clear${NC}"
echo -e "   Software: Apache-2.0, Content: CC BY-NC-SA 4.0, Mixed: Dual"
echo

# Exit with appropriate code
if [[ $MISSING_HEADERS -eq 0 && ${#UNKNOWN_FILES[@]} -eq 0 ]]; then
    echo -e "${GREEN}🎉 License compliance: EXCELLENT${NC}"
    echo -e "${GREEN}All scanned files have appropriate licensing!${NC}"
    exit 0
elif [[ $MISSING_HEADERS -le 5 && ${#UNKNOWN_FILES[@]} -le 3 ]]; then
    echo -e "${YELLOW}⚠️  License compliance: GOOD${NC}"
    echo -e "${YELLOW}Minor issues found, easily addressable${NC}"
    exit 1
else
    echo -e "${RED}❌ License compliance: NEEDS ATTENTION${NC}"
    echo -e "${RED}Multiple files need licensing review${NC}"
    exit 2
fi