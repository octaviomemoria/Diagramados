import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <header className="flex min-h-20 flex-wrap items-center gap-4 border-b bg-card px-5 py-4 xl:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold tracking-[-0.025em]">{title}</h1>
        {description ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="hidden w-64 items-center md:flex">
        <div className="relative w-full"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Buscar" placeholder="Buscar..." className="pl-9" /></div>
      </div>
      <button aria-label="Notificações" className="relative grid size-10 place-items-center rounded-lg border bg-card hover:bg-muted"><Bell className="size-[18px]" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#ff6f4f]" /></button>
      {children}
    </header>
  )
}
