import { Octokit } from '@octokit/rest'

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

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

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

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const octokit = await getUncachableGitHubClient();
const { data: user } = await octokit.users.getAuthenticated();
console.log(`\n🔮 Connected as: ${user.login}\n`);

const { data: repos } = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });

const cathedral = repos.filter(r => 
  r.name.toLowerCase().includes('cathedral') || 
  r.name.toLowerCase().includes('codex') || 
  r.name.toLowerCase().includes('turbo') ||
  r.name.toLowerCase().includes('openspec')
);

console.log('Cathedral Repositories:');
cathedral.forEach(r => console.log(`  - ${r.full_name} (branch: ${r.default_branch})`));

console.log(`\nTotal repos: ${repos.length}, Cathedral-related: ${cathedral.length}`);
