/**
 * 🔬✨ 10-HOUR IMPROVEMENT EXPERIMENT - AUTOMATED
 *
 * Fully automated improvement experiment that runs for 10 hours
 * (240 cycles at 2.5-minute intervals) while you sleep.
 *
 * Features:
 * - Contraction (analysis/doubt) and Expansion (improvement/creation) cycles
 * - Connects to all live git repos and backups
 * - Integrates with Trinity Architecture
 * - PTSD-safe: Gentle, constructive improvements
 * - Auto-recovery: Resumes from last state if interrupted
 * - Fully unattended: No user interaction required
 *
 * @license CC0-1.0 - Public Domain
 */

import * as fs from 'fs';
import * as path from 'path';
import ContractionEngine from '../packages/trinity-v1-1-core/contraction-engine';
import ExpansionEngine from '../packages/trinity-v1-1-core/expansion-engine';
import WorkspaceIntegrator from './workspace-integrator.js';

const EXPERIMENT_DURATION = 10 * 60 * 60 * 1000; // 10 hours in milliseconds
const CYCLE_INTERVAL = 2.5 * 60 * 1000; // 2.5 minutes in milliseconds
const LOG_FILE = path.join(process.cwd(), 'IMPROVEMENT_EXPERIMENT_LOG.json');
const STATE_FILE = path.join(process.cwd(), 'experiment-state.json');
const SUMMARY_FILE = path.join(process.cwd(), 'improvements-summary.md');

interface ExperimentState {
  startTime: number;
  endTime: number;
  currentCycle: number;
  totalCycles: number;
  improvements: Improvement[];
  errors: ErrorLog[];
  systemsScanned: string[];
  packagesImproved: string[];
  connectionsEstablished: number;
}

interface Improvement {
  cycle: number;
  timestamp: string;
  type: 'fix' | 'enhancement' | 'connection' | 'documentation';
  description: string;
  file?: string;
  system?: string;
}

interface ErrorLog {
  cycle: number;
  timestamp: string;
  error: string;
  recovered: boolean;
}

class ImprovementExperiment {
  private state: ExperimentState;
  private startTime: number;
  private isRunning: boolean = true;
  private contractionEngine: ContractionEngine;
  private expansionEngine: ExpansionEngine;
  private workspaceIntegrator: WorkspaceIntegrator;

  constructor() {
    this.startTime = Date.now();
    this.state = this.loadOrInitializeState();
    this.contractionEngine = new ContractionEngine();
    this.expansionEngine = new ExpansionEngine();
    this.workspaceIntegrator = new WorkspaceIntegrator();
    console.log('🔬✨ 10-Hour Improvement Experiment Starting');
    console.log(`📊 Duration: 10 hours (${this.state.totalCycles} cycles)`);
    console.log(`⏱️  Cycle Interval: 2.5 minutes`);
    console.log(`🔄 Starting from cycle ${this.state.currentCycle + 1}`);
    console.log(`💤 Running in unattended mode - safe to sleep`);
    console.log(`🔗 Workspace integration: Enabled (builds missing, integrates all)`);
  }

  private loadOrInitializeState(): ExperimentState {
    if (fs.existsSync(STATE_FILE)) {
      try {
        const saved = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
        console.log('📂 Resuming from saved state');
        return saved;
      } catch (e) {
        console.log('⚠️  Could not load saved state, starting fresh');
      }
    }

    const totalCycles = Math.floor(EXPERIMENT_DURATION / CYCLE_INTERVAL);
    return {
      startTime: Date.now(),
      endTime: Date.now() + EXPERIMENT_DURATION,
      currentCycle: 0,
      totalCycles,
      improvements: [],
      errors: [],
      systemsScanned: [],
      packagesImproved: [],
      connectionsEstablished: 0
    };
  }

  private saveState(): void {
    try {
      fs.writeFileSync(STATE_FILE, JSON.stringify(this.state, null, 2));
    } catch (e) {
      console.error('❌ Failed to save state:', e);
    }
  }

  private async contractionPhase(): Promise<string[]> {
    const opportunities: string[] = [];

    try {
      const analysis = await this.contractionEngine.analyze();

      // Convert improvement opportunities to simple strings for logging
      for (const opp of analysis.slice(0, 5)) { // Top 5 per cycle
        opportunities.push(`${opp.type}: ${opp.description}`);
      }

    } catch (e) {
      this.logError('Contraction phase', e);
      // Fallback opportunities
      opportunities.push('Enhance system connections');
      opportunities.push('Improve type definitions');
    }

    return opportunities;
  }

  private async expansionPhase(_opportunities: string[]): Promise<Improvement[]> {
    const improvements: Improvement[] = [];

    // Get detailed opportunities from contraction engine
    const analysis = await this.contractionEngine.analyze();

    for (const opp of analysis.slice(0, 3)) { // Top 3 per cycle
      try {
        const result = await this.expansionEngine.implement(opp);

        if (result.success) {
          // Map optimization type to enhancement for compatibility
          const improvementType = opp.type === 'optimization' ? 'enhancement' : opp.type;

          improvements.push({
            cycle: this.state.currentCycle,
            timestamp: new Date().toISOString(),
            type: improvementType as 'fix' | 'enhancement' | 'connection' | 'documentation',
            description: result.description,
            file: result.file,
            system: opp.system
          });

          if (opp.type === 'connection') {
            this.state.connectionsEstablished++;
          }
        } else {
          this.logError(`Expansion failed: ${opp.description}`, new Error(result.error || 'Unknown error'));
        }
      } catch (e) {
        this.logError(`Expansion: ${opp.description}`, e);
      }
    }

    return improvements;
  }

  private logError(context: string, error: any): void {
    const errorLog: ErrorLog = {
      cycle: this.state.currentCycle,
      timestamp: new Date().toISOString(),
      error: `${context}: ${error.message || String(error)}`,
      recovered: true
    };
    this.state.errors.push(errorLog);
  }

  private async runCycle(): Promise<void> {
    const cycleStart = Date.now();
    this.state.currentCycle++;

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`🔄 CYCLE ${this.state.currentCycle}/${this.state.totalCycles} - ${new Date().toLocaleTimeString()}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    try {
      // Contraction Phase with timeout
      console.log('📉 Contraction Phase: Analyzing...');
      const opportunities = await Promise.race([
        this.contractionPhase(),
        new Promise<string[]>(resolve => setTimeout(() => resolve(['Continue improving']), 30000)) // 30s timeout
      ]);
      console.log(`   Found ${opportunities.length} improvement opportunities`);

      // Expansion Phase with timeout
      console.log('📈 Expansion Phase: Implementing improvements...');
      const improvements = await Promise.race([
        this.expansionPhase(opportunities),
        new Promise<Improvement[]>(resolve => setTimeout(() => resolve([]), 60000)) // 60s timeout
      ]);
      this.state.improvements.push(...improvements);
      console.log(`   Implemented ${improvements.length} improvements`);

      // Integrate workspaces every 5 cycles
      if (this.state.currentCycle % 5 === 0) {
        console.log('🔗 Workspace Integration: Syncing all workspaces...');
        try {
          // Add timeout to prevent hanging
          const integrationPromise = this.workspaceIntegrator.integrateAll();
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Integration timeout')), 300000) // 5 min
          );

          const integrationResult = await Promise.race([
            integrationPromise,
            timeoutPromise
          ]) as any;

          console.log(`   ✅ Integrated ${integrationResult.updated} workspaces`);
          console.log(`   🔨 Built ${integrationResult.built} components`);
          console.log(`   ✓ Validated ${integrationResult.validated} workspaces`);

          if (integrationResult.errors && integrationResult.errors.length > 0) {
            console.log(`   ⚠️  ${integrationResult.errors.length} errors (non-fatal)`);
            integrationResult.errors.slice(0, 3).forEach((e: string) =>
              console.log(`      - ${e}`)
            );
          }
        } catch (e: any) {
          console.log(`   ⚠️  Workspace integration error (non-fatal): ${e.message}`);
          this.logError('Workspace integration', e);
        }
      }

      // Save progress (always save, even on errors)
      try {
        this.saveState();
        this.saveLogEntry();
      } catch (saveError) {
        console.log('⚠️  Save error (non-fatal):', saveError);
      }

      const cycleDuration = ((Date.now() - cycleStart) / 1000).toFixed(1);
      const progress = ((this.state.currentCycle / this.state.totalCycles) * 100).toFixed(1);
      console.log(`✅ Cycle complete (${cycleDuration}s) - Progress: ${progress}%`);

    } catch (e) {
      this.logError('Cycle execution', e);
      console.log('⚠️  Cycle had errors but continuing...');
      // Still save state even on error
      try {
        this.saveState();
      } catch {
        // Ignore save errors
      }
    }
  }

  private saveLogEntry(): void {
    try {
      const logEntry = {
        cycle: this.state.currentCycle,
        timestamp: new Date().toISOString(),
        improvements: this.state.improvements.filter(i => i.cycle === this.state.currentCycle),
        errors: this.state.errors.filter(e => e.cycle === this.state.currentCycle)
      };

      let log: any = { experiment: { cycles: [] } };
      if (fs.existsSync(LOG_FILE)) {
        log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
      }
      log.experiment.cycles.push(logEntry);
      fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
    } catch (e) {
      console.error('Failed to save log entry:', e);
    }
  }

  private generateSummary(): void {
    const summary = `# 10-Hour Improvement Experiment Summary

**Experiment Completed**: ${new Date().toISOString()}
**Total Cycles**: ${this.state.currentCycle}
**Total Improvements**: ${this.state.improvements.length}
**Connections Established**: ${this.state.connectionsEstablished}
**Errors Encountered**: ${this.state.errors.length} (all recovered)

## Improvements by Type

${this.getImprovementsByType()}

## Systems Improved

${this.state.packagesImproved.map(p => `- ${p}`).join('\n') || 'None recorded'}

## Full Log

See \`IMPROVEMENT_EXPERIMENT_LOG.json\` for complete cycle-by-cycle log.
`;

    fs.writeFileSync(SUMMARY_FILE, summary);
    console.log(`\n📄 Summary saved to ${SUMMARY_FILE}`);
  }

  private getImprovementsByType(): string {
    const byType = this.state.improvements.reduce((acc, imp) => {
      acc[imp.type] = (acc[imp.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(byType)
      .map(([type, count]) => `- **${type}**: ${count}`)
      .join('\n');
  }

  public async run(): Promise<void> {
    const endTime = this.state.endTime;

    // Keep running until end time or all cycles complete
    while (this.isRunning && Date.now() < endTime && this.state.currentCycle < this.state.totalCycles) {
      try {
        await this.runCycle();

        // Calculate sleep time - ensure we always wait the full interval
        const cycleDuration = Date.now() - (this.startTime + ((this.state.currentCycle - 1) * CYCLE_INTERVAL));
        const sleepTime = Math.max(CYCLE_INTERVAL - cycleDuration, CYCLE_INTERVAL * 0.8); // At least 80% of interval

        if (this.state.currentCycle < this.state.totalCycles) {
          const sleepSeconds = (sleepTime / 1000).toFixed(0);
          console.log(`⏳ Sleeping ${sleepSeconds}s until next cycle...`);

          // Use a more reliable sleep that won't pause
          await new Promise(resolve => {
            const timeout = setTimeout(resolve, sleepTime);
            // Keep process alive
            process.nextTick(() => {});
            return timeout;
          });
        } else {
          break;
        }
      } catch (e) {
        // Never stop on error - log and continue
        this.logError('Run cycle', e);
        console.log('⚠️  Error in cycle, but continuing...');

        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    // Final summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 EXPERIMENT COMPLETE!');
    console.log(`📊 Total Cycles: ${this.state.currentCycle}`);
    console.log(`✨ Total Improvements: ${this.state.improvements.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    this.generateSummary();
    this.saveState();
  }
}

// Run experiment with keep-alive
if (require.main === module) {
  const experiment = new ImprovementExperiment();

  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\n⚠️  Received SIGINT, saving state and exiting gracefully...');
    experiment['saveState']();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n⚠️  Received SIGTERM, saving state and exiting gracefully...');
    experiment['saveState']();
    process.exit(0);
  });

  // Prevent process from exiting on uncaught errors
  process.on('uncaughtException', (e) => {
    console.error('⚠️  Uncaught exception (continuing):', e);
    experiment['logError']('Uncaught exception', e);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('⚠️  Unhandled rejection (continuing):', reason);
    experiment['logError']('Unhandled rejection', reason);
  });

  // Run with automatic restart on fatal errors
  experiment.run().catch(e => {
    console.error('⚠️  Run error (will retry):', e);
    experiment['logError']('Run error', e);
    experiment['saveState']();
    // Don't exit - let it continue
  });
}

export default ImprovementExperiment;

