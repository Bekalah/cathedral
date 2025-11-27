#!/bin/bash
# Continuous Improvement Logger
# Records every improvement made every 2.5 minutes

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_LOG.md"
DETAILED_LOG="$MONOREPO_ROOT/IMPROVEMENT_LOG_DETAILED.json"

# Initialize logs
if [ ! -f "$LOG_FILE" ]; then
  cat > "$LOG_FILE" << 'EOF'
# 🏛️ Continuous Improvement Log

**10-Hour Perfectionism Simulation - All Improvements Recorded**

Every 2.5 minutes: Doubt → Improvement → Tool → Recorded

---

EOF
fi

if [ ! -f "$DETAILED_LOG" ]; then
  echo '[]' > "$DETAILED_LOG"
fi

# Function to log improvement
log_improvement() {
  TIMESTAMP=$(date +%Y-%m-%d\ %H:%M:%S)
  UNIX_TIME=$(date +%s)
  CYCLE_NUMBER=$1
  DOUBT_AREA=$2
  DOUBT_QUESTION=$3
  IMPROVEMENT=$4
  TOOL_NAME=$5
  TOOL_PATH=$6
  QUALITY=$7
  
  # Add to markdown log
  cat >> "$LOG_FILE" << EOF
## Cycle $CYCLE_NUMBER - $TIMESTAMP

**Doubt Area**: $DOUBT_AREA  
**Question**: $DOUBT_QUESTION  
**Improvement**: $IMPROVEMENT  
**Tool Created**: \`$TOOL_NAME\`  
**Quality**: $QUALITY  
**Tool Path**: \`$TOOL_PATH\`

---

EOF

  # Add to JSON log
  node << EOF
    const fs = require('fs');
    const logPath = '$DETAILED_LOG';
    const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    
    logs.push({
      cycle: $CYCLE_NUMBER,
      timestamp: '$TIMESTAMP',
      unixTime: $UNIX_TIME,
      doubt: {
        area: '$DOUBT_AREA',
        question: '$DOUBT_QUESTION'
      },
      improvement: '$IMPROVEMENT',
      tool: {
        name: '$TOOL_NAME',
        path: '$TOOL_PATH',
        quality: '$QUALITY'
      }
    });
    
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
EOF

  echo "✅ Improvement logged: Cycle $CYCLE_NUMBER"
}

# Export function for use in other scripts
export -f log_improvement
export LOG_FILE
export DETAILED_LOG

