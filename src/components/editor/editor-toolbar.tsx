"use client"

import { Download, Maximize, Minus, Plus, Redo2, Save, Undo2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function EditorToolbar({ onAdd, onSave, onExport, onFit, onZoomIn, onZoomOut, saveState, addLabel }: { onAdd: () => void; onSave: () => void; onExport: () => void; onFit: () => void; onZoomIn: () => void; onZoomOut: () => void; saveState: "saved" | "dirty" | "saving" | "error"; addLabel: string }) {
  const label = saveState === "saved" ? "Alterações salvas" : saveState === "dirty" ? "Alterações não salvas" : saveState === "saving" ? "Salvando..." : "Erro ao salvar"
  return (
    <div className="flex h-[66px] items-center gap-2 overflow-x-auto border-b bg-card px-4">
      <Button onClick={onAdd}><Plus data-icon="inline-start" />{addLabel}</Button>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Button variant="outline" size="icon" title="Desfazer" disabled><Undo2 /></Button>
      <Button variant="outline" size="icon" title="Refazer" disabled><Redo2 /></Button>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Button variant="outline" size="icon" title="Diminuir zoom" onClick={onZoomOut}><Minus /></Button>
      <Button variant="outline" size="icon" title="Aumentar zoom" onClick={onZoomIn}><Plus /></Button>
      <Button variant="outline" onClick={onFit}><Maximize data-icon="inline-start" />Ajustar</Button>
      <span className="ml-auto whitespace-nowrap text-xs font-medium text-muted-foreground">{label}</span>
      <Button variant="outline" onClick={onExport}><Download data-icon="inline-start" />Exportar</Button>
      <Button onClick={onSave} disabled={saveState === "saving"}><Save data-icon="inline-start" />Salvar</Button>
    </div>
  )
}
