#!/usr/bin/env node
/**
 * ⚗️ Experiment Connector - Links Gemini 3 Quality with Improvement Experiments
 * 
 * Connects quality enhancement with continuous improvement cycles
 * 
 * @author Rebecca Respawn
 * @license CC0-1.0 - Public Domain
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const EXPERIMENT_STATE_FILE = join(rootDir, 'experiment-state.json');
const QUALITY_METRICS_FILE = join(rootDir, 'quality-metrics.json');

async function loadExperimentState() {
  if (existsSync(EXPERIMENT_STATE_FILE)) {
    return JSON.parse(readFileSync(EXPERIMENT_STATE_FILE, 'utf-8'));
  }
  return null;
}

async function loadQualityMetrics() {
  if (existsSync(QUALITY_METRICS_FILE)) {
    return JSON.parse(readFileSync(QUALITY_METRICS_FILE, 'utf-8'));
  }
  return null;
}

async function connectQualityWithExperiments() {
  console.log('🔗 Connecting Gemini 3 quality with improvement experiments...\n');
  
  const expState = await loadExperimentState();
  const qualityMetrics = await loadQualityMetrics();
  
  if (expState && qualityMetrics) {
    // Integrate quality metrics into experiment state
    if (!expState.quality) {
      expState.quality = {};
    }
    
    expState.quality.metrics = qualityMetrics;
    expState.quality.lastUpdate = new Date().toISOString();
    expState.quality.standard = 'gemini-3-a-plus';
    
    writeFileSync(EXPERIMENT_STATE_FILE, JSON.stringify(expState, null, 2));
    
    console.log('   ✅ Connected quality metrics to experiment state\n');
    return true;
  }
  
  console.log('   ℹ️  Experiment state or quality metrics not found\n');
  return false;
}

async function triggerQualityEnhancement() {
  console.log('⚗️  Triggering quality enhancement...\n');
  
  try {
    execSync('node tools/gemini-3-quality-enhancer.mjs', {
      cwd: rootDir,
      stdio: 'inherit',
      maxBuffer: 10 * 1024 * 1024
    });
  } catch (e) {
    console.error('   ❌ Quality enhancement failed:', e.message);
  }
}

async function main() {
  console.log('⚗️  Experiment Connector - Gemini 3 Integration\n');
  
  await connectQualityWithExperiments();
  await triggerQualityEnhancement();
  
  console.log('✅ Integration complete\n');
}

main().catch(console.error);
