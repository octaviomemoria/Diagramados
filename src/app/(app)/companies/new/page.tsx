"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDiagramadosStore } from "@/store/use-diagramados-store"

export default function NewCompanyPage() {
  const router = useRouter()
  const create = useDiagramadosStore((state) => state.createCompany)
  const [name, setName] = useState("")
  const [segment, setSegment] = useState("")
  const [employeeCount, setEmployeeCount] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)
  function submit(event: React.FormEvent) { event.preventDefault(); setSubmitted(true); if (!name.trim()) return; create({ name: name.trim(), segment: segment.trim() || undefined, employeeCount: employeeCount ? Number(employeeCount) : undefined, notes: notes.trim() || undefined }); router.push("/companies") }
  return <div className="mx-auto flex max-w-2xl flex-col gap-5 p-5 py-10 xl:p-8"><Link href="/companies" className={buttonVariants({ variant: "ghost", size: "sm" }) + " w-fit"}><ArrowLeft data-icon="inline-start" />Voltar</Link><Card><CardHeader><CardTitle className="text-xl">Nova empresa</CardTitle><CardDescription>Organize os projetos por cliente ou unidade de negócio.</CardDescription></CardHeader><CardContent><form onSubmit={submit}><FieldGroup><Field data-invalid={submitted && !name.trim()}><FieldLabel htmlFor="company-name">Nome</FieldLabel><Input id="company-name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={submitted && !name.trim()} placeholder="Ex.: Organização Acme" />{submitted && !name.trim() ? <FieldError>Informe o nome.</FieldError> : null}</Field><Field><FieldLabel htmlFor="company-segment">Segmento</FieldLabel><Input id="company-segment" value={segment} onChange={(event) => setSegment(event.target.value)} placeholder="Ex.: Serviços profissionais" /></Field><Field><FieldLabel htmlFor="company-size">Número de colaboradores</FieldLabel><Input id="company-size" type="number" min="0" value={employeeCount} onChange={(event) => setEmployeeCount(event.target.value)} /></Field><Field><FieldLabel htmlFor="company-notes">Observações</FieldLabel><Textarea id="company-notes" value={notes} onChange={(event) => setNotes(event.target.value)} /></Field><div className="flex justify-end gap-3"><Link href="/companies" className={buttonVariants({ variant: "outline" })}>Cancelar</Link><Button type="submit">Cadastrar empresa</Button></div></FieldGroup></form></CardContent></Card></div>
}
