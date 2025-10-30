#!/bin/bash
# Quick Start Script for Enhanced x500 Agent System
# This script sets up and runs the massively parallel agent system

set -e

echo "========================================"
echo "🔮 CATHEDRAL ENHANCED AGENT SYSTEM x500"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for .env file
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Please create a .env file with your Azure credentials:"
    echo "  PROJECT_ENDPOINT=https://your-resource.services.ai.azure.com/api/projects/cathedral"
    echo "  PROJECT_API_KEY=your-api-key-here"
    echo "  AGENT_ID_KAOZ=asst_72uzK1Yt2hsu2qVyt22NkMiO"
    echo "  AGENT_ID_ORDER=asst_Pgb3ctXzbsv21gX2auBeEFZx"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check for Python virtual environment
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}📦 Creating Python virtual environment...${NC}"
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install/upgrade required packages
echo -e "${BLUE}📥 Installing dependencies...${NC}"
pip install --upgrade pip > /dev/null 2>&1
pip install azure-ai-projects azure-identity azure-ai-agents > /dev/null 2>&1
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Configuration options
echo "Configuration Options:"
echo "  1. Light Mode (10 agents) - Quick test"
echo "  2. Medium Mode (100 agents) - Standard run"
echo "  3. Heavy Mode (500 agents) - Maximum throughput"
echo "  4. Custom Mode - Specify your own settings"
echo ""
read -p "Select mode (1-4): " mode

case $mode in
    1)
        export MAX_PARALLEL_AGENTS=10
        export BATCH_SIZE=10
        export CONNECTION_POOL_SIZE=5
        echo -e "${GREEN}Running Light Mode (10 agents)${NC}"
        ;;
    2)
        export MAX_PARALLEL_AGENTS=100
        export BATCH_SIZE=50
        export CONNECTION_POOL_SIZE=50
        echo -e "${GREEN}Running Medium Mode (100 agents)${NC}"
        ;;
    3)
        export MAX_PARALLEL_AGENTS=500
        export BATCH_SIZE=100
        export CONNECTION_POOL_SIZE=200
        echo -e "${GREEN}Running Heavy Mode (500 agents)${NC}"
        ;;
    4)
        read -p "Number of parallel agents: " MAX_PARALLEL_AGENTS
        read -p "Batch size: " BATCH_SIZE
        read -p "Connection pool size: " CONNECTION_POOL_SIZE
        export MAX_PARALLEL_AGENTS
        export BATCH_SIZE
        export CONNECTION_POOL_SIZE
        echo -e "${GREEN}Running Custom Mode${NC}"
        ;;
    *)
        echo -e "${RED}Invalid selection. Defaulting to Light Mode.${NC}"
        export MAX_PARALLEL_AGENTS=10
        export BATCH_SIZE=10
        export CONNECTION_POOL_SIZE=5
        ;;
esac

echo ""
echo "========================================"
echo "🚀 Launching Enhanced Agent System"
echo "========================================"
echo "  Agents: $MAX_PARALLEL_AGENTS"
echo "  Batch Size: $BATCH_SIZE"
echo "  Connection Pool: $CONNECTION_POOL_SIZE"
echo "========================================"
echo ""

# Run the enhanced agent system
python run_agents_enhanced_x500.py

echo ""
echo -e "${GREEN}✨ Agent run complete!${NC}"
echo -e "${BLUE}📊 Check agent_responses/ for results and metrics${NC}"
echo ""
