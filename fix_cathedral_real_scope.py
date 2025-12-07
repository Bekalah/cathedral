
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
            
        modified = False
        name = data.get('name', '')
        if name.startswith('@cathedral-real/'):
            new_name = name.replace('@cathedral-real/', '@cathedral/')
            print(f"Renaming {name} to {new_name} in {file_path}")
            data['name'] = new_name
            modified = True
            
        if 'dependencies' in data:
            deps = list(data['dependencies'].keys())
            for dep in deps:
                if dep.startswith('@cathedral-real/'):
                    new_dep = dep.replace('@cathedral-real/', '@cathedral/')
                    print(f"Updating dependency {dep} to {new_dep} in {file_path}")
                    # Check if new_dep already exists
                    if new_dep in data['dependencies']:
                         # duplication?
                         pass
                    else:
                         data['dependencies'][new_dep] = data['dependencies'][dep] 
                    del data['dependencies'][dep] # remove old
                    modified = True
                    
        if modified:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=2)
            count += 1
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Update {count} files.")
