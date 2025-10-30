#!/usr/bin/env python3
"""
Parallel batch runner for a single Azure AI Foundry Agent ID.

Env vars:
  PROJECT_ENDPOINT  - required (e.g., https://...services.ai.azure.com/api/projects/<project>)
  AGENT_ID          - required (e.g., asst_72uzK1Yt2hsu2qVyt22NkMiO)
  BATCH_TOTAL       - optional, default 20 (total runs)
  CONCURRENCY       - optional, default 5  (simultaneous runs)
    BATCH_SIZE        - optional, default = CONCURRENCY (runs per wave)
    STOP_ON_QUOTA     - optional, default 1 (stop if quota/429/limit detected)
  INSTRUCTIONS      - optional, override action context

Outputs:
  - agent_responses/batch_<seq>.txt for each run
  - agent_responses/batch_summary_<timestamp>.json
"""

import os
import json
import asyncio
from pathlib import Path
from datetime import datetime, UTC

try:
    from azure.ai.projects.aio import AIProjectClient
    from azure.identity.aio import DefaultAzureCredential
except Exception as e:
    print("❌ Azure SDK import failed:", e)
    raise

DEFAULT_ACTION = (
    "Execute build-focused changes only (no essays):\n"
    "1) Fix monorepo build (pnpm/turbo) if broken\n"
    "2) Generate minimal missing configs only where needed\n"
    "3) Make concrete file edits; avoid large outputs\n"
    "4) Commit with: fix: agent batch build actions\n"
)


async def run_once(client: AIProjectClient, agent_id: str, instructions: str, seq: int, sem: asyncio.Semaphore):
    async with sem:
        try:
            run = await client.agents.create_thread_and_process_run(
                agent_id=agent_id,
                instructions=instructions,
            )
            thread_id = getattr(run, "thread_id", None)
            if not thread_id:
                return {"seq": seq, "ok": False, "error": "no_thread_id"}

            # Use helper to fetch the last assistant message text
            try:
                text = await client.agents.messages.get_last_message_text_by_role(
                    thread_id=thread_id, role="assistant"
                )
            except Exception:
                # Fallback to full list if helper not available
                msgs = [m async for m in client.agents.messages.list(thread_id=thread_id)]
                texts = [m.content[0].text.value for m in msgs if getattr(m, "role", "") == "assistant" and m.content]
                text = "\n\n".join(texts) if texts else "(no assistant content returned)"

            outdir = Path("agent_responses"); outdir.mkdir(exist_ok=True)
            outfile = outdir / f"batch_{seq:04d}.txt"
            outfile.write_text(text or "(empty)")
            return {"seq": seq, "ok": True, "file": str(outfile)}
        except Exception as e:
            return {"seq": seq, "ok": False, "error": repr(e)}


def _is_quota_error(err_text: str) -> bool:
    if not err_text:
        return False
    t = err_text.lower()
    return (
        "429" in t
        or "too many requests" in t
        or "quota" in t
        or "insufficient" in t and "quota" in t
        or "rate limit" in t
        or "limit exceeded" in t
    )


async def main():
    endpoint = os.getenv("PROJECT_ENDPOINT")
    agent_id = os.getenv("AGENT_ID")
    total = int(os.getenv("BATCH_TOTAL", "20"))
    concurrency = int(os.getenv("CONCURRENCY", "5"))
    batch_size = int(os.getenv("BATCH_SIZE", str(concurrency)))
    stop_on_quota = os.getenv("STOP_ON_QUOTA", "1") not in ("0", "false", "False")
    instructions = os.getenv("INSTRUCTIONS", DEFAULT_ACTION)

    if not endpoint:
        print("❌ PROJECT_ENDPOINT is required")
        return
    if not agent_id:
        print("❌ AGENT_ID is required")
        return

    print(f"🔗 Endpoint: {endpoint}")
    print(f"🤖 Agent ID: {agent_id}")
    print(f"⏱️  Total runs: {total} | Concurrency: {concurrency} | Batch size: {batch_size} | Stop on quota: {stop_on_quota}")

    cred = DefaultAzureCredential()
    client = AIProjectClient(endpoint=endpoint, credential=cred)

    sem = asyncio.Semaphore(concurrency)
    all_results = []
    next_seq = 1
    quota_hit = False

    while next_seq <= total:
        upper = min(next_seq + batch_size - 1, total)
        batch_tasks = [run_once(client, agent_id, instructions, seq, sem) for seq in range(next_seq, upper + 1)]
        batch_results = await asyncio.gather(*batch_tasks)
        all_results.extend(batch_results)

        # Print short progress summary
        ok = sum(1 for r in batch_results if r.get("ok"))
        print(f"Batch {next_seq}-{upper}: ✅ {ok}/{len(batch_results)} succeeded")

        # Quota detection
        if stop_on_quota:
            for r in batch_results:
                if not r.get("ok") and _is_quota_error(r.get("error", "")):
                    quota_hit = True
                    print("🛑 Quota/limit detected — stopping further runs.")
                    break
        if quota_hit:
            break

        next_seq = upper + 1

    total_ok = sum(1 for r in all_results if r.get("ok"))
    print(f"✅ Completed: {total_ok}/{len(all_results)} (requested {total})")

    summary = {
        "endpoint": endpoint,
        "agent_id": agent_id,
        "requested_total": total,
        "concurrency": concurrency,
        "batch_size": batch_size,
        "stop_on_quota": stop_on_quota,
        "completed": total_ok,
        "quota_stopped": quota_hit,
        "timestamp": datetime.now(UTC).isoformat(),
        "results": all_results,
    }
    outdir = Path("agent_responses"); outdir.mkdir(exist_ok=True)
    summary_file = outdir / f"batch_summary_{datetime.now(UTC).strftime('%Y%m%d_%H%M%S')}.json"
    summary_file.write_text(json.dumps(summary, indent=2))
    print(f"📝 Wrote summary: {summary_file}")

    await client.close()


if __name__ == "__main__":
    asyncio.run(main())
