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
const repo = 'cathedral-research';

// Fetch key architecture documents
const keyDocs = [
  'BUILDING_CATHEDRALS_ARCHIVE/BOOKS/cathedral/CATHEDRAL_MASTER_ARCHITECTURE.md',
  'BUILDING_CATHEDRALS_ARCHIVE/BOOKS/cathedral/CATHEDRAL_DEPLOYMENT_GUIDE.md',
  'BUILDING_CATHEDRALS_ARCHIVE/BOOKS/cathedral/CLOUDFLARE_SETUP.md',
  'BUILDING_CATHEDRALS_ARCHIVE/AZURE_DEEPSEEK_SETUP.md',
  'BUILDING_CATHEDRALS_ARCHIVE/BOOKS/cathedral/COMPLETE_SYSTEM_INTEGRATION.md',
  'BUILDING_CATHEDRALS_ARCHIVE/BOOKS/CATHEDRAL_FUSION_DASHBOARD.md'
];

fs.mkdirSync('../../docs/cathedral-research', { recursive: true });

console.log('📚 Fetching master architecture documents...\n');

for (const path of keyDocs) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: 'master'
    });
    
    if (data.type === 'file') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const filename = path.split('/').pop();
      const targetPath = `../../docs/cathedral-research/${filename}`;
      fs.writeFileSync(targetPath, content);
      console.log(`✓ ${filename}`);
    }
  } catch (err) {
    console.log(`✗ ${path.split('/').pop()} - ${err.message}`);
  }
}

console.log('\n🏰 Master docs downloaded!');
