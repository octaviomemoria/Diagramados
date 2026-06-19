# Plano de implementação priorizado - Diagramados

**Data da análise:** 18/06/2026  
**Base analisada:** PRD, escopo do MVP, requisitos funcionais, histórias, fluxos, mapa de telas, modelo de dados, arquitetura, API e especificação de IA.  
**Estado atual:** planejamento; ainda não há aplicação implementada neste diretório.

## 1. Recomendação executiva

O primeiro produto liberável deve resolver muito bem duas tarefas:

1. criar, editar, salvar, reabrir e exportar um organograma;
2. criar, editar, salvar, reabrir e exportar um fluxo de processo.

Autenticação, workspace e empresa são infraestrutura mínima para essas tarefas. Dashboard, IA, templates, RACI, POP, descrições de cargos, diagnóstico, cobrança e colaboração não devem disputar capacidade com os editores antes de o núcleo estar validado.

O desenvolvimento recomendado é vertical: entregar primeiro um organograma simples de ponta a ponta, extrair componentes compartilhados e então construir o editor de processos. Isso testa cedo os maiores riscos: canvas, persistência, consistência do grafo, usabilidade e exportação.

**Horizonte sugerido:** 8 semanas para um MVP piloto, considerando uma equipe de 2 desenvolvedores full-stack e apoio parcial de produto/design. Com 1 desenvolvedor, usar 12 a 16 semanas. Estimativas devem ser recalibradas após a Fase 0.

## 2. Escopo recomendado

### 2.1 MVP Core - obrigatório

- Cadastro, login e logout;
- Um workspace automático por usuário;
- Cadastro mínimo de empresas/clientes;
- Lista simples de organogramas e processos;
- Editor de organogramas;
- Editor de fluxos de processos;
- Salvamento explícito confiável, restauração e aviso de alterações não salvas;
- Isolamento por workspace no servidor;
- Exportação PNG da área completa do diagrama;
- Estados de carregamento, vazio, erro e somente leitura;
- Testes automatizados das regras críticas e dos dois fluxos principais;
- Ambiente de homologação e instrumentação mínima de erros.

### 2.2 Deve vir logo depois do núcleo

- Duplicação de organogramas e processos;
- Layout automático básico;
- Atalhos de teclado, desfazer/refazer e seleção múltipla;
- Templates mínimos realmente úteis;
- Dashboard resumido;
- IA real limitada a organogramas e processos, após validar contratos com dados de teste;
- Compartilhamento somente leitura por link;
- PDF simples, se pilotos comprovarem necessidade.

### 2.3 Adiar

- IA mockada como funcionalidade comercial;
- Geração conjunta de “estrutura completa”;
- Cinco papéis e gestão de equipes;
- Múltiplos workspaces por usuário;
- RACI, POP, descrição de cargos e diagnósticos;
- BPMN completo, swimlanes, simulação e automação;
- Histórico de versões completo;
- Cobrança, planos e limites;
- Mobile para edição;
- DOCX, PPTX, marketplace, white label e integrações.

## 3. Análise crítica da documentação

### 3.1 O que faz sentido manter

- Foco em ferramenta de gestão, não canvas genérico;
- React Flow como base dos dois editores;
- Next.js full-stack, TypeScript, PostgreSQL, Prisma e Zod;
- Estruturas de nós e conexões editáveis, nunca apenas imagens;
- Multi-tenant desde a primeira operação de servidor;
- Processos persistidos de forma relacional, preparando RACI e POP;
- IA atrás de uma interface própria e resultado sempre revisável;
- Desktop como prioridade;
- PNG como primeira exportação;
- Evolução incremental, sem BPMN e colaboração em tempo real no MVP.

### 3.2 O que não faz sentido no primeiro corte

#### IA mockada como entrega de produto

Mocks são úteis para desenvolvimento e demonstração, mas não validam a proposta “texto para diagrama”. Um mock por palavra-chave mede a navegação, não a qualidade ou o valor da IA. Deve existir como fixture interna; a tela pública entra depois do editor manual estar sólido, preferencialmente com um provider real e limite controlado.

#### Templates antes da qualidade do editor

Templates aceleram a ativação, mas cada template cria conteúdo, telas e manutenção. Primeiro validar o editor com 1 fixture de organograma e 1 de processo. Depois publicar 2 templates de qualidade. Os 5 ou 10 segmentos documentados são backlog.

#### Dashboard completo

Contadores, últimos projetos e atalhos não validam o risco central. No MVP Core, a página inicial pode ser uma lista de projetos recentes com dois botões: “Novo organograma” e “Novo processo”.

#### PDF e histórico de exportações

O escopo é contraditório: PDF aparece como obrigatório, desejável e futuro. Adotar PNG obrigatório. PDF e `ExportHistory` só entram após uso real provar necessidade.

#### Permissões completas sem equipe

Cinco papéis são incompatíveis com o corte “um workspace por usuário, sem convites”. No MVP Core, basta `OWNER`. Preparar autorização por ação, mas habilitar `EDITOR` e `VIEWER` apenas quando convites/compartilhamento entrarem.

#### Campos excessivos

Fotos, telefone, e-mail, custo mensal, riscos, indicadores, documentos e sistemas aumentam formulários antes de provar valor. O núcleo deve mostrar poucos campos; dados avançados podem ficar em seção recolhida no pós-MVP.

### 3.3 Contradições que precisam ser resolvidas

| Tema | Contradição | Decisão recomendada |
|---|---|---|
| Autenticação | NextAuth, Clerk ou Supabase Auth | Escolher um na Fase 0; não criar abstração de três providers |
| Mutação de dados | Server Actions e API REST são propostos ao mesmo tempo | Server Actions para CRUD interno; Route Handlers só quando houver consumidor HTTP real |
| Hierarquia | `reportsToNodeId` e `OrgChartEdge` representam a mesma relação | No MVP, `reportsToNodeId` é a fonte canônica; edges do React Flow são derivados |
| Persistência | Criação por nó e salvamento integral coexistem | Edição local + comando transacional de snapshot com controle de revisão |
| Salvamento | Fluxos falam em salvar cada movimento; tela também tem botão Salvar | Autosave não entra primeiro; usar estado “alterado/salvando/salvo/erro” e botão Salvar |
| Exclusão | Soft delete geral e cascata física aparecem juntos | Soft delete para empresa/projeto; hard delete para nós/edges dentro do projeto |
| PDF | Obrigatório, desejável e futuro | Pós-MVP |
| Duplicação | Obrigatória no escopo e média nos requisitos | Pós-MVP imediato |
| Decisões do processo | Classificadas como médias | Promover rótulos de saídas para obrigatório; sem isso o fluxo perde significado |
| Templates | 5 e 10 segmentos aparecem em documentos diferentes | Começar com 2 após o MVP Core |
| Responsividade | Desktop/tablet e mobile limitado | Editor suportado oficialmente a partir de 1024 px; mobile apenas visualização futura |

### 3.4 Lacunas relevantes

- Não há política de conflito entre duas abas ou sessões;
- Não há limite operacional de nós/edges validado;
- Não há definição completa de desfazer/refazer, atalhos, copiar/colar e seleção múltipla;
- Exportação fala em “canvas visível”, mas o valor real exige o grafo completo;
- Não há comportamento fechado para excluir um cargo com subordinados;
- Não há regra para múltiplos superiores, linhas pontilhadas ou cargos matriciais;
- Processo não define claramente múltiplos inícios/fins, conexões duplicadas e nós órfãos;
- Não há contrato de revisão para impedir que um snapshot antigo sobrescreva um novo;
- Não há plano de acessibilidade do canvas;
- Testes E2E aparecem como futuros, mas os dois fluxos críticos precisam deles antes do piloto;
- Metas como “200 nós sem travar severamente” não têm cenário, máquina ou medição definidos;
- Documentos recomendados ausentes: requisitos não funcionais consolidado, matriz de permissões, especificação de exportação e plano de testes.

## 4. Decisões técnicas propostas

### 4.1 Arquitetura

- Monólito modular em Next.js App Router e TypeScript estrito;
- PostgreSQL com Prisma;
- Componentes de servidor por padrão; React Client Components somente no canvas e interações;
- Server Actions para casos de uso internos;
- Serviços de domínio recebem contexto autenticado, nunca `workspaceId` confiado ao cliente;
- Zod compartilhado na fronteira de entrada;
- React Flow encapsulado por adaptadores próprios;
- Testes unitários com Vitest e E2E com Playwright;
- Deploy de homologação na Vercel e PostgreSQL gerenciado.

### 4.2 Modelo mínimo

Implementar inicialmente:

- `User`;
- `Workspace`;
- `WorkspaceMember` apenas para ownership futuro;
- `ClientCompany`;
- `OrgChart`;
- `OrgChartNode` com `reportsToNodeId` canônico;
- `ProcessMap`;
- `ProcessNode`;
- `ProcessEdge`;
- `revision` inteiro em `OrgChart` e `ProcessMap` para concorrência otimista.

Não criar ainda `OrgChartEdge`, `AiGenerationLog`, templates em banco, export history, auditoria e entidades documentais. Se linhas matriciais forem requisito confirmado, substituir a relação simples por uma tabela `OrgChartRelation`; não manter duas fontes de verdade.

### 4.3 Estratégia de salvamento

1. Carregar projeto completo com `revision`;
2. Editar nós e edges no estado local;
3. Marcar editor como alterado;
4. Ao salvar, enviar snapshot normalizado e `expectedRevision`;
5. Validar ownership e grafo no servidor;
6. Persistir em transação e incrementar `revision`;
7. Se a revisão divergir, bloquear sobrescrita e pedir recarga.

O snapshot reduz chamadas durante drag. Mudanças de posição não devem gravar a cada pixel.

### 4.4 Regras do organograma

- Um cargo tem no máximo um superior direto no MVP;
- Cargo não pode ser superior de si próprio;
- Ciclos são bloqueados no cliente para feedback e no servidor para integridade;
- Ao excluir cargo com subordinados, o usuário escolhe: tornar subordinados raízes ou cancelar;
- Departamento e status são opcionais; título é obrigatório;
- Layout manual é persistido; layout automático entra depois.

### 4.5 Regras do processo

- Tipos iniciais: início, atividade, decisão e fim;
- Documento, sistema, aprovação e espera entram após o fluxo básico ou como variações visuais sem regra adicional;
- Origem e destino são obrigatórios e diferentes;
- Bloquear conexão idêntica duplicada;
- Decisão aceita múltiplas saídas e exige rótulo quando houver mais de uma;
- Alertar, sem bloquear, ausência de início/fim e nós órfãos;
- Ciclos são permitidos em processos;
- Título e tipo são obrigatórios; demais campos são opcionais.

### 4.6 Componentes compartilhados

- `DiagramShell`: toolbar, canvas, painel lateral e status de salvamento;
- `DiagramCanvas`: zoom, pan, seleção, fit view e background;
- `useDiagramDocument`: dirty state, save, conflito e recuperação de erro;
- `DiagramToolbar`;
- `PropertiesPanel`;
- `ExportPng`;
- Adaptadores banco ↔ React Flow separados por domínio;
- Validadores de grafo separados para organograma e processo.

Compartilhar infraestrutura, não forçar um modelo de domínio único para os dois editores.

## 5. Plano faseado

## Fase 0 - Fechamento de produto e arquitetura

**Duração:** 2 a 3 dias  
**Objetivo:** remover decisões abertas antes de gerar código.

### Entregas

- Registrar decisões de autenticação, banco hospedado, Server Actions e deploy;
- Aprovar o escopo MVP Core deste documento;
- Fechar regras de exclusão, hierarquia, decisão e salvamento;
- Criar wireframe dos dois editores em 1366×768 e 1440×900;
- Definir evento de ativação: empresa + primeiro diagrama salvo + exportado;
- Transformar os critérios do núcleo em backlog executável.

### Saída obrigatória

- Nenhuma decisão “A ou B” restante no caminho crítico;
- Backlog priorizado e estimado;
- 5 usuários-piloto identificados para testes nas Fases 3, 4 e 7.

## Fase 1 - Fundação executável

**Duração:** 1 semana  
**Objetivo:** aplicação implantada com segurança mínima.

### Implementação

- Inicializar Next.js, TypeScript estrito, Tailwind e componentes básicos;
- Configurar lint, format, testes, build e variáveis de ambiente;
- Configurar Prisma/PostgreSQL e primeira migration;
- Implementar cadastro, login, logout e criação atômica do workspace OWNER;
- Criar contexto autenticado no servidor;
- Criar proteção de rotas e autorização por ação;
- Criar layout privado simples;
- Criar seed de desenvolvimento;
- Publicar homologação.

### Critérios de saída

- Usuário cria conta e entra;
- Workspace nasce na mesma transação lógica;
- Rota privada bloqueia anônimo;
- Teste prova que um usuário não lê registro de outro workspace;
- Build, lint e testes passam no pipeline.

## Fase 2 - Empresa mínima e infraestrutura de diagramas

**Duração:** 1 semana  
**Objetivo:** preparar um fluxo vertical, sem construir dashboard amplo.

### Implementação

- CRUD mínimo de empresa: nome, segmento opcional e observações;
- Listas simples de organogramas e processos;
- Criar projeto vazio e abrir editor;
- Implementar `DiagramShell`, React Flow, nós de teste e painel lateral;
- Definir DTOs, schemas Zod e adaptadores;
- Implementar snapshot transacional com `revision`;
- Implementar status alterado/salvando/salvo/erro;
- Avisar ao sair com mudanças não salvas.

### Critérios de saída

- Um usuário cria empresa e projeto vazio;
- Um snapshot de teste persiste posições e restaura após recarga;
- Snapshot antigo não sobrescreve versão nova;
- Editor cabe nas resoluções-alvo sem painel encobrir canvas.

## Fase 3 - Editor de organogramas

**Duração:** 1,5 semana  
**Objetivo:** primeiro fluxo de valor completo.

### Implementação

- Card de cargo customizado;
- Adicionar, selecionar, editar, mover e excluir cargo;
- Campos: título, ocupante, departamento, status e observações;
- Conectar superior → subordinado;
- Selecionar superior também pelo painel;
- Validação de um superior por cargo, auto-relação e ciclos;
- Tratamento de subordinados na exclusão;
- Zoom, pan, fit view e centralização do primeiro nó;
- Modo somente leitura estruturalmente preparado;
- Exportar PNG do grafo completo com título e empresa;
- E2E do fluxo completo.

### Critérios de saída

- Criar organograma com pelo menos 30 cargos;
- Salvar, fechar e reabrir sem perda;
- Bloquear ciclo no cliente e no servidor;
- Exportar todos os nós, inclusive fora do viewport;
- Erro de salvamento não destrói edição local;
- Teste com 3 usuários-piloto conclui criação sem ajuda do time.

## Fase 4 - Editor de processos

**Duração:** 1,5 semana  
**Objetivo:** segundo fluxo de valor completo reutilizando a infraestrutura.

### Implementação

- Nós de início, atividade, decisão e fim;
- Adicionar, selecionar, editar, mover e excluir etapa;
- Conexões direcionais;
- Rótulos de conexão e edição do rótulo;
- Validações de self-loop e duplicidade;
- Alertas para falta de início, fim, rótulo e nós órfãos;
- Campos essenciais: título, descrição, área e cargo responsável;
- Campos avançados em seção recolhida ou adiados;
- Exportação PNG do grafo completo;
- E2E do fluxo com ramificação Sim/Não.

### Critérios de saída

- Criar processo com pelo menos 50 etapas e uma ramificação;
- Salvar, fechar e reabrir com rótulos e posições intactos;
- Decisão com múltiplas saídas permanece compreensível;
- Ciclos válidos de retrabalho podem ser representados;
- Exportação contém o grafo completo;
- Teste com 3 usuários-piloto conclui criação sem ajuda do time.

## Fase 5 - Robustez, UX essencial e qualidade

**Duração:** 1 semana  
**Objetivo:** transformar os editores em produto confiável.

### Implementação

- Refinar feedback de salvamento, erros e retry;
- Estados loading, empty, erro e not found;
- Ações destrutivas com confirmação;
- Acessibilidade básica: foco, nomes acessíveis e navegação do painel;
- Telemetria: criação, primeiro nó, primeiro save, exportação e erro;
- Logs estruturados no servidor sem conteúdo sensível;
- Testes de autorização, transações e validação de grafos;
- Teste E2E de isolamento multi-tenant;
- Teste de performance com 200 nós e cenário definido;
- Backup e estratégia de migration em homologação.

### Critérios de saída

- Zero falha crítica nos fluxos E2E;
- Nenhuma consulta de projeto sem escopo de workspace;
- Nenhuma perda de dados nos testes de falha de rede;
- Performance medida e registrada para 30/50/200 nós;
- Eventos de ativação visíveis em homologação.

## Fase 6 - Piloto controlado

**Duração:** 1 semana  
**Objetivo:** validar valor e usabilidade antes de ampliar escopo.

### Execução

- Onboard de 5 a 10 consultores/gestores;
- Cada participante cria um artefato real, não tutorial;
- Registrar tempo até primeiro save e primeira exportação;
- Observar sessões e classificar impedimentos;
- Corrigir somente bugs e fricções P0/P1;
- Decidir próximos recursos com evidência.

### Métricas de decisão

- ≥ 70% criam um diagrama real sem suporte direto;
- Mediana ≤ 15 minutos até primeiro diagrama salvo;
- ≥ 50% exportam o artefato;
- Zero incidente de perda ou vazamento de dados;
- Pelo menos 3 usuários declaram intenção concreta de continuar usando.

## Fase 7 - Aceleração de criação

**Início:** somente após aprovação do piloto  
**Objetivo:** reduzir tempo de tela em branco.

### Ordem recomendada

1. Duplicar projeto;
2. Layout automático básico;
3. Dois templates validados com clientes;
4. Desfazer/refazer, copiar/colar e seleção múltipla;
5. IA real para um artefato por vez;
6. Preview, alertas e salvamento da geração;
7. PDF simples, se solicitado no piloto.

### Gate para IA

- Contratos JSON únicos e versionados;
- Suite com pelo menos 30 entradas reais anonimizadas;
- Validação estrutural e de grafo;
- Limites de tamanho, timeout e custo;
- Consentimento e aviso de revisão;
- Métrica de quanto o usuário altera antes de aceitar.

## Fase 8 - Gestão organizacional

**Objetivo:** transformar diagramas validados em documentação.

### Ordem sugerida

1. Catálogo de cargos derivado do organograma;
2. Matriz RACI derivada do processo;
3. Descrição de cargos;
4. POP;
5. Diagnósticos baseados primeiro em regras determinísticas;
6. Histórico de versões e comparação;
7. Compartilhamento por link e comentários;
8. Equipes e papéis reais.

RACI e POP dependem de áreas e responsáveis bem preenchidos. Não implementá-los antes de medir a qualidade desses dados nos processos reais.

## Fase 9 - SaaS comercial e escala

- Planos, limites e cobrança;
- Convites, múltiplos workspaces e permissões refinadas;
- Auditoria e observabilidade gerenciada;
- Colaboração em tempo real, apenas se houver demanda;
- Storage, anexos e importações;
- Exportações profissionais;
- API pública, integrações, white label e marketplace.

## 6. Backlog do MVP Core por prioridade

### P0 - bloqueia piloto

- Autenticação e workspace seguro;
- Empresa mínima;
- Criar/listar/abrir projetos;
- CRUD visual de nós;
- Conexões e validações do domínio;
- Snapshot, revisão e recuperação de erro;
- Reabertura fiel;
- PNG completo;
- Autorização no servidor;
- E2E dos dois caminhos.

### P1 - necessário para boa experiência

- Read-only preparado;
- Filtros simples por empresa;
- Confirmações destrutivas;
- Fit view e empty states;
- Alertas de integridade do processo;
- Telemetria e logs de erro;
- Teste de performance.

### P2 - não bloqueia piloto

- Duplicação;
- Compacto/detalhado;
- Minimap;
- Layout automático;
- Templates;
- Dashboard com contadores;
- PDF;
- IA.

## 7. Estratégia de testes

| Camada | Cobertura mínima |
|---|---|
| Unidade | ciclo hierárquico, conexões inválidas, normalização, schemas e permissões |
| Integração | services com banco, transação de snapshot, revisão e isolamento de workspace |
| Componentes | cards, painel, toolbar e estados de salvamento |
| E2E | cadastro → empresa → organograma → salvar → reabrir → exportar |
| E2E | login → empresa → processo ramificado → salvar → reabrir → exportar |
| Segurança | troca de IDs entre workspaces deve retornar not found/forbidden |
| Performance | 30, 50 e 200 nós; drag, zoom, save e exportação medidos |
| Recuperação | falha de rede, erro no save, conflito de revisão e refresh com alterações |

## 8. Definition of Done

Uma história só está pronta quando:

- Critérios de aceite objetivos passam;
- Validação existe no cliente e no servidor quando aplicável;
- Ownership/workspace é verificado no servidor;
- Loading, vazio, erro e sucesso foram tratados;
- Testes automatizados proporcionais ao risco passam;
- Build, lint e typecheck passam;
- Telemetria não registra dados pessoais indevidos;
- Fluxo foi revisado em 1366×768 e 1440×900;
- Documentação e migration foram atualizadas;
- Não há perda silenciosa de dados.

## 9. Riscos e mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|---|---:|---:|---|
| Canvas consumir todo o prazo | Alta | Alto | Vertical slice cedo; limitar recursos; reutilizar infraestrutura |
| Perda de alterações | Média | Crítico | Dirty state, snapshot transacional, retry e revisão otimista |
| Duas fontes da hierarquia divergirem | Alta | Alto | Uma fonte canônica |
| Vazamento entre workspaces | Média | Crítico | Contexto autenticado, services escopados e testes negativos |
| Exportar apenas viewport | Alta | Alto | Teste com nós fora da tela; cálculo de bounds completo |
| IA atrasar núcleo | Alta | Médio | Retirar da trilha crítica |
| Editor parecer genérico | Média | Alto | Campos e validações específicos do domínio; pilotos reais |
| Formulários ficarem pesados | Alta | Médio | Campos essenciais primeiro; seção avançada recolhida |
| Escopo voltar a inflar | Alta | Alto | Gates por fase e P0/P1/P2 explícitos |

## 10. Próximas ações imediatas

1. Aprovar ou ajustar o escopo MVP Core;
2. Escolher autenticação e PostgreSQL hospedado;
3. Fechar as cinco regras abertas: exclusão, superior único, salvamento, tipos iniciais de processo e PDF;
4. Produzir wireframes dos dois editores;
5. Criar backlog da Fase 1 e iniciar a fundação;
6. Agendar os primeiros usuários-piloto antes da implementação dos editores.

## 11. Documentos-fonte

- [PRD](./prd.md)
- [Escopo atual do MVP](./mvp-scope.md)
- [Requisitos funcionais](./functional-requirements.md)
- [Histórias de usuário](./user-stories.md)
- [Fluxos de usuário](./user-flows.md)
- [Mapa de telas](./screen-map.md)
- [Modelo de dados](./data-model.md)
- [Arquitetura técnica](./technical-architecture.md)
- [Rotas de API](./api-routes.md)
- [Especificação de IA](./ai-specification.md)

