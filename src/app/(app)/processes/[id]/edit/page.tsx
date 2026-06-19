import { ProcessEditorLoader } from "@/components/editor/process-editor-loader"
export default async function EditProcessPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ProcessEditorLoader projectId={id} /> }
