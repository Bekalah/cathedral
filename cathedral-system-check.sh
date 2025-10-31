#!/bin/bash
# System safety check for Cathedral development

check_disk_space() {
    echo "💾 Checking disk space..."
    df -h . | awk 'NR==2 {print "Available: " $4 " of " $2}'
    
    # Warn if less than 1GB available
    AVAILABLE=$(df . | awk 'NR==2 {print $4}' | sed 's/G//')
    if [ "$AVAILABLE" -lt 1 ]; then
        echo "⚠️  Warning: Less than 1GB disk space available"
        return 1
    fi
    return 0
}

check_memory() {
    echo "🧠 Checking system memory..."
    FREE_MEM=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
    if [ "$FREE_MEM" -lt 1048576 ]; then  # Less than 1GB
        echo "⚠️  Warning: Low system memory"
        return 1
    fi
    return 0
}

check_cargo() {
    echo "📦 Checking Cargo installation..."
    if ! command -v cargo &> /dev/null; then
        echo "❌ Cargo not found. Install with: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
        return 1
    fi
    echo "✅ Cargo: $(cargo --version)"
    return 0
}

check_godot() {
    echo "🎮 Checking Godot installation..."
    if ! command -v godot &> /dev/null; then
        echo "⚠️  Godot not in PATH. Install from: https://godotengine.org/download"
        return 1
    fi
    echo "✅ Godot found"
    return 0
}

run_safety_check() {
    echo "🔍 Running Cathedral System Safety Check..."
    echo "=========================================="
    
    check_disk_space || echo "Disk space may be insufficient"
    check_memory || echo "Memory may be insufficient"
    check_cargo || echo "Cargo installation needed"
    check_godot || echo "Godot installation recommended"
    
    echo "=========================================="
    echo "✅ System check complete"
}

# Run safety check if called directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    run_safety_check
fi
