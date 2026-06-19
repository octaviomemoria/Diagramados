# User Flows — Diagramados

**Documento:** Fluxos de Usuário  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento descreve os principais fluxos de usuário do **Diagramados**, detalhando passo a passo como os usuários devem navegar e executar ações dentro da plataforma.

O objetivo é orientar:

- Desenvolvimento das telas;
- Definição de rotas;
- Arquitetura de navegação;
- Experiência do usuário;
- Testes funcionais;
- Priorização do MVP.

Este documento complementa:

- `prd.md`;
- `mvp-scope.md`;
- `functional-requirements.md`;
- `user-stories.md`.

---

## 2. Convenções utilizadas

Cada fluxo é descrito com:

- Código do fluxo;
- Nome do fluxo;
- Persona principal;
- Objetivo;
- Pré-condições;
- Gatilho;
- Passo a passo;
- Resultado esperado;
- Exceções;
- Critérios de aceite.

Código padrão:

```txt
UF-[MÓDULO]-[NÚMERO]
```

Exemplo:

```txt
UF-AUTH-001
UF-COMP-001
UF-ORG-001
UF-PROC-001
UF-AI-001
```

---

## 3. Mapa geral de navegação

Estrutura principal de navegação prevista:

```txt
/auth/login
/auth/register

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

/jobs
/pops
/diagnostics
/settings
```

No MVP, as telas prioritárias são:

- Login;
- Cadastro;
- Dashboard;
- Empresas;
- Cadastro de empresa;
- Lista de organogramas;
- Editor de organograma;
- Lista de processos;
- Editor de processo;
- Criar com IA;
- Templates.

---

# 4. Fluxos de autenticação

## UF-AUTH-001 — Cadastro de novo usuário

**Persona principal:** Novo usuário  
**Prioridade:** Alta  
**Módulo:** Autenticação  

### Objetivo

Permitir que um novo usuário crie sua conta e acesse o sistema.

### Pré-condições

- O usuário ainda não possui conta;
- O usuário acessou a página pública do sistema.

### Gatilho

O usuário clica em **Criar conta**.

### Fluxo principal

1. Sistema exibe tela de cadastro.
2. Usuário informa:
   - Nome;
   - E-mail;
   - Senha;
   - Confirmação de senha.
3. Usuário clica em **Criar conta**.
4. Sistema valida os campos.
5. Sistema verifica se o e-mail já está cadastrado.
6. Sistema cria o usuário.
7. Sistema cria automaticamente um workspace inicial.
8. Sistema autentica o usuário.
9. Sistema redireciona para o dashboard.

### Resultado esperado

Usuário cadastrado, autenticado e com workspace inicial criado.

### Exceções

| Situação | Comportamento esperado |
|---|---|
| E-mail inválido | Exibir mensagem de validação |
| Senha vazia | Exibir campo obrigatório |
| Senhas diferentes | Exibir erro de confirmação |
| E-mail já cadastrado | Informar que o e-mail já está em uso |
| Erro no servidor | Exibir mensagem genérica e permitir nova tentativa |

### Critérios de aceite

- O usuário deve conseguir criar conta válida;
- O workspace deve ser criado automaticamente;
- O usuário deve ser redirecionado para `/dashboard`;
- O sistema não deve permitir e-mails duplicados.

---

## UF-AUTH-002 — Login

**Persona principal:** Usuário cadastrado  
**Prioridade:** Alta  
**Módulo:** Autenticação  

### Objetivo

Permitir que o usuário acesse sua conta.

### Pré-condições

- Usuário possui conta cadastrada;
- Usuário está deslogado.

### Gatilho

Usuário acessa `/auth/login`.

### Fluxo principal

1. Sistema exibe tela de login.
2. Usuário informa e-mail e senha.
3. Usuário clica em **Entrar**.
4. Sistema valida os campos.
5. Sistema autentica credenciais.
6. Sistema cria sessão.
7. Sistema redireciona para `/dashboard`.

### Resultado esperado

Usuário autenticado e direcionado para o dashboard.

### Exceções

| Situação | Comportamento esperado |
|---|---|
| E-mail não informado | Exibir campo obrigatório |
| Senha não informada | Exibir campo obrigatório |
| Credenciais inválidas | Exibir mensagem de erro |
| Erro no servidor | Exibir erro genérico |

### Critérios de aceite

- Login válido deve funcionar;
- Login inválido deve ser bloqueado;
- Usuário autenticado não deve permanecer na página de login.

---

## UF-AUTH-003 — Logout

**Persona principal:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Autenticação  

### Objetivo

Permitir que o usuário encerre sua sessão.

### Pré-condições

- Usuário está autenticado.

### Gatilho

Usuário clica em **Sair**.

### Fluxo principal

1. Usuário abre menu de conta.
2. Usuário clica em **Sair**.
3. Sistema encerra a sessão.
4. Sistema redireciona para `/auth/login`.

### Resultado esperado

Sessão encerrada.

### Critérios de aceite

- Usuário deve perder acesso às rotas privadas;
- Usuário deve ser redirecionado para login;
- Ao tentar acessar `/dashboard`, deve ser redirecionado novamente para login.

---

# 5. Fluxos de dashboard

## UF-DASH-001 — Primeiro acesso ao dashboard

**Persona principal:** Novo usuário  
**Prioridade:** Alta  
**Módulo:** Dashboard  

### Objetivo

Orientar o usuário no primeiro uso da plataforma.

### Pré-condições

- Usuário está autenticado;
- Usuário ainda não possui empresas cadastradas.

### Gatilho

Usuário acessa `/dashboard`.

### Fluxo principal

1. Sistema carrega dashboard.
2. Sistema identifica que não há empresas cadastradas.
3. Sistema exibe estado vazio.
4. Sistema apresenta chamada para ação:
   - **Cadastrar primeira empresa**;
   - **Criar com IA**;
   - **Ver templates**.
5. Usuário escolhe o próximo passo.

### Resultado esperado

Usuário entende como começar.

### Critérios de aceite

- O dashboard não deve ficar vazio sem orientação;
- Deve haver pelo menos uma ação clara;
- O usuário deve conseguir iniciar cadastro de empresa a partir do dashboard.

---

## UF-DASH-002 — Acessar projeto recente

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Dashboard  

### Objetivo

Permitir que o usuário continue rapidamente um trabalho em andamento.

### Pré-condições

- Usuário está autenticado;
- Existem organogramas ou processos salvos.

### Gatilho

Usuário acessa o dashboard.

### Fluxo principal

1. Sistema carrega últimos projetos editados.
2. Sistema exibe cards ou lista com:
   - Nome do projeto;
   - Tipo;
   - Empresa;
   - Data de atualização.
3. Usuário clica em um projeto.
4. Sistema abre o editor correspondente.

### Resultado esperado

Usuário acessa rapidamente um projeto salvo.

### Critérios de aceite

- Projetos recentes devem estar ordenados por atualização;
- Clique em organograma deve abrir editor de organograma;
- Clique em processo deve abrir editor de processo.

---

# 6. Fluxos de empresas/clientes

## UF-COMP-001 — Cadastrar empresa

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

### Objetivo

Cadastrar uma empresa ou cliente para vincular organogramas e processos.

### Pré-condições

- Usuário está autenticado;
- Usuário possui workspace ativo.

### Gatilho

Usuário clica em **Nova empresa**.

### Fluxo principal

1. Sistema abre tela `/companies/new`.
2. Sistema exibe formulário de empresa.
3. Usuário informa:
   - Nome da empresa;
   - Segmento;
   - Porte;
   - Número de colaboradores;
   - Observações.
4. Usuário clica em **Salvar**.
5. Sistema valida os campos.
6. Sistema salva empresa vinculada ao workspace.
7. Sistema redireciona para página de detalhes da empresa.

### Resultado esperado

Empresa cadastrada com sucesso.

### Exceções

| Situação | Comportamento esperado |
|---|---|
| Nome não informado | Exibir campo obrigatório |
| Erro ao salvar | Exibir mensagem de erro |
| Usuário sem permissão | Bloquear ação |

### Critérios de aceite

- Empresa deve aparecer na listagem;
- Empresa deve estar vinculada ao workspace correto;
- Dados devem persistir após recarregar a página.

---

## UF-COMP-002 — Listar empresas

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

### Objetivo

Visualizar empresas cadastradas no workspace.

### Pré-condições

- Usuário está autenticado;
- Existem ou não empresas cadastradas.

### Gatilho

Usuário acessa `/companies`.

### Fluxo principal

1. Sistema consulta empresas do workspace.
2. Sistema exibe tabela ou cards.
3. Para cada empresa, exibe:
   - Nome;
   - Segmento;
   - Porte;
   - Data de atualização;
   - Ações.
4. Usuário pode:
   - Ver detalhes;
   - Editar;
   - Excluir;
   - Criar nova empresa.

### Resultado esperado

Usuário visualiza apenas empresas do workspace ativo.

### Critérios de aceite

- Empresas de outros workspaces não devem aparecer;
- Estado vazio deve orientar o usuário;
- Busca por nome deve estar disponível no pós-MVP ou MVP, se simples.

---

## UF-COMP-003 — Editar empresa

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

### Objetivo

Atualizar dados de uma empresa cadastrada.

### Pré-condições

- Usuário está autenticado;
- Empresa existe;
- Usuário tem permissão.

### Gatilho

Usuário clica em **Editar empresa**.

### Fluxo principal

1. Sistema abre formulário com dados atuais.
2. Usuário altera as informações.
3. Usuário clica em **Salvar alterações**.
4. Sistema valida campos.
5. Sistema atualiza registro.
6. Sistema retorna para detalhes da empresa.

### Resultado esperado

Dados atualizados.

### Critérios de aceite

- Alterações devem persistir;
- `updatedAt` deve ser atualizado;
- Usuário sem permissão não deve editar.

---

## UF-COMP-004 — Excluir empresa

**Persona principal:** Administrador  
**Prioridade:** Alta  
**Módulo:** Empresas  

### Objetivo

Remover uma empresa cadastrada.

### Pré-condições

- Usuário está autenticado;
- Usuário possui permissão;
- Empresa existe.

### Gatilho

Usuário clica em **Excluir empresa**.

### Fluxo principal

1. Sistema exibe modal de confirmação.
2. Sistema informa impacto da exclusão.
3. Usuário confirma.
4. Sistema exclui ou marca empresa como removida.
5. Sistema retorna à listagem.

### Resultado esperado

Empresa removida da listagem.

### Exceções

| Situação | Comportamento esperado |
|---|---|
| Usuário cancela | Nenhuma alteração ocorre |
| Empresa tem projetos vinculados | Sistema informa impacto |
| Erro ao excluir | Sistema exibe erro |

### Critérios de aceite

- Exclusão deve exigir confirmação;
- Usuário sem permissão não pode excluir;
- A listagem deve ser atualizada.

---

# 7. Fluxos de organogramas

## UF-ORG-001 — Criar organograma manualmente

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

### Objetivo

Criar um organograma vazio para edição manual.

### Pré-condições

- Usuário está autenticado;
- Existe pelo menos uma empresa cadastrada.

### Gatilho

Usuário clica em **Novo organograma**.

### Fluxo principal

1. Sistema abre tela de criação.
2. Usuário informa:
   - Nome do organograma;
   - Empresa vinculada;
   - Descrição opcional.
3. Usuário clica em **Criar organograma**.
4. Sistema cria registro.
5. Sistema abre o editor visual.
6. Canvas é exibido vazio com instrução para adicionar primeiro cargo.

### Resultado esperado

Organograma criado e pronto para edição.

### Critérios de aceite

- Organograma deve estar vinculado à empresa;
- Deve abrir no editor;
- Deve ser salvo no workspace correto.

---

## UF-ORG-002 — Adicionar cargo ao organograma

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

### Objetivo

Inserir cargos no organograma.

### Pré-condições

- Usuário está no editor de organograma;
- Usuário tem permissão de edição.

### Gatilho

Usuário clica em **Adicionar cargo**.

### Fluxo principal

1. Sistema cria novo card no canvas.
2. Sistema abre painel lateral de edição.
3. Usuário informa:
   - Nome do cargo;
   - Departamento;
   - Ocupante;
   - Status;
   - Observações.
4. Usuário salva.
5. Sistema atualiza o card visual.
6. Sistema persiste o cargo no banco.

### Resultado esperado

Cargo adicionado ao organograma.

### Critérios de aceite

- Cargo deve aparecer no canvas;
- Cargo deve manter posição;
- Cargo deve persistir após recarregar.

---

## UF-ORG-003 — Conectar cargos

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

### Objetivo

Definir relação hierárquica entre cargos.

### Pré-condições

- Existem pelo menos dois cargos no canvas;
- Usuário tem permissão de edição.

### Gatilho

Usuário arrasta conexão de um cargo para outro.

### Fluxo principal

1. Usuário seleciona ponto de conexão do cargo superior.
2. Usuário arrasta até o cargo subordinado.
3. Sistema cria conexão visual.
4. Sistema valida se a conexão não gera ciclo.
5. Sistema salva relação hierárquica.
6. Sistema atualiza campo `reportsTo`.

### Resultado esperado

Hierarquia definida entre cargos.

### Exceções

| Situação | Comportamento esperado |
|---|---|
| Conexão circular | Bloquear e exibir aviso |
| Mesmo cargo como origem e destino | Bloquear |
| Falha ao salvar | Reverter conexão visual |

### Critérios de aceite

- Conexão deve persistir;
- Hierarquia deve ser recuperada ao reabrir;
- Sistema deve evitar ciclos.

---

## UF-ORG-004 — Editar cargo

**Persona principal:** Gestor de RH  
**Prioridade:** Alta  
**Módulo:** Organogramas  

### Objetivo

Atualizar informações de um cargo.

### Pré-condições

- Usuário está no editor;
- Existe ao menos um cargo;
- Usuário tem permissão.

### Gatilho

Usuário clica em um card de cargo.

### Fluxo principal

1. Sistema seleciona o cargo.
2. Sistema abre painel lateral com dados.
3. Usuário altera informações.
4. Usuário salva.
5. Sistema atualiza card.
6. Sistema persiste alterações.

### Resultado esperado

Cargo atualizado.

### Critérios de aceite

- Alterações devem refletir imediatamente no card;
- Dados devem persistir;
- Campos obrigatórios devem ser validados.

---

## UF-ORG-005 — Reposicionar cargos

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

### Objetivo

Organizar visualmente o organograma.

### Pré-condições

- Usuário está no editor;
- Existem cargos no canvas.

### Gatilho

Usuário arrasta um card de cargo.

### Fluxo principal

1. Usuário clica e arrasta o cargo.
2. Sistema atualiza posição no canvas.
3. Usuário solta o cargo.
4. Sistema salva posição X e Y.

### Resultado esperado

Cargo reposicionado.

### Critérios de aceite

- Posição deve ser mantida após recarregar;
- O movimento deve ser fluido;
- Conexões devem acompanhar o cargo.

---

## UF-ORG-006 — Exportar organograma em PNG

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas / Exportação  

### Objetivo

Exportar organograma para uso externo.

### Pré-condições

- Organograma existe;
- Usuário está no editor ou página de detalhes.

### Gatilho

Usuário clica em **Exportar PNG**.

### Fluxo principal

1. Sistema prepara área do canvas.
2. Sistema gera imagem PNG.
3. Sistema cria nome de arquivo.
4. Sistema inicia download.

### Resultado esperado

Arquivo PNG baixado.

### Critérios de aceite

- PNG deve ser válido;
- Deve conter o diagrama visível;
- Nome do arquivo deve conter nome do organograma.

---

# 8. Fluxos de processos

## UF-PROC-001 — Criar processo manualmente

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

### Objetivo

Criar um fluxo de processo vazio para edição manual.

### Pré-condições

- Usuário está autenticado;
- Existe pelo menos uma empresa cadastrada.

### Gatilho

Usuário clica em **Novo processo**.

### Fluxo principal

1. Sistema abre tela de criação.
2. Usuário informa:
   - Nome do processo;
   - Empresa vinculada;
   - Descrição opcional.
3. Usuário clica em **Criar processo**.
4. Sistema cria registro.
5. Sistema abre editor visual.
6. Canvas aparece vazio com orientação para adicionar primeira etapa.

### Resultado esperado

Processo criado e pronto para edição.

### Critérios de aceite

- Processo deve estar vinculado à empresa;
- Deve abrir no editor;
- Deve ser salvo no workspace correto.

---

## UF-PROC-002 — Adicionar etapa ao processo

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

### Objetivo

Inserir uma etapa no fluxo.

### Pré-condições

- Usuário está no editor de processo;
- Usuário tem permissão de edição.

### Gatilho

Usuário clica em **Adicionar etapa**.

### Fluxo principal

1. Sistema exibe opções de tipo de etapa:
   - Início;
   - Atividade;
   - Decisão;
   - Documento;
   - Sistema;
   - Aprovação;
   - Espera;
   - Fim.
2. Usuário seleciona tipo.
3. Sistema cria card no canvas.
4. Sistema abre painel lateral.
5. Usuário informa dados da etapa.
6. Sistema salva etapa.

### Resultado esperado

Etapa adicionada ao processo.

### Critérios de aceite

- Etapa deve aparecer no canvas;
- Tipo deve ser identificado visualmente;
- Etapa deve persistir após recarregar.

---

## UF-PROC-003 — Conectar etapas

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

### Objetivo

Definir sequência entre etapas do processo.

### Pré-condições

- Existem pelo menos duas etapas;
- Usuário tem permissão de edição.

### Gatilho

Usuário arrasta conexão entre etapas.

### Fluxo principal

1. Usuário inicia conexão na etapa de origem.
2. Usuário solta conexão na etapa de destino.
3. Sistema cria seta direcional.
4. Sistema salva conexão.
5. Sistema atualiza fluxo visual.

### Resultado esperado

Etapas conectadas.

### Critérios de aceite

- Conexão deve possuir origem e destino;
- Conexão deve persistir;
- Seta deve indicar direção.

---

## UF-PROC-004 — Editar etapa

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

### Objetivo

Atualizar dados de uma etapa do processo.

### Pré-condições

- Usuário está no editor;
- Existe etapa criada.

### Gatilho

Usuário clica em uma etapa.

### Fluxo principal

1. Sistema seleciona etapa.
2. Sistema abre painel lateral.
3. Usuário altera:
   - Nome;
   - Descrição;
   - Área responsável;
   - Cargo responsável;
   - Observações.
4. Usuário salva.
5. Sistema atualiza card visual.
6. Sistema persiste dados.

### Resultado esperado

Etapa atualizada.

### Critérios de aceite

- Alterações devem aparecer no card;
- Dados devem persistir;
- Campos obrigatórios devem ser validados.

---

## UF-PROC-005 — Criar decisão com saídas

**Persona principal:** Analista de processos  
**Prioridade:** Média  
**Módulo:** Processos  

### Objetivo

Representar alternativas no fluxo.

### Pré-condições

- Usuário está no editor;
- Existe uma etapa do tipo decisão.

### Gatilho

Usuário conecta a decisão a outras etapas.

### Fluxo principal

1. Usuário seleciona etapa de decisão.
2. Usuário cria conexão para uma etapa.
3. Sistema permite informar rótulo da conexão.
4. Usuário define rótulo, como:
   - Sim;
   - Não;
   - Aprovado;
   - Reprovado.
5. Sistema salva conexão com rótulo.

### Resultado esperado

Decisão com saídas identificadas.

### Critérios de aceite

- Decisão deve permitir múltiplas saídas;
- Conexões devem aceitar rótulos;
- Rótulos devem aparecer visualmente.

---

## UF-PROC-006 — Exportar processo em PNG

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Processos / Exportação  

### Objetivo

Exportar fluxo de processo para uso externo.

### Pré-condições

- Processo existe;
- Usuário está no editor ou página de detalhes.

### Gatilho

Usuário clica em **Exportar PNG**.

### Fluxo principal

1. Sistema captura o canvas.
2. Sistema gera imagem PNG.
3. Sistema cria nome de arquivo.
4. Sistema inicia download.

### Resultado esperado

Arquivo PNG baixado.

### Critérios de aceite

- PNG deve ser válido;
- Deve preservar layout visual;
- Nome do arquivo deve conter nome do processo.

---

# 9. Fluxos de criação com IA

## UF-AI-001 — Gerar organograma com IA mockada

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** IA / Organogramas  

### Objetivo

Gerar organograma inicial a partir de texto.

### Pré-condições

- Usuário está autenticado;
- Existe uma empresa cadastrada;
- Provider de IA pode estar configurado como `mock`.

### Gatilho

Usuário acessa `/ai-create` e escolhe **Organograma**.

### Fluxo principal

1. Sistema exibe tela Criar com IA.
2. Usuário seleciona empresa de destino.
3. Usuário escolhe tipo **Organograma**.
4. Usuário informa descrição textual.
5. Usuário clica em **Gerar**.
6. Sistema envia texto para `aiService`.
7. `aiService` retorna JSON mockado.
8. Sistema renderiza preview do organograma.
9. Usuário revisa.
10. Usuário clica em **Salvar organograma**.
11. Sistema cria organograma editável.
12. Sistema redireciona para editor.

### Resultado esperado

Organograma criado a partir da descrição.

### Critérios de aceite

- Texto vazio deve ser bloqueado;
- JSON retornado deve ser validado;
- Preview deve aparecer antes de salvar;
- Organograma salvo deve ser editável.

---

## UF-AI-002 — Gerar processo com IA mockada

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** IA / Processos  

### Objetivo

Gerar fluxo inicial a partir de texto.

### Pré-condições

- Usuário está autenticado;
- Existe uma empresa cadastrada;
- Provider pode estar em modo mock.

### Gatilho

Usuário acessa `/ai-create` e escolhe **Processo**.

### Fluxo principal

1. Sistema exibe tela Criar com IA.
2. Usuário seleciona empresa de destino.
3. Usuário escolhe tipo **Processo**.
4. Usuário informa descrição textual.
5. Usuário clica em **Gerar**.
6. Sistema envia texto para `aiService`.
7. `aiService` retorna JSON mockado.
8. Sistema renderiza preview do processo.
9. Usuário revisa.
10. Usuário clica em **Salvar processo**.
11. Sistema cria processo editável.
12. Sistema redireciona para editor.

### Resultado esperado

Processo criado a partir da descrição.

### Critérios de aceite

- Deve haver validação de texto;
- Preview deve ser renderizado;
- Processo salvo deve abrir no editor.

---

## UF-AI-003 — Gerar organograma e processo juntos

**Persona principal:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** IA  

### Objetivo

Gerar estrutura inicial completa de empresa.

### Pré-condições

- Usuário está autenticado;
- Existe empresa cadastrada.

### Gatilho

Usuário escolhe opção **Organograma + Processo**.

### Fluxo principal

1. Usuário seleciona empresa.
2. Usuário informa texto descrevendo empresa e operação.
3. Usuário clica em **Gerar**.
4. Sistema retorna:
   - Organograma;
   - Processo.
5. Sistema exibe dois previews.
6. Usuário escolhe salvar um ou ambos.
7. Sistema cria os projetos correspondentes.

### Resultado esperado

Organograma e processo criados a partir de um único texto.

### Critérios de aceite

- Deve ser possível salvar separadamente;
- Falha em um item não deve impedir salvar o outro;
- Logs devem registrar a geração.

---

## UF-AI-004 — Registrar log de geração

**Persona principal:** Administrador / Sistema  
**Prioridade:** Alta  
**Módulo:** IA / Logs  

### Objetivo

Registrar histórico das gerações para auditoria, melhoria e controle.

### Pré-condições

- Usuário executa uma geração com IA ou mock.

### Gatilho

Sistema recebe resposta do `aiService`.

### Fluxo principal

1. Sistema recebe entrada textual.
2. Sistema identifica tipo de geração.
3. Sistema registra:
   - Usuário;
   - Workspace;
   - Empresa;
   - Tipo;
   - Provider;
   - Entrada;
   - Saída;
   - Status;
   - Erro, se houver.
4. Sistema salva log.

### Resultado esperado

Geração registrada.

### Critérios de aceite

- Geração bem-sucedida deve registrar status `success`;
- Geração com erro deve registrar status `error`;
- Log deve estar vinculado ao workspace.

---

# 10. Fluxos de templates

## UF-TEMP-001 — Visualizar templates

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Templates  

### Objetivo

Encontrar modelos prontos por segmento.

### Pré-condições

- Usuário está autenticado;
- Existem templates cadastrados em JSON ou banco.

### Gatilho

Usuário acessa `/templates`.

### Fluxo principal

1. Sistema carrega lista de templates.
2. Sistema exibe:
   - Nome;
   - Segmento;
   - Descrição;
   - Tipo de conteúdo.
3. Usuário pode filtrar por segmento.
4. Usuário clica em um template.
5. Sistema exibe detalhes.

### Resultado esperado

Usuário visualiza templates disponíveis.

### Critérios de aceite

- Lista deve carregar corretamente;
- Estado vazio deve existir;
- Template deve ter detalhes acessíveis.

---

## UF-TEMP-002 — Criar organograma a partir de template

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Templates / Organogramas  

### Objetivo

Criar organograma rapidamente a partir de modelo.

### Pré-condições

- Usuário está autenticado;
- Existe pelo menos uma empresa;
- Template possui organograma base.

### Gatilho

Usuário clica em **Usar template**.

### Fluxo principal

1. Sistema exibe detalhes do template.
2. Usuário seleciona empresa de destino.
3. Usuário escolhe criar organograma.
4. Sistema cria organograma com nós do template.
5. Sistema redireciona para editor.
6. Usuário edita conforme necessário.

### Resultado esperado

Organograma criado com base no template.

### Critérios de aceite

- Estrutura do template deve ser copiada;
- Novo organograma deve ser independente do template;
- Usuário deve poder editar.

---

## UF-TEMP-003 — Criar processo a partir de template

**Persona principal:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Templates / Processos  

### Objetivo

Criar processo rapidamente a partir de modelo.

### Pré-condições

- Usuário está autenticado;
- Existe pelo menos uma empresa;
- Template possui processo base.

### Gatilho

Usuário clica em **Criar processo com este template**.

### Fluxo principal

1. Sistema exibe detalhes do template.
2. Usuário seleciona empresa de destino.
3. Usuário escolhe criar processo.
4. Sistema cria processo com etapas e conexões do template.
5. Sistema redireciona para editor.
6. Usuário edita conforme necessário.

### Resultado esperado

Processo criado com base no template.

### Critérios de aceite

- Processo deve ser editável;
- Etapas e conexões devem ser preservadas;
- Novo processo deve pertencer ao workspace.

---

# 11. Fluxos de exportação

## UF-EXP-001 — Exportar PNG pelo editor

**Persona principal:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Exportação  

### Objetivo

Permitir exportação rápida do diagrama aberto.

### Pré-condições

- Usuário está no editor;
- Existe diagrama carregado.

### Gatilho

Usuário clica em **Exportar PNG**.

### Fluxo principal

1. Sistema identifica tipo de projeto:
   - Organograma;
   - Processo.
2. Sistema captura o canvas.
3. Sistema gera arquivo PNG.
4. Sistema define nome de arquivo.
5. Sistema inicia download.
6. Sistema pode registrar histórico de exportação futuramente.

### Resultado esperado

Arquivo PNG gerado e baixado.

### Critérios de aceite

- Exportação deve funcionar em organogramas;
- Exportação deve funcionar em processos;
- Arquivo deve conter diagrama visível.

---

## UF-EXP-002 — Exportar PDF simples

**Persona principal:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Exportação  

### Objetivo

Gerar arquivo PDF com informações básicas e imagem do diagrama.

### Pré-condições

- Usuário está no editor ou tela do projeto;
- Projeto possui diagrama.

### Gatilho

Usuário clica em **Exportar PDF**.

### Fluxo principal

1. Sistema captura informações do projeto.
2. Sistema captura imagem do canvas.
3. Sistema monta PDF com:
   - Nome da empresa;
   - Nome do projeto;
   - Tipo do projeto;
   - Data;
   - Imagem do diagrama.
4. Sistema gera arquivo.
5. Sistema inicia download.

### Resultado esperado

PDF simples gerado.

### Critérios de aceite

- PDF deve abrir corretamente;
- Deve conter informações mínimas;
- Diagrama deve estar visível.

---

# 12. Fluxos pós-MVP

Os fluxos abaixo são importantes, mas não pertencem obrigatoriamente ao MVP.

---

## UF-RACI-001 — Gerar matriz RACI

**Persona principal:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** RACI  

### Objetivo

Gerar matriz de responsabilidades a partir de um processo.

### Fluxo resumido

1. Usuário abre processo.
2. Usuário clica em **Gerar RACI**.
3. Sistema identifica etapas e cargos responsáveis.
4. Sistema monta matriz.
5. Usuário edita valores R, A, C e I.
6. Sistema salva matriz.

### Resultado esperado

Matriz RACI editável criada.

---

## UF-POP-001 — Gerar POP

**Persona principal:** Analista de processos  
**Prioridade:** Média  
**Módulo:** POP  

### Objetivo

Transformar processo em procedimento operacional.

### Fluxo resumido

1. Usuário abre processo.
2. Usuário clica em **Gerar POP**.
3. Sistema usa etapas do processo.
4. Sistema cria documento estruturado.
5. Usuário edita texto.
6. Usuário salva POP.

### Resultado esperado

POP criado e vinculado ao processo.

---

## UF-JOB-001 — Gerar descrição de cargo

**Persona principal:** Gestor de RH  
**Prioridade:** Média  
**Módulo:** Cargos  

### Objetivo

Criar descrição de cargo com base no organograma.

### Fluxo resumido

1. Usuário abre organograma.
2. Usuário seleciona cargo.
3. Usuário clica em **Gerar descrição de cargo**.
4. Sistema cria texto estruturado.
5. Usuário edita e salva.

### Resultado esperado

Descrição de cargo criada.

---

## UF-DIAG-001 — Diagnosticar processo

**Persona principal:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Diagnóstico  

### Objetivo

Identificar gargalos e riscos em um processo.

### Fluxo resumido

1. Usuário abre processo.
2. Usuário clica em **Diagnosticar**.
3. Sistema analisa etapas, responsáveis e conexões.
4. Sistema gera lista de problemas.
5. Sistema classifica gravidade.
6. Sistema sugere melhorias.

### Resultado esperado

Diagnóstico gerado.

---

## UF-DIAG-002 — Diagnosticar organograma

**Persona principal:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Diagnóstico  

### Objetivo

Identificar riscos estruturais no organograma.

### Fluxo resumido

1. Usuário abre organograma.
2. Usuário clica em **Diagnosticar estrutura**.
3. Sistema analisa hierarquia.
4. Sistema aponta cargos sem superior, concentração de funções e departamentos sem gestor.
5. Sistema sugere melhorias.

### Resultado esperado

Diagnóstico estrutural criado.

---

# 13. Fluxo principal recomendado para o MVP

O fluxo mais importante para validação do MVP é:

```txt
Cadastro/Login
  ↓
Dashboard
  ↓
Cadastrar empresa
  ↓
Criar organograma
  ↓
Adicionar cargos
  ↓
Conectar hierarquia
  ↓
Salvar organograma
  ↓
Exportar PNG
```

Fluxo secundário essencial:

```txt
Dashboard
  ↓
Criar processo
  ↓
Adicionar etapas
  ↓
Conectar etapas
  ↓
Salvar processo
  ↓
Exportar PNG
```

Fluxo de diferenciação:

```txt
Dashboard
  ↓
Criar com IA
  ↓
Inserir texto
  ↓
Gerar organograma ou processo mockado
  ↓
Visualizar preview
  ↓
Salvar estrutura
  ↓
Editar no canvas
```

Fluxo de aceleração:

```txt
Templates
  ↓
Selecionar segmento
  ↓
Visualizar template
  ↓
Selecionar empresa
  ↓
Criar organograma/processo
  ↓
Editar no canvas
```

---

# 14. Estados obrigatórios por tela

Cada tela principal deve prever os seguintes estados.

## 14.1 Loading

Exibido enquanto os dados são carregados.

Exemplos:

- Carregando empresas;
- Carregando organograma;
- Gerando estrutura com IA;
- Exportando arquivo.

---

## 14.2 Empty state

Exibido quando não há dados.

Exemplos:

- Nenhuma empresa cadastrada;
- Nenhum organograma criado;
- Nenhum processo criado;
- Nenhum template encontrado.

Cada empty state deve ter uma ação clara.

---

## 14.3 Error state

Exibido quando ocorre erro.

Exemplos:

- Erro ao salvar;
- Erro ao carregar;
- Erro ao exportar;
- Erro ao gerar com IA;
- Erro de permissão.

---

## 14.4 Success state

Exibido após ações concluídas.

Exemplos:

- Empresa criada;
- Organograma salvo;
- Processo exportado;
- Template aplicado.

---

# 15. Regras de navegação

## 15.1 Usuário não autenticado

Usuário não autenticado deve acessar apenas:

```txt
/auth/login
/auth/register
```

Tentativas de acessar rotas privadas devem redirecionar para `/auth/login`.

---

## 15.2 Usuário autenticado

Usuário autenticado não deve permanecer em páginas de login ou cadastro.

Caso acesse `/auth/login`, deve ser redirecionado para `/dashboard`.

---

## 15.3 Empresa obrigatória para projetos

Para criar organograma ou processo, deve existir pelo menos uma empresa cadastrada.

Caso não exista empresa, o sistema deve redirecionar ou sugerir:

```txt
Crie uma empresa antes de criar projetos.
```

---

## 15.4 Workspace obrigatório

Toda rota interna deve operar dentro do workspace ativo.

Não deve existir criação de empresa, organograma ou processo sem `workspaceId`.

---

# 16. Eventos analíticos recomendados

Para validação do MVP, os seguintes eventos devem ser medidos futuramente:

```txt
user_registered
user_logged_in
company_created
orgchart_created
orgchart_node_added
orgchart_exported
process_created
process_node_added
process_exported
ai_generation_started
ai_generation_completed
template_used
```

Esses eventos ajudam a identificar se o usuário está chegando ao valor principal do produto.

---

# 17. Critérios gerais de aceite dos fluxos

O conjunto de fluxos será considerado funcional quando:

- Usuário conseguir se cadastrar;
- Usuário conseguir fazer login;
- Usuário conseguir criar empresa;
- Usuário conseguir criar organograma;
- Usuário conseguir editar e salvar organograma;
- Usuário conseguir criar processo;
- Usuário conseguir editar e salvar processo;
- Usuário conseguir usar IA mockada;
- Usuário conseguir aplicar template;
- Usuário conseguir exportar PNG;
- Dados ficarem isolados por workspace;
- O sistema tratar estados de loading, vazio e erro.

---

# 18. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
data-model.md
```

Esse documento deve definir entidades, campos, relacionamentos e regras de integridade do banco de dados.
