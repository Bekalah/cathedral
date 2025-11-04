#!/usr/bin/env node
/**
 * Cathedral Modular Connection System
 * Connects art systems, synth labs, and arcana modules
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ModularConnector {
    constructor() {
        this.rootDir = process.cwd();
        this.moduleManifest = {
            art_systems: {},
            synth_labs: {},
            arcana: {},
            connections: []
        };
    }

    /**
     * Scan all packages for modular components
     */
    scanModules() {
        console.log('🔍 Scanning for modular components...');
        
        const packagesDir = path.join(this.rootDir, 'packages');
        const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const pkg of packages) {
            this.analyzePackage(pkg);
        }

        this.saveManifest();
    }

    /**
     * Analyze individual package for modular capabilities
     */
    analyzePackage(packageName) {
        const packagePath = path.join(this.rootDir, 'packages', packageName);
        const packageJsonPath = path.join(packagePath, 'package.json');

        if (!fs.existsSync(packageJsonPath)) return;

        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            
            // Categorize package based on name and contents
            if (packageName.includes('art') || packageName.includes('visual')) {
                this.moduleManifest.art_systems[packageName] = {
                    name: packageJson.name || packageName,
                    version: packageJson.version || '1.0.0',
                    type: 'art_system',
                    capabilities: this.detectArtCapabilities(packagePath),
                    exports: this.detectExports(packagePath)
                };
            } else if (packageName.includes('synth') || packageName.includes('audio')) {
                this.moduleManifest.synth_labs[packageName] = {
                    name: packageJson.name || packageName,
                    version: packageJson.version || '1.0.0',
                    type: 'synth_lab',
                    capabilities: this.detectSynthCapabilities(packagePath),
                    exports: this.detectExports(packagePath)
                };
            } else if (packageName.includes('arcana') || packageName.includes('tarot') || packageName.includes('codex')) {
                this.moduleManifest.arcana[packageName] = {
                    name: packageJson.name || packageName,
                    version: packageJson.version || '1.0.0',
                    type: 'arcana',
                    capabilities: this.detectArcanaCapabilities(packagePath),
                    exports: this.detectExports(packagePath)
                };
            }
        } catch (error) {
            console.warn(`⚠️  Could not analyze package ${packageName}:`, error.message);
        }
    }

    /**
     * Detect art system capabilities
     */
    detectArtCapabilities(packagePath) {
        const capabilities = [];
        
        // Check for Python art generation
        if (fs.existsSync(path.join(packagePath, 'traditional_art_generator.py'))) {
            capabilities.push('traditional_art_generation');
        }
        
        // Check for other art capabilities
        const files = this.getFilesRecursively(packagePath);
        
        if (files.some(f => f.includes('palette'))) capabilities.push('palette_generation');
        if (files.some(f => f.includes('chiaroscuro'))) capabilities.push('chiaroscuro_lighting');
        if (files.some(f => f.includes('fresco'))) capabilities.push('fresco_textures');
        if (files.some(f => f.includes('perspective'))) capabilities.push('perspective_systems');
        
        return capabilities;
    }

    /**
     * Detect synth lab capabilities
     */
    detectSynthCapabilities(packagePath) {
        const capabilities = [];
        
        // Check for synth emulations
        if (fs.existsSync(path.join(packagePath, 'classic_synth_emulator.py'))) {
            capabilities.push('classic_synth_emulation');
        }
        
        const files = this.getFilesRecursively(packagePath);
        
        if (files.some(f => f.includes('cs80') || f.includes('yamaha'))) capabilities.push('yamaha_cs80');
        if (files.some(f => f.includes('moog'))) capabilities.push('moog_modular');
        if (files.some(f => f.includes('aphex') || f.includes('rdj'))) capabilities.push('aphex_generation');
        if (files.some(f => f.includes('buchla'))) capabilities.push('buchla_emulation');
        
        return capabilities;
    }

    /**
     * Detect arcana capabilities
     */
    detectArcanaCapabilities(packagePath) {
        const capabilities = [];
        
        const files = this.getFilesRecursively(packagePath);
        
        if (files.some(f => f.includes('tarot'))) capabilities.push('tarot_systems');
        if (files.some(f => f.includes('codex'))) capabilities.push('codex_library');
        if (files.some(f => f.includes('tradition'))) capabilities.push('tradition_engines');
        if (files.some(f => f.includes('grimoire'))) capabilities.push('grimoire_management');
        
        return capabilities;
    }

    /**
     * Detect module exports
     */
    detectExports(packagePath) {
        const exports = [];
        
        // Check for common export patterns
        const indexFiles = ['index.js', 'index.ts', 'main.py', '__init__.py'];
        
        for (const indexFile of indexFiles) {
            if (fs.existsSync(path.join(packagePath, indexFile))) {
                exports.push(indexFile);
            }
        }
        
        return exports;
    }

    /**
     * Get all files recursively
     */
    getFilesRecursively(dir) {
        const files = [];
        
        try {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            
            for (const item of items) {
                if (item.name.startsWith('.')) continue;
                
                const fullPath = path.join(dir, item.name);
                
                if (item.isDirectory()) {
                    files.push(...this.getFilesRecursively(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (error) {
            // Ignore inaccessible directories
        }
        
        return files;
    }

    /**
     * Create modular connections between systems
     */
    createConnections() {
        console.log('🔗 Creating modular connections...');
        
        // Art -> Synth connections
        Object.keys(this.moduleManifest.art_systems).forEach(artSystem => {
            Object.keys(this.moduleManifest.synth_labs).forEach(synthLab => {
                this.moduleManifest.connections.push({
                    from: artSystem,
                    to: synthLab,
                    type: 'art_to_synth',
                    description: 'Visual parameters drive synthesis parameters'
                });
            });
        });

        // Arcana -> Both connections
        Object.keys(this.moduleManifest.arcana).forEach(arcanaSystem => {
            Object.keys(this.moduleManifest.art_systems).forEach(artSystem => {
                this.moduleManifest.connections.push({
                    from: arcanaSystem,
                    to: artSystem,
                    type: 'arcana_to_art',
                    description: 'Arcana symbolism influences visual generation'
                });
            });
            
            Object.keys(this.moduleManifest.synth_labs).forEach(synthLab => {
                this.moduleManifest.connections.push({
                    from: arcanaSystem,
                    to: synthLab,
                    type: 'arcana_to_synth',
                    description: 'Arcana numerology influences synthesis parameters'
                });
            });
        });
    }

    /**
     * Generate connection scripts
     */
    generateConnectionScripts() {
        console.log('📜 Generating connection scripts...');
        
        const scriptsDir = path.join(this.rootDir, 'scripts', 'connections');
        
        if (!fs.existsSync(scriptsDir)) {
            fs.mkdirSync(scriptsDir, { recursive: true });
        }

        // Generate art-synth bridge
        const artSynthBridge = `#!/usr/bin/env python3
"""
Art-Synth Bridge
Converts visual parameters to synthesis parameters
"""

import json
import sys
from pathlib import Path

def art_to_synth_params(art_data):
    """Convert art parameters to synth parameters"""
    synth_params = {}
    
    # Map colors to synthesis
    if 'palette' in art_data:
        # Use color brightness for filter cutoff
        avg_brightness = sum(sum(color) for color in art_data['palette']) / (len(art_data['palette']) * 3)
        synth_params['filter_cutoff'] = 200 + (avg_brightness / 255) * 2000
        
        # Use color saturation for resonance
        if len(art_data['palette']) > 0:
            first_color = art_data['palette'][0]
            saturation = max(first_color) - min(first_color)
            synth_params['resonance'] = saturation / 255
    
    # Map composition to rhythm
    if 'composition' in art_data:
        synth_params['tempo'] = art_data['composition'].get('rhythm_density', 120)
    
    return synth_params

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: art_synth_bridge.py <art_data.json>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r') as f:
        art_data = json.load(f)
    
    synth_params = art_to_synth_params(art_data)
    print(json.dumps(synth_params, indent=2))
`;

        fs.writeFileSync(path.join(scriptsDir, 'art_synth_bridge.py'), artSynthBridge);

        // Generate arcana-art bridge
        const arcanaArtBridge = `#!/usr/bin/env python3
"""
Arcana-Art Bridge
Converts arcana symbolism to visual parameters
"""

import json
import sys

def arcana_to_art_params(arcana_data):
    """Convert arcana parameters to art parameters"""
    art_params = {}
    
    # Map arcana to colors
    arcana_color_map = {
        'fool': [255, 255, 0],      # Yellow - new beginnings
        'magician': [255, 0, 0],    # Red - power
        'priestess': [0, 0, 255],   # Blue - intuition
        'empress': [0, 255, 0],     # Green - nature
        'emperor': [128, 0, 128],   # Purple - authority
        # Add all 22 major arcana...
    }
    
    if 'card' in arcana_data:
        card_name = arcana_data['card'].lower()
        if card_name in arcana_color_map:
            art_params['primary_color'] = arcana_color_map[card_name]
    
    # Map arcana numbers to golden ratio compositions
    if 'number' in arcana_data:
        number = arcana_data['number']
        art_params['composition_ratio'] = 1.618 ** (number / 22)
    
    return art_params

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: arcana_art_bridge.py <arcana_data.json>")
        sys.exit(1)
    
    with open(sys.argv[1], 'r') as f:
        arcana_data = json.load(f)
    
    art_params = arcana_to_art_params(arcana_data)
    print(json.dumps(art_params, indent=2))
`;

        fs.writeFileSync(path.join(scriptsDir, 'arcana_art_bridge.py'), arcanaArtBridge);
    }

    /**
     * Save module manifest
     */
    saveManifest() {
        const manifestPath = path.join(this.rootDir, 'cathedral_manifest.json');
        fs.writeFileSync(manifestPath, JSON.stringify(this.moduleManifest, null, 2));
        console.log(`📄 Module manifest saved to ${manifestPath}`);
    }

    /**
     * Load existing manifest
     */
    loadManifest() {
        const manifestPath = path.join(this.rootDir, 'cathedral_manifest.json');
        if (fs.existsSync(manifestPath)) {
            this.moduleManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        }
    }

    /**
     * Generate status report
     */
    generateReport() {
        console.log('\n🏰 Cathedral Modular System Report');
        console.log('=====================================');
        
        console.log(\`\n🎨 Art Systems (\${Object.keys(this.moduleManifest.art_systems).length}):\`);
        Object.entries(this.moduleManifest.art_systems).forEach(([name, module]) => {
            console.log(\`  • \${name}: \${module.capabilities.join(', ')}\`);
        });
        
        console.log(\`\n🎵 Synth Labs (\${Object.keys(this.moduleManifest.synth_labs).length}):\`);
        Object.entries(this.moduleManifest.synth_labs).forEach(([name, module]) => {
            console.log(\`  • \${name}: \${module.capabilities.join(', ')}\`);
        });
        
        console.log(\`\n🔮 Arcana Systems (\${Object.keys(this.moduleManifest.arcana).length}):\`);
        Object.entries(this.moduleManifest.arcana).forEach(([name, module]) => {
            console.log(\`  • \${name}: \${module.capabilities.join(', ')}\`);
        });
        
        console.log(\`\n🔗 Connections (\${this.moduleManifest.connections.length}):\`);
        this.moduleManifest.connections.slice(0, 5).forEach(conn => {
            console.log(\`  • \${conn.from} → \${conn.to} (\${conn.type})\`);
        });
        
        if (this.moduleManifest.connections.length > 5) {
            console.log(\`  ... and \${this.moduleManifest.connections.length - 5} more\`);
        }
    }

    /**
     * Main execution
     */
    execute() {
        this.loadManifest();
        this.scanModules();
        this.createConnections();
        this.generateConnectionScripts();
        this.generateReport();
        
        console.log('\n✨ Modular connection system ready!');
        console.log('Run: pnpm run connect to execute modular connections');
    }
}

// Execute if called directly
if (require.main === module) {
    const connector = new ModularConnector();
    connector.execute();
}

module.exports = ModularConnector;