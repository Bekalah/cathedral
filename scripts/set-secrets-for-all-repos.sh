#!/usr/bin/env bash
#
# Set Azure secrets for all Bekalah repositories
# Requires AZURE_API_KEY and AZURE_ENDPOINT to be exported in the environment
#

set -euo pipefail

# Check required environment variables
if [ -z "${AZURE_API_KEY:-}" ] || [ -z "${AZURE_ENDPOINT:-}" ]; then
    echo "❌ AZURE_API_KEY and AZURE_ENDPOINT must be exported in the environment"
    echo "Usage: export AZURE_API_KEY='your-key' && export AZURE_ENDPOINT='your-endpoint' && bash $0"
    exit 1
fi

echo "🔧 Setting Azure secrets for all Bekalah repositories..."
echo "📍 Endpoint: $AZURE_ENDPOINT"

# List of repositories to update
REPOS=(
    "cathedral"
    "circuitum99"
    "stone-grimoire"
    "liber-arcanae"
    "tesseract-bridge"
    "cosmogenesis-learning-engine"
    "magical-mystery-house"
    "luxcrux"
)

for repo in "${REPOS[@]}"; do
    echo "🔑 Setting secrets for $repo..."

    # Set endpoint secret
    gh secret set AZURE_ENDPOINT --repo "Bekalah/$repo" --body "$AZURE_ENDPOINT"

    # Set API key secret
    gh secret set AZURE_API_KEY --repo "Bekalah/$repo" --body "$AZURE_API_KEY"

    # Set deployment secrets
    gh secret set AZURE_DEPLOYMENT_PLANNER --repo "Bekalah/$repo" --body "gpt-4o-planner"
    gh secret set AZURE_DEPLOYMENT_ROUTER --repo "Bekalah/$repo" --body "gpt-4o-mini-router"
    gh secret set AZURE_DEPLOYMENT_EXECUTOR --repo "Bekalah/$repo" --body "gpt-35-turbo-exec"
    gh secret set AZURE_DEPLOYMENT_EMBEDDING --repo "Bekalah/$repo" --body "text-embedding-3-large"

    echo "✅ Secrets set for $repo"
done

echo ""
echo "🎉 All Azure secrets set for Bekalah repositories!"
echo "🔑 Secrets configured:"
echo "  - AZURE_ENDPOINT: $AZURE_ENDPOINT"
echo "  - AZURE_API_KEY: [REDACTED]"
echo "  - AZURE_DEPLOYMENT_PLANNER: gpt-4o-planner"
echo "  - AZURE_DEPLOYMENT_ROUTER: gpt-4o-mini-router"
echo "  - AZURE_DEPLOYMENT_EXECUTOR: gpt-35-turbo-exec"
echo "  - AZURE_DEPLOYMENT_EMBEDDING: text-embedding-3-large"
echo ""
echo "🚀 Ready for AI-powered Cathedral development across all repositories!"
