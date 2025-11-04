import { Octokit } from '@octokit/rest'
import fs from 'fs'

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

// Fetch ALL engines and data from all cathedral repos
const repos = [
  { name: 'BUILDING-CATHEDRALS', branch: 'main' },
  { name: 'cathedral', branch: 'main' },
  { name: 'cosmogenesis-learning-engine', branch: 'main' },
  { name: 'stone-grimoire', branch: 'main' },
  { name: 'liber-arcanae', branch: 'main' }
];

console.log('🔮 Fetching REAL cathedral engines...\n');

for (const repo of repos) {
  try {
    const { data: tree } = await octokit.git.getTree({ 
      owner, 
      repo: repo.name, 
      tree_sha: repo.branch,
      recursive: 1
    });
    
    // Get all JS/JSON files
    const files = tree.tree.filter(f => 
      f.type === 'blob' && 
      (f.path.endsWith('.js') || f.path.endsWith('.json') || f.path.endsWith('.mjs')) &&
      !f.path.includes('node_modules') &&
      !f.path.includes('.git')
    );
    
    console.log(`\n📦 ${repo.name}:`);
    console.log(`   Found ${files.length} code/data files`);
    
    // Download key engine files
    for (const file of files.slice(0, 10)) {
      console.log(`   - ${file.path}`);
    }
    
  } catch (err) {
    console.log(`✗ ${repo.name} - ${err.message}`);
  }
}
