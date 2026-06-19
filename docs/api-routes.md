# API Routes — Diagramados

**Documento:** Rotas de API  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo

Este documento define as rotas de API do **Diagramados**, incluindo endpoints, métodos HTTP, payloads, respostas, erros, permissões e regras multi-tenant.

Ele deve orientar a implementação de:

- API Routes;
- Route Handlers;
- Server Actions;
- Services;
- Testes de integração;
- Integrações futuras.

---

## 2. Estratégia de implementação

Para o MVP, a recomendação é:

- Usar **Server Actions** para CRUD interno chamado diretamente pelas telas;
- Usar **API Routes / Route Handlers** para exportações, health check, IA e integrações futuras;
- Manter contratos de API documentados mesmo quando a implementação inicial usar actions.

---

## 3. Convenções gerais

### Base URL local

```txt
http://localhost:3000
```

### Prefixo padrão

```txt
/api
```

### Resposta de sucesso

```json
{
  "success": true,
  "data": {}
}
```

### Resposta de erro

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos.",
    "details": {}
  }
}
```

### Códigos HTTP

| Código | Uso |
|---:|---|
| 200 | Sucesso |
| 201 | Criado |
| 204 | Sucesso sem conteúdo |
| 400 | Erro de validação |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Não encontrado |
| 409 | Conflito |
| 422 | Regra de negócio |
| 429 | Limite excedido |
| 500 | Erro interno |

### Códigos de erro

```txt
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
VALIDATION_ERROR
WORKSPACE_REQUIRED
INVALID_OPERATION
CONFLICT
AI_PROVIDER_ERROR
AI_INVALID_JSON
AI_SCHEMA_VALIDATION_ERROR
EXPORT_ERROR
DATABASE_ERROR
INTERNAL_ERROR
```

---

## 4. Regras globais de segurança

### Autenticação

Todas as rotas internas exigem autenticação, exceto:

```txt
POST /api/auth/register
POST /api/auth/login
GET  /api/health
```

### Workspace

Toda operação de dados deve usar o `workspaceId` da sessão.

O front-end não deve enviar `workspaceId` como fonte confiável.

### Validação de propriedade

Antes de consultar, editar ou excluir registros, validar:

1. Usuário autenticado;
2. Usuário pertence ao workspace;
3. Registro pertence ao workspace ativo;
4. Usuário possui permissão.

### Validação de entrada

Toda entrada deve ser validada no servidor com Zod ou equivalente.

---

# 5. Autenticação

## POST `/api/auth/register`

Cria usuário e workspace inicial.

### Payload

```json
{
  "name": "Octavio Memória",
  "email": "octavio@email.com",
  "password": "senha-segura",
  "confirmPassword": "senha-segura"
}
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Octavio Memória",
      "email": "octavio@email.com"
    },
    "workspace": {
      "id": "workspace_123",
      "name": "Workspace de Octavio"
    }
  }
}
```

### Erros

| Código | Situação |
|---|---|
| VALIDATION_ERROR | Campos inválidos |
| CONFLICT | E-mail já cadastrado |
| INTERNAL_ERROR | Erro inesperado |

---

## POST `/api/auth/login`

Autentica usuário.

### Payload

```json
{
  "email": "octavio@email.com",
  "password": "senha-segura"
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Octavio Memória",
      "email": "octavio@email.com"
    },
    "activeWorkspaceId": "workspace_123",
    "role": "OWNER"
  }
}
```

---

## POST `/api/auth/logout`

Encerra sessão.

### Resposta 204

Sem conteúdo.

---

## GET `/api/auth/me`

Retorna usuário autenticado, workspace ativo e papel.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Octavio Memória",
      "email": "octavio@email.com"
    },
    "workspace": {
      "id": "workspace_123",
      "name": "Workspace Principal"
    },
    "role": "OWNER"
  }
}
```

---

# 6. Health check

## GET `/api/health`

Verifica se a aplicação está online.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-06-17T12:00:00.000Z"
  }
}
```

---

# 7. Workspace

## GET `/api/workspaces/current`

Retorna workspace ativo.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "workspace_123",
    "name": "Way Group Consultoria",
    "role": "OWNER"
  }
}
```

---

## PATCH `/api/workspaces/current`

Edita workspace ativo.

### Permissão

`OWNER` ou `ADMIN`.

### Payload

```json
{
  "name": "Way Group Consultoria"
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "workspace_123",
    "name": "Way Group Consultoria",
    "updatedAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

# 8. Empresas

## GET `/api/companies`

Lista empresas do workspace.

### Query params

| Parâmetro | Tipo | Descrição |
|---|---|---|
| search | string | Busca por nome |
| segment | string | Filtro por segmento |
| size | string | Filtro por porte |
| page | number | Página |
| limit | number | Itens por página |

### Resposta 200

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "company_123",
        "name": "Empresa Exemplo",
        "segment": "Locação",
        "size": "SMALL",
        "employeeCount": 25,
        "updatedAt": "2026-06-17T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

## POST `/api/companies`

Cria empresa.

### Permissão

`OWNER` ou `ADMIN`.

### Payload

```json
{
  "name": "Empresa Exemplo",
  "legalName": "Empresa Exemplo LTDA",
  "document": "00.000.000/0001-00",
  "segment": "Locação",
  "size": "SMALL",
  "employeeCount": 25,
  "website": "https://empresa.com.br",
  "city": "Fortaleza",
  "state": "CE",
  "responsibleName": "João Silva",
  "responsibleEmail": "joao@empresa.com.br",
  "responsiblePhone": "85999999999",
  "notes": "Cliente em diagnóstico inicial."
}
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "id": "company_123",
    "name": "Empresa Exemplo",
    "segment": "Locação",
    "createdAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

## GET `/api/companies/:companyId`

Busca detalhes de uma empresa.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "company_123",
    "name": "Empresa Exemplo",
    "segment": "Locação",
    "size": "SMALL",
    "employeeCount": 25,
    "notes": "Cliente em diagnóstico inicial.",
    "orgChartsCount": 2,
    "processesCount": 4,
    "createdAt": "2026-06-17T12:00:00.000Z",
    "updatedAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

## PATCH `/api/companies/:companyId`

Edita empresa.

### Permissão

`OWNER` ou `ADMIN`.

### Payload

```json
{
  "name": "Empresa Exemplo Atualizada",
  "segment": "Construção",
  "employeeCount": 40,
  "notes": "Dados revisados."
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "company_123",
    "name": "Empresa Exemplo Atualizada",
    "updatedAt": "2026-06-17T12:00:00.000Z"
  }
}
```

---

## DELETE `/api/companies/:companyId`

Remove empresa via soft delete.

### Permissão

`OWNER` ou `ADMIN`.

### Resposta 204

Sem conteúdo.

---

# 9. Organogramas

## GET `/api/orgcharts`

Lista organogramas.

### Query params

| Parâmetro | Tipo |
|---|---|
| companyId | string |
| search | string |
| status | string |
| page | number |
| limit | number |

### Resposta 200

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "org_123",
        "name": "Organograma Atual",
        "companyId": "company_123",
        "companyName": "Empresa Exemplo",
        "status": "DRAFT",
        "nodesCount": 10,
        "updatedAt": "2026-06-17T12:00:00.000Z"
      }
    ]
  }
}
```

---

## POST `/api/orgcharts`

Cria organograma.

### Permissão

`OWNER`, `ADMIN` ou `EDITOR`.

### Payload

```json
{
  "companyId": "company_123",
  "name": "Organograma Atual",
  "description": "Estrutura organizacional atual da empresa."
}
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "id": "org_123",
    "companyId": "company_123",
    "name": "Organograma Atual",
    "status": "DRAFT"
  }
}
```

---

## GET `/api/orgcharts/:orgChartId`

Busca organograma completo para edição.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "org_123",
    "companyId": "company_123",
    "companyName": "Empresa Exemplo",
    "name": "Organograma Atual",
    "description": "Estrutura organizacional atual.",
    "status": "DRAFT",
    "layoutDirection": "TOP_DOWN",
    "viewport": {
      "x": 0,
      "y": 0,
      "zoom": 1
    },
    "nodes": [
      {
        "id": "node_1",
        "title": "Diretor Geral",
        "occupantName": null,
        "department": "Diretoria",
        "status": "OCCUPIED",
        "reportsToNodeId": null,
        "positionX": 400,
        "positionY": 50
      }
    ],
    "edges": [
      {
        "id": "edge_1",
        "sourceNodeId": "node_1",
        "targetNodeId": "node_2",
        "label": null
      }
    ]
  }
}
```

---

## PATCH `/api/orgcharts/:orgChartId`

Edita dados gerais do organograma.

### Payload

```json
{
  "name": "Organograma Proposto",
  "description": "Nova estrutura sugerida.",
  "status": "ACTIVE"
}
```

---

## DELETE `/api/orgcharts/:orgChartId`

Exclui organograma.

### Resposta 204

Sem conteúdo.

---

## POST `/api/orgcharts/:orgChartId/duplicate`

Duplica organograma.

### Payload

```json
{
  "name": "Cópia do Organograma Atual"
}
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "id": "org_456",
    "name": "Cópia do Organograma Atual"
  }
}
```

---

# 10. Nós e conexões de organograma

## POST `/api/orgcharts/:orgChartId/nodes`

Adiciona cargo ao organograma.

### Payload

```json
{
  "title": "Gerente Comercial",
  "occupantName": "Maria Silva",
  "department": "Comercial",
  "status": "OCCUPIED",
  "reportsToNodeId": "node_1",
  "positionX": 100,
  "positionY": 200,
  "metadata": {}
}
```

---

## PATCH `/api/orgcharts/:orgChartId/nodes/:nodeId`

Edita cargo.

### Payload

```json
{
  "title": "Gerente Comercial",
  "occupantName": "Maria Silva",
  "department": "Comercial",
  "status": "OCCUPIED",
  "reportsToNodeId": "node_1",
  "positionX": 120,
  "positionY": 220
}
```

### Regras

- Nó deve pertencer ao organograma;
- Organograma deve pertencer ao workspace;
- `reportsToNodeId` deve pertencer ao mesmo organograma;
- Não permitir ciclo hierárquico.

---

## DELETE `/api/orgcharts/:orgChartId/nodes/:nodeId`

Exclui cargo e remove conexões relacionadas.

---

## PUT `/api/orgcharts/:orgChartId/layout`

Salva layout completo do organograma.

### Payload

```json
{
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  },
  "nodes": [
    {
      "id": "node_1",
      "positionX": 400,
      "positionY": 50,
      "data": {
        "title": "Diretor Geral",
        "department": "Diretoria"
      }
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "sourceNodeId": "node_1",
      "targetNodeId": "node_2",
      "label": null
    }
  ]
}
```

### Regras

- Usar transação;
- Validar todos os nós;
- Validar todas as conexões;
- Impedir ciclos.

---

# 11. Processos

## GET `/api/processes`

Lista processos.

### Query params

| Parâmetro | Tipo |
|---|---|
| companyId | string |
| search | string |
| status | string |
| department | string |
| page | number |
| limit | number |

---

## POST `/api/processes`

Cria processo.

### Permissão

`OWNER`, `ADMIN` ou `EDITOR`.

### Payload

```json
{
  "companyId": "company_123",
  "name": "Processo de Locação",
  "description": "Fluxo desde orçamento até devolução.",
  "department": "Operações",
  "processOwner": "Coordenador de Operações"
}
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "id": "process_123",
    "companyId": "company_123",
    "name": "Processo de Locação",
    "status": "DRAFT"
  }
}
```

---

## GET `/api/processes/:processId`

Busca processo completo para edição.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "id": "process_123",
    "companyId": "company_123",
    "companyName": "Empresa Exemplo",
    "name": "Processo de Locação",
    "description": "Fluxo completo.",
    "department": "Operações",
    "processOwner": "Coordenador de Operações",
    "status": "DRAFT",
    "notation": "FLOWCHART",
    "viewport": {
      "x": 0,
      "y": 0,
      "zoom": 1
    },
    "nodes": [
      {
        "id": "pnode_1",
        "type": "START",
        "title": "Cliente solicita orçamento",
        "description": "Cliente entra em contato.",
        "department": "Comercial",
        "responsibleRole": "Vendedor",
        "positionX": 100,
        "positionY": 100
      }
    ],
    "edges": [
      {
        "id": "pedge_1",
        "sourceNodeId": "pnode_1",
        "targetNodeId": "pnode_2",
        "label": null
      }
    ]
  }
}
```

---

## PATCH `/api/processes/:processId`

Edita processo.

### Payload

```json
{
  "name": "Processo Comercial de Locação",
  "description": "Fluxo revisado.",
  "department": "Comercial",
  "status": "ACTIVE"
}
```

---

## DELETE `/api/processes/:processId`

Exclui processo.

---

## POST `/api/processes/:processId/duplicate`

Duplica processo.

### Payload

```json
{
  "name": "Cópia do Processo de Locação"
}
```

---

# 12. Etapas e conexões de processo

## POST `/api/processes/:processId/nodes`

Adiciona etapa ao processo.

### Payload

```json
{
  "type": "ACTIVITY",
  "title": "Consultar disponibilidade",
  "description": "Verificar se o equipamento está disponível.",
  "department": "Comercial",
  "responsibleRole": "Vendedor",
  "systemName": "ERP",
  "documentName": "Orçamento",
  "estimatedTimeMinutes": 10,
  "riskLevel": "LOW",
  "positionX": 350,
  "positionY": 100
}
```

---

## PATCH `/api/processes/:processId/nodes/:nodeId`

Edita etapa.

### Payload

```json
{
  "title": "Consultar disponibilidade no estoque",
  "description": "Verificar disponibilidade para o período solicitado.",
  "department": "Estoque",
  "responsibleRole": "Estoquista",
  "positionX": 360,
  "positionY": 120
}
```

---

## DELETE `/api/processes/:processId/nodes/:nodeId`

Exclui etapa e remove conexões relacionadas.

---

## PUT `/api/processes/:processId/layout`

Salva layout completo do processo.

### Payload

```json
{
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1
  },
  "nodes": [
    {
      "id": "pnode_1",
      "positionX": 100,
      "positionY": 100,
      "data": {
        "title": "Cliente solicita orçamento"
      }
    }
  ],
  "edges": [
    {
      "id": "pedge_1",
      "sourceNodeId": "pnode_1",
      "targetNodeId": "pnode_2",
      "label": "Próximo"
    }
  ]
}
```

### Regras

- Usar transação;
- Validar origem e destino;
- Origem e destino não podem ser iguais;
- Todos os nós e edges devem pertencer ao mesmo processo.

---

# 13. Criação com IA

## POST `/api/ai/generate-orgchart`

Gera organograma a partir de texto.

### Permissão

`OWNER`, `ADMIN` ou `EDITOR`.

### Payload

```json
{
  "companyId": "company_123",
  "text": "Empresa com diretoria, comercial, financeiro, operações, estoque e logística.",
  "language": "pt-BR"
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "generationLogId": "ailog_123",
    "orgChart": {
      "organizationName": "Empresa Exemplo",
      "positions": [],
      "edges": []
    }
  }
}
```

---

## POST `/api/ai/generate-process`

Gera processo a partir de texto.

### Payload

```json
{
  "companyId": "company_123",
  "text": "Cliente pede orçamento, vendedor consulta disponibilidade, envia proposta, cliente aprova, financeiro confirma pagamento e logística entrega.",
  "language": "pt-BR"
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "generationLogId": "ailog_124",
    "process": {
      "processName": "Processo de Locação",
      "steps": [],
      "connections": []
    }
  }
}
```

---

## POST `/api/ai/generate-full-structure`

Gera organograma e processo a partir de texto.

### Payload

```json
{
  "companyId": "company_123",
  "text": "Empresa de locação com setores comercial, financeiro, estoque, logística e manutenção...",
  "language": "pt-BR"
}
```

---

## POST `/api/ai/save-generated-orgchart`

Salva organograma gerado como projeto editável.

### Payload

```json
{
  "companyId": "company_123",
  "generationLogId": "ailog_123",
  "name": "Organograma gerado por IA",
  "orgChart": {
    "organizationName": "Empresa Exemplo",
    "positions": [],
    "edges": []
  }
}
```

### Regras

- Validar JSON;
- Criar organograma, nós e edges em transação;
- Abrir editor após salvar.

---

## POST `/api/ai/save-generated-process`

Salva processo gerado como projeto editável.

### Payload

```json
{
  "companyId": "company_123",
  "generationLogId": "ailog_124",
  "name": "Processo gerado por IA",
  "process": {
    "processName": "Processo de Locação",
    "steps": [],
    "connections": []
  }
}
```

---

# 14. Templates

## GET `/api/templates`

Lista templates disponíveis.

### Query params

| Parâmetro | Tipo |
|---|---|
| segment | string |
| type | string |
| search | string |

### Resposta 200

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "template_rental",
        "name": "Empresa de Locação de Equipamentos",
        "segment": "Locação",
        "type": "FULL_STRUCTURE",
        "description": "Template para locadoras de equipamentos."
      }
    ]
  }
}
```

---

## GET `/api/templates/:templateId`

Busca detalhes do template.

---

## POST `/api/templates/:templateId/apply`

Cria estrutura a partir de template.

### Permissão

`OWNER`, `ADMIN` ou `EDITOR`.

### Payload

```json
{
  "companyId": "company_123",
  "applyType": "FULL_STRUCTURE",
  "namePrefix": "Template Locação"
}
```

### Valores de `applyType`

```txt
ORG_CHART
PROCESS
FULL_STRUCTURE
```

### Resposta 201

```json
{
  "success": true,
  "data": {
    "orgChartId": "org_123",
    "processIds": ["process_123"]
  }
}
```

---

# 15. Exportações

## POST `/api/exports/orgchart/:orgChartId/png`

Registra ou gera exportação PNG de organograma.

### Payload

```json
{
  "imageBase64": "data:image/png;base64,..."
}
```

### Resposta 200

```json
{
  "success": true,
  "data": {
    "fileName": "organograma-atual.png",
    "fileUrl": null
  }
}
```

---

## POST `/api/exports/process/:processId/png`

Registra ou gera exportação PNG de processo.

### Payload

```json
{
  "imageBase64": "data:image/png;base64,..."
}
```

---

## POST `/api/exports/project/pdf`

Gera PDF simples de organograma ou processo.

### Payload

```json
{
  "targetType": "ORG_CHART",
  "targetId": "org_123",
  "imageBase64": "data:image/png;base64,..."
}
```

---

# 16. Pós-MVP: RACI

## POST `/api/processes/:processId/raci/generate`

Gera matriz RACI a partir de processo.

### Payload

```json
{
  "roles": ["Comercial", "Estoque", "Financeiro", "Logística"]
}
```

---

## GET `/api/raci/:raciId`

Busca matriz RACI.

---

## PATCH `/api/raci/:raciId`

Edita matriz RACI.

### Payload

```json
{
  "items": [
    {
      "processNodeId": "pnode_1",
      "roleName": "Comercial",
      "responsibility": "R"
    }
  ]
}
```

---

# 17. Pós-MVP: POPs

## POST `/api/processes/:processId/sop/generate`

Gera POP a partir de processo.

---

## GET `/api/sops/:sopId`

Busca POP.

---

## PATCH `/api/sops/:sopId`

Edita POP.

---

# 18. Pós-MVP: Descrições de cargos

## GET `/api/jobs`

Lista cargos consolidados.

### Query params

| Parâmetro | Tipo |
|---|---|
| companyId | string |
| department | string |
| search | string |

---

## POST `/api/jobs/:jobId/description/generate`

Gera descrição de cargo.

---

## GET `/api/job-descriptions/:jobDescriptionId`

Busca descrição de cargo.

---

## PATCH `/api/job-descriptions/:jobDescriptionId`

Edita descrição de cargo.

---

# 19. Pós-MVP: Diagnósticos

## POST `/api/processes/:processId/diagnose`

Diagnostica processo.

---

## POST `/api/orgcharts/:orgChartId/diagnose`

Diagnostica organograma.

---

## GET `/api/diagnostics`

Lista diagnósticos.

### Query params

| Parâmetro | Tipo |
|---|---|
| companyId | string |
| severity | string |
| status | string |
| targetType | string |

---

## GET `/api/diagnostics/:diagnosisId`

Busca diagnóstico.

---

## PATCH `/api/diagnostics/:diagnosisId`

Atualiza status do diagnóstico.

### Payload

```json
{
  "status": "RESOLVED"
}
```

---

# 20. Configurações

## GET `/api/settings/profile`

Busca perfil do usuário.

---

## PATCH `/api/settings/profile`

Edita perfil.

### Payload

```json
{
  "name": "Octavio Memória"
}
```

---

## GET `/api/settings/ai`

Busca configuração de IA.

### Permissão

`OWNER` ou `ADMIN`.

### Resposta 200

```json
{
  "success": true,
  "data": {
    "provider": "mock",
    "monthlyLimit": 100,
    "monthlyUsage": 12
  }
}
```

---

# 21. Tipos principais

## CreateCompanyInput

```ts
export type CreateCompanyInput = {
  name: string
  legalName?: string
  document?: string
  segment?: string
  size?: "MICRO" | "SMALL" | "MEDIUM" | "LARGE" | "ENTERPRISE"
  employeeCount?: number
  website?: string
  city?: string
  state?: string
  responsibleName?: string
  responsibleEmail?: string
  responsiblePhone?: string
  notes?: string
}
```

---

## CreateOrgChartInput

```ts
export type CreateOrgChartInput = {
  companyId: string
  name: string
  description?: string
}
```

---

## CreateOrgChartNodeInput

```ts
export type CreateOrgChartNodeInput = {
  title: string
  occupantName?: string
  department?: string
  status?: "OCCUPIED" | "OPEN" | "OUTSOURCED" | "TEMPORARY" | "FUTURE"
  reportsToNodeId?: string
  positionX: number
  positionY: number
  metadata?: Record<string, unknown>
}
```

---

## CreateProcessInput

```ts
export type CreateProcessInput = {
  companyId: string
  name: string
  description?: string
  department?: string
  processOwner?: string
}
```

---

## CreateProcessNodeInput

```ts
export type CreateProcessNodeInput = {
  type: "START" | "ACTIVITY" | "DECISION" | "DOCUMENT" | "SYSTEM" | "APPROVAL" | "WAIT" | "END"
  title: string
  description?: string
  department?: string
  responsibleRole?: string
  systemName?: string
  documentName?: string
  estimatedTimeMinutes?: number
  riskLevel?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  positionX: number
  positionY: number
  metadata?: Record<string, unknown>
}
```

---

## AiGenerateInput

```ts
export type AiGenerateInput = {
  companyId?: string
  text: string
  language?: "pt-BR" | "en-US"
}
```

---

# 22. Ordem recomendada de implementação

## Sprint 1 — Base

1. `GET /api/health`;
2. Autenticação;
3. `GET /api/auth/me`;
4. `GET /api/workspaces/current`;
5. `PATCH /api/workspaces/current`.

## Sprint 2 — Empresas

1. `GET /api/companies`;
2. `POST /api/companies`;
3. `GET /api/companies/:companyId`;
4. `PATCH /api/companies/:companyId`;
5. `DELETE /api/companies/:companyId`.

## Sprint 3 — Organogramas

1. `GET /api/orgcharts`;
2. `POST /api/orgcharts`;
3. `GET /api/orgcharts/:orgChartId`;
4. `PATCH /api/orgcharts/:orgChartId`;
5. `DELETE /api/orgcharts/:orgChartId`;
6. `POST /api/orgcharts/:orgChartId/nodes`;
7. `PATCH /api/orgcharts/:orgChartId/nodes/:nodeId`;
8. `DELETE /api/orgcharts/:orgChartId/nodes/:nodeId`;
9. `PUT /api/orgcharts/:orgChartId/layout`.

## Sprint 4 — Processos

1. `GET /api/processes`;
2. `POST /api/processes`;
3. `GET /api/processes/:processId`;
4. `PATCH /api/processes/:processId`;
5. `DELETE /api/processes/:processId`;
6. `POST /api/processes/:processId/nodes`;
7. `PATCH /api/processes/:processId/nodes/:nodeId`;
8. `DELETE /api/processes/:processId/nodes/:nodeId`;
9. `PUT /api/processes/:processId/layout`.

## Sprint 5 — IA e templates

1. `POST /api/ai/generate-orgchart`;
2. `POST /api/ai/generate-process`;
3. `POST /api/ai/generate-full-structure`;
4. `POST /api/ai/save-generated-orgchart`;
5. `POST /api/ai/save-generated-process`;
6. `GET /api/templates`;
7. `GET /api/templates/:templateId`;
8. `POST /api/templates/:templateId/apply`.

## Sprint 6 — Exportações

1. `POST /api/exports/orgchart/:orgChartId/png`;
2. `POST /api/exports/process/:processId/png`;
3. `POST /api/exports/project/pdf`;
4. Testar permissões;
5. Testar multi-tenant;
6. Padronizar erros.

---

# 23. Critérios de aceite da API no MVP

A API será considerada pronta para o MVP quando:

- Rotas privadas exigirem autenticação;
- Rotas respeitarem `workspaceId`;
- Empresas puderem ser criadas, listadas, editadas e excluídas;
- Organogramas puderem ser criados, carregados, editados e salvos;
- Nós e conexões de organograma forem persistidos;
- Processos puderem ser criados, carregados, editados e salvos;
- Etapas e conexões de processo forem persistidas;
- Geração mockada com IA funcionar;
- Logs de IA forem registrados;
- Templates puderem ser listados e aplicados;
- Exportação PNG for suportada ou registrada;
- Erros forem padronizados;
- Payloads forem validados no servidor.

---

# 24. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
permissions-matrix.md
```

Esse documento deve detalhar permissões por papel, módulo, ação, tela e rota.
