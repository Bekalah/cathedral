# Integration Hub — Codex 144:99

## Overview
Central folder for nodes, spine, fusionist boons, and atelier assets.
- codex_nodes.json → canonical 144 nodes
- living_spine.json → 33-chapter spine + gates + character/faction links
- fusionist_registry.json → all boons in a single registry
- brand_styles.json → ND-safe palettes and typography
- atelier_assets/ → graphics, sounds, shaders
- playground.html → live node/boon tester

## Usage
1. Open `playground.html` in any browser
2. Fetch nodes programmatically:
```js
const nodes = await fetch('integration/codex_nodes.json').then(r=>r.json());```
3.	Query fusionist registry:
```js
const boons = await fetch('integration/fusionist_registry.json').then(r=>r.json());```
4.	All visuals respect ND-safe guidelines (no strobe, adjustable intensity)
5.	Use atelier_assets/ in Godot or web apps as needed

## Setup
This hub respects all PROTECT.md rules, merges your existing JSON into single canonical files, and provides a ready-to-use HTML playground. It will allow Cline to test, query, and iterate without touching multiple scattered repos.
