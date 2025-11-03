// Minimal placeholder implementation for @cathedral/node-tree-engine
export type HealthStatus = "healthy" | "warning" | "critical";

export type HealthNode = {
  id: string;
  name: string;
  status: HealthStatus;
};

export function createNode(id: string, name: string): HealthNode {
  return { id, name, status: "healthy" };
}

export function evaluate(nodes: HealthNode[]): { ok: boolean; issues: number } {
  const issues = nodes.filter((n) => n.status !== "healthy").length;
  return { ok: issues === 0, issues };
}
