#!/bin/bash

# CATHEDRAL AUTOMATED UPDATE SETUP
# Sets up automated updates and maintenance for the Cathedral system

set -e

echo "🏛️ CATHEDRAL AUTOMATED UPDATE SETUP"
echo "===================================="

CATHEDRAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CRON_DIR="$CATHEDRAL_DIR/tools/cron"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Create cron directory
mkdir -p "$CRON_DIR"

# Create daily update script
cat > "$CRON_DIR/daily-update.sh" << 'EOF'
#!/bin/bash

# Daily Cathedral Update
# Runs daily maintenance and updates

CATHEDRAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOG_FILE="$CATHEDRAL_DIR/update-daily.log"

echo "[$(date)] Starting daily Cathedral update..." >> "$LOG_FILE"

# Check if we're in the right directory
if [ ! -f "$CATHEDRAL_DIR/package.json" ]; then
    echo "[$(date)] ERROR: Not in Cathedral directory" >> "$LOG_FILE"
    exit 1
fi

cd "$CATHEDRAL_DIR"

# Update dependencies
echo "[$(date)] Updating dependencies..." >> "$LOG_FILE"
pnpm install >> "$LOG_FILE" 2>&1

# Run health check
echo "[$(date)] Running health check..." >> "$LOG_FILE"
node tools/cathedral-cli.js health >> "$LOG_FILE" 2>&1

# Clean old backups (keep last 7 days)
echo "[$(date)] Cleaning old backups..." >> "$LOG_FILE"
find backup -name "*.tar.gz" -type f -mtime +7 -delete >> "$LOG_FILE" 2>&1

echo "[$(date)] Daily update completed" >> "$LOG_FILE"
EOF

# Create weekly update script
cat > "$CRON_DIR/weekly-update.sh" << 'EOF'
#!/bin/bash

# Weekly Cathedral Update
# Runs comprehensive weekly maintenance

CATHEDRAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOG_FILE="$CATHEDRAL_DIR/update-weekly.log"

echo "[$(date)] Starting weekly Cathedral update..." >> "$LOG_FILE"

# Check if we're in the right directory
if [ ! -f "$CATHEDRAL_DIR/package.json" ]; then
    echo "[$(date)] ERROR: Not in Cathedral directory" >> "$LOG_FILE"
    exit 1
fi

cd "$CATHEDRAL_DIR"

# Create backup
echo "[$(date)] Creating weekly backup..." >> "$LOG_FILE"
node tools/cathedral-cli.js backup >> "$LOG_FILE" 2>&1

# Update system
echo "[$(date)] Running system update..." >> "$LOG_FILE"
./tools/cathedral-update-system.sh >> "$LOG_FILE" 2>&1

# Sync repositories
echo "[$(date)] Syncing repositories..." >> "$LOG_FILE"
node tools/cathedral-cli.js sync >> "$LOG_FILE" 2>&1

# Security audit
echo "[$(date)] Running security audit..." >> "$LOG_FILE"
pnpm audit --audit-level=moderate >> "$LOG_FILE" 2>&1

echo "[$(date)] Weekly update completed" >> "$LOG_FILE"
EOF

# Create monthly cleanup script
cat > "$CRON_DIR/monthly-cleanup.sh" << 'EOF'
#!/bin/bash

# Monthly Cathedral Cleanup
# Comprehensive cleanup and optimization

CATHEDRAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOG_FILE="$CATHEDRAL_DIR/update-monthly.log"

echo "[$(date)] Starting monthly cleanup..." >> "$LOG_FILE"

# Check if we're in the right directory
if [ ! -f "$CATHEDRAL_DIR/package.json" ]; then
    echo "[$(date)] ERROR: Not in Cathedral directory" >> "$LOG_FILE"
    exit 1
fi

cd "$CATHEDRAL_DIR"

# Clean all caches and temporary files
echo "[$(date)] Cleaning caches and temp files..." >> "$LOG_FILE"
pnpm run clean >> "$LOG_FILE" 2>&1

# Clean old logs (keep last 30 days)
echo "[$(date)] Cleaning old logs..." >> "$LOG_FILE"
find . -name "*.log" -type f -mtime +30 -delete >> "$LOG_FILE" 2>&1

# Clean old backups (keep last 4 weeks)
echo "[$(date)] Cleaning old backups..." >> "$LOG_FILE"
find backup -name "*.tar.gz" -type f -mtime +28 -delete >> "$LOG_FILE" 2>&1

# Reinstall dependencies fresh
echo "[$(date)] Fresh dependency installation..." >> "$LOG_FILE"
rm -rf node_modules pnpm-lock.yaml
pnpm install >> "$LOG_FILE" 2>&1

# Full system rebuild
echo "[$(date)] Full system rebuild..." >> "$LOG_FILE"
pnpm run turbo:build >> "$LOG_FILE" 2>&1

echo "[$(date)] Monthly cleanup completed" >> "$LOG_FILE"
EOF

# Make scripts executable
chmod +x "$CRON_DIR/daily-update.sh"
chmod +x "$CRON_DIR/weekly-update.sh"
chmod +x "$CRON_DIR/monthly-cleanup.sh"

# Setup cron jobs
setup_cron_jobs() {
    log "Setting up cron jobs..."

    # Check if crontab exists and create backup
    if crontab -l > /dev/null 2>&1; then
        crontab -l > "$CRON_DIR/crontab-backup.txt"
        log "Existing crontab backed up to $CRON_DIR/crontab-backup.txt"
    fi

    # Create new crontab with Cathedral jobs
    cat > "$CRON_DIR/cathedral-crontab.txt" << EOF
# Cathedral Automated Updates
# Daily update at 2 AM
0 2 * * * $CATHEDRAL_DIR/tools/cron/daily-update.sh

# Weekly update on Sunday at 3 AM
0 3 * * 0 $CATHEDRAL_DIR/tools/cron/weekly-update.sh

# Monthly cleanup on 1st of month at 4 AM
0 4 1 * * $CATHEDRAL_DIR/tools/cron/monthly-cleanup.sh
EOF

    # Install the new crontab
    if crontab "$CRON_DIR/cathedral-crontab.txt" 2>/dev/null; then
        success "Cron jobs installed successfully"
        log "Cron jobs installed:"
        log "  - Daily updates: 2:00 AM"
        log "  - Weekly updates: Sunday 3:00 AM"
        log "  - Monthly cleanup: 1st of month 4:00 AM"
    else
        warning "Could not install cron jobs automatically"
        warning "Please run the following command manually:"
        warning "  crontab $CRON_DIR/cathedral-crontab.txt"
    fi
}

# Create systemd service (alternative to cron)
create_systemd_service() {
    log "Creating systemd service..."

    cat > "$CRON_DIR/cathedral-update.service" << EOF
[Unit]
Description=Cathedral Automated Update Service
After=network.target

[Service]
Type=oneshot
ExecStart=$CATHEDRAL_DIR/tools/cathedral-update-system.sh
WorkingDirectory=$CATHEDRAL_DIR
User=$USER
Environment=PATH=/usr/local/bin:/usr/bin:/bin
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

    cat > "$CRON_DIR/cathedral-update.timer" << EOF
[Unit]
Description=Run Cathedral updates daily

[Timer]
OnCalendar=daily
AccuracySec=1h
Persistent=true

[Install]
WantedBy=timers.target
EOF

    log "Systemd service files created in $CRON_DIR/"
    warning "To use systemd timers instead of cron:"
    warning "  sudo cp $CRON_DIR/cathedral-update.service /etc/systemd/system/"
    warning "  sudo cp $CRON_DIR/cathedral-update.timer /etc/systemd/system/"
    warning "  sudo systemctl enable cathedral-update.timer"
    warning "  sudo systemctl start cathedral-update.timer"
}

# Main setup
main() {
    log "Setting up automated updates..."

    # Setup cron jobs
    setup_cron_jobs

    # Create systemd service as alternative
    create_systemd_service

    # Create README
    cat > "$CRON_DIR/README.md" << EOF
# Cathedral Automated Updates

This directory contains automated update scripts for the Cathedral system.

## Cron Jobs

The following cron jobs are installed:

- **Daily** (2:00 AM): Basic maintenance, dependency updates, health checks
- **Weekly** (Sunday 3:00 AM): Full system update, backup creation, repository sync
- **Monthly** (1st 4:00 AM): Complete cleanup, fresh installation, full rebuild

## Scripts

- \`daily-update.sh\`: Daily maintenance tasks
- \`weekly-update.sh\`: Weekly comprehensive updates
- \`monthly-cleanup.sh\`: Monthly cleanup and optimization

## Systemd Alternative

If you prefer systemd timers over cron jobs:

\`\`\`bash
sudo cp cathedral-update.service /etc/systemd/system/
sudo cp cathedral-update.timer /etc/systemd/system/
sudo systemctl enable cathedral-update.timer
sudo systemctl start cathedral-update.timer
\`\`\`

## Manual Execution

You can also run updates manually:

\`\`\`bash
# Run full update
./tools/cathedral-update-system.sh

# Run specific CLI commands
node tools/cathedral-cli.js update
node tools/cathedral-cli.js health
node tools/cathedral-cli.js backup
\`\`\`

## Logs

- Daily logs: \`update-daily.log\`
- Weekly logs: \`update-weekly.log\`
- Monthly logs: \`update-monthly.log\`
- Main update logs: \`update.log\`
EOF

    success "Automated update system setup completed!"
    echo ""
    echo "📋 Setup Summary:"
    echo "  ✅ Daily update script created"
    echo "  ✅ Weekly update script created"
    echo "  ✅ Monthly cleanup script created"
    echo "  ✅ Cron jobs configured"
    echo "  ✅ Systemd service files created"
    echo "  ✅ Documentation created"
    echo ""
    echo "🚀 Your Cathedral system will now update automatically!"
    echo "   Check the logs in the main directory for update status."
}

# Run setup
main "$@"
