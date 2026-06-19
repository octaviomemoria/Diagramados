import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex w-fit items-center rounded-md px-2 py-1 text-[11px] font-semibold", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      secondary: "bg-muted text-muted-foreground",
      success: "bg-[#e8f7ef] text-[#117a48]",
      warning: "bg-[#fff4e5] text-[#a15c00]",
      outline: "border bg-card text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
})

export function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
