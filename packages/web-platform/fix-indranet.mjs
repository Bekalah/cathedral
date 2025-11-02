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

console.log('Downloading IndraNet.js from app/engines/IndraNet.js...');

try {
  const { data } = await octokit.repos.getContent({
    owner: 'Bekalah',
    repo: 'cosmogenesis-learning-engine',
    path: 'app/engines/IndraNet.js',
    ref: 'main'
  });
  
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  fs.writeFileSync('src/engines/consolidated/IndraNet.js', content);
  console.log('✓ Fixed IndraNet.js successfully');
} catch (err) {
  console.error('✗ Failed:', err.message);
}
