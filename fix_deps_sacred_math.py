
import os
import glob
import json

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

target_dep = "@cathedral/sacred-mathematics"
new_dep = "@cathedral/sacred-mathematics-core"

count = 0
for file_path in files:
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            
        modified = False
        if 'dependencies' in data:
            if target_dep in data['dependencies']:
                print(f"Updating dependency {target_dep} to {new_dep} in {file_path}")
                data['dependencies'][new_dep] = data['dependencies'][target_dep]
                del data['dependencies'][target_dep]
                modified = True
                
        if 'devDependencies' in data:
             if target_dep in data['devDependencies']:
                print(f"Updating devDependency {target_dep} to {new_dep} in {file_path}")
                data['devDependencies'][new_dep] = data['devDependencies'][target_dep]
                del data['devDependencies'][target_dep]
                modified = True
                
        if modified:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=2)
            count += 1
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Update {count} files.")
