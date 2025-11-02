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

// Fetch cathedral-research repo
console.log('🔮 Fetching cathedral-research repository...\n');

try {
  const { data: tree } = await octokit.git.getTree({ 
    owner, 
    repo: 'cathedral-research', 
    tree_sha: 'master',
    recursive: 1
  });
  
  const docs = tree.tree.filter(f => 
    f.type === 'blob' && 
    (f.path.includes('README') || 
     f.path.includes('guide') || 
     f.path.includes('master') ||
     f.path.includes('doc') ||
     f.path.endsWith('.md') ||
     f.path.endsWith('.txt'))
  );
  
  console.log('📚 Master Docs & Guides:');
  docs.forEach(d => console.log(`  - ${d.path}`));
  
  // Fetch key architecture files
  const keyFiles = tree.tree.filter(f => 
    f.type === 'blob' && 
    (f.path.includes('architecture') || 
     f.path.includes('system') ||
     f.path.includes('tool') ||
     f.path.includes('config'))
  );
  
  console.log('\n🏗️ Architecture & Config:');
  keyFiles.forEach(d => console.log(`  - ${d.path}`));
  
} catch (err) {
  console.log(`Error: ${err.message}`);
}

// Check all cathedral repos for README and docs
const repos = ['BUILDING-CATHEDRALS', 'cathedral', 'cathedral-connection-map', 'cathedral-vercel', 'codex-14499'];

for (const repo of repos) {
  try {
    const { data: readme } = await octokit.repos.getReadme({ owner, repo });
    console.log(`\n📖 ${repo}/README.md exists`);
  } catch (err) {
    // No README
  }
}
