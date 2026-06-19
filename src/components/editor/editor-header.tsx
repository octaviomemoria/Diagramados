import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function EditorHeader({ section, sectionHref, projectName }: { section: string; sectionHref: string; projectName: string }) {
  return (
    <header className="flex h-16 items-center gap-2 border-b bg-card px-5 text-sm">
      <Link href={sectionHref} className="font-medium text-muted-foreground hover:text-primary">{section}</Link>
      <ChevronRight className="size-4 text-muted-foreground" />
      <h1 className="truncate font-bold">{projectName}</h1>
    </header>
  )
}
