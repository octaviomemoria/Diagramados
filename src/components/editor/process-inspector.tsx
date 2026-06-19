"use client"

import type { Node } from "@xyflow/react"
import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ProcessNodeData, ProcessNodeType } from "@/types/domain"

export function ProcessInspector({ node, onChange, onDelete, onClose }: { node: Node<ProcessNodeData>; onChange: (patch: Partial<ProcessNodeData>) => void; onDelete: () => void; onClose: () => void }) {
  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-l bg-card">
      <div className="flex h-16 items-center justify-between border-b px-5"><h2 className="text-sm font-bold">Detalhes da etapa</h2><button onClick={onClose} aria-label="Fechar painel" className="grid size-8 place-items-center rounded-md hover:bg-muted"><X className="size-4" /></button></div>
      <div className="flex-1 overflow-y-auto p-5"><FieldGroup>
        <Field><FieldLabel htmlFor="process-type">Tipo</FieldLabel><select id="process-type" className="h-10 rounded-lg border bg-card px-3 text-sm" value={node.data.type} onChange={(event) => onChange({ type: event.target.value as ProcessNodeType })}><option value="START">Início</option><option value="ACTIVITY">Atividade</option><option value="DECISION">Decisão</option><option value="DOCUMENT">Documento</option><option value="SYSTEM">Sistema</option><option value="APPROVAL">Aprovação</option><option value="WAIT">Espera</option><option value="END">Fim</option></select></Field>
        <Field><FieldLabel htmlFor="process-title">Nome</FieldLabel><Input id="process-title" value={node.data.title} onChange={(event) => onChange({ title: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="process-description">Descrição</FieldLabel><Textarea id="process-description" value={node.data.description ?? ""} onChange={(event) => onChange({ description: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="process-department">Área responsável</FieldLabel><Input id="process-department" value={node.data.department ?? ""} onChange={(event) => onChange({ department: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="process-owner">Cargo responsável</FieldLabel><Input id="process-owner" value={node.data.responsibleRole ?? ""} onChange={(event) => onChange({ responsibleRole: event.target.value })} /></Field>
        <Field><FieldLabel htmlFor="process-notes">Observações</FieldLabel><Textarea id="process-notes" value={node.data.notes ?? ""} onChange={(event) => onChange({ notes: event.target.value })} /></Field>
      </FieldGroup></div>
      <div className="border-t p-4"><Button variant="outline" className="w-full border-[#ffc7bb] text-destructive hover:bg-[#fff0ed]" onClick={onDelete}><Trash2 data-icon="inline-start" />Excluir etapa</Button></div>
    </aside>
  )
}
