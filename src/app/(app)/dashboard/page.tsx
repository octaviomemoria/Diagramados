"use client"

import Link from "next/link"
import { ArrowRight, Building2, Network, Plus, Sparkles, Workflow } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import { cn, formatDate } from "@/lib/utils"
import { useHydrated } from "@/hooks/use-hydrated"
import { Skeleton } from "@/components/ui/skeleton"

type Recent = { id: string; name: string; companyId: string; updatedAt: string; type: "Organograma" | "Processo" }

export default function DashboardPage() {
  const hydrated = useHydrated()
  const companies = useDiagramadosStore((state) => state.companies)
  const orgCharts = useDiagramadosStore((state) => state.orgCharts)
  const processes = useDiagramadosStore((state) => state.processes)

  const recent: Recent[] = [
    ...orgCharts.map((item) => ({ ...item, type: "Organograma" as const })),
    ...processes.map((item) => ({ ...item, type: "Processo" as const })),
  ].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6)

  return (
    <div>
      <PageHeader title="Visão geral" description="Estruturas e processos da sua organização." />
      <div className="flex flex-col gap-7 p-5 xl:p-8">
        <div className="flex flex-wrap gap-3">
          <Link href="/orgcharts/new" className={buttonVariants({ size: "lg" })}><Plus data-icon="inline-start" />Novo organograma</Link>
          <Link href="/processes/new" className={buttonVariants({ variant: "outline", size: "lg" })}><Plus data-icon="inline-start" />Novo processo</Link>
        </div>

        <section className="grid overflow-hidden rounded-xl border bg-card md:grid-cols-3" aria-label="Resumo">
          {[
            { label: "Empresas", value: companies.length, description: "Empresas ativas", icon: Building2, href: "/companies" },
            { label: "Organogramas", value: orgCharts.length, description: `Em ${new Set(orgCharts.map((item) => item.companyId)).size} empresas`, icon: Network, href: "/orgcharts" },
            { label: "Processos", value: processes.length, description: "Mapeados", icon: Workflow, href: "/processes" },
          ].map((stat, index) => (
            <Link key={stat.label} href={stat.href} className={cn("group flex items-center gap-4 p-5 hover:bg-muted/60", index > 0 && "border-t md:border-l md:border-t-0")}>
              <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><stat.icon className="size-6" /></span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-muted-foreground">{stat.label}</span><span className="block text-3xl font-bold tracking-[-0.04em]">{hydrated ? stat.value : "–"}</span><span className="block text-xs text-muted-foreground">{stat.description}</span></span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </section>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="flex items-center justify-between px-5 py-4"><h2 className="text-base font-semibold">Projetos recentes</h2><Link href="/orgcharts" className="text-sm font-semibold text-primary hover:underline">Ver todos</Link></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="border-y bg-muted/50 text-[11px] uppercase tracking-[0.08em] text-muted-foreground"><tr><th className="px-5 py-3 font-semibold">Nome</th><th className="px-4 py-3 font-semibold">Tipo</th><th className="px-4 py-3 font-semibold">Empresa</th><th className="px-4 py-3 font-semibold">Atualizado</th><th className="w-16" /></tr></thead>
              <tbody className="divide-y">
                {!hydrated ? Array.from({ length: 4 }).map((_, index) => <tr key={index}><td className="px-5 py-4" colSpan={5}><Skeleton className="h-8 w-full" /></td></tr>) : recent.map((item) => {
                  const company = companies.find((entry) => entry.id === item.companyId)
                  const href = item.type === "Organograma" ? `/orgcharts/${item.id}/edit` : `/processes/${item.id}/edit`
                  return <tr key={`${item.type}-${item.id}`} className="group hover:bg-muted/40"><td className="px-5 py-4"><Link href={href} className="font-semibold group-hover:text-primary">{item.name}</Link><span className="mt-0.5 block text-xs text-muted-foreground">{item.type === "Organograma" ? "Estrutura organizacional" : "Fluxo operacional"}</span></td><td className="px-4 py-4"><Badge variant={item.type === "Organograma" ? "default" : "success"}>{item.type}</Badge></td><td className="px-4 py-4 text-muted-foreground">{company?.name ?? "—"}</td><td className="px-4 py-4 text-muted-foreground">{formatDate(item.updatedAt)}</td><td className="px-4 py-4"><Link href={href} aria-label={`Abrir ${item.name}`} className="text-primary"><ArrowRight className="size-4" /></Link></td></tr>
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col items-start gap-5 rounded-xl border bg-card p-5 md:flex-row md:items-center">
          <span className="grid size-12 place-items-center rounded-xl bg-[#fff0eb] text-[#e55234]"><Sparkles className="size-5" /></span>
          <div className="flex-1"><h2 className="font-semibold">Transforme uma descrição em diagrama</h2><p className="mt-1 text-sm text-muted-foreground">Comece com uma sugestão estruturada e ajuste tudo no editor.</p></div>
          <Link href="/ai-create" className={buttonVariants({ variant: "outline" })}>Experimentar IA</Link>
        </section>
      </div>
    </div>
  )
}
