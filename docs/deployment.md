# Publicação do Diagramados

## Supabase

1. Criar projeto preferencialmente em `sa-east-1`;
2. Aplicar a migration inicial;
3. Executar Security e Performance Advisors;
4. Configurar Auth URL como a URL final da Vercel;
5. Copiar apenas Project URL e publishable key para o front-end.

Nunca expor secret key ou service role no navegador.

## Vercel

1. Importar o repositório;
2. Framework: Next.js;
3. Build command: `npm run build`;
4. Adicionar:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_DEMO_MODE=false
```

5. Publicar primeiro em Preview;
6. Validar login, RLS, salvamento, reabertura e exportação;
7. Promover para Production.

## Gate de produção

- `npm run verify` verde;
- E2E dos dois editores verde;
- Advisors Supabase sem alerta crítico;
- Nenhuma secret key em variáveis `NEXT_PUBLIC_*`;
- URLs de Auth conferidas;
- Exportação inclui nós fora do viewport;
- Teste negativo entre dois workspaces executado;
- Backup e rollback de migration definidos.
