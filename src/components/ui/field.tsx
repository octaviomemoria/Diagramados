import * as React from "react"
import { cn } from "@/lib/utils"

export function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />
}

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 data-[invalid=true]:text-destructive", className)} {...props} />
}

export function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-xs font-semibold text-foreground", className)} {...props} />
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-xs leading-5 text-muted-foreground", className)} {...props} />
}

export function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-xs font-medium text-destructive", className)} {...props} />
}
