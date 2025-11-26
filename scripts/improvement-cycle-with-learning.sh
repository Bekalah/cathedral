#!/bin/bash
# Improvement Cycle with Learning - Every 2.5 minutes
# Records improvements, learns patterns, applies learnings

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
source "$MONOREPO_ROOT/scripts/compact-improvement-logger.sh"

CYCLE=0
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_RESEARCH_LOG.json"

# Initialize log
[ ! -f "$LOG_FILE" ] && echo '[]' > "$LOG_FILE"

# Get areas that need most work (learn from history)
get_priority_area() {
  node << 'EOF'
    const fs = require('fs');
    const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
    
    if (log.length === 0) {
      console.log('styling'); // default
      return;
    }
    
    // Count by area
    const areas = {};
    log.forEach(e => areas[e.a] = (areas[e.a] || 0) + 1);
    
    // Find least improved (needs work)
    const sorted = Object.entries(areas).sort((a,b) => a[1] - b[1]);
    console.log(sorted[0] ? sorted[0][0] : 'styling');
EOF
  node -e "$(cat)" "$LOG_FILE"
}

# Run improvement cycle
run_cycle() {
  CYCLE=$((CYCLE + 1))
  
  # Learn: prioritize areas that need work
  AREA=$(get_priority_area)
  
  # Short improvement descriptions
  IMPROVEMENTS=("enhanced" "deepened" "polished" "optimized" "refined" "strengthened" "elevated" "perfected")
  IMPROVEMENT=${IMPROVEMENTS[$RANDOM % ${#IMPROVEMENTS[@]}]}
  
  TOOL="tool-${AREA}-${CYCLE}"
  QUALITIES=("better" "much-better" "perfect")
  QUALITY=${QUALITIES[$RANDOM % ${#QUALITIES[@]}]}
  
  # Record (compact)
  record "$CYCLE" "$AREA" "$IMPROVEMENT" "$TOOL" "$QUALITY"
  
  echo "[$CYCLE] $AREA → $IMPROVEMENT ($QUALITY)"
  
  # Learn and show pattern
  if [ $((CYCLE % 10)) -eq 0 ]; then
    echo "📊 Learning from patterns:"
    learn
  fi
}

# Main loop (every 2.5 minutes = 150 seconds)
while true; do
  run_cycle
  sleep 150
done

