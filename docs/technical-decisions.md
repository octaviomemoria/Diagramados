# Decisões técnicas - Diagramados

## Supabase

Supabase fornece autenticação, PostgreSQL e RLS. A publishable key pode ficar no navegador; autorização depende das políticas, não de segredo no cliente.

## Persistência de diagramas

Projetos, nós e conexões são relacionais. Salvamentos completos usam funções transacionais com revisão otimista. Isso evita gravação por pixel durante drag e sobrescrita silenciosa.

## Hierarquia

O organograma aceita um superior direto por cargo. `reports_to_node_id` é a relação canônica; edges refletem a mesma relação para renderização.

## Processos

Processos podem conter ciclos. Self-loop e conexão duplicada são bloqueados. Decisões suportam saídas rotuladas.

## Modo demonstração

Sem Supabase configurado, dados permanecem em `localStorage`. Esse modo serve para desenvolvimento e avaliação; produção usa Supabase.

## Front-end

O canvas é carregado dinamicamente para reduzir o bundle inicial. Páginas comuns são server-first; interações e editores são Client Components isolados.
