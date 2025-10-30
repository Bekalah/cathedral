#!/bin/bash
# Update .gitignore to prevent future clutter

echo "🛡️  Updating .gitignore to prevent future mess..."

cat >> .gitignore << 'EOF'

# Prevent root-level clutter
/*.html
/*.css
/*.js
!*.config.js
/*.patch
/_tmp_*
/*.log
!agent_loop.log
/automation-log.txt

# Agent outputs
/agent_responses/
/agent_loop.log

# Archive (keep local, don't commit)
/archive/

# Temporary files
*.tmp
*.temp
.DS_Store
EOF

echo "✅ .gitignore updated - future clutter will be prevented"
