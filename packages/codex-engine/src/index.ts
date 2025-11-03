// @cathedral/codex-engine — unified API over Codex 144:99
// Local stub for SpiralEngine and SpiralConfig to avoid depending on an external module
// and to satisfy the TypeScript compiler while preserving expected shape/behaviour.
export type SpiralConfig = {
  ratio?: number
  seed?: string
  depth?: number
}

export class SpiralEngine {
  config: { ratio: number; seed: string; depth: number }

  constructor(cfg?: SpiralConfig) {
    this.config = {
      ratio: cfg?.ratio ?? 1.618,
      seed: cfg?.seed ?? 'local-seed',
      depth: cfg?.depth ?? 3,
    }
  }

  generateNode(i: number) {
    return {
      id: `node-${i}`,
      archetype: 'point',
      position: { x: Math.cos(i), y: Math.sin(i), z: 0 },
      connections: i > 0 ? [i - 1] : [],
    }
  }

  describe() {
    return `SpiralEngine ratio=${this.config.ratio} seed=${this.config.seed} depth=${this.config.depth}`
  }
}

export type Vec3 = { x: number; y: number; z: number }

export type CodexNode = {
  id: string
  archetype: string
  position: Vec3
  connections: number[]
}

export type CodexGraph = {
  nodes: CodexNode[]
  edges: Array<{ from: string; to: string }>
  meta: { ratio: number; seed: string; depth: number }
}

export function generateCodexGraph(count = 144, cfg?: SpiralConfig): CodexGraph {
  const engine = new SpiralEngine(cfg)
  const nodes: CodexNode[] = []
  for (let i = 0; i < count; i++) {
    nodes.push(engine.generateNode(i) as CodexNode)
  }
  const edges: Array<{ from: string; to: string }> = []
  nodes.forEach((n, idx) => {
    n.connections.forEach((c) => {
      const from = `node-${idx}`
      const to = `node-${c}`
      edges.push({ from, to })
    })
  })
  return {
    nodes,
    edges,
    meta: {
      ratio: engine.config.ratio!,
      seed: engine.config.seed!,
      depth: engine.config.depth!,
    },
  }
}

export function describeCodex(cfg?: SpiralConfig) {
  const engine = new SpiralEngine(cfg)
  return engine.describe()
}
