# Screen Map — Diagramados

**Documento:** Mapa de Telas  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento define o mapa de telas do **Diagramados**, descrevendo:

- Rotas da aplicação;
- Objetivo de cada tela;
- Personas principais;
- Componentes necessários;
- Ações disponíveis;
- Dados carregados;
- Permissões;
- Estados de interface;
- Critérios de aceite.

Este documento deve orientar:

- Desenvolvimento front-end;
- Design de interface;
- Organização de rotas;
- Implementação de permissões;
- Testes funcionais;
- Planejamento do MVP.

---

## 2. Estrutura geral de rotas

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
/jobs/[jobId]

/pops
/pops/[popId]

/diagnostics
/diagnostics/[diagnosisId]

/settings
```

---

## 3. Priorização das telas

## 3.1 Telas obrigatórias no MVP

| Rota | Tela |
|---|---|
| `/auth/login` | Login |
| `/auth/register` | Cadastro |
| `/dashboard` | Dashboard |
| `/companies` | Lista de empresas |
| `/companies/new` | Nova empresa |
| `/companies/[companyId]` | Detalhes da empresa |
| `/companies/[companyId]/edit` | Editar empresa |
| `/orgcharts` | Lista de organogramas |
| `/orgcharts/new` | Novo organograma |
| `/orgcharts/[orgChartId]/edit` | Editor de organograma |
| `/processes` | Lista de processos |
| `/processes/new` | Novo processo |
| `/processes/[processId]/edit` | Editor de processo |
| `/ai-create` | Criar com IA |
| `/templates` | Lista de templates |
| `/templates/[templateId]` | Detalhes do template |
| `/settings` | Configurações básicas |

---

## 3.2 Telas pós-MVP

| Rota | Tela |
|---|---|
| `/jobs` | Lista de cargos |
| `/jobs/[jobId]` | Descrição de cargo |
| `/pops` | Lista de POPs |
| `/pops/[popId]` | Editor de POP |
| `/diagnostics` | Lista de diagnósticos |
| `/diagnostics/[diagnosisId]` | Detalhes do diagnóstico |
| `/team` | Equipe e permissões |
| `/billing` | Planos e cobrança |

---

# 4. Layouts principais

## 4.1 Layout público

Usado em:

```txt
/auth/login
/auth/register
```

### Componentes

- Logo;
- Nome do produto;
- Card central;
- Formulário;
- Link alternativo entre login/cadastro;
- Rodapé simples.

### Regras

- Usuário autenticado não deve permanecer em telas públicas;
- Se autenticado, redirecionar para `/dashboard`.

---

## 4.2 Layout autenticado

Usado nas rotas internas.

### Componentes

- Sidebar lateral;
- Header superior;
- Área de conteúdo;
- Menu de usuário;
- Nome do workspace ativo;
- Botão de ação rápida opcional.

### Sidebar

Itens mínimos:

```txt
Dashboard
Empresas
Organogramas
Processos
Criar com IA
Templates
Configurações
```

Itens pós-MVP:

```txt
Cargos
POPs
Diagnósticos
Equipe
Planos
```

---

# 5. Tela: Login

## Rota

```txt
/auth/login
```

## Objetivo

Permitir que o usuário entre na aplicação.

## Persona principal

- Usuário cadastrado.

## Componentes

- Logo do Diagramados;
- Campo de e-mail;
- Campo de senha;
- Botão **Entrar**;
- Link **Criar conta**;
- Link futuro **Esqueci minha senha**;
- Mensagem de erro.

## Ações

| Ação | Resultado |
|---|---|
| Informar e-mail e senha | Prepara autenticação |
| Clicar em Entrar | Valida credenciais |
| Clicar em Criar conta | Redireciona para `/auth/register` |

## Dados necessários

Nenhum dado inicial.

## Permissões

- Apenas usuários não autenticados.

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Botão exibe carregamento |
| Erro | Exibe mensagem de credenciais inválidas |
| Sucesso | Redireciona para `/dashboard` |

## Critérios de aceite

- Login válido deve funcionar;
- Login inválido deve exibir erro;
- Usuário autenticado deve ser redirecionado para dashboard.

---

# 6. Tela: Cadastro

## Rota

```txt
/auth/register
```

## Objetivo

Permitir criação de nova conta.

## Persona principal

- Novo usuário.

## Componentes

- Logo;
- Campo nome;
- Campo e-mail;
- Campo senha;
- Campo confirmar senha;
- Botão **Criar conta**;
- Link **Já tenho conta**.

## Ações

| Ação | Resultado |
|---|---|
| Preencher formulário | Habilita cadastro |
| Clicar em Criar conta | Cria usuário e workspace |
| Clicar em Já tenho conta | Redireciona para login |

## Dados necessários

Nenhum dado inicial.

## Permissões

- Apenas usuários não autenticados.

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Botão bloqueado |
| Erro de validação | Mensagem por campo |
| E-mail duplicado | Exibe erro |
| Sucesso | Cria workspace e redireciona |

## Critérios de aceite

- Deve criar usuário;
- Deve criar workspace inicial;
- Deve autenticar e redirecionar para `/dashboard`.

---

# 7. Tela: Dashboard

## Rota

```txt
/dashboard
```

## Objetivo

Apresentar visão geral do workspace e atalhos de criação.

## Persona principal

- Consultor empresarial;
- Gestor de empresa;
- Analista de processos.

## Componentes

- Cards de métricas;
- Lista de projetos recentes;
- Atalhos de ação;
- Estado vazio para primeiro uso;
- Cabeçalho com nome do workspace.

## Cards mínimos

| Card | Descrição |
|---|---|
| Empresas | Total de empresas cadastradas |
| Organogramas | Total de organogramas |
| Processos | Total de processos |
| Templates | Total de templates disponíveis |

## Ações

| Ação | Resultado |
|---|---|
| Nova empresa | Vai para `/companies/new` |
| Novo organograma | Vai para `/orgcharts/new` |
| Novo processo | Vai para `/processes/new` |
| Criar com IA | Vai para `/ai-create` |
| Usar template | Vai para `/templates` |
| Abrir projeto recente | Abre editor correspondente |

## Dados carregados

- Contagem de empresas;
- Contagem de organogramas;
- Contagem de processos;
- Últimos projetos atualizados;
- Workspace ativo.

## Permissões

| Papel | Acesso |
|---|---|
| Owner | Sim |
| Admin | Sim |
| Editor | Sim |
| Viewer | Sim |
| ClientViewer | Limitado |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Skeleton dos cards |
| Empty | Orienta criar primeira empresa |
| Erro | Exibe mensagem e opção de tentar novamente |

## Critérios de aceite

- Deve mostrar visão geral;
- Deve respeitar workspace;
- Deve orientar usuários sem dados;
- Deve permitir criação rápida.

---

# 8. Tela: Lista de empresas

## Rota

```txt
/companies
```

## Objetivo

Listar empresas/clientes cadastrados no workspace.

## Persona principal

- Consultor empresarial;
- Administrador;
- Gestor.

## Componentes

- Título da página;
- Botão **Nova empresa**;
- Campo de busca;
- Filtro por segmento;
- Tabela ou cards de empresas;
- Menu de ações por empresa;
- Empty state.

## Colunas sugeridas

| Coluna | Descrição |
|---|---|
| Nome | Nome da empresa |
| Segmento | Segmento de atuação |
| Porte | Porte da empresa |
| Colaboradores | Número estimado |
| Atualizado em | Última atualização |
| Ações | Ver, editar, excluir |

## Ações

| Ação | Resultado |
|---|---|
| Criar empresa | Vai para `/companies/new` |
| Ver detalhes | Vai para `/companies/[companyId]` |
| Editar | Vai para `/companies/[companyId]/edit` |
| Excluir | Abre modal de confirmação |
| Buscar | Filtra listagem |

## Dados carregados

- Lista de empresas do workspace;
- Segmentos disponíveis;
- Permissão do usuário.

## Permissões

| Papel | Ver | Criar | Editar | Excluir |
|---|---:|---:|---:|---:|
| Owner | Sim | Sim | Sim | Sim |
| Admin | Sim | Sim | Sim | Sim |
| Editor | Sim | Não | Não | Não |
| Viewer | Sim | Não | Não | Não |
| ClientViewer | Limitado | Não | Não | Não |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Skeleton de tabela |
| Empty | Botão para cadastrar primeira empresa |
| Erro | Mensagem de falha ao carregar |
| Sem resultados | Informar que nenhum item corresponde ao filtro |

## Critérios de aceite

- Deve listar apenas empresas do workspace ativo;
- Deve permitir acesso aos detalhes;
- Deve respeitar permissões;
- Deve possuir estado vazio útil.

---

# 9. Tela: Nova empresa

## Rota

```txt
/companies/new
```

## Objetivo

Cadastrar uma nova empresa ou cliente.

## Persona principal

- Consultor empresarial;
- Administrador.

## Componentes

- Formulário de empresa;
- Botão **Salvar**;
- Botão **Cancelar**;
- Mensagens de validação.

## Campos

| Campo | Obrigatório |
|---|---:|
| Nome da empresa | Sim |
| Segmento | Não |
| Porte | Não |
| Número de colaboradores | Não |
| CNPJ | Não |
| Site | Não |
| Cidade | Não |
| Estado | Não |
| Responsável | Não |
| E-mail do responsável | Não |
| Telefone do responsável | Não |
| Observações | Não |

## Ações

| Ação | Resultado |
|---|---|
| Salvar | Cria empresa |
| Cancelar | Volta para `/companies` |

## Permissões

| Papel | Acesso |
|---|---|
| Owner | Sim |
| Admin | Sim |
| Editor | Não |
| Viewer | Não |
| ClientViewer | Não |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Botão salvar bloqueado |
| Erro de validação | Mensagem nos campos |
| Sucesso | Redireciona para detalhes da empresa |

## Critérios de aceite

- Nome deve ser obrigatório;
- Empresa deve ser vinculada ao workspace;
- Após salvar, empresa deve aparecer na lista.

---

# 10. Tela: Detalhes da empresa

## Rota

```txt
/companies/[companyId]
```

## Objetivo

Exibir visão consolidada da empresa e seus projetos.

## Persona principal

- Consultor empresarial;
- Gestor;
- Cliente visualizador.

## Componentes

- Cabeçalho da empresa;
- Dados cadastrais;
- Cards de resumo;
- Lista de organogramas vinculados;
- Lista de processos vinculados;
- Botões de criação rápida;
- Botão editar empresa.

## Ações

| Ação | Resultado |
|---|---|
| Editar empresa | Vai para `/companies/[companyId]/edit` |
| Novo organograma | Vai para `/orgcharts/new?companyId=...` |
| Novo processo | Vai para `/processes/new?companyId=...` |
| Abrir organograma | Vai para editor |
| Abrir processo | Vai para editor |
| Excluir empresa | Abre confirmação |

## Dados carregados

- Dados da empresa;
- Organogramas da empresa;
- Processos da empresa;
- Contadores;
- Permissão do usuário.

## Permissões

| Papel | Ver | Editar | Criar projetos |
|---|---:|---:|---:|
| Owner | Sim | Sim | Sim |
| Admin | Sim | Sim | Sim |
| Editor | Sim | Não | Sim |
| Viewer | Sim | Não | Não |
| ClientViewer | Limitado | Não | Não |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Skeleton |
| Not found | Empresa não encontrada |
| Sem projetos | Orientar criar organograma/processo |
| Erro | Mensagem e tentar novamente |

## Critérios de aceite

- Deve bloquear empresa de outro workspace;
- Deve listar projetos vinculados;
- Deve respeitar permissões.

---

# 11. Tela: Editar empresa

## Rota

```txt
/companies/[companyId]/edit
```

## Objetivo

Editar dados cadastrais da empresa.

## Persona principal

- Owner;
- Admin.

## Componentes

- Formulário preenchido;
- Botão **Salvar alterações**;
- Botão **Cancelar**;
- Botão **Excluir empresa** opcional.

## Dados carregados

- Dados atuais da empresa;
- Permissão do usuário.

## Permissões

| Papel | Acesso |
|---|---|
| Owner | Sim |
| Admin | Sim |
| Editor | Não |
| Viewer | Não |
| ClientViewer | Não |

## Critérios de aceite

- Deve carregar dados atuais;
- Deve validar campos obrigatórios;
- Deve salvar alterações;
- Deve atualizar `updatedAt`.

---

# 12. Tela: Lista de organogramas

## Rota

```txt
/orgcharts
```

## Objetivo

Listar organogramas existentes no workspace.

## Persona principal

- Consultor empresarial;
- Gestor de RH;
- Gestor de empresa.

## Componentes

- Título;
- Botão **Novo organograma**;
- Campo de busca;
- Filtro por empresa;
- Tabela ou cards;
- Menu de ações.

## Colunas sugeridas

| Coluna | Descrição |
|---|---|
| Nome | Nome do organograma |
| Empresa | Empresa vinculada |
| Status | Rascunho, ativo ou arquivado |
| Atualizado em | Última atualização |
| Ações | Editar, duplicar, excluir |

## Ações

| Ação | Resultado |
|---|---|
| Novo organograma | Vai para `/orgcharts/new` |
| Editar | Vai para `/orgcharts/[orgChartId]/edit` |
| Duplicar | Cria cópia |
| Excluir | Abre confirmação |
| Filtrar por empresa | Atualiza listagem |

## Dados carregados

- Organogramas do workspace;
- Empresas para filtro;
- Permissão do usuário.

## Permissões

| Papel | Ver | Criar | Editar | Excluir |
|---|---:|---:|---:|---:|
| Owner | Sim | Sim | Sim | Sim |
| Admin | Sim | Sim | Sim | Sim |
| Editor | Sim | Sim | Sim | Sim |
| Viewer | Sim | Não | Não | Não |
| ClientViewer | Limitado | Não | Não | Não |

## Critérios de aceite

- Deve listar somente organogramas do workspace;
- Deve permitir abrir editor;
- Deve exibir empty state;
- Deve respeitar permissões.

---

# 13. Tela: Novo organograma

## Rota

```txt
/orgcharts/new
```

## Objetivo

Criar um novo organograma.

## Persona principal

- Consultor empresarial;
- Gestor de RH.

## Componentes

- Formulário;
- Seletor de empresa;
- Campo nome;
- Campo descrição;
- Botão **Criar organograma**;
- Botão **Cancelar**.

## Campos

| Campo | Obrigatório |
|---|---:|
| Empresa | Sim |
| Nome do organograma | Sim |
| Descrição | Não |

## Ações

| Ação | Resultado |
|---|---|
| Criar | Cria organograma e abre editor |
| Cancelar | Volta para lista |

## Dados carregados

- Lista de empresas do workspace.

## Regras

- Se não houver empresa cadastrada, sugerir criar empresa primeiro;
- Permissão mínima: Editor.

## Critérios de aceite

- Deve exigir empresa;
- Deve criar organograma vazio;
- Deve redirecionar para editor.

---

# 14. Tela: Editor de organograma

## Rota

```txt
/orgcharts/[orgChartId]/edit
```

## Objetivo

Permitir criação e edição visual do organograma.

## Persona principal

- Consultor empresarial;
- Gestor de RH;
- Gestor de empresa.

## Componentes

### Área principal

- Canvas React Flow;
- Nós de cargos;
- Conexões hierárquicas;
- Controles de zoom;
- Mini mapa opcional;
- Background grid.

### Toolbar

- Adicionar cargo;
- Salvar;
- Exportar PNG;
- Exportar PDF futuro;
- Ajustar layout futuro;
- Duplicar futuro;
- Voltar.

### Painel lateral

- Dados do cargo selecionado;
- Nome do cargo;
- Ocupante;
- Departamento;
- Status;
- Superior imediato;
- Observações;
- Botão salvar alterações;
- Botão excluir cargo.

## Ações

| Ação | Resultado |
|---|---|
| Adicionar cargo | Cria novo nó |
| Editar cargo | Atualiza dados |
| Excluir cargo | Remove nó e conexões |
| Conectar cargos | Cria relação hierárquica |
| Reposicionar cargo | Salva posição |
| Salvar layout | Persiste nós e conexões |
| Exportar PNG | Baixa imagem |
| Voltar | Retorna para lista ou empresa |

## Dados carregados

- Organograma;
- Empresa vinculada;
- Nós;
- Conexões;
- Permissão do usuário.

## Permissões

| Papel | Visualizar | Editar | Exportar |
|---|---:|---:|---:|
| Owner | Sim | Sim | Sim |
| Admin | Sim | Sim | Sim |
| Editor | Sim | Sim | Sim |
| Viewer | Sim | Não | Sim |
| ClientViewer | Limitado | Não | Limitado |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Carregando canvas |
| Empty | Orientar adicionar primeiro cargo |
| Saving | Indicador de salvamento |
| Error | Mensagem de erro |
| Read-only | Ocultar ou bloquear edição |

## Regras específicas

- Cargo não pode reportar a si mesmo;
- Sistema deve evitar ciclos hierárquicos;
- Conexões devem pertencer ao mesmo organograma;
- Posições devem persistir;
- Edges devem ser salvos no banco.

## Critérios de aceite

- Deve carregar organograma salvo;
- Deve permitir criar, editar, mover e excluir cargos;
- Deve permitir conectar cargos;
- Deve salvar e reabrir corretamente;
- Deve exportar PNG.

---

# 15. Tela: Lista de processos

## Rota

```txt
/processes
```

## Objetivo

Listar fluxos de processos existentes.

## Persona principal

- Consultor empresarial;
- Analista de processos;
- Gestor de operações.

## Componentes

- Título;
- Botão **Novo processo**;
- Campo de busca;
- Filtro por empresa;
- Tabela ou cards;
- Menu de ações.

## Colunas sugeridas

| Coluna | Descrição |
|---|---|
| Nome | Nome do processo |
| Empresa | Empresa vinculada |
| Departamento | Área principal |
| Status | Rascunho, ativo ou arquivado |
| Atualizado em | Última atualização |
| Ações | Editar, duplicar, excluir |

## Ações

| Ação | Resultado |
|---|---|
| Novo processo | Vai para `/processes/new` |
| Editar | Vai para `/processes/[processId]/edit` |
| Duplicar | Cria cópia |
| Excluir | Abre confirmação |

## Dados carregados

- Processos do workspace;
- Empresas para filtro;
- Permissão do usuário.

## Critérios de aceite

- Deve listar somente processos do workspace;
- Deve permitir abrir editor;
- Deve respeitar permissões.

---

# 16. Tela: Novo processo

## Rota

```txt
/processes/new
```

## Objetivo

Criar um novo fluxo de processo.

## Persona principal

- Analista de processos;
- Consultor empresarial.

## Componentes

- Formulário;
- Seletor de empresa;
- Campo nome;
- Campo descrição;
- Campo departamento opcional;
- Botão **Criar processo**;
- Botão **Cancelar**.

## Campos

| Campo | Obrigatório |
|---|---:|
| Empresa | Sim |
| Nome do processo | Sim |
| Descrição | Não |
| Departamento | Não |
| Dono do processo | Não |

## Ações

| Ação | Resultado |
|---|---|
| Criar | Cria processo e abre editor |
| Cancelar | Retorna para lista |

## Regras

- Se não houver empresa cadastrada, sugerir criar empresa primeiro;
- Permissão mínima: Editor.

## Critérios de aceite

- Deve exigir empresa;
- Deve criar processo vazio;
- Deve redirecionar para editor.

---

# 17. Tela: Editor de processo

## Rota

```txt
/processes/[processId]/edit
```

## Objetivo

Permitir criação e edição visual do fluxo de processo.

## Persona principal

- Analista de processos;
- Consultor empresarial;
- Gestor operacional.

## Componentes

### Área principal

- Canvas React Flow;
- Nós de etapas;
- Conexões direcionais;
- Controles de zoom;
- Background grid.

### Toolbar

- Adicionar etapa;
- Salvar;
- Exportar PNG;
- Gerar RACI futuro;
- Gerar POP futuro;
- Diagnosticar futuro;
- Voltar.

### Painel lateral

- Dados da etapa selecionada;
- Tipo da etapa;
- Nome;
- Descrição;
- Área responsável;
- Cargo responsável;
- Sistema utilizado;
- Documento gerado;
- Tempo estimado;
- Risco;
- Indicador;
- Observações;
- Botão excluir etapa.

## Tipos de etapa

| Tipo | Uso |
|---|---|
| START | Início do processo |
| ACTIVITY | Atividade comum |
| DECISION | Decisão |
| DOCUMENT | Documento |
| SYSTEM | Sistema |
| APPROVAL | Aprovação |
| WAIT | Espera |
| END | Fim do processo |

## Ações

| Ação | Resultado |
|---|---|
| Adicionar etapa | Cria novo nó |
| Editar etapa | Atualiza dados |
| Excluir etapa | Remove nó e conexões |
| Conectar etapas | Cria fluxo |
| Adicionar label | Define condição da conexão |
| Reposicionar etapa | Salva posição |
| Salvar layout | Persiste nós e conexões |
| Exportar PNG | Baixa imagem |

## Dados carregados

- Processo;
- Empresa vinculada;
- Etapas;
- Conexões;
- Permissão do usuário.

## Permissões

| Papel | Visualizar | Editar | Exportar |
|---|---:|---:|---:|
| Owner | Sim | Sim | Sim |
| Admin | Sim | Sim | Sim |
| Editor | Sim | Sim | Sim |
| Viewer | Sim | Não | Sim |
| ClientViewer | Limitado | Não | Limitado |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Carregando canvas |
| Empty | Orientar adicionar primeira etapa |
| Saving | Indicador de salvamento |
| Error | Mensagem de erro |
| Read-only | Bloquear edição |

## Regras específicas

- Conexão deve ter origem e destino;
- Origem e destino não podem ser iguais;
- Conexões devem pertencer ao mesmo processo;
- Etapa de decisão pode ter múltiplas saídas;
- Posições devem persistir.

## Critérios de aceite

- Deve carregar processo salvo;
- Deve permitir criar, editar, mover e excluir etapas;
- Deve permitir conectar etapas;
- Deve salvar e reabrir corretamente;
- Deve exportar PNG.

---

# 18. Tela: Criar com IA

## Rota

```txt
/ai-create
```

## Objetivo

Permitir geração de organogramas e processos a partir de texto.

## Persona principal

- Consultor empresarial;
- Analista de processos;
- Gestor.

## Componentes

- Seletor de empresa;
- Seletor de tipo de geração;
- Campo de texto longo;
- Botão **Gerar**;
- Preview do resultado;
- Alertas/suposições;
- Botões para salvar resultado.

## Tipos de geração

| Tipo | Resultado |
|---|---|
| Organograma | Gera organograma |
| Processo | Gera processo |
| Organograma + Processo | Gera estrutura completa |

## Ações

| Ação | Resultado |
|---|---|
| Selecionar empresa | Define destino |
| Digitar descrição | Prepara geração |
| Clicar em Gerar | Chama `aiService` |
| Salvar organograma | Cria projeto e abre editor |
| Salvar processo | Cria projeto e abre editor |
| Gerar novamente | Nova tentativa |
| Limpar | Limpa formulário |

## Dados carregados

- Empresas do workspace;
- Provider de IA ativo;
- Templates mockados quando aplicável.

## Permissões

| Papel | Acesso |
|---|---|
| Owner | Sim |
| Admin | Sim |
| Editor | Sim |
| Viewer | Não |
| ClientViewer | Não |

## Estados

| Estado | Comportamento |
|---|---|
| Empty | Exibir exemplo de texto |
| Loading | “Gerando estrutura...” |
| Erro | Mensagem amigável |
| Resultado | Exibir preview |
| Validação | Bloquear texto muito curto |

## Critérios de aceite

- Deve aceitar texto;
- Deve gerar resposta mockada no MVP;
- Deve validar JSON;
- Deve registrar log;
- Deve permitir salvar resultado como projeto editável.

---

# 19. Tela: Lista de templates

## Rota

```txt
/templates
```

## Objetivo

Exibir templates disponíveis por segmento.

## Persona principal

- Consultor empresarial;
- Analista de processos.

## Componentes

- Título;
- Campo de busca;
- Filtro por segmento;
- Cards de template;
- Badge de tipo;
- Botão **Usar template**.

## Dados do card

| Informação | Descrição |
|---|---|
| Nome | Nome do template |
| Segmento | Segmento recomendado |
| Tipo | Organograma, processo ou estrutura completa |
| Descrição | Resumo |
| Conteúdos | Quantidade de processos/cargos |

## Ações

| Ação | Resultado |
|---|---|
| Ver detalhes | Vai para `/templates/[templateId]` |
| Usar template | Abre seleção de empresa |
| Filtrar segmento | Atualiza lista |

## Dados carregados

- Templates JSON ou banco;
- Segmentos disponíveis.

## Permissões

| Papel | Visualizar | Usar |
|---|---:|---:|
| Owner | Sim | Sim |
| Admin | Sim | Sim |
| Editor | Sim | Sim |
| Viewer | Sim | Não |
| ClientViewer | Não | Não |

## Estados

| Estado | Comportamento |
|---|---|
| Loading | Skeleton de cards |
| Empty | Nenhum template encontrado |
| Erro | Mensagem |
| Sem resultado | Limpar filtros |

## Critérios de aceite

- Deve listar templates;
- Deve permitir filtrar;
- Deve permitir acessar detalhes;
- Deve respeitar permissões.

---

# 20. Tela: Detalhes do template

## Rota

```txt
/templates/[templateId]
```

## Objetivo

Exibir detalhes de um template e permitir sua aplicação.

## Persona principal

- Consultor empresarial;
- Analista de processos.

## Componentes

- Cabeçalho do template;
- Descrição;
- Segmento;
- Tipo;
- Preview de organograma;
- Preview de processo;
- Lista de cargos sugeridos;
- Lista de processos sugeridos;
- Seletor de empresa;
- Botão **Criar organograma**;
- Botão **Criar processo**;
- Botão **Criar estrutura completa**.

## Ações

| Ação | Resultado |
|---|---|
| Selecionar empresa | Define destino |
| Criar organograma | Cria e abre editor |
| Criar processo | Cria e abre editor |
| Voltar | Retorna para lista |

## Dados carregados

- Template;
- Empresas do workspace;
- Permissão do usuário.

## Critérios de aceite

- Deve exibir conteúdo do template;
- Deve exigir empresa para aplicar;
- Deve criar projeto independente do template;
- Projeto criado deve ser editável.

---

# 21. Tela: Configurações

## Rota

```txt
/settings
```

## Objetivo

Permitir ajuste básico de conta e workspace.

## Persona principal

- Usuário autenticado;
- Administrador.

## Componentes

- Abas de configuração;
- Perfil do usuário;
- Workspace;
- IA futura;
- Segurança futura.

## Abas MVP

| Aba | Conteúdo |
|---|---|
| Perfil | Nome e e-mail |
| Workspace | Nome do workspace |

## Abas futuras

| Aba | Conteúdo |
|---|---|
| Equipe | Usuários e permissões |
| IA | Provider e limites |
| Cobrança | Plano e assinatura |
| Segurança | Sessões e auditoria |

## Ações

| Ação | Resultado |
|---|---|
| Editar perfil | Atualiza dados do usuário |
| Editar workspace | Atualiza nome do workspace |

## Permissões

| Papel | Perfil | Workspace |
|---|---:|---:|
| Owner | Sim | Sim |
| Admin | Sim | Sim |
| Editor | Sim | Não |
| Viewer | Sim | Não |
| ClientViewer | Sim | Não |

## Critérios de aceite

- Usuário deve visualizar dados básicos;
- Owner/Admin devem editar workspace;
- Editor/Viewer não devem editar workspace.

---

# 22. Telas pós-MVP

---

## 22.1 Lista de cargos

## Rota

```txt
/jobs
```

## Objetivo

Listar cargos identificados nos organogramas.

## Componentes futuros

- Tabela de cargos;
- Filtro por empresa;
- Filtro por departamento;
- Botão gerar descrição;
- Status da descrição.

---

## 22.2 Descrição de cargo

## Rota

```txt
/jobs/[jobId]
```

## Objetivo

Exibir e editar descrição de cargo.

## Componentes futuros

- Editor textual;
- Dados do cargo;
- Botão gerar com IA;
- Botão exportar PDF/DOCX.

---

## 22.3 Lista de POPs

## Rota

```txt
/pops
```

## Objetivo

Listar procedimentos operacionais gerados.

## Componentes futuros

- Tabela de POPs;
- Filtro por empresa;
- Filtro por processo;
- Status;
- Botão exportar.

---

## 22.4 Editor de POP

## Rota

```txt
/pops/[popId]
```

## Objetivo

Editar POP gerado a partir de processo.

## Componentes futuros

- Editor textual;
- Seções estruturadas;
- Histórico de revisão;
- Exportação.

---

## 22.5 Lista de diagnósticos

## Rota

```txt
/diagnostics
```

## Objetivo

Listar diagnósticos gerados.

## Componentes futuros

- Filtro por empresa;
- Filtro por gravidade;
- Filtro por status;
- Cards de problemas.

---

## 22.6 Detalhes do diagnóstico

## Rota

```txt
/diagnostics/[diagnosisId]
```

## Objetivo

Exibir diagnóstico específico.

## Componentes futuros

- Problema;
- Descrição;
- Gravidade;
- Área impactada;
- Recomendação;
- Itens relacionados;
- Status.

---

# 23. Componentes globais

## 23.1 AppSidebar

### Função

Navegação principal do sistema.

### Itens MVP

- Dashboard;
- Empresas;
- Organogramas;
- Processos;
- Criar com IA;
- Templates;
- Configurações.

---

## 23.2 AppHeader

### Função

Cabeçalho interno.

### Conteúdo

- Nome da página;
- Workspace ativo;
- Menu de usuário;
- Botão de ação contextual.

---

## 23.3 PageHeader

### Função

Padronizar cabeçalhos de páginas.

### Conteúdo

- Título;
- Descrição;
- Ações principais.

---

## 23.4 EmptyState

### Função

Orientar usuário quando não houver dados.

### Variações

- Sem empresas;
- Sem organogramas;
- Sem processos;
- Sem templates;
- Sem resultado de busca.

---

## 23.5 ConfirmDialog

### Função

Confirmar ações destrutivas.

### Uso

- Excluir empresa;
- Excluir organograma;
- Excluir processo;
- Excluir cargo;
- Excluir etapa.

---

## 23.6 LoadingState

### Função

Exibir carregamento.

### Uso

- Carregando listas;
- Carregando editor;
- Salvando;
- Exportando;
- Gerando IA.

---

# 24. Estados obrigatórios por tela

Toda tela principal deve prever:

## 24.1 Loading

Exemplo:

```txt
Carregando organograma...
```

## 24.2 Empty

Exemplo:

```txt
Nenhum processo criado ainda.
```

## 24.3 Error

Exemplo:

```txt
Não foi possível carregar os dados.
```

## 24.4 Success

Exemplo:

```txt
Organograma salvo com sucesso.
```

## 24.5 Read-only

Exemplo:

```txt
Você está visualizando este projeto em modo somente leitura.
```

---

# 25. Regras de responsividade

## 25.1 MVP

O foco principal do MVP será desktop.

Resoluções prioritárias:

```txt
1366x768
1440x900
1920x1080
```

## 25.2 Tablet

Suporte mínimo para tablet em:

```txt
1024px+
```

## 25.3 Mobile

No MVP, mobile pode ser limitado para visualização.

Editores de canvas em mobile podem exibir aviso:

```txt
Para editar diagramas com melhor experiência, use tablet ou desktop.
```

---

# 26. Critérios gerais de aceite visual

- Sidebar deve estar presente nas rotas internas;
- Header deve indicar página atual;
- Botões principais devem ser claros;
- Formulários devem ter validação;
- Ações destrutivas devem ter confirmação;
- Telas vazias devem orientar próximo passo;
- Estados de loading devem evitar tela travada;
- Permissões devem impactar botões visíveis;
- Usuário sem permissão não deve conseguir burlar ação pelo front-end;
- Editors devem preservar layout salvo.

---

# 27. Ordem recomendada de implementação das telas

## Sprint 1 — Autenticação e layout

1. `/auth/login`;
2. `/auth/register`;
3. Layout autenticado;
4. Sidebar;
5. Header.

## Sprint 2 — Dashboard e empresas

1. `/dashboard`;
2. `/companies`;
3. `/companies/new`;
4. `/companies/[companyId]`;
5. `/companies/[companyId]/edit`.

## Sprint 3 — Organogramas

1. `/orgcharts`;
2. `/orgcharts/new`;
3. `/orgcharts/[orgChartId]/edit`.

## Sprint 4 — Processos

1. `/processes`;
2. `/processes/new`;
3. `/processes/[processId]/edit`.

## Sprint 5 — IA e templates

1. `/ai-create`;
2. `/templates`;
3. `/templates/[templateId]`.

## Sprint 6 — Configurações e acabamento

1. `/settings`;
2. Estados vazios;
3. Estados de erro;
4. Loading states;
5. Exportação PNG;
6. Ajustes de UX.

---

# 28. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
api-routes.md
```

Esse documento deve detalhar endpoints, métodos, payloads, respostas, erros e permissões.
