"use client"

import Link from "next/link"
import { Copy, MoreHorizontal, Network, Plus, Trash2, Workflow } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import { formatDate } from "@/lib/utils"
import { useHydrated } from "@/hooks/use-hydrated"

export function ProjectList({ type }: { type: "orgchart" | "process" }) {
  const hydrated = useHydrated()
  const companies = useDiagramadosStore((state) => state.companies)
  const projects = useDiagramadosStore((state) => type === "orgchart" ? state.orgCharts : state.processes)
  const duplicate = useDiagramadosStore((state) => type === "orgchart" ? state.duplicateOrgChart : state.duplicateProcess)
  const remove = useDiagramadosStore((state) => type === "orgchart" ? state.deleteOrgChart : state.deleteProcess)
  const plural = type === "orgchart" ? "Organogramas" : "Processos"
  const singular = type === "orgchart" ? "organograma" : "processo"
  const Icon = type === "orgchart" ? Network : Workflow

  if (!hydrated) return <div className="h-48 animate-pulse rounded-xl border bg-card" />
  if (!projects.length) return <EmptyState title={`Nenhum ${singular} ainda`} description={`Crie seu primeiro ${singular} e comece a estruturar a organização.`} action={<Link href={`/${type === "orgchart" ? "orgcharts" : "processes"}/new`} className={buttonVariants()}><Plus data-icon="inline-start" />Criar {singular}</Link>} />

  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b bg-muted/50 text-[11px] uppercase tracking-[0.08em] text-muted-foreground"><tr><th className="px-5 py-3">Nome</th><th className="px-4 py-3">Empresa</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Atualizado</th><th className="w-36 px-4 py-3">Ações</th></tr></thead>
          <tbody className="divide-y">
            {projects.map((project) => {
              const href = `/${type === "orgchart" ? "orgcharts" : "processes"}/${project.id}/edit`
              return (
                <tr key={project.id} className="group hover:bg-muted/40">
                  <td className="px-5 py-4"><Link href={href} className="flex items-center gap-3 font-semibold group-hover:text-primary"><span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-[18px]" /></span><span>{project.name}<span className="mt-0.5 block text-xs font-normal text-muted-foreground">{project.nodes.length} {type === "orgchart" ? "cargos" : "etapas"}</span></span></Link></td>
                  <td className="px-4 py-4 text-muted-foreground">{companies.find((company) => company.id === project.companyId)?.name ?? "—"}</td>
                  <td className="px-4 py-4"><Badge variant={project.status === "ACTIVE" ? "success" : "secondary"}>{project.status === "ACTIVE" ? "Ativo" : "Rascunho"}</Badge></td>
                  <td className="px-4 py-4 text-muted-foreground">{formatDate(project.updatedAt)}</td>
                  <td className="px-4 py-4"><div className="flex items-center gap-1"><button title="Duplicar" className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => { duplicate(project.id); toast.success(`${plural.slice(0, -1)} duplicado.`) }}><Copy className="size-4" /></button><button title="Excluir" className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-[#fff0ed] hover:text-destructive" onClick={() => { if (confirm(`Excluir ${project.name}?`)) remove(project.id) }}><Trash2 className="size-4" /></button><Link href={href} title="Abrir" className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"><MoreHorizontal className="size-4" /></Link></div></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
