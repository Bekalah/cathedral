#!/usr/bin/env python3
"""
FAST ACTION-FOCUSED AGENT RUNNER
Runs agents with build-focused context in minimal time
"""

import asyncio
import json
import os
import sys
from pathlib import Path
from datetime import datetime

# Azure AI Agent SDK
try:
    from azure.ai.projects.aio import AIProjectClient
    from azure.identity.aio import DefaultAzureCredential
except ImportError as e:
    print("❌ Missing azure AI SDKs. Run: pip install azure-ai-projects azure-identity")
    print(f"Import error: {e}")
    sys.exit(1)

# Config
ENDPOINT = os.getenv("PROJECT_ENDPOINT")
API_KEY = os.getenv("PROJECT_API_KEY")
AGENTS_COUNT = 20  # Reduced for speed
BATCH_SIZE = 10
MAX_WORKERS = 10

# Load action context
CONTEXT_FILE = Path(__file__).parent.parent.parent / "docs/agent-docs/ACTION_FOCUSED_CONTEXT.md"
with open(CONTEXT_FILE) as f:
    ACTION_CONTEXT = f.read()

async def run_agent(client, agent_label: str, agent_id: str) -> dict:
    """Run single agent with action context"""
    start = datetime.now()
    
    try:
        # Create thread with action instructions
        thread = await client.agents.create_thread()
        
        # Send action context
        await client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=ACTION_CONTEXT
        )
        
        # Run agent
        run = await client.agents.create_and_process_run(
            thread_id=thread.id,
            agent_id=agent_id
        )
        
        # Collect response
        msgs = [msg async for msg in client.agents.list_messages(thread_id=thread.id)]
        response = "\n".join([msg.content[0].text.value for msg in msgs if msg.role == "assistant"])
        
        # Save response
        response_file = Path("agent_responses") / f"{agent_label}_response.txt"
        response_file.parent.mkdir(exist_ok=True)
        response_file.write_text(response)
        
        duration = (datetime.now() - start).total_seconds()
        
        return {
            "label": agent_label,
            "success": True,
            "duration": duration,
            "response_length": len(response)
        }
        
    except Exception as e:
        return {
            "label": agent_label,
            "success": False,
            "error": str(e),
            "duration": (datetime.now() - start).total_seconds()
        }

async def main():
    print("🚀 FAST ACTION MODE")
    print(f"Running {AGENTS_COUNT} agents with BUILD focus")
    print("")
    
    # Initialize client
    credential = DefaultAzureCredential() if not API_KEY else None
    client = AIProjectClient(
        endpoint=ENDPOINT,
        credential=credential,
        api_key=API_KEY
    )
    
    # Get agents
    agents_list = [a async for a in client.agents.list_agents()]
    kaoz_agents = [a for a in agents_list if "KAOZ" in a.name][:AGENTS_COUNT//2]
    order_agents = [a for a in agents_list if "ORDER" in a.name][:AGENTS_COUNT//2]
    
    all_agents = [(f"kaoz_{i}", a.id) for i, a in enumerate(kaoz_agents)] + \
                 [(f"order_{i}", a.id) for i, a in enumerate(order_agents)]
    
    # Run in batches
    results = []
    for i in range(0, len(all_agents), BATCH_SIZE):
        batch = all_agents[i:i+BATCH_SIZE]
        print(f"⚡ Batch {i//BATCH_SIZE + 1}: {len(batch)} agents")
        
        tasks = [run_agent(client, label, aid) for label, aid in batch]
        batch_results = await asyncio.gather(*tasks)
        results.extend(batch_results)
        
        success_count = sum(1 for r in batch_results if r["success"])
        print(f"   ✅ {success_count}/{len(batch)} succeeded")
    
    # Summary
    print("\n" + "="*60)
    total_success = sum(1 for r in results if r["success"])
    print(f"✅ {total_success}/{len(results)} agents completed")
    print(f"⏱️  Total time: {sum(r['duration'] for r in results):.1f}s")
    print("="*60)
    
    # Save metrics
    Path("agent_responses/fast_metrics.json").write_text(
        json.dumps(results, indent=2)
    )
    
    await client.close()

if __name__ == "__main__":
    asyncio.run(main())
