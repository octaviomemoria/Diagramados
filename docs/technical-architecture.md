# Technical Architecture — Diagramados

**Documento:** Arquitetura Técnica  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento define a arquitetura técnica do **Diagramados**, descrevendo:

- Stack tecnológica recomendada;
- Estrutura da aplicação;
- Organização de pastas;
- Camadas do sistema;
- Estratégia de autenticação;
- Estratégia multi-tenant;
- Modelo de serviços;
- Integração com IA;
- Estratégia de exportação;
- Segurança;
- Deploy;
- Boas práticas de desenvolvimento.

O objetivo é orientar a implementação do produto de forma modular, escalável e sustentável.

---

## 2. Visão técnica geral

O **Diagramados** será uma aplicação SaaS B2B baseada em web, com foco inicial em desktop, permitindo criação e edição visual de organogramas e fluxos de processos.

A arquitetura deve priorizar:

- Clareza;
- Manutenibilidade;
- Separação de responsabilidades;
- Segurança de dados por workspace;
- Facilidade de expansão;
- Integração futura com IA real;
- Exportações;
- Multi-tenant desde o início.

---

## 3. Stack recomendada

| Camada | Tecnologia recomendada |
|---|---|
| Framework web | Next.js com App Router |
| Linguagem | TypeScript |
| UI | React |
| Estilização | Tailwind CSS |
| Componentes | shadcn/ui |
| Editor visual | React Flow |
| Banco de dados | PostgreSQL |
| ORM | Prisma |
| Autenticação | NextAuth, Clerk ou Supabase Auth |
| Validação | Zod |
| Formulários | React Hook Form |
| IA | Provider abstrato: Mock, OpenAI, Anthropic ou Gemini |
| Exportação de canvas | html-to-image ou equivalente |
| Exportação PDF | jsPDF, react-pdf ou serviço dedicado |
| Storage | Local no MVP, Supabase Storage ou S3 no futuro |
| Deploy | Vercel |
| Logs | Console estruturado no MVP, serviço dedicado no futuro |
| Testes | Vitest/Jest, Playwright futuramente |

---

## 4. Decisões arquiteturais principais

## 4.1 Aplicação full-stack com Next.js

O projeto deve usar Next.js com App Router para concentrar:

- Interface;
- Rotas;
- Server Actions ou API Routes;
- Autenticação;
- Validação;
- Integração com banco.

Essa abordagem reduz complexidade inicial e acelera o MVP.

---

## 4.2 TypeScript obrigatório

Todo o projeto deve ser escrito em TypeScript.

Motivos:

- Reduz erros em estruturas complexas de diagramas;
- Facilita contratos entre front-end, serviços e banco;
- Melhora manutenção;
- Ajuda ferramentas de IA a gerar código mais consistente.

---

## 4.3 React Flow para organogramas e processos

O React Flow será usado para renderizar e editar:

- Nós de organograma;
- Conexões hierárquicas;
- Etapas de processo;
- Conexões de fluxo;
- Canvas com zoom e pan;
- Drag and drop.

A aplicação deve criar tipos próprios para nós e conexões, evitando acoplamento excessivo ao formato interno da biblioteca.

---

## 4.4 Prisma como camada de acesso ao banco

O Prisma será utilizado como ORM principal.

Regras:

- Nenhuma tela deve acessar Prisma diretamente;
- Prisma deve ser usado em services, repositories ou server actions;
- Toda consulta deve respeitar `workspaceId`;
- Operações com múltiplos registros devem usar transações.

---

## 4.5 IA abstraída em serviço próprio

A IA deve ser encapsulada em um serviço chamado `aiService`.

O front-end não deve saber se a geração vem de:

- Mock;
- OpenAI;
- Anthropic;
- Gemini;
- Outro provider futuro.

Isso permite desenvolver o MVP com mock e ativar IA real posteriormente sem reescrever a aplicação.

---

## 5. Arquitetura em camadas

A aplicação deve seguir uma arquitetura em camadas simples.

```txt
Interface / Pages
  ↓
Components
  ↓
Actions / Controllers
  ↓
Services
  ↓
Repositories / Prisma
  ↓
PostgreSQL
```

---

## 5.1 Interface / Pages

Responsável por:

- Renderizar rotas;
- Montar layouts;
- Buscar dados iniciais quando necessário;
- Chamar actions ou services via interface apropriada;
- Exibir estados de loading, erro e vazio.

Exemplos:

```txt
/app/(dashboard)/dashboard/page.tsx
/app/(dashboard)/companies/page.tsx
/app/(dashboard)/orgcharts/[id]/edit/page.tsx
/app/(dashboard)/processes/[id]/edit/page.tsx
```

---

## 5.2 Components

Responsável por:

- Componentes visuais reutilizáveis;
- Formulários;
- Tabelas;
- Cards;
- Painéis laterais;
- Nós customizados do React Flow;
- Toolbars.

Componentes não devem conter regra de negócio complexa.

---

## 5.3 Actions / Controllers

Responsáveis por:

- Receber dados da interface;
- Validar payload;
- Obter usuário e workspace da sessão;
- Chamar services;
- Retornar sucesso ou erro.

Podem ser implementados como:

- Server Actions;
- API Routes;
- Route handlers.

Para o MVP, Server Actions podem simplificar bastante.

---

## 5.4 Services

Responsáveis por regra de negócio.

Exemplos:

- `companyService`;
- `orgChartService`;
- `processService`;
- `aiService`;
- `templateService`;
- `exportService`;
- `workspaceService`.

Services devem:

- Validar ownership;
- Usar transações quando necessário;
- Aplicar regras de domínio;
- Não depender de componentes React.

---

## 5.5 Repositories / Prisma

Camada responsável pelo acesso ao banco.

No MVP, pode-se usar Prisma diretamente dentro dos services, desde que a regra fique organizada.

Em uma evolução futura, repositories podem ser criados para domínios mais complexos.

---

## 6. Estrutura de pastas recomendada

```txt
/src
  /app
    /(auth)
      /login
        page.tsx
      /register
        page.tsx

    /(dashboard)
      layout.tsx
      /dashboard
        page.tsx

      /companies
        page.tsx
        /new
          page.tsx
        /[companyId]
          page.tsx
          /edit
            page.tsx

      /orgcharts
        page.tsx
        /new
          page.tsx
        /[orgChartId]
          /edit
            page.tsx

      /processes
        page.tsx
        /new
          page.tsx
        /[processId]
          /edit
            page.tsx

      /ai-create
        page.tsx

      /templates
        page.tsx
        /[templateId]
          page.tsx

      /jobs
        page.tsx

      /pops
        page.tsx

      /diagnostics
        page.tsx

      /settings
        page.tsx

    /api
      /auth
      /exports
      /health

  /components
    /ui
    /layout
      app-sidebar.tsx
      app-header.tsx
      dashboard-shell.tsx

    /dashboard
      metric-card.tsx
      recent-projects.tsx
      empty-dashboard.tsx

    /companies
      company-form.tsx
      company-table.tsx
      company-card.tsx

    /orgchart
      orgchart-editor.tsx
      orgchart-node.tsx
      orgchart-toolbar.tsx
      orgchart-side-panel.tsx

    /process
      process-editor.tsx
      process-node.tsx
      process-toolbar.tsx
      process-side-panel.tsx

    /ai
      ai-create-form.tsx
      ai-preview.tsx

    /templates
      template-card.tsx
      template-preview.tsx

    /forms
    /tables
    /empty-states
    /loading-states

  /lib
    auth.ts
    prisma.ts
    session.ts
    permissions.ts
    utils.ts
    constants.ts

  /actions
    auth-actions.ts
    company-actions.ts
    orgchart-actions.ts
    process-actions.ts
    ai-actions.ts
    template-actions.ts

  /services
    workspace-service.ts
    company-service.ts
    orgchart-service.ts
    process-service.ts
    ai-service.ts
    template-service.ts
    export-service.ts
    permission-service.ts
    audit-service.ts

  /schemas
    auth-schema.ts
    company-schema.ts
    orgchart-schema.ts
    process-schema.ts
    ai-schema.ts
    template-schema.ts

  /types
    auth.ts
    workspace.ts
    company.ts
    orgchart.ts
    process.ts
    ai.ts
    template.ts
    export.ts

  /data
    /templates
      rental-company.json
      medical-clinic.json
      construction-company.json
      accounting-office.json
      distributor.json

  /prisma
    schema.prisma
    seed.ts

  /tests
    /unit
    /integration
    /e2e
```

---

## 7. Rotas principais

## 7.1 Rotas públicas

```txt
/auth/login
/auth/register
```

## 7.2 Rotas privadas

```txt
/dashboard
/companies
/companies/new
/companies/[companyId]
/companies/[companyId]/edit
/orgcharts
/orgcharts/new
/orgcharts/[orgChartId]/edit
/processes
/processes/new
/processes/[processId]/edit
/ai-create
/templates
/templates/[templateId]
/settings
```

## 7.3 Rotas futuras

```txt
/jobs
/jobs/[jobId]
/pops
/pops/[popId]
/diagnostics
/diagnostics/[diagnosisId]
/billing
/team
```

---

## 8. Estratégia de autenticação

## 8.1 Opção recomendada para MVP

Para o MVP, existem três caminhos aceitáveis:

| Opção | Vantagem | Desvantagem |
|---|---|---|
| NextAuth | Controle interno e flexibilidade | Mais configuração |
| Clerk | Rápido e robusto | Dependência externa |
| Supabase Auth | Integra bem com Supabase | Dependência do ecossistema Supabase |

Recomendação prática:

- Se o foco for velocidade: **Clerk**.
- Se o foco for controle e stack própria: **NextAuth**.
- Se for usar Supabase no banco/storage/auth: **Supabase Auth**.

Para este produto, a recomendação é:

```txt
NextAuth ou Clerk
```

---

## 8.2 Sessão

A sessão deve conter no mínimo:

```ts
type SessionUser = {
  id: string
  name: string
  email: string
  activeWorkspaceId: string
  role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER" | "CLIENT_VIEWER"
}
```

---

## 8.3 Proteção de rotas

Toda rota dentro de `(dashboard)` deve exigir autenticação.

Se o usuário não estiver autenticado:

```txt
Redirecionar para /auth/login
```

Se o usuário estiver autenticado e acessar login:

```txt
Redirecionar para /dashboard
```

---

## 9. Estratégia multi-tenant

## 9.1 Regra central

Todo dado operacional deve ser filtrado por `workspaceId`.

Nunca confiar em `workspaceId` enviado pelo front-end.

O `workspaceId` deve vir da sessão autenticada.

---

## 9.2 Exemplo de service correto

```ts
export async function getCompanyById({
  companyId,
  workspaceId,
}: {
  companyId: string
  workspaceId: string
}) {
  return prisma.clientCompany.findFirst({
    where: {
      id: companyId,
      workspaceId,
      deletedAt: null,
    },
  })
}
```

---

## 9.3 Exemplo de service incorreto

```ts
export async function getCompanyById(companyId: string) {
  return prisma.clientCompany.findUnique({
    where: {
      id: companyId,
    },
  })
}
```

Esse exemplo é perigoso porque ignora o workspace. É o tipo de erro que transforma SaaS em peneira com dashboard.

---

## 9.4 Criação de registros

Toda criação deve injetar `workspaceId` pelo back-end:

```ts
await prisma.clientCompany.create({
  data: {
    workspaceId: session.activeWorkspaceId,
    name: input.name,
  },
})
```

---

## 9.5 Validação de ownership

Antes de editar ou excluir qualquer entidade, validar:

1. O usuário está autenticado;
2. O registro existe;
3. O registro pertence ao workspace ativo;
4. O usuário tem permissão para a ação.

---

## 10. Permissões

## 10.1 Papéis previstos

| Papel | Descrição |
|---|---|
| OWNER | Dono do workspace |
| ADMIN | Administra usuários e dados |
| EDITOR | Cria e edita projetos |
| VIEWER | Apenas visualiza |
| CLIENT_VIEWER | Visualiza projetos liberados |

---

## 10.2 Matriz simplificada de permissões

| Ação | OWNER | ADMIN | EDITOR | VIEWER | CLIENT_VIEWER |
|---|---:|---:|---:|---:|---:|
| Criar empresa | Sim | Sim | Não | Não | Não |
| Editar empresa | Sim | Sim | Não | Não | Não |
| Excluir empresa | Sim | Sim | Não | Não | Não |
| Criar organograma | Sim | Sim | Sim | Não | Não |
| Editar organograma | Sim | Sim | Sim | Não | Não |
| Excluir organograma | Sim | Sim | Sim | Não | Não |
| Visualizar organograma | Sim | Sim | Sim | Sim | Limitado |
| Criar processo | Sim | Sim | Sim | Não | Não |
| Editar processo | Sim | Sim | Sim | Não | Não |
| Excluir processo | Sim | Sim | Sim | Não | Não |
| Exportar | Sim | Sim | Sim | Sim | Limitado |
| Gerenciar usuários | Sim | Sim | Não | Não | Não |

---

## 10.3 Função utilitária de permissão

Criar utilitário em:

```txt
/src/lib/permissions.ts
```

Exemplo:

```ts
export function canEditProject(role: WorkspaceRole) {
  return ["OWNER", "ADMIN", "EDITOR"].includes(role)
}

export function canManageWorkspace(role: WorkspaceRole) {
  return ["OWNER", "ADMIN"].includes(role)
}
```

---

## 11. Serviços principais

---

## 11.1 workspaceService

Responsável por:

- Criar workspace inicial;
- Buscar workspace ativo;
- Editar dados do workspace;
- Validar membros;
- Obter papel do usuário.

Funções sugeridas:

```ts
createDefaultWorkspaceForUser(userId: string)
getActiveWorkspaceForUser(userId: string)
getWorkspaceMemberRole(userId: string, workspaceId: string)
updateWorkspace(input)
```

---

## 11.2 companyService

Responsável por empresas/clientes.

Funções sugeridas:

```ts
createCompany(input, context)
getCompanies(context)
getCompanyById(companyId, context)
updateCompany(companyId, input, context)
deleteCompany(companyId, context)
```

Contexto mínimo:

```ts
type ServiceContext = {
  userId: string
  workspaceId: string
  role: WorkspaceRole
}
```

---

## 11.3 orgChartService

Responsável por organogramas.

Funções sugeridas:

```ts
createOrgChart(input, context)
getOrgCharts(context)
getOrgChartById(orgChartId, context)
updateOrgChart(orgChartId, input, context)
deleteOrgChart(orgChartId, context)

addOrgChartNode(orgChartId, input, context)
updateOrgChartNode(nodeId, input, context)
deleteOrgChartNode(nodeId, context)

createOrgChartEdge(orgChartId, input, context)
deleteOrgChartEdge(edgeId, context)

saveOrgChartLayout(orgChartId, nodes, edges, context)
duplicateOrgChart(orgChartId, context)
```

Regras importantes:

- Validar empresa vinculada;
- Validar workspace;
- Impedir ciclos hierárquicos;
- Usar transação para salvar layout completo.

---

## 11.4 processService

Responsável por fluxos de processos.

Funções sugeridas:

```ts
createProcessMap(input, context)
getProcessMaps(context)
getProcessMapById(processMapId, context)
updateProcessMap(processMapId, input, context)
deleteProcessMap(processMapId, context)

addProcessNode(processMapId, input, context)
updateProcessNode(nodeId, input, context)
deleteProcessNode(nodeId, context)

createProcessEdge(processMapId, input, context)
deleteProcessEdge(edgeId, context)

saveProcessLayout(processMapId, nodes, edges, context)
duplicateProcessMap(processMapId, context)
```

Regras importantes:

- Etapas e conexões devem pertencer ao mesmo processo;
- Salvar posição visual;
- Permitir labels em conexões;
- Evitar origem e destino iguais.

---

## 11.5 aiService

Responsável por geração com IA ou mock.

Funções sugeridas:

```ts
generateOrgChartFromText(input, context)
generateProcessFromText(input, context)
generateFullStructureFromText(input, context)
generateRaciFromProcess(processMapId, context)
generateJobDescription(positionId, context)
generateSopFromProcess(processMapId, context)
diagnoseProcess(processMapId, context)
diagnoseOrgChart(orgChartId, context)
```

Provider deve ser selecionado por variável:

```env
AI_PROVIDER="mock"
```

Providers futuros:

```txt
mock
openai
anthropic
gemini
```

---

## 11.6 templateService

Responsável por templates.

Funções sugeridas:

```ts
getTemplates(context)
getTemplateById(templateId, context)
createOrgChartFromTemplate(templateId, companyId, context)
createProcessFromTemplate(templateId, companyId, context)
```

No MVP, templates podem vir de arquivos JSON.

---

## 11.7 exportService

Responsável por exportações.

Funções sugeridas:

```ts
exportOrgChartToPng(orgChartId, context)
exportProcessToPng(processMapId, context)
exportProjectToPdf(projectId, type, context)
registerExport(input, context)
```

No MVP, parte da exportação PNG pode ocorrer no front-end, porque captura canvas.

---

## 11.8 auditService

Responsável por logs.

Funções sugeridas:

```ts
logAction(input)
logAiGeneration(input)
logExport(input)
logError(input)
```

No MVP, logs podem ser simples. No futuro, usar tabela `AuditLog`.

---

## 12. Estratégia do React Flow

## 12.1 Tipos de nós

Criar nós customizados para:

### Organograma

```txt
orgChartNode
```

### Processo

```txt
processStartNode
processActivityNode
processDecisionNode
processDocumentNode
processSystemNode
processApprovalNode
processWaitNode
processEndNode
```

---

## 12.2 Estrutura de node data

### Organograma

```ts
type OrgChartNodeData = {
  title: string
  occupantName?: string
  department?: string
  status: "OCCUPIED" | "OPEN" | "OUTSOURCED" | "TEMPORARY" | "FUTURE"
}
```

### Processo

```ts
type ProcessNodeData = {
  title: string
  description?: string
  type: ProcessNodeType
  department?: string
  responsibleRole?: string
  systemName?: string
  documentName?: string
  riskLevel?: RiskLevel
}
```

---

## 12.3 Conversão banco → React Flow

O banco armazena:

- `positionX`;
- `positionY`;
- dados relacionais;
- metadados.

O front-end converte para:

```ts
type ReactFlowNode = {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  data: OrgChartNodeData | ProcessNodeData
}
```

---

## 12.4 Conversão React Flow → banco

Ao salvar layout:

```ts
nodes.map(node => ({
  id: node.id,
  positionX: node.position.x,
  positionY: node.position.y,
  data: node.data
}))
```

Conexões:

```ts
edges.map(edge => ({
  id: edge.id,
  sourceNodeId: edge.source,
  targetNodeId: edge.target,
  label: edge.label
}))
```

---

## 13. Validação com Zod

Todos os inputs importantes devem ter schemas.

Exemplo:

```ts
import { z } from "zod"

export const createCompanySchema = z.object({
  name: z.string().min(2, "Informe o nome da empresa."),
  segment: z.string().optional(),
  size: z.string().optional(),
  employeeCount: z.coerce.number().int().positive().optional(),
  notes: z.string().optional(),
})
```

Organização:

```txt
/src/schemas/company-schema.ts
/src/schemas/orgchart-schema.ts
/src/schemas/process-schema.ts
/src/schemas/ai-schema.ts
```

---

## 14. Tratamento de erros

## 14.1 Tipos de erro

Criar erros padronizados:

```ts
class AppError extends Error {
  code: string
  statusCode: number
}
```

Códigos sugeridos:

```txt
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
WORKSPACE_REQUIRED
INVALID_OPERATION
AI_GENERATION_ERROR
EXPORT_ERROR
DATABASE_ERROR
```

---

## 14.2 Padrão de resposta

Actions devem retornar estrutura consistente:

```ts
type ActionResult<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}
```

---

## 15. Estados de interface

Toda tela principal deve prever:

- Loading;
- Empty state;
- Error state;
- Success feedback;
- Saving state;
- Disabled state.

Exemplos:

```txt
Carregando empresas...
Nenhuma empresa cadastrada.
Erro ao salvar organograma.
Organograma salvo com sucesso.
Exportando PNG...
```

---

## 16. Estratégia de IA

## 16.1 Fase MVP

No MVP, a IA deve operar com provider mock.

Objetivo:

- Validar experiência;
- Testar fluxo de criação;
- Evitar custo inicial;
- Evitar dependência de API externa.

---

## 16.2 Contrato de entrada

```ts
type AiTextGenerationInput = {
  companyId?: string
  text: string
  language?: "pt-BR" | "en-US"
}
```

---

## 16.3 Contrato de saída para organograma

```ts
type GeneratedOrgChart = {
  organizationName: string
  positions: {
    id: string
    title: string
    department?: string
    reportsTo?: string | null
    level?: number
    position?: {
      x: number
      y: number
    }
  }[]
  edges: {
    source: string
    target: string
  }[]
}
```

---

## 16.4 Contrato de saída para processo

```ts
type GeneratedProcess = {
  processName: string
  description?: string
  steps: {
    id: string
    type: ProcessNodeType
    title: string
    description?: string
    department?: string
    responsibleRole?: string
    position?: {
      x: number
      y: number
    }
  }[]
  connections: {
    source: string
    target: string
    label?: string
  }[]
}
```

---

## 16.5 Logs de IA

Toda geração deve registrar:

- Usuário;
- Workspace;
- Empresa, se houver;
- Tipo de geração;
- Provider;
- Texto de entrada;
- Saída;
- Status;
- Erro, se houver.

---

## 17. Estratégia de templates

## 17.1 MVP com JSON local

Templates iniciais podem ser armazenados em:

```txt
/src/data/templates
```

Arquivos:

```txt
rental-company.json
medical-clinic.json
construction-company.json
accounting-office.json
distributor.json
```

---

## 17.2 Estrutura de template

```json
{
  "name": "Empresa de Locação de Equipamentos",
  "segment": "Locação",
  "type": "FULL_STRUCTURE",
  "description": "Template para empresas de locação de equipamentos.",
  "orgChart": {
    "positions": []
  },
  "processes": [
    {
      "name": "Processo de Locação",
      "steps": [],
      "connections": []
    }
  ]
}
```

---

## 17.3 Migração futura para banco

No pós-MVP, templates devem migrar para tabelas:

- `TemplateCategory`;
- `Template`.

Isso permitirá:

- Templates privados;
- Templates pagos;
- Templates por workspace;
- Marketplace futuro.

---

## 18. Estratégia de exportação

## 18.1 PNG no MVP

Exportação PNG deve capturar o canvas do React Flow.

Bibliotecas possíveis:

- `html-to-image`;
- `dom-to-image-more`;
- API própria se necessário.

Fluxo:

1. Identificar wrapper do canvas;
2. Capturar área visível ou área completa;
3. Gerar blob PNG;
4. Baixar arquivo.

---

## 18.2 PDF simples

PDF pode ser gerado com:

- `jsPDF`;
- `@react-pdf/renderer`;
- Serviço server-side no futuro.

Conteúdo mínimo:

- Nome da empresa;
- Nome do projeto;
- Tipo;
- Data;
- Imagem do diagrama.

---

## 18.3 Exportações futuras

Formatos futuros:

- SVG;
- DOCX;
- PPTX;
- Mermaid;
- BPMN;
- CSV;
- JSON.

---

## 19. Segurança

## 19.1 Regras mínimas

- Senhas com hash seguro;
- Rotas privadas protegidas;
- Dados filtrados por workspace;
- Validação server-side;
- Não confiar em payload do front-end;
- Não expor erros internos ao usuário;
- Não salvar chaves de IA no front-end;
- Não exibir dados sensíveis em logs de cliente.

---

## 19.2 LGPD

O sistema deve considerar:

- Finalidade clara de uso dos dados;
- Possibilidade futura de exclusão/anomização;
- Registro de dados pessoais mínimos;
- Controle de acesso;
- Logs de operações críticas;
- Política de privacidade futura.

---

## 19.3 Chaves e variáveis sensíveis

Nunca versionar:

- `DATABASE_URL`;
- `NEXTAUTH_SECRET`;
- `OPENAI_API_KEY`;
- `ANTHROPIC_API_KEY`;
- `GEMINI_API_KEY`;
- Chaves de storage.

Usar `.env.example` para referência.

---

## 20. Variáveis de ambiente

Exemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/diagramados"

NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

AI_PROVIDER="mock"
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GEMINI_API_KEY=""

STORAGE_PROVIDER="local"
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

APP_URL="http://localhost:3000"
```

---

## 21. Banco de dados

## 21.1 Banco recomendado

```txt
PostgreSQL
```

Motivos:

- Robusto;
- Compatível com Prisma;
- Bom suporte a JSON;
- Adequado para SaaS;
- Fácil deploy em Supabase, Neon, Railway ou Render.

---

## 21.2 Migrações

Usar Prisma Migrate.

Comandos:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

---

## 21.3 Seed inicial

Criar seed para:

- Usuário de teste;
- Workspace de teste;
- Empresa de exemplo;
- Templates iniciais;
- Organograma de exemplo;
- Processo de exemplo.

Arquivo:

```txt
/prisma/seed.ts
```

---

## 22. Deploy

## 22.1 Deploy recomendado

```txt
Vercel
```

Motivos:

- Integra bem com Next.js;
- Deploy rápido;
- Preview deployments;
- Boa experiência para MVP.

---

## 22.2 Banco em produção

Opções recomendadas:

| Opção | Observação |
|---|---|
| Supabase Postgres | Bom para autenticação/storage também |
| Neon | Excelente para Postgres serverless |
| Railway | Simples para MVP |
| Render | Alternativa estável |

---

## 22.3 Pipeline básico

Fluxo recomendado:

```txt
Push no GitHub
  ↓
Vercel cria preview
  ↓
Testes básicos
  ↓
Merge na main
  ↓
Deploy produção
```

---

## 23. Testes

## 23.1 Testes mínimos no MVP

Priorizar testes de:

- Services;
- Validação de workspace;
- Criação de empresas;
- Criação de organogramas;
- Criação de processos;
- IA mockada;
- Permissões básicas.

---

## 23.2 Testes unitários

Ferramentas:

- Vitest;
- Jest.

Exemplos:

```txt
companyService.createCompany
orgChartService.createOrgChart
processService.createProcessMap
aiService.generateOrgChartFromText
```

---

## 23.3 Testes E2E futuros

Ferramenta recomendada:

```txt
Playwright
```

Fluxos E2E principais:

- Cadastro;
- Login;
- Criar empresa;
- Criar organograma;
- Criar processo;
- Gerar com IA;
- Exportar PNG.

---

## 24. Observabilidade e logs

## 24.1 MVP

No MVP:

- Logs de erro no servidor;
- Logs de geração de IA;
- Logs básicos de exportação;
- Console estruturado.

---

## 24.2 Pós-MVP

Ferramentas futuras:

- Sentry;
- Logtail;
- Axiom;
- Datadog;
- PostHog para produto.

---

## 25. Performance

## 25.1 Pontos críticos

- Canvas com muitos nós;
- Exportação de imagem;
- Carregamento de projetos grandes;
- Renderização de tabelas;
- Geração com IA.

---

## 25.2 Estratégias

- Paginar listas;
- Lazy load de módulos pesados;
- Separar editor em componente client-side;
- Evitar re-render desnecessário no React Flow;
- Debounce no salvamento automático;
- Usar loading states;
- Evitar carregar todos os projetos no dashboard.

---

## 26. Padrões de código

## 26.1 Nomenclatura

Arquivos:

```txt
kebab-case.ts
company-service.ts
orgchart-editor.tsx
```

Componentes:

```txt
PascalCase
CompanyForm
OrgChartEditor
```

Funções:

```txt
camelCase
createCompany
getOrgChartById
```

Tipos:

```txt
PascalCase
CompanyInput
OrgChartNodeData
```

---

## 26.2 Componentes

Regra:

- Componentes visuais não devem acessar Prisma;
- Componentes devem receber dados por props;
- Componentes grandes devem ser quebrados;
- Formularios devem usar schemas de validação.

---

## 26.3 Services

Regra:

- Services concentram regras de negócio;
- Services recebem contexto;
- Services validam workspace;
- Services podem usar Prisma;
- Services não devem depender de React.

---

## 27. Estratégia de desenvolvimento incremental

## Sprint 1 — Fundação

- Criar projeto Next.js;
- Configurar Tailwind;
- Configurar shadcn/ui;
- Configurar Prisma;
- Configurar banco;
- Criar autenticação;
- Criar layout privado.

## Sprint 2 — Empresas e dashboard

- Criar workspace automático;
- Criar CRUD de empresas;
- Criar dashboard;
- Criar estados vazios.

## Sprint 3 — Organogramas

- Configurar React Flow;
- Criar modelos de organograma;
- Criar editor;
- Criar nós customizados;
- Salvar layout.

## Sprint 4 — Processos

- Criar modelos de processo;
- Criar editor;
- Criar tipos de etapas;
- Salvar layout.

## Sprint 5 — IA mockada e templates

- Criar `aiService`;
- Criar tela Criar com IA;
- Criar templates JSON;
- Salvar estruturas geradas.

## Sprint 6 — Exportação e polimento

- Exportar PNG;
- Ajustar UX;
- Corrigir erros;
- Testar fluxo completo;
- Preparar demo.

---

## 28. Dívidas técnicas aceitáveis no MVP

As seguintes simplificações são aceitáveis no MVP:

- IA mockada;
- Templates em JSON local;
- Exportação PNG feita no front-end;
- Permissões simplificadas;
- Logs simples;
- PDF básico ou fora do MVP;
- Sem colaboração em tempo real;
- Sem pagamento;
- Sem marketplace.

Essas dívidas são aceitáveis porque reduzem tempo de validação.

---

## 29. Dívidas técnicas não aceitáveis

Não aceitar:

- Ignorar `workspaceId`;
- Misturar dados entre usuários;
- Acessar Prisma diretamente em componentes;
- Salvar senha sem hash;
- Não validar dados no servidor;
- Criar tudo em um único componente gigante;
- Armazenar organograma apenas como imagem;
- Não persistir posições do canvas;
- Não registrar geração de IA.

Essas dívidas viram veneno. Pequeno no começo, caro no fim.

---

## 30. Critérios técnicos de aceite do MVP

O MVP técnico será considerado pronto quando:

- Usuário consegue criar conta e login;
- Workspace inicial é criado;
- Empresas são isoladas por workspace;
- Organogramas são criados, editados, salvos e reabertos;
- Processos são criados, editados, salvos e reabertos;
- React Flow preserva posições e conexões;
- IA mockada gera organograma e processo;
- Templates básicos funcionam;
- Exportação PNG funciona;
- Services validam workspace;
- Código está modular;
- Variáveis sensíveis não estão versionadas;
- Deploy em ambiente de teste funciona.

---

## 31. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
ai-specification.md
```

Esse documento deve detalhar prompts, contratos JSON, providers, validação, logs, custos e comportamento da IA.
