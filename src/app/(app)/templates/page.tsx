"use client"

import { useRouter } from "next/navigation"
import { FileStack, Network, Workflow } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { templates } from "@/data/templates"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import type { Node } from "@xyflow/react"
import type { OrgChartNodeData, ProcessNodeData } from "@/types/domain"

export default function TemplatesPage() {
  const router = useRouter()
  const companies = useDiagramadosStore((state) => state.companies)
  const createOrgChart = useDiagramadosStore((state) => state.createOrgChart)
  const createProcess = useDiagramadosStore((state) => state.createProcess)
  const saveOrgChart = useDiagramadosStore((state) => state.saveOrgChart)
  const saveProcess = useDiagramadosStore((state) => state.saveProcess)

  async function applyTemplate(template: (typeof templates)[number]) {
    const companyId = companies[0]?.id
    if (!companyId) return toast.error("Cadastre uma empresa primeiro.")
    if (template.type === "ORG_CHART") {
      const id = createOrgChart({ companyId, name: template.name, description: template.description })
      await saveOrgChart(id, structuredClone(template.nodes) as Node<OrgChartNodeData>[], structuredClone(template.edges))
      router.push(`/orgcharts/${id}/edit`)
    } else {
      const id = createProcess({ companyId, name: template.name, description: template.description })
      await saveProcess(id, structuredClone(template.nodes) as Node<ProcessNodeData>[], structuredClone(template.edges))
      router.push(`/processes/${id}/edit`)
    }
  }

  return <div><PageHeader title="Modelos" description="Pontos de partida práticos para não começar do zero." /><div className="p-5 xl:p-8"><div className="grid gap-4 lg:grid-cols-2">{templates.map((template) => { const Icon = template.type === "ORG_CHART" ? Network : Workflow; return <article key={template.id} className="flex min-h-48 flex-col rounded-xl border bg-card p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)]"><div className="flex items-start justify-between gap-4"><span className="grid size-11 place-items-center rounded-xl text-white" style={{ backgroundColor: template.accent }}><Icon className="size-5" /></span><Badge variant={template.type === "ORG_CHART" ? "default" : "success"}>{template.type === "ORG_CHART" ? "Organograma" : "Processo"}</Badge></div><h2 className="mt-5 text-lg font-bold">{template.name}</h2><p className="mt-1 text-sm text-muted-foreground">{template.description}</p><div className="mt-auto flex items-center justify-between pt-5"><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><FileStack className="size-3.5" />{template.segment}</span><Button variant="outline" onClick={() => void applyTemplate(template)}>Usar modelo</Button></div></article> })}</div></div></div>
}
