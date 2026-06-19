"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { addEdge, Background, BackgroundVariant, MarkerType, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow, type Connection, type EdgeChange, type NodeChange } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { toast } from "sonner"
import { EditorHeader } from "@/components/editor/editor-header"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { ProcessActivityNode, ProcessDecisionNode, ProcessEndNode, ProcessStartNode } from "@/components/editor/process-nodes"
import { ProcessInspector } from "@/components/editor/process-inspector"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import { getProcessWarnings, validateProcessConnection } from "@/lib/graph-validation"
import { makeId } from "@/lib/utils"
import type { ProcessFlowNode, ProcessNodeData, ProcessNodeType } from "@/types/domain"
import { useDiagramExport } from "@/hooks/use-diagram-export"

const nodeTypes = { processStart: ProcessStartNode, processEnd: ProcessEndNode, processDecision: ProcessDecisionNode, processActivity: ProcessActivityNode }
const flowNodeType = (type: ProcessNodeType) => type === "START" ? "processStart" : type === "END" ? "processEnd" : type === "DECISION" ? "processDecision" : "processActivity"

function ProcessEditorInner({ projectId }: { projectId: string }) {
  const project = useDiagramadosStore((state) => state.processes.find((item) => item.id === projectId))
  const saveProject = useDiagramadosStore((state) => state.saveProcess)
  const [nodes, setNodes, applyNodeChanges] = useNodesState<ProcessFlowNode>(project?.nodes ?? [])
  const [edges, setEdges, applyEdgeChanges] = useEdgesState(project?.edges ?? [])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saveState, setSaveState] = useState<"saved" | "dirty" | "saving" | "error">("saved")
  const flow = useReactFlow()
  const exportDiagram = useDiagramExport(nodes, project?.name ?? "processo")
  const warnings = useMemo(() => getProcessWarnings(nodes, edges), [nodes, edges])

  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (saveState === "dirty") event.preventDefault() }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn) }, [saveState])

  const onNodesChange = useCallback((changes: NodeChange<ProcessFlowNode>[]) => { applyNodeChanges(changes); if (changes.some((change) => change.type !== "select" && change.type !== "dimensions")) setSaveState("dirty") }, [applyNodeChanges])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => { applyEdgeChanges(changes); if (changes.some((change) => change.type !== "select")) setSaveState("dirty") }, [applyEdgeChanges])
  const onConnect = useCallback((connection: Connection) => { if (!connection.source || !connection.target) return; const error = validateProcessConnection(edges, connection.source, connection.target); if (error) return toast.error(error); const source = nodes.find((node) => node.id === connection.source); const label = source?.data.type === "DECISION" ? (connection.sourceHandle === "no" ? "Não" : "Sim") : undefined; setEdges((current) => addEdge({ ...connection, id: makeId("edge"), type: "smoothstep", label, markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 } }, current)); setSaveState("dirty") }, [edges, nodes, setEdges])

  function addNode() { const id = makeId("node"); const position = flow.screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 }); setNodes((current) => [...current, { id, type: "processActivity", position, data: { title: "Nova atividade", type: "ACTIVITY" } }]); setSelectedId(id); setSaveState("dirty") }
  function updateSelected(patch: Partial<ProcessNodeData>) { if (!selectedId) return; setNodes((current) => current.map((node) => node.id === selectedId ? { ...node, type: patch.type ? flowNodeType(patch.type) : node.type, data: { ...node.data, ...patch } } : node)); setSaveState("dirty") }
  function removeSelected() { if (!selectedId || !confirm("Excluir esta etapa?")) return; setNodes((current) => current.filter((node) => node.id !== selectedId)); setEdges((current) => current.filter((edge) => edge.source !== selectedId && edge.target !== selectedId)); setSelectedId(null); setSaveState("dirty") }
  async function save() { if (!project) return; setSaveState("saving"); try { await saveProject(project.id, nodes, edges, flow.getViewport()); setSaveState("saved"); toast.success("Processo salvo.") } catch { setSaveState("error"); toast.error("Não foi possível salvar.") } }
  function editEdgeLabel(edgeId: string) { const edge = edges.find((item) => item.id === edgeId); const label = prompt("Rótulo da conexão", typeof edge?.label === "string" ? edge.label : ""); if (label === null) return; setEdges((current) => current.map((item) => item.id === edgeId ? { ...item, label } : item)); setSaveState("dirty") }

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedId) ?? null, [nodes, selectedId])
  if (!project) return <div className="grid h-screen place-items-center text-sm text-muted-foreground">Processo não encontrado.</div>

  return <div className="flex h-screen min-h-[680px] flex-col overflow-hidden bg-card"><EditorHeader section="Processos" sectionHref="/processes" projectName={project.name} /><EditorToolbar addLabel="Adicionar etapa" onAdd={addNode} onSave={save} onExport={() => exportDiagram().catch(() => toast.error("Adicione etapas antes de exportar."))} onFit={() => flow.fitView({ padding: 0.2, duration: 250 })} onZoomIn={() => flow.zoomIn({ duration: 150 })} onZoomOut={() => flow.zoomOut({ duration: 150 })} saveState={saveState} /><div className="flex min-h-0 flex-1"><div className="relative min-w-0 flex-1"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node) => setSelectedId(node.id)} onPaneClick={() => setSelectedId(null)} onEdgeDoubleClick={(_, edge) => editEdgeLabel(edge.id)} fitView fitViewOptions={{ padding: 0.2 }} minZoom={0.2} maxZoom={2} defaultEdgeOptions={{ type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 }, style: { stroke: "#71839c", strokeWidth: 1.4 } }} deleteKeyCode={null}><Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#d9dee7" /></ReactFlow></div>{selectedNode ? <ProcessInspector node={selectedNode} onChange={updateSelected} onDelete={removeSelected} onClose={() => setSelectedId(null)} /> : null}</div><footer className="flex h-10 items-center gap-6 border-t bg-card px-5 text-xs text-muted-foreground"><span>Zoom: {Math.round(flow.getZoom() * 100)}%</span><span>{nodes.length} etapas</span><span>{edges.length} conexões</span>{warnings.length ? <span className="ml-auto font-medium text-[#b46600]">{warnings[0]}{warnings.length > 1 ? ` +${warnings.length - 1}` : ""}</span> : <span className="ml-auto text-[#117a48]">Fluxo consistente</span>}</footer></div>
}

export function ProcessEditor({ projectId }: { projectId: string }) { return <ReactFlowProvider><ProcessEditorInner projectId={projectId} /></ReactFlowProvider> }
