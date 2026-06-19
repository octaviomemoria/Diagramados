"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Network, Sparkles, Workflow } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { seedOrgCharts, seedProcesses } from "@/data/seed"
import { useDiagramadosStore } from "@/store/use-diagramados-store"

export default function AiCreatePage() {
  const router = useRouter()
  const companies = useDiagramadosStore((state) => state.companies)
  const createOrgChart = useDiagramadosStore((state) => state.createOrgChart)
  const createProcess = useDiagramadosStore((state) => state.createProcess)
  const saveOrgChart = useDiagramadosStore((state) => state.saveOrgChart)
  const saveProcess = useDiagramadosStore((state) => state.saveProcess)
  const [type, setType] = useState<"orgchart" | "process">("orgchart")
  const [text, setText] = useState("")
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  function generate() { if (text.trim().length < 30) return toast.error("Descreva a organização ou processo com mais detalhes."); setLoading(true); window.setTimeout(() => { setGenerated(true); setLoading(false); toast.success("Sugestão criada. Revise antes de salvar.") }, 700) }
  async function save() { const companyId = companies[0]?.id; if (!companyId) return toast.error("Cadastre uma empresa primeiro."); if (type === "orgchart") { const id = createOrgChart({ companyId, name: "Organograma sugerido por IA", description: text }); await saveOrgChart(id, structuredClone(seedOrgCharts[0].nodes), structuredClone(seedOrgCharts[0].edges)); router.push(`/orgcharts/${id}/edit`) } else { const id = createProcess({ companyId, name: "Processo sugerido por IA", description: text }); await saveProcess(id, structuredClone(seedProcesses[0].nodes), structuredClone(seedProcesses[0].edges)); router.push(`/processes/${id}/edit`) } }

  return <div><PageHeader title="Criar com IA" description="Descreva em linguagem natural e receba uma estrutura editável." /><div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:p-8"><Card><CardHeader><CardTitle>O que você quer diagramar?</CardTitle><CardDescription>A IA funciona como assistente. Toda sugestão deve ser revisada.</CardDescription></CardHeader><CardContent><FieldGroup><Field><FieldLabel>Tipo de artefato</FieldLabel><div className="grid grid-cols-2 gap-3"><button className={`flex items-center gap-3 rounded-xl border p-4 text-left ${type === "orgchart" ? "border-primary bg-secondary ring-2 ring-primary/10" : "bg-card"}`} onClick={() => { setType("orgchart"); setGenerated(false) }}><Network className="size-5 text-primary" /><span><span className="block text-sm font-semibold">Organograma</span><span className="text-xs text-muted-foreground">Cargos e hierarquia</span></span></button><button className={`flex items-center gap-3 rounded-xl border p-4 text-left ${type === "process" ? "border-primary bg-secondary ring-2 ring-primary/10" : "bg-card"}`} onClick={() => { setType("process"); setGenerated(false) }}><Workflow className="size-5 text-primary" /><span><span className="block text-sm font-semibold">Processo</span><span className="text-xs text-muted-foreground">Etapas e decisões</span></span></button></div></Field><Field><FieldLabel htmlFor="ai-description">Descrição</FieldLabel><Textarea id="ai-description" className="min-h-52" value={text} onChange={(event) => { setText(event.target.value); setGenerated(false) }} placeholder="Ex.: Somos uma consultoria com diretoria, comercial e operações. O cliente solicita uma proposta, o comercial qualifica..." /><FieldDescription>Inclua áreas, cargos, responsáveis, decisões e exceções.</FieldDescription></Field><Button size="lg" onClick={generate} disabled={loading}><Sparkles data-icon="inline-start" />{loading ? "Estruturando..." : "Gerar sugestão"}</Button></FieldGroup></CardContent></Card><Card className="h-fit"><CardHeader><CardTitle>Prévia</CardTitle><CardDescription>{generated ? "Estrutura pronta para revisão." : "Sua sugestão aparecerá aqui."}</CardDescription></CardHeader><CardContent>{generated ? <div className="flex flex-col gap-4"><div className="rounded-xl border bg-muted/40 p-4"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary">{type === "orgchart" ? <Network className="size-5" /> : <Workflow className="size-5" />}</span><div><p className="text-sm font-semibold">{type === "orgchart" ? "Organograma sugerido" : "Processo sugerido"}</p><p className="text-xs text-muted-foreground">{type === "orgchart" ? "7 cargos • 6 relações" : "7 etapas • 7 conexões"}</p></div></div></div><div className="rounded-lg bg-[#fff4e5] px-3 py-2 text-xs text-[#8a5408]">Revise nomes, responsáveis e premissas antes de utilizar oficialmente.</div><Button onClick={() => void save()}>Salvar e abrir editor</Button></div> : <div className="grid min-h-64 place-items-center rounded-xl border border-dashed text-center"><div><Sparkles className="mx-auto size-8 text-muted-foreground/50" /><p className="mt-3 text-sm text-muted-foreground">Descreva e gere sua primeira sugestão.</p></div></div>}</CardContent></Card></div></div>
}
