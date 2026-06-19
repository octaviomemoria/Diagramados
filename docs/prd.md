# PRD — Diagramados

**Produto:** Diagramados  
**Tipo:** SaaS B2B para criação, edição e documentação de organogramas e fluxos de processos  
**Versão:** 1.0  
**Status:** Documento inicial de requisitos do produto  
**Data:** 17/06/2026  
**Idioma:** Português Brasil

---

## 1. Resumo executivo

O **Diagramados** é uma plataforma SaaS para empresas, consultores organizacionais, gestores de RH e gestores de processos criarem, editarem, documentarem e exportarem **organogramas**, **fluxos de processos**, **matrizes RACI**, **descrições de cargos**, **POPs** e **diagnósticos organizacionais** com apoio de inteligência artificial.

O produto não deve ser apenas um editor visual de caixas e setas. O objetivo é transformar informações desorganizadas sobre estrutura empresarial e processos internos em artefatos de gestão claros, editáveis, exportáveis e úteis para tomada de decisão.

A proposta central é:

> O usuário descreve uma empresa, departamento ou processo em linguagem natural, e o sistema transforma essa descrição em organograma, fluxo, matriz de responsabilidades, descrição de cargos, POP e diagnóstico de gargalos.

---

## 2. Problema

Empresas pequenas e médias, consultorias e departamentos internos geralmente têm dificuldade para organizar e manter atualizados:

- Estrutura hierárquica;
- Cargos e responsabilidades;
- Fluxos de processos;
- Procedimentos operacionais;
- Responsáveis por etapa;
- Indicadores de controle;
- Pontos de gargalo;
- Documentação para treinamento e padronização.

Na prática, essas informações ficam espalhadas em apresentações, planilhas, documentos, conversas de WhatsApp, quadros físicos ou na cabeça dos gestores. Isso gera retrabalho, dependência excessiva de pessoas-chave, falhas de comunicação e baixa padronização operacional.

Ferramentas de diagramação já existem, mas muitas são genéricas, voltadas apenas ao desenho visual. O usuário ainda precisa saber estruturar o processo, interpretar a organização, definir responsabilidades e documentar tudo manualmente.

---

## 3. Objetivos do produto

### 3.1 Objetivo principal

Criar uma plataforma que permita ao usuário organizar visualmente e documentalmente a estrutura e os processos de uma empresa, com apoio de IA, reduzindo o tempo necessário para produzir materiais de gestão organizacional.

### 3.2 Objetivos secundários

- Permitir criação visual de organogramas e processos;
- Gerar diagramas a partir de texto;
- Gerar matriz RACI automaticamente;
- Gerar descrições de cargos;
- Gerar POPs a partir de processos;
- Diagnosticar gargalos e riscos organizacionais;
- Disponibilizar templates por segmento;
- Exportar materiais para uso em reuniões, consultorias e treinamentos;
- Atender consultores com múltiplos clientes;
- Atender empresas que desejam profissionalizar sua gestão.

---

## 4. Público-alvo

### 4.1 Público primário

#### Consultores empresariais

Profissionais ou empresas de consultoria que precisam entregar organogramas, fluxos, descrições de cargo, POPs e diagnósticos para vários clientes.

#### Pequenas e médias empresas

Empresas em crescimento que precisam organizar estrutura, processos e responsabilidades.

### 4.2 Público secundário

- Gestores de RH;
- Gestores administrativos;
- Gestores de operações;
- Analistas de processos;
- Empresas familiares;
- Clínicas;
- Construtoras;
- Distribuidoras;
- Restaurantes;
- Escritórios contábeis;
- Empresas de locação;
- Pequenas indústrias;
- Imobiliárias.

---

## 5. Personas

### 5.1 Consultor organizacional

**Perfil:** profissional que atende múltiplas empresas e precisa estruturar entregáveis de diagnóstico e organização.  
**Dor:** perde muito tempo criando organogramas, fluxos e documentos manualmente.  
**Objetivo:** acelerar entregas, padronizar documentos e melhorar a percepção de valor do cliente.  
**Valor percebido:** redução de tempo, qualidade visual, documentação pronta e multiempresa.

### 5.2 Gestor de PME

**Perfil:** dono, diretor ou gerente de empresa em crescimento.  
**Dor:** a empresa depende de pessoas específicas e os processos não são claros.  
**Objetivo:** organizar cargos, responsabilidades e fluxos principais.  
**Valor percebido:** clareza, delegação, treinamento e redução de retrabalho.

### 5.3 Gestor de RH

**Perfil:** profissional responsável por estrutura, cargos e pessoas.  
**Dor:** organogramas desatualizados e descrições de cargos inexistentes.  
**Objetivo:** manter estrutura, cargos e responsabilidades documentados.  
**Valor percebido:** organização, padronização e apoio ao recrutamento.

### 5.4 Analista de processos

**Perfil:** profissional responsável por mapear e melhorar processos internos.  
**Dor:** dificuldade de transformar entrevistas e anotações em fluxos padronizados.  
**Objetivo:** mapear, revisar e documentar processos.  
**Valor percebido:** produtividade, rastreabilidade e documentação operacional.

---

## 6. Proposta de valor

O Diagramados permite que empresas e consultores transformem descrições soltas sobre estrutura e operação em materiais profissionais de gestão, incluindo organogramas, fluxos, POPs, matriz RACI e diagnóstico de gargalos.

### Frase de posicionamento

> O Canva da gestão organizacional, com inteligência de consultor.

### Proposta comercial

> Crie organogramas, fluxos de processos, responsabilidades e procedimentos operacionais com IA em poucos minutos.

---

## 7. Escopo do MVP

O MVP deve validar se usuários conseguem criar e editar organogramas e fluxos de processos de forma simples, além de gerar estruturas iniciais com IA mockada.

### 7.1 Incluído no MVP

- Login e autenticação;
- Cadastro de empresas/clientes;
- Dashboard inicial;
- Editor visual de organogramas;
- Editor visual de processos;
- Criação com IA usando mock realista;
- Templates iniciais por segmento;
- Salvamento no banco;
- Exportação básica em PNG e PDF;
- Estrutura inicial para matriz RACI;
- Estrutura inicial para POP;
- Estrutura inicial para diagnóstico;
- Layout SaaS B2B responsivo para desktop e tablet.

### 7.2 Fora do MVP

- Integração real com APIs de IA em produção;
- Colaboração simultânea em tempo real;
- Controle avançado de permissões por campo;
- Integração com sistemas de RH;
- Importação automática via Google Sheets ou Excel;
- Conversão de imagem para diagrama editável;
- Exportação avançada em PPTX e DOCX;
- BPMN completo com validação formal;
- Marketplace de templates;
- Aplicativo mobile nativo.

---

## 8. Requisitos funcionais

## RF01 — Autenticação

O sistema deve permitir que o usuário crie conta, faça login e acesse sua área privada.

### Critérios de aceite

- Usuário consegue criar conta;
- Usuário consegue fazer login;
- Usuário consegue sair da conta;
- Rotas privadas exigem autenticação;
- Usuário não autenticado é redirecionado para login.

---

## RF02 — Workspace

O sistema deve permitir que cada usuário tenha pelo menos um workspace.

### Critérios de aceite

- Ao criar conta, um workspace padrão é criado;
- O usuário consegue visualizar o nome do workspace ativo;
- Dados são filtrados pelo workspace;
- Usuário não acessa dados de outro workspace.

---

## RF03 — Cadastro de empresas/clientes

O sistema deve permitir cadastrar empresas/clientes dentro do workspace.

### Campos mínimos

- Nome da empresa;
- CNPJ opcional;
- Segmento;
- Porte;
- Número de colaboradores;
- Logo opcional;
- Observações;
- Status;
- Data de criação;
- Data de atualização.

### Critérios de aceite

- Usuário consegue criar empresa;
- Usuário consegue editar empresa;
- Usuário consegue excluir ou arquivar empresa;
- Usuário consegue listar empresas;
- Usuário consegue filtrar empresas por segmento ou status.

---

## RF04 — Dashboard

O sistema deve exibir uma visão geral dos projetos do usuário.

### Métricas exibidas

- Total de empresas/clientes;
- Total de organogramas;
- Total de processos;
- Total de cargos;
- Total de POPs;
- Últimos itens editados.

### Ações rápidas

- Criar empresa;
- Criar organograma;
- Criar processo;
- Criar com IA;
- Usar template.

### Critérios de aceite

- Dashboard carrega dados do workspace;
- Cards mostram contagens corretas;
- Botões levam para as telas correspondentes;
- Quando não houver dados, o sistema exibe empty state claro.

---

## RF05 — Lista de organogramas

O sistema deve permitir listar, criar, editar, duplicar e excluir organogramas.

### Critérios de aceite

- Usuário consegue visualizar organogramas por empresa;
- Usuário consegue criar novo organograma;
- Usuário consegue duplicar organograma existente;
- Usuário consegue excluir ou arquivar organograma;
- Cada organograma possui nome, empresa, status, versão e última atualização.

---

## RF06 — Editor visual de organogramas

O sistema deve permitir criar e editar organogramas visualmente usando React Flow.

### Funcionalidades

- Adicionar cargo;
- Editar cargo;
- Excluir cargo;
- Conectar cargos por hierarquia;
- Definir superior imediato;
- Reposicionar cards;
- Salvar layout;
- Visualização compacta e detalhada;
- Zoom in/out;
- Ajustar à tela;
- Exportar imagem.

### Dados do cargo

- Nome do cargo;
- Nome do ocupante;
- Departamento;
- Superior imediato;
- E-mail opcional;
- Telefone opcional;
- Foto opcional;
- Status: ocupado, vaga aberta, terceirizado, temporário ou futuro;
- Custo mensal opcional;
- Observações.

### Critérios de aceite

- Usuário consegue adicionar um cargo ao canvas;
- Usuário consegue conectar cargo a um superior;
- Usuário consegue editar dados no painel lateral;
- Alterações são salvas no banco;
- Layout é restaurado ao reabrir;
- Exportação em PNG funciona.

---

## RF07 — Lista de processos

O sistema deve permitir listar, criar, editar, duplicar e excluir processos.

### Critérios de aceite

- Usuário consegue visualizar processos por empresa;
- Usuário consegue criar novo processo;
- Usuário consegue duplicar processo;
- Usuário consegue excluir ou arquivar processo;
- Cada processo possui nome, empresa, área, status e última atualização.

---

## RF08 — Editor visual de processos

O sistema deve permitir criar e editar fluxos de processos usando React Flow.

### Tipos de nós

- Início;
- Atividade;
- Decisão;
- Documento;
- Sistema;
- Aprovação;
- Espera;
- Fim.

### Dados da etapa

- Nome da etapa;
- Descrição;
- Área responsável;
- Cargo responsável;
- Sistema utilizado;
- Documento gerado;
- Tempo estimado;
- Risco;
- Indicador relacionado;
- Observações.

### Funcionalidades

- Adicionar etapa;
- Editar etapa;
- Excluir etapa;
- Conectar etapas;
- Criar decisões com caminhos “sim” e “não”;
- Reposicionar etapas;
- Salvar fluxo;
- Exportar PNG;
- Exportar PDF simples;
- Gerar POP a partir do processo;
- Gerar matriz RACI a partir do processo;
- Gerar diagnóstico a partir do processo.

### Critérios de aceite

- Usuário consegue criar fluxo manual;
- Usuário consegue conectar etapas;
- Usuário consegue definir tipo de etapa;
- Usuário consegue salvar e reabrir o fluxo;
- Exportação em PNG funciona;
- Ações de gerar POP, RACI e diagnóstico estão disponíveis, mesmo que inicialmente mockadas.

---

## RF09 — Criar com IA

O sistema deve ter uma tela para geração de estruturas com IA a partir de texto.

### Entrada do usuário

Campo de texto livre onde o usuário descreve empresa, área, organograma ou processo.

### Tipos de geração

- Organograma;
- Processo;
- Organograma + Processo;
- Diagnóstico completo;
- Descrição de cargos;
- POP.

### Saídas esperadas

- Estrutura JSON padronizada;
- Preview visual;
- Lista de cargos sugeridos;
- Lista de etapas sugeridas;
- Sugestões de melhoria;
- Opção de salvar como projeto.

### Critérios de aceite

- Usuário consegue inserir texto;
- Usuário consegue selecionar tipo de geração;
- Sistema retorna resultado mockado realista;
- Usuário consegue visualizar preview;
- Usuário consegue salvar organograma ou processo gerado;
- Logs da geração são salvos.

---

## RF10 — Templates por segmento

O sistema deve oferecer templates iniciais por segmento.

### Segmentos iniciais

1. Empresa de locação de equipamentos;
2. Clínica médica;
3. Construtora;
4. Escritório contábil;
5. Distribuidora;
6. Restaurante;
7. Loja de moda;
8. Consultoria empresarial;
9. Pequena indústria;
10. Imobiliária.

### Cada template deve conter

- Organograma base;
- Processos principais;
- Cargos sugeridos;
- Indicadores sugeridos;
- Sugestões de POPs;
- Fluxos recomendados.

### Critérios de aceite

- Usuário consegue visualizar templates;
- Usuário consegue filtrar por segmento;
- Usuário consegue criar organograma ou processo a partir de template;
- Dados iniciais podem ficar em arquivos JSON no MVP.

---

## RF11 — Matriz RACI

O sistema deve permitir gerar e editar matriz RACI a partir de processos.

### Responsabilidades

- R — Responsible / Responsável pela execução;
- A — Accountable / Aprovador ou dono da decisão;
- C — Consulted / Consultado;
- I — Informed / Informado.

### Critérios de aceite

- Sistema gera uma matriz inicial a partir das etapas e cargos;
- Usuário consegue editar células da matriz;
- Usuário consegue salvar alterações;
- Usuário consegue visualizar matriz em tabela;
- Futuramente deve permitir exportação em PDF e XLSX.

---

## RF12 — Descrição de cargos

O sistema deve gerar descrições de cargos a partir dos cargos do organograma.

### Estrutura da descrição

- Nome do cargo;
- Departamento;
- Superior imediato;
- Cargos subordinados;
- Missão do cargo;
- Principais responsabilidades;
- Rotina diária;
- Rotina semanal;
- Indicadores de desempenho;
- Competências técnicas;
- Competências comportamentais;
- Sistemas utilizados;
- Interfaces internas;
- Observações.

### Critérios de aceite

- Usuário consegue gerar descrição a partir de um cargo;
- Usuário consegue editar o texto gerado;
- Usuário consegue salvar descrição;
- Descrição fica associada ao cargo;
- No MVP, a geração pode ser mockada.

---

## RF13 — Gerador de POP

O sistema deve gerar POPs a partir dos processos mapeados.

### Estrutura do POP

- Título;
- Objetivo;
- Escopo;
- Áreas envolvidas;
- Responsáveis;
- Materiais, documentos ou sistemas necessários;
- Passo a passo;
- Riscos;
- Pontos de controle;
- Indicadores;
- Registros gerados;
- Histórico de revisão.

### Critérios de aceite

- Usuário consegue gerar POP a partir de processo;
- POP é exibido em editor textual;
- Usuário consegue editar e salvar o POP;
- POP fica associado ao processo;
- No MVP, a geração pode ser mockada.

---

## RF14 — Diagnóstico de gargalos

O sistema deve gerar diagnóstico a partir de organogramas e processos.

### Tipos de problemas identificáveis

- Etapas sem responsável;
- Excesso de aprovações;
- Falta de indicadores;
- Falta de documentação;
- Falta de responsáveis claros;
- Duplicidade de atividades;
- Gargalo em uma única pessoa ou área;
- Falta de etapa de conferência;
- Falta de etapa de aprovação;
- Risco de retrabalho;
- Risco de falha de comunicação.

### Estrutura de cada diagnóstico

- Problema identificado;
- Gravidade: baixa, média, alta ou crítica;
- Justificativa;
- Sugestão de melhoria;
- Área impactada;
- Status: aberto, em análise, resolvido ou ignorado.

### Critérios de aceite

- Usuário consegue gerar diagnóstico;
- Diagnóstico aparece em lista organizada;
- Usuário consegue alterar status do item;
- No MVP, diagnóstico pode ser mockado com base em regras simples.

---

## RF15 — Exportações

O sistema deve permitir exportação básica dos artefatos.

### MVP

- Organograma em PNG;
- Processo em PNG;
- Relatório simples em PDF.

### Futuro

- DOCX;
- PPTX;
- Mermaid;
- BPMN;
- CSV;
- JSON;
- XLSX para matriz RACI.

### Critérios de aceite

- Usuário consegue exportar organograma em PNG;
- Usuário consegue exportar processo em PNG;
- Usuário consegue gerar PDF simples com dados principais;
- Histórico de exportação é salvo.

---

## 9. Requisitos não funcionais

## RNF01 — Performance

- O dashboard deve carregar em até 3 segundos em condições normais;
- O editor deve suportar pelo menos 200 nós sem travar severamente;
- Operações de salvar devem ter feedback visual;
- Exportações devem informar progresso ou estado de carregamento.

## RNF02 — Segurança

- Autenticação obrigatória;
- Separação de dados por workspace;
- Validação de permissões no back-end;
- Não expor dados sensíveis em logs do front-end;
- Sanitização de entradas do usuário;
- Proteção contra acesso indevido entre tenants.

## RNF03 — LGPD

- Dados de pessoas devem ser tratados como dados pessoais;
- Deve haver possibilidade futura de anonimização ou exclusão;
- Logs de IA não devem expor informações sensíveis sem necessidade;
- O sistema deve permitir excluir empresas, organogramas e pessoas cadastradas;
- Política de privacidade deve ser prevista em versão comercial.

## RNF04 — Usabilidade

- Interface clara e profissional;
- Empty states úteis;
- Loading states;
- Feedback de sucesso e erro;
- Menus objetivos;
- Boa experiência em desktop;
- Responsividade mínima para tablet.

## RNF05 — Escalabilidade

- Arquitetura multi-tenant;
- Serviços separados por domínio;
- Camada de IA desacoplada;
- Camada de exportação desacoplada;
- Banco preparado para múltiplos workspaces e empresas.

---

## 10. Arquitetura sugerida

### 10.1 Stack

- Front-end: Next.js com App Router;
- Linguagem: TypeScript;
- Estilização: Tailwind CSS;
- Componentes: shadcn/ui;
- Diagramas: React Flow;
- Banco de dados: PostgreSQL;
- ORM: Prisma;
- Autenticação: NextAuth, Clerk ou Supabase Auth;
- Storage: Supabase Storage ou AWS S3;
- IA: OpenAI, Anthropic ou Gemini futuramente;
- Deploy: Vercel.

### 10.2 Estrutura de pastas sugerida

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
    /orgchart
    /process
    /forms
    /dashboard
    /raci
    /pops
    /diagnostics
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
  /data
    /templates
  /prisma
    schema.prisma
```

---

## 11. Modelo de dados inicial

### 11.1 Entidades principais

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
- JobPosition;
- JobDescription;
- RaciMatrix;
- RaciMatrixItem;
- StandardOperatingProcedure;
- Diagnosis;
- DiagnosisItem;
- Template;
- TemplateCategory;
- ExportHistory;
- AiGenerationLog.

### 11.2 Relações principais

- Um usuário pode participar de vários workspaces;
- Um workspace pode ter várias empresas/clientes;
- Uma empresa pode ter vários organogramas;
- Uma empresa pode ter vários processos;
- Um organograma pode ter vários nós e conexões;
- Um processo pode ter vários nós e conexões;
- Um processo pode gerar uma matriz RACI;
- Um processo pode gerar um POP;
- Um organograma pode gerar descrições de cargo;
- Um processo ou organograma pode gerar diagnóstico;
- Toda geração por IA deve gerar log.

---

## 12. Permissões

### Papéis

- Owner;
- Admin;
- Editor;
- Viewer;
- ClientViewer.

### Regras

| Papel | Permissões |
|---|---|
| Owner | Acesso total, incluindo cobrança e exclusão de workspace |
| Admin | Gerencia usuários, empresas e conteúdos |
| Editor | Cria e edita organogramas, processos, POPs e diagnósticos |
| Viewer | Visualiza conteúdos, sem editar |
| ClientViewer | Visualiza apenas empresas/projetos liberados |

---

## 13. Telas do MVP

## 13.1 Login

### Elementos

- E-mail;
- Senha;
- Botão entrar;
- Link para cadastro;
- Link para recuperar senha futuramente.

---

## 13.2 Dashboard

### Elementos

- Cards de indicadores;
- Últimos projetos editados;
- Ações rápidas;
- Sugestão de templates;
- Empty state para novo usuário.

---

## 13.3 Empresas/clientes

### Elementos

- Tabela de empresas;
- Filtro por segmento;
- Filtro por status;
- Botão nova empresa;
- Ações editar, arquivar e excluir.

---

## 13.4 Cadastro de empresa

### Elementos

- Formulário com dados principais;
- Upload de logo opcional;
- Seleção de segmento;
- Campo de observações.

---

## 13.5 Lista de organogramas

### Elementos

- Cards ou tabela;
- Filtro por empresa;
- Botão criar novo;
- Botão usar template;
- Ações editar, duplicar e excluir.

---

## 13.6 Editor de organograma

### Elementos

- Canvas React Flow;
- Toolbar superior;
- Painel lateral de edição;
- Mini mapa;
- Zoom;
- Botão salvar;
- Botão exportar;
- Alternância compacto/detalhado.

---

## 13.7 Lista de processos

### Elementos

- Cards ou tabela;
- Filtro por empresa;
- Filtro por área;
- Botão criar novo;
- Botão usar template;
- Ações editar, duplicar e excluir.

---

## 13.8 Editor de processo

### Elementos

- Canvas React Flow;
- Toolbar com tipos de etapa;
- Painel lateral de edição;
- Mini mapa;
- Zoom;
- Botão salvar;
- Botão exportar;
- Botão gerar RACI;
- Botão gerar POP;
- Botão diagnosticar.

---

## 13.9 Criar com IA

### Elementos

- Campo grande de texto;
- Seleção do tipo de geração;
- Seleção da empresa/clientes;
- Botão gerar;
- Preview visual;
- Preview JSON opcional para debug;
- Botão salvar como organograma/processo.

---

## 13.10 RACI

### Elementos

- Tabela editável;
- Linhas com etapas;
- Colunas com cargos ou áreas;
- Células com R, A, C ou I;
- Botão salvar;
- Botão exportar futuramente.

---

## 13.11 POP

### Elementos

- Editor textual;
- Estrutura por seções;
- Botão salvar;
- Botão exportar PDF;
- Histórico de revisão.

---

## 13.12 Diagnóstico

### Elementos

- Lista de problemas;
- Filtro por gravidade;
- Filtro por área;
- Status do item;
- Sugestão de melhoria;
- Botão marcar como resolvido.

---

## 14. Fluxos principais de usuário

## 14.1 Fluxo: criar organograma manualmente

1. Usuário acessa dashboard;
2. Clica em “Criar organograma”;
3. Seleciona empresa;
4. Insere nome do organograma;
5. Abre editor visual;
6. Adiciona cargos;
7. Conecta hierarquias;
8. Salva;
9. Exporta PNG ou PDF.

## 14.2 Fluxo: criar processo manualmente

1. Usuário acessa dashboard;
2. Clica em “Criar processo”;
3. Seleciona empresa;
4. Insere nome do processo;
5. Abre editor visual;
6. Adiciona etapas;
7. Conecta etapas;
8. Define responsáveis;
9. Salva;
10. Gera POP, RACI ou diagnóstico.

## 14.3 Fluxo: criar com IA

1. Usuário acessa “Criar com IA”;
2. Seleciona empresa;
3. Escolhe tipo de geração;
4. Descreve empresa ou processo;
5. Clica em gerar;
6. Sistema retorna estrutura sugerida;
7. Usuário revisa preview;
8. Usuário salva como organograma ou processo;
9. Usuário edita visualmente.

## 14.4 Fluxo: consultor com múltiplos clientes

1. Consultor cria workspace;
2. Cadastra vários clientes;
3. Para cada cliente, cria organogramas e processos;
4. Gera diagnóstico;
5. Exporta materiais;
6. Compartilha com cliente em modo visualização.

---

## 15. IA e estrutura de geração

### 15.1 Serviço de IA

Criar um serviço chamado `aiService` com funções:

- `generateOrgChartFromText(text, companyContext)`;
- `generateProcessFromText(text, companyContext)`;
- `generateRaciFromProcess(processId)`;
- `generateJobDescription(positionId)`;
- `generatePopFromProcess(processId)`;
- `diagnoseProcess(processId)`;
- `diagnoseOrgChart(orgChartId)`.

### 15.2 Modo mock no MVP

Enquanto não houver chave real de IA, o sistema deve retornar dados mockados realistas.

### 15.3 Logs de IA

Toda geração deve salvar:

- Usuário;
- Workspace;
- Empresa;
- Tipo de geração;
- Prompt enviado;
- Resposta recebida;
- Data;
- Status;
- Erro, se houver;
- Tokens/custo futuramente.

---

## 16. Exemplos de estruturas JSON

### 16.1 Organograma

```json
{
  "organizationName": "Empresa Exemplo",
  "positions": [
    {
      "id": "pos-1",
      "title": "Diretor Geral",
      "department": "Diretoria",
      "reportsTo": null,
      "level": 1,
      "status": "occupied"
    },
    {
      "id": "pos-2",
      "title": "Gerente Comercial",
      "department": "Comercial",
      "reportsTo": "pos-1",
      "level": 2,
      "status": "occupied"
    },
    {
      "id": "pos-3",
      "title": "Gerente Administrativo Financeiro",
      "department": "Administrativo Financeiro",
      "reportsTo": "pos-1",
      "level": 2,
      "status": "occupied"
    }
  ]
}
```

### 16.2 Processo

```json
{
  "processName": "Processo de Locação de Equipamentos",
  "description": "Fluxo completo desde a solicitação do cliente até a devolução e conferência do equipamento.",
  "steps": [
    {
      "id": "step-1",
      "type": "start",
      "title": "Cliente solicita orçamento",
      "description": "Cliente entra em contato solicitando a locação de equipamento.",
      "department": "Comercial",
      "responsibleRole": "Vendedor"
    },
    {
      "id": "step-2",
      "type": "activity",
      "title": "Consultar disponibilidade",
      "description": "Vendedor consulta disponibilidade do equipamento no estoque.",
      "department": "Comercial",
      "responsibleRole": "Vendedor"
    },
    {
      "id": "step-3",
      "type": "decision",
      "title": "Equipamento disponível?",
      "description": "Verifica se o equipamento solicitado está disponível para o período desejado.",
      "department": "Estoque",
      "responsibleRole": "Analista de Estoque"
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

## 17. Template inicial — Empresa de locação de equipamentos

### 17.1 Organograma base

- Diretor Geral;
- Gerente Comercial;
- Vendedor;
- Gerente Administrativo Financeiro;
- Analista Financeiro;
- Coordenador de Operações;
- Estoquista;
- Motorista;
- Técnico de Manutenção.

### 17.2 Processo base

1. Cliente solicita orçamento;
2. Comercial registra solicitação;
3. Comercial consulta disponibilidade;
4. Cliente aprova orçamento;
5. Financeiro confirma pagamento de reserva;
6. Operação separa equipamento;
7. Logística entrega;
8. Cliente utiliza;
9. Logística recolhe;
10. Estoque confere;
11. Manutenção avalia avarias;
12. Financeiro cobra saldo ou danos;
13. Processo finalizado.

### 17.3 Possíveis gargalos

- Falta de checklist de entrega;
- Falta de checklist de devolução;
- Desconto sem aprovação;
- Falta de SLA comercial;
- Falta de registro de avarias;
- Falta de integração entre estoque e financeiro;
- Dependência excessiva do vendedor para consultar disponibilidade.

---

## 18. Métricas de sucesso

### 18.1 Produto

- Tempo médio para criar primeiro organograma;
- Tempo médio para criar primeiro processo;
- Percentual de usuários que exportam um artefato;
- Percentual de usuários que usam criação com IA;
- Número médio de empresas cadastradas por workspace;
- Número médio de artefatos por empresa;
- Taxa de retorno semanal;
- Ativação: usuário cria pelo menos 1 empresa + 1 organograma ou 1 processo.

### 18.2 Negócio

- Conversão de teste gratuito para plano pago;
- Churn mensal;
- MRR;
- ARPU;
- CAC;
- LTV;
- Número de consultores ativos;
- Número médio de clientes por consultor.

---

## 19. Modelo de monetização sugerido

| Plano | Público | Recursos | Preço sugerido |
|---|---|---|---|
| Gratuito | Teste individual | Limite de organogramas/processos, exportação com marca d’água | R$ 0 |
| Pro | Gestores e analistas | Projetos ilimitados, IA limitada, exportação básica | R$ 39 a R$ 79/mês |
| Consultor | Consultorias pequenas | Multi-clientes, templates, exportação profissional | R$ 149 a R$ 299/mês |
| Agência/Consultoria | Times maiores | Usuários múltiplos, marca branca, relatórios | R$ 499 a R$ 999/mês |
| Enterprise | Empresas médias | Permissões avançadas, integrações, suporte | Sob proposta |

---

## 20. Roadmap

### Fase 1 — MVP

- Autenticação;
- Workspace;
- Cadastro de empresas;
- Dashboard;
- Editor de organogramas;
- Editor de processos;
- IA mockada;
- Templates JSON;
- Exportação PNG/PDF básica.

### Fase 2 — Gestão organizacional

- Matriz RACI editável;
- Descrição de cargos;
- POP editável;
- Diagnóstico com regras e IA;
- Histórico de versões;
- Compartilhamento por link.

### Fase 3 — IA real e produtividade

- Integração real com OpenAI, Anthropic ou Gemini;
- Importação de planilhas;
- Upload de documentos;
- Geração a partir de entrevistas transcritas;
- Sugestões avançadas de melhoria;
- Exportação DOCX e PPTX.

### Fase 4 — Colaboração e escala

- Colaboração em tempo real;
- Comentários;
- Aprovações;
- Permissões avançadas;
- Marca branca para consultorias;
- API pública;
- Marketplace de templates.

---

## 21. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Virar apenas mais um editor de diagramas | Alto | Focar em IA, documentação, diagnóstico e templates por segmento |
| IA gerar estruturas genéricas | Médio | Usar perguntas guiadas, templates e edição manual fácil |
| Produto ficar complexo demais | Alto | Priorizar MVP simples com fluxo principal bem feito |
| Usuário não manter dados atualizados | Médio | Criar alertas, revisões periódicas e histórico de versões |
| Competição com players grandes | Alto | Nichar em PMEs, consultorias e gestão organizacional prática |
| Baixa adoção por empresas sem cultura de processos | Médio | Vender valor prático: treinamento, delegação, clareza e redução de retrabalho |

---

## 22. Critérios gerais de aceite do MVP

O MVP será considerado funcional quando:

- Usuário conseguir criar conta;
- Usuário conseguir cadastrar empresa;
- Usuário conseguir criar organograma manualmente;
- Usuário conseguir criar processo manualmente;
- Usuário conseguir gerar estrutura mockada com IA;
- Usuário conseguir editar visualmente organograma e processo;
- Usuário conseguir salvar e reabrir os artefatos;
- Usuário conseguir exportar PNG;
- Usuário conseguir acessar templates iniciais;
- Dados estiverem isolados por workspace;
- Interface estiver estável em desktop;
- Código estiver organizado e preparado para evolução.

---

## 23. Princípios de produto

1. **Clareza antes de complexidade**  
   O usuário precisa entender a empresa e o processo, não aprender uma ferramenta complicada.

2. **IA como assistente, não como dona da verdade**  
   Toda sugestão deve ser editável.

3. **Gestão prática antes de notação técnica**  
   BPMN completo pode vir depois. Primeiro, o processo precisa ser compreensível.

4. **Exportação é parte do valor**  
   Consultores e gestores precisam apresentar, imprimir, enviar e treinar.

5. **Templates aceleram adoção**  
   O usuário não deve começar de uma tela em branco.

6. **Multiempresa desde o início**  
   Consultores são público estratégico.

---

## 24. Conclusão

O Diagramados deve ser construído como uma plataforma de gestão organizacional visual, não apenas como editor de diagramas.

O diferencial estará na combinação de:

- Editor visual simples;
- IA para estruturação;
- Templates por segmento;
- Matriz RACI;
- POPs;
- Diagnóstico de gargalos;
- Exportação profissional;
- Uso multiempresa para consultorias.

O MVP deve priorizar uma base sólida, com organogramas, processos, criação com IA mockada, templates e exportação básica. As funcionalidades avançadas devem ser adicionadas de forma incremental.

