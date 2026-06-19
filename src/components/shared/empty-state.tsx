import { FilePlus2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <Card className="border-dashed py-8 text-center shadow-none">
      <CardHeader className="items-center">
        <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary"><FilePlus2 className="size-5" /></span>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-md">{description}</CardDescription>
      </CardHeader>
      {action ? <CardContent className="flex justify-center">{action}</CardContent> : null}
    </Card>
  )
}
