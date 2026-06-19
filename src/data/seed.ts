import type { Company, OrgChart, ProcessMap } from "@/types/domain"

const now = new Date().toISOString()

export const seedCompanies: Company[] = [
  {
    id: "company_demo",
    name: "Organização Demo",
    segment: "Serviços profissionais",
    employeeCount: 48,
    notes: "Empresa de demonstração do Diagramados.",
    createdAt: now,
    updatedAt: now,
  },
]

export const seedOrgCharts: OrgChart[] = [
  {
    id: "org_demo",
    companyId: "company_demo",
    name: "Organograma Corporativo",
    description: "Estrutura organizacional atual.",
    status: "ACTIVE",
    revision: 1,
    nodes: [
      { id: "org-1", type: "orgChart", position: { x: 420, y: 30 }, data: { title: "Diretor Geral", occupantName: "Carlos Almeida", department: "Diretoria", status: "OCCUPIED", color: "#7656e8" } },
      { id: "org-2", type: "orgChart", position: { x: 90, y: 210 }, data: { title: "Gerente Comercial", occupantName: "Mariana Lima", department: "Comercial", status: "OCCUPIED", reportsToNodeId: "org-1", color: "#315efb" } },
      { id: "org-3", type: "orgChart", position: { x: 420, y: 210 }, data: { title: "Gerente de Operações", occupantName: "Rafael Costa", department: "Operações", status: "OCCUPIED", reportsToNodeId: "org-1", color: "#16a05d" } },
      { id: "org-4", type: "orgChart", position: { x: 750, y: 210 }, data: { title: "Gerente Financeiro", occupantName: "Juliana Pires", department: "Financeiro", status: "OCCUPIED", reportsToNodeId: "org-1", color: "#f28b22" } },
      { id: "org-5", type: "orgChart", position: { x: 90, y: 390 }, data: { title: "Analista Comercial", occupantName: "Beatriz Nunes", department: "Comercial", status: "OCCUPIED", reportsToNodeId: "org-2", color: "#315efb" } },
      { id: "org-6", type: "orgChart", position: { x: 420, y: 390 }, data: { title: "Analista de Processos", occupantName: "Diego Carvalho", department: "Operações", status: "OCCUPIED", reportsToNodeId: "org-3", color: "#16a05d" } },
      { id: "org-7", type: "orgChart", position: { x: 750, y: 390 }, data: { title: "Analista Financeiro", occupantName: "Gabriela Martins", department: "Financeiro", status: "OCCUPIED", reportsToNodeId: "org-4", color: "#f28b22" } },
    ],
    edges: [
      { id: "oe-1", source: "org-1", target: "org-2", type: "smoothstep" },
      { id: "oe-2", source: "org-1", target: "org-3", type: "smoothstep" },
      { id: "oe-3", source: "org-1", target: "org-4", type: "smoothstep" },
      { id: "oe-4", source: "org-2", target: "org-5", type: "smoothstep" },
      { id: "oe-5", source: "org-3", target: "org-6", type: "smoothstep" },
      { id: "oe-6", source: "org-4", target: "org-7", type: "smoothstep" },
    ],
    createdAt: now,
    updatedAt: now,
  },
]

export const seedProcesses: ProcessMap[] = [
  {
    id: "process_demo",
    companyId: "company_demo",
    name: "Onboarding de clientes",
    description: "Da solicitação até a ativação do novo cliente.",
    department: "Comercial",
    processOwner: "Gerente Comercial",
    status: "ACTIVE",
    revision: 1,
    nodes: [
      { id: "p-1", type: "processStart", position: { x: 30, y: 220 }, data: { title: "Início", type: "START" } },
      { id: "p-2", type: "processActivity", position: { x: 190, y: 190 }, data: { title: "Receber solicitação", type: "ACTIVITY", department: "Comercial", responsibleRole: "Analista Comercial" } },
      { id: "p-3", type: "processActivity", position: { x: 440, y: 190 }, data: { title: "Coletar e validar documentos", type: "ACTIVITY", department: "Comercial", responsibleRole: "Analista de Cadastro" } },
      { id: "p-4", type: "processDecision", position: { x: 710, y: 170 }, data: { title: "Cadastro aprovado?", type: "DECISION", department: "Crédito", responsibleRole: "Analista de Crédito" } },
      { id: "p-5", type: "processActivity", position: { x: 990, y: 190 }, data: { title: "Ativar cliente", type: "ACTIVITY", department: "Operações", responsibleRole: "Analista de Operações" } },
      { id: "p-6", type: "processActivity", position: { x: 720, y: 430 }, data: { title: "Solicitar ajustes e reenvio", type: "ACTIVITY", department: "Comercial" } },
      { id: "p-7", type: "processEnd", position: { x: 1240, y: 220 }, data: { title: "Fim", type: "END" } },
    ],
    edges: [
      { id: "pe-1", source: "p-1", target: "p-2", type: "smoothstep" },
      { id: "pe-2", source: "p-2", target: "p-3", type: "smoothstep" },
      { id: "pe-3", source: "p-3", target: "p-4", type: "smoothstep" },
      { id: "pe-4", source: "p-4", target: "p-5", label: "Sim", type: "smoothstep" },
      { id: "pe-5", source: "p-4", target: "p-6", label: "Não", type: "smoothstep" },
      { id: "pe-6", source: "p-6", target: "p-3", type: "smoothstep" },
      { id: "pe-7", source: "p-5", target: "p-7", type: "smoothstep" },
    ],
    createdAt: now,
    updatedAt: now,
  },
]
