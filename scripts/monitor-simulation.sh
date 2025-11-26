#!/bin/bash
# Monitor 10-Hour Simulation - Real-time updates, no cache
# Keeps user informed throughout entire experiment

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
LOG_FILE="$MONOREPO_ROOT/IMPROVEMENT_RESEARCH_LOG.json"
SIM_LOG="/tmp/cathedral-10hr-active.log"

# Get fresh status (no cache)
get_status() {
  # Check if simulation is running
  if ps aux | grep -E "active-10-hour-simulation" | grep -v grep > /dev/null; then
    echo "✅ RUNNING"
  else
    echo "❌ STOPPED"
  fi
}

# Get latest cycle from log (fresh read)
get_latest_cycle() {
  if [ -f "$LOG_FILE" ]; then
    node << 'EOF'
      const fs = require('fs');
      try {
        const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
        if (log.length > 0) {
          const latest = log[log.length - 1];
          console.log(`Cycle ${latest.c} | ${latest.a} → ${latest.i} (${latest.q})`);
        } else {
          console.log('No cycles yet');
        }
      } catch (e) {
        console.log('Reading log...');
      }
EOF
    node -e "$(cat)" "$LOG_FILE"
  else
    echo "Log file not found"
  fi
}

# Get progress stats (fresh)
get_stats() {
  if [ -f "$LOG_FILE" ]; then
    node << 'EOF'
      const fs = require('fs');
      try {
        const log = JSON.parse(fs.readFileSync(process.argv[2], 'utf8') || '[]');
        const areas = {};
        const qualities = {};
        log.forEach(e => {
          areas[e.a] = (areas[e.a] || 0]) + 1;
          qualities[e.q] = (qualities[e.q] || 0) + 1;
        });
        console.log(`Total: ${log.length} cycles`);
        console.log(`Areas: ${Object.keys(areas).length} unique`);
        console.log(`Top area: ${Object.entries(areas).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A'}`);
      } catch (e) {
        console.log('Calculating...');
      }
EOF
    node -e "$(cat)" "$LOG_FILE"
  fi
}

# Get recent log entries (last 5 lines, fresh)
get_recent_log() {
  if [ -f "$SIM_LOG" ]; then
    tail -5 "$SIM_LOG" 2>/dev/null || echo "No log entries yet"
  else
    echo "Log file not created yet"
  fi
}

# Main status report
report_status() {
  clear
  echo "🏛️ 10-HOUR PERFECTIONISM SIMULATION - LIVE STATUS"
  echo "=================================================="
  echo "Time: $(date)"
  echo ""
  echo "Status: $(get_status)"
  echo ""
  echo "📊 Latest Cycle:"
  get_latest_cycle
  echo ""
  echo "📈 Statistics:"
  get_stats
  echo ""
  echo "📝 Recent Activity:"
  get_recent_log
  echo ""
  echo "=================================================="
  echo "Next update in 30 seconds..."
  echo ""
}

# Continuous monitoring
while true; do
  report_status
  sleep 30  # Update every 30 seconds
done

