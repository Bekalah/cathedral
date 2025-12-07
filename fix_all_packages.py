
import os
import glob
import re

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

target_node_line = '"node": ">=20.18.0"'

count = 0
for file_path in files:
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    modified = False
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for naked node engine line
        if target_node_line in line:
            # Check context
            is_wrapped = False
            # Look backwards for engines
            back_idx = len(new_lines) - 1
            while back_idx >= 0:
                if 'engines' in new_lines[back_idx]:
                    is_wrapped = True
                    break
                if '}' in new_lines[back_idx] or '{' in new_lines[back_idx]:
                    # Hit a brace before engines -> not wrapped
                    break
                back_idx -= 1
            
            if not is_wrapped:
                print(f"Fixing {file_path}")
                # Ensure previous line has comma
                if len(new_lines) > 0:
                    prev_line = new_lines[-1].rstrip()
                    if not prev_line.endswith(',') and not prev_line.endswith('{') and not prev_line.endswith('['):
                         new_lines[-1] = prev_line + ",\n"
                
                # Start engines block
                new_lines.append(f'  "engines": {{\n')
                new_lines.append(line) # The node line
                
                # Consume subsequent lines until we hit closing brace or next section
                i += 1
                while i < len(lines):
                    sub_line = lines[i]
                    if '"pnpm": "*"' in sub_line:
                        # minimal fix: skip the bad pnpm wildcard line
                        i += 1
                        continue
                    if '"pnpm": ">=8.0.0"' in sub_line and '"pnpm": ">=8.15.0"' in lines[i-1]:
                         # Skip conflicting/duplicate
                         i += 1
                         continue
                         
                    new_lines.append(sub_line)
                    if '},' in sub_line or ('}' in sub_line and 'from' not in sub_line): # heuristic for closing brace
                         # Check if this closing brace is for the engines block
                         # In the broken pattern, there is often a stray `},` or just `}`
                         # If we opened `engines`, this `}` will close it.
                         # We verified in previous steps that `},` existed at the end of the block.
                         break
                    i += 1
                
                modified = True
                i += 1
                count += 1
                continue
        
        new_lines.append(line)
        i += 1
        
    if modified:
        with open(file_path, 'w') as f:
            f.writelines(new_lines)

print(f"Fixed {count} files.")
