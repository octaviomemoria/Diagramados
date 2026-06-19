"use client"

import { Database, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { remoteEnabled } from "@/lib/supabase/remote-data"
import { useDiagramadosStore } from "@/store/use-diagramados-store"

export default function SettingsPage() { const reset = useDiagramadosStore((state) => state.resetDemo); const connected = remoteEnabled(); return <div><PageHeader title="Configurações" description="Conta, workspace e ambiente." /><div className="mx-auto flex max-w-3xl flex-col gap-5 p-5 xl:p-8"><Card><CardHeader><CardTitle>Armazenamento</CardTitle><CardDescription>O Supabase é o banco de produção. Sem credenciais, o modo demonstração usa este navegador.</CardDescription></CardHeader><CardContent><div className="flex items-center gap-4 rounded-xl border p-4"><span className="grid size-10 place-items-center rounded-lg bg-[#e8f7ef] text-[#117a48]"><Database className="size-5" /></span><div className="flex-1"><p className="text-sm font-semibold">Supabase</p><p className="text-xs text-muted-foreground">{connected ? "Conexão configurada" : "Modo demonstração local"}</p></div><Badge variant={connected ? "success" : "warning"}>{connected ? "Conectado" : "Demo"}</Badge></div></CardContent></Card><Card><CardHeader><CardTitle>Dados de demonstração</CardTitle><CardDescription>Restaura empresas, organogramas e processos de exemplo neste navegador.</CardDescription></CardHeader><CardContent><Button variant="outline" onClick={() => { reset(); toast.success("Dados de demonstração restaurados.") }}><RefreshCw data-icon="inline-start" />Restaurar demonstração</Button></CardContent></Card></div></div> }
