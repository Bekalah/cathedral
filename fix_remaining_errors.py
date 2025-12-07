
import os
import glob
import re

target_dir = "/Users/rebeccalemke/cathedral-real/packages"
files = glob.glob(os.path.join(target_dir, "**/package.json"), recursive=True)

count = 0
for file_path in files:
    with open(file_path, 'r') as f:
        lines = f.readlines()
        
    modified = False
    new_lines = []
    in_engines = False
    engines_start_idx = -1
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Case 1: Detect engines start
        if '"engines": {' in line:
            in_engines = True
            engines_start_idx = len(new_lines)
            new_lines.append(line)
            i += 1
            continue
            
        # Case 2: Detect packageManager inside engines (swallowed)
        if in_engines and ('"packageManager":' in line or '"alchemical":' in line or '"cathedral":' in line):
            # We missed a closing brace for engines before this line
            # Insert closing brace for engines before this line
            # But we need to make sure the previous line in new_lines has a comma properly removed? 
            # OR we just add `  },`
            # The previous line in `engines` probably has a comma if it was valid JSON property list.
            if len(new_lines) > 0:
                prev = new_lines[-1].rstrip()
                if prev.endswith(','):
                    new_lines[-1] = prev[:-1] + '\n' # Remove trailing comma from last engine prop
            
            new_lines.append('  },\n')
            in_engines = False
            
            # Now append the current line (packageManager etc)
            new_lines.append(line)
            i += 1
            modified = True
            continue

        # Case 3: Closing brace for engines
        if in_engines and '},' in line: # simplistic check
             in_engines = False
             new_lines.append(line)
             i += 1
             continue
             
        # Case 4: Detect floating pnpm line (missing engines start)
        # e.g. "pnpm": ">=8.15.0" without engines
        if not in_engines and '"pnpm": ">=8.15.0"' in line and '"engines": {' not in lines[max(0, i-1)]:
             # Check if we are really naked. 
             # Heuristic: Check indentation or if previous line is closing something unrelated.
             # If we simply wrap it, it might work.
             # Check if previous line has comma
             if len(new_lines) > 0:
                 prev = new_lines[-1].rstrip()
                 if not prev.endswith(',') and not prev.endswith('{') and not prev.endswith('['):
                      new_lines[-1] = prev + ",\n"
             
             new_lines.append('  "engines": {\n')
             new_lines.append(line)
             # Next line likely `  },`. We'll consume it naturally or let loop handle?
             # If the next line is `  },`, we are good.
             # If not, we might need to add it?
             # Let's see what happens next iteration.
             in_engines = True # Temporarily pretend we are inside so logic holds? 
             # actually better to just append line and set in_engines=True 
             # so loop finds the closing brace if it exists.
             modified = True
             i += 1
             continue
            
        # Case 5: Weird duplicate pnpm or license or node (cleanup)
        if '"pnpm": "*"' in line: # wildcard bad pnpm
            i+=1
            modified = True
            continue

        new_lines.append(line)
        i += 1
        
    if modified:
        print(f"Fixing {file_path}")
        with open(file_path, 'w') as f:
            f.writelines(new_lines)
            count += 1

print(f"Fixed {count} files.")
