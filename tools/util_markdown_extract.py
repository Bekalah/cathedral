import re
import json
from typing import List, Dict

FENCE = re.compile(r"```json\s*(\{[\s\S]*?\})\s*```", re.MULTILINE)

def extract_json_blocks(md_text: str) -> List[Dict]:
    blocks: List[Dict] = []
    for match in FENCE.finditer(md_text):
        try:
            blocks.append(json.loads(match.group(1)))
        except Exception:
            pass
    return blocks
