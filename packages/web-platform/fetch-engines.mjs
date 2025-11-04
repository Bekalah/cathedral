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

// Fetch engines from BUILDING-CATHEDRALS
const owner = 'Bekalah';
const repo = 'BUILDING-CATHEDRALS';

const engineFiles = [
  'exports/cathedral-site/engines/ambient-engine.js',
  'exports/cathedral-site/engines/cymatic-engine.js',
  'packages/art-engine/arcana-art-synthesis-labs.js',
  'packages/bridge-system/mystery-house-codex-mirror.js',
  'packages/science-engine/oscilloscope-fractal-engine.js',
  'packages/synthesis-engine/arcana-music-modes.js',
  'src/data/art-engine.json',
  'src/data/music-engine.json',
  'src/data/story-engine.json'
];

console.log('🔮 Fetching cathedral engines from GitHub...\n');

for (const path of engineFiles) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    if (data.type === 'file') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const targetPath = `src/engines/github/${path.split('/').pop()}`;
      fs.mkdirSync('src/engines/github', { recursive: true });
      fs.writeFileSync(targetPath, content);
      console.log(`✓ ${path} → ${targetPath}`);
    }
  } catch (err) {
    console.log(`✗ ${path} - ${err.message}`);
  }
}

console.log('\n🎨 Engines downloaded!');
