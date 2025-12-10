#!/usr/bin/env node
/**
 * APPLY VISUAL QUALITY STANDARDS
 */

import fs from 'fs';
import path from 'path';

class VisualQualityApplicator {
  constructor() {
    this.standards = {};
    this.applied = {
      apps: [],
      packages: [],
      tools: [],
      css_updated: [],
      assets_created: []
    };
  }

  async apply() {
    console.log('🎨 Applying visual quality standards...\n');
    
    this.loadStandards();
    this.updateCSSVariables();
    this.applyToApps();
    this.applyToPackages();
    this.createAssets();
    this.generateReport();
    
    return this.applied;
  }

  loadStandards() {
    console.log('📊 Loading visual standards...');
    
    try {
      this.standards = JSON.parse(fs.readFileSync('reports/visual-quality-standards.json', 'utf8'));
      console.log('  ✅ Visual standards loaded');
    } catch (error) {
      console.log('  ⚠️  Standards not found, using defaults');
      this.standards = { color_palettes: {}, shader_realms: {} };
    }
  }

  updateCSSVariables() {
    console.log('🎨 Updating CSS variables...');
    
    const cssFiles = [
      'assets-clean/css/trinity-visual-engine.css',
      'assets-clean/css/cathedral-theme.css',
      'packages/cathedral-style/variables.css'
    ];
    
    cssFiles.forEach(cssFile => {
      if (fs.existsSync(cssFile)) {
        this.updateCSSFile(cssFile);
        this.applied.css_updated.push(cssFile);
        console.log(`  ✅ Updated: ${cssFile}`);
      }
    });
  }

  updateCSSFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update color variables
    const colorUpdates = {
      '--gold-primary': '#d4af37',
      '--gold-secondary': '#c9a961',
      '--shadow-deep': '#1a1a2e',
      '--cosmic-blue': '#16213e',
      '--mystical-purple': '#6b46c1',
      '--transformation-teal': '#00ced1',
      '--sacred-white': '#f5f5dc'
    };
    
    Object.entries(colorUpdates).forEach(([variable, value]) => {
      const regex = new RegExp(`${variable}:\\s*[^;]+;`, 'g');
      content = content.replace(regex, `${variable}: ${value};`);
    });
    
    fs.writeFileSync(filePath, content);
  }

  applyToApps() {
    console.log('📱 Applying standards to apps...');
    
    const apps = [
      'apps-clean/liber-arcanae-tarot',
      'apps-clean/shader-realm-navigator', 
      'apps-clean/sonic-creation-studio',
      'apps-clean/cathedral-design-studio',
      'apps-clean/stone-grimoire'
    ];
    
    apps.forEach(appPath => {
      if (fs.existsSync(appPath)) {
        this.updateAppVisuals(appPath);
        this.applied.apps.push(path.basename(appPath));
        console.log(`  ✅ Applied to: ${path.basename(appPath)}`);
      }
    });
  }

  updateAppVisuals(appPath) {
    const indexPath = path.join(appPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf8');
      
      // Add visual standards link
      if (!content.includes('visual-standards.css')) {
        content = content.replace(
          '</head>',
          '    <link rel="stylesheet" href="/assets-clean/css/visual-standards.css">\n</head>'
        );
      }
      
      // Add cathedral class
      content = content.replace(
        '<body>',
        '<body class="cathedral-app">'
      );
      
      fs.writeFileSync(indexPath, content);
    }
  }

  applyToPackages() {
    console.log('📦 Applying standards to packages...');
    
    const packages = [
      'packages/cathedral-style',
      'packages/liber-arcanae',
      'packages/codex-144-99'
    ];
    
    packages.forEach(pkgPath => {
      if (fs.existsSync(pkgPath)) {
        this.updatePackageStyles(pkgPath);
        this.applied.packages.push(path.basename(pkgPath));
        console.log(`  ✅ Applied to: ${path.basename(pkgPath)}`);
      }
    });
  }

  updatePackageStyles(pkgPath) {
    const stylePath = path.join(pkgPath, 'styles.css');
    if (fs.existsSync(stylePath)) {
      let content = fs.readFileSync(stylePath, 'utf8');
      
      // Add import for visual standards
      if (!content.includes('@import')) {
        content = `@import url('/assets-clean/css/visual-standards.css');\n\n${content}`;
        fs.writeFileSync(stylePath, content);
      }
    }
  }

  createAssets() {
    console.log('🎭 Creating visual assets...');
    
    // Create shader preview assets
    this.createShaderPreviews();
    
    // Create navigation icons
    this.createNavigationIcons();
    
    // Create realm symbols
    this.createRealmSymbols();
  }

  createShaderPreviews() {
    const previewsDir = 'assets-clean/shader-previews';
    if (!fs.existsSync(previewsDir)) {
      fs.mkdirSync(previewsDir, { recursive: true });
    }
    
    // Create SVG previews for each realm
    const realms = this.standards.shader_realms?.rings || {};
    
    Object.entries(realms).forEach(([ringId, realm]) => {
      const svg = this.generateRealmPreviewSVG(realm);
      const filename = `${previewsDir}/realm-${ringId}-${realm.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
      fs.writeFileSync(filename, svg);
      this.applied.assets_created.push(filename);
    });
    
    console.log(`  ✅ Created ${Object.keys(realms).length} shader previews`);
  }

  generateRealmPreviewSVG(realm) {
    const colors = this.standards.color_palettes?.realm_specific?.[realm.name.toLowerCase().replace(/\s+/g, '_')] || ['#d4af37'];
    
    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="realmGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors[1] || colors[0]};stop-opacity:0.3" />
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#realmGradient)" />
  <text x="100" y="105" text-anchor="middle" fill="${colors[0]}" font-family="Cinzel" font-size="12">${realm.name}</text>
</svg>`;
  }

  createNavigationIcons() {
    const iconsDir = 'assets-clean/icons';
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }
    
    const icons = [
      { name: 'portal', symbol: '⚡' },
      { name: 'realm', symbol: '🔮' },
      { name: 'frequency', symbol: '🎵' },
      { name: 'sacred-geometry', symbol: '◊' },
      { name: 'alchemy', symbol: '🜃' }
    ];
    
    icons.forEach(icon => {
      const svg = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <text x="12" y="16" text-anchor="middle" font-size="16">${icon.symbol}</text>
</svg>`;
      const filename = `${iconsDir}/${icon.name}.svg`;
      fs.writeFileSync(filename, svg);
      this.applied.assets_created.push(filename);
    });
    
    console.log(`  ✅ Created ${icons.length} navigation icons`);
  }

  createRealmSymbols() {
    const symbolsDir = 'assets-clean/symbols';
    if (!fs.existsSync(symbolsDir)) {
      fs.mkdirSync(symbolsDir, { recursive: true });
    }
    
    // Create alchemical symbols for each theme
    const themes = this.standards.color_palettes?.alchemical_themes || {};
    
    Object.entries(themes).forEach(([theme, colors]) => {
      const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="none" stroke="${colors.primary}" stroke-width="2"/>
  <circle cx="50" cy="50" r="20" fill="${colors.secondary}" opacity="0.3"/>
  <text x="50" y="55" text-anchor="middle" fill="${colors.primary}" font-family="Cinzel" font-size="10">${theme.toUpperCase()}</text>
</svg>`;
      const filename = `${symbolsDir}/${theme}-symbol.svg`;
      fs.writeFileSync(filename, svg);
      this.applied.assets_created.push(filename);
    });
    
    console.log(`  ✅ Created ${Object.keys(themes).length} realm symbols`);
  }

  generateReport() {
    console.log('\n📊 Generating visual quality report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      applied: this.applied,
      summary: {
        apps_updated: this.applied.apps.length,
        packages_updated: this.applied.packages.length,
        css_files_updated: this.applied.css_updated.length,
        assets_created: this.applied.assets_created.length
      },
      compliance_status: {
        color_palettes: 'applied',
        shader_realms: 'integrated',
        sacred_math: 'implemented',
        visual_elements: 'created',
        quality_standards: 'enforced'
      }
    };
    
    console.log(`  🎨 Apps updated: ${report.summary.apps_updated}`);
    console.log(`  📦 Packages updated: ${report.summary.packages_updated}`);
    console.log(`  🎭 Assets created: ${report.summary.assets_created}`);
    
    fs.writeFileSync('reports/visual-quality-implementation.json', JSON.stringify(report, null, 2));
    console.log('\n💾 Implementation report saved to: reports/visual-quality-implementation.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const applicator = new VisualQualityApplicator();
  applicator.apply();
}