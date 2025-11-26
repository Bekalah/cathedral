/**
 * Analyze Improvement Patterns - Research Tool
 * Compact analysis of improvement cycles
 */

import * as fs from 'fs';
import * as path from 'path';

interface ImprovementEntry {
  c: number;      // cycle
  t: number;      // timestamp
  a: string;      // area
  i: string;      // improvement
  tool: string;   // tool name
  q: string;      // quality
}

const LOG_FILE = path.join(__dirname, '../IMPROVEMENT_RESEARCH_LOG.json');

function analyze() {
  const log: ImprovementEntry[] = JSON.parse(
    fs.readFileSync(LOG_FILE, 'utf8') || '[]'
  );

  if (log.length === 0) {
    console.log('No improvements recorded yet');
    return;
  }

  // Area frequency
  const areas: Record<string, number> = {};
  const qualities: Record<string, number> = {};
  const improvements: string[] = [];
  const tools: string[] = [];

  log.forEach(entry => {
    areas[entry.a] = (areas[entry.a] || 0) + 1;
    qualities[entry.q] = (qualities[entry.q] || 0) + 1;
    improvements.push(entry.i);
    tools.push(entry.tool);
  });

  // Time patterns
  const hourly: Record<number, number> = {};
  log.forEach(entry => {
    const hour = new Date(entry.t).getHours();
    hourly[hour] = (hourly[hour] || 0) + 1;
  });

  // Quality progression
  const qualityProgression = log.map(e => e.q);

  console.log('📊 IMPROVEMENT RESEARCH ANALYSIS');
  console.log('================================');
  console.log(`Total cycles: ${log.length}`);
  console.log(`Time span: ${new Date(log[0].t).toISOString()} → ${new Date(log[log.length - 1].t).toISOString()}`);
  console.log('');
  console.log('Top areas:', Object.entries(areas).sort((a, b) => b[1] - a[1]).slice(0, 5));
  console.log('Quality distribution:', qualities);
  console.log('Unique improvements:', new Set(improvements).size);
  console.log('Unique tools:', new Set(tools).size);
  console.log('Peak hours:', Object.entries(hourly).sort((a, b) => b[1] - a[1]).slice(0, 3));
  console.log('Quality trend:', qualityProgression.slice(-10).join(' → '));
}

analyze();

