import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;
  return accessToken;
}

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const octokit = await getGitHubClient();
const owner = 'Bekalah';

// All 13 cathedral repositories
const repos = [
  'BUILDING-CATHEDRALS',
  'cathedral',
  'cathedral-connection-map',
  'cathedral-research',
  'Cathedral-updates',
  'cathedral-vercel',
  'circuitum99',
  'codex-14499',
  'cosmogenesis-learning-engine',
  'liber-arcanae',
  'liber-arcanae-game',
  'magical-mystery-house',
  'stone-grimoire'
];

console.log('🏰 CONSOLIDATING ALL 13 CATHEDRAL REPOSITORIES\n');

const consolidation = {
  engines: [],
  data: [],
  shaders: [],
  documentation: []
};

for (const repoName of repos) {
  try {
    console.log(`\n📦 Processing ${repoName}...`);
    
    const { data: tree } = await octokit.git.getTree({ 
      owner, 
      repo: repoName, 
      tree_sha: repoName === 'cathedral-research' ? 'master' : 'main',
      recursive: 1
    });
    
    // Find all engines
    const engines = tree.tree.filter(f => 
      f.type === 'blob' && 
      (f.path.includes('engine') || f.path.includes('Engine')) &&
      (f.path.endsWith('.js') || f.path.endsWith('.mjs')) &&
      !f.path.includes('node_modules')
    );
    
    // Find all JSON data
    const data = tree.tree.filter(f =>
      f.type === 'blob' &&
      f.path.endsWith('.json') &&
      !f.path.includes('node_modules') &&
      !f.path.includes('package')
    );
    
    // Find shader files
    const shaders = tree.tree.filter(f =>
      f.type === 'blob' &&
      (f.path.includes('shader') || f.path.includes('glsl'))
    );
    
    console.log(`   Engines: ${engines.length}, Data: ${data.length}, Shaders: ${shaders.length}`);
    
    consolidation.engines.push(...engines.map(e => ({ repo: repoName, ...e })));
    consolidation.data.push(...data.map(d => ({ repo: repoName, ...d })));
    consolidation.shaders.push(...shaders.map(s => ({ repo: repoName, ...s })));
    
  } catch (err) {
    console.log(`   ✗ Error: ${err.message}`);
  }
}

// Save consolidation report
fs.writeFileSync('../../docs/CONSOLIDATION_REPORT.json', JSON.stringify(consolidation, null, 2));

console.log(`\n✨ CONSOLIDATION COMPLETE`);
console.log(`   Total Engines: ${consolidation.engines.length}`);
console.log(`   Total Data Files: ${consolidation.data.length}`);
console.log(`   Total Shaders: ${consolidation.shaders.length}`);
console.log(`\n📋 Full report saved to docs/CONSOLIDATION_REPORT.json`);
