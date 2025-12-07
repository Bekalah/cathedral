
import os
import glob

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

broken_text = '"node": ">=20.18.0"'
engines_start = '"engines": {'

for file_path in files:
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if broken_text in line:
            # Check previous line (ignoring whitespace/empty lines)
            prev_idx = i - 1
            while prev_idx >= 0 and not lines[prev_idx].strip():
                prev_idx -= 1
            
            if prev_idx < 0:
                print(f"Suspicious (start of file): {file_path}")
                continue
                
            if engines_start not in lines[prev_idx]:
                print(f"Broken engines block in: {file_path}")
                # We can verify it's not some other valid structure
