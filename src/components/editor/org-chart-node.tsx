"use client"

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { cn } from "@/lib/utils"
import type { OrgChartNodeData } from "@/types/domain"

export function OrgChartNode({ data, selected }: NodeProps<Node<OrgChartNodeData>>) {
  const occupied = data.status === "OCCUPIED"
  return (
    <div className={cn("relative w-[210px] rounded-[10px] border bg-white px-4 py-3 shadow-[0_3px_10px_rgba(21,29,42,.08)] transition-shadow", selected && "border-primary ring-2 ring-primary/20 shadow-[0_5px_18px_rgba(49,94,251,.18)]")}>
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-[9px]" style={{ backgroundColor: data.color ?? "#315efb" }} />
      <Handle type="target" position={Position.Top} className="!size-2.5 !border-2 !border-white !bg-[#7b8ba4]" />
      <p className="truncate pt-0.5 text-[13px] font-bold text-[#17202a]">{data.title}</p>
      <p className="mt-1 truncate text-[11px] text-[#667085]">{data.occupantName || "Cargo sem ocupante"}</p>
      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-[#667085]"><span className={cn("size-1.5 rounded-full", occupied ? "bg-[#16a05d]" : "bg-[#f59e0b]")} />{occupied ? "Ocupado" : "Em aberto"}<span className="ml-auto max-w-20 truncate">{data.department}</span></div>
      <Handle type="source" position={Position.Bottom} className="!size-2.5 !border-2 !border-white !bg-primary" />
    </div>
  )
}
