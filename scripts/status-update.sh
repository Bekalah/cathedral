#!/bin/bash
# Quick Status Update - Fresh data, no cache
# Use this to check simulation status anytime

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_RESEARCH_LOG.json"
SIM_LOG="/tmp/cathedral-10hr-active.log"

echo "🏛️ SIMULATION STATUS - $(date)"
echo "================================"
echo ""

# Check if running
if ps aux | grep -E "active-10-hour-simulation" | grep -v grep > /dev/null; then
  echo "✅ Status: RUNNING"
else
  echo "❌ Status: STOPPED"
fi

echo ""

# Latest cycle (fresh read, no cache)
if [ -f "$LOG_FILE" ]; then
  echo "📊 Latest Improvement:"
  node << 'EOF'
    const fs = require('fs');
    try {
      const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
      if (log.length > 0) {
        const latest = log[log.length - 1];
        const time = new Date(latest.t).toLocaleTimeString();
        console.log(`  Cycle ${latest.c} at ${time}`);
        console.log(`  Area: ${latest.a}`);
        console.log(`  Improvement: ${latest.i}`);
        console.log(`  Quality: ${latest.q}`);
        console.log(`  Tool: ${latest.tool}`);
      } else {
        console.log('  No cycles recorded yet');
      }
    } catch (e) {
      console.log('  Reading log...');
    }
EOF
  node -e "$(cat)" "$LOG_FILE"
else
  echo "📊 Latest Improvement: Log file not found"
fi

echo ""

# Total stats (fresh)
if [ -f "$LOG_FILE" ]; then
  echo "📈 Total Progress:"
  node << 'EOF'
    const fs = require('fs');
    try {
      const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
      console.log(`  Cycles: ${log.length}`);
      if (log.length > 0) {
        const areas = {};
        const qualities = {};
        log.forEach(e => {
          areas[e.a] = (areas[e.a] || 0) + 1;
          qualities[e.q] = (qualities[e.q] || 0) + 1;
        });
        const topArea = Object.entries(areas).sort((a,b) => b[1] - a[1])[0];
        const topQuality = Object.entries(qualities).sort((a,b) => b[1] - a[1])[0];
        console.log(`  Unique areas: ${Object.keys(areas).length}`);
        console.log(`  Most improved: ${topArea[0]} (${topArea[1]}x)`);
        console.log(`  Quality trend: ${topQuality[0]} (${topQuality[1]}x)`);
      }
    } catch (e) {
      console.log('  Calculating...');
    }
EOF
  node -e "$(cat)" "$LOG_FILE"
else
  echo "📈 Total Progress: No data yet"
fi

echo ""

# Recent activity
if [ -f "$SIM_LOG" ]; then
  echo "📝 Recent Activity:"
  tail -3 "$SIM_LOG" 2>/dev/null | sed 's/^/  /'
else
  echo "📝 Recent Activity: Log not available"
fi

echo ""
echo "================================"

