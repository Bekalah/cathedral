#!/bin/bash
# Setup macOS GitLab Runner for Cathedral

echo "🍎 Setting up macOS GitLab Runner"

# Change shell to bash
chsh -s /bin/bash

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install rbenv and GitLab Runner
brew install rbenv gitlab-runner
brew services start gitlab-runner

# Configure rbenv
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
source ~/.bash_profile

# Install Ruby
rbenv install 3.3.4
rbenv global 3.3.4

# Configure Xcode
sudo xcodebuild -runFirstLaunch
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Register runner (manual step)
echo "Now register runner with:"
echo "gitlab-runner register --url https://gitlab.com --executor shell --tag-list macos,cathedral"

echo "✅ macOS Runner setup complete"