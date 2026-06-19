# Diagramados

SaaS B2B para criar, editar e exportar organogramas e fluxos de processos.

## Stack

- Next.js + TypeScript;
- React Flow;
- Supabase Auth e PostgreSQL com RLS;
- Tailwind CSS;
- Vercel;
- Vitest e Playwright.

## Desenvolvimento

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Sem variáveis do Supabase, a aplicação inicia em modo demonstração e salva no navegador.

## Supabase

1. Crie um projeto;
2. Aplique `supabase/migrations/202606180001_initial_diagramados.sql`;
3. Copie a Project URL e a chave publicável;
4. Preencha `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_DEMO_MODE=false
```

O esquema usa RLS em todas as tabelas públicas e cria workspace/owner automaticamente no cadastro.

## Qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Publicação

Consulte [docs/deployment.md](docs/deployment.md).

## Referências

- [Plano de implementação](docs/implementation-plan.md)
- [Sistema visual](docs/design-system.md)
- [Dashboard premium](docs/design-references/dashboard-premium.png)
- [Editor de organogramas](docs/design-references/orgchart-editor-premium.png)
- [Editor de processos](docs/design-references/process-editor-premium.png)
