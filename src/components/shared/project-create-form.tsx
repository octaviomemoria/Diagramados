"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDiagramadosStore } from "@/store/use-diagramados-store"

export function ProjectCreateForm({ type }: { type: "orgchart" | "process" }) {
  const router = useRouter()
  const companies = useDiagramadosStore((state) => state.companies)
  const create = useDiagramadosStore((state) => type === "orgchart" ? state.createOrgChart : state.createProcess)
  const [name, setName] = useState("")
  const [companyId, setCompanyId] = useState(companies[0]?.id ?? "")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const singular = type === "orgchart" ? "organograma" : "processo"
  const route = type === "orgchart" ? "orgcharts" : "processes"

  function submit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (!name.trim() || !companyId) return
    const id = create({ name: name.trim(), companyId, description: description.trim() || undefined })
    router.push(`/${route}/${id}/edit`)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 p-5 py-10 xl:p-8">
      <Link href={`/${route}`} className={buttonVariants({ variant: "ghost", size: "sm" }) + " w-fit"}><ArrowLeft data-icon="inline-start" />Voltar</Link>
      <Card>
        <CardHeader><CardTitle className="text-xl">Novo {singular}</CardTitle><CardDescription>Defina o contexto. Você poderá editar todos os detalhes no canvas.</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field data-invalid={submitted && !name.trim()}><FieldLabel htmlFor="project-name">Nome</FieldLabel><Input id="project-name" value={name} onChange={(event) => setName(event.target.value)} placeholder={type === "orgchart" ? "Ex.: Organograma atual" : "Ex.: Onboarding de clientes"} aria-invalid={submitted && !name.trim()} />{submitted && !name.trim() ? <FieldError>Informe um nome.</FieldError> : null}</Field>
              <Field data-invalid={submitted && !companyId}><FieldLabel htmlFor="project-company">Empresa</FieldLabel><select id="project-company" className="h-10 rounded-lg border bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" value={companyId} onChange={(event) => setCompanyId(event.target.value)} aria-invalid={submitted && !companyId}><option value="">Selecione</option>{companies.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}</select>{!companies.length ? <FieldDescription>Cadastre uma empresa antes de criar projetos.</FieldDescription> : null}</Field>
              <Field><FieldLabel htmlFor="project-description">Descrição</FieldLabel><Textarea id="project-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Contexto e objetivo deste projeto." /></Field>
              <div className="flex justify-end gap-3 pt-2"><Link href={`/${route}`} className={buttonVariants({ variant: "outline" })}>Cancelar</Link><Button type="submit" disabled={!companies.length}>Criar e abrir editor</Button></div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
