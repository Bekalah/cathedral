# 🦊 GitLab Duo Quick Start Guide

**Cathedral of Circuits - Magnum Opus Version 1.0**

## ✅ Setup Complete!

Your GitLab Duo is configured and ready to work with your monorepo pipeline.

## 🚀 3-Minute Setup

### 1. Install GitLab Extension (1 min)

```bash
# In VS Code:
# 1. Press Cmd+Shift+X (Mac) or Ctrl+Shift+X (Windows/Linux)
# 2. Search: "GitLab Workflow"
# 3. Click Install
# 4. Restart VS Code
```

### 2. Authenticate (1 min)

```bash
# In VS Code:
# 1. Press Cmd+Shift+P / Ctrl+Shift+P
# 2. Type: "GitLab: Sign In"
# 3. Choose "Personal Access Token"
# 4. Get token from: https://gitlab.com/-/user_settings/personal_access_tokens
#    - Name: VS-Code-Duo
#    - Scopes: api, read_repository, write_repository
#    - Expiration: 90 days
# 5. Paste token
```

### 3. Open Duo Chat (30 sec)

```bash
# In VS Code:
# 1. Click GitLab icon in sidebar
# 2. Click "Open GitLab Duo Chat"
# OR
# Press Cmd+Shift+P → "GitLab: Open Duo Chat"
```

## 💬 Example Prompts

### About Your Pipeline

```
Show me my current pipeline status

Why is my build job failing?

How can I optimize my .gitlab-ci.yml for faster builds?
```

### About Your Monorepo

```
How do I add a new package to this pnpm workspace?

Explain how Turbo caching works in this monorepo

Why is pnpm install failing in CI but works locally?
```

### About Code

```
Help me fix the TypeScript error in tools/gemini-3-quality-enhancer.mjs

Explain the quality:enhance script

How does the unified experiment work?
```

## 🎯 Common Tasks

### View Pipeline Status

1. GitLab sidebar → Pipelines
2. See passing/failing jobs
3. Click any job to view logs

### Ask About Pipeline Issues

```
My pipeline is failing in the quality stage. Help me debug it.

The build job is timing out. What can I do?

How do I reduce pipeline execution time?
```

### Get Code Help

```
Show me how to use Turbo caching in this monorepo

Help me add a new CI/CD job for deployment

Explain the pnpm workspace structure
```

## 📚 Full Documentation

For complete setup and advanced usage, see:
- `docs/GITLAB_DUO_MONOREPO_SETUP.md` - Complete setup guide
- `.gitlab-duo-context.md` - Project context for Duo

## 🔧 Your Configuration

✅ GitLab API: `https://gitlab.com/api/v4`  
✅ Default Project: `bekalah/cathedral`  
✅ Context File: `.gitlab-duo-context.md`  
✅ Monorepo Rules: Enabled  
✅ Code Suggestions: Enabled  

## 🎉 You're Ready!

GitLab Duo now understands:
- Your pnpm + Turbo monorepo
- Your CI/CD pipeline structure
- Your quality standards (Gemini 3 A+)
- Your project structure and conventions

**Start chatting with Duo to get help with your pipeline and code!**

---

**Part of Cathedral of Circuits - Magnum Opus Version 1.0**

