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

console.log('🏰 CATHEDRAL REPOSITORY CONSOLIDATION\n');
console.log('Fetching all repositories...\n');

const { data: repos } = await octokit.repos.listForAuthenticatedUser({ per_page: 100 });

// Cathedral-related repos
const cathedralRepos = repos.filter(r => 
  r.name.toLowerCase().includes('cathedral') ||
  r.name.toLowerCase().includes('codex') ||
  r.name.toLowerCase().includes('circuitum') ||
  r.name.toLowerCase().includes('liber') ||
  r.name.toLowerCase().includes('arcanae') ||
  r.name.toLowerCase().includes('cosmogenesis') ||
  r.name.toLowerCase().includes('stone') ||
  r.name.toLowerCase().includes('grimoire') ||
  r.name.toLowerCase().includes('mystery') ||
  r.name.toLowerCase().includes('turbo') ||
  r.name.toLowerCase().includes('openspec')
);

console.log(`Found ${cathedralRepos.length} cathedral repositories:\n`);

const consolidationMap = {};

for (const repo of cathedralRepos) {
  console.log(`📦 ${repo.name}`);
  console.log(`   ${repo.description || 'No description'}`);
  console.log(`   Branch: ${repo.default_branch}, Updated: ${new Date(repo.updated_at).toLocaleDateString()}\n`);
  
  consolidationMap[repo.name] = {
    full_name: repo.full_name,
    branch: repo.default_branch,
    description: repo.description,
    updated_at: repo.updated_at,
    url: repo.html_url
  };
}

// Save consolidation map
fs.writeFileSync('../../docs/REPOSITORY_CONSOLIDATION_MAP.json', JSON.stringify(consolidationMap, null, 2));

console.log(`\n✨ Total repositories to consolidate: ${cathedralRepos.length}`);
console.log('📋 Consolidation map saved to docs/REPOSITORY_CONSOLIDATION_MAP.json');
