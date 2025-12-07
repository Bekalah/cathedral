#!/bin/bash

echo "🔍 Cathedral Self-Hosting System Health Check"
echo "============================================="

# Check system resources
echo "📊 System Resources:"
echo "Memory Usage:"
free -h
echo -e "\nDisk Space:"
df -h | head -2

echo -e "\n🐳 Docker Status:"
docker --version 2>/dev/null && echo "✅ Docker installed" || echo "❌ Docker not found"
if docker ps 2>/dev/null >/dev/null; then
    echo "✅ Docker daemon running"
    echo "   Active containers: $(docker ps -q | wc -l)"
else
    echo "❌ Docker daemon not running"
fi

echo -e "\n🌐 Network Status:"
if ping -c 1 google.com >/dev/null 2>&1; then
    echo "✅ Internet connection working"
else
    echo "❌ No internet connection"
fi

echo -e "\n🔧 Development Tools:"
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js installed ($(node --version))"
else
    echo "❌ Node.js not found"
fi

if command -v npm >/dev/null 2>&1; then
    echo "✅ npm available ($(npm --version))"
else
    echo "❌ npm not found"
fi

if command -v nginx >/dev/null 2>&1; then
    echo "✅ Nginx installed"
    if systemctl is-active --quiet nginx; then
        echo "   ✅ Nginx service running"
    else
        echo "   ❌ Nginx service not running"
    fi
else
    echo "❌ Nginx not found"
fi

if command -v python3 >/dev/null 2>&1; then
    echo "✅ Python3 installed ($(python3 --version))"
else
    echo "❌ Python3 not found"
fi

echo -e "\n🚀 Cathedral Deployment Files:"
if [ -d "deploy-cataract-book-scanner" ]; then
    echo "✅ Static site deployment files found"
    if [ -f "deploy-cataract-book-scanner/index.html" ]; then
        echo "   ✅ index.html present"
    else
        echo "   ❌ index.html missing"
    fi
else
    echo "❌ Static deployment files missing"
fi

if [ -d "deploy-hall-of-ateliers" ]; then
    echo "✅ React app deployment files found"
    if [ -d "deploy-hall-of-ateliers/dist" ]; then
        echo "   ✅ dist folder present"
    else
        echo "   ❌ dist folder missing"
    fi
else
    echo "❌ React deployment files missing"
fi

if [ -d "deploy-cathedral-logo-system" ]; then
    echo "✅ Logo system deployment files found"
else
    echo "❌ Logo system deployment files missing"
fi

echo -e "\n🌐 Port Availability:"
for port in 80 443 3000 3001 8080 9090; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "   ❌ Port $port is in use"
    else
        echo "   ✅ Port $port is available"
    fi
done

echo -e "\n🎯 Quick Test Commands:"
echo "1. Test static site:"
echo "   cd deploy-cataract-book-scanner && python3 -m http.server 3000"
echo "   Then visit: http://localhost:3000"
echo -e "\n2. Test React app:"
echo "   cd deploy-hall-of-ateliers && npx serve -s dist -l 3001"
echo "   Then visit: http://localhost:3001"
echo -e "\n3. Test with Docker:"
echo "   cd coolify && docker-compose up -d"
echo "   Then visit: http://localhost:3000"

echo -e "\n📋 System Recommendations:"
if [ $(free -m | awk 'NR==2{printf "%.0f", $7*100/$2 }') -lt 20 ]; then
    echo "⚠️  Low memory available - consider closing applications"
fi

if [ $(df / | tail -1 | awk '{print $5}' | sed 's/%//') -gt 80 ]; then
    echo "⚠️  Disk space getting low - consider cleaning up"
fi

if ! command -v docker >/dev/null 2>&1; then
    echo "💡 Consider installing Docker for containerized testing"
fi

if ! command -v nginx >/dev/null 2>&1; then
    echo "💡 Consider installing Nginx for production-like testing"
fi

echo -e "\n✅ System check complete!"