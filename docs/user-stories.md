# User Stories — Diagramados

**Documento:** Histórias de Usuário  
**Produto:** Diagramados  
**Versão:** 1.0  
**Status:** Planejamento inicial  
**Data:** 2026-06-17  

---

## 1. Objetivo do documento

Este documento descreve as histórias de usuário do **Diagramados**, organizadas por persona, módulo e prioridade.

As histórias de usuário têm como objetivo transformar os requisitos funcionais em cenários práticos de uso, facilitando:

- Planejamento de sprints;
- Priorização de funcionalidades;
- Desenvolvimento incremental;
- Validação do produto;
- Testes funcionais;
- Alinhamento entre produto, design e tecnologia.

---

## 2. Formato utilizado

As histórias seguem o formato:

```txt
Como [persona],
quero [ação ou funcionalidade],
para [benefício esperado].
```

Cada história contém:

- Código;
- Persona;
- Prioridade;
- Descrição;
- Critérios de aceite;
- Módulo relacionado;
- Observações quando necessário.

---

## 3. Personas principais

## 3.1 Consultor empresarial

Profissional que presta serviços de consultoria organizacional, gestão, processos, RH, estratégia ou melhoria operacional.

### Principais dores

- Perde tempo criando organogramas manualmente;
- Usa PowerPoint, Canva, Excel ou Miro de forma improvisada;
- Precisa entregar materiais bonitos e claros para clientes;
- Precisa transformar entrevistas e reuniões em documentos estruturados;
- Precisa padronizar entregas entre diferentes clientes.

### Objetivos no sistema

- Criar organogramas rapidamente;
- Mapear processos;
- Gerar documentação;
- Exportar materiais;
- Reutilizar templates por segmento;
- Criar entregáveis profissionais.

---

## 3.2 Gestor de empresa

Dono, diretor, gerente ou administrador de pequena ou média empresa.

### Principais dores

- Empresa cresceu sem estrutura formal;
- Funções estão confusas;
- Pessoas acumulam atividades;
- Processos dependem de memória e improviso;
- Falta clareza sobre quem faz o quê.

### Objetivos no sistema

- Visualizar a estrutura da empresa;
- Organizar cargos e setores;
- Mapear processos principais;
- Identificar gargalos;
- Criar documentação básica.

---

## 3.3 Gestor de RH

Profissional responsável por cargos, pessoas, estrutura e desenvolvimento organizacional.

### Principais dores

- Organograma desatualizado;
- Cargos sem descrição formal;
- Dificuldade de mostrar estrutura para diretoria;
- Dificuldade de planejar vagas;
- Falta padronização de responsabilidades.

### Objetivos no sistema

- Criar e manter organogramas;
- Gerar descrições de cargos;
- Identificar vagas abertas;
- Visualizar hierarquias;
- Apoiar estruturação de RH.

---

## 3.4 Analista de processos

Profissional responsável por mapear, documentar e melhorar processos.

### Principais dores

- Processos estão espalhados em documentos soltos;
- Falta padrão visual;
- Dificuldade de identificar responsáveis;
- Fluxos não geram documentação;
- Ferramentas tradicionais são genéricas demais.

### Objetivos no sistema

- Criar fluxos de processos;
- Mapear responsáveis;
- Gerar POPs;
- Identificar gargalos;
- Exportar processos.

---

## 3.5 Cliente visualizador

Pessoa que acessa um projeto para visualizar, revisar ou validar informações.

### Principais dores

- Precisa entender o material sem editar;
- Quer acessar organogramas e processos de forma simples;
- Precisa revisar informações de sua empresa;
- Não quer lidar com configurações técnicas.

### Objetivos no sistema

- Visualizar projetos liberados;
- Navegar por organogramas e processos;
- Exportar ou comentar futuramente;
- Validar estrutura proposta.

---

## 3.6 Administrador da plataforma

Usuário responsável por configurações, usuários, permissões e gestão do ambiente.

### Principais dores

- Precisa controlar acesso;
- Precisa garantir segurança dos dados;
- Precisa organizar workspaces;
- Precisa acompanhar uso da plataforma.

### Objetivos no sistema

- Gerenciar usuários;
- Gerenciar permissões;
- Configurar ambiente;
- Controlar acesso aos dados.

---

# 4. Histórias de autenticação

## US-AUTH-001 — Criar conta

**Persona:** Novo usuário  
**Prioridade:** Alta  
**Módulo:** Autenticação  

Como novo usuário,  
quero criar uma conta com nome, e-mail e senha,  
para acessar a plataforma e começar a criar meus projetos.

### Critérios de aceite

- O sistema deve solicitar nome, e-mail e senha;
- O sistema deve validar e-mail único;
- O sistema deve validar senha obrigatória;
- Após cadastro, o usuário deve acessar o ambiente interno;
- Um workspace inicial deve ser criado automaticamente.

---

## US-AUTH-002 — Entrar no sistema

**Persona:** Usuário cadastrado  
**Prioridade:** Alta  
**Módulo:** Autenticação  

Como usuário cadastrado,  
quero fazer login usando e-mail e senha,  
para acessar meus organogramas, processos e empresas.

### Critérios de aceite

- O sistema deve validar as credenciais;
- Em caso de sucesso, o usuário deve ir para o dashboard;
- Em caso de erro, o sistema deve exibir mensagem compreensível;
- O sistema não deve informar detalhes sensíveis sobre falha de autenticação.

---

## US-AUTH-003 — Sair do sistema

**Persona:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Autenticação  

Como usuário autenticado,  
quero sair da minha conta,  
para encerrar meu acesso com segurança.

### Critérios de aceite

- Deve haver opção de logout;
- Após sair, o usuário deve voltar para login;
- Rotas privadas não devem permanecer acessíveis.

---

## US-AUTH-004 — Proteger meus dados

**Persona:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Autenticação / Segurança  

Como usuário autenticado,  
quero que meus dados fiquem protegidos,  
para que outros usuários não acessem minhas empresas, organogramas e processos.

### Critérios de aceite

- Todas as consultas devem respeitar o workspace;
- Usuário sem sessão não pode acessar rotas privadas;
- Usuário de outro workspace não pode acessar registros não autorizados.

---

# 5. Histórias de workspace

## US-WORK-001 — Ter um ambiente de trabalho inicial

**Persona:** Novo usuário  
**Prioridade:** Alta  
**Módulo:** Workspace  

Como novo usuário,  
quero que o sistema crie automaticamente um ambiente de trabalho,  
para que eu possa começar a cadastrar empresas e projetos sem configuração complexa.

### Critérios de aceite

- O workspace deve ser criado no cadastro;
- O usuário deve ser associado ao workspace;
- Empresas, organogramas e processos devem ser vinculados a esse workspace.

---

## US-WORK-002 — Visualizar o workspace ativo

**Persona:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Workspace  

Como usuário autenticado,  
quero visualizar qual workspace estou utilizando,  
para ter clareza sobre o ambiente em que estou trabalhando.

### Critérios de aceite

- O nome do workspace deve aparecer na interface;
- O sistema deve usar o workspace ativo nas operações internas.

---

## US-WORK-003 — Editar nome do workspace

**Persona:** Administrador  
**Prioridade:** Média  
**Módulo:** Workspace  

Como administrador,  
quero editar o nome do workspace,  
para adequar o ambiente ao nome da minha empresa ou consultoria.

### Critérios de aceite

- Apenas usuários autorizados podem editar;
- A alteração deve ser salva;
- O novo nome deve aparecer na interface.

---

# 6. Histórias de empresas e clientes

## US-COMP-001 — Cadastrar empresa ou cliente

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

Como consultor empresarial,  
quero cadastrar uma empresa cliente,  
para organizar organogramas e processos vinculados a ela.

### Critérios de aceite

- O sistema deve solicitar nome da empresa;
- Segmento, porte e número de colaboradores devem estar disponíveis;
- A empresa deve ser vinculada ao workspace;
- Após salvar, deve aparecer na lista de empresas.

---

## US-COMP-002 — Listar empresas cadastradas

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

Como consultor empresarial,  
quero visualizar todas as empresas cadastradas,  
para acessar rapidamente os projetos de cada cliente.

### Critérios de aceite

- A listagem deve exibir nome, segmento e data de atualização;
- Deve haver busca por nome;
- Empresas de outros workspaces não devem aparecer.

---

## US-COMP-003 — Editar dados de uma empresa

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Empresas  

Como consultor empresarial,  
quero editar dados de uma empresa,  
para manter as informações atualizadas.

### Critérios de aceite

- O sistema deve permitir alterar dados cadastrais;
- As alterações devem ser persistidas;
- A data de atualização deve ser modificada.

---

## US-COMP-004 — Excluir empresa

**Persona:** Administrador  
**Prioridade:** Alta  
**Módulo:** Empresas  

Como administrador,  
quero excluir uma empresa cadastrada,  
para remover registros criados por engano ou que não serão mais usados.

### Critérios de aceite

- O sistema deve solicitar confirmação;
- Deve informar impacto sobre organogramas e processos vinculados;
- Apenas usuários autorizados devem excluir.

---

## US-COMP-005 — Visualizar detalhes da empresa

**Persona:** Gestor de empresa  
**Prioridade:** Alta  
**Módulo:** Empresas  

Como gestor de empresa,  
quero visualizar os detalhes da minha empresa,  
para acessar organogramas e processos relacionados.

### Critérios de aceite

- A tela deve exibir dados da empresa;
- Deve listar organogramas vinculados;
- Deve listar processos vinculados;
- Deve permitir criar novos projetos para essa empresa.

---

# 7. Histórias de dashboard

## US-DASH-001 — Ver visão geral do ambiente

**Persona:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Dashboard  

Como usuário autenticado,  
quero visualizar um resumo do meu ambiente,  
para entender rapidamente quantas empresas, organogramas e processos existem.

### Critérios de aceite

- O dashboard deve exibir total de empresas;
- Deve exibir total de organogramas;
- Deve exibir total de processos;
- Deve exibir atalhos principais.

---

## US-DASH-002 — Acessar últimos projetos editados

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Dashboard  

Como consultor empresarial,  
quero ver os últimos projetos editados,  
para continuar rapidamente um trabalho em andamento.

### Critérios de aceite

- Deve listar organogramas e processos recentes;
- Cada item deve exibir nome, empresa e data de atualização;
- Cada item deve permitir acesso direto ao editor.

---

## US-DASH-003 — Criar rapidamente novo projeto

**Persona:** Usuário autenticado  
**Prioridade:** Alta  
**Módulo:** Dashboard  

Como usuário autenticado,  
quero acessar botões rápidos de criação,  
para iniciar uma empresa, organograma ou processo sem navegar por muitas telas.

### Critérios de aceite

- Deve haver botão para nova empresa;
- Deve haver botão para novo organograma;
- Deve haver botão para novo processo;
- Deve haver botão para criar com IA.

---

## US-DASH-004 — Receber orientação quando não houver dados

**Persona:** Novo usuário  
**Prioridade:** Alta  
**Módulo:** Dashboard  

Como novo usuário,  
quero ver orientações quando o sistema estiver vazio,  
para saber qual primeiro passo devo tomar.

### Critérios de aceite

- Se não houver empresas, o sistema deve sugerir criar a primeira;
- Se não houver projetos, o sistema deve sugerir criar organograma ou processo;
- Os estados vazios devem ter botões de ação.

---

# 8. Histórias de organogramas

## US-ORG-001 — Criar organograma

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero criar um organograma vinculado a uma empresa,  
para representar sua estrutura hierárquica.

### Critérios de aceite

- O usuário deve informar nome do organograma;
- Deve selecionar uma empresa;
- O organograma deve abrir no editor visual;
- O organograma deve ser salvo no workspace correto.

---

## US-ORG-002 — Adicionar cargo ao organograma

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero adicionar cargos no organograma,  
para construir a estrutura da empresa.

### Critérios de aceite

- Deve haver botão para adicionar cargo;
- O cargo deve aparecer no canvas;
- O usuário deve conseguir informar nome do cargo e departamento;
- O cargo deve ser salvo com posição visual.

---

## US-ORG-003 — Editar cargo

**Persona:** Gestor de RH  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como gestor de RH,  
quero editar as informações de um cargo,  
para manter a estrutura organizacional atualizada.

### Critérios de aceite

- O usuário deve selecionar um cargo;
- O painel lateral ou modal deve exibir os dados;
- O usuário deve conseguir alterar cargo, ocupante, departamento e status;
- As alterações devem ser persistidas.

---

## US-ORG-004 — Definir hierarquia entre cargos

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero conectar cargos por hierarquia,  
para mostrar quem responde a quem.

### Critérios de aceite

- O usuário deve conseguir conectar cargo superior a subordinado;
- A conexão deve ser visual;
- A conexão deve ser salva;
- O sistema deve evitar relações circulares inválidas.

---

## US-ORG-005 — Reposicionar cargos

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero arrastar os cargos no canvas,  
para organizar visualmente o organograma.

### Critérios de aceite

- O cargo deve se mover no canvas;
- A posição deve ser salva;
- Ao reabrir, o layout deve ser mantido.

---

## US-ORG-006 — Excluir cargo

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero excluir cargos do organograma,  
para remover funções incorretas ou desnecessárias.

### Critérios de aceite

- O sistema deve solicitar confirmação;
- As conexões relacionadas devem ser removidas;
- A exclusão deve ser persistida.

---

## US-ORG-007 — Exportar organograma

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Organogramas / Exportação  

Como consultor empresarial,  
quero exportar o organograma em imagem,  
para inserir em apresentações, relatórios e propostas.

### Critérios de aceite

- O sistema deve gerar arquivo PNG;
- O arquivo deve conter o diagrama visível;
- O nome do arquivo deve ser coerente;
- O download deve funcionar.

---

## US-ORG-008 — Duplicar organograma

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Organogramas  

Como consultor empresarial,  
quero duplicar um organograma,  
para criar uma versão alternativa sem perder a original.

### Critérios de aceite

- A cópia deve manter cargos e conexões;
- A cópia deve indicar que é duplicada;
- O usuário deve poder editar a cópia independentemente.

---

## US-ORG-009 — Alternar visualização compacta e detalhada

**Persona:** Gestor de RH  
**Prioridade:** Média  
**Módulo:** Organogramas  

Como gestor de RH,  
quero alternar entre visualização compacta e detalhada,  
para adequar o organograma ao nível de informação necessário.

### Critérios de aceite

- O modo compacto deve mostrar cargo e departamento;
- O modo detalhado deve mostrar cargo, ocupante, departamento e status;
- A alternância deve ser simples.

---

# 9. Histórias de fluxos de processos

## US-PROC-001 — Criar processo

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero criar um fluxo vinculado a uma empresa,  
para documentar como uma operação funciona.

### Critérios de aceite

- O usuário deve informar nome do processo;
- Deve selecionar empresa vinculada;
- O processo deve abrir no editor visual;
- O processo deve ser salvo no workspace correto.

---

## US-PROC-002 — Adicionar etapa ao processo

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero adicionar etapas ao fluxo,  
para representar as atividades executadas.

### Critérios de aceite

- Deve haver botão para adicionar etapa;
- O usuário deve escolher o tipo da etapa;
- A etapa deve aparecer no canvas;
- A etapa deve ser salva com posição visual.

---

## US-PROC-003 — Editar etapa do processo

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero editar os dados de uma etapa,  
para documentar responsável, área, descrição e observações.

### Critérios de aceite

- O usuário deve selecionar uma etapa;
- O painel lateral deve exibir os dados;
- O usuário deve editar nome, descrição, área e responsável;
- As alterações devem ser persistidas.

---

## US-PROC-004 — Conectar etapas

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero conectar as etapas do processo,  
para demonstrar a sequência operacional.

### Critérios de aceite

- O usuário deve conectar uma etapa a outra;
- A conexão deve indicar direção;
- A conexão deve ser salva;
- O processo deve manter consistência ao reabrir.

---

## US-PROC-005 — Criar decisão no fluxo

**Persona:** Analista de processos  
**Prioridade:** Média  
**Módulo:** Processos  

Como analista de processos,  
quero criar etapas de decisão com saídas alternativas,  
para representar condições como sim/não, aprovado/reprovado ou disponível/indisponível.

### Critérios de aceite

- O tipo decisão deve estar disponível;
- As conexões devem permitir rótulos;
- Deve ser possível criar saída “sim” e “não”.

---

## US-PROC-006 — Reposicionar etapas

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero arrastar etapas no canvas,  
para organizar visualmente o fluxo.

### Critérios de aceite

- A etapa deve se mover no canvas;
- A posição deve ser salva;
- Ao reabrir, a posição deve ser mantida.

---

## US-PROC-007 — Excluir etapa

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Processos  

Como analista de processos,  
quero excluir etapas incorretas,  
para manter o fluxo limpo e fiel à operação.

### Critérios de aceite

- O sistema deve solicitar confirmação;
- Conexões relacionadas devem ser removidas;
- A exclusão deve ser salva.

---

## US-PROC-008 — Exportar processo

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Processos / Exportação  

Como consultor empresarial,  
quero exportar o processo em imagem,  
para apresentar o fluxo ao cliente ou equipe.

### Critérios de aceite

- O sistema deve gerar PNG;
- O arquivo deve conter o diagrama;
- O download deve funcionar;
- O arquivo deve ter nome coerente.

---

## US-PROC-009 — Duplicar processo

**Persona:** Analista de processos  
**Prioridade:** Média  
**Módulo:** Processos  

Como analista de processos,  
quero duplicar um processo,  
para criar uma versão alternativa sem perder a versão original.

### Critérios de aceite

- A cópia deve manter etapas e conexões;
- A cópia deve ser editável;
- O nome deve indicar que é uma cópia.

---

# 10. Histórias de criação com IA

## US-AI-001 — Acessar criação com IA

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** IA  

Como consultor empresarial,  
quero acessar uma tela de criação com IA,  
para gerar estruturas a partir de descrições em texto.

### Critérios de aceite

- A tela deve estar disponível no menu;
- Deve conter campo de texto;
- Deve conter seletor de tipo de geração;
- Deve conter botão gerar.

---

## US-AI-002 — Gerar organograma a partir de texto

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** IA / Organogramas  

Como consultor empresarial,  
quero descrever a estrutura de uma empresa em texto,  
para que o sistema gere um organograma inicial editável.

### Critérios de aceite

- O usuário deve informar um texto;
- O sistema deve retornar organograma mockado no MVP;
- O resultado deve aparecer em preview;
- O usuário deve conseguir salvar o organograma.

---

## US-AI-003 — Gerar processo a partir de texto

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** IA / Processos  

Como analista de processos,  
quero descrever um processo em texto,  
para que o sistema gere um fluxo inicial editável.

### Critérios de aceite

- O usuário deve informar um texto;
- O sistema deve retornar processo mockado no MVP;
- O resultado deve aparecer em preview;
- O usuário deve conseguir salvar o processo.

---

## US-AI-004 — Gerar organograma e processo juntos

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** IA  

Como consultor empresarial,  
quero gerar organograma e processo em uma única operação,  
para acelerar a estruturação inicial de uma empresa.

### Critérios de aceite

- O usuário deve selecionar geração completa;
- O sistema deve retornar organograma e processo;
- O usuário deve conseguir salvar cada estrutura.

---

## US-AI-005 — Registrar uso da IA

**Persona:** Administrador  
**Prioridade:** Alta  
**Módulo:** IA / Logs  

Como administrador,  
quero registrar as gerações feitas com IA,  
para controlar uso, erros e evolução do produto.

### Critérios de aceite

- O sistema deve salvar texto de entrada;
- Deve salvar tipo de geração;
- Deve salvar JSON de saída;
- Deve salvar status e erro, se houver.

---

## US-AI-006 — Alternar entre mock e IA real

**Persona:** Desenvolvedor / Administrador técnico  
**Prioridade:** Média  
**Módulo:** IA  

Como administrador técnico,  
quero alternar entre provider mock e IA real,  
para evoluir o produto sem reescrever a arquitetura.

### Critérios de aceite

- O provider deve ser controlado por configuração;
- O `aiService` deve centralizar chamadas;
- O front-end não deve depender diretamente de um provider específico.

---

# 11. Histórias de templates

## US-TEMP-001 — Ver templates disponíveis

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Templates  

Como consultor empresarial,  
quero visualizar templates por segmento,  
para começar projetos sem partir do zero.

### Critérios de aceite

- O sistema deve listar templates;
- Cada template deve exibir nome, segmento e descrição;
- Deve haver preview ou detalhes básicos.

---

## US-TEMP-002 — Usar template de organograma

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Templates / Organogramas  

Como consultor empresarial,  
quero criar um organograma a partir de template,  
para acelerar entregas de estrutura organizacional.

### Critérios de aceite

- O usuário deve selecionar template;
- Deve selecionar empresa de destino;
- O sistema deve criar organograma editável.

---

## US-TEMP-003 — Usar template de processo

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Templates / Processos  

Como analista de processos,  
quero criar um processo a partir de template,  
para acelerar o mapeamento de operações comuns.

### Critérios de aceite

- O usuário deve selecionar template;
- Deve selecionar empresa de destino;
- O sistema deve criar processo editável.

---

## US-TEMP-004 — Filtrar templates por segmento

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Templates  

Como consultor empresarial,  
quero filtrar templates por segmento,  
para encontrar rapidamente modelos compatíveis com meu cliente.

### Critérios de aceite

- O sistema deve listar segmentos;
- A lista deve atualizar conforme o filtro;
- Deve haver opção para limpar filtro.

---

# 12. Histórias de exportação

## US-EXP-001 — Exportar organograma em PNG

**Persona:** Consultor empresarial  
**Prioridade:** Alta  
**Módulo:** Exportação  

Como consultor empresarial,  
quero exportar organogramas em PNG,  
para usar em apresentações, propostas e relatórios.

### Critérios de aceite

- O sistema deve gerar arquivo PNG;
- O arquivo deve preservar o layout visual;
- O download deve iniciar corretamente.

---

## US-EXP-002 — Exportar processo em PNG

**Persona:** Analista de processos  
**Prioridade:** Alta  
**Módulo:** Exportação  

Como analista de processos,  
quero exportar processos em PNG,  
para compartilhar fluxos com equipes e clientes.

### Critérios de aceite

- O sistema deve gerar arquivo PNG;
- O arquivo deve preservar o layout visual;
- O download deve iniciar corretamente.

---

## US-EXP-003 — Exportar PDF simples

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Exportação  

Como consultor empresarial,  
quero exportar projetos em PDF simples,  
para entregar materiais mais formais aos clientes.

### Critérios de aceite

- O PDF deve conter nome da empresa;
- Deve conter nome do projeto;
- Deve conter data;
- Deve conter imagem do diagrama.

---

# 13. Histórias de matriz RACI

## US-RACI-001 — Gerar matriz RACI

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** RACI  

Como consultor empresarial,  
quero gerar uma matriz RACI a partir de um processo,  
para definir responsabilidades por etapa.

### Critérios de aceite

- A matriz deve listar etapas do processo;
- Deve listar cargos ou áreas envolvidas;
- Deve permitir os valores R, A, C e I.

---

## US-RACI-002 — Editar matriz RACI

**Persona:** Gestor de processos  
**Prioridade:** Média  
**Módulo:** RACI  

Como gestor de processos,  
quero editar manualmente a matriz RACI,  
para ajustar responsabilidades conforme a realidade da empresa.

### Critérios de aceite

- O usuário deve alterar responsabilidades;
- As alterações devem ser salvas;
- A matriz deve manter consistência.

---

## US-RACI-003 — Exportar matriz RACI

**Persona:** Consultor empresarial  
**Prioridade:** Baixa  
**Módulo:** RACI / Exportação  

Como consultor empresarial,  
quero exportar a matriz RACI,  
para anexar em relatórios e apresentações.

### Critérios de aceite

- Deve haver opção de exportação;
- Formatos futuros podem incluir PDF, CSV ou XLSX.

---

# 14. Histórias de descrições de cargos

## US-JOB-001 — Listar cargos existentes

**Persona:** Gestor de RH  
**Prioridade:** Média  
**Módulo:** Cargos  

Como gestor de RH,  
quero visualizar cargos existentes nos organogramas,  
para gerenciar descrições de função.

### Critérios de aceite

- O sistema deve listar cargos por empresa;
- Deve exibir departamento;
- Deve permitir acessar detalhes do cargo.

---

## US-JOB-002 — Gerar descrição de cargo

**Persona:** Gestor de RH  
**Prioridade:** Média  
**Módulo:** Cargos / IA  

Como gestor de RH,  
quero gerar uma descrição de cargo,  
para documentar responsabilidades, competências e indicadores.

### Critérios de aceite

- O sistema deve gerar missão do cargo;
- Deve gerar responsabilidades;
- Deve gerar indicadores;
- Deve gerar competências técnicas e comportamentais;
- O conteúdo deve ser editável.

---

## US-JOB-003 — Editar descrição de cargo

**Persona:** Gestor de RH  
**Prioridade:** Média  
**Módulo:** Cargos  

Como gestor de RH,  
quero editar a descrição de cargo gerada,  
para adequar o texto à realidade da empresa.

### Critérios de aceite

- O conteúdo deve ser editável;
- Alterações devem ser salvas;
- Deve haver data de atualização.

---

# 15. Histórias de POP

## US-POP-001 — Gerar POP a partir de processo

**Persona:** Analista de processos  
**Prioridade:** Média  
**Módulo:** POP  

Como analista de processos,  
quero gerar um Procedimento Operacional Padrão a partir de um fluxo,  
para transformar o processo visual em documentação operacional.

### Critérios de aceite

- O POP deve conter objetivo;
- Deve conter escopo;
- Deve conter responsáveis;
- Deve conter passo a passo;
- Deve conter riscos e pontos de controle.

---

## US-POP-002 — Editar POP

**Persona:** Analista de processos  
**Prioridade:** Média  
**Módulo:** POP  

Como analista de processos,  
quero editar o POP gerado,  
para corrigir e complementar a documentação.

### Critérios de aceite

- O texto deve ser editável;
- Alterações devem ser salvas;
- Deve haver data de atualização.

---

## US-POP-003 — Exportar POP

**Persona:** Consultor empresarial  
**Prioridade:** Baixa  
**Módulo:** POP / Exportação  

Como consultor empresarial,  
quero exportar o POP em documento,  
para entregar ao cliente ou equipe.

### Critérios de aceite

- Deve haver exportação em PDF futuramente;
- Deve haver exportação DOCX futuramente.

---

# 16. Histórias de diagnóstico

## US-DIAG-001 — Diagnosticar processo

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Diagnóstico  

Como consultor empresarial,  
quero diagnosticar gargalos em um processo,  
para apresentar oportunidades de melhoria ao cliente.

### Critérios de aceite

- O sistema deve identificar etapas sem responsável;
- Deve apontar excesso de aprovações;
- Deve apontar falta de indicadores;
- Deve sugerir melhorias.

---

## US-DIAG-002 — Diagnosticar organograma

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Diagnóstico  

Como consultor empresarial,  
quero diagnosticar problemas no organograma,  
para identificar riscos estruturais.

### Critérios de aceite

- O sistema deve identificar cargos sem superior;
- Deve apontar departamentos sem gestor;
- Deve apontar possível concentração de responsabilidades;
- Deve sugerir melhorias.

---

## US-DIAG-003 — Classificar gravidade

**Persona:** Consultor empresarial  
**Prioridade:** Média  
**Módulo:** Diagnóstico  

Como consultor empresarial,  
quero que cada diagnóstico tenha gravidade,  
para priorizar ações corretivas.

### Critérios de aceite

- Cada item deve ter nível baixa, média, alta ou crítica;
- O nível deve ser exibido visualmente;
- Deve haver justificativa.

---

# 17. Histórias de permissões

## US-PERM-001 — Ter papéis de acesso

**Persona:** Administrador  
**Prioridade:** Média  
**Módulo:** Permissões  

Como administrador,  
quero definir papéis de acesso,  
para controlar quem pode visualizar, editar ou administrar dados.

### Critérios de aceite

- Deve haver papéis Owner, Admin, Editor, Viewer e ClientViewer;
- Cada papel deve possuir permissões específicas;
- O sistema deve bloquear ações não permitidas.

---

## US-PERM-002 — Visualizar sem editar

**Persona:** Cliente visualizador  
**Prioridade:** Média  
**Módulo:** Permissões  

Como cliente visualizador,  
quero acessar projetos sem poder editar,  
para revisar informações sem risco de alterar dados.

### Critérios de aceite

- O usuário deve conseguir visualizar projetos liberados;
- Botões de edição não devem aparecer;
- Tentativas de edição devem ser bloqueadas.

---

## US-PERM-003 — Convidar usuários

**Persona:** Administrador  
**Prioridade:** Baixa  
**Módulo:** Permissões / Usuários  

Como administrador,  
quero convidar usuários para o workspace,  
para trabalhar com equipe ou clientes.

### Critérios de aceite

- Deve ser possível enviar convite por e-mail futuramente;
- O convidado deve receber papel definido;
- O acesso deve respeitar permissões.

---

# 18. Histórias de configurações

## US-SET-001 — Editar perfil

**Persona:** Usuário autenticado  
**Prioridade:** Média  
**Módulo:** Configurações  

Como usuário autenticado,  
quero editar meus dados de perfil,  
para manter minhas informações atualizadas.

### Critérios de aceite

- O usuário deve conseguir alterar nome;
- Alterações devem ser salvas;
- E-mail pode exigir validação adicional futuramente.

---

## US-SET-002 — Configurar provider de IA

**Persona:** Administrador técnico  
**Prioridade:** Baixa  
**Módulo:** Configurações / IA  

Como administrador técnico,  
quero configurar o provedor de IA,  
para alternar entre mock, OpenAI, Anthropic ou Gemini.

### Critérios de aceite

- O provider deve ser configurável;
- O sistema deve validar provider ativo;
- O uso deve ser registrado em log.

---

# 19. Histórias por prioridade

## 19.1 Alta prioridade — MVP

As histórias abaixo compõem o núcleo do MVP:

- US-AUTH-001;
- US-AUTH-002;
- US-AUTH-003;
- US-AUTH-004;
- US-WORK-001;
- US-WORK-002;
- US-COMP-001;
- US-COMP-002;
- US-COMP-003;
- US-COMP-004;
- US-COMP-005;
- US-DASH-001;
- US-DASH-002;
- US-DASH-003;
- US-DASH-004;
- US-ORG-001;
- US-ORG-002;
- US-ORG-003;
- US-ORG-004;
- US-ORG-005;
- US-ORG-006;
- US-ORG-007;
- US-PROC-001;
- US-PROC-002;
- US-PROC-003;
- US-PROC-004;
- US-PROC-006;
- US-PROC-007;
- US-PROC-008;
- US-AI-001;
- US-AI-002;
- US-AI-003;
- US-AI-005;
- US-TEMP-001;
- US-TEMP-002;
- US-TEMP-003;
- US-EXP-001;
- US-EXP-002.

---

## 19.2 Média prioridade — Pós-MVP próximo

Histórias recomendadas para evolução logo após o MVP:

- US-WORK-003;
- US-ORG-008;
- US-ORG-009;
- US-PROC-005;
- US-PROC-009;
- US-AI-004;
- US-AI-006;
- US-TEMP-004;
- US-EXP-003;
- US-RACI-001;
- US-RACI-002;
- US-JOB-001;
- US-JOB-002;
- US-JOB-003;
- US-POP-001;
- US-POP-002;
- US-DIAG-001;
- US-DIAG-002;
- US-DIAG-003;
- US-PERM-001;
- US-PERM-002;
- US-SET-001.

---

## 19.3 Baixa prioridade — Futuro

Histórias para versões futuras:

- US-RACI-003;
- US-POP-003;
- US-PERM-003;
- US-SET-002.

---

# 20. Jornada principal do MVP

A jornada principal do MVP deve ser:

1. Usuário cria conta;
2. Sistema cria workspace inicial;
3. Usuário acessa dashboard;
4. Usuário cadastra empresa;
5. Usuário cria organograma;
6. Usuário adiciona cargos;
7. Usuário conecta hierarquia;
8. Usuário salva organograma;
9. Usuário cria processo;
10. Usuário adiciona etapas;
11. Usuário conecta fluxo;
12. Usuário salva processo;
13. Usuário testa criação com IA mockada;
14. Usuário exporta organograma ou processo em PNG.

---

# 21. Mapa de valor por persona

| Persona | Valor principal entregue |
|---|---|
| Consultor empresarial | Criar entregáveis profissionais com mais rapidez |
| Gestor de empresa | Visualizar estrutura e processos com clareza |
| Gestor de RH | Organizar cargos, hierarquia e descrições |
| Analista de processos | Mapear fluxos e gerar documentação |
| Cliente visualizador | Revisar projetos sem alterar dados |
| Administrador | Controlar acesso, dados e configurações |

---

# 22. Observações de produto

## 22.1 Evitar complexidade prematura

O MVP deve priorizar:

- Criar;
- Editar;
- Salvar;
- Reabrir;
- Exportar.

Recursos avançados devem ser implementados somente após validação do uso real.

---

## 22.2 IA no MVP deve validar experiência

A IA mockada deve validar o fluxo de uso, não a inteligência final.

O objetivo é verificar se o usuário percebe valor em:

- Descrever uma empresa em texto;
- Receber uma estrutura visual inicial;
- Editar essa estrutura;
- Exportar o resultado.

---

## 22.3 Templates são diferencial estratégico

Templates por segmento são essenciais para reduzir comparação direta com ferramentas genéricas como editores de diagramas.

O produto deve vender gestão organizacional, não apenas desenho.

---

# 23. Próximo documento recomendado

Após este documento, o próximo documento recomendado é:

```txt
user-flows.md
```

Esse documento deve mapear passo a passo as jornadas principais do usuário dentro do sistema.
