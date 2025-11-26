#!/bin/bash
# Compact Improvement Recorder - Every 2.5 minutes
# Research-focused, space-efficient logging

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_RESEARCH_LOG.json"

# Record improvement (compact format)
record_improvement() {
  CYCLE=$1
  AREA=$2
  IMPROVEMENT=$3
  TOOL=$4
  QUALITY=$5
  
  node << EOF
    const fs = require('fs');
    const log = JSON.parse(fs.readFileSync('$LOG_FILE', 'utf8') || '[]');
    
    log.push({
      c: $CYCLE,                    // cycle number
      t: Date.now(),                // timestamp (unix ms)
      a: '$AREA',                   // area
      i: '$IMPROVEMENT',            // improvement
      tool: '$TOOL',                // tool name
      q: '$QUALITY'                 // quality
    });
    
    fs.writeFileSync('$LOG_FILE', JSON.stringify(log, null, 0));
EOF
}

# Analyze patterns (for learning)
analyze_patterns() {
  node << 'EOF'
    const fs = require('fs');
    const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
    
    // Count by area
    const areas = {};
    const qualities = {};
    const tools = [];
    
    log.forEach(entry => {
      areas[entry.a] = (areas[entry.a] || 0) + 1;
      qualities[entry.q] = (qualities[entry.q] || 0) + 1;
      tools.push(entry.tool);
    });
    
    console.log('📊 Improvement Patterns:');
    console.log('Areas:', Object.entries(areas).sort((a,b) => b[1] - a[1]).slice(0,5));
    console.log('Qualities:', qualities);
    console.log('Total tools:', tools.length);
    console.log('Unique tools:', new Set(tools).size);
EOF
  node -e "$(cat)" "$LOG_FILE"
}

export -f record_improvement
export -f analyze_patterns

