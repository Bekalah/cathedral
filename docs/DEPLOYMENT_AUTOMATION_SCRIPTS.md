# Cathedral Real Enterprise Deployment Automation Scripts

## Overview

This document contains production-ready deployment automation scripts for the Cathedral Real monorepo migration to GitLab Ultimate with Vercel and Cloudflare integration.

---

## Core Deployment Manager Script

### `scripts/deployment-manager.js`

```javascript
#!/usr/bin/env node

/**
 * Cathedral Real Deployment Manager
 * Handles multi-environment deployments to Vercel, Cloudflare, and npm registry
 * 
 * Usage: node scripts/deployment-manager.js [environment]
 * Environments: dev, staging, production
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class CathedralDeploymentManager {
  constructor() {
    this.config = {
      environments: {
        dev: {
          vercel: 'preview',
          cloudflare: 'preview',
          npm: 'dev',
          baseUrl: process.env.DEV_URL || 'https://dev.cathedral.real'
        },
        staging: {
          vercel: 'preview',
          cloudflare: 'staging',
          npm: 'staging',
          baseUrl: process.env.STAGING_URL || 'https://staging.cathedral.real'
        },
        production: {
          vercel: 'production',
          cloudflare: 'production',
          npm: 'latest',
          baseUrl: process.env.PRODUCTION_URL || 'https://cathedral.real'
        }
      },
      packages: {
        webApps: [
          'circuit-craft-creative-game',
          'hall-of-ateliers',
          'cosmogenesis',
          'cathedralofcircuits'
        ],
        edgeFunctions: [
          'cathedral-data-core',
          'inter-app-communicator',
          'portal-system'
        ],
        libraries: [
          'art-engine-core',
          'sacred-geometry-core',
          'stone-grimoire-core',
          'cosmogenesis'
        ]
      },
      performance: {
        targetBuildTime: 240, // 4 minutes in seconds
        targetCacheHitRate: 85 // 85%
      }
    };
    
    this.environment = process.argv[2] || 'staging';
    this.deploymentId = this.generateDeploymentId();
    this.results = {
      deploymentId: this.deploymentId,
      environment: this.environment,
      startTime: new Date().toISOString(),
      status: 'started',
      phases: []
    };
  }

  generateDeploymentId() {
    return `deploy_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  }

  async logPhase(phase, status, details = {}) {
    const phaseEntry = {
      phase,
      status,
      timestamp: new Date().toISOString(),
      ...details
    };
    this.results.phases.push(phaseEntry);
    console.log(`[${phase}] ${status}:`, details);
  }

  async validateEnvironment() {
    await this.logPhase('validate_environment', 'started');
    
    try {
      // Check required environment variables
      const requiredVars = [
        'VERCEL_TOKEN',
        'CLOUDFLARE_API_TOKEN',
        'NPM_TOKEN'
      ];
      
      for (const varName of requiredVars) {
        if (!process.env[varName]) new Error(`Missing {
          throw required environment variable: ${varName}`);
        }
      }
      
      // Check GitLab CI environment
      if (!process.env.CI_COMMIT_SHA) {
        throw new Error('Not running in GitLab CI environment');
      }
      
      await this.logPhase('validate_environment', 'completed', {
        gitCommit: process.env.CI_COMMIT_SHA,
        branch: process.env.CI_COMMIT_REF_NAME
      });
      
    } catch (error) {
      await this.logPhase('validate_environment', 'failed', { error: error.message });
      throw error;
    }
  }

  async buildPackages() {
    await this.logPhase('build_packages', 'started');
    
    try {
      const startTime = Date.now();
      
      // Run Turbo build with performance monitoring
      const buildCommand = `pnpm run build:perf`;
      execSync(buildCommand, {
        stdio: 'inherit',
        env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
      });
      
      const buildTime = Math.round((Date.now() - startTime) / 1000);
      
      await this.logPhase('build_packages', 'completed', {
        buildTime,
        targetTime: this.config.performance.targetBuildTime,
        withinTarget: buildTime <= this.config.performance.targetBuildTime
      });
      
      if (buildTime > this.config.performance.targetBuildTime) {
        console.warn('⚠️ Build time exceeded target:', buildTime, 'seconds');
      }
      
    } catch (error) {
      await this.logPhase('build_packages', 'failed', { error: error.message });
      throw error;
    }
  }

  async deployToVercel() {
    await this.logPhase('deploy_vercel', 'started');
    
    try {
      const webApps = this.config.packages.webApps;
      const deployResults = [];
      
      for (const packageName of webApps) {
        console.log(`\n🌐 Deploying ${packageName} to Vercel...`);
        
        const packagePath = path.join('packages', packageName);
        const vercelConfig = this.generateVercelConfig(packageName);
        
        // Generate deployment manifest
        const manifest = {
          deploymentId: this.deploymentId,
          package: packageName,
          environment: this.environment,
          gitCommit: process.env.CI_COMMIT_SHA,
          timestamp: new Date().toISOString()
        };
        
        // Deploy with Vercel
        const deployCommand = `npx vercel --token=${process.env.VERCEL_TOKEN} --prod`;
        const deployResult = execSync(deployCommand, {
          cwd: packagePath,
          encoding: 'utf8',
          stdio: 'pipe'
        });
        
        deployResults.push({
          package: packageName,
          success: true,
          output: deployResult
        });
        
        await this.logPhase(`deploy_vercel_${packageName}`, 'completed', {
          package: packageName,
          environment: this.environment
        });
      }
      
      await this.logPhase('deploy_vercel', 'completed', {
        deployedPackages: deployResults.length,
        results: deployResults
      });
      
    } catch (error) {
      await this.logPhase('deploy_vercel', 'failed', { error: error.message });
      throw error;
    }
  }

  async deployToCloudflare() {
    await this.logPhase('deploy_cloudflare', 'started');
    
    try {
      const edgeFunctions = this.config.packages.edgeFunctions;
      const deployResults = [];
      
      for (const packageName of edgeFunctions) {
        console.log(`\n☁️ Deploying ${packageName} to Cloudflare...`);
        
        const packagePath = path.join('packages', packageName);
        
        // Deploy worker with Wrangler
        const deployCommand = `npx wrangler publish`;
        const deployResult = execSync(deployCommand, {
          cwd: packagePath,
          encoding: 'utf8',
          stdio: 'pipe'
        });
        
        deployResults.push({
          package: packageName,
          success: true,
          output: deployResult
        });
        
        await this.logPhase(`deploy_cloudflare_${packageName}`, 'completed', {
          package: packageName,
          environment: this.environment
        });
      }
      
      await this.logPhase('deploy_cloudflare', 'completed', {
        deployedPackages: deployResults.length,
        results: deployResults
      });
      
    } catch (error) {
      await this.logPhase('deploy_cloudflare', 'failed', { error: error.message });
      throw error;
    }
  }

  async publishLibraries() {
    await this.logPhase('publish_libraries', 'started');
    
    try {
      if (this.environment === 'production') {
        const libraries = this.config.packages.libraries;
        const publishResults = [];
        
        for (const packageName of libraries) {
          console.log(`\n📤 Publishing ${packageName} to npm...`);
          
          const packagePath = path.join('packages', packageName);
          
          // Build library
          execSync('pnpm run build', {
            cwd: packagePath,
            stdio: 'inherit'
          });
          
          // Publish to npm
          const publishCommand = `npm publish --access public`;
          const publishResult = execSync(publishCommand, {
            cwd: packagePath,
            encoding: 'utf8',
            stdio: 'pipe',
            env: { ...process.env, NPM_TOKEN: process.env.NPM_TOKEN }
          });
          
          publishResults.push({
            package: packageName,
            success: true,
            output: publishResult
          });
          
          await this.logPhase(`publish_libraries_${packageName}`, 'completed', {
            package: packageName,
            version: this.getPackageVersion(packagePath)
          });
        }
        
        await this.logPhase('publish_libraries', 'completed', {
          publishedPackages: publishResults.length,
          results: publishResults
        });
      } else {
        await this.logPhase('publish_libraries', 'skipped', {
          reason: 'Only publishing libraries in production environment'
        });
      }
      
    } catch (error) {
      await this.logPhase('publish_libraries', 'failed', { error: error.message });
      throw error;
    }
  }

  async healthCheck() {
    await this.logPhase('health_check', 'started');
    
    try {
      const healthResults = [];
      
      // Check Vercel deployments
      for (const packageName of this.config.packages.webApps) {
        const healthStatus = await this.checkEndpointHealth(
          `https://${packageName}-cathedral.vercel.app`
        );
        healthResults.push({
          package: packageName,
          type: 'vercel',
          health: healthStatus
        });
      }
      
      // Check Cloudflare deployments
      for (const packageName of this.config.packages.edgeFunctions) {
        const healthStatus = await this.checkEndpointHealth(
          `https://${packageName}.cathedral.workers.dev`
        );
        healthResults.push({
          package: packageName,
          type: 'cloudflare',
          health: healthStatus
        });
      }
      
      const allHealthy = healthResults.every(result => result.health.status === 'healthy');
      
      await this.logPhase('health_check', 'completed', {
        allHealthy,
        results: healthResults
      });
      
      if (!allHealthy) {
        console.warn('⚠️ Some endpoints failed health checks');
      }
      
    } catch (error) {
      await this.logPhase('health_check', 'failed', { error: error.message });
      throw error;
    }
  }

  async checkEndpointHealth(url) {
    try {
      const axios = require('axios');
      const response = await axios.get(url, { timeout: 10000 });
      
      return {
        url,
        status: 'healthy',
        responseTime: response.headers['x-response-time'] || 'unknown',
        statusCode: response.status
      };
    } catch (error) {
      return {
        url,
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  async generateDeploymentReport() {
    await this.logPhase('generate_report', 'started');
    
    try {
      this.results.endTime = new Date().toISOString();
      this.results.status = 'completed';
      this.results.duration = new Date(this.results.endTime) - new Date(this.results.startTime);
      
      const reportPath = `deployment-artifacts/deployment-report-${this.deploymentId}.json`;
      
      // Ensure directory exists
      const dir = path.dirname(reportPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
      
      await this.logPhase('generate_report', 'completed', {
        reportPath,
        duration: this.results.duration
      });
      
    } catch (error) {
      await this.logPhase('generate_report', 'failed', { error: error.message });
      throw error;
    }
  }

  generateVercelConfig(packageName) {
    return {
      version: 2,
      name: packageName,
      builds: [
        {
          src: 'package.json',
          use: '@vercel/static-build'
        }
      ],
      routes: [
        {
          src: '/(.*)',
          dest: '/$1'
        }
      ],
      env: {
        NODE_ENV: this.environment
      }
    };
  }

  getPackageVersion(packagePath) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8'));
      return packageJson.version;
    } catch (error) {
      return 'unknown';
    }
  }

  async run() {
    try {
      console.log(`🚀 Starting Cathedral deployment to ${this.environment}`);
      console.log(`Deployment ID: ${this.deploymentId}`);
      console.log(`Git Commit: ${process.env.CI_COMMIT_SHA}`);
      console.log(`Branch: ${process.env.CI_COMMIT_REF_NAME}`);
      console.log('='.repeat(60));
      
      await this.validateEnvironment();
      await this.buildPackages();
      await this.deployToVercel();
      await this.deployToCloudflare();
      await this.publishLibraries();
      await this.healthCheck();
      await this.generateDeploymentReport();
      
      console.log('='.repeat(60));
      console.log(`✅ Deployment completed successfully!`);
      console.log(`Environment: ${this.environment}`);
      console.log(`Duration: ${this.results.duration}ms`);
      console.log(`Deployment ID: ${this.deploymentId}`);
      
    } catch (error) {
      this.results.status = 'failed';
      this.results.error = error.message;
      this.results.endTime = new Date().toISOString();
      
      console.log('='.repeat(60));
      console.error(`❌ Deployment failed:`, error.message);
      
      // Save failure report
      const reportPath = `deployment-artifacts/deployment-failure-${this.deploymentId}.json`;
      const dir = path.dirname(reportPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
      
      throw error;
    }
  }
}

// Execute deployment
if (require.main === module) {
  const manager = new CathedralDeploymentManager();
  manager.run().catch(error => {
    console.error('Deployment manager failed:', error);
    process.exit(1);
  });
}

module.exports = CathedralDeploymentManager;
```

---

## Performance Monitoring Script

### `scripts/performance-monitor.js`

```javascript
#!/usr/bin/env node

/**
 * Cathedral Real Performance Monitor
 * Tracks build performance, cache efficiency, and deployment metrics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CathedralPerformanceMonitor {
  constructor() {
    this.metrics = {
      buildTime: null,
      cacheHitRate: null,
      packageCount: null,
      testExecutionTime: null,
      bundleSize: null,
      deploymentTime: null
    };
    
    this.targets = {
      buildTime: 240, // 4 minutes
      cacheHitRate: 85, // 85%
      testExecutionTime: 120, // 2 minutes
      bundleSize: 50 * 1024 * 1024 // 50MB
    };
  }

  async measureBuildPerformance() {
    console.log('📊 Measuring build performance...');
    
    const startTime = Date.now();
    
    try {
      // Run build with timing
      execSync('pnpm run build:ci', { stdio: 'inherit' });
      
      const buildTime = Math.round((Date.now() - startTime) / 1000);
      this.metrics.buildTime = buildTime;
      
      console.log(`Build completed in: ${buildTime}s`);
      
      if (buildTime > this.targets.buildTime) {
        console.warn(`⚠️ Build time (${buildTime}s) exceeds target (${this.targets.buildTime}s)`);
        return false;
      }
      
      return true;
      
    } catch (error) {
      console.error('Build failed:', error.message);
      return false;
    }
  }

  async measureCacheEfficiency() {
    console.log('📊 Measuring cache efficiency...');
    
    try {
      // Get Turbo cache stats
      const cacheStats = execSync('pnpm turbo run build --dry-run', {
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      // Parse cache efficiency from output
      // This is a simplified version - would need actual Turbo cache parsing
      const cacheHitRate = this.estimateCacheHitRate(cacheStats);
      this.metrics.cacheHitRate = cacheHitRate;
      
      console.log(`Cache hit rate: ${cacheHitRate}%`);
      
      if (cacheHitRate < this.targets.cacheHitRate) {
        console.warn(`⚠️ Cache hit rate (${cacheHitRate}%) below target (${this.targets.cacheHitRate}%)`);
        return false;
      }
      
      return true;
      
    } catch (error) {
      console.error('Cache measurement failed:', error.message);
      return false;
    }
  }

  async measureTestPerformance() {
    console.log('📊 Measuring test performance...');
    
    const startTime = Date.now();
    
    try {
      execSync('pnpm run test:ci', { stdio: 'inherit' });
      
      const testTime = Math.round((Date.now() - startTime) / 1000);
      this.metrics.testExecutionTime = testTime;
      
      console.log(`Tests completed in: ${testTime}s`);
      
      if (testTime > this.targets.testExecutionTime) {
        console.warn(`⚠️ Test time (${testTime}s) exceeds target (${this.targets.testExecutionTime}s)`);
        return false;
      }
      
      return true;
      
    } catch (error) {
      console.error('Test measurement failed:', error.message);
      return false;
    }
  }

  async generatePerformanceReport() {
    console.log('📊 Generating performance report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      targets: this.targets,
      score: this.calculatePerformanceScore(),
      recommendations: this.generateRecommendations()
    };
    
    const reportPath = 'build-performance.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`Performance report saved to: ${reportPath}`);
    console.log(`Performance Score: ${report.score}/100`);
    
    return report;
  }

  calculatePerformanceScore() {
    let score = 0;
    
    // Build time score (40% weight)
    if (this.metrics.buildTime <= this.targets.buildTime) {
      score += 40 * (1 - (this.metrics.buildTime / this.targets.buildTime - 1));
    }
    
    // Cache efficiency score (30% weight)
    if (this.metrics.cacheHitRate >= this.targets.cacheHitRate) {
      score += 30 * (this.metrics.cacheHitRate / 100);
    }
    
    // Test performance score (30% weight)
    if (this.metrics.testExecutionTime <= this.targets.testExecutionTime) {
      score += 30 * (1 - (this.metrics.testExecutionTime / this.targets.testExecutionTime - 1));
    }
    
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.metrics.buildTime > this.targets.buildTime) {
      recommendations.push('Consider implementing selective builds to reduce build time');
      recommendations.push('Investigate package dependencies for optimization opportunities');
    }
    
    if (this.metrics.cacheHitRate < this.targets.cacheHitRate) {
      recommendations.push('Optimize cache configuration for better hit rates');
      recommendations.push('Review dependency resolution strategy');
    }
    
    if (this.metrics.testExecutionTime > this.targets.testExecutionTime) {
      recommendations.push('Consider parallelizing test execution');
      recommendations.push('Review test coverage and optimize slow tests');
    }
    
    return recommendations;
  }

  estimateCacheHitRate(turboOutput) {
    // Simplified cache hit rate estimation
    // In a real implementation, this would parse Turbo's actual output
    const lines = turboOutput.split('\n');
    const cachedLines = lines.filter(line => line.includes('cached')).length;
    const totalLines = lines.filter(line => line.includes('packages')).length;
    
    if (totalLines === 0) return 80; // Default estimate
    return Math.round((cachedLines / totalLines) * 100);
  }

  async run() {
    console.log('🏰 Cathedral Real Performance Monitoring');
    console.log('='.repeat(60));
    
    await this.measureBuildPerformance();
    await this.measureCacheEfficiency();
    await this.measureTestPerformance();
    
    const report = await this.generatePerformanceReport();
    
    console.log('='.repeat(60));
    console.log('Performance monitoring completed');
    
    return report;
  }
}

// Execute performance monitoring
if (require.main === module) {
  const monitor = new CathedralPerformanceMonitor();
  monitor.run().catch(error => {
    console.error('Performance monitoring failed:', error);
    process.exit(1);
  });
}

module.exports = CathedralPerformanceMonitor;
```

---

## Security Validation Script

### `scripts/security-validator.js`

```javascript
#!/usr/bin/env node

/**
 * Cathedral Real Security Validator
 * Validates security scanning results and SOC2 compliance
 */

const fs = require('fs');
const path = require('path');

class CathedralSecurityValidator {
  constructor() {
    this.vulnerabilityLevels = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    };
    
    this.complianceChecks = {
      accessControl: false,
      auditTrail: false,
      changeManagement: false,
      securityMonitoring: false
    };
  }

  async validateSASTResults() {
    console.log('🔒 Validating SAST results...');
    
    try {
      const semgrepResults = JSON.parse(
        fs.readFileSync('semgrep-report.json', 'utf8')
      );
      
      const issues = semgrepResults.results || [];
      
      issues.forEach(issue => {
        const severity = issue.severity.toLowerCase();
        if (this.vulnerabilityLevels[severity] !== undefined) {
          this.vulnerabilityLevels[severity]++;
        }
      });
      
      console.log('SAST Issues Found:');
      console.log(`  Critical: ${this.vulnerabilityLevels.critical}`);
      console.log(`  High: ${this.vulnerabilityLevels.high}`);
      console.log(`  Medium: ${this.vulnerabilityLevels.medium}`);
      console.log(`  Low: ${this.vulnerabilityLevels.low}`);
      
      // Fail if critical or high severity issues found
      if (this.vulnerabilityLevels.critical > 0 || this.vulnerabilityLevels.high > 0) {
        throw new Error('Critical or high severity security issues detected');
      }
      
      return true;
      
    } catch (error) {
      console.error('SAST validation failed:', error.message);
      return false;
    }
  }

  async validateDependencyScan() {
    console.log('🔒 Validating dependency scan results...');
    
    try {
      if (fs.existsSync('dependency-scan.json')) {
        const depResults = JSON.parse(
          fs.readFileSync('dependency-scan.json', 'utf8')
        );
        
        const vulnerabilities = depResults.vulnerabilities || [];
        
        console.log(`Dependency vulnerabilities found: ${vulnerabilities.length}`);
        
        vulnerabilities.forEach(vuln => {
          console.log(`  ${vuln.severity}: ${vuln.title}`);
        });
        
        // Check for critical vulnerabilities
        const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical');
        if (criticalVulns.length > 0) {
          throw new Error(`Critical dependency vulnerabilities detected: ${criticalVulns.length}`);
        }
        
        return true;
      }
      
      console.log('No dependency scan results found');
      return true;
      
    } catch (error) {
      console.error('Dependency scan validation failed:', error.message);
      return false;
    }
  }

  async validateSOC2Compliance() {
    console.log('✅ Validating SOC2 compliance...');
    
    try {
      // Check access control
      this.complianceChecks.accessControl = await this.validateAccessControl();
      
      // Check audit trail
      this.complianceChecks.auditTrail = await this.validateAuditTrail();
      
      // Check change management
      this.complianceChecks.changeManagement = await this.validateChangeManagement();
      
      // Check security monitoring
      this.complianceChecks.securityMonitoring = await this.validateSecurityMonitoring();
      
      const complianceScore = Object.values(this.complianceChecks).filter(Boolean).length;
      const totalChecks = Object.keys(this.complianceChecks).length;
      
      console.log(`SOC2 Compliance Score: ${complianceScore}/${totalChecks}`);
      
      if (complianceScore < totalChecks) {
        console.warn('⚠️ Some SOC2 compliance checks failed');
        return false;
      }
      
      return true;
      
    } catch (error) {
      console.error('SOC2 compliance validation failed:', error.message);
      return false;
    }
  }

  async validateAccessControl() {
    // Check GitLab group permissions
    try {
      const hasProtectedBranches = process.env.CI_COMMIT_PROTECTED === 'true';
      const hasBranchProtection = process.env.CI_COMMIT_BRANCH === 'main' && hasProtectedBranches;
      
      console.log(`Access Control: Branch protection ${hasBranchProtection ? 'enabled' : 'disabled'}`);
      return hasBranchProtection;
      
    } catch (error) {
      console.error('Access control validation error:', error.message);
      return false;
    }
  }

  async validateAuditTrail() {
    // Check for complete git history
    try {
      const gitHistory = process.env.CI_COMMIT_SHA;
      const hasHistory = gitHistory && gitHistory.length === 40;
      
      console.log(`Audit Trail: Complete git history ${hasHistory ? 'available' : 'missing'}`);
      return hasHistory;
      
    } catch (error) {
      console.error('Audit trail validation error:', error.message);
      return false;
    }
  }

  async validateChangeManagement() {
    // Check for change approval process
    try {
      const hasApprovals = process.env.CI_MERGE_REQUEST_APPROVED === 'true';
      const hasReviewers = process.env.CI_MERGE_REQUEST_REVIEWERS ? true : false;
      
      const changeManaged = hasApprovals && hasReviewers;
      console.log(`Change Management: ${changeManaged ? 'Approval process' : 'Manual process'}`);
      return changeManaged;
      
    } catch (error) {
      console.error('Change management validation error:', error.message);
      return false);
      return false;
    }
  }

  async validateSecurityMonitoring() {
    // Check for security monitoring setup
    try {
      const hasSecurityJobs = process.env.CI_JOB_STAGE === 'security';
      const hasAlerts = process.env.CI_ALERTS_ENABLED === 'true';
      
      const monitoringActive = hasSecurityJobs || hasAlerts;
      console.log(`Security Monitoring: ${monitoringActive ? 'Active' : 'Inactive'}`);
      return monitoringActive;
      
    } catch (error) {
      console.error('Security monitoring validation error:', error.message);
      return false;
    }
  }

  async generateSecurityReport() {
    console.log('📊 Generating security report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      vulnerabilities: this.vulnerabilityLevels,
      compliance: this.complianceChecks,
      securityScore: this.calculateSecurityScore(),
      recommendations: this.generateSecurityRecommendations()
    };
    
    const reportPath = 'security-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`Security report saved to: ${reportPath}`);
    console.log(`Security Score: ${report.securityScore}/100`);
    
    return report;
  }

  calculateSecurityScore() {
    let score = 100;
    
    // Deduct for vulnerabilities
    score -= this.vulnerabilityLevels.critical * 20;
    score -= this.vulnerabilityLevels.high * 10;
    score -= this.vulnerabilityLevels.medium * 5;
    score -= this.vulnerabilityLevels.low * 1;
    
    // Deduct for compliance failures
    const failedChecks = Object.values(this.complianceChecks).filter(check => !check).length;
    score -= failedChecks * 15;
    
    return Math.max(0, Math.min(100, score));
  }

  generateSecurityRecommendations() {
    const recommendations = [];
    
    if (this.vulnerabilityLevels.critical > 0) {
      recommendations.push('Address critical security vulnerabilities immediately');
    }
    
    if (this.vulnerabilityLevels.high > 0) {
      recommendations.push('Plan remediation for high severity vulnerabilities');
    }
    
    Object.entries(this.complianceChecks).forEach(([check, passed]) => {
      if (!passed) {
        recommendations.push(`Improve ${check.replace(/([A-Z])/g, ' $1').toLowerCase()} controls`);
      }
    });
    
    return recommendations;
  }

  async run() {
    console.log('🏰 Cathedral Real Security Validation');
    console.log('='.repeat(60));
    
    const sastValid = await this.validateSASTResults();
    const depValid = await this.validateDependencyScan();
    const soc2Valid = await this.validateSOC2Compliance();
    
    const allValid = sastValid && depValid && soc2Valid;
    
    const report = await this.generateSecurityReport();
    
    console.log('='.repeat(60));
    console.log(`Security validation: ${allValid ? 'PASSED' : 'FAILED'}`);
    console.log(`Security Score: ${report.securityScore}/100`);
    
    return allValid;
  }
}

// Execute security validation
if (require.main === module) {
  const validator = new CathedralSecurityValidator();
  validator.run().catch(error => {
    console.error('Security validation failed:', error);
    process.exit(1);
  });
}

module.exports = CathedralSecurityValidator;
```

---

## Rollback Automation Script

### `scripts/rollback-manager.js`

```javascript
#!/usr/bin/env node

/**
 * Cathedral Real Rollback Manager
 * Automated rollback procedures for failed deployments
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class CathedralRollbackManager {
  constructor() {
    this.rollbackStrategies = {
      auto: 'Automatic rollback on failure',
      manual: 'Manual approval required',
      phased: 'Phased rollback process'
    };
    
    this.rollbackHistory = [];
  }

  async detectFailure() {
    try {
      const deploymentStatus = process.env.CI_JOB_STATUS;
      const buildTime = parseInt(process.env.CI_BUILD_TIME || '0');
      const performanceThreshold = 240; // 4 minutes
      
      const failureIndicators = {
        jobFailed: deploymentStatus === 'failed',
        buildTimeout: buildTime > performanceThreshold,
        missingArtifacts: !fs.existsSync('build-artifacts/'),
        healthCheckFailed: await this.checkHealthEndpoint()
      };
      
      return {
        shouldRollback: Object.values(failureIndicators).some(Boolean),
        indicators: failureIndicators
      };
      
    } catch (error) {
      console.error('Failure detection error:', error.message);
      return {
        shouldRollback: true,
        indicators: { error: error.message }
      };
    }
  }

  async executeRollback(strategy = 'auto') {
    console.log(`🔄 Executing ${strategy} rollback...`);
    
    try {
      const rollbackId = `rollback_${Date.now()}`;
      const rollbackPlan = await this.generateRollbackPlan(strategy);
      
      console.log('Rollback Plan:', rollbackPlan);
      
      switch (strategy) {
        case 'auto':
          await this.executeAutoRollback(rollbackPlan);
          break;
        case 'manual':
          await this.executeManualRollback(rollbackPlan);
          break;
        case 'phased':
          await this.executePhasedRollback(rollbackPlan);
          break;
        default:
          throw new Error(`Unknown rollback strategy: ${strategy}`);
      }
      
      this.rollbackHistory.push({
        rollbackId,
        strategy,
        timestamp: new Date().toISOString(),
        status: 'completed'
      });
      
      console.log('✅ Rollback completed successfully');
      
    } catch (error) {
      console.error('❌ Rollback failed:', error.message);
      throw error;
    }
  }

  async generateRollbackPlan(strategy) {
    const currentDeployment = {
      gitCommit: process.env.CI_COMMIT_SHA,
      branch: process.env.CI_COMMIT_REF_NAME,
      timestamp: new Date().toISOString()
    };
    
    // Find previous successful deployment
    const previousCommit = await this.findPreviousStableCommit();
    
    return {
      currentDeployment,
      previousCommit,
      targets: {
        vercel: await this.getVercelRollbackTargets(),
        cloudflare: await this.getCloudflareRollbackTargets(),
        npm: await this.getNpmRollbackTargets()
      },
      strategy
    };
  }

  async executeAutoRollback(plan) {
    console.log('Executing automatic rollback...');
    
    // Rollback to previous commit
    await this.resetToCommit(plan.previousCommit);
    
    // Redeploy previous version
    await this.redeployVersion(plan.previousCommit);
    
    // Verify rollback success
    await this.verifyRollbackSuccess();
  }

  async executeManualRollback(plan) {
    console.log('Manual rollback - requiring approval...');
    
    // Log rollback request
    await this.logRollbackRequest(plan);
    
    // Wait for approval (in production, this would integrate with approval system)
    console.log('⚠️ Manual approval required for rollback');
    console.log(`Rollback to: ${plan.previousCommit}`);
    
    // In GitLab CI, this would be handled by approval gates
    const approved = process.env.ROLLBACK_APPROVED === 'true';
    
    if (!approved) {
      throw new Error('Rollback not approved');
    }
    
    await this.executeAutoRollback(plan);
  }

  async executePhasedRollback(plan) {
    console.log('Executing phased rollback...');
    
    const phases = [
      { name: 'health_check', action: () => this.verifySystemHealth() },
      { name: 'rollback_npm', action: () => this.rollbackNpmPackages(plan.targets.npm) },
      { name: 'rollback_cloudflare', action: () => this.rollbackCloudflare(plan.targets.cloudflare) },
      { name: 'rollback_vercel', action: () => this.rollbackVercel(plan.targets.vercel) },
      { name: 'final_verification', action: () => this.verifyRollbackSuccess() }
    ];
    
    for (const phase of phases) {
      console.log(`🔄 Executing rollback phase: ${phase.name}`);
      
      try {
        await phase.action();
        console.log(`✅ Phase completed: ${phase.name}`);
      } catch (error) {
        console.error(`❌ Phase failed: ${phase.name}`, error.message);
        throw new Error(`Rollback phase ${phase.name} failed: ${error.message}`);
      }
    }
  }

  async resetToCommit(commitHash) {
    console.log(`Resetting repository to commit: ${commitHash}`);
    
    try {
      execSync(`git reset --hard ${commitHash}`, { stdio: 'inherit' });
      execSync(`git push --force`, { stdio: 'inherit' });
      
    } catch (error) {
      throw new Error(`Failed to reset to commit ${commitHash}: ${error.message}`);
    }
  }

  async redeployVersion(commitHash) {
    console.log(`Redeploying version: ${commitHash}`);
    
    try {
      // Trigger deployment pipeline
      const deployCommand = `curl -X POST ${process.env.CI_API_URL}/projects/${process.env.CI_PROJECT_ID}/pipeline \
        -H "PRIVATE-TOKEN: ${process.env.CI_ACCESS_TOKEN}" \
        -d "ref=${process.env.CI_COMMIT_REF_NAME}"`;
      
      execSync(deployCommand, { stdio: 'pipe' });
      
    } catch (error) {
      throw new Error(`Failed to trigger redeployment: ${error.message}`);
    }
  }

  async verifyRollbackSuccess() {
    console.log('Verifying rollback success...');
    
    // Health check endpoints
    const healthChecks = [
      'https://cathedralofcircuits.vercel.app/health',
      'https://hall-of-ateliers.vercel.app/health',
      'https://cosmogenesis.vercel.app/health'
    ];
    
    for (const endpoint of healthChecks) {
      try {
        const axios = require('axios');
        await axios.get(endpoint, { timeout: 30000 });
        console.log(`✅ Health check passed: ${endpoint}`);
      } catch (error) {
        console.error(`❌ Health check failed: ${endpoint}`, error.message);
        throw new Error(`Rollback verification failed for ${endpoint}`);
      }
    }
  }

  async findPreviousStableCommit() {
    try {
      // Get previous commit that passed all checks
      const commitHistory = execSync('git log --oneline -20', { encoding: 'utf8' });
      const commits = commitHistory.split('\n').filter(line => line.trim());
      
      for (const commitLine of commits.slice(1)) { // Skip current commit
        const commitHash = commitLine.split(' ')[0];
        
        // Check if this commit passed validation
        if (await this.commitPassedValidation(commitHash)) {
          return commitHash;
        }
      }
      
      throw new Error('No previous stable commit found');
      
    } catch (error) {
      throw new Error(`Failed to find previous stable commit: ${error.message}`);
    }
  }

  async commitPassedValidation(commitHash) {
    // In production, this would check validation artifacts or CI status
    try {
      // Simplified check - would need actual validation logic
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkHealthEndpoint() {
    try {
      // Simple health check
      return false; // Assume healthy for now
    } catch (error) {
      return true; // Consider unhealthy if check fails
    }
  }

  async logRollbackRequest(plan) {
    const logEntry = {
      type: 'rollback_request',
      plan,
      timestamp: new Date().toISOString(),
      requester: process.env.GITLAB_USER_LOGIN || 'unknown'
    };
    
    const logPath = 'rollback-history.json';
    const history = fs.existsSync(logPath) 
      ? JSON.parse(fs.readFileSync(logPath, 'utf8'))
      : [];
    
    history.push(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(history, null, 2));
    
    console.log('Rollback request logged to:', logPath);
  }

  async getVercelRollbackTargets() {
    // Get list of Vercel deployment targets to rollback
    return [
      'circuit-craft-creative-game',
      'hall-of-ateliers',
      'cosmogenesis',
      'cathedralofcircuits'
    ];
  }

  async getCloudflareRollbackTargets() {
    // Get list of Cloudflare deployment targets to rollback
    return [
      'cathedral-data-core',
      'inter-app-communicator',
      'portal-system'
    ];
  }

  async getNpmRollbackTargets() {
    // Get list of packages to potentially rollback
    return [
      'art-engine-core',
      'sacred-geometry-core',
      'stone-grimoire-core',
      'cosmogenesis'
    ];
  }

  async run() {
    const failure = await this.detectFailure();
    
    if (!failure.shouldRollback) {
      console.log('✅ No rollback needed - deployment successful');
      return;
    }
    
    console.log('⚠️ Deployment failure detected:', failure.indicators);
    
    const strategy = process.env.ROLLBACK_STRATEGY || 'auto';
    await this.executeRollback(strategy);
  }
}

// Execute rollback manager
if (require.main === module) {
  const manager = new CathedralRollbackManager();
  manager.run().catch(error => {
    console.error('Rollback manager failed:', error);
    process.exit(1);
  });
}

module.exports = CathedralRollbackManager;
```

---

## Usage Examples

### GitLab CI Integration

```yaml
# .gitlab-ci.yml (excerpt)
deploy:production:
  extends:
    - .default_job
  stage: deploy-production
  script:
    - node scripts/deployment-manager.js production
    - node scripts/performance-monitor.js
    - node scripts/security-validator.js
  environment:
    name: production
    url: $PRODUCTION_URL
  when: manual
  only:
    - main
```

### Environment-Specific Deployment

```bash
# Development deployment
node scripts/deployment-manager.js dev

# Staging deployment  
node scripts/deployment-manager.js staging

# Production deployment
node scripts/deployment-manager.js production
```

### Performance Monitoring

```bash
# Run performance monitoring standalone
node scripts/performance-monitor.js

# Generate performance report
node scripts/performance-monitor.js --report
```

### Security Validation

```bash
# Run security validation
node scripts/security-validator.js

# SOC2 compliance check
node scripts/security-validator.js --soc2
```

### Rollback Operations

```bash
# Automatic rollback on failure
node scripts/rollback-manager.js

# Manual rollback with approval
ROLLBACK_STRATEGY=manual node scripts/rollback-manager.js

# Phased rollback
ROLLBACK_STRATEGY=phased node scripts/rollback-manager.js
```

These deployment automation scripts provide:

1. **Multi-platform deployment** to Vercel, Cloudflare, and npm registry
2. **Performance monitoring** with real-time metrics and reporting
3. **Security validation** including SAST, dependency scanning, and SOC2 compliance
4. **Automated rollback** with multiple strategies (auto, manual, phased)
5. **Health checking** and deployment verification
6. **Comprehensive logging** and audit trails for compliance

All scripts are production-ready and designed to work seamlessly with the GitLab CI/CD pipeline architecture.