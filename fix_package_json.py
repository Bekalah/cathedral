
import os
import glob

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
pattern = '**/*.package.json' # Wait, glob pattern, just package.json
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

broken_block = """    "node": ">=20.18.0",
    "pnpm": ">=8.15.0"
    "pnpm": "*"
  },"""

replacement_block = """  "engines": {
    "node": ">=20.18.0",
    "pnpm": ">=8.15.0"
  },"""

count = 0
for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    if broken_block in content:
        print(f"Fixing {file_path}")
        new_content = content.replace(broken_block, replacement_block)
        with open(file_path, 'w') as f:
            f.write(new_content)
        count += 1

print(f"Fixed {count} files.")
