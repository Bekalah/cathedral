import fsp from 'fs/promises';
import path from 'path';

export async function loadLocalFiles(roots, globs) {
  const collected = [];
  const patterns = (globs || []).map(glob => ({ glob, regex: globToRegex(glob) }));
  if (!patterns.length) {
    return collected;
  }
  for (const root of roots) {
    let stat;
    try {
      stat = await fsp.stat(root);
    } catch {
      continue;
    }
    if (!stat.isDirectory()) {
      continue;
    }
    await walk(root, async absolute => {
      const relative = path.relative(root, absolute).split(path.sep).join('/');
      if (patterns.some(pattern => pattern.regex.test(relative))) {
        try {
          const content = await fsp.readFile(absolute, 'utf8');
          collected.push({ repo: path.basename(root), path: relative, content });
        } catch {
          /* ignore unreadable files */
        }
      }
    });
  }
  return collected;
}

export async function loadGithubFiles(org, repos, globs, token) {
  const collected = [];
  if (!Array.isArray(repos) || !repos.length || !Array.isArray(globs) || !globs.length) {
    return collected;
  }

  const headers = token ? { Authorization: `token ${token}`, Accept: 'application/vnd.github+json' } : { Accept: 'application/vnd.github+json' };

  for (const repo of repos) {
    const repoMeta = await fetchJson(`https://api.github.com/repos/${org}/${repo}`, headers);
    if (!repoMeta) continue;
    const branch = repoMeta.default_branch || 'main';
    const tree = await fetchJson(`https://api.github.com/repos/${org}/${repo}/git/trees/${branch}?recursive=1`, headers);
    if (!tree || !Array.isArray(tree.tree)) continue;

    const wanted = tree.tree
      .filter(entry => entry.type === 'blob')
      .filter(entry => globs.some(pattern => matchSimple(entry.path, pattern)));

    for (const entry of wanted) {
      const blob = await fetchJson(entry.url, headers);
      if (!blob || !blob.content) continue;
      const content = Buffer.from(blob.content, 'base64').toString('utf8');
      collected.push({ repo, path: entry.path, content, sha: entry.sha });
    }
  }
  return collected;
}

async function walk(dir, onFile) {
  const entries = await fsp.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(absolute, onFile);
    } else if (entry.isFile()) {
      await onFile(absolute);
    }
  }
}

async function fetchJson(url, headers) {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function globToRegex(glob) {
  let regex = '^';
  for (let i = 0; i < glob.length; i += 1) {
    const char = glob[i];
    if (char === '*') {
      if (glob[i + 1] === '*') {
        regex += '.*';
        i += 1;
      } else {
        regex += '[^/]*';
      }
    } else {
      regex += escapeRegex(char);
    }
  }
  regex += '$';
  return new RegExp(regex);
}

function escapeRegex(char) {
  return /[.+^${}()|[\]\\]/.test(char) ? `\\${char}` : char;
}

function matchSimple(filePath, pattern) {
  if (!pattern.includes('*')) {
    return filePath === pattern;
  }
  const [prefix, suffix] = pattern.split('*');
  return filePath.startsWith(prefix) && filePath.endsWith(suffix);
}
