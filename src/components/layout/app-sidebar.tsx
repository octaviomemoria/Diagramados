"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  ChevronDown,
  FileStack,
  HelpCircle,
  Home,
  Network,
  Settings,
  Sparkles,
  Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"

const primaryItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/companies", label: "Empresas", icon: Building2 },
  { href: "/orgcharts", label: "Organogramas", icon: Network },
  { href: "/processes", label: "Processos", icon: Workflow },
  { href: "/ai-create", label: "Criar com IA", icon: Sparkles },
  { href: "/templates", label: "Modelos", icon: FileStack },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[232px] flex-col bg-[#111d2d] text-[#dce4f0] lg:flex">
      <Link href="/dashboard" className="flex h-20 items-center gap-3 px-6 text-lg font-bold tracking-[-0.02em] text-white">
        <span className="grid size-8 place-items-center rounded-lg bg-primary shadow-[0_6px_18px_rgba(49,94,251,.35)]">
          <Network className="size-[18px]" strokeWidth={2.2} />
        </span>
        Diagramados
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-3" aria-label="Navegação principal">
        {primaryItems.map((item) => {
          const selected = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link key={item.href} href={item.href} className={cn("smooth-ui flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-[#c7d1df] hover:bg-white/6 hover:text-white", selected && "bg-primary text-white shadow-[0_6px_18px_rgba(49,94,251,.22)] hover:bg-primary")}>
              <item.icon className="size-[18px]" strokeWidth={1.9} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/10 px-3 py-4">
        <Link href="/help" className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-[#c7d1df] hover:bg-white/6 hover:text-white"><HelpCircle className="size-[18px]" />Ajuda</Link>
        <Link href="/settings" className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-[#c7d1df] hover:bg-white/6 hover:text-white"><Settings className="size-[18px]" />Configurações</Link>
      </div>

      <div className="border-t border-white/10 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-white/6">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#7656e8] text-xs font-bold text-white">AM</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">Ana Marques</span>
            <span className="block truncate text-[11px] text-[#8ea0b8]">Organização Demo</span>
          </span>
          <ChevronDown className="size-4 text-[#8ea0b8]" />
        </button>
      </div>
    </aside>
  )
}
