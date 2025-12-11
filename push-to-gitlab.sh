#!/bin/bash
# Push to GitLab public repo

echo "🦊 Pushing to gitlab.com/bekalah/cathedral"

git remote remove gitlab 2>/dev/null
git remote add gitlab https://gitlab.com/bekalah/cathedral.git

echo "Push with your GitLab credentials:"
git push gitlab main --force
git push gitlab develop --force

echo "✅ Pushed to public GitLab repo"