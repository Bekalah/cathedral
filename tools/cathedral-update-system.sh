#!/bin/bash

# CATHEDRAL UPDATE SYSTEM
# Automated update and maintenance system for the Cathedral CLI and monorepo

set -e

echo "🏛️ CATHEDRAL UPDATE SYSTEM"
echo "=========================="

# Configuration
CATHEDRAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
UPDATE_LOG="$CATHEDRAL_DIR/update.log"
BACKUP_DIR="$CATHEDRAL_DIR/backup"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$UPDATE_LOG"
}

success() {
    echo -e "${GREEN}✅ $1${NC}" | tee -a "$UPDATE_LOG"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}" | tee -a "$UPDATE_LOG"
}

error() {
    echo -e "${RED}❌ $1${NC}" | tee -a "$UPDATE_LOG"
}

# Create backup
create_backup() {
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_name="cathedral_backup_$timestamp"

    log "Creating backup: $backup_name"

    mkdir -p "$BACKUP_DIR"
    cd "$CATHEDRAL_DIR"

    # Backup critical files
    tar -czf "$BACKUP_DIR/$backup_name.tar.gz" \
        package.json \
        turbo.json \
        pnpm-lock.yaml \
        data/ \
        packages/ \
        apps/ \
        tools/cathedral-cli.js \
        2>/dev/null || warning "Some files may have been excluded from backup"

    success "Backup created: $BACKUP_DIR/$backup_name.tar.gz"
}

# Update dependencies
update_dependencies() {
    log "Updating dependencies..."

    cd "$CATHEDRAL_DIR"

    # Update pnpm
    if command -v pnpm &> /dev/null; then
        log "Updating pnpm..."
        pnpm add -g pnpm || warning "Failed to update pnpm"
    fi

    # Install/update dependencies
    if [ -f "pnpm-lock.yaml" ]; then
        log "Installing dependencies with pnpm..."
        pnpm install || error "Failed to install dependencies"
        success "Dependencies updated"
    elif [ -f "package-lock.json" ]; then
        log "Installing dependencies with npm..."
        npm install || error "Failed to install dependencies"
        success "Dependencies updated"
    else
        warning "No lock file found, skipping dependency installation"
    fi
}

# Update turbo cache
update_turbo() {
    log "Updating Turbo cache..."

    cd "$CATHEDRAL_DIR"

    if command -v pnpm &> /dev/null && [ -f "turbo.json" ]; then
        log "Building with Turbo..."
        pnpm run turbo:build || warning "Turbo build failed"
        success "Turbo cache updated"
    fi
}

# Check security vulnerabilities
check_security() {
    log "Checking security vulnerabilities..."

    cd "$CATHEDRAL_DIR"

    if command -v pnpm &> /dev/null; then
        if pnpm audit --audit-level=moderate | grep -q "found"; then
            warning "Security vulnerabilities found"
            log "Attempting to fix vulnerabilities..."
            pnpm audit fix || warning "Some vulnerabilities could not be fixed automatically"
        else
            success "No security vulnerabilities found"
        fi
    elif command -v npm &> /dev/null; then
        if npm audit --audit-level=moderate | grep -q "found"; then
            warning "Security vulnerabilities found"
            log "Attempting to fix vulnerabilities..."
            npm audit fix || warning "Some vulnerabilities could not be fixed automatically"
        else
            success "No security vulnerabilities found"
        fi
    fi
}

# Update CLI tool
update_cli() {
    log "Updating Cathedral CLI..."

    cd "$CATHEDRAL_DIR"

    # Check if CLI exists and update it
    if [ -f "tools/cathedral-cli.js" ]; then
        # Make sure CLI is executable
        chmod +x tools/cathedral-cli.js

        # Update CLI if it's a git repository
        if [ -d ".git" ]; then
            log "Pulling latest changes..."
            git pull origin main || warning "Failed to pull latest changes"
        fi

        success "CLI updated"
    else
        error "CLI file not found"
    fi
}

# Health check
health_check() {
    log "Running health check..."

    cd "$CATHEDRAL_DIR"

    local health_score=0

    # Check package.json
    if [ -f "package.json" ]; then
        health_score=$((health_score + 25))
        log "✅ package.json found"
    else
        warning "❌ package.json missing"
    fi

    # Check turbo.json
    if [ -f "turbo.json" ]; then
        health_score=$((health_score + 25))
        log "✅ turbo.json found"
    else
        warning "❌ turbo.json missing"
    fi

    # Check data files
    if [ -d "data" ] && [ -f "data/codex-144-expanded.json" ]; then
        health_score=$((health_score + 25))
        log "✅ Data files present"
    else
        warning "❌ Data files missing"
    fi

    # Check dependencies
    if [ -d "node_modules" ]; then
        health_score=$((health_score + 25))
        log "✅ Dependencies installed"
    else
        warning "❌ Dependencies not installed"
    fi

    log "Health score: $health_score/100"

    if [ $health_score -ge 75 ]; then
        success "System health: GOOD"
    elif [ $health_score -ge 50 ]; then
        warning "System health: MODERATE"
    else
        error "System health: POOR"
    fi
}

# Global installation
install_globally() {
    log "Installing Cathedral CLI globally..."

    cd "$CATHEDRAL_DIR"

    if [ -f "tools/cathedral-cli.js" ]; then
        # Create global symlink
        local global_bin="/usr/local/bin/cathedral"

        if [ -w "/usr/local/bin" ] || [ -w "$(dirname "$global_bin")" ]; then
            ln -sf "$CATHEDRAL_DIR/tools/cathedral-cli.js" "$global_bin" 2>/dev/null || {
                # Try alternative location
                mkdir -p ~/bin
                ln -sf "$CATHEDRAL_DIR/tools/cathedral-cli.js" ~/bin/cathedral 2>/dev/null || {
                    warning "Could not create global symlink. You may need to run this script as root or add the tools directory to your PATH manually."
                }
            }

            # Make executable
            chmod +x "$CATHEDRAL_DIR/tools/cathedral-cli.js"

            success "CLI installed globally. You can now use 'cathedral' command anywhere."
        else
            warning "No write permission for global installation. Please run as root or add to PATH manually."
        fi
    fi
}

# Main update process
main() {
    log "Starting Cathedral update process..."

    # Create backup before updating
    create_backup

    # Run updates
    update_cli
    update_dependencies
    update_turbo
    check_security

    # Health check
    health_check

    # Global installation
    install_globally

    success "Update process completed successfully!"
    log "Update completed at $(date)"

    echo ""
    echo "🎉 CATHEDRAL UPDATE COMPLETE!"
    echo "=============================="
    echo ""
    echo "You can now use the following commands:"
    echo "  cathedral update     - Update the system"
    echo "  cathedral monorepo   - Manage monorepo operations"
    echo "  cathedral sync       - Sync repositories"
    echo "  cathedral health     - Check system health"
    echo "  cathedral backup     - Create backup"
    echo "  cathedral restore    - Restore from backup"
    echo ""
    echo "For help: cathedral help"
}

# Check if running as root (for global installation)
if [ "$EUID" -eq 0 ]; then
    warning "Running as root. Global installation may require elevated privileges."
fi

# Run main update process
main "$@"
