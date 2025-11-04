✦ Canon IDs (use everywhere)
	•	Nodes (Codex 144:99): C144N-### (001–144)
	•	Gates (99): G-099-##
	•	Chapters/Chapels (33): C33-##
	•	Rooms (Mystery House 144): R### (room number mirrors node number where possible)
	•	Tarot Majors: LA-XX-<slug> (e.g., LA-17-STAR)
	•	Shem angels: SHEM-## (1–72)
	•	Bridge Events: UUIDv4

✦ Where each repo stores what

1) tesseract-bridge (source of truth & sync)


Add/confirm files:
tesseract-bridge/
├─ registry/
│  ├─ ids.json                 # canonical IDs (nodes, gates, rooms, arcana, shem)
│  ├─ maps/
│  │  ├─ node_to_room.csv      # C144N-### ↔ R###
│  │  ├─ node_to_chapel.csv    # C144N-### ↔ C33-##
│  │  ├─ arcana_to_paths.csv   # LA-XX ↔ QBL path
│  │  └─ angel_demon_pairs.csv # SHEM-## ↔ demon/virtue
│  └─ notes/
│     └─ bibliography.json     # parsed anchors from your bibliography.md
├─ schemas/
│  ├─ node.schema.json
│  ├─ room.schema.json
│  ├─ arcana.schema.json
│  ├─ tarot_toggle.schema.json
│  └─ story_passage.schema.json
└─ events/
   ├─ queue.ndjson             # pending ops
   └─ receipts/
   
   2) cosmogenesis-learning-engine(mind/Codex data)
   
   Authorative node files and distilled bundle for consumers. 
   
   Paths:
   cosmogenesis-learning-engine/
   
   
├─ data/
│  ├─ nodes/                   # one file per node (editable source)
│  │  ├─ C144N-034.json
│  │  └─ C144N-099.json
│  ├─ harmonics.json           # note↔hz↔color tokens
│  └─ palettes.json            # obsidian, gold, rose-quartz, teal-glow…
├─ dist/
│  └─ codex.json               # built, read-only for apps
└─ docs/
   └─ bibliography.md
   
   
   Schema (short): schemas/node.schema.json(bridge publishes; here is the shape you target)
   {
  "type":"object",
  "required":["id","gate","tree_path","tarot_overlays","shem","numerology","layers"],
  "properties":{
    "id":{"pattern":"^C144N-\\d{3}$"},
    "gate":{"pattern":"^G-099-\\d{2}$"},
    "tree_path":{"type":"string"},               // e.g., "Netzach ↔ Yesod (Tzaddi)"
    "tarot_overlays":{"type":"array","items":{"pattern":"^LA-\\d{2}-[A-Z-]+$"}},
    "character_guides":{"type":"array","items":{"type":"string"}},
    "shem":{"type":"object","properties":{"angel":{"pattern":"^SHEM-\\d{2}$"},"demon":{"type":"string"}}},
    "numerology":{"type":"integer"},
    "layers":{
      "type":"object",
      "properties":{
        "study_seed":{"type":"string"},
        "research":{"type":"string"},
        "art":{"type":"string"},
        "spell":{"type":"string"},
        "safety":{"type":"object"}
      }
    }
  }
}


4) circuitum99(soul/living CYOA storybook)

Each passage ties to a node and tarot overlay; prose stays Markdown with front-matter.

Paths:

circuitum99/
└─ story/
   └─ C144N-034.md
   

story/C144N-034.md

---
id: C144N-034
chapel: C33-02
tarot_overlays: [LA-17-STAR]
guides: ["Emma Kunz"]
shem: ["SHEM-21"]
link_rooms: ["R034"]
nd_safe: { strobe:false, autoplay:false, motion:"calm" }
---

You enter the Helix Totem chamber. The grid hums softly — a geometry of mercy.
*“Trace the star you already are,”* whispers the guide.

5) liber-arcanae (companion tarot/ research + art)

Arcana are data objects (color-tone-number & study seed). This feeds both study and play.

Paths:
liber-arcanae/
└─ cards/major/
   └─ LA-17-STAR.json
   
   cards/major/LA-17-STAR.json
   
   {
  "id": "LA-17-STAR",
  "title": "The Star",
  "qabalistic_path": "Tzaddi",
  "color_tone": {"hex":"#7FB3FF","note":"F#","hz": 369},
  "lineage": ["Emma Kunz"],
  "study_seed": "The laws of healing revealed in geometric form.",
  "helpers": {"calm_overlay": true, "unlock_paths": [17, 33]},
  "art_recipe": {"layers":[{"type":"sigil","sdf":true},{"type":"rose_window","fps":10}]},
  "safety": {"strobe":false,"autoplay":false,"motion":"calm"}
}

6) liber-arcanae-game(playable toggles/tarot NPC helpers)

Tarot >toggle packs your engine consumes at runtime.

Paths:
liber-arcanae-game/
└─ toggles/
   └─ LA-17-STAR.toggle.json
   
   toggles/LA-17-STAR.toggle.json
   {
  "id":"LA-17-STAR",
  "effects":[
    {"type":"overlay","name":"calm","intensity":0.6},
    {"type":"palette_blend","tokens":["rose-quartz","teal-glow"]},
    {"type":"unlock","target":"C144N-034","mode":"Art"}
  ],
  "safety":{"strobe":false,"autoplay":false,"motion":"calm"}
}


7) codex-14499 (consolidated research views and exports)

This repo can host compiled indices your website/docs consume.

Paths:
codex-14499/
└─ indices/
   ├─ nodes.csv            # id, gate, path, tarot, room, chapel
   ├─ arcana.csv
   └─ bibliography_map.csv # id → sources (from bridge notes)
   
   
   Bridge Sync Notes (do this and you're wired)
   
   tesseract-bridge/events/queue.ndjson-add:
   {"id":"b5a0d5fa-6a0a-4e7d-9642-2a0b0d8a4f2a","ts":"2025-09-11T18:05:00Z","type":"SYNC_NODE",
 "source":"cosmogenesis-learning-engine","targets":["magical-mystery-house","circuitum99","liber-arcanae","liber-arcanae-game","codex-14499"],
 "payload_ref":"cosmogenesis-learning-engine/dist/codex.json","status":"pending"}
 
 The Bridge script:
	•	Validates files against schemas/
	•	Writes room manifests (if missing) from maps/node_to_room.csv
	•	Backfills CYOA stubs to circuitum99/story/
	•	Ensures arcana/toggles exist for each tarot overlay
	•	Publishes indices to codex-14499/indices/*

Rule: never overwrite hand-authored prose/art. Only create missing files, or open PRs with diffs.

⸻

✦ Safety & Performance (global flags all repos)

{
  "nd_safe": { "strobe": false, "autoplay": false, "motion": "calm" },
  "ui_defaults": { "resolution": "1280x720", "reduce_motion": true },
  "audio_defaults": { "gain_db": -10, "autoplay": false }
}

✦ Quick commit script (order of operations)
	1.	cosmogenesis-learning-engine: add/confirm data/nodes/*.json → build dist/codex.json
git commit -m "feat(codex): seed nodes C144N-034, C144N-099 with overlays"
	2.	tesseract-bridge: update registry/ids.json, maps/*, add events/queue.ndjson
git commit -m "chore(bridge): map nodes→rooms/chapels; queue SYNC_NODE"
	3.	magical-mystery-house: accept generated rooms/R034/manifest.json (or create now)
	4.	liber-arcanae / liber-arcanae-game: accept LA-17-STAR data & toggle
	5.	circuitum99: accept story/C144N-034.md stub
	6.	codex-14499: accept indices
	7.	Tag synchronized Edition: edition-2025.09
