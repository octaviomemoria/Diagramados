"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  addEdge,
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { toast } from "sonner"
import { EditorHeader } from "@/components/editor/editor-header"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { OrgChartNode } from "@/components/editor/org-chart-node"
import { OrgChartInspector } from "@/components/editor/org-chart-inspector"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import { deriveOrgReportsTo, validateOrgConnection } from "@/lib/graph-validation"
import { makeId } from "@/lib/utils"
import type { OrgChartFlowNode, OrgChartNodeData } from "@/types/domain"
import { useDiagramExport } from "@/hooks/use-diagram-export"

const nodeTypes = { orgChart: OrgChartNode }

function OrgChartEditorInner({ projectId }: { projectId: string }) {
  const project = useDiagramadosStore((state) => state.orgCharts.find((item) => item.id === projectId))
  const saveProject = useDiagramadosStore((state) => state.saveOrgChart)
  const [nodes, setNodes, applyNodeChanges] = useNodesState<OrgChartFlowNode>(project?.nodes ?? [])
  const [edges, setEdges, applyEdgeChanges] = useEdgesState(project?.edges ?? [])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<"saved" | "dirty" | "saving" | "error">("saved")
  const flow = useReactFlow()
  const exportDiagram = useDiagramExport(nodes, project?.name ?? "organograma")

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (saveState === "dirty") event.preventDefault() }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [saveState])

  const onNodesChange = useCallback((changes: NodeChange<OrgChartFlowNode>[]) => {
    applyNodeChanges(changes)
    if (changes.some((change) => change.type !== "select" && change.type !== "dimensions")) setSaveState("dirty")
  }, [applyNodeChanges])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    applyEdgeChanges(changes)
    if (changes.some((change) => change.type !== "select")) setSaveState("dirty")
  }, [applyEdgeChanges])

  const onConnect = useCallback((connection: Connection) => {
    if (!connection.source || !connection.target) return
    const error = validateOrgConnection(edges, connection.source, connection.target)
    if (error) return toast.error(error)
    const nextEdges = addEdge({ ...connection, id: makeId("edge"), type: "smoothstep" }, edges)
    setEdges(nextEdges)
    setNodes((current) => deriveOrgReportsTo(current, nextEdges))
    setSaveState("dirty")
  }, [edges, setEdges, setNodes])

  function addNode() {
    const id = makeId("node")
    const position = flow.screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    setNodes((current) => [...current, { id, type: "orgChart", position, data: { title: "Novo cargo", department: "", status: "OPEN", reportsToNodeId: null, color: "#315efb" } }])
    setSelectedId(id)
    setSaveState("dirty")
  }

  function updateSelected(patch: Partial<OrgChartNodeData>) {
    if (!selectedId) return
    setNodes((current) => current.map((node) => node.id === selectedId ? { ...node, data: { ...node.data, ...patch } } : node))
    setSaveState("dirty")
  }

  function changeSuperior(parentId: string | null) {
    if (!selectedId) return
    let nextEdges = edges.filter((edge) => edge.target !== selectedId)
    if (parentId) {
      const error = validateOrgConnection(nextEdges, parentId, selectedId)
      if (error) return toast.error(error)
      nextEdges = addEdge({ id: makeId("edge"), source: parentId, target: selectedId, type: "smoothstep" }, nextEdges)
    }
    setEdges(nextEdges)
    setNodes((current) => current.map((node) => node.id === selectedId ? { ...node, data: { ...node.data, reportsToNodeId: parentId } } : node))
    setSaveState("dirty")
  }

  function removeSelected() {
    if (!selectedId) return
    if (!confirm("Excluir este cargo? Subordinados ficarão sem superior.")) return
    setNodes((current) => current.filter((node) => node.id !== selectedId).map((node) => node.data.reportsToNodeId === selectedId ? { ...node, data: { ...node.data, reportsToNodeId: null } } : node))
    setEdges((current) => current.filter((edge) => edge.source !== selectedId && edge.target !== selectedId))
    setSelectedId(null)
    setSaveState("dirty")
  }

  async function save() {
    if (!project) return
    setSaveState("saving")
    try {
      await saveProject(project.id, deriveOrgReportsTo(nodes, edges), edges, flow.getViewport())
      setSaveState("saved")
      toast.success("Organograma salvo.")
    } catch {
      setSaveState("error")
      toast.error("Não foi possível salvar.")
    }
  }

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedId) ?? null, [nodes, selectedId])
  if (!project) return <div className="grid h-screen place-items-center text-sm text-muted-foreground">Organograma não encontrado.</div>

  return (
    <div className="flex h-screen min-h-[680px] flex-col overflow-hidden bg-card">
      <EditorHeader section="Organogramas" sectionHref="/orgcharts" projectName={project.name} />
      <EditorToolbar addLabel="Adicionar cargo" onAdd={addNode} onSave={save} onExport={() => exportDiagram().catch(() => toast.error("Adicione cargos antes de exportar."))} onFit={() => flow.fitView({ padding: 0.2, duration: 250 })} onZoomIn={() => flow.zoomIn({ duration: 150 })} onZoomOut={() => flow.zoomOut({ duration: 150 })} saveState={saveState} />
      <div className="flex min-h-0 flex-1">
        <div className="relative min-w-0 flex-1">
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelectedId(node.id)} onPaneClick={() => setSelectedId(null)} fitView fitViewOptions={{ padding: 0.2 }} minZoom={0.2} maxZoom={2} defaultEdgeOptions={{ type: "smoothstep", style: { stroke: "#8ca0bc", strokeWidth: 1.5 } }} deleteKeyCode={null}>
            <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#d9dee7" />
          </ReactFlow>
        </div>
        {selectedNode ? <OrgChartInspector node={selectedNode} nodes={nodes} onChange={updateSelected} onChangeSuperior={changeSuperior} onDelete={removeSelected} onClose={() => setSelectedId(null)} /> : null}
      </div>
      <footer className="flex h-10 items-center gap-6 border-t bg-card px-5 text-xs text-muted-foreground"><span>Zoom: {Math.round(flow.getZoom() * 100)}%</span><span>{nodes.length} cargos</span><span>{edges.length} relações</span><span className="ml-auto">Revisão {project.revision}</span></footer>
    </div>
  )
}

export function OrgChartEditor({ projectId }: { projectId: string }) {
  return <ReactFlowProvider><OrgChartEditorInner projectId={projectId} /></ReactFlowProvider>
}
