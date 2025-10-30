#!/usr/bin/env python3
"""
Run a single Azure AI Foundry Agent by ID against a provided Project endpoint.

Env vars:
  PROJECT_ENDPOINT - e.g. https://<...>.services.ai.azure.com/api/projects/<project>
  AGENT_ID         - e.g. asst_72uzK1Yt2hsu2qVyt22NkMiO

Saves response to agent_responses/single_<timestamp>.txt
"""

import asyncio
import os
from pathlib import Path
from datetime import datetime

try:
    from azure.ai.projects.aio import AIProjectClient
    from azure.identity.aio import DefaultAzureCredential
except Exception as e:
    print("❌ Azure SDK import failed: ", e)
    raise

ACTION_CONTEXT = """
Execute build-focused tasks only:
1) Fix monorepo build issues (pnpm workspace, turbo tasks)
2) Generate missing configs minimally
3) Avoid large content dumps; make concrete file changes
4) Commit with: fix: agent single-run build actions
""".strip()


async def main():
    endpoint = os.getenv("PROJECT_ENDPOINT")
    agent_id = os.getenv("AGENT_ID")
    if not endpoint:
        print("❌ PROJECT_ENDPOINT is required")
        return
    if not agent_id:
        print("❌ AGENT_ID is required")
        return

    print(f"🔗 Endpoint: {endpoint}")
    print(f"🤖 Agent ID: {agent_id}")

    cred = DefaultAzureCredential()
    client = AIProjectClient(endpoint=endpoint, credential=cred)

    try:
        run = await client.agents.create_thread_and_process_run(agent_id=agent_id, instructions=ACTION_CONTEXT)
        thread_id = getattr(run, "thread_id", None)
        if not thread_id:
            print("⚠️  No thread_id on run; attempting to continue anyway.")
            return

        msgs = [m async for m in client.agents.messages.list(thread_id=thread_id)]
        assistant_texts = [m.content[0].text.value for m in msgs if getattr(m, "role", "") == "assistant" and m.content]
        response = "\n\n".join(assistant_texts) if assistant_texts else "(no assistant content returned)"

        outdir = Path("agent_responses")
        outdir.mkdir(exist_ok=True)
        outfile = outdir / f"single_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.txt"
        outfile.write_text(response)
        print(f"✅ Wrote response to {outfile}")
    except Exception as e:
        print("❌ Agent run failed:", repr(e))
    finally:
        await client.close()


if __name__ == "__main__":
    asyncio.run(main())
