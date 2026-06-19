import type { Edge, Node, Viewport } from "@xyflow/react"

export type ProjectStatus = "DRAFT" | "ACTIVE" | "ARCHIVED"
export type OrgNodeStatus = "OCCUPIED" | "OPEN" | "OUTSOURCED" | "TEMPORARY" | "FUTURE"
export type ProcessNodeType = "START" | "ACTIVITY" | "DECISION" | "DOCUMENT" | "SYSTEM" | "APPROVAL" | "WAIT" | "END"

export type Company = {
  id: string
  name: string
  segment?: string
  employeeCount?: number
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrgChartNodeData = Record<string, unknown> & {
  title: string
  occupantName?: string
  department?: string
  status: OrgNodeStatus
  reportsToNodeId?: string | null
  notes?: string
  color?: string
}

export type ProcessNodeData = Record<string, unknown> & {
  title: string
  type: ProcessNodeType
  description?: string
  department?: string
  responsibleRole?: string
  notes?: string
}

export type OrgChartFlowNode = Node<OrgChartNodeData>
export type ProcessFlowNode = Node<ProcessNodeData>

export type OrgChart = {
  id: string
  companyId: string
  name: string
  description?: string
  status: ProjectStatus
  revision: number
  viewport?: Viewport
  nodes: OrgChartFlowNode[]
  edges: Edge[]
  createdAt: string
  updatedAt: string
}

export type ProcessMap = {
  id: string
  companyId: string
  name: string
  description?: string
  department?: string
  processOwner?: string
  status: ProjectStatus
  revision: number
  viewport?: Viewport
  nodes: ProcessFlowNode[]
  edges: Edge[]
  createdAt: string
  updatedAt: string
}

export type DiagramTemplate = {
  id: string
  name: string
  segment: string
  type: "ORG_CHART" | "PROCESS"
  description: string
  accent: string
  nodes: Node<OrgChartNodeData | ProcessNodeData>[]
  edges: Edge[]
}
