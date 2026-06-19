# Functional Requirements — Diagramados

**Documento:** Requisitos Funcionais  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento descreve os requisitos funcionais do **Diagramados**, organizados por módulos, com identificação numérica para facilitar implementação, validação, priorização e testes.

Os requisitos aqui descritos indicam o que o sistema deve permitir que o usuário faça.

Este documento deve ser usado por:

- Desenvolvedores;
- Product managers;
- Designers;
- QA/testadores;
- Consultores envolvidos no produto;
- Ferramentas de IA de desenvolvimento, como Codex, Cursor, Antigravity ou similares.

---

## 2. Convenção de identificação

Os requisitos funcionais seguem o padrão:

```txt
RF-[MÓDULO]-[NÚMERO]
```

Exemplos:

```txt
RF-AUTH-001
RF-COMP-001
RF-ORG-001
RF-PROC-001
RF-AI-001
```

---

## 3. Módulos contemplados

Este documento cobre os seguintes módulos:

1. Autenticação;
2. Workspace;
3. Empresas/clientes;
4. Dashboard;
5. Organogramas;
6. Fluxos de processos;
7. Criação com IA;
8. Templates;
9. Exportações;
10. Matriz RACI;
11. Descrições de cargos;
12. POPs;
13. Diagnósticos;
14. Usuários e permissões;
15. Configurações;
16. Logs e auditoria;
17. Notificações internas;
18. Busca e filtros.

Nem todos os requisitos listados precisam entrar no MVP. A prioridade de cada requisito será indicada como:

- **Alta:** necessário para MVP ou base crítica;
- **Média:** importante para evolução próxima;
- **Baixa:** desejável em versões futuras.

---

# 4. Autenticação

## RF-AUTH-001 — Criar conta de usuário

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir que uma pessoa crie uma conta informando nome, e-mail e senha.

### Critérios de aceite

- O usuário deve informar nome, e-mail e senha;
- O e-mail deve ser único;
- A senha deve ser armazenada de forma segura;
- Após cadastro bem-sucedido, o usuário deve ser direcionado para o dashboard ou onboarding inicial.

---

## RF-AUTH-002 — Realizar login

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir login por e-mail e senha.

### Critérios de aceite

- O usuário deve informar e-mail e senha;
- O sistema deve validar as credenciais;
- Em caso de sucesso, deve iniciar uma sessão autenticada;
- Em caso de erro, deve exibir mensagem clara.

---

## RF-AUTH-003 — Realizar logout

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir que o usuário encerre sua sessão.

### Critérios de aceite

- O usuário deve conseguir sair da aplicação;
- Após logout, deve ser redirecionado para a tela de login;
- Rotas privadas não devem continuar acessíveis.

---

## RF-AUTH-004 — Proteger rotas privadas

**Prioridade:** Alta  
**Descrição:** O sistema deve impedir acesso a páginas internas sem autenticação.

### Critérios de aceite

- Usuários não autenticados devem ser redirecionados para login;
- Usuários autenticados devem acessar apenas dados vinculados ao seu workspace.

---

## RF-AUTH-005 — Recuperar senha

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir recuperação de senha por e-mail.

### Critérios de aceite

- O usuário deve solicitar recuperação informando e-mail;
- O sistema deve enviar link seguro de redefinição;
- O link deve expirar após prazo configurável.

---

# 5. Workspace

## RF-WORK-001 — Criar workspace automaticamente

**Prioridade:** Alta  
**Descrição:** O sistema deve criar automaticamente um workspace inicial para cada novo usuário.

### Critérios de aceite

- Ao criar conta, o usuário deve receber um workspace padrão;
- Todos os dados criados devem estar vinculados ao workspace;
- O nome padrão pode ser baseado no nome do usuário ou organização.

---

## RF-WORK-002 — Visualizar workspace atual

**Prioridade:** Alta  
**Descrição:** O sistema deve exibir o workspace ativo do usuário.

### Critérios de aceite

- O nome do workspace deve aparecer na interface;
- Todas as consultas internas devem considerar o workspace ativo.

---

## RF-WORK-003 — Editar dados do workspace

**Prioridade:** Média  
**Descrição:** O usuário autorizado deve conseguir editar nome e informações básicas do workspace.

### Critérios de aceite

- Deve ser possível alterar nome;
- Deve ser possível adicionar logo futuramente;
- Apenas usuários autorizados devem editar.

---

## RF-WORK-004 — Suportar múltiplos workspaces

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir que um usuário participe de múltiplos workspaces.

### Critérios de aceite

- O usuário deve conseguir alternar entre workspaces;
- Os dados de cada workspace devem permanecer isolados.

---

# 6. Empresas e clientes

## RF-COMP-001 — Criar empresa/cliente

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir cadastrar uma empresa ou cliente.

### Campos mínimos

- Nome;
- Segmento;
- Porte;
- Número de colaboradores;
- Observações.

### Critérios de aceite

- A empresa deve ser vinculada ao workspace ativo;
- O nome da empresa deve ser obrigatório;
- Após salvar, a empresa deve aparecer na listagem.

---

## RF-COMP-002 — Listar empresas/clientes

**Prioridade:** Alta  
**Descrição:** O sistema deve listar as empresas cadastradas no workspace.

### Critérios de aceite

- A listagem deve exibir nome, segmento, porte e data de atualização;
- Deve haver estado vazio quando não houver empresas;
- Empresas de outros workspaces não devem aparecer.

---

## RF-COMP-003 — Visualizar detalhes da empresa

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir visualizar os dados completos de uma empresa.

### Critérios de aceite

- Deve exibir dados cadastrais;
- Deve exibir organogramas vinculados;
- Deve exibir processos vinculados;
- Deve exibir data de criação e atualização.

---

## RF-COMP-004 — Editar empresa/cliente

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir editar os dados de uma empresa.

### Critérios de aceite

- Alterações devem ser persistidas;
- Deve haver validação de campos obrigatórios;
- Deve atualizar a data de modificação.

---

## RF-COMP-005 — Excluir empresa/cliente

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir excluir uma empresa.

### Critérios de aceite

- O sistema deve solicitar confirmação;
- Deve informar que organogramas e processos vinculados podem ser afetados;
- A exclusão deve respeitar permissões.

---

## RF-COMP-006 — Filtrar empresas

**Prioridade:** Média  
**Descrição:** O sistema deve permitir filtrar empresas por nome, segmento e porte.

### Critérios de aceite

- O filtro por nome deve buscar parcialmente;
- O filtro por segmento deve listar opções existentes;
- Os resultados devem atualizar sem recarregar toda a aplicação.

---

# 7. Dashboard

## RF-DASH-001 — Exibir visão geral

**Prioridade:** Alta  
**Descrição:** O dashboard deve exibir uma visão geral do workspace.

### Indicadores mínimos

- Total de empresas;
- Total de organogramas;
- Total de processos;
- Total de templates disponíveis.

---

## RF-DASH-002 — Exibir últimos projetos

**Prioridade:** Alta  
**Descrição:** O dashboard deve exibir os últimos organogramas e processos editados.

### Critérios de aceite

- Deve mostrar nome do projeto;
- Deve mostrar empresa vinculada;
- Deve mostrar tipo do projeto;
- Deve mostrar data de atualização;
- Deve permitir acesso rápido ao editor.

---

## RF-DASH-003 — Exibir atalhos de criação

**Prioridade:** Alta  
**Descrição:** O dashboard deve possuir botões de ação rápida.

### Atalhos mínimos

- Nova empresa;
- Novo organograma;
- Novo processo;
- Criar com IA;
- Usar template.

---

## RF-DASH-004 — Exibir estado vazio

**Prioridade:** Alta  
**Descrição:** O dashboard deve apresentar orientações quando não houver dados.

### Critérios de aceite

- Se não houver empresas, sugerir criar primeira empresa;
- Se não houver projetos, sugerir criar organograma ou processo;
- O estado vazio deve ser útil e acionável.

---

# 8. Organogramas

## RF-ORG-001 — Criar organograma

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir criar um organograma vinculado a uma empresa.

### Campos mínimos

- Nome do organograma;
- Empresa vinculada;
- Descrição opcional.

### Critérios de aceite

- O organograma deve ser salvo no banco;
- Deve ser vinculado ao workspace;
- Deve abrir no editor visual após criação.

---

## RF-ORG-002 — Listar organogramas

**Prioridade:** Alta  
**Descrição:** O sistema deve listar organogramas do workspace.

### Critérios de aceite

- Deve exibir nome, empresa, data de atualização e ações;
- Deve permitir acessar o editor;
- Deve permitir filtrar por empresa.

---

## RF-ORG-003 — Editar dados gerais do organograma

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir editar nome, descrição e empresa vinculada.

### Critérios de aceite

- Alterações devem ser salvas;
- Deve atualizar data de modificação;
- Deve respeitar permissões.

---

## RF-ORG-004 — Excluir organograma

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir excluir organogramas.

### Critérios de aceite

- Deve solicitar confirmação;
- Deve excluir nós vinculados;
- Deve impedir exclusão por usuários sem permissão.

---

## RF-ORG-005 — Duplicar organograma

**Prioridade:** Média  
**Descrição:** O sistema deve permitir duplicar um organograma existente.

### Critérios de aceite

- A cópia deve manter cargos, posições e conexões;
- O novo nome deve indicar que é uma cópia;
- A cópia deve pertencer ao mesmo workspace.

---

## RF-ORG-006 — Adicionar cargo ao organograma

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir adicionar novos cargos ao canvas.

### Campos do cargo

- Nome do cargo;
- Departamento;
- Ocupante;
- Status;
- Superior imediato;
- Observações.

### Critérios de aceite

- O cargo deve aparecer no canvas;
- O cargo deve ser salvo;
- O cargo deve possuir posição X e Y.

---

## RF-ORG-007 — Editar cargo

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir editar dados de um cargo.

### Critérios de aceite

- A edição deve ocorrer em painel lateral ou modal;
- Alterações devem refletir no card visual;
- Alterações devem ser persistidas.

---

## RF-ORG-008 — Excluir cargo

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir excluir cargos do organograma.

### Critérios de aceite

- Deve solicitar confirmação;
- Cargos subordinados devem ser tratados corretamente;
- Conexões vinculadas devem ser removidas ou atualizadas.

---

## RF-ORG-009 — Conectar cargos por hierarquia

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir definir relação hierárquica entre cargos.

### Critérios de aceite

- Deve ser possível conectar cargo superior a subordinado;
- A conexão deve ser salva;
- O sistema deve evitar ciclos hierárquicos inválidos.

---

## RF-ORG-010 — Reposicionar cargos

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir arrastar cargos no canvas.

### Critérios de aceite

- A posição deve ser atualizada visualmente;
- A posição deve ser persistida;
- Ao recarregar, o cargo deve manter a posição.

---

## RF-ORG-011 — Visualizar organograma em modo compacto

**Prioridade:** Média  
**Descrição:** O sistema deve permitir visualização compacta dos cards.

### Critérios de aceite

- O card compacto deve mostrar cargo e departamento;
- O usuário deve conseguir alternar para visualização detalhada.

---

## RF-ORG-012 — Visualizar organograma em modo detalhado

**Prioridade:** Média  
**Descrição:** O sistema deve permitir visualização detalhada dos cards.

### Critérios de aceite

- O card detalhado deve mostrar cargo, ocupante, departamento e status;
- Deve preservar legibilidade.

---

## RF-ORG-013 — Exportar organograma em PNG

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir exportar o organograma como imagem PNG.

### Critérios de aceite

- O arquivo deve conter o diagrama visível;
- Deve incluir nome do organograma;
- Deve gerar arquivo válido.

---

# 9. Fluxos de processos

## RF-PROC-001 — Criar processo

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir criar um fluxo de processo vinculado a uma empresa.

### Campos mínimos

- Nome do processo;
- Empresa vinculada;
- Descrição.

### Critérios de aceite

- O processo deve ser salvo;
- Deve abrir no editor visual após criação;
- Deve estar vinculado ao workspace.

---

## RF-PROC-002 — Listar processos

**Prioridade:** Alta  
**Descrição:** O sistema deve listar processos do workspace.

### Critérios de aceite

- Deve exibir nome, empresa, data de atualização e ações;
- Deve permitir filtrar por empresa;
- Deve permitir abrir o editor.

---

## RF-PROC-003 — Editar dados gerais do processo

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir editar nome, descrição e empresa vinculada.

### Critérios de aceite

- Alterações devem ser persistidas;
- Deve atualizar data de modificação.

---

## RF-PROC-004 — Excluir processo

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir excluir processos.

### Critérios de aceite

- Deve solicitar confirmação;
- Deve excluir etapas e conexões vinculadas;
- Deve respeitar permissões.

---

## RF-PROC-005 — Duplicar processo

**Prioridade:** Média  
**Descrição:** O sistema deve permitir duplicar um processo existente.

### Critérios de aceite

- A cópia deve manter etapas, posições e conexões;
- O nome deve indicar que é uma cópia.

---

## RF-PROC-006 — Adicionar etapa

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir adicionar etapas ao processo.

### Tipos de etapa

- Início;
- Atividade;
- Decisão;
- Documento;
- Sistema;
- Aprovação;
- Espera;
- Fim.

### Critérios de aceite

- A etapa deve aparecer no canvas;
- Deve possuir tipo definido;
- Deve ser salva com posição X e Y.

---

## RF-PROC-007 — Editar etapa

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir editar dados de uma etapa.

### Campos mínimos

- Nome da etapa;
- Descrição;
- Área responsável;
- Cargo responsável;
- Tipo;
- Observações.

### Critérios de aceite

- Alterações devem refletir no card visual;
- Alterações devem ser salvas.

---

## RF-PROC-008 — Excluir etapa

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir excluir etapas.

### Critérios de aceite

- Deve solicitar confirmação;
- Conexões relacionadas devem ser removidas;
- O processo deve permanecer consistente.

---

## RF-PROC-009 — Conectar etapas

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir criar conexões entre etapas.

### Critérios de aceite

- Deve ser possível conectar origem e destino;
- A conexão deve ter direção;
- A conexão deve ser persistida.

---

## RF-PROC-010 — Criar decisão com alternativas

**Prioridade:** Média  
**Descrição:** O sistema deve permitir criar etapas de decisão com saídas identificadas.

### Critérios de aceite

- Uma decisão pode ter saída “sim”;
- Uma decisão pode ter saída “não”;
- As conexões podem receber rótulos.

---

## RF-PROC-011 — Reposicionar etapas

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir mover etapas no canvas.

### Critérios de aceite

- A posição deve ser atualizada visualmente;
- A posição deve ser salva;
- A posição deve ser restaurada ao reabrir.

---

## RF-PROC-012 — Exportar processo em PNG

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir exportar o processo em PNG.

### Critérios de aceite

- O arquivo deve conter o diagrama visível;
- Deve incluir nome do processo;
- Deve gerar arquivo válido.

---

# 10. Criação com IA

## RF-AI-001 — Acessar tela Criar com IA

**Prioridade:** Alta  
**Descrição:** O sistema deve possuir uma tela específica para criação com IA.

### Critérios de aceite

- A tela deve estar acessível pelo menu;
- Deve conter campo de texto;
- Deve conter seletor de tipo de geração;
- Deve conter botão gerar.

---

## RF-AI-002 — Inserir descrição textual

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir inserir uma descrição em linguagem natural.

### Critérios de aceite

- O campo deve aceitar texto longo;
- Deve haver limite mínimo de caracteres;
- Deve exibir validação quando vazio.

---

## RF-AI-003 — Selecionar tipo de geração

**Prioridade:** Alta  
**Descrição:** O usuário deve escolher o que deseja gerar.

### Tipos mínimos

- Organograma;
- Processo;
- Organograma + processo.

---

## RF-AI-004 — Gerar organograma mockado

**Prioridade:** Alta  
**Descrição:** O sistema deve gerar um organograma com base em resposta mockada.

### Critérios de aceite

- O sistema deve retornar estrutura JSON válida;
- O resultado deve ser renderizado em preview;
- O usuário deve conseguir salvar como organograma.

---

## RF-AI-005 — Gerar processo mockado

**Prioridade:** Alta  
**Descrição:** O sistema deve gerar um processo com base em resposta mockada.

### Critérios de aceite

- O sistema deve retornar estrutura JSON válida;
- O resultado deve ser renderizado em preview;
- O usuário deve conseguir salvar como processo.

---

## RF-AI-006 — Gerar estrutura completa mockada

**Prioridade:** Média  
**Descrição:** O sistema deve gerar organograma e processo em uma única operação.

### Critérios de aceite

- Deve retornar duas estruturas;
- Deve permitir salvar cada uma separadamente;
- Deve indicar eventuais limitações do mock.

---

## RF-AI-007 — Registrar log de geração

**Prioridade:** Alta  
**Descrição:** O sistema deve registrar logs das gerações realizadas.

### Campos mínimos

- Usuário;
- Workspace;
- Empresa;
- Tipo de geração;
- Texto de entrada;
- JSON de saída;
- Provider;
- Status;
- Erro, se houver;
- Data.

---

## RF-AI-008 — Integrar provider real de IA

**Prioridade:** Média  
**Descrição:** O sistema deve permitir integração futura com provedores reais de IA.

### Critérios de aceite

- O `aiService` deve abstrair o provider;
- Deve ser possível alternar entre mock e provider real por variável de ambiente.

---

# 11. Templates

## RF-TEMP-001 — Listar templates

**Prioridade:** Alta  
**Descrição:** O sistema deve exibir templates disponíveis.

### Critérios de aceite

- Deve mostrar nome;
- Deve mostrar segmento;
- Deve mostrar descrição;
- Deve permitir visualizar detalhes.

---

## RF-TEMP-002 — Visualizar detalhes do template

**Prioridade:** Alta  
**Descrição:** O usuário deve conseguir visualizar a estrutura de um template.

### Critérios de aceite

- Deve exibir organograma base;
- Deve exibir processo base;
- Deve exibir cargos sugeridos;
- Deve exibir observações.

---

## RF-TEMP-003 — Criar organograma a partir de template

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir criar organograma usando template.

### Critérios de aceite

- O usuário deve selecionar empresa de destino;
- O sistema deve criar novo organograma;
- O organograma deve ser editável.

---

## RF-TEMP-004 — Criar processo a partir de template

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir criar processo usando template.

### Critérios de aceite

- O usuário deve selecionar empresa de destino;
- O sistema deve criar novo processo;
- O processo deve ser editável.

---

## RF-TEMP-005 — Filtrar templates por segmento

**Prioridade:** Média  
**Descrição:** O sistema deve permitir filtrar templates por segmento.

### Critérios de aceite

- O filtro deve exibir segmentos disponíveis;
- A listagem deve atualizar conforme seleção.

---

# 12. Exportações

## RF-EXP-001 — Exportar organograma em PNG

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir exportação de organogramas em PNG.

### Critérios de aceite

- O arquivo deve ser baixado pelo usuário;
- Deve preservar layout visual;
- Deve possuir nome de arquivo coerente.

---

## RF-EXP-002 — Exportar processo em PNG

**Prioridade:** Alta  
**Descrição:** O sistema deve permitir exportação de processos em PNG.

### Critérios de aceite

- O arquivo deve ser baixado pelo usuário;
- Deve preservar layout visual;
- Deve possuir nome de arquivo coerente.

---

## RF-EXP-003 — Exportar PDF simples

**Prioridade:** Média  
**Descrição:** O sistema deve permitir exportação em PDF simples.

### Critérios de aceite

- O PDF deve conter nome da empresa;
- O PDF deve conter nome do projeto;
- O PDF deve conter imagem do diagrama;
- O PDF deve conter data da exportação.

---

## RF-EXP-004 — Registrar histórico de exportação

**Prioridade:** Baixa  
**Descrição:** O sistema deve registrar exportações realizadas.

### Critérios de aceite

- Deve registrar usuário;
- Deve registrar tipo de arquivo;
- Deve registrar projeto exportado;
- Deve registrar data.

---

# 13. Matriz RACI

## RF-RACI-001 — Gerar matriz RACI a partir de processo

**Prioridade:** Média  
**Descrição:** O sistema deve gerar uma matriz RACI com base nas etapas do processo e cargos envolvidos.

### Critérios de aceite

- A matriz deve listar etapas;
- A matriz deve listar cargos;
- Cada célula deve aceitar R, A, C, I ou vazio.

---

## RF-RACI-002 — Editar matriz RACI

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir editar manualmente responsabilidades.

### Critérios de aceite

- O usuário deve alterar valores por célula;
- Alterações devem ser salvas;
- Deve haver validação de valores aceitos.

---

## RF-RACI-003 — Exportar matriz RACI

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir exportar matriz RACI.

### Formatos futuros

- PDF;
- CSV;
- XLSX.

---

# 14. Descrições de cargos

## RF-JOB-001 — Listar cargos

**Prioridade:** Média  
**Descrição:** O sistema deve listar cargos criados nos organogramas.

### Critérios de aceite

- Deve exibir nome do cargo;
- Deve exibir departamento;
- Deve exibir empresa;
- Deve permitir acessar descrição.

---

## RF-JOB-002 — Gerar descrição de cargo

**Prioridade:** Média  
**Descrição:** O sistema deve gerar descrição de cargo a partir dos dados do organograma.

### Conteúdo mínimo

- Missão do cargo;
- Responsabilidades;
- Indicadores;
- Competências;
- Superior imediato;
- Subordinados;
- Interfaces internas.

---

## RF-JOB-003 — Editar descrição de cargo

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir editar texto da descrição de cargo.

### Critérios de aceite

- O conteúdo deve ser editável;
- Alterações devem ser salvas;
- Deve haver data de atualização.

---

## RF-JOB-004 — Exportar descrição de cargo

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir exportar descrição de cargo em PDF ou DOCX futuramente.

---

# 15. POPs

## RF-POP-001 — Gerar POP a partir de processo

**Prioridade:** Média  
**Descrição:** O sistema deve gerar Procedimento Operacional Padrão a partir de um processo.

### Conteúdo mínimo

- Título;
- Objetivo;
- Escopo;
- Responsáveis;
- Sistemas/documentos;
- Passo a passo;
- Riscos;
- Indicadores.

---

## RF-POP-002 — Editar POP

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir editar o POP gerado.

### Critérios de aceite

- O conteúdo deve ser editável;
- Alterações devem ser salvas;
- Deve haver histórico básico de atualização.

---

## RF-POP-003 — Exportar POP

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir exportar POP em PDF e futuramente DOCX.

---

# 16. Diagnósticos

## RF-DIAG-001 — Diagnosticar processo

**Prioridade:** Média  
**Descrição:** O sistema deve analisar um processo e apontar problemas potenciais.

### Problemas analisados

- Etapas sem responsável;
- Excesso de aprovações;
- Falta de indicadores;
- Falta de etapa de conferência;
- Duplicidade de atividades;
- Risco de retrabalho.

---

## RF-DIAG-002 — Diagnosticar organograma

**Prioridade:** Média  
**Descrição:** O sistema deve analisar um organograma e apontar riscos estruturais.

### Problemas analisados

- Excesso de subordinados diretos;
- Cargos sem superior;
- Cargos duplicados;
- Departamentos sem gestor;
- Funções críticas concentradas.

---

## RF-DIAG-003 — Classificar gravidade do diagnóstico

**Prioridade:** Média  
**Descrição:** Cada problema identificado deve ter uma gravidade.

### Níveis

- Baixa;
- Média;
- Alta;
- Crítica.

---

## RF-DIAG-004 — Sugerir melhoria

**Prioridade:** Média  
**Descrição:** Cada diagnóstico deve trazer recomendação de melhoria.

### Critérios de aceite

- Deve conter problema;
- Deve conter justificativa;
- Deve conter sugestão;
- Deve conter área impactada.

---

# 17. Usuários e permissões

## RF-PERM-001 — Definir papéis de usuário

**Prioridade:** Média  
**Descrição:** O sistema deve suportar diferentes papéis.

### Papéis previstos

- Owner;
- Admin;
- Editor;
- Viewer;
- ClientViewer.

---

## RF-PERM-002 — Restringir edição por papel

**Prioridade:** Média  
**Descrição:** O sistema deve restringir ações conforme papel do usuário.

### Critérios de aceite

- Viewer não pode editar;
- Editor pode criar e editar projetos;
- Admin pode gerenciar conteúdos;
- Owner pode tudo.

---

## RF-PERM-003 — Convidar usuário para workspace

**Prioridade:** Baixa  
**Descrição:** O sistema deve permitir convidar usuários por e-mail.

---

# 18. Configurações

## RF-SET-001 — Visualizar configurações da conta

**Prioridade:** Média  
**Descrição:** O usuário deve visualizar seus dados de conta.

### Campos

- Nome;
- E-mail;
- Senha;
- Preferências básicas.

---

## RF-SET-002 — Editar perfil

**Prioridade:** Média  
**Descrição:** O usuário deve editar nome e dados básicos.

---

## RF-SET-003 — Configurar provider de IA

**Prioridade:** Baixa  
**Descrição:** Administradores devem conseguir configurar provider de IA.

### Opções previstas

- Mock;
- OpenAI;
- Anthropic;
- Gemini.

---

# 19. Logs e auditoria

## RF-LOG-001 — Registrar criação de registros principais

**Prioridade:** Média  
**Descrição:** O sistema deve registrar eventos de criação.

### Entidades

- Empresa;
- Organograma;
- Processo;
- Template usado;
- Geração com IA.

---

## RF-LOG-002 — Registrar atualizações principais

**Prioridade:** Baixa  
**Descrição:** O sistema deve registrar alterações relevantes.

---

## RF-LOG-003 — Registrar erros de IA

**Prioridade:** Alta  
**Descrição:** O sistema deve registrar erros em operações de IA.

### Critérios de aceite

- Deve registrar entrada;
- Deve registrar provider;
- Deve registrar mensagem de erro;
- Deve registrar data.

---

# 20. Busca e filtros

## RF-SEARCH-001 — Buscar empresas

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir buscar empresas por nome.

---

## RF-SEARCH-002 — Buscar organogramas

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir buscar organogramas por nome ou empresa.

---

## RF-SEARCH-003 — Buscar processos

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir buscar processos por nome ou empresa.

---

## RF-SEARCH-004 — Buscar templates

**Prioridade:** Média  
**Descrição:** O usuário deve conseguir buscar templates por nome ou segmento.

---

# 21. Priorização para MVP

## 21.1 Requisitos obrigatórios no MVP

Os seguintes requisitos devem ser implementados na primeira versão:

- RF-AUTH-001;
- RF-AUTH-002;
- RF-AUTH-003;
- RF-AUTH-004;
- RF-WORK-001;
- RF-WORK-002;
- RF-COMP-001;
- RF-COMP-002;
- RF-COMP-003;
- RF-COMP-004;
- RF-COMP-005;
- RF-DASH-001;
- RF-DASH-002;
- RF-DASH-003;
- RF-DASH-004;
- RF-ORG-001;
- RF-ORG-002;
- RF-ORG-003;
- RF-ORG-004;
- RF-ORG-006;
- RF-ORG-007;
- RF-ORG-008;
- RF-ORG-009;
- RF-ORG-010;
- RF-ORG-013;
- RF-PROC-001;
- RF-PROC-002;
- RF-PROC-003;
- RF-PROC-004;
- RF-PROC-006;
- RF-PROC-007;
- RF-PROC-008;
- RF-PROC-009;
- RF-PROC-011;
- RF-PROC-012;
- RF-AI-001;
- RF-AI-002;
- RF-AI-003;
- RF-AI-004;
- RF-AI-005;
- RF-AI-007;
- RF-TEMP-001;
- RF-TEMP-002;
- RF-TEMP-003;
- RF-TEMP-004;
- RF-EXP-001;
- RF-EXP-002;
- RF-LOG-003.

---

## 21.2 Requisitos pós-MVP imediato

Os seguintes requisitos devem ser considerados logo após o MVP:

- RF-ORG-005;
- RF-ORG-011;
- RF-ORG-012;
- RF-PROC-005;
- RF-PROC-010;
- RF-AI-006;
- RF-AI-008;
- RF-TEMP-005;
- RF-EXP-003;
- RF-RACI-001;
- RF-RACI-002;
- RF-JOB-001;
- RF-JOB-002;
- RF-POP-001;
- RF-DIAG-001;
- RF-DIAG-002;
- RF-DIAG-003;
- RF-DIAG-004.

---

## 21.3 Requisitos futuros

Os seguintes requisitos podem ficar para versões futuras:

- RF-AUTH-005;
- RF-WORK-004;
- RF-EXP-004;
- RF-RACI-003;
- RF-JOB-004;
- RF-POP-003;
- RF-PERM-003;
- RF-SET-003;
- RF-LOG-002.

---

# 22. Regras funcionais transversais

## 22.1 Isolamento por workspace

Todo dado criado no sistema deve estar associado a um workspace.

O sistema não deve permitir que um usuário acesse dados de outro workspace sem autorização.

---

## 22.2 Atualização de timestamps

Toda entidade principal deve possuir:

- `createdAt`;
- `updatedAt`.

O campo `updatedAt` deve ser atualizado sempre que houver modificação.

---

## 22.3 Soft delete ou exclusão segura

Sempre que possível, entidades importantes devem ser removidas com soft delete.

Caso seja usada exclusão física, o sistema deve solicitar confirmação explícita.

---

## 22.4 Validação de dados

Formulários devem validar campos obrigatórios antes de enviar dados ao servidor.

Validações devem ocorrer no front-end e no back-end.

---

## 22.5 Tratamento de erro

Toda ação crítica deve exibir mensagem clara em caso de erro.

Exemplos:

- Erro ao salvar;
- Erro ao carregar;
- Erro ao exportar;
- Erro ao gerar com IA;
- Erro de permissão.

---

# 23. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
user-stories.md
```

Esse documento deve traduzir os requisitos em histórias de usuário por persona, facilitando planejamento de sprints e validação de valor.
