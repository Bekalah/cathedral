#!/bin/bash
# Migrate Cathedral to GitLab

echo "🦊 Migrating to GitLab"

# Create GitLab project first at https://gitlab.com/bekalah-group/cathedral
echo "1. Create project at https://gitlab.com/bekalah-group/cathedral"
echo "2. Add your SSH key to GitLab"
echo "3. Run these commands:"

echo "git remote add gitlab git@gitlab.com:bekalah-group/cathedral.git"
echo "git push gitlab main --force"
echo "git push gitlab develop --force"
echo "git push gitlab --all"
echo "git push gitlab --tags"

echo "✅ GitLab migration commands ready"
echo "GitHub workflows failing - GitLab CI/CD will work better"