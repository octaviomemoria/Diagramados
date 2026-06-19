# Data Model — Diagramados

**Documento:** Modelo de Dados  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento define o modelo de dados do **Diagramados**, incluindo:

- Entidades principais;
- Campos recomendados;
- Relacionamentos;
- Enums;
- Regras de integridade;
- Regras multi-tenant;
- Estratégia de soft delete;
- Índices recomendados;
- Estrutura inicial sugerida para Prisma.

O objetivo é orientar a implementação do banco de dados PostgreSQL usando Prisma ORM.

---

## 2. Princípios do modelo de dados

O modelo de dados deve seguir os seguintes princípios:

1. **Multi-tenant desde o início**  
   Todos os dados operacionais devem pertencer a um workspace.

2. **Separação clara por domínio**  
   Empresas, organogramas, processos, templates, IA, exportações e documentos devem ser modelados separadamente.

3. **Flexibilidade para diagramas visuais**  
   Organogramas e processos devem armazenar posições visuais, conexões e metadados flexíveis.

4. **Preparação para IA**  
   Toda geração com IA deve ser registrada para auditoria, melhoria e controle de custo.

5. **Escalabilidade gradual**  
   O MVP deve ser simples, mas o modelo deve permitir evolução para RACI, POP, diagnóstico, permissões e planos pagos.

6. **Segurança de dados**  
   Nenhuma consulta operacional deve ignorar o `workspaceId`.

---

## 3. Visão geral das entidades

## 3.1 Entidades centrais

| Entidade | Finalidade |
|---|---|
| User | Usuário da plataforma |
| Workspace | Ambiente de trabalho da empresa ou consultoria |
| WorkspaceMember | Associação entre usuário e workspace |
| ClientCompany | Empresa ou cliente cadastrado |
| OrgChart | Organograma |
| OrgChartNode | Cargo/nó do organograma |
| OrgChartEdge | Relação hierárquica visual entre cargos |
| ProcessMap | Fluxo de processo |
| ProcessNode | Etapa do processo |
| ProcessEdge | Conexão entre etapas do processo |

---

## 3.2 Entidades de documentação

| Entidade | Finalidade |
|---|---|
| JobPosition | Cadastro consolidado de cargos |
| JobDescription | Descrição de cargo |
| RaciMatrix | Matriz RACI vinculada a processo |
| RaciMatrixItem | Item/célula da matriz RACI |
| StandardOperatingProcedure | POP gerado a partir de processo |
| Diagnosis | Diagnóstico de processo ou organograma |

---

## 3.3 Entidades de suporte

| Entidade | Finalidade |
|---|---|
| TemplateCategory | Categoria de template |
| Template | Template de organograma/processo |
| AiGenerationLog | Log de geração com IA |
| ExportHistory | Histórico de exportações |
| AuditLog | Log de ações importantes |
| Attachment | Arquivos anexados |
| AppSetting | Configurações do workspace ou sistema |

---

## 4. Diagrama conceitual simplificado

```txt
User
  └── WorkspaceMember
        └── Workspace
              ├── ClientCompany
              │     ├── OrgChart
              │     │     ├── OrgChartNode
              │     │     └── OrgChartEdge
              │     │
              │     ├── ProcessMap
              │     │     ├── ProcessNode
              │     │     ├── ProcessEdge
              │     │     ├── RaciMatrix
              │     │     ├── StandardOperatingProcedure
              │     │     └── Diagnosis
              │     │
              │     ├── JobPosition
              │     ├── JobDescription
              │     └── Diagnosis
              │
              ├── Template
              ├── AiGenerationLog
              ├── ExportHistory
              └── AuditLog
```

---

# 5. Entidades detalhadas

---

## 5.1 User

Representa um usuário cadastrado na plataforma.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| name | String | Sim | Nome do usuário |
| email | String | Sim | E-mail único |
| passwordHash | String | Sim | Hash da senha |
| avatarUrl | String | Não | URL da foto do usuário |
| status | UserStatus | Sim | Status do usuário |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- O e-mail deve ser único;
- Senha nunca deve ser armazenada em texto puro;
- Usuário pode participar de um ou mais workspaces futuramente;
- No MVP, cada usuário pode iniciar com um workspace padrão.

---

## 5.2 Workspace

Representa o ambiente de trabalho da consultoria, empresa ou usuário.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| name | String | Sim | Nome do workspace |
| slug | String | Não | Identificador amigável |
| ownerId | String | Sim | Dono principal do workspace |
| logoUrl | String | Não | Logo do workspace |
| status | WorkspaceStatus | Sim | Status do workspace |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- Todo dado operacional deve estar vinculado a um workspace;
- O `ownerId` aponta para o usuário proprietário;
- No MVP, criar automaticamente um workspace no cadastro do usuário.

---

## 5.3 WorkspaceMember

Representa a associação entre usuário e workspace.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace vinculado |
| userId | String | Sim | Usuário vinculado |
| role | WorkspaceRole | Sim | Papel do usuário |
| status | MemberStatus | Sim | Status do membro |
| invitedById | String | Não | Usuário que convidou |
| joinedAt | DateTime | Não | Data de aceite |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

### Regras

- A combinação `workspaceId + userId` deve ser única;
- No MVP, o criador será `OWNER`;
- Papéis futuros: `OWNER`, `ADMIN`, `EDITOR`, `VIEWER`, `CLIENT_VIEWER`.

---

## 5.4 ClientCompany

Representa uma empresa ou cliente cadastrado pelo usuário.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| name | String | Sim | Nome da empresa |
| legalName | String | Não | Razão social |
| document | String | Não | CNPJ ou documento |
| segment | String | Não | Segmento de atuação |
| size | CompanySize | Não | Porte da empresa |
| employeeCount | Int | Não | Número de colaboradores |
| website | String | Não | Site |
| city | String | Não | Cidade |
| state | String | Não | Estado |
| responsibleName | String | Não | Nome do responsável |
| responsibleEmail | String | Não | E-mail do responsável |
| responsiblePhone | String | Não | Telefone do responsável |
| logoUrl | String | Não | Logo da empresa |
| notes | String | Não | Observações |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- Toda empresa deve pertencer a um workspace;
- Nome é obrigatório;
- Organogramas, processos e documentos podem ser vinculados a uma empresa;
- No MVP, `document` não precisa ser validado pela Receita Federal.

---

## 5.5 OrgChart

Representa um organograma de uma empresa.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| name | String | Sim | Nome do organograma |
| description | String | Não | Descrição |
| versionLabel | String | Não | Nome da versão |
| status | ProjectStatus | Sim | Status do organograma |
| layoutDirection | LayoutDirection | Não | Direção visual |
| viewport | Json | Não | Zoom/posição do canvas |
| createdById | String | Não | Usuário criador |
| updatedById | String | Não | Último usuário editor |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- Deve pertencer a uma empresa;
- Deve pertencer a um workspace;
- Pode possuir muitos nós e conexões;
- No MVP, pode haver organograma único ou múltiplos por empresa.

---

## 5.6 OrgChartNode

Representa um cargo ou posição no organograma.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| orgChartId | String | Sim | Organograma vinculado |
| jobPositionId | String | Não | Cargo consolidado vinculado |
| title | String | Sim | Nome do cargo |
| occupantName | String | Não | Nome da pessoa ocupante |
| department | String | Não | Departamento |
| status | OrgNodeStatus | Sim | Status do cargo |
| reportsToNodeId | String | Não | Superior imediato |
| level | Int | Não | Nível hierárquico |
| positionX | Float | Sim | Posição X no canvas |
| positionY | Float | Sim | Posição Y no canvas |
| width | Float | Não | Largura do card |
| height | Float | Não | Altura do card |
| color | String | Não | Cor visual |
| metadata | Json | Não | Dados flexíveis |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- `title` é obrigatório;
- Cada nó deve pertencer a um organograma;
- `reportsToNodeId` permite montar hierarquia;
- O sistema deve impedir ciclos hierárquicos;
- `positionX` e `positionY` devem ser salvos para manter layout visual.

---

## 5.7 OrgChartEdge

Representa a conexão visual entre cargos no organograma.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| orgChartId | String | Sim | Organograma vinculado |
| sourceNodeId | String | Sim | Cargo superior |
| targetNodeId | String | Sim | Cargo subordinado |
| type | EdgeType | Não | Tipo visual da conexão |
| label | String | Não | Rótulo opcional |
| metadata | Json | Não | Dados flexíveis |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

### Regras

- `sourceNodeId` e `targetNodeId` não podem ser iguais;
- A relação deve respeitar o mesmo organograma;
- A conexão deve ser usada pelo React Flow.

---

## 5.8 ProcessMap

Representa um fluxo de processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| name | String | Sim | Nome do processo |
| description | String | Não | Descrição |
| processOwner | String | Não | Dono do processo |
| department | String | Não | Área principal |
| status | ProjectStatus | Sim | Status |
| notation | ProcessNotation | Sim | Tipo de notação |
| viewport | Json | Não | Zoom/posição do canvas |
| createdById | String | Não | Usuário criador |
| updatedById | String | Não | Último usuário editor |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Regras

- Deve pertencer a uma empresa;
- Deve pertencer a um workspace;
- Pode possuir muitas etapas e conexões;
- No MVP, `notation` pode ser `FLOWCHART`.

---

## 5.9 ProcessNode

Representa uma etapa dentro de um processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| processMapId | String | Sim | Processo vinculado |
| type | ProcessNodeType | Sim | Tipo da etapa |
| title | String | Sim | Nome da etapa |
| description | String | Não | Descrição |
| department | String | Não | Área responsável |
| responsibleRole | String | Não | Cargo responsável |
| systemName | String | Não | Sistema utilizado |
| documentName | String | Não | Documento gerado/usado |
| estimatedTimeMinutes | Int | Não | Tempo estimado |
| riskLevel | RiskLevel | Não | Risco associado |
| indicator | String | Não | Indicador relacionado |
| positionX | Float | Sim | Posição X |
| positionY | Float | Sim | Posição Y |
| width | Float | Não | Largura |
| height | Float | Não | Altura |
| metadata | Json | Não | Dados flexíveis |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Tipos de etapa

- `START`;
- `ACTIVITY`;
- `DECISION`;
- `DOCUMENT`;
- `SYSTEM`;
- `APPROVAL`;
- `WAIT`;
- `END`.

### Regras

- Toda etapa deve pertencer a um processo;
- `title` é obrigatório;
- `positionX` e `positionY` devem ser persistidos;
- Etapas de decisão podem possuir múltiplas saídas.

---

## 5.10 ProcessEdge

Representa uma conexão entre etapas de um processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| processMapId | String | Sim | Processo vinculado |
| sourceNodeId | String | Sim | Etapa de origem |
| targetNodeId | String | Sim | Etapa de destino |
| label | String | Não | Rótulo da conexão |
| condition | String | Não | Condição |
| type | EdgeType | Não | Tipo visual |
| metadata | Json | Não | Dados flexíveis |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

### Regras

- Origem e destino devem pertencer ao mesmo processo;
- `sourceNodeId` e `targetNodeId` não podem ser iguais;
- Conexões de decisão podem receber rótulos como `Sim`, `Não`, `Aprovado`, `Reprovado`.

---

# 6. Entidades de documentação

---

## 6.1 JobPosition

Representa um cargo consolidado dentro de uma empresa.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| title | String | Sim | Nome do cargo |
| department | String | Não | Departamento |
| seniority | String | Não | Nível/senioridade |
| mission | String | Não | Missão do cargo |
| notes | String | Não | Observações |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Observação

No MVP, o cargo pode existir apenas como `OrgChartNode`.  
No pós-MVP, `JobPosition` pode consolidar cargos usados em organogramas, descrições de cargo e RACI.

---

## 6.2 JobDescription

Representa a descrição formal de um cargo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| jobPositionId | String | Não | Cargo vinculado |
| orgChartNodeId | String | Não | Nó de organograma vinculado |
| title | String | Sim | Título da descrição |
| content | String | Sim | Conteúdo textual |
| aiGenerated | Boolean | Sim | Indica se foi gerado por IA |
| version | Int | Sim | Versão do documento |
| createdById | String | Não | Usuário criador |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Conteúdo esperado

- Missão;
- Responsabilidades;
- Indicadores;
- Competências técnicas;
- Competências comportamentais;
- Superior imediato;
- Subordinados;
- Interfaces internas.

---

## 6.3 RaciMatrix

Representa uma matriz RACI vinculada a um processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| processMapId | String | Sim | Processo vinculado |
| name | String | Sim | Nome da matriz |
| description | String | Não | Descrição |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

---

## 6.4 RaciMatrixItem

Representa uma célula ou atribuição da matriz RACI.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| raciMatrixId | String | Sim | Matriz vinculada |
| processNodeId | String | Sim | Etapa do processo |
| roleName | String | Sim | Cargo/área |
| responsibility | RaciResponsibility | Sim | R, A, C ou I |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

### Regras

- A responsabilidade deve ser uma das opções: `R`, `A`, `C`, `I`;
- Uma mesma etapa pode ter múltiplos papéis;
- Idealmente uma etapa deve ter apenas um `A`.

---

## 6.5 StandardOperatingProcedure

Representa um POP gerado a partir de processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| processMapId | String | Não | Processo vinculado |
| title | String | Sim | Título do POP |
| objective | String | Não | Objetivo |
| scope | String | Não | Escopo |
| content | String | Sim | Conteúdo completo |
| aiGenerated | Boolean | Sim | Indica geração por IA |
| version | Int | Sim | Versão |
| status | DocumentStatus | Sim | Status |
| createdById | String | Não | Usuário criador |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

---

## 6.6 Diagnosis

Representa um diagnóstico organizacional, de organograma ou de processo.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Sim | Empresa vinculada |
| targetType | DiagnosisTargetType | Sim | Tipo de alvo |
| orgChartId | String | Não | Organograma analisado |
| processMapId | String | Não | Processo analisado |
| title | String | Sim | Título do problema |
| description | String | Sim | Descrição |
| severity | SeverityLevel | Sim | Gravidade |
| impactedArea | String | Não | Área impactada |
| recommendation | String | Não | Sugestão |
| aiGenerated | Boolean | Sim | Gerado por IA |
| status | DiagnosisStatus | Sim | Status |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |
| deletedAt | DateTime | Não | Soft delete |

### Tipos de alvo

- `ORG_CHART`;
- `PROCESS`;
- `COMPANY`.

---

# 7. Entidades de suporte

---

## 7.1 TemplateCategory

Representa categorias de templates.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| name | String | Sim | Nome da categoria |
| slug | String | Sim | Slug único |
| description | String | Não | Descrição |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

---

## 7.2 Template

Representa um template de organograma, processo ou estrutura completa.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Não | Workspace dono, se template privado |
| categoryId | String | Não | Categoria |
| name | String | Sim | Nome |
| slug | String | Sim | Slug |
| description | String | Não | Descrição |
| segment | String | Não | Segmento |
| type | TemplateType | Sim | Tipo de template |
| isPublic | Boolean | Sim | Template público |
| content | Json | Sim | Estrutura do template |
| createdAt | DateTime | Sim | Data de criação |
| updatedAt | DateTime | Sim | Data de atualização |

### Tipos de template

- `ORG_CHART`;
- `PROCESS`;
- `FULL_STRUCTURE`;
- `JOB_DESCRIPTION`;
- `SOP`.

### Observação

No MVP, templates podem ficar em arquivos JSON.  
No pós-MVP, migrar para tabela `Template`.

---

## 7.3 AiGenerationLog

Registra toda geração com IA ou mock.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Não | Empresa relacionada |
| userId | String | Sim | Usuário solicitante |
| type | AiGenerationType | Sim | Tipo de geração |
| provider | AiProvider | Sim | Provider usado |
| model | String | Não | Modelo usado |
| inputText | String | Sim | Texto de entrada |
| outputJson | Json | Não | JSON de saída |
| outputText | String | Não | Texto de saída |
| status | AiGenerationStatus | Sim | Status |
| errorMessage | String | Não | Erro |
| promptTokens | Int | Não | Tokens de entrada |
| completionTokens | Int | Não | Tokens de saída |
| totalCost | Decimal | Não | Custo estimado |
| createdAt | DateTime | Sim | Data de criação |

### Tipos de geração

- `ORG_CHART_FROM_TEXT`;
- `PROCESS_FROM_TEXT`;
- `FULL_STRUCTURE_FROM_TEXT`;
- `RACI_FROM_PROCESS`;
- `JOB_DESCRIPTION`;
- `SOP_FROM_PROCESS`;
- `DIAGNOSIS_PROCESS`;
- `DIAGNOSIS_ORG_CHART`.

---

## 7.4 ExportHistory

Registra exportações feitas pelo usuário.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Não | Empresa relacionada |
| userId | String | Sim | Usuário |
| targetType | ExportTargetType | Sim | Tipo de alvo exportado |
| targetId | String | Sim | ID do alvo |
| format | ExportFormat | Sim | Formato |
| fileUrl | String | Não | URL do arquivo |
| createdAt | DateTime | Sim | Data da exportação |

### Formatos

- `PNG`;
- `PDF`;
- `SVG`;
- `DOCX`;
- `PPTX`;
- `JSON`;
- `CSV`.

---

## 7.5 AuditLog

Registra ações importantes no sistema.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| userId | String | Não | Usuário responsável |
| action | String | Sim | Ação executada |
| entityType | String | Sim | Tipo da entidade |
| entityId | String | Não | ID da entidade |
| oldValue | Json | Não | Valor anterior |
| newValue | Json | Não | Novo valor |
| ipAddress | String | Não | IP |
| userAgent | String | Não | Navegador |
| createdAt | DateTime | Sim | Data |

### Observação

No MVP, pode ser substituído por logs simples.  
No pós-MVP, será útil para auditoria e segurança.

---

## 7.6 Attachment

Representa arquivos anexados.

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| id | String/UUID | Sim | Identificador único |
| workspaceId | String | Sim | Workspace dono |
| companyId | String | Não | Empresa relacionada |
| uploadedById | String | Não | Usuário que enviou |
| fileName | String | Sim | Nome do arquivo |
| fileUrl | String | Sim | URL |
| mimeType | String | Não | Tipo MIME |
| sizeBytes | Int | Não | Tamanho |
| targetType | AttachmentTargetType | Não | Tipo de alvo |
| targetId | String | Não | ID do alvo |
| createdAt | DateTime | Sim | Data |

### Uso futuro

- Logos;
- PDFs de processo;
- Imagens de quadro branco;
- Documentos de referência;
- Importações.

---

# 8. Enums recomendados

```prisma
enum UserStatus {
  ACTIVE
  INACTIVE
  BLOCKED
}

enum WorkspaceStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

enum WorkspaceRole {
  OWNER
  ADMIN
  EDITOR
  VIEWER
  CLIENT_VIEWER
}

enum MemberStatus {
  ACTIVE
  INVITED
  DISABLED
}

enum CompanySize {
  MICRO
  SMALL
  MEDIUM
  LARGE
  ENTERPRISE
}

enum ProjectStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

enum OrgNodeStatus {
  OCCUPIED
  OPEN
  OUTSOURCED
  TEMPORARY
  FUTURE
}

enum LayoutDirection {
  TOP_DOWN
  LEFT_RIGHT
}

enum ProcessNotation {
  FLOWCHART
  BPMN
  SIPOC
  SWIMLANE
}

enum ProcessNodeType {
  START
  ACTIVITY
  DECISION
  DOCUMENT
  SYSTEM
  APPROVAL
  WAIT
  END
}

enum EdgeType {
  DEFAULT
  STRAIGHT
  STEP
  SMOOTH
}

enum RiskLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum SeverityLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum RaciResponsibility {
  R
  A
  C
  I
}

enum DocumentStatus {
  DRAFT
  REVIEW
  APPROVED
  ARCHIVED
}

enum DiagnosisTargetType {
  COMPANY
  ORG_CHART
  PROCESS
}

enum DiagnosisStatus {
  OPEN
  RESOLVED
  IGNORED
}

enum TemplateType {
  ORG_CHART
  PROCESS
  FULL_STRUCTURE
  JOB_DESCRIPTION
  SOP
}

enum AiProvider {
  MOCK
  OPENAI
  ANTHROPIC
  GEMINI
}

enum AiGenerationType {
  ORG_CHART_FROM_TEXT
  PROCESS_FROM_TEXT
  FULL_STRUCTURE_FROM_TEXT
  RACI_FROM_PROCESS
  JOB_DESCRIPTION
  SOP_FROM_PROCESS
  DIAGNOSIS_PROCESS
  DIAGNOSIS_ORG_CHART
}

enum AiGenerationStatus {
  SUCCESS
  ERROR
  PENDING
}

enum ExportTargetType {
  ORG_CHART
  PROCESS
  RACI
  JOB_DESCRIPTION
  SOP
  DIAGNOSIS
}

enum ExportFormat {
  PNG
  PDF
  SVG
  DOCX
  PPTX
  JSON
  CSV
}

enum AttachmentTargetType {
  COMPANY
  ORG_CHART
  PROCESS
  JOB_DESCRIPTION
  SOP
  DIAGNOSIS
}
```

---

# 9. Regras multi-tenant

## 9.1 Regra principal

Todas as entidades operacionais devem possuir `workspaceId`.

Entidades com `workspaceId` obrigatório:

- ClientCompany;
- OrgChart;
- OrgChartNode;
- OrgChartEdge;
- ProcessMap;
- ProcessNode;
- ProcessEdge;
- JobPosition;
- JobDescription;
- RaciMatrix;
- RaciMatrixItem;
- StandardOperatingProcedure;
- Diagnosis;
- AiGenerationLog;
- ExportHistory;
- AuditLog;
- Attachment.

## 9.2 Regra de consulta

Toda consulta deve filtrar por `workspaceId`.

Exemplo incorreto:

```ts
const company = await prisma.clientCompany.findUnique({
  where: { id: companyId }
})
```

Exemplo correto:

```ts
const company = await prisma.clientCompany.findFirst({
  where: {
    id: companyId,
    workspaceId: currentWorkspaceId,
    deletedAt: null
  }
})
```

## 9.3 Regra de criação

Toda criação deve receber `workspaceId` a partir da sessão do usuário, nunca do front-end isoladamente.

---

# 10. Regras de soft delete

## 10.1 Entidades com soft delete

Recomenda-se usar `deletedAt` nas entidades principais:

- User;
- Workspace;
- ClientCompany;
- OrgChart;
- OrgChartNode;
- ProcessMap;
- ProcessNode;
- JobPosition;
- JobDescription;
- RaciMatrix;
- StandardOperatingProcedure;
- Diagnosis.

## 10.2 Consulta padrão

Consultas devem ignorar registros com `deletedAt` preenchido.

```ts
where: {
  workspaceId,
  deletedAt: null
}
```

## 10.3 Exclusão física

Pode ser usada em entidades de conexão, se não houver necessidade de histórico:

- OrgChartEdge;
- ProcessEdge;
- RaciMatrixItem.

---

# 11. Índices recomendados

## 11.1 User

- `email` único.

## 11.2 WorkspaceMember

- `workspaceId`;
- `userId`;
- índice único: `workspaceId + userId`.

## 11.3 ClientCompany

- `workspaceId`;
- `workspaceId + name`;
- `workspaceId + segment`;
- `deletedAt`.

## 11.4 OrgChart

- `workspaceId`;
- `companyId`;
- `workspaceId + companyId`;
- `deletedAt`.

## 11.5 OrgChartNode

- `workspaceId`;
- `orgChartId`;
- `reportsToNodeId`;
- `deletedAt`.

## 11.6 ProcessMap

- `workspaceId`;
- `companyId`;
- `workspaceId + companyId`;
- `deletedAt`.

## 11.7 ProcessNode

- `workspaceId`;
- `processMapId`;
- `type`;
- `deletedAt`.

## 11.8 AiGenerationLog

- `workspaceId`;
- `userId`;
- `companyId`;
- `type`;
- `createdAt`.

---

# 12. Estrutura inicial sugerida em Prisma

Abaixo está uma base inicial para o `schema.prisma`. Ela pode ser expandida conforme a evolução do produto.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String      @id @default(cuid())
  name         String
  email        String      @unique
  passwordHash String
  avatarUrl    String?
  status       UserStatus  @default(ACTIVE)

  workspacesOwned Workspace[] @relation("WorkspaceOwner")
  memberships     WorkspaceMember[]

  aiGenerationLogs AiGenerationLog[]
  exportHistories  ExportHistory[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?
}

model Workspace {
  id      String          @id @default(cuid())
  name    String
  slug    String?
  logoUrl String?
  status  WorkspaceStatus @default(ACTIVE)

  ownerId String
  owner   User @relation("WorkspaceOwner", fields: [ownerId], references: [id])

  members     WorkspaceMember[]
  companies   ClientCompany[]
  orgCharts   OrgChart[]
  processes   ProcessMap[]
  templates   Template[]
  aiLogs      AiGenerationLog[]
  exports     ExportHistory[]
  auditLogs   AuditLog[]
  attachments Attachment[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([ownerId])
}

model WorkspaceMember {
  id          String          @id @default(cuid())
  workspaceId String
  userId      String
  role        WorkspaceRole   @default(OWNER)
  status      MemberStatus    @default(ACTIVE)
  invitedById String?
  joinedAt    DateTime?

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([workspaceId, userId])
  @@index([workspaceId])
  @@index([userId])
}

model ClientCompany {
  id               String       @id @default(cuid())
  workspaceId      String
  name             String
  legalName        String?
  document         String?
  segment          String?
  size             CompanySize?
  employeeCount    Int?
  website          String?
  city             String?
  state            String?
  responsibleName  String?
  responsibleEmail String?
  responsiblePhone String?
  logoUrl          String?
  notes            String?

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  orgCharts       OrgChart[]
  processes       ProcessMap[]
  jobPositions    JobPosition[]
  jobDescriptions JobDescription[]
  raciMatrices    RaciMatrix[]
  sops            StandardOperatingProcedure[]
  diagnoses       Diagnosis[]
  aiLogs          AiGenerationLog[]
  exports         ExportHistory[]
  attachments     Attachment[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([workspaceId, name])
  @@index([workspaceId, segment])
  @@index([deletedAt])
}

model OrgChart {
  id              String          @id @default(cuid())
  workspaceId     String
  companyId       String
  name            String
  description     String?
  versionLabel    String?
  status          ProjectStatus   @default(DRAFT)
  layoutDirection LayoutDirection @default(TOP_DOWN)
  viewport        Json?
  createdById     String?
  updatedById     String?

  workspace Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)

  nodes     OrgChartNode[]
  edges     OrgChartEdge[]
  diagnoses Diagnosis[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([workspaceId, companyId])
  @@index([deletedAt])
}

model OrgChartNode {
  id              String        @id @default(cuid())
  workspaceId     String
  orgChartId      String
  jobPositionId   String?
  title           String
  occupantName    String?
  department      String?
  status          OrgNodeStatus @default(OCCUPIED)
  reportsToNodeId String?
  level           Int?
  positionX       Float         @default(0)
  positionY       Float         @default(0)
  width           Float?
  height          Float?
  color           String?
  metadata        Json?

  orgChart    OrgChart      @relation(fields: [orgChartId], references: [id], onDelete: Cascade)
  jobPosition JobPosition?  @relation(fields: [jobPositionId], references: [id])
  reportsTo   OrgChartNode? @relation("OrgNodeHierarchy", fields: [reportsToNodeId], references: [id])
  subordinates OrgChartNode[] @relation("OrgNodeHierarchy")

  outgoingEdges OrgChartEdge[] @relation("OrgChartEdgeSource")
  incomingEdges OrgChartEdge[] @relation("OrgChartEdgeTarget")

  jobDescriptions JobDescription[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([orgChartId])
  @@index([reportsToNodeId])
  @@index([deletedAt])
}

model OrgChartEdge {
  id          String    @id @default(cuid())
  workspaceId String
  orgChartId  String
  sourceNodeId String
  targetNodeId String
  type        EdgeType? @default(SMOOTH)
  label       String?
  metadata    Json?

  orgChart OrgChart @relation(fields: [orgChartId], references: [id], onDelete: Cascade)
  source   OrgChartNode @relation("OrgChartEdgeSource", fields: [sourceNodeId], references: [id], onDelete: Cascade)
  target   OrgChartNode @relation("OrgChartEdgeTarget", fields: [targetNodeId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workspaceId])
  @@index([orgChartId])
  @@index([sourceNodeId])
  @@index([targetNodeId])
}

model ProcessMap {
  id           String          @id @default(cuid())
  workspaceId  String
  companyId    String
  name         String
  description  String?
  processOwner String?
  department   String?
  status       ProjectStatus   @default(DRAFT)
  notation     ProcessNotation @default(FLOWCHART)
  viewport     Json?
  createdById  String?
  updatedById  String?

  workspace Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)

  nodes       ProcessNode[]
  edges       ProcessEdge[]
  raciMatrices RaciMatrix[]
  sops        StandardOperatingProcedure[]
  diagnoses   Diagnosis[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([workspaceId, companyId])
  @@index([deletedAt])
}

model ProcessNode {
  id                   String          @id @default(cuid())
  workspaceId           String
  processMapId          String
  type                 ProcessNodeType
  title                String
  description          String?
  department           String?
  responsibleRole      String?
  systemName           String?
  documentName         String?
  estimatedTimeMinutes Int?
  riskLevel            RiskLevel?
  indicator            String?
  positionX            Float           @default(0)
  positionY            Float           @default(0)
  width                Float?
  height               Float?
  metadata             Json?

  processMap ProcessMap @relation(fields: [processMapId], references: [id], onDelete: Cascade)

  outgoingEdges ProcessEdge[] @relation("ProcessEdgeSource")
  incomingEdges ProcessEdge[] @relation("ProcessEdgeTarget")
  raciItems     RaciMatrixItem[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([processMapId])
  @@index([type])
  @@index([deletedAt])
}

model ProcessEdge {
  id           String    @id @default(cuid())
  workspaceId  String
  processMapId String
  sourceNodeId String
  targetNodeId String
  label        String?
  condition    String?
  type         EdgeType? @default(SMOOTH)
  metadata     Json?

  processMap ProcessMap @relation(fields: [processMapId], references: [id], onDelete: Cascade)
  source     ProcessNode @relation("ProcessEdgeSource", fields: [sourceNodeId], references: [id], onDelete: Cascade)
  target     ProcessNode @relation("ProcessEdgeTarget", fields: [targetNodeId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workspaceId])
  @@index([processMapId])
  @@index([sourceNodeId])
  @@index([targetNodeId])
}

model JobPosition {
  id          String @id @default(cuid())
  workspaceId String
  companyId   String
  title       String
  department  String?
  seniority   String?
  mission     String?
  notes       String?

  workspace Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)

  orgChartNodes   OrgChartNode[]
  jobDescriptions JobDescription[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([workspaceId, title])
}

model JobDescription {
  id             String  @id @default(cuid())
  workspaceId    String
  companyId      String
  jobPositionId  String?
  orgChartNodeId String?
  title          String
  content        String
  aiGenerated    Boolean @default(false)
  version        Int     @default(1)
  createdById    String?

  workspace    Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company      ClientCompany  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  jobPosition  JobPosition?   @relation(fields: [jobPositionId], references: [id])
  orgChartNode OrgChartNode?  @relation(fields: [orgChartNodeId], references: [id])

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([jobPositionId])
}

model RaciMatrix {
  id           String @id @default(cuid())
  workspaceId  String
  companyId    String
  processMapId String
  name         String
  description  String?

  workspace  Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company    ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)
  processMap ProcessMap    @relation(fields: [processMapId], references: [id], onDelete: Cascade)

  items RaciMatrixItem[]

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([processMapId])
}

model RaciMatrixItem {
  id             String             @id @default(cuid())
  workspaceId    String
  raciMatrixId   String
  processNodeId  String
  roleName       String
  responsibility RaciResponsibility

  raciMatrix RaciMatrix @relation(fields: [raciMatrixId], references: [id], onDelete: Cascade)
  processNode ProcessNode @relation(fields: [processNodeId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workspaceId])
  @@index([raciMatrixId])
  @@index([processNodeId])
}

model StandardOperatingProcedure {
  id           String         @id @default(cuid())
  workspaceId  String
  companyId    String
  processMapId String?
  title        String
  objective    String?
  scope        String?
  content      String
  aiGenerated  Boolean        @default(false)
  version      Int            @default(1)
  status       DocumentStatus @default(DRAFT)
  createdById  String?

  workspace  Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company    ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)
  processMap ProcessMap?   @relation(fields: [processMapId], references: [id])

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([processMapId])
}

model Diagnosis {
  id             String              @id @default(cuid())
  workspaceId    String
  companyId      String
  targetType     DiagnosisTargetType
  orgChartId     String?
  processMapId   String?
  title          String
  description    String
  severity       SeverityLevel
  impactedArea   String?
  recommendation String?
  aiGenerated    Boolean             @default(false)
  status         DiagnosisStatus     @default(OPEN)

  workspace  Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company    ClientCompany @relation(fields: [companyId], references: [id], onDelete: Cascade)
  orgChart   OrgChart?     @relation(fields: [orgChartId], references: [id])
  processMap ProcessMap?   @relation(fields: [processMapId], references: [id])

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([workspaceId])
  @@index([companyId])
  @@index([orgChartId])
  @@index([processMapId])
}

model TemplateCategory {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  description String?

  templates Template[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Template {
  id          String       @id @default(cuid())
  workspaceId String?
  categoryId  String?
  name        String
  slug        String
  description String?
  segment     String?
  type        TemplateType
  isPublic    Boolean      @default(true)
  content     Json

  workspace Workspace?        @relation(fields: [workspaceId], references: [id])
  category  TemplateCategory? @relation(fields: [categoryId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([workspaceId])
  @@index([categoryId])
  @@index([segment])
  @@index([type])
}

model AiGenerationLog {
  id               String             @id @default(cuid())
  workspaceId       String
  companyId         String?
  userId            String
  type              AiGenerationType
  provider          AiProvider         @default(MOCK)
  model             String?
  inputText         String
  outputJson        Json?
  outputText        String?
  status            AiGenerationStatus
  errorMessage      String?
  promptTokens      Int?
  completionTokens  Int?
  totalCost         Decimal?

  workspace Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany? @relation(fields: [companyId], references: [id])
  user      User           @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())

  @@index([workspaceId])
  @@index([companyId])
  @@index([userId])
  @@index([type])
  @@index([createdAt])
}

model ExportHistory {
  id          String           @id @default(cuid())
  workspaceId String
  companyId   String?
  userId      String
  targetType  ExportTargetType
  targetId    String
  format      ExportFormat
  fileUrl     String?

  workspace Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany? @relation(fields: [companyId], references: [id])
  user      User           @relation(fields: [userId], references: [id])

  createdAt DateTime @default(now())

  @@index([workspaceId])
  @@index([companyId])
  @@index([userId])
  @@index([targetType, targetId])
}

model AuditLog {
  id          String @id @default(cuid())
  workspaceId String
  userId      String?
  action      String
  entityType  String
  entityId    String?
  oldValue    Json?
  newValue    Json?
  ipAddress   String?
  userAgent   String?

  workspace Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([workspaceId])
  @@index([userId])
  @@index([entityType, entityId])
  @@index([createdAt])
}

model Attachment {
  id           String                @id @default(cuid())
  workspaceId  String
  companyId    String?
  uploadedById String?
  fileName     String
  fileUrl      String
  mimeType     String?
  sizeBytes    Int?
  targetType   AttachmentTargetType?
  targetId     String?

  workspace Workspace      @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  company   ClientCompany? @relation(fields: [companyId], references: [id])

  createdAt DateTime @default(now())

  @@index([workspaceId])
  @@index([companyId])
  @@index([targetType, targetId])
}
```

---

# 13. Estratégia para o MVP

## 13.1 Entidades obrigatórias no MVP

Para a primeira versão, implementar obrigatoriamente:

- User;
- Workspace;
- WorkspaceMember;
- ClientCompany;
- OrgChart;
- OrgChartNode;
- OrgChartEdge;
- ProcessMap;
- ProcessNode;
- ProcessEdge;
- AiGenerationLog.

## 13.2 Entidades opcionais no MVP

Podem ser implementadas se não atrasarem o núcleo:

- Template;
- TemplateCategory;
- ExportHistory.

## 13.3 Entidades pós-MVP

Deixar para evolução:

- JobPosition;
- JobDescription;
- RaciMatrix;
- RaciMatrixItem;
- StandardOperatingProcedure;
- Diagnosis;
- AuditLog;
- Attachment;
- AppSetting.

---

# 14. Exemplos de JSON para diagramas

## 14.1 Organograma gerado por IA

```json
{
  "organizationName": "Empresa de Locação de Equipamentos",
  "positions": [
    {
      "id": "pos-1",
      "title": "Diretor Geral",
      "department": "Diretoria",
      "reportsTo": null,
      "level": 1,
      "position": { "x": 400, "y": 50 }
    },
    {
      "id": "pos-2",
      "title": "Gerente Comercial",
      "department": "Comercial",
      "reportsTo": "pos-1",
      "level": 2,
      "position": { "x": 100, "y": 200 }
    },
    {
      "id": "pos-3",
      "title": "Coordenador de Operações",
      "department": "Operações",
      "reportsTo": "pos-1",
      "level": 2,
      "position": { "x": 400, "y": 200 }
    }
  ],
  "edges": [
    {
      "source": "pos-1",
      "target": "pos-2"
    },
    {
      "source": "pos-1",
      "target": "pos-3"
    }
  ]
}
```

## 14.2 Processo gerado por IA

```json
{
  "processName": "Processo de Locação de Equipamentos",
  "description": "Fluxo desde a solicitação do cliente até a devolução e conferência.",
  "steps": [
    {
      "id": "step-1",
      "type": "START",
      "title": "Cliente solicita orçamento",
      "department": "Comercial",
      "responsibleRole": "Vendedor",
      "position": { "x": 100, "y": 100 }
    },
    {
      "id": "step-2",
      "type": "ACTIVITY",
      "title": "Consultar disponibilidade",
      "department": "Comercial",
      "responsibleRole": "Vendedor",
      "position": { "x": 350, "y": 100 }
    },
    {
      "id": "step-3",
      "type": "DECISION",
      "title": "Equipamento disponível?",
      "department": "Estoque",
      "responsibleRole": "Estoquista",
      "position": { "x": 600, "y": 100 }
    }
  ],
  "connections": [
    {
      "source": "step-1",
      "target": "step-2"
    },
    {
      "source": "step-2",
      "target": "step-3"
    }
  ]
}
```

---

# 15. Regras de integridade importantes

## 15.1 Organogramas

- Um `OrgChartNode` deve pertencer ao mesmo `workspaceId` do `OrgChart`;
- Um `OrgChartEdge` só pode conectar nós do mesmo organograma;
- Um cargo não pode reportar a si mesmo;
- O sistema deve evitar ciclos hierárquicos.

## 15.2 Processos

- Um `ProcessNode` deve pertencer ao mesmo `workspaceId` do `ProcessMap`;
- Um `ProcessEdge` só pode conectar etapas do mesmo processo;
- Origem e destino não podem ser iguais;
- Um processo pode ter múltiplos inícios no banco, mas a interface pode recomendar apenas um.

## 15.3 Empresas

- Empresa deve pertencer a um workspace;
- Projetos não devem existir sem empresa no MVP;
- Excluir empresa deve tratar organogramas e processos vinculados.

## 15.4 IA

- Toda geração deve registrar log;
- Respostas inválidas devem ser registradas com status `ERROR`;
- O front-end deve validar o JSON antes de salvar como projeto.

---

# 16. Estratégia de migração

## 16.1 Primeira migration

Criar:

- Enums principais;
- User;
- Workspace;
- WorkspaceMember;
- ClientCompany;
- OrgChart;
- OrgChartNode;
- OrgChartEdge;
- ProcessMap;
- ProcessNode;
- ProcessEdge;
- AiGenerationLog.

## 16.2 Segunda migration

Adicionar:

- TemplateCategory;
- Template;
- ExportHistory.

## 16.3 Terceira migration

Adicionar:

- JobPosition;
- JobDescription;
- RaciMatrix;
- RaciMatrixItem;
- StandardOperatingProcedure;
- Diagnosis.

## 16.4 Quarta migration

Adicionar:

- AuditLog;
- Attachment;
- Campos avançados;
- Permissões refinadas.

---

# 17. Recomendações de implementação

## 17.1 Services devem validar workspace

Serviços de domínio devem receber `workspaceId` explicitamente.

Exemplo:

```ts
createOrgChart({
  workspaceId,
  companyId,
  name,
  description
})
```

## 17.2 Evitar confiar no front-end

O front-end pode enviar `companyId`, `orgChartId` ou `processMapId`, mas o back-end deve validar se pertencem ao workspace atual.

## 17.3 Usar transações em operações complexas

Exemplos:

- Criar organograma com vários nós;
- Criar processo com várias etapas;
- Duplicar organograma;
- Duplicar processo;
- Criar estrutura gerada por IA.

## 17.4 Armazenar canvas de forma relacional

Recomenda-se armazenar nós e conexões em tabelas próprias, não apenas um JSON gigante.

Vantagens:

- Consulta por etapa/cargo;
- Diagnóstico futuro;
- RACI;
- POP;
- Relatórios;
- Permissões;
- Versionamento.

`metadata` em JSON deve ser usado apenas para flexibilidade complementar.

---

# 18. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
technical-architecture.md
```

Esse documento deve definir arquitetura da aplicação, stack, camadas, serviços, padrões de código e estratégia de deploy.
