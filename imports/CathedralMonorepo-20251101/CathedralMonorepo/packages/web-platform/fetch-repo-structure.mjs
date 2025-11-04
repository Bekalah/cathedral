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

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const octokit = await getGitHubClient();

// Search for TURBO and OPENSPEC repos
const { data: repos } = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });

console.log('\n🔮 Searching for TURBO and OPENSPEC...\n');

const turbo = repos.find(r => r.name.toLowerCase().includes('turbo'));
const openspec = repos.find(r => r.name.toLowerCase().includes('openspec'));

if (turbo) {
  console.log(`Found TURBO: ${turbo.full_name}`);
  const { data: tree } = await octokit.git.getTree({ 
    owner: turbo.owner.login, 
    repo: turbo.name, 
    tree_sha: turbo.default_branch,
    recursive: 1
  });
  console.log('  Key files:', tree.tree.filter(f => f.type === 'blob' && (f.path.endsWith('.json') || f.path.endsWith('.js') || f.path.endsWith('.mjs'))).slice(0, 20).map(f => f.path).join('\n    '));
}

if (openspec) {
  console.log(`\nFound OPENSPEC: ${openspec.full_name}`);
  const { data: tree } = await octokit.git.getTree({ 
    owner: openspec.owner.login, 
    repo: openspec.name, 
    tree_sha: openspec.default_branch,
    recursive: 1
  });
  console.log('  Key files:', tree.tree.filter(f => f.type === 'blob' && (f.path.endsWith('.json') || f.path.endsWith('.js') || f.path.endsWith('.mjs'))).slice(0, 20).map(f => f.path).join('\n    '));
}

// Check cathedral repos
const cathedral = repos.find(r => r.name === 'cathedral' || r.name === 'BUILDING-CATHEDRALS');
if (cathedral) {
  console.log(`\nFound Cathedral: ${cathedral.full_name}`);
  const { data: tree } = await octokit.git.getTree({ 
    owner: cathedral.owner.login, 
    repo: cathedral.name, 
    tree_sha: cathedral.default_branch,
    recursive: 1
  });
  const engines = tree.tree.filter(f => f.path.includes('engine') || f.path.includes('system'));
  console.log('  Engine files:', engines.map(f => f.path).join('\n    '));
}
