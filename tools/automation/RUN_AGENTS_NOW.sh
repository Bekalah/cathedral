#!/bin/bash
# IMMEDIATE AGENT LAUNCHER - Get your agents running NOW!
# This bypasses the interactive prompts and runs agents immediately

set -e

echo "🚀 LAUNCHING AGENTS IMMEDIATELY"
echo "================================"

# Load environment
export $(cat .env 2>/dev/null | grep -v '^#' | xargs)

# Check critical vars
if [ -z "$PROJECT_ENDPOINT" ]; then
    echo "❌ ERROR: Update .env with your Azure credentials first!"
    echo ""
    echo "Add these lines to .env:"
    echo "  PROJECT_ENDPOINT=https://YOUR-RESOURCE.services.ai.azure.com/api/projects/cathedral"
    echo "  PROJECT_API_KEY=your-api-key"
    echo ""
    echo "Get these from: https://portal.azure.com > Your AI Resource > Keys and Endpoints"
    exit 1
fi

# Activate venv
source .venv/bin/activate 2>/dev/null || {
    echo "Creating virtual environment..."
    python3 -m venv .venv
    source .venv/bin/activate
}

# Install dependencies quickly
pip install -q azure-ai-projects azure-identity azure-ai-agents

# Default to medium mode if not set
export MAX_PARALLEL_AGENTS=${MAX_PARALLEL_AGENTS:-100}
export BATCH_SIZE=${BATCH_SIZE:-50}
export CONNECTION_POOL_SIZE=${CONNECTION_POOL_SIZE:-50}

echo "Configuration:"
echo "  Agents: $MAX_PARALLEL_AGENTS"
echo "  Batch: $BATCH_SIZE"
echo "  Pool: $CONNECTION_POOL_SIZE"
echo ""
echo "🔮 Running enhanced agents now..."
echo ""

# Run it!
python run_agents_enhanced_x500.py

echo ""
echo "✅ DONE! Check agent_responses/ for results"
