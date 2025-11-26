#!/bin/bash
# Restart 10-Hour Perfectionism Simulation
# Fixes deploys/runs first, then starts continuous improvement

set -e

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
cd "$MONOREPO_ROOT"

echo "🏛️ RESTARTING 10-HOUR PERFECTIONISM SIMULATION"
echo "================================================"
echo ""

# 1. Fix deploys and runs first
echo "Step 1: Fixing deploys and runs..."
bash scripts/fix-deploys-and-runs.sh

# 2. Start the simulation in background
echo ""
echo "Step 2: Starting 10-hour simulation..."
echo "  - Running in background"
echo "  - Logs: /tmp/cathedral-10hr-simulation.log"
echo "  - Status: scripts/status-update.sh"
echo ""

# Start simulation
nohup bash scripts/10-hour-perfectionism-simulation.sh > /tmp/cathedral-10hr-simulation.log 2>&1 &
SIMULATION_PID=$!

echo "  ✅ Simulation started (PID: $SIMULATION_PID)"
echo "  📝 PID saved to: /tmp/cathedral-10hr-simulation.pid"
echo "$SIMULATION_PID" > /tmp/cathedral-10hr-simulation.pid

echo ""
echo "✅ 10-HOUR SIMULATION RESTARTED"
echo "==============================="
echo ""
echo "Monitor with:"
echo "  tail -f /tmp/cathedral-10hr-simulation.log"
echo "  bash scripts/status-update.sh"
echo ""
echo "Stop with:"
echo "  kill \$(cat /tmp/cathedral-10hr-simulation.pid)"
echo ""

