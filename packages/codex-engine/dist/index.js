'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var $schema = "http://json-schema.org/draft-07/schema#";
var title = "Codex144 Node";
var type = "array";
var items = {
	type: "object",
	required: [
		"node_id",
		"numerology",
		"geometry",
		"element"
	],
	properties: {
		node_id: {
			type: "integer",
			minimum: 1
		},
		numerology: {
			type: "integer",
			minimum: 1,
			maximum: 9
		},
		geometry: {
			type: "string"
		},
		element: {
			type: "string"
		},
		planet: {
			type: [
				"string",
				"null"
			]
		},
		chakra: {
			type: [
				"string",
				"null"
			]
		},
		color_ray: {
			type: [
				"string",
				"null"
			]
		},
		sound: {
			type: [
				"string",
				"null"
			]
		},
		tarot_card: {
			type: "array",
			items: {
				type: "string"
			}
		},
		tara_overlay: {
			type: [
				"string",
				"null"
			]
		},
		crystal: {
			type: [
				"string",
				"null"
			]
		},
		symbol: {
			type: [
				"string",
				"null"
			]
		},
		teaching_function: {
			type: [
				"string",
				"null"
			]
		},
		related_gates: {
			type: "array",
			items: {
				type: "integer"
			}
		},
		daemon_guardian: {
			type: [
				"string",
				"null"
			]
		},
		notes: {
			type: "string"
		}
	},
	additionalProperties: false
};

var generated = "2025-10-01T23:43:03.217Z";
var mode = "move";
var entries = [
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/.DS_Store",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/.DS_Store",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/An Art-Science Technology for Interchangeable Archetypes and Harmonic Research.pdf",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/An_Art-Science_Technology_for_Interchangeable_Archetypes_and_Harmonic_Research.pdf",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CATHEDRAL_REFERENCE.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/CATHEDRAL_REFERENCE.md",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CATHEDRAL_SCROLL_FULL.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/CATHEDRAL_SCROLL_FULL.md",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CATHEDRAL_SCROLL_PART1.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/CATHEDRAL_SCROLL_PART1.md",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CATHEDRAL_SCROLL_PART2.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/CATHEDRAL_SCROLL_PART2.md",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CATHEDRAL_SCROLL_PART3.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/CATHEDRAL_SCROLL_PART3.md",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CODEX 144:99 Canonical Seed Instructions",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/CODEX_144:99_Canonical_Seed_Instructions",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/CODEX 144:99 notes for tarot",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/CODEX_144:99_notes_for_tarot",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Cathedral Final Components and Registries.pdf",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/archive/Cathedral_Final_Components_and_Registries.pdf",
		category: "archive",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Cathedral Instructions Set 2",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/Cathedral_Instructions_Set_2",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Cathedral Instructions Set 3 - Contributors",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/Cathedral_Instructions_Set_3_-_Contributors",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Cathedral_Code_Annex.html.svg",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/Cathedral_Code_Annex.html.svg",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Cathedral_Instructrions",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/Cathedral_Instructrions",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Codex 144:99 Secret Inner Book",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/Codex_144:99_Secret_Inner_Book",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Codex14499_Recovery_Core_AtoD_Revised (1).pdf",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/Codex14499_Recovery_Core_AtoD_Revised_(1).pdf",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/Double Tree of Life Structure",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/Double_Tree_of_Life_Structure",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/ELITE-biometrics.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/ELITE-biometrics.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/FULL CODEX 144:99 -Fusion Kink Nodes Set",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/FULL_CODEX_144:99_-Fusion_Kink_Nodes_Set",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/FUSION KINK SYSTEM OVERVIEW",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/FUSION_KINK_SYSTEM_OVERVIEW",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/HELPFUL REPO STRUCTURE INSTRUCTIONS",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/instructions/HELPFUL_REPO_STRUCTURE_INSTRUCTIONS",
		category: "instructions",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/LIBER ARCANE: CODEX OF ABYSSIAE DATASETS",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/LIBER_ARCANE:_CODEX_OF_ABYSSIAE_DATASETS",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/LIBER-ARCANAE-FULL-NOTES",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/LIBER-ARCANAE-FULL-NOTES",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/LIVING TAROT MASTER FILES",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/LIVING_TAROT_MASTER_FILES",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/NET OF INDRA SYSTEM FUNCTION LOGIC",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/NET_OF_INDRA_SYSTEM_FUNCTION_LOGIC",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/VIENNA copy.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/archive/VIENNA_copy.html",
		category: "archive",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/VIENNA.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/VIENNA.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/alchemy.json",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/alchemy.json",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/ambient-engine.js",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/ambient-engine.js",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/angel-lab.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/angel-lab.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/angels72.json",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/angels72.json",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/book-processor-proposal.md",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/book-processor-proposal.md",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/cathedral-demo.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/cathedral-demo.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/cathedral-engine.js",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/cathedral-engine.js",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/cathedral-full.patch.txt",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/archive/cathedral-full.patch.txt",
		category: "archive",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/cathedral-integration-hub.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/cathedral-integration-hub.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/chat-GitHub Pages Cloudflare Setup.txt",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/chat-GitHub_Pages_Cloudflare_Setup.txt",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/codex_144_nodes_template.json",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/codex_144_nodes_template.json",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/crypt.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/crypt.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/cymatic-engine.js",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/cymatic-engine.js",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/github-recovery-codes.txt",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/github-recovery-codes.txt",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/lady-chapel.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/lady-chapel.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/musical-cubes.html",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/musical-cubes.html",
		category: "research",
		action: "move"
	},
	{
		source: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/v3-cathedral-monorepo.txt",
		destination: "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BUILDING CATHEDRALS/docs/research/v3-cathedral-monorepo.txt",
		category: "research",
		action: "move"
	}
];

// Codex Engine - Documentation and knowledge base engine

// Main codex engine functionality will be implemented here
const CodexEngine = {
  name: 'Codex Engine',
  version: '1.0.0',
  description: 'Documentation and knowledge base engine for Cathedral Research'
};

exports.$schema = $schema;
exports.CodexEngine = CodexEngine;
exports["default"] = CodexEngine;
exports.entries = entries;
exports.generated = generated;
exports.items = items;
exports.mode = mode;
exports.title = title;
exports.type = type;
//# sourceMappingURL=index.js.map
