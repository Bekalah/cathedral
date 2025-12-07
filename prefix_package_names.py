
import os
import glob
import json

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

count = 0
for file_path in files:
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            
        name = data.get('name', '')
        if name and not name.startswith('@cathedral/') and not name.startswith('@'):
            print(f"Renaming {name} to @cathedral/{name} in {file_path}")
            data['name'] = f"@cathedral/{name}"
            
            # Also remove self-dependency if present (circular logic often copy-pasted)
            if 'dependencies' in data and data['name'] in data['dependencies']:
                 del data['dependencies'][data['name']]
            if 'dependencies' in data and name in data['dependencies']: # remove old name self-dep?
                 del data['dependencies'][name]
            
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=2) # Reformat JSON
            count += 1
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Renamed {count} packages.")
