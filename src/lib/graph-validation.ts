import type { Edge, Node } from "@xyflow/react"
import type { OrgChartNodeData, ProcessNodeData } from "@/types/domain"

export function wouldCreateOrgCycle(edges: Edge[], source: string, target: string) {
  if (source === target) return true
  const adjacency = new Map<string, string[]>()
  for (const edge of edges) {
    const targets = adjacency.get(edge.source) ?? []
    targets.push(edge.target)
    adjacency.set(edge.source, targets)
  }
  const stack = [target]
  const visited = new Set<string>()
  while (stack.length) {
    const current = stack.pop()!
    if (current === source) return true
    if (visited.has(current)) continue
    visited.add(current)
    stack.push(...(adjacency.get(current) ?? []))
  }
  return false
}

export function validateOrgConnection(edges: Edge[], source: string, target: string) {
  if (source === target) return "Um cargo não pode responder a si mesmo."
  if (edges.some((edge) => edge.source === source && edge.target === target)) return "Esta relação já existe."
  if (edges.some((edge) => edge.target === target)) return "Cada cargo pode ter apenas um superior direto."
  if (wouldCreateOrgCycle(edges, source, target)) return "Essa relação criaria um ciclo hierárquico."
  return null
}

export function validateProcessConnection(edges: Edge[], source: string, target: string) {
  if (source === target) return "Uma etapa não pode apontar para si mesma."
  if (edges.some((edge) => edge.source === source && edge.target === target)) return "Esta conexão já existe."
  return null
}

export function getProcessWarnings(nodes: Node<ProcessNodeData>[], edges: Edge[]) {
  const warnings: string[] = []
  if (!nodes.some((node) => node.data.type === "START")) warnings.push("Processo sem início")
  if (!nodes.some((node) => node.data.type === "END")) warnings.push("Processo sem fim")
  const connected = new Set(edges.flatMap((edge) => [edge.source, edge.target]))
  const orphanCount = nodes.filter((node) => nodes.length > 1 && !connected.has(node.id)).length
  if (orphanCount) warnings.push(`${orphanCount} etapa${orphanCount > 1 ? "s" : ""} sem conexão`)
  const withoutOwner = nodes.filter((node) => node.data.type === "ACTIVITY" && !node.data.responsibleRole).length
  if (withoutOwner) warnings.push(`${withoutOwner} etapa${withoutOwner > 1 ? "s" : ""} sem responsável`)
  return warnings
}

export function deriveOrgReportsTo(nodes: Node<OrgChartNodeData>[], edges: Edge[]) {
  const parentByTarget = new Map(edges.map((edge) => [edge.target, edge.source]))
  return nodes.map((node) => ({
    ...node,
    data: { ...node.data, reportsToNodeId: parentByTarget.get(node.id) ?? null },
  }))
}
