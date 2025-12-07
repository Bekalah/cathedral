# 🔧 **Self-Hosting Debug & System Health Guide**

Complete system debugging, testing, and terminal cleanup for self-hosting

## 🚀 **Your Complete Local Development Environment**

### **Option 1: Docker Desktop (Recommended)**

Perfect for testing self-hosting without system pollution

#### Quick Setup

```bash
# Install Docker Desktop
# macOS: brew install --cask docker
# Windows: Download from docker.com
# Ubuntu: curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh

# Verify installation
docker --version
docker-compose --version

# Test Docker is working
docker run hello-world
```bash

#### Why This Works for Self-Hosting

- ✅ **Isolated environment** - Won't mess up your system
- ✅ **Exact same stack** as production self-hosting
- ✅ **Easy cleanup** - One command removes everything
- ✅ **Multiple versions** - Test different setups easily

---

### **Option 2: Local Nginx + Node.js (Lightweight)**

For testing simple deployments without Docker overhead

#### Setup Commands

```bash
# Install pnpm (primary package manager)
npm install -g pnpm

# Install Node.js (for React apps)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx (for static sites)
sudo apt update
sudo apt install nginx -y

# Verify installations
node --version
pnpm --version
nginx -v
```bash

---

## 🔍 **System Health Diagnostics**

### Check Your System Resources

```bash
# Memory usage
free -h

# Disk space
df -h

# CPU info
lscpu | grep "Model name"

# Running processes
top -o %CPU

# Port usage (check what's taking up ports)
sudo lsof -i :3000
sudo lsof -i :80
sudo lsof -i :443
```bash

### Network Diagnostics

```bash
# Test internet connectivity
ping -c 4 8.8.8.8

# Check DNS resolution
nslookup google.com

# Test local web server (after setup)
curl -I http://localhost:3000
curl -I http://localhost:80
```bash

---

## 🧪 **Local Testing Workflows**

### Test 1: Static Site (cataract-book-scanner)

#### Method A: Simple Python Server

```bash
cd deploy-cataract-book-scanner
python3 -m http.server 3000
# Visit: http://localhost:3000
```bash

#### Method B: Nginx

```bash
# Copy files to web root
sudo cp -r deploy-cataract-book-scanner/* /var/www/html/

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Visit: http://localhost
```bash

#### Method C: Docker (React App):

```bash
docker run -d --name cataract-scanner -p 3000:80 \
  -v $(pwd)/deploy-cataract-book-scanner:/usr/share/nginx/html \
  nginx:alpine

# Visit: http://localhost:3000
```bash

---

### Test 2: React App (hall-of-ateliers)

#### Method A: Serve (Fastest)

```bash
cd deploy-hall-of-ateliers
pnpm install  # Use pnpm instead of npm
npx serve -s dist -l 3001
# Visit: http://localhost:3001
```bash

#### Method B: Node.js Express

```bash
cd deploy-hall-of-ateliers
pnpm install -g serve
serve -s dist -l 3001
```bash

#### Method C: Docker (React App):

```bash
docker run -d --name hall-ateliers -p 3001:3000 \
  -v $(pwd)/deploy-hall-of-ateliers/dist:/usr/share/nginx/html \
  nginx:alpine

# Visit: http://localhost:3001
```bash

---

### Test 3: Coolify Self-Hosting Stack

#### Complete Docker Compose Test

```bash
# Create test directory
mkdir cathedral-test
cd cathedral-test

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services
  nginx
    image: nginx:alpine
    ports
      - "8080:80"
    volumes
      - ./deploy-cataract-book-scanner:/usr/share/nginx/html
    restart: unless-stopped

  node-app
    image: node:18-alpine
    ports
      - "3001:3000"
    working_dir: /app
    volumes
      - ./deploy-hall-of-ateliers:/app
    command: sh -c "npm install -g pnpm serve && pnpm install && serve -s dist -l 3000"
    restart: unless-stopped
EOF

# Start the stack
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Visit your apps
# Static site: http://localhost:8080
# React app: http://localhost:3001
```bash

---

## 🔧 **Terminal Diagnostics & Cleanup**

### Common Terminal Issues & Fixes

#### Issue 1: Permission Errors

```bash
# Fix file permissions
sudo chown -R $USER:$USER .
chmod +x scripts/*.sh

# Fix Docker permissions (Linux)
sudo usermod -aG docker $USER
newgrp docker
```bash

#### Issue 2: Port Already in Use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or use a different port
python3 -m http.server 3001
```bash

#### Issue 3: pnpm Version Conflicts

```bash
# Check pnpm version
pnpm --version

# Install or update pnpm
npm install -g pnpm@latest

# Install specific Node version with nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```bash

#### Issue 4: Docker Issues

```bash
# Clean up Docker
docker system prune -a

# Remove all containers and images
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)

# Restart Docker service
sudo systemctl restart docker
```bash

### Terminal Performance Optimization

```bash
# Clear terminal history
history -c
> ~/.bash_history

# Clean package caches
pnpm store prune
yarn cache clean

# Remove old logs
sudo journalctl --vacuum-time=7d

# Update system packages
sudo apt update && sudo apt upgrade -y
```bash

---

## 📊 **Monitoring & Debugging Tools**

### Web Application Monitoring

```bash
# Install monitoring tools
pnpm install -g lighthouse
pnpm install -g nodemon

# Test performance
lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# Monitor file changes
nodemon deploy-hall-of-ateliers/dist/index.html
```bash

### Network Debugging

```bash
# Install network tools
sudo apt install curl wget net-tools -y

# Test API endpoints
curl -X GET http://localhost:3000/api/test
curl -I http://localhost:3000

# Monitor network traffic
sudo tcpdump -i any port 3000
```bash

### Log Analysis

```bash
# View system logs
sudo journalctl -f

# View Docker logs
docker logs <container-name>
docker-compose logs -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```bash

---

## ⚡ **Quick System Health Check Script**

Create this script to check everything at once

```bash
#!/bin/bash
# save as: system-health-check.sh

echo "🔍 Cathedral Self-Hosting System Health Check"
echo "============================================="

# Check system resources
echo "📊 System Resources:"
free -h
df -h | head -2

echo -e "\n🐳 Docker Status:"
docker --version 2>/dev/null && echo "✅ Docker installed" || echo "❌ Docker not found"
docker ps 2>/dev/null && echo "✅ Docker running" || echo "❌ Docker not running"

echo -e "\n🌐 Network Status:"
ping -c 1 google.com >/dev/null 2>&1 && echo "✅ Internet connected" || echo "❌ No internet"

echo -e "\n🔧 Development Tools:"
node --version 2>/dev/null && echo "✅ Node.js installed" || echo "❌ Node.js not found"
pnpm --version 2>/dev/null && echo "✅ pnpm available" || echo "❌ pnpm not found"
nginx -v 2>/dev/null && echo "✅ Nginx installed" || echo "❌ Nginx not found"

echo -e "\n🚀 Quick Tests:"
if [ -d "deploy-cataract-book-scanner" ]; then
    echo "✅ Static deployment files found"
else
    echo "❌ Static deployment files missing"
fi

if [ -d "deploy-hall-of-ateliers" ]; then
    echo "✅ React deployment files found"
else
    echo "❌ React deployment files missing"
fi

echo -e "\n🎯 Next Steps:"
echo "1. Run: bash system-health-check.sh (this script)"
echo "2. Test: python3 -m http.server 3000 (in deploy-cataract-book-scanner)"
echo "3. Visit: http://localhost:3000"
echo "4. Monitor: docker-compose ps (if using Docker)"

# Make executable
chmod +x system-health-check.sh
```bash

---

## 🎯 **Recommended Testing Workflow**

### Phase 1: System Check

```bash
# Run system diagnostics
bash system-health-check.sh

# Check available ports
sudo lsof -i :80
sudo lsof -i :3000
sudo lsof -i :443
```bash

### Phase 2: Basic Testing

```bash
# Test static site
cd deploy-cataract-book-scanner
python3 -m http.server 3000
# Visit http://localhost:3000

# Test React app (new terminal)
cd deploy-hall-of-ateliers
pnpm install && pnpm build
npx serve -s dist -l 3001
# Visit http://localhost:3001
```bash

### Phase 3: Production-like Testing

```bash
# Test with Docker
cd coolify
docker-compose up -d

# Monitor with logs
docker-compose logs -f

# Check all services
docker-compose ps
```bash

---

## 🚨 **Troubleshooting Common Issues**

### "Command not found" Errors

```bash
# Add to PATH
export PATH=$PATH:/usr/local/bin

# Install missing tools
sudo apt install build-essential curl wget git pnpm -y

# Install pnpm globally
npm install -g pnpm
```bash

### Docker Permission Denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```bash

### Port Binding Issues

```bash
# Use different ports
python3 -m http.server 8080
# Then visit: http://localhost:8080
```bash

### File Permission Issues

```bash
# Fix ownership
sudo chown -R $USER:$USER .
chmod -R 755 .
```bash

---

**Run `bash system-health-check.sh` to see your system status, then follow the testing workflow above!** 🎯
