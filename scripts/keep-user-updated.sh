#!/bin/bash
# Keep User Updated - Periodic status reports
# Runs every 2.5 minutes to match improvement cycles

MONOREPO_ROOT="/Users/rebeccalemke/cathedral-fixed-clean"
STATUS_SCRIPT="$MONOREPO_ROOT/scripts/status-update.sh"

echo "📡 Starting status update service..."
echo "Updates every 2.5 minutes (matching improvement cycles)"
echo ""

while true; do
  # Run status update (fresh data, no cache)
  bash "$STATUS_SCRIPT"
  
  echo ""
  echo "⏰ Next update in 2.5 minutes..."
  echo ""
  
  sleep 150  # 2.5 minutes = 150 seconds
done

