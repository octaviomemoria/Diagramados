# MVP Scope — Diagramados

**Documento:** Escopo do MVP  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento define o escopo do MVP — Minimum Viable Product — do **Diagramados**, delimitando claramente:

- O que será implementado na primeira versão;
- O que ficará fora do escopo inicial;
- Quais funcionalidades são obrigatórias;
- Quais funcionalidades são opcionais;
- Quais critérios devem ser atendidos para considerar o MVP funcional;
- Qual deve ser a ordem recomendada de implementação.

O objetivo principal é evitar expansão descontrolada do escopo e permitir que o produto seja desenvolvido de forma objetiva, validável e comercialmente testável.

---

## 2. Visão resumida do produto

O **Diagramados** é uma plataforma SaaS para criação, edição e documentação de:

- Organogramas;
- Fluxos de processos;
- Matrizes RACI;
- Descrições de cargos;
- Procedimentos Operacionais Padrão;
- Diagnósticos organizacionais.

A proposta do produto é permitir que consultores, empresas e gestores transformem informações desestruturadas sobre estrutura organizacional e processos em diagramas visuais e documentos gerenciais.

No MVP, o foco será criar uma base funcional para:

1. Cadastrar empresas/clientes;
2. Criar organogramas;
3. Criar fluxos de processos;
4. Gerar estruturas simuladas com IA mockada;
5. Editar visualmente os diagramas;
6. Salvar os dados;
7. Exportar materiais básicos.

---

## 3. Objetivo do MVP

O MVP tem como objetivo validar se o público-alvo percebe valor em uma ferramenta que permite criar organogramas e fluxos de processos de forma mais rápida, organizada e visual.

A primeira versão deve responder às seguintes perguntas:

1. Consultores e gestores querem usar a ferramenta para estruturar empresas e processos?
2. A criação visual de organogramas e fluxos resolve uma dor real?
3. A geração com IA, mesmo inicialmente mockada, melhora a percepção de valor?
4. A exportação dos materiais gera utilidade prática para apresentações e entregas?
5. O produto tem potencial para evoluir para uma plataforma paga?

---

## 4. Público-alvo do MVP

O MVP será direcionado principalmente para:

### 4.1 Consultores empresariais

Profissionais que precisam criar entregáveis para clientes, como:

- Organogramas;
- Fluxos de processos;
- Diagnósticos organizacionais;
- Descrições de cargos;
- POPs;
- Apresentações de estruturação empresarial.

### 4.2 Pequenas e médias empresas

Empresas que precisam organizar estrutura e operação, principalmente:

- Empresas familiares;
- Empresas de locação;
- Clínicas;
- Construtoras;
- Distribuidoras;
- Escritórios contábeis;
- Lojas;
- Indústrias pequenas.

### 4.3 Gestores internos

Usuários que atuam em:

- RH;
- Operações;
- Processos;
- Administração;
- Qualidade;
- Financeiro;
- Comercial.

---

## 5. Princípio central do MVP

O MVP não deve tentar ser uma cópia completa de ferramentas como Miro, Lucidchart, Visio ou Canva.

O foco não será criar um canvas genérico infinito.

O foco será entregar uma experiência objetiva para:

> Criar estruturas organizacionais e fluxos de processos com rapidez, clareza e capacidade de gerar documentação gerencial.

A regra é simples:

**Menos ferramenta genérica de desenho. Mais ferramenta de gestão organizacional.**

---

## 6. Funcionalidades dentro do escopo do MVP

### 6.1 Autenticação básica

O sistema deve permitir que o usuário:

- Crie uma conta;
- Faça login;
- Faça logout;
- Acesse uma área autenticada;
- Tenha seus dados isolados dos demais usuários.

#### Requisitos mínimos

- Login por e-mail e senha;
- Sessão autenticada;
- Proteção de rotas privadas;
- Redirecionamento para dashboard após login;
- Redirecionamento para login quando não autenticado.

#### Fora do MVP

- Login social;
- SSO;
- Autenticação multifator;
- Recuperação avançada de senha;
- Convite de usuários por e-mail.

---

### 6.2 Workspace inicial

O sistema deve criar ou associar o usuário a um workspace.

O workspace representa o ambiente de trabalho do usuário ou da consultoria.

#### Requisitos mínimos

- Cada usuário deve possuir pelo menos um workspace;
- Os dados devem estar vinculados ao workspace;
- O sistema deve estar preparado para multi-tenant.

#### Fora do MVP

- Múltiplos workspaces por usuário;
- Transferência de propriedade;
- Equipes completas;
- Cobrança por workspace;
- Permissões avançadas por workspace.

---

### 6.3 Cadastro de empresas/clientes

O sistema deve permitir cadastrar empresas ou clientes.

Esse módulo é essencial porque o usuário poderá organizar organogramas e processos por empresa.

#### Campos mínimos

- Nome da empresa;
- Segmento;
- Porte;
- Número aproximado de colaboradores;
- Observações;
- Data de criação;
- Data de atualização.

#### Campos opcionais

- CNPJ;
- Logo;
- Site;
- Cidade;
- Estado;
- Nome do responsável;
- E-mail do responsável;
- Telefone do responsável.

#### Funcionalidades

- Criar empresa;
- Editar empresa;
- Listar empresas;
- Visualizar detalhes da empresa;
- Excluir empresa;
- Filtrar por nome;
- Filtrar por segmento.

#### Fora do MVP

- Importação em massa de empresas;
- Integração com Receita Federal;
- Enriquecimento automático de dados;
- Histórico completo de alterações da empresa.

---

### 6.4 Dashboard

O sistema deve possuir um dashboard inicial simples.

#### Informações exibidas

- Total de empresas cadastradas;
- Total de organogramas;
- Total de processos;
- Últimos projetos editados;
- Atalhos para ações principais.

#### Ações principais

- Criar empresa;
- Criar organograma;
- Criar processo;
- Criar com IA;
- Acessar templates.

#### Fora do MVP

- Gráficos avançados;
- Indicadores financeiros;
- Métricas de uso;
- Painel administrativo completo;
- Analytics avançado.

---

### 6.5 Criador de organogramas

O sistema deve permitir criar e editar organogramas visualmente.

#### Funcionalidades obrigatórias

- Criar novo organograma vinculado a uma empresa;
- Adicionar cargo ao organograma;
- Editar cargo;
- Excluir cargo;
- Definir superior imediato;
- Criar conexão hierárquica entre cargos;
- Arrastar e reposicionar cargos no canvas;
- Salvar organograma;
- Reabrir organograma salvo;
- Duplicar organograma;
- Excluir organograma.

#### Dados mínimos de cada cargo

- Nome do cargo;
- Departamento;
- Nome do ocupante;
- Superior imediato;
- Status do cargo;
- Observações.

#### Status possíveis

- Ocupado;
- Vaga aberta;
- Terceirizado;
- Temporário;
- Futuro.

#### Visualização

- Canvas com React Flow;
- Card visual para cada cargo;
- Diferenciação visual por departamento ou status;
- Painel lateral para edição dos dados do cargo;
- Controles de zoom e movimentação.

#### Exportação

- Exportar organograma em PNG;
- Preparar estrutura para PDF e SVG.

#### Fora do MVP

- Comparação entre organograma atual e proposto;
- Cálculo de custo mensal da estrutura;
- Fotos dos ocupantes;
- Histórico de versões;
- Comentários por cargo;
- Aprovação de organograma;
- Integração com sistemas de RH.

---

### 6.6 Criador de fluxos de processos

O sistema deve permitir criar e editar fluxos de processos visualmente.

#### Funcionalidades obrigatórias

- Criar novo processo vinculado a uma empresa;
- Adicionar etapa;
- Editar etapa;
- Excluir etapa;
- Conectar etapas;
- Criar decisões;
- Arrastar e reposicionar etapas;
- Salvar processo;
- Reabrir processo salvo;
- Duplicar processo;
- Excluir processo.

#### Tipos de etapa

- Início;
- Atividade;
- Decisão;
- Documento;
- Sistema;
- Aprovação;
- Espera;
- Fim.

#### Dados mínimos de cada etapa

- Nome da etapa;
- Descrição;
- Área responsável;
- Cargo responsável;
- Tipo da etapa;
- Observações.

#### Dados opcionais

- Sistema utilizado;
- Documento gerado;
- Tempo estimado;
- Risco;
- Indicador relacionado.

#### Visualização

- Canvas com React Flow;
- Cards por tipo de etapa;
- Conexões direcionais;
- Painel lateral para edição;
- Controles de zoom e movimentação.

#### Exportação

- Exportar processo em PNG;
- Preparar estrutura para PDF e SVG.

#### Fora do MVP

- BPMN completo;
- Swimlanes avançadas;
- Simulação de tempo de processo;
- Análise estatística;
- Automação de tarefas;
- Integração com ferramentas externas.

---

### 6.7 Criação com IA mockada

O sistema deve possuir uma tela chamada **Criar com IA**.

No MVP, a IA pode funcionar com respostas mockadas realistas, sem dependência obrigatória de API externa.

#### Objetivo

Validar a experiência de transformar texto em estrutura visual.

#### Entrada do usuário

O usuário poderá informar um texto descritivo, por exemplo:

> Tenho uma empresa de locação de equipamentos com os setores comercial, financeiro, estoque, logística e manutenção. O cliente solicita orçamento pelo WhatsApp, o vendedor consulta disponibilidade, envia proposta, recebe sinal, agenda entrega, a logística entrega, depois recolhe, o estoque confere e o financeiro cobra saldo ou avarias.

#### Tipos de geração no MVP

- Gerar organograma;
- Gerar processo;
- Gerar organograma + processo.

#### Saída esperada

- Estrutura JSON;
- Preview visual;
- Opção de salvar como organograma;
- Opção de salvar como processo.

#### Requisitos técnicos

Criar um serviço centralizado:

```ts
aiService.generateOrgChartFromText(text)
aiService.generateProcessFromText(text)
aiService.generateFullStructureFromText(text)
```

No MVP, esse serviço pode retornar dados simulados com base em templates.

#### Fora do MVP

- Integração obrigatória com OpenAI, Anthropic ou Gemini;
- Análise semântica avançada;
- Garantia de precisão da IA;
- Conversão de imagem em diagrama;
- Conversão de PDF em processo;
- Conversão de áudio em processo.

---

### 6.8 Templates básicos

O sistema deve possuir templates iniciais para acelerar o uso.

#### Segmentos obrigatórios no MVP

1. Empresa de locação de equipamentos;
2. Clínica médica;
3. Construtora;
4. Escritório contábil;
5. Distribuidora.

#### Conteúdo mínimo de cada template

- Organograma base;
- Pelo menos um processo base;
- Cargos sugeridos;
- Observações de uso.

#### Formato recomendado

Os templates podem ser armazenados inicialmente em arquivos JSON dentro do projeto.

Exemplo:

```txt
/src/data/templates/rental-company.json
/src/data/templates/medical-clinic.json
/src/data/templates/construction-company.json
```

#### Fora do MVP

- Marketplace de templates;
- Templates pagos;
- Templates criados por usuários;
- Avaliação de templates;
- Compartilhamento público de templates.

---

### 6.9 Exportação básica

O MVP deve permitir exportar organogramas e processos.

#### Formatos obrigatórios

- PNG.

#### Formatos desejáveis

- PDF simples.

#### Conteúdo mínimo da exportação

- Nome do organograma ou processo;
- Nome da empresa;
- Data da exportação;
- Diagrama visual.

#### Fora do MVP

- Exportação DOCX;
- Exportação PPTX;
- Exportação BPMN;
- Exportação Mermaid;
- Exportação CSV;
- Exportação com layout altamente customizado;
- White label.

---

### 6.10 Salvamento no banco de dados

O MVP deve persistir os dados principais.

#### Dados que devem ser salvos

- Usuários;
- Workspaces;
- Empresas;
- Organogramas;
- Nós do organograma;
- Processos;
- Nós do processo;
- Conexões do processo;
- Logs básicos de geração mockada com IA.

#### Banco sugerido

- PostgreSQL;
- Prisma como ORM.

#### Fora do MVP

- Auditoria completa;
- Versionamento avançado;
- Backup configurável pelo usuário;
- Restore de versões anteriores.

---

## 7. Funcionalidades fora do escopo do MVP

As funcionalidades abaixo são importantes, mas não devem ser implementadas na primeira versão, salvo se forem triviais após a base estar pronta.

### 7.1 Gestão avançada de usuários

Fora do MVP:

- Convite de membros;
- Times;
- Permissões refinadas;
- Área de cliente;
- ClientViewer;
- Gestão de papéis avançada.

### 7.2 Colaboração em tempo real

Fora do MVP:

- Dois usuários editando o mesmo canvas simultaneamente;
- Cursores em tempo real;
- Comentários em tempo real;
- Histórico colaborativo.

### 7.3 IA real avançada

Fora do MVP:

- Integração obrigatória com IA paga;
- Engenharia de prompt refinada;
- IA para diagnóstico profundo;
- IA para criação de POP completo;
- IA para descrição de cargo completa.

### 7.4 Documentação avançada

Fora do MVP:

- POP completo editável;
- Matriz RACI completa;
- Descrição de cargo completa;
- Diagnóstico detalhado com severidade;
- Relatórios consultivos.

### 7.5 Integrações externas

Fora do MVP:

- Google Workspace;
- Microsoft 365;
- ERPs;
- CRMs;
- Sistemas de RH;
- Zapier;
- Make;
- n8n.

### 7.6 Financeiro e cobrança

Fora do MVP:

- Planos pagos;
- Stripe;
- Asaas;
- Controle de assinatura;
- Limites por plano;
- Trial;
- Nota fiscal.

### 7.7 Exportações avançadas

Fora do MVP:

- DOCX;
- PPTX;
- SVG avançado;
- Mermaid;
- BPMN;
- CSV;
- PDF diagramado profissionalmente.

---

## 8. Entidades mínimas do MVP

### 8.1 User

Representa o usuário do sistema.

Campos sugeridos:

- id;
- name;
- email;
- passwordHash;
- createdAt;
- updatedAt.

### 8.2 Workspace

Representa o ambiente de trabalho.

Campos sugeridos:

- id;
- name;
- ownerId;
- createdAt;
- updatedAt.

### 8.3 ClientCompany

Representa uma empresa ou cliente.

Campos sugeridos:

- id;
- workspaceId;
- name;
- segment;
- size;
- employeeCount;
- notes;
- createdAt;
- updatedAt.

### 8.4 OrgChart

Representa um organograma.

Campos sugeridos:

- id;
- workspaceId;
- companyId;
- name;
- description;
- createdAt;
- updatedAt.

### 8.5 OrgChartNode

Representa um cargo no organograma.

Campos sugeridos:

- id;
- orgChartId;
- title;
- occupantName;
- department;
- status;
- reportsToId;
- positionX;
- positionY;
- data;
- createdAt;
- updatedAt.

### 8.6 ProcessMap

Representa um fluxo de processo.

Campos sugeridos:

- id;
- workspaceId;
- companyId;
- name;
- description;
- createdAt;
- updatedAt.

### 8.7 ProcessNode

Representa uma etapa do processo.

Campos sugeridos:

- id;
- processMapId;
- type;
- title;
- description;
- department;
- responsibleRole;
- positionX;
- positionY;
- data;
- createdAt;
- updatedAt.

### 8.8 ProcessEdge

Representa uma conexão entre etapas.

Campos sugeridos:

- id;
- processMapId;
- sourceNodeId;
- targetNodeId;
- label;
- createdAt;
- updatedAt.

### 8.9 AiGenerationLog

Representa um log de geração com IA ou mock.

Campos sugeridos:

- id;
- workspaceId;
- companyId;
- userId;
- type;
- inputText;
- outputJson;
- provider;
- status;
- errorMessage;
- createdAt.

---

## 9. Telas do MVP

### 9.1 Login

#### Objetivo

Permitir acesso ao sistema.

#### Componentes

- Campo e-mail;
- Campo senha;
- Botão entrar;
- Link para cadastro.

---

### 9.2 Cadastro

#### Objetivo

Criar nova conta.

#### Componentes

- Nome;
- E-mail;
- Senha;
- Confirmação de senha;
- Botão criar conta.

---

### 9.3 Dashboard

#### Objetivo

Exibir visão geral e atalhos principais.

#### Componentes

- Cards de totais;
- Lista de últimos projetos;
- Botões de criação rápida.

---

### 9.4 Empresas

#### Objetivo

Listar empresas/clientes cadastrados.

#### Componentes

- Tabela;
- Campo de busca;
- Filtro por segmento;
- Botão nova empresa.

---

### 9.5 Cadastro/Edição de Empresa

#### Objetivo

Cadastrar ou editar dados de uma empresa.

#### Componentes

- Formulário;
- Botão salvar;
- Botão cancelar.

---

### 9.6 Lista de Organogramas

#### Objetivo

Exibir organogramas existentes.

#### Componentes

- Cards ou tabela;
- Botão criar organograma;
- Ações de editar, duplicar e excluir.

---

### 9.7 Editor de Organograma

#### Objetivo

Permitir edição visual do organograma.

#### Componentes

- Canvas React Flow;
- Toolbar;
- Painel lateral;
- Botão adicionar cargo;
- Botão salvar;
- Botão exportar.

---

### 9.8 Lista de Processos

#### Objetivo

Exibir processos existentes.

#### Componentes

- Cards ou tabela;
- Botão criar processo;
- Ações de editar, duplicar e excluir.

---

### 9.9 Editor de Processo

#### Objetivo

Permitir edição visual do fluxo de processo.

#### Componentes

- Canvas React Flow;
- Toolbar;
- Painel lateral;
- Botão adicionar etapa;
- Botão salvar;
- Botão exportar.

---

### 9.10 Criar com IA

#### Objetivo

Permitir geração de organogramas e processos a partir de texto.

#### Componentes

- Campo de texto grande;
- Seletor de tipo de geração;
- Botão gerar;
- Preview do resultado;
- Botão salvar.

---

### 9.11 Templates

#### Objetivo

Permitir criação de estruturas a partir de modelos pré-definidos.

#### Componentes

- Lista de templates;
- Filtro por segmento;
- Preview;
- Botão usar template.

---

## 10. Critérios de aceite do MVP

O MVP será considerado concluído quando os critérios abaixo forem atendidos.

### 10.1 Autenticação

- O usuário consegue criar conta;
- O usuário consegue fazer login;
- O usuário consegue fazer logout;
- Rotas privadas não podem ser acessadas sem login.

### 10.2 Empresas

- O usuário consegue criar empresa;
- O usuário consegue listar empresas;
- O usuário consegue editar empresa;
- O usuário consegue excluir empresa.

### 10.3 Organogramas

- O usuário consegue criar organograma;
- O usuário consegue adicionar cargos;
- O usuário consegue editar cargos;
- O usuário consegue excluir cargos;
- O usuário consegue conectar cargos;
- O usuário consegue salvar e reabrir organograma;
- O usuário consegue exportar organograma em PNG.

### 10.4 Processos

- O usuário consegue criar processo;
- O usuário consegue adicionar etapas;
- O usuário consegue editar etapas;
- O usuário consegue excluir etapas;
- O usuário consegue conectar etapas;
- O usuário consegue salvar e reabrir processo;
- O usuário consegue exportar processo em PNG.

### 10.5 IA mockada

- O usuário consegue inserir texto;
- O sistema retorna um organograma mockado;
- O sistema retorna um processo mockado;
- O usuário consegue salvar o resultado gerado.

### 10.6 Templates

- O usuário consegue visualizar templates;
- O usuário consegue criar organograma ou processo a partir de template.

### 10.7 Multi-tenant básico

- Dados de um workspace não podem ser acessados por outro usuário;
- Todas as consultas principais devem filtrar por workspaceId.

---

## 11. Métricas de validação do MVP

As métricas abaixo devem ser acompanhadas durante os testes.

### 11.1 Ativação

- Percentual de usuários que criam pelo menos uma empresa;
- Percentual de usuários que criam pelo menos um organograma;
- Percentual de usuários que criam pelo menos um processo;
- Tempo médio até o primeiro diagrama criado.

### 11.2 Engajamento

- Número médio de organogramas por usuário;
- Número médio de processos por usuário;
- Número de edições por projeto;
- Número de exportações realizadas.

### 11.3 Valor percebido

- Usuários que exportam material;
- Usuários que usam template;
- Usuários que testam criação com IA;
- Feedback qualitativo sobre utilidade.

### 11.4 Conversão futura

- Usuários que demonstram intenção de pagar;
- Segmentos com maior interesse;
- Funcionalidades mais solicitadas;
- Objeções comerciais mais frequentes.

---

## 12. Ordem recomendada de implementação

### Sprint 1 — Fundação técnica

- Criar projeto Next.js;
- Configurar TypeScript;
- Configurar Tailwind;
- Configurar shadcn/ui;
- Configurar Prisma;
- Configurar PostgreSQL;
- Criar autenticação básica;
- Criar layout autenticado;
- Criar sidebar.

### Sprint 2 — Empresas e dashboard

- Criar modelo de workspace;
- Criar modelo de empresa;
- Criar CRUD de empresas;
- Criar dashboard básico;
- Criar cards de indicadores.

### Sprint 3 — Organogramas

- Instalar e configurar React Flow;
- Criar modelo de organograma;
- Criar modelo de nó do organograma;
- Criar editor visual;
- Criar painel lateral;
- Salvar e carregar organogramas.

### Sprint 4 — Processos

- Criar modelo de processo;
- Criar modelo de nó de processo;
- Criar modelo de conexão;
- Criar editor visual;
- Criar tipos de etapas;
- Salvar e carregar processos.

### Sprint 5 — IA mockada e templates

- Criar aiService;
- Criar respostas mockadas;
- Criar tela Criar com IA;
- Criar templates JSON;
- Permitir criar estruturas a partir de template.

### Sprint 6 — Exportação e ajustes

- Exportar organograma em PNG;
- Exportar processo em PNG;
- Ajustar estados de loading;
- Ajustar erros;
- Testar permissões básicas;
- Revisar UX;
- Preparar demo.

---

## 13. Riscos do MVP

### 13.1 Escopo inflar

Risco:

- Tentar implementar RACI, POP, diagnóstico avançado, IA real, colaboração e pagamento no MVP.

Mitigação:

- Seguir rigorosamente este documento.

### 13.2 Editor visual ficar complexo demais

Risco:

- O canvas consumir muito tempo de desenvolvimento.

Mitigação:

- Usar React Flow com recursos básicos primeiro;
- Evitar customizações excessivas;
- Priorizar salvar, editar e exportar.

### 13.3 IA virar dependência prematura

Risco:

- O projeto travar por conta de integração, custo ou instabilidade de IA.

Mitigação:

- Usar mock no MVP;
- Criar arquitetura preparada para IA real depois.

### 13.4 Produto parecer genérico

Risco:

- Usuário comparar com Miro, Canva ou Lucidchart.

Mitigação:

- Focar em templates de gestão organizacional;
- Criar experiência guiada para consultores e PMEs;
- Não posicionar como ferramenta genérica de desenho.

---

## 14. Definição de pronto

Uma funcionalidade será considerada pronta quando:

- Estiver implementada;
- Estiver integrada ao banco quando aplicável;
- Possuir tratamento de erro;
- Possuir estado de carregamento;
- Possuir empty state quando necessário;
- Respeitar o workspace do usuário;
- Estiver minimamente responsiva;
- Tiver sido testada manualmente;
- Não quebrar fluxos principais.

---

## 15. Resumo executivo do escopo

### Entra no MVP

- Login;
- Workspace básico;
- Empresas/clientes;
- Dashboard;
- Organogramas;
- Processos;
- IA mockada;
- Templates básicos;
- Exportação PNG;
- Salvamento no banco.

### Não entra no MVP

- IA real obrigatória;
- RACI completo;
- POP completo;
- Diagnóstico avançado;
- Colaboração em tempo real;
- Planos pagos;
- Integrações externas;
- Exportação DOCX/PPTX;
- Marketplace de templates.

---

## 16. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
functional-requirements.md
```

Esse documento deve detalhar todos os requisitos funcionais do sistema em formato objetivo, numerado e rastreável.
