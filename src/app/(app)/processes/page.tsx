import Link from "next/link"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ProjectList } from "@/components/shared/project-list"
import { buttonVariants } from "@/components/ui/button"

export default function ProcessesPage() { return <div><PageHeader title="Processos" description="Mapeie atividades, decisões e responsabilidades."><Link href="/processes/new" className={buttonVariants()}><Plus data-icon="inline-start" />Novo processo</Link></PageHeader><div className="p-5 xl:p-8"><ProjectList type="process" /></div></div> }
