"use client"

import dynamic from "next/dynamic"
const OrgChartEditor = dynamic(() => import("@/components/editor/org-chart-editor").then((module) => module.OrgChartEditor), { ssr: false, loading: () => <div className="grid h-screen place-items-center text-sm text-muted-foreground">Carregando editor...</div> })
export function OrgChartEditorLoader({ projectId }: { projectId: string }) { return <OrgChartEditor projectId={projectId} /> }
