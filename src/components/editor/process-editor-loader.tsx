"use client"

import dynamic from "next/dynamic"
const ProcessEditor = dynamic(() => import("@/components/editor/process-editor").then((module) => module.ProcessEditor), { ssr: false, loading: () => <div className="grid h-screen place-items-center text-sm text-muted-foreground">Carregando editor...</div> })
export function ProcessEditorLoader({ projectId }: { projectId: string }) { return <ProcessEditor projectId={projectId} /> }
