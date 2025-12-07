
import os
import glob
import json

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

count = 0
for file_path in files:
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            # Basic check if it parses JSON
            try:
                data = json.loads(content)
                # If it parses, check if engines has suspicious keys
                if 'engines' in data:
                    engines = data['engines']
                    if 'packageManager' in engines or 'alchemical' in engines or 'license' in engines or 'cathedral' in engines:
                         print(f"Suspicious engines content in: {file_path}")
            except json.JSONDecodeError:
                print(f"Invalid JSON in: {file_path}")
                count += 1
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

print(f"Found {count} invalid files.")
