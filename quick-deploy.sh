#!/bin/bash

# Quick deployment setup
echo "🚀 Cathedral Real - Quick Deploy"

# Check GitHub repo exists
echo "Testing GitHub connection..."
git ls-remote https://github.com/bekalah/cathedral-real.git > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ GitHub repo exists"
    git push github main 2>/dev/null || echo "⚠️  Add GitHub token to push"
else
    echo "❌ Create GitHub repo: https://github.com/new"
    echo "   Name: cathedral-real"
fi

# AWS setup check
if command -v aws &> /dev/null; then
    echo "✅ AWS CLI installed"
    aws sts get-caller-identity > /dev/null 2>&1 && echo "✅ AWS configured" || echo "⚠️  Run: aws configure"
else
    echo "⚠️  Install AWS CLI: brew install awscli"
fi

echo ""
echo "📋 GitLab CI/CD Variables needed:"
echo "- AWS_ACCESS_KEY_ID"
echo "- AWS_SECRET_ACCESS_KEY" 
echo "- GITHUB_TOKEN"
echo ""
echo "🎯 Ready to deploy: bash aws/scripts/deploy-aws.sh production"