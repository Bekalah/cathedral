#!/bin/bash
# Setup GitLab Runner for Cathedral

echo "🦊 Setting up GitLab Runner"

# Install GitLab Runner on macOS
brew install gitlab-runner

# Register runner (you'll need to provide token from GitLab)
echo "Register runner with your GitLab project token:"
gitlab-runner register \
  --url https://gitlab.com \
  --executor docker \
  --docker-image node:23 \
  --description "Cathedral Runner" \
  --tag-list "cathedral,node,docker"

# Start runner
gitlab-runner start

echo "✅ GitLab Runner setup complete"