#!/bin/bash

# Cathedral Real - GitHub Mirror Setup Script
# This script sets up GitHub as a mirror for GitLab primary repo

set -e

echo "🔗 Setting up GitHub mirror for Cathedral Real..."

# Add GitHub as a secondary remote
echo "Adding GitHub remote..."
git remote add github https://github.com/bekalah/cathedral.git || echo "GitHub remote already exists"

# Configure push to both remotes
echo "Configuring push to both GitLab and GitHub..."
git remote set-url --add --push origin https://gitlab.com/Bekalah/cathedral-real.git
git remote set-url --add --push origin https://github.com/bekalah/cathedral.git

# Show current remotes
echo "Current remotes:"
git remote -v

echo "✅ GitHub mirror setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Create repository on GitHub: https://github.com/new"
echo "2. ✅ GitHub URL configured for bekalah/cathedral-real"
echo "3. Add GitHub token to GitLab CI/CD variables: GITHUB_TOKEN"
echo "4. Push to both: git push origin main"