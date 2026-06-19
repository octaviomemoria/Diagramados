"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Edge, Node, Viewport } from "@xyflow/react"
import { seedCompanies, seedOrgCharts, seedProcesses } from "@/data/seed"
import type { Company, OrgChart, OrgChartNodeData, ProcessMap, ProcessNodeData } from "@/types/domain"
import { makeId } from "@/lib/utils"
import { persistCompany, persistOrgChartHeader, persistProcessHeader, removeRemote, saveOrgChartRemote, saveProcessRemote } from "@/lib/supabase/remote-data"

type NewProjectInput = { companyId: string; name: string; description?: string }

type DiagramadosState = {
  companies: Company[]
  orgCharts: OrgChart[]
  processes: ProcessMap[]
  setRemoteData: (data: Pick<DiagramadosState, "companies" | "orgCharts" | "processes">) => void
  createCompany: (input: Pick<Company, "name" | "segment" | "employeeCount" | "notes">) => string
  updateCompany: (id: string, patch: Partial<Company>) => void
  deleteCompany: (id: string) => void
  createOrgChart: (input: NewProjectInput) => string
  createProcess: (input: NewProjectInput) => string
  saveOrgChart: (id: string, nodes: Node<OrgChartNodeData>[], edges: Edge[], viewport?: Viewport) => Promise<void>
  saveProcess: (id: string, nodes: Node<ProcessNodeData>[], edges: Edge[], viewport?: Viewport) => Promise<void>
  deleteOrgChart: (id: string) => void
  deleteProcess: (id: string) => void
  duplicateOrgChart: (id: string) => string | null
  duplicateProcess: (id: string) => string | null
  resetDemo: () => void
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const useDiagramadosStore = create<DiagramadosState>()(
  persist(
    (set, get) => ({
      companies: clone(seedCompanies),
      orgCharts: clone(seedOrgCharts),
      processes: clone(seedProcesses),
      setRemoteData: (data) => set(data),
      createCompany: (input) => {
        const id = makeId("company")
        const now = new Date().toISOString()
        const company = { ...input, id, createdAt: now, updatedAt: now }
        set((state) => ({ companies: [...state.companies, company] }))
        void persistCompany(company)
        return id
      },
      updateCompany: (id, patch) => set((state) => ({ companies: state.companies.map((company) => company.id === id ? { ...company, ...patch, updatedAt: new Date().toISOString() } : company) })),
      deleteCompany: (id) => { set((state) => ({ companies: state.companies.filter((company) => company.id !== id) })); void removeRemote("companies", id) },
      createOrgChart: (input) => {
        const id = makeId("org")
        const now = new Date().toISOString()
        const chart: OrgChart = { ...input, id, status: "DRAFT", revision: 1, nodes: [], edges: [], createdAt: now, updatedAt: now }
        set((state) => ({ orgCharts: [chart, ...state.orgCharts] }))
        void persistOrgChartHeader(chart)
        return id
      },
      createProcess: (input) => {
        const id = makeId("process")
        const now = new Date().toISOString()
        const process: ProcessMap = { ...input, id, status: "DRAFT", revision: 1, nodes: [], edges: [], createdAt: now, updatedAt: now }
        set((state) => ({ processes: [process, ...state.processes] }))
        void persistProcessHeader(process)
        return id
      },
      saveOrgChart: async (id, nodes, edges, viewport) => { const chart = get().orgCharts.find((item) => item.id === id); if (!chart) return; await saveOrgChartRemote(chart, nodes, edges, viewport); set((state) => ({ orgCharts: state.orgCharts.map((item) => item.id === id ? { ...item, nodes, edges, viewport, revision: item.revision + 1, updatedAt: new Date().toISOString() } : item) })) },
      saveProcess: async (id, nodes, edges, viewport) => { const process = get().processes.find((item) => item.id === id); if (!process) return; await saveProcessRemote(process, nodes, edges, viewport); set((state) => ({ processes: state.processes.map((item) => item.id === id ? { ...item, nodes, edges, viewport, revision: item.revision + 1, updatedAt: new Date().toISOString() } : item) })) },
      deleteOrgChart: (id) => { set((state) => ({ orgCharts: state.orgCharts.filter((chart) => chart.id !== id) })); void removeRemote("org_charts", id) },
      deleteProcess: (id) => { set((state) => ({ processes: state.processes.filter((process) => process.id !== id) })); void removeRemote("process_maps", id) },
      duplicateOrgChart: (id) => {
        const source = get().orgCharts.find((item) => item.id === id)
        if (!source) return null
        const copyId = makeId("org")
        const now = new Date().toISOString()
        const nodeIds = new Map(source.nodes.map((node) => [node.id, makeId("node")]))
        const copy: OrgChart = { ...clone(source), id: copyId, name: `${source.name} - cópia`, revision: 1, createdAt: now, updatedAt: now, nodes: source.nodes.map((node) => ({ ...clone(node), id: nodeIds.get(node.id)!, data: { ...node.data, reportsToNodeId: node.data.reportsToNodeId ? nodeIds.get(node.data.reportsToNodeId) : null } })), edges: source.edges.map((edge) => ({ ...clone(edge), id: makeId("edge"), source: nodeIds.get(edge.source)!, target: nodeIds.get(edge.target)! })) }
        set((state) => ({ orgCharts: [copy, ...state.orgCharts] }))
        return copyId
      },
      duplicateProcess: (id) => {
        const source = get().processes.find((item) => item.id === id)
        if (!source) return null
        const copyId = makeId("process")
        const now = new Date().toISOString()
        const nodeIds = new Map(source.nodes.map((node) => [node.id, makeId("node")]))
        const copy: ProcessMap = { ...clone(source), id: copyId, name: `${source.name} - cópia`, revision: 1, createdAt: now, updatedAt: now, nodes: source.nodes.map((node) => ({ ...clone(node), id: nodeIds.get(node.id)! })), edges: source.edges.map((edge) => ({ ...clone(edge), id: makeId("edge"), source: nodeIds.get(edge.source)!, target: nodeIds.get(edge.target)! })) }
        set((state) => ({ processes: [copy, ...state.processes] }))
        return copyId
      },
      resetDemo: () => set({ companies: clone(seedCompanies), orgCharts: clone(seedOrgCharts), processes: clone(seedProcesses) }),
    }),
    { name: "diagramados-v1" },
  ),
)
