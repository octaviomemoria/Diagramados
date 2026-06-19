# Diagramados - sistema visual

Referências aprovadas para implementação:

- `design-references/dashboard-premium.png`
- `design-references/orgchart-editor-premium.png`
- `design-references/process-editor-premium.png`

## Direção

Produto B2B premium, preciso e calmo. O canvas e os diagramas são o foco; a interface os enquadra sem competir com o conteúdo.

## Tokens

| Token | Valor |
|---|---|
| Fundo | `#f8fafc` |
| Superfície | `#ffffff` |
| Sidebar | `#111d2d` |
| Texto | `#17202a` |
| Texto secundário | `#667085` |
| Borda | `#dfe4ec` |
| Primária | `#315efb` |
| Primária suave | `#edf2ff` |
| Coral | `#ff6f4f` |
| Sucesso | `#16a05d` |
| Aviso | `#f59e0b` |

## Tipografia

- Interface: Geist Sans;
- Títulos: 24-30 px, 650-700;
- Corpo: 14 px, 400-500;
- Chrome do editor: 12-13 px, 500;
- Nós: título 13-14 px, secundário 11-12 px.

## Geometria

- Raio de controles: 8 px;
- Raio de painéis e cards: 12 px;
- Borda: 1 px;
- Sombra: curta e discreta;
- Sidebar: 232-248 px;
- Inspetor: 320 px;
- Toolbar do editor: 64-72 px;
- Status bar: 36-42 px.

## Componentes

- Navegação lateral escura com seleção azul;
- Tabelas/listas abertas; evitar grade de cards;
- Botão primário azul; secundário branco com borda;
- Toolbar compacta com grupos separados;
- Canvas branco com grade pontilhada fria;
- Painel de propriedades fixo à direita;
- Nós brancos com faixa semântica e sombra mínima;
- Estados de foco e seleção sempre visíveis.

## Ícones

Lucide, traço 1.75-2 px, 16-20 px. Ícones são utilitários, nunca decorativos.

## Movimento

- 120-180 ms para hover, seleção e painéis;
- Sem animações ornamentais;
- Respeitar `prefers-reduced-motion`.

## Responsividade

- Edição suportada a partir de 1024 px;
- Em larguras menores, inspetor vira painel sobreposto;
- Mobile recebe visualização e aviso para editar no desktop.

