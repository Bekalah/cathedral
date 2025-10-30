# Agent Batch Run — Final Report (2025-10-30)

This document captures the final status of the Azure Agent batch execution before decommissioning the agent pipeline.

## Summary

- Requested runs: 500
- Completed successfully: 296
- Success rate: 59.2%
- Concurrency: 16
- Batch size: 16
- Stop-on-quota: true
- Endpoint: https://cathedral-resource.services.ai.azure.com/api/projects/cathedral
- Agent ID: asst_72uzK1Yt2hsu2qVyt22NkMiO

Artifacts

- Log: `agent_loop.log`
- JSON summary: `agent_responses/batch_summary_20251030_042052.json`
- Text responses: `agent_responses/batch_*.txt`

## Batch window snapshot (from agent_loop.log)

```
Batch 1-16:   9/16
Batch 17-32:  2/16
Batch 33-48:  0/16
Batch 49-64:  3/16
Batch 65-80:  16/16
Batch 81-96:  16/16
Batch 97-112: 16/16
Batch 113-128: 10/16
Batch 129-144: 0/16
Batch 145-160: 3/16
Batch 161-176: 0/16
Batch 177-192: 16/16
Batch 193-208: 16/16
Batch 209-224: 16/16
Batch 225-240: 16/16
Batch 241-256: 16/16
Batch 257-272: 12/16
Batch 273-288: 4/16
Batch 289-304: 4/16
Batch 305-320: 0/16
Batch 321-336: 8/16
Batch 337-352: 16/16
Batch 353-368: 16/16
Batch 369-384: 16/16
Batch 385-400: 16/16
Batch 401-416: 14/16
Batch 417-432: 4/16
Batch 433-448: 4/16
Batch 449-464: 0/16
Batch 465-480: 7/16
Batch 481-496: 16/16
Batch 497-500: 4/4
```

Total: 296/500 completed

## Notes

- Prior emergency invocations failed when endpoint env wasn’t set; later runs used explicit endpoint and agent ID.
- Agent pipeline and runners have now been decommissioned in this repo per your request.
- All artifacts remain in `agent_responses/` for reference; `.gitignore` excludes them from version control by default.

## Optional next steps (manual)

- Archive artifacts: zip `agent_responses/` and keep locally.
- Curate best outputs: move select files into `docs/agents-showcase/` for permanent reference.
- If you ever want to re-run, we would restore runner scripts and envs in a separate branch to keep the main clean.
