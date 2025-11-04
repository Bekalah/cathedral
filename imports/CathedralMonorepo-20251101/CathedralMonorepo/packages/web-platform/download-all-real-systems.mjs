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

// Download real engines from cosmogenesis-learning-engine
const engineFiles = [
  { repo: 'cosmogenesis-learning-engine', path: 'app/engines/Cosmogenesis.js', target: 'src/engines/real/Cosmogenesis.js' },
  { repo: 'cosmogenesis-learning-engine', path: 'app/engines/Cymatics.js', target: 'src/engines/real/Cymatics.js' },
  { repo: 'cosmogenesis-learning-engine', path: 'app/engines/IndraNet.js', target: 'src/engines/real/IndraNet.js' },
  { repo: 'cosmogenesis-learning-engine', path: 'app/engines/JacobsLadder.js', target: 'src/engines/real/JacobsLadder.js' },
  { repo: 'stone-grimoire', path: 'apps/cathedral/js/shaders.js', target: 'src/engines/real/cathedral-shaders.js' },
  { repo: 'stone-grimoire', path: 'REGISTRY/codex_of_abyssiae.json', target: 'public/data/codex_of_abyssiae.json' },
  { repo: 'liber-arcanae', path: 'assets/data/cards.json', target: 'public/data/liber-arcanae-cards.json' },
  { repo: 'liber-arcanae', path: 'assets/js/engine.js', target: 'src/engines/real/liber-arcanae-engine.js' }
];

console.log('🔮 Downloading REAL cathedral systems...\n');

for (const file of engineFiles) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo: file.repo,
      path: file.path,
      ref: 'main'
    });
    
    if (data.type === 'file') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const targetDir = path.dirname(file.target);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(file.target, content);
      console.log(`✓ ${file.repo}/${file.path} → ${file.target}`);
    }
  } catch (err) {
    console.log(`✗ ${file.repo}/${file.path} - ${err.message}`);
  }
}

console.log('\n✨ Real systems downloaded!');
