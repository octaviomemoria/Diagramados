"use client"

import type { Node } from "@xyflow/react"
import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { OrgChartNodeData, OrgNodeStatus } from "@/types/domain"

export function OrgChartInspector({ node, nodes, onChange, onChangeSuperior, onDelete, onClose }: { node: Node<OrgChartNodeData>; nodes: Node<OrgChartNodeData>[]; onChange: (patch: Partial<OrgChartNodeData>) => void; onChangeSuperior: (parentId: string | null) => void; onDelete: () => void; onClose: () => void }) {
  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-l bg-card">
      <div className="flex h-16 items-center justify-between border-b px-5"><h2 className="text-sm font-bold">Detalhes do cargo</h2><button onClick={onClose} aria-label="Fechar painel" className="grid size-8 place-items-center rounded-md hover:bg-muted"><X className="size-4" /></button></div>
      <div className="flex-1 overflow-y-auto p-5"><FieldGroup>
        <Field><FieldLabel htmlFor="org-title">Cargo</FieldLabel><Input id="org-title" value={node.data.title} onChange={(event) => onChange({ title: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="org-occupant">Ocupante</FieldLabel><Input id="org-occupant" value={node.data.occupantName ?? ""} onChange={(event) => onChange({ occupantName: event.target.value })} placeholder="Nome da pessoa" /></Field>
        <Field><FieldLabel htmlFor="org-department">Departamento</FieldLabel><Input id="org-department" value={node.data.department ?? ""} onChange={(event) => onChange({ department: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="org-status">Status</FieldLabel><select id="org-status" className="h-10 rounded-lg border bg-card px-3 text-sm" value={node.data.status} onChange={(event) => onChange({ status: event.target.value as OrgNodeStatus })}><option value="OCCUPIED">Ocupado</option><option value="OPEN">Vaga aberta</option><option value="OUTSOURCED">Terceirizado</option><option value="TEMPORARY">Temporário</option><option value="FUTURE">Futuro</option></select></Field>
        <Field><FieldLabel htmlFor="org-superior">Superior imediato</FieldLabel><select id="org-superior" className="h-10 rounded-lg border bg-card px-3 text-sm" value={node.data.reportsToNodeId ?? ""} onChange={(event) => onChangeSuperior(event.target.value || null)}><option value="">Sem superior</option>{nodes.filter((item) => item.id !== node.id).map((item) => <option key={item.id} value={item.id}>{item.data.title}</option>)}</select></Field>
        <Field><FieldLabel htmlFor="org-notes">Observações</FieldLabel><Textarea id="org-notes" value={node.data.notes ?? ""} onChange={(event) => onChange({ notes: event.target.value })} /></Field>
      </FieldGroup></div>
      <div className="border-t p-4"><Button variant="outline" className="w-full border-[#ffc7bb] text-destructive hover:bg-[#fff0ed]" onClick={onDelete}><Trash2 data-icon="inline-start" />Excluir cargo</Button></div>
    </aside>
  )
}
