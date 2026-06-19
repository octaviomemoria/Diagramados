import { OrgChartEditorLoader } from "@/components/editor/org-chart-editor-loader"
export default async function EditOrgChartPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <OrgChartEditorLoader projectId={id} /> }
