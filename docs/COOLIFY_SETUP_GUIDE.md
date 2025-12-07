# 🏛️ Coolify Self-Hosted Setup Guide - Cathedral Real

This guide shows you how to completely replace Cloudflare with self-hosted Coolify for the Cathedral Real project.

## 🎯 **Why Coolify?**

- **Complete Control**: Self-hosted deployment platform
- **Zero Monthly Costs**: No Cloudflare bills
- **Enterprise Features**: Advanced CI/CD, monitoring, and security
- **Docker Native**: Perfect for the Cathedral Real monorepo
- **Multi-Environment**: Dev, staging, production in one platform

## 🚀 **Quick Start Setup**

### 1. **Prerequisites**
```bash
# System requirements
- Ubuntu 22.04 LTS or later
- 4GB RAM minimum (8GB recommended)
- 50GB disk space minimum
- Docker and Docker Compose installed
```

### 2. **Install Docker**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y
```

### 3. **Deploy Coolify**
```bash
# Clone this repository
git clone https://github.com/your-username/cathedral-real.git
cd cathedral-real

# Create Coolify directory
mkdir -p coolify/{data,logs,ssl}

# Start Coolify stack
cd coolify
docker compose up -d

# Verify deployment
docker compose ps
```

### 4. **Access Coolify Dashboard**
- Open browser: `http://your-server-ip:3000`
- Complete initial setup wizard
- Create admin account

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    Coolify Self-Hosted Platform              │
├─────────────────────────────────────────────────────────────┤
│  📊 Coolify Dashboard (Port 3000)                           │
│  🔧 Backend API (Port 8080)                                 │
│  🗄️ PostgreSQL Database                                     │
│  ⚡ Redis Cache                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Nginx Reverse Proxy                      │
│  🌐 cathedral.example.com (Main)                            │
│  📱 cataract.cathedral.example.com                          │
│  🎨 ateliers.cathedral.example.com                          │
│  🏷️ logo.cathedral.example.com                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Cathedral Applications                       │
│  📚 cataract-book-scanner (React + Vite)                    │
│  🏛️ hall-of-ateliers (React + Three.js)                     │
│  🎨 cathedral-logo-system (React + Three.js)               │
│  🎮 Godot Games (Web Exports)                              │
│  📦 132+ npm Packages                                      │
└─────────────────────────────────────────────────────────────┘
```

## 🌐 **Domain Configuration**

### **DNS Setup**
Configure your domain's DNS to point to your Coolify server:

```dns
# A Records
cathedral.example.com        -> YOUR_SERVER_IP
cataract.cathedral.example.com -> YOUR_SERVER_IP  
ateliers.cathedral.example.com  -> YOUR_SERVER_IP
logo.cathedral.example.com      -> YOUR_SERVER_IP
```

### **SSL Certificates**
```bash
# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificates
sudo certbot --nginx -d cathedral.example.com
sudo certbot --nginx -d cataract.cathedral.example.com
sudo certbot --nginx -d ateliers.cathedral.example.com
sudo certbot --nginx -d logo.cathedral.example.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚢 **Deploy Cathedral Applications**

### **Method 1: Coolify UI (Recommended)**
1. Open Coolify dashboard (`http://your-server-ip:3000`)
2. Click "New Project"
3. Connect GitHub/GitLab repository
4. Select cathedral-real
5. Configure build settings:
   ```yaml
   Build Command: pnpm install && turbo run build
   Output Directory: packages/cataract-book-scanner/dist
   Node Version: 20.18.0
   ```
6. Deploy!

### **Method 2: Docker Compose**
```bash
# Deploy specific application
cd cathedral-real
docker compose -f coolify/docker-compose.yml -f apps/cataract-scanner.yml up -d

# Deploy all applications
./scripts/deploy-coolify.sh production
```

### **Method 3: Coolify CLI**
```bash
# Install Coolify CLI
npm install -g @coolify/cli

# Deploy from command line
coolify deploy --project cathedral-real --env production
```

## 🔧 **Configuration Files**

### **Coolify Project Configuration**
Create `coolify/coolify.json`:
```json
{
  "name": "cathedral-real",
  "version": "1.0.0",
  "description": "Cathedral Real Cosmos Builder Platform",
  "environment": "production",
  "domains": {
    "main": "cathedral.example.com",
    "apps": [
      "cataract.cathedral.example.com",
      "ateliers.cathedral.example.com", 
      "logo.cathedral.example.com"
    ]
  },
  "services": {
    "postgres": {
      "image": "postgres:15-alpine",
      "environment": {
        "POSTGRES_DB": "cathedral",
        "POSTGRES_USER": "cathedral",
        "POSTGRES_PASSWORD": "secure-password-here"
      }
    },
    "redis": {
      "image": "redis:7-alpine"
    }
  },
  "apps": [
    {
      "name": "cataract-book-scanner",
      "repository": "packages/cataract-scanner",
      "build": {
        "command": "pnpm install && turbo run build",
        "output": "packages/cataract-scanner/dist"
      },
      "domain": "cataract.cathedral.example.com"
    },
    {
      "name": "hall-of-ateliers", 
      "repository": "packages/hall-of-ateliers",
      "build": {
        "command": "pnpm install && turbo run build",
        "output": "packages/hall-of-ateliers/dist"
      },
      "domain": "ateliers.cathedral.example.com"
    },
    {
      "name": "cathedral-logo-system",
      "repository": "packages/cathedral-logo-system", 
      "build": {
        "command": "pnpm install && turbo run build",
        "output": "packages/cathedral-logo-system/dist"
      },
      "domain": "logo.cathedral.example.com"
    }
  ]
}
```

## 📊 **Monitoring & Maintenance**

### **Health Checks**
```bash
# Check Coolify services
docker compose -f coolify/docker-compose.yml ps

# Monitor resources
docker stats

# Check logs
docker compose -f coolify/docker-compose.yml logs -f coolify
```

### **Backup Strategy**
```bash
# Database backup
docker exec coolify-postgres pg_dump -U postgres cathedral > backup-$(date +%Y%m%d).sql

# Application data backup
tar -czf cathedral-data-$(date +%Y%m%d).tar.gz coolify/data/

# Automated backup script
#!/bin/bash
# Add to crontab: 0 2 * * * /path/to/backup-cathedral.sh
```

### **Update Coolify**
```bash
# Pull latest images
docker compose -f coolify/docker-compose.yml pull

# Restart services
docker compose -f coolify/docker-compose.yml up -d

# Clean up old images
docker image prune -f
```

## 🔒 **Security Configuration**

### **Firewall Setup**
```bash
# Configure UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp  # Coolify UI (restrict to admin IPs)
```

### **Security Headers**
Add to `nginx.conf`:
```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **Coolify Won't Start**
```bash
# Check logs
docker compose -f coolify/docker-compose.yml logs coolify

# Restart services
docker compose -f coolify/docker-compose.yml restart
```

#### **Port Conflicts**
```bash
# Check port usage
sudo netstat -tlnp | grep :3000

# Change ports in docker-compose.yml if needed
ports:
  - "3001:3000"  # Change UI port
```

#### **Database Connection Issues**
```bash
# Check database status
docker exec coolify-postgres pg_isready

# Reset database
docker compose -f coolify/docker-compose.yml down -v
docker compose -f coolify/docker-compose.yml up -d
```

## 💰 **Cost Comparison**

| Service | Cloudflare | Coolify (Self-Hosted) |
|---------|------------|----------------------|
| **Static Hosting** | $20+/month | $0/month |
| **CDN** | $20+/month | $0/month |  
| **Edge Functions** | $5+/month | $0/month |
| **Analytics** | $10+/month | $0/month |
| **SSL** | $8+/month | $0/month |
| **Server** | N/A | $10-50/month |

**Total Savings: $63-108/month**

## 🎯 **Next Steps**

1. **Set up Coolify** following this guide
2. **Configure DNS** for your domains
3. **Deploy Cathedral applications** via Coolify UI
4. **Set up monitoring** and backups
5. **Configure SSL** certificates
6. **Scale as needed** with additional servers

## 📚 **Resources**

- [Coolify Documentation](https://coolify.io/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Let's Encrypt SSL](https://letsencrypt.org/)

---

**🎉 Enjoy your completely free, self-hosted Cathedral Real platform!**