"use client"

import { useCallback } from "react"
import { getViewportForBounds, useReactFlow, type Node } from "@xyflow/react"
import { toPng } from "html-to-image"
import { slugify } from "@/lib/utils"

export function useDiagramExport(nodes: Node[], projectName: string) {
  const { getNodesBounds } = useReactFlow()
  return useCallback(async () => {
    const viewport = document.querySelector<HTMLElement>(".react-flow__viewport")
    if (!viewport || !nodes.length) throw new Error("Diagrama vazio")
    const bounds = getNodesBounds(nodes)
    const width = Math.max(1200, Math.min(2400, Math.ceil(bounds.width + 160)))
    const height = Math.max(720, Math.min(1800, Math.ceil(bounds.height + 160)))
    const transform = getViewportForBounds(bounds, width, height, 0.2, 2, 0.15)
    const dataUrl = await toPng(viewport, {
      backgroundColor: "#ffffff",
      width,
      height,
      pixelRatio: 2,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
      },
      filter: (node) => !(node instanceof HTMLElement && node.dataset?.exportIgnore === "true"),
    })
    const link = document.createElement("a")
    link.download = `${slugify(projectName)}.png`
    link.href = dataUrl
    link.click()
  }, [getNodesBounds, nodes, projectName])
}
