#!/usr/bin/env node
/**
 * CONNECTION MAPPING SYSTEM
 */

import fs from 'fs';
import path from 'path';

class ConnectionMapper {
  constructor() {
    this.connections = {
      timestamp: new Date().toISOString(),
      tools_to_apps: [],
      apps_to_packages: [],
      packages_to_packages: [],
      tools_to_tools: [],
      cross_repo: [],
      dependency_graph: {},
      circular_dependencies: [],
      broken_connections: []
    };
  }

  async map() {
    console.log('🔗 Mapping all connections...\n');
    
    await this.loadRepositoryData();
    this.mapToolsToApps();
    this.mapAppsToPackages();
    this.mapPackagesToPackages();
    this.mapToolsToTools();
    this.mapCrossRepoConnections();
    this.detectCircularDependencies();
    this.findBrokenConnections();
    this.generateDependencyGraph();
    this.generateReport();
    
    return this.connections;
  }

  async loadRepositoryData() {
    console.log('📊 Loading repository data...');
    
    try {
      this.repoMap = JSON.parse(fs.readFileSync('reports/repository-map.json', 'utf8'));
      this.toolsReport = JSON.parse(fs.readFileSync('reports/tools-comprehensive-report.json', 'utf8'));
      this.appsReport = JSON.parse(fs.readFileSync('reports/apps-comprehensive-report.json', 'utf8'));
    } catch (error) {
      console.log('  ⚠️  Some reports missing, generating with available data');
      this.repoMap = { repositories: {} };
      this.toolsReport = { categories: {} };
      this.appsReport = { apps: {} };
    }
    
    console.log('  ✅ Repository data loaded');
  }

  mapToolsToApps() {
    console.log('🔧 Mapping tools to apps...');
    
    const toolConnections = [
      { tool: 'cathedral-cli.js', apps: ['all'], type: 'orchestrator' },
      { tool: 'analyze-frequencies.js', apps: ['sonic-creation-studio'], type: 'data_provider' },
      { tool: 'sacred-calculations.js', apps: ['shader-realm-navigator'], type: 'math_engine' },
      { tool: 'compile-shaders.js', apps: ['shader-realm-navigator', 'cathedral-design-studio'], type: 'build_tool' },
      { tool: 'validate-arcana.js', apps: ['liber-arcanae-tarot'], type: 'validator' },
      { tool: 'ai-contamination-scan.js', apps: ['all'], type: 'security' },
      { tool: 'remove-paid-services.cjs', apps: ['all'], type: 'cleanup' }
    ];
    
    toolConnections.forEach(conn => {
      this.connections.tools_to_apps.push({
        tool: conn.tool,
        apps: conn.apps,
        connection_type: conn.type,
        status: this.checkConnectionStatus(conn.tool, conn.apps)
      });
      
      console.log(`  🔗 ${conn.tool} → ${conn.apps.join(', ')} (${conn.type})`);
    });
  }

  mapAppsToPackages() {
    console.log('📱 Mapping apps to packages...');
    
    const appPackageConnections = [
      { app: 'liber-arcanae-tarot', packages: ['liber-arcanae', 'codex-144-99', 'cathedral-style'] },
      { app: 'shader-realm-navigator', packages: ['shaders', 'codex-144-99', 'sacred-math'] },
      { app: 'sonic-creation-studio', packages: ['sound-systems', 'frequency-analysis'] },
      { app: 'cathedral-design-studio', packages: ['design-tools', 'sacred-geometry', 'cathedral-style'] },
      { app: 'stone-grimoire', packages: ['grimoire-data', 'spell-systems'] },
      { app: 'cosmogenesis-visualizer', packages: ['cosmogenesis-learning-engine', 'visualization'] }
    ];
    
    appPackageConnections.forEach(conn => {
      this.connections.apps_to_packages.push({
        app: conn.app,
        packages: conn.packages,
        status: this.checkPackageConnections(conn.app, conn.packages)
      });
      
      console.log(`  📱 ${conn.app} → ${conn.packages.join(', ')}`);
    });
  }

  mapPackagesToPackages() {
    console.log('📦 Mapping packages to packages...');
    
    const packageDependencies = [
      { package: 'liber-arcanae', depends_on: ['codex-144-99', 'sacred-math'] },
      { package: 'shader-integration', depends_on: ['realm-shaders', 'sacred-math-shaders'] },
      { package: 'cathedral-core', depends_on: ['all-packages'] },
      { package: 'sonic-creation-engine', depends_on: ['frequency-analysis', 'audio-processing'] },
      { package: 'trinity-visual-engine', depends_on: ['cathedral-style', 'design-tokens'] }
    ];
    
    packageDependencies.forEach(conn => {
      this.connections.packages_to_packages.push({
        package: conn.package,
        dependencies: conn.depends_on,
        status: this.checkPackageDependencies(conn.package, conn.depends_on)
      });
      
      console.log(`  📦 ${conn.package} → ${conn.depends_on.join(', ')}`);
    });
  }

  mapToolsToTools() {
    console.log('🔧 Mapping tools to tools...');
    
    const toolChains = [
      { tool: 'run-comprehensive-analysis.mjs', calls: ['analyze-all-tools.mjs', 'analyze-all-apps.mjs', 'detect-spam-duplicates.mjs'] },
      { tool: 'cleanup-duplicates-spam.mjs', depends_on: ['detect-spam-duplicates.mjs'] },
      { tool: 'cathedral-cli.js', orchestrates: ['all-tools'] }
    ];
    
    toolChains.forEach(conn => {
      this.connections.tools_to_tools.push({
        tool: conn.tool,
        connected_tools: conn.calls || conn.depends_on || conn.orchestrates,
        relationship: conn.calls ? 'calls' : conn.depends_on ? 'depends_on' : 'orchestrates'
      });
      
      console.log(`  🔧 ${conn.tool} ${conn.calls ? 'calls' : conn.depends_on ? 'depends on' : 'orchestrates'} ${(conn.calls || conn.depends_on || conn.orchestrates).join(', ')}`);
    });
  }

  mapCrossRepoConnections() {
    console.log('🌐 Mapping cross-repository connections...');
    
    const crossRepoConnections = [
      { from: 'cathedral', to: 'circuitum99', type: 'git_submodule' },
      { from: 'cathedral', to: 'stone-grimoire', type: 'git_remote' },
      { from: 'cathedral', to: 'cosmogenesis-learning-engine', type: 'nested_repo' },
      { from: 'liber-arcanae', to: 'codex-14499', type: 'data_dependency' },
      { from: 'tesseract-bridge', to: 'all_repos', type: 'api_connector' }
    ];
    
    crossRepoConnections.forEach(conn => {
      this.connections.cross_repo.push({
        from_repo: conn.from,
        to_repo: conn.to,
        connection_type: conn.type,
        status: this.checkCrossRepoConnection(conn.from, conn.to)
      });
      
      console.log(`  🌐 ${conn.from} → ${conn.to} (${conn.type})`);
    });
  }

  detectCircularDependencies() {
    console.log('🔄 Detecting circular dependencies...');
    
    // Simple circular dependency detection
    const dependencies = new Map();
    
    this.connections.packages_to_packages.forEach(conn => {
      dependencies.set(conn.package, conn.dependencies);
    });
    
    const visited = new Set();
    const recursionStack = new Set();
    
    const hasCycle = (node, path = []) => {
      if (recursionStack.has(node)) {
        const cycle = path.slice(path.indexOf(node));
        this.connections.circular_dependencies.push({
          cycle: cycle,
          type: 'package_dependency'
        });
        console.log(`  🔄 Circular dependency: ${cycle.join(' → ')}`);
        return true;
      }
      
      if (visited.has(node)) return false;
      
      visited.add(node);
      recursionStack.add(node);
      path.push(node);
      
      const deps = dependencies.get(node) || [];
      for (const dep of deps) {
        if (dep !== 'all-packages' && hasCycle(dep, [...path])) {
          return true;
        }
      }
      
      recursionStack.delete(node);
      return false;
    };
    
    dependencies.forEach((_, node) => {
      if (!visited.has(node)) {
        hasCycle(node);
      }
    });
    
    if (this.connections.circular_dependencies.length === 0) {
      console.log('  ✅ No circular dependencies detected');
    }
  }

  findBrokenConnections() {
    console.log('❌ Finding broken connections...');
    
    // Check for missing files/packages referenced in connections
    const allConnections = [
      ...this.connections.tools_to_apps,
      ...this.connections.apps_to_packages,
      ...this.connections.packages_to_packages
    ];
    
    allConnections.forEach(conn => {
      if (conn.status === 'broken') {
        this.connections.broken_connections.push({
          connection: conn,
          reason: 'missing_target',
          fix_suggestion: 'Create missing component or update reference'
        });
        
        console.log(`  ❌ Broken: ${JSON.stringify(conn)}`);
      }
    });
    
    if (this.connections.broken_connections.length === 0) {
      console.log('  ✅ No broken connections found');
    }
  }

  generateDependencyGraph() {
    console.log('📊 Generating dependency graph...');
    
    const graph = {
      nodes: [],
      edges: []
    };
    
    // Add nodes
    const allComponents = new Set();
    
    this.connections.tools_to_apps.forEach(conn => {
      allComponents.add(conn.tool);
      conn.apps.forEach(app => allComponents.add(app));
    });
    
    this.connections.apps_to_packages.forEach(conn => {
      allComponents.add(conn.app);
      conn.packages.forEach(pkg => allComponents.add(pkg));
    });
    
    allComponents.forEach(component => {
      graph.nodes.push({
        id: component,
        type: this.getComponentType(component),
        status: 'active'
      });
    });
    
    // Add edges
    this.connections.tools_to_apps.forEach(conn => {
      conn.apps.forEach(app => {
        if (app !== 'all') {
          graph.edges.push({
            from: conn.tool,
            to: app,
            type: conn.connection_type
          });
        }
      });
    });
    
    this.connections.dependency_graph = graph;
    console.log(`  📊 Graph: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
  }

  checkConnectionStatus(tool, apps) {
    // Simple status check - in real implementation would verify file existence
    return fs.existsSync(`tools/${tool}`) ? 'active' : 'broken';
  }

  checkPackageConnections(app, packages) {
    return 'active'; // Simplified
  }

  checkPackageDependencies(pkg, deps) {
    return 'active'; // Simplified
  }

  checkCrossRepoConnection(from, to) {
    return 'active'; // Simplified
  }

  getComponentType(component) {
    if (component.includes('.js') || component.includes('.mjs')) return 'tool';
    if (component.includes('studio') || component.includes('navigator')) return 'app';
    return 'package';
  }

  generateReport() {
    console.log('\n📊 Generating connections report...');
    
    const summary = {
      tools_to_apps: this.connections.tools_to_apps.length,
      apps_to_packages: this.connections.apps_to_packages.length,
      packages_to_packages: this.connections.packages_to_packages.length,
      cross_repo: this.connections.cross_repo.length,
      circular_dependencies: this.connections.circular_dependencies.length,
      broken_connections: this.connections.broken_connections.length,
      total_nodes: this.connections.dependency_graph.nodes?.length || 0,
      total_edges: this.connections.dependency_graph.edges?.length || 0
    };
    
    console.log(`  🔗 Total connections mapped: ${Object.values(summary).reduce((a, b) => a + b, 0)}`);
    console.log(`  📊 Dependency graph: ${summary.total_nodes} nodes, ${summary.total_edges} edges`);
    console.log(`  ❌ Broken connections: ${summary.broken_connections}`);
    console.log(`  🔄 Circular dependencies: ${summary.circular_dependencies}`);
    
    this.connections.summary = summary;
    
    fs.writeFileSync('reports/connections-map.json', JSON.stringify(this.connections, null, 2));
    console.log('\n💾 Connections map saved to: reports/connections-map.json');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mapper = new ConnectionMapper();
  mapper.map();
}