"use client"

import type { Edge, Node, Viewport } from "@xyflow/react"
import { createClient } from "@/lib/supabase/client"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import type { Company, OrgChart, OrgChartNodeData, ProcessMap, ProcessNodeData } from "@/types/domain"

type RemoteCompany = { id: string; name: string; segment: string | null; employee_count: number | null; notes: string | null; created_at: string; updated_at: string }
type RemoteOrgChart = { id: string; company_id: string; name: string; description: string | null; status: OrgChart["status"]; revision: number; viewport: Viewport | null; created_at: string; updated_at: string }
type RemoteOrgNode = { id: string; org_chart_id: string; title: string; occupant_name: string | null; department: string | null; status: OrgChartNodeData["status"]; reports_to_node_id: string | null; notes: string | null; color: string | null; position_x: number; position_y: number }
type RemoteOrgEdge = { id: string; org_chart_id: string; source_node_id: string; target_node_id: string; label: string | null }
type RemoteProcess = { id: string; company_id: string; name: string; description: string | null; department: string | null; process_owner: string | null; status: ProcessMap["status"]; revision: number; viewport: Viewport | null; created_at: string; updated_at: string }
type RemoteProcessNode = { id: string; process_map_id: string; type: ProcessNodeData["type"]; title: string; description: string | null; department: string | null; responsible_role: string | null; notes: string | null; position_x: number; position_y: number }
type RemoteProcessEdge = { id: string; process_map_id: string; source_node_id: string; target_node_id: string; label: string | null; source_handle: string | null; target_handle: string | null }

export function remoteEnabled() { return isSupabaseConfigured() }

function edgeLabel(label: Edge["label"]) {
  return typeof label === "string" || typeof label === "number" ? String(label) : null
}

export async function loadRemoteData() {
  if (!remoteEnabled()) return null
  const supabase = createClient()
  const [companiesResult, orgsResult, orgNodesResult, orgEdgesResult, processesResult, processNodesResult, processEdgesResult] = await Promise.all([
    supabase.from("companies").select("*").order("updated_at", { ascending: false }),
    supabase.from("org_charts").select("*").order("updated_at", { ascending: false }),
    supabase.from("org_chart_nodes").select("*"),
    supabase.from("org_chart_edges").select("*"),
    supabase.from("process_maps").select("*").order("updated_at", { ascending: false }),
    supabase.from("process_nodes").select("*"),
    supabase.from("process_edges").select("*"),
  ])
  const error = [companiesResult, orgsResult, orgNodesResult, orgEdgesResult, processesResult, processNodesResult, processEdgesResult].find((result) => result.error)?.error
  if (error) throw error

  const companies = (companiesResult.data as RemoteCompany[]).map((item): Company => ({ id: item.id, name: item.name, segment: item.segment ?? undefined, employeeCount: item.employee_count ?? undefined, notes: item.notes ?? undefined, createdAt: item.created_at, updatedAt: item.updated_at }))
  const orgNodes = orgNodesResult.data as RemoteOrgNode[]
  const orgEdges = orgEdgesResult.data as RemoteOrgEdge[]
  const orgCharts = (orgsResult.data as RemoteOrgChart[]).map((item): OrgChart => ({ id: item.id, companyId: item.company_id, name: item.name, description: item.description ?? undefined, status: item.status, revision: item.revision, viewport: item.viewport ?? undefined, createdAt: item.created_at, updatedAt: item.updated_at, nodes: orgNodes.filter((node) => node.org_chart_id === item.id).map((node): Node<OrgChartNodeData> => ({ id: node.id, type: "orgChart", position: { x: node.position_x, y: node.position_y }, data: { title: node.title, occupantName: node.occupant_name ?? undefined, department: node.department ?? undefined, status: node.status, reportsToNodeId: node.reports_to_node_id, notes: node.notes ?? undefined, color: node.color ?? undefined } })), edges: orgEdges.filter((edge) => edge.org_chart_id === item.id).map((edge): Edge => ({ id: edge.id, source: edge.source_node_id, target: edge.target_node_id, label: edge.label ?? undefined, type: "smoothstep" })) }))
  const processNodes = processNodesResult.data as RemoteProcessNode[]
  const processEdges = processEdgesResult.data as RemoteProcessEdge[]
  const nodeType = (type: ProcessNodeData["type"]) => type === "START" ? "processStart" : type === "END" ? "processEnd" : type === "DECISION" ? "processDecision" : "processActivity"
  const processes = (processesResult.data as RemoteProcess[]).map((item): ProcessMap => ({ id: item.id, companyId: item.company_id, name: item.name, description: item.description ?? undefined, department: item.department ?? undefined, processOwner: item.process_owner ?? undefined, status: item.status, revision: item.revision, viewport: item.viewport ?? undefined, createdAt: item.created_at, updatedAt: item.updated_at, nodes: processNodes.filter((node) => node.process_map_id === item.id).map((node): Node<ProcessNodeData> => ({ id: node.id, type: nodeType(node.type), position: { x: node.position_x, y: node.position_y }, data: { title: node.title, type: node.type, description: node.description ?? undefined, department: node.department ?? undefined, responsibleRole: node.responsible_role ?? undefined, notes: node.notes ?? undefined } })), edges: processEdges.filter((edge) => edge.process_map_id === item.id).map((edge): Edge => ({ id: edge.id, source: edge.source_node_id, target: edge.target_node_id, sourceHandle: edge.source_handle, targetHandle: edge.target_handle, label: edge.label ?? undefined, type: "smoothstep" })) }))
  return { companies, orgCharts, processes }
}

export async function persistCompany(company: Company) { if (!remoteEnabled()) return; const { error } = await createClient().from("companies").upsert({ id: company.id, name: company.name, segment: company.segment, employee_count: company.employeeCount, notes: company.notes }); if (error) throw error }
export async function persistOrgChartHeader(chart: OrgChart) { if (!remoteEnabled()) return; const { error } = await createClient().from("org_charts").upsert({ id: chart.id, company_id: chart.companyId, name: chart.name, description: chart.description, status: chart.status }); if (error) throw error }
export async function persistProcessHeader(process: ProcessMap) { if (!remoteEnabled()) return; const { error } = await createClient().from("process_maps").upsert({ id: process.id, company_id: process.companyId, name: process.name, description: process.description, department: process.department, process_owner: process.processOwner, status: process.status }); if (error) throw error }

export async function saveOrgChartRemote(chart: OrgChart, nodes: Node<OrgChartNodeData>[], edges: Edge[], viewport?: Viewport) {
  if (!remoteEnabled()) return
  await persistOrgChartHeader(chart)
  const { error } = await createClient().rpc("save_org_chart_snapshot", { p_org_chart_id: chart.id, p_expected_revision: chart.revision, p_nodes: nodes.map((node) => ({ id: node.id, title: node.data.title, occupant_name: node.data.occupantName, department: node.data.department, status: node.data.status, reports_to_node_id: node.data.reportsToNodeId, notes: node.data.notes, color: node.data.color, position_x: node.position.x, position_y: node.position.y })), p_edges: edges.map((edge) => ({ id: edge.id, source_node_id: edge.source, target_node_id: edge.target, label: edgeLabel(edge.label) })), p_viewport: viewport ?? null })
  if (error) throw error
}

export async function saveProcessRemote(process: ProcessMap, nodes: Node<ProcessNodeData>[], edges: Edge[], viewport?: Viewport) {
  if (!remoteEnabled()) return
  await persistProcessHeader(process)
  const { error } = await createClient().rpc("save_process_snapshot", { p_process_map_id: process.id, p_expected_revision: process.revision, p_nodes: nodes.map((node) => ({ id: node.id, type: node.data.type, title: node.data.title, description: node.data.description, department: node.data.department, responsible_role: node.data.responsibleRole, notes: node.data.notes, position_x: node.position.x, position_y: node.position.y })), p_edges: edges.map((edge) => ({ id: edge.id, source_node_id: edge.source, target_node_id: edge.target, label: edgeLabel(edge.label), source_handle: edge.sourceHandle, target_handle: edge.targetHandle })), p_viewport: viewport ?? null })
  if (error) throw error
}

export async function removeRemote(table: "companies" | "org_charts" | "process_maps", id: string) { if (!remoteEnabled()) return; const { error } = await createClient().from(table).delete().eq("id", id); if (error) throw error }
