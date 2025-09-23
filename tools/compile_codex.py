#!/usr/bin/env python3
"""Compile Codex artifacts from staged sources."""

import datetime
import glob
import hashlib
import json
import os
import sys
try:
    from jsonschema import Draft202012Validator
except ImportError:
    Draft202012Validator = None

from util_markdown_extract import extract_json_blocks

ROOT = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(ROOT)
SHARED = os.path.join(REPO, 'shared')
DIST = os.path.join(REPO, 'dist')
SCHEMA_PATH = os.path.join(ROOT, 'schemas', 'node.schema.json')

with open(SCHEMA_PATH, 'r', encoding='utf-8') as schema_file:
    SCHEMA = json.load(schema_file)


def sha256_bytes(blob: bytes) -> str:
    """Return a short hash for provenance de-duplication."""
    return hashlib.sha256(blob).hexdigest()[:16]


def load_json(path: str):
    """Read JSON safely; return None when parsing fails."""
    try:
        with open(path, 'r', encoding='utf-8') as handle:
            return json.load(handle)
    except Exception:
        return None


def normalise_node(node: dict, source: str) -> dict:
    """Ensure provenance metadata exists for each node."""
    snapshot = dict(node)
    snapshot.setdefault('provenance', {})
    provenance = snapshot['provenance']
    provenance.setdefault('sources', [])
    provenance['sources'].append({
        'path': source,
        'commit': os.getenv('GITHUB_SHA', '')[:12],
        'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z'),
        'compiler': 'compile_codex.py@v1'
    })
    return snapshot


def nodes_equal(left: dict, right: dict) -> bool:
    """Compare nodes without provenance/versions to detect changes."""
    def strip(meta: dict) -> dict:
        clone = dict(meta)
        clone.pop('provenance', None)
        clone.pop('versions', None)
        return clone

    return strip(left) == strip(right)


def append_only_merge(current: dict, incoming: dict) -> dict:
    """Merge nodes without losing historical variants."""
    if nodes_equal(current, incoming):
        current_sources = current.setdefault('provenance', {}).setdefault('sources', [])
        current_sources.extend(incoming.get('provenance', {}).get('sources', []))
        return current

    versions = current.setdefault('versions', [])
    incoming_hash = sha256_bytes(json.dumps(incoming, sort_keys=True).encode('utf-8'))
    if not any(variant.get('_hash') == incoming_hash for variant in versions):
        incoming['_hash'] = incoming_hash
        versions.append(incoming)
    return current


def validate_node(node: dict, source: str) -> None:
    """Validate a node against the JSON schema."""
    if Draft202012Validator is None:
        ensure_schema_minimum(node, source)
        return
    validator = Draft202012Validator(SCHEMA)
    errors = sorted(validator.iter_errors(node), key=lambda err: err.path)
    if errors:
        messages = [f"{'/'.join(map(str, error.path))}: {error.message}" for error in errors]
        raise ValueError(f"Schema validation failed for {source}:\n- " + "\n- ".join(messages))




def ensure_schema_minimum(node: dict, source: str) -> None:
    """Fallback validator when jsonschema is unavailable."""
    if 'id' not in node:
        raise ValueError(f"Schema validation failed for {source}: missing 'id'")
    value = node['id']
    if not isinstance(value, str):
        raise ValueError(f"Schema validation failed for {source}: id must be a string")
    import re
    pattern = re.compile(r"^(C144N-[0-9]{3}|C144N-ARCANA-[A-Z0-9_-]+)$")
    if not pattern.fullmatch(value):
        raise ValueError(f"Schema validation failed for {source}: id does not match pattern")


def collect_nodes():
    """Gather staged data and return compiled structures."""
    compiled: dict = {}

    node_glob = os.path.join(SHARED, 'nodes', '*.json')
    for path in sorted(glob.glob(node_glob)):
        data = load_json(path)
        if not data:
            continue
        node_id = data.get('id')
        if not node_id:
            continue
        node = normalise_node(data, path)
        validate_node(node, path)
        if node_id not in compiled:
            compiled[node_id] = node
        else:
            compiled[node_id] = append_only_merge(compiled[node_id], node)

    ledgers = [
        os.path.join(SHARED, 'codex', 'Codex14499_archive.md'),
        os.path.join(SHARED, 'codex', 'codex_temple_of_the_unbuilt.md')
    ]
    for ledger in ledgers:
        if not os.path.exists(ledger):
            continue
        with open(ledger, 'r', encoding='utf-8') as handle:
            snippets = extract_json_blocks(handle.read())
        for block in snippets:
            node_id = block.get('id')
            if not node_id:
                continue
            node = normalise_node(block, ledger)
            validate_node(node, ledger)
            if node_id not in compiled:
                compiled[node_id] = node
            else:
                compiled[node_id] = append_only_merge(compiled[node_id], node)

    cards = []
    card_glob = os.path.join(SHARED, 'liber', '*.json')
    for path in sorted(glob.glob(card_glob)):
        card = load_json(path)
        if card:
            cards.append(card)

    tokens = load_json(os.path.join(SHARED, 'stone', 'perm-style.json'))
    cosmo_codex = load_json(os.path.join(SHARED, 'cosmo', 'codex.144_99.json'))

    return compiled, cards, tokens, cosmo_codex


def write_json(path: str, payload) -> None:
    with open(path, 'w', encoding='utf-8') as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)


def main() -> int:
    os.makedirs(DIST, exist_ok=True)
    nodes, cards, tokens, cosmo = collect_nodes()

    meta = {
        'built_utc': datetime.datetime.now(datetime.timezone.utc).isoformat().replace('+00:00', 'Z'),
        'git_commit': os.getenv('GITHUB_SHA', '')[:12],
        'counts': {
            'nodes': len(nodes),
            'cards': len(cards),
            'versions_total': sum(len(node.get('versions', [])) for node in nodes.values())
        }
    }

    write_json(os.path.join(DIST, 'codex.json'), {'nodes': list(nodes.values())})
    write_json(os.path.join(DIST, 'index.json'), meta)

    if cards:
        write_json(os.path.join(DIST, 'cards.json'), {'cards': cards})

    if tokens:
        token_dir = os.path.join(DIST, 'c99', 'tokens')
        os.makedirs(token_dir, exist_ok=True)
        write_json(os.path.join(token_dir, 'perm-style.json'), tokens)

    if cosmo:
        write_json(os.path.join(DIST, 'cosmo_codex.json'), cosmo)

    print('codex.json built with'
          f" {meta['counts']['nodes']} nodes ({meta['counts']['versions_total']} alternate versions);"
          f" {meta['counts']['cards']} cards.")
    return 0


if __name__ == '__main__':
    sys.exit(main())
