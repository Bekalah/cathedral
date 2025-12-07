
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
    seen_keys = set()
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        if '"engines": {' in line:
            in_engines = True
            seen_keys = set()
            new_lines.append(line)
            i += 1
            continue
            
        if in_engines:
            if '},' in line or ('}' in line and '"' not in line): # closing brace
                in_engines = False
                # Remove comma from last item if needed? No, usually fine explicitly handling
                new_lines.append(line)
                i += 1
                continue
            
            # Extract key
            match = re.search(r'"([^"]+)"\s*:', line)
            if match:
                key = match.group(1)
                if key in seen_keys:
                    print(f"Removing duplicate key {key} in {file_path}")
                    modified = True
                    i += 1
                    continue
                seen_keys.add(key)
                
                # Check for syntax in this line (missing comma)
                # If next line is a property or closing brace, this line should have comma unless it's the last one.
                # Hard to look ahead purely line-based.
                # But we can assume if it's not the last one, it needs comma.
                # For now just dedupe.
        
        new_lines.append(line)
        i += 1
        
    if modified:
        # Re-check comma validity? 
        # The dedupe might leave a missing comma if we removed the second one but the first one didn't have a comma.
        # Let's simple check: if we are in engines, and line doesn't end in comma, and it's not the last prop...
        # Parsing JSON textually is hard.
        # Better: Write updated content.
        with open(file_path, 'w') as f:
            f.writelines(new_lines)
        count += 1
        
        # Now verify/fix commas in engines
        # Read again
        with open(file_path, 'r') as f:
             lines = f.readlines()
             
        # Simple comma pass for engines
        fixed_lines = []
        in_eng = False
        eng_lines = []
        
        for idx, line in enumerate(lines):
            if '"engines": {' in line:
                in_eng = True
                fixed_lines.append(line)
                continue
            
            if in_eng:
                if '},' in line or ('}' in line and '"' not in line):
                    in_eng = False
                    # Process accumulated engine lines to ensure commas
                    for k in range(len(eng_lines)):
                        cl = eng_lines[k].rstrip()
                        if k < len(eng_lines) - 1:
                            if not cl.endswith(','):
                                cl += ','
                        else:
                            if cl.endswith(','):
                                cl = cl[:-1]
                        fixed_lines.append(cl + '\n')
                    eng_lines = []
                    fixed_lines.append(line)
                    continue
                else:
                    if line.strip(): # ignore empty
                        eng_lines.append(line)
                    else:
                        eng_lines.append(line) # keep empty lines?
            else:
                fixed_lines.append(line)
                
        with open(file_path, 'w') as f:
            f.writelines(fixed_lines)


print(f"Fixed {count} files.")
