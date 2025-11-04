import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
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

async function getGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function getAllFiles(dir, fileList = [], baseDir = dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip certain directories and files
    if (file === 'node_modules' || file === '.git' || file === '.replit' || 
        file === '.config' || file === '.cache' || file === 'dist' ||
        file === 'target' || file.startsWith('.')) {
      continue;
    }
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList, baseDir);
    } else {
      // Get relative path from base directory
      const relativePath = path.relative(baseDir, filePath);
      fileList.push(relativePath);
    }
  }
  
  return fileList;
}

async function uploadFileToGitHub(octokit, owner, repo, filePath, content) {
  try {
    const base64Content = Buffer.from(content).toString('base64');
    
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Add ${filePath}`,
      content: base64Content,
      branch: 'main'
    });
    
    return true;
  } catch (error) {
    console.error(`  ❌ Failed to upload ${filePath}:`, error.message);
    return false;
  }
}

async function publishToGitHub() {
  console.log('\n🏰 Cathedral Master - Auto-Publish to GitHub');
  console.log('='.repeat(50));
  
  try {
    const octokit = await getGitHubClient();
    const user = await octokit.rest.users.getAuthenticated();
    const owner = user.data.login;
    const repo = 'cathedral-master';
    
    console.log(`\n✓ Authenticated as: ${owner}`);
    console.log(`✓ Target repository: ${owner}/${repo}`);
    
    // Get all files to upload
    console.log('\n📦 Gathering files...');
    const files = await getAllFiles(__dirname);
    
    // Filter to important files only
    const importantFiles = files.filter(f => {
      return f.endsWith('.json') || 
             f.endsWith('.md') || 
             f.endsWith('.js') || 
             f.endsWith('.mjs') ||
             f.endsWith('.jsx') ||
             f.endsWith('.ts') ||
             f.endsWith('.tsx') ||
             f.endsWith('.css') ||
             f.endsWith('.html') ||
             f.endsWith('.yml') ||
             f.endsWith('.yaml') ||
             f.endsWith('.toml') ||
             f.endsWith('.rs') ||
             f.endsWith('.gd') ||
             f.endsWith('.gdshader') ||
             f.endsWith('.tres') ||
             f.endsWith('.tscn') ||
             f.endsWith('.gdns') ||
             f.endsWith('.gdnlib') ||
             f === 'package.json' ||
             f === 'package-lock.json' ||
             f === 'turbo.json' ||
             f === 'Cargo.toml' ||
             f === 'Cargo.lock' ||
             f === 'project.godot';
    });
    
    console.log(`✓ Found ${importantFiles.length} files to upload`);
    
    // Initialize repository with README first
    console.log('\n📝 Creating initial commit...');
    const readmeContent = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
    
    try {
      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'README.md',
        message: 'Initial commit: Cathedral Master v1.0',
        content: Buffer.from(readmeContent).toString('base64'),
        branch: 'main'
      });
      console.log('✓ Initial commit created');
    } catch (error) {
      if (error.status === 422) {
        console.log('✓ Repository already has commits, continuing...');
      } else {
        throw error;
      }
    }
    
    // Upload all files in batches
    console.log('\n🚀 Uploading files to GitHub...');
    let uploaded = 0;
    let failed = 0;
    
    for (let i = 0; i < importantFiles.length; i++) {
      const file = importantFiles[i];
      
      // Skip README (already uploaded)
      if (file === 'README.md') continue;
      
      try {
        const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        const success = await uploadFileToGitHub(octokit, owner, repo, file, content);
        
        if (success) {
          uploaded++;
          if (uploaded % 10 === 0) {
            console.log(`  Progress: ${uploaded}/${importantFiles.length} files uploaded...`);
          }
        } else {
          failed++;
        }
        
        // Rate limiting: wait a bit between uploads
        if (i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`  ❌ Error with ${file}:`, error.message);
        failed++;
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ PUBLISH COMPLETE!');
    console.log('='.repeat(50));
    console.log(`\n📊 Summary:`);
    console.log(`   Total files: ${importantFiles.length}`);
    console.log(`   Uploaded: ${uploaded}`);
    console.log(`   Failed: ${failed}`);
    console.log(`\n🌐 Your Cathedral Master is now live at:`);
    console.log(`   https://github.com/${owner}/${repo}`);
    console.log(`\n🎯 Next Steps:`);
    console.log(`   1. Visit: https://github.com/${owner}/${repo}/settings/pages`);
    console.log(`   2. Set Source to "GitHub Actions"`);
    console.log(`   3. Your site will deploy to: https://${owner}.github.io/${repo}`);
    console.log('\n🎉 Your months of work is now safe and published!');
    
  } catch (error) {
    console.error('\n❌ Publish failed:', error.message);
    console.error('\nPlease try using Replit Version Control UI instead.');
    throw error;
  }
}

console.log('Starting auto-publish in 3 seconds...');
console.log('Press Ctrl+C to cancel');

setTimeout(() => {
  publishToGitHub()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}, 3000);
