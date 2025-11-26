#!/usr/bin/env python3
"""EMERGENCY 5-MINUTE ACTION RUN - 20 AGENTS FOCUSED BUILD"""
import asyncio
import os
import sys
from pathlib import Path
from datetime import datetime

try:
    from azure.ai.projects.aio import AIProjectClient
    from azure.identity.aio import DefaultAzureCredential
except ImportError:
    print("❌ SDK missing")
    sys.exit(1)

ENDPOINT = os.getenv("PROJECT_ENDPOINT")
API_KEY = os.getenv("PROJECT_API_KEY")

ACTION_PROMPT = """FIX THESE NOW - NO RESPONSES, JUST DO IT:

1. Fix packages/codex-144-99/src/index.ts - export all modules
2. Fix packages/types/tsconfig.json - remove broken extends
3. Create godot/scenes/main_menu.tscn - basic menu scene
4. Delete duplicate docs in docs/ - keep only one of each type
5. Run pnpm install && pnpm build to verify

COMMIT YOUR CHANGES WITH: git add -A && git commit -m "fix: emergency build fixes"
"""

async def run_fast(client, aid: str, idx: int):
    try:
        thread = await client.agents.create_thread()
        await client.agents.create_message(thread_id=thread.id, role="user", content=ACTION_PROMPT)
        await client.agents.create_and_process_run(thread_id=thread.id, agent_id=aid)
        msgs = await client.agents.list_messages(thread_id=thread.id)
        resp = "\n".join([m.content[0].text.value for m in msgs.data if m.role == "assistant"])
        Path(f"agent_responses/emergency_{idx}.txt").write_text(resp)
        return True
    except:
        return False

async def main():
    print("🚨 EMERGENCY 20-AGENT RUN")
    cred = DefaultAzureCredential() if not API_KEY else None
    client = AIProjectClient(endpoint=ENDPOINT, credential=cred, api_key=API_KEY)
    
    agents = await client.agents.list_agents()
    agents_to_use = [a.id for a in agents.data[:20]]
    
    print(f"⚡ Running {len(agents_to_use)} agents...")
    tasks = [run_fast(client, aid, i) for i, aid in enumerate(agents_to_use)]
    results = await asyncio.gather(*tasks)
    
    print(f"✅ {sum(results)}/{len(results)} completed")
    await client.close()

if __name__ == "__main__":
    asyncio.run(main())
