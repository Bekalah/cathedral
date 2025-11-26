#!/bin/bash
# Compact Improvement Logger - Every 2.5 minutes
# Research-focused, space-efficient, learns from patterns

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_RESEARCH_LOG.json"
CREATOR="Rebecca Respawn"

# Record improvement (ultra-compact format)
record() {
  C=$1  # cycle
  A=$2  # area
  I=$3  # improvement (short)
  T=$4  # tool (short)
  Q=$5  # quality
  
  node << EOF
    const fs = require('fs');
    const log = JSON.parse(fs.readFileSync('$LOG_FILE', 'utf8') || '[]');
    log.push({c:$C,t:Date.now(),a:'$A',i:'$I',tool:'$T',q:'$Q'});
    fs.writeFileSync('$LOG_FILE', JSON.stringify(log, null, 0));
EOF
}

# Learn from patterns (what areas need most work)
learn() {
  node << 'EOF'
    const fs = require('fs');
    const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
    if (log.length === 0) return;
    
    const areas = {};
    log.forEach(e => areas[e.a] = (areas[e.a] || 0) + 1);
    const top = Object.entries(areas).sort((a,b) => b[1] - a[1])[0];
    console.log(`Most improved: ${top[0]} (${top[1]}x)`);
EOF
  node -e "$(cat)" "$LOG_FILE"
}

export -f record
export -f learn
export CREATOR

