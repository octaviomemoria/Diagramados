"use client"

import Link from "next/link"
import { Building2, Network, Plus, Workflow } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { useDiagramadosStore } from "@/store/use-diagramados-store"
import { useHydrated } from "@/hooks/use-hydrated"

export default function CompaniesPage() {
  const hydrated = useHydrated()
  const companies = useDiagramadosStore((state) => state.companies)
  const orgCharts = useDiagramadosStore((state) => state.orgCharts)
  const processes = useDiagramadosStore((state) => state.processes)
  return <div><PageHeader title="Empresas" description="Clientes e organizações do seu workspace."><Link href="/companies/new" className={buttonVariants()}><Plus data-icon="inline-start" />Nova empresa</Link></PageHeader><div className="p-5 xl:p-8">{hydrated && !companies.length ? <EmptyState title="Nenhuma empresa" description="Cadastre uma empresa para começar." action={<Link href="/companies/new" className={buttonVariants()}>Cadastrar empresa</Link>} /> : <div className="grid gap-4 lg:grid-cols-2">{companies.map((company) => <article key={company.id} className="flex items-center gap-4 rounded-xl border bg-card p-5"><span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><Building2 className="size-6" /></span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h2 className="truncate font-semibold">{company.name}</h2><Badge variant="success">Ativa</Badge></div><p className="mt-1 text-sm text-muted-foreground">{company.segment || "Segmento não informado"}</p><div className="mt-3 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Network className="size-3.5" />{orgCharts.filter((item) => item.companyId === company.id).length} organogramas</span><span className="flex items-center gap-1.5"><Workflow className="size-3.5" />{processes.filter((item) => item.companyId === company.id).length} processos</span></div></div></article>)}</div>}</div></div>
}
