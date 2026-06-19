import Link from "next/link"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ProjectList } from "@/components/shared/project-list"
import { buttonVariants } from "@/components/ui/button"

export default function OrgChartsPage() { return <div><PageHeader title="Organogramas" description="Estruturas hierárquicas claras e sempre editáveis."><Link href="/orgcharts/new" className={buttonVariants()}><Plus data-icon="inline-start" />Novo organograma</Link></PageHeader><div className="p-5 xl:p-8"><ProjectList type="orgchart" /></div></div> }
