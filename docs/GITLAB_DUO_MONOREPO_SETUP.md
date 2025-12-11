# 🦊 GitLab Duo Setup for Cathedral Monorepo

**Cathedral of Circuits - Magnum Opus Version 1.0**  
**Author: Rebecca Respawn (pen name)**

## 🎯 Overview

This guide shows you how to connect and work with GitLab Duo in your monorepo with Node.js, pnpm, and Turbo.

## 📋 Prerequisites

1. ✅ GitLab account (Free tier works)
2. ✅ VS Code installed
3. ✅ Your repository on GitLab
4. ✅ GitLab Personal Access Token (PAT)

## 🚀 Step 1: Install GitLab Extension in VS Code

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "**GitLab Workflow**" by GitLab
4. Click **Install**
5. Restart VS Code if prompted

## 🔑 Step 2: Authenticate with GitLab

### Option A: Using Personal Access Token (Recommended)

1. **Create GitLab PAT:**
   - Go to GitLab → Profile → Preferences → Access Tokens
   - Name: `VS-Code-Duo-$(date +%Y%m%d)`
   - Expiration: 90 days (or custom)
   - Scopes: ✅ `api`, ✅ `read_repository`, ✅ `write_repository`
   - Click **Create personal access token**
   - **Copy the token immediately** (you won't see it again!)

2. **Authenticate in VS Code:**
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
   - Type: `GitLab: Sign In`
   - Choose **Personal Access Token**
   - Paste your token
   - Press Enter

### Option B: OAuth (Alternative)

1. Press `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Type: `GitLab: Sign In`
3. Choose **OAuth**
4. Authorize in browser

## 🔧 Step 3: Configure VS Code Settings

Create or update `.vscode/settings.json`:

```json
{
  "gitlab.api": "https://gitlab.com/api/v4",
  "gitlab.showStatusBar": true,
  "gitlab.defaultProject": "bekalah/cathedral",
  "gitlab.duo.enabled": true,
  
  // Monorepo-specific settings
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/.pnpm-store/**": true,
    "**/.turbo/**": true,
    "**/dist/**": true,
    "**/build/**": true
  },
  
  // Node.js/TypeScript settings
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  
  // pnpm settings
  "npm.packageManager": "pnpm",
  "pnpm.enabled": true
}
```

## 📝 Step 4: Create Project Context File

Create `.gitlab-duo-context.md` in your repo root:

```markdown
# Cathedral of Circuits - Monorepo Context

## Project Structure

This is a **monorepo** using:
- **Package Manager**: pnpm (NOT npm or yarn)
- **Build System**: Turbo
- **Node.js Version**: 23
- **Package Manager Location**: `.pnpm-store/`

## Directory Structure

- `packages/` - Shared packages and libraries
- `apps/` - Applications (web apps, etc.)
- `tools/` - Development tools and scripts
- `scripts/` - Build and deployment scripts
- `design-suite/` - Python design tools
- `external-repos/` - External repository connections

## Key Files

- `turbo.json` - Turbo build configuration
- `pnpm-workspace.yaml` - pnpm workspace configuration
- `.gitlab-ci.yml` - GitLab CI/CD pipeline
- `package.json` - Root package.json (DO NOT run npm here)

## Important Commands

- Install dependencies: `pnpm install`
- Build: `pnpm build` (uses Turbo)
- Run quality checks: `pnpm quality:all`
- Run unified experiment: `pnpm experiment:unified`

## CI/CD Pipeline

The GitLab CI/CD pipeline:
- Uses shallow clones (`GIT_DEPTH: 5`)
- Uses fetch strategy for large repos
- Preserves cache between builds
- Has quality stage with Gemini 3 A+ standards
- Optimized for monorepo performance

## Quality Standards

- Gemini 3 A+ Golden Standard
- TypeScript strict mode
- Zero lint errors
- Museum-grade visual quality
- Trauma-safe design

## GitLab Project

- URL: https://gitlab.com/bekalah/cathedral
- Default branch: `main`
- Pipeline: `.gitlab-ci.yml`
```

## 🤖 Step 5: Using GitLab Duo Chat

### Open GitLab Duo Chat

1. Click the **GitLab icon** in the VS Code sidebar
2. Click **"Open GitLab Duo Chat"** or press `Cmd+Shift+P` → `GitLab: Open Duo Chat`

### Example Prompts for Your Monorepo

#### CI/CD Pipeline Questions

```
How can I optimize my GitLab CI/CD pipeline for this monorepo?

What's causing my pipeline to fail in the quality stage?

Help me debug the build stage in .gitlab-ci.yml
```

#### Code Questions

```
Explain how Turbo caching works in this monorepo

Show me how to add a new package to this pnpm workspace

Why is my build failing with "Cannot find module"?
```

#### Project-Specific Questions

```
What's the purpose of the quality:enhance script?

How does the unified experiment work?

Explain the Spiritus/Animus/Corpus architecture
```

## 🛠️ Step 6: Working with CI/CD Pipeline

### View Pipeline in VS Code

1. Open the GitLab sidebar
2. Click on your project
3. Navigate to **Pipelines**
4. Click any pipeline to see:
   - Job status
   - Logs
   - Artifacts
   - Duration

### Ask Duo About Pipeline

```
Show me the current pipeline status

What jobs are failing and why?

How long did the last pipeline take?

What artifacts were generated?
```

### Debug Pipeline Locally

```bash
# Test CI/CD script locally
docker run --rm -v $(pwd):/workspace -w /workspace node:23 bash -c "
  npm install -g pnpm
  pnpm install --frozen-lockfile
  pnpm build
"

# Or use GitLab Runner locally (if installed)
gitlab-runner exec docker build
```

## 🎨 Step 7: Duo Code Suggestions

### Enable Code Suggestions

1. Make sure GitLab Duo is authenticated
2. Code suggestions work automatically as you type
3. Accept suggestions with `Tab` or `Cmd+→` / `Ctrl+→`

### Configure Suggestion Settings

Add to `.vscode/settings.json`:

```json
{
  "gitlab.duo.suggestions": {
    "enabled": true,
    "language": ["typescript", "javascript", "json", "yaml"],
    "context": "monorepo"
  }
}
```

## 📊 Step 8: View Pipeline in VS Code

### Access Pipelines

1. GitLab sidebar → Your project
2. Click **Pipelines**
3. See:
   - ✅ Passing pipelines (green)
   - ❌ Failing pipelines (red)
   - ⏸️ Pending pipelines (yellow)

### Pipeline Actions

- **View Logs**: Click any job to see logs
- **Retry Job**: Right-click job → Retry
- **Cancel Pipeline**: Click cancel button
- **View Artifacts**: Download build outputs

## 🔍 Step 9: Duo Can Understand Your Pipeline

### Give Duo Context About Your Setup

When asking about pipelines, mention:

```
I'm using:
- pnpm workspace
- Turbo for builds
- Node.js 23
- Shallow git clones (depth 5)
- Cache preservation for node_modules

My pipeline has stages: build, test, quality, deploy
```

### Example Pipeline Questions

```
Why is my build job taking so long?
→ Duo can analyze .gitlab-ci.yml and suggest optimizations

How can I make tests run faster?
→ Duo can suggest parallel test execution or better caching

The quality stage is failing, help me fix it
→ Duo can check quality-feedback-loop.mjs and suggest fixes
```

## 🚨 Troubleshooting

### Duo Not Responding

1. **Check Authentication:**
   - Open Command Palette (`Cmd+Shift+P`)
   - Run: `GitLab: Sign In`
   - Re-authenticate if needed

2. **Check GitLab URL:**
   - Verify `.vscode/settings.json` has correct `gitlab.api`
   - Should be: `https://gitlab.com/api/v4`

3. **Restart VS Code:**
   - Sometimes restart is needed after auth

### Pipeline Not Showing

1. **Check Project Path:**
   - Verify `gitlab.defaultProject` in settings
   - Format: `username/project-name` or `group/project-name`

2. **Check Permissions:**
   - Your PAT needs `read_repository` scope
   - You need access to the GitLab project

### Code Suggestions Not Working

1. **Enable in Settings:**
   ```json
   {
     "gitlab.duo.suggestions.enabled": true
   }
   ```

2. **Check File Type:**
   - Suggestions work for: TypeScript, JavaScript, JSON, YAML
   - May not work for Python files yet

## 📚 Best Practices

### 1. Give Duo Context

Always mention your setup:
- "In my pnpm monorepo..."
- "Using Turbo build system..."
- "Node.js 23 with pnpm..."

### 2. Reference Specific Files

```
Look at .gitlab-ci.yml and optimize the build stage

Check tools/gemini-3-quality-enhancer.mjs for errors

Review turbo.json for cache configuration
```

### 3. Ask About Pipeline Optimizations

```
How can I make my monorepo pipeline faster?

What's the best caching strategy for pnpm + Turbo?

Should I use shallow clones for this 500MB repo?
```

### 4. Debug Build Issues

```
Why is pnpm install failing in CI but works locally?

My Turbo build cache isn't working, help me debug

The quality stage timeout is happening, how to fix?
```

## 🎯 Quick Reference

### VS Code Commands

- `GitLab: Sign In` - Authenticate
- `GitLab: Open Duo Chat` - Open chat
- `GitLab: Open Pipeline` - View pipelines
- `GitLab: Refresh` - Refresh GitLab data

### Useful Duo Prompts

```
# Pipeline help
"How do I add a new job to my pipeline?"

# Monorepo help
"How do I add a new package to this pnpm workspace?"

# Build help
"Why is my Turbo build not caching properly?"

# CI/CD help
"How can I reduce my pipeline execution time?"
```

## 📖 Additional Resources

- [GitLab Duo Documentation](https://docs.gitlab.com/ee/user/gitlab_duo_chat/)
- [GitLab Workflow Extension](https://marketplace.visualstudio.com/items?itemName=GitLab.gitlab-workflow)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspace Guide](https://pnpm.io/workspaces)

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**  
**Liber Arcanae Codex Abyssiae**

