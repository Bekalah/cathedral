#!/bin/bash
# Fix All JSON Files
# Intelligently fixes JSON syntax errors

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "🔧 Fixing All JSON Files...\n"

fix_json_file() {
  local file="$1"
  
  if [ ! -f "$file" ]; then
    return 1
  fi
  
  # Try Python JSON tool first
  if command -v python3 &> /dev/null; then
    if python3 -m json.tool "$file" > /dev/null 2>&1; then
      return 0
    fi
    
    # Try to fix common issues
    python3 << PYTHON_SCRIPT
import json
import re

try:
    with open('$file', 'r') as f:
        content = f.read()
    
    # Remove trailing commas before closing braces/brackets
    content = re.sub(r',(\s*[}\]])', r'\1', content)
    
    # Try to parse
    try:
        data = json.loads(content)
        # Write back fixed version
        with open('$file', 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("  ✅ Fixed: $file")
    except json.JSONDecodeError as e:
        print(f"  ⚠️  Could not auto-fix: $file - {e}")
except Exception as e:
    print(f"  ❌ Error processing: $file - {e}")
PYTHON_SCRIPT
  fi
}

# Fix all JSON files
find data packages apps -name "*.json" -type f 2>/dev/null | while read -r json_file; do
  fix_json_file "$json_file"
done

echo "\n✅ JSON fixing complete!"

