import Link from "next/link"
import { Menu, Network } from "lucide-react"

export function MobileHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2 font-bold"><Network className="size-5 text-primary" />Diagramados</Link>
      <button aria-label="Abrir menu" className="grid size-9 place-items-center rounded-lg border"><Menu className="size-5" /></button>
    </header>
  )
}
