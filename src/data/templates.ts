import { seedOrgCharts, seedProcesses } from "@/data/seed"
import type { DiagramTemplate } from "@/types/domain"

export const templates: DiagramTemplate[] = [
  { id: "tpl-org-services", name: "Empresa de serviços", segment: "Serviços profissionais", type: "ORG_CHART", description: "Diretoria, comercial, operações e financeiro.", accent: "#315efb", nodes: seedOrgCharts[0].nodes, edges: seedOrgCharts[0].edges },
  { id: "tpl-process-onboarding", name: "Onboarding de clientes", segment: "Serviços profissionais", type: "PROCESS", description: "Cadastro, validação, aprovação e ativação.", accent: "#16a05d", nodes: seedProcesses[0].nodes, edges: seedProcesses[0].edges },
  { id: "tpl-org-clinic", name: "Clínica médica", segment: "Saúde", type: "ORG_CHART", description: "Estrutura inicial para clínicas de pequeno e médio porte.", accent: "#7656e8", nodes: seedOrgCharts[0].nodes.map((node) => ({ ...node, data: { ...node.data, department: node.data.department === "Comercial" ? "Atendimento" : node.data.department } })), edges: seedOrgCharts[0].edges },
  { id: "tpl-process-approval", name: "Aprovação de compras", segment: "Operações", type: "PROCESS", description: "Solicitação, análise financeira e aprovação.", accent: "#ff6f4f", nodes: seedProcesses[0].nodes, edges: seedProcesses[0].edges },
]
