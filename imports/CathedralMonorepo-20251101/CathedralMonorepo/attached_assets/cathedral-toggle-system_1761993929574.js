#!/usr/bin/env node
/**
 * 🔄 Cathedral Toggle Management System
 * Sturdy, easy-to-use toggles for mixed-purpose app usage
 */

class CathedralToggleSystem {
    constructor() {
        this.configPath = './package.json';
        this.config = this.loadConfig();
        this.activeToggles = new Set();
        this.criticalToggles = new Set([
            'privacy-protection',
            'accessibility-features', 
            'trauma-informed-design',
            'auto-backup'
        ]);
        
        this.initializeToggles();
    }
    
    loadConfig() {
        try {
            const fs = require('fs');
            const packageJson = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
            return packageJson.config || {};
        } catch (error) {
            console.warn('⚠️ Could not load package.json config, using defaults');
            return this.getDefaultConfig();
        }
    }
    
    getDefaultConfig() {
        return {
            toggles: {
                'privacy-protection': true,
                'accessibility-features': true,
                'trauma-informed-design': true,
                'numerology-system': false,
                'fusion-guides': false,
                'master33-mode': false,
                'rpg-integration': false,
                'auto-backup': true
            },
            profiles: {
                'personal': ['privacy-protection', 'accessibility-features', 'numerology-system', 'fusion-guides'],
                'professional': ['privacy-protection', 'accessibility-features', 'master33-mode'],
                'teaching': ['privacy-protection', 'accessibility-features', 'numerology-system', 'fusion-guides', 'master33-mode'],
                'rpg': ['privacy-protection', 'accessibility-features', 'numerology-system', 'rpg-integration']
            }
        };
    }
    
    initializeToggles() {
        // Activate toggles based on config
        Object.entries(this.config.toggles || {}).forEach(([toggle, enabled]) => {
            if (enabled) {
                this.activeToggles.add(toggle);
            }
        });
        
        console.log('🔄 Cathedral Toggle System Initialized');
        console.log(`✅ Active: ${Array.from(this.activeToggles).join(', ')}`);
    }
    
    toggle(toggleName, forceState = null) {
        // Safety check for critical toggles
        if (this.criticalToggles.has(toggleName) && forceState === false) {
            console.error(`❌ Cannot disable critical safety feature: ${toggleName}`);
            return false;
        }
        
        if (forceState !== null) {
            // Force specific state
            if (forceState) {
                this.activeToggles.add(toggleName);
            } else {
                this.activeToggles.delete(toggleName);
            }
        } else {
            // Toggle current state
            if (this.activeToggles.has(toggleName)) {
                this.activeToggles.delete(toggleName);
            } else {
                this.activeToggles.add(toggleName);
            }
        }
        
        const isActive = this.activeToggles.has(toggleName);
        console.log(`🔄 ${toggleName}: ${isActive ? 'ON' : 'OFF'}`);
        
        // Apply toggle effects
        this.applyToggleEffects(toggleName, isActive);
        
        // Save state
        this.saveToggleState();
        
        return isActive;
    }
    
    applyToggleEffects(toggleName, isActive) {
        switch(toggleName) {
            case 'numerology-system':
                this.toggleNumerologySystem(isActive);
                break;
            case 'fusion-guides':
                this.toggleFusionGuides(isActive);
                break;
            case 'master33-mode':
                this.toggleMaster33Mode(isActive);
                break;
            case 'rpg-integration':
                this.toggleRPGIntegration(isActive);
                break;
            case 'auto-backup':
                this.toggleAutoBackup(isActive);
                break;
        }
    }
    
    toggleNumerologySystem(isActive) {
        if (typeof document !== 'undefined') {
            const numerologyElements = document.querySelectorAll('.numerology-feature');
            numerologyElements.forEach(el => {
                el.style.display = isActive ? 'block' : 'none';
            });
        }
        console.log(`🔢 Numerology System: ${isActive ? 'ACTIVATED' : 'DEACTIVATED'}`);
    }
    
    toggleFusionGuides(isActive) {
        if (typeof document !== 'undefined') {
            const fusionBar = document.querySelector('.fusion-guide-bar');
            if (fusionBar) {
                fusionBar.style.display = isActive ? 'flex' : 'none';
            }
        }
        console.log(`🎭 Fusion Guides: ${isActive ? 'ACTIVATED' : 'DEACTIVATED'}`);
    }
    
    toggleMaster33Mode(isActive) {
        if (typeof document !== 'undefined') {
            const body = document.body;
            if (isActive) {
                body.classList.add('master33-mode');
                body.style.setProperty('--cathedral-gold', '#ffd700');
            } else {
                body.classList.remove('master33-mode');
                body.style.setProperty('--cathedral-gold', '#d4af37');
            }
        }
        console.log(`🌟 Master 33 Mode: ${isActive ? 'ACTIVATED' : 'DEACTIVATED'}`);
    }
    
    toggleRPGIntegration(isActive) {
        // Enable/disable RPG-specific features
        console.log(`🎮 RPG Integration: ${isActive ? 'ACTIVATED' : 'DEACTIVATED'}`);
        
        // Export data for RPG if activated
        if (isActive) {
            this.exportForRPG();
        }
    }
    
    toggleAutoBackup(isActive) {
        if (isActive) {
            // Start auto-backup interval
            this.startAutoBackup();
        } else {
            // Stop auto-backup interval
            this.stopAutoBackup();
        }
        console.log(`💾 Auto-Backup: ${isActive ? 'ACTIVATED' : 'DEACTIVATED'}`);
    }
    
    loadProfile(profileName) {
        const profile = this.config.profiles[profileName];
        if (!profile) {
            console.error(`❌ Profile not found: ${profileName}`);
            return false;
        }
        
        // Deactivate all non-critical toggles
        this.activeToggles.clear();
        this.criticalToggles.forEach(toggle => this.activeToggles.add(toggle));
        
        // Activate profile toggles
        profile.forEach(toggle => {
            this.activeToggles.add(toggle);
            this.applyToggleEffects(toggle, true);
        });
        
        console.log(`📋 Loaded profile: ${profileName}`);
        console.log(`✅ Active: ${Array.from(this.activeToggles).join(', ')}`);
        
        this.saveToggleState();
        return true;
    }
    
    getStatus() {
        return {
            active_toggles: Array.from(this.activeToggles),
            critical_toggles: Array.from(this.criticalToggles),
            available_profiles: Object.keys(this.config.profiles || {}),
            system_health: this.checkSystemHealth()
        };
    }
    
    checkSystemHealth() {
        const health = {
            critical_toggles_active: true,
            data_integrity: true,
            backup_system: this.activeToggles.has('auto-backup'),
            overall_status: 'healthy'
        };
        
        // Check if all critical toggles are active
        this.criticalToggles.forEach(toggle => {
            if (!this.activeToggles.has(toggle)) {
                health.critical_toggles_active = false;
                health.overall_status = 'warning';
            }
        });
        
        return health;
    }
    
    saveToggleState() {
        // Save current toggle state to localStorage if available
        if (typeof localStorage !== 'undefined') {
            const state = {
                activeToggles: Array.from(this.activeToggles),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('cathedral-toggle-state', JSON.stringify(state));
        }
    }
    
    exportForRPG() {
        // Export current system state for RPG integration
        const exportData = {
            numerology_active: this.activeToggles.has('numerology-system'),
            fusion_guides_active: this.activeToggles.has('fusion-guides'),
            master33_active: this.activeToggles.has('master33-mode'),
            export_timestamp: new Date().toISOString(),
            system_status: this.getStatus()
        };
        
        console.log('📤 Exporting Cathedral state for RPG integration');
        return exportData;
    }
    
    startAutoBackup() {
        // Implementation would start periodic backup process
        console.log('💾 Auto-backup system started');
    }
    
    stopAutoBackup() {
        // Implementation would stop periodic backup process  
        console.log('💾 Auto-backup system stopped');
    }
}

// CLI Interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const toggleSystem = new CathedralToggleSystem();
    
    if (args.length === 0) {
        console.log('🔄 Cathedral Toggle System');
        console.log('Commands:');
        console.log('  status                 - Show current status');
        console.log('  toggle <name>          - Toggle a feature');
        console.log('  profile <name>         - Load a profile');
        console.log('  export-rpg            - Export for RPG integration');
        process.exit(0);
    }
    
    const command = args[0];
    
    switch(command) {
        case 'status':
            console.log(JSON.stringify(toggleSystem.getStatus(), null, 2));
            break;
        case 'toggle':
            if (args[1]) {
                toggleSystem.toggle(args[1]);
            } else {
                console.error('❌ Please specify toggle name');
            }
            break;
        case 'profile':
            if (args[1]) {
                toggleSystem.loadProfile(args[1]);
            } else {
                console.error('❌ Please specify profile name');
            }
            break;
        case 'export-rpg':
            const exportData = toggleSystem.exportForRPG();
            console.log(JSON.stringify(exportData, null, 2));
            break;
        default:
            console.error(`❌ Unknown command: ${command}`);
    }
}

module.exports = CathedralToggleSystem;