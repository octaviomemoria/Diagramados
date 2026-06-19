"use client"

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Check, CirclePlay, FileText, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProcessNodeData } from "@/types/domain"

function SideHandles() {
  return <><Handle type="target" position={Position.Left} className="!size-2.5 !border-2 !border-white !bg-[#7b8ba4]" /><Handle type="source" position={Position.Right} className="!size-2.5 !border-2 !border-white !bg-primary" /></>
}

export function ProcessActivityNode({ data, selected }: NodeProps<Node<ProcessNodeData>>) {
  const warning = data.type === "APPROVAL" || data.type === "WAIT"
  return <div className={cn("relative w-[190px] rounded-[10px] border bg-white p-3.5 shadow-[0_3px_10px_rgba(21,29,42,.07)]", selected && "border-primary ring-2 ring-primary/20", warning && "border-[#ff8a70]")}><SideHandles /><div className="flex items-start gap-2.5"><span className={cn("grid size-7 shrink-0 place-items-center rounded-md bg-secondary text-primary", warning && "bg-[#fff0eb] text-[#e55234]")}>{warning ? <RefreshCw className="size-3.5" /> : <FileText className="size-3.5" />}</span><p className="pt-1 text-[12px] font-semibold leading-4">{data.title}</p></div><p className={cn("mt-3 border-t pt-2 text-[10px] font-medium text-primary", warning && "text-[#e55234]")}>{data.department || "Área não definida"}</p></div>
}

export function ProcessDecisionNode({ data, selected }: NodeProps<Node<ProcessNodeData>>) {
  return <div className="relative grid size-[150px] place-items-center"><div className={cn("absolute size-[106px] rotate-45 rounded-[8px] border bg-white shadow-[0_3px_10px_rgba(21,29,42,.07)]", selected ? "border-primary ring-2 ring-primary/20" : "border-[#8ca5de]")} /><p className="relative z-10 max-w-[92px] text-center text-[12px] font-semibold leading-4">{data.title}</p><Handle type="target" position={Position.Left} className="!size-2.5 !border-2 !border-white !bg-[#7b8ba4]" /><Handle type="source" position={Position.Right} id="yes" className="!size-2.5 !border-2 !border-white !bg-primary" /><Handle type="source" position={Position.Bottom} id="no" className="!size-2.5 !border-2 !border-white !bg-[#ff6f4f]" /></div>
}

export function ProcessStartNode({ data, selected }: NodeProps<Node<ProcessNodeData>>) {
  return <div className={cn("grid size-[72px] place-items-center rounded-full border-2 border-[#16a05d] bg-white text-[#0f8a4d] shadow-sm", selected && "ring-2 ring-[#16a05d]/20")}><Handle type="target" position={Position.Left} className="!size-2 !border-white !bg-[#16a05d]" /><CirclePlay className="size-5 fill-[#16a05d] text-[#16a05d]" /><span className="text-[10px] font-bold">{data.title}</span><Handle type="source" position={Position.Right} className="!size-2 !border-white !bg-[#16a05d]" /></div>
}

export function ProcessEndNode({ data, selected }: NodeProps<Node<ProcessNodeData>>) {
  return <div className={cn("grid size-[72px] place-items-center rounded-full border-2 border-[#16a05d] bg-white text-[#0f8a4d] shadow-sm", selected && "ring-2 ring-[#16a05d]/20")}><Handle type="target" position={Position.Left} className="!size-2 !border-white !bg-[#16a05d]" /><Check className="size-5" strokeWidth={2.5} /><span className="text-[10px] font-bold">{data.title}</span></div>
}
