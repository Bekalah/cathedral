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

// Read consolidation report
const report = JSON.parse(fs.readFileSync('../../docs/CONSOLIDATION_REPORT.json', 'utf-8'));

// Priority engines to download
const priorityEngines = [
  'Cosmogenesis.js',
  'Cymatics.js',
  'IndraNet.js',
  'JacobsLadder.js',
  'ambient-engine.js',
  'cymatic-engine.js',
  'oscilloscope-fractal-engine.js',
  'arcana-art-synthesis-labs.js',
  'arcana-music-modes.js',
  'mystery-house-codex-mirror.js',
  'shaders.js'
];

console.log('🔮 Downloading priority cathedral engines...\n');

let downloaded = 0;

for (const engine of report.engines) {
  const filename = path.basename(engine.path);
  
  if (priorityEngines.some(p => filename.includes(p.replace('.js', '')))) {
    try {
      const branch = engine.repo === 'cathedral-research' ? 'master' : 'main';
      const { data } = await octokit.repos.getContent({
        owner: 'Bekalah',
        repo: engine.repo,
        path: engine.path,
        ref: branch
      });
      
      if (data.type === 'file') {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const targetPath = `src/engines/consolidated/${filename}`;
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, content);
        console.log(`✓ ${engine.repo}/${filename}`);
        downloaded++;
      }
    } catch (err) {
      console.log(`✗ ${engine.repo}/${filename} - ${err.message}`);
    }
  }
}

console.log(`\n✨ Downloaded ${downloaded} core engines`);
