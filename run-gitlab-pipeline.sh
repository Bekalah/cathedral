#!/bin/bash
# Run GitLab pipeline

echo "🚀 Running GitLab CI/CD Pipeline"
echo "You need to push manually with credentials:"
echo ""
echo "git push https://gitlab.com/Bekalah/cathedral.git main --force"
echo ""
echo "Or set up GitLab token:"
echo "git remote set-url gitlab https://oauth2:YOUR_TOKEN@gitlab.com/Bekalah/cathedral.git"
echo ""
echo "Pipeline will run at:"
echo "https://gitlab.com/Bekalah/cathedral/-/pipelines"