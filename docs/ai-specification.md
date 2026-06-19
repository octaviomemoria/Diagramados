# AI Specification — Diagramados

**Documento:** Especificação de IA  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento define a especificação de Inteligência Artificial do **Diagramados**, incluindo:

- Objetivos da IA dentro do produto;
- Funcionalidades assistidas por IA;
- Providers suportados;
- Estratégia de mock no MVP;
- Contratos de entrada e saída;
- Prompts-base;
- Formatos JSON esperados;
- Validação das respostas;
- Tratamento de erros;
- Logs;
- Custos;
- Segurança;
- Privacidade;
- Boas práticas de implementação.

A IA deve ser usada como uma camada de aceleração e estruturação, não como fonte absoluta da verdade.

O usuário sempre deve conseguir revisar e editar o resultado gerado.

---

## 2. Papel da IA no produto

A IA do Diagramados terá o papel de transformar informações desestruturadas em estruturas organizacionais e operacionais editáveis.

Exemplo:

Entrada do usuário:

```txt
Tenho uma empresa de locação de equipamentos com comercial, financeiro, estoque, logística e manutenção. O cliente solicita orçamento pelo WhatsApp, o vendedor consulta disponibilidade, envia proposta, recebe sinal, agenda entrega, a logística entrega, depois recolhe, o estoque confere e o financeiro cobra saldo ou avarias.
```

Saídas esperadas:

- Organograma sugerido;
- Fluxo de processo;
- Cargos identificados;
- Responsabilidades;
- Matriz RACI;
- POP;
- Diagnóstico de gargalos;
- Sugestões de melhoria.

No MVP, a IA pode operar em modo **mock**, simulando respostas realistas para validar a experiência.

---

## 3. Princípios de uso da IA

## 3.1 IA como assistente, não autoridade final

A IA sugere estruturas, mas o usuário deve revisar.

O sistema deve evitar mensagens como:

```txt
Este é o organograma correto.
```

Preferir:

```txt
Sugestão inicial gerada com base na descrição informada.
```

---

## 3.2 Resultado sempre editável

Toda saída da IA deve ser transformada em estrutura editável:

- Nós de organograma;
- Etapas de processo;
- Conexões;
- Textos;
- Diagnósticos;
- Responsabilidades.

Nunca salvar apenas imagem ou texto estático quando o resultado puder ser estruturado.

---

## 3.3 Resposta estruturada primeiro

A IA deve retornar JSON validável antes de qualquer texto livre.

A interface pode exibir visualmente o resultado, mas o sistema deve sempre depender de estruturas padronizadas.

---

## 3.4 Segurança e privacidade

O sistema deve evitar enviar dados desnecessários ao provider de IA.

Não enviar:

- Senhas;
- Tokens;
- Chaves;
- Dados bancários;
- Documentos sensíveis sem necessidade;
- Informações pessoais excessivas.

---

## 4. Funcionalidades de IA previstas

## 4.1 MVP

Funcionalidades obrigatórias no MVP:

| Código | Funcionalidade | Provider |
|---|---|---|
| AI-001 | Gerar organograma a partir de texto | Mock |
| AI-002 | Gerar processo a partir de texto | Mock |
| AI-003 | Gerar organograma + processo a partir de texto | Mock |
| AI-004 | Registrar log de geração | Sistema |
| AI-005 | Validar JSON gerado | Sistema |

---

## 4.2 Pós-MVP imediato

Funcionalidades recomendadas logo após o MVP:

| Código | Funcionalidade | Provider |
|---|---|---|
| AI-006 | Provider real OpenAI/Anthropic/Gemini | IA real |
| AI-007 | Gerar Matriz RACI | IA real ou regra |
| AI-008 | Gerar descrição de cargo | IA real |
| AI-009 | Gerar POP | IA real |
| AI-010 | Diagnosticar processo | IA real + regras |
| AI-011 | Diagnosticar organograma | IA real + regras |

---

## 4.3 Futuro

Funcionalidades futuras:

| Código | Funcionalidade |
|---|---|
| AI-012 | Converter imagem de quadro/fluxo em diagrama |
| AI-013 | Converter PDF em processo editável |
| AI-014 | Converter áudio/transcrição em processo |
| AI-015 | Benchmark por segmento |
| AI-016 | Sugestão automática de layout |
| AI-017 | Assistente conversacional dentro do projeto |
| AI-018 | Revisão automática de documentação |
| AI-019 | Comparação entre estrutura atual e proposta |
| AI-020 | Geração de apresentação executiva |

---

# 5. Arquitetura da IA

## 5.1 Serviço centralizado

Toda lógica de IA deve ficar centralizada em:

```txt
/src/services/ai-service.ts
```

O front-end não deve chamar diretamente APIs externas de IA.

---

## 5.2 Camadas recomendadas

```txt
UI
  ↓
ai-actions.ts
  ↓
ai-service.ts
  ↓
ai-provider.ts
  ↓
mock-provider.ts / openai-provider.ts / anthropic-provider.ts / gemini-provider.ts
  ↓
Validação Zod
  ↓
Persistência / Logs
```

---

## 5.3 Estrutura de arquivos sugerida

```txt
/src
  /services
    ai-service.ts

  /lib
    /ai
      ai-provider.ts
      mock-provider.ts
      openai-provider.ts
      anthropic-provider.ts
      gemini-provider.ts
      ai-prompts.ts
      ai-validation.ts
      ai-errors.ts

  /schemas
    ai-schema.ts
    generated-orgchart-schema.ts
    generated-process-schema.ts
    generated-raci-schema.ts
    generated-pop-schema.ts
    generated-diagnosis-schema.ts

  /types
    ai.ts
    generated-orgchart.ts
    generated-process.ts
```

---

# 6. Providers de IA

## 6.1 Providers suportados

O sistema deve ser preparado para os seguintes providers:

```txt
mock
openai
anthropic
gemini
```

Configuração via ambiente:

```env
AI_PROVIDER="mock"
```

---

## 6.2 Interface padrão de provider

Criar uma interface comum:

```ts
export type AiProviderName = "mock" | "openai" | "anthropic" | "gemini"

export type AiProviderResponse<T> = {
  success: boolean
  data?: T
  rawText?: string
  error?: {
    code: string
    message: string
  }
  usage?: {
    promptTokens?: number
    completionTokens?: number
    totalTokens?: number
    estimatedCost?: number
  }
}

export interface AiProvider {
  generateOrgChartFromText(input: GenerateOrgChartInput): Promise<AiProviderResponse<GeneratedOrgChart>>
  generateProcessFromText(input: GenerateProcessInput): Promise<AiProviderResponse<GeneratedProcess>>
  generateFullStructureFromText(input: GenerateFullStructureInput): Promise<AiProviderResponse<GeneratedFullStructure>>
  generateRaciFromProcess(input: GenerateRaciInput): Promise<AiProviderResponse<GeneratedRaciMatrix>>
  generateJobDescription(input: GenerateJobDescriptionInput): Promise<AiProviderResponse<GeneratedJobDescription>>
  generateSopFromProcess(input: GenerateSopInput): Promise<AiProviderResponse<GeneratedSop>>
  diagnoseProcess(input: DiagnoseProcessInput): Promise<AiProviderResponse<GeneratedDiagnosis[]>>
  diagnoseOrgChart(input: DiagnoseOrgChartInput): Promise<AiProviderResponse<GeneratedDiagnosis[]>>
}
```

---

## 6.3 Provider mock

No MVP, o provider mock deve:

- Retornar dados realistas;
- Não depender de internet;
- Não gerar custo;
- Permitir testar fluxos;
- Simular erros quando necessário;
- Permitir diferentes respostas por tipo de segmento.

Exemplo:

```ts
const AI_PROVIDER = process.env.AI_PROVIDER ?? "mock"
```

Se `AI_PROVIDER="mock"`, usar `mock-provider.ts`.

---

## 6.4 Provider real

No pós-MVP, providers reais devem:

- Usar chaves apenas no servidor;
- Respeitar limites de token;
- Registrar custo;
- Validar JSON retornado;
- Aplicar fallback em caso de erro;
- Não expor resposta bruta ao usuário final sem tratamento.

---

# 7. Tipos de geração

## 7.1 Geração de organograma

### Função

```ts
generateOrgChartFromText(input)
```

### Entrada

```ts
type GenerateOrgChartInput = {
  workspaceId: string
  companyId?: string
  userId: string
  text: string
  companyName?: string
  segment?: string
  language?: "pt-BR" | "en-US"
}
```

### Saída

```ts
type GeneratedOrgChart = {
  organizationName: string
  description?: string
  positions: GeneratedOrgChartPosition[]
  edges: GeneratedOrgChartEdge[]
  assumptions?: string[]
  warnings?: string[]
}
```

---

## 7.2 Geração de processo

### Função

```ts
generateProcessFromText(input)
```

### Entrada

```ts
type GenerateProcessInput = {
  workspaceId: string
  companyId?: string
  userId: string
  text: string
  processName?: string
  segment?: string
  language?: "pt-BR" | "en-US"
}
```

### Saída

```ts
type GeneratedProcess = {
  processName: string
  description?: string
  steps: GeneratedProcessStep[]
  connections: GeneratedProcessConnection[]
  assumptions?: string[]
  warnings?: string[]
}
```

---

## 7.3 Geração de estrutura completa

### Função

```ts
generateFullStructureFromText(input)
```

### Entrada

```ts
type GenerateFullStructureInput = {
  workspaceId: string
  companyId?: string
  userId: string
  text: string
  companyName?: string
  segment?: string
  language?: "pt-BR" | "en-US"
}
```

### Saída

```ts
type GeneratedFullStructure = {
  orgChart: GeneratedOrgChart
  processes: GeneratedProcess[]
  suggestedJobPositions?: GeneratedJobPosition[]
  assumptions?: string[]
  warnings?: string[]
}
```

---

## 7.4 Geração de RACI

### Função

```ts
generateRaciFromProcess(input)
```

### Entrada

```ts
type GenerateRaciInput = {
  workspaceId: string
  companyId: string
  processMapId: string
  process: {
    name: string
    steps: {
      id: string
      title: string
      department?: string
      responsibleRole?: string
    }[]
  }
  roles: string[]
}
```

### Saída

```ts
type GeneratedRaciMatrix = {
  name: string
  items: {
    processStepId: string
    roleName: string
    responsibility: "R" | "A" | "C" | "I"
    justification?: string
  }[]
  warnings?: string[]
}
```

---

## 7.5 Geração de descrição de cargo

### Função

```ts
generateJobDescription(input)
```

### Entrada

```ts
type GenerateJobDescriptionInput = {
  workspaceId: string
  companyId: string
  userId: string
  jobTitle: string
  department?: string
  reportsTo?: string
  subordinates?: string[]
  companySegment?: string
}
```

### Saída

```ts
type GeneratedJobDescription = {
  title: string
  department?: string
  mission: string
  responsibilities: string[]
  dailyRoutine?: string[]
  weeklyRoutine?: string[]
  performanceIndicators: string[]
  technicalSkills: string[]
  behavioralSkills: string[]
  reportsTo?: string
  subordinates?: string[]
  internalInterfaces?: string[]
  systemsUsed?: string[]
  notes?: string[]
}
```

---

## 7.6 Geração de POP

### Função

```ts
generateSopFromProcess(input)
```

### Entrada

```ts
type GenerateSopInput = {
  workspaceId: string
  companyId: string
  userId: string
  processName: string
  processDescription?: string
  steps: {
    id: string
    title: string
    description?: string
    department?: string
    responsibleRole?: string
    systemName?: string
    documentName?: string
  }[]
}
```

### Saída

```ts
type GeneratedSop = {
  title: string
  objective: string
  scope: string
  responsibleAreas: string[]
  responsibleRoles: string[]
  requiredSystems?: string[]
  requiredDocuments?: string[]
  procedureSteps: {
    order: number
    title: string
    description: string
    responsibleRole?: string
    controlPoint?: string
  }[]
  risks: string[]
  controlPoints: string[]
  indicators: string[]
  recordsGenerated?: string[]
  revisionHistory: {
    version: number
    date: string
    description: string
  }[]
}
```

---

## 7.7 Diagnóstico de processo

### Função

```ts
diagnoseProcess(input)
```

### Entrada

```ts
type DiagnoseProcessInput = {
  workspaceId: string
  companyId: string
  userId: string
  processName: string
  steps: GeneratedProcessStep[]
  connections: GeneratedProcessConnection[]
}
```

### Saída

```ts
type GeneratedDiagnosis = {
  title: string
  description: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  impactedArea?: string
  recommendation: string
  relatedNodeIds?: string[]
}
```

---

## 7.8 Diagnóstico de organograma

### Função

```ts
diagnoseOrgChart(input)
```

### Entrada

```ts
type DiagnoseOrgChartInput = {
  workspaceId: string
  companyId: string
  userId: string
  organizationName: string
  positions: GeneratedOrgChartPosition[]
  edges: GeneratedOrgChartEdge[]
}
```

### Saída

```ts
type GeneratedDiagnosis = {
  title: string
  description: string
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  impactedArea?: string
  recommendation: string
  relatedNodeIds?: string[]
}
```

---

# 8. Contratos JSON

## 8.1 Organograma gerado

```json
{
  "organizationName": "Empresa de Locação de Equipamentos",
  "description": "Organograma inicial sugerido com base na descrição fornecida.",
  "positions": [
    {
      "id": "pos-1",
      "title": "Diretor Geral",
      "department": "Diretoria",
      "reportsTo": null,
      "level": 1,
      "status": "OCCUPIED",
      "position": {
        "x": 400,
        "y": 50
      }
    },
    {
      "id": "pos-2",
      "title": "Gerente Comercial",
      "department": "Comercial",
      "reportsTo": "pos-1",
      "level": 2,
      "status": "OCCUPIED",
      "position": {
        "x": 100,
        "y": 200
      }
    }
  ],
  "edges": [
    {
      "source": "pos-1",
      "target": "pos-2"
    }
  ],
  "assumptions": [
    "Foi assumido que a empresa possui uma direção centralizada."
  ],
  "warnings": [
    "Revise os cargos antes de usar em documentação oficial."
  ]
}
```

---

## 8.2 Processo gerado

```json
{
  "processName": "Processo de Locação de Equipamentos",
  "description": "Fluxo desde a solicitação do cliente até a devolução do equipamento.",
  "steps": [
    {
      "id": "step-1",
      "type": "START",
      "title": "Cliente solicita orçamento",
      "description": "Cliente entra em contato solicitando locação.",
      "department": "Comercial",
      "responsibleRole": "Vendedor",
      "position": {
        "x": 100,
        "y": 100
      }
    },
    {
      "id": "step-2",
      "type": "ACTIVITY",
      "title": "Consultar disponibilidade",
      "description": "Vendedor verifica disponibilidade do item.",
      "department": "Comercial",
      "responsibleRole": "Vendedor",
      "position": {
        "x": 350,
        "y": 100
      }
    },
    {
      "id": "step-3",
      "type": "DECISION",
      "title": "Equipamento disponível?",
      "description": "Confirma se o equipamento pode ser reservado.",
      "department": "Estoque",
      "responsibleRole": "Estoquista",
      "position": {
        "x": 600,
        "y": 100
      }
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
  ],
  "assumptions": [
    "Foi assumido que o vendedor consulta disponibilidade antes de enviar proposta."
  ],
  "warnings": [
    "Revise as etapas de cobrança e conferência de avarias."
  ]
}
```

---

# 9. Schemas de validação com Zod

## 9.1 Schema para organograma gerado

```ts
import { z } from "zod"

export const generatedOrgChartPositionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  department: z.string().optional(),
  reportsTo: z.string().nullable().optional(),
  level: z.number().int().positive().optional(),
  status: z.enum(["OCCUPIED", "OPEN", "OUTSOURCED", "TEMPORARY", "FUTURE"]).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
})

export const generatedOrgChartEdgeSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
})

export const generatedOrgChartSchema = z.object({
  organizationName: z.string().min(1),
  description: z.string().optional(),
  positions: z.array(generatedOrgChartPositionSchema).min(1),
  edges: z.array(generatedOrgChartEdgeSchema),
  assumptions: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
})
```

---

## 9.2 Schema para processo gerado

```ts
import { z } from "zod"

export const generatedProcessStepSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "START",
    "ACTIVITY",
    "DECISION",
    "DOCUMENT",
    "SYSTEM",
    "APPROVAL",
    "WAIT",
    "END",
  ]),
  title: z.string().min(1),
  description: z.string().optional(),
  department: z.string().optional(),
  responsibleRole: z.string().optional(),
  systemName: z.string().optional(),
  documentName: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
})

export const generatedProcessConnectionSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
})

export const generatedProcessSchema = z.object({
  processName: z.string().min(1),
  description: z.string().optional(),
  steps: z.array(generatedProcessStepSchema).min(1),
  connections: z.array(generatedProcessConnectionSchema),
  assumptions: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
})
```

---

## 9.3 Validações adicionais

Além do Zod, aplicar regras de consistência:

### Organograma

- Todos os `edges.source` devem existir em `positions.id`;
- Todos os `edges.target` devem existir em `positions.id`;
- `source` e `target` não podem ser iguais;
- `reportsTo`, quando preenchido, deve existir em `positions.id`;
- Não permitir ciclo hierárquico.

### Processo

- Todos os `connections.source` devem existir em `steps.id`;
- Todos os `connections.target` devem existir em `steps.id`;
- `source` e `target` não podem ser iguais;
- Recomendar pelo menos um `START`;
- Recomendar pelo menos um `END`.

---

# 10. Prompts-base

## 10.1 Prompt de sistema geral

```txt
Você é um especialista em modelagem organizacional, desenho de organogramas, gestão por processos, BPM, matriz RACI, descrição de cargos, POPs e diagnóstico organizacional.

Sua tarefa é transformar descrições em linguagem natural em estruturas organizacionais e operacionais claras, editáveis e consistentes.

Responda exclusivamente em JSON válido, sem markdown, sem comentários e sem texto fora do JSON.

Use português do Brasil.

Quando houver informações ausentes, faça suposições conservadoras e registre no campo "assumptions".

Quando houver risco de erro ou necessidade de validação humana, registre no campo "warnings".

Não invente nomes de pessoas.
Não crie dados pessoais.
Não inclua informações sensíveis.
```

---

## 10.2 Prompt para gerar organograma

```txt
Transforme a descrição abaixo em um organograma empresarial.

Regras:
1. Retorne apenas JSON válido.
2. Crie cargos, não nomes de pessoas.
3. Identifique departamentos quando possível.
4. Defina hierarquia com o campo "reportsTo".
5. Use IDs simples como "pos-1", "pos-2", "pos-3".
6. Inclua posição visual aproximada em "position".
7. Use status padrão "OCCUPIED" quando não houver indicação de vaga.
8. Não crie cargos excessivos.
9. Prefira uma estrutura enxuta e coerente.
10. Registre suposições em "assumptions".
11. Registre alertas em "warnings".

Formato obrigatório:
{
  "organizationName": string,
  "description": string,
  "positions": [
    {
      "id": string,
      "title": string,
      "department": string,
      "reportsTo": string | null,
      "level": number,
      "status": "OCCUPIED" | "OPEN" | "OUTSOURCED" | "TEMPORARY" | "FUTURE",
      "position": {
        "x": number,
        "y": number
      }
    }
  ],
  "edges": [
    {
      "source": string,
      "target": string
    }
  ],
  "assumptions": string[],
  "warnings": string[]
}

Descrição do usuário:
{{USER_TEXT}}
```

---

## 10.3 Prompt para gerar processo

```txt
Transforme a descrição abaixo em um fluxo de processo empresarial.

Regras:
1. Retorne apenas JSON válido.
2. Crie etapas claras e sequenciais.
3. Use tipos de etapa permitidos:
   - START
   - ACTIVITY
   - DECISION
   - DOCUMENT
   - SYSTEM
   - APPROVAL
   - WAIT
   - END
4. Use IDs simples como "step-1", "step-2", "step-3".
5. Inclua área responsável e cargo responsável quando possível.
6. Crie conexões entre as etapas.
7. Use decisões quando houver condição.
8. Não crie processos excessivamente longos.
9. Registre suposições em "assumptions".
10. Registre alertas em "warnings".
11. Inclua posição visual aproximada em "position".

Formato obrigatório:
{
  "processName": string,
  "description": string,
  "steps": [
    {
      "id": string,
      "type": "START" | "ACTIVITY" | "DECISION" | "DOCUMENT" | "SYSTEM" | "APPROVAL" | "WAIT" | "END",
      "title": string,
      "description": string,
      "department": string,
      "responsibleRole": string,
      "systemName": string,
      "documentName": string,
      "position": {
        "x": number,
        "y": number
      }
    }
  ],
  "connections": [
    {
      "source": string,
      "target": string,
      "label": string
    }
  ],
  "assumptions": string[],
  "warnings": string[]
}

Descrição do usuário:
{{USER_TEXT}}
```

---

## 10.4 Prompt para gerar estrutura completa

```txt
Transforme a descrição abaixo em uma estrutura empresarial inicial contendo:
1. Um organograma sugerido;
2. Um ou mais processos principais;
3. Lista de cargos sugeridos;
4. Suposições;
5. Alertas.

Responda apenas em JSON válido.

Formato obrigatório:
{
  "orgChart": {
    "organizationName": string,
    "description": string,
    "positions": [],
    "edges": [],
    "assumptions": [],
    "warnings": []
  },
  "processes": [
    {
      "processName": string,
      "description": string,
      "steps": [],
      "connections": [],
      "assumptions": [],
      "warnings": []
    }
  ],
  "suggestedJobPositions": [
    {
      "title": string,
      "department": string,
      "mission": string
    }
  ],
  "assumptions": string[],
  "warnings": string[]
}

Descrição do usuário:
{{USER_TEXT}}
```

---

## 10.5 Prompt para gerar RACI

```txt
Com base no processo informado, gere uma matriz RACI.

Regras:
1. Use apenas os papéis R, A, C e I.
2. Cada etapa deve ter pelo menos um R.
3. Cada etapa deve ter preferencialmente apenas um A.
4. Não invente cargos fora da lista fornecida, salvo se necessário. Se inventar, registre em warnings.
5. Responda apenas em JSON válido.

Formato:
{
  "name": string,
  "items": [
    {
      "processStepId": string,
      "roleName": string,
      "responsibility": "R" | "A" | "C" | "I",
      "justification": string
    }
  ],
  "warnings": string[]
}

Processo:
{{PROCESS_JSON}}

Cargos/áreas disponíveis:
{{ROLES_JSON}}
```

---

## 10.6 Prompt para gerar descrição de cargo

```txt
Gere uma descrição de cargo profissional com base nas informações abaixo.

Responda apenas em JSON válido.

Formato:
{
  "title": string,
  "department": string,
  "mission": string,
  "responsibilities": string[],
  "dailyRoutine": string[],
  "weeklyRoutine": string[],
  "performanceIndicators": string[],
  "technicalSkills": string[],
  "behavioralSkills": string[],
  "reportsTo": string,
  "subordinates": string[],
  "internalInterfaces": string[],
  "systemsUsed": string[],
  "notes": string[]
}

Informações:
{{JOB_CONTEXT}}
```

---

## 10.7 Prompt para gerar POP

```txt
Gere um Procedimento Operacional Padrão com base no processo abaixo.

Regras:
1. Use linguagem clara, objetiva e operacional.
2. Não invente normas legais.
3. Quando faltar informação, registre como ponto a validar.
4. Responda apenas em JSON válido.

Formato:
{
  "title": string,
  "objective": string,
  "scope": string,
  "responsibleAreas": string[],
  "responsibleRoles": string[],
  "requiredSystems": string[],
  "requiredDocuments": string[],
  "procedureSteps": [
    {
      "order": number,
      "title": string,
      "description": string,
      "responsibleRole": string,
      "controlPoint": string
    }
  ],
  "risks": string[],
  "controlPoints": string[],
  "indicators": string[],
  "recordsGenerated": string[],
  "revisionHistory": [
    {
      "version": number,
      "date": string,
      "description": string
    }
  ]
}

Processo:
{{PROCESS_JSON}}
```

---

## 10.8 Prompt para diagnóstico de processo

```txt
Analise o processo abaixo e identifique gargalos, riscos e oportunidades de melhoria.

Avalie:
- Etapas sem responsável;
- Excesso de aprovações;
- Falta de indicadores;
- Falta de documentos;
- Falta de conferência;
- Duplicidade de atividades;
- Risco de retrabalho;
- Falha de comunicação;
- Dependência excessiva de uma área ou pessoa.

Responda apenas em JSON válido.

Formato:
{
  "diagnoses": [
    {
      "title": string,
      "description": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "impactedArea": string,
      "recommendation": string,
      "relatedNodeIds": string[]
    }
  ]
}

Processo:
{{PROCESS_JSON}}
```

---

## 10.9 Prompt para diagnóstico de organograma

```txt
Analise o organograma abaixo e identifique riscos estruturais e oportunidades de melhoria.

Avalie:
- Cargos sem superior;
- Excesso de subordinados diretos;
- Departamentos sem gestor;
- Duplicidade de cargos;
- Funções críticas concentradas;
- Falta de áreas essenciais;
- Estrutura muito verticalizada;
- Estrutura muito informal.

Responda apenas em JSON válido.

Formato:
{
  "diagnoses": [
    {
      "title": string,
      "description": string,
      "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
      "impactedArea": string,
      "recommendation": string,
      "relatedNodeIds": string[]
    }
  ]
}

Organograma:
{{ORGCHART_JSON}}
```

---

# 11. Tratamento de erros

## 11.1 Erros possíveis

| Código | Descrição |
|---|---|
| AI_PROVIDER_NOT_CONFIGURED | Provider não configurado |
| AI_INVALID_INPUT | Entrada inválida |
| AI_EMPTY_RESPONSE | Resposta vazia |
| AI_INVALID_JSON | Resposta não é JSON válido |
| AI_SCHEMA_VALIDATION_ERROR | JSON não passou na validação |
| AI_PROVIDER_ERROR | Erro retornado pelo provider |
| AI_TIMEOUT | Tempo limite excedido |
| AI_RATE_LIMIT | Limite de requisições atingido |
| AI_UNKNOWN_ERROR | Erro inesperado |

---

## 11.2 Estratégia de fallback

Quando provider real falhar:

1. Registrar erro;
2. Exibir mensagem amigável;
3. Permitir nova tentativa;
4. Se configurado, usar provider mock apenas em ambiente de desenvolvimento;
5. Nunca salvar saída inválida como projeto.

---

## 11.3 Mensagens amigáveis

Evitar:

```txt
SyntaxError: Unexpected token at position 303
```

Preferir:

```txt
Não foi possível interpretar a resposta da IA. Tente gerar novamente ou simplifique a descrição.
```

---

# 12. Logs de IA

## 12.1 O que registrar

Toda geração deve registrar em `AiGenerationLog`:

- `workspaceId`;
- `companyId`;
- `userId`;
- `type`;
- `provider`;
- `model`;
- `inputText`;
- `outputJson`;
- `outputText`;
- `status`;
- `errorMessage`;
- `promptTokens`;
- `completionTokens`;
- `totalCost`;
- `createdAt`.

---

## 12.2 Status

```txt
PENDING
SUCCESS
ERROR
```

---

## 12.3 Cuidados com logs

Evitar registrar:

- Senhas;
- Tokens;
- Chaves;
- Dados bancários;
- Dados pessoais desnecessários;
- Informações médicas ou sensíveis não relacionadas ao processo.

---

# 13. Custos e limites

## 13.1 MVP

No MVP, custo de IA deve ser zero usando provider mock.

---

## 13.2 Pós-MVP

Quando usar IA real, controlar:

- Tokens por geração;
- Custo por workspace;
- Custo por usuário;
- Limite por plano;
- Histórico de consumo.

---

## 13.3 Limites sugeridos por plano

| Plano | Gerações de IA/mês |
|---|---:|
| Free | 5 |
| Pro | 100 |
| Consultor | 500 |
| Business | 2.000 |
| Enterprise | Sob contrato |

---

## 13.4 Estratégias para reduzir custo

- Limitar tamanho do texto de entrada;
- Resumir contexto antes de enviar;
- Usar templates;
- Usar modelos menores para tarefas simples;
- Cachear resultados;
- Não reenviar dados completos desnecessariamente;
- Processar diagnóstico parcialmente por regras internas.

---

# 14. Segurança e privacidade

## 14.1 Dados enviados à IA

Enviar apenas o necessário.

Exemplo para organograma:

```txt
Nome da empresa, segmento e descrição textual.
```

Não enviar:

```txt
Dados financeiros, senhas, documentos pessoais, tokens, informações bancárias.
```

---

## 14.2 Aviso ao usuário

A interface deve deixar claro que:

```txt
O conteúdo gerado pela IA deve ser revisado antes de uso oficial.
```

---

## 14.3 LGPD

A aplicação deve considerar:

- Finalidade do tratamento;
- Minimização de dados;
- Controle de acesso;
- Exclusão futura;
- Logs seguros;
- Política de privacidade.

---

# 15. Conversão de IA para banco

## 15.1 Organograma

Fluxo:

```txt
GeneratedOrgChart
  ↓
validateGeneratedOrgChart()
  ↓
createOrgChart()
  ↓
create OrgChartNodes
  ↓
create OrgChartEdges
  ↓
open editor
```

### Mapeamento

| JSON | Banco |
|---|---|
| organizationName | OrgChart.name |
| positions[].title | OrgChartNode.title |
| positions[].department | OrgChartNode.department |
| positions[].status | OrgChartNode.status |
| positions[].reportsTo | OrgChartNode.reportsToNodeId |
| positions[].position.x | OrgChartNode.positionX |
| positions[].position.y | OrgChartNode.positionY |
| edges[].source | OrgChartEdge.sourceNodeId |
| edges[].target | OrgChartEdge.targetNodeId |

---

## 15.2 Processo

Fluxo:

```txt
GeneratedProcess
  ↓
validateGeneratedProcess()
  ↓
createProcessMap()
  ↓
create ProcessNodes
  ↓
create ProcessEdges
  ↓
open editor
```

### Mapeamento

| JSON | Banco |
|---|---|
| processName | ProcessMap.name |
| description | ProcessMap.description |
| steps[].type | ProcessNode.type |
| steps[].title | ProcessNode.title |
| steps[].description | ProcessNode.description |
| steps[].department | ProcessNode.department |
| steps[].responsibleRole | ProcessNode.responsibleRole |
| steps[].position.x | ProcessNode.positionX |
| steps[].position.y | ProcessNode.positionY |
| connections[].source | ProcessEdge.sourceNodeId |
| connections[].target | ProcessEdge.targetNodeId |
| connections[].label | ProcessEdge.label |

---

# 16. Regras de layout automático

Quando a IA não retornar posição visual, o sistema deve gerar layout automaticamente.

## 16.1 Organograma

Regras simples:

- Nível 1 no topo;
- Nível 2 abaixo;
- Nível 3 abaixo;
- Espaçamento horizontal entre irmãos;
- Espaçamento vertical entre níveis.

Exemplo:

```ts
const levelGap = 180
const nodeGap = 280
```

---

## 16.2 Processo

Regras simples:

- Etapas em linha horizontal;
- Decisões podem abrir ramificações verticais;
- Espaçamento horizontal entre etapas;
- Usar `x` crescente.

Exemplo:

```ts
const stepGapX = 260
const stepGapY = 160
```

---

# 17. Mock provider

## 17.1 Objetivo

O mock provider deve simular a IA real para permitir:

- Testar fluxo de criação;
- Testar preview;
- Testar salvamento;
- Testar logs;
- Testar erros;
- Fazer demonstração do produto.

---

## 17.2 Respostas mockadas mínimas

Criar mocks para:

- Empresa de locação;
- Clínica médica;
- Construtora;
- Escritório contábil;
- Distribuidora.

---

## 17.3 Exemplo de regra mock

```ts
if (text.toLowerCase().includes("locação")) {
  return rentalCompanyMock
}

if (text.toLowerCase().includes("clínica")) {
  return medicalClinicMock
}

return genericCompanyMock
```

---

## 17.4 Simulação de erro

Permitir simular erro quando o texto contiver:

```txt
simulate_ai_error
```

Isso ajuda a testar estados de erro.

---

# 18. Testes da IA

## 18.1 Testes unitários

Testar:

- Geração mockada de organograma;
- Geração mockada de processo;
- Validação de JSON;
- Erro de JSON inválido;
- Mapeamento para banco;
- Registro de log;
- Fallback.

---

## 18.2 Casos de teste

### Caso 1 — Organograma válido

Entrada:

```txt
Empresa com diretor, gerente comercial e financeiro.
```

Esperado:

- Retorna `positions`;
- Pelo menos um cargo com `reportsTo: null`;
- Edges válidos.

---

### Caso 2 — Processo válido

Entrada:

```txt
Cliente pede orçamento, vendedor envia proposta, cliente aprova e financeiro cobra.
```

Esperado:

- Retorna steps;
- Pelo menos uma etapa START;
- Conexões válidas.

---

### Caso 3 — Texto vazio

Entrada:

```txt

```

Esperado:

- Bloquear antes de chamar provider;
- Retornar erro `AI_INVALID_INPUT`.

---

### Caso 4 — JSON inválido

Provider retorna texto inválido.

Esperado:

- Registrar erro;
- Não salvar projeto;
- Exibir mensagem amigável.

---

# 19. Métricas de IA

## 19.1 Métricas de produto

Acompanhar:

- Quantidade de gerações iniciadas;
- Quantidade de gerações concluídas;
- Taxa de erro;
- Quantidade de resultados salvos;
- Quantidade de resultados editados;
- Quantidade de exportações após geração;
- Tipo de geração mais usado.

---

## 19.2 Métricas técnicas

Acompanhar:

- Tempo médio de resposta;
- Tokens usados;
- Custo por geração;
- Custo por workspace;
- Erros por provider;
- Erros de validação de schema.

---

# 20. Critérios de aceite da IA no MVP

A IA do MVP será considerada pronta quando:

- Existir `aiService`;
- Existir provider mock;
- Usuário conseguir gerar organograma mockado;
- Usuário conseguir gerar processo mockado;
- Usuário conseguir gerar estrutura completa mockada;
- Respostas forem validadas com Zod;
- Logs forem registrados;
- Resultados puderem ser salvos como projetos;
- Resultados puderem ser editados no canvas;
- Erros forem tratados com mensagem amigável.

---

# 21. Dívidas técnicas aceitáveis no MVP

Aceitável:

- Mock em vez de IA real;
- Prompts ainda não otimizados;
- Sem controle de custo real;
- Sem streaming;
- Sem assistente conversacional;
- Sem imagem para diagrama;
- Sem OCR;
- Sem ajuste fino por segmento.

---

# 22. Dívidas técnicas não aceitáveis

Não aceitar:

- Front-end chamar API externa diretamente;
- Salvar resposta sem validação;
- Salvar JSON inválido;
- Não registrar logs;
- Expor chave de IA no client;
- Misturar dados entre workspaces;
- Usar IA para tomar decisão irreversível sem revisão do usuário.

---

# 23. Roadmap de IA

## Fase 1 — MVP mockado

- Provider mock;
- Organograma de texto;
- Processo de texto;
- Estrutura completa;
- Logs;
- Validação.

## Fase 2 — IA real

- OpenAI, Anthropic ou Gemini;
- Prompts otimizados;
- Retry;
- Fallback;
- Custos;
- Limites por plano.

## Fase 3 — Documentos inteligentes

- RACI;
- Descrição de cargo;
- POP;
- Diagnóstico;
- Relatórios.

## Fase 4 — Entrada multimodal

- Imagem para diagrama;
- PDF para processo;
- Áudio para processo;
- Transcrição de reunião para fluxo.

## Fase 5 — Assistente organizacional

- Chat contextual por projeto;
- Sugestões contínuas;
- Comparação de versões;
- Recomendações por segmento;
- Benchmark.

---

# 24. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
screen-map.md
```

Esse documento deve detalhar todas as telas, rotas, objetivos, componentes, ações e permissões.
