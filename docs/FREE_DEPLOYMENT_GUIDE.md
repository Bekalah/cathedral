# 🏰 Cathedral - FREE Deployment Guide

## Overview

This guide covers deploying Cathedral to **5 FREE platforms** with zero cost.

**Total Monthly Cost: $0.00**

---

## 🎯 Quick Start

```bash
# Build all apps
pnpm run build

# Deploy to all platforms
./scripts/deploy-all-free.sh
```

---

## 📄 GitHub Pages (FREE)

**Best for**: Static sites, documentation
**Bandwidth**: Unlimited (public repos)
**Custom domains**: Yes

### Setup

1. Go to repository settings: `Settings > Pages`
2. Set source to "GitHub Actions"
3. Push to `main` branch

### URL
```
https://bekalah.github.io/cathedral
```

### Workflow
The `deploy-all-platforms.yml` workflow handles deployment automatically on push.

---

## ▲ Vercel (FREE Tier)

**Best for**: Next.js apps, serverless functions
**Bandwidth**: 100GB/month
**Serverless**: 100GB-hours
**Builds**: 6,000 minutes/month

### Setup via Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Bekalah/cathedral`
3. Configure:
   - **Root Directory**: `apps/web`
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `pnpm run build`
4. Deploy

### Setup via CLI

```bash
# Install CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### GitHub Integration (Optional)

Add these secrets to your repository (`Settings > Secrets > Actions`):
- `VERCEL_TOKEN` - Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - Found in `.vercel/project.json`
- `VERCEL_PROJECT_ID` - Found in `.vercel/project.json`

### URL
```
https://cathedral.vercel.app
```

---

## ☁️ Cloudflare Pages (FREE)

**Best for**: Global CDN, unlimited bandwidth
**Bandwidth**: UNLIMITED!
**Builds**: 500/month
**Workers**: 100,000 requests/day

### Setup via Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to `Pages`
3. Create a project:
   - Connect to Git: `Bekalah/cathedral`
   - **Build command**: `pnpm install && pnpm run build && cd apps/web && pnpm run export`
   - **Build output**: `apps/web/out`
4. Deploy

### Setup via CLI

```bash
# Install Wrangler
pnpm add -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy apps/web/out --project-name=cathedral
```

### GitHub Integration (Optional)

Add these secrets:
- `CLOUDFLARE_API_TOKEN` - Get from [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
- `CLOUDFLARE_ACCOUNT_ID` - Found in dashboard sidebar

### URL
```
https://cathedral.pages.dev
```

---

## 🎨 Render (FREE Tier)

**Best for**: Full-stack apps, background workers
**Compute**: 750 hours/month
**Bandwidth**: 100GB outbound
**Static sites**: Unlimited

### Setup

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect `Bekalah/cathedral`
4. Render auto-detects `render.yaml`
5. Click "Apply"

### Services Created

| Service | Type | URL |
|---------|------|-----|
| cathedral-web | Web | cathedral-web.onrender.com |
| cathedral-synth-lab | Static | cathedral-synth-lab.onrender.com |
| cathedral-tarot-arena | Static | cathedral-tarot-arena.onrender.com |

### URL
```
https://cathedral-web.onrender.com
```

---

## 🪁 Fly.io (FREE Tier)

**Best for**: Container apps, global deployment
**VMs**: 3 shared (256MB)
**Bandwidth**: 160GB outbound
**Storage**: 3GB persistent

### Setup

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth signup
# or
flyctl auth login

# Launch (first time)
flyctl launch --no-deploy

# Deploy
flyctl deploy
```

### URL
```
https://cathedral.fly.dev
```

---

## 🔧 Configuration Files

| Platform | Config File |
|----------|------------|
| Vercel | `vercel.json` |
| Cloudflare | `cloudflare-pages.toml`, `wrangler.toml` |
| Render | `render.yaml` |
| Fly.io | `fly.toml` |
| Docker | `Dockerfile` |
| GitHub Actions | `.github/workflows/deploy-all-platforms.yml` |

---

## 📊 FREE Tier Comparison

| Platform | Bandwidth | Builds | Best Use Case |
|----------|-----------|--------|---------------|
| GitHub Pages | Unlimited | Unlimited | Static sites |
| Vercel | 100GB/mo | 6000 min | Next.js |
| Cloudflare | **Unlimited** | 500/mo | Global CDN |
| Render | 100GB | Unlimited | Full-stack |
| Fly.io | 160GB | Unlimited | Containers |

---

## 🚀 One-Command Deployments

```bash
# Deploy to GitHub Pages (automatic on push)
git push origin main

# Deploy to Vercel
vercel --prod

# Deploy to Cloudflare
wrangler pages deploy apps/web/out --project-name=cathedral

# Deploy to Fly.io
flyctl deploy
```

---

## 📈 Monitoring

```bash
# Check all platform status
./scripts/monitor-free.sh
```

This script checks:
- Platform availability
- Response times
- FREE tier usage estimates

---

## 🛡️ Best Practices

1. **Use GitHub Pages as primary** - Unlimited bandwidth for public repos
2. **Cloudflare for CDN** - Put in front of other services
3. **Vercel for Next.js** - Best Next.js hosting
4. **Render for APIs** - Great for backend services
5. **Fly.io for containers** - When you need Docker

---

## 💰 Cost Summary

| Platform | Monthly Cost |
|----------|-------------|
| GitHub Pages | $0.00 |
| Vercel | $0.00 |
| Cloudflare | $0.00 |
| Render | $0.00 |
| Fly.io | $0.00 |
| **TOTAL** | **$0.00** |

---

## 🔗 Quick Links

- [GitHub Actions](https://github.com/Bekalah/cathedral/actions)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [Render Dashboard](https://dashboard.render.com)
- [Fly.io Dashboard](https://fly.io/dashboard)

---

*Cathedral Magnum Opus - 100% FREE deployment*

