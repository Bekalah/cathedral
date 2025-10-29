#!/usr/bin/env python3
"""
Run both agents (KAOZ and ORDER) in parallel with the full project context.

Env vars expected:
  PROJECT_ENDPOINT  - Azure AI Foundry Project endpoint (Settings > Keys and endpoints)
  PROJECT_API_KEY   - Optional; if not set, DefaultAzureCredential() will be used
  AGENT_ID_KAOZ     - Agent of KAOZ ID (default: asst_72uzK1Yt2hsu2qVyt22NkMiO)
  AGENT_ID_ORDER    - Agent of ORDER ID (default: asst_Pgb3ctXzbsv21gX2auBeEFZx)

Usage:
  source .venv/bin/activate && \
  export PROJECT_ENDPOINT="https://cathedral-resource.services.ai.azure.com/api/projects/cathedral" && \
  python run_agents_parallel.py
"""

import asyncio
import os
import pathlib
from typing import Iterable, List

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder


ROOT = pathlib.Path(__file__).resolve().parent
CONTEXT_FILE = ROOT / "FULL_CONTEXT_FOR_AGENTS.md"
OUT_DIR = ROOT / "agent_responses"


def chunk_text(s: str, max_len: int = 12000) -> List[str]:
    if len(s) <= max_len:
        return [s]
    chunks: List[str] = []
    start = 0
    while start < len(s):
        end = min(start + max_len, len(s))
        chunks.append(s[start:end])
        start = end
    return chunks


def get_client() -> AIProjectClient:
    endpoint = os.environ.get("PROJECT_ENDPOINT")
    if not endpoint:
        raise RuntimeError("PROJECT_ENDPOINT env var not set")
    # If PROJECT_API_KEY is set, azure-ai-projects will use it via env automatically.
    credential = DefaultAzureCredential()
    return AIProjectClient(endpoint=endpoint, credential=credential)


async def run_agent(label: str, agent_id: str, content: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_file = OUT_DIR / f"{label.lower()}_response.txt"

    client = get_client()
    print(f"🚀 [{label}] Creating thread…")
    thread = client.agents.threads.create()

    print(f"✉️  [{label}] Sending context in chunks…")
    for i, chunk in enumerate(chunk_text(content)):
        client.agents.messages.create(
            thread_id=thread.id,
            role="user",
            content=f"[PART {i+1}]\n\n" + chunk,
        )

    print(f"🤖 [{label}] Running agent…")
    run = client.agents.runs.create_and_process(thread_id=thread.id, agent_id=agent_id)
    if getattr(run, "status", "succeeded") == "failed":
        raise RuntimeError(f"[{label}] Run failed: {getattr(run, 'last_error', 'unknown')}")

    print(f"📥 [{label}] Collecting messages…")
    messages = client.agents.messages.list(thread_id=thread.id, order=ListSortOrder.ASCENDING)

    lines: List[str] = []
    for msg in messages:
        who = getattr(msg, "role", "assistant")
        if getattr(msg, "text_messages", None):
            for tm in msg.text_messages:
                try:
                    text = tm.text.value
                except Exception:
                    text = str(tm)
                lines.append(f"[{who}] {text}")

    out_file.write_text("\n\n".join(lines), encoding="utf-8")
    print(f"✅ [{label}] Saved response to {out_file}")


async def main() -> None:
    if not CONTEXT_FILE.exists():
        raise FileNotFoundError(f"Context file not found: {CONTEXT_FILE}")
    content = CONTEXT_FILE.read_text(encoding="utf-8")

    agent_id_kaoz = os.environ.get("AGENT_ID_KAOZ", "asst_72uzK1Yt2hsu2qVyt22NkMiO")
    agent_id_order = os.environ.get("AGENT_ID_ORDER", "asst_Pgb3ctXzbsv21gX2auBeEFZx")

    tasks = [
        run_agent("KAOZ", agent_id_kaoz, content),
        run_agent("ORDER", agent_id_order, content),
    ]
    await asyncio.gather(*tasks)
    print("\n🎉 Both agents completed. Check the agent_responses/ folder.")


if __name__ == "__main__":
    asyncio.run(main())
