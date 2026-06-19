# Diagramados

**Diagramados** é uma plataforma SaaS para criação, edição e documentação de **organogramas**, **fluxos de processos**, **matrizes RACI**, **descrições de cargos**, **POPs** e **diagnósticos organizacionais** com apoio de inteligência artificial.

O objetivo do produto é ajudar consultores, empresas, RHs e gestores de processos a transformar informações soltas sobre estrutura e operação em documentos visuais, claros e acionáveis.

---

## Visão geral

O Diagramados não é apenas um editor de caixas e setas.

A proposta é permitir que o usuário descreva uma empresa, setor ou processo em linguagem natural e o sistema gere automaticamente:

- Organograma sugerido;
- Fluxo de processo;
- Matriz RACI;
- Descrições de cargos;
- Procedimento Operacional Padrão;
- Diagnóstico de gargalos;
- Sugestões de melhoria organizacional.

Exemplo de entrada:

> Tenho uma empresa de locação de equipamentos com comercial, financeiro, estoque, logística e manutenção. O cliente pede orçamento pelo WhatsApp, o vendedor consulta disponibilidade, envia proposta, recebe sinal, agenda entrega, a logística entrega o equipamento, depois recolhe, o estoque confere e o financeiro cobra saldo ou avarias.

O sistema deve transformar esse texto em estrutura visual e documentação operacional.

---

## Público-alvo

O sistema é voltado para:

- Consultores empresariais;
- Pequenas e médias empresas;
- Gestores de RH;
- Analistas de processos;
- Empresas familiares;
- Clínicas;
- Construtoras;
- Distribuidoras;
- Empresas de locação;
- Escritórios contábeis;
- Indústrias pequenas;
- Restaurantes;
- Lojas e varejos.

---

## Funcionalidades principais

### Empresas e clientes

- Cadastro de empresas/clientes;
- Gestão por workspace;
- Organização de projetos por cliente;
- Suporte futuro para multiusuários e permissões.

### Organogramas

- Criação manual de organogramas;
- Criação de organogramas com IA;
- Cadastro de cargos;
- Definição de hierarquia;
- Edição visual com drag and drop;
- Versão atual e versão proposta;
- Exportação em PNG, SVG e PDF.

### Fluxos de processos

- Criação manual de processos;
- Criação de processos com IA;
- Editor visual com etapas conectadas;
- Suporte a atividades, decisões, documentos, aprovações e sistemas;
- Swimlanes por área ou departamento;
- Exportação em PNG, SVG e PDF.

### IA

- Gerar organograma a partir de texto;
- Gerar fluxo de processo a partir de texto;
- Gerar matriz RACI;
- Gerar descrição de cargos;
- Gerar POP;
- Diagnosticar gargalos;
- Sugerir melhorias.

### Matriz RACI

- Relacionamento entre etapas e cargos;
- Classificação por:
  - R — Responsible;
  - A — Accountable;
  - C — Consulted;
  - I — Informed.

### Descrição de cargos

- Missão do cargo;
- Responsabilidades;
- Indicadores;
- Competências técnicas;
- Competências comportamentais;
- Superior imediato;
- Subordinados;
- Interfaces internas;
- Rotinas diárias e semanais.

### POPs

- Objetivo;
- Escopo;
- Responsáveis;
- Documentos e sistemas utilizados;
- Passo a passo;
- Riscos;
- Pontos de controle;
- Indicadores;
- Histórico de revisão.

### Diagnóstico organizacional

- Identificação de gargalos;
- Falta de responsáveis;
- Duplicidade de atividades;
- Excesso de aprovações;
- Falta de indicadores;
- Risco de retrabalho;
- Falha de comunicação;
- Sugestões de melhoria.

---

## Stack técnica

A stack sugerida para o projeto é:

- **Front-end:** Next.js com App Router;
- **Linguagem:** TypeScript;
- **Estilização:** Tailwind CSS;
- **Componentes UI:** shadcn/ui;
- **Editor visual:** React Flow;
- **Banco de dados:** PostgreSQL;
- **ORM:** Prisma;
- **Autenticação:** NextAuth, Clerk ou Supabase Auth;
- **Storage:** Supabase Storage ou AWS S3;
- **IA:** OpenAI, Anthropic ou Gemini;
- **Exportação:** PNG, SVG, PDF, futuramente DOCX e PPTX;
- **Deploy:** Vercel.

---

## Estrutura sugerida de pastas

```txt
/src
  /app
    /(auth)
      /login
      /register

    /(dashboard)
      /dashboard
      /companies
      /orgcharts
      /processes
      /ai-create
      /jobs
      /pops
      /diagnostics
      /templates
      /settings

  /components
    /ui
    /layout
    /dashboard
    /companies
    /orgchart
    /process
    /ai
    /forms
    /tables
    /exports

  /lib
    auth.ts
    prisma.ts
    utils.ts
    validations.ts

  /services
    ai-service.ts
    export-service.ts
    orgchart-service.ts
    process-service.ts
    raci-service.ts
    pop-service.ts
    diagnosis-service.ts
    template-service.ts

  /types
    orgchart.ts
    process.ts
    raci.ts
    pop.ts
    diagnosis.ts
    template.ts
    user.ts

  /data
    /templates

  /prisma
    schema.prisma
```

---

## Módulos do MVP

O MVP deve priorizar as seguintes funcionalidades:

1. Autenticação de usuário;
2. Cadastro de empresas/clientes;
3. Dashboard inicial;
4. Editor visual de organogramas;
5. Editor visual de processos;
6. Criação com IA usando respostas mockadas;
7. Templates básicos por segmento;
8. Exportação básica em PNG e PDF;
9. Salvamento dos projetos no banco de dados.

---

## Fora do escopo inicial

As funcionalidades abaixo ficam para versões futuras:

- Edição colaborativa em tempo real;
- Integração com Microsoft 365;
- Integração com Google Workspace;
- Importação automática de organogramas via RH;
- Conversão de imagem para diagrama;
- Conversão de áudio para processo;
- Exportação avançada em PPTX;
- Exportação avançada em DOCX;
- Integração com sistemas ERP;
- Marketplace de templates;
- White label para consultorias.

---

## Modelos principais do banco

Entidades previstas:

- User;
- Workspace;
- ClientCompany;
- OrgChart;
- OrgChartNode;
- ProcessMap;
- ProcessNode;
- ProcessEdge;
- JobPosition;
- JobDescription;
- RaciMatrix;
- RaciMatrixItem;
- StandardOperatingProcedure;
- Diagnosis;
- Template;
- TemplateCategory;
- ExportHistory;
- AiGenerationLog.

---

## Permissões previstas

Papéis iniciais:

| Papel | Descrição |
|---|---|
| Owner | Dono do workspace, possui acesso total |
| Admin | Gerencia usuários, empresas e conteúdos |
| Editor | Cria e edita organogramas, processos e documentos |
| Viewer | Apenas visualiza conteúdos |
| ClientViewer | Visualiza apenas projetos liberados |

---

## Fluxo principal de uso

1. Usuário cria uma conta;
2. Usuário cria ou acessa um workspace;
3. Usuário cadastra uma empresa ou cliente;
4. Usuário cria um organograma ou processo;
5. Usuário pode criar manualmente ou usar IA;
6. Sistema gera uma estrutura visual editável;
7. Usuário ajusta os dados;
8. Usuário gera RACI, POP ou diagnóstico;
9. Usuário exporta o material.

---

## Instalação local

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/diagramados.git
cd diagramados
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```bash
http://localhost:3000
```

---

## Variáveis de ambiente

Exemplo de `.env`:

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
```

---

## Scripts principais

```bash
npm run dev
```

Executa o projeto em ambiente de desenvolvimento.

```bash
npm run build
```

Gera a build de produção.

```bash
npm run start
```

Executa a aplicação em produção.

```bash
npm run lint
```

Executa a análise de lint.

```bash
npx prisma studio
```

Abre o Prisma Studio para visualizar e editar dados.

```bash
npx prisma migrate dev
```

Executa migrations em ambiente de desenvolvimento.

---

## Serviço de IA

A aplicação deve utilizar um serviço centralizado chamado `aiService`.

Funções previstas:

```ts
generateOrgChartFromText(text: string)
generateProcessFromText(text: string)
generateRaciFromProcess(processId: string)
generateJobDescription(positionId: string)
generatePopFromProcess(processId: string)
diagnoseProcess(processId: string)
diagnoseOrgChart(orgChartId: string)
```

No MVP, o serviço pode operar em modo mock:

```env
AI_PROVIDER="mock"
```

Isso permite desenvolver e testar a aplicação sem depender inicialmente de uma API paga de IA.

---

## Exemplo de saída esperada da IA

### Organograma

```json
{
  "organizationName": "Empresa Exemplo",
  "positions": [
    {
      "id": "pos-1",
      "title": "Diretor Geral",
      "department": "Diretoria",
      "reportsTo": null,
      "level": 1
    },
    {
      "id": "pos-2",
      "title": "Gerente Comercial",
      "department": "Comercial",
      "reportsTo": "pos-1",
      "level": 2
    }
  ]
}
```

### Processo

```json
{
  "processName": "Processo de Atendimento Comercial",
  "description": "Fluxo desde a solicitação do cliente até o envio da proposta.",
  "steps": [
    {
      "id": "step-1",
      "type": "start",
      "title": "Cliente solicita orçamento",
      "department": "Comercial",
      "responsibleRole": "Vendedor"
    },
    {
      "id": "step-2",
      "type": "activity",
      "title": "Registrar solicitação",
      "department": "Comercial",
      "responsibleRole": "Vendedor"
    }
  ],
  "connections": [
    {
      "source": "step-1",
      "target": "step-2"
    }
  ]
}
```

---

## Templates iniciais

Segmentos previstos para templates:

1. Empresa de locação de equipamentos;
2. Clínica médica;
3. Construtora;
4. Escritório contábil;
5. Distribuidora;
6. Restaurante;
7. Loja de moda;
8. Consultoria empresarial;
9. Indústria pequena;
10. Imobiliária.

Cada template deve conter:

- Organograma base;
- Processos principais;
- Cargos sugeridos;
- Indicadores recomendados;
- POPs sugeridos;
- Gargalos comuns.

---

## Critérios de aceite do MVP

O MVP será considerado funcional quando:

- O usuário conseguir criar uma conta;
- O usuário conseguir cadastrar uma empresa;
- O usuário conseguir criar um organograma manualmente;
- O usuário conseguir criar um processo manualmente;
- O usuário conseguir gerar um organograma mockado com IA;
- O usuário conseguir gerar um processo mockado com IA;
- O usuário conseguir editar nós e conexões no canvas;
- O usuário conseguir salvar os dados no banco;
- O usuário conseguir exportar organograma ou processo em PNG;
- O sistema respeitar separação de dados por workspace.

---

## Roadmap

### Fase 1 — MVP

- Autenticação;
- Empresas;
- Organogramas;
- Processos;
- IA mockada;
- Templates;
- Exportação básica.

### Fase 2 — Gestão organizacional

- RACI;
- POP;
- Descrição de cargos;
- Diagnóstico de gargalos;
- Histórico de versões.

### Fase 3 — SaaS comercial

- Planos;
- Pagamentos;
- Permissões avançadas;
- Área do cliente;
- Limites por plano.

### Fase 4 — IA avançada

- Geração com IA real;
- Imagem para diagrama;
- PDF para processo;
- Áudio para processo;
- Sugestões comparativas por segmento.

### Fase 5 — Escala

- Colaboração em tempo real;
- White label;
- Marketplace de templates;
- Integrações externas;
- API pública.

---

## Boas práticas de desenvolvimento

- Manter código modular;
- Evitar componentes gigantes;
- Separar regra de negócio da interface;
- Usar TypeScript de forma rigorosa;
- Validar formulários com Zod;
- Proteger rotas privadas;
- Isolar dados por workspace;
- Registrar logs de geração por IA;
- Criar estados de loading, erro e vazio;
- Priorizar usabilidade em desktop.

---

## Documentação complementar

Documentos recomendados:

- `prd.md`;
- `mvp-scope.md`;
- `functional-requirements.md`;
- `non-functional-requirements.md`;
- `user-stories.md`;
- `user-flows.md`;
- `data-model.md`;
- `technical-architecture.md`;
- `ai-specification.md`;
- `screen-map.md`;
- `api-routes.md`;
- `permissions-matrix.md`;
- `templates-spec.md`;
- `export-specification.md`;
- `roadmap.md`;
- `testing-plan.md`.

---

## Status do projeto

Status atual:

```txt
Planejamento inicial
```

Próximo passo recomendado:

```txt
Definir escopo fechado do MVP e iniciar implementação da base técnica.
```

---

## Licença

A definir.

---

## Autor

Projeto idealizado para criação de uma plataforma SaaS de gestão visual organizacional com IA.
